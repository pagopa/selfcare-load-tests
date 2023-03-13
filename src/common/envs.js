import { exec } from 'k6/execution'

export const DEV = 'dev'
export const UAT = 'uat'
export const PROD = 'prod'

export const VALID_ENVS = [DEV, UAT, PROD]

export const ENV = {
    [DEV]: {
        baseUrl: 'https://api.dev.selfcare.pagopa.it',
    },
    [UAT]: {
        baseUrl: 'https://api.uat.selfcare.pagopa.it',
    },
    [PROD]: {
        baseUrl: 'https://api.selfcare.pagopa.it',
    },
}

export function isEnvValid(env) {
    return VALID_ENVS.includes(env)
}

export function isTestEnabledOnEnv(env, registeredEnvs) {
    return registeredEnvs.includes(env)
}

export function getBaseUrl(operationAvailableEnvs) {
    if (
        !isEnvValid(__ENV.TARGET_ENV) ||
        !isTestEnabledOnEnv(__ENV.TARGET_ENV, operationAvailableEnvs)
    ) {
        exec.test.abort()
        return null
    } else {
        return ENV[__ENV.TARGET_ENV].baseUrl
    }
}
