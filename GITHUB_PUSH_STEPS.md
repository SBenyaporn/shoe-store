# 📤 ขั้นตอน Push โค้ดไป GitHub (สำหรับโปรเจ็กต์นี้)

## 📍 สถานะปัจจุบัน

- ✅ Git repository อยู่ใน `my-app/` (frontend เท่านั้น)
- ⚠️ ต้อง Push ทั้งโปรเจ็กต์ (รวม backend) เพื่อ Deploy

## 🎯 วิธีที่ 1: Push ทั้งโปรเจ็กต์ (แนะนำ)

### ขั้นตอน:

1. **สร้าง Git repository ที่ root:**
   ```bash
   cd D:\ShoeStore2-5
   git init
   ```

2. **สร้าง .gitignore:**
   ```gitignore
   node_modules/
   dist/
   build/
   .env
   .env.local
   *.log
   .DS_Store
   ```

3. **เพิ่มไฟล์ทั้งหมด:**
   ```bash
   git add .
   ```

4. **Commit:**
   ```bash
   git commit -m "Initial commit - Full project"
   ```

5. **เพิ่ม Remote (ถ้ายังไม่มี):**
   ```bash
   git remote add origin https://github.com/wipawa2345/ShoeStore.git
   # หรือถ้ามีอยู่แล้ว
   git remote set-url origin https://github.com/wipawa2345/ShoeStore.git
   ```

6. **Push:**
   ```bash
   git push -u origin main
   ```

---

## 🎯 วิธีที่ 2: Push แยก Repository (ถ้าต้องการ)

### Frontend Repository:
- Repository: `https://github.com/wipawa2345/ShoeStore.git`
- Folder: `my-app/`

### Backend Repository (สร้างใหม่):
1. สร้าง Repository ใหม่: `shoestore-backend`
2. Push เฉพาะ `backend/` folder

---

## ✅ คำสั่งที่ต้องรัน (วิธีที่ 1 - แนะนำ)

```bash
# ไปที่ root ของโปรเจ็กต์
cd D:\ShoeStore2-5

# เริ่ม Git repository (ถ้ายังไม่มี)
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Add full project with frontend and backend"

# เชื่อมต่อกับ GitHub (ถ้ายังไม่มี)
git remote add origin https://github.com/wipawa2345/ShoeStore.git

# Push
git push -u origin main
```

**หมายเหตุ:** ถ้า Repository มีโค้ดเก่าอยู่ อาจต้องใช้ `git push -u origin main --force` (ระวัง!)

---

## 📝 ไฟล์ที่ควรเพิ่มใน Git

✅ **ควร Push:**
- `backend/` (โค้ด backend)
- `my-app/` (โค้ด frontend)
- `tests/` (test files)
- `package.json` files
- Config files (`.gitignore`, `README.md`, etc.)

❌ **ไม่ควร Push:**
- `node_modules/` (ต้องมีใน .gitignore)
- `.env` files (มี credentials)
- `dist/`, `build/` (build outputs)

---

## 🔐 การ Login GitHub

เมื่อ Push ครั้งแรก จะถาม:
- **Username:** `wipawa2345`
- **Password:** ใช้ **Personal Access Token** (ไม่ใช่ password จริง)

**สร้าง Token:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Check `repo` scope
4. คัดลอก Token (แสดงแค่ครั้งเดียว!)

---

## 📚 อ่านคู่มือละเอียด

ดูใน `GITHUB_PUSH_GUIDE.md` สำหรับ:
- ขั้นตอนละเอียด
- Troubleshooting
- Tips และ Best Practices

