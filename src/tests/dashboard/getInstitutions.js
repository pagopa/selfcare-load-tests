import { assert, statusOk } from '../../utils/assertions.js'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import { defaultApiOptions } from '../../common/defaultOptions.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { getInstitutions } from '../../api/dashboard.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

// K6 configurations
export const options = defaultApiOptions
export const handleSummary = defaultHandleSummaryBuilder(
    'dashboard/getInstitutions-result.xml'
)

// K6 test
export default () => {
    const result = getInstitutions(baseUrl)

    assert(result, [statusOk('getInstitutions')])
}
