import { ApiError } from '../query-service.mjs';
import { TEAM_IDENTITIES, TEAM_IDENTITY_VERSION, legacyLabelNeedles, containsLegacyTeamLabels, canonicalizeTeamLabels } from '../team-identity-policy.mjs';
import { validatePlayerStorySnapshot } from '../../public/player-story-core.js';
import { storyDigest } from './story-store.mjs';

export const TEAM_IDENTITY_BATCH_LIMIT = 5;
export const TEAM_IDENTITY_ADMIN_PATH = '/api/admin/team-identities';
const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const TABLES = Object.freeze([
  { table: 'mm_queries', json: 'result_json', id: 'query_id' },
  { table: 'mm_receipts', json: 'receipt_json', id: 'id' },
  { table: 'mm_player_stories', json: 'snapshot_json', id: 'id' },
]);

export function requireTeamIdentityAdmin(env, owner) {
  let allowed;
  try { allowed = JSON.parse(env.MATCHMIND_ADMIN_OWNER_IDS); } catch { /* fail closed */ }
  if (!Array.isArray(allowed) || !allowed.length || allowed.length > 10 || allowed.some(id => typeof id !== 'string' || !id || id.length > 256 || /[\x00-\x20\x7f]/.test(id)) || !allowed.includes(owner)) fail(403, 'ADMIN_REQUIRED', 'Site administrator access is required.');
}

// No raw before image or private identifier is returned by any public endpoint.
// Ordinary API paths may reconcile exactly the row already authorized by their
// owner/session or unexpired share capability. Only admin can scan across owners.
export function createTeamIdentityStore(binding, fixture, now) {
  if (!binding?.prepare || !binding?.batch || !binding?.withSession) fail(503, 'STORAGE_UNAVAILABLE', 'Persistent identity storage is unavailable.');
  const db = binding.withSession('first-primary');
  const stmt = (sql, values = []) => db.prepare(sql).bind(...values);
  const descriptor = table => TABLES.find(row => row.table === table);
  const legacyWhere = column => `(${legacyLabelNeedles.map(() => `instr(${column},?) > 0`).join(' OR ')})`;

  async function canonicalSeeded() {
    const rows = (await stmt('SELECT team_id,source_team_id,name,code,crest,identity_version FROM mm_team_identities').all()).results ?? [];
    return rows.length === TEAM_IDENTITIES.length && TEAM_IDENTITIES.every(team => rows.some(row => row.team_id === team.id && row.source_team_id === team.sourceId && row.name === team.name && row.code === team.code && row.crest === team.crest && row.identity_version === TEAM_IDENTITY_VERSION));
  }
  async function seedCanonical() {
    await db.batch(TEAM_IDENTITIES.map(team => stmt('INSERT OR IGNORE INTO mm_team_identities(team_id,source_team_id,name,code,crest,identity_version) VALUES(?,?,?,?,?,?)', [team.id, team.sourceId, team.name, team.code, team.crest, TEAM_IDENTITY_VERSION])));
    if (!await canonicalSeeded()) fail(503, 'IDENTITY_CATALOG_CONFLICT', 'The canonical team identity catalog could not be verified.');
  }

  async function converted(table, row) {
    const entry = descriptor(table);
    if (!entry || typeof row?.[entry.json] !== 'string') fail(503, 'IDENTITY_ROW_INVALID', 'Stored identity data could not be validated.');
    const before = row[entry.json];
    if (!containsLegacyTeamLabels(before)) return null;
    if (new TextEncoder().encode(before).length > 1_048_576) fail(503, 'IDENTITY_ROW_INVALID', 'Stored identity data exceeds its supported size.');
    let value;
    try { value = JSON.parse(before); } catch { fail(503, 'IDENTITY_ROW_INVALID', 'Stored identity data could not be read.'); }
    const source = value.source_version, match = table === 'mm_queries' ? value.context?.match_id : table === 'mm_receipts' ? value.match_id : value.match?.match_id;
    if (source !== fixture.sourceVersion || match !== fixture.demo.match.match_id || table !== 'mm_queries' && row.source_version !== fixture.sourceVersion) fail(503, 'IDENTITY_SOURCE_MISMATCH', 'Stored identity source is not supported by this migration.');
    const beforeHash = await storyDigest(before);
    if (table === 'mm_player_stories') {
      if (beforeHash !== row.snapshot_sha256 || value.player?.player_id !== row.player_id || value.match?.match_id !== row.match_id || value.mode !== row.mode || value.cutoff_ms !== row.cutoff) fail(503, 'IDENTITY_SNAPSHOT_INVALID', 'Stored story integrity could not be verified.');
    }
    const next = canonicalizeTeamLabels(value), after = JSON.stringify(next);
    if (containsLegacyTeamLabels(after)) fail(503, 'IDENTITY_LABEL_CONFLICT', 'An unexpected legacy identity field requires review.');
    if (table === 'mm_player_stories') {
      try { validatePlayerStorySnapshot(next, fixture); } catch { fail(503, 'IDENTITY_SNAPSHOT_INVALID', 'Stored story could not be validated against its frozen source.'); }
    }
    return { before, after, beforeHash, afterHash: await storyDigest(after) };
  }

  async function reconcile(table, row) {
    const entry = descriptor(table), change = await converted(table, row);
    if (!change) return row;
    const key = JSON.stringify([row.owner_id, row[entry.id]]);
    const where = `owner_id = ? AND ${entry.id} = ? AND ${entry.json} = ?${table === 'mm_player_stories' ? ' AND snapshot_sha256 = ?' : ''}`;
    const values = [row.owner_id, row[entry.id], change.before, ...(table === 'mm_player_stories' ? [row.snapshot_sha256] : [])];
    const results = await db.batch([
      stmt(`INSERT OR IGNORE INTO mm_team_identity_audit(migration_id,entity_table,entity_key,owner_id,before_json,before_sha256,after_sha256,previous_snapshot_sha256,created_at)
        SELECT ?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM ${table} WHERE ${where})`, [TEAM_IDENTITY_VERSION, table, key, row.owner_id, change.before, change.beforeHash, change.afterHash, row.snapshot_sha256 ?? null, now, ...values]),
      stmt(`UPDATE ${table} SET ${entry.json} = ?${table === 'mm_player_stories' ? ',snapshot_sha256 = ?' : ''} WHERE ${where}`, [change.after, ...(table === 'mm_player_stories' ? [change.afterHash] : []), ...values]),
    ]);
    if (results.some(result => result.success === false)) fail(503, 'STORAGE_UNAVAILABLE', 'The identity update could not be persisted.');
    if (results.at(-1)?.meta?.changes !== 1) {
      const current = await stmt(`SELECT * FROM ${table} WHERE owner_id = ? AND ${entry.id} = ?`, [row.owner_id, row[entry.id]]).first();
      if (!current || containsLegacyTeamLabels(current[entry.json])) fail(409, 'IDENTITY_CONFLICT', 'Stored identity data changed while it was being migrated. Retry the bounded data operation.');
      return current;
    }
    return { ...row, [entry.json]: change.after, ...(table === 'mm_player_stories' ? { snapshot_sha256: change.afterHash } : {}) };
  }

  async function receipt({ changed = {}, scanned = {}, blocked = {} } = {}) {
    const tables = {};
    for (const entry of TABLES) {
      const row = await stmt(`SELECT COUNT(*) AS remaining FROM ${entry.table} WHERE ${legacyWhere(entry.json)}`, legacyLabelNeedles).first();
      tables[entry.table] = { scanned: scanned[entry.table] ?? 0, changed: changed[entry.table] ?? 0, remaining: row?.remaining ?? 0, blocked: blocked[entry.table] ?? 0 };
    }
    const audit = await stmt('SELECT COUNT(*) AS total_changed FROM mm_team_identity_audit WHERE migration_id = ?', [TEAM_IDENTITY_VERSION]).first();
    const seeded = await canonicalSeeded();
    return { migration_id: TEAM_IDENTITY_VERSION, batch_limit: TEAM_IDENTITY_BATCH_LIMIT, canonical_seeded: seeded, complete: seeded && Object.values(tables).every(row => row.remaining === 0 && row.blocked === 0), total_changed: audit?.total_changed ?? 0, tables, model_called: false };
  }
  async function apply() {
    await seedCanonical();
    const changed = {}, scanned = {}, blocked = {}; let remaining = TEAM_IDENTITY_BATCH_LIMIT;
    for (const entry of TABLES) {
      if (!remaining) break;
      const rows = (await stmt(`SELECT * FROM ${entry.table} WHERE ${legacyWhere(entry.json)} ORDER BY owner_id,${entry.id} LIMIT ?`, [...legacyLabelNeedles, remaining]).all()).results ?? [];
      for (const row of rows) {
        remaining -= 1; scanned[entry.table] = (scanned[entry.table] ?? 0) + 1;
        try { await reconcile(entry.table, row); changed[entry.table] = (changed[entry.table] ?? 0) + 1; }
        catch (caught) {
          if (!(caught instanceof ApiError) || !['IDENTITY_ROW_INVALID','IDENTITY_SOURCE_MISMATCH','IDENTITY_SNAPSHOT_INVALID','IDENTITY_LABEL_CONFLICT','IDENTITY_CONFLICT'].includes(caught.code)) throw caught;
          blocked[entry.table] = (blocked[entry.table] ?? 0) + 1;
        }
      }
    }
    return receipt({ changed, scanned, blocked });
  }
  return Object.freeze({ reconcile, status: receipt, apply });
}
