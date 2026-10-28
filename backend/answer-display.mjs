export const RULE_ANSWER_LIMITATION = 'This answer uses deterministic local rules.';

export function formatMatchClock(milliseconds) {
  if (!Number.isSafeInteger(milliseconds) || milliseconds < 0) throw new TypeError('A non-negative frozen stream time is required.');
  const seconds = Math.floor(milliseconds / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function formatCompletionRate(value, completed, known) {
  if (!Number.isSafeInteger(completed) || !Number.isSafeInteger(known) || completed < 0 || known < completed || value !== null && (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1)) throw new TypeError('Validated completion facts are required.');
  return value === null ? `unavailable (${known} known outcomes)` : `${(value * 100).toFixed(1)}% (${completed}/${known} known outcomes)`;
}
