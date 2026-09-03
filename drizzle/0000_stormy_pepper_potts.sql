CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_no` text NOT NULL,
	`supplier` text NOT NULL,
	`product_name` text NOT NULL,
	`source` text DEFAULT '1688' NOT NULL,
	`source_url` text DEFAULT '' NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`cny_amount` real DEFAULT 0 NOT NULL,
	`exchange_rate` real DEFAULT 4.65 NOT NULL,
	`thai_extra_cost` real DEFAULT 0 NOT NULL,
	`expected_revenue` real DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'รอชำระเงิน' NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_no_unique` ON `orders` (`order_no`);--> statement-breakpoint
CREATE INDEX `idx_orders_status` ON `orders` (`status`);--> statement-breakpoint
CREATE INDEX `idx_orders_created_at` ON `orders` (`created_at`);