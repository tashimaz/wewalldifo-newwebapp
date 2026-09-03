import { and, desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { orders } from "../../../db/schema";

const statuses = ["รอชำระเงิน", "ชำระแล้ว", "กำลังผลิต", "ส่งออกจากจีน", "ถึงไทยแล้ว", "ยกเลิก"];
const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";
const number = (value: unknown, fallback = 0) => { const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : fallback; };

export async function GET() {
  try { const user=await getChatGPTUser(); if(!user) return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401}); return Response.json({ orders: await getDb().select().from(orders).where(eq(orders.userId,user.id)).orderBy(desc(orders.createdAt)) }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "โหลดข้อมูลไม่สำเร็จ" }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const user=await getChatGPTUser(); if(!user) return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401}); const body = await request.json() as Record<string, unknown>;
    const supplier = clean(body.supplier), productName = clean(body.productName);
    if (!supplier || !productName) return Response.json({ error: "กรุณากรอก Supplier และชื่อสินค้า" }, { status: 400 });
    const now = new Date(), id = crypto.randomUUID();
    const stamp = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
    const status = statuses.includes(clean(body.status)) ? clean(body.status) : statuses[0];
    const [order] = await getDb().insert(orders).values({ id, userId:user.id, orderNo: `CN-${stamp}-${id.slice(0,4).toUpperCase()}`, supplier, productName, status,
      source: clean(body.source) || "1688", sourceUrl: clean(body.sourceUrl), note: clean(body.note), quantity: Math.max(1, Math.round(number(body.quantity, 1))),
      cnyAmount: number(body.cnyAmount), exchangeRate: number(body.exchangeRate, 4.65), thaiExtraCost: number(body.thaiExtraCost), expectedRevenue: number(body.expectedRevenue), createdAt: now, updatedAt: now }).returning();
    return Response.json({ order }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "บันทึกไม่สำเร็จ" }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  try {
    const user=await getChatGPTUser(); if(!user) return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401}); const body = await request.json() as Record<string, unknown>, id = clean(body.id), status = clean(body.status);
    if (!id || !statuses.includes(status)) return Response.json({ error: "ข้อมูลสถานะไม่ถูกต้อง" }, { status: 400 });
    const [order] = await getDb().update(orders).set({ status, updatedAt: new Date() }).where(and(eq(orders.id,id),eq(orders.userId,user.id))).returning();
    return order ? Response.json({ order }) : Response.json({ error: "ไม่พบออเดอร์" }, { status: 404 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "แก้ไขไม่สำเร็จ" }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  try { const user=await getChatGPTUser(); if(!user) return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401}); const id = new URL(request.url).searchParams.get("id")?.trim(); if (!id) return Response.json({ error: "ไม่พบรหัสออเดอร์" }, { status: 400 }); await getDb().delete(orders).where(and(eq(orders.id,id),eq(orders.userId,user.id))); return Response.json({ success: true }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "ลบไม่สำเร็จ" }, { status: 500 }); }
}
