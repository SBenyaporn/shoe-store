import React from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div style={{background:"#fff", padding:24, borderRadius:12, textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
      <h2 style={{marginTop:0}}>ชำระเงินสำเร็จ 🎉</h2>
      <p>เราได้รับคำสั่งซื้อของคุณแล้ว</p>
      <div style={{display:"flex", gap:12, justifyContent:"center", marginTop:14}}>
        <Link to="/history" style={btn}>ดูประวัติการสั่งซื้อ</Link>
        <Link to="/checkout" style={{...btn, background:"#fff", color:"#111", border:"1px solid #ddd"}}>กลับไปหน้า Checkout</Link>
      </div>
    </div>
  );
}
const btn = { padding:"10px 14px", background:"#111", color:"#fff", borderRadius:10, textDecoration:"none", fontWeight:700 };
