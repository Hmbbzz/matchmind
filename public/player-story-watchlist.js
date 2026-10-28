// Local preferences only. Story snapshots and sharing capabilities never enter storage.
export const WATCHLIST_VERSION = 'matchmind-observers/1';
export function createPlayerWatchlist({ matchId, sourceVersion, players, storage = () => globalThis.localStorage }) {
  const roster = new Set(players.map(row => row.id));
  const key = `${WATCHLIST_VERSION}:${encodeURIComponent(matchId)}:${encodeURIComponent(sourceVersion)}`;
  let entries = [], persistent = true;
  try {
    const raw = storage().getItem(key);
    if (raw !== null && raw.length <= 32768) {
      const value = JSON.parse(raw), seen = new Set();
      if (value?.version === WATCHLIST_VERSION && value.match_id === matchId && value.source_version === sourceVersion && Array.isArray(value.players)) {
        entries = value.players.slice(0, players.length).filter(row => {
          if (!row || !roster.has(row.player_id) || !['casual','analyst'].includes(row.mode) || seen.has(row.player_id)) return false;
          seen.add(row.player_id); return true;
        }).map(row => ({ player_id:row.player_id, mode:row.mode }));
      }
    }
  } catch { persistent = false; }
  const persist = () => {
    try { storage().setItem(key, JSON.stringify({ version:WATCHLIST_VERSION, match_id:matchId, source_version:sourceVersion, players:entries })); persistent = true; }
    catch { persistent = false; }
  };
  return Object.freeze({
    get key() { return key; },
    get persistent() { return persistent; },
    list: () => entries.map(row => Object.freeze({ ...row })),
    add(playerId, mode) {
      if (!roster.has(playerId) || !['casual','analyst'].includes(mode) || entries.some(row => row.player_id === playerId)) return false;
      entries.push({ player_id:playerId, mode }); persist(); return true;
    },
    remove(playerId) { entries = entries.filter(row => row.player_id !== playerId); persist(); },
    setMode(playerId, mode) { const row = entries.find(row => row.player_id === playerId); if (row && ['casual','analyst'].includes(mode)) { row.mode = mode; persist(); } },
  });
}
