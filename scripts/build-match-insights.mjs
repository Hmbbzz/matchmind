// Builds a deterministic, causal insight projection from the existing real match.
// Does not rebuild or rewrite any existing tracking, events or tactical products.
import { createReadStream } from 'node:fs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildMatchInsights, inspectOffBallCandidates, INSIGHT_POLICY_VERSION } from './lib/match-insights.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataRoot = join(root, 'public/data');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const sourcePath = join(sourceRoot, 'data/matches/2017461/2017461_tracking_extrapolated.jsonl');
const sha = value => createHash('sha256').update(value).digest('hex');
const inputs = {};
const read = async path => { const bytes = await readFile(join(dataRoot, path)); inputs[path] = sha(bytes); return JSON.parse(bytes); };
const [demo, chainFile, changes] = await Promise.all(['demo.json', 'live/chance-chains.json', 'live/tactical-changes.json'].map(read));
if (demo.meta?.synthetic !== false || demo.match?.source_match_id !== 2017461) throw new TypeError('The existing real SkillCorner input is required.');
const frames = [];
for (const chunk of demo.frameChunks) {
  if (!/^frames\/\d{2}\.json$/.test(chunk.file)) throw new TypeError('Invalid fixed frame input.');
  frames.push(...await read(chunk.file));
}
const candidates = inspectOffBallCandidates({ demo, frames, chains: chainFile.chains });
const requested = new Map();
for (const candidate of candidates.accepted) for (const sample of candidate.samples) {
  if (!requested.has(sample.t)) requested.set(sample.t, new Set());
  requested.get(sample.t).add(candidate.playerId);
}
const rawSamples = new Map();
const input = createReadStream(sourcePath); const rawHash = createHash('sha256'); input.on('data', chunk => rawHash.update(chunk));
const timeToMs = value => { const parts = value.split(':').map(Number); return Math.round((parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000); };
for await (const line of createInterface({ input, crlfDelay: Infinity })) {
  if (!line.trim()) continue;
  const row = JSON.parse(line); if (typeof row.timestamp !== 'string' || ![1,2].includes(row.period)) continue;
  const t = timeToMs(row.timestamp) + (row.period === 2 ? demo.match.second_half_offset_ms : 0);
  const needed = requested.get(t); if (!needed) continue;
  rawSamples.set(t, { frame: row.frame, period: row.period, ballDetected: row.ball_data?.is_detected === true, players: Object.fromEntries(row.player_data.filter(p => needed.has(`sk_player_${p.player_id}`)).map(p => [`sk_player_${p.player_id}`, { x: p.x, y: p.y, isDetected: p.is_detected === true }])) });
}
inputs['source/2017461_tracking_extrapolated.jsonl'] = rawHash.digest('hex');
const dynamic = await readFile(join(sourceRoot, 'data/matches/2017461/2017461_dynamic_events.csv'));
inputs['source/2017461_dynamic_events.csv'] = sha(dynamic);
const { product, audit } = buildMatchInsights({ demo, frames, chains: chainFile.chains, changes: changes.changes, candidates, rawSamples, inputHashes: inputs });
const output = JSON.stringify(product, null, 2) + '\n';
await writeFile(join(dataRoot, 'live/match-insights.json'), output);
const evidenceRoot = join(root, 'docs/evidence/iterations/L/backend'); await mkdir(evidenceRoot, { recursive: true });
await writeFile(join(evidenceRoot, 'data-audit.json'), JSON.stringify({ ...audit, output_sha256: sha(output), inputHashes: inputs }, null, 2) + '\n');
console.log(JSON.stringify({ policy: INSIGHT_POLICY_VERSION, output_sha256: sha(output), turningPoints: product.turningPoints.length, offBall: product.offBall.length, attacks: product.attacks.length, rejectedOffBall: audit.offBallRejected.length, rejectedTurning: audit.turningRejected.length, firstTurning: product.turningPoints[0]?.id, firstOffBall: product.offBall[0]?.id }));
