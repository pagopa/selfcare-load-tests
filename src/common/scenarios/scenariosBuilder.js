import rampingArrivalRate from './rampingArrivalRate.js'
import perVuIterations from './perVuIterations.js'

export const scenarios = {
    rampingArrivalRate,
    perVuIterations,
}

export default function buildScenarios() {
    if (__ENV.SCENARIO_TYPE_ENV && __ENV.SCENARIO_TYPE_ENV !== 'All') {
        return { [__ENV.SCENARIO_TYPE_ENV]: scenarios[__ENV.SCENARIO_TYPE_ENV] } // Use just a single scenario if ` -e SCENARIO_TYPE_ENV` is used
    } else {
        return scenarios // Use all scenrios
    }
}
