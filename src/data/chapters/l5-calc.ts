import type { Chapter } from '../../types'
import { l5_133 } from './l5-133'
import { l5_134 } from './l5-134'
import { l5_135 } from './l5-135'
import { l5_136 } from './l5-136'
import { l5_137 } from './l5-137'
import { l5_138 } from './l5-138'
import { l5_139 } from './l5-139'
import { l5_140 } from './l5-140'
import { l5_141 } from './l5-141'
import { l5_142 } from './l5-142'

/**
 * Level 5, band six — chapters l5-133 to l5-142, the calculator band.
 *
 * The band treats a calculator as a model with visible assumptions rather than
 * an oracle. Each chapter takes one number a household is routinely shown — an
 * EMI, a corpus, a CAGR, a real return — rebuilds it from its inputs, and then
 * spends its length on the assumption that moves it: the rate unit, the
 * compounding frequency, the tenure, the contribution convention, the
 * valuation rule, the repayment order, the tax timing.
 *
 * The arithmetic lives in `src/lib/finance.ts`, shared with the unit tests in
 * `scripts/check-calc.ts`, so a lab and a quiz cannot disagree about a rupee.
 *
 * Authored as one module per chapter (l5-133.ts … l5-142.ts) and collected
 * here, so `level5.ts` has a single import for the batch.
 */
export const l5Calc: Record<string, Chapter> = {
  'l5-133': l5_133,
  'l5-134': l5_134,
  'l5-135': l5_135,
  'l5-136': l5_136,
  'l5-137': l5_137,
  'l5-138': l5_138,
  'l5-139': l5_139,
  'l5-140': l5_140,
  'l5-141': l5_141,
  'l5-142': l5_142,
}
