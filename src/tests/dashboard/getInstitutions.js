import { assert, statusOk } from '../../utils/assertions.js'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import defaultOptions from '../../common/options.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { getInstitutions } from '../../api/dashboard.js'

const REGISTERED_ENVS = [DEV, UAT, PROD]

export const options = defaultOptions
export const handleSummary = defaultHandleSummaryBuilder(
    './getInstitutions-result.xml'
)

export default () => {
    const baseUrl = getBaseUrl(REGISTERED_ENVS)
    const result = getInstitutions(baseUrl)

    assert(result, [statusOk()])
}
