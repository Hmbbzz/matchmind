import { receiptStorageScope } from '../attack-contract.mjs';
import { ApiError } from '../query-service.mjs';

export const PRODUCTION_POLICY = Object.freeze({ globalCalls: null, ownerCalls: null, sessionCalls: null, maxConcurrent: 2, leaseMs: 60_000, sessionTtlMs: 7_200_000, maxOwnerSessions: 10, maxSessions: 100, maxQueriesPerSession: null, maxReceiptsPerSession: null });
const REMOVED_QUOTAS = Object.freeze(['globalCalls', 'ownerCalls', 'sessionCalls', 'maxQueriesPerSession', 'maxReceiptsPerSession']);
export function normalizePolicy(overrides = {}) {
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides) || Object.keys(overrides).some((key) => !Object.hasOwn(PRODUCTION_POLICY, key))) throw new TypeError('Invalid trusted service policy.');
  const policy = { ...PRODUCTION_POLICY, ...overrides };
  for (const [key, value] of Object.entries(policy)) {
    if (REMOVED_QUOTAS.includes(key)) {
      // Legacy code-level numeric overrides remain loadable but no longer impose quotas.
      if (value !== null && (!Number.isSafeInteger(value) || value <= 0)) throw new TypeError('Invalid legacy quota setting.');
      policy[key] = null;
    } else if (!Number.isSafeInteger(value) || value <= 0 || value > PRODUCTION_POLICY[key]) throw new TypeError('Trusted policy may only reduce technical limits.');
  }
  return Object.freeze(policy);
}
const notFound = () => { throw new ApiError(404, 'NOT_FOUND', 'Session or evidence not found.'); };
const changed = (result) => result?.success !== false && result?.meta?.changes === 1;

export function createD1Store(binding, policy = PRODUCTION_POLICY) {
  if (!binding || typeof binding.prepare !== 'function' || typeof binding.batch !== 'function' || typeof binding.withSession !== 'function') throw new ApiError(503, 'STORAGE_UNAVAILABLE', 'Persistent storage is not available.');
  // A fresh primary-first D1 session for this API request; no cross-owner in-memory state.
  const db = binding.withSession('first-primary');
  const stmt = (sql, values = []) => db.prepare(sql).bind(...values);
  async function checkReady() {
    await db.batch([
      stmt('SELECT id,owner_id,match_id,source_version,created_at,expires_at,initial_cutoff,released_cutoff,clock_policy FROM mm_sessions LIMIT 0'),
      stmt('SELECT owner_id,query_id,session_id,request_hash,claim_token,status,model_reserved,created_at,lease_until,result_json,failure_code,usage_json,diagnostics_json FROM mm_queries LIMIT 0'),
      stmt('SELECT id,owner_id,session_id,source_version,prompt_version,feature_version,cutoff,player_id,expires_at,receipt_json FROM mm_receipts LIMIT 0'),
    ]);
  }
  async function createSession({ owner, id, matchId, sourceVersion, now, initialCutoff }) {
    // Only expired unpaid/idempotency data is pruned. Paid reservations are never deleted/refunded.
    await db.batch([
      stmt('DELETE FROM mm_receipts WHERE expires_at <= ?', [now]),
      stmt('DELETE FROM mm_queries WHERE model_reserved = 0 AND created_at <= ?', [now - policy.sessionTtlMs]),
      stmt('DELETE FROM mm_sessions WHERE expires_at <= ?', [now]),
    ]);
    const result = await stmt(`INSERT INTO mm_sessions(id,owner_id,match_id,source_version,created_at,expires_at,initial_cutoff,released_cutoff)
      SELECT ?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM mm_sessions) < ? AND (SELECT COUNT(*) FROM mm_sessions WHERE owner_id = ?) < ?`,
    [id, owner, matchId, sourceVersion, now, now + policy.sessionTtlMs, initialCutoff, initialCutoff, policy.maxSessions, owner, policy.maxOwnerSessions]).run();
    if (!changed(result)) throw new ApiError(429, 'CAPACITY_EXCEEDED', 'Session capacity reached.');
    return getSession(owner, id, now);
  }
  async function getSession(owner, id, now, duration, proposedCutoff) {
    const row = await stmt('SELECT * FROM mm_sessions WHERE owner_id = ? AND id = ?', [owner, id]).first();
    if (!row) notFound();
    if (row.expires_at <= now) throw new ApiError(410, 'SESSION_EXPIRED', 'Session expired. Create a new session.');
    if (duration !== undefined) {
      const next = proposedCutoff === undefined ? Math.min(duration, row.initial_cutoff + Math.max(0, now - row.created_at)) : proposedCutoff(row);
      await stmt('UPDATE mm_sessions SET released_cutoff = MAX(released_cutoff, ?) WHERE owner_id = ? AND id = ?', [next, owner, id]).run();
      return stmt('SELECT * FROM mm_sessions WHERE owner_id = ? AND id = ?', [owner, id]).first();
    }
    return row;
  }
  const getQuery = (owner, id) => stmt('SELECT * FROM mm_queries WHERE owner_id = ? AND query_id = ?', [owner, id]).first();
  async function claimQuery({ owner, queryId, sessionId, hash, token, now, base, reserve }) {
    // A model reservation is a durable attempt audit + concurrency lease, not a
    // lifetime allowance. Existing rows and unknown outcomes remain immutable.
    const query = `INSERT OR IGNORE INTO mm_queries(owner_id,query_id,session_id,request_hash,claim_token,status,model_reserved,created_at,lease_until,result_json)
      SELECT ?,?,?,?,?, 'pending', ?,?,?,?
      ${reserve ? `WHERE (SELECT COUNT(*) FROM mm_queries WHERE model_reserved = 1 AND lease_until > ? AND status IN ('pending','unknown')) < ?` : ''}`;
    const values = [owner, queryId, sessionId, hash, token, reserve ? 1 : 0, now, now + policy.leaseMs, JSON.stringify(base)];
    if (reserve) values.push(now, policy.maxConcurrent);
    const result = await stmt(query, values).run();
    return changed(result);
  }
  function evidenceStatements({ owner, queryId, token, session, result }) {
    return result.evidence_receipts.map((receipt) => stmt(`INSERT OR IGNORE INTO mm_receipts(id,owner_id,session_id,source_version,prompt_version,feature_version,cutoff,player_id,expires_at,receipt_json)
      SELECT ?,?,?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM mm_queries WHERE owner_id = ? AND query_id = ? AND claim_token = ? AND status IN ('pending','unknown'))`,
    [receipt.receipt_id, owner, session.id, receipt.source_version, result.prompt_version ?? 'rules', receipt.feature_version, receipt.as_of_ms, receiptStorageScope(receipt), session.expires_at, JSON.stringify(receipt), owner, queryId, token]));
  }
  async function persistEvidence(args) {
    const statements = evidenceStatements(args);
    if (statements.length) await db.batch(statements);
  }
  async function saveResult({ owner, queryId, token, session, result, status = 'completed', failureCode = null, retainLease = false }) {
    const statements = evidenceStatements({ owner, queryId, token, session, result });
    statements.push(stmt(`UPDATE mm_queries SET result_json = ?, status = ?, failure_code = ?, usage_json = ?, diagnostics_json = ?, lease_until = CASE WHEN ? = 1 THEN lease_until ELSE 0 END WHERE owner_id = ? AND query_id = ? AND claim_token = ? AND status = 'pending'`,
    [JSON.stringify(result), status, failureCode, result.model_usage ? JSON.stringify(result.model_usage) : null, result.model_diagnostics ? JSON.stringify(result.model_diagnostics) : null, retainLease ? 1 : 0, owner, queryId, token]));
    const results = await db.batch(statements);
    if (!changed(results.at(-1))) throw new ApiError(409, 'QUERY_STATE_CHANGED', 'Query completion could not be persisted.');
  }
  async function markUnknown(owner, queryId, now) {
    await stmt("UPDATE mm_queries SET status = 'unknown', failure_code = 'unknown' WHERE owner_id = ? AND query_id = ? AND status = 'pending' AND lease_until <= ?", [owner, queryId, now]).run();
    return getQuery(owner, queryId);
  }
  async function resolveReceipt(owner, session, receiptId, now) {
    const row = await stmt('SELECT * FROM mm_receipts WHERE owner_id = ? AND session_id = ? AND id = ? AND expires_at > ?', [owner, session.id, receiptId, now]).first();
    if (!row) notFound();
    if (row.source_version !== session.source_version) throw new ApiError(409, 'STATE_VERSION_MISMATCH', 'Evidence source version does not match the session.');
    const receipt = JSON.parse(row.receipt_json);
    if (receipt.source_version !== row.source_version || receipt.feature_version !== row.feature_version || receipt.as_of_ms !== row.cutoff || receiptStorageScope(receipt) !== row.player_id || receipt.clip.cutoff_ms !== row.cutoff || receipt.clip.end_ms > row.cutoff) throw new ApiError(503, 'STORAGE_UNAVAILABLE', 'Stored evidence could not be validated.');
    return receipt;
  }
  return Object.freeze({ checkReady, createSession, getSession, getQuery, claimQuery, persistEvidence, saveResult, markUnknown, resolveReceipt });
}
