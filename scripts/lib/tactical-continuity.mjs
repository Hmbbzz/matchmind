// A candidate is evidence only while every scheduled observation is qualified.
// Initializing the first state is deliberately distinct from confirming a switch.
export function advanceStateCandidate(machine, observation, { stepMs, requiredSamples, minConfidence = 0 } = {}) {
  if (!Number.isSafeInteger(stepMs) || stepMs <= 0 || !Number.isSafeInteger(requiredSamples) || requiredSamples < 1
    || !Number.isFinite(minConfidence) || !Number.isSafeInteger(observation?.atMs) || observation.atMs < 0) {
    throw new TypeError('A valid observation time and continuity policy are required.');
  }
  const next = {
    current: machine?.current ?? null,
    currentFeature: machine?.currentFeature ?? null,
    candidate: machine?.candidate ?? null,
    candidateSince: machine?.candidateSince ?? null,
    candidateCount: machine?.candidateCount ?? 0,
    lastAtMs: machine?.lastAtMs ?? null,
  };
  const clearCandidate = () => { next.candidate = null; next.candidateSince = null; next.candidateCount = 0; };
  const consecutive = next.lastAtMs === null || observation.atMs - next.lastAtMs === stepMs;
  if (!consecutive) clearCandidate();
  next.lastAtMs = observation.atMs;
  const qualified = observation.status === 'available' && typeof observation.primaryState === 'string' && observation.primaryState.length > 0
    && Number.isFinite(observation.confidence) && observation.confidence >= minConfidence;
  let initialized = false;
  let transition = null;
  if (!qualified) clearCandidate();
  else if (!next.current) {
    next.current = observation.primaryState;
    next.currentFeature = observation.feature ?? null;
    clearCandidate();
    initialized = true;
  } else if (observation.primaryState === next.current) {
    next.currentFeature = observation.feature ?? null;
    clearCandidate();
  } else {
    if (next.candidate !== observation.primaryState) {
      next.candidate = observation.primaryState;
      next.candidateSince = observation.atMs;
      next.candidateCount = 1;
    } else next.candidateCount += 1;
    if (next.candidateCount >= requiredSamples) {
      transition = {
        fromState: next.current,
        toState: next.candidate,
        effectiveFromMs: next.candidateSince,
        detectedAtMs: observation.atMs,
        beforeFeature: next.currentFeature,
        afterFeature: observation.feature ?? null,
      };
      next.current = next.candidate;
      next.currentFeature = observation.feature ?? null;
      clearCandidate();
    }
  }
  return {
    machine: next,
    confirmedState: next.current,
    provisional: next.candidate ? { state: next.candidate, sinceMs: next.candidateSince, samples: next.candidateCount } : null,
    transition,
    initialized,
  };
}
