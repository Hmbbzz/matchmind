// Identifies SkillCorner files, converts them to parquet
// with in-browser DuckDB, and caches them in OPFS.
// Design rules:
//  * files are identified by the content instead of filenames
//  * files do not leave the browser: File buffers go straight into DuckDB's
//    virtual FS via registerFileBuffer, the SQL reshapes them, and the
//    resulting parquet lands in OPFS (origin-private, on-device)
//  * the match id comes from INSIDE match.json

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdbWorkerUrl from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';
import parserSQL from './skillcorner-parser.sql?raw';
import { TEAM_IDENTITY_VERSION, isIdentityMatch, matchIdentitySql, identityMeta, aliasSkillCornerEventsCsv } from './team-identities.js';

const APP_ROOT = new URL('..', import.meta.url).href.replace(/\/$/, '');

// Sites limits each deployed file to 25 MB, while DuckDB's EH core is about
// 34 MB. The postinstall script stores the official binary as a ~7 MB gzip.
// Expand it in the browser and give DuckDB a temporary Blob URL.
async function duckdbWasmUrl() {
  const url = `${APP_ROOT}/duckdb-core/duckdb-eh.wasm.gz`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  if (!globalThis.DecompressionStream)
    throw new Error('This browser does not support DecompressionStream');
  const stream = response.body.pipeThrough(new DecompressionStream('gzip'));
  const bytes = await new Response(stream).arrayBuffer();
  return URL.createObjectURL(new Blob([bytes], { type: 'application/wasm' }));
}

async function wasmUrlFor(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    if ((res.headers.get('content-type') || '').includes('application/wasm')) return url;
    return URL.createObjectURL(
      new Blob([await res.arrayBuffer()], { type: 'application/wasm' }));
  } catch {
    return url;
  }
}

export async function bootDuckDB() {
  const worker = new Worker(duckdbWorkerUrl);
  const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING), worker);
  await db.instantiate(await wasmUrlFor(await duckdbWasmUrl()));
  const conn = await db.connect();
  await conn.query(`SET custom_extension_repository='${APP_ROOT}/duckdb-ext'`);
  return { db, conn, worker };
}

// ---------- content sniffing ----------
// match.json — ONE JSON object with home_team / players keys
// tracking   — NDJSON whose lines are objects with frame / ball_data keys
// events     — CSV whose header row has event_type AND frame_start
//              (frame_start alone is not enough: phases_of_play.csv has it too)
const SNIFF_BYTES = 256 * 1024;
const MATCH_JSON_MAX = 32 * 1024 * 1024;

export function identify(bytes) {
  const head = new TextDecoder().decode(
    bytes.subarray(0, SNIFF_BYTES)).replace(/^﻿/, '');
  const trimmed = head.trimStart();
  if (trimmed.startsWith('{')) {
    const firstLine = trimmed.split('\n', 1)[0];
    try {
      const o = JSON.parse(firstLine);
      if (o && typeof o === 'object' && 'frame' in o && 'ball_data' in o)
        return { kind: 'tracking' };
    } catch { /* not one-object-per-line — fall through to whole-file JSON */ }
    if (bytes.length <= MATCH_JSON_MAX) {
      try {
        const o = JSON.parse(new TextDecoder().decode(bytes));
        if (o && typeof o === 'object' && o.home_team && Array.isArray(o.players))
          return { kind: 'match', json: o };
      } catch { /* not valid JSON at all */ }
    }
    return { kind: null };
  }
  const header = trimmed.split('\n', 1)[0];
  if (header.includes(',')) {
    const cols = header.split(',').map(c => c.trim());
    if (cols.includes('event_type') && cols.includes('frame_start'))
      return { kind: 'events' };
  }
  return { kind: null };
}

async function cacheRoot() {
  const root = await navigator.storage.getDirectory();
  return root.getDirectoryHandle('matches');
}

const mainThreadWritable = typeof FileSystemFileHandle !== 'undefined'
  && 'createWritable' in FileSystemFileHandle.prototype;
let opfsWorker = null;
function workerWrite(path, bytes) {
  if (!opfsWorker) {
    const src = `self.onmessage = async e => {
      const { path, bytes } = e.data;
      try {
        let dir = await navigator.storage.getDirectory();
        for (const seg of path.slice(0, -1))
          dir = await dir.getDirectoryHandle(seg, { create: true });
        const fh = await dir.getFileHandle(path[path.length - 1], { create: true });
        const h = await fh.createSyncAccessHandle();
        try { h.truncate(0); h.write(bytes); h.flush(); } finally { h.close(); }
        self.postMessage({ ok: true });
      } catch (err) {
        self.postMessage({ ok: false, err: String(err && err.message || err) });
      }
    };`;
    opfsWorker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
  }
  return new Promise((resolve, reject) => {
    opfsWorker.onmessage = e => e.data.ok ? resolve() : reject(new Error('OPFS write: ' + e.data.err));
    opfsWorker.onerror = e => reject(new Error(e.message || 'OPFS worker error'));
    opfsWorker.postMessage({ path, bytes });
  });
}

async function writeFile(path, data) {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  if (!mainThreadWritable) return workerWrite(path, bytes);
  let dir = await navigator.storage.getDirectory();
  for (const seg of path.slice(0, -1))
    dir = await dir.getDirectoryHandle(seg, { create: true });
  const fh = await dir.getFileHandle(path[path.length - 1], { create: true });
  const w = await fh.createWritable();
  await w.write(bytes);
  await w.close();
}

export async function readCached(matchId, name) {
  // The embedded audited replay always uses this release's packaged identities.
  // A pre-existing upload cache must not resurrect earlier team labels.
  const packagedIdentity = isIdentityMatch(matchId) && new URLSearchParams(location.search).has('embed');
  try {
    if (packagedIdentity) throw new Error('Use the versioned packaged replay.');
    const dir = await (await cacheRoot()).getDirectoryHandle(String(matchId));
    const file = await (await dir.getFileHandle(name)).getFile();
    return new Uint8Array(await file.arrayBuffer());
  } catch { /* fall through to the packaged demo data */ }

  // Matchmind ships one audited SkillCorner match as static parquet. This
  // keeps the original viewer's on-device upload workflow while allowing the
  // embedded player to boot without asking a competition judge to upload an
  // 85 MB tracking file first.
  if (!/^[0-9]{1,12}$/.test(String(matchId)) ||
      !/^(frames|players|matches)\.parquet$|^events\.csv$|^meta\.json$/.test(name)) return null;
  try {
    const url = new URL(`preloaded/${matchId}/${name}`, `${APP_ROOT}/`);
    if (packagedIdentity) url.searchParams.set('identity', TEAM_IDENTITY_VERSION);
    const response = await fetch(url);
    if (!response.ok) return null;
    return new Uint8Array(await response.arrayBuffer());
  } catch { return null; }
}

export async function cachedMatches() {
  const out = [];
  try {
    const root = await cacheRoot();
    for await (const [id, handle] of root.entries()) {
      if (handle.kind !== 'directory') continue;
      try {
        const f = await (await handle.getFileHandle('meta.json')).getFile();
        out.push(JSON.parse(await f.text()));
      } catch { /* half-written cache entry — ignore */ }
    }
  } catch { /* no cache yet, or no OPFS */ }
  return out.sort((a, b) => (b.cachedAt || 0) - (a.cachedAt || 0));
}

export async function deleteCached(matchId) {
  try {
    const root = await cacheRoot();
    await root.removeEntry(String(matchId), { recursive: true });
  } catch { /* already gone */ }
}

export async function convertMatch({ matchBytes, trackingBytes, eventsBytes }, onStep = () => {}) {
  if (!eventsBytes) throw new Error('events .csv is required (dynamic events)');
  const matchJson = identify(matchBytes).json;
  if (!matchJson) throw new Error('match.json did not parse');
  const matchId = String(matchJson.id ?? '');
  if (!/^[0-9]{1,12}$/.test(matchId))
    throw new Error(`match.json has no usable id (got ${JSON.stringify(matchJson.id)})`);

  onStep('starting DuckDB…');
  const { db, conn, worker } = await bootDuckDB();
  try {
    await db.registerFileBuffer('match.json', matchBytes);
    await db.registerFileBuffer('tracking.jsonl', trackingBytes);

    onStep('converting — parsing tracking…');
    for (const stmt of parserSQL.replace(/--[^\n]*/g, '').split(';')) {
      if (!stmt.trim()) continue;
      await conn.query(stmt);
    }
    const identitySQL = matchIdentitySql(matchId);
    if (identitySQL) await conn.query(identitySQL);

    const stats = (await conn.query(
      `SELECT (SELECT count(*) FROM frames_t) AS nf,
              (SELECT count(*) FROM players_t) AS np`)).toArray()[0].toJSON();
    if (Number(stats.nf) < 1000)
      throw new Error(`tracking parsed to only ${stats.nf} rows — file truncated or not a full match?`);
    if (Number(stats.np) < 2)
      throw new Error('match.json has no players');

    onStep('writing parquet…');
    for (const t of ['frames', 'players', 'matches'])
      await conn.query(`COPY (SELECT * FROM ${t}_t) TO '${t}.parquet' (FORMAT PARQUET)`);

    onStep('caching on this device…');
    const meta = {
      id: matchId,
      home: matchJson.home_team?.short_name, away: matchJson.away_team?.short_name,
      homeAcr: matchJson.home_team?.acronym, awayAcr: matchJson.away_team?.acronym,
      hs: matchJson.home_team_score, as: matchJson.away_team_score,
      date: matchJson.date_time,
      cachedAt: Date.now(),
      ...identityMeta(matchId, matchJson),
    };
    const base = ['matches', String(matchId)];
    for (const t of ['frames', 'players', 'matches'])
      await writeFile([...base, `${t}.parquet`], await db.copyFileToBuffer(`${t}.parquet`));
    await writeFile([...base, 'events.csv'], isIdentityMatch(matchId) ? new TextEncoder().encode(aliasSkillCornerEventsCsv(new TextDecoder().decode(eventsBytes))) : eventsBytes);
    await writeFile([...base, 'meta.json'], JSON.stringify(meta));
    return meta;
  } finally {
    await conn.close().catch(() => {});
    await db.terminate().catch(() => {});
    worker.terminate();
  }
}
