// backend/src/routes/orders.js
import { Router } from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/database.js';

export const ordersRouter = Router();
const pool = mysql.createPool(dbConfig);


function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(Boolean).map((it) => {
    const rawPid = it?.product_id;
    const pidNum = Number(rawPid);
    const product_id = Number.isInteger(pidNum) ? pidNum : null;

    const qty  = Math.max(1, parseInt(it?.quantity ?? it?.qty ?? 1, 10) || 1);
    const unit = Number(it?.unit_price ?? it?.price ?? 0) || 0;

    return {
      product_id,
      product_name: String(it?.product_name ?? it?.name ?? ''),
      unit_price: unit,
      quantity: qty,
      subtotal: unit * qty,
    };
  });
}

async function coerceUserIdOrNull(conn, user_id) {
  const n = Number(user_id);
  if (!Number.isInteger(n)) return null;
  const [rows] = await conn.execute('SELECT id FROM users WHERE id = ? LIMIT 1', [n]);
  return rows.length ? n : null;
}


async function coerceProductIdOrNull(conn, product_id) {
  if (!Number.isInteger(product_id)) return null;
  const [rows] = await conn.execute('SELECT id FROM products WHERE id = ? LIMIT 1', [product_id]);
  return rows.length ? product_id : null;
}


async function tableHasColumns(conn, table, cols) {
  if (!cols?.length) return false;
  const placeholders = cols.map(() => '?').join(',');
  const [rows] = await conn.query(
    `
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = ?
      AND COLUMN_NAME IN (${placeholders})
    `,
    [table, ...cols]
  );
  const found = new Set(rows.map(r => r.COLUMN_NAME));
  return cols.every(c => found.has(c));
}


ordersRouter.post('/orders', async (req, res) => {
  const {
    user_id,
    shipping_name,
    address_line,
    district,
    province,
    zipcode,
    phone,
    items: rawItems,
    total_amount: totalFromBody,
  } = req.body ?? {};

  const items = sanitizeItems(rawItems);
  if (!items.length) {
    return res.status(400).json({ error: 'No items', message: 'ต้องมีอย่างน้อย 1 รายการ' });
  }

  let total_amount =
    Number(totalFromBody ?? 0) ||
    items.reduce((s, x) => s + (Number(x.subtotal) || 0), 0);
  if (!Number.isFinite(total_amount)) total_amount = 0;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await conn.beginTransaction();

    const userId = await coerceUserIdOrNull(conn, user_id);

    
    const [orderResult] = await conn.execute(
      `
      INSERT INTO orders
        (user_id, status, total_amount, shipping_name, address_line, district, province, zipcode, phone, created_at)
      VALUES
        (?,       ?,      ?,            ?,             ?,            ?,        ?,        ?,       ?,    NOW())
      `,
      [
        userId,
        'PENDING',
        total_amount,
        shipping_name ?? null,
        address_line ?? null,
        district ?? null,
        province ?? null,
        zipcode ?? null,
        phone ?? null,
      ]
    );
    const orderId = orderResult.insertId;

    
    for (const raw of items) {
      const safePid = await coerceProductIdOrNull(conn, raw.product_id);
      try {
        await conn.execute(
          `
          INSERT INTO order_items
            (order_id, product_id, product_name, unit_price, quantity, subtotal)
          VALUES
            (?,        ?,          ?,            ?,          ?,        ?)
          `,
          [
            orderId,
            safePid,
            raw.product_name,
            raw.unit_price,
            raw.quantity,
            raw.subtotal,
          ]
        );
      } catch (e) {
        if (e?.code !== 'ER_BAD_FIELD_ERROR') throw e;
        await conn.execute(
          `
          INSERT INTO order_items
            (order_id, product_id, name, price, qty)
          VALUES
            (?,        ?,          ?,    ?,     ?)
          `,
          [
            orderId,
            safePid,
            raw.product_name,
            raw.unit_price,
            raw.quantity,
          ]
        );
      }
    }

    await conn.commit();
    return res.json({ orderId, status: 'PENDING', total_amount });
  } catch (err) {
    try { if (conn) await conn.rollback(); } catch {}
    console.error(err);
    return res.status(500).json({
      error: 'Failed to create order',
      message: err?.message || String(err),
    });
  } finally {
    try { if (conn) conn.release(); } catch {}
  }
});


ordersRouter.get('/orders/me/list', async (req, res) => {
  let userId = Number(req.query.userId);
  if (!Number.isInteger(userId) || userId <= 0) userId = null;

  let conn;
  try {
    conn = await pool.getConnection();

    const where = userId ? 'WHERE user_id = ?' : '';
    const params = userId ? [userId] : [];

    const [orders] = await conn.query(
      `
      SELECT id, user_id, status, total_amount,
             shipping_name, address_line, district, province, zipcode, phone,
             created_at
      FROM orders
      ${where}
      ORDER BY created_at DESC
      LIMIT 50
      `,
      params
    );

    if (!orders.length) return res.json({ orders: [], items: [] });

    const orderIds = orders.map(o => o.id);
    const placeholders = orderIds.map(() => '?').join(',');
    if (!placeholders) return res.json({ orders, items: [] });

    
    const hasLegacy = await tableHasColumns(conn, 'order_items', ['name', 'price', 'qty']);
    let itemsSql, itemsParams;

    if (hasLegacy) {
      
      itemsSql = `
        SELECT
          id,
          order_id,
          product_id,
          COALESCE(product_name, name)  AS product_name,
          COALESCE(unit_price,  price)  AS unit_price,
          COALESCE(quantity,    qty)    AS quantity,
          COALESCE(subtotal, COALESCE(unit_price, price) * COALESCE(quantity, qty)) AS subtotal
        FROM order_items
        WHERE order_id IN (${placeholders})
        ORDER BY id ASC
      `;
      itemsParams = orderIds;
    } else {
      
      itemsSql = `
        SELECT
          id,
          order_id,
          product_id,
          product_name,
          unit_price,
          quantity,
          COALESCE(subtotal, unit_price * quantity) AS subtotal
        FROM order_items
        WHERE order_id IN (${placeholders})
        ORDER BY id ASC
      `;
      itemsParams = orderIds;
    }

    const [items] = await conn.query(itemsSql, itemsParams);

    return res.json({ orders, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load orders', message: err?.message || String(err) });
  } finally {
    try { if (conn) conn.release(); } catch {}
  }
});
