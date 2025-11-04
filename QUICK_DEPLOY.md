# ⚡ Quick Deploy Guide (สรุปสั้นๆ)

## 🎯 Frontend (React + Vite)

### Option 1: Vercel (แนะนำ - ง่ายที่สุด)

```bash
# 1. ติดตั้ง Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd my-app
vercel --prod
```

**หรือใช้ GitHub:**
1. Push โค้ดไป GitHub
2. ไปที่ [vercel.com](https://vercel.com)
3. Import project → เลือก repository
4. ตั้งค่า Root Directory: `my-app`
5. เพิ่ม Environment Variable: `VITE_API_BASE=https://your-backend-url.com`
6. Deploy!

---

### Option 2: Netlify

```bash
# 1. ติดตั้ง Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build และ Deploy
cd my-app
npm run build
netlify deploy --prod --dir=dist
```

**หรือใช้ GitHub:**
1. Push โค้ดไป GitHub
2. ไปที่ [netlify.com](https://netlify.com)
3. Add new site → Import from Git
4. เลือก repository
5. ตั้งค่า:
   - Base directory: `my-app`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. เพิ่ม Environment Variable: `VITE_API_BASE`
7. Deploy!

---

## 🔌 Backend (Express.js)

### Render (แนะนำ - ฟรี)

1. Push โค้ดไป GitHub
2. ไปที่ [render.com](https://render.com)
3. New → Web Service
4. Connect GitHub repository
5. ตั้งค่า:
   - **Name:** `shoestore-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. เพิ่ม Environment Variables:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS` (URL ของ Frontend คั่นด้วย comma)
   - `NODE_ENV=production`
7. Deploy!

---

## 📝 Environment Variables ที่ต้องตั้งค่า

### Frontend (`.env.production`):
```env
VITE_API_BASE=https://your-backend-url.com
```

### Backend (`.env`):
```env
PORT=5050
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
NODE_ENV=production
```

---

## 🔗 หลังจาก Deploy ทั้งสองแล้ว

1. **อัปเดต Frontend:**
   - ตั้งค่า `VITE_API_BASE` = URL ของ Backend ที่ deploy แล้ว

2. **อัปเดต Backend Environment Variable:**
   ```env
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
   NODE_ENV=production
   ```
   
   (ไม่ต้องแก้โค้ด - ระบบจะอ่านจาก Environment Variable อัตโนมัติ)

3. **Redeploy ทั้งสอง**

---

## ✅ ไฟล์ที่สร้างไว้แล้ว

- ✅ `vercel.json` - สำหรับ Vercel
- ✅ `netlify.toml` - สำหรับ Netlify  
- ✅ `public/_redirects` - สำหรับ Netlify routing
- ✅ `deploy.sh` / `deploy.bat` - Script สำหรับ deploy

---

## 🚀 ใช้ Script Deploy

**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

