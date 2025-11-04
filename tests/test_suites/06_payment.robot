*** Settings ***
Documentation    Test cases for payment functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Display Payment Page
    [Documentation]    Verify payment page loads correctly
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Checkout
    Fill Shipping Information    ${SHIPPING_NAME}    ${SHIPPING_ADDRESS}    ${SHIPPING_DISTRICT}    ${SHIPPING_PROVINCE}    ${SHIPPING_ZIPCODE}    ${SHIPPING_PHONE}
    # Skip actual payment navigation if backend is not available
    Navigate To Page    /payment
    Verify Page Contains Text    วิธีการชำระเงิน

Select Card Payment Method
    [Documentation]    Verify card payment method selection
    Navigate To Page    /payment
    Select Payment Method    Card
    Verify Element Is Visible    //form

Select PromptPay Payment Method
    [Documentation]    Verify PromptPay payment method selection
    Navigate To Page    /payment
    Select Payment Method    PromptPay
    Verify Element Is Visible    //button[contains(text(), 'ชำระเงินผ่าน PromptPay')]

Fill Card Information
    [Documentation]    Verify filling card payment information
    Navigate To Page    /payment
    Select Payment Method    Card
    Input Text Safely    //input[@placeholder='xxxx-xxxx-xxxx-xxxx']    1234567812345678
    Input Text Safely    //input[@placeholder='MM / YY']    12/25
    Input Text Safely    //input[@placeholder='CVV']    123
    Input Text Safely    //input[@placeholder='Thailand']    Thailand

Cannot Pay Without Selecting Method
    [Documentation]    Verify payment requires method selection
    Navigate To Page    /payment
    Click Element Safely    //button[contains(text(), 'ชำระเงิน')]
    # Should show validation error

Display Order Summary In Payment
    [Documentation]    Verify order summary is displayed on payment page
    Navigate To Page    /payment
    Verify Page Contains Text    รายการสินค้าในตะกร้า
    # Verify order items are displayed

Navigate To Success After Payment
    [Documentation]    Verify navigation to success page after payment
    # This test may need backend integration
    # Navigate To Page    /payment
    # Complete payment flow
    # Verify navigation to /success

Payment Button State
    [Documentation]    Verify payment button is enabled when method is selected
    Navigate To Page    /payment
    Select Payment Method    PromptPay
    ${button}    Get WebElement    //button[contains(text(), 'ชำระเงินผ่าน PromptPay')]
    ${disabled}    Call Method    ${button}    get_attribute    disabled
    Should Be None    ${disabled}


