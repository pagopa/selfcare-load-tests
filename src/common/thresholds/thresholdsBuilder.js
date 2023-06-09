export default function buildThresholds(
    maxAvgDurationMs,
    maxP90DurationMs,
    maxP95DurationMs
) {
    return {
        checks: [
            {
                threshold: 'rate==1', // pass all checks
                abortOnFail: false,
                delayAbortEval: '10s',
            },
        ],
        http_req_failed: [
            {
                threshold: 'rate<0.01', // http errors should be less than 1%
                abortOnFail: false,
                delayAbortEval: '10s',
            },
        ],
        http_req_duration: [
            {
                threshold: `avg<${maxAvgDurationMs}`, // the avg of requests should be below maxAvgDurationMs
                abortOnFail: false,
                delayAbortEval: '10s',
            },
            {
                threshold: `p(90)<${maxP90DurationMs}`, // 90% of requests should be below maxP90DurationMs
                abortOnFail: false,
                delayAbortEval: '10s',
            },
            {
                threshold: `p(95)<${maxP95DurationMs}`, // 95% of requests should be below maxP95DurationMs
                abortOnFail: false,
                delayAbortEval: '10s',
            },
        ],
    }
}
