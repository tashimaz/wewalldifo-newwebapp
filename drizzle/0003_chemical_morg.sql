CREATE TABLE `shipments` (
	`id` text PRIMARY KEY NOT NULL,
	`shipment_no` text NOT NULL,
	`tracking_no` text NOT NULL,
	`description` text NOT NULL,
	`method` text DEFAULT 'รถ' NOT NULL,
	`weight` real DEFAULT 0 NOT NULL,
	`volume` real DEFAULT 0 NOT NULL,
	`rate` real DEFAULT 45 NOT NULL,
	`estimated_cost` real DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'รอของเข้าคลังจีน' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shipments_shipment_no_unique` ON `shipments` (`shipment_no`);--> statement-breakpoint
CREATE INDEX `idx_shipments_status` ON `shipments` (`status`);--> statement-breakpoint
CREATE INDEX `idx_shipments_created_at` ON `shipments` (`created_at`);