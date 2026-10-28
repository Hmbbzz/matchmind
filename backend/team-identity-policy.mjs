import { TEAM_IDENTITIES, TEAM_IDENTITY_VERSION } from '../public/team-identities.js';
export { TEAM_IDENTITIES, TEAM_IDENTITY_VERSION };

// Legacy labels are internal migration/provenance inputs, never active UI labels.
export const LEGACY_TEAM_LABELS = Object.freeze([
  ['Melbourne Victory Football Club', TEAM_IDENTITIES[0].name],
  ['Melbourne V FC', TEAM_IDENTITIES[0].name],
  ['Melbourne Victory', TEAM_IDENTITIES[0].name],
  ['Auckland FC', TEAM_IDENTITIES[1].name],
]);
const codes = Object.freeze({ MEL: 'LUM', AUC: 'ECU' });
export const legacyLabelNeedles = Object.freeze([...LEGACY_TEAM_LABELS.map(([label]) => label), '"MEL"', '"AUC"']);
export const containsLegacyTeamLabels = text => typeof text === 'string' && legacyLabelNeedles.some(label => text.includes(label));
const protectedKey = key => /(?:^id$|_ids?$|Ids?$|sha256|hash|version|^source$|^question$|^query$|^token$)/i.test(key);
export function canonicalizeTeamLabels(value, key = '') {
  if (protectedKey(key)) return value;
  if (typeof value === 'string') {
    if (Object.hasOwn(codes, value)) return codes[value];
    return LEGACY_TEAM_LABELS.reduce((text, [old, name]) => text.replaceAll(old, name), value);
  }
  if (Array.isArray(value)) return value.map(row => canonicalizeTeamLabels(row));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([field, row]) => [field, canonicalizeTeamLabels(row, field)]));
  return value;
}
