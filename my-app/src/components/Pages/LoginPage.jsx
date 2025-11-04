import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth.jsx";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("อีเมลไม่ถูกต้อง");
      return;
    }
    if (!form.password) {
      setError("กรอกรหัสผ่าน");
      return;
    }

    try {
      setLoading(true);
    
      await signIn({ email: form.email, password: form.password });
      navigate("/"); 
    } catch (err) {
    
      setError(err?.message || "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <h1 className="section-title" style={{ marginTop: 0, textAlign: "center" }}>
          เข้าสู่ระบบ
        </h1>

        <div className="form-group">
          <label>อีเมล</label>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="กรอกอีเมล"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <div className="error" style={{ marginBottom: 8 }}>
            {error}
          </div>
        )}

        <button className="btn btn-full" type="submit" disabled={loading}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <p className="muted" style={{ textAlign: "center", marginTop: 12 }}>
          ลืมรหัสผ่าน?
        </p>
        <p className="muted" style={{ textAlign: "center", fontWeight: 700 }}>
          ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
        </p>
      </form>
    </div>
  );
}
