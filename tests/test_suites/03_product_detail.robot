*** Settings ***
Documentation    Test cases for product detail page
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Display Product Details
    [Documentation]    Verify product details are displayed correctly
    Navigate To Page    /product/${PRODUCT_ID_1}
    Verify Page Contains Text    Speedcat
    Verify Element Is Visible    //h1[contains(@class, 'product-name')]
    Verify Element Is Visible    //div[contains(@class, 'product-price')]

Display Product Images
    [Documentation]    Verify product images are displayed
    Navigate To Page    /product/${PRODUCT_ID_1}
    Verify Element Is Visible    //img[@alt='Speedcat OG Unisex']

Select Product Size
    [Documentation]    Verify size selection functionality
    Navigate To Page    /product/${PRODUCT_ID_1}
    Wait Until Element Is Visible    id=size-select    ${TIMEOUT}
    Select From List By Value    id=size-select    ${TEST_SIZE}
    ${selected}    Get Selected List Value    id=size-select
    Should Be Equal    ${selected}    ${TEST_SIZE}

Add To Cart With Size Selected
    [Documentation]    Verify adding product to cart with selected size
    Navigate To Page    /product/${PRODUCT_ID_1}
    Select From List By Value    id=size-select    ${TEST_SIZE}
    Click Element Safely    //button[contains(text(), 'สั่งซื้อสินค้านี้')]
    Wait Until Page Loaded
    Location Should Contain    /cart

Cannot Add To Cart Without Size
    [Documentation]    Verify that product cannot be added without selecting size
    Navigate To Page    /product/${PRODUCT_ID_1}
    ${button}    Get WebElement    //button[contains(text(), 'สั่งซื้อสินค้านี้')]
    ${disabled}    Call Method    ${button}    get_attribute    disabled
    Should Not Be None    ${disabled}

Add To Favorites From Detail Page
    [Documentation]    Verify adding product to favorites
    Navigate To Page    /product/${PRODUCT_ID_1}
    Click Element Safely    //button[contains(text(), 'เพิ่มไปยังรายการโปรด')]
    Wait Until Element Is Visible    //button[contains(text(), 'อยู่ในรายการโปรด')]    ${TIMEOUT}

Remove From Favorites
    [Documentation]    Verify removing product from favorites
    Navigate To Page    /product/${PRODUCT_ID_1}
    Click Element Safely    //button[contains(text(), 'เพิ่มไปยังรายการโปรด')]
    Wait Until Element Is Visible    //button[contains(text(), 'อยู่ในรายการโปรด')]    ${TIMEOUT}
    Click Element Safely    //button[contains(text(), 'อยู่ในรายการโปรด')]
    Wait Until Element Is Visible    //button[contains(text(), 'เพิ่มไปยังรายการโปรด')]    ${TIMEOUT}

View Product Description
    [Documentation]    Verify product description is displayed
    Navigate To Page    /product/${PRODUCT_ID_1}
    Verify Element Is Visible    //div[contains(@class, 'product-description')]
    Verify Page Contains Text    รายละเอียดสินค้า

Navigate Between Product Images
    [Documentation]    Verify navigation between product images
    Navigate To Page    /product/${PRODUCT_ID_1}
    Click Element Safely    //button[contains(@class, 'nav right')]
    Sleep    ${DELAY}
    Click Element Safely    //button[contains(@class, 'nav left')]
    Sleep    ${DELAY}

Display Sold Out Badge
    [Documentation]    Verify sold out badge is displayed for unavailable products
    Navigate To Page    /product/${PRODUCT_ID_3}
    Verify Page Contains Text    Sold Out
    Verify Element Is Visible    //span[contains(text(), 'Sold Out')]

Cannot Order Sold Out Product
    [Documentation]    Verify that sold out products cannot be ordered
    Navigate To Page    /product/${PRODUCT_ID_3}
    ${button}    Get WebElement    //button[contains(text(), 'สินค้าหมด')]
    ${disabled}    Call Method    ${button}    get_attribute    disabled
    Should Not Be None    ${disabled}


