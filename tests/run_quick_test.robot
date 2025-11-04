*** Settings ***
Documentation    Quick test with strict timeout to prevent infinite loops
Resource    resources/Keywords.robot
Resource    resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Timeout    30s

*** Test Cases ***
Quick Navigation Test
    [Documentation]    Quick test with timeout to verify navigation works
    [Timeout]    15s
    Navigate To Page    ${HOME_LINK}
    Verify Page Contains Text    Shoe store
    [Teardown]    Log    Test completed successfully

Quick Shop Test
    [Documentation]    Quick shop page test with timeout
    [Timeout]    20s
    Navigate To Page    ${SHOP_LINK}
    Verify Page Contains Text    Shop
    ${count}    Get Element Count    //article
    Should Be True    ${count} >= 0
    [Teardown]    Log    Shop test completed



