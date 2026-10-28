import { spawn } from 'node:child_process';
import { readFile, access, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = process.cwd();
await import('./prepare-matchmind.mjs');
await new Promise((resolveBuild, reject) => {
  const child = spawn(process.execPath, ['scripts/run-framework.mjs', 'build'], { cwd: root, stdio: 'inherit' });
  child.once('error', reject);
  child.once('exit', (code, signal) => code === 0 ? resolveBuild() : reject(new Error(`Vinext build failed (${signal || code}).`)));
});
async function publicFiles(directory = '') {
  const files = [];
  for (const entry of await readdir(resolve(root, 'public', directory), { withFileTypes: true })) {
    const path = directory ? `${directory}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Public asset must be a regular file: ${path}`);
    if (entry.isDirectory()) files.push(...await publicFiles(path));
    else files.push(path);
  }
  return files.sort();
}
const assets = await publicFiles();
for (const path of assets) {
  const source = await readFile(resolve(root, 'public', path));
  const output = await readFile(resolve(root, 'dist/client', path));
  if (createHash('sha256').update(source).digest('hex') !== createHash('sha256').update(output).digest('hex')) throw new Error(`Built static asset differs from source: ${path}`);
}
await access(resolve(root, 'dist/server/index.js'));
await access(resolve(root, 'dist/.openai/hosting.json'));
console.log(`Matchmind Worker build ready: all ${assets.length} public assets match their source byte for byte.`);
