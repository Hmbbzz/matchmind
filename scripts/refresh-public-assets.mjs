import { fileURLToPath } from 'node:url';
import { refreshPublicAssets } from './public-assets.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const files = await refreshPublicAssets(root);
console.log(`Recorded ${files.length} public source assets.`);
