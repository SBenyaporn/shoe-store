import React, { useMemo, useState } from "react";
import "./stock.css";

const seed = [
  { id: "SKU-001", name: "Adidas Samba OG White/Black", brand: "Adidas", category: "Sneaker", price: 3800, stock: 28, min: 10 },
  { id: "SKU-002", name: "Nike Air Max DN8 Copper",     brand: "Nike",   category: "Running", price: 6100, stock: 7,  min: 12 },
  { id: "SKU-003", name: "Adidas Handball Spezial Beige",brand: "Adidas", category: "Vintage", price: 4200, stock: 15, min: 10 },
  { id: "SKU-004", name: "Converse Chuck 70 Hi",         brand: "Converse", category: "Casual", price: 2900, stock: 3,  min: 8  },
  { id: "SKU-005", name: "New Balance 2002R Grey",       brand: "New Balance", category: "Lifestyle", price: 5300, stock: 19, min: 10 },
  { id: "SKU-006", name: "On Cloudrunner",               brand: "On",     category: "Running",  price: 5900, stock: 9,  min: 10 },
];

export default function Stock() {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");

  // ----- Add Item Modal State -----
  const [showAdd, setShowAdd] = useState(false);
  const nextSku = useMemo(() => `SKU-${String(rows.length + 1).padStart(3, "0")}`, [rows]);
  const [addForm, setAddForm] = useState({
    id: "",
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
  });
  const [addError, setAddError] = useState("");

  const brands = useMemo(() => ["all", ...Array.from(new Set(rows.map(r => r.brand)))], [rows]);
  const categories = useMemo(() => ["all", ...Array.from(new Set(rows.map(r => r.category)))], [rows]);

  const view = useMemo(() => {
    let v = [...rows];
    if (q.trim()) {
      const s = q.toLowerCase();
      v = v.filter(r => (r.name + r.id + r.brand + r.category).toLowerCase().includes(s));
    }
    if (brand !== "all") v = v.filter(r => r.brand === brand);
    if (category !== "all") v = v.filter(r => r.category === category);
    v.sort((a, b) => {
      if (sort === "stock") return b.stock - a.stock;
      if (sort === "price") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return v;
  }, [rows, q, brand, category, sort]);

  const adjust = (id, delta) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, stock: Math.max(0, r.stock + delta) } : r)));
  };

  const setQty = (id, qty) => {
    const n = Number(qty);
    if (Number.isNaN(n) || n < 0) return;
    setRows(prev => prev.map(r => (r.id === id ? { ...r, stock: n } : r)));
  };

  // เปิดฟอร์มเพิ่มสินค้า
  const openAddModal = () => {
    setAddForm({
      id: nextSku,       // ให้ค่าเริ่มเป็นรหัสถัดไป แต่แก้ไขได้
      name: "",
      brand: brands.find(b => b !== "all") || "",
      category: categories.find(c => c !== "all") || "",
      price: "",
      stock: "",
    });
    setAddError("");
    setShowAdd(true);
  };

  // บันทึกสินค้าใหม่
  const saveAdd = () => {
    const id = (addForm.id || "").trim();
    const name = (addForm.name || "").trim();
    const brand = (addForm.brand || "").trim();
    const category = (addForm.category || "").trim();
    const price = Number(addForm.price);
    const stock = Number(addForm.stock);

    if (!id || !name || !brand || !category) {
      return setAddError("กรอก รหัส/ชื่อ/แบรนด์/หมวด ให้ครบ");
    }
    if (rows.some(r => r.id.toLowerCase() === id.toLowerCase())) {
      return setAddError("มีรหัสสินค้านี้อยู่แล้ว");
    }
    if (!Number.isFinite(price) || price < 0) {
      return setAddError("ราคาต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป");
    }
    if (!Number.isInteger(stock) || stock < 0) {
      return setAddError("คงเหลือต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป");
    }

    const newItem = {
      id,
      name,
      brand,
      category,
      price,
      stock,
      min: 5, // ค่าขั้นต่ำเริ่มต้น (ปรับในอนาคตได้)
    };

    setRows(prev => [newItem, ...prev]);
    setShowAdd(false);
  };

  const totalSku = view.length;
  const totalQty = view.reduce((s, r) => s + r.stock, 0);
  const lowCount = view.filter(r => r.stock <= r.min).length;

  // ป้องกัน scroll พื้นหลังตอนเปิด modal (ถ้าอยากได้)
  React.useEffect(() => {
    if (showAdd) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [showAdd]);

  return (
    <div className="stock">
      <div className="stock-top">
        <div>
          <h2>คลังสินค้า</h2>
          <p>จัดการสินค้าในสต็อก</p>
        </div>
        <div className="actions">
          <button className="btn ghost" onClick={openAddModal}>+ เพิ่มสินค้า</button>
          <button className="btn primary" onClick={() => alert("ส่งออก CSV (ตัวอย่าง)")}>ส่งออก</button>
        </div>
      </div>

      {/* KPI */}
      <div className="stock-kpis">
        <div className="kpi">
          <div className="kpi-title">รายการสินค้า</div>
          <div className="kpi-val">{totalSku}</div>
        </div>
        <div className="kpi">
          <div className="kpi-title">จำนวนคงเหลือรวม</div>
          <div className="kpi-val">{totalQty}</div>
        </div>
        <div className="kpi warn">
          <div className="kpi-title">ใกล้หมด/ต่ำกว่าขั้นต่ำ</div>
          <div className="kpi-val">{lowCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="toolbar">
        <input
          className="input"
          placeholder="ค้นหา: ชื่อ/แบรนด์/หมวด/รหัส..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select className="input" value={brand} onChange={e => setBrand(e.target.value)}>
          {brands.map(b => <option key={b} value={b}>{b === "all" ? "ทุกแบรนด์" : b}</option>)}
        </select>
        <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c === "all" ? "ทุกหมวด" : c}</option>)}
        </select>
        <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="name">เรียงตามชื่อ</option>
          <option value="stock">เรียงตามคงเหลือ</option>
          <option value="price">เรียงตามราคา</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap card">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{width: 110}}>รหัส</th>
              <th>ชื่อสินค้า</th>
              <th style={{width: 120}}>แบรนด์</th>
              <th style={{width: 130}}>หมวด</th>
              <th style={{width: 110}} className="ta-right">ราคา</th>
              <th style={{width:160}} className="ta-right">คงเหลือ</th>
            </tr>
          </thead>
          <tbody>
            {view.map(r => {
              const low = r.stock <= r.min;
              return (
                <tr key={r.id} className={low ? "low" : ""}>
                  <td><code className="sku">{r.id}</code></td>
                  <td>
                    <div className="name">{r.name}</div>
                    <div className="sub">{r.brand} • {r.category}</div>
                  </td>
                  <td>{r.brand}</td>
                  <td>{r.category}</td>
                  <td className="ta-right">{r.price.toLocaleString()} ฿</td>
                  <td className="ta-right">
                    <input
                      className="qty"
                      type="number"
                      min="0"
                      value={r.stock}
                      onChange={e => setQty(r.id, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
            {view.length === 0 && (
              <tr><td colSpan="6" className="empty">ไม่พบรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Add Item Modal ===== */}
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>เพิ่มสินค้าใหม่</h3>
            </div>

            <div className="modal-body">
              {addError && <div className="alert warn" style={{marginBottom:12}}>{addError}</div>}

              <div className="grid2">
                <label className="fcol">
                  <span className="lbl">รหัส</span>
                  <input
                    className="input"
                    value={addForm.id}
                    onChange={e => setAddForm(f => ({...f, id: e.target.value}))}
                    placeholder="เช่น SKU-007"
                  />
                </label>

                <label className="fcol">
                  <span className="lbl">ชื่อสินค้า</span>
                  <input
                    className="input"
                    value={addForm.name}
                    onChange={e => setAddForm(f => ({...f, name: e.target.value}))}
                    placeholder="เช่น Adidas Samba OG White/Black"
                    onKeyDown={e => e.key === "Enter" && saveAdd()}
                  />
                </label>

                <label className="fcol">
                  <span className="lbl">แบรนด์</span>
                  <input
                    className="input"
                    list="brand-list"
                    value={addForm.brand}
                    onChange={e => setAddForm(f => ({...f, brand: e.target.value}))}
                    placeholder="เช่น Adidas"
                    onKeyDown={e => e.key === "Enter" && saveAdd()}
                  />
                  <datalist id="brand-list">
                    {brands.filter(b=>b!=="all").map(b => <option key={b} value={b} />)}
                  </datalist>
                </label>

                <label className="fcol">
                  <span className="lbl">หมวด</span>
                  <input
                    className="input"
                    list="cat-list"
                    value={addForm.category}
                    onChange={e => setAddForm(f => ({...f, category: e.target.value}))}
                    placeholder="เช่น Sneaker"
                    onKeyDown={e => e.key === "Enter" && saveAdd()}
                  />
                  <datalist id="cat-list">
                    {categories.filter(c=>c!=="all").map(c => <option key={c} value={c} />)}
                  </datalist>
                </label>

                <label className="fcol">
                  <span className="lbl">ราคา (฿)</span>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={addForm.price}
                    onChange={e => setAddForm(f => ({...f, price: e.target.value}))}
                    placeholder="เช่น 4290"
                    onKeyDown={e => e.key === "Enter" && saveAdd()}
                  />
                </label>

                <label className="fcol">
                  <span className="lbl">คงเหลือ</span>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    value={addForm.stock}
                    onChange={e => setAddForm(f => ({...f, stock: e.target.value}))}
                    placeholder="เช่น 12"
                    onKeyDown={e => e.key === "Enter" && saveAdd()}
                  />
                </label>
              </div>
            </div>

            <div className="modal-foot">
              <button className="btn ghost" onClick={() => setShowAdd(false)}>ยกเลิก</button>
              <button className="btn primary" onClick={saveAdd}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
