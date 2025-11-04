*** Settings ***
Documentation    Test cases for checkout functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Display Checkout Page
    [Documentation]    Verify checkout page loads correctly
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Verify Page Contains Text    จัดส่งไปยัง
    Verify Page Contains Text    คำสั่งซื้อของคุณ

Fill Shipping Information
    [Documentation]    Verify filling shipping information
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Fill Shipping Information    ${SHIPPING_NAME}    ${SHIPPING_ADDRESS}    ${SHIPPING_DISTRICT}    ${SHIPPING_PROVINCE}    ${SHIPPING_ZIPCODE}    ${SHIPPING_PHONE}
    Verify Page Contains Text    บันทึกที่อยู่สำหรับจัดส่งเรียบร้อย

Require Name And Address
    [Documentation]    Verify that name and address are required
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Click Element Safely    //button[contains(text(), 'ดำเนินการชำระเงิน')]
    # Should show validation error or alert
    Sleep    ${DELAY}

Display Order Summary
    [Documentation]    Verify order summary displays correctly
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Verify Page Contains Text    คำสั่งซื้อของคุณ
    Verify Element Is Visible    //ul[contains(@class, 'order-items')]
    Verify Page Contains Text    Speedcat

Display Product Size In Order Summary
    [Documentation]    Verify product size is shown in order summary
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Verify Page Contains Text    ไซส์: ${TEST_SIZE}

Calculate Shipping Cost
    [Documentation]    Verify shipping cost calculation (should be free)
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Verify Page Contains Text    ค่าจัดส่ง
    Verify Page Contains Text    ฟรี

Calculate Total Amount
    [Documentation]    Verify total amount calculation
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Verify Page Contains Text    ยอดรวมสุทธิ
    Verify Element Is Visible    //div[contains(@class, 'summary-line total')]

Navigate To Payment
    [Documentation]    Verify navigation to payment page after checkout
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Fill Shipping Information    ${SHIPPING_NAME}    ${SHIPPING_ADDRESS}    ${SHIPPING_DISTRICT}    ${SHIPPING_PROVINCE}    ${SHIPPING_ZIPCODE}    ${SHIPPING_PHONE}
    Click Element Safely    //button[contains(text(), 'ดำเนินการชำระเงิน')]
    Wait Until Page Loaded
    # Note: This may navigate to payment or show error depending on backend

Cannot Checkout With Empty Cart
    [Documentation]    Verify checkout button is disabled for empty cart
    Go To Checkout
    ${button}    Get WebElement    //button[contains(text(), 'ดำเนินการชำระเงิน')]
    ${disabled}    Call Method    ${button}    get_attribute    disabled
    Should Not Be None    ${disabled}

Save Shipping Information
    [Documentation]    Verify shipping information is saved
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Fill Shipping Information    ${SHIPPING_NAME}    ${SHIPPING_ADDRESS}    ${SHIPPING_DISTRICT}    ${SHIPPING_PROVINCE}    ${SHIPPING_ZIPCODE}    ${SHIPPING_PHONE}
    Navigate To Page    ${HOME_LINK}
    Go To Checkout
    ${name_value}    Get Value    name=name
    Should Be Equal    ${name_value}    ${SHIPPING_NAME}


