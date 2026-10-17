/**
 * Unit tests for the plan model behind chapters l5-143 to l5-146.
 * Run with: npm run test:model
 *
 * The forecast is deliberately simple, so almost every number here can be
 * checked by hand from the finance primitives. What matters is that the four
 * models share one projection and one set of units.
 */
import {
  emergencyCover,
  project,
  stressTest,
  tornado,
  type Knob,
  type Plan,
} from '../src/lib/plan-model'

let failed = 0

function near(label: string, got: number, expected: number, tolerance: number) {
  if (Math.abs(got - expected) > tolerance) {
    failed++
    console.error(`  ✗ ${label}: got ${got.toFixed(4)}, expected ${expected} (±${tolerance})`)
  } else {
    console.log(`  ✓ ${label} → ${Number(got.toFixed(4))}`)
  }
}

const plan: Plan = {
  monthlySaving: 25_000,
  existingCorpus: 1_200_000,
  returnPct: 11,
  inflationPct: 6,
  years: 15,
  goalToday: 15_000_000,
}

console.log('Base projection')
const base = project(plan)
near('corpus after 15 years', base.corpus, 17_212_946, 5)
near('goal restated at 6% inflation', base.goalFuture, 35_948_373, 5)
near('coverage', base.coverage, 0.479, 0.001)
near('gap in rupees', base.gap, 18_735_427, 5)

console.log('\nOne assumption at a time')
near('a 7% return', project({ ...plan, returnPct: 7 }).corpus, 11_281_119, 5)
near('a 14% return', project({ ...plan, returnPct: 14 }).corpus, 23_886_870, 5)
near('4% inflation', project({ ...plan, inflationPct: 4 }).goalFuture, 27_014_153, 5)
near('8% inflation', project({ ...plan, inflationPct: 8 }).goalFuture, 47_582_537, 5)
near('saving ₹35,000 a month', project({ ...plan, monthlySaving: 35_000 }).corpus, 21_801_522, 5)
near('a 10-year horizon', project({ ...plan, years: 10 }).corpus, 8_881_987, 5)

console.log('\nTornado ordering')
const knobs: Knob[] = [
  { key: 'returnPct', label: 'Return 8–14%', low: 8, high: 14 },
  { key: 'inflationPct', label: 'Inflation 4–8%', low: 4, high: 8 },
  { key: 'monthlySaving', label: 'Saving ₹15k–35k', low: 15_000, high: 35_000 },
  { key: 'years', label: 'Horizon 10–20 years', low: 10, high: 20 },
]
const rows = tornado(plan, knobs)
near('four knobs are ranked', rows.length, 4, 0)
if (rows[0].label !== 'Horizon 10–20 years') {
  failed++
  console.error(`  ✗ the horizon should dominate here, got "${rows[0].label}"`)
} else {
  console.log(`  ✓ the horizon dominates (${(rows[0].swing * 100).toFixed(1)} points of coverage)`)
}
near('the horizon swing', rows[0].swing, 0.3244, 0.001)
near('the return swing', rows[1].swing, 0.3163, 0.001)
near('the inflation swing', rows[2].swing, 0.2751, 0.001)
near('the saving swing', rows[3].swing, 0.2552, 0.001)
if (!(rows[0].swing >= rows[1].swing && rows[1].swing >= rows[2].swing && rows[2].swing >= rows[3].swing)) {
  failed++
  console.error('  ✗ tornado rows must be sorted largest swing first')
} else {
  console.log('  ✓ rows are sorted largest swing first')
}

console.log('\nLiquidity and combined stress')
near('months of essential spending covered', emergencyCover(300_000, 52_000), 5.7692, 0.001)
const stress = stressTest(
  plan,
  300_000,
  52_000,
  { loanOutstanding: 4_200_000, loanRatePct: 8.6, loanMonthsLeft: 216 },
  { jobLossMonths: 6, marketFallPct: 25, rateRisePct: 2 },
)
near('the EMI before the rate rise', stress.emiBefore, 38_288, 1)
near('the EMI after a two-point rise', stress.emiAfter, 43_628, 1)
near('the extra EMI each month', stress.emiIncrease, 5_340, 1)
near('monthly burn during the shock', stress.monthlyBurn, 57_340, 1)
near('liquid left after six income-free months', stress.liquidAfter, -44_040, 1)
near('months the buffer can fund', stress.monthsCovered, 5.232, 0.01)
near('the corpus after a 25% fall', stress.corpusAfter, 12_909_710, 5)
near('the breaking point in months', stress.breakingPoint, 5, 0)
if (stress.survives) {
  failed++
  console.error('  ✗ six months without income must exhaust a ₹3 lakh buffer at this burn rate')
} else {
  console.log('  ✓ the combined shock exhausts the buffer before month six ends')
}

const calm = stressTest(
  plan,
  300_000,
  52_000,
  { loanOutstanding: 4_200_000, loanRatePct: 8.6, loanMonthsLeft: 216 },
  { jobLossMonths: 3, marketFallPct: 10, rateRisePct: 0 },
)
if (!calm.survives) {
  failed++
  console.error('  ✗ three months at the base EMI should be survivable with ₹3 lakh')
} else {
  console.log(`  ✓ three months at the base EMI leaves ₹${Math.round(calm.liquidAfter)}`)
}
near('a calm shock has no EMI increase', calm.emiIncrease, 0, 0.001)

if (failed) {
  console.error(`\n${failed} test(s) failed`)
  process.exit(1)
}
console.log('\n✓ All plan-model tests passed')
