#!/usr/bin/env node

/**
 * Script สำหรับตรวจสอบว่า Backend พร้อม Deploy หรือยัง
 * ใช้: node check-backend-ready.js
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = __dirname;

const checks = [];
let hasErrors = false;

console.log('🔍 กำลังตรวจสอบ Backend...\n');

// 1. ตรวจสอบว่า backend folder มีอยู่
const backendPath = join(projectRoot, 'backend');
if (!existsSync(backendPath)) {
  console.error('❌ ไม่พบ backend folder');
  hasErrors = true;
} else {
  console.log('✅ พบ backend folder');
  checks.push({ name: 'backend folder', status: true });
}

// 2. ตรวจสอบ package.json
const packageJsonPath = join(backendPath, 'package.json');
if (!existsSync(packageJsonPath)) {
  console.error('❌ ไม่พบ backend/package.json');
  hasErrors = true;
} else {
  console.log('✅ พบ backend/package.json');
  checks.push({ name: 'package.json', status: true });

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    // ตรวจสอบ start script
    if (packageJson.scripts && packageJson.scripts.start) {
      console.log(`✅ พบ start script: "${packageJson.scripts.start}"`);
      checks.push({ name: 'start script', status: true });
    } else {
      console.error('❌ ไม่พบ start script ใน package.json');
      console.error('   ต้องมี: "scripts": { "start": "node src/index.js" }');
      hasErrors = true;
      checks.push({ name: 'start script', status: false });
    }
  } catch (err) {
    console.error('❌ ไม่สามารถอ่าน package.json ได้:', err.message);
    hasErrors = true;
  }
}

// 3. ตรวจสอบ src/index.js
const indexJsPath = join(backendPath, 'src', 'index.js');
if (!existsSync(indexJsPath)) {
  console.error('❌ ไม่พบ backend/src/index.js');
  hasErrors = true;
} else {
  console.log('✅ พบ backend/src/index.js');
  checks.push({ name: 'src/index.js', status: true });
}

// 4. ตรวจสอบว่าใช้ dotenv หรือไม่
const indexJsContent = existsSync(indexJsPath) 
  ? readFileSync(indexJsPath, 'utf-8') 
  : '';

if (indexJsContent.includes('dotenv') || indexJsContent.includes('process.env')) {
  console.log('✅ ใช้ Environment Variables');
  checks.push({ name: 'environment variables', status: true });
} else {
  console.warn('⚠️  ไม่พบการใช้ Environment Variables');
  console.warn('   แนะนำให้ใช้ dotenv สำหรับ production');
  checks.push({ name: 'environment variables', status: false });
}

// 5. ตรวจสอบ .env.example
const envExamplePath = join(backendPath, '.env.example');
if (existsSync(envExamplePath)) {
  console.log('✅ พบ .env.example');
  checks.push({ name: '.env.example', status: true });
} else {
  console.warn('⚠️  ไม่พบ .env.example (ไม่จำเป็นแต่แนะนำ)');
  checks.push({ name: '.env.example', status: false });
}

// 6. ตรวจสอบ dependencies
try {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = ['express'];
  const missingDeps = requiredDeps.filter(dep => !deps[dep]);
  
  if (missingDeps.length === 0) {
    console.log('✅ Dependencies พื้นฐานครบ');
    checks.push({ name: 'dependencies', status: true });
  } else {
    console.warn(`⚠️  Dependencies ที่ขาด: ${missingDeps.join(', ')}`);
    checks.push({ name: 'dependencies', status: false });
  }
} catch (err) {
  // Skip ถ้าไม่สามารถอ่านได้
}

// สรุปผล
console.log('\n' + '='.repeat(50));
console.log('📊 สรุปผลการตรวจสอบ:');
console.log('='.repeat(50));

const passed = checks.filter(c => c.status).length;
const total = checks.length;

checks.forEach(check => {
  const icon = check.status ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
});

console.log('\n' + '='.repeat(50));
console.log(`ผลลัพธ์: ${passed}/${total} ผ่าน`);

if (hasErrors) {
  console.log('\n❌ ยังมีปัญหาที่ต้องแก้ไขก่อน Deploy');
  console.log('\n📚 อ่านคู่มือ: RENDER_DEPLOY_BACKEND.md');
  process.exit(1);
} else {
  console.log('\n✅ Backend พร้อม Deploy!');
  console.log('\n📚 ขั้นตอนต่อไป:');
  console.log('   1. Push โค้ดไป GitHub');
  console.log('   2. ไปที่ render.com');
  console.log('   3. สร้าง Web Service');
  console.log('   4. ตั้งค่า Root Directory = "backend"');
  console.log('   5. เพิ่ม Environment Variables');
  console.log('\n📖 อ่านคู่มือละเอียด: RENDER_DEPLOY_BACKEND.md');
  process.exit(0);
}

