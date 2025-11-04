import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();
    if (!method) return alert("กรุณาเลือกวิธีการชำระเงินก่อน");

    try {
      const orderId = Number(localStorage.getItem("current_order_id"));
      if (!orderId) return alert("ไม่พบเลขออเดอร์ (กลับไปหน้าก่อน)");

      await api("/api/payments/checkout", {
        method: "POST",
        body: { orderId, method: method === "promptpay" ? "PROMPTPAY" : "CARD" },
        timeout: 8000,
      });

      navigate("/success");
    } catch (err) {
      console.error("pay error:", err);
      alert(`จ่ายเงินไม่สำเร็จ: ${err.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
      <h2 style={{ marginTop: 0 }}>รายการสินค้าในตะกร้า</h2>

      <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <p><strong>PUMA Speedcat OG Unisex Casual Shoes</strong></p>
        <p>รองเท้าผู้หญิง | ไซส์ 38</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>จำนวน 1</span><span>฿3,800.00</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 8 }}>
          <span>ยอดรวมสุทธิ</span><span>฿3,800.00</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div
          onClick={() => setMethod("card")}
          style={{
            border: "1px solid",
            borderColor: method === "card" ? "#e11" : "#ddd",
            background: method === "card" ? "#fde8e8" : "#fff",
            padding: 14,
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          💳 Card
        </div>
        <div
          onClick={() => setMethod("promptpay")}
          style={{
            border: "1px solid",
            borderColor: method === "promptpay" ? "#e11" : "#ddd",
            background: method === "promptpay" ? "#fde8e8" : "#fff",
            padding: 14,
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          📱 PromptPay
        </div>
      </div>

      {method === "card" && (
        <form onSubmit={handlePay} style={{ display: "grid", gap: 10 }}>
          <label>Card Number</label>
          <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx" required />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label>Expiration Date</label>
              <input type="text" placeholder="MM / YY" required />
            </div>
            <div>
              <label>Security Code</label>
              <input type="text" placeholder="CVV" required />
            </div>
          </div>

          <label>Country</label>
          <input type="text" placeholder="Thailand" required />

          <button type="submit" style={btnPrimary}>ชำระเงิน</button>
        </form>
      )}

      {method === "promptpay" && (
        <button style={btnPrimary} onClick={handlePay}>
          ชำระเงินผ่าน PromptPay
        </button>
      )}
    </div>
  );
}

const btnPrimary = {
  display: "block",
  width: "100%",
  padding: "14px 16px",
  border: "none",
  borderRadius: 10,
  background: "#444",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  marginTop: 12,
};
