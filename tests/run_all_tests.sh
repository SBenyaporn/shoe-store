#!/bin/bash
# Script to run all Robot Framework tests

echo "Starting Robot Framework tests..."
echo "================================"

# Create results directory if it doesn't exist
mkdir -p results

# Run all tests
robot --outputdir results \
      --log results/log.html \
      --report results/report.html \
      --xunit results/xunit.xml \
      test_suites/

echo "================================"
echo "Tests completed! Check results/ directory for reports."



