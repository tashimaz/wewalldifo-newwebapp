import { and, desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { suppliers } from "../../../db/schema";

const platforms = ["1688", "Taobao", "WeChat", "Alibaba", "โรงงานโดยตรง"];
const statuses = ["คู่ค้าหลัก", "ใช้งานได้", "กำลังทดลอง", "งดใช้"];
const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function GET() {
  try { const user=await getChatGPTUser();if(!user)return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401});return Response.json({ suppliers: await getDb().select().from(suppliers).where(eq(suppliers.userId,user.id)).orderBy(desc(suppliers.createdAt)) }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "โหลดข้อมูลไม่สำเร็จ" }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const user=await getChatGPTUser();if(!user)return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401});const body = await request.json() as Record<string, unknown>;
    const name = clean(body.name);
    if (!name) return Response.json({ error: "กรุณากรอกชื่อร้านหรือโรงงาน" }, { status: 400 });
    const now = new Date();
    const rating = Math.min(5, Math.max(1, Math.round(Number(body.rating) || 3)));
    const platform = platforms.includes(clean(body.platform)) ? clean(body.platform) : platforms[0];
    const status = statuses.includes(clean(body.status)) ? clean(body.status) : statuses[2];
    const [supplier] = await getDb().insert(suppliers).values({ id: crypto.randomUUID(), userId:user.id, name, contactName: clean(body.contactName), platform, contact: clean(body.contact), shopUrl: clean(body.shopUrl), category: clean(body.category), rating, status, note: clean(body.note), createdAt: now, updatedAt: now }).returning();
    return Response.json({ supplier }, { status: 201 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "บันทึกไม่สำเร็จ" }, { status: 500 }); }
}

export async function PATCH(request: Request) {
  try {
    const user=await getChatGPTUser();if(!user)return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401});const body = await request.json() as Record<string, unknown>, id = clean(body.id), status = clean(body.status);
    if (!id || !statuses.includes(status)) return Response.json({ error: "ข้อมูลสถานะไม่ถูกต้อง" }, { status: 400 });
    const [supplier] = await getDb().update(suppliers).set({ status, updatedAt: new Date() }).where(and(eq(suppliers.id,id),eq(suppliers.userId,user.id))).returning();
    return supplier ? Response.json({ supplier }) : Response.json({ error: "ไม่พบ Supplier" }, { status: 404 });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "แก้ไขไม่สำเร็จ" }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  try { const user=await getChatGPTUser();if(!user)return Response.json({error:"กรุณาเข้าสู่ระบบ"},{status:401});const id = new URL(request.url).searchParams.get("id")?.trim(); if (!id) return Response.json({ error: "ไม่พบรหัส Supplier" }, { status: 400 }); await getDb().delete(suppliers).where(and(eq(suppliers.id,id),eq(suppliers.userId,user.id))); return Response.json({ success: true }); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "ลบไม่สำเร็จ" }, { status: 500 }); }
}
