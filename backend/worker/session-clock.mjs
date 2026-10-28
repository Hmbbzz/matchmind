export const CLOCK_POLICY_VERSION = 'historical-gap-clock/1.0';
// Trusted build-time schedule only. A caller's playhead, query string or offset never enters it.
export function visibleCutoffAt({ elapsedMs, initialCutoffMs = 0, durationMs, gaps = [] }) {
  if (![elapsedMs, initialCutoffMs, durationMs].every((value) => Number.isSafeInteger(value) && value >= 0) || initialCutoffMs > durationMs) throw new TypeError('Invalid trusted playback clock.');
  let cutoff = initialCutoffMs + elapsedMs;
  let previousEnd = 0;
  for (const gap of gaps) {
    if (!Number.isSafeInteger(gap.start_ms) || !Number.isSafeInteger(gap.end_ms) || gap.start_ms < previousEnd || gap.end_ms <= gap.start_ms || gap.end_ms > durationMs) throw new TypeError('Invalid trusted gap schedule.');
    previousEnd = gap.end_ms;
    if (gap.end_ms <= initialCutoffMs) continue;
    const start = Math.max(initialCutoffMs, gap.start_ms);
    // Short gaps are played in real time; retain the UI's hold before long-gap skipping.
    if (gap.end_ms - start < 2000) continue;
    if (cutoff < start + 450) break;
    cutoff += gap.end_ms - start - 450;
  }
  return Math.min(durationMs, cutoff);
}
