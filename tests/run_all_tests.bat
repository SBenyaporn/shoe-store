@echo off
REM Script to run all Robot Framework tests on Windows

echo Starting Robot Framework tests...
echo ================================

REM Create results directory if it doesn't exist
if not exist results mkdir results

REM Run all tests
robot --outputdir results --log results\log.html --report results\report.html --xunit results\xunit.xml test_suites\

echo ================================
echo Tests completed! Check results\ directory for reports.
pause



