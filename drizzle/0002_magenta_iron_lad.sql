CREATE TABLE `payment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`request_no` text NOT NULL,
	`recipient` text NOT NULL,
	`channel` text DEFAULT 'Alipay' NOT NULL,
	`account` text DEFAULT '' NOT NULL,
	`purpose` text NOT NULL,
	`reference` text DEFAULT '' NOT NULL,
	`cny_amount` real DEFAULT 0 NOT NULL,
	`exchange_rate` real DEFAULT 4.65 NOT NULL,
	`status` text DEFAULT 'รอตรวจสอบ' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_requests_request_no_unique` ON `payment_requests` (`request_no`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_status` ON `payment_requests` (`status`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_created_at` ON `payment_requests` (`created_at`);