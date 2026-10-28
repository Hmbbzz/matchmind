import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANALYSIS_CONTRACT_VERSION, eventInWindow, normalizeEventForAnalysis, parseSourceCsv } from './lib/analysis-contract.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const dataDir = join(projectRoot, 'dist', 'data');
const liveDir = join(dataDir, 'live');
const qualityDir = join(dataDir, 'quality');
const windowsMs = [10_000, 30_000, 90_000, 300_000];
const analysisStepMs = 10_000;

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const round = (value, digits = 4) => Number(Number(value || 0).toFixed(digits));

function quantile(values, ratio) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * ratio;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  return lower === upper ? sorted[lower] : sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
}

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function median(values) {
  return quantile(values, 0.5);
}

function emptyTeamBin() {
  return {
    geometryFrames: 0,
    centroidX: 0,
    centroidY: 0,
    width: 0,
    length: 0,
    defensiveLineX: 0,
    compactness: 0,
    averageSpeed: 0,
    highIntensityPlayers: 0,
    possessionFrames: 0,
    attackingThirdFrames: 0,
    penaltyAreaFrames: 0,
    pressureSamples: 0,
    defendersWithin2m: 0,
    defendersWithin5m: 0,
    defendersWithin8m: 0,
    localAdvantage18m: 0,
    localAdvantageSamples: 0,
    events: {
      passes: 0, completedPasses: 0, forwardPasses: 0, longPasses: 0,
      lineBreakPasses: 0, finalThirdEntries: 0, penaltyAreaEntries: 0,
      pressureActions: 0, counterPresses: 0, regains: 0, highRegains: 0,
      offBallRuns: 0, overlaps: 0, underlaps: 0, shots: 0, shotXg: 0,
      positiveEpv: 0, turnovers: 0,
      attackingChannels: { wide_left: 0, half_space_left: 0, center: 0, half_space_right: 0, wide_right: 0 },
    },
  };
}

function emptySecondBin(teamIds) {
  return {
    totalFrames: 0,
    trackedFrames: 0,
    knownPossessionFrames: 0,
    teams: Object.fromEntries(teamIds.map((id) => [id, emptyTeamBin()])),
  };
}

function addEvent(target, event, spatial) {
  const row = target.events;
  if (event.type === 'pass') {
    row.passes += 1;
    if (event.outcome === 'complete') row.completedPasses += 1;
    if (event.q?.passDirection === 'forward') row.forwardPasses += 1;
    if (event.q?.passRange === 'long') row.longPasses += 1;
    if (event.q?.lineBreak) row.lineBreakPasses += 1;
    if (event.outcome === 'complete' && spatial.thirdStart && spatial.thirdStart !== 'attacking_third' && spatial.thirdEnd === 'attacking_third') row.finalThirdEntries += 1;
    if (event.outcome === 'complete' && spatial.endX >= 88.5 && spatial.endY >= 13.84 && spatial.endY <= 54.16) row.penaltyAreaEntries += 1;
    if (Number.isFinite(event.q?.epv) && event.q.epv > 0) row.positiveEpv += event.q.epv;
    if (event.outcome === 'complete' && spatial.thirdEnd === 'attacking_third' && spatial.channelEnd) row.attackingChannels[spatial.channelEnd] += 1;
  } else if (event.type === 'pressure') {
    row.pressureActions += 1;
    if (event.q?.engagementSubtype === 'counter_press') row.counterPresses += 1;
  } else if (event.type === 'off_ball_run') {
    row.offBallRuns += 1;
    if (event.q?.runSubtype === 'overlap') row.overlaps += 1;
    if (event.q?.runSubtype === 'underlap') row.underlaps += 1;
  } else if (event.type === 'shot') {
    row.shots += 1;
    row.shotXg += number(event.q?.xg);
  } else if (event.type === 'turnover') {
    row.turnovers += 1;
  }
  if (event.type === 'regain' || ['direct_regain', 'indirect_regain'].includes(event.q?.endType)) {
    row.regains += 1;
    if (spatial.thirdStart === 'attacking_third' || spatial.thirdEnd === 'attacking_third') row.highRegains += 1;
  }
}

function addTeamBin(target, source) {
  for (const key of [
    'geometryFrames', 'centroidX', 'centroidY', 'width', 'length', 'defensiveLineX', 'compactness', 'averageSpeed', 'highIntensityPlayers',
    'possessionFrames', 'attackingThirdFrames', 'penaltyAreaFrames', 'pressureSamples', 'defendersWithin2m', 'defendersWithin5m',
    'defendersWithin8m', 'localAdvantage18m', 'localAdvantageSamples',
  ]) target[key] += source[key];
  for (const key of Object.keys(target.events)) {
    if (key === 'attackingChannels') {
      for (const channel of Object.keys(target.events.attackingChannels)) target.events.attackingChannels[channel] += source.events.attackingChannels[channel];
    } else target.events[key] += source.events[key];
  }
}

function sumWindow(secondBins, startSecond, endSecond, teamIds) {
  const result = { totalFrames: 0, trackedFrames: 0, knownPossessionFrames: 0, teams: Object.fromEntries(teamIds.map((id) => [id, emptyTeamBin()])) };
  for (let second = startSecond; second < endSecond; second += 1) {
    const source = secondBins[second];
    if (!source) continue;
    result.totalFrames += source.totalFrames;
    result.trackedFrames += source.trackedFrames;
    result.knownPossessionFrames += source.knownPossessionFrames;
    for (const id of teamIds) addTeamBin(result.teams[id], source.teams[id]);
  }
  return result;
}

function divide(value, divisor) {
  return divisor > 0 ? value / divisor : 0;
}

function attackingSideMap(phases, teamIds) {
  const totals = new Map();
  for (const row of phases) {
    const team = String(row.team_in_possession_id);
    if (!teamIds.includes(team) || !row.attacking_side) continue;
    const key = `${number(row.period)}:${team}:${row.attacking_side}`;
    totals.set(key, (totals.get(key) || 0) + number(row.duration));
  }
  const result = new Map();
  for (const period of [1, 2]) {
    for (const team of teamIds) {
      const choices = ['left_to_right', 'right_to_left'].map((side) => ({ side, seconds: totals.get(`${period}:${team}:${side}`) || 0 }));
      choices.sort((a, b) => b.seconds - a.seconds);
      result.set(`${period}:${team}`, choices[0].side);
    }
  }
  return result;
}

const data = await readJson(join(dataDir, 'demo.json'));
const matchId = String(data.match.source_match_id);
const sourceDir = join(sourceRoot, 'data', 'matches', matchId);
const phases = parseSourceCsv(await readFile(join(sourceDir, `${matchId}_phases_of_play.csv`), 'utf8'));
const sourceEvents = parseSourceCsv(await readFile(join(sourceDir, `${matchId}_dynamic_events.csv`), 'utf8'));
const sourceByEventId = new Map(sourceEvents.map((row) => [`sk_event_${row.event_id}`, row]));
const spatialByEventId = new Map(data.events.map((event) => [event.id, normalizeEventForAnalysis(event, sourceByEventId.get(event.id))]));
const teamIds = data.teams.map((team) => team.id);
const rawTeamIds = data.teams.map((team) => String(team.id).replace('sk_team_', ''));
const sourceTeamToCanonical = new Map(data.teams.map((team) => [String(team.id).replace('sk_team_', ''), team.id]));
const directions = attackingSideMap(phases, rawTeamIds);
const durationSeconds = Math.ceil(data.match.duration_ms / 1000);
const secondBins = Array.from({ length: durationSeconds + 1 }, () => emptySecondBin(teamIds));
const playerByIndex = data.players;
const playerScale = data.meta.quantization.player;
const ballScale = data.meta.quantization.ball;

let sourceFrameCount = 0;
let sourceTrackedFrameCount = 0;
for (const chunkInfo of data.frameChunks) {
  const frames = await readJson(join(dataDir, chunkInfo.file));
  for (const frame of frames) {
    sourceFrameCount += 1;
    const second = Math.min(durationSeconds, Math.floor(frame.t / 1000));
    const bin = secondBins[second];
    bin.totalFrames += 1;
    if (frame.q === 0) continue;
    bin.trackedFrames += 1;
    sourceTrackedFrameCount += 1;
    const period = frame.t >= data.match.second_half_stream_start_ms ? 2 : 1;
    const expanded = frame.p.map((point) => point.map((value, index) => value / (playerScale[index] || 1)));
    const byTeam = Object.fromEntries(teamIds.map((id) => [id, []]));
    for (const point of expanded) {
      const person = playerByIndex[point[0]];
      if (person && byTeam[person.teamId]) byTeam[person.teamId].push({ point, person });
    }
    const ballX = frame.b[0] / ballScale[0];
    const ballY = frame.b[1] / ballScale[1];
    const ownerIndex = frame.b[2];
    const owner = ownerIndex >= 0 ? playerByIndex[ownerIndex] : null;
    const ownerPoint = owner ? expanded.find((point) => point[0] === ownerIndex) : null;
    if (owner && ownerPoint) bin.knownPossessionFrames += 1;

    for (const canonicalTeamId of teamIds) {
      const rawTeamId = canonicalTeamId.replace('sk_team_', '');
      const attackSide = directions.get(`${period}:${rawTeamId}`);
      const normalizeX = (x) => attackSide === 'right_to_left' ? 105 - x : x;
      const members = byTeam[canonicalTeamId];
      const outfield = members.filter(({ person }) => person.position !== 'GK');
      if (!outfield.length) continue;
      const xs = outfield.map(({ point }) => normalizeX(point[1]));
      const ys = outfield.map(({ point }) => point[2]);
      const centroidX = mean(xs);
      const centroidY = mean(ys);
      const teamBin = bin.teams[canonicalTeamId];
      teamBin.geometryFrames += 1;
      teamBin.centroidX += centroidX;
      teamBin.centroidY += centroidY;
      teamBin.width += quantile(ys, 0.9) - quantile(ys, 0.1);
      teamBin.length += quantile(xs, 0.9) - quantile(xs, 0.1);
      teamBin.defensiveLineX += median([...xs].sort((a, b) => a - b).slice(0, Math.min(4, xs.length)));
      teamBin.compactness += mean(xs.map((x, index) => Math.hypot(x - centroidX, ys[index] - centroidY)));
      teamBin.averageSpeed += mean(outfield.map(({ point }) => point[6]));
      teamBin.highIntensityPlayers += outfield.filter(({ point }) => point[6] >= 5.5).length;

      if (owner?.teamId === canonicalTeamId && ownerPoint) {
        const normalizedBallX = normalizeX(ballX);
        teamBin.possessionFrames += 1;
        if (normalizedBallX >= 70) teamBin.attackingThirdFrames += 1;
        if (normalizedBallX >= 88.5 && ballY >= 13.84 && ballY <= 54.16) teamBin.penaltyAreaFrames += 1;
        const attackers = members.filter(({ point }) => Math.hypot(point[1] - ballX, point[2] - ballY) <= 18).length;
        const opponentId = teamIds.find((id) => id !== canonicalTeamId);
        const defenders = byTeam[opponentId].filter(({ point }) => Math.hypot(point[1] - ballX, point[2] - ballY) <= 18).length;
        teamBin.localAdvantage18m += attackers - defenders;
        teamBin.localAdvantageSamples += 1;
      } else if (owner && ownerPoint) {
        const distances = members.map(({ point }) => Math.hypot(point[1] - ownerPoint[1], point[2] - ownerPoint[2]));
        teamBin.pressureSamples += 1;
        teamBin.defendersWithin2m += distances.filter((distance) => distance <= 2).length;
        teamBin.defendersWithin5m += distances.filter((distance) => distance <= 5).length;
        teamBin.defendersWithin8m += distances.filter((distance) => distance <= 8).length;
      }
    }
  }
}

const rows = [];
for (let endMs = analysisStepMs; endMs <= data.match.duration_ms; endMs += analysisStepMs) {
  const endSecond = Math.ceil(endMs / 1000);
  for (const windowMs of windowsMs) {
    const actualStartMs = Math.max(0, endMs - windowMs);
    const startSecond = Math.floor(actualStartMs / 1000);
    const aggregate = sumWindow(secondBins, startSecond, endSecond, teamIds);
    const coverage = divide(aggregate.trackedFrames, aggregate.totalFrames);
    const actualWindowMinutes = (endMs - actualStartMs) / 60_000;
    // Event-time membership and information availability are separate gates.
    // Tracking remains [start,end); event totals are explicitly (start,end].
    for (const event of data.events) {
      if (aggregate.teams[event.team] && eventInWindow(event, actualStartMs, endMs)) addEvent(aggregate.teams[event.team], event, spatialByEventId.get(event.id));
    }
    for (const teamId of teamIds) {
      const team = aggregate.teams[teamId];
      const geometry = Math.max(1, team.geometryFrames);
      const event = team.events;
      const channelsTotal = Object.values(event.attackingChannels).reduce((sum, value) => sum + value, 0);
      rows.push({
        matchId: data.match.match_id,
        teamId,
        windowStartMs: actualStartMs,
        windowEndMs: endMs,
        requestedWindowMs: windowMs,
        coverage: round(coverage),
        trackedFrames: aggregate.trackedFrames,
        totalFrames: aggregate.totalFrames,
        featureVersion: 'skillcorner-live-features/1.1',
        structure: {
          centroidX: round(team.centroidX / geometry),
          centroidY: round(team.centroidY / geometry),
          widthM: round(team.width / geometry),
          lengthM: round(team.length / geometry),
          defensiveLineXM: round(team.defensiveLineX / geometry),
          compactnessM: round(team.compactness / geometry),
          averageSpeedMps: round(team.averageSpeed / geometry),
          highIntensityPlayersPerFrame: round(team.highIntensityPlayers / geometry),
        },
        territory: {
          possessionShare: round(divide(team.possessionFrames, aggregate.knownPossessionFrames)),
          attackingThirdShareOfPossession: round(divide(team.attackingThirdFrames, team.possessionFrames)),
          penaltyAreaShareOfPossession: round(divide(team.penaltyAreaFrames, team.possessionFrames)),
          localAdvantage18m: round(divide(team.localAdvantage18m, team.localAdvantageSamples)),
        },
        pressure: {
          actions: event.pressureActions,
          actionsPerMinute: round(divide(event.pressureActions, actualWindowMinutes)),
          counterPresses: event.counterPresses,
          defendersWithin2m: round(divide(team.defendersWithin2m, team.pressureSamples)),
          defendersWithin5m: round(divide(team.defendersWithin5m, team.pressureSamples)),
          defendersWithin8m: round(divide(team.defendersWithin8m, team.pressureSamples)),
        },
        progression: {
          passes: event.passes,
          completedPasses: event.completedPasses,
          passCompletion: round(divide(event.completedPasses, event.passes)),
          forwardPassShare: round(divide(event.forwardPasses, event.passes)),
          longPassShare: round(divide(event.longPasses, event.passes)),
          lineBreakPasses: event.lineBreakPasses,
          finalThirdEntries: event.finalThirdEntries,
          penaltyAreaEntries: event.penaltyAreaEntries,
          attackingChannelShare: Object.fromEntries(Object.entries(event.attackingChannels).map(([key, value]) => [key, round(divide(value, channelsTotal))])),
        },
        transition: {
          regains: event.regains,
          highRegains: event.highRegains,
          turnovers: event.turnovers,
        },
        offBall: {
          runs: event.offBallRuns,
          overlaps: event.overlaps,
          underlaps: event.underlaps,
        },
        threat: {
          shots: event.shots,
          positionXg: round(event.shotXg),
          positivePassEpv: round(event.positiveEpv),
        },
      });
    }
  }
}

const assertions = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}
const expectedSteps = Math.floor(data.match.duration_ms / analysisStepMs);
check('source frame count matches converter', sourceFrameCount === data.match.tracked_frames + data.match.held_frames, `${sourceFrameCount}`);
check('tracked frame count matches converter', sourceTrackedFrameCount === data.match.tracked_frames, `${sourceTrackedFrameCount}`);
check('feature row count', rows.length === expectedSteps * windowsMs.length * teamIds.length, `${rows.length}`);
check('two teams only', rows.every((row) => teamIds.includes(row.teamId)), teamIds.join(', '));
check('coverage is bounded', rows.every((row) => row.coverage >= 0 && row.coverage <= 1), '0..1');
check('windows never read beyond cutoff', rows.every((row) => row.windowStartMs >= 0 && row.windowStartMs < row.windowEndMs && row.windowEndMs <= data.match.duration_ms), 'valid time bounds');
check('provider phase labels excluded', rows.every((row) => !('phase' in row) && !('attackPattern' in row)), 'no phase or attackPattern keys');
check('nonzero structure samples', rows.filter((row) => row.coverage >= 0.5).every((row) => row.structure.widthM > 0 && row.structure.lengthM > 0), 'width and length');
check('finite feature values', !JSON.stringify(rows).includes('null'), 'serialized output contains no null numeric values');
check('both teams have events', teamIds.every((id) => rows.some((row) => row.teamId === id && row.progression.passes > 0 && row.pressure.actions > 0)), 'passes and pressure');
const passes = data.events.filter((event) => event.type === 'pass');
check('pass spatial source fields are known', passes.every((event) => {
  const spatial = spatialByEventId.get(event.id);
  return spatial.attackingSide && spatial.thirdStart && spatial.thirdEnd && spatial.channelEnd;
}), `${passes.length} passes joined by source event ID`);
check('event directions agree with period directions', data.events.filter((event) => sourceByEventId.has(event.id)).every((event) => {
  return spatialByEventId.get(event.id).attackingSide === directions.get(`${event.q.period}:${event.team.replace('sk_team_', '')}`);
}), 'raw event attacking_side vs raw phase direction only');

const failed = assertions.filter((row) => !row.passed);
const output = {
  schemaVersion: 'skillcorner-live-features/1.1',
  generatedAt: new Date().toISOString(),
  matchId: data.match.match_id,
  sourceMatchId: data.match.source_match_id,
  stepMs: analysisStepMs,
  windowsMs,
  onlineInputPolicy: {
    providerPhaseLabelsUsed: false,
    futureOutcomeFieldsUsed: false,
    heldFramesUsedForGeometry: false,
    eventsRestrictedToWindowEnd: true,
    eventWindow: '(windowStartMs,windowEndMs] action-end time; available_at_ms/endMs/t <= windowEndMs',
    analysisContractVersion: ANALYSIS_CONTRACT_VERSION,
    directionSource: 'raw event attacking_side; verified against period phase directions',
    thirdAndChannelSource: 'raw third_start; endpoint-matched targeted_reception third/channel when reception coordinates are used, else raw end labels; missing labels unknown; no inferred Y flip',
    penaltyAreaSource: 'attack-relative targeted endpoint X; fixed-pitch Y within symmetric penalty-area bounds',
  },
  rows,
};

await mkdir(liveDir, { recursive: true });
await mkdir(qualityDir, { recursive: true });
await writeFile(join(liveDir, 'team-window-features.json'), JSON.stringify(output), 'utf8');
await writeFile(join(qualityDir, 'live-feature-report.json'), JSON.stringify({
  schemaVersion: 'skillcorner-live-feature-quality/1.1',
  generatedAt: new Date().toISOString(),
  passed: failed.length === 0,
  assertions,
  stats: {
    sourceFrames: sourceFrameCount,
    trackedFrames: sourceTrackedFrameCount,
    overallCoverage: round(sourceTrackedFrameCount / sourceFrameCount),
    featureRows: rows.length,
  },
}, null, 2), 'utf8');

console.log(`Wrote ${rows.length} team-window feature rows across ${windowsMs.length} windows.`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed; overall tracked coverage ${(sourceTrackedFrameCount / sourceFrameCount * 100).toFixed(2)}%.`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
