import { vu } from '../../utils/utils.js'

const scenarioPerVuExecutions = __ENV.SCENARIO_PER_VU_EXECUTIONS_ENV
    ? __ENV.SCENARIO_PER_VU_EXECUTIONS_ENV
    : 1
const scenarioPerVuDuration = __ENV.SCENARIO_PER_VU_DURATION_ENV
    ? __ENV.SCENARIO_PER_VU_DURATION_ENV
    : 10

export default {
    executor: 'per-vu-iterations',
    vus: vu,
    iterations: scenarioPerVuExecutions,
    startTime: '0s',
    maxDuration: `${scenarioPerVuDuration}s`,
}
