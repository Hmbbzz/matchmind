// Browser transport only. Provider endpoints and credentials belong on the server.
import { attackQuestionLimit } from './display-copy.js?v=2026-10-27-T1';
const MAX_RESPONSE_BYTES = 131072;
const finiteTime = (value) => Number.isSafeInteger(value) && value >= 0;
const safeId = (value) => typeof value === "string" && value.length > 0 && value.length <= 200;
export class AssistantApiError extends Error {
  constructor(code = "unavailable") { super(code); this.name = "AssistantApiError"; this.code = code; }
}

// Scope belongs to this new question, not the last replay opened in the UI.
// Returning a projection never changes the global selection or old receipts.
export function projectPlayerQuestion(question, original) {
  const context = { ...original };
  const eventReference = /\b(?:this|that|selected|current)\s+(?:recorded\s+)?(shot|pass|cross|event|moment|clip)\b/i.exec(question);
  const replayReference = /\b(?:replay|small[- ]window)\b/i.test(question) || eventReference?.[1].toLowerCase() === 'clip';
  const chainReference = /\b(?:this|that|selected|current)\s+(?:attack(?:\s+sequence)?|(?:chance|attack)\s+chain|chain|sequence)\b/i.test(question);
  const finish = limitation => Object.freeze({ context: Object.freeze(context), limitation });
  if (!eventReference && !replayReference && !chainReference) {
    Object.assign(context, { selectedEventId:null, selectedEvent:null, selectedChainId:null, selectedChain:null, replay:null });
    return finish(null);
  }
  if (chainReference && !eventReference && !replayReference) return finish(attackQuestionLimit(question) || 'Player totals do not establish a breakdown for this selected attack. The attack explanation has its own evidence.');
  const row = replayReference ? context.replay?.event : context.selectedEvent ?? context.replay?.event;
  if (!row || row.player !== context.selectedPlayerId || Math.max(row.t ?? 0, row.q?.endMs ?? 0, row.available_at_ms ?? 0) > context.cutoffMs) return finish('This evidence does not match the selected player at this viewing time. No player has been substituted.');
  const type = eventReference?.[1].toLowerCase();
  const matches = !type || ['event','moment','clip'].includes(type) || type === 'shot' && row.type === 'shot' || type === 'pass' && row.type === 'pass' || type === 'cross' && row.type === 'pass' && ['cross','cutback'].includes(row.q?.pass_type);
  if (!matches) return finish('The selected evidence is a different action type. It cannot establish the requested detail.');
  Object.assign(context, { selectedEventId:row.id, selectedEvent:row, selectedChainId:null, selectedChain:null });
  return finish(null);
}

export function createAssistantApi({ matchId, onState = () => {}, fetchImpl = fetch } = {}) {
  // Local framework preview and production both use this same-origin API.
  const root = "";
  let session = null;
  let starting = null;
  let retryAfter = 0;
  let status = { available: false, configured: false, modelProfile: null, phase: "checking" };
  const update = (next) => { status = Object.freeze({ ...status, ...next }); onState(status); };

  // Health and session reads/creation may include hosted dispatch latency.
  // They never invoke the model; assistant POSTs retain their explicit 18s bound.
  async function request(path, body, timeoutMs = 6000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(`${root}/api/${path}`, { method: body === undefined ? "GET" : "POST", headers: { accept: "application/json", ...(body === undefined ? {} : { "content-type": "application/json" }) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal: controller.signal, credentials: "same-origin", cache: "no-store", redirect: "error" });
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        const code = response.status === 410 || (response.status === 404 && path.startsWith("sessions/")) ? "session_expired" : response.status === 401 ? "sign_in_required" : response.status === 403 ? "not_authorized" : response.status === 400 ? "context_rejected" : response.status === 429 ? "temporarily_busy" : "unavailable";
        throw new AssistantApiError(code);
      }
      if (!/^application\/json(?:\s*;|$)/i.test(contentType)) throw new AssistantApiError("invalid_response");
      const length = response.headers.get("content-length");
      if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_RESPONSE_BYTES)) throw new AssistantApiError("invalid_response");
      if (!response.body?.getReader) throw new AssistantApiError("invalid_response");
      const reader = response.body.getReader();
      const chunks = []; let size = 0;
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > MAX_RESPONSE_BYTES) { void reader.cancel().catch(() => {}); throw new AssistantApiError("invalid_response"); }
          chunks.push(value);
        }
      } finally { reader.releaseLock(); }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new AssistantApiError("invalid_response"); }
    } catch (error) {
      if (error instanceof AssistantApiError) throw error;
      throw new AssistantApiError(controller.signal.aborted ? "timeout" : "unavailable");
    } finally { clearTimeout(timer); }
  }

  function validateSession(value) {
    if (!value || value.match_id !== matchId || !safeId(value.session_id) || !finiteTime(value.visible_cutoff_ms)) throw new AssistantApiError("invalid_response");
    return value;
  }

  async function connect() {
    if (session) return session;
    if (starting) return starting;
    if (Date.now() < retryAfter) throw new AssistantApiError("unavailable");
    starting = (async () => {
      try {
        const health = await request("health");
        if (health?.status !== "ok") throw new AssistantApiError("invalid_response");
        session = validateSession(await request("sessions", { match_id: matchId }));
        update({ available: true, configured: health.model_configured === true, modelProfile: typeof health.model_profile === "string" ? health.model_profile : null, phase: "ready" });
        return session;
      } catch (error) {
        retryAfter = Date.now() + 15000;
        update({ available: false, configured: false, modelProfile: null, phase: "unavailable" });
        throw error;
      } finally { starting = null; }
    })();
    return starting;
  }

  function validateAnswer(value, input) {
    const context = value?.context;
    if (!value || typeof value.answer !== "string" || value.answer.length > 16000 || !safeId(value.answer_id) || value.query_id !== input.query_id || value.as_of_ms !== input.cutoff_ms || !context || ["session_id", "match_id", "player_id", "cutoff_ms", "viewer_playhead_ms"].some((key) => context[key] !== input[key]) || (context.event_id ?? null) !== input.event_id || (context.chain_id ?? null) !== input.chain_id || value.player?.player_id !== input.player_id || !value.facts || typeof value.facts !== "object" || Array.isArray(value.facts) || !Array.isArray(value.evidence_receipts) || value.evidence_receipts.length > 3 || !Array.isArray(value.limitations) || value.limitations.some((item) => typeof item !== "string") || typeof value.provider !== "string" || typeof value.provider_status !== "string" || typeof value.cloud_connected !== "boolean") throw new AssistantApiError("invalid_response");
    if (input.mode !== undefined && (value.mode !== input.mode || context.mode !== input.mode)) throw new AssistantApiError("invalid_response");
    for (const receipt of value.evidence_receipts) {
      if (!safeId(receipt?.receipt_id) || receipt.match_id !== input.match_id || receipt.player_id !== input.player_id || receipt.as_of_ms !== input.cutoff_ms || !safeId(receipt.anchor_event_id) || !Array.isArray(receipt.event_ids) || !receipt.event_ids.includes(receipt.anchor_event_id) || receipt.event_ids.some((id) => !safeId(id)) || !receipt.clip || !finiteTime(receipt.clip.start_ms) || !finiteTime(receipt.clip.end_ms) || receipt.clip.start_ms > receipt.clip.end_ms || receipt.clip.end_ms > input.cutoff_ms || receipt.clip.cutoff_ms !== input.cutoff_ms || receipt.clip.anchor_event_id !== receipt.anchor_event_id) throw new AssistantApiError("invalid_response");
    }
    const factKeys = new Set(["passes_attempted", "passes_completed", "pass_outcomes_known", "pass_completion", "crosses_attempted", "crosses_completed", "cross_outcomes_known", "cross_completion", "shots", "xg_estimate", "xg_samples", "xg_missing"]);
    if (Object.entries(value.facts).some(([key, fact]) => !factKeys.has(key) || (fact !== null && (typeof fact !== "number" || !Number.isFinite(fact) || fact < 0 || fact > 100000000 || (key.endsWith("_completion") && fact > 1)))) || !["supported", "unsupported", "ambiguous"].includes(value.answerability?.status)) throw new AssistantApiError("invalid_response");
    if (value.cloud_connected && (value.provider_status !== "model_validated" || value.model_profile !== "gpt-5-mini" || !["azure_openai_responses", "foundry_project_responses", "foundry_resource_responses"].includes(value.provider) || !Array.isArray(value.model_used_receipt_ids) || value.model_used_receipt_ids.length > 3 || value.model_used_receipt_ids.some((id) => !value.evidence_receipts.some((receipt) => receipt.receipt_id === id)))) throw new AssistantApiError("invalid_response");
    return value;
  }

  async function query(question, context) {
    const projected = projectPlayerQuestion(question, context);
    if (projected.limitation) throw new AssistantApiError('context_rejected');
    context = projected.context;
    await connect();
    const capturedSessionId = session.session_id;
    try {
      let current = validateSession(await request(`sessions/${encodeURIComponent(capturedSessionId)}`));
      // A trusted server gap release can be a fraction behind the displayed
      // frame. Wait briefly for that same cutoff; never advance or rewrite it.
      for (const delay of [60, 120, 180]) {
        if (context.cutoffMs <= current.visible_cutoff_ms) break;
        await new Promise((resolve) => setTimeout(resolve, delay));
        current = validateSession(await request(`sessions/${encodeURIComponent(capturedSessionId)}`));
      }
      if (context.cutoffMs > current.visible_cutoff_ms) throw new AssistantApiError("visibility_not_ready");
      const input = { session_id: capturedSessionId, match_id: matchId, player_id: context.selectedPlayerId, cutoff_ms: context.cutoffMs, viewer_playhead_ms: context.cutoffMs, question, event_id: context.selectedEventId, chain_id: context.selectedChainId, query_id: context.queryId, ...(context.mode === undefined ? {} : { mode: context.mode }) };
      const answer = validateAnswer(await request("assistant/query", input, 18000), input);
      return { answer, sessionId: capturedSessionId };
    } catch (error) {
      if (["session_expired", "not_authorized", "sign_in_required"].includes(error.code)) { session = null; update({ phase: "unavailable", available: false }); }
      throw error;
    }
  }

  // Team/chain scope is separate from the player endpoint. Never relax its player checks.
  function validateAttackAnswer(value, input) {
    const reject = () => { throw new AssistantApiError("invalid_response"); };
    const exactFields = (row, keys) => row && typeof row === "object" && !Array.isArray(row) && Object.keys(row).length === keys.length && keys.every((key) => Object.hasOwn(row, key));
    const context = value?.context, keys = ["session_id", "match_id", "team_id", "chain_id", "cutoff_ms", "viewer_playhead_ms", "mode"];
    if (!value || value.schema_version !== "matchmind-attack-api/1.0" || value.scope_type !== "attack" || value.player !== null || !context || context.scope_type !== "attack" || context.player_id !== null || context.event_id !== null || keys.some((key) => context[key] !== input[key]) || value.mode !== input.mode || value.query_id !== input.query_id || value.as_of_ms !== input.cutoff_ms || !safeId(value.answer_id) || typeof value.answer !== "string" || value.answer.length > 16000 || typeof value.provider !== "string" || typeof value.provider_status !== "string" || typeof value.cloud_connected !== "boolean" || !Array.isArray(value.limitations) || value.limitations.some((text) => typeof text !== "string") || value.team?.team_id !== input.team_id || !Array.isArray(value.participants) || value.participants.length > 40 || value.participants.some((row) => !safeId(row?.player_id) || row.team_id !== input.team_id || typeof row.name !== "string") || value.attack?.chain_id !== input.chain_id || !finiteTime(value.attack.start_ms) || !finiteTime(value.attack.end_ms) || value.attack.start_ms > value.attack.end_ms || value.attack.end_ms > input.cutoff_ms || !finiteTime(value.attack.available_at_ms) || value.attack.available_at_ms > input.cutoff_ms) reject();
    const factKeys = ["actions", "passes", "completed_passes", "shots", "xg_estimate", "camera_off_ball_observations"];
    if (!value.facts || Array.isArray(value.facts) || Object.keys(value.facts).length !== factKeys.length || factKeys.some((key) => !Object.hasOwn(value.facts, key) || (key === "xg_estimate" && value.facts[key] === null ? false : typeof value.facts[key] !== "number" || !Number.isFinite(value.facts[key]) || value.facts[key] < 0 || value.facts[key] > 100000000 || key !== "xg_estimate" && !Number.isSafeInteger(value.facts[key]))) || value.facts.completed_passes > value.facts.passes || value.facts.passes > value.facts.actions || value.facts.shots > value.facts.actions) reject();
    const receipts = value.evidence_receipts;
    if (!Array.isArray(receipts) || receipts.length !== 1) reject();
    const receipt = receipts[0], clip = receipt?.clip;
    if (!safeId(receipt?.receipt_id) || receipt.schema_version !== "evidence-receipt/1.2" || receipt.scope_type !== "attack" || receipt.player_id !== null || receipt.team_id !== input.team_id || receipt.chain_id !== input.chain_id || receipt.match_id !== input.match_id || receipt.as_of_ms !== input.cutoff_ms || !safeId(receipt.anchor_event_id) || !Array.isArray(receipt.event_ids) || !receipt.event_ids.includes(receipt.anchor_event_id) || receipt.event_ids.some((id) => !safeId(id)) || !Array.isArray(receipt.claim_ids) || !clip || !finiteTime(clip.start_ms) || !finiteTime(clip.end_ms) || clip.start_ms > clip.end_ms || clip.end_ms > input.cutoff_ms || clip.cutoff_ms !== input.cutoff_ms || clip.anchor_event_id !== receipt.anchor_event_id) reject();
    const claims = value.claims;
    if (!Array.isArray(claims) || claims.length < 1 || claims.length > 6 || new Set(claims.map((row) => row.id)).size !== claims.length || receipt.claim_ids.length !== claims.length || claims.some((claim) => !safeId(claim?.id) || !receipt.claim_ids.includes(claim.id) || !["start", "progression", "finish", "observed_support"].includes(claim.kind) || !finiteTime(claim.atMs) || claim.atMs > input.cutoff_ms || ["playerIds", "eventIds", "observationIds"].some((key) => !Array.isArray(claim[key]) || claim[key].some((id) => !safeId(id))) || claim.eventIds.some((id) => !receipt.event_ids.includes(id)) || ["casual", "analyst"].some((key) => typeof claim[key] !== "string" || claim[key].length > 4000))) reject();
    const focusKinds = ["recorded_sequence", "recorded_progression", "recorded_finish", "observed_movement"];
    if (!Array.isArray(value.observations) || value.observations.length > 2 || value.observations.some((row) => !safeId(row?.id) || !receipt.observation_ids?.includes(row.id) || !finiteTime(row.start_ms) || !finiteTime(row.end_ms) || row.start_ms > row.end_ms || row.end_ms > input.cutoff_ms || row.quality?.rawVerified !== true || row.quality.cameraCoverage !== 1 || row.quality.heldSamples !== 0 || row.quality.extrapolatedSamples !== 0) || claims.some((claim) => claim.observationIds.some((id) => !value.observations.some((row) => row.id === id)))) reject();
    const focusCandidates = value.focus_candidates;
    if (!Array.isArray(focusCandidates) || focusCandidates.length < 1 || focusCandidates.length > 5 || new Set(focusCandidates.map((row) => row.id)).size !== focusCandidates.length || focusCandidates.some((row) => !exactFields(row, ["id", "kind", "claimIds", "playerIds", "casual", "analyst"]) || !safeId(row.id) || !focusKinds.includes(row.kind) || !Array.isArray(row.claimIds) || row.claimIds.length < 1 || new Set(row.claimIds).size !== row.claimIds.length || row.claimIds.some((id) => !claims.some((claim) => claim.id === id)) || !Array.isArray(row.playerIds) || row.playerIds.some((id) => !value.participants.some((participant) => participant.player_id === id)) || ["casual", "analyst"].some((key) => typeof row[key] !== "string" || row[key].length > 4000))) reject();
    const explanation = value.structured_explanation;
    if (!exactFields(explanation, ["summary_key", "focus", "focus_request", "steps", "limitations"]) || !focusKinds.includes(explanation.summary_key) || !Array.isArray(explanation.steps) || explanation.steps.length !== claims.length || new Set(explanation.steps.map((row) => row.claim_id)).size !== claims.length || !Array.isArray(explanation.limitations) || explanation.limitations.some((row) => !safeId(row?.id) || typeof row.text !== "string")) reject();
    let lastActionTime = -1;
    for (const step of explanation.steps) {
      const claim = claims.find((row) => row.id === step.claim_id);
      if (!claim || !exactFields(step, ["claim_id", "role", "text", "receipt_ids", "event_ids", "observation_ids"]) || step.role !== claim.kind || step.text !== claim[input.mode] || !Array.isArray(step.receipt_ids) || step.receipt_ids.length !== 1 || step.receipt_ids[0] !== receipt.receipt_id || !Array.isArray(step.event_ids) || step.event_ids.some((id) => !claim.eventIds.includes(id)) || !Array.isArray(step.observation_ids) || step.observation_ids.some((id) => !claim.observationIds.includes(id))) reject();
      if (claim.kind !== "observed_support") { if (claim.atMs < lastActionTime) reject(); lastActionTime = claim.atMs; }
    }
    const focus = explanation.focus, focusRequest = explanation.focus_request;
    const candidate = focusCandidates.find((row) => row.id === focus?.candidate_id);
    const sameStep = (actual, expected) => expected && exactFields(actual, ["claim_id", "role", "text", "receipt_ids", "event_ids", "observation_ids"]) && ["claim_id", "role", "text"].every((key) => actual[key] === expected[key]) && ["receipt_ids", "event_ids", "observation_ids"].every((key) => JSON.stringify(actual[key]) === JSON.stringify(expected[key]));
    if (!candidate || !exactFields(focus, ["selection", "candidate_id", "kind", "claim_ids", "text", "basis"]) || !["rule_default", "validated_provider"].includes(focus.selection) || value.cloud_connected && focus.selection !== "validated_provider" || focus.kind !== candidate.kind || focus.kind !== explanation.summary_key || focus.text !== candidate[input.mode] || !Array.isArray(focus.claim_ids) || focus.claim_ids.length !== candidate.claimIds.length || new Set(focus.claim_ids).size !== candidate.claimIds.length || focus.claim_ids.some((id) => !candidate.claimIds.includes(id)) || !Array.isArray(focus.basis) || focus.basis.length !== candidate.claimIds.length || new Set(focus.basis.map((row) => row.claim_id)).size !== candidate.claimIds.length || focus.basis.some((step) => !candidate.claimIds.includes(step.claim_id) || !sameStep(step, explanation.steps.find((row) => row.claim_id === step.claim_id))) || !exactFields(focusRequest, ["requested_kind", "available"]) || typeof focusRequest.available !== "boolean" || focusRequest.requested_kind !== null && !focusKinds.includes(focusRequest.requested_kind) || focusRequest.available !== (focusRequest.requested_kind === null || focusCandidates.some((row) => row.kind === focusRequest.requested_kind)) || focusRequest.requested_kind && (focusRequest.available ? focus.kind !== focusRequest.requested_kind : focus.kind !== "recorded_sequence")) reject();
    if (value.cloud_connected && (value.provider_status !== "model_validated" || value.model_profile !== "gpt-5-mini" || !["azure_openai_responses", "foundry_project_responses", "foundry_resource_responses"].includes(value.provider) || !Array.isArray(value.model_used_receipt_ids) || value.model_used_receipt_ids.length !== 1 || value.model_used_receipt_ids[0] !== receipt.receipt_id)) reject();
    return value;
  }

  async function explainAttack(question, context) {
    await connect();
    const capturedSessionId = session.session_id;
    try {
      let current = validateSession(await request(`sessions/${encodeURIComponent(capturedSessionId)}`));
      for (const delay of [60, 120, 180]) {
        if (context.cutoffMs <= current.visible_cutoff_ms) break;
        await new Promise((resolve) => setTimeout(resolve, delay));
        current = validateSession(await request(`sessions/${encodeURIComponent(capturedSessionId)}`));
      }
      if (context.cutoffMs > current.visible_cutoff_ms) throw new AssistantApiError("visibility_not_ready");
      const input = { session_id: capturedSessionId, match_id: matchId, team_id: context.teamId, chain_id: context.selectedChainId, cutoff_ms: context.cutoffMs, viewer_playhead_ms: context.cutoffMs, question, mode: context.mode, query_id: context.queryId };
      const answer = validateAttackAnswer(await request("assistant/explain-attack", input, 18000), input);
      return { answer, sessionId: capturedSessionId };
    } catch (error) {
      if (["session_expired", "not_authorized", "sign_in_required"].includes(error.code)) { session = null; update({ phase: "unavailable", available: false }); }
      throw error;
    }
  }

  async function resolveReceipt(sessionId, receipt) {
    const result = await request("replay/resolve", { session_id: sessionId, receipt_id: receipt.receipt_id }, 4000);
    // Re-opening an old answer must resolve its original receipt, never a newer clip.
    if (result?.as_of_ms !== receipt.as_of_ms || JSON.stringify(result.receipt) !== JSON.stringify(receipt) || JSON.stringify(result.clip) !== JSON.stringify(receipt.clip)) throw new AssistantApiError("invalid_response");
    return result.receipt;
  }

  return Object.freeze({ connect, query, explainAttack, resolveReceipt, getState: () => status });
}
