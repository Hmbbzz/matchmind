// Vendors the DuckDB WASM extensions & runs on `npm install` (postinstall).
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzip } from 'node:zlib';
import { promisify } from 'node:util';
import path from 'node:path';

const DUCKDB_CORE = 'v1.1.1';
const PLATFORM = 'wasm_eh';
const DEST = path.resolve(import.meta.dirname, '..', 'public', 'duckdb-ext');
const CORE_SOURCE = path.resolve(import.meta.dirname, '..', 'node_modules',
  '@duckdb', 'duckdb-wasm', 'dist', 'duckdb-eh.wasm');
const CORE_DEST = path.resolve(import.meta.dirname, '..', 'public', 'duckdb-core');

const EXTENSIONS = {
  parquet: 'e24fb2953c6a80e32d17fa3921f90f1f05ccbfa40f382e77702c1e6af9b79479',
  json:    '84958e8b52814ff0035dfcb208dbac80d99d30e582c668090879d3b814c571e4',
};

const sha256 = buf => createHash('sha256').update(buf).digest('hex');
const SKIP = process.env.SKIP_DUCKDB_EXT_HASH === '1';

const core = await readFile(CORE_SOURCE);
await mkdir(CORE_DEST, { recursive: true });
const compressedCore = await promisify(gzip)(core, { level: 9 });
if (compressedCore.length > 25 * 1024 * 1024)
  throw new Error(`Compressed DuckDB core is still too large: ${compressedCore.length}`);
await writeFile(path.join(CORE_DEST, 'duckdb-eh.wasm.gz'), compressedCore);
await Promise.all([0, 1].map(index =>
  rm(path.join(CORE_DEST, `duckdb-eh.wasm.part${index}`), { force: true })));
console.log(`[duckdb-core] compressed ${core.length} bytes to ${compressedCore.length}`);

for (const [name, want] of Object.entries(EXTENSIONS)) {
  const rel = `${DUCKDB_CORE}/${PLATFORM}/${name}.duckdb_extension.wasm`;
  const dest = path.join(DEST, rel);

  let have = null;
  try { have = await readFile(dest); } catch {}
  if (have) {
    const got = sha256(have);
    if (SKIP || got === want) {
      console.log(`[duckdb-ext] ${rel} already vendored (sha256 ok)`);
      continue;
    }
    console.warn(`[duckdb-ext] ${rel} FAILED hash check (${got}) — refetching`);
    await rm(dest, { force: true });
  }

  const url = `https://extensions.duckdb.org/${rel}`;
  console.log(`[duckdb-ext] fetching ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const got = sha256(buf);
  if (!SKIP && got !== want) {
    throw new Error(
      `${rel}: sha256 mismatch — REFUSING to vendor this file.\n` +
      `  expected ${want}\n  got      ${got}\n` +
      `  This is either a deliberate version bump (re-record the hash, see` +
      ` RECORDING in this file) or something you should not publish.`);
  }

  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`[duckdb-ext] wrote ${rel} (${(buf.length / 1e6).toFixed(1)} MB,`
    + ` sha256 ${SKIP ? got + ' UNVERIFIED' : 'ok'})`);
}
