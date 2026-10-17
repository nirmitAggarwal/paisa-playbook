import type { Chapter } from '../../types'
import { l5_143 } from './l5-143'
import { l5_144 } from './l5-144'
import { l5_145 } from './l5-145'
import { l5_146 } from './l5-146'

/**
 * Level 5, band six — chapters l5-143 to l5-146, the planning-model band.
 *
 * One household plan is the subject of all four chapters. Scenario analysis
 * names futures and writes responses; sensitivity analysis ranks the
 * assumptions; best/worst-case analysis tests survival; stress testing combines
 * the shocks and records the breaking point. They share `src/lib/plan-model.ts`
 * with the unit tests, so the four chapters cannot disagree about the base case.
 */
export const l5Model: Record<string, Chapter> = {
  'l5-143': l5_143,
  'l5-144': l5_144,
  'l5-145': l5_145,
  'l5-146': l5_146,
}
