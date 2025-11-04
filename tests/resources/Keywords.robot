*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource    Variables.robot

*** Keywords ***
Open Application
    [Documentation]    Opens the browser and navigates to the application
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Timeout    ${TIMEOUT}
    Set Selenium Implicit Wait    0s
    ${status}    Run Keyword And Return Status    Wait Until Page Contains Element    //nav    timeout=10s
    Run Keyword If    ${status} == False    Fail    Application did not load - Navbar not found

Close Application
    [Documentation]    Closes the browser
    Close All Browsers

Navigate To Page
    [Arguments]    ${page_path}
    [Documentation]    Navigates to a specific page
    Go To    ${BASE_URL}${page_path}
    Wait Until Page Loaded

Wait Until Page Loaded
    [Documentation]    Waits until the page is fully loaded with fail-safe
    [Arguments]    ${max_wait}=10s
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    //body    timeout=${max_wait}
    Run Keyword If    ${status} == False    Fail    Page did not load within ${max_wait}
    # Wait for page ready state (with timeout)
    ${status}    Run Keyword And Return Status    Wait For Condition    return document.readyState === "complete"    timeout=5s
    # If condition fails, still continue (React might handle differently)
    Sleep    0.3s

Click Element Safely
    [Arguments]    ${locator}    ${max_wait}=${TIMEOUT}
    [Documentation]    Clicks an element with error handling and fail-safe
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${locator}    timeout=${max_wait}
    Run Keyword If    ${status} == False    Fail    Element ${locator} not found after ${max_wait}
    ${status}    Run Keyword And Return Status    Wait Until Element Is Enabled    ${locator}    timeout=5s
    Run Keyword If    ${status} == False    Log    Element ${locator} is not enabled, trying anyway    WARN
    Scroll Element Into View    ${locator}
    ${status}    Run Keyword And Return Status    Click Element    ${locator}
    Run Keyword If    ${status} == False    Fail    Failed to click element ${locator}
    Sleep    0.3s

Input Text Safely
    [Arguments]    ${locator}    ${text}    ${max_wait}=${TIMEOUT}
    [Documentation]    Inputs text into an element with error handling
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${locator}    timeout=${max_wait}
    Run Keyword If    ${status} == False    Fail    Element ${locator} not found after ${max_wait}
    Clear Element Text    ${locator}
    Input Text    ${locator}    ${text}
    Sleep    0.3s

Verify Page Contains Text
    [Arguments]    ${expected_text}    ${max_wait}=${TIMEOUT}
    [Documentation]    Verifies that the page contains the expected text with fail-safe
    ${status}    Run Keyword And Return Status    Wait Until Page Contains    ${expected_text}    timeout=${max_wait}
    Run Keyword If    ${status} == False    Fail    Page does not contain text "${expected_text}" after ${max_wait}

Verify Element Is Visible
    [Arguments]    ${locator}    ${max_wait}=${TIMEOUT}
    [Documentation]    Verifies that an element is visible with fail-safe
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${locator}    timeout=${max_wait}
    Run Keyword If    ${status} == False    Fail    Element ${locator} is not visible after ${max_wait}
    Element Should Be Visible    ${locator}

Clear Local Storage
    [Documentation]    Clears browser local storage
    Execute JavaScript    localStorage.clear();

Login User
    [Arguments]    ${email}=${VALID_EMAIL}    ${password}=${VALID_PASSWORD}
    [Documentation]    Logs in a user
    Navigate To Page    ${LOGIN_LINK}
    Input Text Safely    name=email    ${email}
    Input Text Safely    name=password    ${password}
    Click Element Safely    //button[@type='submit']
    Wait Until Page Loaded

Logout User
    [Documentation]    Logs out the current user
    Click Element Safely    //button[contains(text(), 'Logout')]
    Wait Until Page Loaded

Register New User
    [Arguments]    ${email}    ${password}    ${full_name}    ${phone}
    [Documentation]    Registers a new user
    Navigate To Page    ${REGISTER_LINK}
    Input Text Safely    name=fullName    ${full_name}
    Input Text Safely    name=phone    ${phone}
    Input Text Safely    name=email    ${email}
    Input Text Safely    name=password    ${password}
    Input Text Safely    name=confirm    ${password}
    Click Element Safely    //button[@type='submit']
    Wait Until Page Loaded

Add Product To Cart
    [Arguments]    ${product_id}    ${size}=${TEST_SIZE}
    [Documentation]    Adds a product to cart from product detail page
    Navigate To Page    /product/${product_id}
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    id=size-select    timeout=${TIMEOUT}
    Run Keyword If    ${status} == False    Fail    Size selector not found for product ${product_id}
    Select From List By Value    id=size-select    ${size}
    Click Element Safely    //button[contains(text(), 'สั่งซื้อสินค้านี้')]

Add Product To Cart From Shop
    [Arguments]    ${product_name}
    [Documentation]    Adds a product to cart from shop page
    Navigate To Page    ${SHOP_LINK}
    Click Element Safely    //img[@alt='${product_name}']
    Wait Until Page Loaded
    Add Product To Cart    ${product_id}

Add Product To Favorites
    [Arguments]    ${product_id}
    [Documentation]    Adds a product to favorites
    Navigate To Page    /product/${product_id}
    Click Element Safely    //button[contains(text(), 'เพิ่มไปยังรายการโปรด')]

Go To Cart
    [Documentation]    Navigates to cart page
    Navigate To Page    ${CART_LINK}
    Wait Until Page Loaded

Go To Checkout
    [Documentation]    Navigates to checkout page
    Navigate To Page    ${CART_LINK}
    Click Element Safely    //button[contains(text(), 'ดำเนินการชำระเงิน')]
    Wait Until Page Loaded

Fill Shipping Information
    [Arguments]    ${name}    ${address}    ${district}    ${province}    ${zipcode}    ${phone}
    [Documentation]    Fills shipping information in checkout page
    Input Text Safely    name=name    ${name}
    Input Text Safely    name=address    ${address}
    Input Text Safely    name=district    ${district}
    Input Text Safely    name=province    ${province}
    Input Text Safely    name=zipcode    ${zipcode}
    Input Text Safely    name=phone    ${phone}
    Click Element Safely    //button[contains(text(), 'บันทึกการจัดส่ง')]

Select Payment Method
    [Arguments]    ${method}
    [Documentation]    Selects a payment method (card or promptpay)
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    //div[contains(text(), '${method}')]    timeout=${TIMEOUT}
    Run Keyword If    ${status} == False    Fail    Payment method ${method} not found
    Click Element Safely    //div[contains(text(), '${method}')]

Search Product
    [Arguments]    ${search_term}
    [Documentation]    Searches for a product in shop page
    Navigate To Page    ${SHOP_LINK}
    ${status}    Run Keyword And Return Status    Input Text Safely    //input[@type='text' or @placeholder]    ${search_term}
    Run Keyword If    ${status} == False    Log    Search input not found, skipping    WARN
    Sleep    0.3s

Verify Cart Contains Product
    [Arguments]    ${product_name}
    [Documentation]    Verifies that cart contains a specific product
    Go To Cart
    Verify Page Contains Text    ${product_name}

Verify Cart Is Empty
    [Documentation]    Verifies that cart is empty
    Go To Cart
    Verify Page Contains Text    ตะกร้าของคุณว่างเปล่า
