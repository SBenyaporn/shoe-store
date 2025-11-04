# คู่มือแก้ปัญหา Test ที่เทสวน (Infinite Loop)

## 🔍 สาเหตุหลัก

### 1. Element ไม่พบ
**อาการ:** Test รอ element ไม่เจอ และรอวนไปเรื่อยๆ

**วิธีแก้:**
```robot
# ใช้ timeout ที่ชัดเจน
Wait Until Element Is Visible    ${locator}    timeout=15s    error=Element not visible

# หรือใช้ Try/Except
${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${locator}    5s
Run Keyword If    ${status} == False    Fail    Element ${locator} not found
```

### 2. Page ไม่โหลดเสร็จ
**อาการ:** Test คลิก element แต่ยังไม่พร้อม

**วิธีแก้:**
```robot
# เพิ่ม Wait For Condition
Wait For Condition    return document.readyState === "complete"    timeout=10s
Wait For Condition    return window.jQuery === undefined || jQuery.active === 0    timeout=10s
```

### 3. React Component ยังไม่ Render
**อาการ:** Element มีอยู่ใน DOM แต่ยังไม่พร้อมใช้งาน

**วิธีแก้:**
```robot
# รอให้ React เสร็จ
Wait For Condition    return document.querySelector('[data-reactroot]') !== null || document.getElementById('root').children.length > 0    timeout=15s
```

### 4. Navigation Redirect Loop
**อาการ:** หน้า redirect หลายครั้ง

**วิธีแก้:**
```robot
# ตรวจสอบ URL ก่อนรอ
${current_url}=    Get Location
Should Not Contain    ${current_url}    redirect
Wait Until Location Contains    expected_path    timeout=10s
```

## 🛠️ คำสั่งสำหรับ Debug

### รัน Test เดียว
```bash
robot --test "Display Products In Shop" test_suites/02_shop.robot
```

### รัน Test พร้อม Debug Log
```bash
robot --loglevel DEBUG test_suites/01_navigation.robot
```

### รัน Test พร้อม Screenshot เมื่อ Fail
```bash
robot --outputdir results --screenshotonfailure test_suites/
```

### รัน Test แบบ Stop on First Failure
```bash
robot --exitonfailure test_suites/
```

### ดู Log Files
```bash
# ดู log.html
# หรือดู output.xml สำหรับ detailed info
```

## ⚙️ ปรับปรุง Keywords

### เพิ่ม Error Handling
```robot
Click Element Safely With Retry
    [Arguments]    ${locator}    ${retries}=3
    FOR    ${i}    IN RANGE    ${retries}
        ${status}    Run Keyword And Return Status    Click Element    ${locator}
        Exit For Loop If    ${status} == True
        Sleep    1s
    END
    Should Be True    ${status} == True    Failed to click ${locator} after ${retries} retries
```

### เพิ่ม Page Load Check
```robot
Wait For React Ready
    [Documentation]    Wait for React application to be ready
    Wait For Condition    return typeof React !== 'undefined' || document.querySelector('[data-reactroot]') !== null    timeout=15s
    Wait For Condition    return document.readyState === "complete"    timeout=10s
```

## 🚨 Emergency Stop

### หยุด Test ทันที
กด `Ctrl+C` ใน terminal

### Clear Browser State
```robot
Clear All
    [Documentation]    Clear everything
    Delete All Cookies
    Execute JavaScript    localStorage.clear(); sessionStorage.clear();
    Reload Page
```

## 📝 Best Practices

1. **ใช้ Explicit Waits** - ไม่ใช้ implicit waits
2. **Set Timeout ที่เหมาะสม** - ไม่น้อยเกินไป
3. **Handle Errors** - ใช้ Try/Except เมื่อจำเป็น
4. **Log Debug Info** - เพิ่ม log เพื่อ debug
5. **Screenshot on Failure** - เก็บ screenshot เมื่อ fail
6. **Clean State** - Clear localStorage/cookies ก่อน test ใหม่

## 🔧 Quick Fix Commands

```bash
# รัน test suite เดียวเพื่อหาปัญหา
robot --test "Navigate To Home Page" test_suites/01_navigation.robot

# รันพร้อม verbose logging
robot --loglevel TRACE test_suites/01_navigation.robot

# รันพร้อม screenshot
robot --screenshotonfailure:all --outputdir results test_suites/
```



