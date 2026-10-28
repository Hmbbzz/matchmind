import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { teamIdentity } from '../public/team-identities.js';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const matchesRoot = join(sourceRoot, 'data', 'matches');
const outputPath = join(projectRoot, 'dist', 'data', 'source-manifest.json');

const plan = {
  mainMatchId: '2017461',
  history: {
    '868': ['1959846', '2006363', '2011166'],
    '4177': ['1996436', '2007721', '2015213'],
  },
  expectedTracking: {
    size: 89543442,
    sha256: '59cfa5588efee041da439f44df5b5b92f2b7305571dc831164e3d05f7415787a',
  },
};

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

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

async function csvInventory(path, groupField) {
  const file = await stat(path);
  const rows = parseCsv(await readFile(path, 'utf8'));
  const groups = {};
  for (const row of rows) {
    const key = row[groupField] || 'unknown';
    groups[key] = (groups[key] || 0) + 1;
  }
  return { bytes: file.size, rows: rows.length, groups };
}

async function trackingInventory(path) {
  const file = await stat(path);
  const lfsPointer = file.size < 1024 && (await readFile(path, 'utf8')).startsWith('version https://git-lfs.github.com/spec/v1');
  if (lfsPointer) return { materialized: false, bytes: file.size };

  const hash = createHash('sha256');
  const statesByFrame = new Map();
  const counts = { rows: 0, nullClockRows: 0, timedRows: 0, trackedRows: 0, emptyRows: 0 };
  let firstTracked = null;
  let lastTracked = null;
  let previousFrame = -1;
  let nonMonotonicFrames = 0;
  const input = createReadStream(path);
  input.on('data', (chunk) => hash.update(chunk));
  const lines = createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    if (!line.trim()) continue;
    const row = JSON.parse(line);
    counts.rows += 1;
    if (row.frame <= previousFrame) nonMonotonicFrames += 1;
    previousFrame = row.frame;
    if (!row.timestamp || ![1, 2].includes(row.period)) {
      counts.nullClockRows += 1;
      statesByFrame.set(row.frame, 'null_clock');
      continue;
    }
    counts.timedRows += 1;
    if ((row.player_data || []).length) {
      counts.trackedRows += 1;
      statesByFrame.set(row.frame, 'tracked');
      const point = { frame: row.frame, timestamp: row.timestamp, period: row.period };
      firstTracked ||= point;
      lastTracked = point;
    } else {
      counts.emptyRows += 1;
      statesByFrame.set(row.frame, 'empty');
    }
  }
  return {
    materialized: true,
    bytes: file.size,
    sha256: hash.digest('hex'),
    ...counts,
    trackedCoverageOfTimedFrames: counts.timedRows ? counts.trackedRows / counts.timedRows : 0,
    firstTracked,
    lastTracked,
    nonMonotonicFrames,
    statesByFrame,
  };
}

const allIds = [...new Set([plan.mainMatchId, ...Object.values(plan.history).flat()])];
const matchMetadata = new Map();
for (const matchId of allIds) {
  const sourceDir = join(matchesRoot, matchId);
  matchMetadata.set(matchId, await readJson(join(sourceDir, `${matchId}_match.json`)));
}

const main = matchMetadata.get(plan.mainMatchId);
const mainTeamIds = [String(main.home_team.id), String(main.away_team.id)];
const assertions = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}

check('seven distinct matches', allIds.length === 7, `found ${allIds.length}`);
check('history configured for both main teams', mainTeamIds.every((id) => plan.history[id]?.length === 3), mainTeamIds.join(', '));

const matches = [];
let mainTracking = null;
let mainDynamicRows = null;
for (const matchId of allIds) {
  const sourceDir = join(matchesRoot, matchId);
  const metadata = matchMetadata.get(matchId);
  const dynamicPath = join(sourceDir, `${matchId}_dynamic_events.csv`);
  const phasesPath = join(sourceDir, `${matchId}_phases_of_play.csv`);
  const trackingPath = join(sourceDir, `${matchId}_tracking_extrapolated.jsonl`);
  const dynamic = await csvInventory(dynamicPath, 'event_type');
  const phases = await csvInventory(phasesPath, 'team_in_possession_phase_type');
  const tracking = matchId === plan.mainMatchId
    ? await trackingInventory(trackingPath)
    : { materialized: (await stat(trackingPath)).size > 1024, bytes: (await stat(trackingPath)).size };
  if (matchId === plan.mainMatchId) {
    mainTracking = tracking;
    mainDynamicRows = parseCsv(await readFile(dynamicPath, 'utf8'));
  }
  const historicalForTeamId = Object.entries(plan.history).find(([, ids]) => ids.includes(matchId))?.[0] || null;
  matches.push({
    matchId,
    role: matchId === plan.mainMatchId ? 'live' : 'history',
    historicalForTeamId,
    kickoff: metadata.date_time,
    competition: metadata.competition_edition?.name,
    home: { id: String(metadata.home_team.id), name: teamIdentity(metadata.home_team.id)?.name ?? metadata.home_team.name, score: metadata.home_team_score },
    away: { id: String(metadata.away_team.id), name: teamIdentity(metadata.away_team.id)?.name ?? metadata.away_team.name, score: metadata.away_team_score },
    files: { dynamicEvents: dynamic, phases, tracking },
  });
}

const mainKickoff = Date.parse(main.date_time);
for (const teamId of mainTeamIds) {
  const ids = plan.history[teamId];
  const ordered = [...ids].sort((a, b) => Date.parse(matchMetadata.get(a).date_time) - Date.parse(matchMetadata.get(b).date_time));
  check(`team ${teamId} has three earlier matches`, ids.length === 3 && ids.every((id) => Date.parse(matchMetadata.get(id).date_time) < mainKickoff), ids.join(', '));
  check(`team ${teamId} history is chronological`, ids.every((id, index) => id === ordered[index]), ids.join(', '));
  check(`team ${teamId} appears in every history match`, ids.every((id) => {
    const row = matchMetadata.get(id);
    return [String(row.home_team.id), String(row.away_team.id)].includes(teamId);
  }), ids.join(', '));
}

check('main tracking materialized', mainTracking.materialized, `${mainTracking.bytes} bytes`);
check('main tracking size matches LFS pointer', mainTracking.bytes === plan.expectedTracking.size, `${mainTracking.bytes} bytes`);
check('main tracking hash matches LFS pointer', mainTracking.sha256 === plan.expectedTracking.sha256, mainTracking.sha256);
check('main tracking frame order is monotonic', mainTracking.nonMonotonicFrames === 0, `${mainTracking.nonMonotonicFrames} violations`);
check('main dynamic events contain all four event families', ['player_possession', 'passing_option', 'on_ball_engagement', 'off_ball_run'].every((name) => mainDynamicRows.some((row) => row.event_type === name)), 'four event families required');

const eventsByTrackingState = {};
for (const row of mainDynamicRows) {
  const trackingState = mainTracking.statesByFrame.get(Number(row.frame_start)) || 'missing';
  eventsByTrackingState[trackingState] = (eventsByTrackingState[trackingState] || 0) + 1;
}
const eventTrackingCoverage = mainDynamicRows.length ? (eventsByTrackingState.tracked || 0) / mainDynamicRows.length : 0;
check('at least 99% of main events have tracked start frames', eventTrackingCoverage >= 0.99, `${(eventTrackingCoverage * 100).toFixed(2)}%`);

for (const row of matches) {
  check(`match ${row.matchId} dynamic events available`, row.files.dynamicEvents.rows > 0, `${row.files.dynamicEvents.rows} rows`);
  check(`match ${row.matchId} phases available`, row.files.phases.rows > 0, `${row.files.phases.rows} rows`);
}

const failed = assertions.filter((row) => !row.passed);
const output = {
  schemaVersion: 'skillcorner-demo-manifest/1.0',
  generatedAt: new Date().toISOString(),
  source: { name: 'SkillCorner Open Data', url: 'https://github.com/SkillCorner/opendata', license: 'MIT' },
  policy: {
    mainMatchId: plan.mainMatchId,
    cutoffRule: 'Historical matches must have kickoff earlier than the main match.',
    currentMatchPhaseLabels: 'evaluation_only',
    seasonAggregates: 'context_only_not_recent_three_baseline',
  },
  mainTeams: mainTeamIds.map((id) => ({ id, historyMatchIds: plan.history[id] })),
  matches,
  mainTrackingQuality: {
    timedFrameCoverage: mainTracking.trackedCoverageOfTimedFrames,
    eventStartCoverage: eventTrackingCoverage,
    eventsByTrackingState,
    handling: 'Exclude empty frames from analytics; hold the last trusted visual frame and expose quality state in the player.',
  },
  validation: { passed: failed.length === 0, assertions },
};

delete mainTracking.statesByFrame;
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log(`Wrote ${outputPath}`);
console.log(`${matches.length} matches; ${mainDynamicRows.length} main events; ${(eventTrackingCoverage * 100).toFixed(2)}% event start coverage`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
