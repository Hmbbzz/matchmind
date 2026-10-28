import { unsupportedPassingDetail, PASSING_DETAIL_LIMIT } from '../public/question-intent.js';
export const ANSWER_TOPICS = Object.freeze(['passing', 'crossing', 'shooting']);
export const SUMMARY_TOPIC = 'player_summary';
const allFactKeys = ['passes_attempted', 'passes_completed', 'pass_outcomes_known', 'pass_completion', 'crosses_attempted', 'crosses_completed', 'cross_outcomes_known', 'cross_completion', 'shots', 'xg_estimate', 'xg_samples', 'xg_missing'];
export const TOPIC_FACT_KEYS = Object.freeze({
  passing: Object.freeze(['passes_attempted', 'passes_completed', 'pass_outcomes_known', 'pass_completion']),
  crossing: Object.freeze(['crosses_attempted', 'crosses_completed', 'cross_outcomes_known', 'cross_completion']),
  shooting: Object.freeze(['shots', 'xg_estimate', 'xg_samples', 'xg_missing']),
  player_summary: Object.freeze(allFactKeys),
});
export const TOPIC_ATTEMPT_KEY = Object.freeze({ passing: 'passes_attempted', crossing: 'crosses_attempted', shooting: 'shots' });
export function requiredEvidenceTopics(topic, facts) {
  const topics = topic === SUMMARY_TOPIC ? ANSWER_TOPICS : ANSWER_TOPICS.includes(topic) ? [topic] : [];
  return Object.freeze(topics.filter((item) => facts[TOPIC_ATTEMPT_KEY[item]] > 0));
}
const TOPIC_PATTERNS = Object.freeze({ passing: /\bpass(?:es|ing)?\b/i, crossing: /\b(?:cross(?:es|ing)?|cut[- ]?backs?)\b|传中/i, shooting: /\b(?:shots?|shoot(?:ing)?|xg|expected goals)\b/i });
const OUT_OF_SCOPE = /\b(?:tir(?:ed|ing)|fatigue|fitness|stamina|physical|speed|acceleration|sprint|distance|injur\w*|histor\w*|previous|prior|baseline|season|career|yesterday|last\s+(?:(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+)?(?:matches|games)|predict\w*|forecast\w*|future|probabilit\w*|will\s+\w+|tactic\w*|formation|press(?:ing)?|possession|off[- ]ball|running|runs?|score|scor(?:ed|ing)|goals?|on[- ]target|conversion|assist\w*|market|value|salary|weather|compar\w*|versus|vs|than|another\s+player|other\s+player|teammates?)\b|体能|疲劳|历史|预测|阵型|战术|比分/i;
const INSTRUCTION_OVERRIDE = /\b(?:ignore|disregard|override)\b|\b(?:change|replace|advance)\b.{0,40}\b(?:cutoff|scope|player|endpoint)\b|\b(?:credentials?|api[- ]?key|system prompt|read files?)\b/i;
const NON_FOOTBALL_OR_OTHER_SUBJECT = /\b(?:films?|movies?|photos?|photography|cameras?|vaccin\w*|injections?|drugs?|guns?|bullets?|exams?|passwords?|passports?|stocks?|whisk(?:e)?y|tequila|espresso|price|worth|money|team\s+(?:total|stats|statistics)|(?:home|away|our|another|other)\s+team)\b/i;
const SUMMARY_QUESTION = /^(?:summari[sz]e(?: (?:this|the|selected))?(?: player)?|(?:player )?(?:summary|stats|statistics|overview)|how (?:is (?:this player|the player|he|she)(?: (?:doing|playing|performing))?|has (?:this player|the player|he|she) (?:played|performed))|what has (?:this player|he|she) done(?: so far)?)$/i;
const frozenScope = (status, topic, reason) => Object.freeze({ status, topic, reason, supported_topics: ANSWER_TOPICS });

// Finite keyword routing, deliberately not arbitrary semantic understanding.
export function classifyQuestion(question) {
  if (typeof question !== 'string' || !question.trim() || question.length > 4000) throw new TypeError('A bounded question is required.');
  if (INSTRUCTION_OVERRIDE.test(question)) return frozenScope('unsupported', null, 'instruction_override');
  if (unsupportedPassingDetail(question)) return frozenScope('unsupported', null, 'unsupported_qualified_passing_measure');
  const reduced = question.replace(/expected goals/gi, 'xg');
  if (OUT_OF_SCOPE.test(reduced) || NON_FOOTBALL_OR_OTHER_SUBJECT.test(reduced)) return frozenScope('unsupported', null, 'outside_supported_metrics');
  const topics = ANSWER_TOPICS.filter((topic) => TOPIC_PATTERNS[topic].test(reduced));
  if (topics.includes('shooting') && /\b(?:percentage|accuracy|success\s+rate|completion)\b/i.test(reduced)) return frozenScope('unsupported', null, 'unsupported_shooting_measure');
  if (topics.length > 1) return frozenScope('supported', SUMMARY_TOPIC, 'combined_supported_topics');
  if (!topics.length) return SUMMARY_QUESTION.test(question.trim().replace(/[?.!]+$/, '').trim().replace(/\s+/g, ' ')) ? frozenScope('supported', SUMMARY_TOPIC, 'finite_summary_template') : frozenScope('unsupported', null, 'unrecognized_question');
  return frozenScope('supported', topics[0], 'finite_keyword_match');
}

export function eventTopics(event, playerId) {
  if (event?.player !== playerId) return Object.freeze([]);
  if (event.type === 'shot') return Object.freeze(['shooting']);
  if (event.type !== 'pass') return Object.freeze([]);
  return Object.freeze(['passing', ...(['cross', 'cutback'].includes(event.q?.pass_type) ? ['crossing'] : [])]);
}
export function eventSupportsTopic(event, playerId, topic) {
  const topics = eventTopics(event, playerId);
  return topic === SUMMARY_TOPIC ? topics.length > 0 : topics.includes(topic);
}

// The caller supplies only authorized visible events; actors, not receivers, support counts.
export function deriveReceiptSupport(events, playerId) {
  if (!Array.isArray(events) || typeof playerId !== 'string') throw new TypeError('Visible events and player ID are required.');
  const topic_event_ids = Object.fromEntries(ANSWER_TOPICS.map((topic) => [topic, []]));
  for (const event of events) for (const topic of eventTopics(event, playerId)) if (typeof event.id === 'string' && !topic_event_ids[topic].includes(event.id)) topic_event_ids[topic].push(event.id);
  for (const ids of Object.values(topic_event_ids)) Object.freeze(ids);
  return Object.freeze({ supported_topics: Object.freeze(ANSWER_TOPICS.filter((topic) => topic_event_ids[topic].length > 0)), topic_event_ids: Object.freeze(topic_event_ids) });
}

export function scopeReply(answerability, { playerName = 'the selected player', cutoffClock = 'the frozen cutoff' } = {}) {
  const scope = ` Selected player: ${playerName}, through ${cutoffClock}.`;
  if (answerability.reason === 'unsupported_qualified_passing_measure') return PASSING_DETAIL_LIMIT + scope;
  if (answerability.reason === 'question_actor_mismatch') return 'This question names a different player. No player has been substituted.' + scope;
  if (answerability.reason === 'multiple_question_actors') return 'These records do not establish a cross-player comparison.' + scope;
  if (answerability.reason === 'ambiguous_actor_name') return 'That name does not identify a unique player.' + scope;
  if (answerability.reason === 'unsupported_shooting_measure') return 'This view provides shot counts and position-based estimated xG; a shot-accuracy breakdown is not provided.' + scope;
  return 'This view provides passes, crosses, shots and estimated xG. The requested breakdown is not provided.' + scope;
}
