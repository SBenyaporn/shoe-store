# 🔴 แก้ปัญหา Test เทสวน (Infinite Loop)

## สาเหตุหลัก

1. **Element ไม่พบ** - Wait Until รอไม่เจอ element
2. **Timeout นานเกินไป** - รอจนหมดเวลา
3. **Page ไม่โหลดเสร็จ** - React ยังไม่ render
4. **No Fail-Safe** - ไม่มี mechanism หยุดเมื่อ error

## ✅ วิธีแก้ไข

### 1. ใช้ Test Timeout
```robot
*** Settings ***
Test Timeout    30s    # หยุด test หลังจาก 30 วินาที

*** Test Cases ***
My Test
    [Timeout]    20s    # หรือตั้ง timeout แต่ละ test
    # test steps here
```

### 2. ใช้ Run Keyword And Return Status
```robot
${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${locator}    timeout=10s
Run Keyword If    ${status} == False    Fail    Element not found
```

### 3. ตั้ง Implicit Wait = 0
```robot
Set Selenium Implicit Wait    0s    # ปิด implicit wait
# ใช้ explicit wait แทน
```

### 4. เพิ่ม Fail-Safe ใน Keywords
ทุก keyword ควรมี:
- ✅ Timeout ที่ชัดเจน
- ✅ Error handling
- ✅ Fail message ที่ชัดเจน

## 🚀 คำสั่งรันที่ปลอดภัย

### รัน Test เดียวพร้อม Timeout
```bash
robot --test "Quick Navigation Test" --variable "TIMEOUT:5s" run_quick_test.robot
```

### รันพร้อม Exit on Failure
```bash
robot --exitonfailure --testtimeout 30s test_suites/01_navigation.robot
```

### รันแบบ Strict (หยุดทันทีเมื่อ fail)
```bash
robot --exitonfailure --nostatusrc --testtimeout 30s test_suites/
```

## ⚠️ Emergency Stop

### หยุด Test ทันที
- กด `Ctrl+C` ใน terminal
- หรือ `Ctrl+Break` บน Windows

### Clear All Browsers
```bash
# Kill all Chrome processes (Windows)
taskkill /F /IM chrome.exe

# Kill all Chrome processes (Linux/Mac)
pkill -f chrome
```

## 🔧 แก้ไขแล้วใน Keywords

✅ เพิ่ม `Run Keyword And Return Status` ทุกที่
✅ เพิ่ม explicit timeout ทุก wait command
✅ เพิ่ม error message ที่ชัดเจน
✅ Set Implicit Wait = 0
✅ ลด DELAY จาก 0.5s เป็น 0.3s

## 📝 ตัวอย่างการรัน

```bash
# รัน quick test (มี timeout สั้น)
robot run_quick_test.robot

# รัน test เดียวพร้อม timeout
robot --testtimeout 30s --test "Navigate To Home Page" test_suites/01_navigation.robot

# รันพร้อม exit on first failure
robot --exitonfailure --testtimeout 30s test_suites/
```

## ✅ Checklist ก่อนรัน Test

- [ ] Application รันอยู่ที่ ${BASE_URL}
- [ ] Chrome/ChromeDriver ติดตั้งแล้ว
- [ ] ใช้ timeout ที่เหมาะสม (ไม่เกิน 30s per test)
- [ ] ใช้ --exitonfailure เพื่อหยุดเมื่อ fail
- [ ] ตรวจสอบ log.html เมื่อมีปัญหา



