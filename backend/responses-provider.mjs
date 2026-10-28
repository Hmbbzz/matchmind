import { buildResponsesBody } from './prompt-core.mjs';
import { resolveModelProfile, MODEL_PROFILES } from './model-profiles.mjs';

export const DEFAULT_MODEL_LIMITS = Object.freeze({ timeoutMs: 8000, maxConcurrent: 2, maxOutputTokens: 700, maxResponseBytes: 65_536, maxInputBytes: 32_768, maxCallsPerSession: null, maxTotalCalls: null, maxBudgetSessions: null });
const LIMIT_RANGES = Object.freeze({ timeoutMs: [10, 15_000], maxConcurrent: [1, 4], maxOutputTokens: [64, 1500], maxResponseBytes: [256, 262_144], maxInputBytes: [256, 65_536] });
const REMOVED_CALL_LIMITS = Object.freeze(['maxCallsPerSession', 'maxTotalCalls', 'maxBudgetSessions']);
const ENV_LIMITS = Object.freeze({ timeoutMs: 'TIMEOUT_MS', maxConcurrent: 'MAX_CONCURRENT', maxOutputTokens: 'MAX_OUTPUT_TOKENS', maxResponseBytes: 'MAX_RESPONSE_BYTES', maxInputBytes: 'MAX_INPUT_BYTES', maxCallsPerSession: 'MAX_CALLS_PER_SESSION', maxTotalCalls: 'MAX_TOTAL_CALLS', maxBudgetSessions: 'MAX_BUDGET_SESSIONS' });
const identities = new WeakMap();
export class ProviderError extends Error {
  constructor(code = 'provider_failed', { usage, diagnostics } = {}) { super('The configured model request could not be completed.'); this.name = 'ProviderError'; this.code = code; this.usage = sanitizeProviderUsage(usage); this.diagnostics = sanitizeProviderDiagnostics(diagnostics); }
}
const safeTokenCount = (value) => Number.isSafeInteger(value) && value >= 0 && value <= 10_000_000;
const validUpstreamModel = (value) => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(value);
const validResponseId = (value) => typeof value === 'string' && /^resp_[A-Za-z0-9_-]{1,155}$/.test(value);
const validRequestId = (value) => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,159}$/.test(value);
export function sanitizeProviderUsage(usage) {
  if (!usage || !['input_tokens', 'output_tokens', 'total_tokens'].every((key) => safeTokenCount(usage[key]))) return null;
  const reasoning = usage.reasoning_tokens ?? usage.output_tokens_details?.reasoning_tokens;
  if (reasoning != null && (!safeTokenCount(reasoning) || reasoning > usage.output_tokens)) return null;
  return Object.freeze({ input_tokens: usage.input_tokens, output_tokens: usage.output_tokens, total_tokens: usage.total_tokens, reasoning_tokens: reasoning ?? null });
}
const TRANSPORT_STAGES = new Set(['credential', 'fetch', 'response_read', 'candidate_parse']);
const TRANSPORT_FAILURES = new Set(['unsupported_redirect', 'invalid_receiver', 'request_context', 'invalid_header', 'network_error', 'aborted', 'unclassified']);
// Match only known runtime signatures/codes. Never expose the original error/cause/message.
function transportFailureCategory(error, signal) {
  if (signal?.aborted) return 'aborted';
  try {
    const message = typeof error?.message === 'string' ? error.message : '';
    if (/^Unsupported redirect mode(?::|$)/.test(message) || message.startsWith('Invalid redirect value, must be one of "follow" or "manual"')) return 'unsupported_redirect';
    if (/^Illegal invocation(?::|$)/.test(message)) return 'invalid_receiver';
    if (/^Cannot perform I\/O on behalf of a different request/.test(message)) return 'request_context';
    if (/^Invalid character in header content(?::|$)/.test(message)) return 'invalid_header';
    if (['ENOTFOUND', 'EAI_AGAIN', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ERR_TLS_CERT_ALTNAME_INVALID', 'CERT_HAS_EXPIRED'].includes(error?.cause?.code ?? error?.code)) return 'network_error';
  } catch { /* Unknown errors remain unclassified, including hostile accessors. */ }
  return 'unclassified';
}
export function sanitizeProviderDiagnostics(value) {
  if (!value || typeof value !== 'object') return null;
  const result = {};
  if (Number.isInteger(value.http_status) && value.http_status >= 100 && value.http_status <= 599) result.http_status = value.http_status;
  if (['completed', 'incomplete', 'failed'].includes(value.response_status)) result.response_status = value.response_status;
  if (['max_output_tokens', 'content_filter', 'other'].includes(value.incomplete_reason)) result.incomplete_reason = value.incomplete_reason;
  if (['none', 'minimal', 'low'].includes(value.reasoning_effort)) result.reasoning_effort = value.reasoning_effort;
  if (Object.hasOwn(MODEL_PROFILES, value.model_profile)) result.model_profile = value.model_profile;
  if (validUpstreamModel(value.upstream_model)) result.upstream_model = value.upstream_model;
  if (validResponseId(value.response_id)) result.response_id = value.response_id;
  if (validRequestId(value.request_id)) result.request_id = value.request_id;
  if (TRANSPORT_STAGES.has(value.transport_stage)) result.transport_stage = value.transport_stage;
  if (TRANSPORT_FAILURES.has(value.transport_failure)) result.transport_failure = value.transport_failure;
  return Object.keys(result).length ? Object.freeze(result) : null;
}
function upstreamDiagnostics(response, json, config, credential, extra = {}) {
  const identifiers = { upstream_model: json?.model, response_id: json?.id, request_id: ['x-request-id', 'apim-request-id', 'x-ms-request-id'].map((name) => response.headers?.get?.(name)).find(validRequestId) };
  for (const key of Object.keys(identifiers)) if (typeof identifiers[key] === 'string' && (identifiers[key] === credential || credential.length >= 8 && identifiers[key].includes(credential))) delete identifiers[key];
  return sanitizeProviderDiagnostics({ ...extra, http_status: response.status, reasoning_effort: config.reasoningEffort, model_profile: config.modelProfile, ...identifiers });
}
export function normalizeModelLimits(overrides = {}) {
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides) || Object.keys(overrides).some((key) => !Object.hasOwn(DEFAULT_MODEL_LIMITS, key))) throw new TypeError('Invalid model limits.');
  const limits = { ...DEFAULT_MODEL_LIMITS, ...overrides };
  // K removes business call quotas. Accept legacy positive integers for rollout
  // compatibility, but normalize them to explicit unlimited rather than enforce them.
  for (const key of REMOVED_CALL_LIMITS) {
    if (limits[key] !== null && (!Number.isSafeInteger(limits[key]) || limits[key] <= 0)) throw new TypeError('Invalid legacy model call limit.');
    limits[key] = null;
  }
  for (const [key, [min, max]] of Object.entries(LIMIT_RANGES)) if (!Number.isSafeInteger(limits[key]) || limits[key] < min || limits[key] > max) throw new TypeError('Invalid model limits.');
  return Object.freeze(limits);
}

export function normalizeResponsesEndpoint(kind, value) {
  let url;
  try { url = new URL(value); } catch { throw new ProviderError('invalid_configuration'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.search || url.hash) throw new ProviderError('invalid_configuration');
  const path = url.pathname.replace(/\/$/, '');
  if (kind === 'foundry_project' && /^[a-z0-9-]+\.services\.ai\.azure\.com$/.test(url.hostname) && /^\/api\/projects\/[A-Za-z0-9_.-]+$/.test(path)) return `${url.origin}${path}/openai/v1/responses`;
  if (kind === 'foundry_resource' && /^[a-z0-9-]+\.services\.ai\.azure\.com$/.test(url.hostname) && ['', '/openai/v1'].includes(path)) return `${url.origin}/openai/v1/responses`;
  if (kind === 'azure_openai' && /^[a-z0-9-]+\.openai\.azure\.com$/.test(url.hostname) && ['', '/openai/v1'].includes(path)) return `${url.origin}/openai/v1/responses`;
  throw new ProviderError('invalid_configuration');
}

// Call only at trusted server startup. Default rules mode does not inspect credentials.
export function readProviderConfig(env = process.env) {
  const mode = env.MATCHMIND_PROVIDER ?? 'rules';
  if (!['rules', 'responses'].includes(mode)) throw new ProviderError('invalid_configuration');
  const overrides = {};
  for (const [key, suffix] of Object.entries(ENV_LIMITS)) if (env[`MATCHMIND_MODEL_${suffix}`] !== undefined) overrides[key] = Number(env[`MATCHMIND_MODEL_${suffix}`]);
  const limits = normalizeModelLimits(overrides);
  if (mode === 'rules') return Object.freeze({ mode, limits });
  const endpointKind = env.MATCHMIND_ENDPOINT_KIND;
  const endpoint = normalizeResponsesEndpoint(endpointKind, env.MATCHMIND_MODEL_ENDPOINT);
  const deployment = env.MATCHMIND_MODEL_DEPLOYMENT;
  const authMode = env.MATCHMIND_AUTH_MODE ?? (endpointKind === 'foundry_resource' ? 'api_key' : 'bearer');
  let profile;
  try { profile = resolveModelProfile({ profile: env.MATCHMIND_MODEL_PROFILE, reasoningEffort: env.MATCHMIND_MODEL_REASONING_EFFORT }); } catch { throw new ProviderError('invalid_configuration'); }
  if (typeof deployment !== 'string' || !/^[A-Za-z0-9_.-]{1,128}$/.test(deployment) || !['bearer', 'api_key'].includes(authMode) || (endpointKind === 'foundry_project' && authMode !== 'bearer') || (endpointKind === 'foundry_resource' && authMode !== 'api_key')) throw new ProviderError('invalid_configuration');
  return Object.freeze({ mode, endpointKind, endpoint, deployment, authMode, ...profile, accessToken: authMode === 'bearer' ? env.MATCHMIND_ACCESS_TOKEN : undefined, apiKey: authMode === 'api_key' ? env.MATCHMIND_API_KEY : undefined, limits });
}

export function getProviderIdentity(provider) {
  return identities.get(provider) ?? Object.freeze({ executionMode: 'contract', endpointKind: 'injected' });
}

function validCredential(value) { return typeof value === 'string' && value.length > 0 && value.length <= 16_384 && !/[\r\n]/.test(value); }

async function readBoundedJson(response, maxBytes, signal) {
  if (!response?.body || typeof response.body.getReader !== 'function') throw new ProviderError('invalid_response');
  const length = response.headers.get('content-length');
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > maxBytes)) { void response.body.cancel().catch(() => {}); throw new ProviderError('response_too_large'); }
  const reader = response.body.getReader(); const parts = []; let bytes = 0;
  try {
    while (true) {
      if (signal.aborted) throw new ProviderError('timeout');
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) { void reader.cancel().catch(() => {}); throw new ProviderError('response_too_large'); }
      parts.push(value);
    }
    const combined = new Uint8Array(bytes); let offset = 0;
    for (const part of parts) { combined.set(part, offset); offset += part.byteLength; }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(combined)); } catch { throw new ProviderError('invalid_response'); }
  } finally { reader.releaseLock(); }
}

function extractCandidate(response) {
  if (response?.status === 'incomplete') {
    const reason = response.incomplete_details?.reason;
    throw new ProviderError(reason === 'max_output_tokens' ? 'output_budget_exhausted' : 'incomplete_output', { usage: response.usage, diagnostics: { response_status: 'incomplete', http_status: 200, incomplete_reason: ['max_output_tokens', 'content_filter'].includes(reason) ? reason : 'other' } });
  }
  if (!response || response.status !== 'completed' || response.error || response.incomplete_details || !Array.isArray(response.output)) throw new ProviderError('invalid_response');
  const texts = [];
  for (const item of response.output) {
    // Reasoning metadata can accompany a Responses answer; no tools or side effects are accepted.
    if (item.type === 'reasoning') continue;
    if (item.type !== 'message' || item.role !== 'assistant' || !Array.isArray(item.content)) throw new ProviderError('invalid_response');
    for (const content of item.content) {
      if (content.type === 'refusal') throw new ProviderError('model_refused');
      if (content.type !== 'output_text' || typeof content.text !== 'string') throw new ProviderError('invalid_response');
      texts.push(content.text);
    }
  }
  if (texts.length !== 1) throw new ProviderError('invalid_response');
  try { return JSON.parse(texts[0]); } catch { throw new ProviderError('invalid_response'); }
}

export function createResponsesProvider({ config, fetchImpl, tokenProvider } = {}) {
  if (config?.mode !== 'responses' || !['foundry_project', 'foundry_resource', 'azure_openai'].includes(config.endpointKind)) throw new ProviderError('invalid_configuration');
  // Revalidate even code-level configuration; the HTTP caller never chooses a destination.
  const expected = config.endpoint?.replace(/\/openai\/v1\/responses$/, '');
  let profile;
  try { profile = resolveModelProfile({ profile: config.modelProfile, reasoningEffort: config.reasoningEffort }); } catch { throw new ProviderError('invalid_configuration'); }
  if (normalizeResponsesEndpoint(config.endpointKind, expected) !== config.endpoint || typeof config.deployment !== 'string' || !/^[A-Za-z0-9_.-]{1,128}$/.test(config.deployment) || !['bearer', 'api_key'].includes(config.authMode) || (config.endpointKind === 'foundry_project' && config.authMode !== 'bearer') || (config.endpointKind === 'foundry_resource' && config.authMode !== 'api_key')) throw new ProviderError('invalid_configuration');
  if (tokenProvider !== undefined && typeof tokenProvider !== 'function') throw new ProviderError('invalid_configuration');
  if (config.authMode === 'api_key' && !validCredential(config.apiKey) || config.authMode === 'bearer' && !tokenProvider && !validCredential(config.accessToken)) throw new ProviderError('invalid_configuration');
  const limits = normalizeModelLimits(config.limits);
  config = Object.freeze({ ...config, ...profile, limits });
  const transport = fetchImpl ?? globalThis.fetch;
  if (typeof transport !== 'function') throw new ProviderError('invalid_configuration');
  const provider = Object.freeze({
    async generate({ bundle, packet, question, signal: parentSignal } = {}) {
      const body = JSON.stringify(buildResponsesBody(bundle, packet, { model: config.deployment, maxOutputTokens: limits.maxOutputTokens, modelProfile: config.modelProfile, reasoningEffort: config.reasoningEffort, question }));
      if (new TextEncoder().encode(body).byteLength > limits.maxInputBytes) throw new ProviderError('input_too_large');
      const controller = new AbortController(); let timer; let onAbort; let stage = 'credential';
      const aborted = new Promise((_, reject) => {
        onAbort = () => { controller.abort(); reject(new ProviderError('timeout')); };
        timer = setTimeout(onAbort, limits.timeoutMs);
        parentSignal?.addEventListener('abort', onAbort, { once: true });
        if (parentSignal?.aborted) onAbort();
      });
      const operation = async () => {
        const credential = config.authMode === 'bearer' ? (tokenProvider ? await tokenProvider({ signal: controller.signal }) : config.accessToken) : config.apiKey;
        if (!validCredential(credential)) throw new ProviderError('authentication_failed');
        if (controller.signal.aborted) throw new ProviderError('timeout');
        const headers = { 'content-type': 'application/json', accept: 'application/json', ...(config.authMode === 'bearer' ? { authorization: `Bearer ${credential}` } : { 'api-key': credential }) };
        stage = 'fetch';
        // Workers supports manual/follow, not redirect:error. Manual never forwards credentials to Location.
        const response = await transport(config.endpoint, { method: 'POST', headers, body, signal: controller.signal, redirect: 'manual' });
        if (!response || !Number.isInteger(response.status)) throw new ProviderError('invalid_response');
        // Reject every redirect without reading Location or issuing a second fetch.
        if (response.status >= 300 && response.status < 400) {
          void response.body?.cancel().catch(() => {});
          throw new ProviderError('upstream_failed', { diagnostics: upstreamDiagnostics(response, null, config, credential) });
        }
        if (!response.ok) {
          void response.body?.cancel().catch(() => {});
          const details = { diagnostics: upstreamDiagnostics(response, null, config, credential) };
          if ([401, 403].includes(response.status)) throw new ProviderError('authentication_failed', details);
          if (response.status === 429) throw new ProviderError('rate_limited', details);
          throw new ProviderError('upstream_failed', details);
        }
        stage = 'response_read';
        const json = await readBoundedJson(response, limits.maxResponseBytes, controller.signal);
        stage = 'candidate_parse';
        try { return Object.freeze({ candidate: extractCandidate(json), usage: sanitizeProviderUsage(json.usage), diagnostics: upstreamDiagnostics(response, json, config, credential, { response_status: 'completed' }) }); }
        catch (error) { if (error instanceof ProviderError) throw new ProviderError(error.code, { usage: error.usage ?? json.usage, diagnostics: upstreamDiagnostics(response, json, config, credential, error.diagnostics ?? {}) }); throw error; }
      };
      try { return await Promise.race([operation(), aborted]); }
      catch (error) {
        const diagnostics = sanitizeProviderDiagnostics({ ...(error instanceof ProviderError ? error.diagnostics : null), transport_stage: stage, ...(!(error instanceof ProviderError) || error.code === 'timeout' ? { transport_failure: transportFailureCategory(error, controller.signal) } : {}) });
        if (error instanceof ProviderError) throw new ProviderError(error.code, { usage: error.usage, diagnostics });
        throw new ProviderError(controller.signal.aborted ? 'timeout' : 'transport_failed', { diagnostics });
      }
      finally { clearTimeout(timer); parentSignal?.removeEventListener('abort', onAbort); }
    },
  });
  identities.set(provider, Object.freeze({ executionMode: fetchImpl === undefined ? 'live' : 'contract', endpointKind: config.endpointKind, modelProfile: config.modelProfile, reasoningEffort: config.reasoningEffort }));
  return provider;
}
