import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { DuckDBInstance } from '@duckdb/node-api';
import { matchIdentitySql, isIdentityMatch, aliasSkillCornerEventsCsv, identityMatchMetadata } from '../match/team-identities.js';

const [sourceArg, outputArg, matchArg = '2017461'] = process.argv.slice(2);
const sourceDir = sourceArg && resolve(sourceArg);
const outputDir = outputArg && resolve(outputArg);
if (!sourceDir || !outputDir) {
  throw new Error('usage: node scripts/preconvert.mjs <source-dir> <output-dir> [match-id]');
}
if (!/^\d{1,12}$/.test(matchArg)) throw new Error(`invalid match id: ${matchArg}`);

await mkdir(outputDir, { recursive: true });
const matchId = matchArg;
const matchSource = join(sourceDir, `${matchId}_match.json`);
const trackingSource = join(sourceDir, `${matchId}_tracking_extrapolated.jsonl`);
const eventsSource = join(sourceDir, `${matchId}_dynamic_events.csv`);
const sql = await readFile(new URL('../match/skillcorner-parser.sql', import.meta.url), 'utf8');

const instance = await DuckDBInstance.create(':memory:', { threads: '4' });
const connection = await instance.connect();
const quote = value => `'${value.replaceAll("'", "''")}'`;
const adapted = sql
  .replaceAll("'tracking.jsonl'", quote(trackingSource))
  .replaceAll("'match.json'", quote(matchSource));
await connection.run(adapted);
const identitySQL = matchIdentitySql(matchId);
if (identitySQL) await connection.run(identitySQL);
for (const table of ['frames', 'players', 'matches']) {
  const destination = join(outputDir, `${table}.parquet`).replaceAll("'", "''");
  await connection.run(`COPY (SELECT * FROM ${table}_t) TO '${destination}' (FORMAT PARQUET)`);
}
if (isIdentityMatch(matchId)) {
  await writeFile(join(outputDir, 'events.csv'), aliasSkillCornerEventsCsv(await readFile(eventsSource, 'utf8')));
} else await copyFile(eventsSource, join(outputDir, 'events.csv'));
if (isIdentityMatch(matchId)) await writeFile(join(outputDir, 'match.json'), JSON.stringify(identityMatchMetadata(matchId, JSON.parse(await readFile(matchSource, 'utf8')))));
else await copyFile(matchSource, join(outputDir, 'match.json'));
const rows = await connection.runAndReadAll('SELECT n_frames, home_name, away_name FROM matches_t');
console.log(rows.getRowObjectsJson());
connection.closeSync();
