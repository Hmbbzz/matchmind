import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const sourceRoot = resolve(process.env.SKILLCORNER_ROOT || '/tmp/skillcorner-opendata-audit');
const dataDir = join(projectRoot, 'dist', 'data');
const qualityDir = join(dataDir, 'quality');

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(field); field = ''; }
    else if (character === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += character;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function timeToMs(value = '00:00.0') {
  const parts = value.split(':').map(Number);
  if (parts.length === 3) return Math.round((parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000);
  return Math.round(((parts[0] || 0) * 60 + (parts[1] || 0)) * 1000);
}

const attackCompatibility = {
  build_up: ['build_up'],
  create: ['controlled_progression', 'attacking_third_siege'],
  finish: ['attacking_third_siege', 'controlled_progression'],
  direct: ['direct_play'],
  quick_break: ['counter_attack'],
  transition: ['counter_attack'],
  set_play: ['controlled_progression', 'attacking_third_siege'],
  chaotic: ['counter_attack', 'direct_play', 'controlled_progression'],
  disruption: ['controlled_progression'],
};

const defenseCompatibility = {
  high_block: ['high_press'],
  medium_block: ['mid_block'],
  low_block: ['low_block'],
  defending_transition: ['counter_press', 'recover_shape'],
  defending_quick_break: ['recover_shape', 'counter_press'],
  defending_direct: ['mid_block', 'low_block'],
  defending_set_play: ['low_block', 'mid_block'],
  chaotic: ['counter_press', 'recover_shape', 'mid_block'],
  disruption: ['counter_press', 'mid_block'],
};

const familyByState = {
  build_up: 'organized_attack', controlled_progression: 'organized_attack', attacking_third_siege: 'organized_attack', direct_play: 'organized_attack',
  counter_attack: 'attacking_transition', high_press: 'organized_defense', mid_block: 'organized_defense', low_block: 'organized_defense',
  counter_press: 'defensive_transition', recover_shape: 'defensive_transition',
};

const data = await readJson(join(dataDir, 'demo.json'));
const states = await readJson(join(dataDir, 'live', 'tactical-states.json'));
const matchId = String(data.match.source_match_id);
const sourcePhases = parseCsv(await readFile(join(sourceRoot, 'data', 'matches', matchId, `${matchId}_phases_of_play.csv`), 'utf8'));
const secondHalfOffsetMs = data.match.second_half_offset_ms;
const teamIds = data.teams.map((team) => team.id);

const phaseSegments = sourcePhases.map((row) => ({
  startMs: timeToMs(row.time_start) + (number(row.period) === 2 ? secondHalfOffsetMs : 0),
  endMs: timeToMs(row.time_end) + (number(row.period) === 2 ? secondHalfOffsetMs : 0),
  possessionTeamId: `sk_team_${row.team_in_possession_id}`,
  attackLabel: row.team_in_possession_phase_type,
  defenseLabel: row.team_out_of_possession_phase_type,
}));

function dominantProviderLabel(teamId, startMs, endMs) {
  const durations = new Map();
  for (const segment of phaseSegments) {
    const overlap = Math.max(0, Math.min(endMs, segment.endMs) - Math.max(startMs, segment.startMs));
    if (!overlap) continue;
    const attacking = segment.possessionTeamId === teamId;
    const label = attacking ? `attack:${segment.attackLabel}` : `defense:${segment.defenseLabel}`;
    durations.set(label, (durations.get(label) || 0) + overlap);
  }
  const ranked = [...durations.entries()].sort((a, b) => b[1] - a[1]);
  if (!ranked.length) return null;
  const total = ranked.reduce((sum, row) => sum + row[1], 0);
  return { label: ranked[0][0], share: ranked[0][1] / total, evaluatedMs: total };
}

const evaluationRows = [];
for (const state of states.rows) {
  if (state.status !== 'available' || !state.micro.confirmedState) continue;
  const windowStartMs = Math.max(0, state.asOfMs - 90_000);
  const provider = dominantProviderLabel(state.teamId, windowStartMs, state.asOfMs);
  if (!provider || provider.evaluatedMs < 20_000) continue;
  const [side, label] = provider.label.split(':');
  const compatibleStates = side === 'attack' ? attackCompatibility[label] || [] : defenseCompatibility[label] || [];
  const providerFamily = side === 'attack'
    ? ['quick_break', 'transition'].includes(label) ? 'attacking_transition' : 'organized_attack'
    : ['defending_transition', 'defending_quick_break', 'chaotic', 'disruption'].includes(label) ? 'defensive_transition' : 'organized_defense';
  evaluationRows.push({
    teamId: state.teamId,
    asOfMs: state.asOfMs,
    ownState: state.micro.confirmedState,
    ownFamily: familyByState[state.micro.confirmedState],
    providerLabel: provider.label,
    providerFamily,
    providerDominantShare: Number(provider.share.toFixed(4)),
    compatible: compatibleStates.includes(state.micro.confirmedState),
    familyMatch: familyByState[state.micro.confirmedState] === providerFamily,
  });
}

const compatibleAccuracy = evaluationRows.filter((row) => row.compatible).length / Math.max(1, evaluationRows.length);
const familyAccuracy = evaluationRows.filter((row) => row.familyMatch).length / Math.max(1, evaluationRows.length);
const highPurityRows = evaluationRows.filter((row) => row.providerDominantShare >= 0.5);
const highPurityCompatibleAccuracy = highPurityRows.filter((row) => row.compatible).length / Math.max(1, highPurityRows.length);
const highPurityFamilyAccuracy = highPurityRows.filter((row) => row.familyMatch).length / Math.max(1, highPurityRows.length);
const confusion = {};
for (const row of evaluationRows) {
  confusion[row.providerLabel] ||= {};
  confusion[row.providerLabel][row.ownState] = (confusion[row.providerLabel][row.ownState] || 0) + 1;
}

const assertions = [];
function check(name, condition, detail) {
  assertions.push({ name, passed: Boolean(condition), detail });
}
check('provider labels are evaluation-only', states.policy.providerPhaseLabelsUsed === false, 'online state policy excludes provider labels');
check('enough evaluated windows', evaluationRows.length >= 300, `${evaluationRows.length} windows`);
check('both teams evaluated', teamIds.every((teamId) => evaluationRows.some((row) => row.teamId === teamId)), teamIds.join(', '));
check('family agreement clears naive floor', familyAccuracy >= 0.45, `${(familyAccuracy * 100).toFixed(1)}%`);
check('high-purity family agreement clears floor', highPurityFamilyAccuracy >= 0.5, `${(highPurityFamilyAccuracy * 100).toFixed(1)}%`);
check('compatible-label agreement is measurable', compatibleAccuracy >= 0.25, `${(compatibleAccuracy * 100).toFixed(1)}%`);

const failed = assertions.filter((row) => !row.passed);
const report = {
  schemaVersion: 'tactical-state-offline-evaluation/1.0',
  generatedAt: new Date().toISOString(),
  matchId: data.match.match_id,
  passed: failed.length === 0,
  assertions,
  metrics: {
    evaluatedWindows: evaluationRows.length,
    compatibleAccuracy: Number(compatibleAccuracy.toFixed(4)),
    familyAccuracy: Number(familyAccuracy.toFixed(4)),
    highPurityWindows: highPurityRows.length,
    highPurityCompatibleAccuracy: Number(highPurityCompatibleAccuracy.toFixed(4)),
    highPurityFamilyAccuracy: Number(highPurityFamilyAccuracy.toFixed(4)),
  },
  mappingNote: 'Provider create/finish and transition labels map to sets of compatible product states. This is an offline sanity check, not training and not ground-truth equivalence.',
  confusion,
};

await writeFile(join(qualityDir, 'tactical-offline-evaluation.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(`Evaluated ${evaluationRows.length} windows: family ${(familyAccuracy * 100).toFixed(1)}%, compatible ${(compatibleAccuracy * 100).toFixed(1)}%.`);
console.log(`High-purity ${highPurityRows.length}: family ${(highPurityFamilyAccuracy * 100).toFixed(1)}%, compatible ${(highPurityCompatibleAccuracy * 100).toFixed(1)}%.`);
console.log(`${assertions.length - failed.length}/${assertions.length} validations passed.`);
if (failed.length) {
  for (const failure of failed) console.error(`FAIL ${failure.name}: ${failure.detail}`);
  process.exitCode = 1;
}
