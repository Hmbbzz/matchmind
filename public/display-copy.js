// Presentation only: never changes stored snapshots, facts, references or IDs.
export const COPY_LIMITS = Object.freeze({ casual: 55, analyst: 90, story: 40, chapter: 45 });
export const wordCount = text => String(text).trim().split(/\s+/u).filter(Boolean).length;
export const EARLY_CONTEXT_MS = 300000;
export function isEarlyContext({ cutoffMs, count, matchId, matchTimeContext } = {}) {
  const m = matchTimeContext;
  return typeof matchId === 'string' && m?.match_id === matchId && Number.isSafeInteger(m.duration_ms) && m.duration_ms > 0
    && Number.isSafeInteger(m.second_half_stream_start_ms) && m.second_half_stream_start_ms > 0 && m.second_half_stream_start_ms < m.duration_ms
    && Number.isSafeInteger(m.second_half_clock_start_ms) && m.second_half_clock_start_ms >= 0 && m.second_half_clock_start_ms < m.duration_ms
    && Number.isSafeInteger(cutoffMs) && cutoffMs >= 0 && cutoffMs < EARLY_CONTEXT_MS && cutoffMs < m.second_half_stream_start_ms
    && Number.isSafeInteger(count) && count >= 0 && count <= 1;
}
export const asksPerformance = question => /\b(?:perform\w*|playing|doing|ability|improv\w*|form|good|bad|compare|comparison|trend)\b/i.test(question || '');
// Numeric xG/expected-goals requests alone do not ask for a quality verdict.
export const asksShotQuality = question => /\b(?:quality|good)\b/i.test(question || '');
export function sampleContextCopy({ cutoffMs, count, label, matchId, matchTimeContext }) {
  const early = isEarlyContext({ cutoffMs, count, matchId, matchTimeContext });
  const words = count === 1 ? label.replace('passes or shots','pass or shot').replace('attempts','attempt').replace('shots','shot') : label;
  return visibleCopy(`${early ? 'The match has just begun; ' : ''}${count} recorded ${words} cannot establish a performance trend.`);
}

const nounForms = Object.freeze({ pass:'passes', cross:'crosses', shot:'shots', action:'actions', observation:'observations', chapter:'chapters', attack:'attacks', link:'links', movement:'movements', outcome:'outcomes', attempt:'attempts', run:'runs', card:'cards', substitution:'substitutions', tag:'tags', match:'matches' });
const nounRoots = Object.freeze(Object.fromEntries(Object.entries(nounForms).flatMap(([one, many]) => [[one, one], [many, one]])));
// Change only the noun's form. Ratios use their denominator; digits and qualifiers
// stay verbatim, and decimal values/timestamps cannot be mistaken for a count.
function countGrammar(value) {
  return value.replace(/(?<![\d./:-])\b(\d+(?:\/\d+)?)\s+((?:(?:recorded|completed|known|missing|valid|camera|detected|observed|receiving|evidence|personal|source|active|threatening|off-ball|on-ball|goal|pass|cross|camera-observed|camera-detected)\s+)*)(passes|pass|crosses|cross|shots?|actions?|observations?|chapters?|attacks?|links?|movements?|outcomes?|attempts?|runs?|cards?|substitutions?|tags?|matches|match)\b/gi, (_, count, qualifiers, noun) => {
    const root = nounRoots[noun.toLowerCase()], form = Number(count.split('/').at(-1)) === 1 ? root : nounForms[root];
    return `${count} ${qualifiers}${noun[0] === noun[0].toUpperCase() ? form[0].toUpperCase() + form.slice(1) : form}`;
  });
}

export function visibleCopy(value) {
  return countGrammar(String(value ?? '')
    .replace(/SkillCorner event completion simulates availability; provider available_at and revision handling are not implemented\./gi, 'Actions appear after they finish.')
    .replace(/The existing static website still distributes full-match files\. This API does not resolve site-wide GAP-01\./gi, 'This is a full-match replay.')
    .replace(/Historical SkillCorner replay, streamed as simulated live\. The static full-match assets remain downloadable\./gi, 'This is a match replay; saved stories keep their original evidence.')
    .replace(/(?:No model provider is configured for this service; no model was called for this question\.|No model was called for this question\.|No real cloud inference was verified for this answer\.|No cloud explanation was verified for this answer\.)/gi, 'Based on match facts.')
    .replace(/This answer uses (?:deterministic local rules|an injected provider contract result)\./gi, 'Based on match facts.')
    .replace(/This answer uses validated model-selected facts and server-rendered values\./gi, 'AI insight grounded in match records.')
    .replace(/Finite topic templates and server-rendered quantities; no free-form football reasoning or conversation memory\./gi, 'Only supported match details are included.')
    .replace(/Validation checks exact topic facts and topic-compatible representative references; it cannot prove arbitrary semantic relevance or causality\./gi, 'The records do not establish intent or causation.')
    .replace(/Rule-based chronology and thematic links; no new model inference is claimed for this story\./gi, 'Chapters follow the recorded actions and evidence.')
    .replace(/(?:The cloud endpoint supports|Cloud scope is)[^.]*\./gi, 'Only supported match details are included.')
    .replace(/(?:No validated model answer was available for this question; this answer uses rules|This answer uses local demo rules|No model was called|Rule-based default focus)\.?/gi, '')
    .replace(/\bSkillCorner(?:\s+Open Data)?\b|\bOpen\s*Data\b/gi, 'match records')
    .replace(/\bopen[- ]data\b/gi, 'available')
    .replace(/\bprovider[- ]extrapolated\b/gi, 'estimated')
    .replace(/\bprovider[- ]tagged\b|\bprovider event tag\b/gi, 'recorded')
    .replace(/\bprovider\b/gi, 'record')
    .replace(/\b(?:position-only|position-based) (?:demo |demonstration )?estimate\b/gi, 'position-based estimate')
    .replace(/\b(?:demo|demonstration) estimate\b/gi, 'estimate')
    .replace(/\brule[- ]based forecast\b/gi, 'forecast estimate')
    .replace(/\brule classifier\b/gi, 'pattern estimate')
    .replace(/\brule confidence\b/gi, 'pattern confidence')
    .replace(/\brule inference\b/gi, 'estimate')
    .replace(/\brule[- ](?:based|composed)\b/gi, 'recorded')
    .replace(/\b(?:local|server|browser|deterministic) rules\b/gi, 'match facts')
    .replace(/\bsimulated[- ]live\b|\bsimulated live\b|\bhistorical replay\b/gi, 'match replay')
    .replace(/\bfixtures\b/gi, 'matches')
    .replace(/\bbaseline\b/gi, 'comparison')
    .replace(/\bextrapolated (?:positions|guesses)\b/gi, 'estimated positions')
    .replace(/\bsource events?\b/gi, 'recorded actions')
    .replace(/\bsource records?\b/gi, 'match records')
    .replace(/\bsource links?\b/gi, 'evidence links')
    .replace(/\bfrozen snapshot\b/gi, 'fixed story')
    .replace(/\bfrozen story\b/gi, 'fixed story')
    .replace(/\bserver[- ]saved\b/gi, 'saved')
    .replace(/\blive story\b/gi, 'current story')
    .replace(/\bposition model\b/gi, 'position estimate')
    .replace(/\b(?:raw|native) camera observations\b/gi, 'camera observations')
    .replace(/\b(?:raw|native) camera (?:detections|samples)\b/gi, 'camera observations')
    .replace(/\bdemo\b/gi, '')
    .replace(/\bcloud\b/gi, 'AI')
    .replace(/\bAPI\b/gi, 'service')
    .replace(/\bendpoint\b/gi, 'feature')
    .replace(/\b(?:Worker|D1)\b/g, 'storage')
    .replace(/\bon the server\b|\bon server\b/gi, '')
    .replace(/\bserver storage\b/gi, 'Saving')
    .replace(/\bserver confirmation\b/gi, 'Confirmation')
    .replace(/\bserver save\b/gi, 'save')
    .replace(/\bthe server\b/gi, 'Matchmind')
    .replace(/\bRule match\b/gi, 'Pattern estimate')
    .replace(/\bsamples\b/gi, 'observations')
    .replace(/[ \t]{2,}/g, ' ').trim());
}

const sentences = text => text.split(/(?<!\b[A-Z]\.)(?<=[.!?])\s+(?=[A-Z0-9])/u).filter(Boolean);
export function compactCopy(value, budget = 55, maximumSentences = 2, { includeGenericLimit = true, includeForecastCalibration = true } = {}) {
  const text = visibleCopy(value).replace(/\s+/gu, ' ').trim();
  if (wordCount(text) <= budget && sentences(text).length <= maximumSentences) return text;
  const options = sentences(text), chosen = [];
  // Select whole statements. Never slice numeric facts, JSON or a refusal.
  for (const sentence of options) {
    if (chosen.length >= maximumSentences) break;
    if (wordCount([...chosen, sentence].join(' ')) <= budget) chosen.push(sentence);
    else if (!chosen.length) {
      const clause = sentence.split(';')[0].trim();
      if (wordCount(clause) <= budget) chosen.push(/[.!?]$/.test(clause) ? clause : `${clause}.`);
    }
  }
  const note = includeForecastCalibration && /forecast|probabilit/i.test(text) ? 'This estimate is uncalibrated.'
    : includeGenericLimit && /(?:intent|causal|causation|tactical effect)/i.test(text) ? 'Intent and tactical effect are not established.'
      : /(?:selected|three).*(?:pre-match|earlier|matches)|full schedule/i.test(text) ? 'Only selected earlier matches are included.' : '';
  if (note && !chosen.some(row => /uncalibrat|intent|causal|selected earlier/i.test(row))) {
    while (chosen.length && (chosen.length >= maximumSentences || wordCount([...chosen, note].join(' ')) > budget)) chosen.pop();
    if (wordCount([...chosen, note].join(' ')) <= budget) chosen.push(note);
  }
  return chosen.join(' ') || 'The full match details are in the evidence below.';
}

// Primary prose only. Full claim/limitation objects remain in the evidence.
export function attackQuestionLimit(question, hasPossessionGap = false) {
  const touch = /\b(?:no[- ]touch|without (?:a )?touch|never touch|touch(?:ed|ing)? (?:the )?ball|(?:really|actually) off[- ]ball)\b/i.test(question);
  const possession = /\bpossession\b|\bwho (?:had|has|held|holds|controlled|controls|owned|owns|is holding|was holding|is on|was on) (?:the )?ball\b|\bball[- ]owner(?:ship)?\b/i.test(question);
  if (touch) return 'The off-ball label records a run; it is not a verified record of every touch during that interval.';
  if (possession) return hasPossessionGap ? 'The actions identify their actors, but ball ownership is not recorded throughout this movement.' : 'Recorded actions identify their actors, but do not track continuous ball ownership between them.';
  if (/\b(?:intent|intend(?:ed)?|deliberate(?:ly)?|trying|meant|purpose)\b/i.test(question)) return 'Action records do not include direct evidence of what the player intended.';
  if (/\bpull(?:ed|ing)?\b.{0,35}\bdefender|\b(?:force|forced|draw|drew)\b.{0,35}\bdefender/i.test(question)) return 'Movement alone does not link a defender’s response to this player’s action.';
  if (/\bcreat(?:e|ed|ing)\b.{0,20}\bspace\b/i.test(question)) return 'Position geometry alone does not show that this movement created space for a teammate.';
  if (/\b(?:why|caus(?:e|ed|al|ation)|because|effect|impact|contribut(?:e|ed|ion)|help(?:ed)?|influenc\w*)\b|\b(?:lead|led) to\b/i.test(question)) return 'The sequence records actions; it does not include evidence verifying a tactical cause.';
  return '';
}
export function attackMainText({ text, question = '', mode = 'casual', prefix = '', missingFocus = '', hasPossessionGap = false }) {
  const limit = attackQuestionLimit(question, hasPossessionGap), budget = COPY_LIMITS[mode] || COPY_LIMITS.casual;
  if (missingFocus) return `${prefix}${visibleCopy(missingFocus)}${limit ? ` ${limit}` : ''}`.trim();
  const factual = sentences(visibleCopy(text)).filter(sentence => !/^(?:Possession (?:and tactical effect|owner|ownership)|Intent and|These actions do not establish|This is a sequence description|The source establishes|Movement is observed;|Its effect on the attack is unknown|Recorded (?:events and camera movement|observations) (?:only|do not)|No claim that)/i.test(sentence)).join(' ');
  const room = Math.max(12, budget - wordCount(prefix) - wordCount(limit));
  const focus = compactCopy(factual, room, mode === 'analyst' ? 2 : 1, { includeGenericLimit:false });
  return `${prefix}${focus}${limit ? ` ${limit}` : ''}`.trim();
}

export function playerAnswer({ name, clock, topic, facts: f, mode = 'casual', question = '', cutoffMs, matchId, matchTimeContext }) {
  const rate = value => value == null ? 'unavailable' : `${(value * 100).toFixed(1)}%`;
  const xg = f.xg_estimate == null ? 'unavailable' : Number(f.xg_estimate).toFixed(3);
  let text;
  if (topic === 'passing') text = `By ${clock}, ${name}: ${f.passes_completed}/${f.passes_attempted} passes completed; completion ${rate(f.pass_completion)} (${f.pass_outcomes_known} known outcomes).`;
  else if (topic === 'crossing') text = `By ${clock}, ${name}: ${f.crosses_completed}/${f.crosses_attempted} crosses completed; completion ${rate(f.cross_completion)} (${f.cross_outcomes_known} known outcomes).`;
  else if (topic === 'shooting') text = `By ${clock}, ${name}: ${f.shots} shots; estimated xG ${xg} (${f.xg_samples} valid, ${f.xg_missing} missing observations). This is a position-based estimate.`;
  else text = `By ${clock}, ${name}: ${f.passes_completed}/${f.passes_attempted} passes completed (${rate(f.pass_completion)}, ${f.pass_outcomes_known} known), ${f.crosses_completed}/${f.crosses_attempted} crosses completed (${rate(f.cross_completion)}, ${f.cross_outcomes_known} known), and ${f.shots} shots. Estimated xG ${xg} (${f.xg_samples} valid, ${f.xg_missing} missing observations).`;
  let reason = '';
  const performance = asksPerformance(question), rateRequest = /\b(?:completion|percentage|rate)\b/i.test(question), qualityRequest = asksShotQuality(question), xgRequest = /\b(?:xg|expected goals)\b/i.test(question);
  const attempts = topic === 'passing' ? f.passes_attempted : topic === 'crossing' ? f.crosses_attempted : topic === 'shooting' ? f.shots : f.passes_attempted + f.shots;
  if ((performance || rateRequest) && (topic === 'passing' || topic === 'player_summary') && f.passes_attempted > 0 && f.pass_outcomes_known === 0) reason = 'Pass outcomes are unrecorded, so no completion rate can be calculated.';
  else if ((performance || rateRequest) && (topic === 'crossing' || topic === 'player_summary') && f.crosses_attempted > 0 && f.cross_outcomes_known === 0) reason = 'Cross outcomes are unrecorded, so no completion rate can be calculated.';
  else if ((performance || qualityRequest || xgRequest) && (topic === 'shooting' || topic === 'player_summary') && f.shots > 0 && f.xg_samples === 0) reason = `None of the ${f.shots} recorded shots has a valid xG estimate in these records.`;
  else if ((performance || qualityRequest) && topic === 'shooting' && f.shots === 0) reason = `${isEarlyContext({cutoffMs,count:0,matchId,matchTimeContext}) ? 'The match has just begun; no' : 'No'} shot is recorded for this player, so there is no shot-quality sample.`;
  else if (performance && (topic !== 'shooting' || !qualityRequest) && attempts <= 1) reason = sampleContextCopy({cutoffMs,count:attempts,label:topic === 'player_summary' ? 'passes or shots' : topic === 'passing' ? 'pass attempts' : topic === 'crossing' ? 'cross attempts' : 'shots',matchId,matchTimeContext});
  if (reason) {
    if (topic === 'shooting') text = text.replace('This is a position-based estimate.', reason);
    else if (topic === 'player_summary') text = `${text.slice(0,-1)}; ${reason}`;
    else text += ` ${reason}`;
  }
  return visibleCopy(text);
}

export function storyIntro(snapshot, clock, { matchTimeContext } = {}) {
  const s = snapshot.summary, name = snapshot.player.name;
  return visibleCopy(s.chapter_count ? `Through ${clock}, ${name}: ${s.recorded_actions} recorded actions, ${s.recorded_receptions} receiving links, ${s.camera_observations} observed movements and ${s.completed_attacks} completed attacks. Replay each chapter to see the evidence.`
    : `${isEarlyContext({cutoffMs:snapshot.cutoff_ms,count:0,matchId:snapshot.match.match_id,matchTimeContext}) ? 'The match has just begun; no' : 'No'} completed records qualify for ${name}’s story through ${clock}. Missing records do not mean inactivity.`);
}
export function storyChapter(chapter, name) {
  const f = chapter.facts;
  if (chapter.kind === 'camera_observation') return visibleCopy(`${name} moved ${Number(f.displacement_m).toFixed(2)} m across ${f.camera_detected_samples}/${f.total_samples} camera observations. Movement does not establish intent or tactical effect.`);
  if (chapter.kind === 'recorded_reception') return `${name} was named as the receiver of a completed pass. The next touch is not verified.`;
  if (chapter.kind === 'completed_attack') return visibleCopy(`${name} had ${f.personal_source_links} evidence links in a ${f.passes}-pass sequence (${f.completed_passes} complete, ${f.shots} shots). Participation does not establish a caused chance.`);
  if (f.action_type === 'shot') return f.xg_estimate == null ? `${name} took a recorded shot, but no valid xG estimate is recorded for it.` : `${name} took a recorded shot. Estimated xG: ${Number(f.xg_estimate).toFixed(2)}; shot placement and intent are not established.`;
  return `${name}: recorded ${f.action_type}. ${f.outcome == null ? 'Its outcome is not recorded.' : `Outcome: ${f.outcome}.`}`;
}

// Covers late dialog/error/aria updates without mutating machine attributes or
// the user's own typed messages. Transformations are idempotent and only write
// changed text, so the observer settles after its own presentation updates.
export function observeVisibleCopy(root) {
  if (!root || typeof MutationObserver === 'undefined') return;
  const apply = node => {
    if (node.nodeType === 3) {
      if (node.parentElement?.closest('script,style,textarea,svg,canvas,.user-message')) return;
      const next = visibleCopy(node.nodeValue); if (next !== node.nodeValue.trim()) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== 1 || node.matches('script,style,textarea,svg,canvas,.user-message')) return;
    for (const name of ['title','aria-label','aria-description','placeholder','alt']) {
      const value = node.getAttribute(name); if (value !== null) { const next = visibleCopy(value); if (next !== value) node.setAttribute(name, next); }
    }
    for (const child of node.childNodes) apply(child);
  };
  apply(root);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'childList') for (const node of record.addedNodes) apply(node);
      else apply(record.target);
    }
  });
  observer.observe(root, { subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['title','aria-label','aria-description','placeholder','alt'] });
  return observer;
}
