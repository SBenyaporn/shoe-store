*** Settings ***
Documentation    Test cases for favorites functionality
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Display Empty Favorites
    [Documentation]    Verify empty favorites page
    Navigate To Page    ${FAVORITES_LINK}
    Verify Page Contains Text    รายการโปรด
    Verify Page Contains Text    ยังไม่มีสินค้าในรายการโปรด

Add Product To Favorites
    [Documentation]    Verify adding product to favorites
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    Verify Page Contains Text    Speedcat

Remove Product From Favorites
    [Documentation]    Verify removing product from favorites
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    Click Element Safely    //button[@title='ลบออกจากรายการโปรด']
    Wait Until Page Loaded
    Verify Page Contains Text    ยังไม่มีสินค้าในรายการโปรด

Add Multiple Products To Favorites
    [Documentation]    Verify adding multiple products to favorites
    Add Product To Favorites    ${PRODUCT_ID_1}
    Add Product To Favorites    ${PRODUCT_ID_2}
    Navigate To Page    ${FAVORITES_LINK}
    ${count}    Get Element Count    //article[contains(@class, 'fav-card')]
    Should Be True    ${count} >= 2

Select Size And Add To Cart From Favorites
    [Documentation]    Verify adding product to cart from favorites with size selection
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    Select From List By Value    (//select)[1]    ${TEST_SIZE}
    Click Element Safely    (//button[contains(text(), 'เพิ่มลงตะกร้า')])[1]
    Wait Until Page Loaded
    Location Should Contain    /cart

Cannot Add To Cart Without Size
    [Documentation]    Verify that product cannot be added to cart without selecting size
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    ${button}    Get WebElement    (//button[contains(text(), 'เพิ่มลงตะกร้า')])[1]
    ${disabled}    Call Method    ${button}    get_attribute    disabled
    Should Not Be None    ${disabled}

Display Product Information In Favorites
    [Documentation]    Verify product information is displayed in favorites
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    Verify Page Contains Text    Speedcat
    Verify Element Is Visible    //article[contains(@class, 'fav-card')]//img
    Verify Page Contains Text    ฿

Navigate To Product Detail From Favorites
    [Documentation]    Verify navigation to product detail from favorites
    Add Product To Favorites    ${PRODUCT_ID_1}
    Navigate To Page    ${FAVORITES_LINK}
    Click Element Safely    //article[contains(@class, 'fav-card')]//img
    Wait Until Page Loaded
    Location Should Contain    /product/${PRODUCT_ID_1}

Handle Sold Out Products In Favorites
    [Documentation]    Verify sold out products are handled in favorites
    Add Product To Favorites    ${PRODUCT_ID_3}
    Navigate To Page    ${FAVORITES_LINK}
    Verify Page Contains Text    sold out
    # Verify that add to cart button is disabled for sold out items



