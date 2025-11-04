#!/bin/bash

# 🚀 Script สำหรับ Deploy React + Vite App

echo "🚀 เริ่มต้น Deploy Process..."

# ตรวจสอบว่าอยู่ใน directory ที่ถูกต้อง
if [ ! -d "my-app" ]; then
    echo "❌ ไม่พบ directory my-app"
    exit 1
fi

cd my-app

# ตรวจสอบว่า build ผ่านหรือไม่
echo "📦 กำลัง Build Project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build ล้มเหลว!"
    exit 1
fi

echo "✅ Build สำเร็จ!"

# ถามว่าต้องการ deploy ไปที่ไหน
echo ""
echo "เลือก Platform ที่ต้องการ Deploy:"
echo "1) Vercel"
echo "2) Netlify"
echo "3) แค Build (ไม่ deploy)"
echo ""
read -p "เลือก (1-3): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "❌ ไม่พบ Vercel CLI"
            echo "ติดตั้งด้วย: npm install -g vercel"
            exit 1
        fi
        vercel --prod
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "❌ ไม่พบ Netlify CLI"
            echo "ติดตั้งด้วย: npm install -g netlify-cli"
            exit 1
        fi
        netlify deploy --prod --dir=dist
        ;;
    3)
        echo "✅ Build เสร็จแล้ว! ไฟล์อยู่ใน my-app/dist/"
        ;;
    *)
        echo "❌ เลือกไม่ถูกต้อง"
        exit 1
        ;;
esac

echo "✅ เสร็จสิ้น!"

