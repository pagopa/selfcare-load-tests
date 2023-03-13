import { setStages } from '../utils/stageUtils.js'

const vu = __ENV.VIRTUAL_USERS_ENV ? __ENV.VIRTUAL_USERS_ENV : 3

const scenarioPerVuExecutions = __ENV.SCENARIO_PER_VU_EXECUTIONS_ENV
    ? __ENV.SCENARIO_PER_VU_EXECUTIONS_ENV
    : 1
const scenarioPerVuDuration = __ENV.SCENARIO_PER_VU_DURATION_ENV
    ? __ENV.SCENARIO_PER_VU_DURATION_ENV
    : 10

const scenarioRampTimeUnit = __ENV.SCENARIO_RAMP_TIME_UNIT_ENV
    ? __ENV.SCENARIO_RAMP_TIME_UNIT_ENV
    : 1
const scenarioRampCustomStages = setStages(
    vu,
    scenarioRampTimeUnit,
    __ENV.SCENARIO_RAMP_STAGE_NUMBER_ENV > 3
        ? __ENV.SCENARIO_RAMP_STAGE_NUMBER_ENV
        : 3
)

export const scenarios = {
    rampingArrivalRate: {
        executor: 'ramping-arrival-rate', //Number of VUs to pre-allocate before test start to preserve runtime resources
        timeUnit: `${scenarioRampTimeUnit}s`, //period of time to apply the iteration
        preAllocatedVUs: vu,
        maxVUs: vu,
        stages: scenarioRampCustomStages,
    },
    perVuIterations: {
        executor: 'per-vu-iterations',
        vus: vu,
        iterations: scenarioPerVuExecutions,
        startTime: '0s',
        maxDuration: `${scenarioPerVuDuration}s`,
    },
}

const options = {
    scenarios,
}

if (__ENV.SCENARIO_TYPE_ENV) {
    options.scenarios[__ENV.SCENARIO_TYPE_ENV] =
        scenarios[__ENV.SCENARIO_TYPE_ENV] // Use just a single scenario if ` -e SCENARIO_TYPE_ENV` is used
} else {
    options.scenarios = scenarios // Use all scenrios
}

export const thresholds = {
    checks: [
        {
            threshold: 'rate==1', // pass all checks
            abortOnFail: false,
            delayAbortEval: '10s',
        },
    ],
    http_req_failed: [
        {
            threshold: 'rate<0.01', // http errors should be less than 1%
            abortOnFail: false,
            delayAbortEval: '10s',
        },
    ],
    http_req_duration: [
        {
            threshold: 'avg<500', // the avg of requests should be below 500ms
            abortOnFail: false,
            delayAbortEval: '10s',
        },
        {
            threshold: 'p(90)<800', // 90% of requests should be below 800ms
            abortOnFail: false,
            delayAbortEval: '10s',
        },
        {
            threshold: 'p(95)<1000', // 95% of requests should be below 1000ms
            abortOnFail: false,
            delayAbortEval: '10s',
        },
    ],
}

options.thresholds = thresholds

export default options
