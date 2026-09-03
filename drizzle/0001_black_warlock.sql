CREATE TABLE `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact_name` text DEFAULT '' NOT NULL,
	`platform` text DEFAULT '1688' NOT NULL,
	`contact` text DEFAULT '' NOT NULL,
	`shop_url` text DEFAULT '' NOT NULL,
	`category` text DEFAULT '' NOT NULL,
	`rating` integer DEFAULT 3 NOT NULL,
	`status` text DEFAULT 'กำลังทดลอง' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_suppliers_status` ON `suppliers` (`status`);--> statement-breakpoint
CREATE INDEX `idx_suppliers_created_at` ON `suppliers` (`created_at`);