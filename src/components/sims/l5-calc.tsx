import { useState } from 'react'
import {
  amortise,
  cagr,
  compound,
  doublingYears,
  effectiveAnnual,
  emi,
  futureCost,
  payoff,
  realReturn,
  retirementCorpus,
  sipFutureValue,
  sipInvested,
  type Debt,
} from '../../lib/finance'

/**
 * Level 5, band six — the calculator chapters (l5-133 to l5-142).
 *
 * Ten labs, one per chapter. Each is a small model with two or three controls
 * and one honest output, because the point of the band is not the formula but
 * the assumption that moves the answer. Where a lab offers a preset, it is a
 * comparison the chapter actually makes: annual against monthly compounding,
 * avalanche against snowball, a 12% equity return against a taxed fixed
 * deposit.
 *
 * Every amount is illustrative. The chapters carry the sources and the dates.
 */

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">{children}</div>
)

const Choice = ({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border px-2.5 py-1.5 text-[11px] transition ${
      active
        ? 'border-brand-400/60 bg-brand-400/15 text-white'
        : 'border-white/10 bg-white/5 text-ink-300 hover:border-white/30'
    }`}
  >
    {label}
  </button>
)

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (n: number) => void
  format: (n: number) => string
}) => (
  <label className="block">
    <span className="flex items-baseline justify-between text-[11px] text-ink-400">
      {label}
      <span className="font-mono text-white">{format(value)}</span>
    </span>
    <input
      type="range"
      aria-label={label}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-1 w-full accent-emerald-400"
    />
  </label>
)

const Stat = ({
  label,
  value,
  note,
  tone = 'plain',
}: {
  label: string
  value: string
  note?: string
  tone?: 'plain' | 'good' | 'warn'
}) => (
  <div className="rounded-lg border border-white/10 bg-ink-950/50 px-3 py-2">
    <p className="text-[10px] uppercase tracking-wide text-ink-500">{label}</p>
    <p
      className={`mt-0.5 font-display text-lg font-semibold ${
        tone === 'good' ? 'text-brand-300' : tone === 'warn' ? 'text-amber-300' : 'text-white'
      }`}
    >
      {value}
    </p>
    {note && <p className="mt-0.5 text-[10px] text-ink-400">{note}</p>}
  </div>
)

const inr = (n: number) => Math.round(n).toLocaleString('en-IN')
const rupees = (n: number) => `₹${inr(n)}`
const lakh = (n: number) => `₹${(n / 100000).toFixed(2)} lakh`
const crore = (n: number) => `₹${(n / 10000000).toFixed(2)} crore`
const pct = (n: number, digits = 2) => `${n.toFixed(digits)}%`

/* ------------------------------------------------------- l5-133 sanity check */

export function L5CalculatorSanity() {
  const [rateUnit, setRateUnit] = useState<'year' | 'month'>('year')
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years')
  const [feeFinanced, setFeeFinanced] = useState(false)

  const principal = 1_000_000 * (feeFinanced ? 1.005 : 1)
  const annualPct = rateUnit === 'year' ? 8.5 : 8.5 * 12
  const months = tenureUnit === 'years' ? 240 : 20
  const monthly = emi(principal, annualPct, months)
  const quote = 8_678
  const gap = monthly - quote
  const matches = Math.abs(gap) < 10

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Calculator sanity check</h4>
        <p className="mt-1 text-sm text-ink-300">
          A quote says ₹8,678 a month for a ₹10,00,000 loan at 8.5% over 20 years. Rebuild it
          field by field and see which entry is the one that breaks it.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Rate is quoted</p>
            <div className="flex gap-1.5">
              <Choice label="per year" active={rateUnit === 'year'} onClick={() => setRateUnit('year')} />
              <Choice label="per month" active={rateUnit === 'month'} onClick={() => setRateUnit('month')} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Tenure is quoted in</p>
            <div className="flex gap-1.5">
              <Choice label="years" active={tenureUnit === 'years'} onClick={() => setTenureUnit('years')} />
              <Choice label="months" active={tenureUnit === 'months'} onClick={() => setTenureUnit('months')} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Processing fee</p>
            <div className="flex gap-1.5">
              <Choice label="paid upfront" active={!feeFinanced} onClick={() => setFeeFinanced(false)} />
              <Choice label="added to loan" active={feeFinanced} onClick={() => setFeeFinanced(true)} />
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Your EMI" value={rupees(monthly)} note="from the fields above" />
          <Stat label="The quote" value={rupees(quote)} note="₹8,678 a month" />
          <Stat
            label="Difference"
            value={matches ? 'matches' : rupees(Math.abs(gap))}
            note={matches ? 'the fields agree with the quote' : 'enough to be the wrong answer'}
            tone={matches ? 'good' : 'warn'}
          />
        </div>
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
            matches
              ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
              : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
          }`}
        >
          {matches
            ? 'Matches the quote — annual rate, twenty-year tenure, fee paid upfront.'
            : rateUnit === 'month'
              ? 'The rate is annual. Entered as a monthly rate, 8.5% becomes 102% a year, and the EMI is ten times too large.'
              : tenureUnit === 'months'
                ? 'The tenure is in years. Entered as 20 months, the loan is repaid in under two years, so each EMI is far larger.'
                : 'Financing the fee raises the amount borrowed to ₹10,05,000, so the EMI rises by a small but real amount.'}
        </div>
      </Panel>
      <Panel>
        <h4 className="font-display text-white">The three checks that catch most wrong answers</h4>
        <ol className="mt-2 space-y-1.5 text-sm text-ink-300">
          <li>1. Is the rate annual or monthly? A monthly figure multiplied by twelve is not the same loan.</li>
          <li>2. Is the tenure in years or months? Twenty years is 240 payments, not 20.</li>
          <li>3. Is the fee inside the amount borrowed, or paid separately? Only one of those is in the EMI.</li>
        </ol>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------ l5-134 compounding model */

const FREQUENCIES = [
  { label: 'Yearly', n: 1 },
  { label: 'Half-yearly', n: 2 },
  { label: 'Quarterly', n: 4 },
  { label: 'Monthly', n: 12 },
  { label: 'Daily', n: 365 },
]

export function L5CompoundModel() {
  const [principal, setPrincipal] = useState(200_000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(15)
  const [perYear, setPerYear] = useState(1)
  const [monthlyAdd, setMonthlyAdd] = useState(0)

  const lump = compound(principal, rate, years, perYear)
  // A contribution is added once a month and compounds at the same nominal rate.
  const monthlyRate = rate / 12 / 100
  let withAdditions = principal
  for (let m = 0; m < years * 12; m++) {
    withAdditions = withAdditions * (1 + monthlyRate) + monthlyAdd
  }
  const annual = compound(principal, rate, years, 1)
  const actualDouble = doublingYears(rate)

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Compound-interest model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Frequency does not change the headline rate. It changes the effective rate, and over
          fifteen years that gap is large enough to notice.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Principal" value={principal} min={0} max={1_000_000} step={10_000} onChange={setPrincipal} format={rupees} />
          <Slider label="Annual rate" value={rate} min={1} max={20} step={0.1} onChange={setRate} format={(n) => pct(n, 1)} />
          <Slider label="Years" value={years} min={1} max={40} step={1} onChange={setYears} format={(n) => `${n} years`} />
          <Slider label="Monthly addition" value={monthlyAdd} min={0} max={50_000} step={1_000} onChange={setMonthlyAdd} format={rupees} />
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Compounding</p>
          <div className="flex flex-wrap gap-1.5">
            {FREQUENCIES.map((f) => (
              <Choice key={f.n} label={f.label} active={perYear === f.n} onClick={() => setPerYear(f.n)} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Maturity value" value={rupees(withAdditions)} note={monthlyAdd ? 'principal plus monthly additions' : 'lump sum only'} tone="good" />
          <Stat label="Effective annual rate" value={pct(effectiveAnnual(rate, perYear))} note={`from a nominal ${pct(rate, 1)}`} />
          <Stat label="Years to double" value={actualDouble.toFixed(1)} note={`the 72 shortcut says ${(72 / rate).toFixed(1)}`} />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          Monthly rather than yearly compounding adds {rupees(lump - annual)} over the period.
          Daily adds a little more, and none of it changes the rate you were quoted.
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------- l5-135 EMI model */

export function L5EmiModel() {
  const [loan, setLoan] = useState(2_500_000)
  const [rate, setRate] = useState(8.6)
  const [years, setYears] = useState(20)
  const [extra, setExtra] = useState(0)

  const months = years * 12
  const monthly = emi(loan, rate, months)
  const plain = amortise(loan, rate, months)
  const faster = amortise(loan, rate, months, extra)
  const firstYearInterest = (() => {
    let balance = loan
    let interest = 0
    const r = rate / 12 / 100
    for (let m = 0; m < 12; m++) {
      const charged = balance * r
      interest += charged
      balance -= monthly - charged
    }
    return Math.round((interest / (monthly * 12)) * 100)
  })()

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">EMI and amortisation model</h4>
        <p className="mt-1 text-sm text-ink-300">
          The EMI is fixed. What it is made of is not: early payments are mostly interest, and an
          extra payment goes straight to principal.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Loan amount" value={loan} min={500_000} max={10_000_000} step={100_000} onChange={setLoan} format={lakh} />
          <Slider label="Annual rate" value={rate} min={5} max={16} step={0.1} onChange={setRate} format={(n) => pct(n, 1)} />
          <Slider label="Tenure" value={years} min={1} max={30} step={1} onChange={setYears} format={(n) => `${n} years`} />
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Extra each month</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="No extra" active={extra === 0} onClick={() => setExtra(0)} />
              <Choice label="₹5,000" active={extra === 5000} onClick={() => setExtra(5000)} />
              <Choice label="₹10,000" active={extra === 10000} onClick={() => setExtra(10000)} />
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="EMI" value={rupees(monthly)} note="unchanged by the extra payment" tone="good" />
          <Stat label="Total interest" value={lakh(plain.interest)} note={`on ${rupees(loan)} borrowed`} />
          <Stat label="First-year interest share" value={`${firstYearInterest}%`} note="of the first twelve payments" tone="warn" />
        </div>
        <div className="mt-3 rounded-lg border border-white/10 bg-ink-950/50 p-3 text-xs text-ink-300">
          {extra === 0 ? (
            <>Loan clears in {plain.months} months with {lakh(plain.interest)} of interest.</>
          ) : (
            <>
              With {rupees(extra)} extra a month, the loan clears in {faster.months} months —{' '}
              {plain.months - faster.months} months earlier — and the interest bill falls from{' '}
              {lakh(plain.interest)} to {lakh(faster.interest)}, a saving of{' '}
              {lakh(plain.interest - faster.interest)}.
            </>
          )}
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------- l5-136 SIP model */

export function L5SipModel() {
  const [monthly, setMonthly] = useState(10_000)
  const [years, setYears] = useState(15)
  const [returnPct, setReturnPct] = useState(12)
  const [stepUp, setStepUp] = useState(0)

  const months = years * 12
  const corpus = sipFutureValue(monthly, returnPct, months, stepUp)
  const invested = sipInvested(monthly, months, stepUp)
  const flat = sipFutureValue(monthly, returnPct, months, 0)
  const low = sipFutureValue(monthly, Math.max(0, returnPct - 2), months, stepUp)
  const high = sipFutureValue(monthly, returnPct + 2, months, stepUp)

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">SIP model</h4>
        <p className="mt-1 text-sm text-ink-300">
          A systematic plan fixes the contribution, not the return. Read the output as a range, and
          compare the step-up with the same money kept flat.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Monthly investment" value={monthly} min={1_000} max={100_000} step={1_000} onChange={setMonthly} format={rupees} />
          <Slider label="Years" value={years} min={1} max={35} step={1} onChange={setYears} format={(n) => `${n} years`} />
          <Slider label="Assumed return" value={returnPct} min={4} max={18} step={0.5} onChange={setReturnPct} format={(n) => pct(n, 1)} />
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Contribution</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="No step-up" active={stepUp === 0} onClick={() => setStepUp(0)} />
              <Choice label="+10% a year" active={stepUp === 10} onClick={() => setStepUp(10)} />
              <Choice label="+15% a year" active={stepUp === 15} onClick={() => setStepUp(15)} />
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Corpus at the assumed return" value={lakh(corpus)} note="a projection, not a promise" tone="good" />
          <Stat label="You contributed" value={lakh(invested)} note={`${months} monthly payments`} />
          <Stat label="Growth" value={lakh(corpus - invested)} note="the part nobody controls" />
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Return</th>
                <th className="px-2 py-1.5 font-medium">Corpus</th>
                <th className="px-2 py-1.5 font-medium">What it would mean</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              <tr>
                <td className="px-2 py-1.5">{pct(Math.max(0, returnPct - 2), 1)}</td>
                <td className="px-2 py-1.5">{lakh(low)}</td>
                <td className="px-2 py-1.5">A poor decade, still a plan</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5 text-white">{pct(returnPct, 1)}</td>
                <td className="px-2 py-1.5 text-white">{lakh(corpus)}</td>
                <td className="px-2 py-1.5">The middle case you were shown</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5">{pct(returnPct + 2, 1)}</td>
                <td className="px-2 py-1.5">{lakh(high)}</td>
                <td className="px-2 py-1.5">A good decade, not a target</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-400">
          {stepUp === 0
            ? `Keeping the contribution flat produces ${lakh(flat)}. A 10% step-up would produce ${lakh(
                sipFutureValue(monthly, returnPct, months, 10),
              )} on the same return.`
            : `The step-up adds ${lakh(corpus - flat)} compared with a flat contribution, because the later payments are larger.`}
        </p>
      </Panel>
    </div>
  )
}

/* -------------------------------------------------- l5-137 inflation model */

const CATEGORIES = [
  { label: 'Headline 6%', pct: 6 },
  { label: 'Education 8%', pct: 8 },
  { label: 'Food 6%', pct: 6 },
  { label: 'Electronics 2%', pct: 2 },
]

export function L5InflationModel() {
  const [amount, setAmount] = useState(50_000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(6)

  const future = futureCost(amount, rate, years)
  const eroded = amount / future

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Inflation model</h4>
        <p className="mt-1 text-sm text-ink-300">
          A goal has a price today and a different price on the day you pay it. Restate the goal
          in the rupees you will actually need.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Amount today" value={amount} min={10_000} max={500_000} step={10_000} onChange={setAmount} format={rupees} />
          <Slider label="Years to the goal" value={years} min={1} max={30} step={1} onChange={setYears} format={(n) => `${n} years`} />
          <Slider label="Inflation" value={rate} min={0} max={15} step={0.5} onChange={setRate} format={(n) => pct(n, 1)} />
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Use the rate for the category, not the headline</p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <Choice key={c.label} label={c.label} active={rate === c.pct} onClick={() => setRate(c.pct)} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Goal in future rupees" value={rupees(future)} note={`${years} years at ${pct(rate, 1)}`} tone="warn" />
          <Stat label="Extra to find" value={rupees(future - amount)} note="over the amount you budgeted today" />
          <Stat label="What today's money buys then" value={lakh(amount * eroded)} note="in today's prices" />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          At {pct(rate, 1)}, {rupees(amount)} today is the same basket as {rupees(future)} in{' '}
          {years} years. Budget the second number, not the first.
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------ l5-138 retirement model */

export function L5RetirementModel() {
  const [retireAge, setRetireAge] = useState(60)
  const [expense, setExpense] = useState(60_000)
  const [contribution, setContribution] = useState(25_000)
  const [preReturn, setPreReturn] = useState(11)

  const age = 30
  const life = 85
  const inflation = 6
  const postReturn = 7

  const yearsToRetirement = retireAge - age
  const yearsInRetirement = life - retireAge
  const needed = retirementCorpus(expense, inflation, yearsToRetirement, yearsInRetirement, postReturn)
  const projected = sipFutureValue(contribution, preReturn, yearsToRetirement * 12)
  const gap = needed - projected

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Retirement model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Two phases, two different jobs. The accumulation phase has to produce a corpus; the
          drawdown phase has to survive inflation and a long life.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Monthly expense today" value={expense} min={20_000} max={200_000} step={5_000} onChange={setExpense} format={rupees} />
          <Slider label="Monthly investment" value={contribution} min={5_000} max={150_000} step={5_000} onChange={setContribution} format={rupees} />
          <Slider label="Pre-retirement return" value={preReturn} min={6} max={15} step={0.5} onChange={setPreReturn} format={(n) => pct(n, 1)} />
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Retire at</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="Retire at 55" active={retireAge === 55} onClick={() => setRetireAge(55)} />
              <Choice label="Retire at 60" active={retireAge === 60} onClick={() => setRetireAge(60)} />
              <Choice label="Retire at 65" active={retireAge === 65} onClick={() => setRetireAge(65)} />
            </div>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Corpus needed at retirement" value={crore(needed)} note={`funds ${yearsInRetirement} years at 6% inflation`} tone="warn" />
          <Stat label="Projected corpus" value={crore(projected)} note={`${yearsToRetirement * 12} monthly investments at ${pct(preReturn, 1)}`} />
          <Stat
            label={gap > 0 ? 'Shortfall' : 'Surplus'}
            value={crore(Math.abs(gap))}
            note={gap > 0 ? 'the plan does not reach the number' : 'the plan clears the number'}
            tone={gap > 0 ? 'warn' : 'good'}
          />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          Retiring at 55 needs {crore(retirementCorpus(expense, inflation, 25, 30, postReturn))} but
          leaves only 25 years to build it. Retiring at 65 needs{' '}
          {crore(retirementCorpus(expense, inflation, 35, 20, postReturn))} and adds five years of
          contributions. Later retirement is cheaper twice over.
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------- l5-139 CAGR model */

export function L5CagrModel() {
  const [start, setStart] = useState(100_000)
  const [end, setEnd] = useState(250_000)
  const [years, setYears] = useState(8)

  const rate = cagr(start, end, years)
  const absolute = ((end - start) / start) * 100
  const doubling = rate > 0 ? 72 / rate : 0

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">CAGR model</h4>
        <p className="mt-1 text-sm text-ink-300">
          The same gain is a different annual rate depending on how long it took. That is the whole
          of CAGR, and the whole of why it cannot be compared across unequal holding periods.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Start value" value={start} min={10_000} max={1_000_000} step={10_000} onChange={setStart} format={rupees} />
          <Slider label="End value" value={end} min={10_000} max={2_000_000} step={10_000} onChange={setEnd} format={rupees} />
          <Slider label="Years held" value={years} min={1} max={25} step={1} onChange={setYears} format={(n) => `${n} years`} />
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Same endpoints, different holding period</p>
          <div className="flex flex-wrap gap-1.5">
            {[4, 8, 12, 16].map((y) => (
              <Choice key={y} label={`${y} years`} active={years === y} onClick={() => setYears(y)} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="CAGR" value={pct(rate)} note="the constant annual rate that fits the endpoints" tone="good" />
          <Stat label="Absolute return" value={pct(absolute, 1)} note="what the statement will show" />
          <Stat label="Doubles every" value={`${doubling.toFixed(1)} years`} note="at this compound rate" />
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Holding period</th>
                <th className="px-2 py-1.5 font-medium">Absolute</th>
                <th className="px-2 py-1.5 font-medium">Per year</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              {[4, 8, 12, 16].map((y) => (
                <tr key={y}>
                  <td className="px-2 py-1.5">{y} years</td>
                  <td className="px-2 py-1.5">{pct(absolute, 1)}</td>
                  <td className={`px-2 py-1.5 ${y === years ? 'text-white' : ''}`}>{pct(cagr(start, end, y))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-400">
          The ₹{inr(end - start)} gain is fixed. Only the time it took changes, and the annual rate
          moves from {pct(cagr(start, end, 4))} to {pct(cagr(start, end, 16))}.
        </p>
      </Panel>
    </div>
  )
}

/* --------------------------------------------------- l5-140 net-worth model */

const ASSETS = [
  { name: 'Cash and deposits', value: 120_000, liquid: true },
  { name: 'Equity funds', value: 850_000, liquid: true },
  { name: 'EPF balance', value: 640_000, liquid: false },
  { name: 'Flat', value: 6_500_000, liquid: false },
]

const LIABILITIES = [
  { name: 'Home loan', value: 3_800_000 },
  { name: 'Car loan', value: 210_000 },
]

const VALUATIONS = {
  market: { label: 'Market', property: 1, equity: 1, note: 'what the last statement said' },
  conservative: { label: 'Conservative', property: 0.9, equity: 0.85, note: 'a 10% haircut on property, 15% on equity' },
  distress: { label: 'Distress', property: 0.75, equity: 0.65, note: 'a forced sale in a bad month' },
} as const

type ValuationKey = keyof typeof VALUATIONS

export function L5NetworthModel() {
  const [rule, setRule] = useState<ValuationKey>('market')
  const [includeProperty, setIncludeProperty] = useState(true)

  const v = VALUATIONS[rule]
  const valued = ASSETS.filter((a) => includeProperty || a.name !== 'Flat').map((a) => ({
    ...a,
    value: a.name === 'Flat' ? a.value * v.property : a.name === 'Equity funds' ? a.value * v.equity : a.value,
  }))
  const assets = valued.reduce((n, a) => n + a.value, 0)
  const liabilities = LIABILITIES.reduce((n, l) => n + l.value, 0)
  const net = assets - liabilities
  const liquid = valued.filter((a) => a.liquid).reduce((n, a) => n + a.value, 0)
  const propertyShare = includeProperty ? ((6_500_000 * v.property) / assets) * 100 : 0

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Net-worth model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Net worth is not one number. It is a valuation rule applied to a list, and the rule is a
          decision you make before you need the answer.
        </p>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Valuation rule</p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(VALUATIONS) as ValuationKey[]).map((k) => (
              <Choice key={k} label={VALUATIONS[k].label} active={rule === k} onClick={() => setRule(k)} />
            ))}
            <Choice
              label={includeProperty ? 'Flat included' : 'Flat excluded'}
              active={!includeProperty}
              onClick={() => setIncludeProperty((p) => !p)}
            />
          </div>
          <p className="mt-1 text-[11px] text-ink-400">{v.note}</p>
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">What you own</th>
                <th className="px-2 py-1.5 font-medium text-right">Valued at</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              {valued.map((a) => (
                <tr key={a.name}>
                  <td className="px-2 py-1.5">{a.name}</td>
                  <td className="px-2 py-1.5 text-right">{rupees(a.value)}</td>
                </tr>
              ))}
              {LIABILITIES.map((l) => (
                <tr key={l.name} className="text-rose-200">
                  <td className="px-2 py-1.5">less {l.name}</td>
                  <td className="px-2 py-1.5 text-right">−{rupees(l.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Net worth" value={lakh(net)} note={v.label.toLowerCase() + ' valuations'} tone={net > 0 ? 'good' : 'warn'} />
          <Stat label="Liquid net worth" value={lakh(liquid)} note="cash and funds, before liabilities" />
          <Stat label="Property share of assets" value={pct(propertyShare, 0)} note={includeProperty ? 'one asset, one market' : 'property excluded'} tone={propertyShare > 60 ? 'warn' : 'plain'} />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          The same list is {lakh(net)} under {v.label.toLowerCase()} valuations. Nothing about the
          flat changed; only the price you would accept for it in a hurry.
        </p>
      </Panel>
    </div>
  )
}

/* ----------------------------------------------- l5-141 debt-payoff model */

const DEBTS: Debt[] = [
  { name: 'Card', balance: 240_000, annualPct: 36, minPayment: 9_000 },
  { name: 'Personal loan', balance: 90_000, annualPct: 14, minPayment: 5_000 },
  { name: 'Car loan', balance: 360_000, annualPct: 9, minPayment: 8_000 },
]

export function L5DebtPayoffModel() {
  const [extra, setExtra] = useState(0)

  const avalanche = payoff(DEBTS, extra, 'avalanche')
  const snowball = payoff(DEBTS, extra, 'snowball')
  const cheapest = avalanche.interest <= snowball.interest ? 'avalanche' : 'snowball'

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Debt-repayment model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Three debts, one pool of extra money. The order you aim it at is the only decision, and
          it only matters once there is something extra to aim.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Debt</th>
                <th className="px-2 py-1.5 font-medium text-right">Balance</th>
                <th className="px-2 py-1.5 font-medium text-right">Rate</th>
                <th className="px-2 py-1.5 font-medium text-right">Minimum</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              {DEBTS.map((d) => (
                <tr key={d.name}>
                  <td className="px-2 py-1.5">{d.name}</td>
                  <td className="px-2 py-1.5 text-right">{rupees(d.balance)}</td>
                  <td className="px-2 py-1.5 text-right">{pct(d.annualPct, 0)}</td>
                  <td className="px-2 py-1.5 text-right">{rupees(d.minPayment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Extra each month</p>
          <div className="flex flex-wrap gap-1.5">
            <Choice label="No extra" active={extra === 0} onClick={() => setExtra(0)} />
            <Choice label="₹5,000" active={extra === 5000} onClick={() => setExtra(5000)} />
            <Choice label="₹10,000" active={extra === 10000} onClick={() => setExtra(10000)} />
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat
            label="Avalanche · highest rate first"
            value={`${avalanche.months} months`}
            note={`${lakh(avalanche.interest)} of interest`}
            tone={cheapest === 'avalanche' ? 'good' : 'plain'}
          />
          <Stat
            label="Snowball · smallest balance first"
            value={`${snowball.months} months`}
            note={`${lakh(snowball.interest)} of interest`}
            tone={cheapest === 'snowball' ? 'good' : 'plain'}
          />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          {extra === 0
            ? 'With no spare cash, both methods take the same time and cost the same interest — the order only matters once there is a surplus to allocate.'
            : `${cheapest === 'avalanche' ? 'Avalanche' : 'Snowball'} is cheaper here by ${rupees(
                Math.abs(avalanche.interest - snowball.interest),
              )} and ${Math.abs(avalanche.months - snowball.months)} months. The card is the most expensive rupee you owe.`}
        </p>
        <p className="mt-1 text-xs text-ink-500">
          Cleared in this order — avalanche: {avalanche.cleared.join(' → ')}; snowball:{' '}
          {snowball.cleared.join(' → ')}.
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------ l5-142 real-return model */

const PRESETS = {
  equity: { label: 'Equity fund', nominal: 12, fee: 1.2, tax: 12.5 },
  debt: { label: 'Debt fund', nominal: 8, fee: 0.5, tax: 30 },
  fd: { label: 'Fixed deposit', nominal: 7, fee: 0, tax: 30 },
} as const

type PresetKey = keyof typeof PRESETS

export function L5RealReturnModel() {
  const [preset, setPreset] = useState<PresetKey>('equity')
  const [nominal, setNominal] = useState<number>(PRESETS.equity.nominal)
  const [fee, setFee] = useState<number>(PRESETS.equity.fee)
  const [tax, setTax] = useState<number>(PRESETS.equity.tax)
  const inflation = 6

  const afterFee = nominal - fee
  const afterTax = afterFee * (1 - tax / 100)
  const real = realReturn(afterTax, inflation)
  const kept = 100_000 * (1 + real / 100)

  const choose = (k: PresetKey) => {
    setPreset(k)
    setNominal(PRESETS[k].nominal)
    setFee(PRESETS[k].fee)
    setTax(PRESETS[k].tax)
  }

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Real-return model</h4>
        <p className="mt-1 text-sm text-ink-300">
          A headline return is a gross number. Fees, tax and inflation each take a slice, in that
          order, and what survives is what your money actually earned.
        </p>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Asset</p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
              <Choice key={k} label={PRESETS[k].label} active={preset === k} onClick={() => choose(k)} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Slider label="Nominal return" value={nominal} min={0} max={20} step={0.5} onChange={setNominal} format={(n) => pct(n, 1)} />
          <Slider label="Fund fees" value={fee} min={0} max={3} step={0.1} onChange={setFee} format={(n) => pct(n, 1)} />
          <Slider label="Tax on gains" value={tax} min={0} max={40} step={2.5} onChange={setTax} format={(n) => pct(n, 1)} />
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Layer</th>
                <th className="px-2 py-1.5 font-medium text-right">Rate</th>
                <th className="px-2 py-1.5 font-medium text-right">Running</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              <tr>
                <td className="px-2 py-1.5">Nominal return</td>
                <td className="px-2 py-1.5 text-right">{pct(nominal, 1)}</td>
                <td className="px-2 py-1.5 text-right text-white">{pct(nominal, 1)}</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5">Less fund fees</td>
                <td className="px-2 py-1.5 text-right">−{pct(fee, 1)}</td>
                <td className="px-2 py-1.5 text-right">{pct(afterFee, 1)}</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5">Less tax on gains</td>
                <td className="px-2 py-1.5 text-right">−{pct(afterFee - afterTax, 1)}</td>
                <td className="px-2 py-1.5 text-right">{pct(afterTax, 1)}</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5">Less inflation</td>
                <td className="px-2 py-1.5 text-right">−{pct(6, 1)}</td>
                <td className="px-2 py-1.5 text-right text-amber-200">{pct(real, 2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Real return" value={pct(real)} note="after fees, tax and inflation" tone={real > 0 ? 'good' : 'warn'} />
          <Stat label="₹1,00,000 after one year" value={rupees(kept)} note="in today's buying power" />
          <Stat label="What the headline promised" value={rupees(100_000 * (1 + nominal / 100))} note="before any of the slices" />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          {preset === 'fd'
            ? 'A fixed deposit is taxed every year at your slab rate, so the 30% assumption is not pessimistic — it is the rate for most people who hold one.'
            : preset === 'debt'
              ? 'Debt fund gains are taxed at slab too, which is why a fund yielding 8% can lose to inflation after tax.'
              : 'Equity gains are taxed only when sold, so the annual drag here is an average, not a bill you receive every March.'}{' '}
          At 6% inflation, {pct(real)} real is what the money is actually doing.
        </p>
      </Panel>
    </div>
  )
}
