# ✅ Checklist สำหรับ Deploy Backend บน Render

## 📋 ก่อนเริ่มต้น

### 1. เตรียมโค้ด
- [ ] โค้ด Backend อยู่ใน folder `backend/`
- [ ] มีไฟล์ `backend/package.json`
- [ ] มี script `"start": "node src/index.js"` ใน `package.json`
- [ ] ไฟล์ `backend/src/index.js` มีอยู่และทำงานได้
- [ ] ทดสอบรัน Backend ในเครื่องได้ (`npm start`)

### 2. เตรียม Database
- [ ] มี Database ที่ใช้งานได้ (MySQL/PostgreSQL)
- [ ] รู้ Database Host
- [ ] รู้ Database Username
- [ ] รู้ Database Password
- [ ] รู้ Database Name
- [ ] Database เปิดให้เข้าถึงจากภายนอกได้ (ถ้าใช้ Database จากที่อื่น)

### 3. เตรียม GitHub
- [ ] มี GitHub Account
- [ ] สร้าง Repository บน GitHub แล้ว
- [ ] Push โค้ดไป GitHub แล้ว
- [ ] ตรวจสอบว่าเห็น `backend/` folder ใน GitHub

---

## 🚀 ขั้นตอน Deploy

### Step 1: สร้างบัญชี Render
- [ ] ไปที่ [render.com](https://render.com)
- [ ] สร้างบัญชี (Sign up with GitHub แนะนำ)
- [ ] Login สำเร็จ

### Step 2: สร้าง Web Service
- [ ] คลิก "New +" → "Web Service"
- [ ] เชื่อมต่อ GitHub Repository
- [ ] เลือก Repository ที่ต้องการ
- [ ] ตั้งชื่อ: `shoestore-backend` (หรือชื่อที่ต้องการ)

### Step 3: ตั้งค่า Build
- [ ] **Root Directory:** `backend` ⚠️ สำคัญมาก!
- [ ] **Environment:** `Node`
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Branch:** `main` (หรือ branch ที่ต้องการ)
- [ ] **Instance Type:** เลือก Free หรือ Starter

### Step 4: เพิ่ม Environment Variables
- [ ] `DB_HOST` = your-database-host
- [ ] `DB_USER` = your-database-username
- [ ] `DB_PASSWORD` = your-database-password
- [ ] `DB_NAME` = your-database-name
- [ ] `JWT_SECRET` = random-secret-key
- [ ] `ALLOWED_ORIGINS` = frontend-url (ถ้ามี)
- [ ] `NODE_ENV` = production

### Step 5: Deploy
- [ ] คลิก "Create Web Service"
- [ ] รอ Build เสร็จ (2-5 นาที)
- [ ] ดู Logs ว่า Build สำเร็จ

---

## ✅ หลัง Deploy

### Step 6: ตรวจสอบ
- [ ] ได้ Backend URL (เช่น: `https://shoestore-backend.onrender.com`)
- [ ] ทดสอบ Health Check: `/api/health` ทำงาน
- [ ] ดู Logs ไม่มี Error
- [ ] Service Status เป็น "Live"

### Step 7: เชื่อมต่อ Frontend
- [ ] คัดลอก Backend URL
- [ ] อัปเดต Frontend Environment Variable: `VITE_API_BASE`
- [ ] อัปเดต Backend `ALLOWED_ORIGINS` ให้รวม Frontend URL
- [ ] Redeploy Frontend และ Backend
- [ ] ทดสอบ Frontend เรียก Backend API ได้

---

## 🐛 Troubleshooting Checklist

### ถ้า Build ล้มเหลว:
- [ ] ตรวจสอบ `Root Directory` ตั้งเป็น `backend`
- [ ] ตรวจสอบ `package.json` มี `start` script
- [ ] ตรวจสอบไฟล์ `backend/src/index.js` มีอยู่
- [ ] ดู Error message ใน Logs

### ถ้า Service ไม่ Start:
- [ ] ตรวจสอบ Environment Variables ครบ
- [ ] ตรวจสอบ Database Connection
- [ ] ดู Logs หา Error

### ถ้า Database Connection Error:
- [ ] ตรวจสอบ Database credentials ถูกต้อง
- [ ] ตรวจสอบ Database Host เปิดให้เข้าถึงได้
- [ ] ตรวจสอบ Firewall/Security Groups

### ถ้า CORS Error:
- [ ] ตรวจสอบ `ALLOWED_ORIGINS` ตั้งค่า Frontend URL
- [ ] ตรวจสอบ `NODE_ENV=production`

---

## 📝 Environment Variables ที่ต้องตั้งค่า

```
DB_HOST=your-database-host.com
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
JWT_SECRET=your-random-secret-key-here
ALLOWED_ORIGINS=https://your-frontend.vercel.app
NODE_ENV=production
```

---

## 🔗 URLs ที่ต้องเก็บไว้

- **Backend URL:** `https://__________________.onrender.com`
- **Health Check:** `https://__________________.onrender.com/api/health`
- **Frontend URL:** `https://__________________.vercel.app`
- **GitHub Repository:** `https://github.com/__________________`

---

## 💡 Tips

- ✅ ใช้ `backend` เป็น Root Directory (สำคัญมาก!)
- ✅ เก็บ Environment Variables ไว้ในที่ปลอดภัย
- ✅ ใช้ JWT Secret ที่แข็งแรงและยาว
- ✅ ตรวจสอบ Logs เป็นประจำ
- ✅ Free Tier อาจมี Cold Start (ช้าในครั้งแรก)

---

**อ่านคู่มือละเอียด:** `RENDER_DEPLOY_BACKEND.md`

