#!/bin/sh
#
# Execute a single test on target environment.
#
# Usage: ./run.sh <dev|uat|prod> testFile.js

K6_BINARY="k6"

set -e

ENV=$1
TEST_FILE=$2

if [[ -z "$ENV" || ! "$ENV" =~ ^(dev|uat|prod)$ || -z "$TEST_FILE" ]]; then
  echo "Usage: ./run.sh <dev|uat|prod> testFile.js"
  exit 0
fi

if [[ -z "$AUTHORIZATION_TOKEN" ]]; then
  echo "Define env variable AUTHORIZATION_TOKEN with a valid authorization token"
  exit 0
fi

echo "Running $TEST_FILE"

mkdir -p results/$(basename $(dirname $TEST_FILE))

TARGET_ENV=$ENV $K6_BINARY run $TEST_FILE