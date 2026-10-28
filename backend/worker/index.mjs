import { ApiError, API_VERSION, evaluateAuthorizedQuery, evaluateAuthorizedAttack } from '../query-service.mjs';
import { buildFactPacket, validateModelAnswer, renderModelAnswer, ModelContractError, PROMPT_VERSION } from '../prompt-core.mjs';
import { readProviderConfig, createResponsesProvider, getProviderIdentity, ProviderError, sanitizeProviderUsage, sanitizeProviderDiagnostics, DEFAULT_MODEL_LIMITS } from '../responses-provider.mjs';
import { ATTACK_PROMPT_VERSION, buildAttackPacket, validateAttackAnswer, renderAttackAnswer, renderAttackExplanation } from '../attack-contract.mjs';
import { RULE_ANSWER_LIMITATION } from '../answer-display.mjs';
import { CLOCK_POLICY_VERSION, visibleCutoffAt } from './session-clock.mjs';
import { createD1Store, normalizePolicy } from './d1-store.mjs';
import { STORY_ROUTES, handleStoryRoute } from './story-routes.mjs';
import { createTeamIdentityStore, requireTeamIdentityAdmin, TEAM_IDENTITY_ADMIN_PATH } from './team-identity-store.mjs';
import { TEAM_IDENTITY_VERSION } from '../team-identity-policy.mjs';
import { requestIdentity, withIdentityCookie } from './anonymous-identity.mjs';
import { fixture as builtFixture, promptBundle as builtPrompt, attackPromptBundle as builtAttackPrompt, inputManifest } from './generated-inputs.mjs';

export const WORKER_API_VERSION = 'matchmind-worker-api/1.3';
const bytes = (value) => new TextEncoder().encode(value).byteLength;
const error = (status, code, message) => { throw new ApiError(status, code, message); };
const validId = (value, name) => { if (typeof value !== 'string' || !value.trim() || value.length > 160) error(400, 'INVALID_REQUEST', `${name} must be a bounded non-empty string.`); return value; };
function onlyKeys(body, keys) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some((key) => !keys.includes(key))) error(400, 'INVALID_REQUEST', 'Invalid request fields.');
}
function json(status, value, maxBytes = 131_072) {
  const body = JSON.stringify(value);
  if (bytes(body) > maxBytes) return new Response('{"error":{"code":"RESPONSE_UNAVAILABLE","message":"Response could not be delivered."}}', { status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  return new Response(body, { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', vary: 'Cookie' } });
}
async function readBody(request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) error(415, 'UNSUPPORTED_MEDIA_TYPE', 'Use application/json.');
  const declared = request.headers.get('content-length');
  if (declared !== null && (!/^\d+$/.test(declared) || Number(declared) > 16_384)) error(413, 'PAYLOAD_TOO_LARGE', 'Request body exceeds 16 KiB.');
  const reader = request.body?.getReader();
  if (!reader) error(400, 'INVALID_REQUEST', 'A JSON body is required.');
  let size = 0; const parts = [];
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength; if (size > 16_384) { void reader.cancel().catch(() => {}); error(413, 'PAYLOAD_TOO_LARGE', 'Request body exceeds 16 KiB.'); }
      parts.push(value);
    }
  } finally { reader.releaseLock(); }
  const content = new Uint8Array(size); let offset = 0;
  for (const part of parts) { content.set(part, offset); offset += part.byteLength; }
  try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(content)); } catch { error(400, 'INVALID_REQUEST', 'Invalid JSON body.'); }
}
const SAFE_FAILURES = new Set(['invalid_configuration', 'provider_failed', 'input_too_large', 'response_too_large', 'invalid_response', 'model_refused', 'timeout', 'authentication_failed', 'rate_limited', 'upstream_failed', 'transport_failed', 'invalid_model_output', 'output_budget_exhausted', 'incomplete_output']);
const baseLimitations = (snapshot) => snapshot.limitations.filter((item) => item !== RULE_ANSWER_LIMITATION && !item.startsWith('Local deterministic rules API.'));
function fallback(snapshot, status, meta, attempted = false) {
  return { ...snapshot, provider: 'rules', provider_status: status, cloud_connected: false, ...meta,
    limitations: [RULE_ANSWER_LIMITATION, !meta.model_configured ? 'No model provider is configured for this service; no model was called for this question.' : attempted ? 'No validated model answer was available for this question; this answer uses rules.' : 'No model was called for this question.', ...baseLimitations(snapshot)] };
}
async function requestHash(body, attack = false) {
  const normalized = Object.fromEntries(['session_id', 'match_id', 'player_id', 'cutoff_ms', 'viewer_playhead_ms', 'question', 'event_id', 'chain_id'].map((key) => [key, body[key] ?? (key === 'viewer_playhead_ms' ? body.cutoff_ms : null)]));
  if (attack || Object.hasOwn(body, 'mode')) { normalized.route = attack ? '/api/assistant/explain-attack' : '/api/assistant/query'; normalized.scope_type = attack ? 'attack' : 'player'; normalized.mode = body.mode; if (attack) normalized.team_id = body.team_id; }
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(normalized)));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

// Factory injections are trusted code only, never HTTP/environment cutoff controls.
// providerFactory is always subject to the same exact fact/receipt validation.
export function createWorkerApi({ fixture = builtFixture, promptBundle = builtPrompt, attackPromptBundle = builtAttackPrompt, now = Date.now, idFactory = () => crypto.randomUUID(), initialCutoffMs = 0, providerFactory, policy: policyOverrides } = {}) {
  const policy = normalizePolicy(policyOverrides);
  fixture = structuredClone(fixture); promptBundle = structuredClone(promptBundle); attackPromptBundle = structuredClone(attackPromptBundle);
  const duration = fixture?.demo?.match?.duration_ms;
  if (!Number.isSafeInteger(duration) || !Number.isSafeInteger(initialCutoffMs) || initialCutoffMs < 0 || initialCutoffMs > duration || typeof now !== 'function' || typeof idFactory !== 'function' || providerFactory !== undefined && typeof providerFactory !== 'function') throw new TypeError('Invalid trusted Worker inputs.');
  const promptReady = promptBundle?.version === PROMPT_VERSION && typeof promptBundle.systemPrompt === 'string' && promptBundle.schema && /^[a-f0-9]{64}$/.test(promptBundle.sha256);
  const attackPromptReady = attackPromptBundle?.version === ATTACK_PROMPT_VERSION && typeof attackPromptBundle.systemPrompt === 'string' && attackPromptBundle.schema && /^[a-f0-9]{64}$/.test(attackPromptBundle.sha256);
  const clock = () => { const value = now(); if (!Number.isSafeInteger(value) || value < 0) throw new TypeError('Invalid trusted clock.'); return value; };
  const sessionView = (row, identity) => ({ session_id: row.id, match_id: row.match_id, visible_cutoff_ms: row.released_cutoff, expires_at_ms: row.expires_at, provider: 'rules', cloud_connected: false, authentication: identity.authentication, clock_policy: CLOCK_POLICY_VERSION });
  function configuredProvider(env) {
    try {
      let config = readProviderConfig(env);
      if (config.mode !== 'responses' || !promptReady) return { provider: null, configurationError: false };
      // The production route uses the explicitly selected mini profile. Legacy Node Terra remains supported.
      if (config.modelProfile !== 'gpt-5-mini' || config.reasoningEffort !== 'minimal') throw new ProviderError('invalid_configuration');
      config = Object.freeze({ ...config, limits: Object.freeze({ ...DEFAULT_MODEL_LIMITS, timeoutMs: 8000, maxOutputTokens: 700, maxConcurrent: policy.maxConcurrent }) });
      return { provider: providerFactory ? providerFactory({ env, config }) : createResponsesProvider({ config }), config, configurationError: false };
    } catch { return { provider: null, configurationError: true }; }
  }
  async function handleAuthorized(request, env, identity) {
    try {
      const url = new URL(request.url);
      const owner = identity.owner;
      if (url.search) error(400, 'INVALID_REQUEST', 'Query parameters are not supported.');
      // Public AI does not grant access to account-owned stories or admin data.
      if (!identity.signedIn && (STORY_ROUTES.includes(url.pathname) || url.pathname === TEAM_IDENTITY_ADMIN_PATH)) error(401, 'AUTH_REQUIRED', 'Sign in to manage saved or shared stories.');
      const store = createD1Store(env.DB, policy);
      const current = clock();
      if (url.pathname === TEAM_IDENTITY_ADMIN_PATH && request.method === 'POST') {
        requireTeamIdentityAdmin(env, owner);
        const body = await readBody(request); onlyKeys(body, ['action']);
        if (Object.keys(body).length !== 1 || !['status', 'apply'].includes(body.action)) error(400, 'INVALID_REQUEST', 'Use a fixed identity data operation.');
        const identities = createTeamIdentityStore(env.DB, fixture, current);
        return json(200, await identities[body.action]());
      }
      if (url.pathname === '/api/health' && request.method === 'GET') {
        await store.checkReady();
        const state = configuredProvider(env); const providerIdentity = getProviderIdentity(state.provider);
        return json(200, { status: 'ok', schema_version: API_VERSION, api_version: WORKER_API_VERSION, provider: 'rules', provider_status: state.configurationError ? 'invalid_configuration' : state.provider ? 'ready_not_called' : 'deterministic_fallback', cloud_connected: false, prompt_ready: Boolean(promptReady), prompt_version: promptReady ? promptBundle.version : null, attack_prompt_ready: Boolean(attackPromptReady), attack_prompt_version: attackPromptReady ? attackPromptBundle.version : null, model_configured: Boolean(state.provider), model_profile: state.provider ? providerIdentity.modelProfile ?? state.config.modelProfile : null, reasoning_effort: state.provider ? providerIdentity.reasoningEffort ?? state.config.reasoningEffort : null, authentication: identity.authentication, storage: 'd1', model_call_limits: 'unlimited', simulation_start_ms: initialCutoffMs, simulation_mode: CLOCK_POLICY_VERSION, source_version: fixture.sourceVersion, team_identity_version: TEAM_IDENTITY_VERSION, input_projection_sha256: inputManifest.projection_sha256, scope: 'Finite completed-action facts; full-match browser files still remain downloadable.' });
      }
      const getSession = async (id) => {
        validId(id, 'session_id');
        const row = await store.getSession(owner, id, current, duration, (saved) => visibleCutoffAt({ elapsedMs: Math.max(0, current - saved.created_at), initialCutoffMs: saved.initial_cutoff, durationMs: duration, gaps: fixture.clockPolicy?.gaps ?? [] }));
        if (row.match_id !== fixture.demo.match.match_id || row.source_version !== fixture.sourceVersion || row.clock_policy !== CLOCK_POLICY_VERSION) error(409, 'STATE_VERSION_MISMATCH', 'Session source version is no longer available.');
        return row;
      };
      if (STORY_ROUTES.includes(url.pathname) && request.method === 'POST') {
        try {
          const result = await handleStoryRoute({ path: url.pathname, body: await readBody(request), owner, env, fixture, current, idFactory, getSession, origin: url.origin });
          return json(result.status, result.value, result.maxBytes);
        } catch (caught) {
          if (caught instanceof ApiError) throw caught;
          error(503, 'STORAGE_UNAVAILABLE', 'The persistent story request could not be completed safely.');
        }
      }
      if (url.pathname === '/api/sessions' && request.method === 'POST') {
        const body = await readBody(request); onlyKeys(body, ['match_id']); validId(body.match_id, 'match_id');
        if (body.match_id !== fixture.demo.match.match_id) error(404, 'NOT_FOUND', 'Match not found.');
        const id = `session_${validId(idFactory(), 'generated ID')}`;
        const row = await store.createSession({ owner, id, matchId: body.match_id, sourceVersion: fixture.sourceVersion, now: current, initialCutoff: initialCutoffMs });
        return json(201, sessionView(row, identity));
      }
      if (url.pathname.startsWith('/api/sessions/') && request.method === 'GET') {
        let id; try { id = decodeURIComponent(url.pathname.slice('/api/sessions/'.length)); } catch { error(400, 'INVALID_REQUEST', 'Invalid session path.'); }
        return json(200, sessionView(await getSession(id), identity));
      }
      if (url.pathname === '/api/replay/resolve' && request.method === 'POST') {
        const body = await readBody(request); onlyKeys(body, ['session_id', 'receipt_id']); validId(body.receipt_id, 'receipt_id');
        const session = await getSession(body.session_id);
        const receipt = await store.resolveReceipt(owner, session, body.receipt_id, current);
        return json(200, { provider: 'rules', cloud_connected: false, as_of_ms: receipt.as_of_ms, receipt, clip: receipt.clip });
      }
      if (['/api/assistant/query','/api/assistant/explain-attack'].includes(url.pathname) && request.method === 'POST') {
        const attack = url.pathname === '/api/assistant/explain-attack';
        const bundle = attack ? attackPromptBundle : promptBundle;
        const requestPromptReady = attack ? attackPromptReady : promptReady;
        const body = await readBody(request); onlyKeys(body, attack ? ['session_id','match_id','team_id','chain_id','cutoff_ms','viewer_playhead_ms','question','mode','query_id'] : ['session_id', 'match_id', 'player_id', 'cutoff_ms', 'viewer_playhead_ms', 'question', 'event_id', 'chain_id', 'query_id', 'mode']); validId(body.query_id, 'query_id');
        const session = await getSession(body.session_id);
        // All legacy field, actor, event/chain, numeric and visibility checks precede provider access.
        const snapshot = (attack ? evaluateAuthorizedAttack : evaluateAuthorizedQuery)({ fixture, sessionId: session.id, visibleCutoffMs: session.released_cutoff, input: body, idFactory });
        const hash = await requestHash(body, attack);
        const replay = async (row) => {
          if (!row) return null;
          if (row.request_hash !== hash) error(409, 'QUERY_CONFLICT', 'query_id is already bound to a different frozen question.');
          if (row.status === 'pending') {
            if (row.lease_until > current) error(409, 'QUERY_PENDING', 'This frozen query is already in progress.');
            row = await store.markUnknown(owner, body.query_id, current);
          }
          if (row.status === 'pending') error(409, 'QUERY_PENDING', 'This frozen query is already in progress.');
          row = await createTeamIdentityStore(env.DB, fixture, current).reconcile('mm_queries', row);
          const result = JSON.parse(row.result_json);
          if (row.status === 'unknown') await store.persistEvidence({ owner, queryId: body.query_id, token: row.claim_token, session, result });
          return json(200, { ...result, idempotency: { status: row.status === 'unknown' ? 'unknown_not_retried' : 'replayed' } });
        };
        const previous = await replay(await store.getQuery(owner, body.query_id)); if (previous) return previous;
        const state = configuredProvider(env); const identity = getProviderIdentity(state.provider);
        const meta = { prompt_ready: Boolean(requestPromptReady), prompt_version: requestPromptReady ? bundle.version : null, model_configured: Boolean(state.provider), model_profile: state.provider ? identity.modelProfile ?? state.config.modelProfile : null, reasoning_effort: state.provider ? identity.reasoningEffort ?? state.config.reasoningEffort : null };
        let packet = null; let preliminary = null;
        if (snapshot.answerability.status !== 'supported') preliminary = fallback(snapshot, snapshot.provider_status, meta);
        else if (!state.provider || !requestPromptReady) preliminary = fallback(snapshot, state.configurationError ? 'fallback_invalid_configuration' : 'deterministic_fallback', meta);
        else {
          try { packet = attack ? buildAttackPacket(snapshot, body.question) : buildFactPacket(snapshot, body.question); if (bytes(JSON.stringify({ packet, question: body.question, prompt: bundle.systemPrompt, schema: bundle.schema })) > DEFAULT_MODEL_LIMITS.maxInputBytes) preliminary = fallback(snapshot, 'fallback_input_too_large', meta); }
          catch { preliminary = fallback(snapshot, 'fallback_packet_unavailable', meta); }
        }
        const token = validId(idFactory(), 'generated claim');
        const reserve = !preliminary;
        const orphanBase = preliminary ?? fallback(snapshot, 'fallback_unknown', meta, true);
        let claimed = await store.claimQuery({ owner, queryId: body.query_id, sessionId: session.id, hash, token, now: current, base: orphanBase, reserve });
        if (!claimed) {
          const concurrent = await replay(await store.getQuery(owner, body.query_id)); if (concurrent) return concurrent;
          if (!reserve) error(429, 'CAPACITY_EXCEEDED', 'The query could not be reserved safely.');
          preliminary = fallback(snapshot, 'fallback_busy', meta);
          // This unpaid result is also frozen/idempotent. A later retry cannot silently become paid.
          claimed = await store.claimQuery({ owner, queryId: body.query_id, sessionId: session.id, hash, token, now: current, base: preliminary, reserve: false });
          if (!claimed) { const raced = await replay(await store.getQuery(owner, body.query_id)); if (raced) return raced; error(429, 'CAPACITY_EXCEEDED', 'The query could not be reserved safely.'); }
        }
        await store.persistEvidence({ owner, queryId: body.query_id, token, session, result: orphanBase });
        if (preliminary) {
          await store.saveResult({ owner, queryId: body.query_id, token, session, result: preliminary });
          return json(200, { ...preliminary, idempotency: { status: 'created' } });
        }
        const controller = new AbortController(); let timer; let usage = null; let diagnostics = null; let result; let failed = null;
        const timeout = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new ProviderError('timeout')); }, 8000); });
        try {
          const output = await Promise.race([state.provider.generate({ bundle, packet, question: body.question, signal: controller.signal }), timeout]);
          usage = sanitizeProviderUsage(output?.usage); diagnostics = sanitizeProviderDiagnostics(output?.diagnostics);
          const serialized = JSON.stringify(output?.candidate);
          if (typeof serialized !== 'string' || bytes(serialized) > DEFAULT_MODEL_LIMITS.maxResponseBytes) throw new ModelContractError();
          const candidate = attack ? validateAttackAnswer(output.candidate, packet) : validateModelAnswer(output.candidate, packet, body.question);
          const live = identity.executionMode === 'live';
          result = { ...snapshot, ...meta, provider: live ? `${identity.endpointKind}_responses` : 'responses_contract', provider_status: live ? 'model_validated' : 'contract_validated', cloud_connected: live, prompt_sha256: bundle.sha256, answer: attack ? renderAttackAnswer(candidate, packet, { question:body.question }) : renderModelAnswer(candidate, packet, { question:body.question, matchTimeContext:fixture.demo.match }), ...(attack ? { structured_explanation: renderAttackExplanation(candidate, packet) } : {}), model_output: candidate, model_used_receipt_ids: candidate.receipt_ids, model_usage: usage, model_diagnostics: diagnostics, limitations: [live ? 'This answer uses validated model-selected facts and server-rendered values.' : 'This answer uses an injected provider contract result.', ...baseLimitations(snapshot), 'Finite topic templates and server-rendered quantities; no free-form football reasoning or conversation memory.', 'Validation checks exact topic facts and topic-compatible representative references; it cannot prove arbitrary semantic relevance or causality.', ...(live ? [] : ['No real cloud inference was verified for this answer.'])] };
        } catch (caught) {
          failed = caught instanceof ModelContractError ? 'invalid_model_output' : caught instanceof ProviderError && SAFE_FAILURES.has(caught.code) ? caught.code : 'provider_failed';
          if (caught instanceof ProviderError) { usage ??= sanitizeProviderUsage(caught.usage); diagnostics ??= sanitizeProviderDiagnostics(caught.diagnostics); }
          result = { ...fallback(snapshot, `fallback_${failed}`, meta, true), model_usage: usage, model_diagnostics: diagnostics };
        } finally { clearTimeout(timer); }
        // Preserve every attempt audit. Unknown transport completion holds its lease and is never retried.
        const unknown = ['timeout', 'transport_failed', 'provider_failed'].includes(failed);
        await store.saveResult({ owner, queryId: body.query_id, token, session, result, status: unknown ? 'unknown' : failed ? 'failed' : 'completed', failureCode: failed, retainLease: unknown });
        return json(200, { ...result, idempotency: { status: 'created' } });
      }
      if ([...STORY_ROUTES, '/api/health', '/api/sessions', '/api/assistant/query', '/api/assistant/explain-attack', '/api/replay/resolve'].includes(url.pathname)) error(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
      error(404, 'NOT_FOUND', 'Route not found.');
    } catch (caught) {
      if (caught instanceof ApiError) return json(caught.status, { error: { code: caught.code, message: caught.message } });
      return json(503, { error: { code: 'SERVICE_UNAVAILABLE', message: 'The API could not complete this request safely.' } });
    }
  }
  async function handle(request, env = {}) {
    try {
      const url = new URL(request.url);
      const origin = request.headers.get('origin');
      if ((request.method === 'POST' || request.method === 'OPTIONS') && origin !== url.origin || origin && origin !== url.origin || request.headers.get('sec-fetch-site') === 'cross-site') error(403, 'ORIGIN_NOT_ALLOWED', 'Use the same-origin API.');
      if (request.method === 'OPTIONS') return new Response(null, { status:204, headers:{ 'cache-control':'no-store' } });
      const identity = await requestIdentity(request);
      return withIdentityCookie(await handleAuthorized(request, env, identity), identity);
    } catch (caught) {
      if (caught instanceof ApiError) return json(caught.status, { error:{ code:caught.code, message:caught.message } });
      return json(503, { error:{ code:'SERVICE_UNAVAILABLE', message:'The API could not complete this request safely.' } });
    }
  }
  return Object.freeze({ handle });
}

// Immutable inputs only are shared. Authentication, sessions, attempt audits and answers live in D1.
const productionApi = createWorkerApi();
export const handleMatchmindRequest = (request, env) => productionApi.handle(request, env);
