CREATE TABLE `mm_player_stories` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`save_id` text NOT NULL,
	`request_hash` text NOT NULL,
	`source_version` text NOT NULL,
	`player_id` text NOT NULL,
	`match_id` text NOT NULL,
	`mode` text NOT NULL,
	`cutoff` integer NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer,
	`snapshot_json` text NOT NULL,
	`snapshot_sha256` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `mm_player_stories_owner_created` ON `mm_player_stories` (`owner_id`,`created_at`,`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `mm_player_stories_owner_save` ON `mm_player_stories` (`owner_id`,`save_id`);--> statement-breakpoint
CREATE TABLE `mm_player_story_shares` (
	`id` text PRIMARY KEY NOT NULL,
	`story_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`token_sha256` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`revoked_at` integer
);
--> statement-breakpoint
CREATE INDEX `mm_player_story_shares_story` ON `mm_player_story_shares` (`owner_id`,`story_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `mm_player_story_shares_token` ON `mm_player_story_shares` (`token_sha256`);
