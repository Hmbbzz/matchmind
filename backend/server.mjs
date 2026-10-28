import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ApiError, API_VERSION, createQueryService } from './query-service.mjs';
import { loadPromptBundle, loadAttackPromptBundle } from './prompt-contract.mjs';
import { readProviderConfig, createResponsesProvider } from './responses-provider.mjs';
import { createAssistantService } from './assistant-service.mjs';

export async function loadSkillCornerFixture({ dataDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data') } = {}) {
  const [demo, chanceChains, matchInsights] = await Promise.all(['demo.json', 'live/chance-chains.json', 'live/match-insights.json'].map(async (name) => JSON.parse(await readFile(join(dataDir, name), 'utf8'))));
  return { demo, chanceChains, matchInsights, sourceVersion: 'skillcorner-2017461/local-static-v1' };
}

// Programmatic startup consumes a trusted in-memory configuration only when invoked.
export async function createConfiguredService({ env = {}, fixture, now, initialCutoffMs = 0, fetchImpl, tokenProvider } = {}) {
  const trustedFixture = fixture ?? await loadSkillCornerFixture();
  const rulesService = createQueryService({ fixture: trustedFixture, now, initialCutoffMs });
  let promptBundle; let attackPromptBundle; let provider; let config; let configurationError = false;
  try { [promptBundle, attackPromptBundle] = await Promise.all([loadPromptBundle(), loadAttackPromptBundle()]); } catch { configurationError = true; }
  try {
    config = readProviderConfig(env);
    if (config.mode === 'responses' && promptBundle) provider = createResponsesProvider({ config, fetchImpl, tokenProvider });
  } catch { configurationError = true; }
  const assistant = createAssistantService({ rulesService, promptBundle, attackPromptBundle, provider, limits: config?.limits, configurationError, matchTimeContext:trustedFixture.demo.match });
  return Object.freeze({ ...assistant, getHealth: () => Object.freeze({ ...assistant.getHealth(), simulation_start_ms: initialCutoffMs, simulation_mode: initialCutoffMs === 0 ? 'historical_local_1x' : 'historical_local_offset' }) });
}

async function readBody(request) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) throw new ApiError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Use application/json.');
  let bytes = 0; const parts = [];
  for await (const part of request.iterator({ destroyOnReturn: false })) {
    bytes += part.length;
    if (bytes > 16_384) { request.resume(); throw new ApiError(413, 'PAYLOAD_TOO_LARGE', 'Request body exceeds 16 KiB.'); }
    parts.push(part);
  }
  try { return JSON.parse(Buffer.concat(parts).toString('utf8')); }
  catch { throw new ApiError(400, 'INVALID_REQUEST', 'Invalid JSON body.'); }
}

function validateOrigins(origins) {
  if (!Array.isArray(origins) || origins.length > 8 || origins.some((origin) => {
    try { const url = new URL(origin); return url.origin !== origin || !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.protocol !== 'http:'; }
    catch { return true; }
  })) throw new TypeError('Only explicit local HTTP origins can be allowed.');
  return Object.freeze([...new Set(origins)]);
}
export function readAllowedOrigins(env = process.env) {
  const value = env.MATCHMIND_ALLOWED_ORIGINS ?? '';
  if (typeof value !== 'string' || value.length > 2048) throw new TypeError('Invalid local origin configuration.');
  return validateOrigins(value.split(',').map((origin) => origin.trim()).filter(Boolean));
}
export function createApiServer({ service, allowedOrigins = [] } = {}) {
  if (!service || typeof service.query !== 'function') throw new TypeError('A query service is required.');
  allowedOrigins = validateOrigins(allowedOrigins);
  const server = createServer(async (request, response) => {
    const send = (status, value) => {
      response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
      response.end(JSON.stringify(value));
    };
    try {
      const origin = request.headers.origin;
      if (origin && !allowedOrigins.includes(origin)) throw new ApiError(403, 'ORIGIN_NOT_ALLOWED', 'This origin is not allowed by the local API.');
      if (origin) { response.setHeader('access-control-allow-origin', origin); response.setHeader('vary', 'Origin'); }
      const url = new URL(request.url, 'http://127.0.0.1');
      if (url.search) throw new ApiError(400, 'INVALID_REQUEST', 'Query parameters are not supported.');
      if (request.method === 'OPTIONS' && origin) {
        response.setHeader('access-control-allow-methods', 'GET, POST'); response.setHeader('access-control-allow-headers', 'content-type'); response.writeHead(204); response.end(); return;
      }
      if (url.pathname === '/api/health' && request.method === 'GET') return send(200, { status: 'ok', schema_version: API_VERSION, provider: 'rules', cloud_connected: false, prompt_ready: false, model_configured: false, ...service.getHealth?.(), scope: 'local prototype; not production authentication or static site isolation' });
      if (url.pathname === '/api/sessions' && request.method === 'POST') return send(201, service.createSession(await readBody(request)));
      if (url.pathname.startsWith('/api/sessions/') && request.method === 'GET') return send(200, service.getSessionState({ session_id: decodeURIComponent(url.pathname.slice('/api/sessions/'.length)) }));
      if (url.pathname === '/api/assistant/explain-attack' && request.method === 'POST') return send(200, await service.explainAttack(await readBody(request)));
      if (url.pathname === '/api/assistant/query' && request.method === 'POST') return send(200, await service.query(await readBody(request)));
      if (url.pathname === '/api/replay/resolve' && request.method === 'POST') return send(200, service.resolveReplay(await readBody(request)));
      if (['/api/health', '/api/sessions', '/api/assistant/query', '/api/assistant/explain-attack', '/api/replay/resolve'].includes(url.pathname)) throw new ApiError(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
      throw new ApiError(404, 'NOT_FOUND', 'Route not found.');
    } catch (error) {
      if (error instanceof ApiError) send(error.status, { error: { code: error.code, message: error.message } });
      else if (error instanceof URIError) send(400, { error: { code: 'INVALID_REQUEST', message: 'Invalid route encoding.' } });
      else send(500, { error: { code: 'INTERNAL_ERROR', message: 'Local API request failed.' } });
    }
  });
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.MATCHMIND_API_PORT ?? 4174);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) throw new TypeError('Invalid MATCHMIND_API_PORT.');
  const service = await createConfiguredService({ env: process.env });
  const server = createApiServer({ service, allowedOrigins: readAllowedOrigins() });
  server.on('error', (error) => { console.error(`Local API failed: ${error.code ?? 'server error'}`); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Matchmind local API: http://127.0.0.1:${port} (cloud_connected=false until a real validated response)`));
}
