import { assert, statusOk } from '../../utils/assertions.js'
import {
    DEV,
    UAT,
    PROD,
    getBaseUrl,
    retrieveInstitutionId,
} from '../../common/envs.js'
import defaultOptions from '../../common/options.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { getInstitutionProducts } from '../../api/dashboard.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

var institutionId

// Set up data for processing, share data among VUs
export function setup() {
    institutionId = retrieveInstitutionId(baseUrl)
}
// K6 configurations
export const options = defaultOptions
export const handleSummary = defaultHandleSummaryBuilder(
    'dashboard/getInstitutionProducts-result.xml'
)

// K6 test
export default () => {
    const result = getInstitutionProducts(baseUrl, institutionId)

    assert(result, [statusOk()])
}
