import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANALYSIS_CONTRACT_VERSION, eventInWindow, normalizeEventForAnalysis, parseSourceCsv } from './lib/analysis-contract.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const dataDir = join(projectRoot, 'dist', 'data');
const liveDir = join(dataDir, 'live');
const qualityDir = join(dataDir, 'quality');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const horizons = [120_000, 300_000, 600_000];
const cutoffStepMs = 300_000;
const firstCutoffMs = 300_000;

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const round = (value, digits = 4) => Number(Number(value || 0).toFixed(digits));

function normalize(scores) {
  const total = Object.values(scores).reduce((sum, value) => sum + Math.max(0, value), 0);
  return Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, round(Math.max(0, value) / Math.max(0.0001, total))]));
}

function topScenario(probabilities) {
  return Object.entries(probabilities).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function hashSnapshot(snapshot) {
  return createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
}

function channel3(channel) {
  return ['wide_left', 'half_space_left'].includes(channel) ? 'left' : channel === 'center' ? 'center' : ['half_space_right', 'wide_right'].includes(channel) ? 'right' : null;
}

const demo = await readJson(join(dataDir, 'demo.json'));
const features = await readJson(join(liveDir, 'team-window-features.json'));
const states = await readJson(join(liveDir, 'tactical-states.json'));
const historicalMatches = await readJson(join(dataDir, 'history', 'team-match-features.json'));
const sourceMatchId = String(demo.match.source_match_id);
const sourceEvents = parseSourceCsv(await readFile(join(sourceRoot, 'data', 'matches', sourceMatchId, `${sourceMatchId}_dynamic_events.csv`), 'utf8'));
const sourceByEventId = new Map(sourceEvents.map((row) => [`sk_event_${row.event_id}`, row]));
const spatialByEventId = new Map(demo.events.map((event) => [event.id, normalizeEventForAnalysis(event, sourceByEventId.get(event.id))]));
const teamIds = demo.teams.map((team) => team.id);
const stateByKey = new Map(states.rows.map((row) => [`${row.asOfMs}:${row.teamId}`, row]));
const featureByKey = new Map(features.rows.map((row) => [`${row.windowEndMs}:${row.requestedWindowMs}:${row.teamId}`, row]));

function nearestState(atMs, teamId) {
  const bounded = Math.floor(atMs / features.stepMs) * features.stepMs;
  return stateByKey.get(`${bounded}:${teamId}`) || null;
}

function stateAgeMs(cutoffMs, teamId, stateName) {
  let age = 0;
  for (let time = cutoffMs; time >= features.stepMs; time -= features.stepMs) {
    const row = stateByKey.get(`${time}:${teamId}`);
    if (!row || row.macro.confirmedState !== stateName) break;
    age += features.stepMs;
  }
  return age;
}

function historicalChannelPrior(teamId) {
  const rawTeamId = teamId.replace('sk_team_', '');
  const rows = historicalMatches.filter((row) => String(row.team.id) === rawTeamId);
  const counts5 = { wide_left: 1, half_space_left: 1, center: 1, half_space_right: 1, wide_right: 1 };
  let longPasses = 1;
  for (const row of rows) {
    for (const key of Object.keys(counts5)) counts5[key] += row.event.attackingChannelCounts[key] || 0;
    longPasses += row.event.passesAttempted * row.event.longPassShare;
  }
  const counts3 = {
    left: counts5.wide_left + counts5.half_space_left,
    center: counts5.center,
    right: counts5.half_space_right + counts5.wide_right,
    long: longPasses,
  };
  return { channel3: normalize(counts3), channel5: normalize(counts5), matches: rows.length };
}

const historyPriorByTeam = new Map(teamIds.map((id) => [id, historicalChannelPrior(id)]));

function recentChannelPrior(feature) {
  const share = feature.progression.attackingChannelShare;
  const channel5Scores = {
    wide_left: share.wide_left + 0.02,
    half_space_left: share.half_space_left + 0.02,
    center: share.center + 0.02,
    half_space_right: share.half_space_right + 0.02,
    wide_right: share.wide_right + 0.02,
  };
  const channel3Scores = {
    left: share.wide_left + share.half_space_left + 0.03,
    center: share.center + 0.03,
    right: share.half_space_right + share.wide_right + 0.03,
    long: feature.progression.longPassShare + 0.03,
  };
  return { channel3: normalize(channel3Scores), channel5: normalize(channel5Scores) };
}

function blend(prior, recent, recentWeight) {
  return normalize(Object.fromEntries(Object.keys(prior).map((key) => [key, prior[key] * (1 - recentWeight) + recent[key] * recentWeight])));
}

function persistenceProbability(stateRow, ageMs, horizonMs) {
  const base = horizonMs === 120_000 ? 0.68 : horizonMs === 300_000 ? 0.52 : 0.38;
  const ageBonus = Math.min(0.13, ageMs / Math.max(horizonMs, 1) * 0.08);
  const confidenceAdjustment = (stateRow.macro.confidence - 0.45) * 0.3;
  const coverageAdjustment = (stateRow.coverage - 0.65) * 0.18;
  const provisionalPenalty = stateRow.macro.provisional ? Math.min(0.16, stateRow.macro.provisional.samples * 0.018) : 0;
  return clamp(base + ageBonus + confidenceAdjustment + coverageAdjustment - provisionalPenalty, 0.15, 0.85);
}

const snapshots = [];
for (let cutoffMs = firstCutoffMs; cutoffMs < demo.match.duration_ms; cutoffMs += cutoffStepMs) {
  for (const defendingTeamId of teamIds) {
    const attackingTeamId = teamIds.find((id) => id !== defendingTeamId);
    const stateRow = nearestState(cutoffMs, defendingTeamId);
    const attackingFeature = featureByKey.get(`${cutoffMs}:300000:${attackingTeamId}`);
    if (!stateRow || stateRow.macro.status !== 'available' || !stateRow.macro.confirmedState || !attackingFeature || attackingFeature.coverage < 0.55) continue;
    const history = historyPriorByTeam.get(attackingTeamId);
    const recent = recentChannelPrior(attackingFeature);
    for (const horizonMs of horizons) {
      const recentWeight = horizonMs === 120_000 ? 0.62 : horizonMs === 300_000 ? 0.48 : 0.34;
      const escape = blend(history.channel3, recent.channel3, recentWeight);
      if (['high_press', 'counter_press'].includes(stateRow.macro.confirmedState)) escape.long += 0.08;
      const escapeProbabilities = normalize(escape);
      const riskProbabilities = blend(history.channel5, recent.channel5, recentWeight);
      const persistence = persistenceProbability(stateRow, stateAgeMs(cutoffMs, defendingTeamId, stateRow.macro.confirmedState), horizonMs);
      const snapshot = {
        forecastId: `fc_v1_1_${cutoffMs}_${horizonMs}_${defendingTeamId}`,
        matchId: demo.match.match_id,
        createdAtMs: cutoffMs,
        cutoffMs,
        horizonMs,
        validUntilMs: cutoffMs + horizonMs,
        defendingTeamId,
        attackingTeamId,
        inputFeatureVersion: features.schemaVersion,
        modelVersion: 'transparent-forecast-baseline/1.1',
        support: {
          historyMatches: history.matches,
          currentCoverage: attackingFeature.coverage,
          currentDefensiveState: stateRow.macro.confirmedState,
          currentStateConfidence: stateRow.macro.confidence,
          currentStateAgeMs: stateAgeMs(cutoffMs, defendingTeamId, stateRow.macro.confirmedState),
          fallbackLevel: 'three_match_prior_plus_current_window',
        },
        tasks: {
          regimePersistence: {
            targetState: stateRow.macro.confirmedState,
            probabilities: { persist: round(persistence), change: round(1 - persistence) },
          },
          pressEscape: {
            probabilities: escapeProbabilities,
            topScenario: topScenario(escapeProbabilities),
          },
          zoneRisk: {
            probabilities: riskProbabilities,
            topScenario: topScenario(riskProbabilities),
          },
        },
      };
      snapshots.push({ ...snapshot, immutableHash: hashSnapshot(snapshot) });
    }
  }
}

function actualFutureChannels(attackingTeamId, startMs, endMs) {
  const passes = demo.events.filter((event) => {
    const spatial = spatialByEventId.get(event.id);
    return event.type === 'pass' && event.team === attackingTeamId && event.outcome === 'complete' && eventInWindow(event, startMs, endMs)
      && spatial.attackingSide && spatial.thirdEnd === 'attacking_third' && spatial.channelEnd;
  });
  const counts3 = { left: 0, center: 0, right: 0, long: 0 };
  const counts5 = { wide_left: 0, half_space_left: 0, center: 0, half_space_right: 0, wide_right: 0 };
  let escapePasses = 0;
  for (const event of passes) {
    const spatial = spatialByEventId.get(event.id);
    if (['short', 'medium', 'long'].includes(event.q?.passRange)) {
      escapePasses += 1;
      if (event.q.passRange === 'long') counts3.long += 1;
      else counts3[channel3(spatial.channelEnd)] += 1;
    }
    counts5[spatial.channelEnd] += 1;
  }
  return { passes: passes.length, escapePasses, channel3: counts3, channel5: counts5 };
}

function brier(probabilities, actual) {
  const keys = Object.keys(probabilities);
  return keys.reduce((sum, key) => sum + (probabilities[key] - (key === actual ? 1 : 0)) ** 2, 0) / keys.length;
}

const outcomes = snapshots.map((snapshot) => {
  if (snapshot.validUntilMs > demo.match.duration_ms) return { forecastId: snapshot.forecastId, status: 'pending', resolvedAtMs: null, taskOutcomes: null };
  const futureState = nearestState(snapshot.validUntilMs, snapshot.defendingTeamId);
  const actualChannels = actualFutureChannels(snapshot.attackingTeamId, snapshot.cutoffMs, snapshot.validUntilMs);
  const persistenceActual = futureState?.macro?.confirmedState === snapshot.tasks.regimePersistence.targetState ? 'persist' : 'change';
  const actualEscape = topScenario(actualChannels.channel3);
  const actualRisk = topScenario(actualChannels.channel5);
  const enoughEscapePasses = actualChannels.escapePasses >= 3;
  const enoughRiskPasses = actualChannels.passes >= 3;
  const persistenceTop = topScenario(snapshot.tasks.regimePersistence.probabilities);
  return {
    forecastId: snapshot.forecastId,
    status: futureState?.macro?.confirmedState ? 'resolved' : 'unscorable',
    resolvedAtMs: snapshot.validUntilMs,
    taskOutcomes: {
      regimePersistence: futureState?.macro?.confirmedState ? {
        actual: persistenceActual,
        status: persistenceTop === persistenceActual ? 'supported' : 'contradicted',
        brier: round(brier(snapshot.tasks.regimePersistence.probabilities, persistenceActual)),
      } : { actual: null, status: 'unscorable', brier: null },
      pressEscape: enoughEscapePasses ? {
        actual: actualEscape,
        sampleSize: actualChannels.escapePasses,
        status: snapshot.tasks.pressEscape.topScenario === actualEscape ? 'supported' : 'contradicted',
        brier: round(brier(snapshot.tasks.pressEscape.probabilities, actualEscape)),
      } : { actual: null, sampleSize: actualChannels.escapePasses, status: 'unscorable', brier: null },
      zoneRisk: enoughRiskPasses ? {
        actual: actualRisk,
        sampleSize: actualChannels.passes,
        status: snapshot.tasks.zoneRisk.topScenario === actualRisk ? 'supported' : 'contradicted',
        brier: round(brier(snapshot.tasks.zoneRisk.probabilities, actualRisk)),
      } : { actual: null, sampleSize: actualChannels.passes, status: 'unscorable', brier: null },
    },
  };
});

const resolvedTasks = outcomes.flatMap((row) => row.taskOutcomes ? Object.values(row.taskOutcomes) : []).filter((row) => Number.isFinite(row.brier));
const persistenceTasks = outcomes.map((row) => row.taskOutcomes?.regimePersistence).filter((row) => Number.isFinite(row?.brier));
const supported = resolvedTasks.filter((row) => row.status === 'supported').length;
const contradicted = resolvedTasks.filter((row) => row.status === 'contradicted').length;
const meanBrier = resolvedTasks.reduce((sum, row) => sum + row.brier, 0) / Math.max(1, resolvedTasks.length);
const persistenceBrier = persistenceTasks.reduce((sum, row) => sum + row.brier, 0) / Math.max(1, persistenceTasks.length);

const assertions = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}
const probabilitySums = snapshots.flatMap((row) => Object.values(row.tasks).map((task) => Object.values(task.probabilities).reduce((sum, value) => sum + value, 0)));
check('at least twenty immutable snapshots', snapshots.length >= 20, `${snapshots.length} snapshots`);
check('all probabilities sum to one', probabilitySums.every((sum) => Math.abs(sum - 1) <= 0.001), 'tolerance 0.001');
check('all inputs end at cutoff', snapshots.every((row) => row.createdAtMs === row.cutoffMs && row.support.currentStateAgeMs <= row.cutoffMs), 'causal cutoff');
check('immutable hashes verify', snapshots.every((row) => {
  const { immutableHash, ...snapshot } = row;
  return hashSnapshot(snapshot) === immutableHash;
}), `${snapshots.length} hashes`);
check('provider labels excluded', !JSON.stringify(snapshots).includes('team_in_possession_phase_type'), 'no provider phase fields');
check('both supported and contradicted outcomes exist', supported > 0 && contradicted > 0, `supported=${supported}, contradicted=${contradicted}`);
check('at least twenty scored persistence forecasts', persistenceTasks.length >= 20, `${persistenceTasks.length}`);
check('Brier scores are bounded', resolvedTasks.every((row) => row.brier >= 0 && row.brier <= 1), `${resolvedTasks.length} scored tasks`);

const failed = assertions.filter((row) => !row.passed);
await mkdir(liveDir, { recursive: true });
await mkdir(qualityDir, { recursive: true });
await writeFile(join(liveDir, 'forecast-snapshots.json'), JSON.stringify({
  schemaVersion: 'transparent-forecast-baseline/1.1',
  generatedAt: new Date().toISOString(),
  matchId: demo.match.match_id,
  policy: {
    immutable: true, horizons, cutoffStepMs, providerPhaseLabelsUsed: false,
    analysisContractVersion: ANALYSIS_CONTRACT_VERSION,
    rebuild: 'Offline version 1.1 rebuild; does not revise a previously issued online ledger.',
    pressEscapeMeaning: 'Future completed-pass channel proxy, not verified pressure escape.',
    zoneRiskMeaning: 'Future completed-pass zone proxy, not verified territorial risk.',
    outcomeSample: 'Completed passes with endpoint-matched attacking-third and channel labels (targeted reception when selected by converter, else source end); unknown labels excluded; action end in (cutoff,horizon end] and available by horizon end.',
  },
  snapshots,
}, null, 2), 'utf8');
await writeFile(join(liveDir, 'forecast-outcomes.json'), JSON.stringify({
  schemaVersion: 'forecast-outcomes/1.1',
  generatedAt: new Date().toISOString(),
  matchId: demo.match.match_id,
  outcomes,
}, null, 2), 'utf8');
await writeFile(join(qualityDir, 'forecast-report.json'), JSON.stringify({
  schemaVersion: 'forecast-quality/1.1',
  generatedAt: new Date().toISOString(),
  passed: failed.length === 0,
  assertions,
  metrics: {
    snapshots: snapshots.length,
    resolvedTasks: resolvedTasks.length,
    supported,
    contradicted,
    meanBrier: round(meanBrier),
    persistenceForecasts: persistenceTasks.length,
    persistenceBrier: round(persistenceBrier),
  },
  caveat: 'Scores are an in-sample demonstration on one historical match. State targets come from the same rules; channel targets are completed-pass proxies. Task/horizon-matched uniform and always-persist comparisons are recorded separately in forecast-baseline-evaluation.json; this aggregate report is not a baseline comparison. No independent held-out performance, pressure-escape truth, or probability calibration is established. Historical long-pass prior denominators remain different from future attacking-third channel denominators.',
}, null, 2), 'utf8');

console.log(`Wrote ${snapshots.length} immutable forecasts; scored ${resolvedTasks.length} task outcomes.`);
console.log(`Supported ${supported}, contradicted ${contradicted}; mean Brier ${meanBrier.toFixed(3)}, persistence Brier ${persistenceBrier.toFixed(3)}.`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed.`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
