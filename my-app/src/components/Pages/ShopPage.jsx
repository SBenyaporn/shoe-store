// src/pages/ShopPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const FB =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop";

const PRODUCTS = [
  { id: "puma-og",        brand: "PUMA",   name: "Speedcat OG Unisex",             price: 3800, img: "/assets/Shop/6.2.webp", soldOut: false },
  { id: "puma-palermo-1", brand: "PUMA",   name: "Palermo Special Unisex",         price: 3500, img: "/assets/Shop/2.5.webp", soldOut: false },
  { id: "puma-palermo-2", brand: "PUMA",   name: "Palermo หนังกลับรุ่นพิเศษ",      price: 3500, img: "/assets/Shop/2.4.webp", soldOut: true  },
  { id: "nike-court",     brand: "NIKE",   name: "Court Vision Low Next Nature",   price: 3200, img: "/assets/Shop/6.1.webp", soldOut: true  },
  { id: "PUMA Speedcat OG ",   brand: "PUMA", name: "Speedcat OG Unisex",                   price: 3800, img: "/assets/Shop/2.2.webp", soldOut: false },
  { id: "nike-init",      brand: "NIKE",   name: "Initiator รองเท้าวิ่ง",           price: 3200, img: "/assets/Shop/2.6.webp", soldOut: true  },
  { id: "NIKE Zoom Fly 6", brand: "NIKE", name: "NIKE Zoom Fly 6",               price: 6300, img: "/assets/Shop/6.4.webp", soldOut: false },
  { id: "ADIDAS VL Court 3.0",    brand: "ADIDAS",   name: "ADIDAS VL Court 3.0",    price: 2200, img: "/assets/Shop/6.5.webp", soldOut: false },
  { id: "Luka 3 PF Blurred Vision",    brand: "NIKE",   name: "Luka 3 PF Blurred Vision",     price: 12000, img: "/assets/Shop/6.6.webp", soldOut: true  },
  { id: "Nike G.T. Jump 2 EP",         brand: "NIKE",     name: "Nike G.T. Jump 2 EP",     price: 18000, img: "/assets/Shop/6.7.avif", soldOut: false },
  { id: "Air Jordan 1 Low Method of Make", brand: "NIKE",  name: "Air Jordan 1 Low Method of Make",  price: 8700, img: "/assets/Shop/6.8.png", soldOut: false },
  { id: "Nike Juniper Trail 3 Phantom",  brand: "Nike",   name: "Nike Juniper Trail 3",      price: 3200, img: "/assets/Shop/6.3.avif", soldOut: true  },
];

const FAV_KEY = "favorites";


export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [cart, setCart]   = useState({});        
  const [favs, setFavs]   = useState([]);           
  const navigate = useNavigate();

  
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      setFavs(Array.isArray(saved) ? saved : []);
    } catch {
      setFavs([]);
    }
  }, []);

  const favIdSet = useMemo(() => new Set(favs.map(f => f.id)), [favs]);
  const saveFavs = (list) => {
    setFavs(list);
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
  };

  
  const addFavoriteAndGo = (product) => {
    if (!favIdSet.has(product.id)) {
      const toSave = [
        ...favs,
        { id: product.id, brand: product.brand, name: product.name, price: product.price, img: product.img, soldOut: product.soldOut }
      ];
      saveFavs(toSave);
    }
    navigate("/favorites");
  };


  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }, [query]);

  const addToCart = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const inc       = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec       = (id) => setCart(c => {
    const n = { ...c };
    if (!n[id]) return n;
    if (n[id] <= 1) delete n[id]; else n[id] -= 1;
    return n;
  });
  const remove    = (id) => setCart(c => { const n = { ...c }; delete n[id]; return n; });

  const items = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find(p => p.id === id), qty }));
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const fmt = (n) => n.toLocaleString("th-TH", { maximumFractionDigits: 0 });

  return (
    <div className="shop">
      <div className="container shop-grid">
       
        <div className="shop-main">
          <div className="shop-toolbar">
            <button className="icon-btn" aria-label="menu">☰</button>
            <div className="search">
              <span>🔎</span>
              <input
                placeholder="ค้นหาสินค้า"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <h2 className="shop-title">สินค้าทั้งหมด</h2>

          <div className="products-grid">
            {list.map((p) => {
              const inFav = favIdSet.has(p.id);
              return (
                <article key={p.id} className="p-card">
                  <Link to={`/product/${p.id}`} className="p-thumb-link">
                    <div className="p-thumb">
                      <img
                        src={p.img}
                        alt={p.name}
                        onError={(e) => { e.currentTarget.src = FB; }}
                      />
                      {p.soldOut && <span className="badge-soldout">sold out</span>}
                    </div>
                  </Link>

                  <div className="p-body">
                    <Link to={`/product/${p.id}`} className="p-name-link">
                      <h3 className="p-name">{p.brand} <span className="muted">{p.name}</span></h3>
                    </Link>
                    <div className="p-price">฿ {fmt(p.price)}</div>

                    <div className="p-actions">
                      <button
                        className="btn-outline"
                        type="button"
                        disabled={inFav}
                        onClick={() => addFavoriteAndGo(p)}
                        title={inFav ? "อยู่ในรายการโปรดแล้ว" : "เพิ่มไปยังรายการโปรด"}
                      >
                        {inFav ? "❤️อยู่รายการโปรด" : "🤍 รายการโปรด"}
                      </button>

                      <button
                        className="btn"
                        type="button"
                        disabled={p.soldOut}
                        onClick={() => addToCart(p.id)}
                      >
                        {p.soldOut ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="shop-cart">
          <div className="cart-card">
            <h3>ตะกร้าสินค้า</h3>

            {items.length === 0 ? (
              <p className="muted" style={{ textAlign: "center" }}>
                ตะกร้าของคุณว่างเปล่า<br />กรุณาเลือกสินค้าเพื่อดำเนินการชำระเงิน
              </p>
            ) : (
              <>
                <ul className="cart-list">
                  {items.map((it) => (
                    <li key={it.id} className="cart-row">
                      <img src={it.img} alt="" onError={(e)=>{e.currentTarget.src=FB}}/>
                      <div className="cart-info">
                        <div className="cart-name">{it.brand} {it.name}</div>
                        <div className="cart-sub">
                          ฿ {fmt(it.price)} × {it.qty} = <b>฿ {fmt(it.price * it.qty)}</b>
                        </div>
                        <div className="cart-ctrls">
                          <button className="icon-btn" onClick={() => dec(it.id)}>-</button>
                          <span>{it.qty}</span>
                          <button className="icon-btn" onClick={() => inc(it.id)}>+</button>
                          <button className="link danger" onClick={() => remove(it.id)}>ลบ</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-total">รวมทั้งสิ้น <b>฿ {fmt(total)}</b></div>
                <button 
                  className="btn btn-full" 
                  onClick={() => {
                    if (items.length > 0) {
                      navigate(`/product/${items[0].id}`);
                    }
                  }}
                >
                  ดำเนินการชำระเงิน
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
