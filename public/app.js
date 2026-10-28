import { createAssistantApi, projectPlayerQuestion } from "./assistant-api.js?v=2026-10-27-T1";
import { createPlayerStoryUI } from "./player-story-ui.js?v=2026-10-27-U3";
import { unsupportedPassingDetail, PASSING_DETAIL_LIMIT, isAttackExplanationQuestion } from "./question-intent.js?v=2026-10-27-U1";
import { visibleCopy, compactCopy, attackMainText, COPY_LIMITS, observeVisibleCopy, isEarlyContext, asksPerformance, asksShotQuality, sampleContextCopy } from "./display-copy.js?v=2026-10-27-U3";

observeVisibleCopy(document.body);

// Keep this release key aligned with app.js/styles.css URLs in index.html.
// Only the changed application assets and manifest bypass older cached copies.
const RELEASE_VERSION = "2026-10-27-W1";
const LOCAL_TEST_START_SECONDS = location.hostname === "localhost" ? Number(new URLSearchParams(location.search).get("at") || 0) : 0;
const STREAM_START = Number.isFinite(LOCAL_TEST_START_SECONDS) ? Math.max(0, LOCAL_TEST_START_SECONDS * 1000) : 0;
const REGULATION_END = 90 * 60 * 1000;
const SVG_NS = "http://www.w3.org/2000/svg";

const TACTICAL_STATE_LABELS = {
  build_up: "build-up", controlled_progression: "controlled progression", attacking_third_siege: "final-third pressure",
  direct_play: "direct play", counter_attack: "counter-attack", high_press: "high press", mid_block: "mid block",
  low_block: "low block", counter_press: "counter-press", recover_shape: "recovery shape",
};
const CHANNEL_LABELS = {
  left: "left", center: "centre", right: "right", long: "a long completed pass",
  wide_left: "wide left", half_space_left: "left half-space", half_space_right: "right half-space", wide_right: "wide right",
};
const ATTACK_PATTERN_LABELS = {
  set_piece: "Set-piece attack", high_regain_attack: "High-regain attack", counter_attack: "Counter-attack",
  wing_attack: "Wing attack", direct_attack: "Direct attack", sustained_possession: "Sustained possession",
  central_combination: "Central combination", second_ball_attack: "Second-ball attack",
};

const TEAM_DISPLAY_COLORS = {
  sk_team_868: "#2d5bd7",
  sk_team_4177: "#f28a24",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const formatClock = (ms) => {
  const match = state?.data?.match;
  const displayMs = match?.second_half_stream_start_ms != null && ms >= match.second_half_stream_start_ms
    ? ms - (match.second_half_offset_ms || 0)
    : ms;
  const seconds = Math.max(0, Math.floor(displayMs / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};
const percent = (value) => `${Math.round((Number.isFinite(value) ? value : 0) * 100)}%`;
const samplePercent = (value) => Number.isFinite(value) ? percent(value) : "No valid sample";
const validXg = value => Number.isFinite(value) && value >= 0 && value <= 1;
const formatXg = (value) => Number.isFinite(value) ? value.toFixed(2) : "Unavailable";
const sampleXg = (stats) => Number.isFinite(stats.xg) ? formatXg(stats.xg) : `Unavailable (${stats.xgSample}/${stats.shots} valid shot estimates)`;
const HISTORY_SCOPE = "three selected earlier matches";
const HISTORY_LIMIT = "Only three selected earlier matches per team are included, not a full season or complete recent schedule. Player appearances and valid observations can be fewer.";
const SHOT_METHOD = "Shot quality is estimated from position. Inferred shot outcomes are not verified saves, accuracy or blocks.";

const state = {
  data: null,
  time: STREAM_START,
  liveEdge: STREAM_START,
  // A cold 3D boot can take several seconds while DuckDB and the tracking
  // window load. Hold the match at kickoff until the first 3D frame is ready
  // so the viewer actually sees 0:00 instead of joining mid-play.
  playing: STREAM_START > 0,
  autoStartPending: STREAM_START === 0,
  followingLive: true,
  selectedPlayerId: null,
  selectedEventId: null,
  selectedChainId: null,
  timelineFilter: "all",
  timelineTeamFilter: "all",
  followed: false,
  followedPlayerId: null,
  audienceMode: "casual",
  offBallVisible: true,
  away: null,
  lastAway: null,
  replay: null,
  attackReplay: null,
  viewerReturn: null,
  viewMode: "3d",
  viewer3dReady: false,
  viewer3dLastSync: 0,
  allFramesLoaded: false,
  bufferPercent: 0,
  gapStartedAt: null,
  gapNoticeUntil: 0,
  lastGapSkip: null,
  lastFrameAt: performance.now(),
  uiTick: 0,
};

const byId = {};
const playerNodes = new Map();
let replayDrag = null;
let timelineCutoff = -1;
let timelineNextReleaseAt = 0;
let awayPresentationKey = null;
let awayPresentationCutoff = -1;
const storyAwayLabels = new WeakMap();
let storyRailFollowLatest = true;
let storyRailKeyboardBrowsing = false;
let storyRailScrollHolding = false;
let storyRailScrollEpoch = 0;
let storyRailFilterKey = null;
let viewerRequestSequence = 0;
let assistantApi = null;
let playerStoryUI = null;
let questionPending = false;
let querySequence = 0;
let lastAnswerMode = null;
let workspaceMedia = null;
let replayDialogReturn = null;
let replayTriggerFocus = null;
let attackDialogReturn = null;
const dialogReturnFocus = new WeakMap();
let chatReadingPosition = { top: 0, followBottom: true };
let chatScrollHolding = false;
let chatScrollEpoch = 0;

function cacheElements() {
  [
    "assistant-home", "assistant-column", "chat-host", "chat-dialog", "history-dialog", "moment-dialog", "player-dialog", "suggestions-dialog", "history-open", "suggestions-open", "player-details-open", "app", "loading", "match-viewer", "attack-replay-bar", "attack-replay-title", "attack-replay-range", "attack-replay-status", "attack-replay-toggle", "attack-replay-again", "attack-replay-return", "attack-replay-next", "player-story-dialog", "home-code", "home-name", "home-crest", "away-code", "away-name", "away-crest",
    "home-score", "away-score", "match-clock", "control-clock", "period-label", "scope-time", "legend-home",
    "legend-away", "play-toggle", "play-icon", "live-lag", "live-button", "live-state-label", "players-layer",
    "ball-layer", "event-layer", "pitch-wrap", "player-tooltip", "replay-panel", "replay-title", "replay-clock", "replay-evidence", "replay-players",
    "replay-ball", "replay-pitch", "close-replay", "replay-drag-handle", "timeline-track", "timeline-entries", "timeline-empty", "story-count", "story-through", "story-away-status", "story-filters-open", "story-filters-dialog", "story-filter-selection", "story-filter-count", "story-filter-home", "story-filter-away", "story-filter-summary", "timeline-detail", "timeline-replay",
    "selected-avatar", "selected-team", "selected-name", "selected-status", "follow-button", "context-label",
    "player-chooser-open", "player-chooser-dialog", "player-chooser-search", "player-chooser-team", "player-chooser-results", "player-chooser-count",
    "stats-grid", "comparison-card", "comparison-badge", "current-cross-rate",
    "current-cross-bar", "baseline-marker", "baseline-label", "history-sample-list", "cutoff-chip", "chat-log", "suggestions",
    "question-form", "question-input", "chat-shortcut", "catch-up-button", "assistant-mode", "tracking-label", "stream-cut-badge",
    "view-3d", "view-2d", "viewer3d-frame", "viewer3d-loading", "audience-mode", "away-toggle", "away-status", "attack-replay-phase", "offball-toggle", "replay-offball", "offball-note", "offball-observation", "evidence-play-again", "demo-open", "demo-dialog", "demo-readiness", "demo-find-turning"
  ].forEach((id) => { byId[id] = document.getElementById(id); });
}

function team(id) { return state.data.teams.find((item) => item.id === id); }
function displayTeamColor(clubOrId) {
  const club = typeof clubOrId === "string" ? team(clubOrId) : clubOrId;
  return TEAM_DISPLAY_COLORS[club?.id] || club?.primaryColor || "#667269";
}
function player(id) { return state.data.players.find((item) => item.id === id); }
function event(id) { return state.data.events.find((item) => item.id === id); }
function teamBaseline(id) { return state.data.history?.team_baselines?.find((item) => String(item.team.id) === String(id).replace("sk_team_", "")); }
function teamHistoryMatches(id) { return state.data.history?.team_matches?.filter((item) => String(item.team.id) === String(id).replace("sk_team_", "")) || []; }
function eventAvailableAt(row) { return row ? Math.max(row.t, row.q?.endMs ?? row.t, row.available_at_ms ?? row.t) : Infinity; }
function eventsUntil(time = state.time) { return state.data.events.filter((item) => eventAvailableAt(item) <= time); }
function playerEvents(id, time = state.time) { return state.data.events.filter((item) => eventAvailableAt(item) <= time && item.player === id); }
function matchEnd() { return state.data?.match?.duration_ms ?? state.data?.frames?.at(-1)?.t ?? REGULATION_END; }
function chanceChainsUntil(time = state.time) { return (state.data.analytics?.chanceChains?.chains || []).filter((item) => item.endMs <= time); }
function chanceChain(id) { return (state.data.analytics?.chanceChains?.chains || []).find((item) => item.id === id); }
function evidenceLink(eventId) { return (state.data.analytics?.evidenceIndex?.rows || []).find((item) => item.eventId === eventId); }
function highlightAvailableAt(highlight) { return Math.max(highlight.available_at_ms ?? 0, eventAvailableAt(highlightEvent(highlight))); }
function matchInsights(kind) { return state.data.analytics?.matchInsights?.[kind] || []; }
function publishedInsights(kind, cutoffMs = state.time) { return matchInsights(kind).filter((row) => Number.isSafeInteger(row.availableAtMs) && row.availableAtMs <= cutoffMs); }
function turningPoint(id, cutoffMs = state.time) { return publishedInsights("turningPoints", cutoffMs).find((row) => row.id === id); }
function modeLabel(mode) { return mode === "analyst" ? "Analyst" : "Casual"; }
function insightCopy(row, mode = state.audienceMode) { return row.copy?.[mode] || row.copy?.casual || {}; }

function frozenCopy(value) {
  const copy = structuredClone(value);
  const freeze = (item) => {
    if (item && typeof item === "object" && !Object.isFrozen(item)) {
      Object.values(item).forEach(freeze);
      Object.freeze(item);
    }
    return item;
  };
  return freeze(copy);
}

// Receipts contain the visible event/chain and a closed playback interval.
// Never look up a newer linked chain when an old answer opens its evidence.
function createReplayReceipt(eventId, cutoffMs, chainId = null) {
  const row = event(eventId);
  if (!row || eventAvailableAt(row) > cutoffMs) return null;
  const highlight = state.data.highlights.find((item) => item.anchor_event_id === eventId && highlightAvailableAt(item) <= cutoffMs);
  const link = evidenceLink(eventId);
  const candidate = chanceChain(chainId || link?.chanceChainId);
  const chain = candidate?.endMs <= cutoffMs ? candidate : null;
  const proposedStart = chain?.replayStartMs ?? (chain ? link?.replayStartMs : null) ?? highlight?.replay_start_ms ?? Math.max(0, row.t - 9000);
  const proposedEnd = chain?.replayEndMs ?? (chain ? link?.replayEndMs : null) ?? highlight?.replay_end_ms ?? row.t + 7000;
  const start = clamp(proposedStart, 0, Math.min(row.t, cutoffMs));
  const end = clamp(proposedEnd, start, cutoffMs);
  return frozenCopy({ eventId, cutoffMs, start, end, event: row, chain });
}

// A linked chain alone does not turn a single-action receipt into attack scope.
// This presentation wrapper is used only for an explicitly frozen attack.
function withAttackDisplayScope(receipt, context) {
  const chain = receipt?.chain, club = team(context.teamId);
  if (!receipt || context.scopeType !== "attack" || !club || !chain || chain.id !== context.selectedChainId || chain.teamId !== context.teamId || chain.endMs > context.cutoffMs || receipt.cutoffMs !== context.cutoffMs) return receipt;
  return frozenCopy({ ...receipt, displayScope: { kind: "attack", teamId: club.id, teamName: club.name, chainId: chain.id, startMs: receipt.start, endMs: receipt.end, cutoffMs: receipt.cutoffMs } });
}

function captureQuestionContext(cutoffMs = viewingTime()) {
  cutoffMs = Math.max(0, Math.floor(cutoffMs));
  const selectedEvent = event(state.selectedEventId);
  const visibleEvent = eventAvailableAt(selectedEvent) <= cutoffMs ? selectedEvent : null;
  const linkedId = visibleEvent ? evidenceLink(visibleEvent.id)?.chanceChainId : null;
  const selectedChain = chanceChain(state.selectedChainId || linkedId);
  const visibleChain = selectedChain?.endMs <= cutoffMs ? selectedChain : null;
  const replay = state.replay?.receipt;
  const replayContext = replay && eventAvailableAt(replay.event) <= cutoffMs
    ? (replay.cutoffMs <= cutoffMs ? replay : createReplayReceipt(replay.eventId, cutoffMs, replay.chain?.id))
    : null;
  return frozenCopy({
    cutoffMs,
    mode: state.audienceMode,
    selectedPlayerId: state.selectedPlayerId,
    selectedPlayer: player(state.selectedPlayerId),
    selectedEventId: visibleEvent?.id || null,
    selectedEvent: visibleEvent,
    selectedChainId: visibleChain?.id || null,
    selectedChain: visibleChain,
    replay: replayContext
      ? { ...replayContext, time: Math.min(state.replay.time, replayContext.end) }
      : null,
  });
}

function historyMatchesCopy(club) {
  const rows = teamHistoryMatches(club.id).slice().sort((a, b) => a.kickoff.localeCompare(b.kickoff));
  if (!rows.length) return `${club.name}: no open-data historical fixtures available.`;
  return `<strong>${club.name}</strong> (${rows.length} fixtures): ${rows.map((row) => `${row.kickoff.slice(0, 10)} vs ${row.opponent.name}`).join("; ")}.`;
}
function renderHistorySamples() {
  byId["history-sample-list"].innerHTML = state.data.teams.map((club) => `<p>${historyMatchesCopy(club)}</p>`).join("");
}

function tacticalStateAt(teamId, time = state.time) {
  const rows = state.data.analytics?.tacticalStates?.rows || [];
  for (let index = rows.length - 1; index >= 0; index -= 1) {
    if (rows[index].teamId === teamId && rows[index].asOfMs <= time) return rows[index];
  }
  return null;
}
function latestTacticalChange(teamId, time = state.time) {
  const rows = state.data.analytics?.tacticalChanges?.changes || [];
  return rows.filter((row) => row.teamId === teamId && row.detectedAtMs <= time).at(-1) || null;
}
function forecastAt(teamId, time, horizonMs) {
  const rows = state.data.analytics?.forecastSnapshots?.snapshots || [];
  return rows.filter((row) => row.defendingTeamId === teamId && row.horizonMs === horizonMs && row.cutoffMs <= time).at(-1) || null;
}
function tacticalLabel(value) { return TACTICAL_STATE_LABELS[value] || value || "not yet identified"; }
function modifierCopy(modifiers = {}) {
  const width = { narrow: "narrow", balanced: "balanced", wide: "wide" }[modifiers.width] || "unknown";
  const line = { low: "low", medium: "medium", high: "high" }[modifiers.defensiveLine] || "unknown";
  const intensity = { low: "low", medium: "medium", high: "high" }[modifiers.intensity] || "unknown";
  return `${width} width, ${line} defensive line and ${intensity} intensity`;
}

function setupMatch() {
  const { match } = state.data;
  const home = team(match.home_team_id);
  const away = team(match.away_team_id);
  byId["home-code"].textContent = home.code;
  byId["home-name"].textContent = home.name;
  byId["home-crest"].textContent = home.code[0];
  const homeColor = displayTeamColor(home);
  const awayColor = displayTeamColor(away);
  byId["home-crest"].style.background = `linear-gradient(145deg, color-mix(in srgb, ${homeColor} 66%, white), ${homeColor})`;
  byId["away-code"].textContent = away.code;
  byId["away-name"].textContent = away.name;
  byId["away-crest"].textContent = away.code[0];
  byId["away-crest"].style.background = `linear-gradient(145deg, color-mix(in srgb, ${awayColor} 72%, white), ${awayColor})`;
  byId["legend-home"].textContent = home.code;
  byId["legend-away"].textContent = away.code;
  document.documentElement.style.setProperty("--home", homeColor);
  document.documentElement.style.setProperty("--away", awayColor);
  const visibleAtStart = new Set(state.data.frames[0]?.p.map((point) => point[0]) || []);
  const defaultIndex = state.data.players.findIndex((person, index) => person.teamId === home.id && person.position !== "GK" && visibleAtStart.has(index));
  state.selectedPlayerId = state.data.players[Math.max(0, defaultIndex)]?.id || state.data.players[0]?.id;
  createPlayerNodes();
  renderHistorySamples();
  renderTimelineMarkers();
  bindControls();
  byId["play-icon"].textContent = state.playing ? "❚❚" : "▶";
  setViewMode("3d");
  renderAll(true);
  byId["timeline-detail"].hidden = true;
  byId["chat-log"].innerHTML = `<article class="message assistant-message"><div class="message-meta">Matchmind · ${formatClock(state.time)}</div><p>Choose a player or a moment, then ask about the match. Every answer keeps its own match time and evidence.</p></article>`;
  assistantApi = createAssistantApi({ matchId: state.data.match.match_id, onState: renderAssistantMode });
  renderAssistantMode();
  void assistantApi.connect().catch(() => {});
  playerStoryUI = createPlayerStoryUI({ getContext: () => ({ demo: state.data, matchInsights: state.data.analytics.matchInsights, cutoffMs: Math.floor(state.time), mode: state.audienceMode, playerId: state.followedPlayerId || state.selectedPlayerId, selectedPlayerId: state.selectedPlayerId, followedPlayerId: state.followedPlayerId }), getSession: () => assistantApi.connect(), openDialog: () => openAppDialog("player-story-dialog"), onReplay: startPlayerStoryPlaylist, formatClock });
}

function matchClockContext(time = state.time) {
  const match = state.data.match;
  const secondHalfStart = match.second_half_stream_start_ms ?? 45 * 60 * 1000;
  const secondHalf = time >= secondHalfStart;
  return {
    period: secondHalf ? 2 : 1,
    clockMs: secondHalf ? time - (match.second_half_offset_ms || 0) : time,
  };
}

function viewingTime() { return state.attackReplay?.time ?? state.time; }

function ensure3DViewer() {
  const frame = byId["viewer3d-frame"];
  if (!frame?.src) frame.src = frame.dataset.src;
}

function setViewMode(mode) {
  state.viewMode = mode === "2d" ? "2d" : "3d";
  const is3d = state.viewMode === "3d";
  byId["pitch-wrap"].classList.toggle("is-3d", is3d);
  byId["viewer3d-frame"].hidden = !is3d;
  byId["viewer3d-loading"].hidden = !is3d || state.viewer3dReady;
  byId["view-3d"].classList.toggle("active", is3d);
  byId["view-2d"].classList.toggle("active", !is3d);
  byId["view-3d"].setAttribute("aria-pressed", String(is3d));
  byId["view-2d"].setAttribute("aria-pressed", String(!is3d));
  if (is3d) {
    ensure3DViewer();
    sync3DViewer(true);
  }
}

function sync3DViewer(force = false) {
  if (state.attackReplay?.authorizing || state.attackReplay?.authorizationFailed) return;
  if (state.viewMode !== "3d" || !state.viewer3dReady) return;
  const now = performance.now();
  if (!force && now - state.viewer3dLastSync < 16) return;
  state.viewer3dLastSync = now;
  const target = byId["viewer3d-frame"].contentWindow;
  if (!target) return;
  const bounded = state.attackReplay || state.viewerReturn;
  if (bounded && !bounded.awaiting && !force) return;
  const clock = matchClockContext(viewingTime());
  const limit = bounded ? matchClockContext(bounded.end ?? bounded.time) : null;
  target.postMessage({ source: "matchmind", type: "set-time", playing: state.attackReplay ? state.attackReplay.playing && !state.attackReplay.buffering : state.viewerReturn ? false : state.playing, ...clock,
    ...(bounded ? { requestId: bounded.requestId, maxPeriod: limit.period, maxClockMs: limit.clockMs } : {}) }, location.origin);
  const person = player(state.attackReplay?.kind === "story" ? state.attackReplay.story.snapshot.player.player_id : state.selectedPlayerId);
  if (person?.sourcePlayerId != null) {
    byId["match-viewer"].dataset.viewerSelectedPlayerId = person.id;
    byId["match-viewer"].dataset.viewerSelectedSourcePlayerId = person.sourcePlayerId;
    target.postMessage({ source: "matchmind", type: "set-selected-player", playerId: person.sourcePlayerId }, location.origin);
  }
}

function handle3DViewerMessage(event) {
  const frame = byId["viewer3d-frame"];
  if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
  const message = event.data;
  if (!message || message.source !== "soccerviewer") return;
  if (message.type === "frame-presented" || message.type === "frame-buffering") {
    handleViewerPresentation(message);
    return;
  }
  if (message.type === "ready") {
    state.viewer3dReady = true;
    if (!state.attackReplay && !state.viewerReturn) byId["viewer3d-loading"].hidden = true;
    frame.contentWindow.addEventListener("keydown", handleReplayKey, true);
    if (state.autoStartPending && !state.attackReplay) {
      state.autoStartPending = false;
      state.time = STREAM_START;
      state.liveEdge = STREAM_START;
      state.playing = true;
      state.followingLive = true;
      state.lastFrameAt = performance.now();
      byId["play-icon"].textContent = "❚❚";
    }
    sync3DViewer(true);
    return;
  }
  if (message.type === "player-selected") {
    if (state.attackReplay) return;
    const person = state.data.players.find(item => Number(item.sourcePlayerId) === Number(message.playerId));
    if (person && person.id !== state.selectedPlayerId) selectPlayer(person.id);
  }
}

function setViewerMask(masked, title = "Preparing the 3D replay", detail = "Preparing this moment") {
  byId["viewer3d-loading"].hidden = !masked;
  byId["viewer3d-loading"].querySelector("strong").textContent = title;
  byId["viewer3d-loading"].querySelector("small").textContent = detail;
}

function setAttackLayout(active) {
  byId["match-viewer"].classList.toggle("is-attack-replay", active);
  document.body.classList.toggle("attack-replay-open", active);
  byId["attack-replay-bar"].hidden = !active;
  $$(".assistant-column, .timeline-card, .site-footer").forEach((node) => { node.inert = active; });
}

function nextViewerRequest() { return `matchmind-${++viewerRequestSequence}`; }

function queueAttackFrame(time, seek = false) {
  const replay = state.attackReplay;
  if (!replay) return;
  const previousPeriod = matchClockContext(replay.time).period;
  replay.time = clamp(time, replay.start, replay.end);
  replay.requestId = nextViewerRequest();
  replay.awaiting = true;
  replay.requestedAt = performance.now();
  if (seek || previousPeriod !== matchClockContext(replay.time).period) {
    replay.buffering = true;
    setViewerMask(true, "Loading attack replay", "Preparing this moment.");
  }
  sync3DViewer(true);
}

function startAttackReplay(receipt) {
  if (!receipt?.chain || !Number.isFinite(receipt.start) || !Number.isFinite(receipt.end) || !Number.isFinite(receipt.cutoffMs) || receipt.start < 0 || receipt.start > receipt.end || receipt.end > receipt.cutoffMs || receipt.chain.endMs > receipt.cutoffMs || eventAvailableAt(receipt.event) > receipt.cutoffMs) return;
  beginBoundedReplay(receipt);
}

function beginBoundedReplay(receipt, segments = null, story = null) {
  const existing = state.attackReplay;
  if (!existing) attackDialogReturn = captureDialogReturn();
  closeDialogsForReplay();
  const restore = existing?.restore || {
    time: state.time, playing: state.playing, followingLive: state.followingLive, viewMode: state.viewMode,
    selectedPlayerId: state.selectedPlayerId, selectedEventId: state.selectedEventId, selectedChainId: state.selectedChainId,
    followed: state.followed, autoStartPending: state.autoStartPending,
    scrollX: window.scrollX, scrollY: window.scrollY,
  };
  const restoreFocus = existing?.restoreFocus || document.activeElement;
  state.viewerReturn = null;
  state.replay = null;
  byId["replay-panel"].hidden = true;
  byId["stream-cut-badge"].hidden = true;
  state.attackReplay = { receipt: frozenCopy(receipt), segments: segments ? frozenCopy(segments) : null, segmentIndex: 0, restore, restoreFocus, start: receipt.start, end: receipt.end, cutoffMs: receipt.cutoffMs,
    kind: story ? "story" : segments ? "comparison" : "attack", story, authorizing: Boolean(story?.resolveClip), authorizationFailed: false, time: receipt.start, playing: !story?.resolveClip && receipt.end > receipt.start, ended: false, awaiting: true, buffering: true,
    hasPresented: false, budget: 0, presentation: byId["match-viewer"].requestFullscreen ? "requesting" : "page", requestId: nextViewerRequest(), requestedAt: performance.now() };
  setAttackLayout(true);
  setViewMode("3d");
  setViewerMask(true, "Loading attack replay", "Preparing this moment. You can return to the match.");
  if (!state.attackReplay.authorizing) queueAttackFrame(receipt.start, true);
  renderScoreAndClock();
  renderAttackControls();
  // Keep the browser fullscreen request in the trusted button click chain.
  const active = state.attackReplay;
  const viewer = byId["match-viewer"];
  if (document.fullscreenElement === viewer) active.presentation = "native";
  else if (viewer.requestFullscreen) {
    try {
      Promise.resolve(viewer.requestFullscreen({ navigationUI: "hide" })).then(() => {
        if (state.attackReplay === active) { active.presentation = document.fullscreenElement === viewer ? "native" : "page"; renderAttackControls(); }
        else if (!state.attackReplay && document.fullscreenElement === viewer) document.exitFullscreen?.().catch(() => {});
      }).catch(() => { if (state.attackReplay === active) { active.presentation = "page"; renderAttackControls(); } });
    } catch { active.presentation = "page"; }
  }
  byId["attack-replay-return"].focus({ preventScroll: true });
}

function startPlayerStoryPlaylist(snapshot, resolveClip = null, chapterId = null) {
  const chapter = chapterId ? snapshot?.chapters.find(row => row.chapter_id === chapterId) : null;
  if (chapterId && !chapter) return;
  const clips = chapter ? [chapter.clip] : snapshot?.playlist;
  if (!Array.isArray(clips) || !clips.length || clips.some((clip, index) => !Number.isSafeInteger(clip.start_ms) || !Number.isSafeInteger(clip.end_ms) || clip.start_ms < 0 || clip.start_ms >= clip.end_ms || clip.end_ms > snapshot.cutoff_ms || clip.cutoff_ms > snapshot.cutoff_ms || (index > 0 && clip.start_ms <= clips[index - 1].end_ms))) return;
  const segments = clips.map((clip) => {
    const chapterIds = clip.chapter_ids || [chapterId];
    const chapters = snapshot.chapters.filter((chapter) => chapterIds.includes(chapter.chapter_id));
    return frozenCopy({ start: clip.start_ms, end: clip.end_ms, cutoffMs: clip.cutoff_ms, eventId: clip.anchor_event_id, event: event(clip.anchor_event_id), chain: null, teamId: snapshot.player.team_id, phase: "chapter", storyTitle: snapshot.player.name, chapterIds, chapterNumbers: chapters.map((chapter) => snapshot.chapters.indexOf(chapter) + 1), chapterCount: snapshot.chapters.length, chapterTitle: chapters.map((chapter) => chapter.title).join(" · ") });
  });
  // Enter fullscreen synchronously from Replay. Stored/shared clips remain masked until authorized.
  beginBoundedReplay(segments[0], segments, { snapshot: frozenCopy(snapshot), resolveClip, chapterId });
  const active = state.attackReplay;
  if (resolveClip) void (async () => {
    try {
      for (const clip of clips) { if (state.attackReplay !== active) return; await resolveClip(clip); }
      if (state.attackReplay !== active) return;
      active.authorizing = false;
      active.playing = active.end > active.start;
      queueAttackFrame(active.start, true);
      renderAttackControls();
    } catch {
      if (state.attackReplay !== active) return;
      active.authorizing = false; active.authorizationFailed = true; active.playing = false;
      setViewerMask(true, "Story clips are unavailable", "The saved or shared story could not be authorized. Return to match and reopen the story to try again.");
      renderAttackControls();
    }
  })();
}

function advanceComparisonSegment() {
  const replay = state.attackReplay;
  if (!replay?.segments || replay.segmentIndex + 1 >= replay.segments.length) return false;
  const next = replay.segments[++replay.segmentIndex];
  replay.receipt = next;
  Object.assign(replay, { start: next.start, end: next.end, time: next.start, ended: false, hasPresented: false, awaiting: true, buffering: true, budget: 0 });
  queueAttackFrame(next.start, true);
  renderAttackControls();
  return true;
}

function replayAgain() {
  const replay = state.attackReplay;
  if (!replay) return;
  if (replay.kind === "story") startPlayerStoryPlaylist(replay.story.snapshot, replay.story.resolveClip, replay.story.chapterId);
  else if (replay.segments) beginBoundedReplay(replay.segments[0], replay.segments);
  else startAttackReplay(replay.receipt);
}

function returnToMatch() {
  const replay = state.attackReplay;
  if (!replay) return;
  const saved = replay.restore;
  state.attackReplay = null;
  Object.assign(state, { time: saved.time, playing: saved.playing, followingLive: saved.followingLive && state.liveEdge - saved.time < 120,
    selectedPlayerId: saved.selectedPlayerId, selectedEventId: saved.selectedEventId, selectedChainId: saved.selectedChainId,
    followed: saved.followed, autoStartPending: saved.autoStartPending, gapStartedAt: null });
  state.lastFrameAt = performance.now();
  setAttackLayout(false);
  if (saved.viewMode === "3d") {
    state.viewerReturn = { time: saved.time, end: saved.time, requestId: nextViewerRequest(), awaiting: true };
    setViewMode("3d");
    setViewerMask(true, "Returning to match", `Restoring ${formatClock(saved.time)} and your original playback state.`);
    sync3DViewer(true);
  } else { state.viewerReturn = null; setViewMode(saved.viewMode); }
  byId["play-icon"].textContent = saved.playing ? "❚❚" : "▶";
  if (document.fullscreenElement === byId["match-viewer"]) document.exitFullscreen?.().catch(() => {});
  renderAll(true);
  requestAnimationFrame(() => {
    window.scrollTo(saved.scrollX, saved.scrollY);
    if (attackDialogReturn) { restoreDialogReturn(attackDialogReturn); attackDialogReturn = null; }
    else if (replay.restoreFocus?.isConnected) replay.restoreFocus.focus({ preventScroll: true });
  });
}

function handleReplayKey(event) {
  if (!state.attackReplay) return;
  if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); returnToMatch(); }
  else if (event.code === "Space" && !/INPUT|TEXTAREA|BUTTON/.test(event.target?.tagName || "")) {
    event.preventDefault(); event.stopImmediatePropagation(); toggleAttackReplay();
  }
}

function toggleAttackReplay() {
  const replay = state.attackReplay;
  if (!replay || replay.ended || replay.authorizing || replay.authorizationFailed) return;
  replay.playing = !replay.playing;
  replay.budget = 0;
  sync3DViewer(true);
  renderAttackControls();
}

function handleViewerPresentation(message) {
  const pending = state.attackReplay || state.viewerReturn;
  if (!pending || pending.requestId !== message.requestId || !pending.awaiting) return;
  if (message.type === "frame-buffering") {
    if (state.attackReplay) { pending.buffering = true; pending.budget = 0; renderAttackControls(); }
    setViewerMask(true, state.attackReplay ? "Loading attack replay" : "Returning to match", "Preparing this moment.");
    return;
  }
  const target = matchClockContext(pending.time);
  if (message.period !== target.period || !Number.isFinite(message.renderedClockMs) || message.renderedClockMs < 0 || message.renderedClockMs > target.clockMs + 1) return;
  pending.awaiting = false;
  pending.buffering = false;
  pending.hasPresented = true;
  pending.presentedRequestId = message.requestId;
  pending.renderedClockMs = message.renderedClockMs;
  pending.renderedPeriod = message.period;
  pending.hasFrameGap = target.clockMs - message.renderedClockMs > 1500;
  setViewerMask(false);
  if (state.attackReplay) {
    if (pending.time >= pending.end) {
      if (advanceComparisonSegment()) return;
      pending.ended = true; pending.playing = false; pending.budget = 0; sync3DViewer(true);
    }
    renderAttackControls();
  } else { state.viewerReturn = null; state.lastFrameAt = performance.now(); }
}

function advanceAttackReplay(delta) {
  const replay = state.attackReplay;
  if (!replay) return;
  if (replay.playing && replay.hasPresented && !replay.buffering) replay.budget = Math.min(100, replay.budget + delta);
  if (!replay.awaiting && replay.playing && !replay.ended && replay.budget > 0) {
    const next = Math.min(replay.end, replay.time + replay.budget);
    replay.budget = 0;
    queueAttackFrame(next);
  }
  renderAttackControls();
}

function renderAttackControls() {
  const replay = state.attackReplay;
  if (!replay) return;
  const viewer = byId["match-viewer"];
  Object.assign(viewer.dataset, { startMs: replay.start, endMs: replay.end, cutoffMs: replay.cutoffMs, playheadMs: replay.time,
    restoreTimeMs: replay.restore.time, restorePlaying: replay.restore.playing, requestId: replay.requestId,
    presentedRequestId: replay.presentedRequestId || "", renderedClockMs: replay.renderedClockMs ?? "", renderedPeriod: replay.renderedPeriod ?? "",
    buffering: replay.buffering, awaitingFrame: replay.awaiting, presentation: replay.presentation, replayKind: replay.kind, storyPlayerId: replay.story?.snapshot.player.player_id || "", chapterIds: replay.receipt.chapterIds?.join(",") || "", segment: replay.receipt.phase || "attack", segmentIndex: replay.segmentIndex });
  byId["attack-replay-phase"].hidden = !replay.segments;
  byId["attack-replay-phase"].textContent = replay.kind === "story" ? `CHAPTER ${replay.receipt.chapterNumbers.join("–")} / ${replay.receipt.chapterCount} · Clip ${replay.segmentIndex + 1} / ${replay.segments.length}` : replay.segments ? `${replay.receipt.phase === "before" ? "BEFORE" : "AFTER"} · ${replay.segmentIndex + 1} / ${replay.segments.length}` : "";
  byId["attack-replay-title"].textContent = replay.kind === "story" ? `${replay.receipt.storyTitle} · ${replay.receipt.chapterTitle}` : `${team(replay.receipt.chain?.teamId || replay.receipt.teamId).name} · ${replay.segments ? "Observed change" : "Attack replay"}`;
  byId["attack-replay-range"].textContent = `${formatClock(replay.start)}–${formatClock(replay.end)} · frozen through ${formatClock(replay.cutoffMs)}`;
  const mode = replay.presentation === "native" ? "Fullscreen" : replay.presentation === "requesting" ? "Entering fullscreen" : "Page screen · browser fullscreen unavailable";
  const delayed = replay.awaiting && performance.now() - replay.requestedAt > 10000;
  const status = `${formatClock(replay.time)} · ${replay.authorizing ? "Checking saved story clips" : replay.authorizationFailed ? "Story unavailable — return to match" : replay.ended ? "Replay complete — play again or return to match" : delayed ? "3D loading is taking longer — you can return to match" : replay.buffering ? "Loading 3D tracking" : replay.hasFrameGap ? "Tracking gap — last available position held" : replay.playing ? "Playing" : "Paused"} · ${mode}`;
  if (byId["attack-replay-status"].textContent !== status) byId["attack-replay-status"].textContent = status;
  byId["attack-replay-toggle"].textContent = replay.playing ? "Pause" : "Play";
  byId["attack-replay-toggle"].disabled = replay.ended || replay.authorizing || replay.authorizationFailed;
  byId["attack-replay-next"].hidden = replay.kind !== "story";
  byId["attack-replay-next"].disabled = replay.authorizing || replay.authorizationFailed || replay.segmentIndex + 1 >= (replay.segments?.length || 0);
  byId["attack-replay-again"].hidden = !replay.ended;
}

function createSvg(tag, attributes = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function createPlayerNodes() {
  state.data.players.forEach((person, index) => {
    const group = createSvg("g", { class: "player-node", tabindex: "0", role: "button", "aria-label": `${person.name}，${person.position}` });
    const motion = createSvg("line", { class: "player-motion", x1: "0", y1: "0", x2: "0", y2: "0" });
    const ring = createSvg("circle", { class: "player-ring", r: "18" });
    const disc = createSvg("circle", { class: "player-disc", r: "13", fill: displayTeamColor(person.teamId) });
    const direction = createSvg("polygon", { class: "player-direction", points: "24,0 17,-4.5 17,4.5", "aria-hidden": "true" });
    const label = createSvg("text", { class: "player-label", y: "1" });
    label.textContent = person.number;
    group.append(motion, ring, disc, direction, label);
    group.style.display = "none";
    group.addEventListener("click", () => selectPlayer(person.id));
    group.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectPlayer(person.id); }
    });
    group.addEventListener("pointerenter", () => showPlayerTooltip(person, group));
    group.addEventListener("pointerleave", hidePlayerTooltip);
    byId["players-layer"].append(group);
    playerNodes.set(index, { group, ring, motion, direction });
  });
}

function frameBounds(time) {
  const frames = state.data.frames;
  const boundedTime = clamp(time, frames[0].t, frames.at(-1).t);
  let low = 0;
  let high = frames.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (frames[middle].t <= boundedTime) low = middle;
    else high = middle - 1;
  }
  const a = frames[low];
  const b = frames[Math.min(low + 1, frames.length - 1)];
  return { a, b, boundedTime };
}

function nextReliableTrackingTime(time) {
  const frames = state.data.frames;
  let low = 0;
  let high = frames.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (frames[middle].t <= time) low = middle + 1;
    else high = middle;
  }
  for (let index = low; index < frames.length; index += 1) {
    if ((frames[index].q ?? 1) !== 0) return frames[index].t;
  }
  return state.allFramesLoaded ? matchEnd() : null;
}

function skipUnavailableTracking(now) {
  if (frameAt(state.time).q !== 0) {
    state.gapStartedAt = null;
    return false;
  }
  const nextTime = nextReliableTrackingTime(state.time);
  if (nextTime == null || nextTime - state.time < 1500) return false;
  if (state.gapStartedAt == null) {
    state.gapStartedAt = now;
    return false;
  }
  if (now - state.gapStartedAt < 450) return false;
  const from = state.time;
  state.time = nextTime;
  state.liveEdge = Math.max(state.liveEdge, nextTime);
  state.followingLive = true;
  state.gapStartedAt = null;
  state.gapNoticeUntil = now + 1500;
  state.lastGapSkip = { from, to: nextTime };
  return true;
}

function lerp(a, b, ratio) { return a + (b - a) * ratio; }
function lerpAngle(a, b, ratio) {
  const delta = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + delta * ratio;
}
function hermite(positionA, velocityA, positionB, velocityB, ratio, durationSeconds) {
  const r2 = ratio * ratio;
  const r3 = r2 * ratio;
  const h00 = 2 * r3 - 3 * r2 + 1;
  const h10 = r3 - 2 * r2 + ratio;
  const h01 = -2 * r3 + 3 * r2;
  const h11 = r3 - r2;
  return h00 * positionA + h10 * velocityA * durationSeconds + h01 * positionB + h11 * velocityB * durationSeconds;
}

function frameAt(time, maxTime = Infinity) {
  const bounds = frameBounds(Math.min(time, maxTime));
  const { a, boundedTime } = bounds;
  // Interpolation may use the next 10 Hz sample only if that sample was
  // available at this receipt's cutoff.
  const b = bounds.b.t <= maxTime ? bounds.b : a;
  const ratio = clamp((time - a.t) / Math.max(1, b.t - a.t), 0, 1);
  const durationSeconds = Math.max(0.001, (b.t - a.t) / 1000);
  const nextPlayers = new Map(b.p.map((point) => [point[0], point]));
  const positions = a.p.map((point) => {
    const next = nextPlayers.get(point[0]) || point;
    const hasPhysics = point.length >= 11 && next.length >= 11;
    const x = hasPhysics ? hermite(point[1], point[4], next[1], next[4], ratio, durationSeconds) : lerp(point[1], next[1], ratio);
    const y = hasPhysics ? hermite(point[2], point[5], next[2], next[5], ratio, durationSeconds) : lerp(point[2], next[2], ratio);
    return [
      point[0], clamp(x, 0, 105), clamp(y, 0, 68), lerp(point[3], next[3], ratio),
      lerp(point[4] || 0, next[4] || 0, ratio), lerp(point[5] || 0, next[5] || 0, ratio),
      lerp(point[6] || 0, next[6] || 0, ratio), lerp(point[7] || 0, next[7] || 0, ratio),
      lerpAngle(point[8] || 0, next[8] || 0, ratio), lerp(point[9] || 0, next[9] || 0, ratio),
      ratio < 0.5 ? point[10] : next[10],
      ratio < 0.5 ? point[11] : next[11],
    ];
  });
  const ballHasPhysics = a.b.length >= 9 && b.b.length >= 9;
  const ballX = ballHasPhysics ? hermite(a.b[0], a.b[4], b.b[0], b.b[4], ratio, durationSeconds) : lerp(a.b[0], b.b[0], ratio);
  const ballY = ballHasPhysics ? hermite(a.b[1], a.b[5], b.b[1], b.b[5], ratio, durationSeconds) : lerp(a.b[1], b.b[1], ratio);
  const ballZ = ballHasPhysics ? hermite(a.b[3], a.b[6], b.b[3], b.b[6], ratio, durationSeconds) : 0;
  return {
    t: boundedTime,
    b: [
      clamp(ballX, 0, 105), clamp(ballY, 0, 68), ratio < 0.5 ? a.b[2] : b.b[2], clamp(ballZ, 0, 6),
      lerp(a.b[4] || 0, b.b[4] || 0, ratio), lerp(a.b[5] || 0, b.b[5] || 0, ratio),
      lerp(a.b[6] || 0, b.b[6] || 0, ratio), lerp(a.b[7] || 0, b.b[7] || 0, ratio),
      lerp(a.b[8] || 0, b.b[8] || 0, ratio),
    ],
    p: positions,
    c: ratio < 0.5 ? a.c : b.c,
    q: ratio < 0.5 ? (a.q ?? 1) : (b.q ?? 1),
  };
}

function pitchX(x, mini = false) { return (mini ? 10 : 20) + (x / 105) * (mini ? 505 : 1010); }
function pitchY(y, mini = false) { return (mini ? 10 : 20) + (y / 68) * (mini ? 320 : 640); }
function playerPointAt(playerId, time = state.time) {
  const index = state.data.players.findIndex((item) => item.id === playerId);
  return frameAt(time).p.find((point) => point[0] === index);
}
function renderPitch(time = state.time) {
  const frame = frameAt(time);
  const trackingAvailable = frame.q !== 0;
  byId["tracking-label"].classList.toggle("tracking-gap", !trackingAvailable);
  byId["tracking-label"].textContent = !trackingAvailable
    ? "Position unavailable · last view held"
    : state.allFramesLoaded
      ? "Match replay"
      : `Loading replay · ${Math.max(10, state.bufferPercent)}%`;
  const cutBadge = byId["stream-cut-badge"];
  if (performance.now() < state.gapNoticeUntil && state.lastGapSkip) {
    const skippedSeconds = Math.max(1, Math.round((state.lastGapSkip.to - state.lastGapSkip.from) / 1000));
    cutBadge.textContent = `Skipped ${skippedSeconds}s without tracking`;
    cutBadge.hidden = false;
  } else {
    cutBadge.hidden = true;
  }
  const visible = new Set();
  frame.p.forEach((point) => {
    const [index, x, y, , vx, vy, speed, , facing, , , isDetected] = point;
    const node = playerNodes.get(index);
    if (!node) return;
    visible.add(index);
    node.group.style.display = "";
    node.group.setAttribute("transform", `translate(${pitchX(x)} ${pitchY(y)})`);
    const selected = state.data.players[index].id === state.selectedPlayerId;
    node.ring.classList.toggle("selected", selected);
    node.direction.classList.toggle("selected", selected);
    node.group.classList.toggle("extrapolated", !isDetected);
    const directionDegrees = (facing || 0) * 180 / Math.PI;
    const showDirection = trackingAvailable && speed >= 0.8;
    node.direction.setAttribute("transform", `rotate(${directionDegrees.toFixed(2)})`);
    node.direction.style.opacity = showDirection ? String(clamp((speed - 0.45) / 2.5, 0.35, 1)) : "0";
    const trailScale = speed ? Math.min(26, 6 + speed * 2.6) / speed : 0;
    node.motion.setAttribute("x2", (-vx * trailScale).toFixed(2));
    node.motion.setAttribute("y2", (-vy * trailScale).toFixed(2));
    node.motion.style.opacity = trackingAvailable && speed >= 0.8 ? String(clamp((speed || 0) / 9, 0.12, 0.58)) : "0";
  });
  playerNodes.forEach((node, index) => { if (!visible.has(index)) node.group.style.display = "none"; });
  const ballX = pitchX(frame.b[0]);
  const ballY = pitchY(frame.b[1]);
  const lift = (frame.b[3] || 0) * 9;
  const ballVisualY = ballY - lift;
  const speedScale = frame.b[7] ? Math.min(80, frame.b[7] * 2.2) / frame.b[7] : 0;
  const trailX = ballX - (frame.b[4] || 0) * speedScale;
  const trailY = ballVisualY - (frame.b[5] || 0) * speedScale;
  const radius = 7 + Math.min(3, (frame.b[3] || 0) * 0.7);
  byId["ball-layer"].innerHTML = `
    <line class="ball-speed-trail" x1="${trailX}" y1="${trailY}" x2="${ballX}" y2="${ballVisualY}" opacity="${clamp((frame.b[7] || 0) / 34, 0, .75)}" />
    <ellipse class="ball-shadow" cx="${ballX}" cy="${ballY}" rx="${7 + lift * .12}" ry="${4 + lift * .05}" />
    ${lift > 1 ? `<line class="ball-flight-line" x1="${ballX}" y1="${ballY}" x2="${ballX}" y2="${ballVisualY}" />` : ""}
    <circle class="ball-dot" cx="${ballX}" cy="${ballVisualY}" r="${radius}" />`;

  const latestShot = [...state.data.events].reverse().find((item) => item.type === "shot" && eventAvailableAt(item) <= time && time - item.t < 6500);
  if (latestShot) {
    byId["event-layer"].innerHTML = `<circle cx="${pitchX(latestShot.x)}" cy="${pitchY(latestShot.y)}" r="29" fill="none" stroke="#b8ff57" stroke-width="3" opacity=".72"/><line x1="${pitchX(latestShot.x)}" y1="${pitchY(latestShot.y)}" x2="${pitchX(latestShot.ex)}" y2="${pitchY(latestShot.ey)}" stroke="#b8ff57" stroke-width="3" stroke-dasharray="7 7" opacity=".72"/>`;
  } else {
    byId["event-layer"].innerHTML = "";
  }
}

function showPlayerTooltip(person, node) {
  const matrix = node.getScreenCTM();
  const wrap = byId["pitch-wrap"].getBoundingClientRect();
  if (!matrix) return;
  const point = playerPointAt(person.id);
  const trackingStatus = point ? (point[11] ? "Camera-detected" : "Provider-extrapolated") : "Not in the current tracking frame";
  byId["player-tooltip"].innerHTML = `<strong>${person.name}</strong><span>#${person.number} · ${person.position} · ${trackingStatus}</span>`;
  byId["player-tooltip"].style.left = `${matrix.e - wrap.left + 18}px`;
  byId["player-tooltip"].style.top = `${matrix.f - wrap.top - 46}px`;
  byId["player-tooltip"].hidden = false;
}

function hidePlayerTooltip() { byId["player-tooltip"].hidden = true; }

function scoresAt(time) {
  const goals = state.data.events.filter((item) => item.type === "shot" && item.outcome === "goal" && eventAvailableAt(item) <= time);
  return {
    home: goals.filter((item) => item.team === state.data.match.home_team_id).length,
    away: goals.filter((item) => item.team === state.data.match.away_team_id).length,
  };
}

function calculatePlayerStats(playerId, time = state.time) {
  const rows = playerEvents(playerId, time);
  const passes = rows.filter((item) => item.type === "pass");
  const crosses = passes.filter((item) => ["cross", "cutback"].includes(item.q?.pass_type));
  const shots = rows.filter((item) => item.type === "shot");
  const passKnown = passes.filter(item => ["complete", "incomplete"].includes(item.outcome));
  const crossKnown = crosses.filter(item => ["complete", "incomplete"].includes(item.outcome));
  const completedPasses = passKnown.filter(item => item.outcome === "complete").length;
  const completedCrosses = crossKnown.filter(item => item.outcome === "complete").length;
  const estimatedShots = shots.filter(item => validXg(item.q?.xg));
  return {
    passes: passes.length,
    completedPasses,
    passOutcomesKnown: passKnown.length,
    passCompletion: passKnown.length ? completedPasses / passKnown.length : null,
    crosses: crosses.length,
    completedCrosses,
    crossOutcomesKnown: crossKnown.length,
    crossCompletion: crossKnown.length ? completedCrosses / crossKnown.length : null,
    shots: shots.length,
    shotsOnTarget: shots.filter((item) => ["saved", "goal"].includes(item.outcome)).length,
    xgSample: estimatedShots.length,
    xg: estimatedShots.length === shots.length ? Number(estimatedShots.reduce((sum, item) => sum + item.q.xg, 0).toFixed(3)) : null,
    goals: shots.filter((item) => item.outcome === "goal").length,
    cards: rows.filter((item) => item.type === "card").length,
  };
}

function renderPlayerPanel() {
  const person = player(state.selectedPlayerId);
  if (!person) return;
  const club = team(person.teamId);
  const stats = calculatePlayerStats(person.id);
  const currentFrame = frameAt(state.time);
  byId["selected-avatar"].textContent = person.number;
  byId["selected-avatar"].style.background = `linear-gradient(145deg, color-mix(in srgb, ${displayTeamColor(club)} 68%, white), ${displayTeamColor(club)})`;
  byId["selected-team"].textContent = `${club.name} · ${person.position}`;
  byId["selected-name"].textContent = person.name;
  byId["player-chooser-open"].textContent = "Change player";
  const currentPoint = currentFrame.p.find((point) => state.data.players[point[0]]?.id === person.id);
  const positionStatus = currentFrame.q === 0 || !currentPoint ? "Position unavailable" : currentPoint[11] ? "Observed position" : "Estimated position";
  byId["selected-status"].textContent = `${positionStatus} · through ${formatClock(state.time)}`;
  byId["context-label"].textContent = `Ask about ${person.name}`;
  byId["stats-grid"].innerHTML = [
    [stats.passes, "Recorded passes"],
    [stats.passCompletion == null ? "Unavailable" : percent(stats.passCompletion), `Completion · n=${stats.passOutcomesKnown} known`],
    [formatXg(stats.xg), stats.xg == null ? `Est. xG · ${stats.xgSample}/${stats.shots} valid` : `Est. xG · ${stats.shots} shots`],
  ].map(([value, label]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join("");
  const currentRate = stats.passCompletion;
  const baseline = Number.isFinite(person.baseline?.pass_completion) && person.baseline.passes_attempted_per90 > 0 ? person.baseline.pass_completion : null;
  byId["current-cross-rate"].textContent = currentRate == null ? "Unavailable" : samplePercent(currentRate);
  byId["current-cross-bar"].style.width = `${(currentRate ?? 0) * 100}%`;
  byId["current-cross-bar"].style.background = "var(--sport-green)";
  byId["baseline-marker"].hidden = baseline == null || currentRate == null;
  byId["baseline-marker"].style.left = `${(baseline ?? 0) * 100}%`;
  byId["baseline-label"].textContent = `Selected open sample · ${person.baseline?.match_count ?? 0} appearances · ${samplePercent(baseline)}`;
  byId["comparison-badge"].textContent = !stats.passes ? "0 recorded passes" : currentRate == null ? "Pass outcomes unavailable" : baseline == null ? "No personal comparison" : `Descriptive only · ${stats.passOutcomesKnown} known outcomes`;
}

function selectPlayer(id) {
  state.selectedPlayerId = id;
  // A fresh player selection starts a new question context. Old answer/replay
  // receipts remain closed snapshots and are not rewritten by this selection.
  state.selectedEventId = null;
  state.selectedChainId = null;
  byId["timeline-detail"].hidden = true;
  $$(".timeline-marker, .timeline-chain").forEach((node) => node.classList.remove("selected"));
  state.followed = state.followedPlayerId === id;
  byId["follow-button"].setAttribute("aria-pressed", String(state.followed));
  byId["follow-button"].textContent = state.followed ? "✓ Following" : "＋ Follow";
  renderPlayerPanel();
  applyTimelineFilter();
  renderPitch();
  // The selected-player panel already confirms this change; avoid chat noise.
  sync3DViewer(true);
}

function renderPlayerChooser() {
  const query = byId["player-chooser-search"].value.trim().toLocaleLowerCase("en"), numeric = /^#?\d+$/.test(query);
  const teamId = byId["player-chooser-team"].value;
  const rows = state.data.players.filter(person => (!teamId || person.teamId === teamId)
    && (!query || (numeric ? person.number != null && Number(person.number) === Number(query.replace("#", ""))
      : `${person.name} ${person.fullName || ""} ${person.position || ""}`.toLocaleLowerCase("en").includes(query))));
  byId["player-chooser-count"].textContent = `${rows.length} ${rows.length === 1 ? "player" : "players"}`;
  const list = byId["player-chooser-results"];
  list.replaceChildren();
  for (const person of rows) {
    const club = team(person.teamId), selected = person.id === state.selectedPlayerId;
    const row = document.createElement("div"); row.className = "player-choice"; row.dataset.playerId = person.id; row.dataset.selected = String(selected);
    const number = document.createElement("span"); number.className = "player-choice-number"; number.textContent = person.number ?? "–"; number.style.setProperty("--team-color", displayTeamColor(club));
    const identity = document.createElement("div"); identity.className = "player-choice-identity";
    const name = document.createElement("strong"); name.textContent = person.fullName || person.name;
    const detail = document.createElement("span"); detail.textContent = `${club?.name || "Team unavailable"} · ${person.position || "Position unavailable"}`;
    identity.append(name, detail);
    const button = document.createElement("button"); button.type = "button"; button.dataset.playerSelect = person.id; button.textContent = selected ? "Selected" : "Select"; button.disabled = selected;
    button.setAttribute("aria-label", `${selected ? "Selected" : "Select"} ${person.fullName || person.name}, number ${person.number ?? "unavailable"}`);
    button.addEventListener("click", () => {
      if (!player(person.id)) return;
      selectPlayer(person.id);
      byId["player-chooser-dialog"].close();
    });
    row.append(number, identity, button); list.append(row);
  }
  if (!rows.length) { const empty = document.createElement("p"); empty.className = "player-chooser-empty"; empty.textContent = "No players match this search."; list.append(empty); }
}

function openPlayerChooser() {
  byId["player-chooser-search"].value = "";
  byId["player-chooser-team"].replaceChildren(new Option("Both teams", ""), ...state.data.teams.map(club => new Option(club.name, club.id)));
  renderPlayerChooser();
  openAppDialog("player-chooser-dialog", byId["player-chooser-search"]);
}

function renderScoreAndClock() {
  const time = viewingTime();
  const clock = formatClock(time);
  const score = scoresAt(time);
  const lagMs = Math.max(0, state.liveEdge - state.time);
  const duration = matchEnd();
  byId["match-clock"].textContent = clock;
  byId["control-clock"].textContent = clock;
  byId["scope-time"].textContent = state.attackReplay ? `Frozen ${formatClock(state.attackReplay.cutoffMs)}` : `Through ${clock}`;
  byId["cutoff-chip"].textContent = `Through ${clock}`;
  const secondHalfStart = state.data.match.second_half_stream_start_ms ?? 45 * 60 * 1000;
  byId["period-label"].textContent = time < secondHalfStart ? "FIRST HALF · HISTORICAL REPLAY" : time >= duration ? "FULL TIME · HISTORICAL REPLAY" : "SECOND HALF · HISTORICAL REPLAY";
  byId["home-score"].textContent = score.home;
  byId["away-score"].textContent = score.away;
  byId["live-lag"].textContent = lagMs < 1000 ? "At replay edge" : `${Math.ceil(lagMs / 1000)}s behind replay edge`;
  byId["live-state-label"].textContent = state.attackReplay ? "ATTACK REPLAY" : !state.playing ? "PAUSED" : "REPLAY";
  byId["play-toggle"].setAttribute("aria-label", state.playing ? "Pause historical replay" : "Play historical replay");
  if (state.attackReplay) { renderAwayPresentation(); return; }
  byId["story-through"].textContent = `Known interval 0:00 → ${clock}`;
  if (state.time < timelineCutoff || state.time >= timelineNextReleaseAt) renderTimelineMarkers();
  renderAwayPresentation();
}

function highlightEvent(highlight) { return event(highlight.anchor_event_id); }
function highlightClass(label = "") {
  const lower = label.toLowerCase();
  if (lower.includes("goal")) return "goal";
  if (lower.includes("card")) return "card";
  return "chance";
}

function insightMetricLabel(key) {
  return ({ centroid_x_m: "Team centre (m)", defensive_line_x_m: "Defensive line (m)", possession_share: "Possession phase share", attacking_third_share: "Attacking-third share", long_pass_share: "Long-pass share", pressure_actions_per_minute: "Pressure actions / min" })[key] || key.replaceAll("_", " ");
}
function insightMetricValue(value, unit) {
  return Number.isFinite(value) ? `${value.toFixed(2)}${unit === "%" ? "%" : unit ? ` ${escapeHtml(unit)}` : ""}` : "Unavailable";
}
function selectTurningPoint(id, play = false) {
  const row = turningPoint(id);
  if (!row) return;
  const copy = insightCopy(row), afterEvent = event(row.clips?.after?.anchorEventId);
  const related = publishedInsights("attacks").find((attack) => attack.teamId === row.teamId && attack.startMs >= row.before.startMs && attack.endMs <= row.after.endMs);
  state.selectedEventId = related?.clip?.anchorEventId || afterEvent?.id || null;
  state.selectedChainId = related?.chainId || null;
  const metrics = (row.metrics || []).map((metric) => `<dt>${escapeHtml(insightMetricLabel(metric.key))}</dt><dd>${insightMetricValue(metric.before, metric.unit)}</dd><dd>${insightMetricValue(metric.after, metric.unit)}</dd>`).join("");
  byId["timeline-detail"].hidden = false;
  byId["timeline-detail"].innerHTML = `<span class="detail-time">${formatClock(row.availableAtMs)}</span><div><strong>${escapeHtml(copy.title || "Observed turning point")}</strong><p>${escapeHtml(copy.body || `${tacticalLabel(row.fromState)} → ${tacticalLabel(row.toState)}`)}</p><p>Before ${formatClock(row.before.startMs)}–${formatClock(row.before.endMs)} · After ${formatClock(row.after.startMs)}–${formatClock(row.after.endMs)}. Candidate from ${formatClock(row.effectiveFromMs)}, confirmed and published ${formatClock(row.availableAtMs)}; observed change, not proof of cause.</p><details class="turning-metrics" ${state.audienceMode === "analyst" ? "open" : ""}><summary>Compare the same observed metrics</summary><dl class="insight-metrics"><dt class="metric-heading">Metric</dt><dd class="metric-heading">Before</dd><dd class="metric-heading">After</dd>${metrics}</dl><p>Source-available tracking: ${percent(row.quality.before.trackingCoverage)} (${row.quality.before.trackedSamples}/${row.quality.before.expectedSamples} samples) before; ${percent(row.quality.after.trackingCoverage)} (${row.quality.after.trackedSamples}/${row.quality.after.expectedSamples}) after. Rule confidence ${row.confidence.toFixed(4)} is not a calibrated probability. This is a small descriptive event sample, not camera-only or causal evidence.</p></details><p>${escapeHtml((row.limitations || []).join(" "))}</p><div class="moment-actions"><button id="timeline-replay">Replay Before / After</button>${state.selectedChainId ? '<button id="explain-attack">Explain the completed attack</button>' : ""}</div></div>`;
  byId["timeline-detail"].querySelector("#timeline-replay").addEventListener("click", () => startTurningReplay(id));
  const explain = byId["timeline-detail"].querySelector("#explain-attack");
  if (explain && related) { explain.textContent = `Explain the ${formatClock(related.startMs)}–${formatClock(related.endMs)} attack`; explain.addEventListener("click", () => explainAttack(related.chainId)); }
  if (play) startTurningReplay(id);
}

function createTurningReplay(id, cutoffMs = state.time) {
  const row = turningPoint(id, cutoffMs);
  if (!row || row.before.endMs > row.after.startMs || row.after.endMs > row.availableAtMs) return null;
  const segments = ["before", "after"].map((phase) => {
    const clip = row.clips?.[phase], anchor = event(clip?.anchorEventId);
    if (!clip || !anchor || !Number.isSafeInteger(clip.startMs) || !Number.isSafeInteger(clip.endMs) || !Number.isSafeInteger(clip.cutoffMs) || clip.startMs < 0 || clip.endMs <= clip.startMs || clip.startMs !== row[phase].startMs || clip.endMs !== row[phase].endMs || clip.endMs > cutoffMs || clip.cutoffMs < clip.endMs || clip.cutoffMs > cutoffMs || eventAvailableAt(anchor) > clip.endMs) return null;
    return { kind: "comparison", insightId: row.id, teamId: row.teamId, phase, eventId: anchor.id, event: anchor, chain: null, cutoffMs, start: clip.startMs, end: clip.endMs };
  });
  return segments.every(Boolean) ? frozenCopy({ id, cutoffMs, segments }) : null;
}
function startTurningReplay(id) {
  const comparison = createTurningReplay(id);
  if (comparison) beginBoundedReplay(comparison.segments[0], comparison.segments);
}

function refreshInsightPresentation() {
  $$(".timeline-turning-point").forEach((button) => {
    const row = turningPoint(button.dataset.insightId);
    if (!row) return;
    const copy = insightCopy(row);
    button.querySelector("strong").textContent = copy.title || "Observed turning point";
    button.querySelector(".story-fact").textContent = copy.body || `${tacticalLabel(row.fromState)} → ${tacticalLabel(row.toState)}`;
  });
  const available = publishedInsights("turningPoints");
  byId["demo-find-turning"].disabled = available.length === 0;
  byId["demo-readiness"].textContent = available.length ? `${available.length} published turning ${available.length === 1 ? "point is" : "points are"} available through ${formatClock(state.time)}. Open a moment to inspect its evidence.` : `No change meets the comparison requirements through ${formatClock(state.time)}.`;
}

function renderTimelineMarkers() {
  const cutoff = state.time;
  const feed = byId["timeline-entries"];
  const followLatest = storyRailFollowLatest && storyRailAtEnd();
  if (cutoff < timelineCutoff) feed.replaceChildren();
  const existing = new Set($$(".story-card").map((node) => node.dataset.storyKey));
  const nextReleases = [];
  const published = [];
  matchInsights("turningPoints").forEach((insight) => {
    if (insight.availableAtMs > cutoff) { nextReleases.push(insight.availableAtMs); return; }
    published.push({ kind: "turning", at: insight.availableAtMs, key: `turning:${insight.id}`, insight });
  });
  (state.data.analytics?.chanceChains?.chains || []).forEach((chain) => {
    if (chain.endMs > cutoff) { nextReleases.push(chain.endMs); return; }
    published.push({ kind: "chain", at: chain.endMs, key: `chain:${chain.id}`, chain });
  });
  state.data.highlights.forEach((highlight) => {
    const row = highlightEvent(highlight);
    if (!row) return;
    const at = highlightAvailableAt(highlight);
    if (at > cutoff) { nextReleases.push(at); return; }
    published.push({ kind: "event", at, key: `event:${row.id}`, row });
  });
  published.sort((a, b) => a.at - b.at || a.kind.localeCompare(b.kind));
  published.forEach((item) => {
    if (existing.has(item.key)) return;
    // Groups are anchored only to a published time, never a future match end.
    const period = matchClockContext(item.at).period;
    const offset = period === 2 ? state.data.match.second_half_offset_ms || 0 : 0;
    const periodStart = period === 2 ? state.data.match.second_half_stream_start_ms : 0;
    const groupStart = Math.max(periodStart, Math.floor((item.at - offset) / 120000) * 120000 + offset);
    let group = [...feed.children].find((node) => Number(node.dataset.groupStart) === groupStart);
    if (!group) {
      group = document.createElement("section");
      group.className = "story-group";
      group.dataset.groupStart = groupStart;
      const heading = document.createElement("h3");
      heading.className = "story-group-time";
      heading.textContent = `${period === 1 ? "First half" : "Second half"} · from ${formatClock(groupStart)}`;
      const cards = document.createElement("div");
      cards.className = "story-group-cards";
      group.append(heading, cards);
      feed.append(group);
    }
    const button = document.createElement("button");
    button.className = `story-card ${item.kind === "turning" ? "timeline-turning-point" : item.kind === "chain" ? "timeline-chain" : "timeline-marker"}`;
    button.dataset.storyKey = item.key;
    button.dataset.time = item.at;
    if (item.insight) {
      const row = item.insight, copy = insightCopy(row), club = team(row.teamId);
      button.dataset.teamId = row.teamId;
      button.dataset.insightId = row.id;
      button.innerHTML = `<span class="story-time">${formatClock(row.availableAtMs)} · Turning point</span><strong>${escapeHtml(copy.title || "Observed turning point")}</strong><span class="story-team">${escapeHtml(club.name)}</span><span class="story-fact">${escapeHtml(copy.body || `${tacticalLabel(row.fromState)} → ${tacticalLabel(row.toState)}`)}</span><span class="story-action">Compare Before / After ↗</span><span class="story-latest" hidden>Latest</span>`;
      button.setAttribute("aria-label", `${formatClock(row.availableAtMs)}, ${club.name}, observed turning point. Replay Before and After`);
      button.title = `Observed change · published ${formatClock(row.availableAtMs)}`;
      button.addEventListener("click", () => selectTurningPoint(row.id, true));
    } else if (item.chain) {
      const chain = item.chain;
      const club = team(chain.teamId);
      button.dataset.teamId = chain.teamId;
      const label = ATTACK_PATTERN_LABELS[chain.pattern?.primary] || "Threatening attack";
      button.dataset.chainId = chain.id;
      button.dataset.eventId = chain.keyEventId;
      button.style.setProperty("--story-color", displayTeamColor(club));
      button.innerHTML = `<span class="story-time">${formatClock(chain.startMs)}–${formatClock(chain.endMs)} <em>Complete attack</em></span><strong>${label}</strong><span class="story-team">${club.name}</span><span class="story-fact">${chain.metrics.completedPasses} completed passes · ${chain.metrics.shots} shots</span><span class="story-action">Replay attack ↗</span><span class="story-latest" hidden>Latest</span>`;
      button.setAttribute("aria-label", `${formatClock(chain.startMs)} to ${formatClock(chain.endMs)}, ${club.name}, ${label}. Replay attack`);
      button.title = `${label} · published through ${formatClock(chain.endMs)}`;
      button.addEventListener("click", () => selectTimelineChain(chain.id, true));
    } else {
      const row = item.row;
      button.dataset.teamId = row.team;
      const actor = player(row.player)?.name || team(row.team).name;
      button.dataset.eventId = row.id;
      button.style.setProperty("--story-color", displayTeamColor(row.team));
      button.innerHTML = `<span class="story-time">${formatClock(row.t)} <em>Shot event</em></span><strong>${eventTitle(row)}</strong><span class="story-team">${actor}</span><span class="story-fact">Position-only xG ${formatXg(row.q?.xg)}</span><span class="story-action">Replay evidence ↗</span><span class="story-latest" hidden>Latest</span>`;
      button.setAttribute("aria-label", `${formatClock(row.t)}, ${eventTitle(row)}, ${actor}. Open evidence replay`);
      button.title = `${eventTitle(row)} · ${actor}`;
      button.addEventListener("click", () => selectTimelineEvent(row.id, true));
    }
    const wrapper = document.createElement("div");
    wrapper.className = "story-item";
    const details = document.createElement("button");
    details.className = "story-details";
    details.textContent = "Details";
    details.setAttribute("aria-label", `Details for ${button.getAttribute("aria-label")}`);
    details.addEventListener("click", () => {
      if (item.kind === "turning") selectTurningPoint(item.insight.id, false);
      else if (item.kind === "chain") selectTimelineChain(item.chain.id, false);
      else selectTimelineEvent(item.row.id, false);
      openAppDialog("moment-dialog");
    });
    wrapper.append(button, details);
    group.children[1].append(wrapper);
  });
  timelineCutoff = cutoff;
  timelineNextReleaseAt = nextReleases.length ? Math.min(...nextReleases) : Infinity;
  applyTimelineFilter();
  if (followLatest) queueStoryRailToEnd();
  refreshInsightPresentation();
}

const STORY_FILTER_LABELS = { all: "All", chances: "Good chances (est.)", goals: "Goals", shots: "Shots", attacks: "Complete attacks", changes: "Turning points", player: "Selected player" };

function storyRailAtEnd() {
  const rail = byId["timeline-track"];
  return Math.max(0, (rail.scrollWidth || 0) - (rail.clientWidth || 0)) - (rail.scrollLeft || 0) <= 8;
}
function holdStoryRailPosition(keyboard = false) {
  storyRailFollowLatest = false;
  storyRailKeyboardBrowsing = keyboard;
  storyRailScrollHolding = false;
  storyRailScrollEpoch += 1;
}
function queueStoryRailToEnd() {
  const epoch = ++storyRailScrollEpoch;
  requestAnimationFrame(() => {
    if (epoch !== storyRailScrollEpoch || !storyRailFollowLatest) return;
    const rail = byId["timeline-track"];
    if (rail.hidden) return;
    // Suppress layout/filter-generated scroll events until this write settles.
    storyRailScrollHolding = true;
    rail.scrollLeft = Math.max(0, (rail.scrollWidth || 0) - (rail.clientWidth || 0));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (epoch === storyRailScrollEpoch) storyRailScrollHolding = false;
    }));
  });
}
function refreshStoryFilterControls() {
  const type = STORY_FILTER_LABELS[state.timelineFilter];
  const club = state.timelineTeamFilter === "home" ? team(state.data.match.home_team_id) : state.timelineTeamFilter === "away" ? team(state.data.match.away_team_id) : null;
  const teamLabel = club ? `${state.timelineTeamFilter === "home" ? "Home" : "Away"} · ${club.name}` : "Both teams";
  const count = Number(state.timelineFilter !== "all") + Number(state.timelineTeamFilter !== "all");
  byId["story-filter-count"].hidden = count === 0;
  byId["story-filter-count"].textContent = count;
  byId["story-filter-selection"].textContent = `${type} · ${club?.code || "Both teams"}`;
  byId["story-filter-summary"].textContent = `${type} · ${teamLabel}`;
  byId["story-filters-open"].setAttribute("aria-label", `Filter match story. ${type}. ${teamLabel}.`);
  byId["story-filters-open"].title = `${type} · ${teamLabel}`;
  byId["story-filter-home"].textContent = `Home · ${team(state.data.match.home_team_id).name}`;
  byId["story-filter-away"].textContent = `Away · ${team(state.data.match.away_team_id).name}`;
}
function setTimelineFilter(filter) {
  if (!Object.hasOwn(STORY_FILTER_LABELS, filter)) return;
  state.timelineFilter = filter;
  $$(".timeline-filters button").forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  applyTimelineFilter();
}

function setTimelineTeamFilter(filter) {
  if (!["all", "home", "away"].includes(filter)) return;
  state.timelineTeamFilter = filter;
  $$(".story-team-filters button").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.teamFilter === filter)));
  applyTimelineFilter();
}

function applyTimelineFilter() {
  const filter = state.timelineFilter;
  const teamId = state.timelineTeamFilter === "home" ? state.data.match.home_team_id : state.timelineTeamFilter === "away" ? state.data.match.away_team_id : null;
  const scopeKey = JSON.stringify([filter, state.timelineTeamFilter, filter === "player" ? state.selectedPlayerId : null]);
  const scopeChanged = storyRailFilterKey !== scopeKey;
  storyRailFilterKey = scopeKey;
  if (scopeChanged) { storyRailFollowLatest = true; storyRailKeyboardBrowsing = false; }
  let visibleCount = 0;
  $$(".story-card").forEach((button) => {
    const chain = button.dataset.chainId ? chanceChain(button.dataset.chainId) : null;
    const row = event(button.dataset.eventId);
    const turning = button.dataset.insightId ? turningPoint(button.dataset.insightId) : null;
    const shot = !chain && !turning && row?.type === "shot";
    const typeMatches = filter === "all" || (filter === "shots" && shot)
      || (filter === "goals" && shot && row.outcome === "goal")
      || (filter === "chances" && shot && Number.isFinite(row.q?.xg) && row.q.xg >= 0.20)
      || (filter === "attacks" && Boolean(chain)) || (filter === "changes" && Boolean(turning))
      || (filter === "player" && (turning ? turning.eventIds.some((id) => event(id)?.player === state.selectedPlayerId) : chain ? chain.participantIds.includes(state.selectedPlayerId) : row?.player === state.selectedPlayerId));
    const cardTeamId = turning?.teamId || chain?.teamId || row?.team;
    const visible = typeMatches && (!teamId || cardTeamId === teamId);
    button.hidden = !visible;
    if (button.parentElement?.classList.contains("story-item")) button.parentElement.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  $$(".story-group").forEach((group) => { group.hidden = ![...group.children[1].children].some((node) => !node.hidden); });
  byId["story-count"].textContent = `${visibleCount} published ${visibleCount === 1 ? "story" : "stories"}`;
  byId["timeline-track"].hidden = visibleCount === 0;
  byId["timeline-empty"].hidden = visibleCount !== 0;
  const teamScope = teamId ? ` for ${team(teamId).name}` : "";
  byId["timeline-empty"].textContent = filter === "player" ? `No published stories match this player${teamScope}.`
    : filter === "chances" ? `No published shots${teamScope} meet the position-only xG ≥ 0.20 estimate.`
      : filter === "all" ? `No completed moment is published${teamScope} through ${formatClock(state.time)}.`
        : `No published ${STORY_FILTER_LABELS[filter].toLowerCase()}${teamScope} yet.`;
  refreshStoryFilterControls();
  updateLatestStory();
  renderAwayPresentation(true);
  if (scopeChanged) queueStoryRailToEnd();
}

function eventTitle(row) {
  if (!row) return "Match event";
  if (row.type === "shot" && row.outcome === "goal") return "Goal tag";
  if (row.type === "shot" && row.outcome === "saved") return "Shot · subsequent corner";
  if (row.type === "shot") return "Shot opportunity";
  if (row.type === "card") return row.outcome === "yellow" ? "Yellow card" : "Red card";
  if (row.type === "substitution") return "Substitution";
  if (row.type === "corner") return "Corner";
  if (row.type === "pass" && ["cross", "cutback"].includes(row.q?.pass_type)) return "Cross";
  if (row.type === "pass") return "Pass";
  return "Match event";
}
function shotOutcomeCopy(row) {
  return {
    goal: "goal (event tag)",
    saved: "goalkeeper involvement / corner (inferred from a subsequent corner; save not verified)",
    off_target: "off target (inferred from a subsequent goal kick; accuracy not verified)",
    blocked: "block proxy (inferred from other subsequent action types; block not verified)",
  }[row.outcome] || "no reliable outcome label";
}
function eventDescription(row) {
  const actor = player(row.player);
  const club = team(row.team);
  if (row.type === "shot") return `${actor?.name || club.name} took a shot. Position-only estimated xG: ${formatXg(row.q?.xg)}. Outcome: ${shotOutcomeCopy(row)}.`;
  if (row.type === "card") return `${actor?.name || club.name} received a ${row.outcome === "yellow" ? "yellow" : "red"} card.`;
  if (row.type === "substitution") return `${player(row.secondary)?.name || "A substitute"} replaced ${actor?.name || "a player"}.`;
  return `${eventTitle(row)} by ${club.name}.`;
}

function selectTimelineEvent(eventId, open = false, cutoffMs = state.time) {
  const row = event(eventId);
  if (!row || eventAvailableAt(row) > cutoffMs) return;
  state.selectedEventId = eventId;
  state.selectedChainId = null;
  byId["timeline-detail"].hidden = false;
  byId["timeline-detail"].innerHTML = `<span class="detail-time">${formatClock(row.t)}</span><div><strong>${eventTitle(row)}</strong><p>${eventDescription(row)}</p></div><button id="timeline-replay">Replay evidence</button>`;
  $$(".timeline-marker").forEach((marker) => marker.classList.toggle("selected", marker.dataset.eventId === eventId));
  $$(".timeline-chain").forEach((band) => band.classList.remove("selected"));
  const receipt = createReplayReceipt(eventId, cutoffMs);
  document.getElementById("timeline-replay").addEventListener("click", () => openReplay(eventId, { receipt }));
  if (open) openReplay(eventId, { receipt });
}

function selectTimelineChain(chainId, open = false) {
  const chain = chanceChain(chainId);
  if (!chain || chain.endMs > state.time) return;
  const club = team(chain.teamId);
  const label = ATTACK_PATTERN_LABELS[chain.pattern?.primary] || "Threatening attack";
  state.selectedChainId = chainId;
  state.selectedEventId = chain.keyEventId;
  byId["timeline-detail"].hidden = false;
  byId["timeline-detail"].innerHTML = `<span class="detail-time">${formatClock(chain.startMs)}<br>–${formatClock(chain.endMs)}</span><div><strong>${club.name} · ${label}</strong><p>${chain.metrics.completedPasses} completed passes · ${chain.metrics.offBallRuns} provider-tagged off-ball runs · ${chanceOutcomeCopy(chain)}. Rule match ${percent(chain.pattern?.confidence)} (uncalibrated); tags do not establish intent or defensive effects.</p><div class="moment-actions"><button id="timeline-replay">Replay attack</button><button id="explain-attack">Explain this attack</button></div></div>`;
  $$(".timeline-marker").forEach((marker) => marker.classList.remove("selected"));
  $$(".timeline-chain").forEach((band) => band.classList.toggle("selected", band.dataset.chainId === chainId));
  const receipt = createReplayReceipt(chain.keyEventId, state.time, chain.id);
  document.getElementById("timeline-replay").addEventListener("click", () => startAttackReplay(receipt));
  document.getElementById("explain-attack").addEventListener("click", () => explainAttack(chainId));
  if (open) startAttackReplay(receipt);
}

function updateLatestStory() {
  const cards = $$(".story-card");
  const latest = cards.filter((node) => !node.hidden).reduce((last, node) => !last || Number(node.dataset.time) >= Number(last.dataset.time) ? node : last, null);
  cards.forEach((node) => {
    const isLatest = node === latest;
    node.classList.toggle("is-latest", isLatest);
    node.querySelector(".story-latest").hidden = !isLatest;
  });
}

function navigateStoryRail(key) {
  const cards = $$("#timeline-entries .story-card").filter((node) => !node.hidden);
  if (!cards.length) return;
  holdStoryRailPosition(true);
  const index = cards.indexOf(document.activeElement);
  const next = key === "Home" ? 0 : key === "End" ? cards.length - 1 : key === "ArrowRight" ? Math.min(cards.length - 1, index + 1) : Math.max(0, index < 0 ? cards.length - 1 : index - 1);
  cards[next].focus({ preventScroll: true });
  cards[next].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
}

function openReplay(eventId, { preserveTimeline = false, receipt = null, triggerFocus = document.activeElement } = {}) {
  if (state.attackReplay) return;
  const frozenReceipt = receipt || createReplayReceipt(eventId, state.time);
  if (!frozenReceipt || frozenReceipt.eventId !== eventId) return;
  if (!state.replay) { replayDialogReturn = captureDialogReturn(triggerFocus); replayTriggerFocus = triggerFocus; }
  closeDialogsForReplay();
  const { event: row, chain: linkedChain, start, end, cutoffMs } = frozenReceipt;
  // Off-ball rows have no prospective chain link. Only a completed, published attack can associate them.
  const publishedAttack = publishedInsights("attacks", cutoffMs).find((item) => item.chainId === linkedChain?.id);
  const observationIds = new Set(publishedAttack?.offBallIds || []);
  const observations = publishedInsights("offBall", cutoffMs).filter((item) => (observationIds.has(item.id) || item.eventId === row.id) && item.startMs >= start && item.endMs <= end && item.endMs <= cutoffMs && item.quality.rawVerified === true && item.quality.cameraCoverage === 1 && item.quality.heldSamples === 0 && item.quality.extrapolatedSamples === 0 && item.quality.cameraDetectedSamples === item.quality.totalSamples && item.quality.maxGapMs <= 100);
  state.replay = { eventId, receipt: frozenReceipt, observations: frozenCopy(observations), observationId: observations[0]?.id || null, start, end, time: start, playing: end > start, lastAt: performance.now() };
  state.selectedEventId = eventId;
  state.selectedChainId = linkedChain?.id || null;
  const displayScope = frozenReceipt.displayScope;
  byId["replay-title"].textContent = displayScope?.kind === "attack"
    ? `Attack evidence · ${displayScope.teamName} · ${formatClock(displayScope.startMs)}–${formatClock(displayScope.endMs)}`
    : `${formatClock(row.t)} · ${eventTitle(row)} · ${player(row.player)?.name || team(row.team).name}`;
  byId["replay-panel"].dataset.evidenceScope = displayScope?.kind === "attack" ? "attack" : "event";
  byId["replay-evidence"].textContent = linkedChain
    ? `${linkedChain.eventIds.length} actions · through ${formatClock(cutoffMs)}`
    : `Selected action · through ${formatClock(cutoffMs)}`;
  byId["replay-panel"].dataset.cutoffMs = cutoffMs;
  byId["replay-panel"].dataset.endMs = end;
  byId["replay-panel"].hidden = false;
  byId["offball-toggle"].hidden = observations.length === 0;
  byId["offball-toggle"].setAttribute("aria-pressed", String(state.offBallVisible));
  byId["offball-observation"].hidden = observations.length === 0;
  byId["offball-observation"].innerHTML = observations.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(player(item.playerId)?.name || "Player")} · ${formatClock(item.startMs)}–${formatClock(item.endMs)}</option>`).join("");
  requestAnimationFrame(clampReplayPanel);
  if (!preserveTimeline) selectTimelineEvent(eventId, false, cutoffMs);
  renderReplay();
}

function captureDialogReturn(focus = document.activeElement) {
  const dialogs = $$("dialog[open]");
  const dialog = dialogs.at(-1);
  return dialog ? { id: dialog.id, focus, returnFocus: dialogReturnFocus.get(dialog) } : null;
}
function rememberChatReadingPosition() {
  const log = byId["chat-log"];
  // A closed dialog or an intermediate host has no layout. Its zero is not a reading position.
  if (chatScrollHolding || !(log?.clientHeight > 0) || !log.getClientRects().length) return;
  const max = Math.max(0, log.scrollHeight - log.clientHeight);
  chatReadingPosition = { top: log.scrollTop, followBottom: max - log.scrollTop <= 2 };
}
function restoreChatReadingPosition() {
  const epoch = ++chatScrollEpoch;
  chatScrollHolding = true;
  const apply = () => {
    const log = byId["chat-log"];
    if (!(log?.clientHeight > 0) || !log.getClientRects().length) return;
    const max = Math.max(0, log.scrollHeight - log.clientHeight);
    log.scrollTop = chatReadingPosition.followBottom ? max : clamp(chatReadingPosition.top, 0, max);
  };
  // Reparenting/showModal and focus restoration settle over layout frames. Ignore their reset events.
  requestAnimationFrame(() => {
    if (epoch !== chatScrollEpoch) return;
    apply();
    requestAnimationFrame(() => {
      if (epoch !== chatScrollEpoch) return;
      apply();
      chatScrollHolding = false;
    });
  });
}
function scrollChatToBottom() {
  // New messages retain their existing automatic-to-bottom behaviour, even while Chat is closed.
  chatReadingPosition = { top: 0, followBottom: true };
  byId["chat-log"].scrollTop = byId["chat-log"].scrollHeight;
  restoreChatReadingPosition();
}
function openAppDialog(id, focus = null, returnFocus = document.activeElement) {
  const dialog = byId[id];
  if (id === "chat-dialog") rememberChatReadingPosition();
  if (!dialog.open) { dialogReturnFocus.set(dialog, returnFocus); dialog.showModal(); }
  if (focus) requestAnimationFrame(() => focus.isConnected && focus.focus({ preventScroll: true }));
  if (id === "chat-dialog") restoreChatReadingPosition();
}
function closeDialogsForReplay() {
  rememberChatReadingPosition();
  ["suggestions-dialog", "player-dialog", "player-chooser-dialog", "moment-dialog", "history-dialog", "demo-dialog", "player-story-dialog", "story-filters-dialog", "chat-dialog"].forEach((id) => {
    const dialog = byId[id];
    if (dialog?.open) { dialog.dataset.replayClosing = "true"; dialog.close(); }
  });
}
function restoreDialogReturn(saved) {
  if (saved.id === "chat-dialog" && !workspaceMedia?.matches) saved.focus?.focus({ preventScroll: true });
  else openAppDialog(saved.id, saved.focus, saved.returnFocus);
}
function openChat(focusInput = true) {
  if (workspaceMedia?.matches) openAppDialog("chat-dialog", focusInput ? byId["question-input"] : null);
  else if (focusInput) byId["question-input"].focus({ preventScroll: true });
}
function setupWorkspaceDialogs() {
  workspaceMedia = window.matchMedia("(max-width: 1100px), (max-height: 560px)");
  const updateMode = () => {
    const active = document.activeElement;
    const focusWasInAssistant = byId["assistant-column"].contains(active);
    const wasChatOpen = byId["chat-dialog"].open;
    const narrow = workspaceMedia.matches;
    rememberChatReadingPosition();
    restoreChatReadingPosition();
    document.body.classList.toggle("chat-on-demand", workspaceMedia.matches);
    if (!workspaceMedia.matches && byId["chat-dialog"].open) byId["chat-dialog"].close();
    const host = workspaceMedia.matches ? byId["chat-host"] : byId["assistant-home"];
    if (byId["assistant-column"].parentElement !== host) host.append(byId["assistant-column"]);
    // Moving the focused subtree/closing Chat can leave BODY focused. Keep a visible control.
    const focusTarget = narrow ? (focusWasInAssistant ? byId["chat-shortcut"] : null)
      : wasChatOpen || focusWasInAssistant || active === byId["chat-shortcut"]
        ? (focusWasInAssistant ? active : byId["question-input"]) : null;
    if (focusTarget) requestAnimationFrame(() => {
      if (workspaceMedia.matches === narrow && focusTarget.isConnected && focusTarget.getClientRects().length) focusTarget.focus({ preventScroll: true });
    });
  };
  const updateViewport = () => {
    restoreChatReadingPosition();
    document.documentElement.style.setProperty("--workspace-height", `${Math.round(window.visualViewport?.height || window.innerHeight)}px`);
    clampReplayPanel();
  };
  workspaceMedia.addEventListener("change", updateMode);
  window.addEventListener("resize", updateViewport);
  window.visualViewport?.addEventListener("resize", updateViewport);
  byId["chat-log"].addEventListener("scroll", rememberChatReadingPosition, { passive: true });
  byId["chat-dialog"].addEventListener("cancel", rememberChatReadingPosition);
  $$("[data-dialog-close]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.dialogClose === "chat-dialog") rememberChatReadingPosition();
    byId[button.dataset.dialogClose].close();
  }));
  $$(".app-dialog").forEach((dialog) => dialog.addEventListener("close", () => {
    if (dialog.dataset.replayClosing) { delete dialog.dataset.replayClosing; return; }
    const target = dialogReturnFocus.get(dialog);
    if (target?.isConnected && target.getClientRects().length) target.focus({ preventScroll: true });
  }));
  byId["history-open"].addEventListener("click", () => openAppDialog("history-dialog"));
  byId["suggestions-open"].addEventListener("click", () => openAppDialog("suggestions-dialog"));
  byId["player-details-open"].addEventListener("click", () => openAppDialog("player-dialog"));
  byId["player-chooser-open"].addEventListener("click", openPlayerChooser);
  byId["player-chooser-search"].addEventListener("input", renderPlayerChooser);
  byId["player-chooser-team"].addEventListener("change", renderPlayerChooser);
  updateMode(); updateViewport();
}
function replayBounds() {
  const pitch = byId["pitch-wrap"].getBoundingClientRect();
  const floating = pitch.height < 280;
  byId["replay-panel"].classList.toggle("viewport-replay", floating);
  return floating ? { left: 0, top: 0, width: window.innerWidth, height: window.visualViewport?.height || window.innerHeight } : pitch;
}

function clampReplayPanel() {
  const panel = byId["replay-panel"];
  if (panel.hidden) return;
  const wrap = replayBounds();
  const availableWidth = Math.max(0, wrap.width - 16);
  const availableHeight = Math.max(0, wrap.height - 16);
  panel.style.setProperty("--replay-max-width", `${availableWidth}px`);
  panel.style.setProperty("--replay-max-height", `${availableHeight}px`);
  const style = getComputedStyle(panel);
  const chromeHeight = panel.querySelector("header").getBoundingClientRect().height
    + panel.querySelector("footer").getBoundingClientRect().height
    + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  const pitch = byId["replay-pitch"];
  const naturalPitchHeight = pitch.getBoundingClientRect().width * 340 / 525;
  // Preserve the entire SVG viewBox inside the remaining height. A shorter
  // viewport letterboxes the field; it never crops the pitch or hides its footer.
  pitch.style.height = `${Math.min(naturalPitchHeight, Math.max(0, availableHeight - chromeHeight))}px`;
  const box = panel.getBoundingClientRect();
  panel.style.right = "auto";
  panel.style.left = `${clamp(box.left - wrap.left, 8, Math.max(8, wrap.width - box.width - 8))}px`;
  panel.style.top = `${clamp(box.top - wrap.top, 8, Math.max(8, wrap.height - box.height - 8))}px`;
}

function setupReplayDragging() {
  const handle = byId["replay-drag-handle"];
  const panel = byId["replay-panel"];
  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    const wrap = replayBounds();
    const box = panel.getBoundingClientRect();
    panel.style.right = "auto";
    panel.style.left = `${box.left - wrap.left}px`;
    panel.style.top = `${box.top - wrap.top}px`;
    replayDrag = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, left: box.left - wrap.left, top: box.top - wrap.top };
    panel.classList.add("dragging");
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!replayDrag || replayDrag.pointerId !== e.pointerId) return;
    const wrap = replayBounds();
    const box = panel.getBoundingClientRect();
    panel.style.left = `${clamp(replayDrag.left + e.clientX - replayDrag.startX, 8, Math.max(8, wrap.width - box.width - 8))}px`;
    panel.style.top = `${clamp(replayDrag.top + e.clientY - replayDrag.startY, 8, Math.max(8, wrap.height - box.height - 8))}px`;
  });
  const endDrag = (e) => {
    if (!replayDrag || replayDrag.pointerId !== e.pointerId) return;
    replayDrag = null;
    panel.classList.remove("dragging");
    if (handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId);
  };
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", clampReplayPanel);
}

function renderReplay(now = performance.now()) {
  if (!state.replay || byId["replay-panel"].hidden) return;
  if (state.replay.playing) {
    state.replay.time += (now - state.replay.lastAt) * 3;
    if (state.replay.time > state.replay.end) {
      if (state.replay.observations?.length) { state.replay.time = state.replay.end; state.replay.playing = false; }
      else state.replay.time = state.replay.start;
    }
  }
  const replayAgainHidden = !(state.replay.observations?.length && !state.replay.playing);
  if (byId["evidence-play-again"].hidden !== replayAgainHidden) { byId["evidence-play-again"].hidden = replayAgainHidden; requestAnimationFrame(clampReplayPanel); }
  state.replay.lastAt = now;
  const frame = frameAt(state.replay.time, state.replay.receipt.cutoffMs);
  byId["replay-players"].innerHTML = frame.p.map(([index, x, y, , , , speed, , facing]) => {
    const person = state.data.players[index];
    const selected = person.id === state.replay.receipt.event.player;
    const directionDegrees = (facing || 0) * 180 / Math.PI;
    const direction = frame.q !== 0 && speed >= 0.8
      ? `<polygon points="${selected ? 15 : 13},0 ${selected ? 10 : 8},-3 ${selected ? 10 : 8},3" transform="rotate(${directionDegrees.toFixed(2)})" fill="${selected ? "#b8ff57" : "rgba(255,255,255,.92)"}" stroke="rgba(8,24,16,.72)" stroke-width=".8" stroke-linejoin="round"/>`
      : "";
    return `<g transform="translate(${pitchX(x, true)} ${pitchY(y, true)})"><circle r="${selected ? 8 : 6}" fill="${displayTeamColor(person.teamId)}" stroke="${selected ? "#b8ff57" : "rgba(255,255,255,.8)"}" stroke-width="${selected ? 2.5 : 1}"/>${direction}<circle r="${3 + Math.min(3, (speed || 0) * .35)}" fill="none" stroke="rgba(255,255,255,.22)"/><text y="1" fill="white" font-size="5.5" font-weight="800" text-anchor="middle" dominant-baseline="central">${person.number}</text></g>`;
  }).join("");
  const ballX = pitchX(frame.b[0], true);
  const ballY = pitchY(frame.b[1], true);
  const lift = (frame.b[3] || 0) * 4.5;
  byId["replay-ball"].innerHTML = `<ellipse cx="${ballX}" cy="${ballY}" rx="4" ry="2.5" fill="rgba(0,0,0,.3)"/><line x1="${ballX}" y1="${ballY}" x2="${ballX}" y2="${ballY - lift}" stroke="rgba(255,255,255,.4)" stroke-dasharray="2 2"/><circle cx="${ballX}" cy="${ballY - lift}" r="${4 + Math.min(1.5, lift * .08)}" fill="white" stroke="#101510" stroke-width="1.5"/>`;
  byId["replay-clock"].textContent = formatClock(state.replay.time);
  renderOffBallEvidence();
}

function renderOffBallEvidence() {
  const replay = state.replay;
  const observations = replay?.observations || [];
  const selected = observations.find((row) => row.id === replay.observationId);
  const visible = state.offBallVisible && selected && selected.endMs <= replay.time ? [selected] : [];
  byId["replay-offball"].innerHTML = visible.map((row) => {
    const actor = player(row.playerId);
    const endX = pitchX(row.end.x, true), endY = pitchY(row.end.y, true), labelLeft = endX > 420;
    return `<g data-observation-id="${escapeHtml(row.id)}"><circle class="offball-start" cx="${pitchX(row.start.x, true)}" cy="${pitchY(row.start.y, true)}" r="4"/><path class="offball-path" d="M${pitchX(row.start.x, true)},${pitchY(row.start.y, true)} L${endX},${endY}"/><text class="offball-label" text-anchor="${labelLeft ? "end" : "start"}" x="${endX + (labelLeft ? -5 : 4)}" y="${endY < 25 ? endY + 12 : endY - 5}">#${actor?.number || "?"} · ${row.metrics.displacementM.toFixed(1)}m</text></g>`;
  }).join("");
  byId["offball-note"].hidden = observations.length === 0;
  if (!observations.length) return;
  const sample = selected || observations[0], quality = sample.quality;
  const interval = `${formatClock(sample.startMs)}–${formatClock(sample.endMs)}`;
  const before = sample.metrics.nearestVisibleOpponentStartM, after = sample.metrics.nearestVisibleOpponentEndM;
  const geometry = Number.isFinite(before) && Number.isFinite(after) ? `Nearest in the same camera-visible opponent set: ${before.toFixed(2)}→${after.toFixed(2)}m.` : "No consistent camera-visible opponent set; separation is unavailable.";
  const text = `${state.offBallVisible ? visible.length ? `Observed displacement ${sample.metrics.displacementM.toFixed(1)}m` : "Arrow appears after its observed interval" : "Movement overlay hidden"} · ${interval} · camera ${quality.cameraDetectedSamples}/${quality.totalSamples}. ${geometry} Provider-tagged off-ball; no verified touch exclusion, intent or defensive effect.`;
  if (byId["offball-note"].textContent !== text) { byId["offball-note"].textContent = text; requestAnimationFrame(clampReplayPanel); }
}

function evidenceFromEvents(rows, limit = 3) {
  return rows.slice(-limit).map((row) => ({ id: row.id, label: `${formatClock(row.t)} ${eventTitle(row)}` }));
}

function evidenceFromChance(chain, limit = 3) {
  if (!chain) return [];
  const ids = [chain.eventIds[0], chain.keyEventId, chain.eventIds.at(-1)];
  const rows = [...new Set(ids)].map(event).filter(Boolean).slice(0, limit);
  return rows.map((row, index) => ({ id: row.id, chainId: chain.id, label: `${formatClock(row.t)} ${index === 0 && rows.length > 1 ? "Attack start" : eventTitle(row)}` }));
}

function chanceOutcomeCopy(chain) {
  if (chain.kind === "goal") return `a goal was tagged, with ${formatXg(chain.metrics.xg)} total position-only estimated xG`;
  if (chain.metrics.shots) return `${chain.metrics.shots} shots, with ${formatXg(chain.metrics.xg)} total position-only estimated xG`;
  if (chain.metrics.boxEntries) return `${chain.metrics.boxEntries} box entries without a shot`;
  return "progress into the final third without a shot";
}
function chancePatternCopy(chain) {
  const label = ATTACK_PATTERN_LABELS[chain.pattern?.primary] || "Threatening attack";
  const signals = (chain.pattern?.signals || []).map((signal) => {
    const value = signal.split(":")[1];
    if (signal.startsWith("restart:")) return "a restart origin";
    if (signal.startsWith("regain_x:")) return `a regain ${value}m up the attacking direction`;
    if (signal.startsWith("transition_start:")) return "a regain origin";
    if (signal.startsWith("progression_m:")) return `${value}m of forward progression`;
    if (signal.startsWith("long_passes:")) return `${value} long passes`;
    if (signal.startsWith("crosses:")) return `${value} crosses`;
    if (signal.startsWith("line_breaks:")) return `${value} line-breaking passes`;
    if (signal.startsWith("actions:")) return `${value} on-ball actions`;
    return null;
  }).filter(Boolean).slice(0, 3);
  return `The rule classifier suggests <strong>${label}</strong> (match score ${percent(chain.pattern?.confidence)}, not a calibrated probability)${signals.length ? `, based on ${signals.join(", ")}` : ""}`;
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
const API_FALLBACK_COPY = {
  unavailable: "An AI insight is unavailable right now.", timeout: "The answer took too long.",
  visibility_not_ready: "This match time is not ready yet. Your question keeps its original time.",
  context_rejected: "This evidence does not match the question.",
  not_authorized: "This evidence is unavailable for your selection.", session_expired: "Please send a new question to continue.",
  sign_in_required: "Sign in to ask for an AI insight.",
  temporarily_busy: "The assistant is temporarily busy or rate limited.",
  capacity_reached: "The assistant is temporarily busy or rate limited.", invalid_response: "The answer could not be verified for this question.",
};
const MODEL_STATUS_COPY = {
  fallback_timeout: "The AI insight took too long.", fallback_busy: "The assistant is temporarily busy.",
  fallback_output_budget_exhausted: "The AI response exceeded its output limit.", fallback_incomplete_output: "The AI response was incomplete.",
  fallback_invalid_model_output: "The AI answer could not be verified.", fallback_authentication_failed: "The AI service could not authorize this request.",
  fallback_rate_limited: "The AI service is temporarily rate limited.", fallback_invalid_configuration: "The AI service is unavailable right now.",
  deterministic_fallback: "An AI insight is unavailable right now.",
};
const FACT_LABELS = {
  passes_attempted: "Recorded pass attempts", passes_completed: "Completed passes", pass_outcomes_known: "Known pass outcomes", pass_completion: "Pass completion among known outcomes",
  crosses_attempted: "Cross / cutback attempts", crosses_completed: "Completed crosses / cutbacks", cross_outcomes_known: "Known cross outcomes", cross_completion: "Cross completion among known outcomes",
  shots: "Recorded shots", xg_estimate: "Position-only estimated xG", xg_samples: "Valid xG observations", xg_missing: "Missing xG observations",
  actions: "Actions in this completed attack", passes: "Passes in this attack", completed_passes: "Completed passes in this attack", camera_off_ball_observations: "Eligible camera-observed movement intervals",
};

function renderAssistantMode() {
  const node = byId["assistant-mode"];
  if (!node) return;
  const api = assistantApi?.getState();
  let label = "Match facts are available";
  let mode = "checking";
  if (lastAnswerMode) { label = lastAnswerMode.kind === "cloud" ? "Last answer · AI insight" : "Last answer · Match facts"; mode = lastAnswerMode.kind; }
  else if (api?.phase === "ready") {
    mode = "ready";
    label = "Ready for your question";
  } else if (api?.phase === "unavailable") { mode = "unavailable"; label = "Match facts are available"; }
  if (questionPending) { mode = "pending"; label = "Checking your question…"; }
  node.dataset.mode = mode;
  node.textContent = label;
}

function setQuestionPending(value) {
  questionPending = value;
  byId["question-form"].setAttribute("aria-busy", String(value));
  byId["question-form"].querySelector("button").disabled = value;
  byId["suggestions"].querySelectorAll("button").forEach((button) => { button.disabled = value; });
  byId["catch-up-button"].disabled = value;
  renderAssistantMode();
}

function serverReplayReceipt(receipt, context) {
  const row = event(receipt.anchor_event_id);
  const chain = receipt.chain_id ? chanceChain(receipt.chain_id) : null;
  if (!row || eventAvailableAt(row) > context.cutoffMs || receipt.event_ids.some((id) => !event(id) || eventAvailableAt(event(id)) > context.cutoffMs) || (receipt.chain_id && (!chain || chain.endMs > context.cutoffMs))) return null;
  const clip = receipt.clip;
  const playback = frozenCopy({ eventId: row.id, cutoffMs: context.cutoffMs, start: clip.start_ms, end: clip.end_ms, event: row, chain, serverReceiptId: receipt.receipt_id });
  return receipt.scope_type === "attack" && receipt.team_id === context.teamId && receipt.chain_id === context.selectedChainId
    ? withAttackDisplayScope(playback, context) : playback;
}

function appendApiDetails(article, response) {
  const details = document.createElement("details");
  details.className = "answer-details";
  details.open = false;
  const summary = document.createElement("summary");
  summary.textContent = "Evidence & limitations";
  details.append(summary);
  const facts = document.createElement("dl");
  Object.entries(FACT_LABELS).forEach(([key, label]) => {
    if (!Object.hasOwn(response.facts, key)) return;
    const value = response.facts[key];
    const term = document.createElement("dt"), description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value === null ? "Unavailable" : key.endsWith("_completion") ? `${(value * 100).toFixed(1)}%` : String(value);
    facts.append(term, description);
  });
  details.append(facts);
  if (response.structured_explanation?.focus) {
    const focus = response.structured_explanation.focus;
    article.dataset.focusCandidateId = focus.candidate_id;
    const selectedFocus = document.createElement("p"); selectedFocus.className = "answer-focus";
    selectedFocus.textContent = `${response.cloud_connected ? "AI insight" : "Match facts"}: ${visibleCopy(focus.text)}`;
    details.append(selectedFocus);
  }
  if (response.claims?.length) {
    const claims = document.createElement("ol"); claims.className = "answer-claims";
    response.claims.forEach((claim) => { const item = document.createElement("li"); item.dataset.claimId = claim.id; item.textContent = visibleCopy(claim[article.dataset.mode] || claim.casual); claims.append(item); });
    details.append(claims);
  }
  response.limitations.forEach((text) => { const note = document.createElement("p"); note.textContent = visibleCopy(text); details.append(note); });
  const source = document.createElement("p");
  source.className = "answer-source";
  source.textContent = "Evidence stays fixed to this answer’s player, match time and clips.";
  details.append(source);
  article.append(details);
}

function answerQuestion(rawQuestion, context) {
  const question = rawQuestion.trim();
  if (unsupportedPassingDetail(question)) return { html: escapeHtml(PASSING_DETAIL_LIMIT), evidence: [] };
  const cutoff = context.cutoffMs;
  const compactQuestion = question.replace(/\s+/g, "").toLowerCase();
  const namedPlayer = state.data.players.find((item) => [item.name, item.fullName].some((name) => name && compactQuestion.includes(name.replace(/\s+/g, "").toLowerCase())));
  if (namedPlayer && namedPlayer.id !== context.selectedPlayerId) return { html: `This question is frozen to <strong>${escapeHtml(context.selectedPlayer?.name || "the selected player")}</strong>, while the question names ${escapeHtml(namedPlayer.name)}. That player's statistics are outside this frozen context; no player has been substituted.`, evidence: [], scopeRefusal: true };
  const person = context.selectedPlayer;
  const stats = calculatePlayerStats(person.id, cutoff);
  const rows = playerEvents(person.id, cutoff);
  const baseline = person.baseline;
  const earlyContext = count => isEarlyContext({ cutoffMs:cutoff, count, matchId:state.data.match.match_id, matchTimeContext:state.data.match });
  const sampleReason = (count, label) => sampleContextCopy({ cutoffMs:cutoff, count, label, matchId:state.data.match.match_id, matchTimeContext:state.data.match });
  const performance = asksPerformance(question);
  // Action facts and specific reasons form the primary prose; method/history stay complete in More.
  const actionReply = (primary, secondary, evidence) => ({ html:`${primary}${secondary ? `<span class="scope-note">${secondary}</span>` : ""}`, evidence });
  const outcomeReason = (label, attempted, known) => known === 0
    ? `${label} outcomes are unrecorded, so no completion rate can be calculated.`
    : `${attempted - known} ${label.toLowerCase()} outcome${attempted - known === 1 ? ' is' : 's are'} unrecorded; completion uses ${known} known outcome${known === 1 ? '' : 's'}.`;
  const requestsActionSummary = [/\b(?:pass|passes|passing)\b/i, /\b(?:cross|crosses|crossing|cutbacks?)\b/i, /\b(?:shots?|shooting|shoot|xg|chance quality)\b/i].filter((pattern) => pattern.test(question)).length > 1;
  const asksAboutPlayer = /\b(?:he|his|him|selected player|this player)\b/i.test(question) || Boolean(namedPlayer);
  const asksAboutModel = /\b(?:cloud|llm|foundry|azure|language model|agent framework|rule.based|connected model|(?:what|which).{0,18}model)\b/i.test(question);
  if (asksAboutModel) return { html: lastAnswerMode?.kind === "cloud" ? "The last AI insight used the match records and its linked evidence. Other answers are labelled Match facts." : "Match facts come from the available records. An answer is labelled AI insight only when AI was used successfully.", evidence: [] };
  const asksAboutDataSource = /\b(?:data source|source of|where.{0,24}(?:data|tracking).{0,16}(?:from|come)|where.{0,16}(?:from|come).{0,24}(?:data|tracking)|(?:data|tracking).{0,20}(?:come from|comes from|originate)|(?:is|are).{0,20}(?:data|tracking|match|replay).{0,12}(?:real|synthetic)|(?:is|are).{0,12}(?:real|synthetic).{0,12}(?:data|tracking|match|replay)|real or synthetic|synthetic or real|what is SkillCorner)\b/i.test(question)
    || /^SkillCorner[?]?$/i.test(question);
  if (asksAboutDataSource) return { html: "This is a match replay without broadcast footage. Observed and estimated positions are distinguished; gaps are excluded from analysis. Shot quality is estimated from position.", evidence: [] };
  if (/\b(?:fatigue|tired|stamina|acceleration|speed|distance run|physical)\b/i.test(question)) return { html: `${person.name} has ${stats.passes} recorded passes and ${stats.shots} shots through ${formatClock(cutoff)}. This view does not provide verified physical or fatigue measurements, so these actions do not establish tiredness.`, evidence: [] };
  if (/\b(?:predict(?:ion|ions)?|forecast|future|next\s+(?:two|five|ten|2|5|10)\s*(?:minutes?|mins?)|coming\s+(?:two|five|ten|2|5|10)\s*(?:minutes?|mins?))\b/i.test(question)) {
    const horizonMs = /\b(?:ten|10)\s*(?:minutes?|mins?)\b/i.test(question) ? 600000 : /\b(?:two|2)\s*(?:minutes?|mins?)\b/i.test(question) ? 120000 : 300000;
    const snapshot = forecastAt(person.teamId, cutoff, horizonMs);
    if (!snapshot) return { forecastState:"unavailable", html: `At <strong>${formatClock(cutoff)}</strong>, no forecast is published for this team and horizon. ${earlyContext(0) ? "The first forecast window ends at 5:00; this question is earlier than that window." : "Publication requires a completed five-minute window, an eligible tactical state and sufficient tracking coverage."}`, evidence: [] };
    const defending = team(snapshot.defendingTeamId), attacking = team(snapshot.attackingTeamId);
    const regime = snapshot.tasks.regimePersistence, escape = snapshot.tasks.pressEscape, risk = snapshot.tasks.zoneRisk;
    const regimeCopy = regime.probabilities.persist >= regime.probabilities.change
      ? `${percent(regime.probabilities.persist)} probability of retaining <strong>${tacticalLabel(regime.targetState)}</strong>`
      : `${percent(regime.probabilities.change)} probability of changing <strong>${tacticalLabel(regime.targetState)}</strong>`;
    return { forecastState:"published", html: `Frozen at <strong>${formatClock(snapshot.cutoffMs)}</strong> for the next ${Math.round(horizonMs / 60000)} minutes: ${defending.name} has a ${regimeCopy}. ${attacking.name}'s future completed-pass channel proxy is <strong>${CHANNEL_LABELS[escape.topScenario] || escape.topScenario}</strong> (${percent(escape.probabilities[escape.topScenario])}); the future completed-pass zone proxy is <strong>${CHANNEL_LABELS[risk.topScenario] || risk.topScenario}</strong> (${percent(risk.probabilities[risk.topScenario])}). Channels describe completed passes ending in the attacking third; they do not verify pressure escape or territorial risk. This rule-based forecast uses ${HISTORY_SCOPE} and a five-minute current window, with ${percent(snapshot.support.currentCoverage)} tracking coverage. Probabilities are not independently calibrated. Fixtures are listed under Historical comparison.`, evidence: [] };
  }
  const asksAboutAttackChain = /\b(?:attack(?:ing)? chain|chance chain|this attack|that attack|attack sequence|how.{0,30}(?:attack|chance).{0,30}(?:built|created|formed)|explain.{0,15}attack)\b/i.test(question);
  const asksAboutHistory = /\b(?:history|historical|head.to.head|previous fixtures|previous matches|pre.match|last three|last 3|team records)\b/i.test(question);
  if (/\b(?:tactics?|tactical|press|pressing|possession|formation|shape|initiative|control index|phase|strategy)\b/i.test(question) && !asksAboutAttackChain && !asksAboutHistory) {
    const tactical = tacticalStateAt(person.teamId, cutoff);
    if (!tactical || tactical.status !== "available") {
      const threshold = state.data.analytics?.tacticalStates?.policy?.minimumCoverage;
      const reason = !tactical ? 'No completed tactical observation is published at this time.'
        : tactical.status === 'insufficient_data' && Number.isFinite(tactical.coverage) && Number.isFinite(threshold) && tactical.coverage < threshold ? `Usable tracking frames cover ${percent(tactical.coverage)} of this window, below the ${percent(threshold)} requirement.`
          : tactical.micro?.reason === 'no_state_above_threshold' ? 'No tactical pattern meets the classification threshold in this window.'
            : 'The available window does not meet the tactical state requirements.';
      return { html: `At <strong>${formatClock(cutoff)}</strong>, no tactical state is identified for ${team(person.teamId).name}. ${reason}`, evidence: [] };
    }
    const change = latestTacticalChange(person.teamId, cutoff);
    const micro = tactical.micro.confirmedState || tactical.micro.primaryState, macro = tactical.macro.confirmedState || tactical.macro.primaryState;
    const recentPasses = state.data.events.filter((item) => item.type === "pass" && item.team === person.teamId && eventAvailableAt(item) <= cutoff && item.t >= Math.max(0, cutoff - 180000));
    const changeCopy = change ? `The latest confirmed change at ${formatClock(change.detectedAtMs)} was ${tacticalLabel(change.fromState)} → ${tacticalLabel(change.toState)}.` : "No change has met the duration and confidence thresholds yet.";
    const control = tactical.control?.value;
    const controlCopy = Number.isFinite(control) ? `${control > 0 ? "+" : ""}${control.toFixed(0)}` : "unavailable";
    return { html: `At <strong>${formatClock(cutoff)}</strong>, ${team(person.teamId).name}'s short-window state is <strong>${tacticalLabel(micro)}</strong>, with <strong>${tacticalLabel(macro)}</strong> over the longer window: ${modifierCopy(tactical.modifiers)}. Initiative index: ${controlCopy} (−100 to 100; positive favours this team, negative favours the opponent, 0 is balanced), with ${percent(tactical.coverage)} window coverage. ${changeCopy} This is a rule inference from spatial, progression, pressure and threat features, not a possession percentage or an official phase label.`, evidence: evidenceFromEvents(recentPasses.filter((item) => item.q?.lineBreak).slice(-4)) };
  }
  if (asksAboutAttackChain) {
    const available = chanceChainsUntil(cutoff);
    const selectedChain = context.selectedChain || (context.replay?.eventId === context.selectedEventId ? context.replay.chain : null);
    const playerChains = available.filter((chain) => chain.participantIds.includes(person.id));
    const latest = selectedChain?.endMs <= cutoff ? selectedChain : (asksAboutPlayer ? playerChains.at(-1) : available.at(-1));
    if (!latest) return { html: `At <strong>${formatClock(cutoff)}</strong>, no completed threatening attack is available${asksAboutPlayer ? ` for ${person.name}` : ""}. Only completed, published sequences are included.`, evidence: [] };
    const club = team(latest.teamId), names = latest.participantIds.map((id) => player(id)?.name).filter(Boolean);
    const selectedActions = latest.eventIds.map(event).filter((row) => row?.player === person.id).length;
    const selectedCopy = latest.participantIds.includes(person.id) ? `${person.name} contributed ${selectedActions} on-ball actions.` : `${person.name} had no recorded on-ball involvement in this sequence.`;
    const spatialCopy = latest.quality.reliableForSpatialShape ? `Tracking coverage: ${percent(latest.quality.trackingCoverage)}.` : "Tracking coverage is limited, so spatial positioning is supporting evidence only.";
    return { html: `<strong>${club.name}</strong>, ${formatClock(latest.startMs)}–${formatClock(latest.endMs)}: ${latest.metrics.actions} on-ball actions, ${latest.metrics.completedPasses} completed passes and ${latest.metrics.offBallRuns} off-ball runs, facing ${latest.metrics.pressuresFaced} pressure actions. There were ${latest.metrics.lineBreaks} line-breaking passes and ${latest.metrics.boxEntries} box entries, ending in ${chanceOutcomeCopy(latest)}. ${chancePatternCopy(latest)}. Participants: ${names.slice(0, 5).join(", ") || "not labelled"}. ${selectedCopy} ${spatialCopy}`, evidence: evidenceFromChance(latest) };
  }
  if (!requestsActionSummary && /\b(?:cross|crosses|crossing|cutbacks?)\b/i.test(question)) {
    const crosses = rows.filter((item) => item.type === "pass" && ["cross", "cutback"].includes(item.q?.pass_type));
    const completed = stats.completedCrosses;
    const currentRate = stats.crossCompletion;
    const reason = stats.crosses > stats.crossOutcomesKnown ? outcomeReason("Cross", stats.crosses, stats.crossOutcomesKnown)
      : performance && crosses.length <= 1 ? sampleReason(crosses.length, "cross attempts")
        : /\b(?:completion|rate|percentage)\b/i.test(question) && !crosses.length ? "With 0 cross attempts, there is no completion-rate denominator." : "";
    const crossBaseline = Number.isFinite(baseline?.cross_completion) && baseline.crosses_per90 > 0 ? baseline.cross_completion : null;
    const comparison = crossBaseline == null ? "No valid personal crossing baseline is available." : `The selected open-data baseline is ${percent(crossBaseline)} across ${baseline.match_count} appearances.`;
    const history = `${comparison} Baselines use ${HISTORY_SCOPE}; dates, opponents and limits are under Historical comparison.`;
    return actionReply(`Through <strong>${formatClock(cutoff)}</strong>, ${person.name} has <strong>${crosses.length} recorded crosses</strong>, ${completed} completed; completion rate: ${currentRate == null ? "Unavailable" : samplePercent(currentRate)} (${stats.crossOutcomesKnown} known outcomes). ${reason}`, history, evidenceFromEvents(crosses));
  }
  if (!requestsActionSummary && /\b(?:shots?|shooting|shoot|xg|chance quality|opportunity|long.range)\b/i.test(question)) {
    const asksAboutSpecificShot = /\b(?:this|that|selected shot|replay|small window)\b/i.test(question) && !asksAboutPlayer;
    const selectedShot = context.selectedEvent?.type === "shot" ? context.selectedEvent : null;
    const replayShot = context.replay?.event.type === "shot" ? context.replay.event : null;
    const referencedShot = asksAboutSpecificShot ? (/\b(?:replay|small window)\b/i.test(question) ? replayShot || selectedShot : selectedShot || replayShot) : null;
    const shooter = referencedShot ? player(referencedShot.player) || person : person;
    const shots = playerEvents(shooter.id, cutoff).filter((item) => item.type === "shot");
    const last = referencedShot || shots.at(-1);
    if (!last) return actionReply(`Through <strong>${formatClock(cutoff)}</strong>, ${shooter.name} has 0 recorded shots. ${(performance || asksShotQuality(question)) ? `${earlyContext(0) ? "The match has just begun; there" : "There"} is no shot-quality sample for this player.` : ""}`, "", []);
    const shotStats = calculatePlayerStats(shooter.id, cutoff), shotXg = validXg(last.q?.xg) ? last.q.xg : null;
    const quality = !Number.isFinite(shotXg) ? "a shot without a valid xG estimate in these records" : shotXg >= .25 ? "a higher-probability position" : shotXg >= .12 ? "a medium-probability position" : "a low-probability attempt";
    const distance = Number.isFinite(last.q?.distance_m) ? `${last.q.distance_m.toFixed(1)}m` : "distance unavailable";
    const details = `<strong>${shooter.name}</strong>'s shot at ${formatClock(last.t)} was ${quality} in the position model: estimated xG ${formatXg(shotXg)}, ${distance}. Outcome: ${shotOutcomeCopy(last)}. Through the frozen time, he has ${shotStats.shots} shots and ${sampleXg(shotStats)} total estimated xG. ${SHOT_METHOD} No personal historical xG baseline is available.`;
    const missingXg = shotStats.shots - shotStats.xgSample;
    const primary = referencedShot
      ? `<strong>${shooter.name}</strong>'s shot at ${formatClock(last.t)}: position-based estimated xG ${formatXg(shotXg)}; ${distance}. ${shotXg == null ? "No valid xG estimate is recorded for this shot; " : ""}Outcome: ${shotOutcomeCopy(last)}.`
      : `Through <strong>${formatClock(cutoff)}</strong>, ${shooter.name} has ${shotStats.shots} recorded shots; position-based total estimated xG ${sampleXg(shotStats)}. ${missingXg ? `Valid xG estimates are missing for ${missingXg}/${shotStats.shots} shots.` : `Latest shot: estimated xG ${formatXg(shotXg)}, ${quality}; ${distance}.`}`;
    return actionReply(primary, details, evidenceFromEvents(referencedShot ? [referencedShot] : shots));
  }
  if (asksAboutHistory) {
    const h = state.data.headToHead, a = team(h.team_a_id), b = team(h.team_b_id);
    const directCopy = /head.to.head/i.test(question) && !h.matches ? "No earlier direct head-to-head fixture is available in this sample. The following are separate team fixtures against other opponents.<br>" : "";
    const describe = (club) => {
      const fixtures = teamHistoryMatches(club.id), baselineRow = teamBaseline(club.id);
      if (!fixtures.length || !baselineRow) return `${club.name}: no open-data pre-match sample`;
      const wins = fixtures.filter((row) => row.result === "win").length, draws = fixtures.filter((row) => row.result === "draw").length, losses = fixtures.filter((row) => row.result === "loss").length;
      const goalsFor = fixtures.reduce((sum, row) => sum + row.goalsFor, 0), goalsAgainst = fixtures.reduce((sum, row) => sum + row.goalsAgainst, 0);
      const possession = baselineRow.metrics?.phase?.possessionShareOfPhases, pressure = baselineRow.metrics?.event?.per90?.pressureActions;
      return `<strong>${club.name}</strong> (${fixtures.length} selected fixtures): ${wins}W ${draws}D ${losses}L, ${goalsFor} goals for and ${goalsAgainst} against. Median phase possession: ${samplePercent(possession?.median)} (n=${possession?.sampleSize ?? 0}); pressure actions per 90: ${Number.isFinite(pressure?.median) ? pressure.median.toFixed(1) : "unavailable"} (n=${pressure?.sampleSize ?? 0})`;
    };
    return { html: `${directCopy}<strong>Selected pre-match open-data sample</strong>: ${describe(a)}; ${describe(b)}.<br><br>${historyMatchesCopy(a)}<br>${historyMatchesCopy(b)}<br><br>${HISTORY_LIMIT} All fixtures predate this match; no future match data or season-end aggregates are included.`, evidence: [] };
  }
  if (/\b(?:catch(?:\s+me)?[ -]?up|back|missed|last ten minutes|last 10 minutes|what happened|recent moments|bored)\b/i.test(question)) {
    const since = Math.max(0, cutoff - 600000);
    const recent = state.data.events.filter((item) => item.t >= since && eventAvailableAt(item) <= cutoff && ["shot", "card", "substitution"].includes(item.type));
    const recentChains = chanceChainsUntil(cutoff).filter((chain) => chain.endMs >= since), shots = recent.filter((item) => item.type === "shot");
    const goals = shots.filter((item) => item.outcome === "goal"), cards = recent.filter((item) => item.type === "card"), subs = recent.filter((item) => item.type === "substitution");
    const standout = [...recentChains].sort((a, b) => b.importanceScore - a.importanceScore)[0];
    const standoutCopy = standout ? `One evidence sequence starts at ${formatClock(standout.startMs)} for ${team(standout.teamId).name}: ${chanceOutcomeCopy(standout)}.` : "No completed threatening attack is available in that window.";
    return { html: `From <strong>${formatClock(since)} to ${formatClock(cutoff)}</strong>: ${recentChains.length} threatening attacks, ${shots.length} shots, ${goals.length} goal tags, ${cards.length} cards and ${subs.length} substitutions. ${standoutCopy} Catch-up currently uses a rolling ten-minute window, not a measured time away.`, evidence: standout ? evidenceFromChance(standout, 4) : evidenceFromEvents(recent.filter((item) => item.type !== "substitution"), 4) };
  }
  if (requestsActionSummary || /\b(?:pass|passes|passing|perform|performance|playing|today|summary|doing|form)\b/i.test(question)) {
    const passRate = stats.passCompletion;
    const missing = [];
    if (stats.passes > stats.passOutcomesKnown) missing.push(`${stats.passes - stats.passOutcomesKnown} pass outcomes`);
    if (stats.crosses > stats.crossOutcomesKnown) missing.push(`${stats.crosses - stats.crossOutcomesKnown} cross outcomes`);
    if (stats.shots > stats.xgSample) missing.push(`${stats.shots - stats.xgSample} shot xG estimates`);
    const reason = missing.length > 1 ? `Unrecorded: ${missing.join('; ')}.`
      : stats.passes > stats.passOutcomesKnown ? outcomeReason("Pass", stats.passes, stats.passOutcomesKnown)
        : stats.shots > stats.xgSample ? `Valid xG estimates are available for only ${stats.xgSample}/${stats.shots} recorded shots.`
          : performance && stats.passes + stats.shots <= 1 ? sampleReason(stats.passes + stats.shots, "passes or shots") : "";
    const comparison = Number.isFinite(baseline?.pass_completion) && baseline.passes_attempted_per90 > 0 ? `The selected open-data passing baseline is ${percent(baseline.pass_completion)} across ${baseline.match_count} appearances.` : "No valid personal passing baseline is available.";
    return actionReply(`Through <strong>${formatClock(cutoff)}</strong>, ${person.name} completed ${stats.completedPasses}/${stats.passes} recorded passes (completion: ${passRate == null ? "Unavailable" : samplePercent(passRate)}; ${stats.passOutcomesKnown} known outcomes), with ${stats.crosses} crosses, ${stats.shots} shots and ${sampleXg(stats)} position-only estimated xG. ${reason}`, `${comparison} Historical comparison lists the selected fixtures and limits.`, evidenceFromEvents(rows.filter((item) => item.type === "shot")));
  }
  return { html: `For <strong>${person.name}</strong> through ${formatClock(cutoff)}, this view provides recorded passing, crossing, shot estimates and supported match insights. The requested detail is not provided.`, evidence: [] };
}

function appendUser(text, context = captureQuestionContext()) {
  const article = document.createElement("article");
  article.className = "message user-message";
  article.dataset.cutoffMs = context.cutoffMs;
  article.dataset.playerId = context.selectedPlayerId;
  article.dataset.mode = context.mode || "analyst";
  article.dataset.scopeType = context.scopeType || "player";
  article.dataset.queryId = context.queryId || "";
  article.innerHTML = `<div class="message-meta">You · ${formatClock(context.cutoffMs)} · ${escapeHtml(context.scopeType === "attack" ? team(context.teamId).name : context.selectedPlayer?.name || "Match")} · ${modeLabel(context.mode)}</div><p></p>`;
  article.querySelector("p").textContent = text;
  byId["chat-log"].append(article);
  scrollChatToBottom();
}

function appendAssistant(html, evidenceRows, context = captureQuestionContext(), metadata = {}) {
  metadata = { ...metadata, mode:metadata.mode || { kind:"rules", label:"Match facts" } };
  const article = document.createElement("article");
  article.className = "message assistant-message";
  article.dataset.cutoffMs = context.cutoffMs;
  article.dataset.playerId = context.selectedPlayerId;
  article.dataset.mode = context.mode || "analyst";
  article.dataset.scopeType = context.scopeType || "player";
  if (context.selectedChainId) article.dataset.chainId = context.selectedChainId;
  const content = document.createElement("div"); content.innerHTML = html;
  content.querySelectorAll("br").forEach(node => node.replaceWith(document.createTextNode(" ")));
  // Scope notices stay in full details, outside the answer's primary prose.
  content.querySelectorAll(".scope-note").forEach(note => { note.before(document.createTextNode(" ")); note.after(document.createTextNode(" ")); });
  const prose = content.cloneNode(true);
  prose.querySelectorAll(".scope-note").forEach(note => note.remove());
  const fullText = visibleCopy(content.textContent), brief = metadata.primaryText !== undefined ? visibleCopy(metadata.primaryText)
    : compactCopy(visibleCopy(prose.textContent), COPY_LIMITS[context.mode] || COPY_LIMITS.casual, context.mode === "analyst" ? 3 : 2, { includeGenericLimit:context.scopeType !== "attack", includeForecastCalibration:context.scopeType === "attack" || metadata.forecastState === "published" });
  article.innerHTML = `<div class="message-meta">Matchmind · through ${formatClock(context.cutoffMs)} · ${escapeHtml(context.scopeType === "attack" ? `${team(context.teamId).name} attack` : context.selectedPlayer?.name || "Match")} · ${modeLabel(context.mode)}</div><p>${escapeHtml(brief)}</p>`;
  if (fullText !== brief) {
    const more = document.createElement("details"), heading = document.createElement("summary"), text = document.createElement("p");
    more.className = "answer-more"; heading.textContent = "More details"; text.textContent = fullText; more.append(heading, text); article.append(more);
  }
  if (metadata.mode) {
    article.dataset.provider = metadata.mode.kind;
    article.dataset.providerStatus = metadata.status || "local_rules";
    article.dataset.queryId = context.queryId || "";
    const badge = document.createElement("div");
    badge.className = `answer-mode answer-mode-${metadata.mode.kind}`;
    badge.textContent = metadata.mode.kind === "cloud" ? "AI insight" : metadata.forecastState === "published" ? "Forecast estimate" : /pattern estimate|rule inference|spatial, progression/i.test(fullText) ? "Pattern estimate" : "Match facts";
    article.querySelector(".message-meta").after(badge);
  }
  if (evidenceRows?.length) {
    const evidenceRow = document.createElement("div");
    evidenceRow.className = "evidence-row";
    evidenceRows.forEach((item) => {
      const playback = item.receipt || createReplayReceipt(item.id, context.cutoffMs, item.chainId);
      const receipt = item.serverReceipt ? playback : withAttackDisplayScope(playback, context);
      if (!receipt) return;
      const button = document.createElement("button");
      button.className = "evidence-chip";
      button.dataset.evidenceScope = receipt.displayScope?.kind === "attack" ? "attack" : "event";
      const action = document.createElement("strong"), label = document.createElement("span");
      action.textContent = "Replay evidence"; label.textContent = item.label;
      button.append(action, label);
      button.addEventListener("click", async () => {
        if (state.attackReplay) { showReplayError("Return to the match to open this evidence."); return; }
        if (!item.serverReceipt) { openReplay(item.id, { receipt, preserveTimeline: true }); return; }
        button.disabled = true;
        try {
          await assistantApi.resolveReceipt(item.sessionId, item.serverReceipt);
          // Disabling an active button blurs it while the receipt is resolved.
          // Keep this original answer chip as the return target across that await.
          openReplay(item.id, { receipt, preserveTimeline: true, triggerFocus: button });
        } catch { showReplayError("This clip is unavailable. Your original answer is unchanged."); }
        finally { button.disabled = false; }
      });
      function showReplayError(text) {
        let error = article.querySelector(".evidence-error");
        if (!error) { error = document.createElement("p"); error.className = "evidence-error"; error.setAttribute("role", "status"); article.append(error); }
        error.textContent = text;
      }
      evidenceRow.append(button);
    });
    article.append(evidenceRow);
  }
  if (metadata.response) appendApiDetails(article, metadata.response);
  if (metadata.mode.kind !== "cloud" && (/fallback|unavailable/i.test(metadata.mode.label) || /^fallback_/.test(metadata.status || ""))) {
    const note = document.createElement("p"); note.className = "answer-notice";
    note.textContent = `${API_FALLBACK_COPY[metadata.status] || MODEL_STATUS_COPY[metadata.status] || API_FALLBACK_COPY.unavailable} Showing match facts.`; article.append(note);
  }
  byId["chat-log"].append(article);
  scrollChatToBottom();
}

async function askQuestion(rawQuestion) {
  const question = rawQuestion.trim();
  if (!question || question.length > 4000 || questionPending) return;
  let context = frozenCopy({ ...captureQuestionContext(), queryId: `web_${Date.now()}_${++querySequence}` });
  if (unsupportedPassingDetail(question)) {
    appendUser(question, context);
    byId["question-input"].value = "";
    const mode = { kind: "rules", label: "Passing detail unavailable · no model called" };
    appendAssistant(escapeHtml(PASSING_DETAIL_LIMIT), [], context, { mode, status: "unsupported_qualified_passing_measure" });
    lastAnswerMode = frozenCopy(mode);
    return;
  }
  if (isAttackExplanationQuestion(question)) {
    if (context.selectedChain) return askAttackQuestion(question, context);
    appendUser(question, context);
    byId["question-input"].value = "";
    const mode = { kind: "rules", label: "Attack context unavailable · no model called" };
    appendAssistant("No completed attack is selected for this question.", [], context, { mode, status: "attack_context_unavailable" });
    lastAnswerMode = frozenCopy(mode);
    return;
  }
  const projected = projectPlayerQuestion(question, context);
  context = frozenCopy(projected.context);
  if (projected.limitation) {
    appendUser(question, context); byId["question-input"].value = "";
    const mode = { kind:"rules", label:"Match facts" };
    appendAssistant(escapeHtml(projected.limitation), [], context, { mode, status:"evidence_context_mismatch" });
    lastAnswerMode = frozenCopy(mode); return;
  }
  // Compute local fallback against this same frozen snapshot before any await.
  const localResult = answerQuestion(question, context);
  const localAnswer = frozenCopy({ html: localResult.html, forecastState:localResult.forecastState, evidence: localResult.evidence.map((item) => ({ ...item, receipt: createReplayReceipt(item.id, context.cutoffMs, item.chainId) })).filter((item) => item.receipt) });
  appendUser(question, context);
  byId["question-input"].value = "";
  setQuestionPending(true);
  const typing = document.createElement("article");
  typing.className = "message assistant-message typing";
  typing.setAttribute("role", "status");
  typing.textContent = `Checking evidence frozen at ${formatClock(context.cutoffMs)}…`;
  byId["chat-log"].append(typing);
  scrollChatToBottom();
  try {
    if (localResult.scopeRefusal) {
      const mode = { kind: "rules", label: "Player context mismatch · no model called" };
      typing.remove();
      appendAssistant(localAnswer.html, [], context, { mode, status: "player_context_mismatch" });
      lastAnswerMode = frozenCopy(mode);
      return;
    }
    const { answer: response, sessionId } = await assistantApi.query(question, context);
    const isCloud = response.cloud_connected === true && response.provider_status === "model_validated" && response.model_profile === "gpt-5-mini" && ["azure_openai_responses", "foundry_project_responses", "foundry_resource_responses"].includes(response.provider);
    const scopeFallback = ["unsupported", "ambiguous"].includes(response.answerability?.status);
    const useLocalRule = response.answerability?.status === "unsupported" && /\b(?:histor\w*|baseline|tactic\w*|press\w*|possession|formation|phase|predict\w*|forecast\w*|next\s+(?:two|five|ten|2|5|10)|catch me up|last ten minutes|attack|fatigue|tired|stamina|acceleration|speed|physical|cloud|llm|foundry|azure|model|data source|SkillCorner|synthetic|tracking)\b/i.test(question) && !/\b(?:ignore|disregard|override|credentials?|password|api[- ]?key|system prompt)\b/i.test(question);
    const mode = isCloud ? { kind: "cloud", label: "GPT-5 mini · validated server facts" } : { kind: "rules", label: scopeFallback ? "Local rules · outside cloud scope" : `Server rules · ${MODEL_STATUS_COPY[response.provider_status] || "model answer not verified"}` };
    const rows = useLocalRule ? localAnswer.evidence : response.evidence_receipts.filter((receipt) => !isCloud || response.model_used_receipt_ids?.includes(receipt.receipt_id)).map((receipt) => ({ id: receipt.anchor_event_id, label: `${formatClock(event(receipt.anchor_event_id)?.t ?? receipt.as_of_ms)} · Evidence`, receipt: serverReplayReceipt(receipt, context), serverReceipt: frozenCopy(receipt), sessionId })).filter((item) => item.receipt);
    const html = useLocalRule ? `${localAnswer.html}<span class="scope-note">The cloud endpoint supports recorded passing, crossing, shooting and their player summary only. No model was called for this question.</span>` : escapeHtml(response.answer);
    typing.remove();
    appendAssistant(html, rows, context, { mode, status: response.provider_status, response, forecastState:useLocalRule ? localAnswer.forecastState : undefined });
    lastAnswerMode = frozenCopy(mode);
  } catch (error) {
    const mode = { kind: "rules", label: "Local rules fallback · cloud answer unavailable" };
    typing.remove();
    appendAssistant(`${localAnswer.html}<span class="scope-note">${escapeHtml(API_FALLBACK_COPY[error.code] || API_FALLBACK_COPY.unavailable)} This answer uses local demo rules.</span>`, localAnswer.evidence, context, { mode, status: error.code || "unavailable", forecastState:localAnswer.forecastState });
    lastAnswerMode = frozenCopy(mode);
  } finally { setQuestionPending(false); }
}

function attackFallback(chain, context, question) {
  const packet = publishedInsights("attacks", context.cutoffMs).find((row) => row.chainId === chain.id);
  const focus = packet?.focusCandidates?.[0];
  const text = focus?.[context.mode] || focus?.casual || `${team(chain.teamId).name} completed ${chain.metrics.completedPasses}/${chain.metrics.passes} passes in this attack, ending with ${chanceOutcomeCopy(chain)}.`;
  const hasPossessionGap = packet?.observations?.some(row => row.quality?.unknownPossessionSamples > 0) ?? false;
  return escapeHtml(attackMainText({ text, question, mode:context.mode, prefix:`Completed attack · ${formatClock(chain.startMs)}–${formatClock(chain.endMs)}: `, hasPossessionGap }));
}

function explainAttack(chainId) {
  const chain = chanceChain(chainId);
  if (!chain || chain.endMs > viewingTime() || questionPending) return;
  const context = frozenCopy({ ...captureQuestionContext(), scopeType: "attack", teamId: chain.teamId, selectedChainId: chain.id, selectedChain: chain, selectedEventId: chain.keyEventId, selectedEvent: event(chain.keyEventId), queryId: `attack_${Date.now()}_${++querySequence}` });
  if (byId["moment-dialog"].open) byId["moment-dialog"].close();
  openChat(false);
  void askAttackQuestion("How was this attack formed?", context);
}

async function askAttackQuestion(question, originalContext) {
  const chain = originalContext.selectedChain;
  if (!chain || chain.endMs > originalContext.cutoffMs || questionPending) return;
  const context = frozenCopy({ ...originalContext, scopeType: "attack", teamId: chain.teamId });
  const localHtml = attackFallback(chain, context, question);
  const localPacket = publishedInsights("attacks", context.cutoffMs).find((row) => row.chainId === chain.id);
  const localDetails = localPacket ? frozenCopy({ facts: localPacket.facts, claims: localPacket.claims, limitations: localPacket.limitations.map((row) => row.text), source_version: `${localPacket.sourceVersion} · browser rules`, answer_id: `local_${context.queryId}` }) : null;
  appendUser(question, context); byId["question-input"].value = ""; setQuestionPending(true);
  const typing = document.createElement("article"); typing.className = "message assistant-message typing"; typing.setAttribute("role", "status"); typing.textContent = `Checking the completed attack · frozen ${formatClock(context.cutoffMs)}…`; byId["chat-log"].append(typing); scrollChatToBottom();
  try {
    const { answer: response, sessionId } = await assistantApi.explainAttack(question, context);
    const cloud = response.cloud_connected === true && response.provider_status === "model_validated" && response.model_profile === "gpt-5-mini" && ["azure_openai_responses", "foundry_project_responses", "foundry_resource_responses"].includes(response.provider);
    const mode = cloud ? { kind: "cloud", label: "GPT-5 mini · validated attack claims" } : { kind: "rules", label: `Server attack rules · ${MODEL_STATUS_COPY[response.provider_status] || "model answer not verified"}` };
    const rows = response.evidence_receipts.filter((receipt) => !cloud || response.model_used_receipt_ids.includes(receipt.receipt_id)).map((receipt) => ({ id: receipt.anchor_event_id, label: `Attack ${formatClock(chain.startMs)}–${formatClock(chain.endMs)} · Evidence`, receipt: serverReplayReceipt(receipt, context), serverReceipt: frozenCopy(receipt), sessionId })).filter((row) => row.receipt);
    typing.remove(); appendAssistant(escapeHtml(response.answer), rows, context, { mode, status: response.provider_status, response }); lastAnswerMode = frozenCopy(mode);
  } catch (error) {
    typing.remove();
    const mode = { kind: "rules", label: "Local attack rules · server explanation unavailable" };
    appendAssistant(`${localHtml}<span class="scope-note">${escapeHtml(API_FALLBACK_COPY[error.code] || API_FALLBACK_COPY.unavailable)} No cloud explanation was verified for this answer.</span>`, evidenceFromChance(chain), context, { mode, status: error.code || "unavailable", response: localDetails }); lastAnswerMode = frozenCopy(mode);
  } finally { setQuestionPending(false); }
}

// Display only the part of the immutable absence record known at this viewing
// time. A replay can temporarily show less without rewriting the recorded range.
function projectAwayRange(cutoffMs, away = state.away, lastAway = state.lastAway) {
  const record = away || lastAway;
  if (!record || !Number.isFinite(cutoffMs) || !Number.isFinite(record.startMs)) return null;
  const cutoff = Math.max(0, Math.floor(cutoffMs));
  if (record.startMs > cutoff) return null;
  const phase = away ? "away" : "returned";
  const endMs = away ? cutoff : Math.max(record.startMs, Math.min(record.endMs, cutoff));
  return { phase, startMs: record.startMs, endMs, clipped: !away && endMs < record.endMs };
}

function renderAwayPresentation(force = false) {
  const cutoff = Math.max(0, Math.floor(Math.min(state.time, viewingTime())));
  const range = projectAwayRange(cutoff);
  const knownInterval = `Known interval 0:00 → ${formatClock(cutoff)}`;
  if (byId["story-through"].textContent !== knownInterval) byId["story-through"].textContent = knownInterval;
  const key = JSON.stringify([range?.phase, range?.startMs, range && Math.floor(range.endMs / 1000), range?.clipped, state.timelineFilter, state.timelineTeamFilter, state.selectedPlayerId, timelineCutoff]);
  const rewound = cutoff < awayPresentationCutoff;
  awayPresentationCutoff = cutoff;
  if (!force && !rewound && key === awayPresentationKey) return;
  awayPresentationKey = key;

  const cards = $$(".story-card");
  const members = new Set(cards.filter((button) => range && Number(button.dataset.time) > range.startMs && Number(button.dataset.time) <= range.endMs && Number(button.dataset.time) <= cutoff));
  const visible = cards.filter((button) => !button.hidden);
  const marked = visible.filter((button) => members.has(button));
  visible.forEach((button, index) => {
    const wrapper = button.parentElement;
    const highlighted = members.has(button);
    wrapper?.classList.toggle("away-run-start", highlighted && !members.has(visible[index - 1]));
    wrapper?.classList.toggle("away-run-end", highlighted && !members.has(visible[index + 1]));
  });
  cards.forEach((button) => {
    const wrapper = button.parentElement;
    const details = wrapper?.querySelector(".story-details");
    if (!storyAwayLabels.has(button)) storyAwayLabels.set(button, { label: button.getAttribute("aria-label"), title: button.title, detailsLabel: details?.getAttribute("aria-label") });
    const original = storyAwayLabels.get(button);
    const highlighted = !button.hidden && members.has(button);
    button.classList.toggle("away-published", highlighted);
    wrapper?.classList.toggle("away-published", highlighted);
    if (!highlighted) {
      wrapper?.classList.remove("away-run-start", "away-run-end");
      delete button.dataset.awayPublishedAtMs;
    } else button.dataset.awayPublishedAtMs = button.dataset.time;
    const suffix = highlighted ? ". Published while away" : "";
    button.setAttribute("aria-label", `${original.label}${suffix}`);
    button.title = `${original.title}${suffix}`;
    if (details) details.setAttribute("aria-label", `${original.detailsLabel}${suffix}`);
  });

  const status = byId["story-away-status"];
  status.hidden = !range;
  byId["story-through"].hidden = Boolean(range);
  if (range) {
    const phase = range.phase === "away" ? "Away" : "Returned";
    const count = range.endMs <= range.startMs ? "no advance" : marked.length ? `${marked.length} published` : members.size ? "0 in filter" : "no new stories";
    status.textContent = `${phase} ${formatClock(range.startMs)}–${formatClock(range.endMs)} · ${count}`;
    const explanation = `${phase} interval ${formatClock(range.startMs)} to ${formatClock(range.endMs)}${range.clipped ? ", limited to this viewing time" : ""}. ${marked.length} ${marked.length === 1 ? "story" : "stories"} published while away in the current filter. Highlights use publication time, not the full replay interval.${range.endMs <= range.startMs ? " The match playhead did not advance." : members.size && !marked.length ? " Other filters contain published stories in this interval." : !members.size ? " No stories were published in this interval." : ""}`;
    status.setAttribute("aria-label", explanation);
    status.title = explanation;
    status.dataset.phase = range.phase;
    status.dataset.startMs = range.startMs;
    status.dataset.endMs = range.endMs;
    status.dataset.storyCount = marked.length;
  } else {
    status.textContent = ""; status.title = ""; status.setAttribute("aria-label", "");
    for (const name of ["phase", "startMs", "endMs", "storyCount"]) delete status.dataset[name];
  }
  // This existing live status changes only at marker or visibility boundaries;
  // the quietly updated story caption carries the growing second-by-second end.
  const caption = !state.away && !state.lastAway ? "Same facts. Your level of detail."
    : !range ? "No away interval is visible at this viewing time."
      : range.phase === "away" ? `Away from ${formatClock(range.startMs)} · replay time`
        : range.clipped ? "Return recap is limited to this viewing time."
          : `Return recap: ${formatClock(range.startMs)}–${formatClock(range.endMs)}`;
  if (byId["away-status"].textContent !== caption) byId["away-status"].textContent = caption;
}

function updateAwayStatus() {
  byId["away-toggle"].setAttribute("aria-pressed", String(Boolean(state.away)));
  byId["away-toggle"].textContent = state.away ? "I'm back" : "Step away";
  renderAwayPresentation(true);
}
function markAway(source = "manual") {
  if (state.away || state.attackReplay || state.replay) return;
  state.away = frozenCopy({ startMs: Math.floor(state.time), source });
  updateAwayStatus();
}
function completeAway() {
  if (!state.away) return;
  // Match playhead can pause or stop with background RAF. Wall-clock time is not match time.
  state.lastAway = frozenCopy({ startMs: state.away.startMs, endMs: Math.max(state.away.startMs, Math.floor(state.time)), source: state.away.source });
  state.away = null; updateAwayStatus();
}
function recapActionTitle(row) {
  if (row.type === "passing_option") return `Passing option${["available", "targeted"].includes(row.outcome) ? ` · ${row.outcome}` : ""}`;
  if (row.type === "off_ball_run") return "Recorded off-ball run";
  if (row.type === "pressure") return "Pressure record";
  if (row.type === "clearance") return "Clearance";
  if (row.type === "turnover") return "Turnover";
  if (row.type === "foul") return "Foul suffered";
  if (row.type === "pass") return `${eventTitle(row)}${["complete", "incomplete"].includes(row.outcome) ? ` · ${row.outcome}` : " · outcome unavailable"}`;
  return eventTitle(row);
}
function personalizedCatchUp() {
  if (questionPending || state.attackReplay) return;
  if (state.away) completeAway();
  const captured = captureQuestionContext();
  const focusId = state.followedPlayerId || captured.selectedPlayerId, focus = player(focusId);
  // Follow is independent of the main selection. This recap's display and
  // evidence use one frozen focus without changing either global selection.
  const context = frozenCopy({ ...captured, selectedPlayerId: focusId, selectedPlayer: focus, selectedEventId: null, selectedEvent: null, selectedChainId: null, selectedChain: null, replay: null, queryId: `recap_${Date.now()}_${++querySequence}` });
  const recorded = state.lastAway;
  const startMs = recorded ? Math.min(recorded.startMs, context.cutoffMs) : Math.max(0, context.cutoffMs - 600000);
  const endMs = recorded ? Math.min(recorded.endMs, context.cutoffMs) : context.cutoffMs;
  const actions = eventsUntil(endMs).filter((row) => eventAvailableAt(row) > startMs && row.player === focusId);
  const visibleAttacks = publishedInsights("attacks", endMs);
  const chains = chanceChainsUntil(endMs).filter((row) => row.endMs > startMs && (row.participantIds.includes(focusId) || visibleAttacks.find((attack) => attack.chainId === row.id)?.participantIds.includes(focusId)));
  const changes = publishedInsights("turningPoints", endMs).filter((row) => row.availableAtMs > startMs && row.teamId === focus.teamId);
  const heading = recorded ? "Your marked replay interval" : "No time-away record: a rolling ten-minute review";
  const scope = state.followedPlayerId ? `Followed player: ${focus.name}` : `Selected player: ${focus.name}`;
  const count = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const reason = endMs <= startMs ? "The match playhead did not advance; this is a zero-length interval."
    : !actions.length && !chains.length && !changes.length ? "No eligible records were published in this interval; this does not establish inactivity."
      : !recorded ? "No time-away interval was marked; this reviews up to ten minutes." : "";
  const primaryText = `${scope} · ${formatClock(startMs)}–${formatClock(endMs)}: ${count(actions.length, "recorded action")}, ${count(chains.length, "related completed attack")}, ${count(changes.length, "team change")}.${reason ? ` ${reason}` : ""}`;
  const basis = `${heading}. Only records published in (${formatClock(startMs)}, ${formatClock(endMs)}] are included. Related attacks may include camera-observed association, which does not verify a touch or tactical cause. Team changes describe ${team(focus.teamId).name}, not individual-player effects. No eligible records does not establish inactivity.`;
  const actionDetails = actions.length ? ` Recorded actions: ${actions.map(row => `${formatClock(row.t)} ${recapActionTitle(row)}`).join("; ")}.` : "";
  const recentActions = actions.slice(-3);
  const evidence = recentActions.map(row => ({ id: row.id, label: `${formatClock(row.t)} ${recapActionTitle(row)}` }));
  openChat(false);
  appendUser("Catch me up on my replay interval.", context);
  appendAssistant(`${escapeHtml(primaryText)}<span class="scope-note">${escapeHtml(basis + actionDetails)}</span>`, evidence, context, { mode: { kind: "rules", label: "Personal recap · local published evidence" }, status: "personal_recap", primaryText });
  const article = byId["chat-log"].lastElementChild;
  article.dataset.recapStartMs = startMs; article.dataset.recapEndMs = endMs; article.dataset.recapPlayerId = focusId;
  article.dataset.recapActionCount = actions.length; article.dataset.recapAttackCount = chains.length; article.dataset.recapChangeCount = changes.length;
  if (actions.length) {
    const section = document.createElement("section"); section.className = "recap-records"; section.setAttribute("aria-label", "Recent recorded actions");
    const title = document.createElement("h3"); title.textContent = actions.length > 3 ? `Latest 3 of ${actions.length} recorded actions` : "Recorded actions";
    const list = document.createElement("ol"); list.className = "recap-actions";
    recentActions.forEach(row => { const item = document.createElement("li"); item.dataset.eventId = row.id; const time = document.createElement("time"), text = document.createElement("span"); time.textContent = formatClock(row.t); text.textContent = recapActionTitle(row); item.append(time, text); list.append(item); });
    section.append(title, list); article.insertBefore(section, article.querySelector(".answer-more"));
    scrollChatToBottom();
  }
  if (changes.length || chains.length) {
    const navigation = document.createElement("div"); navigation.className = "answer-recap";
    changes.slice(-1).forEach((row) => {
      const comparison = createTurningReplay(row.id, context.cutoffMs); if (!comparison) return;
      const button = document.createElement("button"); button.className = "recap-turning"; button.dataset.insightId = row.id; button.textContent = `Compare team change · ${formatClock(row.availableAtMs)}`;
      button.addEventListener("click", () => beginBoundedReplay(comparison.segments[0], comparison.segments)); navigation.append(button);
    });
    chains.slice(-2).forEach((row) => {
      const receipt = createReplayReceipt(row.keyEventId, context.cutoffMs, row.id); if (!receipt) return;
      const button = document.createElement("button"); button.className = "recap-attack"; button.dataset.chainId = row.id; button.textContent = `Related attack · ${formatClock(row.startMs)}–${formatClock(row.endMs)}`;
      button.addEventListener("click", () => startAttackReplay(receipt)); navigation.append(button);
    });
    article.append(navigation); scrollChatToBottom();
  }
}

function bindControls() {
  setupWorkspaceDialogs();
  setupReplayDragging();
  byId["audience-mode"].addEventListener("click", (event) => {
    const mode = event.target.closest("[data-audience-mode]")?.dataset.audienceMode;
    if (!["casual", "analyst"].includes(mode)) return;
    state.audienceMode = mode;
    $$("[data-audience-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.audienceMode === mode)));
    refreshInsightPresentation();
  });
  byId["offball-toggle"].addEventListener("click", () => { state.offBallVisible = !state.offBallVisible; byId["offball-toggle"].setAttribute("aria-pressed", String(state.offBallVisible)); renderOffBallEvidence(); });
  byId["offball-observation"].addEventListener("change", () => { if (state.replay) { state.replay.observationId = byId["offball-observation"].value; renderOffBallEvidence(); } });
  byId["evidence-play-again"].addEventListener("click", () => { if (state.replay) { Object.assign(state.replay, { time: state.replay.start, playing: true, lastAt: performance.now() }); renderReplay(); } });
  byId["away-toggle"].addEventListener("click", () => { if (state.away) completeAway(); else markAway(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) markAway("visibility"); else if (state.away?.source === "visibility") completeAway(); });
  byId["demo-open"].addEventListener("click", () => { refreshInsightPresentation(); openAppDialog("demo-dialog"); });
  byId["demo-find-turning"].addEventListener("click", () => {
    const row = publishedInsights("turningPoints").at(-1);
    if (!row) return;
    setTimelineTeamFilter("all");
    setTimelineFilter("all");
    const card = $$(".timeline-turning-point").find((button) => button.dataset.insightId === row.id && !button.hidden);
    if (!card) return;
    holdStoryRailPosition(true);
    // Find is navigation, so the dialog's close event must return to its visible destination.
    dialogReturnFocus.set(byId["demo-dialog"], card);
    byId["demo-dialog"].close();
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
    requestAnimationFrame(() => {
      if (!card.isConnected || card.hidden || !card.getClientRects().length) return;
      card.focus({ preventScroll: true });
      card.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
    });
  });
  window.addEventListener("message", handle3DViewerMessage);
  window.addEventListener("keydown", handleReplayKey, true);
  document.addEventListener("fullscreenchange", () => {
    if (!state.attackReplay) return;
    if (document.fullscreenElement === byId["match-viewer"]) { state.attackReplay.presentation = "native"; renderAttackControls(); }
    else if (state.attackReplay.presentation === "native") returnToMatch();
  });
  byId["attack-replay-return"].addEventListener("click", returnToMatch);
  byId["attack-replay-toggle"].addEventListener("click", toggleAttackReplay);
  byId["attack-replay-again"].addEventListener("click", replayAgain);
  byId["attack-replay-next"].addEventListener("click", () => {
    if (state.attackReplay?.kind === "story" && !state.attackReplay.authorizing && !state.attackReplay.authorizationFailed) advanceComparisonSegment();
  });
  byId["view-3d"].addEventListener("click", () => setViewMode("3d"));
  byId["view-2d"].addEventListener("click", () => setViewMode("2d"));
  byId["play-toggle"].addEventListener("click", () => {
    if (state.attackReplay) { toggleAttackReplay(); return; }
    state.autoStartPending = false;
    state.playing = !state.playing;
    if (!state.playing) state.followingLive = false;
    state.lastFrameAt = performance.now();
    byId["play-icon"].textContent = state.playing ? "❚❚" : "▶";
  });
  byId["live-button"].addEventListener("click", () => {
    if (state.attackReplay) { returnToMatch(); return; }
    state.time = state.liveEdge;
    state.playing = true;
    state.followingLive = true;
    state.lastFrameAt = performance.now();
    byId["play-icon"].textContent = "❚❚";
    renderAll(true);
  });
  byId["close-replay"].addEventListener("click", () => {
    byId["replay-panel"].hidden = true; state.replay = null;
    if (replayDialogReturn) { restoreDialogReturn(replayDialogReturn); replayDialogReturn = null; }
    else if (replayTriggerFocus?.isConnected) replayTriggerFocus.focus({ preventScroll: true });
    replayTriggerFocus = null;
  });
  byId["timeline-replay"].addEventListener("click", () => state.selectedEventId && openReplay(state.selectedEventId));
  byId["follow-button"].addEventListener("click", () => {
    state.followed = !state.followed;
    state.followedPlayerId = state.followed ? state.selectedPlayerId : null;
    byId["follow-button"].setAttribute("aria-pressed", String(state.followed));
    byId["follow-button"].textContent = state.followed ? "✓ Following" : "＋ Follow";
  });
  byId["chat-shortcut"].addEventListener("click", () => openChat());
  byId["question-form"].addEventListener("submit", (e) => { e.preventDefault(); askQuestion(byId["question-input"].value); });
  byId["question-input"].addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); byId["question-form"].requestSubmit(); }
  });
  byId["suggestions"].addEventListener("click", (e) => {
    if (e.target.matches("button")) { byId["suggestions-dialog"].close(); openChat(false); askQuestion(e.target.textContent); }
  });
  byId["catch-up-button"].addEventListener("click", personalizedCatchUp);
  byId["timeline-track"].addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    if (e.target !== byId["timeline-track"] && !e.target.closest(".story-card")) return;
    e.preventDefault();
    navigateStoryRail(e.key);
  });
  $$(".timeline-filters button").forEach((button) => button.addEventListener("click", () => setTimelineFilter(button.dataset.filter)));
  $$(".story-team-filters button").forEach((button) => button.addEventListener("click", () => setTimelineTeamFilter(button.dataset.teamFilter)));
  byId["story-filters-open"].addEventListener("click", () => openAppDialog("story-filters-dialog"));
  byId["timeline-track"].addEventListener("scroll", () => {
    if (!storyRailScrollHolding) storyRailFollowLatest = !storyRailKeyboardBrowsing && storyRailAtEnd();
  }, { passive: true });
  for (const name of ["wheel", "pointerdown"]) byId["timeline-track"].addEventListener(name, () => {
    holdStoryRailPosition();
    requestAnimationFrame(() => {
      if (!storyRailKeyboardBrowsing) storyRailFollowLatest = storyRailAtEnd();
    });
  }, { passive: true });
  byId["timeline-track"].addEventListener("focusin", (event) => {
    if (event.target.closest(".story-card, .story-details")) holdStoryRailPosition(true);
  });
  window.addEventListener("resize", () => { if (storyRailFollowLatest) queueStoryRailToEnd(); });
}

function renderAll(force = false) {
  if (state.attackReplay) {
    sync3DViewer(force);
    renderScoreAndClock();
    renderAttackControls();
    return;
  }
  renderPitch();
  sync3DViewer(force);
  renderScoreAndClock();
  if (force || performance.now() - state.uiTick > 800) {
    renderPlayerPanel();
    state.uiTick = performance.now();
  }
  renderReplay();
  playerStoryUI?.refresh();
}

function animate(now) {
  const delta = Math.min(100, now - state.lastFrameAt);
  state.lastFrameAt = now;
  const duration = matchEnd();
  const loadedEdge = state.data.frames.at(-1)?.t ?? 0;
  if (!state.autoStartPending && state.liveEdge < duration) {
    state.liveEdge = Math.max(state.liveEdge, Math.min(duration, loadedEdge, state.liveEdge + delta));
  }
  if (state.attackReplay) advanceAttackReplay(delta);
  else if (state.playing && !state.viewerReturn) {
    if (state.followingLive) state.time = state.liveEdge;
    else state.time = Math.min(state.liveEdge, state.time + delta);
    if (state.liveEdge - state.time < 120) state.followingLive = true;
    skipUnavailableTracking(now);
    if (state.time >= duration) { state.time = duration; state.playing = false; byId["play-icon"].textContent = "▶"; }
  }
  renderAll();
  requestAnimationFrame(animate);
}

function expandQuantizedFrames(data, frames = data.frames) {
  const scales = data.meta?.quantization;
  if (!scales) return;
  frames.forEach((frame) => {
    frame.b = frame.b.map((value, index) => value / (scales.ball[index] || 1));
    frame.p = frame.p.map((point) => point.map((value, index) => value / (scales.player[index] || 1)));
  });
}

async function fetchFrameChunk(file, data) {
  const response = await fetch(`./data/${file}`);
  if (!response.ok) throw new Error(`Tracking chunk ${file} · HTTP ${response.status}`);
  const frames = await response.json();
  expandQuantizedFrames(data, frames);
  return frames;
}

async function loadRemainingChunks(data, chunks) {
  for (let index = 1; index < chunks.length; index += 1) {
    const frames = await fetchFrameChunk(chunks[index].file, data);
    data.frames.push(...frames);
    const percentLoaded = Math.round(((index + 1) / chunks.length) * 100);
    state.bufferPercent = percentLoaded;
  }
  state.allFramesLoaded = true;
}

async function init() {
  cacheElements();
  try {
    const response = await fetch(`./data/demo.json?v=${RELEASE_VERSION}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const analyticsFiles = [
      ["possessions", "./data/live/possessions.json"],
      ["chanceChains", "./data/live/chance-chains.json"],
      ["evidenceIndex", "./data/live/evidence-index.json"],
      ["tacticalStates", `./data/live/tactical-states.json?v=${RELEASE_VERSION}`],
      ["tacticalChanges", `./data/live/tactical-changes.json?v=${RELEASE_VERSION}`],
      ["forecastSnapshots", `./data/live/forecast-snapshots.json?v=${RELEASE_VERSION}`],
      ["forecastOutcomes", `./data/live/forecast-outcomes.json?v=${RELEASE_VERSION}`],
      ["matchInsights", `./data/live/match-insights.json?v=${RELEASE_VERSION}`],
    ];
    const analyticsResults = await Promise.all(analyticsFiles.map(async ([key, url]) => {
      const analyticsResponse = await fetch(url);
      if (!analyticsResponse.ok) throw new Error(`${key} · HTTP ${analyticsResponse.status}`);
      return [key, await analyticsResponse.json()];
    }));
    data.analytics = Object.fromEntries(analyticsResults);
    if (data.frameChunks?.length) {
      byId.loading.querySelector("p").textContent = "Loading the match replay";
      data.frames = await fetchFrameChunk(data.frameChunks[0].file, data);
      state.bufferPercent = Math.round(100 / data.frameChunks.length);
    } else {
      expandQuantizedFrames(data);
    }
    state.data = data;
    setupMatch();
    byId.loading.hidden = true;
    byId.app.hidden = false;
    state.lastFrameAt = performance.now();
    requestAnimationFrame(animate);
    if (data.frameChunks?.length > 1) loadRemainingChunks(data, data.frameChunks).catch((error) => {
      document.querySelector(".tracking-label").textContent = "Replay partly loaded";
      console.error(error);
    });
  } catch (error) {
    byId.loading.innerHTML = `<p>The replay could not load.</p><small>Refresh to try again.</small>`;
  }
}

init();
