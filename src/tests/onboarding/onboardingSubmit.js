import { assert, statusConflict } from '../../utils/assertions.js'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import { defaultApiOptionsBuilder } from '../../common/defaultOptions.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { onboardingSubmit } from '../../api/onboarding.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

const application = 'onboarding'
const testName = 'onboardingSubmit'

// K6 configurations
export const options = defaultApiOptionsBuilder(application, testName)

export const handleSummary = defaultHandleSummaryBuilder(application, testName)

// K6 test
export default () => {
    const result = onboardingSubmit(baseUrl)

    assert(result, [statusConflict(testName)])
}
