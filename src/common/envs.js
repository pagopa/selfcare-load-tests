import { check } from 'k6'
import { exec } from 'k6/execution'
import { assert, statusOk } from '../utils/assertions.js'
import { getInstitutions } from '../api/dashboard.js'

if (!__ENV.AUTHORIZATION_TOKEN) {
    throw new Error('AUTHORIZATION_TOKEN environment variable not defined!')
}

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

export function abort(description) {
    description = `Aborting execution due to: ${description}`
    if (exec) {
        console.error(description)
        exec.test.abort()
    } else {
        throw new Error(description)
    }
}

export function getBaseUrl(operationAvailableEnvs) {
    if (
        !isEnvValid(__ENV.TARGET_ENV) ||
        !isTestEnabledOnEnv(__ENV.TARGET_ENV, operationAvailableEnvs)
    ) {
        abort('Environment selected not allowed for the test')
        return null
    } else {
        return ENV[__ENV.TARGET_ENV].baseUrl
    }
}

export function retrieveInstitutionId(baseUrl) {
    if (__ENV.INSTITUTION_ID) {
        return __ENV.INSTITUTION_ID
    } else {
        const result = getInstitutions(baseUrl)
        assert(result, [statusOk()])

        if (
            check(result, {
                'There is at least one institution': (body) =>
                    body.length && body.length > 0,
            })
        ) {
            return result[0].id
        } else {
            abort(
                `No available institutions have been found for the provided authToken (retrieved status ${result.status})`
            )
            return null
        }
    }
}
