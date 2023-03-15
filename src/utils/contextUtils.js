import { check } from 'k6'
import { assert, statusOk } from '../utils/assertions.js'
import { getInstitutions } from '../api/dashboard.js'
import { abort } from './utils.js'

export function retrieveInstitutionId(baseUrl) {
    if (__ENV.INSTITUTION_ID) {
        return __ENV.INSTITUTION_ID
    } else {
        const result = getInstitutions(baseUrl)
        assert(result, [statusOk()])

        const bodyStr =
            result.body && result.body.length && result.body.length > 0
                ? result.body
                : undefined
        const body = bodyStr ? JSON.parse(bodyStr) : undefined

        if (
            check(body, {
                'There is at least 1 institution': (body) =>
                    body && body.length && body.length > 0,
            })
        ) {
            return body[0].id
        } else {
            abort(
                `No available institutions have been found for the provided authToken (retrieved status ${result.status})`
            )
            return null
        }
    }
}
