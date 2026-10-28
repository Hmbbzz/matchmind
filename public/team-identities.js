// Display identities only. Source match, team/player IDs and observations stay real.
export const TEAM_IDENTITY_VERSION = 'team-display-identities/2026-10-27-S1';
export const TEAM_IDENTITIES = Object.freeze([
  Object.freeze({ id: 'sk_team_868', sourceId: '868', name: 'Lumen Vale FC', code: 'LUM', crest: 'L' }),
  Object.freeze({ id: 'sk_team_4177', sourceId: '4177', name: 'Ember Coast United', code: 'ECU', crest: 'E' }),
]);
export const teamIdentity = id => TEAM_IDENTITIES.find(row => row.id === String(id) || row.sourceId === String(id));

// Preserve the original CSV bytes except the target teams' team_shortname field.
// The lexical scan handles quoted commas/newlines and retains every other cell.
export function aliasSkillCornerEventsCsv(text) {
  const rows = []; let fields = [], start = 0, quoted = false;
  const cell = end => {
    const token = text.slice(start, end), raw = token.endsWith('\r') ? token.slice(0, -1) : token;
    fields.push({ start, end: start + raw.length, value: raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1).replaceAll('""', '"') : raw, quoted: raw.startsWith('"') });
  };
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '"') { if (quoted && text[i + 1] === '"') { i += 1; continue; } quoted = !quoted; }
    if (!quoted && (text[i] === ',' || text[i] === '\n')) {
      cell(i); start = i + 1;
      if (text[i] === '\n') { rows.push(fields); fields = []; }
    }
  }
  if (quoted) throw new TypeError('Unclosed CSV field.');
  if (start < text.length || fields.length) { cell(text.length); rows.push(fields); }
  const header = rows.shift() ?? [], idIndex = header.findIndex(row => row.value === 'team_id'), nameIndex = header.findIndex(row => row.value === 'team_shortname');
  if (idIndex < 0 || nameIndex < 0) throw new TypeError('Expected SkillCorner team identity columns.');
  const replacements = [];
  for (const row of rows) {
    const identity = teamIdentity(row[idIndex]?.value), field = row[nameIndex];
    if (identity && field && field.value !== identity.name) replacements.push({ ...field, name: field.quoted ? `"${identity.name.replaceAll('"', '""')}"` : identity.name });
  }
  let result = '', offset = 0;
  for (const row of replacements) { result += text.slice(offset, row.start) + row.name; offset = row.end; }
  return result + text.slice(offset);
}
