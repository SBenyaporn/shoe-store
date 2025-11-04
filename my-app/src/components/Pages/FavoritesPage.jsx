import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../utils/cart"; // 

const FAV_KEYS = ["favorites", "favorites:productIds", "favoriteIds"];
const FAV_OBJECT_KEY = "favorites";
const FAV_IDS_KEY = "favorites:productIds";
const FB =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop";

const fmt = (n) =>
  Number(n || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 });

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({}); 

  const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

 
  useEffect(() => {
    const objList = readJSON(FAV_OBJECT_KEY, []);
    const ids = Array.from(
      new Set(
        FAV_KEYS.flatMap((k) => {
          const v = readJSON(k, []);
          return Array.isArray(v)
            ? v
                .map((x) => String(typeof x === "object" ? x?.id : x))
                .filter(Boolean)
            : [];
        })
      )
    );

    let list = Array.isArray(objList) ? objList : [];
    if (!list.length && ids.length) {
      list = ids.map((sid) => ({
        id: sid,
        brand: "",
        name: `สินค้า #${sid}`,
        price: 0,
        img: FB,
        soldOut: false,
      }));
    }

    const seen = new Set();
    list = list
      .filter(Boolean)
      .map((it) => ({
        id: String(it.id),
        brand: it.brand || "",
        name: it.name || "",
        price: Number(it.price || 0),
        img: it.img || FB,
        soldOut: Boolean(it.soldOut),
      }))
      .filter((it) => (!seen.has(it.id) ? seen.add(it.id) || true : false));

    localStorage.setItem(FAV_OBJECT_KEY, JSON.stringify(list));
    localStorage.setItem(
      FAV_IDS_KEY,
      JSON.stringify(list.map((o) => String(o.id)))
    );

    setFavorites(list);
    setLoading(false);
  }, []);

  const remove = (id) => {
    const sid = String(id);
    setFavorites((list) => {
      const next = list.filter((f) => String(f.id) !== sid);
      localStorage.setItem(FAV_OBJECT_KEY, JSON.stringify(next));
      localStorage.setItem(
        FAV_IDS_KEY,
        JSON.stringify(next.map((o) => String(o.id)))
      );
      return next;
    });
  };

  if (loading) {
    return (
      <div className="container">
        <h2 className="section-title" style={{ textAlign: "left" }}>
          รายการโปรด
        </h2>
        <div className="cart-empty">กำลังโหลด…</div>
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="container">
        <h2 className="section-title" style={{ textAlign: "left" }}>
          รายการโปรด
        </h2>
        <div className="cart-empty">
          ยังไม่มีสินค้าในรายการโปรด —{" "}
          <Link to="/shop">ไปเลือกสินค้าที่หน้า Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title" style={{ textAlign: "left" }}>
        รายการโปรด
      </h2>

      <section className="fav-grid">
        {favorites.map((it) => (
          <article key={it.id} className="fav-card">
            <div className={`fav-thumb ${it.soldOut ? "is-soldout" : ""}`}>
              <img
                src={it.img || FB}
                alt={it.name}
                onError={(e) => (e.currentTarget.src = FB)}
              />
              {it.soldOut && <span className="fav-badge">sold out</span>}
            </div>

            <div className="fav-body">
              <div className="fav-row">
                <h3 className="fav-name">
                  {it.brand} <span className="muted">{it.name}</span>
                </h3>
                <div className="fav-price">฿ {fmt(it.price)}</div>
              </div>

              <p className="fav-sub muted">รองเท้าผู้หญิง/ผู้ชาย</p>

              <div className="fav-size-selector">
                <label htmlFor={`size-${it.id}`}>
                  เลือกไซส์
                </label>
                <select
                  id={`size-${it.id}`}
                  value={selectedSizes[it.id] || ""}
                  onChange={(e) => {
                    setSelectedSizes((prev) => ({
                      ...prev,
                      [it.id]: e.target.value,
                    }));
                  }}
                  disabled={it.soldOut}
                >
                  <option value="">เลือกไซส์</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fav-actions">
                <button
                  className="icon-btn"
                  title="ลบออกจากรายการโปรด"
                  onClick={() => remove(it.id)}
                >
                  🗑
                </button>

                {/* เขียนลงตะกร้าให้เสร็จก่อน แล้วค่อยไป /cart */}
                <button
                  className="fav-add-cart-btn"
                  title="เพิ่มลงตะกร้า"
                  onClick={() => {
                    if (it.soldOut) return;
                    if (!selectedSizes[it.id]) {
                      alert("กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้า");
                      return;
                    }
                    addItem(
                      {
                        id: it.id,
                        brand: it.brand,
                        name: it.name,
                        price: it.price,
                        img: it.img,
                        size: selectedSizes[it.id],
                      },
                      1
                    );
                    navigate("/cart");
                  }}
                  disabled={it.soldOut || !selectedSizes[it.id]}
                >
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
