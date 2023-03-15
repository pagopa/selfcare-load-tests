import buildScenarios from './scenarios/scenariosBuilder.js'
import buildThresholds from './thresholds/thresholdsBuilder.js'

export const defaultApiOptions = {
    scenarios: buildScenarios(),
    thresholds: buildThresholds(500, 800, 1000),
}

export const defaultFePageOptions = {
    scenarios: defaultApiOptions.scenarios,
    thresholds: buildThresholds(1000, 2500, 3000),
}
