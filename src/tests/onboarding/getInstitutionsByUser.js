import { assert, statusOk } from '../../utils/assertions.js'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import { defaultApiOptionsBuilder } from '../../common/defaultOptions.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { getInstitutionsByUser } from '../../api/onboarding.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

const application = 'onboarding'
const testName = 'getInstitutionsByUser'

// K6 configurations
export const options = defaultApiOptionsBuilder(application, testName)

export const handleSummary = defaultHandleSummaryBuilder(application, testName)

// K6 test
export default () => {
    const result = getInstitutionsByUser(baseUrl)

    assert(result, [statusOk(testName)])
}
