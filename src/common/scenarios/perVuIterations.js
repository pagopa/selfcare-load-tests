import { CONFIG } from '../../config/envVars.js'

export default {
    executor: 'per-vu-iterations',
    vus: CONFIG.VIRTUAL_USERS,
    iterations: CONFIG.SCENARIOS.perVuIterations.EXECUTIONS,
    startTime: '0s',
    maxDuration: `${CONFIG.SCENARIOS.perVuIterations.DURATION}s`,
}
