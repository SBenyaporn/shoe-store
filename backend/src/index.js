import "dotenv/config";
import express from "express";
import cors from "cors";

import { ordersRouter } from "./routes/orders.js";
import paymentsRouter from "./routes/payments.js";

const app = express();
const PORT = Number(process.env.PORT || 5050);

app.set("trust proxy", true);

// CORS Configuration - รองรับทั้ง Development และ Production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((url) => url.trim())
  : ["http://localhost:5173", "http://localhost:3000"]; // Default สำหรับ development

app.use(
  cors({
    origin: (origin, cb) => {
      // ใน development หรือถ้าไม่มี origin (เช่น mobile app, Postman) ให้อนุญาต
      if (!origin || process.env.NODE_ENV !== "production" || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());


app.get("/api/health", (_req, res) => res.json({ ok: true }));


app.use("/api", ordersRouter);            
app.use("/api/payments", paymentsRouter); 


app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log(`API running on http://127.0.0.1:${PORT}`);
});
