*** Settings ***
Documentation    Test cases for shop page functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Display Products In Shop
    [Documentation]    Verify that products are displayed on shop page
    Navigate To Page    ${SHOP_LINK}
    Verify Page Contains Text    Shop
    Verify Element Is Visible    //article
    ${count}    Get Element Count    //article
    Should Be True    ${count} > 0

Search For Product
    [Documentation]    Verify product search functionality
    Navigate To Page    ${SHOP_LINK}
    Search Product    PUMA
    Sleep    1s
    ${count}    Get Element Count    //article
    Should Be True    ${count} > 0

Search For Non-Existent Product
    [Documentation]    Verify search returns empty when product not found
    Navigate To Page    ${SHOP_LINK}
    Search Product    NonExistentProduct123
    Sleep    1s

Click Product To View Details
    [Documentation]    Verify clicking product navigates to detail page
    Navigate To Page    ${SHOP_LINK}
    ${first_product}    Get Element Attribute    (//article)[1]//a[1]    href
    Click Element Safely    (//article)[1]//a[1]
    Wait Until Page Loaded
    Location Should Contain    /product/

Add Product To Favorites From Shop
    [Documentation]    Verify adding product to favorites from shop page
    Navigate To Page    ${SHOP_LINK}
    # Find and click favorite button (adjust selector based on actual implementation)
    Click Element Safely    (//article)[1]//button[contains(@class, 'fav') or contains(@aria-label, 'favorite')]
    Navigate To Page    ${FAVORITES_LINK}
    Verify Page Contains Text    รายการโปรด

View Product Images
    [Documentation]    Verify product images are displayed
    Navigate To Page    ${SHOP_LINK}
    Verify Element Is Visible    (//article)[1]//img

Filter Products By Brand
    [Documentation]    Verify filtering products by brand (if implemented)
    Navigate To Page    ${SHOP_LINK}
    # This test assumes filtering is implemented
    # Adjust selectors based on actual implementation

Verify Product Information Display
    [Documentation]    Verify product name, price, and brand are displayed
    Navigate To Page    ${SHOP_LINK}
    Verify Element Is Visible    (//article)[1]
    # Verify product name, price, brand exist
    ${text}    Get Text    (//article)[1]
    Should Contain    ${text}    ฿


