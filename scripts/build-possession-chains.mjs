import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const dataDir = join(projectRoot, 'dist', 'data');
const liveDir = join(dataDir, 'live');
const qualityDir = join(dataDir, 'quality');

const MAX_CONTINUATION_GAP_MS = 8_000;
const MAX_REBOUND_GAP_MS = 6_000;
const CONTINUATION_STARTS = new Set(['pass_reception', 'keep_possession']);
const HARD_END_TYPES = new Set(['turnover', 'foul', 'clearance']);

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const round = (value, digits = 3) => Number(Number(value || 0).toFixed(digits));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function lowerBound(rows, target) {
  let low = 0;
  let high = rows.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (rows[middle].t < target) low = middle + 1;
    else high = middle;
  }
  return low;
}

function outcomeFor(possession) {
  const last = possession.actions.at(-1);
  const shots = possession.actions.filter((event) => event.type === 'shot');
  if (shots.some((event) => event.outcome === 'goal')) return 'goal';
  if (shots.length) return 'shot';
  if (last.type === 'turnover' || (last.type === 'pass' && last.outcome === 'incomplete')) return 'lost';
  if (last.type === 'foul') return 'foul';
  if (last.type === 'clearance') return 'clearance';
  return 'continued_or_interrupted';
}

function canContinue(previous, next) {
  if (!previous || previous.team !== next.team || previous.q.period !== next.q.period) return false;
  const gapMs = Math.max(0, next.q.startMs - previous.q.endMs);
  if (gapMs > MAX_CONTINUATION_GAP_MS) return false;
  if (previous.type === 'shot') return gapMs <= MAX_REBOUND_GAP_MS;
  if (HARD_END_TYPES.has(previous.type)) return false;
  if (previous.type === 'pass' && previous.outcome === 'incomplete') return false;
  return CONTINUATION_STARTS.has(next.q.startType);
}

function trackingCoverage(frames, startMs, endMs) {
  const from = lowerBound(frames, startMs);
  const to = lowerBound(frames, endMs + 1);
  const sample = frames.slice(from, to);
  const tracked = sample.filter((frame) => frame.q === 1).length;
  return { frames: sample.length, trackedFrames: tracked, coverage: sample.length ? round(tracked / sample.length, 4) : 0 };
}

const data = await readJson(join(dataDir, 'demo.json'));
const teamIds = new Set(data.teams.map((team) => team.id));
const playerIds = new Set(data.players.map((person) => person.id));
const eventById = new Map(data.events.map((event) => [event.id, event]));
const primary = data.events
  .filter((event) => event.q?.sourceEventType === 'player_possession')
  .sort((a, b) => a.q.startMs - b.q.startMs || a.q.endMs - b.q.endMs || a.id.localeCompare(b.id));
const supportEvents = data.events
  .filter((event) => ['off_ball_run', 'passing_option', 'pressure'].includes(event.type))
  .sort((a, b) => a.t - b.t);

const frameIndex = [];
for (const chunk of data.frameChunks) {
  const rows = await readJson(join(dataDir, chunk.file));
  for (const frame of rows) frameIndex.push({ t: frame.t, q: frame.q });
}

const grouped = [];
let current = null;
for (const action of primary) {
  if (!current || !canContinue(current.actions.at(-1), action)) {
    current = { teamId: action.team, period: action.q.period, actions: [] };
    grouped.push(current);
  }
  current.actions.push(action);
}

const possessions = grouped.map((group, index) => {
  const first = group.actions[0];
  const last = group.actions.at(-1);
  const startMs = first.q.startMs;
  const endMs = Math.max(startMs, ...group.actions.map((event) => event.q.endMs));
  const relevantSupport = supportEvents.filter((event) => event.t >= startMs && event.t <= endMs);
  const ownRuns = relevantSupport.filter((event) => event.type === 'off_ball_run' && event.team === group.teamId);
  const passingOptions = relevantSupport.filter((event) => event.type === 'passing_option' && event.team === group.teamId);
  const pressuresFaced = relevantSupport.filter((event) => event.type === 'pressure' && event.team !== group.teamId);
  const passes = group.actions.filter((event) => event.type === 'pass');
  const shots = group.actions.filter((event) => event.type === 'shot');
  const completedPasses = passes.filter((event) => event.outcome === 'complete');
  const lineBreaks = passes.filter((event) => Boolean(event.q?.lineBreak));
  const finalThirdEntries = completedPasses.filter((event) => event.x < 70 && event.ex >= 70);
  const boxEntries = completedPasses.filter((event) => event.ex >= 88.5 && event.ey >= 13.84 && event.ey <= 54.16);
  const participantIds = [...new Set(group.actions.flatMap((event) => [event.player, event.secondary]).filter((id) => playerIds.has(id)))];
  const supportEventIds = relevantSupport.map((event) => event.id);
  const coverage = trackingCoverage(frameIndex, startMs, endMs);
  const xg = shots.reduce((sum, event) => sum + Number(event.q?.xg || 0), 0);
  const positiveEpv = passes.reduce((sum, event) => sum + Math.max(0, Number(event.q?.epv || 0)), 0);
  return {
    id: `possession_${String(index + 1).padStart(4, '0')}`,
    teamId: group.teamId,
    period: group.period,
    startMs,
    endMs,
    durationMs: endMs - startMs,
    eventIds: group.actions.map((event) => event.id),
    supportEventIds,
    participantIds,
    start: { x: round(first.x, 2), y: round(first.y, 2) },
    end: { x: round(last.ex, 2), y: round(last.ey, 2) },
    metrics: {
      actions: group.actions.length,
      passes: passes.length,
      completedPasses: completedPasses.length,
      lineBreaks: lineBreaks.length,
      finalThirdEntries: finalThirdEntries.length,
      boxEntries: boxEntries.length,
      shots: shots.length,
      xg: round(xg),
      positiveEpv: round(positiveEpv),
      offBallRuns: ownRuns.length,
      passingOptions: passingOptions.length,
      pressuresFaced: pressuresFaced.length,
      progressionM: round(Math.max(0, last.ex - first.x), 1),
    },
    outcome: outcomeFor(group),
    quality: {
      eventSource: 'SkillCorner player_possession',
      trackingFrames: coverage.frames,
      trackedFrames: coverage.trackedFrames,
      trackingCoverage: coverage.coverage,
      reliableForEventNarrative: true,
      reliableForSpatialShape: coverage.coverage >= 0.6,
    },
  };
});

function chanceKind(possession) {
  const events = possession.eventIds.map((id) => eventById.get(id));
  const goal = events.some((event) => event?.type === 'shot' && event.outcome === 'goal');
  if (goal) return 'goal';
  if (possession.metrics.shots && possession.metrics.xg >= 0.2) return 'big_chance';
  if (possession.metrics.shots) return 'shot_sequence';
  if (possession.metrics.boxEntries) return 'box_entry';
  return 'progressive_attack';
}

function qualifiesAsChance(possession) {
  const metric = possession.metrics;
  return metric.shots > 0
    || (metric.boxEntries > 0 && (metric.lineBreaks > 0 || metric.completedPasses >= 3))
    || (metric.progressionM >= 35 && metric.finalThirdEntries > 0 && metric.completedPasses >= 3);
}

function classifyAttackPattern(possession, actions) {
  const first = actions[0];
  const startType = first?.q?.startType || 'unknown';
  const durationSeconds = possession.durationMs / 1000;
  const passes = actions.filter((event) => event.type === 'pass');
  const longPasses = passes.filter((event) => event.q?.passRange === 'long').length;
  const crosses = passes.filter((event) => event.q?.pass_type === 'cross').length;
  const locations = actions.flatMap((event) => [event.y, event.ey]).filter(Number.isFinite);
  const wideShare = locations.length ? locations.filter((y) => y <= 13.6 || y >= 54.4).length / locations.length : 0;
  const centralShare = locations.length ? locations.filter((y) => y >= 20.4 && y <= 47.6).length / locations.length : 0;
  const isRestart = /corner|free_kick|throw_in|goal_kick/.test(startType);
  const isRegain = ['pass_interception', 'throw_in_interception', 'corner_interception', 'free_kick_interception', 'goal_kick_interception', 'recovery'].includes(startType);
  const highRegain = isRegain && possession.start.x >= 70;
  const scores = {
    set_piece: (isRestart ? 0.78 : 0) + (/corner|free_kick/.test(startType) ? 0.18 : 0) + (possession.metrics.shots ? 0.05 : 0),
    high_regain_attack: (highRegain ? 0.78 : 0) + (durationSeconds <= 12 ? 0.08 : 0) + (possession.metrics.shots ? 0.08 : 0),
    counter_attack: isRegain ? 0.35 + (durationSeconds <= 15 ? 0.22 : 0) + (possession.metrics.progressionM >= 25 ? 0.24 : 0) + (possession.metrics.completedPasses <= 5 ? 0.08 : 0) + (possession.metrics.shots ? 0.08 : 0) : 0,
    wing_attack: (crosses ? 0.5 : 0) + (wideShare >= 0.5 ? 0.25 : 0) + (possession.metrics.boxEntries ? 0.12 : 0) + (possession.metrics.offBallRuns >= 2 ? 0.06 : 0),
    direct_attack: (longPasses ? 0.38 : 0) + (possession.metrics.completedPasses <= 3 ? 0.15 : 0) + (possession.metrics.progressionM >= 30 ? 0.28 : 0) + (durationSeconds <= 12 ? 0.12 : 0),
    sustained_possession: (durationSeconds >= 25 ? 0.42 : 0) + (possession.metrics.actions >= 8 ? 0.32 : 0) + (possession.metrics.completedPasses >= 7 ? 0.24 : 0),
    central_combination: (centralShare >= 0.55 ? 0.3 : 0) + (possession.metrics.completedPasses >= 3 ? 0.24 : 0) + (durationSeconds <= 20 ? 0.12 : 0) + (possession.metrics.lineBreaks ? 0.16 : 0) + (possession.metrics.shots || possession.metrics.boxEntries ? 0.1 : 0),
    second_ball_attack: (possession.metrics.shots && possession.metrics.actions <= 2 ? 0.52 : 0) + (startType === 'recovery' ? 0.18 : 0) + (possession.metrics.completedPasses <= 1 ? 0.16 : 0),
  };
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primary, topScore] = ranked[0];
  const secondScore = ranked[1]?.[1] || 0;
  const signals = [];
  if (isRestart) signals.push(`restart:${startType}`);
  if (highRegain) signals.push(`regain_x:${round(possession.start.x, 1)}`);
  else if (isRegain) signals.push(`transition_start:${startType}`);
  if (durationSeconds <= 15) signals.push(`duration_s:${round(durationSeconds, 1)}`);
  if (possession.metrics.progressionM >= 25) signals.push(`progression_m:${possession.metrics.progressionM}`);
  if (longPasses) signals.push(`long_passes:${longPasses}`);
  if (crosses) signals.push(`crosses:${crosses}`);
  if (possession.metrics.lineBreaks) signals.push(`line_breaks:${possession.metrics.lineBreaks}`);
  if (possession.metrics.actions >= 8) signals.push(`actions:${possession.metrics.actions}`);
  if (wideShare >= 0.5) signals.push(`wide_share:${round(wideShare)}`);
  if (centralShare >= 0.55) signals.push(`central_share:${round(centralShare)}`);
  if (!signals.length) signals.push(`actions:${possession.metrics.actions}`);
  return {
    primary,
    confidence: round(clamp(0.5 + (topScore - secondScore) * 0.5, 0.5, 0.95)),
    signals,
    scores: Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, round(clamp(value, 0, 1))])),
    model: 'transparent-rules-v1',
  };
}

const chancePossessions = possessions.filter(qualifiesAsChance);
const chanceChains = chancePossessions.map((possession, index) => {
  const actions = possession.eventIds.map((id) => eventById.get(id));
  const shots = actions.filter((event) => event.type === 'shot');
  const keyEvent = [...shots].sort((a, b) => Number(b.q?.xg || 0) - Number(a.q?.xg || 0))[0]
    || [...actions].sort((a, b) => Number(b.q?.epv || 0) - Number(a.q?.epv || 0))[0]
    || actions.at(-1);
  const kind = chanceKind(possession);
  const pattern = classifyAttackPattern(possession, actions);
  const importanceScore = clamp(
    (kind === 'goal' ? 100 : 0)
      + possession.metrics.xg * 100
      + possession.metrics.boxEntries * 8
      + possession.metrics.lineBreaks * 5
      + possession.metrics.finalThirdEntries * 3
      + Math.min(10, possession.metrics.progressionM / 5),
    0,
    150,
  );
  return {
    id: `chance_${String(index + 1).padStart(3, '0')}`,
    possessionId: possession.id,
    teamId: possession.teamId,
    period: possession.period,
    kind,
    pattern,
    startMs: possession.startMs,
    endMs: possession.endMs,
    replayStartMs: Math.max(0, possession.startMs - 5_000),
    replayEndMs: Math.min(data.match.duration_ms, possession.endMs + 5_000),
    keyEventId: keyEvent.id,
    eventIds: possession.eventIds,
    supportEventIds: possession.supportEventIds,
    participantIds: possession.participantIds,
    metrics: possession.metrics,
    outcome: possession.outcome,
    importanceScore: round(importanceScore, 1),
    quality: possession.quality,
  };
});

const chanceByPossession = new Map(chanceChains.map((chain) => [chain.possessionId, chain]));
const evidenceRows = [];
for (const possession of possessions) {
  const chance = chanceByPossession.get(possession.id);
  for (const eventId of [...possession.eventIds, ...possession.supportEventIds]) {
    evidenceRows.push({
      eventId,
      possessionId: possession.id,
      chanceChainId: chance?.id || null,
      replayStartMs: chance?.replayStartMs ?? Math.max(0, possession.startMs - 4_000),
      replayEndMs: chance?.replayEndMs ?? Math.min(data.match.duration_ms, possession.endMs + 4_000),
    });
  }
}

const shotIds = new Set(primary.filter((event) => event.type === 'shot').map((event) => event.id));
const mappedShotIds = chanceChains.flatMap((chain) => chain.eventIds).filter((id) => shotIds.has(id));
const goalIds = new Set(primary.filter((event) => event.type === 'shot' && event.outcome === 'goal').map((event) => event.id));
const mappedGoalIds = chanceChains.filter((chain) => chain.kind === 'goal').flatMap((chain) => chain.eventIds).filter((id) => goalIds.has(id));
const checks = [
  ['all converted possession actions mapped exactly once', possessions.reduce((sum, row) => sum + row.eventIds.length, 0) === primary.length],
  ['possession times are valid', possessions.every((row) => row.startMs >= 0 && row.endMs >= row.startMs && row.endMs <= data.match.duration_ms)],
  ['possession teams are valid', possessions.every((row) => teamIds.has(row.teamId))],
  ['event references are valid', possessions.every((row) => [...row.eventIds, ...row.supportEventIds].every((id) => eventById.has(id)))],
  ['primary event belongs to only one possession', new Set(possessions.flatMap((row) => row.eventIds)).size === primary.length],
  ['all shots have one chance chain', mappedShotIds.length === shotIds.size && new Set(mappedShotIds).size === shotIds.size],
  ['all goals have one goal chain', mappedGoalIds.length === goalIds.size && new Set(mappedGoalIds).size === goalIds.size],
  ['replay bounds are valid', chanceChains.every((row) => row.replayStartMs >= 0 && row.replayEndMs <= data.match.duration_ms && row.replayEndMs >= row.replayStartMs)],
  ['chains expose no provider phase labels', !JSON.stringify(chanceChains).includes('phase_of_play') && !JSON.stringify(possessions).includes('phase_of_play')],
  ['chronological order is monotonic', possessions.every((row, index) => index === 0 || row.startMs >= possessions[index - 1].startMs)],
  ['every chance has a transparent pattern result', chanceChains.every((row) => row.pattern?.primary && row.pattern.model === 'transparent-rules-v1' && row.pattern.signals.length)],
  ['pattern confidence stays in range', chanceChains.every((row) => row.pattern.confidence >= 0.5 && row.pattern.confidence <= 0.95)],
  ['pattern output is not collapsed to one class', new Set(chanceChains.map((row) => row.pattern.primary)).size >= 4],
];
const failed = checks.filter(([, passed]) => !passed);

const meta = {
  generatedAt: new Date().toISOString(),
  matchId: data.match.match_id,
  method: 'event-led possession segmentation with tracking quality evidence',
  source: 'SkillCorner Open Data',
  continuationGapMs: MAX_CONTINUATION_GAP_MS,
  reboundGapMs: MAX_REBOUND_GAP_MS,
  providerPhaseLabelsUsed: false,
  temporalPolicy: 'Every row is available only at or after endMs; no future events are used.',
};
const report = {
  meta,
  input: {
    convertedPlayerPossessionActions: primary.length,
    supportEvents: supportEvents.length,
    trackingFrames: frameIndex.length,
    trackedFrames: frameIndex.filter((frame) => frame.q === 1).length,
  },
  output: {
    possessions: possessions.length,
    multiActionPossessions: possessions.filter((row) => row.metrics.actions > 1).length,
    chanceChains: chanceChains.length,
    shotChains: chanceChains.filter((row) => row.metrics.shots > 0).length,
    goalChains: chanceChains.filter((row) => row.kind === 'goal').length,
    evidenceRows: evidenceRows.length,
    attackPatterns: Object.fromEntries([...new Set(chanceChains.map((row) => row.pattern.primary))].sort().map((name) => [name, chanceChains.filter((row) => row.pattern.primary === name).length])),
  },
  distributions: {
    medianPossessionDurationSeconds: round([...possessions].sort((a, b) => a.durationMs - b.durationMs)[Math.floor(possessions.length / 2)]?.durationMs / 1000, 1),
    lowTrackingCoveragePossessions: possessions.filter((row) => row.quality.trackingCoverage < 0.6).length,
  },
  checks: checks.map(([name, passed]) => ({ name, passed })),
  status: failed.length ? 'failed' : 'passed',
};

await mkdir(liveDir, { recursive: true });
await mkdir(qualityDir, { recursive: true });
await Promise.all([
  writeFile(join(liveDir, 'possessions.json'), JSON.stringify({ meta, possessions }), 'utf8'),
  writeFile(join(liveDir, 'chance-chains.json'), JSON.stringify({ meta, chains: chanceChains }), 'utf8'),
  writeFile(join(liveDir, 'evidence-index.json'), JSON.stringify({ meta, rows: evidenceRows }), 'utf8'),
  writeFile(join(qualityDir, 'possession-chain-report.json'), JSON.stringify(report, null, 2), 'utf8'),
]);

console.log(`Wrote ${possessions.length} possessions, ${chanceChains.length} chance chains and ${evidenceRows.length} evidence links`);
console.log(`Validation: ${report.status} (${checks.length - failed.length}/${checks.length} checks)`);
if (failed.length) {
  for (const [name] of failed) console.error(`FAILED: ${name}`);
  process.exit(1);
}
