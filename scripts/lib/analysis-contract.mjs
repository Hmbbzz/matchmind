export const ANALYSIS_CONTRACT_VERSION = 'skillcorner-analysis-contract/1.1';
export const CHANNELS = Object.freeze(['wide_left', 'half_space_left', 'center', 'half_space_right', 'wide_right']);
const THIRDS = new Set(['defensive_third', 'middle_third', 'attacking_third']);
const validTime = (value) => Number.isSafeInteger(value) && value >= 0;

export function eventAvailableAtMs(event) {
  const times = [event?.t, event?.q?.endMs ?? event?.t, event?.available_at_ms ?? event?.t];
  return times.every(validTime) ? Math.max(...times) : null;
}

export function eventVisibleAt(event, cutoffMs) {
  const availableAt = eventAvailableAtMs(event);
  return validTime(cutoffMs) && availableAt !== null && availableAt <= cutoffMs;
}

// Event metrics use action-end time in (start, end]; publication is a second gate.
// A late event may enter a longer current window, but never an earlier cutoff.
export function eventInWindow(event, startMs, endMs) {
  return validTime(startMs) && validTime(endMs) && startMs < endMs
    && validTime(event?.t) && event.t > startMs && event.t <= endMs && eventVisibleAt(event, endMs);
}

export function normalizeEventForAnalysis(event, sourceRow) {
  const attackingSide = ['left_to_right', 'right_to_left'].includes(sourceRow?.attacking_side) ? sourceRow.attacking_side : null;
  const attackX = (x) => attackingSide && Number.isFinite(x) ? (attackingSide === 'right_to_left' ? 105 - x : x) : null;
  const hasCoordinate = (value) => value !== undefined && value !== null && value !== '' && Number.isFinite(Number(value));
  const receptionX = hasCoordinate(sourceRow?.player_targeted_x_reception);
  const receptionY = hasCoordinate(sourceRow?.player_targeted_y_reception);
  const thirdEnd = receptionX ? sourceRow?.player_targeted_third_reception : sourceRow?.third_end;
  const channelEnd = receptionY ? sourceRow?.player_targeted_channel_reception : sourceRow?.channel_end;
  return {
    attackingSide,
    startX: attackX(event?.x),
    endX: attackX(event?.ex),
    endY: Number.isFinite(event?.ey) ? event.ey : null,
    thirdStart: THIRDS.has(sourceRow?.third_start) ? sourceRow.third_start : null,
    thirdEnd: THIRDS.has(thirdEnd) ? thirdEnd : null,
    // Match the endpoint selected by the existing converter: reception labels
    // accompany reception coordinates. Missing reception labels stay unknown.
    // Source-end labels apply only when that coordinate used the source end.
    channelEnd: CHANNELS.includes(channelEnd) ? channelEnd : null,
    rawThirdEnd: THIRDS.has(sourceRow?.third_end) ? sourceRow.third_end : null,
    rawChannelEnd: CHANNELS.includes(sourceRow?.channel_end) ? sourceRow.channel_end : null,
    endpointMethod: receptionX && receptionY ? 'targeted_reception' : !receptionX && !receptionY ? 'source_end' : 'mixed_or_incomplete_endpoint',
  };
}

export function parseSourceCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(field); field = ''; }
    else if (character === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += character;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}
