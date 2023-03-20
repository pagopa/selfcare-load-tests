import { coalesce, vu } from '../../utils/utils.js'

const scenarioPerVuExecutions = coalesce(
    __ENV.SCENARIO_PER_VU_EXECUTIONS_ENV,
    1
)
const scenarioPerVuDuration = coalesce(__ENV.SCENARIO_PER_VU_DURATION_ENV, 10)

export default {
    executor: 'per-vu-iterations',
    vus: vu,
    iterations: scenarioPerVuExecutions,
    startTime: '0s',
    maxDuration: `${scenarioPerVuDuration}s`,
}
