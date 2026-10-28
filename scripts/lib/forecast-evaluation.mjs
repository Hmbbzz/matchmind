export const FORECAST_EVALUATION_VERSION = 'forecast-baseline-evaluation/1.0';
const TASK_KEYS = Object.freeze({
  regimePersistence: ['persist', 'change'],
  pressEscape: ['left', 'center', 'right', 'long'],
  zoneRisk: ['wide_left', 'half_space_left', 'center', 'half_space_right', 'wide_right'],
});
const invalid = (message) => { throw new TypeError(`Invalid forecast evaluation input: ${message}`); };
const sameKeys = (object, keys) => object && !Array.isArray(object) && Object.keys(object).length === keys.length && keys.every((key) => Object.hasOwn(object, key));

function probabilityKeys(probabilities) {
  if (!probabilities || typeof probabilities !== 'object' || Array.isArray(probabilities)) invalid('probabilities must be an object');
  const keys = Object.keys(probabilities);
  if (keys.length < 2 || keys.some((key) => !key || !Number.isFinite(probabilities[key]) || probabilities[key] < 0 || probabilities[key] > 1)) invalid('invalid probability or class');
  const sum = keys.reduce((value, key) => value + probabilities[key], 0);
  // The frozen generator rounds probabilities to four decimals. Do not silently
  // renormalize them or change the established scoring formula.
  if (Math.abs(sum - 1) > 0.001 + Number.EPSILON) invalid('probabilities do not sum to one');
  return keys;
}

export function normalizedBrier(probabilities, actual) {
  const keys = probabilityKeys(probabilities);
  if (!keys.includes(actual)) invalid('actual class is missing or unknown');
  return keys.reduce((sum, key) => sum + (probabilities[key] - (key === actual ? 1 : 0)) ** 2, 0) / keys.length;
}

export function evaluateForecastBaselines({ snapshots, outcomes } = {}) {
  if (!Array.isArray(snapshots) || !Array.isArray(outcomes)) invalid('snapshot and outcome arrays are required');
  const snapshotIds = new Set();
  const outcomeById = new Map();
  for (const outcome of outcomes) {
    if (typeof outcome?.forecastId !== 'string' || !outcome.forecastId || outcomeById.has(outcome.forecastId)) invalid('missing or duplicate outcome ID');
    outcomeById.set(outcome.forecastId, outcome);
  }
  const groups = new Map();
  for (const snapshot of snapshots) {
    if (typeof snapshot?.forecastId !== 'string' || !snapshot.forecastId || snapshotIds.has(snapshot.forecastId)) invalid('missing or duplicate snapshot ID');
    snapshotIds.add(snapshot.forecastId);
    if (!Number.isSafeInteger(snapshot.horizonMs) || snapshot.horizonMs <= 0) invalid('invalid horizon');
    if (!sameKeys(snapshot.tasks, Object.keys(TASK_KEYS))) invalid('missing or unknown snapshot task');
    const outcome = outcomeById.get(snapshot.forecastId);
    if (!outcome) invalid('snapshot has no paired outcome');
    if (!['pending', 'resolved', 'unscorable'].includes(outcome.status)) invalid('unknown outcome status');
    const pending = outcome.status === 'pending';
    if (pending ? outcome.taskOutcomes !== null : !sameKeys(outcome.taskOutcomes, Object.keys(TASK_KEYS))) invalid('missing or unknown task outcome');
    for (const [task, expectedKeys] of Object.entries(TASK_KEYS)) {
      const probabilities = snapshot.tasks[task]?.probabilities;
      const keys = probabilityKeys(probabilities);
      if (!sameKeys(probabilities, expectedKeys)) invalid('missing or unknown task probability class');
      const top = Object.entries(probabilities).sort((a, b) => b[1] - a[1])[0][0];
      if (Object.hasOwn(snapshot.tasks[task], 'topScenario') && snapshot.tasks[task].topScenario !== top) invalid('top scenario does not match probabilities');
      const key = `${task}:${snapshot.horizonMs}`;
      if (!groups.has(key)) groups.set(key, { task, horizonMs: snapshot.horizonMs, classCount: keys.length, n: 0, pending: 0, unscorable: 0, forecastSum: 0, uniformSum: 0, persistSum: 0 });
      const group = groups.get(key);
      if (pending) { group.pending += 1; continue; }
      const result = outcome.taskOutcomes[task];
      if (result?.status === 'unscorable') {
        if (result.actual !== null || result.brier !== null) invalid('unscorable task must have null actual and score');
        group.unscorable += 1;
        continue;
      }
      if (!['supported', 'contradicted'].includes(result?.status)) invalid('unknown task status');
      const score = normalizedBrier(probabilities, result.actual);
      if (!Number.isFinite(result.brier) || Math.abs(result.brier - score) > 0.000051) invalid('stored Brier does not match frozen probabilities');
      if (result.status !== (top === result.actual ? 'supported' : 'contradicted')) invalid('task status does not match actual class');
      group.n += 1;
      group.forecastSum += score;
      const uniform = Object.fromEntries(keys.map((name) => [name, 1 / keys.length]));
      group.uniformSum += normalizedBrier(uniform, result.actual);
      if (task === 'regimePersistence') group.persistSum += normalizedBrier({ persist: 1, change: 0 }, result.actual);
    }
  }
  for (const id of outcomeById.keys()) if (!snapshotIds.has(id)) invalid('outcome references an unknown snapshot ID');
  const mean = (sum, n) => n ? sum / n : null;
  const taskOrder = Object.keys(TASK_KEYS);
  return {
    schemaVersion: FORECAST_EVALUATION_VERSION,
    method: {
      score: 'sum((p[class] - one_hot(actual)[class])^2) / number_of_classes',
      probabilityTolerance: 0.001,
      comparison: 'Paired, identical scored forecasts within each task and horizon; negative forecastMinusBaseline means lower forecast Brier on that cohort.',
      missingPolicy: 'Invalid or unmatched records fail evaluation; pending and unscorable tasks are counted explicitly and are not treated as negatives.',
      baselines: { uniform: 'Equal probability for every class of the same task.', alwaysPersist: 'Probability 1 for persist, 0 for change; regimePersistence only.' },
    },
    snapshotCount: snapshots.length,
    groups: [...groups.values()].sort((a, b) => taskOrder.indexOf(a.task) - taskOrder.indexOf(b.task) || a.horizonMs - b.horizonMs).map((group) => {
      const forecastBrier = mean(group.forecastSum, group.n);
      const uniformBrier = mean(group.uniformSum, group.n);
      const result = { task: group.task, horizonMs: group.horizonMs, classCount: group.classCount, n: group.n, pending: group.pending, unscorable: group.unscorable, forecastBrier, uniformBrier, forecastMinusUniform: group.n ? forecastBrier - uniformBrier : null };
      if (group.task === 'regimePersistence') {
        result.alwaysPersistBrier = mean(group.persistSum, group.n);
        result.forecastMinusAlwaysPersist = group.n ? forecastBrier - result.alwaysPersistBrier : null;
      }
      return result;
    }),
    limitations: [
      'One historical match; overlapping horizons and correlated forecasts are not independent match samples.',
      'Regime targets come from the same tactical rules; channel and zone targets are completed-pass endpoint proxies, not verified pressure escape or territorial risk.',
      'These diagnostics do not establish held-out predictive skill, calibrated probabilities, statistical significance, or real-model effectiveness.',
      'Historical priors and current endpoint channel samples still have different denominators/endpoint definitions; no history-only baseline is evaluated.',
      'Scores from different tasks/class counts must not be pooled into a model ranking.',
    ],
  };
}
