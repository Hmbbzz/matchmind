import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { verifyPublicAssets } from './public-assets.mjs';

// Public source is self-contained; no private iteration or hosting metadata is read.
const root = fileURLToPath(new URL('../', import.meta.url));
const assets = await verifyPublicAssets(root);
await mkdir(resolve(root, 'app'), { recursive: true });
await writeFile(resolve(root, 'app/matchmind-shell.html'), await readFile(resolve(root, 'public/index.html')));
await import('../backend/worker/build-inputs.mjs');
console.log(`Matchmind source ready: ${assets.length} verified public assets.`);
