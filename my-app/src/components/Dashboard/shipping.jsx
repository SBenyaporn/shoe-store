import React, { useMemo, useState } from "react";
import "./shipping.css";

const seed = [
  { orderId:"ORD-1001", customer:"คุณมานี",   address:"กรุงเทพฯ",   status:"จัดส่งแล้ว",       orderDate:"2024-02-10", courier:"Kerry Express", tracking:"KEX123456789" },
  { orderId:"ORD-1002", customer:"คุณสมหญิง", address:"เชียงใหม่",   status:"รอการจัดส่ง",      orderDate:"2024-02-10", courier:"ไปรษณีย์ไทย",   tracking:"-" },
  { orderId:"ORD-1003", customer:"คุณธงชัย", address:"ลำปาง",     status:"กำลังดำเนินการ",   orderDate:"2024-02-10", courier:"Flash Express",  tracking:"FLX987654321" },
  { orderId:"ORD-1004", customer:"คุณสมชาย",  address:"นครราชสีมา", status:"จัดส่งแล้ว",       orderDate:"2024-02-10", courier:"Flash Express",  tracking:"FLX987654321" },
  { orderId:"ORD-1005", customer:"คุณวิชัย",   address:"ภูเก็ต",     status:"รอการจัดส่ง",      orderDate:"2024-02-11", courier:"Flash Express",  tracking:"-" },
  { orderId:"ORD-1006", customer:"คุณกานต์",   address:"ขอนแก่น",    status:"รอการจัดส่ง",      orderDate:"2024-02-11", courier:"ไปรษณีย์ไทย",   tracking:"-" },
  { orderId:"ORD-1007", customer:"คุณสมชาย",   address:"กาญจนบุรี",  status:"จัดส่งแล้ว",       orderDate:"2024-02-12", courier:"ไปรษณีย์ไทย",   tracking:"THPA56123789" },
  { orderId:"ORD-1008", customer:"คุณช่อม่วง",address:"ลพบุรี",     status:"จัดส่งแล้ว",       orderDate:"2024-02-12", courier:"Kerry Express",  tracking:"KEX123459129" },
];

const statusBadge = s =>
  s === "จัดส่งแล้ว" ? "badge good"
: s === "รอการจัดส่ง" ? "badge warn"
: s === "กำลังดำเนินการ" ? "badge info"
: "badge";

export default function Shipping(){
  const [rows] = useState(seed);
  const [qCustomer, setQCustomer] = useState("");
  const [qOrder, setQOrder] = useState("");

  const list = useMemo(() => {
    let v = [...rows];
    if (qCustomer.trim()){
      const s = qCustomer.toLowerCase();
      v = v.filter(r => (r.customer + r.address).toLowerCase().includes(s));
    }
    if (qOrder.trim()){
      const s2 = qOrder.toLowerCase();
      v = v.filter(r => r.orderId.toLowerCase().includes(s2));
    }
    // เรียงตามวันที่ล่าสุดก่อน
    v.sort((a,b) => b.orderDate.localeCompare(a.orderDate) || a.orderId.localeCompare(b.orderId));
    return v;
  }, [rows, qCustomer, qOrder]);

  const reset = () => { setQCustomer(""); setQOrder(""); };

  return (
    <div className="ship">
      <div className="ship-head">
        <h2>การจัดส่ง</h2>
      </div>

      <div className="ship-toolbar">
        <div className="ship-field">
          <span className="ico">🔎</span>
          <input
            className="ship-input"
            placeholder="ค้นหาหมายเลขคำสั่งซื้อ หรือชื่อลูกค้า"
            value={qCustomer}
            onChange={e=>setQCustomer(e.target.value)}
          />
        </div>
        <div className="ship-field">
          <span className="ico">🧾</span>
          <input
            className="ship-input"
            placeholder="ค้นหาหมายเลขคำสั่งซื้อ"
            value={qOrder}
            onChange={e=>setQOrder(e.target.value)}
          />
        </div>
        <button className="ship-btn primary">ค้นหา</button>
        <button className="ship-btn" onClick={reset}>รีเซ็ต</button>
      </div>

      <div className="ship-card">
        <table className="ship-table">
          <thead>
            <tr>
              <th>หมายเลขคำสั่งซื้อ</th>
              <th>ลูกค้า</th>
              <th>ที่อยู่</th>
              <th>สถานะการจัดส่ง</th>
              <th>วันที่สั่งซื้อ</th>
              <th>บริษัทขนส่ง</th>
              <th>หมายเลขติดตามพัสดุ</th>
            </tr>
          </thead>
          <tbody>
            {list.map(r=>(
              <tr key={r.orderId}>
                <td><code className="sku">{r.orderId}</code></td>
                <td>{r.customer}</td>
                <td>{r.address}</td>
                <td><span className={statusBadge(r.status)}>{r.status}</span></td>
                <td>{r.orderDate}</td>
                <td>{r.courier}</td>
                <td className="mono">{r.tracking}</td>
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
