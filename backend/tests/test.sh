#!/bin/bash
TEST_PATH=./tests
ENV_FILE="$TEST_PATH/.env"

set -a
source $ENV_FILE
set +a

docker-compose -f $TEST_PATH/docker-compose.test.yml up -d
DOTENV_CONFIG_PATH=$ENV_FILE jest --coverage --detectOpenHandles

docker-compose -f $TEST_PATH/docker-compose.test.yml down