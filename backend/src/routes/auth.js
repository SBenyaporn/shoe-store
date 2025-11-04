// backend/src/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { dbConfig } from "../config/database.js";

export const authRouter = express.Router();


const pool = mysql.createPool(dbConfig);


const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";


authRouter.get("/_debug", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [[db]] = await conn.query("SELECT DATABASE() AS db");
    const qEmail = String(req.query.email || "").trim().toLowerCase();

    const [rows] = await conn.query(
      `SELECT id, email, CHAR_LENGTH(password_hash) AS len
       FROM users
       WHERE LOWER(TRIM(email)) = ?`,
      [qEmail]
    );

    res.json({ database: db.db, emailQueried: qEmail, rows });
  } catch (e) {
    console.error("AUTH DEBUG ERROR:", e);
    res.status(500).json({ error: "debug error" });
  } finally {
    conn.release();
  }
});


authRouter.post("/login", async (req, res) => {
  const rawEmail = String(req.body?.email ?? "");
  const email = rawEmail.trim().toLowerCase(); 
  const password = String(req.body?.password ?? "");

  if (!email || !password) {
    return res.status(400).json({ error: "ต้องกรอกอีเมลและรหัสผ่าน" });
  }

  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT * FROM users WHERE LOWER(TRIM(email)) = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "ไม่พบบัญชีอีเมลนี้" });
    }

    const user = rows[0];

    
    if (user.password_hash == null) {
      return res
        .status(500)
        .json({ error: "ผู้ใช้นี้ยังไม่ได้ตั้งรหัสผ่าน (ไม่มี password_hash)" });
    }

    const ok = await bcrypt.compare(password, user.password_hash || "");
    if (!ok) {
      return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    }

    const token = jwt.sign(
      { uid: user.id, email: user.email, name: user.full_name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

   
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;
    const ua = req.headers["user-agent"] || null;

    await conn.query(
      "INSERT INTO login_logs (user_id, ip_address, user_agent) VALUES (?, ?, ?)",
      [user.id, ip, ua]
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "server error" });
  } finally {
    conn.release();
  }
});


authRouter.post("/register", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  const full_name = String(req.body?.full_name ?? "");

  if (!email || !password) {
    return res.status(400).json({ error: "กรอกอีเมลและรหัสผ่าน" });
  }

  const conn = await pool.getConnection();
  try {
    
    const [exists] = await conn.query(
      "SELECT id FROM users WHERE LOWER(TRIM(email)) = ?",
      [email]
    );
    if (exists.length) {
      return res.status(409).json({ error: "อีเมลนี้ถูกใช้แล้ว" });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await conn.query(
      "INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)",
      [email, hash, full_name]
    );

    res.status(201).json({ id: result.insertId });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    res.status(500).json({ error: "server error" });
  } finally {
    conn.release();
  }
});
