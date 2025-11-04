// src/api.js
// ถ้าใช้ Vite proxy ให้ปล่อยค่าว่าง ('') แล้วเรียก path ที่ขึ้นต้นด้วย "/api"
// ถ้าจะยิงตรงไป backend ให้ตั้ง .env.local:  VITE_API_BASE="http://localhost:5050"
const API_BASE = import.meta.env.VITE_API_BASE ?? "";

/** แปลง {a:1,b:'x y'} => '?a=1&b=x%20y' */
function toQuery(params) {
  if (!params || typeof params !== "object") return "";
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    usp.append(k, String(v));
  }
  const s = usp.toString();
  return s ? `?${s}` : "";
}

/**
 * api(path, options)
 * - path: '/api/orders' หรือ 'http://localhost:5050/api/orders'
 * - options: { method, params, body, headers, timeout(ms) }
 */
export async function api(path, options = {}) {
  const {
    method = "GET",
    params,
    body,
    headers = {},
    timeout = 20000,
    ...rest
  } = options;

  const isAbsolute = typeof path === "string" && /^https?:\/\//i.test(path);
  const url = (isAbsolute ? path : API_BASE + path) + toQuery(params);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);

  const init = {
    method,
    headers: { ...headers },
    signal: ctrl.signal,
    credentials: rest.credentials ?? "omit",
    ...rest,
  };

  // set body
  if (body !== undefined) {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const isBlob = typeof Blob !== "undefined" && body instanceof Blob;
    if (isFormData || isBlob || typeof body === "string") {
      init.body = body;
    } else if (typeof body === "object") {
      init.headers["Content-Type"] ||= "application/json";
      init.body = JSON.stringify(body);
    } else {
      init.body = body;
    }
  }

  try {
    const res = await fetch(url, init);
    clearTimeout(timer);

    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      const msg = (data && typeof data === "object" && (data.error || data.message)) || text || `HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (err) {
    clearTimeout(timer);
    if (err?.name === "AbortError") throw new Error("Request timeout");
    throw err;
  }
}

export const API = API_BASE;
