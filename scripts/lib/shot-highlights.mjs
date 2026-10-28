// Selection uses each shot independently: future events cannot replace a published shot.
export const HIGHLIGHT_CONTRACT_VERSION = 'matchmind-highlight-v1';
export const HIGHLIGHT_POLICY_VERSION = 'all-known-shots-v1';

export const HIGHLIGHT_POLICY = Object.freeze({
  contractVersion: HIGHLIGHT_CONTRACT_VERSION,
  policyVersion: HIGHLIGHT_POLICY_VERSION,
  selection: 'all_completed_shots',
  ranking: 'none',
  availableAt: 'max(event.t, event.q.endMs ?? event.t)',
  availabilityMode: 'simulated_event_completion_not_provider_publish_time',
  replayBounds: 'anchor_t_minus_9000_to_plus_6500_ms_clamped_by_consumer_cutoff',
  limitations: 'Static full-match input remains downloadable; provider available_at/revision and server cutoff isolation are not implemented.',
});

const isTime = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const compareId = (left, right) => left < right ? -1 : left > right ? 1 : 0;

/**
 * Pure batch view of an online policy. matchId is the full stable match ID.
 * All shots at or before cutoffMs are retained, including low/missing-xG shots.
 * Missing q/endMs falls back to t; missing/non-finite xG affects only the score (0).
 * Invalid array/options, duplicate shot IDs, or invalid shot timestamps throw.
 * Non-shot rows are ignored. Inputs are never mutated; timestamps use stream ms.
 * available_at_ms is a simulation bound, not a claim about provider publication.
 */
export function buildShotHighlights(events, { matchId, cutoffMs = Infinity } = {}) {
  if (!Array.isArray(events)) throw new TypeError('events must be an array');
  if (typeof matchId !== 'string' || !matchId.trim()) throw new TypeError('matchId must be a non-empty stable ID');
  if (cutoffMs !== Infinity && !isTime(cutoffMs)) throw new TypeError('cutoffMs must be non-negative stream ms or Infinity');

  const seenIds = new Set();
  const selected = [];
  for (const event of events) {
    if (event?.type !== 'shot') continue;
    if (typeof event.id !== 'string' || !event.id.trim()) throw new TypeError('shot.id must be a non-empty string');
    if (seenIds.has(event.id)) throw new TypeError(`duplicate shot.id: ${event.id}`);
    seenIds.add(event.id);
    if (!isTime(event.t)) throw new TypeError(`invalid shot.t: ${event.id}`);
    const endMs = event.q?.endMs ?? event.t;
    if (!isTime(endMs)) throw new TypeError(`invalid shot.q.endMs: ${event.id}`);
    const availableAtMs = Math.max(event.t, endMs);
    if (availableAtMs > cutoffMs) continue;
    const xg = Number.isFinite(event.q?.xg) ? event.q.xg : 0;
    selected.push({
      highlight_id: `sk_highlight_${event.id}`,
      match_id: matchId,
      anchor_event_id: event.id,
      label: event.outcome === 'goal' ? 'Goal' : 'Chance',
      importance_score: event.outcome === 'goal' ? 1 : Number(xg.toFixed(3)),
      replay_start_ms: Math.max(0, event.t - 9000),
      replay_end_ms: event.t + 6500,
      team_id: event.team,
      player_id: event.player,
      available_at_ms: availableAtMs,
      contract_version: HIGHLIGHT_CONTRACT_VERSION,
      policy_version: HIGHLIGHT_POLICY_VERSION,
    });
  }
  return selected.sort((left, right) => left.available_at_ms - right.available_at_ms || compareId(left.anchor_event_id, right.anchor_event_id));
}
