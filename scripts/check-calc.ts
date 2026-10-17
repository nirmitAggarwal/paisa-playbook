/**
 * Unit tests for the calculator maths behind chapters l5-133 to l5-142.
 * Run with: npm run test:calc
 *
 * The expected values are hand-checked against the textbook formulae, so this
 * file is about the implementation, not about the labs: an EMI that is off by a
 * rupee here would be off in ten chapters and in every quiz that quotes it.
 */
import {
  amortise,
  cagr,
  compound,
  doublingYears,
  effectiveAnnual,
  emi,
  futureCost,
  payoff,
  presentValue,
  realReturn,
  retirementCorpus,
  sipFutureValue,
  sipInvested,
  type Debt,
} from '../src/lib/finance'

let failed = 0

function near(label: string, got: number, expected: number, tolerance: number) {
  if (Math.abs(got - expected) > tolerance) {
    failed++
    console.error(`  ✗ ${label}: got ${got.toFixed(4)}, expected ${expected} (±${tolerance})`)
  } else {
    console.log(`  ✓ ${label} → ${Number(got.toFixed(4))}`)
  }
}

console.log('Loan maths')
near('EMI, ₹25 lakh at 8.6% for 20 years', emi(2_500_000, 8.6, 240), 21_854.07, 0.02)
near('EMI at 0% is the principal split evenly', emi(120_000, 0, 12), 10_000, 0.001)
near('EMI per lakh at 8.5% for 20 years', emi(100_000, 8.5, 240), 867.82, 0.02)

const plain = amortise(2_500_000, 8.6, 240)
near('a 20-year loan is paid off in 240 months', plain.months, 240, 0)
near('total interest on the plain loan', plain.interest, 2_744_977, 2)
near('the last balance is zero', plain.balances[plain.balances.length - 1], 0, 0.5)

const faster = amortise(2_500_000, 8.6, 240, 5_000)
if (faster.months >= plain.months) {
  failed++
  console.error(`  ✗ an extra ₹5,000 a month must shorten the loan (${faster.months} vs ${plain.months})`)
} else {
  console.log(`  ✓ extra ₹5,000 clears the loan in ${faster.months} months instead of ${plain.months}`)
}
if (faster.interest >= plain.interest) {
  failed++
  console.error('  ✗ the extra payment must reduce total interest')
} else {
  console.log(`  ✓ interest falls from ${Math.round(plain.interest)} to ${Math.round(faster.interest)}`)
}
near('the faster schedule still repays exactly the principal', plain.principal, 2_500_000, 0.001)

console.log('\nCompounding')
near('₹2,00,000 at 8% for 15 years, annual', compound(200_000, 8, 15, 1), 634_434, 2)
near('the same, compounded monthly', compound(200_000, 8, 15, 12), 661_384, 2)
near('effective annual rate of 8% monthly', effectiveAnnual(8, 12), 8.29995, 0.0001)
near('effective annual rate of 8% annual', effectiveAnnual(8, 1), 8, 0.000001)
near('years to double at 8%', doublingYears(8), 9.0065, 0.001)
near('the rule of 72 estimates 9 years', 72 / 8, 9, 0)

console.log('\nSystematic investing')
near('₹10,000 a month at 12% for 15 years', sipFutureValue(10_000, 12, 180), 5_045_760, 60)
near(
  'the same plan with a 10% annual step-up',
  sipFutureValue(10_000, 12, 180, 10),
  8_683_849,
  120,
)
near('total contributed with step-ups', sipInvested(10_000, 180, 10), 3_812_698, 60)
if (sipFutureValue(10_000, 12, 180, 10) <= sipFutureValue(10_000, 12, 180)) {
  failed++
  console.error('  ✗ a step-up must produce a larger corpus than a flat contribution')
} else {
  console.log('  ✓ the step-up corpus exceeds the flat corpus')
}

console.log('\nGrowth rates and inflation')
near('CAGR from ₹1,00,000 to ₹2,50,000 over 8 years', cagr(100_000, 250_000, 8), 12.1353, 0.0002)
near('the same gain over 12 years', cagr(100_000, 250_000, 12), 7.9348, 0.0002)
near('a flat investment has a zero CAGR', cagr(100_000, 100_000, 5), 0, 0.000001)
near('12% nominal with 6% inflation', realReturn(12, 6), 5.6604, 0.0002)
near('7% nominal with 6% inflation', realReturn(7, 6), 0.9434, 0.0002)
near('₹1,00,000 at 6% inflation for 10 years', futureCost(100_000, 6, 10), 179_085, 2)
near(
  'discounting that future cost returns today’s amount',
  presentValue(futureCost(100_000, 6, 10), 6, 10),
  100_000,
  0.001,
)
near('retirement corpus for ₹60,000 a month', retirementCorpus(60_000, 6, 30, 25, 7), 91_712_957, 5_000)

console.log('\nDebt repayment')
const debts: Debt[] = [
  { name: 'Card', balance: 240_000, annualPct: 36, minPayment: 9_000 },
  { name: 'Personal', balance: 90_000, annualPct: 14, minPayment: 5_000 },
  { name: 'Car', balance: 360_000, annualPct: 9, minPayment: 8_000 },
]

const avalanche0 = payoff(debts, 0, 'avalanche')
const snowball0 = payoff(debts, 0, 'snowball')
if (Math.round(avalanche0.interest) !== Math.round(snowball0.interest)) {
  failed++
  console.error('  ✗ with no extra payment the two methods must cost the same')
} else {
  console.log(`  ✓ with no spare cash both methods cost ${Math.round(avalanche0.interest)} in interest`)
}

const avalanche = payoff(debts, 5_000, 'avalanche')
const snowball = payoff(debts, 5_000, 'snowball')
near('avalanche with ₹5,000 extra takes this many months', avalanche.months, 43, 0)
near('its interest bill', avalanche.interest, 183_236, 5)
near('snowball with the same ₹5,000 takes this many months', snowball.months, 46, 0)
near('its interest bill', snowball.interest, 226_425, 5)
if (avalanche.interest >= snowball.interest) {
  failed++
  console.error('  ✗ the avalanche must cost less interest than the snowball here')
} else {
  console.log(
    `  ✓ the avalanche saves ₹${Math.round(snowball.interest - avalanche.interest)} and ${
      snowball.months - avalanche.months
    } months`,
  )
}
if (avalanche.months >= payoff(debts, 0, 'avalanche').months) {
  failed++
  console.error('  ✗ an extra payment must shorten the payoff')
} else {
  console.log('  ✓ extra payments shorten every schedule')
}

if (failed) {
  console.error(`\n${failed} test(s) failed`)
  process.exit(1)
}
console.log('\n✓ All calculator tests passed')
