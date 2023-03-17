import {
    jUnit,
    textSummary,
} from 'https://jslib.k6.io/k6-summary/0.0.3/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { coalesceString } from '../utils/utils.js'

const outputDir = coalesceString(__ENV.RESULTS_DIR, '.')

export default (application, testName) => (data) => {
    const outputFilePrefix = `${application}/${testName}`

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

    const outputJUnitFile = `${outputDir}/results/${outputFilePrefix}-result.xml`
    const outputTextSummaryFile = `${outputDir}/results/${outputFilePrefix}-summary.txt`
    const outputHtmlSummaryFile = `${outputDir}/results/${outputFilePrefix}-summary.html`

    console.log(`Exporting results text format into ${outputTextSummaryFile}`)
    console.log(`Exporting results HTML format into ${outputHtmlSummaryFile}`)
    console.log(`Exporting results JUnit format into ${outputJUnitFile}`)

    return {
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
        [outputTextSummaryFile]: textSummary(data, {
            indent: ' ',
            enableColors: false,
        }),
        [outputHtmlSummaryFile]: htmlReport(data),
        [outputJUnitFile]: jUnit(data, { name: outputFilePrefix }),
    }
}
