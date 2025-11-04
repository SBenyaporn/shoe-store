import React, { useMemo, useState } from "react";
import "./customers.css";

const seed = [
  { id:"CUST001", name:"วิชญา อินทรสุข",   email:"wichaya.in@gmail.com",   phone:"0811111001", address:"ลำปาง",   orders:1,  total:2900  },
  { id:"CUST002", name:"ปวริศา พัฒน์กุล",  email:"pawarisa.pk@gmail.com",  phone:"0811111002", address:"ลำพูน",   orders:5,  total:12500 },
  { id:"CUST003", name:"ธนาวุฒิ ศรีสมบัติ", email:"thanawut.ss@gmail.com",  phone:"0811111003", address:"เชียงใหม่",orders:4, total:6750 },
  { id:"CUST004", name:"กัญญารัตน์ โชติพงศ์",email:"kanyaratt.cp@gmail.com",phone:"0811111004", address:"เชียงใหม่",orders:3,  total:7200  },
  { id:"CUST005", name:"พิชญ์สิฐ์ ธีรนาถ",   email:"pitchit.tn@gmail.com",  phone:"0811111005", address:"เชียงใหม่",orders:1,  total:2400  },
  { id:"CUST006", name:"ชยุต ศักดิ์พงศ์",    email:"chayut.sp@gmail.com",   phone:"0811111006", address:"น่าน",    orders:6,  total:14400 },
  { id:"CUST007", name:"ณัฐธิดา วงศ์ศรี",   email:"natthida.ws@gmail.com", phone:"0811111007", address:"แพร่",    orders:1, total:2800 },
  { id:"CUST008", name:"รวิศ สุขสันต์",     email:"rawit.ss@gmail.com",     phone:"0811111008", address:"ขอนแก่น", orders:2,  total:5200  },
];

export default function Customers(){
  const [rows] = useState(seed);
  const [q, setQ] = useState("");
  const [filterAddr, setFilterAddr] = useState("all");

  const addresses = useMemo(
    () => ["all", ...Array.from(new Set(rows.map(r => r.address)))],
    [rows]
  );

  const list = useMemo(() => {
    let v = [...rows];
    if (q.trim()){
      const s = q.toLowerCase();
      v = v.filter(r =>
        (r.id + r.name + r.email + r.phone).toLowerCase().includes(s)
      );
    }
    if (filterAddr !== "all"){
      v = v.filter(r => r.address === filterAddr);
    }

    v.sort((a,b) => b.total - a.total || a.name.localeCompare(b.name));
    return v;
  }, [rows, q, filterAddr]);

  return (
    <div className="cust">
      <h2>ข้อมูลลูกค้า</h2>

      <div className="cust-toolbar">
        <div className="cust-field">
          <span className="ico">🔎</span>
          <input
            className="cust-input"
            placeholder="ค้นหา: รหัสลูกค้า / ชื่อลูกค้า / อีเมล / เบอร์โทร"
            value={q}
            onChange={e=>setQ(e.target.value)}
          />
        </div>

        <select
          className="cust-input"
          value={filterAddr}
          onChange={e=>setFilterAddr(e.target.value)}
        >
          {addresses.map(a => (
            <option key={a} value={a}>{a==="all" ? "ทุกพื้นที่" : a}</option>
          ))}
        </select>

        <button className="cust-btn primary">
          <span className="ico"></span> ค้นหา
        </button>
      </div>

      <div className="cust-card">
        <table className="cust-table">
          <thead>
            <tr>
              <th style={{width:110}}>รหัสลูกค้า</th>
              <th>ลูกค้า</th>
              <th>อีเมล</th>
              <th style={{width:140}}>เบอร์โทรศัพท์</th>
              <th style={{width:120}}>ที่อยู่</th>
              <th style={{width:140}} className="ta-right">จำนวนคำสั่งซื้อ</th>
              <th style={{width:140}} className="ta-right">ยอดสั่งรวม</th>
            </tr>
          </thead>
          <tbody>
            {list.map(r=>(
              <tr key={r.id}>
                <td><code className="sku">{r.id}</code></td>
                <td>{r.name}</td>
                <td className="mono">{r.email}</td>
                <td className="mono">{r.phone}</td>
                <td>{r.address}</td>
                <td className="ta-right">{r.orders.toLocaleString()}</td>
                <td className="ta-right">{r.total.toLocaleString()} ฿</td>
              </tr>
            ))}
            {list.length===0 && (
              <tr><td colSpan="7" className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
