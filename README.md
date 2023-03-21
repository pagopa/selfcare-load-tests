# selfcare-load-tests

This repository contains K6 scripts to run load tests for SelfCare api(s).

In order to be able to execute them, you have to [install K6](https://k6.io/docs/get-started/installation/).

See [Confluence page](https://pagopa.atlassian.net/wiki/spaces/SCP/pages/665223302/Load+testing)

## Scenarios

K6 allows to configure tests having a different [workloads](https://k6.io/docs/using-k6/scenarios/), or traffic patterns.

All configured tests as default will be executed simulating the following workloads:

-   rampingArrivalRate: a workloads having a variable number of parallel users which will run as many executions as allowed by the execution unit configured. Each variation of the number of users represent a stage: as default it will configure 3 stage (the minimum number):
    1. Starting from 0, it will grow the number of users in order to reach the maximum number of users
    2. Next it will mantain constant the number of parallel users
    3. Finally it will reduce the number of users until reach 0
-   perVuIterations: a workloads having a fixed number of execution performed by a fixed number of users

## Configuration

The following environment variables allow to configure tests behaviors:

| ENV                               | Description                                                                                                                 | Default |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------- |
| TARGET_ENV                        | The environment to test                                                                                                     |         |
| RESULTS_DIR                       | The directory inside which create the results dir                                                                           | .       |
| AUTHORIZATION_TOKEN               | The Bearer token to authorize requests                                                                                      |         |
| REQ_DUMP                          | A boolen to log all requests or not                                                                                         | false   |
| VIRTUAL_USERS_ENV                 | The number of parallel users to simulate                                                                                    | 3       |
| SCENARIO_TYPE_ENV                 | The scenario to execute, if you want to execute just a single one. Use the keys listed in [Scenarios](#scenarios) paragraph |         |
| SCENARIO_RAMP_TIME_UNIT_ENV       | rampingArrivalRate scenario: the duration (seconds) of single ramp stage                                                    | 1       |
| SCENARIO_RAMP_STAGE_NUMBER_ENV    | rampingArrivalRate scenario: the number of stages of the ramp                                                               | 3       |
| SCENARIO_PER_VU_EXECUTIONS_ENV    | perVuIterations scenario: the number of executions which each user will perform                                             | 1       |
| SCENARIO_PER_VU_DURATION_ENV      | perVuIterations scenario: the maximum number of seconds to wait for a single iteration                                      | 10      |
| THRESHOLDS_API_MAX_AVG_MS_ENV     | Max AVG duration applied as default to single API tests                                                                     | 500     |
| THRESHOLDS_API_MAX_P90_MS_ENV     | Max P90 duration applied as default to single API tests                                                                     | 800     |
| THRESHOLDS_API_MAX_P95_MS_ENV     | Max P95 duration applied as default to single API tests                                                                     | 1000    |
| THRESHOLDS_FE_PAGE_MAX_P95_MS_ENV | Max P95 duration applied as default to FE page tests                                                                        | 1000    |
| THRESHOLDS_FE_PAGE_MAX_P90_MS_ENV | Max P90 duration applied as default to FE page tests                                                                        | 2500    |
| THRESHOLDS_FE_PAGE_MAX_P95_MS_ENV | Max P95 duration applied as default to FE page tests                                                                        | 3000    |

## Usefull scripts

Inside the repository there are some usefull scripts which make easy to execute tests:

| SCRIPT    | Description                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| run.sh    | It allows to execute a single \*\*.js test contained inside the src/tests folder on the provided environment using the authorization token configured through the AUTHORIZATION_TOKEN environment variable |
| runAll.sh | It allows to execute all the tests contained inside the src/tests folder on the provided environment using the authorization token configured through the AUTHORIZATION_TOKEN environment variable         |

## Tests

This section will describe the tests configured inside the src/tests folder.

Where not explicitly defined, the described test will provided the default scenarios described.

### Dashboard

This section will describe the tests configured inside the src/tests/dashboard folder, which have the purpose to test the API exposed by [selfcare-dashboard-backend](selfcare-dashboard-backend) application.

| TEST            | Description                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| getInstitutions | It will test the [getInstitutions](https://github.com/pagopa/selfcare-dashboard-backend/blob/main/app/src/main/resources/swagger/api-docs.json#L50) |
