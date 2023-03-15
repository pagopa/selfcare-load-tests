import { exec } from 'k6/execution'

if (!__ENV.AUTHORIZATION_TOKEN) {
    abort('AUTHORIZATION_TOKEN environment variable not defined!')
}

export const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${__ENV.AUTHORIZATION_TOKEN}`,
    },
}

export const vu = __ENV.VIRTUAL_USERS_ENV ? __ENV.VIRTUAL_USERS_ENV : 3

export function logResult(opName, expectedHttpState, result) {
    if (__ENV.REQ_DUMP) {
        console.log(opName, JSON.stringify(result, null, 2))
    }
    if (result.status != expectedHttpState) {
        const resultStr = JSON.stringify(result, (key, value) =>
            key === 'Authorization' ? 'AUTHORIZATION_TOKEN from ENV' : value
        )
        console.error(`${opName} -> ${result.status} - ${resultStr}`)
    }
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
