import React, { useMemo, useState } from "react";
import "./Tasks.css";

const seed = [
  { id: "T-001", name: "จัดทำสินค้าใหม่", owner: "ทีมจัดการรองเท้า", start: "2025-02-01", end: "2025-03-30", status: "pending", note: "จัดหาของเข้าก่อน" },
  { id: "T-002", name: "เปิดร้านช่องทางออนไลน์", owner: "ฝ่ายการตลาด", start: "2025-01-15", end: "2025-04-10", status: "doing", note: "กำลังอัปเดตเพจพร้อมรูป" },
  { id: "T-003", name: "จัดโปรโมชั่นเทศกาลสงกรานต์", owner: "ฝ่ายการตลาด", start: "2025-03-01", end: "2025-04-10", status: "done", note: "กำหนดแคมเปญเรียบร้อย" },
  { id: "T-004", name: "ออกแบบแพ็กเกจ", owner: "ทีมออกแบบ", start: "2025-02-10", end: "2025-04-30", status: "blocked", note: "รออนุมัติจากผู้บริหาร" },
];

function t(date) {
  try {
    return new Date(date).toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return date; }
}

export default function Tasks() {
  const [rows, setRows] = useState(seed);
  const [sort, setSort] = useState("name");

  // modal state
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    name: "", owner: "", start: "", end: "", status: "pending", note: "",
  });

  const view = useMemo(() => {
    const v = [...rows];
    if (sort === "start") v.sort((a,b)=> new Date(a.start)-new Date(b.start));
    else if (sort === "end") v.sort((a,b)=> new Date(a.end)-new Date(b.end));
    else v.sort((a,b)=> a.name.localeCompare(b.name,"th"));
    return v;
  }, [rows, sort]);

  const openAdd = () => {
    setForm({ name:"", owner:"", start:"", end:"", status:"pending", note:"" });
    setErr("");
    setOpen(true);
  };

  const addTask = () => {
    if (!form.name.trim() || !form.owner.trim() || !form.start || !form.end) {
      setErr("กรอกข้อมูลที่จำเป็นให้ครบ (ชื่อโปรเจค / ผู้รับผิดชอบ / วันที่เริ่ม / วันที่สิ้นสุด)");
      return;
    }
    const id = `T-${String(rows.length + 1).padStart(3,"0")}`;
    setRows(prev => [...prev, { id, ...form }]);
    setOpen(false);
  };

  return (
    <div className="tasks-wrap">
      <div className="tasks-top">
        <h2>งานที่มอบหมาย</h2>
        <div className="tasks-actions">
          <button className="add-btn" type="button" onClick={openAdd}>+ เพิ่มงาน…</button>
          <select className="input" value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="name">เรียงตามชื่อโปรเจค</option>
            <option value="start">เรียงตามวันที่เริ่ม</option>
            <option value="end">เรียงตามวันที่สิ้นสุด</option>
          </select>
        </div>
      </div>

      <div className="tasks-card">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>ชื่อโปรเจค</th>
              <th style={{width:220}}>ผู้รับผิดชอบ</th>
              <th style={{width:140}}>วันที่เริ่ม</th>
              <th style={{width:140}}>วันที่สิ้นสุด</th>
              <th style={{width:140}}>สถานะ</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {view.map(r=>(
              <tr key={r.id}>
                <td className="bold">{r.name}</td>
                <td>{r.owner}</td>
                <td>{t(r.start)}</td>
                <td>{t(r.end)}</td>
                <td>
                  <span className={`badge ${r.status}`}>
                    {r.status==="pending" && "กำลังเตรียมการ"}
                    {r.status==="doing"   && "ระหว่างทำ"}
                    {r.status==="done"    && "เสร็จสิ้น"}
                    {r.status==="blocked" && "งานมีปัญหา"}
                  </span>
                </td>
                <td className="muted">{r.note}</td>
              </tr>
            ))}
            {view.length===0 && (
              <tr><td colSpan={6} className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal เพิ่มงาน */}
      {open && (
        <div className="task-modal-backdrop" onClick={()=>setOpen(false)}>
          <div className="task-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="tm-head"><h3>เพิ่มงานที่มอบหมาย</h3></div>
            <div className="tm-body">
              {err && <div className="alert warn">{err}</div>}

              <div className="grid2">
                <label className="fcol">
                  <span className="lbl">ชื่อโปรเจค *</span>
                  <input className="input" value={form.name}
                    onChange={e=>setForm({...form, name:e.target.value})}/>
                </label>
                <label className="fcol">
                  <span className="lbl">ผู้รับผิดชอบ *</span>
                  <input className="input" value={form.owner}
                    onChange={e=>setForm({...form, owner:e.target.value})}/>
                </label>

                <label className="fcol">
                  <span className="lbl">วันที่เริ่ม *</span>
                  <input className="input" type="date" value={form.start}
                    onChange={e=>setForm({...form, start:e.target.value})}/>
                </label>
                <label className="fcol">
                  <span className="lbl">วันที่สิ้นสุด *</span>
                  <input className="input" type="date" value={form.end}
                    onChange={e=>setForm({...form, end:e.target.value})}/>
                </label>

                <label className="fcol">
                  <span className="lbl">สถานะ</span>
                  <select className="input" value={form.status}
                    onChange={e=>setForm({...form, status:e.target.value})}>
                    <option value="pending">กำลังเตรียมการ</option>
                    <option value="doing">ระหว่างทำ</option>
                    <option value="done">เสร็จสิ้น</option>
                    <option value="blocked">งานมีปัญหา</option>
                  </select>
                </label>

                <label className="fcol">
                  <span className="lbl">หมายเหตุ</span>
                  <input className="input" value={form.note}
                    onChange={e=>setForm({...form, note:e.target.value})}/>
                </label>
              </div>
            </div>

            <div className="tm-foot">
              <button className="btn ghost" onClick={()=>setOpen(false)}>ยกเลิก</button>
              <button className="btn primary" onClick={addTask}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
