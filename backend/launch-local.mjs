import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createConfiguredService, createApiServer, readAllowedOrigins } from './server.mjs';

// No file, secret, network call or listener is opened merely by importing this module.
// env/tokenProvider may be supplied from the host's existing secure memory channel.
export async function startLocalApi({ env = {}, port, initialCutoffMs = 0, fixture, now, fetchImpl, tokenProvider } = {}) {
  const localPort = port ?? Number(env.MATCHMIND_API_PORT ?? 4174);
  if (!Number.isSafeInteger(localPort) || localPort < 0 || localPort > 65535) throw new TypeError('Invalid local API port.');
  const origins = readAllowedOrigins(env);
  const service = await createConfiguredService({ env, fixture, now, initialCutoffMs, fetchImpl, tokenProvider });
  const server = createApiServer({ service, allowedOrigins: origins });
  await new Promise((resolveReady, reject) => {
    const onError = () => { reject(new Error('Local API listener could not start.')); };
    server.once('error', onError);
    server.listen(localPort, '127.0.0.1', () => { server.removeListener('error', onError); resolveReady(); });
  });
  const address = `http://127.0.0.1:${server.address().port}`;
  return Object.freeze({ address, service, close: () => new Promise((resolveClosed, reject) => server.close((error) => error ? reject(new Error('Local API listener could not close.')) : resolveClosed())) });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const local = await startLocalApi({ env: process.env });
  console.log(`Matchmind local API: ${local.address} (check /api/health for actual provider state)`);
}
