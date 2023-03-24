import http from 'k6/http'
import { logResult } from '../utils/utils.js'
import { defaultHeaders } from '../config/envVars.js'

const API_PREFIX = '/dashboard/v1'

export function getInstitutions(baseUrl) {
    const res = http.get(`${baseUrl}${API_PREFIX}/institutions`, defaultHeaders)
    logResult('getInstitutions', 200, res)
    return res
}

export function getInstitutionProducts(baseUrl, institutionId) {
    const res = http.get(
        `${baseUrl}${API_PREFIX}/institutions/${institutionId}/products`,
        defaultHeaders
    )
    logResult('getInstitutionProducts', 200, res)
    return res
}
