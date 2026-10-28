const freeze = (status, reason) => Object.freeze({ status, reason });
const normalize = (value) => value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Exact known-roster aliases only. This is intentionally not general named-entity recognition.
export function checkQuestionActor(question, roster, selectedPlayerId) {
  if (typeof question !== 'string' || !question.trim() || question.length > 4000 || !Array.isArray(roster) || typeof selectedPlayerId !== 'string') throw new TypeError('A bounded question and trusted roster are required.');
  const text = normalize(question);
  const aliases = new Map(); const surnames = new Set();
  for (const player of roster) {
    if (typeof player?.id !== 'string') continue;
    for (const name of [player.name, player.fullName, player.full_name]) {
      if (typeof name !== 'string' || name.length > 240) continue;
      const alias = normalize(name); const tokens = alias.split(' ');
      if (tokens.length < 2) continue;
      if (!aliases.has(alias)) aliases.set(alias, new Set());
      aliases.get(alias).add(player.id);
      const family = tokens[0].length === 1 ? tokens.slice(1).join(' ') : tokens.at(-1);
      if (family?.length >= 3) surnames.add(family);
    }
  }
  const matches = [];
  for (const [alias, ids] of [...aliases].sort(([left], [right]) => right.length - left.length)) {
    for (const match of text.matchAll(new RegExp(`(?:^| )${escaped(alias)}(?= |$)`, 'gu'))) {
      const start = match.index + (match[0].startsWith(' ') ? 1 : 0); const end = start + alias.length;
      if (matches.some((item) => item.start <= start && item.end >= end)) continue;
      matches.push({ start, end, ids });
    }
  }
  if (matches.some((item) => item.ids.size > 1)) return freeze('ambiguous', 'ambiguous_actor_name');
  const ids = new Set(matches.flatMap((item) => [...item.ids]));
  if (ids.size > 1) return freeze('unsupported', 'multiple_question_actors');
  if (ids.size === 1 && !ids.has(selectedPlayerId)) return freeze('unsupported', 'question_actor_mismatch');

  // Bare surnames are not resolved to an actor. Only explicit name-like contexts mark identity as unestablished.
  // This avoids treating ordinary words such as "May" in "May I see his passing?" as an identity.
  for (const surname of surnames) for (const match of text.matchAll(new RegExp(`(?:^| )${escaped(surname)}(?= |$)`, 'gu'))) {
    const start = match.index + (match[0].startsWith(' ') ? 1 : 0); const end = start + surname.length;
    if (matches.some((item) => item.start <= start && item.end >= end)) continue;
    const before = text.slice(0, start); const after = text.slice(end);
    if (/^(?: |$)s(?: |$)/u.test(after) || /(?:^| )(?:player|how is|how has|what about|show|tell me about) $/u.test(before) || (start === 0 && /^ (?:passing|passes|crossing|crosses|shooting|shots|xg)(?: |$)/u.test(after))) return freeze('ambiguous', 'ambiguous_actor_name');
  }
  return freeze('allowed', ids.size ? 'selected_actor_named' : 'no_explicit_roster_alias');
}
