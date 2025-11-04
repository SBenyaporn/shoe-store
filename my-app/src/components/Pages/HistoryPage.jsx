// src/components/Pages/HistoryPage.jsx
import React, { useEffect, useState } from "react";
import { api } from "../../api";

export default function HistoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErrMsg("");

        const raw = Number(localStorage.getItem("user_id"));
        const hasValidUser = Number.isInteger(raw) && raw > 0;
        const params = hasValidUser ? { userId: raw } : undefined;

        const data = await api("/api/orders/me/list", { params, timeout: 10000 });

        const orders = Array.isArray(data?.orders) ? data.orders : [];
        const items = Array.isArray(data?.items) ? data.items : [];

        const group = orders.map((o) => ({
          ...o,
          items: items.filter((it) => it.order_id === o.id),
        }));
        setRows(group);
      } catch (e) {
        console.error(e);
        setErrMsg(e?.message || "โหลดประวัติคำสั่งซื้อไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p style={{ padding: 16 }}>กำลังโหลด…</p>;

  return (
    <div className="history-container" style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <h2 style={{ fontSize: 32, margin: "8px 0 16px" }}>ประวัติการสั่งซื้อ</h2>

      {errMsg && (
        <div style={{ background: "#fee2e2", color: "#991b1b", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {errMsg}
        </div>
      )}

      {!rows.length ? (
        <p style={{ color: "#666" }}>ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        rows.map((order) => (
          <div key={order.id} style={{ background: "#fff", padding: 16, borderRadius: 12, marginBottom: 16, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
              <p style={{ margin: 0, color: "#444" }}>วันที่สั่งซื้อ</p>
              <span>
                {new Date(order.created_at).toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  background: order.status === "PAID" ? "#16a34a" : "#999",
                  color: "#fff",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                {order.status === "PAID" ? "Complete" : order.status}
              </span>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  <th style={th}>สินค้า</th>
                  <th style={th}>ราคา</th>
                  <th style={th}>จำนวน</th>
                  <th style={th}>รวม</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.id}>
                    <td style={td}>{it.product_name}</td>
                    <td style={td}>฿{Number(it.unit_price).toLocaleString()}</td>
                    <td style={td}>{it.quantity}</td>
                    <td style={td}>฿{Number(it.subtotal).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, fontSize: 20, marginTop: 10 }}>
              <span>ราคารวมสุทธิ</span>
              <strong>฿{Number(order.total_amount).toLocaleString()}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const th = { textAlign: "left", padding: "10px 8px", borderBottom: "1px solid #eee" };
const td = { padding: "10px 8px", borderBottom: "1px solid #f2f2f2" };
