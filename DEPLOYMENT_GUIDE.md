# 🚀 คู่มือการ Deploy React + Vite และ Backend

## 📋 สารบัญ
1. [เตรียมโปรเจ็กต์สำหรับ Production](#เตรียมโปรเจ็กต์สำหรับ-production)
2. [Deploy Frontend (React + Vite)](#deploy-frontend-react--vite)
3. [Deploy Backend (Express.js)](#deploy-backend-expressjs)
4. [เชื่อมต่อ Frontend กับ Backend](#เชื่อมต่อ-frontend-กับ-backend)

---

## 🔧 เตรียมโปรเจ็กต์สำหรับ Production

### 1. สร้างไฟล์ Environment Variables

**Frontend (`my-app/.env.production`):**
```env
VITE_API_BASE=https://your-backend-url.com
```

**Backend (`backend/.env`):**
```env
PORT=5050
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
NODE_ENV=production
```

### 2. Build Frontend สำหรับ Production

```bash
cd my-app
npm run build
```

ไฟล์ที่ build จะอยู่ที่ `my-app/dist/`

---

## 🌐 Deploy Frontend (React + Vite)

### วิธีที่ 1: Vercel (แนะนำ - ง่ายที่สุด)

#### ขั้นตอน:
1. **ติดตั้ง Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd my-app
   vercel
   ```

4. **ตั้งค่า Environment Variables:**
   - ไปที่ Vercel Dashboard → Project → Settings → Environment Variables
   - เพิ่ม `VITE_API_BASE` = `https://your-backend-url.com`

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

#### หรือใช้ GitHub Integration:
1. Push โค้ดไป GitHub
2. ไปที่ [vercel.com](https://vercel.com)
3. Import project จาก GitHub
4. ตั้งค่า:
   - **Framework Preset:** Vite
   - **Root Directory:** `my-app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

---

### วิธีที่ 2: Netlify

#### ขั้นตอน:
1. **ติดตั้ง Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   cd my-app
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **ตั้งค่า Environment Variables:**
   - ไปที่ Netlify Dashboard → Site settings → Environment variables
   - เพิ่ม `VITE_API_BASE`

#### หรือสร้างไฟล์ `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### วิธีที่ 3: GitHub Pages

1. **ติดตั้ง plugin:**
   ```bash
   cd my-app
   npm install --save-dev gh-pages
   ```

2. **แก้ไข `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://your-username.github.io/your-repo-name"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **แก้ไข `vite.config.js`** (เพิ่ม base path):
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

---

### วิธีที่ 4: Render

1. ไปที่ [render.com](https://render.com)
2. สร้าง Static Site
3. ตั้งค่า:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - เพิ่ม Environment Variable: `VITE_API_BASE`

---

## 🔌 Deploy Backend (Express.js)

### วิธีที่ 1: Render (แนะนำ - ฟรี)

> 📖 **อ่านคู่มือละเอียด:** [RENDER_DEPLOY_BACKEND.md](./RENDER_DEPLOY_BACKEND.md)  
> ⚡ **Quick Start:** [RENDER_QUICK_START.md](./RENDER_QUICK_START.md)  
> ✅ **Checklist:** [RENDER_CHECKLIST.md](./RENDER_CHECKLIST.md)

#### ขั้นตอนสั้นๆ:
1. **Push โค้ดไป GitHub**

2. **ไปที่ [render.com](https://render.com)**
   - สร้าง Web Service
   - Connect GitHub repository

3. **ตั้งค่า:**
   - **Root Directory:** `backend` ⚠️ **สำคัญมาก!**
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Environment Variables:**
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS` (URL ของ Frontend คั่นด้วย comma)
   - `NODE_ENV=production`

5. **Deploy!**

**อ่านขั้นตอนละเอียด:** [RENDER_DEPLOY_BACKEND.md](./RENDER_DEPLOY_BACKEND.md)

---

### วิธีที่ 2: Railway

1. ไปที่ [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. เลือก repository และ `backend` folder
4. ตั้งค่า Environment Variables
5. Railway จะให้ URL เช่น: `https://your-app.railway.app`

---

### วิธีที่ 3: Heroku

1. **ติดตั้ง Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **สร้าง app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **ตั้งค่า Environment Variables:**
   ```bash
   heroku config:set DB_HOST=xxx DB_USER=xxx DB_PASSWORD=xxx
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

---

### วิธีที่ 4: DigitalOcean App Platform

1. ไปที่ [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create App → GitHub
3. เลือก repository และ `backend` folder
4. ตั้งค่า Environment Variables
5. Deploy!

---

## 🔗 เชื่อมต่อ Frontend กับ Backend

### หลัง Deploy ทั้งสองแล้ว:

1. **อัปเดต Frontend Environment Variable:**
   ```
   VITE_API_BASE=https://your-backend-url.com
   ```

2. **อัปเดต Backend Environment Variable:**
   ```env
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
   NODE_ENV=production
   ```
   
   (ไม่ต้องแก้โค้ด - ระบบจะอ่านจาก Environment Variable อัตโนมัติ)

3. **Redeploy ทั้งสอง**

---

## 📝 Checklist สำหรับ Production

### Frontend:
- [ ] Build ผ่านแล้ว (`npm run build`)
- [ ] ตั้งค่า `VITE_API_BASE` ใน production environment
- [ ] ตรวจสอบว่า routing ทำงานถูกต้อง (อาจต้องใช้ `_redirects` หรือ `vercel.json`)
- [ ] ตรวจสอบ CORS settings ใน backend

### Backend:
- [ ] ตั้งค่า Database connection
- [ ] ตั้งค่า Environment Variables ทั้งหมด
- [ ] ตรวจสอบ CORS ให้รองรับ frontend URL
- [ ] ตั้งค่า Error handling
- [ ] ตั้งค่า Security headers (ถ้าจำเป็น)

---

## 🛠️ ไฟล์เพิ่มเติมที่อาจต้องสร้าง

### `vercel.json` (สำหรับ Vercel):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `_redirects` (สำหรับ Netlify - ใส่ใน `public/`):
```
/*    /index.html   200
```

---

## 🎯 ตัวอย่างคำสั่ง Deploy แบบรวดเร็ว

### Vercel (Frontend):
```bash
cd my-app
npm run build
vercel --prod
```

### Render (Backend):
- ใช้ Dashboard ของ Render จะง่ายกว่า

---

## ❓ Troubleshooting

### ปัญหา: Frontend ไม่เจอ Backend
- ตรวจสอบ `VITE_API_BASE` ตั้งค่าถูกต้อง
- ตรวจสอบ CORS ใน backend

### ปัญหา: Routing ไม่ทำงาน (404)
- ใช้ `_redirects` หรือ `vercel.json` เพื่อ redirect ไปที่ `index.html`

### ปัญหา: Build ล้มเหลว
- ตรวจสอบว่า `node_modules` มีครบ
- ตรวจสอบว่าไม่มี error ในโค้ด

---

## 📚 ทรัพยากรเพิ่มเติม

- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Render Documentation](https://render.com/docs)

