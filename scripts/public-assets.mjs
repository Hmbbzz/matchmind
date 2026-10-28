import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

export async function collectPublicAssets(root) {
  const files = [];
  async function visit(relative = '') {
    for (const entry of await readdir(resolve(root, 'public', relative), { withFileTypes: true })) {
      const path = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Public asset must not be a symlink: ${path}`);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) {
        const bytes = await readFile(resolve(root, 'public', path));
        files.push({ path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
      } else throw new Error(`Public asset must be a regular file: ${path}`);
    }
  }
  await visit();
  return files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

export async function verifyPublicAssets(root) {
  const manifest = JSON.parse(await readFile(resolve(root, 'build-support/public-assets.json'), 'utf8'));
  if (manifest.schema_version !== 'matchmind-public-assets/1' || !Array.isArray(manifest.files)) throw new Error('Invalid public asset manifest.');
  const files = await collectPublicAssets(root);
  if (JSON.stringify(files) !== JSON.stringify(manifest.files)) throw new Error('Public assets changed. After an intentional source edit, run npm run assets:refresh.');
  return files;
}

export async function refreshPublicAssets(root) {
  const files = await collectPublicAssets(root);
  await writeFile(resolve(root, 'build-support/public-assets.json'), `${JSON.stringify({ schema_version: 'matchmind-public-assets/1', files }, null, 2)}\n`);
  return files;
}
