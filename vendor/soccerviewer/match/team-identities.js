import { TEAM_IDENTITIES, TEAM_IDENTITY_VERSION, teamIdentity, aliasSkillCornerEventsCsv } from '../../../public/team-identities.js';
export { TEAM_IDENTITY_VERSION, aliasSkillCornerEventsCsv };
export const isIdentityMatch = matchId => String(matchId) === '2017461';
export function matchIdentitySql(matchId) {
  if (!isIdentityMatch(matchId)) return null;
  const [home, away] = TEAM_IDENTITIES, quote = text => `'${text.replaceAll("'", "''")}'`;
  return `UPDATE matches_t SET home_name=${quote(home.name)},home_acr=${quote(home.code)},away_name=${quote(away.name)},away_acr=${quote(away.code)} WHERE match_id=2017461`;
}
export function identityMeta(matchId, match) {
  if (!isIdentityMatch(matchId)) return {};
  const home = teamIdentity(match.home_team?.id), away = teamIdentity(match.away_team?.id);
  return { ...(home ? { home: home.name, homeAcr: home.code } : {}), ...(away ? { away: away.name, awayAcr: away.code } : {}), identityVersion: TEAM_IDENTITY_VERSION };
}
export function identityMatchMetadata(matchId, match) {
  if (!isIdentityMatch(matchId)) return match;
  const next = structuredClone(match);
  for (const side of ['home_team', 'away_team']) {
    const identity = teamIdentity(next[side]?.id);
    if (identity) Object.assign(next[side], { name: identity.name, short_name: identity.name, acronym: identity.code });
  }
  return next;
}
