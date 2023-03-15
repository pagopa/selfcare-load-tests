import http from 'k6/http'

const API_PREFIX = '/dashboard/v1'

export function getInstitutions(baseUrl) {
    const res = http.get(`${baseUrl}${API_PREFIX}/institutions`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${__ENV.AUTHORIZATION_TOKEN}`,
        },
    })
    __ENV.REQ_DUMP === undefined || console.log(JSON.stringify(res, null, 2))
    if (res.status != 200) {
        console.error(
            `getInstitutions -> ${res.status} - ${JSON.stringify(res)}`
        )
    }
    return res
}

export function getInstitutionProducts(baseUrl, institutionId) {
    const res = http.get(
        `${baseUrl}${API_PREFIX}/institutions/${institutionId}/products`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${__ENV.AUTHORIZATION_TOKEN}`,
            },
        }
    )
    __ENV.REQ_DUMP === undefined || console.log(JSON.stringify(res, null, 2))
    if (res.status != 200) {
        console.error(
            `getInstitutionProducts -> ${res.status} - ${JSON.stringify(res)}`
        )
    }
    return res
}
