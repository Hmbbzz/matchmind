import { TOPIC_FACT_KEYS, TOPIC_ATTEMPT_KEY, SUMMARY_TOPIC, classifyQuestion, requiredEvidenceTopics } from './question-scope.mjs';
import { resolveModelProfile } from './model-profiles.mjs';
import { formatMatchClock } from './answer-display.mjs';
import { playerAnswer } from '../public/display-copy.js';

export const PROMPT_VERSION = 'matchmind-prompt/2.1';
export const ANSWER_SCHEMA_VERSION = 'matchmind-answer/2.0';
export const NUMERIC_FACT_KEYS = Object.freeze(['passes_attempted', 'passes_completed', 'pass_outcomes_known', 'pass_completion', 'crosses_attempted', 'crosses_completed', 'cross_outcomes_known', 'cross_completion', 'shots', 'xg_estimate', 'xg_samples', 'xg_missing']);
export const SAFE_SUMMARIES = Object.freeze([
  'Only recorded actions in the frozen snapshot are described.',
  'This is a descriptive sample, not a judgment of ability.',
  'No recorded actions for this topic are available at the frozen cutoff.',
  'The available snapshot cannot establish the broader claim in the question.',
  'Some required observations are unavailable.',
]);
const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) { Object.values(value).forEach(deepFreeze); Object.freeze(value); }
  return value;
};
export class ModelContractError extends Error {
  constructor(code = 'invalid_model_output') { super('Model output did not satisfy the frozen fact contract.'); this.name = 'ModelContractError'; this.code = code; }
}
const reject = () => { throw new ModelContractError(); };
function exactKeys(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))) reject();
}


export function buildFactPacket(snapshot, question) {
  if (typeof question !== 'string' || !question.trim() || question.length > 4000 || !snapshot?.context || !Number.isSafeInteger(snapshot.as_of_ms)) throw new TypeError('A validated frozen rules snapshot and bounded question are required.');
  const topic = snapshot.answerability?.topic;
  const scope = classifyQuestion(question);
  if (snapshot.answerability?.status !== 'supported' || scope.topic !== topic || !TOPIC_FACT_KEYS[topic]) throw new TypeError('A supported trusted question topic is required.');
  const keys = TOPIC_FACT_KEYS[topic];
  const facts = {};
  for (const key of keys) {
    const value = snapshot.facts?.[key];
    if (value !== null && (typeof value !== 'number' || !Number.isFinite(value))) throw new TypeError('Invalid frozen fact.');
    facts[key] = value;
  }
  const attempts = topic === SUMMARY_TOPIC ? facts.passes_attempted + facts.shots : facts[TOPIC_ATTEMPT_KEY[topic]];
  const requiredTopics = requiredEvidenceTopics(topic, facts);
  if (JSON.stringify(snapshot.required_evidence_topics) !== JSON.stringify(requiredTopics)) throw new TypeError('Invalid trusted evidence requirements.');
  const evidence = snapshot.evidence_receipts.filter((receipt) => topic === SUMMARY_TOPIC ? receipt.supported_topics?.length > 0 : receipt.supported_topics?.includes(topic)).map((receipt) => {
    if (!receipt.topic_event_ids || !receipt.supported_topics.every((item) => Array.isArray(receipt.topic_event_ids[item]) && receipt.topic_event_ids[item].length > 0 && receipt.topic_event_ids[item].every((id) => receipt.event_ids.includes(id)))) throw new TypeError('Invalid trusted receipt topic support.');
    return { receipt_id: receipt.receipt_id, anchor_event_id: receipt.anchor_event_id, event_ids: [...receipt.event_ids], supported_topics: [...receipt.supported_topics], topic_event_ids: structuredClone(receipt.topic_event_ids), as_of_ms: receipt.as_of_ms, clip: { start_ms: receipt.clip.start_ms, end_ms: receipt.clip.end_ms, cutoff_ms: receipt.clip.cutoff_ms } };
  });
  if (attempts > 0 && evidence.length === 0) throw new TypeError('Observed actions require representative topic evidence.');
  if (requiredTopics.some((item) => !evidence.some((receipt) => receipt.supported_topics.includes(item) && receipt.topic_event_ids[item]?.length > 0))) throw new TypeError('Representative evidence is missing a required topic.');
  // Never include the local bearer session ID, whole match, raw events or caller-provided metadata.
  return deepFreeze({
    schema_version: 'frozen-player-facts/2.0', topic, required_fact_keys: [...keys], required_evidence_topics: [...requiredTopics], observed_attempts: attempts,
    presentation_mode: snapshot.mode ?? 'analyst',
    scope: { match_id: snapshot.context.match_id, player_id: snapshot.context.player_id, cutoff_ms: snapshot.as_of_ms },
    player: { name: snapshot.player.name, position: snapshot.player.position },
    facts,
    methodology: ['Counts are recorded completed actions known at the frozen cutoff.', 'Completion ratios use known outcomes; null is not zero.', 'xG is a position-only demo estimate.', 'No physical, historical, tactical or predictive analysis is available in this packet.'],
    evidence,
    source_version: snapshot.source_version,
  });
}

export function buildResponsesBody(bundle, packet, { model, maxOutputTokens = 700, modelProfile, reasoningEffort, question } = {}) {
  const profile = resolveModelProfile({ profile: modelProfile, reasoningEffort });
  if (![PROMPT_VERSION, 'matchmind-attack-prompt/1.0'].includes(bundle?.version) || typeof model !== 'string' || !model || typeof question !== 'string') throw new TypeError('Prompt bundle, configured deployment, bounded model profile and question are required.');
  return {
    model, instructions: bundle.systemPrompt,
    input: [{ role: 'user', content: [{ type: 'input_text', text: JSON.stringify({ untrusted_question: question, frozen_fact_packet: packet }) }] }],
    text: { format: { type: 'json_schema', name: bundle.kind === 'attack' ? 'matchmind_attack_answer_v1' : 'matchmind_answer_v2', strict: true, schema: bundle.schema } },
    reasoning: { effort: profile.reasoningEffort },
    tools: [], tool_choice: 'none', store: false, stream: false, max_output_tokens: maxOutputTokens,
  };
}

export function validateModelAnswer(candidate, packet, question = '') {
  exactKeys(candidate, ['schema_version', 'scope', 'topic', 'summary', 'fact_claims', 'receipt_ids']);
  if (candidate.schema_version !== ANSWER_SCHEMA_VERSION || !SAFE_SUMMARIES.includes(candidate.summary)) reject();
  const required = TOPIC_FACT_KEYS[packet.topic];
  if (!required || candidate.topic !== packet.topic || JSON.stringify(packet.required_fact_keys) !== JSON.stringify(required)) reject();
  exactKeys(candidate.scope, ['match_id', 'player_id', 'cutoff_ms']);
  for (const key of ['match_id', 'player_id', 'cutoff_ms']) if (candidate.scope[key] !== packet.scope[key]) reject();
  if (!Array.isArray(candidate.fact_claims) || candidate.fact_claims.length !== required.length) reject();
  const seen = new Set();
  for (const claim of candidate.fact_claims) {
    exactKeys(claim, ['key', 'value']);
    if (!required.includes(claim.key) || seen.has(claim.key) || claim.value !== packet.facts[claim.key]) reject();
    seen.add(claim.key);
  }
  if (!Array.isArray(candidate.receipt_ids) || candidate.receipt_ids.length > packet.evidence.length || new Set(candidate.receipt_ids).size !== candidate.receipt_ids.length || candidate.receipt_ids.some((id) => !packet.evidence.some((item) => item.receipt_id === id && (packet.topic === SUMMARY_TOPIC ? item.supported_topics.some((topic) => item.topic_event_ids[topic]?.length > 0) : item.supported_topics.includes(packet.topic) && item.topic_event_ids[packet.topic]?.length > 0)))) reject();
  if (packet.observed_attempts > 0 ? candidate.receipt_ids.length === 0 : candidate.receipt_ids.length !== 0) reject();
  const requiredTopics = requiredEvidenceTopics(packet.topic, packet.facts);
  if (JSON.stringify(packet.required_evidence_topics) !== JSON.stringify(requiredTopics) || requiredTopics.some((topic) => !packet.evidence.some((item) => candidate.receipt_ids.includes(item.receipt_id) && item.supported_topics.includes(topic) && item.topic_event_ids[topic]?.length > 0))) reject();
  if (candidate.summary === SAFE_SUMMARIES[2] && packet.observed_attempts !== 0) reject();
  if (candidate.summary === SAFE_SUMMARIES[4] && !Object.values(packet.facts).includes(null) && !(packet.facts.xg_missing > 0)) reject();
  return deepFreeze(structuredClone(candidate));
}

export function renderModelAnswer(candidate, packet, { question = '', matchTimeContext } = {}) {
  // Candidate facts have already passed exact validation; only prose is compact.
  return playerAnswer({ name:packet.player.name, clock:formatMatchClock(packet.scope.cutoff_ms), topic:packet.topic, facts:packet.facts, mode:packet.presentation_mode, question, cutoffMs:packet.scope.cutoff_ms, matchId:packet.scope.match_id, matchTimeContext });
}

// Fixed, build-time text only. No file access or caller-provided prompt is accepted here.
export function createPromptBundle(system, schemaText, sha256) {
  const bytes = (value) => new TextEncoder().encode(value).byteLength;
  if (typeof system !== 'string' || typeof schemaText !== 'string' || !system.includes(PROMPT_VERSION) || bytes(system) > 16_384 || bytes(schemaText) > 16_384 || !/^[a-f0-9]{64}$/.test(sha256)) throw new TypeError('Invalid prompt bundle.');
  const schema = JSON.parse(schemaText);
  if (JSON.stringify(schema.properties?.summary?.enum) !== JSON.stringify(SAFE_SUMMARIES) || JSON.stringify(schema.properties?.fact_claims?.items?.properties?.key?.enum) !== JSON.stringify(NUMERIC_FACT_KEYS) || schema.properties?.schema_version?.enum?.[0] !== ANSWER_SCHEMA_VERSION) throw new TypeError('Prompt schema does not match the local validator.');
  return deepFreeze({ version: PROMPT_VERSION, systemPrompt: system, schema, sha256 });
}
