import { Router } from "express";
import { pool } from "../db.js";

const router = Router();


router.post("/checkout", async (req, res) => {
  const { orderId, method } = req.body || {};
  if (!orderId || !method) return res.status(400).json({ error: "ข้อมูลไม่ครบ" });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[order]] = await conn.query(`SELECT * FROM orders WHERE id=?`, [orderId]);
    if (!order) {
      await conn.rollback();
      return res.status(404).json({ error: "ไม่พบออเดอร์" });
    }

    
    const [payRes] = await conn.query(
      `INSERT INTO payments (order_id, method, status, amount, provider_charge_id)
       VALUES (?,?,?,?,?)`,
      [orderId, method, "SUCCEEDED", order.total_amount, null]
    );

    await conn.query(`UPDATE orders SET status='PAID' WHERE id=?`, [orderId]);

    await conn.commit();
    res.json({ paymentId: payRes.insertId, paid: true });
  } catch (e) {
    await conn.rollback();
    console.error("checkout error:", e);
    res.status(500).json({ error: "ชำระเงินไม่สำเร็จ" });
  } finally {
    conn.release();
  }
});

export default router;
