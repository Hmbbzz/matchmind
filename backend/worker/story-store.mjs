import { ApiError } from '../query-service.mjs';

const fail = (status, code, message) => { throw new ApiError(status, code, message); };
const notFound = () => fail(404, 'NOT_FOUND', 'Story or share not found.');
const changed = result => result?.success !== false && result?.meta?.changes === 1;
export const STORY_SHARE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const STORY_RESPONSE_LIMIT = 1_048_576;

export async function storyDigest(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}
export function createStoryShareToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export function createStoryStore(binding) {
  if (!binding || typeof binding.prepare !== 'function' || typeof binding.batch !== 'function' || typeof binding.withSession !== 'function') fail(503, 'STORAGE_UNAVAILABLE', 'Persistent story storage is not available.');
  const db = binding.withSession('first-primary');
  const stmt = (sql, values = []) => db.prepare(sql).bind(...values);
  const getSavedBySaveId = (owner, saveId) => stmt('SELECT * FROM mm_player_stories WHERE owner_id = ? AND save_id = ?', [owner, saveId]).first();
  async function getPrivate(owner, storyId) {
    const row = await stmt('SELECT * FROM mm_player_stories WHERE owner_id = ? AND id = ?', [owner, storyId]).first();
    if (!row) notFound();
    if (row.deleted_at !== null) fail(410, 'STORY_DELETED', 'This frozen story has been deleted.');
    return row;
  }
  async function insertSaved({ id, owner, saveId, requestHash, sourceVersion, playerId, matchId, mode, cutoff, now, snapshotJson, snapshotHash }) {
    if (new TextEncoder().encode(snapshotJson).byteLength > STORY_RESPONSE_LIMIT - 32_768) fail(413, 'STORY_TOO_LARGE', 'This story is too large to save safely. Export a shorter frozen interval.');
    const result = await stmt(`INSERT OR IGNORE INTO mm_player_stories(id,owner_id,save_id,request_hash,source_version,player_id,match_id,mode,cutoff,created_at,snapshot_json,snapshot_sha256)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, [id, owner, saveId, requestHash, sourceVersion, playerId, matchId, mode, cutoff, now, snapshotJson, snapshotHash]).run();
    const row = await getSavedBySaveId(owner, saveId);
    if (!row) fail(503, 'STORAGE_UNAVAILABLE', 'The frozen story could not be persisted.');
    return { row, created: changed(result) };
  }
  async function listPrivate(owner, cursor) {
    const values = [owner];
    let tail = '';
    if (cursor) { tail = ' AND (created_at < ? OR (created_at = ? AND id < ?))'; values.push(cursor.created_at_ms, cursor.created_at_ms, cursor.story_id); }
    const rows = (await stmt(`SELECT * FROM mm_player_stories WHERE owner_id = ? AND deleted_at IS NULL${tail} ORDER BY created_at DESC,id DESC LIMIT 31`, values).all()).results ?? [];
    return { rows: rows.slice(0, 30), hasMore: rows.length > 30 };
  }
  async function shareMetadata(owner, storyId, now) {
    // Expired/revoked links are no longer actionable. List only active links;
    // the immutable audit rows remain in D1 and are not business quota state.
    return (await stmt('SELECT id AS share_id,created_at AS created_at_ms,expires_at AS expires_at_ms,revoked_at AS revoked_at_ms FROM mm_player_story_shares WHERE owner_id = ? AND story_id = ? AND revoked_at IS NULL AND expires_at > ? ORDER BY created_at DESC,id DESC', [owner, storyId, now]).all()).results ?? [];
  }
  async function createShare({ owner, storyId, shareId, tokenHash, now }) {
    const result = await stmt(`INSERT INTO mm_player_story_shares(id,story_id,owner_id,token_sha256,created_at,expires_at)
      SELECT ?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM mm_player_stories WHERE id = ? AND owner_id = ? AND deleted_at IS NULL)`, [shareId, storyId, owner, tokenHash, now, now + STORY_SHARE_TTL_MS, storyId, owner]).run();
    if (!changed(result)) notFound();
  }
  async function revokeShare(owner, storyId, shareId, now) {
    await getPrivate(owner, storyId);
    const row = await stmt('SELECT id FROM mm_player_story_shares WHERE owner_id = ? AND story_id = ? AND id = ?', [owner, storyId, shareId]).first();
    if (!row) notFound();
    await stmt('UPDATE mm_player_story_shares SET revoked_at = COALESCE(revoked_at,?) WHERE owner_id = ? AND story_id = ? AND id = ?', [now, owner, storyId, shareId]).run();
  }
  async function deletePrivate(owner, storyId, now) {
    const row = await stmt('SELECT * FROM mm_player_stories WHERE owner_id = ? AND id = ?', [owner, storyId]).first();
    if (!row) notFound();
    await db.batch([
      stmt('UPDATE mm_player_stories SET deleted_at = COALESCE(deleted_at,?) WHERE owner_id = ? AND id = ?', [now, owner, storyId]),
      stmt('UPDATE mm_player_story_shares SET revoked_at = COALESCE(revoked_at,?) WHERE owner_id = ? AND story_id = ?', [now, owner, storyId]),
    ]);
  }
  async function getShared(tokenHash, now) {
    const share = await stmt('SELECT * FROM mm_player_story_shares WHERE token_sha256 = ?', [tokenHash]).first();
    if (!share) notFound();
    if (share.revoked_at !== null || share.expires_at <= now) fail(410, 'SHARE_UNAVAILABLE', 'This story share has expired or was revoked.');
    const row = await stmt('SELECT * FROM mm_player_stories WHERE id = ? AND owner_id = ?', [share.story_id, share.owner_id]).first();
    if (!row || row.deleted_at !== null) fail(410, 'SHARE_UNAVAILABLE', 'This shared story is no longer available.');
    return { row, share };
  }
  return Object.freeze({ getSavedBySaveId, getPrivate, insertSaved, listPrivate, shareMetadata, createShare, revokeShare, deletePrivate, getShared });
}
