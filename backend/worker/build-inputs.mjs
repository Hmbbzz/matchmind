// Build-only Node loader; never imported by the Worker or the browser.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { CLOCK_POLICY_VERSION } from './session-clock.mjs';
import { createAttackPromptBundle } from '../attack-contract.mjs';
import { createPromptBundle } from '../prompt-core.mjs';
import { PLAYER_STORY_POLICY_VERSION } from '../../public/player-story-core.js';
import { TEAM_IDENTITY_VERSION } from '../../public/team-identities.js';
const root = new URL('../../', import.meta.url);
const sha = (text) => createHash('sha256').update(text).digest('hex');
const read = (path) => readFile(new URL(path, root), 'utf8');
const [demoText, chainsText, system, schemaText, insightText, attackSystem, attackSchemaText] = await Promise.all(['public/data/demo.json', 'public/data/live/chance-chains.json', 'prompts/assistant-v2.system.md', 'prompts/output-schema-v2.json', 'public/data/live/match-insights.json', 'prompts/attack-v1.system.md', 'prompts/attack-output-schema-v1.json'].map(read));
const storyCoreText = await read('public/player-story-core.js');
const demo = JSON.parse(demoText);
const matchClockPolicy = { matchId: demo.match.match_id, secondHalfStreamStartMs: demo.match.second_half_stream_start_ms, secondHalfClockStartMs: demo.match.second_half_clock_start_ms };
if (![matchClockPolicy.secondHalfStreamStartMs,matchClockPolicy.secondHalfClockStartMs].every(value => Number.isSafeInteger(value) && value >= 0) || matchClockPolicy.secondHalfStreamStartMs < matchClockPolicy.secondHalfClockStartMs) throw new TypeError('Invalid trusted match clock metadata.');
const displayClockModule = `// Generated from public/data/demo.json by backend/worker/build-inputs.mjs. Stream times remain unchanged.\nexport const matchClockPolicy = Object.freeze(${JSON.stringify(matchClockPolicy)});\n`;
await writeFile(new URL('./generated-clock.mjs', import.meta.url), displayClockModule);
const pick = (row, keys) => Object.fromEntries(keys.filter((key) => row[key] !== undefined).map((key) => [key, row[key]]));
const fixture = {
  demo: {
    match: pick(demo.match, ['match_id', 'duration_ms', 'kickoff', 'home_team_id', 'away_team_id', 'second_half_stream_start_ms', 'second_half_clock_start_ms']),
    teams: demo.teams.map((row) => pick(row, ['id', 'name'])),
    players: demo.players.map((row) => pick(row, ['id', 'teamId', 'name', 'fullName', 'full_name', 'number', 'position'])),
    events: demo.events.map((row) => ({ ...pick(row, ['id', 't', 'team', 'player', 'secondary', 'type', 'outcome', 'available_at_ms']), ...(row.q ? { q: pick(row.q, ['startMs', 'endMs', 'pass_type', 'xg']) } : {}) })),
  },
  chanceChains: JSON.parse(chainsText),
  sourceVersion: 'skillcorner-2017461/local-static-v1',
  teamIdentityVersion: TEAM_IDENTITY_VERSION,
};
// Only quality/time is retained. No coordinates, physical metrics or video enter the API bundle.
const gaps = []; const chunkHashes = []; let gapStart = null; let previousTime = -1;
for (const chunk of demo.frameChunks) {
  if (!/^frames\/\d{2}\.json$/.test(chunk.file)) throw new TypeError('Unexpected fixed tracking chunk path.');
  const text = await read(`public/data/${chunk.file}`); chunkHashes.push({ file: chunk.file, sha256: sha(text) });
  const rows = JSON.parse(text);
  for (const frame of (Array.isArray(rows) ? rows : rows.frames)) {
    if (!Number.isSafeInteger(frame.t) || frame.t <= previousTime || ![0, 1].includes(frame.q)) throw new TypeError('Invalid quality clock input.');
    previousTime = frame.t;
    if (frame.q === 0 && gapStart === null) gapStart = frame.t;
    if (frame.q === 1 && gapStart !== null) { gaps.push({ start_ms: gapStart, end_ms: frame.t }); gapStart = null; }
  }
}
if (gapStart !== null && gapStart < fixture.demo.match.duration_ms) gaps.push({ start_ms: gapStart, end_ms: fixture.demo.match.duration_ms });
fixture.clockPolicy = { version: CLOCK_POLICY_VERSION, gaps };
const insights = JSON.parse(insightText);
fixture.matchInsights = { schemaVersion: insights.schemaVersion, matchId: insights.matchId, sourceVersion: insights.sourceVersion, policyVersion: insights.policyVersion, attacks: insights.attacks, offBall: insights.offBall.map(row => pick(row, ['id','playerId','teamId','eventId','sourceVersion','availableAtMs','startMs','endMs','metrics','quality','limitations'])) };
const serialized = JSON.stringify(fixture);
const promptBundle = createPromptBundle(system, schemaText, sha(`${system}\n${schemaText}`));
const attackPromptBundle = createAttackPromptBundle(attackSystem, attackSchemaText, sha(`${attackSystem}\n${attackSchemaText}`));
const inputManifest = { version: 'matchmind-worker-inputs/1.0', demo_sha256: sha(demoText), chains_sha256: sha(chainsText), projection_sha256: sha(serialized), projection_bytes: Buffer.byteLength(serialized), clock_policy: CLOCK_POLICY_VERSION, clock_input_sha256: sha(JSON.stringify(chunkHashes)), gap_count: gaps.length, prompt_sha256: promptBundle.sha256, insights_sha256: sha(insightText), attack_prompt_sha256: attackPromptBundle.sha256, display_clock_policy_sha256: sha(displayClockModule), story_core_sha256: sha(storyCoreText), story_policy_version: PLAYER_STORY_POLICY_VERSION, team_identity_version: TEAM_IDENTITY_VERSION };
await writeFile(new URL('./generated-inputs.mjs', import.meta.url), `// Generated by backend/worker/build-inputs.mjs. SERVER ONLY.\nexport const fixture = ${serialized};\nexport const promptBundle = ${JSON.stringify(promptBundle)};\nexport const attackPromptBundle = ${JSON.stringify(attackPromptBundle)};\nexport const inputManifest = ${JSON.stringify(inputManifest)};\n`);
console.log(JSON.stringify({ generated: fileURLToPath(new URL('./generated-inputs.mjs', import.meta.url)), ...inputManifest }));
