import { matchClockPolicy } from './worker/generated-clock.mjs';
import { formatMatchClock } from './answer-display.mjs';

// Display only: authorization, hashes, availability and receipt bounds use raw stream ms.
export function formatSourceMatchClock(streamMs, matchId) {
  const policy = matchClockPolicy;
  const displayed = matchId === policy.matchId && streamMs >= policy.secondHalfStreamStartMs
    ? policy.secondHalfClockStartMs + streamMs - policy.secondHalfStreamStartMs
    : streamMs;
  return formatMatchClock(displayed);
}
