# 🚀 คู่มือ Deploy Backend บน Render แบบละเอียด

## 📋 สารบัญ
1. [เตรียมความพร้อม](#เตรียมความพร้อม)
2. [Push โค้ดไป GitHub](#push-โค้ดไป-github)
3. [สร้าง Web Service บน Render](#สร้าง-web-service-บน-render)
4. [ตั้งค่า Environment Variables](#ตั้งค่า-environment-variables)
5. [Deploy และตรวจสอบ](#deploy-และตรวจสอบ)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 เตรียมความพร้อม

### 1. ตรวจสอบว่า Backend พร้อม Deploy

**ตรวจสอบไฟล์ `backend/package.json`:**
```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

✅ ต้องมี script `start` ที่รัน `node src/index.js`

### 2. ตรวจสอบว่าใช้ Environment Variables

Backend ควรใช้ `dotenv` เพื่ออ่านค่าจาก `.env` (ซึ่งเราใช้แล้ว)

### 3. ตรวจสอบ Database

- ต้องมี Database ที่ใช้งานได้ (MySQL/MariaDB)
- รู้ค่า Database credentials (Host, User, Password, Database Name)

---

## 📤 Push โค้ดไป GitHub

### ขั้นตอนที่ 1: สร้าง Repository บน GitHub

1. ไปที่ [github.com](https://github.com)
2. คลิก **"+"** → **"New repository"**
3. ตั้งชื่อ Repository (เช่น: `shoestore-app`)
4. เลือก **Public** หรือ **Private** (ตามต้องการ)
5. **ไม่ต้อง** check "Add a README file" (ถ้ามีโค้ดอยู่แล้ว)
6. คลิก **"Create repository"**

### ขั้นตอนที่ 2: Push โค้ดจากเครื่อง

**ถ้ายังไม่มี Git repository:**
```bash
# ไปที่ root ของโปรเจ็กต์
cd D:\ShoeStore2-5

# เริ่ม Git repository
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit ครั้งแรก
git commit -m "Initial commit"

# เพิ่ม remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push ไป GitHub
git branch -M main
git push -u origin main
```

**ถ้ามี Git repository อยู่แล้ว:**
```bash
# เพิ่ม remote (ถ้ายังไม่มี)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# หรืออัปเดต remote (ถ้ามีอยู่แล้ว)
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push ไป GitHub
git add .
git commit -m "Prepare for deployment"
git push -u origin main
```

### ขั้นตอนที่ 3: ตรวจสอบว่า Push สำเร็จ

1. ไปที่ GitHub repository ของคุณ
2. ตรวจสอบว่าเห็นไฟล์ `backend/` และไฟล์อื่นๆ
3. ตรวจสอบว่า `backend/package.json` และ `backend/src/index.js` มีอยู่

---

## 🌐 สร้าง Web Service บน Render

### ขั้นตอนที่ 1: สร้างบัญชี Render

1. ไปที่ [render.com](https://render.com)
2. คลิก **"Get Started for Free"** หรือ **"Sign Up"**
3. เลือก **"Sign up with GitHub"** (แนะนำ - ง่ายที่สุด)
4. อนุญาตให้ Render เข้าถึง GitHub account ของคุณ

### ขั้นตอนที่ 2: สร้าง Web Service

1. **หลังจาก Login แล้ว:**
   - คลิก **"New +"** (มุมบนขวา)
   - เลือก **"Web Service"**

2. **เชื่อมต่อ GitHub Repository:**
   - ถ้ายังไม่เชื่อมต่อ: คลิก **"Connect GitHub"** หรือ **"Configure account"**
   - เลือก Repository ที่ต้องการ Deploy (เช่น: `shoestore-app`)
   - คลิก **"Connect"**

3. **ตั้งค่า Web Service:**

   **Basic Settings:**
   - **Name:** `shoestore-backend` (หรือชื่อที่ต้องการ)
   - **Region:** เลือก `Singapore` หรือ `Oregon` (ใกล้ที่สุด)
   - **Branch:** `main` (หรือ branch ที่ต้องการ)

   **Build & Deploy:**
   - **Root Directory:** `backend` ⚠️ **สำคัญมาก!**
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

   **Instance Type:**
   - เลือก **Free** (สำหรับทดสอบ)
   - หรือ **Starter** ($7/เดือน) ถ้าต้องการ performance ดีกว่า

4. **คลิก "Create Web Service"**

### ขั้นตอนที่ 3: รอให้ Build เสร็จ

- Render จะเริ่ม Build อัตโนมัติ
- ใช้เวลาประมาณ 2-5 นาที
- ดู Progress ใน Logs

---

## ⚙️ ตั้งค่า Environment Variables

### ขั้นตอนที่ 1: เปิด Environment Tab

1. ไปที่ Web Service ที่สร้างไว้
2. คลิก **"Environment"** (เมนูด้านซ้าย)

### ขั้นตอนที่ 2: เพิ่ม Environment Variables

คลิก **"Add Environment Variable"** และเพิ่มทีละตัว:

#### 1. Database Configuration:

```
Key: DB_HOST
Value: your-database-host.com
```
(หรือ `localhost` ถ้าใช้ Database จาก Render)

```
Key: DB_USER
Value: your-database-username
```

```
Key: DB_PASSWORD
Value: your-database-password
```

```
Key: DB_NAME
Value: your-database-name
```

#### 2. JWT Secret:

```
Key: JWT_SECRET
Value: your-super-secret-random-key-here
```
(ใช้ random string ยาวๆ เช่น: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

#### 3. CORS Configuration:

```
Key: ALLOWED_ORIGINS
Value: https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
```
(เพิ่ม URL ของ Frontend ที่คั่นด้วย comma - ถ้ายังไม่มี Frontend URL ให้เพิ่มทีหลัง)

#### 4. Environment Mode:

```
Key: NODE_ENV
Value: production
```

#### 5. Port (ไม่จำเป็น - Render จะตั้งให้อัตโนมัติ):

```
Key: PORT
Value: (ไม่ต้องตั้ง - Render จะตั้งให้อัตโนมัติ)
```

### ขั้นตอนที่ 3: บันทึกและ Deploy

1. หลังจากเพิ่ม Environment Variables ทั้งหมดแล้ว
2. คลิก **"Save Changes"**
3. Render จะ **Auto Deploy** ใหม่ทันที

---

## 🚀 Deploy และตรวจสอบ

### ขั้นตอนที่ 1: ดู Build Logs

1. ไปที่ **"Logs"** tab
2. ดูว่า Build ผ่านหรือไม่:
   ```
   ✅ Build successful
   ✅ Starting service...
   ```

### ขั้นตอนที่ 2: ตรวจสอบว่า Service ทำงาน

1. ดูที่ **"Events"** tab
   - ควรเห็น: `✅ Your service is live at https://your-app.onrender.com`

2. ดู URL ที่ได้:
   - อยู่ด้านบนของหน้า (เช่น: `https://shoestore-backend.onrender.com`)

### ขั้นตอนที่ 3: ทดสอบ API

1. **ทดสอบ Health Check:**
   ```
   https://your-app.onrender.com/api/health
   ```
   
   ควรได้ผลลัพธ์:
   ```json
   {"ok": true}
   ```

2. **ทดสอบด้วย Browser:**
   - เปิด Browser
   - ไปที่ `https://your-app.onrender.com/api/health`
   - ควรเห็น `{"ok": true}`

3. **ทดสอบด้วย curl (Terminal):**
   ```bash
   curl https://your-app.onrender.com/api/health
   ```

### ขั้นตอนที่ 4: ตรวจสอบ Logs

1. ไปที่ **"Logs"** tab
2. ตรวจสอบว่าไม่มี Error
3. ควรเห็น:
   ```
   API running on http://127.0.0.1:5050
   ```

---

## 🔗 เชื่อมต่อกับ Frontend

### หลังจาก Deploy Backend สำเร็จ:

1. **คัดลอก Backend URL:**
   - เช่น: `https://shoestore-backend.onrender.com`

2. **อัปเดต Frontend Environment Variable:**
   - ใน Vercel/Netlify: เพิ่ม `VITE_API_BASE=https://shoestore-backend.onrender.com`

3. **อัปเดต Backend CORS:**
   - ไปที่ Render → Environment
   - อัปเดต `ALLOWED_ORIGINS` ให้รวม Frontend URL
   - เช่น: `https://your-frontend.vercel.app`

4. **Redeploy ทั้งสอง**

---

## 🗄️ สร้าง Database บน Render (ถ้ายังไม่มี)

### Option 1: ใช้ PostgreSQL (Render ฟรี)

1. **สร้าง PostgreSQL Database:**
   - Render Dashboard → **"New +"** → **"PostgreSQL"**
   - ตั้งชื่อ: `shoestore-db`
   - เลือก **Free** tier
   - คลิก **"Create Database"**

2. **อัปเดต Backend:**
   - ต้องเปลี่ยนจาก MySQL เป็น PostgreSQL
   - หรือใช้ MySQL จากที่อื่น

### Option 2: ใช้ MySQL จากที่อื่น

- [PlanetScale](https://planetscale.com) - ฟรี
- [Railway](https://railway.app) - ฟรี
- [Aiven](https://aiven.io) - ฟรี trial
- หรือใช้ Database จากที่อื่น

### Option 3: ใช้ Database จาก Render

Render มี MySQL แต่ต้องจ่ายเงิน (ไม่ฟรี)

---

## 🐛 Troubleshooting

### ปัญหา: Build ล้มเหลว

**อาการ:** Build Error ใน Logs

**วิธีแก้:**
1. ตรวจสอบ `package.json` มี `start` script
2. ตรวจสอบว่า `Root Directory` ตั้งเป็น `backend`
3. ตรวจสอบว่าไฟล์ `backend/src/index.js` มีอยู่
4. ดู Error message ใน Logs

### ปัญหา: Service ไม่สามารถ Start ได้

**อาการ:** Service Crash หรือ Restart บ่อย

**วิธีแก้:**
1. ตรวจสอบ Environment Variables ครบหรือไม่
2. ตรวจสอบ Database Connection
3. ดู Logs เพื่อหา Error message
4. ตรวจสอบว่า Database เปิดให้เข้าถึงได้จากภายนอก

### ปัญหา: Database Connection Error

**อาการ:** `Error: connect ECONNREFUSED` หรือ `Access denied`

**วิธีแก้:**
1. ตรวจสอบ Database credentials ถูกต้อง
2. ตรวจสอบว่า Database Host เปิดให้เข้าถึงจากภายนอก
3. ตรวจสอบ Firewall/Security Groups
4. ถ้าใช้ Database จาก Render: ใช้ Internal Database URL

### ปัญหา: CORS Error

**อาการ:** Frontend ไม่สามารถเรียก API ได้

**วิธีแก้:**
1. ตรวจสอบ `ALLOWED_ORIGINS` ตั้งค่า Frontend URL ถูกต้อง
2. ตรวจสอบว่า Frontend URL ไม่มี trailing slash
3. ตรวจสอบว่า `NODE_ENV=production` ตั้งไว้

### ปัญหา: Service หลับ (Free Tier)

**อาการ:** Request แรกช้า (Cold Start)

**สาเหตุ:** Render Free Tier จะปิด Service ถ้าไม่มีการใช้งาน 15 นาที

**วิธีแก้:**
1. ใช้ **Starter** tier ($7/เดือน) เพื่อไม่ให้หลับ
2. หรือตั้งค่า **Uptime Monitor** เพื่อ wake up service
3. หรือใช้ [UptimeRobot](https://uptimerobot.com) เพื่อ ping ทุก 5 นาที

---

## 📝 Checklist

### ก่อน Deploy:
- [ ] Push โค้ดไป GitHub สำเร็จ
- [ ] ตรวจสอบ `backend/package.json` มี `start` script
- [ ] มี Database พร้อมใช้งาน
- [ ] รู้ Database credentials

### ระหว่าง Deploy:
- [ ] สร้าง Web Service บน Render
- [ ] ตั้งค่า Root Directory เป็น `backend`
- [ ] ตั้งค่า Build Command: `npm install`
- [ ] ตั้งค่า Start Command: `npm start`
- [ ] เพิ่ม Environment Variables ทั้งหมด
- [ ] Build สำเร็จ

### หลัง Deploy:
- [ ] ทดสอบ Health Check endpoint
- [ ] ตรวจสอบ Logs ไม่มี Error
- [ ] อัปเดต Frontend ให้ชี้ไปที่ Backend URL
- [ ] อัปเดต CORS ให้รองรับ Frontend URL
- [ ] ทดสอบ Frontend เรียก Backend API ได้

---

## 💡 Tips และ Best Practices

### 1. ใช้ Environment Variables
- **อย่า** hardcode credentials ในโค้ด
- ใช้ Environment Variables เสมอ

### 2. ตรวจสอบ Logs
- ดู Logs เป็นประจำเพื่อหา Error
- Render จะเก็บ Logs ไว้ 1,000 บรรทัดล่าสุด

### 3. Database Connection
- ใช้ Connection Pooling
- Handle errors ให้ดี
- ใช้ Retry logic สำหรับ Connection

### 4. Security
- ใช้ HTTPS เสมอ (Render ให้อัตโนมัติ)
- ตั้งค่า CORS ให้เฉพาะ Frontend URL ที่ต้องการ
- ใช้ JWT Secret ที่แข็งแรง

### 5. Monitoring
- ตั้งค่า Alerts สำหรับ Errors
- Monitor Response Time
- ตรวจสอบ Database Connection

---

## 📚 ทรัพยากรเพิ่มเติม

- [Render Documentation](https://render.com/docs)
- [Render Web Services Guide](https://render.com/docs/web-services)
- [Environment Variables on Render](https://render.com/docs/environment-variables)
- [Database on Render](https://render.com/docs/databases)

---

## 🎯 สรุป

หลังจากทำตามขั้นตอนทั้งหมด:

1. ✅ Backend จะอยู่ที่: `https://your-app.onrender.com`
2. ✅ Health Check: `https://your-app.onrender.com/api/health`
3. ✅ พร้อมใช้งานกับ Frontend

**หมายเหตุ:** 
- Free Tier อาจมี Cold Start (ช้าในครั้งแรก)
- ถ้าต้องการ Performance ดีกว่า ให้ใช้ Starter tier ($7/เดือน)

---

## ❓ ยังมีปัญหา?

- ดู Logs ใน Render Dashboard
- ตรวจสอบ Environment Variables
- ตรวจสอบ Database Connection
- อ่าน [Render Documentation](https://render.com/docs)

