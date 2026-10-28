// Node-only compatibility loader. Worker code imports prompt-core.mjs directly.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPromptBundle } from './prompt-core.mjs';
export * from './prompt-core.mjs';
export * from './attack-contract.mjs';
import { createAttackPromptBundle } from './attack-contract.mjs';

export async function loadPromptBundle({ directory = resolve(dirname(fileURLToPath(import.meta.url)), '../prompts') } = {}) {
  const [system, schemaText] = await Promise.all(['assistant-v2.system.md', 'output-schema-v2.json'].map((name) => readFile(join(directory, name), 'utf8')));
  const sha256 = createHash('sha256').update(system).update('\n').update(schemaText).digest('hex');
  return createPromptBundle(system, schemaText, sha256);
}

export async function loadAttackPromptBundle({ directory = resolve(dirname(fileURLToPath(import.meta.url)), '../prompts') } = {}) {
  const [system, schemaText] = await Promise.all(['attack-v1.system.md', 'attack-output-schema-v1.json'].map(name => readFile(join(directory,name),'utf8')));
  return createAttackPromptBundle(system, schemaText, createHash('sha256').update(system).update('\n').update(schemaText).digest('hex'));
}
