import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const payloadPath = '/viewer3d/duckdb-core/duckdb-eh.wasm.gz';

// The viewer explicitly decompresses this file. It is a gzip *payload*, not
// an HTTP-encoded WASM response. Vinext dev currently adds Content-Encoding
// for .wasm.gz, while the built Workers Assets server already serves it raw.
export function compressedPayload(): Plugin {
  return {
    name: 'matchmind-compressed-payload',
    enforce: 'pre',
    configureServer(server) {
      const file = resolve(server.config.root, 'public', payloadPath.slice(1));
      server.middlewares.use((request, response, next) => {
        let pathname: string;
        try { pathname = new URL(request.url || '/', 'http://local.invalid').pathname; }
        catch { next(); return; }
        if (pathname !== payloadPath || !['GET', 'HEAD'].includes(request.method || '')) { next(); return; }
        void servePayload(file, request, response).catch(() => {
          if (response.headersSent) response.destroy();
          else { response.statusCode = 503; response.end('Compressed asset unavailable.'); }
        });
      });
    },
  };
}

async function servePayload(file: string, request: IncomingMessage, response: ServerResponse) {
  const info = await stat(file);
  if (!info.isFile()) throw new Error('Missing compressed payload.');
  response.setHeader('Content-Type', 'application/gzip');
  response.removeHeader('Content-Encoding');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Accept-Ranges', 'bytes');
  let start = 0, end = info.size - 1;
  // A conditional range without a matching validator can safely get the full
  // representation. No arbitrary filesystem paths are accepted from requests.
  const range = request.headers['if-range'] ? undefined : request.headers.range;
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    let valid = Boolean(match && (match[1] || match[2]));
    if (valid && match) {
      if (!match[1]) {
        const suffix = Number(match[2]);
        valid = Number.isSafeInteger(suffix) && suffix > 0;
        start = Math.max(0, info.size - suffix);
      } else {
        start = Number(match[1]);
        end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
        valid = Number.isSafeInteger(start) && Number.isSafeInteger(end) && start <= end && start < info.size;
      }
    }
    if (!valid) {
      response.statusCode = 416;
      response.setHeader('Content-Range', `bytes */${info.size}`);
      response.setHeader('Content-Length', '0');
      response.end();
      return;
    }
    response.statusCode = 206;
    response.setHeader('Content-Range', `bytes ${start}-${end}/${info.size}`);
  }
  response.setHeader('Content-Length', String(end - start + 1));
  if (request.method === 'HEAD') { response.end(); return; }
  const stream = createReadStream(file, { start, end });
  stream.on('error', () => response.destroy());
  response.on('close', () => stream.destroy());
  stream.pipe(response);
}
