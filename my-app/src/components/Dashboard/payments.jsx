import React, { useMemo, useState } from "react";
import "./payments.css";

const seed = [
  { id:"PAY-240301-001", orderId:"T1-AS02", customer:"กวิน ภูวเดช",        method:"โอนผ่านธนาคาร", amount:4800, date:"01-03-2568", status:"รอชำระเงิน" },
  { id:"PAY-240301-002", orderId:"T3-G220", customer:"พิมพ์ชนก ศรีสวัสดิ์", method:"โอนผ่าน QR",   amount:3900, date:"01-03-2568", status:"ชำระเงินแล้ว" },
  { id:"PAY-240301-003", orderId:"T1-JM01", customer:"ธนกร วงศ์ไตรภพ",     method:"โอนผ่าน QR",   amount:6200, date:"01-03-2568", status:"รอการยืนยัน" },
  { id:"PAY-240301-004", orderId:"T4-PC01", customer:"ชาลิสา เกษมสุข",      method:"บัตรเครดิต",    amount:2900, date:"01-03-2568", status:"ยกเลิก" },
  { id:"PAY-240301-005", orderId:"T3-BT01", customer:"ณภัทร ชัยศิริ",       method:"โอนผ่าน QR",   amount:5900, date:"01-03-2568", status:"ชำระเงินแล้ว" },
  { id:"PAY-240301-006", orderId:"T1-OS06", customer:"ปาณิสรา วัฒนะ",       method:"บัตรเครดิต",    amount:4400, date:"01-03-2568", status:"ชำระเงินแล้ว" },
  { id:"PAY-240301-007", orderId:"T1-TW03", customer:"วชิรวิทย์ ภักดี",     method:"โอนผ่านธนาคาร", amount:5500, date:"01-03-2568", status:"รอชำระเงิน" },
  { id:"PAY-240301-008", orderId:"T3-CB00", customer:"ศศิประภา สิงหะ",      method:"โอนผ่านธนาคาร", amount:2600, date:"01-03-2568", status:"ยกเลิก" },
];

const statusClass = {
  "ชำระเงินแล้ว": "badge good",
  "รอชำระเงิน": "badge warn",
  "รอการยืนยัน": "badge info",
  "ยกเลิก": "badge danger",
};

export default function Payments() {
  const [rows] = useState(seed);
  const [q, setQ] = useState("");
  const [method, setMethod] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date"); // date | amount | id

  const list = useMemo(() => {
    let v = [...rows];

    if (q.trim()) {
      const s = q.toLowerCase();
      v = v.filter(r => (r.id + r.orderId + r.customer).toLowerCase().includes(s));
    }
    if (method !== "all") v = v.filter(r => r.method === method);
    if (status !== "all") v = v.filter(r => r.status === status);

    v.sort((a, b) => {
      if (sort === "amount") return b.amount - a.amount;
      if (sort === "id") return a.id.localeCompare(b.id);
      // date dd-mm-yyyy (พ.ศ.)
      const nd = d => {
        const [dd, mm, by] = d.split("-");
        const gy = (Number(by) - 543).toString().padStart(4, "0");
        return `${gy}-${mm}-${dd}`;
      };
      return nd(b.date).localeCompare(nd(a.date));
    });
    return v;
  }, [rows, q, method, status, sort]);

  const totalPaid = list
    .filter(r => r.status === "ชำระเงินแล้ว")
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="payments">
      <h2>การชำระเงิน</h2>

      {/* KPIs */}
      <div className="pay-kpis">
        <div className="kpi">
          <div className="kpi-title">จำนวนรายการ</div>
          <div className="kpi-val">{list.length}</div>
        </div>
        <div className="kpi">
          <div className="kpi-title">ชำระแล้ว (รวม)</div>
          <div className="kpi-val">{totalPaid.toLocaleString()} ฿</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-title">สถานะรอดำเนินการ</div>
          <div className="kpi-val">
            {list.filter(r => r.status !== "ชำระเงินแล้ว").length}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="pay-toolbar">
        <div className="pay-field">
          <span className="pay-ico">🔎</span>
          <input
            className="pay-input"
            placeholder="ค้นหา: รหัสชำระ/รหัสสั่งซื้อ/ชื่อลูกค้า"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <select className="pay-input" value={method} onChange={e => setMethod(e.target.value)}>
          <option value="all">ทุกวิธีชำระเงิน</option>
          <option value="โอนผ่านธนาคาร">โอนผ่านธนาคาร</option>
          <option value="โอนผ่าน QR">โอนผ่าน QR</option>
          <option value="บัตรเครดิต">บัตรเครดิต</option>
        </select>
        <select className="pay-input" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">ทุกสถานะ</option>
          <option value="ชำระเงินแล้ว">ชำระเงินแล้ว</option>
          <option value="รอชำระเงิน">รอชำระเงิน</option>
          <option value="รอการยืนยัน">รอการยืนยัน</option>
          <option value="ยกเลิก">ยกเลิก</option>
        </select>
        <div className="pay-actions">
          <select className="pay-input" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date">เรียงตามวันที่</option>
            <option value="amount">เรียงตามยอด</option>
            <option value="id">เรียงตามรหัส</option>
          </select>
          <button className="pay-btn">
            <span className="pay-ico">🔍</span> ค้นหา
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="pay-card">
        <table className="pay-table">
          <thead>
            <tr>
              <th>รหัสชำระเงิน</th>
              <th>รหัสสั่งซื้อ</th>
              <th>ลูกค้า</th>
              <th>วิธีชำระเงิน</th>
              <th className="ta-right">ยอดชำระ</th>
              <th>วันที่</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {list.map(r => (
              <tr key={r.id}>
                <td><code className="sku">{r.id}</code></td>
                <td><code className="sku light">{r.orderId}</code></td>
                <td>{r.customer}</td>
                <td>{r.method}</td>
                <td className="ta-right">{r.amount.toLocaleString()} ฿</td>
                <td>{r.date}</td>
                <td><span className={statusClass[r.status] || "badge"}>{r.status}</span></td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan="7" className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
