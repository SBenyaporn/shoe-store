// src/utils/cart.js


export const CART_KEY = 'cart_items_v1';

const FB =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop';


function normalizeItems(list) {
  const acc = new Map(); 

  for (const raw of Array.isArray(list) ? list : []) {
    if (!raw) continue;

    const id = String(raw.id ?? '').trim();
    if (!id) continue;

    const qty = Math.max(1, parseInt(raw.qty ?? 1, 10) || 1);
    const price = Math.max(0, Number(raw.price ?? 0) || 0);

    const base = {
      id,
      brand: String(raw.brand ?? '') || '',
      name: String(raw.name ?? '') || '',
      price,
      img: String(raw.img ?? '') || FB,
      qty,
      size: String(raw.size ?? '') || '',
    };

    if (!acc.has(id)) {
      acc.set(id, base);
    } else {
      const cur = acc.get(id);
      acc.set(id, {
        id,
        brand: cur.brand || base.brand,
        name: cur.name || base.name,
        price: Number(cur.price || base.price || 0),
        img: cur.img || base.img || FB,
        qty: Number(cur.qty || 0) + qty,
      });
    }
  }

  return [...acc.values()];
}


function readRaw() {

  try {
    const raw = localStorage.getItem(CART_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (Array.isArray(arr)) return arr;
  } catch {}

 
  const FALLBACK_KEYS = ['cart_items_v1_backup', 'cartItems', 'kaokai:cart', 'cart'];
  for (const k of FALLBACK_KEYS) {
    try {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      const v = JSON.parse(raw);

     
      if (Array.isArray(v)) return v;

      // กรณี object map { [id]: qty }
      if (v && typeof v === 'object') {
        const list = Object.entries(v).map(([id, qty]) => ({
          id: String(id),
          qty: Math.max(1, Number(qty || 1)),
        }));
        if (list.length) return list;
      }
    } catch {}
  }

  return [];
}


function write(items) {
  const normalized = normalizeItems(items);

  
  localStorage.setItem(CART_KEY, JSON.stringify(normalized));


  const map = Object.fromEntries(
    normalized.map((it) => [String(it.id), Number(it.qty || 1)])
  );
  localStorage.setItem('cart', JSON.stringify(map));

  return normalized;
}


export function getCart() {
  const raw = readRaw();
  const normalized = normalizeItems(raw);
 
  localStorage.setItem(CART_KEY, JSON.stringify(normalized));

  const map = Object.fromEntries(normalized.map(it => [String(it.id), Number(it.qty || 1)]));
  localStorage.setItem('cart', JSON.stringify(map));
  return normalized;
}


export function setCart(items) {
  return write(items ?? []);
}

export function addItem(item, qty = 1) {
  const sid = String(item?.id ?? '').trim();
  if (!sid) return getCart();

  const cur = getCart();
  const idx = cur.findIndex((x) => String(x.id) === sid);

  if (idx >= 0) {
      cur[idx] = {
        ...cur[idx],
        brand: cur[idx].brand || item.brand || '',
        name: cur[idx].name || item.name || '',
        price: Number(cur[idx].price || item.price || 0),
        img: cur[idx].img || item.img || FB,
        qty: Math.max(1, Number(cur[idx].qty || 1) + Number(qty || 1)),
        size: cur[idx].size || item.size || '',
      };
  } else {
    cur.push({
      id: sid,
      brand: item.brand || '',
      name: item.name || '',
      price: Math.max(0, Number(item.price || 0)),
      img: item.img || FB,
      qty: Math.max(1, Number(qty || 1)),
      size: item.size || '',
    });
  }

  return write(cur);
}


export function removeItem(id) {
  const sid = String(id);
  const next = getCart().filter((x) => String(x.id) !== sid);
  return write(next);
}

export function changeQty(id, delta) {
  const sid = String(id);
  const next = getCart().map((x) =>
    String(x.id) === sid
      ? { ...x, qty: Math.max(1, Number(x.qty || 1) + Number(delta || 0)) }
      : x
  );
  return write(next);
}


export function clearCart() {
  return write([]);
}


export function getCartCount() {
  return getCart().reduce((s, it) => s + Number(it.qty || 0), 0);
}


export function getCartTotal() {
  return getCart().reduce(
    (s, it) => s + Number(it.price || 0) * Number(it.qty || 0),
    0
  );
}
