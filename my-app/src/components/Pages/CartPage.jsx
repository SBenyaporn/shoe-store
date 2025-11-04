// src/components/Pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  setCart,
  removeItem,
  clearCart,
} from "../../utils/cart";

const FB =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop";
const fmt = (n) =>
  Number(n || 0).toLocaleString("th-TH", { maximumFractionDigits: 2 });

export default function CartPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false); 

  
  useEffect(() => {
    const load = () => {
      const data = getCart();             
      setItems(data);
      setLoading(false);
      setHydrated(true);                 
    };

    load();

    const onVis = () => document.visibilityState === "visible" && load();
    const onStorage = (e) => {
      if (!e || !e.key) return;
      if (e.key === "cart_items_v1" || e.key === "cart") load();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("storage", onStorage);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  
  useEffect(() => {
    if (!hydrated) return;    
    setCart(items);
  }, [items, hydrated]);

  const inc = (id) =>
    setItems((list) =>
      list.map((it) =>
        String(it.id) === String(id) ? { ...it, qty: it.qty + 1 } : it
      )
    );

  const dec = (id) =>
    setItems((list) =>
      list.map((it) =>
        String(it.id) === String(id)
          ? { ...it, qty: Math.max(1, it.qty - 1) }
          : it
      )
    );

  const remove = (id) => {
    removeItem(id);
    setItems((cur) => cur.filter((x) => String(x.id) !== String(id)));
  };

  const clearAll = () => {
    clearCart();
    setItems([]);
  };

  const totalQty = items.reduce((s, it) => s + Number(it.qty || 0), 0);
  const total = items.reduce(
    (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
    0
  );

  const goCheckout = () => {
    if (!items.length) return;
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="container cart-layout">
        <section className="cart-left">
          <h2 className="cart-title">รายการสินค้า 0 รายการ</h2>
          <div className="cart-empty">กำลังโหลด…</div>
        </section>
      </div>
    );
  }

  return (
    <div className="container cart-layout">
      {/* ซ้าย: รายการสินค้า */}
      <section className="cart-left">
        <h2 className="cart-title">รายการสินค้า {totalQty} รายการ</h2>

        {items.length === 0 ? (
          <div className="cart-empty">
            ตะกร้าของคุณว่างเปล่า — <Link to="/shop">ไปเลือกสินค้า</Link>
          </div>
        ) : (
          <ul className="cart-lines">
            {items.map((it) => (
              <li key={it.id} className="c-row">
                <div className="c-thumb">
                  <img
                    src={it.img || FB}
                    alt={it.name}
                    onError={(e) => (e.currentTarget.src = FB)}
                  />
                </div>

                <div className="c-info">
                  <div className="c-name">
                    {it.brand} {it.name}
                  </div>
                  <div className="c-sub">
                    รองเท้าผู้หญิง/ผู้ชาย
                    {it.size && <span className="c-size"> • ไซส์: {it.size}</span>}
                  </div>

                  <button
                    className="c-remove"
                    onClick={() => remove(it.id)}
                    title="ลบรายการ"
                    aria-label="ลบรายการ"
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>

                <div className="c-price-section">
                  <div className="c-line">฿ {fmt(it.price * it.qty)}</div>
                  <div className="c-qty">
                    <button aria-label="decrease" onClick={() => dec(it.id)}>
                      -
                    </button>
                    <span>{it.qty}</span>
                    <button aria-label="increase" onClick={() => inc(it.id)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="cart-right">
        <div className="cart-summary">
          <h3>สรุป</h3>
          <div className="c-total">
            <span>ยอดรวมสุทธิ</span>
            <b>฿ {fmt(total)}</b>
          </div>
          <button
            className="btn c-primary"
            onClick={goCheckout}
            disabled={!items.length}
          >
            สั่งซื้อ
          </button>
          <Link to="/shop" className="btn c-outline">
            แก้ไขรายการ
          </Link>
          {items.length > 0 && (
            <button
              className="btn c-outline"
              style={{ marginTop: 8 }}
              onClick={clearAll}
            >
              ล้างตะกร้า
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
