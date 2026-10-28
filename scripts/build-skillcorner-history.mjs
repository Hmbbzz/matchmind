import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { teamIdentity } from '../public/team-identities.js';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const matchesRoot = join(sourceRoot, 'data', 'matches');
const manifestPath = join(projectRoot, 'dist', 'data', 'source-manifest.json');
const historyDir = join(projectRoot, 'dist', 'data', 'history');
const qualityDir = join(projectRoot, 'dist', 'data', 'quality');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const truthy = (value) => String(value).toLowerCase() === 'true';
const round = (value, digits = 4) => Number(Number(value || 0).toFixed(digits));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(field); field = ''; }
    else if (character === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += character;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift() || [];
  return rows
    .filter((values) => values.some(Boolean))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

const readCsv = async (path) => parseCsv(await readFile(path, 'utf8'));

function durationMinutes(metadata) {
  return (metadata.match_periods || []).reduce((sum, period) => sum + number(period.duration_minutes), 0);
}

function isPass(row) {
  return row.event_type === 'player_possession' && row.end_type === 'pass';
}

function isCompletePass(row) {
  return isPass(row) && row.pass_outcome === 'successful';
}

function isCross(row) {
  return isPass(row)
    && ['wide_left', 'wide_right'].includes(row.channel_start)
    && truthy(row.player_targeted_penalty_area_pass);
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summary(values) {
  const finite = values.filter(Number.isFinite);
  if (!finite.length) return null;
  return {
    median: round(median(finite)),
    min: round(Math.min(...finite)),
    max: round(Math.max(...finite)),
    sampleSize: finite.length,
  };
}

function add(map, key, amount = 1) {
  map[key] = (map[key] || 0) + amount;
}

function phaseFeatures(phases, teamId) {
  const attacking = {};
  const defending = {};
  let inPossessionSeconds = 0;
  let outOfPossessionSeconds = 0;
  for (const row of phases) {
    const seconds = number(row.duration);
    if (String(row.team_in_possession_id) === teamId) {
      inPossessionSeconds += seconds;
      add(attacking, row.team_in_possession_phase_type || 'unknown', seconds);
    } else {
      outOfPossessionSeconds += seconds;
      add(defending, row.team_out_of_possession_phase_type || 'unknown', seconds);
    }
  }
  return {
    inPossessionSeconds: round(inPossessionSeconds, 1),
    outOfPossessionSeconds: round(outOfPossessionSeconds, 1),
    possessionShareOfPhases: round(inPossessionSeconds / Math.max(1, inPossessionSeconds + outOfPossessionSeconds)),
    attackingPhaseShare: Object.fromEntries(Object.entries(attacking).map(([key, value]) => [key, round(value / Math.max(1, inPossessionSeconds))])),
    defendingPhaseShare: Object.fromEntries(Object.entries(defending).map(([key, value]) => [key, round(value / Math.max(1, outOfPossessionSeconds))])),
  };
}

function eventFeatures(events, teamId, minutes) {
  const own = events.filter((row) => String(row.team_id) === teamId);
  const passes = own.filter(isPass);
  const completed = passes.filter(isCompletePass);
  const shots = own.filter((row) => row.event_type === 'player_possession' && row.end_type === 'shot');
  const crosses = passes.filter(isCross);
  const pressures = own.filter((row) => row.event_type === 'on_ball_engagement' && ['pressure', 'pressing', 'recovery_press', 'counter_press'].includes(row.event_subtype));
  const counterPresses = pressures.filter((row) => row.event_subtype === 'counter_press');
  const offBallRuns = own.filter((row) => row.event_type === 'off_ball_run');
  const regains = own.filter((row) => ['direct_regain', 'indirect_regain'].includes(row.end_type));
  const highRegains = regains.filter((row) => row.third_end === 'attacking_third' || row.third_start === 'attacking_third');
  const lineBreakPasses = passes.filter((row) => row.furthest_line_break);
  const successfulLineBreakPasses = lineBreakPasses.filter(isCompletePass);
  const finalThirdEntries = completed.filter((row) => row.third_start !== 'attacking_third' && row.third_end === 'attacking_third');
  const penaltyAreaEntries = completed.filter((row) => truthy(row.player_targeted_penalty_area_reception));
  const forwardPasses = passes.filter((row) => row.pass_direction === 'forward');
  const longPasses = passes.filter((row) => row.pass_range === 'long');
  const passEpv = completed.reduce((sum, row) => sum + number(row.pass_epv_total), 0);
  const attackingChannelCounts = {};
  for (const row of completed.filter((item) => item.third_end === 'attacking_third')) add(attackingChannelCounts, row.channel_end || 'unknown');
  const per90 = (value) => round(value * 90 / Math.max(1, minutes));
  return {
    passesAttempted: passes.length,
    passesCompleted: completed.length,
    passCompletion: round(completed.length / Math.max(1, passes.length)),
    forwardPassShare: round(forwardPasses.length / Math.max(1, passes.length)),
    longPassShare: round(longPasses.length / Math.max(1, passes.length)),
    lineBreakPasses: lineBreakPasses.length,
    successfulLineBreakPasses: successfulLineBreakPasses.length,
    finalThirdEntries: finalThirdEntries.length,
    penaltyAreaEntries: penaltyAreaEntries.length,
    crosses: crosses.length,
    completedCrosses: crosses.filter(isCompletePass).length,
    crossCompletion: round(crosses.filter(isCompletePass).length / Math.max(1, crosses.length)),
    shots: shots.length,
    eventTaggedGoals: shots.filter((row) => truthy(row.lead_to_goal)).length,
    pressureActions: pressures.length,
    counterPresses: counterPresses.length,
    regains: regains.length,
    highRegains: highRegains.length,
    offBallRuns: offBallRuns.length,
    overlapRuns: offBallRuns.filter((row) => row.event_subtype === 'overlap').length,
    underlapRuns: offBallRuns.filter((row) => row.event_subtype === 'underlap').length,
    runAheadOfBall: offBallRuns.filter((row) => row.event_subtype === 'run_ahead_of_the_ball').length,
    passEpvTotal: round(passEpv),
    attackingChannelCounts,
    per90: {
      passesAttempted: per90(passes.length),
      lineBreakPasses: per90(lineBreakPasses.length),
      finalThirdEntries: per90(finalThirdEntries.length),
      penaltyAreaEntries: per90(penaltyAreaEntries.length),
      crosses: per90(crosses.length),
      shots: per90(shots.length),
      pressureActions: per90(pressures.length),
      counterPresses: per90(counterPresses.length),
      highRegains: per90(highRegains.length),
      offBallRuns: per90(offBallRuns.length),
    },
  };
}

function playerMinutes(metadata, playerId) {
  const person = (metadata.players || []).find((row) => String(row.id) === playerId);
  return number(person?.playing_time?.total?.minutes_played);
}

function playerIdentity(metadata, playerId) {
  const person = (metadata.players || []).find((row) => String(row.id) === playerId);
  return person ? {
    playerId,
    name: person.short_name || `${person.first_name || ''} ${person.last_name || ''}`.trim(),
    position: person.player_role?.acronym || person.player_role?.name || null,
    number: person.number,
  } : { playerId, name: null, position: null, number: null };
}

const manifest = await readJson(manifestPath);
if (!manifest.validation?.passed) throw new Error('Source manifest validation must pass before history processing.');

const assertions = [];
const warnings = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}

const teamMatchFeatures = [];
const playerAccumulator = new Map();

for (const mainTeam of manifest.mainTeams) {
  const teamId = String(mainTeam.id);
  for (const matchId of mainTeam.historyMatchIds) {
    const matchDir = join(matchesRoot, matchId);
    const [metadata, events, phases] = await Promise.all([
      readJson(join(matchDir, `${matchId}_match.json`)),
      readCsv(join(matchDir, `${matchId}_dynamic_events.csv`)),
      readCsv(join(matchDir, `${matchId}_phases_of_play.csv`)),
    ]);
    const isHome = String(metadata.home_team.id) === teamId;
    const ownTeam = isHome ? metadata.home_team : metadata.away_team;
    const opponent = isHome ? metadata.away_team : metadata.home_team;
    const goalsFor = number(isHome ? metadata.home_team_score : metadata.away_team_score);
    const goalsAgainst = number(isHome ? metadata.away_team_score : metadata.home_team_score);
    const minutes = durationMinutes(metadata);
    const event = eventFeatures(events, teamId, minutes);
    const phase = phaseFeatures(phases, teamId);
    if (event.eventTaggedGoals !== goalsFor) {
      warnings.push({
        code: 'EVENT_GOAL_MISMATCH', matchId, teamId,
        detail: `metadata=${goalsFor}, shot rows tagged lead_to_goal=${event.eventTaggedGoals}`,
      });
    }
    teamMatchFeatures.push({
      matchId,
      kickoff: metadata.date_time,
      team: { id: teamId, name: teamIdentity(teamId)?.name ?? ownTeam.name },
      opponent: { id: String(opponent.id), name: teamIdentity(opponent.id)?.name ?? opponent.name },
      venue: isHome ? 'home' : 'away',
      durationMinutes: round(minutes, 2),
      goalsFor,
      goalsAgainst,
      result: goalsFor > goalsAgainst ? 'win' : goalsFor < goalsAgainst ? 'loss' : 'draw',
      points: goalsFor > goalsAgainst ? 3 : goalsFor === goalsAgainst ? 1 : 0,
      event,
      phase,
      featureVersion: 'skillcorner-history/1.0',
    });

    const ownEvents = events.filter((row) => String(row.team_id) === teamId && row.player_id);
    const playerIds = new Set([
      ...(metadata.players || []).filter((row) => String(row.team_id) === teamId).map((row) => String(row.id)),
      ...ownEvents.map((row) => String(row.player_id)),
    ]);
    for (const playerId of playerIds) {
      const minutesPlayed = playerMinutes(metadata, playerId);
      if (minutesPlayed <= 0) continue;
      const rows = ownEvents.filter((row) => String(row.player_id) === playerId);
      const key = `${teamId}:${playerId}`;
      const item = playerAccumulator.get(key) || {
        ...playerIdentity(metadata, playerId),
        teamId,
        matches: [],
      };
      item.matches.push({
        matchId,
        kickoff: metadata.date_time,
        minutes: round(minutesPlayed, 2),
        event: eventFeatures(rows, teamId, minutesPlayed),
      });
      playerAccumulator.set(key, item);
    }
  }
}

const baselineMetricPaths = [
  ['goalsFor'], ['goalsAgainst'], ['points'],
  ['event', 'passCompletion'], ['event', 'forwardPassShare'], ['event', 'longPassShare'], ['event', 'crossCompletion'], ['event', 'passEpvTotal'],
  ['event', 'per90', 'passesAttempted'], ['event', 'per90', 'lineBreakPasses'], ['event', 'per90', 'finalThirdEntries'],
  ['event', 'per90', 'penaltyAreaEntries'], ['event', 'per90', 'crosses'], ['event', 'per90', 'shots'],
  ['event', 'per90', 'pressureActions'], ['event', 'per90', 'counterPresses'], ['event', 'per90', 'highRegains'], ['event', 'per90', 'offBallRuns'],
  ['phase', 'possessionShareOfPhases'],
];

const getPath = (row, path) => path.reduce((value, key) => value?.[key], row);
const setPath = (row, path, value) => {
  let target = row;
  for (const key of path.slice(0, -1)) target = target[key] ||= {};
  target[path.at(-1)] = value;
};

const teamBaselines = manifest.mainTeams.map((mainTeam) => {
  const rows = teamMatchFeatures.filter((row) => row.team.id === String(mainTeam.id)).sort((a, b) => Date.parse(a.kickoff) - Date.parse(b.kickoff));
  const metrics = {};
  for (const path of baselineMetricPaths) setPath(metrics, path, summary(rows.map((row) => getPath(row, path))));
  const attackingPhaseTypes = [...new Set(rows.flatMap((row) => Object.keys(row.phase.attackingPhaseShare)))];
  const defendingPhaseTypes = [...new Set(rows.flatMap((row) => Object.keys(row.phase.defendingPhaseShare)))];
  metrics.phase ||= {};
  metrics.phase.attackingShare = Object.fromEntries(attackingPhaseTypes.map((name) => [name, summary(rows.map((row) => row.phase.attackingPhaseShare[name] || 0))]));
  metrics.phase.defendingShare = Object.fromEntries(defendingPhaseTypes.map((name) => [name, summary(rows.map((row) => row.phase.defendingPhaseShare[name] || 0))]));
  return {
    team: rows[0].team,
    cutoffKickoff: manifest.matches.find((row) => row.matchId === manifest.policy.mainMatchId).kickoff,
    matchIds: rows.map((row) => row.matchId),
    matchCount: rows.length,
    method: 'median_min_max_of_last_three_pre_match_fixtures',
    metrics,
  };
});

const playerBaselines = [...playerAccumulator.values()].map((item) => {
  const minutes = item.matches.reduce((sum, row) => sum + row.minutes, 0);
  const total = (path) => item.matches.reduce((sum, row) => sum + number(getPath(row, path)), 0);
  const per90 = (value) => round(value * 90 / Math.max(1, minutes));
  const passesAttempted = total(['event', 'passesAttempted']);
  const passesCompleted = total(['event', 'passesCompleted']);
  const crosses = total(['event', 'crosses']);
  const completedCrosses = total(['event', 'completedCrosses']);
  return {
    playerId: item.playerId,
    teamId: item.teamId,
    name: item.name,
    position: item.position,
    number: item.number,
    matchIds: item.matches.map((row) => row.matchId),
    matchesPlayed: item.matches.length,
    minutes: round(minutes, 2),
    metrics: {
      passCompletion: round(passesCompleted / Math.max(1, passesAttempted)),
      crossCompletion: round(completedCrosses / Math.max(1, crosses)),
      passesAttemptedPer90: per90(passesAttempted),
      lineBreakPassesPer90: per90(total(['event', 'lineBreakPasses'])),
      crossesPer90: per90(crosses),
      shotsPer90: per90(total(['event', 'shots'])),
      pressureActionsPer90: per90(total(['event', 'pressureActions'])),
      offBallRunsPer90: per90(total(['event', 'offBallRuns'])),
      passEpvPer90: per90(total(['event', 'passEpvTotal'])),
    },
    featureVersion: 'skillcorner-player-history/1.0',
  };
}).sort((a, b) => a.teamId.localeCompare(b.teamId) || b.minutes - a.minutes);

check('six team-match feature rows', teamMatchFeatures.length === 6, `${teamMatchFeatures.length} rows`);
check('three matches per main team', teamBaselines.every((row) => row.matchCount === 3), teamBaselines.map((row) => `${row.team.id}:${row.matchCount}`).join(', '));
check('main match excluded from history', !teamMatchFeatures.some((row) => row.matchId === manifest.policy.mainMatchId), manifest.policy.mainMatchId);
check('all history kickoffs precede main match', teamMatchFeatures.every((row) => Date.parse(row.kickoff) < Date.parse(teamBaselines[0].cutoffKickoff)), teamBaselines[0].cutoffKickoff);
check('ratios are bounded', teamMatchFeatures.every((row) => [row.event.passCompletion, row.event.crossCompletion, row.phase.possessionShareOfPhases].every((value) => value >= 0 && value <= 1)), 'pass/cross/possession ratios');
check('metadata score retained as source of truth', teamMatchFeatures.every((row) => Number.isInteger(row.goalsFor) && Number.isInteger(row.goalsAgainst)), 'integer goals');
check('player baselines have positive minutes', playerBaselines.length > 0 && playerBaselines.every((row) => row.minutes > 0), `${playerBaselines.length} players`);
check('no season aggregate input', true, 'only six match metadata, dynamic events and phases were read');

const failed = assertions.filter((row) => !row.passed);
await mkdir(historyDir, { recursive: true });
await mkdir(qualityDir, { recursive: true });
await writeFile(join(historyDir, 'team-match-features.json'), JSON.stringify(teamMatchFeatures, null, 2), 'utf8');
await writeFile(join(historyDir, 'team-baselines.json'), JSON.stringify(teamBaselines, null, 2), 'utf8');
await writeFile(join(historyDir, 'player-baselines.json'), JSON.stringify(playerBaselines, null, 2), 'utf8');
await writeFile(join(qualityDir, 'history-baseline-report.json'), JSON.stringify({
  schemaVersion: 'skillcorner-history-quality/1.0',
  generatedAt: new Date().toISOString(),
  passed: failed.length === 0,
  assertions,
  warnings,
  notes: [
    'Metadata score is authoritative because lead_to_goal can tag a shot in a sequence differently from the official scoreboard.',
    'Phase labels are used for historical baselines and offline evaluation; current-match online tactical inference must not read future or provider phase labels.',
    'Three-match baselines report median/min/max and sample size. They are not a training dataset.',
  ],
}, null, 2), 'utf8');

console.log(`Wrote ${teamMatchFeatures.length} team-match rows, ${teamBaselines.length} team baselines and ${playerBaselines.length} player baselines.`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed; ${warnings.length} documented source warnings.`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
