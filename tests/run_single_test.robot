*** Settings ***
Documentation    Run single test case for debugging
Resource    resources/Keywords.robot
Resource    resources/Variables.robot

Suite Setup    Open Application
Suite Teardown    Close Application
Test Setup    Clear Local Storage

*** Test Cases ***
Single Test - Navigate To Home
    [Documentation]    Simple test to verify navigation works
    Navigate To Page    ${HOME_LINK}
    Verify Page Contains Text    Shoe store
    [Teardown]    Log    Test completed



