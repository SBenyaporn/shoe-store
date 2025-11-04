*** Settings ***
Documentation    Main test suite runner for ShoeStore application
Resource    resources/Variables.robot

*** Test Cases ***
Run All Test Suites
    [Documentation]    Runs all test suites
    [Tags]    smoke
    Log    Running all test suites...

*** Settings ***
Suite Setup    Log    Starting test execution...
Suite Teardown    Log    Test execution completed



