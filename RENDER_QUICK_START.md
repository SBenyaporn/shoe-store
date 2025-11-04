# ⚡ Render Deploy - Quick Start Guide

## 🎯 ขั้นตอนหลัก (5 ขั้นตอน)

### 1️⃣ Push โค้ดไป GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2️⃣ ไปที่ Render.com
- ไปที่ [render.com](https://render.com)
- Sign up with GitHub (แนะนำ)
- Login

### 3️⃣ สร้าง Web Service
- คลิก **"New +"** → **"Web Service"**
- เลือก GitHub Repository
- ตั้งค่า:
  - **Name:** `shoestore-backend`
  - **Root Directory:** `backend` ⚠️ **สำคัญมาก!**
  - **Environment:** `Node`
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
- คลิก **"Create Web Service"**

### 4️⃣ ตั้งค่า Environment Variables
ไปที่ **"Environment"** tab → เพิ่ม:

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-random-secret-key
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### 5️⃣ รอ Deploy เสร็จ
- รอ Build เสร็จ (2-5 นาที)
- ได้ Backend URL: `https://your-app.onrender.com`
- ทดสอบ: `https://your-app.onrender.com/api/health`

---

## ✅ ตรวจสอบก่อน Deploy

รัน script เพื่อตรวจสอบ:
```bash
node check-backend-ready.js
```

หรือ:
```bash
check-backend-ready.bat
```

---

## 📚 อ่านคู่มือละเอียด

- **คู่มือละเอียด:** `RENDER_DEPLOY_BACKEND.md`
- **Checklist:** `RENDER_CHECKLIST.md`

---

## 🆘 ปัญหาที่พบบ่อย

### Build ล้มเหลว
→ ตรวจสอบว่า **Root Directory** = `backend`

### Service ไม่ Start
→ ตรวจสอบ **Environment Variables** ครบ

### Database Error
→ ตรวจสอบ Database credentials และ Connection

---

**เวลาที่ใช้:** ~10-15 นาที

