import { group } from 'k6'
import { DEV, UAT, PROD, getBaseUrl } from '../../common/envs.js'
import { defaultFePageOptions } from '../../common/defaultOptions.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import { retrieveInstitutionId } from '../../utils/contextUtils.js'
import getInstitutions from '../dashboard/getInstitutions.js'
import getInstitutionProducts from '../dashboard/getInstitutionProducts.js'

// The environments to which this test could be executed
const REGISTERED_ENVS = [DEV, UAT, PROD]
const baseUrl = getBaseUrl(REGISTERED_ENVS)

// Set up data for processing, share data among VUs
export function setup() {
    return { institutionId: retrieveInstitutionId(baseUrl) }
}

// K6 configurations
export const options = defaultFePageOptions
export const handleSummary = defaultHandleSummaryBuilder(
    'fe-dashboard/panoramica-result.xml'
)

// K6 test
export default (context) => {
    group(
        `Landing on Panoramica page of institution ${context.institutionId}`,
        () => {
            getInstitutions(context)
            getInstitutionProducts(context)
        }
    )
}
