#!/bin/sh

# Execute a single test on target environment.
#
# Usage: ./run.sh <dev|uat|prod> testFile.js

export RESULTS_DIR=$RESULTS_DIR || $(dirname $0)

if [[ -z "$RESULTS_DIR" ]]; then
  export RESULTS_DIR=.
fi

K6_BINARY="k6"

set -e

ENV=$1
TEST_FILE=$2

if [[ -z "$ENV" || ! $(echo $ENV | grep  -E "^(dev|uat|prod)$") || -z "$TEST_FILE" ]]; then
  echo "Usage: ./run.sh <dev|uat|prod> testFile.js"
  exit 0
fi

if [[ -z "$AUTHORIZATION_TOKEN" ]]; then
  echo "Define env variable AUTHORIZATION_TOKEN with a valid authorization token"
  exit 0
fi

echo "Running $TEST_FILE"

mkdir -p $RESULTS_DIR/results/$(basename $(dirname $TEST_FILE))

TARGET_ENV=$ENV $K6_BINARY run $TEST_FILE