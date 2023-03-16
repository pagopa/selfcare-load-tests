import {
    jUnit,
    textSummary,
} from 'https://jslib.k6.io/k6-summary/0.0.3/index.js'
import { coalesce } from '../utils/utils.js'

const outputDir = coalesce(__ENV.RESULTS_DIR, '.')

export default (outputFilePrefix) => (data) => {
    const outputFile = `${outputDir}/results/${outputFilePrefix}-result.xml`
    console.log(
        `TEST DETAILS: [Time to complete test: ${data.state.testRunDurationMs} ms, Environment target: ${__ENV.TARGET_ENV}, Scenario test type: ${__ENV.SCENARIO_TYPE_ENV}, Number of VUs: ${__ENV.VIRTUAL_USERS_ENV}, Request processed: ${data.metrics.http_reqs.values.count}, Request OK: ${data.metrics.http_req_failed.values.fails}, ERRORS: ${data.metrics.http_req_failed.values.passes}]`
    )
    console.log(`Exporting results into: ${outputFile}`)

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
        [outputFile]: jUnit(data, { name: outputFilePrefix }),
    }
}
