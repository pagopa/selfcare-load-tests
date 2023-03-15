import {
    jUnit,
    textSummary,
} from 'https://jslib.k6.io/k6-summary/0.0.2/index.js'

export default (outputFile) => (data) => {
    console.log(
        `TEST DETAILS: [Time to complete test: ${data.state.testRunDurationMs} ms, Environment target: ${__ENV.TARGET_ENV}, Scenario test type: ${__ENV.SCENARIO_TYPE_ENV}, Number of VUs: ${__ENV.VIRTUAL_USERS_ENV}, Request processed: ${data.metrics.http_reqs.values.count}, Request OK: ${data.metrics.http_req_failed.values.fails}, ERRORS: ${data.metrics.http_req_failed.values.passes}]`
    )
    if (__ENV.SCENARIO_TYPE_ENV == 'rampingArrivalRate') {
        let stringRamping = 'Ramping iterations for stage : { '
        for (let i = 0; i < customStages.length - 1; i++) {
            stringRamping += `${customStages[i].target}, `
        }
        console.log(
            stringRamping + `${customStages[customStages.length - 1].target} } `
        )
    }
    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
        [`results/${outputFile}`]: jUnit(data),
    }
}
