import { CONFIG } from '../config/envVars.js'
import { abort } from '../utils/utils.js'

export const DEV = 'DEV'
export const UAT = 'UAT'
export const PROD = 'PROD'

export const VALID_ENVS = [DEV, UAT, PROD]

export function isEnvValid(env) {
    return VALID_ENVS.includes(env)
}

export function isTestEnabledOnEnv(env, registeredEnvs) {
    return registeredEnvs.includes(env)
}

export function getBaseUrl(operationAvailableEnvs) {
    if (
        !isEnvValid(CONFIG.TARGET_ENV) ||
        !isTestEnabledOnEnv(CONFIG.TARGET_ENV, operationAvailableEnvs)
    ) {
        abort('Environment selected not allowed for the test')
        return null
    } else {
        return CONFIG.ENVS[CONFIG.TARGET_ENV].baseUrl
    }
}
