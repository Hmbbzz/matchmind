import { ApiError } from '../query-service.mjs';
import { buildPlayerStory, validatePlayerStorySnapshot, PlayerStoryError, PLAYER_STORY_POLICY_VERSION } from '../../public/player-story-core.js';
import { createStoryStore, storyDigest, createStoryShareToken, STORY_SHARE_TTL_MS, STORY_RESPONSE_LIMIT } from './story-store.mjs';
import { createTeamIdentityStore } from './team-identity-store.mjs';

const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const identifier = (value, name) => { if (typeof value !== 'string' || !value.trim() || value.length > 160 || /[\x00-\x1f\x7f]/.test(value)) fail(400, 'INVALID_REQUEST', `${name} must be a bounded non-empty identifier.`); return value; };
const exact = (body, keys) => { if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== keys.length || Object.keys(body).some(key => !keys.includes(key))) fail(400, 'INVALID_REQUEST', 'Invalid story request fields.'); };
const token = value => { if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(value)) fail(400, 'INVALID_REQUEST', 'Invalid story share token.'); return value; };
const cursorText = row => btoa(JSON.stringify({ created_at_ms: row.created_at, story_id: row.id }));
function parseCursor(value) {
  if (value === null) return null;
  if (typeof value !== 'string' || value.length > 512) fail(400, 'INVALID_REQUEST', 'Invalid story list cursor.');
  try { const row = JSON.parse(atob(value)); exact(row, ['created_at_ms', 'story_id']); if (!Number.isSafeInteger(row.created_at_ms) || row.created_at_ms < 0) throw new Error(); identifier(row.story_id, 'cursor story ID'); return row; }
  catch { fail(400, 'INVALID_REQUEST', 'Invalid story list cursor.'); }
}
function mapCoreError(caught, stored = false) {
  if (caught instanceof PlayerStoryError) {
    if (caught.code === 'STATE_VERSION_MISMATCH') fail(409, caught.code, caught.message);
    if (stored) fail(503, 'STORAGE_UNAVAILABLE', 'The stored frozen story could not be validated.');
    if (caught.code === 'NOT_FOUND') fail(404, caught.code, caught.message);
    if (caught.code === 'INVALID_REQUEST') fail(400, caught.code, caught.message);
    fail(503, 'SOURCE_UNAVAILABLE', 'The story source is not available.');
  }
  throw caught;
}

export const STORY_ROUTES = Object.freeze(['save', 'list', 'open', 'delete', 'share', 'revoke', 'shared', 'resolve'].map(name => `/api/stories/${name}`));

// Authenticated dispatch and Origin/body guards remain in the Worker handler.
// read-only operations deliberately never call getSession or update any clock.
export async function handleStoryRoute({ path, body, owner, env, fixture, current, idFactory, getSession, origin }) {
  const store = createStoryStore(env.DB);
  const identities = createTeamIdentityStore(env.DB, fixture, current);
  async function snapshotFor(row) {
    row = await identities.reconcile('mm_player_stories', row);
    if (row.source_version !== fixture.sourceVersion) fail(409, 'STATE_VERSION_MISMATCH', 'This frozen story source is no longer available.');
    if (typeof row.snapshot_json !== 'string' || await storyDigest(row.snapshot_json) !== row.snapshot_sha256) fail(503, 'STORAGE_UNAVAILABLE', 'The stored frozen story integrity check failed.');
    let snapshot;
    try { snapshot = JSON.parse(row.snapshot_json); } catch { fail(503, 'STORAGE_UNAVAILABLE', 'The stored frozen story could not be read.'); }
    if (snapshot.player?.player_id !== row.player_id || snapshot.match?.match_id !== row.match_id || snapshot.cutoff_ms !== row.cutoff || snapshot.mode !== row.mode || snapshot.source_version !== row.source_version) fail(503, 'STORAGE_UNAVAILABLE', 'Stored story scope is inconsistent.');
    try { validatePlayerStorySnapshot(snapshot, fixture); } catch (caught) { mapCoreError(caught, true); }
    return snapshot;
  }
  async function envelope(row, idempotency = 'replayed') {
    row = await identities.reconcile('mm_player_stories', row);
    return { story_id: row.id, created_at_ms: row.created_at, snapshot_sha256: row.snapshot_sha256, persistence: 'd1', read_only: true,
      snapshot: await snapshotFor(row), idempotency, shares: await store.shareMetadata(owner, row.id, current) };
  }
  const result = (status, value) => ({ status, value, maxBytes: STORY_RESPONSE_LIMIT });
  const generateId = prefix => `${prefix}_${identifier(idFactory(), 'generated story ID')}`;
  if (path === '/api/stories/save') {
    exact(body, ['session_id', 'match_id', 'player_id', 'source_version', 'cutoff_ms', 'mode', 'save_id']);
    for (const key of ['session_id', 'match_id', 'player_id', 'source_version', 'save_id']) identifier(body[key], key);
    if (!Number.isSafeInteger(body.cutoff_ms) || body.cutoff_ms < 0 || !['casual', 'analyst'].includes(body.mode)) fail(400, 'INVALID_REQUEST', 'Story cutoff or mode is invalid.');
    const parameters = { session_id: body.session_id, match_id: body.match_id, player_id: body.player_id, source_version: body.source_version, cutoff_ms: body.cutoff_ms, mode: body.mode, policy_version: PLAYER_STORY_POLICY_VERSION };
    const requestHash = await storyDigest(JSON.stringify(parameters));
    const replay = async row => {
      if (!row) return null;
      if (row.request_hash !== requestHash) fail(409, 'STORY_CONFLICT', 'save_id is already bound to a different frozen story.');
      if (row.deleted_at !== null) fail(410, 'STORY_DELETED', 'This saved story was deleted. Create a new save to keep another snapshot.');
      return result(200, await envelope(row));
    };
    const existing = await replay(await store.getSavedBySaveId(owner, body.save_id)); if (existing) return existing;
    if (body.source_version !== fixture.sourceVersion) fail(409, 'STATE_VERSION_MISMATCH', 'Story source version does not match this service.');
    if (body.match_id !== fixture.demo.match.match_id) fail(404, 'NOT_FOUND', 'Match not found.');
    const session = await getSession(body.session_id);
    if (body.cutoff_ms > session.released_cutoff) fail(403, 'FUTURE_SCOPE', 'This story cutoff is beyond the session\'s available match evidence.');
    let snapshot;
    try { snapshot = buildPlayerStory(fixture, { playerId: body.player_id, cutoffMs: body.cutoff_ms, mode: body.mode }); } catch (caught) { mapCoreError(caught); }
    const snapshotJson = JSON.stringify(snapshot), snapshotHash = await storyDigest(snapshotJson);
    const saved = await store.insertSaved({ id: generateId('story'), owner, saveId: body.save_id, requestHash, sourceVersion: fixture.sourceVersion, playerId: body.player_id, matchId: body.match_id, mode: body.mode, cutoff: body.cutoff_ms, now: current, snapshotJson, snapshotHash });
    if (!saved.created) return replay(saved.row);
    return result(201, await envelope(saved.row, 'created'));
  }
  if (path === '/api/stories/list') {
    exact(body, ['cursor']); const cursor = parseCursor(body.cursor);
    const page = await store.listPrivate(owner, cursor), stories = [];
    for (const row of page.rows) {
      const snapshot = await snapshotFor(row);
      stories.push({ story_id: row.id, created_at_ms: row.created_at, player: snapshot.player, cutoff_ms: snapshot.cutoff_ms, mode: snapshot.mode, chapter_count: snapshot.chapters.length, active_share_count: (await store.shareMetadata(owner, row.id, current)).length });
    }
    return result(200, { stories, next_cursor: page.hasMore ? cursorText(page.rows.at(-1)) : null });
  }
  if (path === '/api/stories/open') {
    exact(body, ['story_id']); identifier(body.story_id, 'story_id');
    return result(200, await envelope(await store.getPrivate(owner, body.story_id)));
  }
  if (path === '/api/stories/delete') {
    exact(body, ['story_id']); identifier(body.story_id, 'story_id');
    await store.deletePrivate(owner, body.story_id, current);
    return result(200, { deleted: true, story_id: body.story_id });
  }
  if (path === '/api/stories/share') {
    exact(body, ['story_id']); identifier(body.story_id, 'story_id');
    const row = await store.getPrivate(owner, body.story_id); await snapshotFor(row);
    const shareId = generateId('share'), shareToken = createStoryShareToken();
    await store.createShare({ owner, storyId: row.id, shareId, tokenHash: await storyDigest(shareToken), now: current });
    return result(201, { share_id: shareId, share_token: shareToken, share_url: `${origin}/#story-share=${shareToken}`, expires_at_ms: current + STORY_SHARE_TTL_MS });
  }
  if (path === '/api/stories/revoke') {
    exact(body, ['story_id', 'share_id']); identifier(body.story_id, 'story_id'); identifier(body.share_id, 'share_id');
    await store.revokeShare(owner, body.story_id, body.share_id, current);
    return result(200, { revoked: true, story_id: body.story_id, share_id: body.share_id });
  }
  if (path === '/api/stories/shared') {
    exact(body, ['share_token']); const shared = await store.getShared(await storyDigest(token(body.share_token)), current);
    shared.row = await identities.reconcile('mm_player_stories', shared.row);
    return result(200, { snapshot: await snapshotFor(shared.row), snapshot_sha256: shared.row.snapshot_sha256, read_only: true, persistence: 'shared', share_id: shared.share.id, expires_at_ms: shared.share.expires_at });
  }
  if (path === '/api/stories/resolve') {
    const shared = Object.hasOwn(body ?? {}, 'share_token'); exact(body, shared ? ['share_token', 'clip_id'] : ['story_id', 'clip_id']); identifier(body.clip_id, 'clip_id');
    const authorized = shared ? (await store.getShared(await storyDigest(token(body.share_token)), current)).row : await store.getPrivate(owner, identifier(body.story_id, 'story_id'));
    const row = await identities.reconcile('mm_player_stories', authorized);
    const snapshot = await snapshotFor(row);
    const clip = snapshot.playlist.find(row => row.clip_id === body.clip_id) ?? snapshot.chapters.find(row => row.clip.clip_id === body.clip_id)?.clip;
    if (!clip) fail(404, 'NOT_FOUND', 'This clip is not authorized by the frozen story.');
    return result(200, { clip, snapshot_sha256: row.snapshot_sha256, scope: 'player_story', read_only: true });
  }
  fail(404, 'NOT_FOUND', 'Story route not found.');
}
