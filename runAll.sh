#!/bin/bash
#
# Quickly perform a load tests on target environment by running each
# test found under src/tests once.
#
# Usage: ./runAll.sh <dev|uat|prod>


TESTS_DIR="src/tests"
K6_TEST_FILEEXT=".js"

set -e

ENV=$1

if [[ -z "$ENV" || ! "$ENV" =~ ^(dev|uat|prod)$ ]]; then
  echo "Usage: ./runAll.sh <dev|uat|prod>"
  exit 0
fi

for TEST in $(find $TESTS_DIR -iname *$K6_TEST_FILEEXT); do
	./run.sh $ENV $TEST
done;