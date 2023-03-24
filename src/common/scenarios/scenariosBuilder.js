import rampingArrivalRate from './rampingArrivalRate.js'
import rampingGrowingArrivalRate from './rampingGrowingArrivalRate.js'
import perVuIterations from './perVuIterations.js'
import { CONFIG } from '../../config/envVars.js'

export const scenarios = {
    rampingArrivalRate,
    rampingGrowingArrivalRate,
    perVuIterations,
}

export default function buildScenarios() {
    if (CONFIG.SCENARIOS.TYPES.indexOf('ALL') === -1) {
        return Object.assign(
            {},
            CONFIG.SCENARIOS.TYPES.map((t) => ({ [t]: scenarios[t] }))
        )
    } else {
        return scenarios // Use all scenrios
    }
}
