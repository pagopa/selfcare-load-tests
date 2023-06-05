import { coalesce, abort } from '../utils/utils.js'

if (!__ENV.AUTHORIZATION_TOKEN) {
    abort('AUTHORIZATION_TOKEN environment variable not defined!')
}

const vu = __ENV.VIRTUAL_USERS_ENV ? __ENV.VIRTUAL_USERS_ENV : 3
const target = __ENV.TARGET_APP ? __ENV.TARGET_APP : 'SELFCARE'

const rampStageNumber = Math.max(
    coalesce(__ENV.SCENARIO_RAMP_STAGE_NUMBER_ENV, 3),
    3
)

export const CONFIG = {
    ENVS: {
        DEV: {
            baseUrl:
                target === 'SELFCARE'
                    ? 'https://api.dev.selfcare.pagopa.it'
                    : 'https://api-pnpg.dev.selfcare.pagopa.it',
        },
        UAT: {
            baseUrl:
                target === 'SELFCARE'
                    ? 'https://api.uat.selfcare.pagopa.it'
                    : 'https://api-pnpg.uat.selfcare.pagopa.it',
        },
        PROD: {
            baseUrl:
                target === 'SELFCARE'
                    ? 'https://api.selfcare.pagopa.it'
                    : 'https://api-pnpg.selfcare.pagopa.it',
        },
    },

    TARGET_ENV: __ENV.TARGET_ENV,
    AUTHORIZATION_TOKEN: __ENV.AUTHORIZATION_TOKEN,
    DUMP_REQUESTS: __ENV.REQ_DUMP,
    INSTITUTION_ID: __ENV.INSTITUTION_ID,

    CONTEXT_DATA: {
        institutionId: coalesce(__ENV.INSTITUTION_ID, 'Auto'),
    },

    VIRTUAL_USERS: vu,

    SCENARIOS: {
        TYPES: coalesce(__ENV.SCENARIO_TYPES_ENV, 'ALL').split(','),

        perVuIterations: {
            EXECUTIONS: coalesce(__ENV.SCENARIO_PER_VU_EXECUTIONS_ENV, 1),
            DURATION: coalesce(__ENV.SCENARIO_PER_VU_DURATION_ENV, 30),
        },

        RAMPS: {
            STAGES_NUMBER: rampStageNumber,
            STAGE_SECONDS_DURATION: coalesce(
                __ENV.SCENARIO_RAMP_TIME_UNIT_ENV,
                1
            ),

            rampingGrowingArrivalRate: {
                RAMP_BUILDING_VU_POOL: Math.min(
                    coalesce(
                        __ENV.SCENARIO_RAMP_GROWING_RAMP_BUILDING_VU_POOL,
                        Math.ceil((vu * (rampStageNumber - 1)) / 2)
                    ),
                    Math.ceil((vu * (rampStageNumber - 1)) / 2)
                ),
            },
        },
    },

    THRESHOLDS: {
        API: {
            AVG: coalesce(__ENV.THRESHOLDS_API_MAX_AVG_MS_ENV, 500),
            P90: coalesce(__ENV.THRESHOLDS_API_MAX_P90_MS_ENV, 800),
            P95: coalesce(__ENV.THRESHOLDS_API_MAX_P95_MS_ENV, 1000),
        },
        FE_PAGE: {
            AVG: coalesce(__ENV.THRESHOLDS_FE_PAGE_MAX_AVG_MS_ENV, 1000),
            P90: coalesce(__ENV.THRESHOLDS_FE_PAGE_MAX_P90_MS_ENV, 2500),
            P95: coalesce(__ENV.THRESHOLDS_FE_PAGE_MAX_P95_MS_ENV, 3000),
        },
    },

    SUMMARY: {
        RESULTS_DIR: __ENV.RESULTS_DIR,
    },
}

export const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.AUTHORIZATION_TOKEN}`,
    },
}
