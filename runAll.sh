#!/bin/sh

# Quickly perform a load tests on target environment by running each
# test found under src/tests/[folder] once (if folder is not provided, it will run all tests).
#
# Usage: ./runAll.sh <DEV|UAT|PROD> [folder]

CURRENT_DIR=$(dirname $0)

TESTS_DIR=$CURRENT_DIR"/src/tests"
K6_TEST_FILEEXT=".js"

set -e

ENV=$1
FOLDER=$2

if [[ -z "$ENV" || ! $(echo $ENV | grep  -E "^(DEV|UAT|PROD)$") ]]; then
  echo "Usage: ./runAll.sh <DEV|UAT|PROD> [folder]"
  exit 0
fi

FINAL_EXIT_CODE=0

for TEST in $(find $TESTS_DIR/$FOLDER -iname *$K6_TEST_FILEEXT); do
	$CURRENT_DIR/run.sh $ENV $TEST || TEST_EXIT_CODE=$?

  if [[ $TEST_EXIT_CODE != 0 ]]; then
    FINAL_EXIT_CODE=$TEST_EXIT_CODE
  fi
  

done;

exit $FINAL_EXIT_CODE