import { spawnSync } from 'node:child_process';
import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { refreshPublicAssets } from './public-assets.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const viewer = resolve(root, 'vendor/soccerviewer');
const output = resolve(root, 'public/viewer3d');
// Keep the original distributed notices even when rebuilding the customized viewer.
const notices = await Promise.all(['LICENSE', 'THIRD_PARTY_NOTICES.md'].map(async name => [name, await readFile(resolve(output, name))]));
const result = spawnSync(process.execPath, [resolve(viewer, 'node_modules/vite/bin/vite.js'), 'build'], { cwd: viewer, stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await rm(output, { recursive: true, force: true });
await cp(resolve(viewer, 'dist'), output, { recursive: true });
for (const [name, bytes] of notices) await writeFile(resolve(output, name), bytes);
const assets = await refreshPublicAssets(root);
console.log(`Customized viewer rebuilt from source; ${assets.length} public assets recorded.`);
