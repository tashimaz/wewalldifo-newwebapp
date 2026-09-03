import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().default("8608f360-ec13-47dc-9454-1643159a5ac6"),
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

export const suppliers = sqliteTable("suppliers", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().default("8608f360-ec13-47dc-9454-1643159a5ac6"),
  name: text("name").notNull(),
  contactName: text("contact_name").notNull().default(""),
  platform: text("platform").notNull().default("1688"),
  contact: text("contact").notNull().default(""),
  shopUrl: text("shop_url").notNull().default(""),
  category: text("category").notNull().default(""),
  rating: integer("rating").notNull().default(3),
  status: text("status").notNull().default("กำลังทดลอง"),
  note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_suppliers_status").on(table.status), index("idx_suppliers_created_at").on(table.createdAt)]);

export const paymentRequests = sqliteTable("payment_requests", {
  id: text("id").primaryKey(), requestNo: text("request_no").notNull().unique(),
  userId:text("user_id").notNull().default("8608f360-ec13-47dc-9454-1643159a5ac6"),
  recipient: text("recipient").notNull(), channel: text("channel").notNull().default("Alipay"),
  account: text("account").notNull().default(""), purpose: text("purpose").notNull(), reference: text("reference").notNull().default(""),
  cnyAmount: real("cny_amount").notNull().default(0), exchangeRate: real("exchange_rate").notNull().default(4.65),
  status: text("status").notNull().default("รอตรวจสอบ"), note: text("note").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(), updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("idx_payment_requests_status").on(table.status), index("idx_payment_requests_created_at").on(table.createdAt)]);

export const shipments = sqliteTable("shipments", {
  id:text("id").primaryKey(), shipmentNo:text("shipment_no").notNull().unique(), trackingNo:text("tracking_no").notNull(),
  userId:text("user_id").notNull().default("8608f360-ec13-47dc-9454-1643159a5ac6"),
  description:text("description").notNull(), method:text("method").notNull().default("รถ"), weight:real("weight").notNull().default(0),
  volume:real("volume").notNull().default(0), rate:real("rate").notNull().default(45), estimatedCost:real("estimated_cost").notNull().default(0),
  status:text("status").notNull().default("รอของเข้าคลังจีน"), note:text("note").notNull().default(""),
  createdAt:integer("created_at",{mode:"timestamp_ms"}).notNull(), updatedAt:integer("updated_at",{mode:"timestamp_ms"}).notNull(),
},t=>[index("idx_shipments_status").on(t.status),index("idx_shipments_created_at").on(t.createdAt)]);
