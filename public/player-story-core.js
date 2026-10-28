// Shared deterministic composition. HTTP authorization is exclusively server-side.
export const PLAYER_STORY_VERSION = 'matchmind-player-story/1.0';
export const PLAYER_STORY_POLICY_VERSION = 'recorded-player-narrative/1.0';
export class PlayerStoryError extends Error {
  constructor(code, message) { super(message); this.name = 'PlayerStoryError'; this.code = code; }
}
const fail = (code, message) => { throw new PlayerStoryError(code, message); };
const isTime = value => Number.isSafeInteger(value) && value >= 0;
const unique = values => [...new Set(values)];
const order = (a, b) => a.available_at_ms - b.available_at_ms || a.chapter_id.localeCompare(b.chapter_id, 'en');
const completeAt = event => Math.max(event.t, event.q?.endMs ?? event.t, event.available_at_ms ?? event.t);
const startAt = event => Math.min(event.t, event.q?.startMs ?? event.t);
const finishAt = event => Math.max(event.t, event.q?.endMs ?? event.t);
const deepFreeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(deepFreeze); Object.freeze(value); } return value; };
const SOURCE_LIMIT = 'This story describes available source records, not every touch or the player\'s intent. Missing records do not establish inactivity.';
const CAMERA_LIMIT = 'Camera detections establish movement. The provider off-ball tag, unknown possession and the visible opponent subset do not establish no touch, created space or a causal contribution.';
const plural = (count, one, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;

function milestone(chapter) {
  if (chapter.kind === 'camera_observation') return 'camera-observed movement';
  if (chapter.kind === 'recorded_reception') return 'a completed-pass recipient link';
  if (chapter.kind === 'completed_attack') return chapter.participation.some(row => row.role !== 'camera_observed') ? 'a recorded role in a completed attack' : 'movement observed alongside a completed attack';
  const type = chapter.facts.action_type;
  if (type === 'pass') return chapter.facts.outcome === 'complete' ? 'a completed pass' : chapter.facts.outcome === 'incomplete' ? 'an incomplete pass' : 'a pass with an unknown outcome';
  return { shot: 'a recorded shot', turnover: 'a recorded turnover', clearance: 'a recorded clearance', foul: 'a recorded foul' }[type] ?? 'a recorded action';
}

function chapterLink(chapter, previous, clock) {
  if (!previous) return `The opening record is ${milestone(chapter)} at ${clock(chapter.end_ms)}. `;
  if (chapter.kind === 'completed_attack' && chapter.start_ms < previous.end_ms) return `The preceding chapter showed ${milestone(previous)} through ${clock(previous.end_ms)}. A complete sequence is now available for the overlapping ${clock(chapter.start_ms)}–${clock(chapter.end_ms)} interval. `;
  if (chapter.kind === 'camera_observation') return `The story previously reached ${milestone(previous)} at ${clock(previous.end_ms)}; it now adds a different kind of evidence, camera-observed movement through ${clock(chapter.end_ms)}. `;
  if (chapter.kind === 'recorded_reception') return `Following the chapter about ${milestone(previous)} at ${clock(previous.end_ms)}, the passing thread adds a recorded recipient link at ${clock(chapter.end_ms)}. `;
  return `From the earlier chapter about ${milestone(previous)} at ${clock(previous.end_ms)}, the next available record adds ${milestone(chapter)} at ${clock(chapter.end_ms)}. `;
}

function personalSummary(player, chapters, own, counts, cutoffMs, clock, mode) {
  if (!chapters.length) return `Through ${clock(cutoffMs)}, no qualifying chapter for ${player.name} has been published. A live story can grow as a recorded action, completed-pass link, qualifying camera observation or completed attack becomes available. Frozen snapshots retain this cutoff. Missing records do not establish inactivity.`;
  const passes = own.filter(row => row.type === 'pass'), shots = own.filter(row => row.type === 'shot');
  const otherTypes = ['turnover', 'clearance', 'foul'].map(type => ({ type, count: own.filter(row => row.type === type).length })).filter(row => row.count);
  const strands = [];
  if (passes.length) strands.push(`${plural(passes.length, 'recorded pass attempt')} (${passes.filter(row => row.outcome === 'complete').length} complete${passes.some(row => !['complete', 'incomplete'].includes(row.outcome)) ? `; ${passes.filter(row => !['complete', 'incomplete'].includes(row.outcome)).length} outcomes unknown` : ''})`);
  if (shots.length) strands.push(plural(shots.length, 'recorded shot'));
  if (otherTypes.length) strands.push(otherTypes.map(row => plural(row.count, `recorded ${row.type}`)).join(', '));
  if (counts.recorded_receptions) strands.push(plural(counts.recorded_receptions, 'completed-pass recipient link'));
  if (counts.camera_observations) strands.push(plural(counts.camera_observations, 'qualifying camera observation'));
  const first = chapters[0], latest = chapters.at(-1);
  const development = first === latest ? `The opening milestone is ${milestone(first)} at ${clock(first.end_ms)}.` : `The story opened with ${milestone(first)} at ${clock(first.end_ms)}; its latest available chapter adds ${milestone(latest)} at ${clock(latest.end_ms)}.`;
  const attacks = counts.completed_attacks ? ` ${plural(counts.completed_attacks, 'completed attack')} ${counts.completed_attacks === 1 ? 'adds' : 'add'} sequence context through personal source links, not proof of a caused chance.` : '';
  return `Through ${clock(cutoffMs)}, the available records for ${player.name} show ${strands.join('; ')}. ${development}${attacks}${mode === 'analyst' ? ` The snapshot contains ${chapters.length} independently published chapters, including ${counts.recorded_actions} source-actor records; all cited records are complete by the frozen cutoff.` : ''} Source links describe observed involvement; they do not establish intent or a complete performance assessment.`;
}

function inputData(input) {
  const demo = input?.demo, insights = input?.matchInsights;
  if (!demo?.match || !Array.isArray(demo.players) || !Array.isArray(demo.teams) || !Array.isArray(demo.events) || !Array.isArray(insights?.attacks) || !Array.isArray(insights?.offBall)) fail('SOURCE_UNAVAILABLE', 'The story source is not available.');
  if (typeof input.sourceVersion !== 'string' || insights.sourceVersion !== input.sourceVersion || insights.matchId !== demo.match.match_id) fail('STATE_VERSION_MISMATCH', 'Story source and match versions do not match.');
  if (!isTime(demo.match.duration_ms)) fail('SOURCE_UNAVAILABLE', 'Story duration is invalid.');
  const players = new Map(demo.players.map(row => [row.id, row]));
  const teams = new Map(demo.teams.map(row => [row.id, row]));
  const events = new Map();
  for (const row of demo.events) {
    if (typeof row.id !== 'string' || events.has(row.id) || ![row.t, startAt(row), finishAt(row), completeAt(row)].every(isTime)) fail('SOURCE_UNAVAILABLE', 'Story event timing is invalid.');
    events.set(row.id, row);
  }
  const clock = ms => {
    const second = demo.match.second_half_stream_start_ms, display = demo.match.second_half_clock_start_ms;
    const shown = isTime(second) && isTime(display) && ms >= second ? display + ms - second : ms;
    return `${Math.floor(shown / 60000)}:${String(Math.floor(shown / 1000) % 60).padStart(2, '0')}`;
  };
  return { demo, insights, players, teams, events, sourceVersion: input.sourceVersion, clock };
}

function strictObservation(row, data, playerId, cutoffMs) {
  const event = data.events.get(row.eventId), q = row.quality;
  return row.playerId === playerId && event?.player === playerId && event.type === 'off_ball_run' && event.team === row.teamId &&
    row.sourceVersion === data.sourceVersion && [row.startMs, row.endMs, row.availableAtMs].every(isTime) && row.endMs - row.startMs >= 800 && row.availableAtMs >= row.endMs && row.availableAtMs >= completeAt(event) && row.availableAtMs <= cutoffMs &&
    q?.rawVerified === true && q.cameraCoverage === 1 && q.cameraDetectedSamples === q.totalSamples && Number.isSafeInteger(q.totalSamples) && q.totalSamples >= 9 && q.heldSamples === 0 && q.extrapolatedSamples === 0 && q.maxGapMs <= 100 && q.maxGapMs > 0 &&
    Number.isFinite(row.metrics?.displacementM) && row.metrics.displacementM >= 5;
}

function baseChapter({ id, kind, available, start, end, events, observations = [], chain = null, participation, facts, limits = [], title, body }) {
  return { chapter_id: id, kind, title, narrative: body, available_at_ms: available, start_ms: start, end_ms: end,
    event_ids: unique(events), observation_ids: unique(observations), chain_id: chain, participation,
    facts, limitations: [SOURCE_LIMIT, ...limits],
    clip: { clip_id: `clip_${id}`, start_ms: Math.max(0, start - 1500), end_ms: end, cutoff_ms: available, anchor_event_id: events[0] } };
}

function actionChapter(event, role, player, data, mode) {
  const actor = data.players.get(event.player), receiver = data.players.get(event.secondary), own = role === 'actor';
  const available = completeAt(event), start = startAt(event), end = finishAt(event);
  let title, body;
  const limits = [];
  if (!own) {
    title = 'Available as the recorded receiver';
    body = `${actor?.name ?? 'A teammate'} completed a recorded pass toward ${player.name}. The source names him as its recipient; it does not independently establish his next touch.`;
    limits.push('The converted completed-pass recipient is a source link, not an independently tracked first touch.');
  } else if (event.type === 'pass') {
    title = event.outcome === 'complete' ? 'Keeping the passing sequence moving' : 'A pass with a recorded outcome';
    body = `${player.name} attempted a pass${receiver && receiver.teamId === player.teamId ? ` toward ${receiver.name}` : ''}; recorded outcome: ${['complete', 'incomplete'].includes(event.outcome) ? event.outcome : 'unknown'}.`;
  } else if (event.type === 'shot') {
    title = 'A recorded attempt at goal';
    body = `${player.name} took a recorded shot${Number.isFinite(event.q?.xg) ? `, with position-only estimated xG ${event.q.xg.toFixed(2)}` : '; its estimated xG is unavailable'}.`;
    limits.push('xG is a position-only demonstration estimate. Shot outcomes can be inferred from subsequent events and are not used to claim shot placement or intent.');
  } else {
    const labels = { turnover: 'a recorded turnover', clearance: 'a recorded clearance', foul: 'a recorded foul' };
    title = { turnover: 'A recorded possession interruption', clearance: 'A recorded defensive action', foul: 'A recorded stoppage' }[event.type];
    body = `${player.name} was the source actor for ${labels[event.type]}. This record establishes the action, not its tactical cause.`;
  }
  if (mode === 'analyst') body = `${data.clock(start)}–${data.clock(end)}: ${body} Source event ${event.id}; publication ${data.clock(available)}.`;
  return baseChapter({ id: `ps_${role}_${event.id}`, kind: own ? 'recorded_action' : 'recorded_reception', available, start, end, events: [event.id],
    participation: [{ event_id: event.id, role }], facts: { action_type: event.type, role, outcome: ['complete', 'incomplete'].includes(event.outcome) ? event.outcome : null, xg_estimate: event.type === 'shot' && Number.isFinite(event.q?.xg) ? event.q.xg : null }, limits, title, body });
}

function cameraChapter(row, player, data, mode) {
  const q = row.quality, m = row.metrics;
  const nearest = Number.isFinite(m.nearestVisibleOpponentStartM) && Number.isFinite(m.nearestVisibleOpponentEndM) ? `${m.nearestVisibleOpponentStartM.toFixed(2)} → ${m.nearestVisibleOpponentEndM.toFixed(2)} m` : 'unavailable';
  let body = `${player.name}'s next observable strand is movement: camera detections record ${m.displacementM.toFixed(2)} m of displacement during a provider-tagged off-ball run. Its effect on the attack is unknown.`;
  if (mode === 'analyst') body = `${data.clock(row.startMs)}–${data.clock(row.endMs)}: ${q.cameraDetectedSamples}/${q.totalSamples} native camera detections; displacement ${m.displacementM.toFixed(2)} m. Nearest distance in the same visible opponent subset: ${nearest}. Possession ownership was unknown in ${q.unknownPossessionSamples}/${q.totalSamples} samples; geometry is not causation.`;
  return baseChapter({ id: `ps_camera_${row.id}`, kind: 'camera_observation', available: row.availableAtMs, start: row.startMs, end: row.endMs,
    events: [row.eventId], observations: [row.id], participation: [{ event_id: row.eventId, role: 'camera_observed' }],
    facts: { displacement_m: m.displacementM, camera_detected_samples: q.cameraDetectedSamples, total_samples: q.totalSamples, unknown_possession_samples: q.unknownPossessionSamples, nearest_visible_opponent_start_m: m.nearestVisibleOpponentStartM ?? null, nearest_visible_opponent_end_m: m.nearestVisibleOpponentEndM ?? null },
    limits: [CAMERA_LIMIT], title: 'Movement the camera can establish', body });
}

function attackChapter(attack, player, data, availableObservations, mode, cutoffMs) {
  if (attack.teamId !== player.teamId || attack.sourceVersion !== data.sourceVersion || ![attack.startMs, attack.endMs, attack.availableAtMs].every(isTime) || attack.startMs > attack.endMs || attack.availableAtMs < attack.endMs || attack.availableAtMs > cutoffMs || !Array.isArray(attack.eventIds) || !attack.eventIds.length) return null;
  const rows = attack.eventIds.map(id => data.events.get(id));
  if (rows.some(event => !event || completeAt(event) > attack.availableAtMs || completeAt(event) > cutoffMs)) return null;
  const participation = rows.filter(event => event.team === player.teamId && ['pass', 'shot'].includes(event.type) && event.player === player.id).map(event => ({ event_id: event.id, role: 'actor' }));
  rows.filter(event => event.team === player.teamId && event.type === 'pass' && event.outcome === 'complete' && event.secondary === player.id && event.player !== player.id).forEach(event => participation.push({ event_id: event.id, role: 'receiver' }));
  const observations = (attack.offBallIds ?? []).map(id => availableObservations.get(id)).filter(row => row && row.availableAtMs <= attack.availableAtMs && row.startMs <= attack.endMs && row.endMs >= attack.startMs);
  observations.forEach(row => participation.push({ event_id: row.eventId, role: 'camera_observed' }));
  if (!participation.length) return null;
  const direct = participation.some(row => row.role !== 'camera_observed');
  const actions = rows.filter(event => event.team === player.teamId && ['pass', 'shot'].includes(event.type));
  const passes = actions.filter(event => event.type === 'pass'), shots = actions.filter(event => event.type === 'shot');
  let body = direct ? `${player.name}'s recorded involvement now sits inside a complete attacking sequence: ${passes.length} pass attempts (${passes.filter(row => row.outcome === 'complete').length} completed) and ${shots.length} recorded ${shots.length === 1 ? 'shot' : 'shots'}.` : `A complete attacking sequence is now available alongside ${player.name}'s camera-observed movement. This associates his observation with the interval; it does not establish that his movement caused the chance.`;
  if (direct) body += ` His source role is ${unique(participation.filter(row => row.role !== 'camera_observed').map(row => row.role === 'actor' ? 'a recorded action' : 'a completed-pass recipient')).join(' and ')}.`;
  if (mode === 'analyst') body = `${data.clock(attack.startMs)}–${data.clock(attack.endMs)}: ${body} ${participation.length} personal source links; ${observations.length} qualifying personal camera observations. The sequence became available at ${data.clock(attack.availableAtMs)}.`;
  return baseChapter({ id: `ps_attack_${attack.chainId}`, kind: 'completed_attack', available: attack.availableAtMs, start: attack.startMs, end: attack.endMs,
    events: attack.eventIds, observations: observations.map(row => row.id), chain: attack.chainId, participation,
    facts: { actions: actions.length, passes: passes.length, completed_passes: passes.filter(row => row.outcome === 'complete').length, shots: shots.length, personal_source_links: participation.length, camera_observations: observations.length },
    limits: ['A complete sequence is temporal evidence, not proof that the selected player created or caused the chance.', ...(observations.length ? [CAMERA_LIMIT] : [])], title: direct ? 'His role in a complete attack' : 'Movement alongside a complete attack', body });
}

export function buildPlayerStory(input, { playerId, cutoffMs, mode } = {}) {
  const data = inputData(input), player = data.players.get(playerId);
  if (!player || !data.teams.has(player.teamId)) fail('NOT_FOUND', 'Player not found in this match.');
  if (!isTime(cutoffMs) || cutoffMs > data.demo.match.duration_ms || !['casual', 'analyst'].includes(mode)) fail('INVALID_REQUEST', 'Story cutoff or mode is invalid.');
  const ownTeam = data.teams.get(player.teamId), chapters = [];
  const visibleEvents = data.demo.events.filter(row => completeAt(row) <= cutoffMs);
  for (const row of visibleEvents) {
    if (row.team !== player.teamId) continue;
    if (row.player === playerId && ['pass', 'shot', 'turnover', 'clearance', 'foul'].includes(row.type)) chapters.push(actionChapter(row, 'actor', player, data, mode));
    else if (row.type === 'pass' && row.outcome === 'complete' && row.secondary === playerId && row.player !== playerId && data.players.get(row.player)?.teamId === player.teamId) chapters.push(actionChapter(row, 'receiver', player, data, mode));
  }
  const observations = new Map();
  for (const row of data.insights.offBall) if (strictObservation(row, data, playerId, cutoffMs)) { observations.set(row.id, row); chapters.push(cameraChapter(row, player, data, mode)); }
  for (const row of data.insights.attacks) { const chapter = attackChapter(row, player, data, observations, mode, cutoffMs); if (chapter) chapters.push(chapter); }
  chapters.sort(order);
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i], prior = chapters[i - 1];
    chapter.narrative = chapterLink(chapter, prior, data.clock) + chapter.narrative;
  }
  const playlist = [];
  for (const chapter of [...chapters].sort((a, b) => a.clip.start_ms - b.clip.start_ms || a.clip.end_ms - b.clip.end_ms || a.chapter_id.localeCompare(b.chapter_id, 'en'))) {
    const clip = chapter.clip, previous = playlist.at(-1);
    if (previous && clip.start_ms <= previous.end_ms) { previous.end_ms = Math.max(previous.end_ms, clip.end_ms); previous.cutoff_ms = Math.max(previous.cutoff_ms, clip.cutoff_ms); previous.chapter_ids.push(chapter.chapter_id); }
    else playlist.push({ ...clip, clip_id: `playlist_${chapter.chapter_id}`, chapter_ids: [chapter.chapter_id] });
  }
  // A merged playlist clip must have one immutable boundary for this snapshot.
  playlist.forEach(clip => { clip.cutoff_ms = cutoffMs; });
  const own = visibleEvents.filter(row => row.team === player.teamId && row.player === playerId && ['pass', 'shot', 'turnover', 'clearance', 'foul'].includes(row.type));
  const counts = { recorded_actions: own.length, recorded_receptions: chapters.filter(row => row.kind === 'recorded_reception').length, completed_attacks: chapters.filter(row => row.kind === 'completed_attack').length, camera_observations: observations.size };
  const state = chapters.length ? 'developing' : 'waiting_for_records';
  const summaryText = personalSummary(player, chapters, own, counts, cutoffMs, data.clock, mode);
  return deepFreeze({ schema_version: PLAYER_STORY_VERSION, policy_version: PLAYER_STORY_POLICY_VERSION, source_version: data.sourceVersion,
    match: { match_id: data.demo.match.match_id, home_name: data.teams.get(data.demo.match.home_team_id)?.name ?? '', away_name: data.teams.get(data.demo.match.away_team_id)?.name ?? '', kickoff: data.demo.match.kickoff },
    player: { player_id: player.id, name: player.name, team_id: player.teamId, team_name: ownTeam.name, number: player.number ?? null, position: player.position ?? null },
    mode, cutoff_ms: cutoffMs, title: `${player.name}: My Player Story`,
    summary: { state, text: summaryText, ...counts, chapter_count: chapters.length, clip_count: playlist.length },
    narration_source: { provider: 'rules', label: 'Rule-composed story · verified source links', cloud_connected: false, model_called: false },
    chapters, playlist, limitations: [SOURCE_LIMIT, 'Rule-based chronology and thematic links; no new model inference is claimed for this story.', 'Historical SkillCorner replay, streamed as simulated live. The static full-match assets remain downloadable.', CAMERA_LIMIT] });
}

export function validatePlayerStorySnapshot(snapshot, input) {
  if (!snapshot || typeof snapshot !== 'object' || snapshot.schema_version !== PLAYER_STORY_VERSION || snapshot.policy_version !== PLAYER_STORY_POLICY_VERSION || snapshot.source_version !== input?.sourceVersion) fail('STATE_VERSION_MISMATCH', 'This frozen story uses an unavailable source or story policy version.');
  const expected = buildPlayerStory(input, { playerId: snapshot.player?.player_id, cutoffMs: snapshot.cutoff_ms, mode: snapshot.mode });
  if (JSON.stringify(snapshot) !== JSON.stringify(expected)) fail('INVALID_SNAPSHOT', 'Frozen story content could not be validated against its source.');
  return true;
}
