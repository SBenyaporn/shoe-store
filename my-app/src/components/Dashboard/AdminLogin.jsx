import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!u || !p) return setErr("กรุณากรอกข้อมูลให้ครบถ้วน");
    if (u === "admin" && p === "admin") {
      localStorage.setItem("admin_token", "demo");
      nav(loc.state?.from?.pathname || "/admin", { replace: true });
    } else setErr("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  };

  return (
    <div className="AL-bg">
      <div className="AL-card">
        {/* LEFT IMAGE */}
        <div className="AL-left">
          <img src="/src/assets/admin.jpg" alt="login" />
        </div>

        {/* RIGHT FORM */}
        <div className="AL-right">
          <h1 className="AL-title">เข้าสู่ระบบ</h1>

          <form onSubmit={submit} className="AL-form" noValidate>
            {/* USERNAME */}
            <label className="AL-field" aria-label="ชื่อผู้ใช้งาน">
              <span className="AL-icon">
                <svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>
              </span>
              <input
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
                value={u}
                onChange={(e) => setU(e.target.value)}
                autoComplete="username"
              />
            </label>

            {/* PASSWORD */}
            <label className="AL-field" aria-label="รหัสผ่าน">
              <span className="AL-icon">
                <svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg>
              </span>
              <input
                type={show ? "text" : "password"}
                placeholder="รหัสผ่าน"
                value={p}
                onChange={(e) => setP(e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className="AL-eye" onClick={() => setShow(v=>!v)} aria-label="สลับการแสดงรหัสผ่าน">
                {/* eye icon */}
                <svg viewBox="0 0 24 24">
                  {show
                    ? <><path d="M3 3l18 18"/><path d="M6.7 6.7A12.2 12.2 0 0 0 2 12c2.2 3.8 6 6 10 6 1.7 0 3.3-.4 4.8-1.1M17.3 7.3A12.3 12.3 0 0 1 22 12"/></>
                    : <><path d="M2 12c2.2-3.8 6-6 10-6s7.8 2.2 10 6c-2.2 3.8-6 6-10 6S4.2 15.8 2 12Z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </label>

            <div className="AL-row-end">
              <button type="button" className="AL-link">ลืมรหัสผ่าน?</button>
            </div>

            {err && <p className="AL-error">{err}</p>}

            <button type="submit" className="AL-btnPrimary">เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>
    </div>
  );
}
