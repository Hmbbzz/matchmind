import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import './sites-env.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
// This command has no remote mode. No seed, identity or application rows are copied.
const result = spawnSync(process.execPath, [
  fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url)),
  'd1', 'migrations', 'apply', 'DB', '--local',
  '--config', 'build-support/wrangler.local.json', '--persist-to', '.wrangler/state',
], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
