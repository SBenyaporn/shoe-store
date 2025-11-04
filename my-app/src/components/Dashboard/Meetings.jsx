// src/components/Dashboard/Meetings.jsx
import React, { useMemo, useState } from "react";
import "./Meetings.css";

const tzOptions = [
  "Thailand Time (ICT)",
  "UTC",
  "Japan Standard Time (JST)",
  "Pacific Time (PT)",
];

// seed อีเวนต์ตัวอย่าง
const seed = [
  { id: "e1",  title: "รีวิวงานสัปดาห์",   date: "2025-03-03", color: "blue" },
  { id: "e2",  title: "นัดลูกค้า A",       date: "2025-03-04", color: "orange" },
  { id: "e3",  title: "สรุปยอด Q1",        date: "2025-03-05", color: "red" },
  { id: "e4",  title: "ถกแคมเปญ",          date: "2025-03-06", color: "yellow" },
  { id: "e5",  title: "แฮนด์ออฟ Dev",      date: "2025-03-07", color: "blue" },
  { id: "e6",  title: "เช็คสต็อก",          date: "2025-03-08", color: "green" },
  { id: "e7",  title: "สปรินต์รีวิว",       date: "2025-03-10", color: "blue" },
  { id: "e8",  title: "ออนบอร์ดพนักงาน",   date: "2025-03-11", color: "green" },
  { id: "e9",  title: "ถ่ายรูปสินค้า",      date: "2025-03-12", color: "orange" },
  { id: "e10", title: "วางแผนคอนเทนต์",    date: "2025-03-13", color: "yellow" },
  { id: "e11", title: "วิเคราะห์ยอดขาย",   date: "2025-03-17", color: "red" },
  { id: "e12", title: "PR ประจำเดือน",     date: "2025-03-18", color: "blue" },
];

function startOfMonth(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), 1);
  const wd = (x.getDay() + 6) % 7; // จันทร์=0
  x.setDate(x.getDate() - wd);
  return x;
}
function endOfMonth(d) {
  const x = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const wd = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() + (6 - wd));
  return x;
}
function fmtYYYYMMDD(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export default function Meetings() {
  const [today] = useState(new Date());
  const [cursor, setCursor] = useState(new Date());     // เดือนที่กำลังดู
  const [tz, setTz] = useState(tzOptions[0]);
  const [events, setEvents] = useState(seed);

  const days = useMemo(() => {
    const s = startOfMonth(cursor);
    const e = endOfMonth(cursor);
    const arr = [];
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      arr.push(new Date(d));
    }
    return arr;
  }, [cursor]);

  const mapByDate = useMemo(() => {
    const m = new Map();
    for (const ev of events) {
      if (!m.has(ev.date)) m.set(ev.date, []);
      m.get(ev.date).push(ev);
    }
    return m;
  }, [events]);

  // modal state (เพิ่มอีเวนต์)
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: fmtYYYYMMDD(new Date()), color: "blue" });
  const [err, setErr] = useState("");

  const addEvent = () => {
    if (!form.title.trim() || !form.date) { setErr("กรอกชื่อและวันที่"); return; }
    const id = `e${Date.now()}`;
    setEvents(prev => [...prev, { ...form, id }]);
    setOpen(false);
    setForm({ title: "", date: fmtYYYYMMDD(new Date()), color: "blue" });
    setErr("");
  };

  const monthName = cursor.toLocaleDateString("th-TH", { month: "long", year: "numeric" });

  return (
    <div className="meet-shell">
      {/* Toolbar */}
      <div className="meet-top">
        <div className="left-group">
          <button className="btn ghost" onClick={() => setCursor(new Date())}>Today</button>
          <div className="date-chip">
            {today.toLocaleDateString("th-TH", { day:"2-digit" })}{" "}
            {today.toLocaleDateString("th-TH", { month:"short" })}{" "}
            {today.toLocaleTimeString("th-TH", { hour:"2-digit", minute:"2-digit" })}
          </div>
          <select className="input" value={tz} onChange={e=>setTz(e.target.value)}>
            {tzOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="nav">
            <button className="btn ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()-1, 1))}>‹</button>
            <div className="month">{monthName}</div>
            <button className="btn ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+1, 1))}>›</button>
          </div>
        </div>
        <div className="right-group">
          <button className="btn primary" onClick={() => setOpen(true)}>+ Add event</button>
        </div>
      </div>

      <div className="meet-body">
        {/* ตารางเดือน */}
        <div className="calendar">
          <div className="cal-head">
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d)=>(
              <div key={d} className="cal-col-head">{d}</div>
            ))}
          </div>
          <div className="cal-grid">
            {days.map((d,i)=>{
              const key = fmtYYYYMMDD(d);
              const outMonth = d.getMonth() !== cursor.getMonth();
              const isToday = fmtYYYYMMDD(d) === fmtYYYYMMDD(today);
              const evs = mapByDate.get(key) || [];
              return (
                <div key={i} className={`cell ${outMonth?"muted":""}`}>
                  <div className={`cell-date ${isToday?"today":""}`}>{d.getDate()}</div>
                  <div className="cell-events">
                    {evs.map(ev=>(
                      <div key={ev.id} className={`chip ${ev.color}`}>{ev.title}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* legend ขวา */}
        <aside className="legend">
          <div className="leg-title">Calendars</div>
          <div className="chip sm blue">การตลาด</div>
          <div className="chip sm orange">สินค้าขาเข้า</div>
          <div className="chip sm red">เร่งด่วน</div>
          <div className="chip sm green">ทรัพยากรบุคคล</div>
        </aside>
      </div>

      {/* Modal เพิ่มอีเวนต์ */}
      {open && (
        <div className="meet-modal-backdrop" onClick={()=>setOpen(false)}>
          <div className="meet-modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-head"><h3>เพิ่มนัดหมาย</h3></div>
            <div className="modal-body">
              {err && <div className="alert warn">{err}</div>}
              <div className="grid2">
                <label className="fcol">
                  <span className="lbl">ชื่อกิจกรรม</span>
                  <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
                </label>
                <label className="fcol">
                  <span className="lbl">วันที่</span>
                  <input className="input" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
                </label>
                <label className="fcol full">
                  <span className="lbl">ป้ายสี</span>
                  <div className="color-row">
                    {["blue","orange","yellow","red","green"].map(c=>(
                      <button key={c} type="button" className={`color-dot ${c} ${form.color===c?"on":""}`} onClick={()=>setForm({...form,color:c})}/>
                    ))}
                  </div>
                </label>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn ghost" onClick={()=>setOpen(false)}>ยกเลิก</button>
              <button className="btn primary" onClick={addEvent}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
