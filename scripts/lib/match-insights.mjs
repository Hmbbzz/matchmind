export const INSIGHT_POLICY_VERSION = 'camera-causal-insights/1.0';
const SOURCE_VERSION = 'skillcorner-2017461/local-static-v1';
const round = (value, places = 2) => Number(value.toFixed(places));
const available = event => Math.max(event.t, event.q?.endMs ?? event.t, event.available_at_ms ?? event.t);
const label = value => value.replace(/_/g, ' ');
const bounds = (startMs, endMs, cutoffMs, anchorEventId) => ({ startMs, endMs, cutoffMs, anchorEventId });
const LIMITATIONS = [
  'Historical real-match replay, not a live sports feed. Availability simulates completed observations, not provider publication time.',
  'Observed sequences and geometry do not establish player intent, a tactical cause, or a counterfactual outcome.',
  'Full-match browser data remains downloadable; client filtering is not server-side future-data isolation.',
];
const offBallLimits = [
  'Off-ball is a provider event tag. Camera detections establish movement, not an independent no-touch or possession finding.',
  'No claim that a runner pulled a defender, created a chance or caused the outcome can be established from these observations.',
];
function ordered(rows) { return [...rows].sort((a,b) => available(a) - available(b) || a.id.localeCompare(b.id)); }
function chainTime(chain, events) {
  const ids = [...new Set([...chain.eventIds, ...(chain.supportEventIds ?? []), chain.keyEventId].filter(Boolean))];
  if (!ids.length || ids.some(id => !events.has(id))) throw new TypeError('Missing chain source.');
  return Math.max(chain.endMs, chain.available_at_ms ?? chain.endMs, ...ids.map(id => available(events.get(id))));
}

export function inspectOffBallCandidates({ demo, frames, chains }) {
  const byT = new Map(frames.map(frame => [frame.t, frame]));
  const indexByPlayer = new Map(demo.players.map((player, index) => [player.id, index]));
  const accepted = [], rejected = [];
  for (const event of ordered(demo.events.filter(event => event.type === 'off_ball_run'))) {
    const startMs = event.q?.startMs, endMs = event.q?.endMs;
    const playerIndex = indexByPlayer.get(event.player); const samples = []; let reason = null;
    if (!Number.isSafeInteger(startMs) || !Number.isSafeInteger(endMs) || endMs - startMs < 800) reason = 'duration_below_800ms_or_invalid';
    else {
      for (let t = startMs; t <= endMs; t += 100) {
        const frame = byT.get(t), point = frame?.p.find(point => point[0] === playerIndex);
        samples.push({ t, frame, point });
      }
      if (samples.at(-1)?.t !== endMs || samples.some(sample => !sample.frame)) reason = 'missing_or_non_native_sample';
      else if (samples.some(sample => sample.frame.q !== 1)) reason = 'held_or_unavailable_tracking';
      else if (samples.some(sample => !sample.point || sample.point[11] !== 1)) reason = 'player_not_camera_detected_every_sample';
      else if (samples.some(sample => sample.frame.b[2] === playerIndex)) reason = 'known_possession_during_tagged_run';
      else {
        const first = samples[0].point, last = samples.at(-1).point;
        if (Math.hypot(last[1] - first[1], last[2] - first[2]) / 100 < 5) reason = 'displacement_below_5m';
      }
    }
    if (reason) { rejected.push({ eventId: event.id, reason, startMs, endMs }); continue; }
    const chain = chains.find(chain => chain.supportEventIds?.includes(event.id));
    accepted.push({ event, playerId: event.player, playerIndex, chainId: chain?.id ?? null, startMs, endMs, samples });
  }
  return { accepted, rejected };
}

export function buildMatchInsights({ demo, frames, chains, changes, candidates, rawSamples, inputHashes }) {
  const clock = streamMs => { const ms = Number.isSafeInteger(demo.match.second_half_stream_start_ms) && streamMs >= demo.match.second_half_stream_start_ms ? demo.match.second_half_clock_start_ms + streamMs - demo.match.second_half_stream_start_ms : streamMs; return `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`; };
  const players = new Map(demo.players.map(player => [player.id, player]));
  const teams = new Map(demo.teams.map(team => [team.id, team]));
  const events = new Map(demo.events.map(event => [event.id, event]));
  const chainsById = new Map(chains.map(chain => [chain.id, chain]));
  const offBall = [], rejected = [...candidates.rejected];
  for (const row of candidates.accepted) {
    const invalid = row.samples.find(sample => {
      const raw = rawSamples.get(sample.t), point = raw?.players[row.playerId];
      return !raw || raw.period !== row.event.q.period || !point?.isDetected || !Number.isFinite(point.x) || !Number.isFinite(point.y) || Math.round(Math.max(0, Math.min(105, point.x + 52.5)) * 100) !== sample.point[1] || Math.round(Math.max(0, Math.min(68, point.y + 34)) * 100) !== sample.point[2];
    });
    if (invalid) { rejected.push({ eventId: row.event.id, reason: 'raw_camera_or_coordinate_mismatch', atMs: invalid.t }); continue; }
    const person = players.get(row.playerId), first = row.samples[0], last = row.samples.at(-1);
    const start = { x: first.point[1] / 100, y: first.point[2] / 100 }, end = { x: last.point[1] / 100, y: last.point[2] / 100 };
    // Distances refer to the SAME continuously camera-detected opponent set.
    const opponentIndices = demo.players.map((p,i) => p.teamId !== person.teamId ? i : -1).filter(i => i >= 0 && row.samples.every(s => s.frame.p.some(p => p[0] === i && p[11] === 1)));
    const nearest = sample => opponentIndices.length ? round(Math.min(...opponentIndices.map(i => { const point = sample.frame.p.find(p => p[0] === i); return Math.hypot(sample.point[1] - point[1], sample.point[2] - point[2]) / 100; }))) : null;
    const displacementM = round(Math.hypot(end.x - start.x, end.y - start.y));
    const knownOwnerSamples = row.samples.filter(s => s.frame.b[2] >= 0).length;
    // Publish the run from its own completed evidence. A future chain must not
    // delay or rewrite an already-published movement card. Links live in attacks.
    const availableAtMs = available(row.event);
    const id = `ob_${row.event.id}`;
    const limitations = [...offBallLimits, ...(knownOwnerSamples === row.samples.length ? [] : [`Possession owner was unavailable in ${row.samples.length - knownOwnerSamples} of ${row.samples.length} samples; the off-ball label is not independently verified.`]), ...(opponentIndices.length ? ['Opponent distances describe only the same continuously camera-visible subset, not all defenders or newly created space.'] : ['No opponent remained camera-visible throughout this interval; opponent spacing is unavailable.'])];
    offBall.push({ id, kind: 'off_ball_observation', playerId: row.playerId, teamId: person.teamId, chainId: null, eventId: row.event.id, availableAtMs, startMs: row.startMs, endMs: row.endMs, sourceVersion: SOURCE_VERSION, start, end,
      metrics: { displacementM, lateralChangeM: round(end.y - start.y), centreLineDistanceStartM: round(Math.abs(start.y - 34)), centreLineDistanceEndM: round(Math.abs(end.y - 34)), nearestVisibleOpponentStartM: nearest(first), nearestVisibleOpponentEndM: nearest(last) },
      quality: { cameraDetectedSamples: row.samples.length, totalSamples: row.samples.length, cameraCoverage: 1, maxGapMs: 100, heldSamples: 0, extrapolatedSamples: 0, rawVerified: true, knownPossessionSamples: knownOwnerSamples, unknownPossessionSamples: row.samples.length - knownOwnerSamples, opponentPlayerIds: opponentIndices.map(i => demo.players[i].id), opponentSampling: 'same_continuously_camera_detected_subset' },
      samples: row.samples.map(s => ({ t: s.t, sourceFrame: rawSamples.get(s.t).frame, x: s.point[1] / 100, y: s.point[2] / 100 })),
      claimIds: [`${id}_movement`], clip: bounds(Math.max(0,row.startMs - 1500), row.endMs, availableAtMs, row.event.id),
      copy: { casual: { title: `${person.name}: movement beyond the ball`, body: `Camera detections show ${displacementM.toFixed(2)} m of displacement during a provider-tagged off-ball run. ${knownOwnerSamples < row.samples.length ? 'Possession ownership is not fully known. ' : ''}Movement is observed; its tactical effect is unknown.` }, analyst: { title: `${person.name}: camera-verified displacement`, body: `${clock(row.startMs)}–${clock(row.endMs)}: ${row.samples.length}/${row.samples.length} native samples detected; displacement ${displacementM.toFixed(2)} m. Possession owner unknown in ${row.samples.length - knownOwnerSamples} samples; no causal or intent claim.` } }, limitations });
  }
  const turningPoints = [], turningRejected = [];
  for (const change of [...changes].sort((a,b) => a.detectedAtMs - b.detectedAtMs || a.changeId.localeCompare(b.changeId))) {
    const cutoff = change.detectedAtMs; const before = { startMs: Math.max(0,cutoff - 60000), endMs: cutoff - 30000 }, after = { startMs: cutoff - 30000, endMs: cutoff };
    if (before.startMs < 0 || before.endMs <= before.startMs) { turningRejected.push({ id: change.changeId, reason: 'insufficient_completed_comparison_history' }); continue; }
    const periodAt = t => t < demo.match.second_half_stream_start_ms ? 1 : 2;
    if (periodAt(before.startMs) !== periodAt(after.endMs)) { turningRejected.push({ id: change.changeId, reason: 'comparison_crosses_period_boundary' }); continue; }
    const rowsFor = interval => ordered(demo.events.filter(e => e.team === change.teamId && available(e) > interval.startMs && available(e) <= interval.endMs));
    const beforeRows = rowsFor(before), afterRows = rowsFor(after);
    const coverage = interval => { const rows = frames.filter(f => f.t > interval.startMs && f.t <= interval.endMs); return { samples: rows.length, expectedSamples: Math.floor((interval.endMs - interval.startMs) / 100), missingSamples: Math.max(0, Math.floor((interval.endMs - interval.startMs) / 100) - rows.length), trackedSamples: rows.filter(f => f.q === 1).length, trackingCoverage: round(rows.filter(f => f.q === 1).length / Math.floor((interval.endMs - interval.startMs) / 100),4) }; };
    const beforeQuality = coverage(before), afterQuality = coverage(after);
    if (beforeQuality.trackingCoverage < 0.55 || afterQuality.trackingCoverage < 0.55) { turningRejected.push({ id: change.changeId, reason: 'comparison_tracking_coverage_below_0.55', beforeQuality, afterQuality }); continue; }
    if (!beforeRows.length || !afterRows.length) { turningRejected.push({ id: change.changeId, reason: 'comparison_lacks_recorded_team_events' }); continue; }
    const value = (rows,key) => key === 'passes_attempted' ? rows.filter(e=>e.type==='pass').length : key === 'passes_completed' ? rows.filter(e=>e.type==='pass'&&e.outcome==='complete').length : key === 'shots' ? rows.filter(e=>e.type==='shot').length : rows.filter(e=>e.type==='off_ball_run').length;
    const metrics = ['passes_attempted','passes_completed','shots','off_ball_runs'].map(key=>({ key, before:value(beforeRows,key), after:value(afterRows,key), delta:value(afterRows,key)-value(beforeRows,key), unit:'recorded events' }));
    const id = `turn_${change.changeId}`, team = teams.get(change.teamId);
    const brief = metrics.map(m=>`${label(m.key)} ${m.before} → ${m.after}`).join('; ');
    const mainMetric=['passes_attempted','shots','off_ball_runs','passes_completed'].map(key=>metrics.find(metric=>metric.key===key)).find(metric=>metric.delta!==0)??metrics[0];
    const metricNames={passes_attempted:'recorded passes',passes_completed:'recorded completed passes',shots:'recorded shots',off_ball_runs:'provider-tagged off-ball runs'};
    const casualTitle=`${team.name}: ${metricNames[mainMetric.key]} ${mainMetric.before} → ${mainMetric.after}`;
    const casualBody=metrics.every(metric=>metric.delta===0)?'The recorded event counts were unchanged across these two completed 30-second samples. This small sample does not establish a cause for the rule-detected pattern change.':`${metricNames[mainMetric.key][0].toUpperCase()+metricNames[mainMetric.key].slice(1)} changed from ${mainMetric.before} to ${mainMetric.after} across two completed 30-second samples. This is a small descriptive sample, not proof of a tactical cause.`;
    turningPoints.push({ id, kind:'turning_point', teamId:change.teamId, availableAtMs:cutoff, effectiveFromMs:change.effectiveFromMs, fromState:change.fromState, toState:change.toState, confidence:change.confidence, sourceVersion:SOURCE_VERSION, before, after, metrics, eventIds:[...beforeRows,...afterRows].map(e=>e.id), claimIds:metrics.map(m=>`${id}_${m.key}`), clips:{ before:bounds(before.startMs,before.endMs,cutoff,beforeRows.at(-1).id), after:bounds(after.startMs,after.endMs,cutoff,afterRows.at(-1).id) }, quality:{ before:beforeQuality, after:afterQuality, minimumTrackingCoverage:0.55, observation:'Completed source-event counts; tracked-frame coverage is not camera detection coverage.' }, copy:{ casual:{title:casualTitle,body:casualBody},analyst:{title:`Confirmed baseline shift: ${label(change.fromState)} → ${label(change.toState)}`,body:`Detected ${clock(cutoff)} after a candidate from ${clock(change.effectiveFromMs)}. Adjacent intervals ${clock(before.startMs)}–${clock(before.endMs)} and ${clock(after.startMs)}–${clock(after.endMs)}: ${brief}. Rule confidence ${change.confidence}; this is not causal proof.`}}, limitations:['Tactical labels are a transparent heuristic over rolling features, which can include supplier-extrapolated positions; they are not camera-only findings.','The adjacent intervals describe event completion counts before detection, not the cause of the state change. Actions can begin before the counting window.','Tracking coverage only marks source availability, not per-player camera detection.'] });
  }
  const attacks = [...chains].sort((a,b)=>chainTime(a,events)-chainTime(b,events)||a.id.localeCompare(b.id)).map(chain=>{
    const availableAtMs = chainTime(chain,events); const actionRows = ordered(chain.eventIds.map(id=>events.get(id)).filter(e=>['pass','shot'].includes(e.type)));
    const observed = offBall.filter(row=>chain.supportEventIds?.includes(row.eventId)&&row.availableAtMs<=availableAtMs);
    // Select by causal event order, never by later outcome, rank, or a future top-N list.
    const chosen = actionRows.length<=4 ? actionRows : [actionRows[0],actionRows[1],actionRows.at(-2),actionRows.at(-1)];
    const claims = chosen.map((event,i)=>{
      const person=players.get(event.player),recipient=players.get(event.secondary); const kind=event.type==='shot'?'finish':i===0?'start':'progression';
      const action = event.type==='pass' ? `${person.name} attempted a pass${recipient?` toward ${recipient.name}`:''}; recorded outcome: ${event.outcome}.` : `${person.name} took a recorded shot; position-only estimated xG ${Number.isFinite(event.q?.xg)?event.q.xg:'unavailable'}.`;
      return {id:`attack_${chain.id}_${event.id}`,kind,atMs:available(event),playerIds:[event.player,...(recipient?[recipient.id]:[])],eventIds:[event.id],observationIds:[],casual:action,analyst:`${clock(event.q?.startMs??event.t)}–${clock(available(event))}: ${action}`};
    });
    for(const movement of observed.slice(0,2))claims.push({id:movement.claimIds[0],kind:'observed_support',atMs:movement.endMs,playerIds:[movement.playerId],eventIds:[movement.eventId],observationIds:[movement.id],casual:movement.copy.casual.body.replace('Camera detections',`${players.get(movement.playerId).name}: camera detections`),analyst:`${players.get(movement.playerId).name}: ${movement.copy.analyst.body}`});
    const refs=[...new Set([...chain.eventIds,...(chain.supportEventIds??[]),chain.keyEventId].filter(Boolean))];
    const xgs=actionRows.filter(e=>e.type==='shot').map(e=>e.q?.xg); const xg=xgs.every(x=>Number.isFinite(x)&&x>=0&&x<=1)?round(xgs.reduce((a,b)=>a+b,0),3):null;
    const actionClaims=claims.filter(c=>c.kind!=='observed_support');
    const focusCandidates=[{id:`focus_${chain.id}_sequence`,kind:'recorded_sequence',claimIds:actionClaims.map(c=>c.id),playerIds:[...new Set(actionClaims.flatMap(c=>c.playerIds))],casual:`${teams.get(chain.teamId).name} recorded ${actionRows.filter(e=>e.type==='pass').length} pass attempts (${actionRows.filter(e=>e.type==='pass'&&e.outcome==='complete').length} complete) and ${actionRows.filter(e=>e.type==='shot').length} shots in this sequence.`,analyst:`Recorded interval ${clock(chain.startMs)}–${clock(chain.endMs)}: ${chain.eventIds.length} source actions; ${actionRows.filter(e=>e.type==='pass').length} passes, ${actionRows.filter(e=>e.type==='pass'&&e.outcome==='complete').length} completed, ${actionRows.filter(e=>e.type==='shot').length} shots. This is a sequence description, not a cause.`}];
    const completedClaims=actionClaims.filter(c=>c.eventIds.some(id=>events.get(id).type==='pass'&&events.get(id).outcome==='complete'));
    if(completedClaims.length>=2){
      const pair=completedClaims.slice(0,2),pairEvents=pair.map(c=>events.get(c.eventIds[0]));
      const links=pairEvents.map(e=>`${players.get(e.player).name}${players.has(e.secondary)?` toward ${players.get(e.secondary).name}`:''}`).join(', then ');
      const laterShot=actionRows.find(e=>e.type==='shot'&&available(e)>=available(pairEvents[1]));
      focusCandidates.push({id:`focus_${chain.id}_progression`,kind:'recorded_progression',claimIds:pair.map(c=>c.id),playerIds:[...new Set(pair.flatMap(c=>c.playerIds))],casual:`Two recorded completed passes — ${links} — ${laterShot?'preceded the recorded shot.':'form the passing links shown in this sequence.'}`,analyst:`Passing focus: ${pair.map(c=>c.analyst).join(' ')} ${laterShot?'Both pass completions occur before the later recorded shot.':'These are ordered completed actions within the frozen chain.'} Temporal sequence does not establish causation.`});
    }
    for(const shotClaim of actionClaims.filter(c=>c.kind==='finish').slice(-1)){
      const shot=events.get(shotClaim.eventIds[0]);
      focusCandidates.push({id:`focus_${chain.id}_finish`,kind:'recorded_finish',claimIds:[shotClaim.id],playerIds:[shot.player],casual:`The finishing action shown here is ${players.get(shot.player).name}'s recorded shot${Number.isFinite(shot.q?.xg)?`, with position-only estimated xG ${shot.q.xg}`:''}.`,analyst:`Shot focus: ${shotClaim.analyst} The source establishes a recorded attempt; it does not establish shot placement, player intent or a validated chance-quality score.`});
    }
    for(const movementClaim of claims.filter(c=>c.kind==='observed_support')){
      const movement=offBall.find(row=>movementClaim.observationIds.includes(row.id));
      focusCandidates.push({id:`focus_${movement.id}`,kind:'observed_movement',claimIds:[movementClaim.id],playerIds:[movement.playerId],casual:`${players.get(movement.playerId).name} moved ${movement.metrics.displacementM.toFixed(2)} m during a provider-tagged off-ball run alongside the recorded attack.`,analyst:`Movement focus: ${movementClaim.analyst} Same continuously camera-visible opponent subset: ${movement.quality.opponentPlayerIds.length}; nearest observed distance ${movement.metrics.nearestVisibleOpponentStartM??'unavailable'} → ${movement.metrics.nearestVisibleOpponentEndM??'unavailable'} m. This is geometry, not created space or defender intent.`});
    }
    return {chainId:chain.id,teamId:chain.teamId,availableAtMs,startMs:chain.startMs,endMs:chain.endMs,sourceVersion:SOURCE_VERSION,eventIds:refs,participantIds:[...new Set([...chain.participantIds,...claims.flatMap(c=>c.playerIds)])],claims,focusCandidates,offBallIds:observed.map(row=>row.id),facts:{actions:chain.eventIds.length,passes:actionRows.filter(e=>e.type==='pass').length,completed_passes:actionRows.filter(e=>e.type==='pass'&&e.outcome==='complete').length,shots:actionRows.filter(e=>e.type==='shot').length,xg_estimate:xg,camera_off_ball_observations:observed.length},clip:bounds(Math.max(0,Math.min(chain.replayStartMs??chain.startMs,...claims.flatMap(c=>c.eventIds).map(id=>events.get(id).q?.startMs??events.get(id).t))),Math.min(availableAtMs,Math.max(chain.replayEndMs??chain.endMs,...claims.flatMap(c=>c.eventIds).map(id=>Math.max(events.get(id).t,events.get(id).q?.endMs??events.get(id).t)))),availableAtMs,chain.keyEventId),limitations:[{id:'sequence_not_cause',text:'These recorded actions explain the sequence, not why a player chose an action or a counterfactual outcome.'},{id:'xg_estimate',text:'xG is a position-only demonstration estimate; shot outcomes may be inferred from subsequent events.'},...(observed.length?[{id:'off_ball_camera_scope',text:offBallLimits.join(' ')},{id:'possession_observation',text:'Possession owner can be unavailable. Off-ball movement is provider-tagged and camera-observed, not independent proof of no touch, created space or defender intent.'}]:[{id:'off_ball_unavailable',text:'No provider-tagged off-ball run in this chain passed the full continuous-camera observation gate.'}])]};
  });
  const product={schemaVersion:'matchmind-insights/1.0',matchId:demo.match.match_id,sourceVersion:SOURCE_VERSION,policyVersion:INSIGHT_POLICY_VERSION,inputHashes,policy:{availableAt:'completed referenced source events; movement cards publish at their own completion and chain links appear only in completed attacks',comparison:'adjacent completed 30-second intervals ending at detection',offBall:{minimumDurationMs:800,minimumDisplacementM:5,sampleStepMs:100,minimumCameraCoverage:1,rawCameraVerified:true,excludeHeld:true,excludeExtrapolated:true,opponents:'same continuously camera-visible subset'},attackClaimLimit:6},turningPoints,offBall,attacks,limitations:LIMITATIONS};
  return {product,audit:{kind:'developer source audit; independent QA required',version:INSIGHT_POLICY_VERSION,sourceMatchId:2017461,sourceSynthetic:false,offBallInput:demo.events.filter(e=>e.type==='off_ball_run').length,offBallAccepted:offBall.length,offBallRejected:rejected,turningInput:changes.length,turningAccepted:turningPoints.length,turningRejected,attacks:attacks.length,firstRecording:{turningPoint:turningPoints[0],offBall:offBall.find(row=>chainsById.get('chance_001')?.supportEventIds.includes(row.eventId)),attack:attacks[0]}}};
}
