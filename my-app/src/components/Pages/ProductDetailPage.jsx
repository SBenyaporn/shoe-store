// src/components/Pages/ProductDetailPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addItem } from "../../utils/cart";
import { isFav, toggleFav } from "../../utils/favorites";
import "./ProductDetailPage.css";

const FB =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop";

const PRODUCTS = [
  { id: "puma-og",        brand: "PUMA",   name: "Speedcat OG Unisex",             price: 3800, img: "/assets/Shop/6.2.webp", soldOut: false },
  { id: "puma-palermo-1", brand: "PUMA",   name: "Palermo Special Unisex",         price: 3500, img: "/assets/Shop/2.5.webp", soldOut: false },
  { id: "puma-palermo-2", brand: "PUMA",   name: "Palermo หนังกลับรุ่นพิเศษ",      price: 3500, img: "/assets/Shop/2.4.webp", soldOut: true  },
  { id: "nike-court",     brand: "NIKE",   name: "Court Vision Low Next Nature",   price: 3200, img: "/assets/Shop/6.1.webp", soldOut: true  },
  { id: "PUMA Speedcat OG ",   brand: "PUMA", name: "Speedcat OG Unisex",           price: 3800, img: "/assets/Shop/2.2.webp", soldOut: false },
  { id: "nike-init",      brand: "NIKE",   name: "Initiator รองเท้าวิ่ง",           price: 3200, img: "/assets/Shop/2.6.webp", soldOut: true  },
  { id: "NIKE Zoom Fly 6", brand: "NIKE",  name: "NIKE Zoom Fly 6",                 price: 6300, img: "/assets/Shop/6.4.webp", soldOut: false },
  { id: "ADIDAS VL Court 3.0", brand: "ADIDAS", name: "ADIDAS VL Court 3.0",       price: 2200, img: "/assets/Shop/6.5.webp", soldOut: false },
  { id: "Luka 3 PF Blurred Vision", brand: "NIKE", name: "Luka 3 PF Blurred Vision", price: 12000, img: "/assets/Shop/6.6.webp", soldOut: true  },
  { id: "Nike G.T. Jump 2 EP",   brand: "NIKE", name: "Nike G.T. Jump 2 EP",        price: 18000, img: "/assets/Shop/6.7.avif", soldOut: false },
  { id: "Air Jordan 1 Low Method of Make", brand: "NIKE", name: "Air Jordan 1 Low Method of Make", price: 8700, img: "/assets/Shop/6.8.png", soldOut: false },
  { id: "Nike Juniper Trail 3 Phantom",  brand: "Nike", name: "Nike Juniper Trail 3", price: 3200, img: "/assets/Shop/6.3.avif", soldOut: true  },
];

const fmt = (n) => n.toLocaleString("th-TH", { maximumFractionDigits: 0 });


const VIRTUAL_ANGLES = [-14, -7, 0, 7, 14];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getProductImages = (prod) => {
    if (!prod) return [];
    if (Array.isArray(prod.images) && prod.images.length > 0) return prod.images; 
    return prod.img ? [prod.img] : [];
  };

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === id);
    setProduct(found || null);
    if (found) {
      setIsFavorite(isFav(found.id));
      setSelectedIndex(0);
      setSelectedSize("");
  
      getProductImages(found).forEach((src) => {
        const im = new Image();
        im.src = src;
      });
    }
  }, [id]);

  const handleOrder = () => {
    if (!product || product.soldOut || !selectedSize) return;
    addItem({ ...product, size: selectedSize }, 1);
    navigate("/cart");
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    const newFavs = toggleFav(product.id);
    setIsFavorite(newFavs.includes(String(product.id)));
  };

  const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];


  const { thumbs, useVirtual } = useMemo(() => {
    const imgs = getProductImages(product);
    if (imgs.length <= 1) {
      const base = imgs[0] || FB;
      return { useVirtual: true, thumbs: VIRTUAL_ANGLES.map((deg) => ({ src: base, angle: deg })) };
    }
    return { useVirtual: false, thumbs: imgs.map((src) => ({ src, angle: 0 })) };
  }, [product]);

  const current = thumbs[selectedIndex] || { src: FB, angle: 0 };

  if (!product) {
    return (
      <div className="container product-detail-container">
        <div className="product-not-found">
          <h2>ไม่พบสินค้า</h2>
          <p>สินค้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ</p>
          <Link to="/shop" className="btn btn-primary">กลับไปที่ร้านค้า</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page" key={id}>
      <div className="container product-detail-container">
        <button className="back-button" onClick={() => navigate(-1)} aria-label="กลับ">
          ← กลับ
        </button>

        <div className="product-detail-grid">
          {/*  */}
          <div className="product-image-section">
            <div className="product-image-gallery">
              <div className="product-main-image">
                <img
                  key={`${selectedIndex}-${id}`}
                  src={current.src}
                  alt={product.name}
                  className={`main-image-fade ${useVirtual ? "main-tilt" : ""}`}
                  style={useVirtual ? { ["--tilt"]: `${current.angle}deg` } : undefined}
                  onError={(e) => { e.currentTarget.src = FB; }}
                />
                {product.soldOut && <span className="badge-soldout-large">Sold Out</span>}

                {/*  */}
                <button
                  className="nav left"
                  onClick={() => setSelectedIndex((i) => Math.max(0, i - 1))}
                  aria-label="ก่อนหน้า"
                >‹</button>
                <button
                  className="nav right"
                  onClick={() => setSelectedIndex((i) => Math.min(thumbs.length - 1, i + 1))}
                  aria-label="ถัดไป"
                >›</button>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="product-info-section">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-category">รองเท้าผู้หญิง</div>
            <div className="product-price">฿{fmt(product.price)}</div>

            <div className="product-size-selector">
              <label htmlFor="size-select">เลือกไซส์</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-dropdown"
              >
                <option value="">เลือกไซส์</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="product-description">
              <h3>รายละเอียดสินค้า</h3>
              <p>
                รองเท้าคลาสิกของ {product.brand} ซึ่งได้รับแรงบันดาลใจจากความเร็วของสนามแข่งรถ:
                รองเท้าลำลองผู้ใหญ่ {product.name} โดดเด่นด้วยรูปทรงสไตล์รองเท้าแข่งรถและเส้นสายสุด
                โฉบเฉี่ยวที่ดูว่องไวและกล้าหาญ นำกีฬามอเตอร์สปอร์ตมาสู่ท้องถนนและเป็นผู้นำเทรนด์ด้วย
                รูปลักษณ์ใหม่ของรองเท้าที่เป็นเอกลักษณ์นี้
              </p>
            </div>

            <div className="product-actions">
              <button
                className={`btn-favorite ${isFavorite ? "active" : ""}`}
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มไปยังรายการโปรด"}
              >
                {isFavorite ? "❤️ อยู่ในรายการโปรด" : "🤍 เพิ่มไปยังรายการโปรด"}
              </button>

              <button
                className="btn-order"
                onClick={handleOrder}
                disabled={product.soldOut || !selectedSize}
              >
                {product.soldOut ? "สินค้าหมด" : "สั่งซื้อสินค้านี้"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
