CREATE TABLE `mm_queries` (
	`owner_id` text NOT NULL,
	`query_id` text NOT NULL,
	`session_id` text NOT NULL,
	`request_hash` text NOT NULL,
	`claim_token` text NOT NULL,
	`status` text NOT NULL,
	`model_reserved` integer NOT NULL,
	`created_at` integer NOT NULL,
	`lease_until` integer NOT NULL,
	`result_json` text NOT NULL,
	`failure_code` text,
	`usage_json` text,
	`diagnostics_json` text,
	PRIMARY KEY(`owner_id`, `query_id`)
);
--> statement-breakpoint
CREATE INDEX `mm_queries_session` ON `mm_queries` (`owner_id`,`session_id`);--> statement-breakpoint
CREATE INDEX `mm_queries_budget` ON `mm_queries` (`model_reserved`,`lease_until`);--> statement-breakpoint
CREATE TABLE `mm_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`session_id` text NOT NULL,
	`source_version` text NOT NULL,
	`prompt_version` text NOT NULL,
	`feature_version` text NOT NULL,
	`cutoff` integer NOT NULL,
	`player_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`receipt_json` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `mm_receipts_owner_session` ON `mm_receipts` (`owner_id`,`session_id`);--> statement-breakpoint
CREATE TABLE `mm_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`match_id` text NOT NULL,
	`source_version` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`initial_cutoff` integer NOT NULL,
	`released_cutoff` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `mm_sessions_owner_expiry` ON `mm_sessions` (`owner_id`,`expires_at`);