*** Settings ***
Documentation    Test cases for cart functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
View Empty Cart
    [Documentation]    Verify empty cart display
    Go To Cart
    Verify Page Contains Text    ตะกร้าของคุณว่างเปล่า

Add Product To Cart
    [Documentation]    Verify adding product to cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Verify Cart Contains Product    Speedcat

Increase Product Quantity
    [Documentation]    Verify increasing product quantity in cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Click Element Safely    //button[@aria-label='increase']
    Wait Until Page Loaded
    ${qty}    Get Text    //span[contains(@class, 'c-qty')]//span
    Should Be Equal    ${qty}    2

Decrease Product Quantity
    [Documentation]    Verify decreasing product quantity in cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Click Element Safely    //button[@aria-label='increase']
    Sleep    ${DELAY}
    Click Element Safely    //button[@aria-label='decrease']
    Wait Until Page Loaded
    ${qty}    Get Text    //span[contains(@class, 'c-qty')]//span
    Should Be Equal    ${qty}    1

Remove Product From Cart
    [Documentation]    Verify removing product from cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Click Element Safely    //button[@aria-label='ลบรายการ']//ancestor::button
    Wait Until Page Loaded
    Verify Cart Is Empty

Display Product Size In Cart
    [Documentation]    Verify product size is displayed in cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Verify Page Contains Text    ไซส์: ${TEST_SIZE}

Calculate Total Price
    [Documentation]    Verify total price calculation
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Verify Element Is Visible    //div[contains(@class, 'c-total')]
    Verify Page Contains Text    ฿

Navigate To Checkout
    [Documentation]    Verify navigation to checkout from cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Go To Cart
    Click Element Safely    //button[contains(text(), 'ดำเนินการชำระเงิน')]
    Wait Until Page Loaded
    Location Should Contain    /checkout

Add Multiple Products To Cart
    [Documentation]    Verify adding multiple different products to cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Navigate To Page    /product/${PRODUCT_ID_2}
    Select From List By Value    id=size-select    ${TEST_SIZE}
    Click Element Safely    //button[contains(text(), 'สั่งซื้อสินค้านี้')]
    Go To Cart
    ${count}    Get Element Count    //div[contains(@class, 'c-row')]
    Should Be True    ${count} >= 2

Clear Cart
    [Documentation]    Verify clearing all items from cart
    Add Product To Cart    ${PRODUCT_ID_1}    ${TEST_SIZE}
    Add Product To Cart    ${PRODUCT_ID_2}    ${TEST_SIZE}
    Go To Cart
    @{remove_buttons}    Get WebElements    //button[@aria-label='ลบรายการ']//ancestor::button
    FOR    ${button}    IN    @{remove_buttons}
        Click Element    ${button}
        Sleep    ${DELAY}
    END
    Verify Cart Is Empty


