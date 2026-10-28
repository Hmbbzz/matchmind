import { createReadStream } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildShotHighlights, HIGHLIGHT_POLICY } from './lib/shot-highlights.mjs';
import { teamIdentity } from '../public/team-identities.js';
import { canonicalizeTeamLabels } from '../backend/team-identity-policy.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const skillCornerRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const matchId = process.env.SKILLCORNER_MATCH_ID || '2017461';
const sourceDir = join(skillCornerRoot, 'data', 'matches', matchId);
const outputDir = join(projectRoot, 'dist', 'data');
const frameDir = join(outputDir, 'frames');
const historicalPlayerBaselinePath = join(outputDir, 'history', 'player-baselines.json');
const historicalTeamBaselinePath = join(outputDir, 'history', 'team-baselines.json');
const historicalTeamMatchPath = join(outputDir, 'history', 'team-match-features.json');
const trackingPath = join(sourceDir, `${matchId}_tracking_extrapolated.jsonl`);
const CHUNK_FRAMES = 6000; // ten minutes at the native 10 Hz rate

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

const readCsv = async (path) => parseCsv(await readFile(path, 'utf8'));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const bool = (value) => String(value).toLowerCase() === 'true';
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const quantize = (value, scale) => Math.round((value ?? 0) * scale);

function timeToMs(value = '00:00.0') {
  const parts = value.split(':').map(Number);
  if (parts.length === 3) return Math.round((parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000);
  return Math.round(((parts[0] || 0) * 60 + (parts[1] || 0)) * 1000);
}

function normalizedToPitch(value, attackingSide) {
  if (!Number.isFinite(Number(value))) return null;
  const raw = Number(value);
  return (attackingSide === 'right_to_left' ? -raw : raw) + 52.5;
}

function yToPitch(value) {
  if (!Number.isFinite(Number(value))) return null;
  return Number(value) + 34;
}

function estimatedXg(row) {
  const x = number(row.x_start);
  const y = number(row.y_start);
  const distance = Math.hypot(52.5 - x, y);
  const centrality = Math.max(0.25, 1 - Math.abs(y) / 34);
  return clamp((1 / (1 + Math.exp((distance - 13.5) / 3.7))) * centrality * 0.72, 0.01, 0.72);
}

function chooseVisualColor(hex, fallback) {
  if (!/^#[0-9a-f]{6}$/i.test(hex || '')) return fallback;
  const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  return luminance > 218 ? fallback : hex;
}

const [match, dynamicEvents, historicalPlayerBaselines, historicalTeamBaselines, historicalTeamMatches] = await Promise.all([
  readJson(join(sourceDir, `${matchId}_match.json`)),
  readCsv(join(sourceDir, `${matchId}_dynamic_events.csv`)),
  readJson(historicalPlayerBaselinePath),
  readJson(historicalTeamBaselinePath),
  readJson(historicalTeamMatchPath),
]);

const homeId = `sk_team_${match.home_team.id}`;
const awayId = `sk_team_${match.away_team.id}`;
const firstHalfStreamEndMs = Math.round(number(match.match_periods?.find((row) => row.period === 1)?.duration_frames) * 100);
const secondHalfStreamStartMs = firstHalfStreamEndMs + 100;
const secondHalfClockStartMs = 45 * 60 * 1000;
const secondHalfOffsetMs = secondHalfStreamStartMs - secondHalfClockStartMs;
const teamId = (id) => `sk_team_${id}`;
const playerId = (id) => `sk_player_${id}`;
const homeColor = chooseVisualColor(match.home_team_kit?.jersey_color, '#173b85');
const awayColor = chooseVisualColor(match.away_team_kit?.jersey_color, '#ef8a24');

const teams = [
  { id: homeId, code: match.home_team.acronym, name: match.home_team.short_name, fullName: match.home_team.name, primaryColor: homeColor, officialKitColor: match.home_team_kit?.jersey_color },
  { id: awayId, code: match.away_team.acronym, name: match.away_team.short_name, fullName: match.away_team.name, primaryColor: awayColor, officialKitColor: match.away_team_kit?.jersey_color },
].map(row => { const identity = teamIdentity(row.id); return identity ? { ...row, code: identity.code, name: identity.name, fullName: identity.name } : row; });

const playerHistoryBaseline = new Map(historicalPlayerBaselines.map((row) => [`${row.teamId}:${row.playerId}`, row]));

const players = match.players
  .filter((person) => person.trackable_object && person.player_role?.name !== 'Substitute')
  .sort((a, b) => (a.team_id - b.team_id) || ((a.playing_time?.total?.start_frame ?? 1e9) - (b.playing_time?.total?.start_frame ?? 1e9)) || (a.number - b.number))
  .map((person) => {
    const history = playerHistoryBaseline.get(`${person.team_id}:${person.id}`);
    return {
      id: playerId(person.id),
      sourcePlayerId: person.id,
      teamId: teamId(person.team_id),
      name: person.short_name || `${person.first_name} ${person.last_name}`.trim(),
      fullName: `${person.first_name} ${person.last_name}`.replace(/\s+/g, ' ').trim(),
      number: person.number,
      position: person.player_role?.acronym || person.player_role?.name || '—',
      match: {
        minutes: number(person.playing_time?.total?.minutes_played),
        goals: number(person.goal),
        yellow_cards: number(person.yellow_card),
        red_cards: number(person.red_card),
      },
      baseline: {
        source: history ? 'last_three_pre_match_fixtures' : null,
        match_count: history?.matchesPlayed ?? 0,
        minutes: history?.minutes ?? null,
        pass_completion: history?.metrics?.passCompletion ?? null,
        pass_xcompletion: null,
        passes_attempted_per90: history?.metrics?.passesAttemptedPer90 ?? null,
        line_break_passes_per90: history?.metrics?.lineBreakPassesPer90 ?? null,
        max_speed_mps: null,
        distance_m: null,
        offball_runs_per90: history?.metrics?.offBallRunsPer90 ?? null,
        pressure_actions_per90: history?.metrics?.pressureActionsPer90 ?? null,
        cross_completion: history?.metrics?.crossCompletion ?? null,
        crosses_per90: history?.metrics?.crossesPer90 ?? null,
        shots_per90: history?.metrics?.shotsPer90 ?? null,
        pass_epv_per90: history?.metrics?.passEpvPer90 ?? null,
        xg_per_90: null,
      },
    };
  });

const indexBySourcePlayer = new Map(players.map((person, index) => [Number(person.sourcePlayerId), index]));
const playerTeamBySource = new Map(players.map((person) => [Number(person.sourcePlayerId), person.teamId]));
const playerBySource = new Map(players.map((person) => [Number(person.sourcePlayerId), person]));

const phaseNames = ['not_exposed'];
const attackPatternNames = ['not_exposed'];
const phaseIndex = new Map(phaseNames.map((value, index) => [value, index]));
const attackPatternIndex = new Map(attackPatternNames.map((value, index) => [value, index]));
const intentNames = ['carry', 'support_carrier', 'press', 'recover_shape'];
const intentIndex = new Map(intentNames.map((value, index) => [value, index]));

function convertEvent(row) {
  const sourcePlayer = Number(row.player_id);
  const sourceTeam = Number(row.team_id);
  const attackingSide = row.attacking_side;
  const period = number(row.period);
  const periodOffsetMs = period === 2 ? secondHalfOffsetMs : 0;
  const startMs = timeToMs(row.time_start || row.time_end) + periodOffsetMs;
  const endMs = timeToMs(row.time_end || row.time_start) + periodOffsetMs;
  const isShot = row.event_type === 'player_possession' && row.end_type === 'shot';
  const isPass = row.event_type === 'player_possession' && row.end_type === 'pass';
  let type = null;
  if (isShot) type = 'shot';
  else if (isPass) type = 'pass';
  else if (row.event_type === 'on_ball_engagement') type = 'pressure';
  else if (row.event_type === 'off_ball_run') type = 'off_ball_run';
  else if (row.event_type === 'passing_option') type = 'passing_option';
  else if (row.event_type === 'player_possession' && ['direct_regain', 'indirect_regain'].includes(row.end_type)) type = 'regain';
  else if (row.event_type === 'player_possession' && row.end_type === 'possession_loss') type = 'turnover';
  else if (row.event_type === 'player_possession' && row.end_type === 'clearance') type = 'clearance';
  else if (row.event_type === 'player_possession' && ['foul_suffered', 'foul_committed'].includes(row.end_type)) type = 'foul';
  if (!type || !Number.isFinite(sourcePlayer) || !Number.isFinite(sourceTeam)) return null;
  const startX = normalizedToPitch(row.x_start, attackingSide);
  const startY = yToPitch(row.y_start);
  let endX = normalizedToPitch(row.player_targeted_x_reception || row.x_end, attackingSide);
  let endY = yToPitch(row.player_targeted_y_reception || row.y_end);
  if (isShot) {
    endX = attackingSide === 'right_to_left' ? 0 : 105;
    endY = 34;
  }
  const passCross = isPass && ['wide_left', 'wide_right'].includes(row.channel_start) && bool(row.player_targeted_penalty_area_pass);
  let outcome = row.event_subtype || row.end_type || 'observed';
  if (isShot) outcome = bool(row.lead_to_goal) ? 'goal' : /corner/.test(row.game_interruption_after) ? 'saved' : /goal_kick/.test(row.game_interruption_after) ? 'off_target' : 'blocked';
  else if (isPass) outcome = row.pass_outcome === 'successful' ? 'complete' : 'incomplete';
  else if (type === 'passing_option') outcome = bool(row.targeted) ? 'targeted' : 'available';
  else if (type === 'regain' || type === 'clearance') outcome = 'complete';
  else if (type === 'turnover') outcome = 'lost';
  return {
    id: `sk_event_${row.event_id}`,
    t: endMs,
    type,
    team: teamId(sourceTeam),
    player: playerId(sourcePlayer),
    secondary: row.player_targeted_id ? playerId(row.player_targeted_id) : null,
    outcome,
    x: clamp(startX ?? 52.5, 0, 105),
    y: clamp(startY ?? 34, 0, 68),
    ex: clamp(endX ?? startX ?? 52.5, 0, 105),
    ey: clamp(endY ?? startY ?? 34, 0, 68),
    q: {
      pass_type: passCross ? 'cross' : row.high_pass === 'True' ? 'high_pass' : row.pass_direction || 'open_play',
      completed: outcome === 'complete',
      xg: isShot ? Number(estimatedXg(row).toFixed(3)) : null,
      xgModel: isShot ? 'position-only demo estimate' : null,
      distance_m: isShot ? Number(Math.hypot(52.5 - number(row.x_start), number(row.y_start)).toFixed(1)) : null,
      pressure: row.overall_pressure_end || row.overall_pressure_start || null,
      lineBreak: row.furthest_line_break || null,
      passDirection: isPass ? row.pass_direction || null : null,
      passRange: isPass ? row.pass_range || null : null,
      xpass: isPass && row.xpass_completion !== '' ? number(row.xpass_completion) : null,
      epv: row.pass_epv_total !== '' ? number(row.pass_epv_total) : row.possession_epv_total !== '' ? number(row.possession_epv_total) : null,
      runSubtype: row.event_type === 'off_ball_run' ? row.event_subtype || null : null,
      engagementSubtype: row.event_type === 'on_ball_engagement' ? row.event_subtype || null : null,
      startType: row.start_type || null,
      endType: row.end_type || null,
      sourceFrameStart: number(row.frame_start),
      sourceFrameEnd: number(row.frame_end),
      sourceStartMatched: row.is_player_possession_start_matched === '' ? null : bool(row.is_player_possession_start_matched),
      sourceEndMatched: row.is_player_possession_end_matched === '' ? null : bool(row.is_player_possession_end_matched),
      sourceEventType: row.event_type,
      period,
      startMs,
      endMs,
    },
  };
}

const events = dynamicEvents.map(convertEvent).filter(Boolean);

for (const person of match.players) {
  if (!person.playing_time?.total || !person.start_time || person.start_time === '00:00:00') continue;
  const replacing = match.players.find((candidate) => candidate.team_id === person.team_id && candidate.end_time === person.start_time);
  const substitutionClock = timeToMs(person.start_time);
  events.push({
    id: `sk_sub_${person.id}_${person.start_time.replaceAll(':', '')}`,
    t: substitutionClock + (substitutionClock >= secondHalfClockStartMs ? secondHalfOffsetMs : 0),
    type: 'substitution',
    team: teamId(person.team_id),
    player: replacing ? playerId(replacing.id) : null,
    secondary: playerId(person.id),
    outcome: 'complete', x: 52.5, y: 34, ex: 52.5, ey: 34,
    q: { sourceEventType: 'lineup' },
  });
}
events.sort((a, b) => a.t - b.t);

const highlights = buildShotHighlights(events, { matchId: `skillcorner_${matchId}` });

const passEvents = events.filter((event) => event.type === 'pass');
const shotEvents = events.filter((event) => event.type === 'shot');
const countForTeam = (rows, id) => rows.filter((row) => row.team === id).length;
const completedForTeam = (rows, id) => rows.filter((row) => row.team === id && row.outcome === 'complete').length;
const crossesForTeam = (id) => passEvents.filter((row) => row.team === id && row.q.pass_type === 'cross');

await rm(frameDir, { recursive: true, force: true });
await mkdir(frameDir, { recursive: true });

let chunks = [];
let chunk = [];
let frameCount = 0;
let trackedFrameCount = 0;
let heldFrameCount = 0;
let lastTime = 0;
let previousBall = null;
let smoothBallVelocity = { x: 0, y: 0, z: 0 };
let lastTrackedPoints = [];
const previousPlayers = new Map();
const distanceByPlayer = new Map();

async function flushChunk() {
  if (!chunk.length) return;
  const index = chunks.length;
  const file = `frames/${String(index).padStart(2, '0')}.json`;
  await writeFile(join(outputDir, file), JSON.stringify(chunk), 'utf8');
  chunks.push({ file, start: chunk[0].t, end: chunk.at(-1).t, frames: chunk.length });
  chunk = [];
}

const lines = createInterface({ input: createReadStream(trackingPath), crlfDelay: Infinity });
for await (const line of lines) {
  if (!line.trim()) continue;
  const source = JSON.parse(line);
  if (!source.timestamp || ![1, 2].includes(source.period)) continue;
  const clockTime = timeToMs(source.timestamp);
  const t = clockTime + (source.period === 2 ? secondHalfOffsetMs : 0);
  const possessionTeam = source.possession?.player_id ? playerTeamBySource.get(Number(source.possession.player_id)) : null;
  const rawBall = source.ball_data || {};
  const trackingAvailable = (source.player_data || []).length > 0
    && rawBall.x != null && rawBall.y != null && Number.isFinite(Number(rawBall.x)) && Number.isFinite(Number(rawBall.y));
  let points = [];
  let ballX;
  let ballY;
  let ballZ;
  let ownerIndex = -1;
  let ballDetected = 0;

  if (trackingAvailable) {
    for (const raw of source.player_data || []) {
      const index = indexBySourcePlayer.get(Number(raw.player_id));
      if (index == null) continue;
      const x = clamp(number(raw.x) + 52.5, 0, 105);
      const y = clamp(number(raw.y) + 34, 0, 68);
      const previous = previousPlayers.get(Number(raw.player_id));
      const elapsed = previous ? (t - previous.t) / 1000 : 0.1;
      const contiguous = elapsed > 0 && elapsed <= 0.5;
      const dt = contiguous ? clamp(elapsed, 0.05, 0.5) : 0.1;
      const rawVx = previous && contiguous ? clamp((x - previous.x) / dt, -12, 12) : 0;
      const rawVy = previous && contiguous ? clamp((y - previous.y) / dt, -12, 12) : 0;
      const vx = previous && contiguous ? previous.vx * 0.7 + rawVx * 0.3 : 0;
      const vy = previous && contiguous ? previous.vy * 0.7 + rawVy * 0.3 : 0;
      const speed = Math.hypot(vx, vy);
      const previousSpeed = contiguous ? previous?.speed || 0 : 0;
      const acceleration = clamp((speed - previousSpeed) / dt, -8, 8);
      const step = previous && contiguous ? Math.hypot(x - previous.x, y - previous.y) : 0;
      const distance = (distanceByPlayer.get(Number(raw.player_id)) || 0) + (step < 3 ? step : 0);
      distanceByPlayer.set(Number(raw.player_id), distance);
      const facing = speed > 0.2 ? Math.atan2(vy, vx) : (previous?.facing || 0);
      const person = players[index];
      let intent = 'recover_shape';
      if (Number(source.possession?.player_id) === Number(raw.player_id)) intent = 'carry';
      else if (possessionTeam && person.teamId === possessionTeam) intent = 'support_carrier';
      else if (possessionTeam) intent = 'press';
      const stamina = clamp(100 - distance / 850, 72, 100);
      points.push([
        index, quantize(x, 100), quantize(y, 100), quantize(stamina, 10), quantize(vx, 100), quantize(vy, 100),
        quantize(speed, 100), quantize(acceleration, 100), quantize(facing, 1000), quantize(distance, 10), intentIndex.get(intent), raw.is_detected ? 1 : 0,
      ]);
      previousPlayers.set(Number(raw.player_id), { x, y, vx, vy, speed, facing, t });
    }
    ballX = clamp(number(rawBall.x) + 52.5, 0, 105);
    ballY = clamp(number(rawBall.y) + 34, 0, 68);
    ballZ = clamp(number(rawBall.z), 0, 12);
    const ballElapsed = previousBall ? (t - previousBall.t) / 1000 : 0.1;
    const ballContiguous = previousBall && ballElapsed > 0 && ballElapsed <= 0.5;
    if (ballContiguous) {
      const dt = clamp(ballElapsed, 0.05, 0.5);
      const next = {
        x: clamp((ballX - previousBall.x) / dt, -45, 45),
        y: clamp((ballY - previousBall.y) / dt, -45, 45),
        z: clamp((ballZ - previousBall.z) / dt, -30, 30),
      };
      smoothBallVelocity = {
        x: smoothBallVelocity.x * 0.55 + next.x * 0.45,
        y: smoothBallVelocity.y * 0.55 + next.y * 0.45,
        z: smoothBallVelocity.z * 0.55 + next.z * 0.45,
      };
    } else {
      smoothBallVelocity = { x: 0, y: 0, z: 0 };
    }
    previousBall = { x: ballX, y: ballY, z: ballZ, t };
    lastTrackedPoints = points.map((point) => [...point]);
    ownerIndex = source.possession?.player_id ? (indexBySourcePlayer.get(Number(source.possession.player_id)) ?? -1) : -1;
    ballDetected = rawBall.is_detected ? 1 : 0;
    trackedFrameCount += 1;
  } else {
    if (!previousBall || !lastTrackedPoints.length) continue;
    points = lastTrackedPoints.map((point) => {
      const held = [...point];
      held[4] = 0; held[5] = 0; held[6] = 0; held[7] = 0; held[11] = 0;
      return held;
    });
    ballX = previousBall.x;
    ballY = previousBall.y;
    ballZ = previousBall.z;
    smoothBallVelocity = { x: 0, y: 0, z: 0 };
    heldFrameCount += 1;
  }

  lastTime = t;
  chunk.push({
    t,
    b: [
      quantize(ballX, 100), quantize(ballY, 100), ownerIndex, quantize(ballZ, 100), quantize(smoothBallVelocity.x, 100),
      quantize(smoothBallVelocity.y, 100), quantize(smoothBallVelocity.z, 100), quantize(Math.hypot(smoothBallVelocity.x, smoothBallVelocity.y, smoothBallVelocity.z), 100), 0, ballDetected,
    ],
    p: points,
    c: [phaseIndex.get('not_exposed'), attackPatternIndex.get('not_exposed')],
    q: trackingAvailable ? 1 : 0,
  });
  frameCount += 1;
  if (chunk.length >= CHUNK_FRAMES) await flushChunk();
}
await flushChunk();

const homePasses = countForTeam(passEvents, homeId);
const awayPasses = countForTeam(passEvents, awayId);
const homeCrosses = crossesForTeam(homeId);
const awayCrosses = crossesForTeam(awayId);

const payload = {
  meta: {
    generatedFrom: 'SkillCorner Open Data',
    sourceUrl: 'https://github.com/SkillCorner/opendata',
    license: 'MIT',
    synthetic: false,
    historicalStream: true,
    trackingHz: 10,
    highlightPolicy: HIGHLIGHT_POLICY,
    analysisPolicy: {
      providerPhaseLabels: 'evaluation_only_until_own_tactical_engine_is_available',
      displayIntent: 'heuristic_only_not_an_analysis_result',
      historicalBaseline: 'last_three_pre_match_fixtures',
      seasonAggregatesUsed: false,
    },
    trackingQuality: {
      trackedFrames: trackedFrameCount,
      heldFrames: heldFrameCount,
      trackedCoverage: frameCount ? trackedFrameCount / frameCount : 0,
      heldFrameBehavior: 'last trusted positions held; excluded from analytics',
    },
    quantization: {
      ball: [100, 100, 1, 100, 100, 100, 100, 100, 100, 1],
      player: [1, 100, 100, 10, 100, 100, 100, 100, 1000, 10, 1, 1],
    },
    dictionaries: { intents: intentNames, phases: phaseNames, attackPatterns: attackPatternNames, frameQuality: ['held_unavailable', 'tracked'] },
    compactSchema: {
      ball: ['x', 'y', 'ownerIndex', 'z', 'vx', 'vy', 'vz', 'speedMps', 'spin', 'isDetected'],
      player: ['index', 'x', 'y', 'stamina', 'vx', 'vy', 'speedMps', 'accelerationMps2', 'facingRad', 'distanceM', 'intentIndex', 'isDetected'],
      context: ['phaseIndex', 'attackPatternIndex'],
      frameQuality: 'q: 1 tracked, 0 held because source tracking is unavailable',
    },
  },
  match: {
    match_id: `skillcorner_${matchId}`,
    source_match_id: match.id,
    season_id: match.competition_edition?.season?.name,
    competition_id: match.competition_edition?.competition?.name,
    competition_name: match.competition_edition?.name,
    kickoff: match.date_time,
    venue: match.stadium?.name,
    city: match.stadium?.city,
    home_team_id: homeId,
    away_team_id: awayId,
    home_goals: match.home_team_score,
    away_goals: match.away_team_score,
    duration_ms: lastTime,
    second_half_stream_start_ms: secondHalfStreamStartMs,
    second_half_clock_start_ms: secondHalfClockStartMs,
    second_half_offset_ms: secondHalfOffsetMs,
    home_shots: countForTeam(shotEvents, homeId),
    away_shots: countForTeam(shotEvents, awayId),
    home_passes: homePasses,
    away_passes: awayPasses,
    home_pass_completion: homePasses ? completedForTeam(passEvents, homeId) / homePasses : 0,
    away_pass_completion: awayPasses ? completedForTeam(passEvents, awayId) / awayPasses : 0,
    home_crosses: homeCrosses.length,
    away_crosses: awayCrosses.length,
    home_cross_completion: homeCrosses.length ? homeCrosses.filter((row) => row.outcome === 'complete').length / homeCrosses.length : 0,
    away_cross_completion: awayCrosses.length ? awayCrosses.filter((row) => row.outcome === 'complete').length / awayCrosses.length : 0,
    tracked_frames: trackedFrameCount,
    held_frames: heldFrameCount,
    tracking_coverage: frameCount ? trackedFrameCount / frameCount : 0,
  },
  teams,
  players,
  frames: [],
  frameChunks: chunks,
  events,
  highlights,
  history: {
    cutoff_kickoff: match.date_time,
    method: 'last_three_pre_match_fixtures',
    team_baselines: historicalTeamBaselines.filter((row) => [homeId.replace('sk_team_', ''), awayId.replace('sk_team_', '')].includes(String(row.team.id))),
    team_matches: historicalTeamMatches.filter((row) => [homeId.replace('sk_team_', ''), awayId.replace('sk_team_', '')].includes(String(row.team.id))),
  },
  headToHead: { team_a_id: homeId, team_b_id: awayId, matches: 0, team_a_wins: 0, team_b_wins: 0, draws: 0, team_a_goals: 0, team_b_goals: 0, sourceNote: 'Only the selected open-data match is loaded.' },
};

await writeFile(join(outputDir, 'demo.json'), JSON.stringify(canonicalizeTeamLabels(payload)), 'utf8');
console.log(`Wrote ${join(outputDir, 'demo.json')}`);
console.log(`${frameCount} frames (${trackedFrameCount} tracked, ${heldFrameCount} held) in ${chunks.length} chunks, ${events.length} events, ${players.length} players, duration ${(lastTime / 60000).toFixed(2)} minutes`);
