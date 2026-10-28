import { buildPlayerStory, validatePlayerStorySnapshot } from './player-story-core.js?v=2026-10-26-M1';
import { visibleCopy, compactCopy, storyIntro, storyChapter, COPY_LIMITS } from './display-copy.js?v=2026-10-27-U3';
import { createPlayerWatchlist } from './player-story-watchlist.js?v=2026-10-27-T1';

const MAX_STORY_BYTES = 1024 * 1024;
const safeId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,160}$/.test(value);
const time = value => Number.isSafeInteger(value) && value >= 0;
const sha = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const exact = (value, keys) => value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
const frozen = value => { const copy = structuredClone(value); const lock = row => { if (row && typeof row === 'object') { Object.values(row).forEach(lock); Object.freeze(row); } }; lock(copy); return copy; };
const element = (tag, text, className = '') => { const node = document.createElement(tag); node.textContent = visibleCopy(text); if (className) node.className = className; return node; };

class StoryApiError extends Error {
  constructor(code, status = 0) { super(code); this.code = code; this.status = status; }
}

// Separate story transport: snapshots have a 1 MiB ceiling; assistant answers retain their old limit.
export function createPlayerStoryApi({ getSession, input, fetchImpl = fetch }) {
  async function request(path, body, method = 'POST') {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetchImpl(`/api/${path}`, { method, credentials: 'same-origin', redirect: 'error', cache: 'no-store', headers: { accept: 'application/json', ...(method === 'POST' ? { 'content-type': 'application/json' } : {}) }, ...(method === 'POST' ? { body: JSON.stringify(body) } : {}), signal: controller.signal });
      if (!response.ok) throw new StoryApiError(response.status === 401 ? 'sign_in_required' : response.status === 403 ? 'not_authorized' : response.status === 404 ? 'not_found' : response.status === 410 ? 'expired_or_removed' : response.status === 409 ? 'source_or_snapshot_conflict' : response.status === 429 ? 'temporarily_busy' : response.status === 400 ? 'invalid_request' : 'storage_unavailable', response.status);
      if (!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type') || '')) throw new StoryApiError('invalid_response');
      const length = response.headers.get('content-length');
      if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_STORY_BYTES)) throw new StoryApiError('invalid_response');
      if (!response.body?.getReader) throw new StoryApiError('invalid_response');
      const reader = response.body.getReader(), chunks = []; let size = 0;
      try {
        for (;;) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > MAX_STORY_BYTES) { void reader.cancel().catch(() => {}); throw new StoryApiError('invalid_response'); } chunks.push(value); }
      } finally { reader.releaseLock(); }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new StoryApiError('invalid_response'); }
    } catch (error) {
      if (error instanceof StoryApiError) throw error;
      throw new StoryApiError(controller.signal.aborted ? 'timeout' : 'offline_or_unavailable');
    } finally { clearTimeout(timer); }
  }
  async function validateSnapshot(value) {
    validatePlayerStorySnapshot(value.snapshot, input);
    if (!sha(value.snapshot_sha256)) throw new StoryApiError('invalid_response');
    const bytes = new TextEncoder().encode(JSON.stringify(value.snapshot));
    const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
    if (hash !== value.snapshot_sha256) throw new StoryApiError('invalid_response');
    return value;
  }
  async function saved(value, expected = null) {
    if (!exact(value, ['story_id', 'created_at_ms', 'snapshot_sha256', 'persistence', 'read_only', 'snapshot', 'idempotency', 'shares']) || !['created', 'replayed'].includes(value.idempotency) || !safeId(value.story_id) || !time(value.created_at_ms) || value.persistence !== 'd1' || value.read_only !== true || expected && !same(value.snapshot, expected) || value.shares !== undefined && (!Array.isArray(value.shares) || value.shares.some(row => !safeId(row.share_id) || !time(row.created_at_ms) || !time(row.expires_at_ms) || row.revoked_at_ms !== null && !time(row.revoked_at_ms)))) throw new StoryApiError('invalid_response');
    await validateSnapshot(value); return frozen(value);
  }
  return Object.freeze({
    async save(snapshot, saveId) {
      const session = await getSession();
      let current = await request(`sessions/${encodeURIComponent(session.session_id)}`, undefined, 'GET');
      for (const delay of [60, 120, 180]) { if (time(current?.visible_cutoff_ms) && snapshot.cutoff_ms <= current.visible_cutoff_ms) break; await new Promise(resolve => setTimeout(resolve, delay)); current = await request(`sessions/${encodeURIComponent(session.session_id)}`, undefined, 'GET'); }
      if (current?.session_id !== session.session_id || current?.match_id !== snapshot.match.match_id || !time(current.visible_cutoff_ms) || snapshot.cutoff_ms > current.visible_cutoff_ms) throw new StoryApiError('visibility_not_ready');
      const value = await request('stories/save', { session_id: session.session_id, match_id: snapshot.match.match_id, player_id: snapshot.player.player_id, source_version: snapshot.source_version, cutoff_ms: snapshot.cutoff_ms, mode: snapshot.mode, save_id: saveId });
      if (!['created', 'replayed'].includes(value?.idempotency)) throw new StoryApiError('invalid_response');
      return saved(value, snapshot);
    },
    async list(cursor = null) {
      const value = await request('stories/list', { cursor });
      if (!exact(value, ['stories', 'next_cursor']) || !Array.isArray(value.stories) || value.next_cursor !== null && typeof value.next_cursor !== 'string' || value.stories.some(row => !safeId(row.story_id) || !time(row.created_at_ms) || !safeId(row.player?.player_id) || typeof row.player.name !== 'string' || !time(row.cutoff_ms) || !['casual', 'analyst'].includes(row.mode) || !time(row.chapter_count) || !time(row.active_share_count))) throw new StoryApiError('invalid_response');
      return frozen(value);
    },
    async open(storyId) { const value = await saved(await request('stories/open', { story_id: storyId })); if (value.story_id !== storyId) throw new StoryApiError('invalid_response'); return value; },
    async remove(storyId) { const value = await request('stories/delete', { story_id: storyId }); if (value?.deleted !== true || value.story_id !== storyId) throw new StoryApiError('invalid_response'); return value; },
    async share(storyId) {
      const value = await request('stories/share', { story_id: storyId });
      if (!safeId(value?.share_id) || typeof value.share_token !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(value.share_token) || !time(value.expires_at_ms) || typeof value.share_url !== 'string') throw new StoryApiError('invalid_response');
      const url = new URL(value.share_url, location.origin);
      if (url.origin !== location.origin || url.pathname !== '/' || url.search || url.hash !== `#story-share=${value.share_token}`) throw new StoryApiError('invalid_response');
      return Object.freeze({ ...value, share_url: url.href });
    },
    async revoke(storyId, shareId) { const value = await request('stories/revoke', { story_id: storyId, share_id: shareId }); if (value?.revoked !== true || value.story_id !== storyId || value.share_id !== shareId) throw new StoryApiError('invalid_response'); return value; },
    async shared(token) {
      const value = await request('stories/shared', { share_token: token });
      if (!exact(value, ['snapshot', 'snapshot_sha256', 'read_only', 'persistence', 'share_id', 'expires_at_ms']) || value.read_only !== true || value.persistence !== 'shared' || !safeId(value.share_id) || !time(value.expires_at_ms) || ['owner', 'owner_id', 'session_id', 'story_id', 'share_token', 'shares'].some(key => Object.hasOwn(value, key))) throw new StoryApiError('invalid_response');
      await validateSnapshot(value); return frozen(value);
    },
    async resolve(access, clip, snapshotHash) {
      const value = await request('stories/resolve', { ...access, clip_id: clip.clip_id });
      if (!exact(value, ['clip', 'snapshot_sha256', 'scope', 'read_only']) || value.scope !== 'player_story' || value.read_only !== true || value.snapshot_sha256 !== snapshotHash || !same(value.clip, clip)) throw new StoryApiError('invalid_response');
      return frozen(value.clip);
    }
  });
}

const errorText = code => ({ sign_in_required: 'Sign in to this site before using saved or shared stories.', not_authorized: 'This story is not authorized for this account.', not_found: 'The story or share could not be found.', expired_or_removed: 'This story or share has expired, been revoked or been removed.', source_or_snapshot_conflict: 'This saved story is not available for the current match.', invalid_response: 'The story could not be verified. It has not been accepted as saved.', invalid_request: 'The story request was rejected. Reopen a valid story and try again.', timeout: 'This action was not confirmed. Check saved stories before saving again.', temporarily_busy: 'The service is temporarily busy. Try this operation again.', visibility_not_ready: 'This match time is not ready yet. Try again keeps the same story.', offline_or_unavailable: 'Stories are unavailable right now. An open story can still be exported.', storage_unavailable: 'This action could not be confirmed.', STATE_VERSION_MISMATCH: 'This saved story is not available for this match.', INVALID_SNAPSHOT: 'This story could not be verified and cannot be opened.' }[code] || 'This action was not confirmed. Check your saved stories before trying again.');

export function createPlayerStoryUI({ getContext, getSession, openDialog, onReplay, formatClock }) {
  const ids = ['open', 'dialog', 'live', 'saved', 'status', 'retry', 'main', 'state', 'player', 'mode', 'cutoff', 'source', 'binding', 'start', 'style', 'resume', 'heading', 'summary', 'replay', 'save', 'export', 'share', 'empty', 'chapters', 'limitations', 'share-panel', 'share-link', 'copy', 'shares', 'library', 'list', 'more', 'refresh', 'menu', 'device', 'followed', 'observed', 'search', 'team', 'results'];
  const nodes = Object.fromEntries(ids.map(id => [id, document.getElementById(`player-story-${id}`)]));
  const context = getContext(), input = { demo: context.demo, matchInsights: context.matchInsights, sourceVersion: context.matchInsights.sourceVersion };
  const api = createPlayerStoryApi({ getSession, input });
  const watchlist = createPlayerWatchlist({ matchId:input.demo.match.match_id, sourceVersion:input.sourceVersion, players:input.demo.players });
  const workspaces = new Map(), storyViews = new Map();
  let workspaceId = null, active = null, live = null, busy = false, retry = null, view = 'menu', nextCursor = null, lastBucket = -1, lastFollowedId = null;
  let saveAttempt = null, shareLink = '', activeLinkId = null, renderedShares = null;
  let focusRevision = 0;
  const chapterNodes = new Map();
  const setStatus = (text, code = '') => { nodes.status.textContent = compactCopy(text, 40, 2); nodes.status.dataset.status = code; };
  const usableFocus = node => node?.isConnected && nodes.dialog.contains(node) && !node.disabled && !node.closest('[hidden]') && node.getClientRects().length > 0;
  function retainViewFocus(next, preferred = null) {
    const revision = ++focusRevision;
    // Wait for this navigation's synchronous rendering and disabled states.
    // Never replace a usable focus, or focus a closed/obsolete view.
    queueMicrotask(() => {
      if (revision !== focusRevision || !nodes.dialog.open || view !== next || usableFocus(document.activeElement)) return;
      const choices = next === 'current' ? [nodes.replay, nodes.export, nodes.start]
        : next === 'menu' ? [nodes.observed.querySelector('[data-observer-action="open"]'), nodes.search]
          : [nodes.list.querySelector('button'), nodes.refresh];
      const target = [preferred, ...choices, nodes.dialog.querySelector('[data-dialog-close="player-story-dialog"]')].find(usableFocus);
      target?.focus({ preventScroll:true });
    });
  }
  function showView(next) { view = next; nodes.dialog.dataset.view = next; nodes.menu.hidden = next !== 'menu'; nodes.main.hidden = next !== 'current'; nodes.library.hidden = next !== 'saved'; nodes.live.setAttribute('aria-pressed', String(next === 'menu')); nodes.saved.setAttribute('aria-pressed', String(next === 'saved')); nodes.dialog.querySelector('.dialog-body').scrollTop = 0; retainViewFocus(next); }
  function stashWorkspace() {
    if (active?.kind === 'saved') storyViews.set(active.storyId, { shareLink, activeLinkId });
    if (workspaceId === null) return;
    workspaces.set(workspaceId, { active, live, retry, saveAttempt, shareLink, activeLinkId, status:nodes.status.textContent, statusCode:nodes.status.dataset.status || '' });
  }
  function resetViewState() { workspaceId = null; active = null; live = null; retry = null; saveAttempt = null; shareLink = ''; activeLinkId = null; renderedShares = null; clearChapterNodes(); for (const key of ['storyKind','playerId','mode','cutoffMs','storyId','snapshotSha256']) delete nodes.dialog.dataset[key]; }
  function openMenu() {
    if (busy) return;
    stashWorkspace(); resetViewState(); showView('menu'); setStatus(''); renderMenu(); renderActions();
  }
  function openWorkspace(playerId) {
    if (busy) return;
    const entry = watchlist.list().find(row => row.player_id === playerId); if (!entry) return;
    stashWorkspace(); const stored = workspaces.get(playerId); resetViewState(); workspaceId = playerId;
    if (stored) {
      ({ active, live, retry, saveAttempt, shareLink, activeLinkId } = stored);
      setStatus(stored.status, stored.statusCode);
    } else {
      live = { kind:'live', snapshot:buildPlayerStory(input, { playerId, cutoffMs:getContext().cutoffMs, mode:entry.mode }) }; active = live;
      setStatus('New completed actions add chapters to this player’s story.', 'live');
    }
    // The observation menu always opens the ongoing story. Saved copies are
    // opened explicitly from the library, never substituted for a live prefix.
    if (live) { active = live; shareLink = ''; activeLinkId = null; watchlist.setMode(playerId, live.snapshot.mode); }
    if (saveAttempt?.pending && retry) setStatus(`Saving the copy through ${formatClock(saveAttempt.snapshot.cutoff_ms)} was not confirmed. Try again keeps that original copy.`, 'save_unconfirmed');
    else { retry = null; setStatus('Current story resumed for this player.', 'live'); }
    nodes.style.dataset.playerId = ''; showView('current'); refresh(true); render(); stashWorkspace();
  }
  function addObserver(playerId) {
    if (busy) return;
    watchlist.add(playerId, workspaces.get(playerId)?.live?.snapshot.mode || getContext().mode); renderMenu(); setStatus(watchlist.persistent ? 'Player added to your observation list on this device.' : 'Player added to your observation list for this visit.', 'observed');
    nodes.observed.querySelector(`[data-player-id="${CSS.escape(playerId)}"] button`)?.focus({ preventScroll:true });
  }
  function renderMenu() {
    const previousFocus = document.activeElement, replaceFocusedRow = nodes.menu.contains(previousFocus) && previousFocus.matches('[data-observer-action]');
    const previousPlayer = replaceFocusedRow ? previousFocus.closest('[data-player-id]')?.dataset.playerId : null;
    const previousAction = replaceFocusedRow ? previousFocus.dataset.observerAction : null;
    const next = getContext(), followedId = next.followedPlayerId ?? null, entries = watchlist.list(), observedIds = new Set(entries.map(row => row.player_id));
    lastFollowedId = followedId;
    nodes.device.textContent = watchlist.persistent ? 'Observation list and story styles stay on this device for this match. Saved stories are separate.' : 'Your observation list is available for this visit. This browser could not keep it on this device.';
    const club = player => input.demo.teams.find(row => row.id === player.teamId)?.name || '';
    function rowFor(player, observed, removable = false) {
      const row = element('article', '', 'player-story-observer'); row.dataset.playerId = player.id;
      const identity = element('div', '', 'player-story-observer-identity');
      identity.append(element('strong', player.name), element('span', `#${player.number ?? '—'} · ${club(player)}${player.id === followedId ? ' · Following' : ''}`));
      if (observed) identity.append(element('span', `${entries.find(item => item.player_id === player.id).mode === 'analyst' ? 'Analyst' : 'Casual'} story`));
      const actions = element('div', '', 'player-story-observer-actions'), button = element('button', observed ? 'Open story' : player.id === followedId ? 'Add followed player' : 'Add player');
      button.dataset.observerAction = observed ? 'open' : 'add'; button.disabled = busy;
      button.addEventListener('click', () => observed ? openWorkspace(player.id) : addObserver(player.id)); actions.append(button);
      if (removable) {
        const remove = element('button', 'Remove'); remove.dataset.observerAction = 'remove'; remove.setAttribute('aria-label', `Remove ${player.name} from observation list`); remove.disabled = busy;
        remove.addEventListener('click', () => { if (busy) return; watchlist.remove(player.id); renderMenu(); setStatus('Player removed from this list. Saved stories and sharing links are unchanged.', 'removed_observer'); }); actions.append(remove);
      }
      row.append(identity, actions); return row;
    }
    nodes.followed.replaceChildren();
    const followed = input.demo.players.find(row => row.id === followedId);
    nodes.followed.hidden = !followed || observedIds.has(followedId);
    if (followed && !observedIds.has(followedId)) nodes.followed.append(element('h3', 'Following'), rowFor(followed, false));
    nodes.observed.replaceChildren();
    const ordered = [...entries].sort((a,b) => Number(b.player_id === followedId) - Number(a.player_id === followedId));
    for (const entry of ordered) nodes.observed.append(rowFor(input.demo.players.find(row => row.id === entry.player_id), true, true));
    if (!entries.length) nodes.observed.append(element('p', 'No players observed yet. Add a player below.'));
    const term = nodes.search.value.trim().toLocaleLowerCase('en'), teamId = nodes.team.value;
    const numeric = /^#?\d+$/.test(term);
    const players = input.demo.players.filter(player => (!teamId || player.teamId === teamId) && (!term || (numeric ? player.number != null && Number(player.number) === Number(term.replace('#','')) : `${player.name} ${player.fullName || ''}`.toLocaleLowerCase('en').includes(term)))).sort((a,b) => Number(b.id === followedId) - Number(a.id === followedId) || a.name.localeCompare(b.name, 'en'));
    nodes.results.replaceChildren(...players.map(player => rowFor(player, observedIds.has(player.id))));
    if (!players.length) nodes.results.append(element('p', 'No matching players in this match.'));
    if (replaceFocusedRow) retainViewFocus('menu', nodes.menu.querySelector(`[data-player-id="${CSS.escape(previousPlayer)}"] [data-observer-action="${previousAction}"]`));
  }
  function setBusy(value) { busy = value; nodes.dialog.setAttribute('aria-busy', String(value)); renderActions(); }
  function renderActions() {
    const snapshot = active?.snapshot;
    nodes.replay.disabled = busy || !snapshot?.playlist.length;
    nodes.save.disabled = busy || !snapshot || ['saved', 'shared'].includes(active.kind);
    nodes.export.disabled = busy || !snapshot;
    nodes.share.disabled = busy || active?.kind !== 'saved';
    nodes.open.disabled = busy; nodes.start.disabled = busy; nodes.resume.disabled = busy; nodes.style.disabled = busy; nodes.live.disabled = busy; nodes.saved.disabled = busy;
    nodes.search.disabled = busy; nodes.team.disabled = busy;
    nodes.refresh.disabled = busy; nodes.more.disabled = busy; nodes.copy.disabled = busy || !shareLink;
    nodes.retry.hidden = !retry; nodes.retry.disabled = busy;
    nodes.list.querySelectorAll('button').forEach(button => { button.disabled = busy; });
    nodes.shares.querySelectorAll('button').forEach(button => { button.disabled = busy; });
    nodes.chapters.querySelectorAll('button').forEach(button => { button.disabled = busy; });
    nodes.menu.querySelectorAll('button').forEach(button => { button.disabled = busy; });
  }
  async function refreshStoredStory(storyId, confirmedMessage) {
    const refresh = async () => { acceptSaved(await api.open(storyId)); setStatus(confirmedMessage, 'updated'); };
    try { await refresh(); }
    catch { retry = refresh; renderShares(); setStatus(`${confirmedMessage} Sharing details could not be refreshed. Try again reloads the saved story.`, 'metadata_unavailable'); }
  }
  function renderShares() {
    const shares = active?.kind === 'saved' ? active.shares || [] : [];
    const key = JSON.stringify([active?.kind, active?.storyId, shares, shareLink]);
    if (key === renderedShares) return;
    renderedShares = key;
    nodes.shares.replaceChildren();
    nodes['share-panel'].hidden = !shares.length && !shareLink;
    nodes['share-link'].value = shareLink;
    nodes['share-link'].parentElement.hidden = !shareLink;
    nodes['share-panel'].querySelector('label').hidden = !shareLink;
    for (const share of shares) {
      const row = element('div', '', 'player-story-share-row'); row.dataset.shareId = share.share_id;
      row.append(element('span', share.revoked_at_ms !== null ? 'Revoked read-only link' : `Read-only link · expires ${new Date(share.expires_at_ms).toLocaleString('en-GB')}`));
      if (share.revoked_at_ms === null) {
        const button = element('button', 'Revoke link'); button.dataset.storyAction = 'revoke';
        button.addEventListener('click', () => run(async () => {
          const savedId = active.storyId; await api.revoke(savedId, share.share_id);
          if (activeLinkId === share.share_id) { shareLink = ''; activeLinkId = null; }
          active.shares = active.shares.filter(row => row.share_id !== share.share_id);
          await refreshStoredStory(savedId, 'Read-only link revoked. The private frozen story remains saved.');
          if (!retry) setStatus('Read-only link revoked. The private frozen story remains saved.', 'revoked');
          nodes.share.focus({ preventScroll: true });
        })); row.append(button);
      }
      nodes.shares.append(row);
    }
  }
  function render() {
    const snapshot = active?.snapshot;
    if (!snapshot) { renderActions(); return; }
    nodes.dialog.dataset.storyKind = active.kind; nodes.dialog.dataset.playerId = snapshot.player.player_id; nodes.dialog.dataset.mode = snapshot.mode; nodes.dialog.dataset.cutoffMs = snapshot.cutoff_ms; nodes.dialog.dataset.storyId = active.storyId || ''; nodes.dialog.dataset.snapshotSha256 = active.hash || '';
    nodes.state.textContent = ({ live: 'Current story', local: 'Not saved', saved: 'Saved story', shared: 'Shared · Read only' })[active.kind];
    nodes.player.textContent = `${snapshot.player.name} · ${snapshot.player.team_name}`;
    nodes.mode.textContent = `${snapshot.mode === 'analyst' ? 'Analyst' : 'Casual'} · fixed for this story`;
    nodes.cutoff.textContent = `Through ${formatClock(snapshot.cutoff_ms)}`;
    nodes.source.textContent = 'From match records';
    nodes.heading.textContent = snapshot.title; nodes.summary.textContent = compactCopy(storyIntro(snapshot, formatClock(snapshot.cutoff_ms), { matchTimeContext:input.demo.match }), COPY_LIMITS.story, 2);
    nodes.start.textContent = `Start new story for ${snapshot.player.name}`;
    if (nodes.style.dataset.playerId !== snapshot.player.player_id || nodes.style.dataset.boundMode !== snapshot.mode) {
      nodes.style.value = snapshot.mode; nodes.style.dataset.playerId = snapshot.player.player_id; nodes.style.dataset.boundMode = snapshot.mode;
    }
    nodes.resume.hidden = active.kind === 'live';
    nodes.binding.textContent = active.kind === 'shared' ? 'This shared copy is read only. Its clips do not change your match or question time.' : active.kind === 'live' ? 'This player’s story follows the viewing time. Other players keep their own stories and styles.' : 'This copy keeps its original match time. Current story returns to this player’s ongoing story.';
    const wanted = new Set(snapshot.chapters.map(row => row.chapter_id));
    for (const [id, node] of chapterNodes) if (!wanted.has(id)) { node.remove(); chapterNodes.delete(id); }
    snapshot.chapters.forEach((chapter, index) => {
      let node = chapterNodes.get(chapter.chapter_id);
      if (!node) {
        node = element('li', '', 'player-story-chapter'); node.dataset.chapterId = chapter.chapter_id; node.dataset.availableAtMs = chapter.available_at_ms; node.dataset.kind = chapter.kind;
        node.append(element('span', `${index + 1} · ${formatClock(chapter.start_ms)}–${formatClock(chapter.end_ms)}`, 'player-story-chapter-time'), element('h4', chapter.title), element('p', compactCopy(storyChapter(chapter, snapshot.player.name), COPY_LIMITS.chapter, 2)));
        const evidence = element('details', '', 'player-story-evidence'); evidence.append(element('summary', 'Evidence & limitations'));
        evidence.append(element('p', `Available ${formatClock(chapter.available_at_ms)} · ${chapter.event_ids.length} recorded actions${chapter.observation_ids.length ? ` · ${chapter.observation_ids.length} observed movements` : ''}`));
        const facts = element('dl', '', 'player-story-facts');
        Object.entries(chapter.facts).forEach(([key, value]) => { facts.append(element('dt', key.replaceAll('_', ' ')), element('dd', value === null ? 'Unavailable' : String(value))); }); evidence.append(facts);
        chapter.limitations.forEach(text => evidence.append(element('p', text)));
        const replay = element('button', 'Replay evidence'); replay.dataset.chapterReplay = chapter.chapter_id; replay.addEventListener('click', () => play(chapter.chapter_id));
        node.append(replay, evidence); chapterNodes.set(chapter.chapter_id, node); nodes.chapters.append(node);
      }
    });
    nodes.empty.hidden = snapshot.chapters.length > 0;
    nodes.empty.textContent = active.kind === 'live' ? 'No completed action, attack or qualifying camera movement is recorded for this story at its viewing time. Missing records do not mean inactivity.' : 'This frozen snapshot has no published chapters or replay clips. It keeps its original cutoff; no later evidence will be added.';
    nodes.limitations.replaceChildren(...snapshot.limitations.map(text => element('li', visibleCopy(text))));
    renderShares(); renderActions();
  }
  function clearChapterNodes() { chapterNodes.clear(); nodes.chapters.replaceChildren(); }
  function startLive() {
    if (busy || !active?.snapshot) return;
    const next = getContext(), playerId = active.snapshot.player.player_id, mode = nodes.style.value;
    stashWorkspace(); watchlist.add(playerId, mode); watchlist.setMode(playerId, mode); workspaceId = playerId;
    const snapshot = buildPlayerStory(input, { playerId, cutoffMs: next.cutoffMs, mode });
    live = { kind: 'live', snapshot }; active = live; saveAttempt = null; shareLink = ''; activeLinkId = null; retry = null; clearChapterNodes(); showView('current'); render();
    setStatus('New completed actions add chapters to this story.', 'live');
  }
  function acceptSaved(value, focus = false) {
    const previous = active?.storyId === value.story_id ? { shareLink, activeLinkId } : storyViews.get(value.story_id);
    active = { kind: 'saved', snapshot: value.snapshot, storyId: value.story_id, hash: value.snapshot_sha256, shares: value.shares || [] };
    const keepLink = previous && active.shares.some(row => row.share_id === previous.activeLinkId);
    shareLink = keepLink ? previous.shareLink : ''; activeLinkId = keepLink ? previous.activeLinkId : null;
    clearChapterNodes(); showView('current'); render();
    if (focus) requestAnimationFrame(() => { if (nodes.dialog.open) (active.snapshot.playlist.length ? nodes.replay : nodes.export).focus({ preventScroll: true }); });
  }
  async function run(operation) {
    if (busy) return;
    retry = null; setBusy(true);
    try { await operation(); }
    catch (error) { setStatus(errorText(error.code), error.code || 'unavailable'); retry = operation; }
    finally { setBusy(false); }
  }
  async function loadList(append = false) {
    const value = await api.list(append ? nextCursor : null); nextCursor = value.next_cursor;
    if (!append) nodes.list.replaceChildren();
    if (!value.stories.length && !append) nodes.list.append(element('p', 'No saved stories yet.'));
    for (const row of value.stories) {
      const item = element('article', '', 'player-story-saved-row'); item.dataset.storyId = row.story_id;
      item.append(element('h3', row.player.name), element('p', `${row.mode === 'analyst' ? 'Analyst' : 'Casual'} · through ${formatClock(row.cutoff_ms)} · ${row.chapter_count} chapters · ${row.active_share_count} active links`));
      const actions = element('div', '', 'player-story-actions'), open = element('button', 'Open story'), remove = element('button', 'Delete saved story');
      open.dataset.storyAction = 'open'; remove.dataset.storyAction = 'delete';
      open.addEventListener('click', () => run(async () => { const value = await api.open(row.story_id); acceptSaved(value, true); setStatus('Saved story opened with its original player, style and match time.', 'opened'); }));
      remove.addEventListener('click', () => run(async () => {
        await api.remove(row.story_id); item.remove(); nodes.refresh.focus({ preventScroll: true });
        if (active?.storyId === row.story_id) { active = { kind: 'local', snapshot: active.snapshot }; shareLink = ''; activeLinkId = null; }
        try { await loadList(); setStatus('Saved story deleted and its sharing links revoked. Any open copy is now unsaved.', 'deleted'); }
        catch { retry = () => loadList(); setStatus('Deletion confirmed. The saved-story list could not be refreshed; Try again only reloads the list.', 'metadata_unavailable'); }
      }));
      actions.append(open, remove); item.append(actions); nodes.list.append(item);
    }
    nodes.more.hidden = nextCursor === null; setStatus('Saved stories loaded.', 'listed'); renderActions(); retainViewFocus('saved');
  }
  nodes.open.addEventListener('click', () => { if (busy) return; openMenu(); openDialog(); });
  nodes.start.addEventListener('click', () => { if (!busy) startLive(); });
  nodes.resume.addEventListener('click', () => { if (busy || !active) return; const playerId = active.snapshot.player.player_id; watchlist.add(playerId, active.snapshot.mode); openWorkspace(playerId); });
  nodes.live.addEventListener('click', openMenu);
  nodes.saved.addEventListener('click', () => { if (busy) return; stashWorkspace(); resetViewState(); showView('saved'); setStatus('Loading saved stories…', 'listing'); void run(() => loadList()); });
  nodes.search.addEventListener('input', renderMenu); nodes.team.addEventListener('change', renderMenu);
  for (const team of input.demo.teams) { const option = element('option', team.name); option.value = team.id; nodes.team.append(option); }
  nodes.refresh.addEventListener('click', () => run(() => loadList()));
  nodes.more.addEventListener('click', () => run(() => loadList(true)));
  nodes.retry.addEventListener('click', () => { const operation = retry; if (operation) void run(operation); });
  nodes.save.addEventListener('click', () => {
    if (busy || !active) return;
    const snapshot = frozen(active.snapshot);
    active = { kind: 'local', snapshot }; clearChapterNodes(); render();
    if (!saveAttempt || !same(saveAttempt.snapshot, snapshot)) saveAttempt = { snapshot, id: `story_save_${crypto.randomUUID()}`, pending:true };
    const attempt = saveAttempt;
    void run(async () => { setStatus('Saving this story…', 'saving'); const value = await api.save(attempt.snapshot, attempt.id); attempt.pending = false; shareLink = ''; activeLinkId = null; acceptSaved(value, true); setStatus('Story saved with its original player and match time.', 'saved'); });
  });
  nodes.export.addEventListener('click', () => {
    if (!active || busy) return;
    const snapshot = frozen(active.snapshot); validatePlayerStorySnapshot(snapshot, input);
    const blob = new Blob([JSON.stringify(snapshot, null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = `matchmind-${snapshot.player.player_id}-${snapshot.cutoff_ms}-${snapshot.mode}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Story exported as JSON.', 'exported');
  });
  nodes.share.addEventListener('click', () => { const storyId = active?.storyId; if (!storyId) return; void run(async () => {
    const value = await api.share(storyId); shareLink = value.share_url; activeLinkId = value.share_id;
    renderShares();
    await refreshStoredStory(storyId, 'Read-only link created for this saved snapshot. Copy it to share; nothing has been sent. Recipients still need site access.');
    if (!retry) setStatus('Read-only link created for this saved snapshot. Copy it to share; nothing has been sent. Recipients still need site access.', 'shared');
  }); });
  nodes.copy.addEventListener('click', async () => {
    if (!shareLink) return;
    try { await navigator.clipboard.writeText(shareLink); setStatus('Read-only link copied. Nothing has been sent.', 'copied'); }
    catch { nodes['share-link'].focus(); nodes['share-link'].select(); setStatus('Automatic copy is unavailable. The read-only link is selected for manual copying.', 'copy_manually'); }
  });
  function play(chapterId = null) {
    if (busy || !active?.snapshot.playlist.length) return;
    const captured = active, snapshot = frozen(captured.snapshot);
    const access = captured.kind === 'saved' ? { story_id: captured.storyId } : captured.kind === 'shared' ? { share_token: captured.token } : null;
    onReplay(snapshot, access ? clip => api.resolve(access, clip, captured.hash) : null, chapterId);
  }
  nodes.replay.addEventListener('click', () => play());
  function refresh(force = false) {
    const next = getContext(), bucket = Math.floor(next.cutoffMs / 500);
    if (nodes.dialog.open && view === 'menu' && (force || lastFollowedId !== (next.followedPlayerId ?? null))) renderMenu();
    if (!force && bucket === lastBucket) return; lastBucket = bucket;
    if (live) {
      try { live.snapshot = buildPlayerStory(input, { playerId: live.snapshot.player.player_id, cutoffMs: next.cutoffMs, mode: live.snapshot.mode }); }
      catch (error) { if (nodes.dialog.open) setStatus(errorText(error.code), error.code); return; }
    }
    if (nodes.dialog.open && view === 'current' && active) render();
  }
  const token = new URLSearchParams(location.hash.slice(1)).get('story-share');
  if (token !== null) {
    openDialog(); showView('current'); setStatus('Opening the read-only shared snapshot. Your match clock is unchanged.', 'opening_share');
    void run(async () => {
      if (!/^[A-Za-z0-9_-]{43}$/.test(token)) throw new StoryApiError('invalid_request');
      const value = await api.shared(token); active = { kind: 'shared', snapshot: value.snapshot, hash: value.snapshot_sha256, token }; clearChapterNodes(); render(); setStatus('Read-only frozen story opened. Site access is required; replay is limited to its clips and never raises your question cutoff.', 'opened_shared');
    });
  }
  showView(token !== null ? 'current' : 'menu'); renderActions();
  return Object.freeze({ refresh });
}
