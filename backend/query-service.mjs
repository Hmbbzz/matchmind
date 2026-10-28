const randomUUID = () => crypto.randomUUID();
import { classifyQuestion, TOPIC_FACT_KEYS, eventSupportsTopic, deriveReceiptSupport, scopeReply, SUMMARY_TOPIC, requiredEvidenceTopics } from './question-scope.mjs';
import { ATTACK_API_VERSION, buildAttackPacket, defaultAttackAnswer, renderAttackAnswer, renderAttackExplanation } from './attack-contract.mjs';
import { checkQuestionActor } from './actor-scope.mjs';
import { formatMatchClock, RULE_ANSWER_LIMITATION } from './answer-display.mjs';
import { playerAnswer } from '../public/display-copy.js';

export const API_VERSION = 'matchmind-local-rules/1.1';
const LIMITATIONS = Object.freeze([
  RULE_ANSWER_LIMITATION,
  'SkillCorner event completion simulates availability; provider available_at and revision handling are not implemented.',
  'The existing static website still distributes full-match files. This API does not resolve site-wide GAP-01.',
  'Crosses use converted cross/cutback flags. xG is a position-only demo estimate; shot outcomes are inferred.',
  'Tracking, physical condition and historical comparisons are not provided by this endpoint.',
]);

export class ApiError extends Error {
  constructor(status, code, message) { super(message); this.name = 'ApiError'; this.status = status; this.code = code; }
}
const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const isTime = (value) => Number.isSafeInteger(value) && value >= 0;
const freeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze); Object.freeze(value);
  }
  return value;
};
function objectInput(value, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'INVALID_REQUEST', 'A JSON object is required.');
  if (Object.keys(value).some((key) => !allowed.includes(key))) fail(400, 'INVALID_REQUEST', 'Unknown request field.');
}
function stringInput(value, name, max = 160) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) fail(400, 'INVALID_REQUEST', `${name} must be a non-empty string of at most ${max} characters.`);
  return value;
}
function timeInput(value, name) {
  if (!isTime(value)) fail(400, 'INVALID_REQUEST', `${name} must be non-negative integer stream milliseconds.`);
  return value;
}

// Current fixture has no provider publication clock. The max prevents early completion exposure.
export function eventAvailableAtMs(event) {
  const times = [event?.t, event?.q?.endMs ?? event?.t, event?.available_at_ms ?? event?.t];
  if (!times.every(isTime)) throw new TypeError('Invalid fixture event timestamp.');
  return Math.max(...times);
}

function prepareFixture(input) {
  if (!input?.demo || !Array.isArray(input.demo.events) || !Array.isArray(input.demo.players) || !Array.isArray(input.demo.teams)) throw new TypeError('fixture.demo must include events, players and teams.');
  const copy = structuredClone(input);
  const demo = copy.demo;
  if (!demo.match?.match_id || !isTime(demo.match.duration_ms) || !Number.isFinite(Date.parse(demo.match.kickoff))) throw new TypeError('Invalid fixture match.');
  const players = new Map();
  const teams = new Map();
  for (const team of demo.teams) {
    if (typeof team.id !== 'string' || teams.has(team.id)) throw new TypeError('Invalid or duplicate fixture team ID.');
    teams.set(team.id, team);
  }
  for (const player of demo.players) {
    if (typeof player.id !== 'string' || players.has(player.id) || !teams.has(player.teamId)) throw new TypeError('Invalid or duplicate fixture player ID.');
    players.set(player.id, player);
  }
  if (!teams.has(demo.match.home_team_id) || !teams.has(demo.match.away_team_id)) throw new TypeError('Invalid match team references.');
  const events = new Map();
  for (const event of demo.events) {
    if (typeof event.id !== 'string' || events.has(event.id)) throw new TypeError('Invalid or duplicate fixture event ID. Revision adapters are not implemented.');
    eventAvailableAtMs(event);
    if (!teams.has(event.team) || (event.player != null && !players.has(event.player)) || (event.secondary != null && !players.has(event.secondary))) throw new TypeError('Unknown fixture event identity.');
    if (event.q?.startMs != null && (!isTime(event.q.startMs) || event.q.startMs > eventAvailableAtMs(event))) throw new TypeError('Invalid fixture event start.');
    events.set(event.id, event);
  }
  const chainRows = Array.isArray(copy.chanceChains) ? copy.chanceChains : copy.chanceChains?.chains ?? [];
  const chains = new Map();
  for (const chain of chainRows) {
    if (typeof chain.id !== 'string' || chains.has(chain.id) || !isTime(chain.startMs) || !isTime(chain.endMs) || chain.startMs > chain.endMs || !Array.isArray(chain.eventIds)) throw new TypeError('Invalid fixture chance chain.');
    if (chain.available_at_ms != null && !isTime(chain.available_at_ms)) throw new TypeError('Invalid fixture chain availability.');
    chains.set(chain.id, chain);
  }
  return { demo: freeze(demo), players, teams, events, chains, insights: copy.matchInsights ?? null, sourceVersion: typeof copy.sourceVersion === 'string' ? copy.sourceVersion : 'local-skillcorner-fixture/1.0' };
}

export function summarizePlayerEvents(rows) {
  const passes = rows.filter((row) => row.type === 'pass');
  const crosses = passes.filter((row) => ['cross', 'cutback'].includes(row.q?.pass_type));
  const shots = rows.filter((row) => row.type === 'shot');
  const passKnown = passes.filter((row) => ['complete', 'incomplete'].includes(row.outcome));
  const crossKnown = crosses.filter((row) => ['complete', 'incomplete'].includes(row.outcome));
  const completed = (items) => items.filter((row) => row.outcome === 'complete').length;
  const validXg = shots.filter((row) => Number.isFinite(row.q?.xg) && row.q.xg >= 0 && row.q.xg <= 1);
  return freeze({
    passes_attempted: passes.length, passes_completed: completed(passKnown), pass_outcomes_known: passKnown.length,
    pass_completion: passKnown.length ? completed(passKnown) / passKnown.length : null,
    crosses_attempted: crosses.length, crosses_completed: completed(crossKnown), cross_outcomes_known: crossKnown.length,
    cross_completion: crossKnown.length ? completed(crossKnown) / crossKnown.length : null,
    shots: shots.length,
    xg_estimate: validXg.length === shots.length ? Number(validXg.reduce((sum, row) => sum + row.q.xg, 0).toFixed(3)) : null,
    xg_samples: validXg.length, xg_missing: shots.length - validXg.length,
    xg_method: 'position-only demo estimate',
  });
}

function visibleChain(data, chain, cutoff) {
  if (Math.max(chain.endMs, chain.available_at_ms ?? chain.endMs) > cutoff) return false;
  const refs = [...chain.eventIds, ...(chain.supportEventIds ?? []), chain.keyEventId].filter(Boolean);
  return refs.length > 0 && refs.every((id) => data.events.has(id) && eventAvailableAtMs(data.events.get(id)) <= cutoff);
}
function scopedFacts(data, playerId, cutoff) {
  const person = data.players.get(playerId);
  const visible = data.demo.events.filter((row) => eventAvailableAtMs(row) <= cutoff);
  const own = visible.filter((row) => row.player === playerId);
  const teamScore = (id) => visible.filter((row) => row.team === id && row.type === 'shot' && row.outcome === 'goal').length;
  const home = data.demo.match.home_team_id;
  const away = data.demo.match.away_team_id;
  return {
    own,
    player: { player_id: person.id, name: person.name, team_id: person.teamId, number: person.number, position: person.position },
    match: { match_id: data.demo.match.match_id, as_of_ms: cutoff, score_method: 'inferred from visible goal events', home: { team_id: home, name: data.teams.get(home).name, goals: teamScore(home) }, away: { team_id: away, name: data.teams.get(away).name, goals: teamScore(away) } },
    facts: summarizePlayerEvents(own),
  };
}

// Pure cutoff query; no session authorization. The HTTP path always goes through service.query.
export function queryPlayerFacts(fixture, { match_id, player_id, cutoff_ms }) {
  const data = prepareFixture(fixture);
  timeInput(cutoff_ms, 'cutoff_ms');
  if (match_id !== data.demo.match.match_id || !data.players.has(player_id)) fail(404, 'NOT_FOUND', 'Match or player not found.');
  if (cutoff_ms > data.demo.match.duration_ms) fail(400, 'INVALID_REQUEST', 'cutoff_ms exceeds match duration.');
  const { own, ...result } = scopedFacts(data, player_id, cutoff_ms);
  return freeze(result);
}

export function createQueryService({ fixture, now = Date.now, initialCutoffMs = 0, sessionTtlMs = 7_200_000, maxSessions = 100, maxReceiptsPerSession = 200, idFactory = randomUUID } = {}) {
  const data = prepareFixture(fixture);
  if (typeof now !== 'function' || typeof idFactory !== 'function' || !isTime(initialCutoffMs) || initialCutoffMs > data.demo.match.duration_ms || ![sessionTtlMs, maxSessions, maxReceiptsPerSession].every((value) => Number.isSafeInteger(value) && value > 0)) throw new TypeError('Invalid trusted service configuration.');
  // Local rolling evidence cache is storage protection, never a question quota.
  // Retain a complete answer's (at most three) receipts even with legacy tiny settings.
  const receiptCacheSize = Math.max(3, maxReceiptsPerSession);
  const sessions = new Map();
  const clock = () => {
    const value = now(); if (!Number.isFinite(value) || value < 0) throw new TypeError('Invalid trusted clock.'); return Math.floor(value);
  };
  const identifier = (prefix) => `${prefix}_${stringInput(idFactory(), 'generated ID', 120)}`;
  function sessionFor(id) {
    stringInput(id, 'session_id');
    const session = sessions.get(id);
    if (!session) fail(404, 'NOT_FOUND', 'Session not found.');
    const current = clock();
    if (current >= session.expiresAt) { sessions.delete(id); fail(410, 'SESSION_EXPIRED', 'Session expired. Create a new session.'); }
    session.elapsed = Math.max(session.elapsed, current - session.createdAt, 0);
    return session;
  }
  const ceiling = (session) => Math.min(data.demo.match.duration_ms, initialCutoffMs + session.elapsed);
  function sessionView(session) {
    return freeze({ session_id: session.id, match_id: data.demo.match.match_id, visible_cutoff_ms: ceiling(session), expires_at_ms: session.expiresAt, provider: 'rules', cloud_connected: false, authentication: 'local opaque session ID; not production authentication' });
  }
  function createSession(input) {
    objectInput(input, ['match_id']); stringInput(input.match_id, 'match_id');
    if (input.match_id !== data.demo.match.match_id) fail(404, 'NOT_FOUND', 'Match not found.');
    const current = clock();
    for (const [id, item] of sessions) if (current >= item.expiresAt) sessions.delete(id);
    if (sessions.size >= maxSessions) fail(429, 'CAPACITY_EXCEEDED', 'Local session capacity reached.');
    const id = identifier('session');
    if (sessions.has(id)) throw new Error('Trusted ID factory returned a duplicate session ID.');
    const session = { id, createdAt: current, expiresAt: current + sessionTtlMs, elapsed: 0, receipts: new Map() };
    sessions.set(id, session); return sessionView(session);
  }
  function getSessionState(input) {
    objectInput(input, ['session_id']); return sessionView(sessionFor(input.session_id));
  }
  const receiptChain = (anchor, cutoff, selectedChain) => selectedChain ?? [...data.chains.values()].find((candidate) => candidate.eventIds.includes(anchor.id) && visibleChain(data, candidate, cutoff));
  const receiptEventIds = (anchor, chain) => chain ? [...new Set([...chain.eventIds, ...(chain.supportEventIds ?? []), chain.keyEventId].filter(Boolean))] : [anchor.id];
  function makeReceipt(session, anchor, cutoff, playerId, selectedChain) {
    const chain = receiptChain(anchor, cutoff, selectedChain);
    const actionStart = Math.min(anchor.t, anchor.q?.startMs ?? anchor.t);
    const actionEnd = Math.max(anchor.t, anchor.q?.endMs ?? anchor.t);
    const eventIds = receiptEventIds(anchor, chain);
    // Playback follows field action times, not a later provider publication delay.
    const physicalEnd = Math.max(actionEnd, chain?.endMs ?? actionEnd, ...eventIds.map((id) => {
      const row = data.events.get(id); return Math.max(row.t, row.q?.endMs ?? row.t);
    }));
    const proposedStart = chain?.replayStartMs ?? Math.max(0, actionStart - 9000);
    const proposedEnd = chain?.replayEndMs ?? actionEnd + 6500;
    const start = Math.min(actionStart, chain?.startMs ?? actionStart, isTime(proposedStart) ? proposedStart : Math.max(0, actionStart - 9000));
    const end = Math.min(cutoff, data.demo.match.duration_ms, Math.max(physicalEnd, isTime(proposedEnd) ? proposedEnd : physicalEnd));
    const receiptId = identifier('receipt');
    const receipt = freeze({
      receipt_id: receiptId, schema_version: 'evidence-receipt/1.1', match_id: data.demo.match.match_id,
      player_id: playerId, as_of_ms: cutoff, source_version: data.sourceVersion, feature_version: API_VERSION,
      availability_mode: 'simulated_event_completion',
      event_ids: eventIds,
      ...deriveReceiptSupport(eventIds.map((id) => data.events.get(id)), playerId),
      chain_id: chain?.id ?? null, anchor_event_id: anchor.id,
      clip: { clip_id: `clip_${receiptId}`, anchor_event_id: anchor.id, anchor_start_ms: actionStart, anchor_end_ms: actionEnd, start_ms: Math.max(0, start), end_ms: end, cutoff_ms: cutoff, quality: 'Event evidence only; tracking coverage is not evaluated by this API.' },
    });
    if (session.receipts.has(receiptId)) throw new Error('Trusted ID factory returned a duplicate receipt ID.');
    session.receipts.set(receiptId, receipt);
    while (session.receipts.size > receiptCacheSize) session.receipts.delete(session.receipts.keys().next().value);
    return receipt;
  }
  function query(input) {
    objectInput(input, ['session_id', 'match_id', 'player_id', 'cutoff_ms', 'viewer_playhead_ms', 'question', 'event_id', 'chain_id', 'query_id', 'mode']);
    const session = sessionFor(input.session_id);
    const mode = Object.hasOwn(input, 'mode') ? input.mode : 'analyst';
    if (!['casual', 'analyst'].includes(mode)) fail(400, 'INVALID_REQUEST', 'Unsupported presentation mode.');
    stringInput(input.match_id, 'match_id'); stringInput(input.player_id, 'player_id'); stringInput(input.question, 'question', 4000);
    if (input.query_id != null) stringInput(input.query_id, 'query_id');
    const cutoff = timeInput(input.cutoff_ms, 'cutoff_ms');
    const playhead = input.viewer_playhead_ms == null ? cutoff : timeInput(input.viewer_playhead_ms, 'viewer_playhead_ms');
    if (playhead !== cutoff) fail(400, 'INVALID_REQUEST', 'viewer_playhead_ms must match the frozen cutoff_ms.');
    if (cutoff > ceiling(session)) fail(403, 'CUTOFF_NOT_ALLOWED', 'Requested cutoff is beyond this session visibility.');
    if (input.match_id !== data.demo.match.match_id || !data.players.has(input.player_id)) fail(404, 'NOT_FOUND', 'Match or player not found.');
    let requestedEvent = null;
    let requestedChain = null;
    if (input.event_id != null) {
      stringInput(input.event_id, 'event_id'); requestedEvent = data.events.get(input.event_id);
      if (!requestedEvent) fail(404, 'NOT_FOUND', 'Event not found.');
      if (eventAvailableAtMs(requestedEvent) > cutoff) fail(403, 'CONTEXT_NOT_VISIBLE', 'Event is not available at this cutoff.');
      if (![requestedEvent.player, requestedEvent.secondary].includes(input.player_id)) fail(400, 'INVALID_REQUEST', 'Event does not involve the selected player.');
    }
    if (input.chain_id != null) {
      stringInput(input.chain_id, 'chain_id'); requestedChain = data.chains.get(input.chain_id);
      if (!requestedChain) fail(404, 'NOT_FOUND', 'Chance chain not found.');
      if (!visibleChain(data, requestedChain, cutoff)) fail(403, 'CONTEXT_NOT_VISIBLE', 'Complete chance chain is not available at this cutoff.');
      if (!requestedChain.eventIds.some((id) => data.events.get(id)?.player === input.player_id) || (requestedEvent && !requestedChain.eventIds.includes(requestedEvent.id))) fail(400, 'INVALID_REQUEST', 'Chance chain does not match the frozen player and event.');
    }
    const snapshot = scopedFacts(data, input.player_id, cutoff);
    const actorScope = checkQuestionActor(input.question, [...data.players.values()], input.player_id);
    const answerability = actorScope.status === 'allowed' ? classifyQuestion(input.question) : freeze({ status: actorScope.status, topic: null, reason: actorScope.reason, supported_topics: ['passing', 'crossing', 'shooting'] });
    const topic = answerability.topic;
    if (topic && requestedEvent && !eventSupportsTopic(requestedEvent, input.player_id, topic)) fail(400, 'INVALID_REQUEST', 'Frozen event does not support this question topic for the selected player.');
    if (topic && requestedChain && !requestedChain.eventIds.some((id) => eventSupportsTopic(data.events.get(id), input.player_id, topic))) fail(400, 'INVALID_REQUEST', 'Frozen chain does not support this question topic for the selected player.');
    const relevant = topic ? snapshot.own.filter((row) => eventSupportsTopic(row, input.player_id, topic)) : [];
    relevant.sort((left, right) => eventAvailableAtMs(left) - eventAvailableAtMs(right) || left.id.localeCompare(right.id));
    const facts = topic ? Object.fromEntries(TOPIC_FACT_KEYS[topic].map((key) => [key, snapshot.facts[key]])) : {};
    const required_evidence_topics = requiredEvidenceTopics(topic, facts);
    let anchors = !topic ? [] : requestedChain ? [relevant.findLast((row) => requestedChain.eventIds.includes(row.id))] : requestedEvent ? [requestedEvent] : relevant.slice(-3);
    const chainForAnchor = (row) => requestedChain?.eventIds.includes(row.id) ? requestedChain : undefined;
    if (topic === SUMMARY_TOPIC) {
      anchors = requestedChain || requestedEvent ? anchors.filter(Boolean) : [];
      const covered = () => new Set(anchors.flatMap((row) => {
        const chain = receiptChain(row, cutoff, chainForAnchor(row));
        return deriveReceiptSupport(receiptEventIds(row, chain).map((id) => data.events.get(id)), input.player_id).supported_topics;
      }));
      // A cross also supports passing, so prefer it before adding a separate pass anchor.
      for (const domain of ['crossing', 'shooting', 'passing']) if (required_evidence_topics.includes(domain) && !covered().has(domain)) {
        const row = relevant.findLast((event) => eventSupportsTopic(event, input.player_id, domain));
        if (row && !anchors.some((anchor) => anchor.id === row.id)) anchors.push(row);
      }
    }
    const receipts = anchors.filter(Boolean).slice(-3).map((row) => makeReceipt(session, row, cutoff, input.player_id, chainForAnchor(row)));
    const clock = formatMatchClock(cutoff);
    const answer = topic ? playerAnswer({ name:snapshot.player.name, clock, topic, facts, mode, question:input.question, cutoffMs:cutoff, matchId:input.match_id, matchTimeContext:data.demo.match }) : scopeReply(answerability, { playerName:snapshot.player.name, cutoffClock:clock });
    return freeze({
      schema_version: API_VERSION, answer_id: identifier('answer'), query_id: input.query_id ?? identifier('query'),
      provider: 'rules', provider_status: topic ? 'deterministic_fallback' : `scope_${answerability.status}`, cloud_connected: false, as_of_ms: cutoff, answerability, mode,
      context: { session_id: session.id, match_id: input.match_id, player_id: input.player_id, event_id: requestedEvent?.id ?? null, chain_id: requestedChain?.id ?? null, viewer_playhead_ms: playhead, cutoff_ms: cutoff, mode },
      player: snapshot.player, match: snapshot.match, facts, answer, required_evidence_topics, evidence_receipts: receipts, clips: receipts.map((receipt) => receipt.clip),
      source_version: data.sourceVersion, limitations: [...LIMITATIONS],
    });
  }
  function explainAttack(input) {
    objectInput(input, ['session_id','match_id','team_id','chain_id','cutoff_ms','viewer_playhead_ms','question','mode','query_id']);
    const session = sessionFor(input.session_id);
    for (const key of ['match_id','team_id','chain_id','query_id']) stringInput(input[key], key);
    stringInput(input.question,'question',4000);
    if (!['casual','analyst'].includes(input.mode)) fail(400,'INVALID_REQUEST','A supported presentation mode is required.');
    const cutoff=timeInput(input.cutoff_ms,'cutoff_ms'), playhead=timeInput(input.viewer_playhead_ms,'viewer_playhead_ms');
    if(cutoff!==playhead)fail(400,'INVALID_REQUEST','viewer_playhead_ms must match the frozen cutoff_ms.');
    if(cutoff>ceiling(session))fail(403,'CUTOFF_NOT_ALLOWED','Requested cutoff is beyond this session visibility.');
    if(input.match_id!==data.demo.match.match_id||!data.teams.has(input.team_id)||!data.chains.has(input.chain_id))fail(404,'NOT_FOUND','Match, team or chain not found.');
    const chain=data.chains.get(input.chain_id);
    if(chain.teamId!==input.team_id)fail(400,'INVALID_REQUEST','Chain does not match the frozen team.');
    if(!visibleChain(data,chain,cutoff))fail(403,'CONTEXT_NOT_VISIBLE','Complete chance chain is not available at this cutoff.');
    const insights=data.insights,attack=insights?.attacks?.find(row=>row.chainId===chain.id);
    if(!attack||insights.matchId!==input.match_id||insights.sourceVersion!==data.sourceVersion||attack.sourceVersion!==data.sourceVersion)fail(503,'INSIGHTS_UNAVAILABLE','The frozen attack insight is unavailable for this source version.');
    if(attack.availableAtMs>cutoff||attack.teamId!==input.team_id||attack.eventIds.some(id=>!data.events.has(id)||eventAvailableAtMs(data.events.get(id))>cutoff))fail(403,'CONTEXT_NOT_VISIBLE','Attack evidence is not available at this cutoff.');
    if(!/\b(?:attack|chance|sequence|build.?up|develop)\b|进攻|形成/i.test(input.question)||/\b(?:ignore|credentials?|api.?key|password|fatigue|fitness|predict|forecast|tomorrow)\b/i.test(input.question))fail(400,'INVALID_REQUEST','This endpoint explains the recorded frozen attack sequence only.');
    const observations=attack.claims.flatMap(claim=>claim.observationIds).map(id=>insights.offBall.find(row=>row.id===id));
    if(observations.some(row=>!row||row.availableAtMs>cutoff||row.quality.cameraCoverage!==1||!row.quality.rawVerified||row.quality.heldSamples!==0||row.quality.extrapolatedSamples!==0))fail(503,'INSIGHTS_UNAVAILABLE','Camera observation evidence could not be validated.');
    const refs=[...new Set([...chain.eventIds,...(chain.supportEventIds??[]),chain.keyEventId].filter(Boolean))];
    const anchor=data.events.get(chain.keyEventId),receiptId=identifier('receipt');
    const clip={clip_id:`clip_${receiptId}`,anchor_event_id:anchor.id,anchor_start_ms:anchor.q?.startMs??anchor.t,anchor_end_ms:Math.max(anchor.t,anchor.q?.endMs??anchor.t),start_ms:Math.max(0,attack.clip.startMs),end_ms:Math.min(cutoff,attack.clip.endMs),cutoff_ms:cutoff,quality:'Complete source-event chain; camera-only movement claims have separate per-player observation gates.'};
    if(clip.start_ms>clip.end_ms||clip.end_ms<chain.endMs||clip.end_ms<clip.anchor_end_ms||attack.claims.flatMap(claim=>claim.eventIds).some(id=>{const e=data.events.get(id);return !e||clip.start_ms>(e.q?.startMs??e.t)||clip.end_ms<Math.max(e.t,e.q?.endMs??e.t);}))fail(503,'INSIGHTS_UNAVAILABLE','The bounded attack clip does not contain its evidence.');
    const receipt=freeze({receipt_id:receiptId,schema_version:'evidence-receipt/1.2',scope_type:'attack',match_id:input.match_id,team_id:input.team_id,chain_id:chain.id,player_id:null,as_of_ms:cutoff,source_version:data.sourceVersion,feature_version:ATTACK_API_VERSION,availability_mode:'simulated_event_completion',event_ids:refs,anchor_event_id:anchor.id,claim_ids:attack.claims.map(claim=>claim.id),observation_ids:observations.map(row=>row.id),clip});
    if(session.receipts.has(receiptId))throw new Error('Trusted ID factory returned a duplicate receipt ID.');
    session.receipts.set(receiptId,receipt);while(session.receipts.size>receiptCacheSize)session.receipts.delete(session.receipts.keys().next().value);
    const team={team_id:input.team_id,name:data.teams.get(input.team_id).name};
    const snapshot={schema_version:ATTACK_API_VERSION,answer_id:identifier('answer'),query_id:input.query_id,provider:'rules',provider_status:'deterministic_fallback',cloud_connected:false,scope_type:'attack',as_of_ms:cutoff,mode:input.mode,answerability:{status:'supported',topic:'attack_explanation',reason:'frozen_chain',supported_topics:['attack_explanation']},context:{session_id:session.id,match_id:input.match_id,team_id:input.team_id,chain_id:chain.id,cutoff_ms:cutoff,viewer_playhead_ms:playhead,mode:input.mode,scope_type:'attack',player_id:null,event_id:null},player:null,team,facts:attack.facts,claims:attack.claims,focus_candidates:attack.focusCandidates,participants:attack.participantIds.map(id=>data.players.get(id)).filter(Boolean).map(person=>({player_id:person.id,name:person.name,team_id:person.teamId})),observations:observations.map(row=>({id:row.id,player_id:row.playerId,event_id:row.eventId,start_ms:row.startMs,end_ms:row.endMs,metrics:row.metrics,quality:row.quality,limitations:row.limitations})),evidence_receipts:[receipt],clips:[clip],attack:{chain_id:chain.id,start_ms:chain.startMs,end_ms:chain.endMs,available_at_ms:attack.availableAtMs},attack_limitations:attack.limitations,source_version:data.sourceVersion,insight_version:insights.schemaVersion,limitations:[...LIMITATIONS,...attack.limitations.map(row=>row.text)]};
    const packet=buildAttackPacket(snapshot,input.question),candidate=defaultAttackAnswer(packet);
    return freeze({...snapshot,answer:renderAttackAnswer(candidate,packet,{question:input.question}),structured_explanation:renderAttackExplanation(candidate,packet,'rule_default')});
  }
  function resolveReplay(input) {
    objectInput(input, ['session_id', 'receipt_id']); const session = sessionFor(input.session_id); stringInput(input.receipt_id, 'receipt_id');
    const receipt = session.receipts.get(input.receipt_id);
    if (!receipt) fail(404, 'NOT_FOUND', 'Receipt not found in this session, expired or evicted.');
    return freeze({ provider: 'rules', cloud_connected: false, as_of_ms: receipt.as_of_ms, receipt, clip: receipt.clip });
  }
  return Object.freeze({ createSession, getSessionState, query, explainAttack, resolveReplay });
}

// Request-local scratch evaluator. Production authorization/persistence lives in the D1 adapter.
// This does not restore or cache authority in isolate memory; the trusted caller supplies the
// already-authorized ceiling and opaque session ID for exactly this evaluation.
export function evaluateAuthorizedQuery({ fixture, sessionId, visibleCutoffMs, input, idFactory = randomUUID }) {
  if (typeof sessionId !== 'string' || !sessionId.startsWith('session_')) throw new TypeError('Invalid trusted session.');
  let first = true;
  const service = createQueryService({ fixture, initialCutoffMs: visibleCutoffMs, now: () => 0, idFactory: () => { if (first) { first = false; return sessionId.slice(8); } return idFactory(); } });
  service.createSession({ match_id: fixture.demo.match.match_id });
  return service.query(input);
}

export function evaluateAuthorizedAttack({ fixture, sessionId, visibleCutoffMs, input, idFactory = randomUUID }) {
  if(typeof sessionId!=='string'||!sessionId.startsWith('session_'))throw new TypeError('Invalid trusted session.');
  let first=true;const service=createQueryService({fixture,initialCutoffMs:visibleCutoffMs,now:()=>0,idFactory:()=>{if(first){first=false;return sessionId.slice(8);}return idFactory();}});
  service.createSession({match_id:fixture.demo.match.match_id});return service.explainAttack(input);
}
