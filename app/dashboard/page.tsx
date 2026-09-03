import { ArrowDownRight, ArrowUpRight, Calculator, FileText, Languages, LayoutDashboard, PackageCheck, Plus, Settings, Truck, WalletCards } from "lucide-react";
import "./dashboard.css";

const orders = [
  { id: "CN-260901", supplier: "Shenzhen Yihua Trading", product: "กล่องจัดเก็บอเนกประสงค์", amount: "¥8,420", status: "กำลังผลิต", tone: "blue" },
  { id: "CN-260827", supplier: "Yiwu Lixin Factory", product: "อุปกรณ์ตกแต่งร้าน", amount: "¥3,680", status: "ส่งออกจากจีน", tone: "gold" },
  { id: "CN-260821", supplier: "Guangzhou Mingda", product: "บรรจุภัณฑ์สั่งผลิต", amount: "¥6,150", status: "ถึงไทยแล้ว", tone: "green" },
  { id: "CN-260818", supplier: "Dongguan Qianyu", product: "ชิ้นส่วนพลาสติก", amount: "¥2,240", status: "รอชำระเงิน", tone: "gray" },
];

const nav = [
  [LayoutDashboard, "Dashboard", "/dashboard"], [Calculator, "คำนวณต้นทุน", "/"],
  [PackageCheck, "My China Orders", "#orders"], [Languages, "ผู้ช่วยภาษาจีน", "#assistant"],
  [FileText, "Supplier Book", "#supplier"], [WalletCards, "ชำระเงินหยวน", "#payment"], [Truck, "ขนส่งจีน–ไทย", "#shipping"],
] as const;

export default function Dashboard() {
  return <main className="shell dashboard-shell">
    <aside className="sidebar">
      <a className="brand" href="/dashboard"><img src="/wewalldifo-logo.png" alt="WEWALLDIFO Company Limited" /></a>
      <p className="nav-title">เครื่องมือธุรกิจจีน</p>
      <nav>{nav.map(([Icon,label,href],i)=><a key={label} className={i===0?"active":""} href={href}><Icon size={19}/>{label}{i===2&&<em>3</em>}</a>)}</nav>
      <div className="sidebar-foot"><a href="#settings"><Settings size={19}/>ตั้งค่า</a><div className="profile"><span>T</span><div><strong>คุณตั้ม</strong><small>VW-000128</small></div></div></div>
    </aside>

    <section className="workspace">
      <header><div className="mobile-logo"><img src="/wewalldifo-logo.png" alt="WEWALLDIFO" /></div><div className="today-rate"><span>เรท CNY วันนี้</span><b>¥1 = ฿4.65</b><small>อัปเดตล่าสุด 10:35</small></div><button>LINE　บัญชีของฉัน</button></header>
      <div className="dashboard-content">
        <div className="dash-heading"><div><small>DASHBOARD</small><h1>ภาพรวมธุรกิจจีน</h1><p>สรุปออเดอร์ ต้นทุน และรายการที่ต้องจัดการ</p></div><div className="sample-badge">ข้อมูลตัวอย่าง</div></div>

        <section className="stat-grid">
          <Stat title="ยอดสั่งซื้อเดือนนี้" value="฿186,420" note="+12.8% จากเดือนก่อน" up icon={<WalletCards/>}/>
          <Stat title="ออเดอร์กำลังดำเนินการ" value="8" note="3 รายการต้องติดตาม" icon={<PackageCheck/>}/>
          <Stat title="ยอดรอชำระ" value="฿42,780" note="2 รายการ" warn icon={<FileText/>}/>
          <Stat title="กำไรประมาณการ" value="฿61,350" note="Margin เฉลี่ย 32.9%" up icon={<ArrowUpRight/>}/>
        </section>

        <section className="quick-actions">
          <a href="/"><i><Calculator/></i><div><strong>คำนวณต้นทุน</strong><span>เช็กต้นทุนถึงไทยและกำไร</span></div><ArrowUpRight/></a>
          <a href="#orders"><i><Plus/></i><div><strong>เพิ่มออเดอร์จีน</strong><span>บันทึกรายการสั่งซื้อใหม่</span></div><ArrowUpRight/></a>
          <a href="#payment"><i><WalletCards/></i><div><strong>ชำระเงินหยวน</strong><span>ส่งคำขอชำระร้านค้าจีน</span></div><ArrowUpRight/></a>
          <a href="#assistant"><i><Languages/></i><div><strong>คุยกับร้านจีน</strong><span>สร้างและแปลข้อความจีน</span></div><ArrowUpRight/></a>
        </section>

        <div className="dashboard-columns">
          <section className="dash-card spending-card">
            <div className="card-heading"><div><h2>ยอดซื้อจากจีน</h2><p>6 เดือนล่าสุด</p></div><select aria-label="เลือกช่วงเวลา"><option>6 เดือน</option><option>12 เดือน</option></select></div>
            <div className="chart-total"><strong>฿824,590</strong><span><ArrowUpRight size={14}/> 18.4%</span></div>
            <div className="chart" aria-label="กราฟยอดซื้อ 6 เดือน">
              {[42,58,48,72,64,88].map((height,i)=><div key={i}><i style={{height:`${height}%`}}/><span>{["เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย."][i]}</span></div>)}
            </div>
          </section>
          <section className="dash-card status-card">
            <div className="card-heading"><div><h2>สถานะออเดอร์</h2><p>ทั้งหมด 12 รายการ</p></div></div>
            <div className="donut"><div><strong>12</strong><span>ออเดอร์</span></div></div>
            <ul><li><i className="dot blue"/>กำลังผลิต <b>3</b></li><li><i className="dot gold"/>กำลังขนส่ง <b>5</b></li><li><i className="dot green"/>ถึงไทยแล้ว <b>3</b></li><li><i className="dot gray"/>รอชำระ <b>1</b></li></ul>
          </section>
        </div>

        <section className="dash-card orders-card" id="orders">
          <div className="card-heading"><div><h2>ออเดอร์ล่าสุด</h2><p>รายการสั่งซื้อที่มีการเคลื่อนไหวล่าสุด</p></div><a href="#all-orders">ดูทั้งหมด</a></div>
          <div className="table-scroll"><table><thead><tr><th>เลขออเดอร์</th><th>Supplier / สินค้า</th><th>ยอดเงิน</th><th>สถานะ</th><th></th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><b>{o.id}</b></td><td><strong>{o.supplier}</strong><span>{o.product}</span></td><td><b>{o.amount}</b></td><td><em className={`status ${o.tone}`}>{o.status}</em></td><td><a href="#detail">ดูรายละเอียด</a></td></tr>)}</tbody></table></div>
        </section>
      </div>
    </section>
  </main>;
}

function Stat({title,value,note,icon,up,warn}:{title:string;value:string;note:string;icon:React.ReactNode;up?:boolean;warn?:boolean}) {
  return <article className="stat-card"><div className={`stat-icon ${warn?"warning":""}`}>{icon}</div><span>{title}</span><strong>{value}</strong><small className={up?"up":""}>{up?<ArrowUpRight size={14}/>:warn?<ArrowDownRight size={14}/>:null}{note}</small></article>;
}
