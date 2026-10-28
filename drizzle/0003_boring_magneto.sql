CREATE TABLE `mm_team_identities` (
	`team_id` text PRIMARY KEY NOT NULL,
	`source_team_id` text NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`crest` text NOT NULL,
	`identity_version` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mm_team_identity_audit` (
	`migration_id` text NOT NULL,
	`entity_table` text NOT NULL,
	`entity_key` text NOT NULL,
	`owner_id` text NOT NULL,
	`before_json` text NOT NULL,
	`before_sha256` text NOT NULL,
	`after_sha256` text NOT NULL,
	`previous_snapshot_sha256` text,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`migration_id`, `entity_table`, `entity_key`, `before_sha256`)
);
