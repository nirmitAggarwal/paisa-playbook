/**
 * Scenario, sensitivity and stress arithmetic for chapters l5-143 to l5-146.
 *
 * One household plan is the input to all four models. `project` answers “will
 * the current plan reach the goal”, `tornado` answers “which assumption moves
 * that answer most”, and `stressTest` answers “what happens if several things
 * go wrong at once”. They share the same projection so the chapters cannot
 * disagree about the base case.
 *
 * Everything is computed in rupees and annual percentages, like the rest of
 * `src/lib`, and nothing is rounded here.
 */
import { compound, emi, futureCost, sipFutureValue } from './finance'

export type Plan = {
  /** What is added to investments each month. */
  monthlySaving: number
  /** What is already invested. */
  existingCorpus: number
  /** Assumed annual return before tax and fees. */
  returnPct: number
  /** Assumed annual inflation for the goal. */
  inflationPct: number
  /** Years until the goal. */
  years: number
  /** The goal stated in today’s rupees. */
  goalToday: number
}

export type Projection = {
  /** Projected value of the investments at the goal date. */
  corpus: number
  /** The goal restated in rupees at the goal date. */
  goalFuture: number
  /** Corpus as a fraction of the goal: 0.48 is 48% funded. */
  coverage: number
  /** Rupees short of the goal, or zero. */
  gap: number
}

export function project(plan: Plan): Projection {
  const corpus =
    compound(plan.existingCorpus, plan.returnPct, plan.years) +
    sipFutureValue(plan.monthlySaving, plan.returnPct, plan.years * 12)
  const goalFuture = futureCost(plan.goalToday, plan.inflationPct, plan.years)
  return {
    corpus,
    goalFuture,
    coverage: goalFuture > 0 ? corpus / goalFuture : 0,
    gap: Math.max(0, goalFuture - corpus),
  }
}

export type Knob = {
  key: 'returnPct' | 'inflationPct' | 'monthlySaving' | 'years'
  label: string
  low: number
  high: number
}

export type TornadoRow = {
  label: string
  low: number
  high: number
  /** Absolute difference in coverage between the low and high assumptions. */
  swing: number
}

/**
 * One-at-a-time sensitivity: move one assumption to its low and high values,
 * hold every other assumption at the base, and measure how far coverage moves.
 * Rows are returned largest swing first, which is the order a tornado chart
 * draws them in.
 */
export function tornado(plan: Plan, knobs: Knob[]): TornadoRow[] {
  return knobs
    .map((k) => {
      const low = project({ ...plan, [k.key]: k.low }).coverage
      const high = project({ ...plan, [k.key]: k.high }).coverage
      return { label: k.label, low, high, swing: Math.abs(high - low) }
    })
    .sort((a, b) => b.swing - a.swing)
}

/** Months of essential spending the liquid buffer can fund. */
export function emergencyCover(liquid: number, essentials: number): number {
  return essentials > 0 ? liquid / essentials : 0
}

export type LoanStress = {
  /** Outstanding principal on a floating-rate loan. */
  loanOutstanding: number
  /** The rate before the shock. */
  loanRatePct: number
  /** Months left on the loan. */
  loanMonthsLeft: number
}

export type Stress = {
  /** Months without income. */
  jobLossMonths: number
  /** Fall in the value of the invested corpus, in percent. */
  marketFallPct: number
  /** Rise in the floating loan rate, in percentage points. */
  rateRisePct: number
}

export type StressResult = {
  emiBefore: number
  emiAfter: number
  /** Extra EMI the household has to find each month. */
  emiIncrease: number
  /** Monthly cash needed during the shock: essentials plus the EMI increase. */
  monthlyBurn: number
  /** Liquid buffer left after the income-free months. */
  liquidAfter: number
  /** Months of shock the buffer could fund before it runs out. */
  monthsCovered: number
  /** Invested corpus after the market fall. */
  corpusAfter: number
  /** True when the buffer survives the income-free months without borrowing. */
  survives: boolean
  /** Months of job loss the buffer can absorb before it is exhausted. */
  breakingPoint: number
}

/**
 * Combined shock: no income for a number of months, a fall in the invested
 * corpus, and a rise in the floating loan rate. Contributions are assumed to
 * stop while there is no income, which is the conservative reading.
 */
export function stressTest(
  plan: Plan,
  liquid: number,
  essentials: number,
  loan: LoanStress,
  stress: Stress,
): StressResult {
  const emiBefore = emi(loan.loanOutstanding, loan.loanRatePct, loan.loanMonthsLeft)
  const emiAfter = emi(loan.loanOutstanding, loan.loanRatePct + stress.rateRisePct, loan.loanMonthsLeft)
  const emiIncrease = Math.max(0, emiAfter - emiBefore)
  const monthlyBurn = essentials + emiIncrease
  const liquidAfter = liquid - monthlyBurn * stress.jobLossMonths
  const corpus = project(plan).corpus * (1 - stress.marketFallPct / 100)
  return {
    emiBefore,
    emiAfter,
    emiIncrease,
    monthlyBurn,
    liquidAfter,
    monthsCovered: emergencyCover(liquid, monthlyBurn),
    corpusAfter: corpus,
    survives: liquidAfter >= 0,
    breakingPoint: Math.floor(emergencyCover(liquid, monthlyBurn)),
  }
}
