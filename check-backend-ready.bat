@echo off
REM Script สำหรับตรวจสอบว่า Backend พร้อม Deploy หรือยัง (Windows)

echo 🔍 กำลังตรวจสอบ Backend...
echo.

REM ตรวจสอบว่า backend folder มีอยู่
if not exist "backend" (
    echo ❌ ไม่พบ backend folder
    exit /b 1
) else (
    echo ✅ พบ backend folder
)

REM ตรวจสอบ package.json
if not exist "backend\package.json" (
    echo ❌ ไม่พบ backend/package.json
    exit /b 1
) else (
    echo ✅ พบ backend/package.json
)

REM ตรวจสอบ src/index.js
if not exist "backend\src\index.js" (
    echo ❌ ไม่พบ backend/src/index.js
    exit /b 1
) else (
    echo ✅ พบ backend/src/index.js
)

REM ตรวจสอบ start script ด้วย Node.js
if exist "node.exe" (
    node check-backend-ready.js
) else (
    echo.
    echo ⚠️  ไม่พบ Node.js สำหรับตรวจสอบรายละเอียด
    echo ✅ ตรวจสอบพื้นฐานผ่านแล้ว
    echo.
    echo 📚 ขั้นตอนต่อไป:
    echo    1. Push โค้ดไป GitHub
    echo    2. ไปที่ render.com
    echo    3. สร้าง Web Service
    echo    4. ตั้งค่า Root Directory = "backend"
    echo    5. เพิ่ม Environment Variables
    echo.
    echo 📖 อ่านคู่มือละเอียด: RENDER_DEPLOY_BACKEND.md
)

