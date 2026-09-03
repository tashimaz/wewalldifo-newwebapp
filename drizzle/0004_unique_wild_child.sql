ALTER TABLE `orders` ADD `user_id` text DEFAULT '8608f360-ec13-47dc-9454-1643159a5ac6' NOT NULL;--> statement-breakpoint
ALTER TABLE `payment_requests` ADD `user_id` text DEFAULT '8608f360-ec13-47dc-9454-1643159a5ac6' NOT NULL;--> statement-breakpoint
ALTER TABLE `shipments` ADD `user_id` text DEFAULT '8608f360-ec13-47dc-9454-1643159a5ac6' NOT NULL;--> statement-breakpoint
ALTER TABLE `suppliers` ADD `user_id` text DEFAULT '8608f360-ec13-47dc-9454-1643159a5ac6' NOT NULL;