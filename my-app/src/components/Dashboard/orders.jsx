import React, { useMemo, useState } from "react";
import "./orders.css";

const seed = [
  { id:"T1-AS02", customer:"กวิน ภูวเดช",        date:"01-01-2568", status:"รอดำเนินการ", total:4800, payMethod:"โอนผ่านธนาคาร", payStatus:"รอชำระเงิน",  shipStatus:"รอยืนยัน" },
  { id:"T3-G220", customer:"พิมพ์ชนก ศรีสวัสดิ์", date:"01-01-2568", status:"รอดำเนินการ", total:3900, payMethod:"โอนผ่าน QR",   payStatus:"ชำระเงินแล้ว", shipStatus:"จัดส่งแล้ว" },
  { id:"T1-JM01", customer:"ธนกร วงศ์ไตรภพ",     date:"01-01-2568", status:"รอการยืนยัน", total:6200, payMethod:"โอนผ่าน QR",   payStatus:"ชำระเงินแล้ว", shipStatus:"กำลังจัดส่ง" },
  { id:"T4-PC01", customer:"ชาลิสา เกษมสุข",      date:"01-01-2568", status:"ยกเลิก",     total:2900, payMethod:"โอนผ่าน QR",   payStatus:"ชำระเงินแล้ว", shipStatus:"จัดส่งแล้ว" },
  { id:"T3-BT01", customer:"ณภัทร ชัยศิริ",       date:"01-01-2568", status:"รอดำเนินการ", total:5900, payMethod:"โอนผ่าน QR",   payStatus:"ชำระเงินแล้ว", shipStatus:"กำลังจัดส่ง" },
  { id:"T1-OS06", customer:"ปาณิสรา วัฒนะ",       date:"01-01-2568", status:"ชำระเงินแล้ว", total:4400, payMethod:"โอนผ่าน QR",   payStatus:"ชำระเงินแล้ว", shipStatus:"รอตัดส่ง" },
  { id:"T1-TW03", customer:"วชิรวิทย์ ภักดี",     date:"01-01-2568", status:"ชำระเงินแล้ว", total:5500, payMethod:"โอนผ่านธนาคาร", payStatus:"รอชำระเงิน",  shipStatus:"รอจัดส่ง" },
  { id:"T3-CB00", customer:"ศศิประภา สิงหะ",      date:"01-01-2568", status:"ยกเลิก",     total:2600, payMethod:"โอนผ่านธนาคาร", payStatus:"รอชำระเงิน",  shipStatus:"รอจัดส่ง" },
];

const statusColors = {
  "รอดำเนินการ": "badge warn",
  "รอการยืนยัน": "badge info",
  "ชำระเงินแล้ว": "badge good",
  "ยกเลิก": "badge danger",
  "รอชำระเงิน": "badge gray",
  "กำลังจัดส่ง": "badge info",
  "รอจัดส่ง": "badge warn",
  "จัดส่งแล้ว": "badge good",
  "รอยืนยัน": "badge gray",
};

export default function Orders() {
  const [rows] = useState(seed);
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");  // ประเภทสินค้า (ตัวอย่าง filter จำลอง)
  const [sort, setSort] = useState("date"); // date | total | id

  const list = useMemo(() => {
    let v = [...rows];

    if (q.trim()) {
      const s = q.toLowerCase();
      v = v.filter(
        r =>
          (r.id + r.customer).toLowerCase().includes(s)
      );
    }
    if (type !== "all") {
      // เดโม: กรองแบบปลอมตามตัวอักษรท้าย id
      v = v.filter(r => r.id.endsWith(type));
    }

    v.sort((a, b) => {
      if (sort === "total") return b.total - a.total;
      if (sort === "id") return a.id.localeCompare(b.id);
      // date (dd-mm-yyyy พ.ศ.) — เรียงใหม่เป็น yyyy-mm-dd
      const nd = d => {
        const [dd, mm, by] = d.split("-");
        const gy = (Number(by) - 543).toString().padStart(4, "0");
        return `${gy}-${mm}-${dd}`;
      };
      return nd(b.date).localeCompare(nd(a.date));
    });
    return v;
  }, [rows, q, type, sort]);

  return (
    <div className="orders">
      <h2>คำสั่งซื้อ</h2>

      <div className="od-toolbar">
        <div className="od-field">
          <span className="od-ico">🔎</span>
          <input
            className="od-input"
            placeholder="ค้นหาสินค้าจาก รหัสสินค้า หรือชื่อสินค้า"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>

        <select className="od-input" value={type} onChange={e => setType(e.target.value)}>
          <option value="all">ค้นหาประเภทสินค้า</option>
          <option value="02">02</option>
          <option value="20">20</option>
          <option value="01">01</option>
        </select>

        <div className="od-actions">
          <select className="od-input" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date">เรียงตามวันที่</option>
            <option value="total">เรียงตามยอดรวม</option>
            <option value="id">เรียงตามรหัส</option>
          </select>
          <button className="od-btn">
            <span className="od-ico">🔍</span> ค้นหา
          </button>
        </div>
      </div>

      <div className="od-card">
        <table className="od-table">
          <thead>
            <tr>
              <th className="sticky">รหัสสินค้า ▾</th>
              <th>ลูกค้า</th>
              <th>วันที่สั่งซื้อ</th>
              <th>สถานะ</th>
              <th className="ta-right">ยอดรวม</th>
              <th>วิธีชำระเงิน</th>
              <th>สถานะชำระเงิน</th>
              <th>สถานะการจัดส่ง</th>
            </tr>
          </thead>
          <tbody>
            {list.map(r => (
              <tr key={r.id}>
                <td><code className="sku">{r.id}</code></td>
                <td>{r.customer}</td>
                <td>{r.date}</td>
                <td><span className={statusColors[r.status] || "badge"}>{r.status}</span></td>
                <td className="ta-right">{r.total.toLocaleString()}</td>
                <td>{r.payMethod}</td>
                <td><span className={statusColors[r.payStatus] || "badge"}>{r.payStatus}</span></td>
                <td><span className={statusColors[r.shipStatus] || "badge"}>{r.shipStatus}</span></td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan="8" className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
