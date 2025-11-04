import React, { useMemo, useState } from "react";
import "./Leave.css";

// ตัวอย่างข้อมูล
const seed = [
  { id: "L-001", employee: "ปาริชาติ วงศ์ดี", type: "ลาพักร้อน", start: "2025-03-03", end: "2025-03-05", days: 3, status: "pending", reason: "เดินทางต่างจังหวัด" },
  { id: "L-002", employee: "พศิน แก้วคำ",     type: "ลาป่วย",   start: "2025-03-06", end: "2025-03-07", days: 2, status: "approved", reason: "เป็นไข้" },
  { id: "L-003", employee: "อรชุน ปัทม์",     type: "ลากิจ",     start: "2025-03-10", end: "2025-03-10", days: 1, status: "rejected", reason: "ธุระส่วนตัว" },
];

const types = ["ลาพักร้อน", "ลาป่วย", "ลากิจ"];

function toTH(d) {
  return new Date(d).toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
}

// คำนวณจำนวนวันแบบนับวันทำงาน (จันทร์–ศุกร์) รวมวันเริ่ม/สิ้นสุด
function businessDaysInclusive(startStr, endStr) {
  if (!startStr || !endStr) return 0;
  let s = new Date(startStr);
  let e = new Date(endStr);
  if (e < s) [s, e] = [e, s];
  let count = 0;
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    const wd = d.getDay(); // 0=อา ... 6=ส
    if (wd !== 0 && wd !== 6) count++;
  }
  return count;
}

export default function Leave() {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [t, setT] = useState("all");
  const [s, setS] = useState("all");
  const [sort, setSort] = useState("start");

  // modal
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    employee: "", type: types[0], start: "", end: "", days: 0, reason: "",
  });

  const view = useMemo(() => {
    let v = [...rows];
    if (q.trim()) {
      const s = q.toLowerCase();
      v = v.filter(r =>
        (r.employee + r.type + r.reason + r.id).toLowerCase().includes(s)
      );
    }
    if (t !== "all") v = v.filter(r => r.type === t);
    if (s !== "all") v = v.filter(r => r.status === s);
    if (sort === "start") v.sort((a,b)=> new Date(a.start) - new Date(b.start));
    else if (sort === "end") v.sort((a,b)=> new Date(a.end) - new Date(b.end));
    else v.sort((a,b)=> a.employee.localeCompare(b.employee,"th"));
    return v;
  }, [rows, q, t, s, sort]);

  const totalPending = rows.filter(r=>r.status==="pending").length;

  const openAdd = () => {
    setForm({ employee:"", type: types[0], start:"", end:"", days:0, reason:"" });
    setErr("");
    setOpen(true);
  };

  const updateFormDays = (nf) => {
    const days = businessDaysInclusive(nf.start, nf.end);
    setForm({ ...nf, days });
  };

  const addLeave = () => {
    if (!form.employee.trim() || !form.start || !form.end) {
      setErr("กรอกชื่อพนักงาน และเลือกวันที่เริ่ม/สิ้นสุดให้ครบ");
      return;
    }
    const id = `L-${String(rows.length + 1).padStart(3,"0")}`;
    setRows(prev => [...prev, { id, status: "pending", ...form }]);
    setOpen(false);
  };

  const setStatus = (id, status) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="leave-wrap">
      <div className="leave-top">
        <div>
          <h2>การจัดการลา</h2>
          <p className="muted">คำขอรออนุมัติ: <b>{totalPending}</b> รายการ</p>
        </div>
        <div className="leave-actions">
          <button className="pill-btn" type="button" onClick={openAdd}>+ เพิ่มคำขอลา…</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="leave-toolbar">
        <input className="input" placeholder="ค้นหา: ชื่อ/ประเภท/เหตุผล/รหัส" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="input" value={t} onChange={e=>setT(e.target.value)}>
          <option value="all">ทุกประเภท</option>
          {types.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <select className="input" value={s} onChange={e=>setS(e.target.value)}>
          <option value="all">ทุกสถานะ</option>
          <option value="pending">รออนุมัติ</option>
          <option value="approved">อนุมัติแล้ว</option>
          <option value="rejected">ปฏิเสธ</option>
        </select>
        <select className="input" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="start">เรียงตามวันที่เริ่ม</option>
          <option value="end">เรียงตามวันที่สิ้นสุด</option>
          <option value="employee">เรียงตามชื่อพนักงาน</option>
        </select>
      </div>

      {/* Table */}
      <div className="leave-card">
        <table className="leave-table">
          <thead>
            <tr>
              <th style={{width:96}}>รหัส</th>
              <th>พนักงาน</th>
              <th style={{width:140}}>ประเภท</th>
              <th style={{width:140}}>วันที่เริ่ม</th>
              <th style={{width:140}}>วันที่สิ้นสุด</th>
              <th style={{width:90}} className="ta-right">วันลา</th>
              <th style={{width:140}}>สถานะ</th>
              <th>เหตุผล</th>
              <th style={{width:160}}></th>
            </tr>
          </thead>
          <tbody>
            {view.map(r=>(
              <tr key={r.id}>
                <td><code className="code">{r.id}</code></td>
                <td className="bold">{r.employee}</td>
                <td>{r.type}</td>
                <td>{toTH(r.start)}</td>
                <td>{toTH(r.end)}</td>
                <td className="ta-right">{r.days}</td>
                <td>
                  <span className={`badge ${r.status}`}>
                    {r.status==="pending"  && "รออนุมัติ"}
                    {r.status==="approved" && "อนุมัติแล้ว"}
                    {r.status==="rejected" && "ปฏิเสธ"}
                  </span>
                </td>
                <td className="muted">{r.reason}</td>
                <td className="row-actions">
                  <button className="btn x-approve" onClick={()=>setStatus(r.id,"approved")}>อนุมัติ</button>
                  <button className="btn x-reject"  onClick={()=>setStatus(r.id,"rejected")}>ปฏิเสธ</button>
                </td>
              </tr>
            ))}
            {view.length===0 && (
              <tr><td colSpan={9} className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal เพิ่มคำขอลา */}
      {open && (
        <div className="leave-modal-backdrop" onClick={()=>setOpen(false)}>
          <div className="leave-modal" onClick={e=>e.stopPropagation()}>
            <div className="lm-head"><h3>เพิ่มคำขอลา</h3></div>
            <div className="lm-body">
              {err && <div className="alert warn">{err}</div>}
              <div className="grid2">
                <label className="fcol">
                  <span className="lbl">พนักงาน *</span>
                  <input className="input" value={form.employee} onChange={e=>setForm({...form, employee:e.target.value})}/>
                </label>
                <label className="fcol">
                  <span className="lbl">ประเภทลา *</span>
                  <select className="input" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
                    {types.map(x => <option key={x} value={x}>{x}</option>)}
                  </select>
                </label>

                <label className="fcol">
                  <span className="lbl">วันที่เริ่ม *</span>
                  <input className="input" type="date" value={form.start}
                         onChange={e=>updateFormDays({ ...form, start: e.target.value })}/>
                </label>
                <label className="fcol">
                  <span className="lbl">วันที่สิ้นสุด *</span>
                  <input className="input" type="date" value={form.end}
                         onChange={e=>updateFormDays({ ...form, end: e.target.value })}/>
                </label>

                <label className="fcol">
                  <span className="lbl">จำนวนวันลา (ทำงาน)</span>
                  <input className="input" value={form.days} readOnly />
                </label>

                <label className="fcol">
                  <span className="lbl">เหตุผล</span>
                  <input className="input" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})}/>
                </label>
              </div>
            </div>
            <div className="lm-foot">
              <button className="btn ghost" onClick={()=>setOpen(false)}>ยกเลิก</button>
              <button className="btn primary" onClick={addLeave}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
