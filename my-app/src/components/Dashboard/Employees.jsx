import React, { useMemo, useState } from "react";
import "./Employees.css";

// ข้อมูลเริ่มต้น
const seed = [
  { name: "นรินทร์ วัฒนกุล",   email: "narin@company.co",     dept: "ทรัพยากรบุคคล", role: "หัวหน้าฝ่ายบุคคล", start: "1 ม.ค. 65",  status: "กำลังทำงาน" },
  { name: "พิมพ์ชนก ศรีวรัญ",  email: "pimchanok@company.co", dept: "บริหาร",        role: "ผู้ช่วยผู้บริหาร",  start: "20 ก.พ. 63", status: "ลาพักร้อน" },
  { name: "ชยพล ภูริเดช",      email: "chayaphon@company.co",  dept: "การตลาด",       role: "ผู้จัดการการตลาด",  start: "18 ส.ค. 63", status: "กำลังทำงาน" },
  { name: "ศศิธร โกมลมาศ",     email: "sasitorn@company.co",   dept: "บัญชีการเงิน",  role: "เจ้าหน้าที่บัญชี",   start: "10 เม.ย. 64", status: "ลางาน" },
  { name: "ธีรภพ จิตวิริยะ",    email: "theerapop@company.co",  dept: "ไอที",          role: "วิศวกรซอฟต์แวร์",     start: "5 ส.ค. 65",  status: "กำลังทำงาน" },
];

function StatusPill({ value }) {
  const map = { "กำลังทำงาน": "ok", "ลาพักร้อน": "vac", "ลางาน": "off" };
  return <span className={`st ${map[value] || ""}`}>{value}</span>;
}

export default function Employees() {
  const [rows, setRows] = useState(seed);

  // modal state
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", dept: "", role: "", start: "", status: "กำลังทำงาน",
  });

  const depts = useMemo(() => Array.from(new Set(rows.map(r => r.dept))), [rows]);

  const onSave = () => {
    // validate
    if (!form.name.trim() || !form.email.trim() || !form.dept.trim() || !form.role.trim() || !form.status) {
      return setErr("กรอกข้อมูลให้ครบทุกช่อง");
    }
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!emailOk) return setErr("รูปแบบอีเมลไม่ถูกต้อง");

    // จัดรูปแบบวันที่แบบไทย ถ้าเลือกจาก input date
    let startText = form.start;
    try {
      if (/^\d{4}-\d{2}-\d{2}$/.test(form.start)) {
        const d = new Date(form.start);
        startText = d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
      }
    } catch {}

    const newRow = { ...form, start: startText };
    setRows(prev => [...prev, newRow]);
    setOpen(false);
    setForm({ name: "", email: "", dept: "", role: "", start: "", status: "กำลังทำงาน" });
    setErr("");
  };

  return (
    <div className="emp-wrap">
      <div className="emp-head">
        <h2 className="emp-title">ข้อมูลพนักงาน</h2>
        {/* ปุ่มแบบเม็ดแคปซูลตามภาพ */}
        <button className="pill-btn" type="button" onClick={() => setOpen(true)}>
          + เพิ่มพนักงาน
        </button>
      </div>

      <div className="emp-card">
        <table className="emp-table">
          <thead>
            <tr>
              <th className="w-name">ชื่อ-นามสกุล</th>
              <th>อีเมล</th>
              <th>แผนก</th>
              <th>ตำแหน่ง</th>
              <th>วันที่เริ่มงาน</th>
              <th className="w-status">สถานะการทำงาน</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td className="muted">{r.email}</td>
                <td>{r.dept}</td>
                <td>{r.role}</td>
                <td className="muted">{r.start}</td>
                <td><StatusPill value={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal เพิ่มพนักงาน */}
      {open && (
        <div className="emp-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="emp-modal card" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>เพิ่มพนักงาน</h3>
            </div>

            <div className="modal-body">
              {err && <div className="alert warn">{err}</div>}

              <div className="grid2">
                <label className="fcol">
                  <span className="lbl">ชื่อ-นามสกุล</span>
                  <input className="input" value={form.name}
                         onChange={e => setForm({ ...form, name: e.target.value })} />
                </label>

                <label className="fcol">
                  <span className="lbl">อีเมล</span>
                  <input className="input" type="email" value={form.email}
                         onChange={e => setForm({ ...form, email: e.target.value })} />
                </label>

                <label className="fcol">
                  <span className="lbl">แผนก</span>
                  <input className="input" list="dept-list" value={form.dept}
                         onChange={e => setForm({ ...form, dept: e.target.value })} />
                  <datalist id="dept-list">
                    {depts.map(d => <option key={d} value={d} />)}
                  </datalist>
                </label>

                <label className="fcol">
                  <span className="lbl">ตำแหน่ง</span>
                  <input className="input" value={form.role}
                         onChange={e => setForm({ ...form, role: e.target.value })} />
                </label>

                <label className="fcol">
                  <span className="lbl">วันที่เริ่มงาน</span>
                  <input className="input" type="date" value={form.start}
                         onChange={e => setForm({ ...form, start: e.target.value })} />
                </label>

                <label className="fcol">
                  <span className="lbl">สถานะการทำงาน</span>
                  <select className="input" value={form.status}
                          onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option>กำลังทำงาน</option>
                    <option>ลาพักร้อน</option>
                    <option>ลางาน</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="modal-foot">
              <button className="btn ghost" onClick={() => setOpen(false)}>ยกเลิก</button>
              <button className="btn primary" onClick={onSave}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
