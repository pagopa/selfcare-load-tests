import { coalesce } from '../utils/utils.js'
import buildScenarios from './scenarios/scenariosBuilder.js'
import buildThresholds from './thresholds/thresholdsBuilder.js'

const maxApiAvgDurationMs = coalesce(__ENV.THRESHOLDS_API_MAX_AVG_MS_ENV, 500)
const maxApiP90DurationMs = coalesce(__ENV.THRESHOLDS_API_MAX_P90_MS_ENV, 800)
const maxApiP95DurationMs = coalesce(__ENV.THRESHOLDS_API_MAX_P95_MS_ENV, 1000)

const maxFePageAvgDurationMs = coalesce(
    __ENV.THRESHOLDS_FE_PAGE_MAX_AVG_MS_ENV,
    1000
)
const maxFePageP90DurationMs = coalesce(
    __ENV.THRESHOLDS_FE_PAGE_MAX_P90_MS_ENV,
    2500
)
const maxFePageP95DurationMs = coalesce(
    __ENV.THRESHOLDS_FE_PAGE_MAX_P95_MS_ENV,
    3000
)

export const defaultApiOptions = {
    scenarios: buildScenarios(),
    thresholds: buildThresholds(
        maxApiAvgDurationMs,
        maxApiP90DurationMs,
        maxApiP95DurationMs
    ),
}

export const defaultFePageOptions = {
    scenarios: defaultApiOptions.scenarios,
    thresholds: buildThresholds(
        maxFePageAvgDurationMs,
        maxFePageP90DurationMs,
        maxFePageP95DurationMs
    ),
}
