import { exec } from 'k6/execution'

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

export function isNotNull(o1) {
    return o1 !== undefined && o1 !== null
}

export function isNotEmpty(o1) {
    return isNotNull(o1) && o1 !== ''
}

export function coalesce(o1, o2, testFunc = isNotNull) {
    return testFunc(o1) ? o1 : o2
}

export function coalesceString(o1, o2) {
    return coalesce(o1, o2, isNotEmpty)
}
