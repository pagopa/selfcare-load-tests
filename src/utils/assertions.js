import { check } from 'k6'

export function assert(res, assertions) {
    for (const assertion of assertions) {
        assertion(res)
    }
}

export function statusCheck(expectedState, opName) {
    return function doCheck(res) {
        const isOk = check(res, {
            [`${opName ? `[${opName}]` : ''}HTTP status is ${expectedState}`]: (
                r
            ) => r.status === expectedState,
        })
    }
}

export function statusOk(opName) {
    return statusCheck(200, opName)
}

export function statusCreated(opName) {
    return statusCheck(201, opName)
}

export function statusAccepted(opName) {
    return statusCheck(202, opName)
}

export function statusNoContent(opName) {
    return statusCheck(204, opName)
}

export function statusUnauthorized(opName) {
    return statusCheck(401, opName)
}

export function statusForbidden(opName) {
    return statusCheck(403, opName)
}

export function statusConflict(opName) {
    return statusCheck(409, opName)
}

export function statusBadFormat(opName) {
    return statusCheck(400, opName)
}

export function bodyLengthBetween(minLength, maxLength) {
    return function doCheck(res) {
        if (minLength > 0) {
            check(res, {
                'body size is more than or equal to minLength': (r) =>
                    r.body.length >= minLength,
            })
        }
        if (maxLength > 0) {
            check(res, {
                'body size is less than or equal to maxLength': (r) =>
                    r.body.length <= maxLength,
            })
        }
    }
}

export function bodyPgpPublicKey() {
    return function doCheck(res) {
        check(res, {
            'Response body contains PGP public key header': (r) =>
                r.body.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----'),
        })
    }
}

export function bodyJsonSelectorValue(selector, expectedValue) {
    return function doCheck(res) {
        check(res, {
            'Response JSON contains value ': (r) =>
                r.json(selector) === expectedValue,
        })
    }
}

export function bodyJsonReduceArray(
    selector,
    reducer,
    initialState,
    expectedValue
) {
    return function doCheck(res) {
        check(res, {
            'Response JSON contains an array which reduces to expected value ':
                (r) =>
                    r.json(selector).reduce(reducer, initialState) ===
                    expectedValue,
        })
    }
}

export function idempotence() {
    return function doCheck(resArray) {
        const reducer = (prv, cur) => prv && cur
        const mapper = (r) =>
            r.status === resArray[0].status && r.body === resArray[0].body
        check(resArray, {
            'All Responses are equal ': (r) =>
                resArray.map(mapper).reduce(reducer, true) === true,
        })
    }
}

export function isNotFakeSalt() {
    return (res) => {
        check(res, {
            'Is not a fake salt': (r) => r.body !== 'FAKE_SALT',
        })
    }
}
