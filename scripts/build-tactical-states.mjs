import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { advanceStateCandidate } from './lib/tactical-continuity.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const dataDir = join(projectRoot, 'dist', 'data');
const liveDir = join(dataDir, 'live');
const qualityDir = join(dataDir, 'quality');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const round = (value, digits = 4) => Number(Number(value || 0).toFixed(digits));
const high = (value, low, highValue) => clamp((value - low) / Math.max(0.0001, highValue - low));
const low = (value, lowValue, highValue) => 1 - high(value, lowValue, highValue);
const peak = (value, lowValue, middle, highValue) => value <= middle ? high(value, lowValue, middle) : low(value, middle, highValue);
const average = (...values) => values.reduce((sum, value) => sum + value, 0) / values.length;

const features = await readJson(join(liveDir, 'team-window-features.json'));
const baselines = await readJson(join(dataDir, 'history', 'team-baselines.json'));
const demo = await readJson(join(dataDir, 'demo.json'));
const teamIds = demo.teams.map((team) => team.id);
const baselineByTeam = new Map(baselines.map((row) => [`sk_team_${row.team.id}`, row]));
const rowsByKey = new Map(features.rows.map((row) => [`${row.windowEndMs}:${row.requestedWindowMs}:${row.teamId}`, row]));
const analysisTimes = [...new Set(features.rows.map((row) => row.windowEndMs))].sort((a, b) => a - b);

const stateFamilies = {
  build_up: 'organized_attack',
  controlled_progression: 'organized_attack',
  attacking_third_siege: 'organized_attack',
  direct_play: 'organized_attack',
  counter_attack: 'attacking_transition',
  high_press: 'organized_defense',
  mid_block: 'organized_defense',
  low_block: 'organized_defense',
  counter_press: 'defensive_transition',
  recover_shape: 'defensive_transition',
};

function scoreStates(own, opponent, baseline) {
  const possession = own.territory.possessionShare;
  const attackingThird = own.territory.attackingThirdShareOfPossession;
  const centroid = own.structure.centroidX;
  const defensiveLine = own.structure.defensiveLineXM;
  const compactness = own.structure.compactnessM;
  const speed = own.structure.averageSpeedMps;
  const passCompletion = own.progression.passCompletion;
  const forwardShare = own.progression.forwardPassShare;
  const longShare = own.progression.longPassShare;
  const minutes = Math.max(0.1, (own.windowEndMs - own.windowStartMs) / 60_000);
  const finalThirdEntriesPerMinute = own.progression.finalThirdEntries / minutes;
  const lineBreaksPerMinute = own.progression.lineBreakPasses / minutes;
  const regainsPerMinute = own.transition.regains / minutes;
  const highRegainsPerMinute = own.transition.highRegains / minutes;
  const counterPressesPerMinute = own.pressure.counterPresses / minutes;
  const turnoversPerMinute = own.transition.turnovers / minutes;
  const historyPressurePerMinute = (baseline?.metrics?.event?.per90?.pressureActions?.median || 270) / 90;
  const pressureRelative = own.pressure.actionsPerMinute / Math.max(0.5, historyPressurePerMinute);
  const attackGate = high(possession, 0.42, 0.68);
  const defendGate = low(possession, 0.32, 0.58);
  const transitionGate = peak(possession, 0.15, 0.5, 0.85);

  const scores = {
    build_up: average(attackGate, low(centroid, 42, 62), high(passCompletion, 0.72, 0.9), low(attackingThird, 0.08, 0.42)),
    controlled_progression: average(attackGate, peak(centroid, 38, 53, 69), high(passCompletion, 0.7, 0.9), high(lineBreaksPerMinute, 0.2, 1.5)),
    attacking_third_siege: average(attackGate, high(attackingThird, 0.22, 0.68), high(centroid, 50, 70), high(finalThirdEntriesPerMinute + own.threat.shots / minutes, 0.25, 1.8)),
    direct_play: average(attackGate, high(forwardShare, 0.2, 0.52), high(longShare, 0.04, 0.22), high(lineBreaksPerMinute, 0.15, 1.5)),
    counter_attack: average(transitionGate, high(regainsPerMinute, 0.4, 2.0), high(highRegainsPerMinute, 0.05, 0.8), high(forwardShare, 0.22, 0.5), high(speed, 1.7, 2.7), high(finalThirdEntriesPerMinute, 0.15, 1.1)),
    high_press: average(defendGate, high(defensiveLine, 34, 55), high(pressureRelative, 0.8, 2.2), high(own.pressure.defendersWithin5m, 0.25, 0.9), high(highRegainsPerMinute, 0.05, 0.8)),
    mid_block: average(defendGate, peak(defensiveLine, 22, 37, 52), peak(compactness, 10.5, 14, 17.5), peak(pressureRelative, 0.35, 1.15, 2.2)),
    low_block: average(defendGate, low(defensiveLine, 23, 41), low(centroid, 31, 52), high(opponent.territory.attackingThirdShareOfPossession, 0.16, 0.62), high(compactness, 11, 15.5)),
    counter_press: average(defendGate, high(counterPressesPerMinute, 0.03, 0.35), high(regainsPerMinute, 0.5, 2.2), high(pressureRelative, 0.85, 2.0), high(turnoversPerMinute, 0.25, 1.4)),
    recover_shape: average(defendGate, high(turnoversPerMinute, 0.25, 1.4), high(speed, 1.7, 2.7), low(defensiveLine, 27, 48), high(opponent.territory.possessionShare, 0.45, 0.75)),
  };
  return Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, round(value)]));
}

function classify(feature, opponent, baseline) {
  if (!feature || !opponent || feature.coverage < 0.55 || opponent.coverage < 0.55) {
    return { status: 'insufficient_data', primaryState: null, family: null, confidence: 0, scores: {}, reason: 'tracking_coverage_below_0.55' };
  }
  const scores = scoreStates(feature, opponent, baseline);
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primaryState, top] = ranked[0];
  const second = ranked[1]?.[1] || 0;
  const margin = top - second;
  if (top < 0.45) return { status: 'uncertain', primaryState: null, family: null, confidence: round(top * feature.coverage), scores, reason: 'no_state_above_threshold' };
  return {
    status: 'available',
    primaryState,
    family: stateFamilies[primaryState],
    confidence: round(clamp((0.5 + margin * 0.9) * feature.coverage)),
    scores,
    reason: null,
  };
}

function modifiers(feature) {
  const channels = feature.progression.attackingChannelShare;
  const channel = Object.entries(channels).sort((a, b) => b[1] - a[1])[0] || ['center', 0];
  return {
    width: feature.structure.widthM >= 30 ? 'wide' : feature.structure.widthM <= 23 ? 'narrow' : 'balanced',
    defensiveLine: feature.structure.defensiveLineXM >= 47 ? 'high' : feature.structure.defensiveLineXM <= 29 ? 'low' : 'medium',
    intensity: feature.pressure.actionsPerMinute >= 7 ? 'high' : feature.pressure.actionsPerMinute <= 2 ? 'low' : 'medium',
    dominantChannel: channel[1] >= 0.36 ? channel[0] : 'mixed',
    dominantChannelShare: round(channel[1]),
    localAdvantage18m: feature.territory.localAdvantage18m >= 0.7 ? 'overload' : feature.territory.localAdvantage18m <= -0.7 ? 'underload' : 'balanced',
  };
}

function controlIndex(own, opponent) {
  const territory = clamp((own.territory.possessionShare - opponent.territory.possessionShare) * 65
    + (own.territory.attackingThirdShareOfPossession - opponent.territory.attackingThirdShareOfPossession) * 35
    + (own.structure.centroidX - opponent.structure.centroidX) * 0.8, -50, 50);
  const progression = clamp((own.progression.finalThirdEntries - opponent.progression.finalThirdEntries) * 4
    + (own.progression.lineBreakPasses - opponent.progression.lineBreakPasses) * 2.2
    + (own.progression.penaltyAreaEntries - opponent.progression.penaltyAreaEntries) * 6, -30, 30);
  const threat = clamp((own.threat.positionXg - opponent.threat.positionXg) * 18
    + (own.threat.shots - opponent.threat.shots) * 3
    + (own.threat.positivePassEpv - opponent.threat.positivePassEpv) * 10, -25, 25);
  const pressure = clamp((own.pressure.actionsPerMinute - opponent.pressure.actionsPerMinute) * 1.8
    + (own.transition.highRegains - opponent.transition.highRegains) * 3, -20, 20);
  const raw = territory * 0.45 + progression * 0.25 + threat * 0.2 + pressure * 0.1;
  return { value: round(clamp(raw * 2, -100, 100), 1), components: { territory: round(territory, 1), progression: round(progression, 1), threat: round(threat, 1), pressure: round(pressure, 1) } };
}

function evidence(primaryState, feature) {
  const common = {
    possession_share: feature.territory.possessionShare,
    centroid_x_m: feature.structure.centroidX,
    defensive_line_x_m: feature.structure.defensiveLineXM,
    pressure_actions_per_minute: feature.pressure.actionsPerMinute,
    attacking_third_share: feature.territory.attackingThirdShareOfPossession,
    forward_pass_share: feature.progression.forwardPassShare,
    long_pass_share: feature.progression.longPassShare,
    regains: feature.transition.regains,
    high_regains: feature.transition.highRegains,
    local_advantage_18m: feature.territory.localAdvantage18m,
  };
  const relevant = {
    build_up: ['possession_share', 'centroid_x_m', 'forward_pass_share'],
    controlled_progression: ['possession_share', 'centroid_x_m', 'forward_pass_share'],
    attacking_third_siege: ['attacking_third_share', 'centroid_x_m', 'local_advantage_18m'],
    direct_play: ['forward_pass_share', 'long_pass_share', 'attacking_third_share'],
    counter_attack: ['regains', 'high_regains', 'forward_pass_share'],
    high_press: ['defensive_line_x_m', 'pressure_actions_per_minute', 'high_regains'],
    mid_block: ['defensive_line_x_m', 'pressure_actions_per_minute', 'possession_share'],
    low_block: ['defensive_line_x_m', 'possession_share', 'attacking_third_share'],
    counter_press: ['pressure_actions_per_minute', 'regains', 'high_regains'],
    recover_shape: ['defensive_line_x_m', 'possession_share', 'pressure_actions_per_minute'],
  }[primaryState] || [];
  return relevant.map((metric) => ({ metric, value: round(common[metric]) }));
}

function featureDeltas(before, after) {
  const values = [
    ['possession_share', before.territory.possessionShare, after.territory.possessionShare],
    ['centroid_x_m', before.structure.centroidX, after.structure.centroidX],
    ['defensive_line_x_m', before.structure.defensiveLineXM, after.structure.defensiveLineXM],
    ['width_m', before.structure.widthM, after.structure.widthM],
    ['pressure_actions_per_minute', before.pressure.actionsPerMinute, after.pressure.actionsPerMinute],
    ['attacking_third_share', before.territory.attackingThirdShareOfPossession, after.territory.attackingThirdShareOfPossession],
    ['forward_pass_share', before.progression.forwardPassShare, after.progression.forwardPassShare],
    ['long_pass_share', before.progression.longPassShare, after.progression.longPassShare],
  ];
  const scales = { possession_share: 0.25, centroid_x_m: 12, defensive_line_x_m: 12, width_m: 8, pressure_actions_per_minute: 4, attacking_third_share: 0.25, forward_pass_share: 0.2, long_pass_share: 0.12 };
  return values.map(([metric, from, to]) => ({ metric, from: round(from), to: round(to), delta: round(to - from), importance: round(Math.abs(to - from) / scales[metric]) }))
    .sort((a, b) => b.importance - a.importance).slice(0, 4);
}

const stateRows = [];
const changes = [];
const machines = new Map(teamIds.map((teamId) => [teamId, { current: null, currentFeature: null, candidate: null, candidateSince: null, candidateCount: 0 }]));
const macroMachines = new Map(teamIds.map((teamId) => [teamId, { current: null, currentFeature: null, candidate: null, candidateSince: null, candidateCount: 0 }]));

for (const atMs of analysisTimes) {
  const pair90 = new Map(teamIds.map((teamId) => [teamId, rowsByKey.get(`${atMs}:90000:${teamId}`)]));
  const pair300 = new Map(teamIds.map((teamId) => [teamId, rowsByKey.get(`${atMs}:300000:${teamId}`)]));
  for (const teamId of teamIds) {
    const opponentId = teamIds.find((id) => id !== teamId);
    const feature = pair90.get(teamId);
    const opponentFeature = pair90.get(opponentId);
    const macroFeature = pair300.get(teamId);
    const macroOpponent = pair300.get(opponentId);
    const baseline = baselineByTeam.get(teamId);
    const micro = classify(feature, opponentFeature, baseline);
    const macro = classify(macroFeature, macroOpponent, baseline);
    const microResult = advanceStateCandidate(machines.get(teamId), {
      atMs, status: micro.status, primaryState: micro.primaryState, confidence: micro.confidence, feature,
    }, { stepMs: features.stepMs, requiredSamples: 3 });
    machines.set(teamId, microResult.machine);
    const confirmed = microResult.confirmedState;
    const provisional = microResult.provisional;
    const macroResult = advanceStateCandidate(macroMachines.get(teamId), {
      atMs, status: macro.status, primaryState: macro.primaryState, confidence: macro.confidence, feature: macroFeature,
    }, { stepMs: features.stepMs, requiredSamples: 12, minConfidence: 0.38 });
    macroMachines.set(teamId, macroResult.machine);
    const macroConfirmed = macroResult.confirmedState;
    const macroProvisional = macroResult.provisional;
    if (macroResult.transition) {
      const change = macroResult.transition;
      changes.push({
        changeId: `tc_${teamId}_${atMs}`,
        matchId: demo.match.match_id,
        teamId,
        effectiveFromMs: change.effectiveFromMs,
        detectedAtMs: change.detectedAtMs,
        fromState: change.fromState,
        toState: change.toState,
        confidence: macro.confidence,
        coverage: macroFeature.coverage,
        featureDeltas: change.beforeFeature ? featureDeltas(change.beforeFeature, macroFeature) : [],
        modelVersion: 'transparent-tactical-baseline/1.1',
      });
    }

    const control = feature && opponentFeature ? controlIndex(feature, opponentFeature) : { value: 0, components: {} };
    stateRows.push({
      matchId: demo.match.match_id,
      teamId,
      asOfMs: atMs,
      status: micro.status,
      coverage: feature?.coverage || 0,
      featureVersion: features.schemaVersion,
      modelVersion: 'transparent-tactical-baseline/1.1',
      micro: { ...micro, confirmedState: micro.status === 'available' ? confirmed : null, provisional },
      macro: { ...macro, confirmedState: macro.status === 'available' ? macroConfirmed : null, provisional: macroProvisional, modifiers: macroFeature ? modifiers(macroFeature) : null },
      modifiers: feature ? modifiers(feature) : null,
      control,
      evidence: micro.primaryState && feature ? evidence(micro.primaryState, feature) : [],
    });
  }
}

const assertions = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}
const available = stateRows.filter((row) => row.status === 'available');
const states = [...new Set(available.map((row) => row.micro.confirmedState).filter(Boolean))];
check('one state row per team and analysis time', stateRows.length === analysisTimes.length * teamIds.length, `${stateRows.length}`);
check('low coverage is rejected', stateRows.filter((row) => row.coverage < 0.55).every((row) => row.status === 'insufficient_data'), 'coverage < 0.55');
check('available rows meet coverage threshold', available.every((row) => row.coverage >= 0.55), `${available.length} available rows`);
check('provider phase labels absent', !JSON.stringify({ stateRows, changes }).includes('team_in_possession_phase_type'), 'no provider phase field');
check('at least four tactical states observed', states.length >= 4, states.join(', '));
check('changes are delayed confirmations', changes.every((row) => row.detectedAtMs - row.effectiveFromMs >= 110_000), `${changes.length} changes`);
check('confirmed changes meet confidence floor', changes.every((row) => row.confidence >= 0.38), 'confidence >= 0.38');
check('change times are causal', changes.every((row) => row.effectiveFromMs <= row.detectedAtMs), 'effective <= detected');
check('control index bounded', stateRows.every((row) => row.control.value >= -100 && row.control.value <= 100), '-100..100');
const grouped = new Map();
for (const row of stateRows) {
  const group = grouped.get(row.asOfMs) || [];
  group.push(row.control.value);
  grouped.set(row.asOfMs, group);
}
check('control index is symmetric', [...grouped.values()].every((values) => values.length === 2 && Math.abs(values[0] + values[1]) <= 0.2), 'team values sum to zero');

const failed = assertions.filter((row) => !row.passed);
const distribution = available.reduce((counts, row) => {
  const key = row.micro.confirmedState || 'unconfirmed';
  counts[key] = (counts[key] || 0) + 1;
  return counts;
}, {});

await mkdir(liveDir, { recursive: true });
await mkdir(qualityDir, { recursive: true });
await writeFile(join(liveDir, 'tactical-states.json'), JSON.stringify({
  schemaVersion: 'transparent-tactical-baseline/1.1',
  generatedAt: new Date().toISOString(),
  matchId: demo.match.match_id,
  inputFeatureVersion: features.schemaVersion,
  policy: { providerPhaseLabelsUsed: false, minimumCoverage: 0.55, microSwitchConfirmationSamples: 3, macroSwitchConfirmationSamples: 12, analysisStepMs: features.stepMs, switchRequiresConsecutiveQualifiedSamples: true, interruptionsResetCandidate: true, initialization: 'first qualified observation; not a confirmed switch' },
  rows: stateRows,
}, null, 2), 'utf8');
await writeFile(join(liveDir, 'tactical-changes.json'), JSON.stringify({
  schemaVersion: 'tactical-changes/1.1',
  generatedAt: new Date().toISOString(),
  matchId: demo.match.match_id,
  changes,
}, null, 2), 'utf8');
await writeFile(join(qualityDir, 'tactical-state-report.json'), JSON.stringify({
  schemaVersion: 'tactical-state-quality/1.1',
  generatedAt: new Date().toISOString(),
  passed: failed.length === 0,
  assertions,
  stats: { rows: stateRows.length, availableRows: available.length, changes: changes.length, states, distribution },
  caveat: 'This is a transparent rules baseline over tracking and causal events. SkillCorner phase labels are reserved for later offline evaluation.',
}, null, 2), 'utf8');

console.log(`Wrote ${stateRows.length} tactical states and ${changes.length} confirmed changes.`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed; states: ${states.join(', ')}.`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
