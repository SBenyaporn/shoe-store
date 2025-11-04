# 📤 คู่มือ Push โค้ดไป GitHub แบบละเอียด

## 📋 สารบัญ
1. [เตรียมความพร้อม](#เตรียมความพร้อม)
2. [สร้าง Repository บน GitHub](#สร้าง-repository-บน-github)
3. [Push โค้ดไป GitHub](#push-โค้ดไป-github)
4. [ตรวจสอบผลลัพธ์](#ตรวจสอบผลลัพธ์)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 เตรียมความพร้อม

### 1. ติดตั้ง Git

**ตรวจสอบว่ามี Git แล้ว:**
```bash
git --version
```

**ถ้ายังไม่มี:**
- ดาวน์โหลด: [git-scm.com](https://git-scm.com/download/win)
- ติดตั้งตามขั้นตอน (Next → Next)
- Restart Terminal หลังติดตั้ง

### 2. สร้าง GitHub Account

- ไปที่ [github.com](https://github.com)
- Sign up (ฟรี)
- ยืนยัน Email

### 3. ตั้งค่า Git (ครั้งแรกเท่านั้น)

```bash
git config --global user.name "ชื่อของคุณ"
git config --global user.email "your-email@example.com"
```

---

## 🌐 สร้าง Repository บน GitHub

### ขั้นตอนที่ 1: ไปที่ GitHub

1. ไปที่ [github.com](https://github.com)
2. Login เข้า account

### ขั้นตอนที่ 2: สร้าง Repository ใหม่

1. คลิก **"+"** (มุมบนขวา) → **"New repository"**
   หรือ
   คลิก **"New"** (สีเขียว) ในหน้า Dashboard

2. **ตั้งค่า Repository:**
   - **Repository name:** `ShoeStore2-5` (หรือชื่อที่ต้องการ)
   - **Description:** (ไม่บังคับ) เช่น "Shoe Store Application"
   - **Visibility:**
     - ✅ **Public** - ทุกคนเห็นได้ (ฟรี)
     - 🔒 **Private** - เฉพาะคุณเห็น (ต้องจ่ายเงินถ้าต้องการหลาย private repos)
   - **อย่า** check "Add a README file"
   - **อย่า** check "Add .gitignore"
   - **อย่า** check "Choose a license"

3. คลิก **"Create repository"**

### ขั้นตอนที่ 3: คัดลอก Repository URL

หลังสร้าง Repository จะเห็นหน้า Instructions
- **HTTPS URL:** `https://github.com/YOUR_USERNAME/ShoeStore2-5.git`
- **SSH URL:** `git@github.com:YOUR_USERNAME/ShoeStore2-5.git`

**แนะนำใช้ HTTPS** (ง่ายกว่า)

---

## 📤 Push โค้ดไป GitHub

### วิธีที่ 1: ยังไม่มี Git Repository (ใหม่)

```bash
# 1. ไปที่ root ของโปรเจ็กต์
cd D:\ShoeStore2-5

# 2. เริ่ม Git repository
git init

# 3. เพิ่มไฟล์ทั้งหมด
git add .

# 4. Commit ครั้งแรก
git commit -m "Initial commit"

# 5. เปลี่ยนชื่อ branch เป็น main (ถ้ายังเป็น master)
git branch -M main

# 6. เพิ่ม remote repository (แทน YOUR_USERNAME และ REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/ShoeStore2-5.git

# 7. Push ไป GitHub
git push -u origin main
```

### วิธีที่ 2: มี Git Repository อยู่แล้ว

```bash
# 1. ไปที่ root ของโปรเจ็กต์
cd D:\ShoeStore2-5

# 2. ตรวจสอบว่าเป็น Git repository แล้ว
git status

# 3. เพิ่ม remote (ถ้ายังไม่มี)
git remote add origin https://github.com/YOUR_USERNAME/ShoeStore2-5.git

# หรือถ้ามีอยู่แล้วแต่ต้องการเปลี่ยน
git remote set-url origin https://github.com/YOUR_USERNAME/ShoeStore2-5.git

# 4. เพิ่มไฟล์ทั้งหมด
git add .

# 5. Commit
git commit -m "Prepare for deployment"

# 6. Push ไป GitHub
git push -u origin main
```

### วิธีที่ 3: ใช้ GitHub Desktop (GUI - ง่ายที่สุด)

1. **ดาวน์โหลด GitHub Desktop:**
   - ไปที่ [desktop.github.com](https://desktop.github.com)
   - ดาวน์โหลดและติดตั้ง

2. **เปิด GitHub Desktop:**
   - File → Add Local Repository
   - เลือก folder `D:\ShoeStore2-5`
   - คลิก "Add repository"

3. **Publish to GitHub:**
   - File → Publish repository
   - ตั้งชื่อ Repository
   - เลือก Public/Private
   - คลิก "Publish repository"

---

## 🔐 การ Login GitHub (ครั้งแรก)

### ถ้าใช้ HTTPS (แนะนำ):

เมื่อ Push ครั้งแรก จะถาม Username และ Password:

**⚠️ หมายเหตุ:** GitHub ไม่ใช้ Password อีกต่อไป ต้องใช้ **Personal Access Token**

### สร้าง Personal Access Token:

1. **ไปที่ GitHub Settings:**
   - คลิก Profile Picture (มุมบนขวา) → **Settings**
   - หรือไปที่: [github.com/settings](https://github.com/settings)

2. **สร้าง Token:**
   - ไปที่ **Developer settings** (ด้านซ้ายล่าง)
   - คลิก **Personal access tokens** → **Tokens (classic)**
   - คลิก **Generate new token** → **Generate new token (classic)**

3. **ตั้งค่า Token:**
   - **Note:** `ShoeStore Deployment` (หรือชื่อที่ต้องการ)
   - **Expiration:** เลือกระยะเวลา (เช่น 90 days)
   - **Scopes:** Check ✅ `repo` (ทั้งหมด)
   - คลิก **Generate token**

4. **คัดลอก Token:**
   - ⚠️ **สำคัญ:** Token จะแสดงแค่ครั้งเดียว!
   - คัดลอกเก็บไว้ (จะใช้แทน Password)

5. **ใช้ Token เมื่อ Push:**
   - **Username:** GitHub username ของคุณ
   - **Password:** ใช้ Token ที่สร้างไว้ (ไม่ใช่ Password จริง)

### ถ้าใช้ SSH (ขั้นสูง):

1. สร้าง SSH Key:
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

2. เพิ่ม SSH Key ไป GitHub:
   - Settings → SSH and GPG keys → New SSH key
   - คัดลอก public key จาก `~/.ssh/id_ed25519.pub`

3. ใช้ SSH URL:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/ShoeStore2-5.git
   ```

---

## ✅ ตรวจสอบผลลัพธ์

### 1. ไปที่ GitHub Repository

- ไปที่: `https://github.com/YOUR_USERNAME/ShoeStore2-5`
- ควรเห็นไฟล์ทั้งหมด:
  - ✅ `backend/`
  - ✅ `my-app/`
  - ✅ `tests/`
  - ✅ ไฟล์อื่นๆ

### 2. ตรวจสอบว่า Push สำเร็จ

```bash
git status
```

ควรเห็น:
```
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

### 3. ทดสอบ Push อีกครั้ง

```bash
# แก้ไขไฟล์อะไรก็ได้
echo "# Test" >> README.md

# Add และ Commit
git add README.md
git commit -m "Test commit"

# Push
git push
```

---

## 🔄 คำสั่ง Git ที่ใช้บ่อย

### เพิ่มไฟล์และ Commit:
```bash
git add .                    # เพิ่มไฟล์ทั้งหมด
git add filename.js          # เพิ่มไฟล์เฉพาะ
git commit -m "ข้อความ"      # Commit
```

### Push/Pull:
```bash
git push                     # Push ไป GitHub
git pull                     # ดึงโค้ดจาก GitHub
git push -u origin main     # Push ครั้งแรก (ตั้ง upstream)
```

### ตรวจสอบสถานะ:
```bash
git status                   # ดูสถานะไฟล์
git log                      # ดูประวัติ Commits
git remote -v                # ดู Remote URLs
```

### แก้ไข Remote:
```bash
git remote add origin URL    # เพิ่ม remote
git remote set-url origin URL # เปลี่ยน remote URL
git remote remove origin     # ลบ remote
```

---

## 🐛 Troubleshooting

### ปัญหา: Authentication failed

**อาการ:** `fatal: Authentication failed`

**วิธีแก้:**
1. ใช้ Personal Access Token แทน Password
2. ตรวจสอบว่า Token ยังไม่หมดอายุ
3. ลบ credentials เก่าและใส่ใหม่:
   ```bash
   # Windows
   git credential-manager erase
   # หรือ
   git config --global --unset credential.helper
   ```

### ปัญหา: Repository not found

**อาการ:** `fatal: repository '...' not found`

**วิธีแก้:**
1. ตรวจสอบ Repository URL ถูกต้อง
2. ตรวจสอบว่า Repository เป็น Public หรือคุณมีสิทธิ์เข้าถึง
3. ตรวจสอบ Username/Token ถูกต้อง

### ปัญหา: Branch 'main' has no upstream branch

**อาการ:** `fatal: The current branch main has no upstream branch`

**วิธีแก้:**
```bash
git push -u origin main
```

### ปัญหา: Files too large

**อาการ:** GitHub reject ไฟล์ใหญ่

**วิธีแก้:**
1. สร้าง `.gitignore`:
   ```gitignore
   node_modules/
   dist/
   build/
   .env
   .env.local
   *.log
   ```
2. ลบไฟล์ใหญ่จาก Git:
   ```bash
   git rm --cached large-file.zip
   git commit -m "Remove large file"
   ```

### ปัญหา: Merge conflict

**อาการ:** `error: failed to push some refs`

**วิธีแก้:**
```bash
git pull origin main --rebase
git push
```

---

## 📝 Checklist

### ก่อน Push:
- [ ] ติดตั้ง Git แล้ว
- [ ] สร้าง GitHub Account แล้ว
- [ ] ตั้งค่า Git user.name และ user.email แล้ว
- [ ] สร้าง Repository บน GitHub แล้ว
- [ ] มี Personal Access Token (ถ้าใช้ HTTPS)

### ขั้นตอน Push:
- [ ] `git init` (ถ้ายังไม่มี)
- [ ] `git add .`
- [ ] `git commit -m "message"`
- [ ] `git remote add origin URL`
- [ ] `git push -u origin main`

### หลัง Push:
- [ ] ตรวจสอบ GitHub เห็นไฟล์ทั้งหมด
- [ ] `git status` แสดงว่า up to date
- [ ] Repository พร้อมสำหรับ Deploy

---

## 💡 Tips

### 1. ใช้ .gitignore

สร้างไฟล์ `.gitignore` ใน root:
```gitignore
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
*.log

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### 2. Commit Messages ที่ดี

- ✅ `"Add user authentication"`
- ✅ `"Fix login bug"`
- ✅ `"Update dependencies"`
- ❌ `"fix"` (ไม่ชัดเจน)
- ❌ `"asdf"` (ไม่มีประโยชน์)

### 3. ใช้ Branch สำหรับ Feature

```bash
git checkout -b feature/new-feature
# แก้ไขโค้ด
git add .
git commit -m "Add new feature"
git push -u origin feature/new-feature
```

---

## 🚀 หลังจาก Push สำเร็จ

### 1. Deploy Backend (Render):

1. ไปที่ [render.com](https://render.com)
2. สร้าง Web Service
3. เลือก GitHub Repository ที่เพิ่ง Push
4. ตั้งค่า Root Directory = `backend`
5. Deploy!

**อ่านคู่มือ:** `RENDER_DEPLOY_BACKEND.md`

### 2. Deploy Frontend (Vercel):

1. ไปที่ [vercel.com](https://vercel.com)
2. Import project จาก GitHub
3. ตั้งค่า Root Directory = `my-app`
4. Deploy!

**อ่านคู่มือ:** `DEPLOYMENT_GUIDE.md`

---

## 📚 ทรัพยากรเพิ่มเติม

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Documentation](https://docs.github.com)
- [GitHub Desktop](https://desktop.github.com)
- [Personal Access Tokens Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## ✅ สรุป

**ขั้นตอนหลัก:**
1. สร้าง Repository บน GitHub
2. `git init` (ถ้ายังไม่มี)
3. `git add .`
4. `git commit -m "message"`
5. `git remote add origin URL`
6. `git push -u origin main`
7. Login ด้วย Personal Access Token

**เวลาที่ใช้:** ~5-10 นาที

---

**มีคำถาม?** อ่าน Troubleshooting section หรือดู [GitHub Docs](https://docs.github.com)

