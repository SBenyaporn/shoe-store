@echo off
REM Script สำหรับ Push โค้ดไป GitHub

echo 📤 กำลังเตรียม Push โค้ดไป GitHub...
echo.

REM ตรวจสอบว่าเป็น Git repository หรือยัง
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ยังไม่มี Git repository
    echo กำลังเริ่ม Git repository...
    git init
    echo ✅ สร้าง Git repository สำเร็จ
    echo.
)

REM แสดงสถานะปัจจุบัน
echo 📊 สถานะปัจจุบัน:
git status --short
echo.

REM ถามว่าต้องการเพิ่มไฟล์ทั้งหมดหรือไม่
set /p addFiles="ต้องการเพิ่มไฟล์ทั้งหมด (y/n)? "
if /i "%addFiles%"=="y" (
    echo.
    echo 📦 กำลังเพิ่มไฟล์ทั้งหมด...
    git add .
    echo ✅ เพิ่มไฟล์สำเร็จ
    echo.
)

REM แสดงสถานะหลัง add
echo 📊 ไฟล์ที่พร้อม Commit:
git status --short
echo.

REM ถามว่าต้องการ Commit หรือไม่
set /p doCommit="ต้องการ Commit (y/n)? "
if /i "%doCommit%"=="y" (
    set /p commitMsg="ใส่ Commit Message: "
    if "%commitMsg%"=="" set commitMsg=Update project
    echo.
    echo 💾 กำลัง Commit...
    git commit -m "%commitMsg%"
    echo ✅ Commit สำเร็จ
    echo.
)

REM ตรวจสอบว่ามี remote หรือยัง
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ยังไม่มี Remote Repository
    echo.
    echo กรุณาเพิ่ม Remote Repository:
    echo   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    echo.
    set /p addRemote="ต้องการเพิ่ม Remote ตอนนี้ (y/n)? "
    if /i "%addRemote%"=="y" (
        set /p remoteUrl="ใส่ GitHub Repository URL: "
        git remote add origin "%remoteUrl%"
        echo ✅ เพิ่ม Remote สำเร็จ
        echo.
    ) else (
        echo ⚠️  ข้ามการเพิ่ม Remote - กรุณาเพิ่มเองก่อน Push
        pause
        exit /b 0
    )
) else (
    echo ✅ พบ Remote Repository:
    git remote get-url origin
    echo.
)

REM ถามว่าต้องการ Push หรือไม่
set /p doPush="ต้องการ Push ไป GitHub (y/n)? "
if /i "%doPush%"=="y" (
    echo.
    echo 🚀 กำลัง Push ไป GitHub...
    echo.
    echo ⚠️  ถ้าเป็นครั้งแรก จะถาม Username และ Password
    echo    Password = Personal Access Token (ไม่ใช่ Password จริง)
    echo.
    git push -u origin main
    if %errorlevel% equ 0 (
        echo.
        echo ✅ Push สำเร็จ!
        echo.
        echo 📚 ดู Repository: https://github.com/wipawa2345/ShoeStore
    ) else (
        echo.
        echo ❌ Push ล้มเหลว
        echo.
        echo 💡 ตรวจสอบ:
        echo    - Username และ Token ถูกต้อง
        echo    - Repository URL ถูกต้อง
        echo    - มีสิทธิ์เข้าถึง Repository
    )
) else (
    echo ⚠️  ข้ามการ Push
)

echo.
echo ✅ เสร็จสิ้น!
echo.
pause

