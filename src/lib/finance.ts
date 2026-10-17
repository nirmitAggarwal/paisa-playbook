/**
 * The arithmetic behind Level 5's calculator chapters (l5-133 to l5-142).
 *
 * Every function here is a model, not a forecast: it turns four or five stated
 * assumptions into one number. The chapters teach the same discipline, so the
 * labs and the unit tests share this one implementation rather than each
 * re-deriving a formula with its own rounding.
 *
 * Conventions:
 *   - rates are annual percentages, as a person would type them (8.5, not 0.085)
 *   - amounts are rupees, never lakhs
 *   - no rounding happens here; presentation rounds
 *   - monthly cash flows are ordinary annuities unless stated otherwise
 */

/** Monthly periodic rate from an annual nominal percentage. */
export function monthlyRate(annualPct: number): number {
  return annualPct / 12 / 100
}

/** Equated monthly instalment for a fully amortising loan. */
export function emi(principal: number, annualPct: number, months: number): number {
  if (months <= 0) return 0
  const r = monthlyRate(annualPct)
  if (r === 0) return principal / months
  const growth = Math.pow(1 + r, months)
  return (principal * r * growth) / (growth - 1)
}

export type Amortisation = {
  /** Months until the balance reaches zero. */
  months: number
  /** Interest paid over the life of the loan. */
  interest: number
  /** Principal repaid, which equals the amount borrowed. */
  principal: number
  /** Balance at the end of each month, up to a cap. */
  balances: number[]
}

/**
 * Month-by-month amortisation with an optional extra payment on top of the EMI.
 *
 * The extra payment goes entirely to principal, which is why it shortens the
 * loan far more than the same money spread over the scheduled payments. A
 * hard cap stops a pathological input (a payment below the monthly interest)
 * from looping forever.
 */
export function amortise(
  principal: number,
  annualPct: number,
  months: number,
  extraPerMonth = 0,
): Amortisation {
  const r = monthlyRate(annualPct)
  const payment = emi(principal, annualPct, months)
  let balance = principal
  let interest = 0
  let paid = 0
  const balances: number[] = []
  const cap = months + 1200

  while (balance > 0.5 && paid < cap) {
    const charged = balance * r
    let principalPart = payment + extraPerMonth - charged
    if (principalPart <= 0) break
    if (principalPart > balance) principalPart = balance
    balance = Math.max(0, balance - principalPart)
    interest += charged
    paid++
    balances.push(balance)
  }

  return { months: paid, interest, principal, balances }
}

/**
 * Future value of a lump sum compounded `perYear` times a year.
 *
 * The nominal rate is divided by the frequency, which is what a bank does and
 * what makes a monthly-compounded 8% worth more than an annual-compounded 8%.
 */
export function compound(
  principal: number,
  annualPct: number,
  years: number,
  perYear = 1,
): number {
  const r = annualPct / 100 / perYear
  return principal * Math.pow(1 + r, perYear * years)
}

/** The rate that a nominal rate with `perYear` compounding actually delivers. */
export function effectiveAnnual(annualPct: number, perYear: number): number {
  return (Math.pow(1 + annualPct / 100 / perYear, perYear) - 1) * 100
}

/** Years for a lump sum to double at a fixed annual rate. */
export function doublingYears(annualPct: number): number {
  return annualPct <= 0 ? Infinity : Math.log(2) / Math.log(1 + annualPct / 100)
}

/**
 * Future value of a monthly contribution that steps up once a year.
 *
 * Contributions are made at the start of each month, so the first one earns the
 * full month's return. `stepUpPct` raises the contribution every twelve
 * months, which is how most SIP mandates with a step-up are written.
 */
export function sipFutureValue(
  monthly: number,
  annualPct: number,
  months: number,
  stepUpPct = 0,
): number {
  const r = monthlyRate(annualPct)
  let balance = 0
  let contribution = monthly
  for (let m = 0; m < months; m++) {
    if (m > 0 && m % 12 === 0) contribution *= 1 + stepUpPct / 100
    balance = (balance + contribution) * (1 + r)
  }
  return balance
}

/** Total contributed, including every step-up. */
export function sipInvested(monthly: number, months: number, stepUpPct = 0): number {
  let total = 0
  let contribution = monthly
  for (let m = 0; m < months; m++) {
    if (m > 0 && m % 12 === 0) contribution *= 1 + stepUpPct / 100
    total += contribution
  }
  return total
}

/** Compound annual growth rate, as a percentage, from two endpoints. */
export function cagr(start: number, end: number, years: number): number {
  if (start <= 0 || years <= 0) return 0
  return (Math.pow(end / start, 1 / years) - 1) * 100
}

/** A nominal return with inflation stripped out, in percentage terms. */
export function realReturn(nominalPct: number, inflationPct: number): number {
  return ((1 + nominalPct / 100) / (1 + inflationPct / 100) - 1) * 100
}

/** What an amount today will cost after `years` of inflation. */
export function futureCost(amount: number, inflationPct: number, years: number): number {
  return amount * Math.pow(1 + inflationPct / 100, years)
}

/** What a future amount is worth in today's money. */
export function presentValue(amount: number, inflationPct: number, years: number): number {
  return amount / Math.pow(1 + inflationPct / 100, years)
}

/**
 * The corpus needed at retirement to fund a monthly expense that rises with
 * inflation, for `yearsInRetirement` years, with the corpus still earning.
 *
 * The drawdown is modelled as an annuity whose growth rate is the real return
 * above inflation, so the first year's expense can be paid from the corpus and
 * every later year's expense is the inflated one.
 */
export function retirementCorpus(
  monthlyExpenseToday: number,
  inflationPct: number,
  yearsToRetirement: number,
  yearsInRetirement: number,
  postRetirementReturnPct: number,
): number {
  const firstYearCost = futureCost(monthlyExpenseToday * 12, inflationPct, yearsToRetirement)
  const real = realReturn(postRetirementReturnPct, inflationPct) / 100
  if (Math.abs(real) < 1e-9) return firstYearCost * yearsInRetirement
  return firstYearCost * ((1 - Math.pow(1 + real, -yearsInRetirement)) / real)
}

export type Debt = {
  name: string
  balance: number
  annualPct: number
  minPayment: number
}

export type PayoffResult = {
  /** Months until every balance is cleared. */
  months: number
  /** Interest paid across all debts. */
  interest: number
  /** Order in which debts were cleared. */
  cleared: string[]
}

/**
 * Simulate paying every minimum plus `extra` until all debts are gone.
 *
 * `avalanche` sends the extra to the highest rate first, `snowball` to the
 * smallest balance. As each debt clears, its minimum joins the extra — the
 * snowball effect that gives the method its name.
 */
export function payoff(
  debts: Debt[],
  extra: number,
  method: 'avalanche' | 'snowball',
): PayoffResult {
  const live = debts.map((d) => ({ ...d }))
  let months = 0
  let interest = 0
  const cleared: string[] = []
  const cap = 1200

  while (live.some((d) => d.balance > 0.5) && months < cap) {
    months++
    let pool = extra
    for (const d of live) {
      if (d.balance <= 0) continue
      const charged = d.balance * monthlyRate(d.annualPct)
      interest += charged
      d.balance += charged
      const pay = Math.min(d.minPayment, d.balance)
      d.balance -= pay
      if (d.balance < 0.5) d.balance = 0
      else pool += Math.max(0, d.minPayment - pay)
    }

    const order = live
      .filter((d) => d.balance > 0.5)
      .sort((a, b) =>
        method === 'avalanche' ? b.annualPct - a.annualPct : a.balance - b.balance,
      )
    for (const d of order) {
      if (pool <= 0) break
      const pay = Math.min(pool, d.balance)
      d.balance -= pay
      pool -= pay
      if (d.balance < 0.5) d.balance = 0
    }

    for (const d of live) {
      if (d.balance === 0 && !cleared.includes(d.name)) cleared.push(d.name)
    }
  }

  return { months, interest, cleared }
}
