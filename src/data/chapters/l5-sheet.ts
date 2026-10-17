import type { Chapter } from '../../types'
import { l5_123 } from './l5-123'
import { l5_124 } from './l5-124'
import { l5_125 } from './l5-125'
import { l5_126 } from './l5-126'
import { l5_127 } from './l5-127'
import { l5_128 } from './l5-128'
import { l5_129 } from './l5-129'
import { l5_130 } from './l5-130'
import { l5_131 } from './l5-131'
import { l5_132 } from './l5-132'

/**
 * Level 5, band six — chapters l5-123 to l5-132, spreadsheets and models.
 *
 * The band is not a menu tour. Each chapter takes one operation that a
 * household actually needs — a total that can be trusted, a decision reduced
 * to a flag, a lookup that survives a missing key, a subset that stays live —
 * and spends its length on the way that operation becomes wrong: text SUM
 * skips, ranges that stop a row short, a spill with nowhere to land, an axis
 * that starts at 90.
 *
 * Six of the chapters run in the data-driven spreadsheet lab, each with its own
 * scenario in `sheet-scenarios.ts`. The other four teach operations the small
 * formula engine does not evaluate, so they have their own labs.
 *
 * Authored as one module per chapter (l5-123.ts … l5-132.ts) and collected
 * here, so `level5.ts` has a single import for the batch.
 */
export const l5Sheet: Record<string, Chapter> = {
  'l5-123': l5_123,
  'l5-124': l5_124,
  'l5-125': l5_125,
  'l5-126': l5_126,
  'l5-127': l5_127,
  'l5-128': l5_128,
  'l5-129': l5_129,
  'l5-130': l5_130,
  'l5-131': l5_131,
  'l5-132': l5_132,
}
