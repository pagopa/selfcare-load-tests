#!/bin/sh

# Execute a single test on target environment.
#
# Usage: ./run.sh <DEV|UAT|PROD> testFile.js

export RESULTS_DIR=$RESULTS_DIR || $(dirname $0)

if [[ -z "$RESULTS_DIR" ]]; then
  export RESULTS_DIR=.
fi


if [[ -z "$K6_BINARY" ]]; then
  K6_BINARY="k6"
fi

set -e

FILE=./local.env
if [ -f "$FILE" ]; then
    echo "$FILE exists."
  set -o allexport
  source $FILE
  set +o allexport
fi

ENV=$1
TEST_FILE=$2

if [[ -z "$ENV" || ! $(echo $ENV | grep  -E "^(DEV|UAT|PROD)$") || -z "$TEST_FILE" ]]; then
  echo "Usage: ./run.sh <DEV|UAT|PROD> testFile.js"
  exit 0
fi

if [[ -z "$AUTHORIZATION_TOKEN" ]]; then
  echo "Define env variable AUTHORIZATION_TOKEN with a valid authorization token"
  exit 0
fi

echo "Running $TEST_FILE"

mkdir -p $RESULTS_DIR/results/$(basename $(dirname $TEST_FILE))

export K6_INFLUXDB_TAGS_AS_FIELDS=application,testName

if [[ -n "$INFLUXDB_URL" ]]; then
  for url in ${INFLUXDB_URL//;/ } ; do
    WGETRESULT=$(wget --timeout 1 --tries 1 $url 2>&1) || WGETRETURNCODE=$?
    if [[ "$WGETRESULT" =~ "404 Not Found" ]]; then
      INFLUXDB_CONFIG="--out influxdb=$url"
    fi
  done

  if [[ -z "$INFLUXDB_CONFIG" ]]; then
    echo "Cannot connect to influx db! In order to configure more than one possible url, use ; as separator: $INFLUXDB_URL"
  else
    echo "Configuring $INFLUXDB_CONFIG"
  fi
fi

TARGET_ENV=$ENV $K6_BINARY run $TEST_FILE $INFLUXDB_CONFIG