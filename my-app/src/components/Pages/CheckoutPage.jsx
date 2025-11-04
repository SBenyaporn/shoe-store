// src/components/Pages/CheckoutPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { getCart } from "../../utils/cart";
import "./CheckoutPage.css";

const FB =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop";

const fmt = (n) =>
  Number(n || 0).toLocaleString("th-TH", { minimumFractionDigits: 0 });

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const [form, setForm] = useState({
    name: "",
    address: "",
    district: "",
    province: "",
    zipcode: "",
    phone: "",
  });

  
  useEffect(() => {
    const saved = localStorage.getItem("checkout_shipping");
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, []);

  
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(getCart()); // [{id,brand,name,price,img,qty}]
  }, []);

  
  const summary = useMemo(() => {
    const items = (cartItems || []).map((it) => {
      const qty = Math.max(1, Number(it.qty || 1));
      const price = Number(it.price || 0);
      return {
        ...it,
        qty,
        price,
        line: price * qty,
      };
    });
    const total = items.reduce((s, x) => s + x.line, 0);
    return { items, total };
  }, [cartItems]);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const saveShipping = (e) => {
    e.preventDefault();
    localStorage.setItem("checkout_shipping", JSON.stringify(form));
    alert("บันทึกที่อยู่สำหรับจัดส่งเรียบร้อยแล้ว ✅");
  };

  const handleGoPayment = async () => {
    // Validation
    if (!summary.items.length) {
      alert("ตะกร้าสินค้าว่าง");
      return;
    }

    if (!form.name || !form.address) {
      alert("กรุณากรอกชื่อ - นามสกุล และที่อยู่ก่อนดำเนินการชำระเงิน");
      return;
    }

    setIsSubmitting(true);

    try {
      
      const userId = Number(localStorage.getItem("user_id"));
      
      const items = summary.items.map((it) => {
        const pid = Number(it.id);
        const qty = Number(it.qty || 1);
        const price = Number(it.price || 0);
        return {
          product_id: Number.isInteger(pid) ? pid : null, 
          product_name: `${it.brand || ""} ${it.name || ""}`.trim(),
          unit_price: price,
          quantity: qty,
          subtotal: price * qty,
        };
      });

      const body = {
       
        user_id: Number.isInteger(userId) ? userId : null,
        shipping_name: form.name || null,
        address_line: form.address || null,
        district: form.district || null,
        province: form.province || null,
        zipcode: form.zipcode || null,
        phone: form.phone || null,
        items,
        total_amount: summary.total,
      };

      const data = await api("/api/orders", { method: "POST", body });

      const orderId = String(data?.orderId ?? data?.id ?? "");
      if (orderId) localStorage.setItem("current_order_id", orderId);

      navigate("/payment");
    } catch (err) {
      console.error("Checkout error:", err);
      const errorMessage = err?.data?.error || err?.message || "สร้างออเดอร์ไม่สำเร็จ";
      alert(`เกิดข้อผิดพลาด: ${errorMessage}\n\nกรุณาลองอีกครั้ง หรือติดต่อทีมสนับสนุน`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">
        {/* ฟอร์มจัดส่ง */}
        <div className="checkout-form">
          <h3>จัดส่งไปยัง</h3>
          <form onSubmit={saveShipping}>
            <input
              name="name"
              placeholder="ชื่อ - นามสกุล"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              name="address"
              placeholder="ที่อยู่"
              value={form.address}
              onChange={onChange}
              required
            />
            <input
              name="district"
              placeholder="อำเภอ"
              value={form.district}
              onChange={onChange}
            />
            <input
              name="province"
              placeholder="จังหวัด"
              value={form.province}
              onChange={onChange}
            />
            <input
              name="zipcode"
              placeholder="รหัสไปรษณีย์"
              value={form.zipcode}
              onChange={onChange}
            />
            <input
              name="phone"
              placeholder="เบอร์โทรศัพท์"
              value={form.phone}
              onChange={onChange}
            />
            <button type="submit" className="save-button">
              บันทึกการจัดส่ง
            </button>
          </form>
        </div>

        {/* สรุปรายการจากตะกร้าจริง */}
        <div className="checkout-summary">
          <h3>คำสั่งซื้อของคุณ</h3>

          {!summary.items.length ? (
            <div className="empty-cart">
              <p>ตะกร้าของคุณว่างเปล่า</p>
            </div>
          ) : (
            <>
              <ul className="order-items">
                {summary.items.map((it) => (
                  <li key={String(it.id)} className="order-item">
                    <img
                      src={it.img || FB}
                      onError={(e) => (e.currentTarget.src = FB)}
                      alt={it.name}
                    />
                    <div className="order-item-info">
                      <div className="order-item-name">
                        <span className="brand">{it.brand}</span>{" "}
                        <span className="name">{it.name}</span>
                      </div>
                      <div className="order-item-details">
                        <span>
                          ฿ {fmt(it.price)} × {it.qty}
                        </span>
                        {it.size && (
                          <span className="order-item-size">ไซส์: {it.size}</span>
                        )}
                      </div>
                    </div>
                    <div className="order-item-price">฿ {fmt(it.line)}</div>
                  </li>
                ))}
              </ul>

              <div className="summary-section">
                <div className="summary-line">
                  <span>ค่าจัดส่ง</span>
                  <span>ฟรี</span>
                </div>
                <div className="summary-line">
                  <span>ส่วนลด</span>
                  <span>฿0.00</span>
                </div>
                <div className="summary-line total">
                  <span>ยอดรวมสุทธิ</span>
                  <span>฿{fmt(summary.total)}.00</span>
                </div>
              </div>

              <button
                className="pay-button"
                onClick={handleGoPayment}
                disabled={!summary.items.length || isSubmitting}
              >
                {isSubmitting ? "กำลังดำเนินการ..." : "ดำเนินการชำระเงิน"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

