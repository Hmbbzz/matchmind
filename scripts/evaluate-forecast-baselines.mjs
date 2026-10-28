import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateForecastBaselines } from './lib/forecast-evaluation.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'dist', 'data');
const files = ['live/forecast-snapshots.json', 'live/forecast-outcomes.json'];
const sources = await Promise.all(files.map(async (path) => {
  const bytes = await readFile(join(dataDir, path));
  return { path, sha256: createHash('sha256').update(bytes).digest('hex'), data: JSON.parse(bytes.toString('utf8')) };
}));
if (sources[0].data.matchId !== sources[1].data.matchId) throw new TypeError('Forecast and outcome match IDs differ.');
const report = evaluateForecastBaselines({ snapshots: sources[0].data.snapshots, outcomes: sources[1].data.outcomes });
await writeFile(join(dataDir, 'quality', 'forecast-baseline-evaluation.json'), JSON.stringify({
  ...report,
  generatedAt: new Date().toISOString(),
  matchId: sources[0].data.matchId,
  sourceVersions: sources.map(({ path, data, sha256 }) => ({ path, schemaVersion: data.schemaVersion, sha256 })),
}, null, 2) + '\n', 'utf8');
console.log(`Evaluated ${report.snapshotCount} snapshots in ${report.groups.length} task/horizon cohorts; ${report.groups.reduce((sum, group) => sum + group.n, 0)} scored task outcomes.`);
