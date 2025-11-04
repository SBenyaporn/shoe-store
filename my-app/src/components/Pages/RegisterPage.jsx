import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth.jsx"; 

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();       
  const navigate = useNavigate();    

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "กรอกชื่อ";
    const phoneClean = form.phone.replace(/\s|-/g, "");
    if (!/^0\d{9}$/.test(phoneClean)) e.phone = "เบอร์ไม่ถูกต้อง (10 หลัก)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "อีเมลไม่ถูกต้อง";
    if (form.password.length < 6) e.password = "รหัสผ่านอย่างน้อย 6 ตัว";
    if (form.confirm !== form.password) e.confirm = "รหัสผ่านไม่ตรงกัน";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
      })
    );

 
    signIn();
    navigate("/");

    setLoading(false);
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={onSubmit} noValidate>
        <h1 className="section-title" style={{ marginTop: 0 }}>Register</h1>

        <div className="form-group">
          <label>ชื่อ</label>
          <input
            className="input"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="กรอกชื่อ"
            autoComplete="name"
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input
            className="input"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="กรอกเบอร์โทรศัพท์"
            inputMode="tel"
            autoComplete="tel"
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>อีเมล</label>
          <input
            className="input"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="กรอกอีเมล"
            autoComplete="email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input
            className="input"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="กรอกรหัสผ่าน"
            autoComplete="new-password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label>ยืนยันรหัสผ่าน</label>
          <input
            className="input"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={onChange}
            placeholder="ยืนยันรหัสผ่าน"
            autoComplete="new-password"
          />
        </div>
        {errors.confirm && <div className="error">{errors.confirm}</div>}

        <button className="btn btn-full" type="submit" disabled={loading}>
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>
      </form>
    </div>
  );
}
