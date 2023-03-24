import {
    jUnit,
    textSummary,
} from 'https://jslib.k6.io/k6-summary/0.0.3/index.js'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { CONFIG } from '../config/envVars.js'
import { coalesceString } from '../utils/utils.js'
import rampingArrivalRate from './scenarios/rampingArrivalRate.js'
import rampingGrowingArrivalRate from './scenarios/rampingGrowingArrivalRate.js'

const outputDir = coalesceString(CONFIG.SUMMARY.RESULTS_DIR, '.')

export default (application, testName) => (data) => {
    const outputFilePrefix = `${application}/${testName}`

    console.log(
        `TEST DETAILS: [Time to complete test: ${data.state.testRunDurationMs} ms, Environment target: ${CONFIG.TARGET_ENV}, Scenario test types: ${CONFIG.SCENARIOS.TYPES}, Number of VUs: ${CONFIG.VIRTUAL_USERS}, Request processed: ${data.metrics.http_reqs.values.count}, Request OK: ${data.metrics.http_req_failed.values.fails}, ERRORS: ${data.metrics.http_req_failed.values.passes}]`
    )

    if (
        CONFIG.SCENARIOS.TYPES.indexOf('ALL') > -1 ||
        CONFIG.SCENARIOS.TYPES.indexOf('rampingArrivalRate') > -1
    ) {
        printRampingConfig('rampingArrivalRate', rampingArrivalRate)
    }

    if (
        CONFIG.SCENARIOS.TYPES.indexOf('ALL') > -1 ||
        CONFIG.SCENARIOS.TYPES.indexOf('rampingGrowingArrivalRate') > -1
    ) {
        printRampingConfig(
            'rampingGrowingArrivalRate',
            rampingGrowingArrivalRate
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

function printRampingConfig(scenarioName, rampingConfig) {
    let stringRamping = `[${scenarioName}] Ramping iterations for stage : { `

    const customStages = rampingConfig.stages
    for (let i = 0; i < customStages.length - 1; i++) {
        stringRamping += `${customStages[i].target}, `
    }
    console.log(
        stringRamping + `${customStages[customStages.length - 1].target} } `
    )
}
