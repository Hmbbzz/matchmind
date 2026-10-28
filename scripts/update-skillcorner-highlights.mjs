// Refresh only highlights and their policy metadata; never rebuild tracking/analytics.
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildShotHighlights, HIGHLIGHT_POLICY } from './lib/shot-highlights.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(projectRoot, 'dist', 'data');
const path = join(dataDir, 'demo.json');
const demo = JSON.parse(await readFile(path, 'utf8'));
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const unchangedFields = (value) => {
  const { highlights, meta: { highlightPolicy, ...meta }, ...other } = value;
  return { meta, ...other };
};
const originalUnchangedHash = digest(unchangedFields(demo));
const previousHighlights = demo.highlights;
demo.highlights = buildShotHighlights(demo.events, { matchId: demo.match.match_id });
demo.meta.highlightPolicy = HIGHLIGHT_POLICY;
const updatedUnchangedHash = digest(unchangedFields(demo));
if (originalUnchangedHash !== updatedUnchangedHash) throw new Error('Fields outside highlights/policy changed');

const ids = new Set(demo.highlights.map((row) => row.highlight_id));
const previousIds = new Set(previousHighlights.map((row) => row.highlight_id));
const report = {
  task: 'DEV-DATA-A',
  policy: HIGHLIGHT_POLICY,
  scope: 'Only demo.highlights and demo.meta.highlightPolicy refreshed; no tracking or analytics regeneration.',
  previousHighlightCount: previousHighlights.length,
  highlightCount: demo.highlights.length,
  shotCount: demo.events.filter((event) => event.type === 'shot').length,
  retainedIds: previousHighlights.filter((row) => ids.has(row.highlight_id)).map((row) => row.highlight_id),
  addedIds: demo.highlights.filter((row) => !previousIds.has(row.highlight_id)).map((row) => row.highlight_id),
  removedIds: previousHighlights.filter((row) => !ids.has(row.highlight_id)).map((row) => row.highlight_id),
  originalOtherFieldsSha256: originalUnchangedHash,
  updatedOtherFieldsSha256: updatedUnchangedHash,
  otherFieldsUnchanged: originalUnchangedHash === updatedUnchangedHash,
  independentAcceptance: 'Pending QA-A; this is a developer refresh receipt, not an independent test report.',
};
await writeFile(path, JSON.stringify(demo), 'utf8');
await mkdir(join(dataDir, 'quality'), { recursive: true });
await writeFile(join(dataDir, 'quality', 'highlight-policy-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ previous: previousHighlights.length, current: demo.highlights.length, added: report.addedIds.length, removed: report.removedIds.length, otherFieldsUnchanged: report.otherFieldsUnchanged }));
