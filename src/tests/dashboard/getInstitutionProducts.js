import { assert, statusOk } from '../../utils/assertions.js'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import { defaultApiOptionsBuilder } from '../../common/defaultOptions.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { getInstitutionProducts } from '../../api/dashboard.js'
import { retrieveInstitutionId } from '../../utils/contextUtils.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

const application = 'dashboard'
const testName = 'getInstitutionProducts'

// Set up data for processing, share data among VUs
export function setup() {
    return { institutionId: retrieveInstitutionId(baseUrl) }
}
// K6 configurations
export const options = defaultApiOptionsBuilder(application, testName)

export const handleSummary = defaultHandleSummaryBuilder(application, testName)

// K6 test
export default (context) => {
    const result = getInstitutionProducts(baseUrl, context.institutionId)

    assert(result, [statusOk(testName)])
}
