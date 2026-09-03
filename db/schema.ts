import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  orderNo: text("order_no").notNull().unique(),
  supplier: text("supplier").notNull(),
  productName: text("product_name").notNull(),
  source: text("source").notNull().default("1688"),
  sourceUrl: text("source_url").notNull().default(""),
  quantity: integer("quantity").notNull().default(1),
  cnyAmount: real("cny_amount").notNull().default(0),
  exchangeRate: real("exchange_rate").notNull().default(4.65),
  thaiExtraCost: real("thai_extra_cost").notNull().default(0),
  expectedRevenue: real("expected_revenue").notNull().default(0),
  status: text("status").notNull().default("รอชำระเงิน"),
  note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_orders_status").on(table.status), index("idx_orders_created_at").on(table.createdAt)]);
