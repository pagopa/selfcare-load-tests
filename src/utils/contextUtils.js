import { check } from 'k6'
import { assert, statusOk } from '../utils/assertions.js'
import { getInstitutions } from '../api/dashboard.js'
import { abort } from './utils.js'
import { CONFIG } from '../config/envVars.js'

export function retrieveInstitutionId(baseUrl) {
    if (CONFIG.CONTEXT_DATA.INSTITUTION_ID !== 'Auto') {
        return CONFIG.CONTEXT_DATA.INSTITUTION_ID
    } else {
        const result = getInstitutions(baseUrl)
        assert(result, [statusOk()])

        const bodyStr =
            result.body && result.body.length && result.body.length > 0
                ? result.body
                : undefined
        const body = bodyStr ? JSON.parse(bodyStr) : undefined
        const activeInstitutions =
            body && body.length && body.length > 0
                ? body.filter((i) => i.status === 'ACTIVE')
                : undefined

        if (
            check(body, {
                'There is at least 1 ACTIVE institution': (body) =>
                    activeInstitutions && activeInstitutions.length > 0,
            })
        ) {
            return activeInstitutions[0].id
        } else {
            abort(
                `No available institutions have been found for the provided authToken (retrieved status ${result.status})`
            )
            return null
        }
    }
}
