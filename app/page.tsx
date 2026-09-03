"use client";

import { useMemo, useState } from "react";
import { BadgeDollarSign, Calculator, FileText, Languages, LayoutDashboard, PackageCheck, RefreshCcw, Save, Settings, Truck, WalletCards } from "lucide-react";

const fmt = new Intl.NumberFormat("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Field({ label, value, setValue, prefix, suffix }: { label: string; value: number; setValue: (n: number) => void; prefix?: string; suffix?: string }) {
  return <label className="field"><span>{label}</span><div className="input-wrap">{prefix && <i>{prefix}</i>}<input type="number" min="0" step="any" value={value} onChange={e => setValue(Math.max(0, Number(e.target.value)))} />{suffix && <i>{suffix}</i>}</div></label>;
}

export default function Home() {
  const [price, setPrice] = useState(12), [qty, setQty] = useState(500), [chinaShip, setChinaShip] = useState(80);
  const [rate, setRate] = useState(4.65), [thaiShip, setThaiShip] = useState(2500), [other, setOther] = useState(500), [sell, setSell] = useState(99);
  const [saved, setSaved] = useState(false);
  const r = useMemo(() => { const cny = price * qty + chinaShip, goods = cny * rate, total = goods + thaiShip + other, unit = qty ? total / qty : 0, profit = sell - unit; return { cny, goods, total, unit, profit, allProfit: profit * qty, margin: sell ? profit / sell * 100 : 0 }; }, [price, qty, chinaShip, rate, thaiShip, other, sell]);
  const reset = () => { setPrice(12); setQty(500); setChinaShip(80); setRate(4.65); setThaiShip(2500); setOther(500); setSell(99); setSaved(false); };
  const nav = [[LayoutDashboard,"Dashboard","/dashboard"],[Calculator,"คำนวณต้นทุน","/"],[PackageCheck,"My China Orders","/orders"],[Languages,"ผู้ช่วยภาษาจีน","/assistant"],[FileText,"Supplier Book","/suppliers"],[WalletCards,"ชำระเงินหยวน","/payments"],[Truck,"ขนส่งจีน–ไทย","#"]] as const;

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><img src="/wewalldifo-logo.png" alt="WEWALLDIFO Company Limited" /></div>
      <p className="nav-title">เครื่องมือธุรกิจจีน</p>
      <nav>{nav.map(([Icon,label,href],i) => <a key={label} className={i===1?"active":""} href={href}><Icon size={19}/>{label}{i===2&&<em>3</em>}</a>)}</nav>
      <div className="sidebar-foot"><a href="#"><Settings size={19}/>ตั้งค่า</a><div className="profile"><span>T</span><div><strong>คุณตั้ม</strong><small>VW-000128</small></div></div></div>
    </aside>
    <section className="workspace">
      <header><div className="mobile-logo"><img src="/wewalldifo-logo.png" alt="WEWALLDIFO" /></div><div className="today-rate"><span>เรท CNY วันนี้</span><b>¥1 = ฿{rate.toFixed(2)}</b><small>อัปเดตล่าสุด 10:35</small></div><button>LINE　บัญชีของฉัน</button></header>
      <div className="content" id="calculator">
        <div className="heading"><div><small>COST CALCULATOR</small><h1>คำนวณต้นทุนสินค้าถึงไทย</h1><p>รู้ต้นทุนจริงก่อนสั่งซื้อ และวางราคาขายให้มีกำไร</p></div><button onClick={reset}><RefreshCcw size={17}/>ล้างข้อมูล</button></div>
        <div className="calculator-grid">
          <section className="form-card">
            <Title n="01" title="ข้อมูลสินค้า" sub="กรอกราคาและจำนวนที่ต้องการสั่ง" />
            <div className="fields"><Field label="ราคาสินค้าต่อชิ้น" value={price} setValue={setPrice} prefix="¥"/><Field label="จำนวนสินค้า" value={qty} setValue={setQty} suffix="ชิ้น"/><Field label="ค่าส่งภายในจีน" value={chinaShip} setValue={setChinaShip} prefix="¥"/><Field label="อัตราแลกเปลี่ยน" value={rate} setValue={setRate} suffix="บาท/หยวน"/></div>
            <div className="subtotal"><span>รวมค่าสินค้าในจีน</span><b>¥{fmt.format(r.cny)}</b></div>
            <hr/><Title n="02" title="ค่าขนส่งและค่าใช้จ่าย" sub="ใส่ค่าใช้จ่ายตั้งแต่จีนจนสินค้าถึงมือ" />
            <div className="fields"><Field label="ค่าขนส่งจีน → ไทย" value={thaiShip} setValue={setThaiShip} prefix="฿"/><Field label="ค่าใช้จ่ายอื่นๆ" value={other} setValue={setOther} prefix="฿"/></div>
            <hr/><Title n="03" title="ราคาขายที่ต้องการ" sub="ใช้คำนวณกำไรและอัตรากำไร" /><Field label="ราคาขายต่อชิ้น" value={sell} setValue={setSell} prefix="฿"/>
          </section>
          <aside className="results">
            <section className="cost-card"><div className="cost-head"><div><span>สรุปต้นทุน</span><h2>฿{fmt.format(r.total)}</h2><small>ต้นทุนรวมถึงไทย</small></div><i><BadgeDollarSign size={29}/></i></div><div className="unit"><span>ต้นทุนต่อชิ้น</span><b>฿{fmt.format(r.unit)}</b></div><dl><div><dt>ค่าสินค้า + ส่งในจีน</dt><dd>฿{fmt.format(r.goods)}</dd></div><div><dt>ขนส่งจีน → ไทย</dt><dd>฿{fmt.format(thaiShip)}</dd></div><div><dt>ค่าใช้จ่ายอื่นๆ</dt><dd>฿{fmt.format(other)}</dd></div></dl></section>
            <section className="profit-card"><p>ประมาณการกำไร</p><div className="profit-row"><div><span>กำไรต่อชิ้น</span><b className={r.profit>=0?"green":"red"}>฿{fmt.format(r.profit)}</b></div><div><span>Margin</span><b>{fmt.format(r.margin)}%</b></div></div><div className="total-profit"><span>กำไรรวม {qty.toLocaleString("th-TH")} ชิ้น</span><b>฿{fmt.format(r.allProfit)}</b></div><div className="bar"><i style={{width:`${Math.min(100,Math.max(0,r.margin))}%`}}/></div><small>{r.margin>=30?"อัตรากำไรอยู่ในระดับดี":r.margin>=0?"ควรทบทวนราคาขายหรือค่าใช้จ่าย":"ราคาขายต่ำกว่าต้นทุน"}</small></section>
            <button className="save" onClick={()=>setSaved(true)}><Save size={18}/>{saved?"บันทึกไว้ใน My Orders แล้ว":"บันทึกเป็น Order"}</button>
          </aside>
        </div>
      </div>
    </section>
  </main>;
}

function Title({n,title,sub}:{n:string;title:string;sub:string}) { return <div className="section-title"><span>{n}</span><div><h2>{title}</h2><p>{sub}</p></div></div>; }
