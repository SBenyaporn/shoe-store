const KEY = 'favorites:productIds';

export function getFavoriteIds() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    // บังคับเป็น string ทั้งคู่ เพื่อลดปัญหา 1 กับ "1"
    return Array.from(new Set(arr.map(String)));
  } catch {
    return [];
  }
}

export function isFav(id) {
  return getFavoriteIds().includes(String(id));
}

export function toggleFav(id) {
  const ids = getFavoriteIds();
  const sid = String(id);
  const next = ids.includes(sid) ? ids.filter(x => x !== sid) : [...ids, sid];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearFavs() {
  localStorage.removeItem(KEY);
}
