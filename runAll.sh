
#
# Quickly perform a load tests on target environment by running each
# test found under src/tests/[folder] once (if folder is not provided, it will run all tests).
#
# Usage: ./runAll.sh <dev|uat|prod> [folder]

CURRENT_DIR=$(dirname $0)

TESTS_DIR=$CURRENT_DIR"/src/tests"
K6_TEST_FILEEXT=".js"

set -e

ENV=$1
FOLDER=$2

if [[ -z "$ENV" || ! "$ENV" =~ ^(dev|uat|prod)$ ]]; then
  echo "Usage: ./runAll.sh <dev|uat|prod> [folder]"
  exit 0
fi

for TEST in $(find $TESTS_DIR/$FOLDER -iname *$K6_TEST_FILEEXT); do
	$CURRENT_DIR/run.sh $ENV $TEST
done;