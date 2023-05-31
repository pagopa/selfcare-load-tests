import http from 'k6/http'
import { logResult } from '../utils/utils.js'
import { defaultHeaders } from '../config/envVars.js'

const API_PREFIX = '/onboarding/v1'

export function getInstitutionsByUser(baseUrl) {
    const res = http.get(`${baseUrl}${API_PREFIX}/institutions`, defaultHeaders)
    logResult('getInstitutionsByUser', 200, res)
    return res
}

export function onboardingSubmit(baseUrl) {
    const payload = JSON.stringify({
        billingData: {
            certified: true,
            businessName: 'Marco Tullio Cicerone',
            taxCode: __ENV.EXTERNAL_INSTITUTION_ID,
            digitalAddress: 'email@emailtest.com',

            registeredOffice: 'a',
            zipCode: 'a',
            recipientCode: 'a',
            registeredOffice: 'a',
            vatNumber: 'a',
        },
        users: [
            {
                taxCode: __ENV.EXTERNAL_INSTITUTION_ID,
                name: 'Marco Tullio',
                surname: 'Cicerone',
                email: 'MarcoTullio@test.spqr',
                role: 'MANAGER',
            },
        ],
        geographicTaxonomies: [{ code: 'C', desc: 'C' }],
        institutionType: 'PG',
    })
    const res = http.post(
        `${baseUrl}${API_PREFIX}/institutions/${__ENV.EXTERNAL_INSTITUTION_ID}/products/${__ENV.PRODUCT_ID}/onboarding`,
        payload,
        defaultHeaders
    )
    logResult('onboardingSubmit', 409, res)
    return res
}
