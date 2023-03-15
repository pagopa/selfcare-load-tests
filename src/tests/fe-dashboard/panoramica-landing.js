import {
    DEV,
    UAT,
    PROD,
    getBaseUrl,
    retrieveInstitutionId,
} from '../../common/envs.js'
import defaultOptions from '../../common/options.js'
import defaultHandleSummaryBuilder from '../../common/handleSummaryBuilder.js'
import getInstitutions from '../dashboard/getInstitutions.js'
import getInstitutionProducts from '../dashboard/getInstitutionProducts.js'
import { group } from 'k6'

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
    'fe-dashboard/panoramica-result.xml'
)

// K6 test
export default () => {
    group(`Landing on Panoramica page of institution ${institutionId}`, () => {
        getInstitutions(baseUrl)
        getInstitutionProducts(baseUrl, institutionId)
    })
}
