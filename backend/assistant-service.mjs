import { buildFactPacket, validateModelAnswer, renderModelAnswer, ModelContractError } from './prompt-contract.mjs';
import { normalizeModelLimits, getProviderIdentity, ProviderError, sanitizeProviderUsage, sanitizeProviderDiagnostics } from './responses-provider.mjs';
import { buildAttackPacket, validateAttackAnswer, renderAttackAnswer, renderAttackExplanation } from './attack-contract.mjs';
import { RULE_ANSWER_LIMITATION } from './answer-display.mjs';

const SAFE_FAILURE_CODES = new Set(['invalid_configuration', 'provider_failed', 'input_too_large', 'response_too_large', 'invalid_response', 'model_refused', 'timeout', 'authentication_failed', 'rate_limited', 'upstream_failed', 'transport_failed', 'invalid_model_output', 'output_budget_exhausted', 'incomplete_output']);

export function createAssistantService({ rulesService, promptBundle, attackPromptBundle, provider, limits: limitOverrides = {}, configurationError = false, matchTimeContext } = {}) {
  if (!rulesService || ['query', 'createSession', 'getSessionState', 'resolveReplay'].some((key) => typeof rulesService[key] !== 'function')) throw new TypeError('A rules query service is required.');
  if (provider && typeof provider.generate !== 'function') throw new TypeError('Invalid trusted model provider.');
  const limits = normalizeModelLimits(limitOverrides);
  const promptReady = Boolean(promptBundle?.version && promptBundle?.systemPrompt && promptBundle?.schema && promptBundle?.sha256);
  const configured = Boolean(provider && promptReady && !configurationError);
  const identity = getProviderIdentity(provider);
  let totalCalls = 0; let active = 0; let cloudConnected = false;
  let lastStatus = configurationError ? 'invalid_configuration' : configured ? 'ready_not_called' : 'deterministic_fallback';
  let lastProvider = configured ? 'responses_ready' : 'rules';
  const usageTotals = { reported_calls: 0, input_tokens: 0, output_tokens: 0, total_tokens: 0, reasoning_tokens: 0, reasoning_unknown_calls: 0 };
  const recordUsage = (usage) => { if (usage) { usageTotals.reported_calls++; for (const key of ['input_tokens', 'output_tokens', 'total_tokens']) usageTotals[key] += usage[key]; if (usage.reasoning_tokens == null) usageTotals.reasoning_unknown_calls++; else usageTotals.reasoning_tokens += usage.reasoning_tokens; } };
  const metadata = () => ({ prompt_ready: promptReady, prompt_version: promptReady ? promptBundle.version : null, model_configured: configured, cloud_connected: cloudConnected, model_profile: configured ? identity.modelProfile ?? null : null, reasoning_effort: configured ? identity.reasoningEffort ?? null : null });
  const baseLimitations = (snapshot) => snapshot.limitations.filter((item) => item !== RULE_ANSWER_LIMITATION && !item.startsWith('Local deterministic rules API.'));
  const fallback = (snapshot, status, attempted = false) => Object.freeze({ ...snapshot, provider_status: status, prompt_version: snapshot.scope_type === 'attack' ? attackPromptBundle?.version ?? null : promptReady ? promptBundle.version : null, model_configured: configured, model_profile: configured ? identity.modelProfile ?? null : null, reasoning_effort: configured ? identity.reasoningEffort ?? null : null, limitations: Object.freeze([RULE_ANSWER_LIMITATION, !configured ? configurationError ? 'A model provider is not available for this service; no model was called for this question.' : 'No model provider is configured for this service; no model was called for this question.' : attempted ? 'No validated model answer was available for this question; this answer uses rules.' : 'No model was called for this question.', ...baseLimitations(snapshot)]) });

  async function answer(input, attack = false) {
    const bundle = attack ? attackPromptBundle : promptBundle;
    // This synchronous authorization step always runs before any provider access.
    const snapshot = attack ? rulesService.explainAttack(input) : rulesService.query(input);
    if (snapshot.answerability?.status !== 'supported') return fallback(snapshot, snapshot.provider_status);
    if (!configured || !bundle) return fallback(snapshot, configurationError ? 'fallback_invalid_configuration' : 'deterministic_fallback');
    const question = input.question;
    let packet;
    try {
      packet = attack ? buildAttackPacket(snapshot, question) : buildFactPacket(snapshot, question);
      if (Buffer.byteLength(JSON.stringify({ packet, question, prompt: bundle.systemPrompt, schema: bundle.schema })) > limits.maxInputBytes) return fallback(snapshot, 'fallback_input_too_large');
    } catch { return fallback(snapshot, 'fallback_packet_unavailable'); }
    if (active >= limits.maxConcurrent) return fallback(snapshot, 'fallback_busy');
    // Attempt and usage totals are observability only, never an admission quota.
    totalCalls++; active++;
    const controller = new AbortController(); let timer;
    let usage = null; let diagnostics = null;
    const timeout = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new ProviderError('timeout')); }, limits.timeoutMs); });
    try {
      const result = await Promise.race([provider.generate({ bundle, packet, question, signal: controller.signal }), timeout]);
      usage = sanitizeProviderUsage(result?.usage); diagnostics = sanitizeProviderDiagnostics(result?.diagnostics);
      // Trusted injections obey the same output byte bound as the HTTP transport.
      let serialized;
      try { serialized = JSON.stringify(result?.candidate); } catch { throw new ModelContractError(); }
      if (typeof serialized !== 'string' || Buffer.byteLength(serialized) > limits.maxResponseBytes) throw new ModelContractError();
      const candidate = attack ? validateAttackAnswer(result.candidate, packet) : validateModelAnswer(result.candidate, packet, question);
      const realCloud = identity.executionMode === 'live';
      cloudConnected = realCloud;
      lastStatus = realCloud ? 'model_validated' : 'contract_validated';
      lastProvider = realCloud ? `${identity.endpointKind}_responses` : 'responses_contract';
      return Object.freeze({ ...snapshot, provider: lastProvider, provider_status: lastStatus, cloud_connected: realCloud, model_configured: true, model_profile: identity.modelProfile ?? null, reasoning_effort: identity.reasoningEffort ?? null, prompt_version: bundle.version, prompt_sha256: bundle.sha256, answer: attack ? renderAttackAnswer(candidate, packet, { question }) : renderModelAnswer(candidate, packet, { question, matchTimeContext }), ...(attack ? { structured_explanation: renderAttackExplanation(candidate, packet) } : {}), model_output: candidate, model_used_receipt_ids: candidate.receipt_ids, model_usage: usage, model_diagnostics: diagnostics, limitations: Object.freeze([realCloud ? 'This answer uses validated model-selected facts and server-rendered values.' : 'This answer uses an injected provider contract result.', ...baseLimitations(snapshot), 'Finite topic templates and server-rendered quantities; no free-form football reasoning or conversation memory.', 'Validation checks exact topic facts and topic-compatible representative references; it cannot prove arbitrary semantic relevance or causality.', ...(realCloud ? [] : ['No real cloud inference was verified for this answer.'])]) });
    } catch (error) {
      cloudConnected = false;
      lastProvider = 'rules';
      lastStatus = `fallback_${error instanceof ModelContractError ? 'invalid_model_output' : error instanceof ProviderError && SAFE_FAILURE_CODES.has(error.code) ? error.code : 'provider_failed'}`;
      if (error instanceof ProviderError) { usage ??= sanitizeProviderUsage(error.usage); diagnostics ??= sanitizeProviderDiagnostics(error.diagnostics); }
      return Object.freeze({ ...fallback(snapshot, lastStatus, true), model_usage: usage, model_diagnostics: diagnostics });
    } finally { clearTimeout(timer); active--; recordUsage(usage); }
  }

  return Object.freeze({
    createSession: (input) => rulesService.createSession(input),
    getSessionState: (input) => rulesService.getSessionState(input),
    resolveReplay: (input) => rulesService.resolveReplay(input),
    query: input => answer(input),
    explainAttack: input => answer(input, true),
    getHealth: () => Object.freeze({ provider: lastProvider, provider_status: lastStatus, ...metadata(), model_call_limits: 'unlimited', active_model_calls: active, model_call_attempts: totalCalls, provider_reported_usage: Object.freeze({ ...usageTotals }), limits }),
  });
}
