import { sqliteTable, text, integer, index, primaryKey, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const mmSessions = sqliteTable('mm_sessions', {
  id: text('id').primaryKey(), ownerId: text('owner_id').notNull(), matchId: text('match_id').notNull(),
  sourceVersion: text('source_version').notNull(), createdAt: integer('created_at').notNull(),
  expiresAt: integer('expires_at').notNull(), initialCutoff: integer('initial_cutoff').notNull(),
  releasedCutoff: integer('released_cutoff').notNull(), clockPolicy: text('clock_policy').notNull().default('historical-gap-clock/1.0'),
}, (table) => [index('mm_sessions_owner_expiry').on(table.ownerId, table.expiresAt)]);

export const mmQueries = sqliteTable('mm_queries', {
  ownerId: text('owner_id').notNull(), queryId: text('query_id').notNull(), sessionId: text('session_id').notNull(),
  requestHash: text('request_hash').notNull(), claimToken: text('claim_token').notNull(),
  status: text('status').notNull(), modelReserved: integer('model_reserved').notNull(),
  createdAt: integer('created_at').notNull(), leaseUntil: integer('lease_until').notNull(),
  resultJson: text('result_json').notNull(), failureCode: text('failure_code'),
  usageJson: text('usage_json'), diagnosticsJson: text('diagnostics_json'),
}, (table) => [primaryKey({ columns: [table.ownerId, table.queryId] }), index('mm_queries_session').on(table.ownerId, table.sessionId), index('mm_queries_budget').on(table.modelReserved, table.leaseUntil)]);

export const mmReceipts = sqliteTable('mm_receipts', {
  id: text('id').primaryKey(), ownerId: text('owner_id').notNull(), sessionId: text('session_id').notNull(),
  sourceVersion: text('source_version').notNull(), promptVersion: text('prompt_version').notNull(),
  featureVersion: text('feature_version').notNull(), cutoff: integer('cutoff').notNull(), playerId: text('player_id').notNull(),
  expiresAt: integer('expires_at').notNull(), receiptJson: text('receipt_json').notNull(),
}, (table) => [index('mm_receipts_owner_session').on(table.ownerId, table.sessionId)]);

export const mmPlayerStories = sqliteTable('mm_player_stories', {
  id: text('id').primaryKey(), ownerId: text('owner_id').notNull(), saveId: text('save_id').notNull(),
  requestHash: text('request_hash').notNull(), sourceVersion: text('source_version').notNull(),
  playerId: text('player_id').notNull(), matchId: text('match_id').notNull(), mode: text('mode').notNull(),
  cutoff: integer('cutoff').notNull(), createdAt: integer('created_at').notNull(), deletedAt: integer('deleted_at'),
  snapshotJson: text('snapshot_json').notNull(), snapshotSha256: text('snapshot_sha256').notNull(),
}, table => [index('mm_player_stories_owner_created').on(table.ownerId, table.createdAt, table.id), uniqueIndex('mm_player_stories_owner_save').on(table.ownerId, table.saveId)]);

export const mmPlayerStoryShares = sqliteTable('mm_player_story_shares', {
  id: text('id').primaryKey(), storyId: text('story_id').notNull(), ownerId: text('owner_id').notNull(),
  tokenSha256: text('token_sha256').notNull(), createdAt: integer('created_at').notNull(),
  expiresAt: integer('expires_at').notNull(), revokedAt: integer('revoked_at'),
}, table => [index('mm_player_story_shares_story').on(table.ownerId, table.storyId), uniqueIndex('mm_player_story_shares_token').on(table.tokenSha256)]);

// Schema only. Fixed canonical rows and existing-record backfill are separate,
// authenticated data operations; migrations never seed or rewrite business data.
export const mmTeamIdentities = sqliteTable('mm_team_identities', {
  teamId: text('team_id').primaryKey(), sourceTeamId: text('source_team_id').notNull(),
  name: text('name').notNull(), code: text('code').notNull(), crest: text('crest').notNull(),
  identityVersion: text('identity_version').notNull(),
});

export const mmTeamIdentityAudit = sqliteTable('mm_team_identity_audit', {
  migrationId: text('migration_id').notNull(), entityTable: text('entity_table').notNull(),
  entityKey: text('entity_key').notNull(), ownerId: text('owner_id').notNull(),
  beforeJson: text('before_json').notNull(), beforeSha256: text('before_sha256').notNull(),
  afterSha256: text('after_sha256').notNull(), previousSnapshotSha256: text('previous_snapshot_sha256'),
  createdAt: integer('created_at').notNull(),
}, table => [primaryKey({ columns: [table.migrationId, table.entityTable, table.entityKey, table.beforeSha256] })]);
