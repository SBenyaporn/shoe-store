@echo off
REM 🚀 Script สำหรับ Deploy React + Vite App (Windows)

echo 🚀 เริ่มต้น Deploy Process...

REM ตรวจสอบว่าอยู่ใน directory ที่ถูกต้อง
if not exist "my-app" (
    echo ❌ ไม่พบ directory my-app
    exit /b 1
)

cd my-app

REM ตรวจสอบว่า build ผ่านหรือไม่
echo 📦 กำลัง Build Project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build ล้มเหลว!
    exit /b 1
)

echo ✅ Build สำเร็จ!

REM ถามว่าต้องการ deploy ไปที่ไหน
echo.
echo เลือก Platform ที่ต้องการ Deploy:
echo 1) Vercel
echo 2) Netlify
echo 3) แค Build (ไม่ deploy)
echo.
set /p choice="เลือก (1-3): "

if "%choice%"=="1" (
    echo 🚀 Deploying to Vercel...
    vercel --prod
    if %errorlevel% neq 0 (
        echo ❌ ไม่พบ Vercel CLI
        echo ติดตั้งด้วย: npm install -g vercel
        exit /b 1
    )
) else if "%choice%"=="2" (
    echo 🚀 Deploying to Netlify...
    netlify deploy --prod --dir=dist
    if %errorlevel% neq 0 (
        echo ❌ ไม่พบ Netlify CLI
        echo ติดตั้งด้วย: npm install -g netlify-cli
        exit /b 1
    )
) else if "%choice%"=="3" (
    echo ✅ Build เสร็จแล้ว! ไฟล์อยู่ใน my-app/dist/
) else (
    echo ❌ เลือกไม่ถูกต้อง
    exit /b 1
)

echo ✅ เสร็จสิ้น!

