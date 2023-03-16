import { coalesce, vu } from '../../utils/utils.js'
import { setStages } from '../../utils/stageUtils.js'

const scenarioRampTimeUnit = coalesce(__ENV.SCENARIO_RAMP_TIME_UNIT_ENV, 1)
const scenarioRampCustomStages = setStages(
    vu,
    scenarioRampTimeUnit,
    Math.max(coalesce(__ENV.SCENARIO_RAMP_STAGE_NUMBER_ENV, 3), 3)
)

export default {
    executor: 'ramping-arrival-rate', //Number of VUs to pre-allocate before test start to preserve runtime resources
    timeUnit: `${scenarioRampTimeUnit}s`, //period of time to apply the iteration
    preAllocatedVUs: vu,
    maxVUs: vu,
    stages: scenarioRampCustomStages,
}