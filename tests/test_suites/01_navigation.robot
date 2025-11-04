*** Settings ***
Documentation    Test cases for navigation functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Navigate To Page    ${HOME_LINK}

*** Test Cases ***
Navigate To Home Page
    [Documentation]    Verify that home page loads correctly
    Verify Page Contains Text    Shoe store
    Verify Element Is Visible    //nav

Navigate To Shop Page
    [Documentation]    Verify navigation to shop page
    Click Element Safely    //a[@href='${SHOP_LINK}']
    Verify Page Contains Text    Shop

Navigate To Favorites Page
    [Documentation]    Verify navigation to favorites page
    Click Element Safely    //a[@href='${FAVORITES_LINK}']
    Verify Page Contains Text    รายการโปรด

Navigate To Cart Page
    [Documentation]    Verify navigation to cart page
    Click Element Safely    //a[@href='${CART_LINK}']
    Verify Page Contains Text    ตะกร้า

Navigate To Login Page
    [Documentation]    Verify navigation to login page
    Click Element Safely    //a[@href='${LOGIN_LINK}']
    Verify Page Contains Text    เข้าสู่ระบบ

Navigate To Register Page
    [Documentation]    Verify navigation to register page
    Click Element Safely    //a[@href='${LOGIN_LINK}']
    Wait Until Page Loaded
    Click Element Safely    //a[contains(text(), 'สมัครสมาชิก')]
    Verify Page Contains Text    Register

Navigate Back From Product Detail
    [Documentation]    Verify back button on product detail page
    Navigate To Page    /product/${PRODUCT_ID_1}
    Click Element Safely    //button[contains(text(), 'กลับ')]
    Wait Until Page Loaded

Verify Navbar Is Visible On All Pages
    [Documentation]    Verify navbar is visible on customer pages
    @{pages}    Create List    ${HOME_LINK}    ${SHOP_LINK}    ${FAVORITES_LINK}    ${CART_LINK}
    FOR    ${page}    IN    @{pages}
        Navigate To Page    ${page}
        Verify Element Is Visible    //nav
    END

Verify Navbar Is Hidden On Auth Pages
    [Documentation]    Verify navbar is hidden on login/register pages
    @{auth_pages}    Create List    ${LOGIN_LINK}    ${REGISTER_LINK}
    FOR    ${page}    IN    @{auth_pages}
        Navigate To Page    ${page}
        Element Should Not Be Visible    //nav
    END


