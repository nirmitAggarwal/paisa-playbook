import { useState } from 'react'
import { project, stressTest, tornado, type Knob, type Plan } from '../../lib/plan-model'

/**
 * Level 5, band six — the planning-model chapters (l5-143 to l5-146).
 *
 * Four labs on one household plan, so the chapters cannot disagree about the
 * base case. Every figure is illustrative and every model is deliberately
 * simple: the point is which assumption the answer depends on, not a forecast.
 */

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">{children}</div>
)

const Choice = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
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
const crore = (n: number) => `₹${(n / 10_000_000).toFixed(2)} crore`
const percent = (fraction: number) => `${Math.round(fraction * 100)}%`

const BASE_PLAN: Plan = {
  monthlySaving: 25_000,
  existingCorpus: 1_200_000,
  returnPct: 11,
  inflationPct: 6,
  years: 15,
  goalToday: 15_000_000,
}

const LIQUID = 300_000
const ESSENTIALS = 52_000
const LOAN = { loanOutstanding: 4_200_000, loanRatePct: 8.6, loanMonthsLeft: 216 }

/* --------------------------------------------------- l5-143 scenario planning */

type ScenarioId = 'base' | 'bad' | 'inflation' | 'strong'

const SCENARIOS: {
  id: ScenarioId
  name: string
  patch: Partial<Plan>
  assumption: string
  response: string
}[] = [
  {
    id: 'base',
    name: 'Base',
    patch: {},
    assumption: '11% return, 6% inflation, ₹25,000 saved each month',
    response: 'Review once a year. The plan funds 48% of the goal, so the gap is the work.',
  },
  {
    id: 'bad',
    name: 'Bad decade',
    patch: { returnPct: 7 },
    assumption: 'A 7% return for the whole fifteen years',
    response: 'Raise the monthly saving by about ₹10,000, or move the goal date rather than the return assumption.',
  },
  {
    id: 'inflation',
    name: 'High inflation',
    patch: { inflationPct: 8 },
    assumption: '8% inflation, so the goal itself is larger',
    response: 'Restate the goal and raise the saving. Do not leave the old goal on the page with the new prices.',
  },
  {
    id: 'strong',
    name: 'Strong markets',
    patch: { returnPct: 14 },
    assumption: 'A 14% return for the whole fifteen years',
    response: 'Do not raise spending on the strength of it. The extra is the margin for the bad case.',
  },
]

export function L5ScenarioPlanner() {
  const [picked, setPicked] = useState<ScenarioId>('base')
  const scenario = SCENARIOS.find((s) => s.id === picked)!
  const outcome = project({ ...BASE_PLAN, ...scenario.patch })

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Scenario planner</h4>
        <p className="mt-1 text-sm text-ink-300">
          A scenario is a named set of assumptions with a response written beside it. Pick one and
          read both halves: what the plan becomes, and what you would do about it.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SCENARIOS.map((s) => (
            <Choice key={s.id} label={s.name} active={picked === s.id} onClick={() => setPicked(s.id)} />
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-400">{scenario.assumption}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Projected corpus" value={crore(outcome.corpus)} note="at the goal date" />
          <Stat label="Goal at that date" value={crore(outcome.goalFuture)} note="restated for inflation" />
          <Stat
            label="Coverage"
            value={percent(outcome.coverage)}
            note={outcome.gap > 0 ? `${crore(outcome.gap)} short` : 'goal covered'}
            tone={outcome.coverage >= 1 ? 'good' : 'warn'}
          />
        </div>
        <div className="mt-3 rounded-lg border border-brand-400/30 bg-brand-400/10 p-3 text-xs text-brand-100">
          <strong className="text-brand-300">Response: </strong>
          {scenario.response}
        </div>
      </Panel>
      <Panel>
        <h4 className="font-display text-white">Why a response beats a prediction</h4>
        <p className="mt-1 text-sm text-ink-300">
          The base case is not more likely than the others because it is in the middle. It is the
          case the plan was built for. The value of naming the other three is that the response can
          be decided now, in calm, instead of in the year the bad case arrives.
        </p>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------- l5-144 sensitivity analysis */

const KNOBS: Knob[] = [
  { key: 'years', label: 'Horizon 10–20 years', low: 10, high: 20 },
  { key: 'returnPct', label: 'Return 8–14%', low: 8, high: 14 },
  { key: 'inflationPct', label: 'Inflation 4–8%', low: 4, high: 8 },
  { key: 'monthlySaving', label: 'Saving ₹15k–35k', low: 15_000, high: 35_000 },
]

export function L5SensitivityModel() {
  const [guess, setGuess] = useState<string | null>(null)
  const rows = tornado(BASE_PLAN, KNOBS)
  const base = project(BASE_PLAN).coverage
  const largest = rows[0]

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Sensitivity model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Move one assumption at a time and leave the rest alone. The bar that moves coverage
          furthest is the one worth hedging, insuring or planning around.
        </p>
        <div className="mt-3 space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[130px_1fr_84px] items-center gap-2">
              <span className="text-[11px] text-ink-300">{r.label}</span>
              <div className="relative h-4 rounded bg-white/5">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                <div
                  className="absolute inset-y-0.5 rounded bg-brand-400/70"
                  style={{
                    left: `${Math.max(0, Math.round(r.low * 100))}%`,
                    width: `${Math.max(2, Math.round((r.high - r.low) * 100))}%`,
                  }}
                />
              </div>
              <span className="text-right text-[11px] text-ink-400">
                {(r.swing * 100).toFixed(1)} pts
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ink-500">
          Base coverage {percent(base)}. Bars show coverage at the low and high value of each knob.
        </p>
        <div className="mt-3 rounded-lg border border-white/10 bg-ink-950/50 p-3">
          <p className="text-xs text-ink-300">Which assumption moves coverage most?</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rows.map((r) => (
              <Choice key={r.label} label={r.label} active={guess === r.label} onClick={() => setGuess(r.label)} />
            ))}
          </div>
          {guess && (
            <p className={`mt-2 text-xs ${guess === largest.label ? 'text-brand-300' : 'text-amber-200'}`}>
              {guess === largest.label
                ? `Correct — the horizon moves coverage by ${(largest.swing * 100).toFixed(1)} points, more than any other single knob.`
                : `Not the largest. ${largest.label} moves coverage by ${(largest.swing * 100).toFixed(1)} points.`}
            </p>
          )}
        </div>
      </Panel>
    </div>
  )
}

/* --------------------------------------------- l5-145 best-case / worst-case */

export function L5BestWorstModel() {
  const [jobLoss, setJobLoss] = useState(6)
  const worst = stressTest(
    BASE_PLAN,
    LIQUID,
    ESSENTIALS,
    LOAN,
    { jobLossMonths: jobLoss, marketFallPct: 25, rateRisePct: 0 },
  )
  const base = project(BASE_PLAN)
  const best = project({ ...BASE_PLAN, returnPct: 14 })

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Best-case / worst-case model</h4>
        <p className="mt-1 text-sm text-ink-300">
          The worst case is not the end of the world; it is the smallest set of bad events that
          still has to be survivable without new borrowing.
        </p>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Months without income in the worst case</p>
          <div className="flex flex-wrap gap-1.5">
            {[3, 4, 6, 9].map((m) => (
              <Choice key={m} label={`${m} months`} active={jobLoss === m} onClick={() => setJobLoss(m)} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat
            label="Worst case"
            value={crore(worst.corpusAfter)}
            note={`${jobLoss} months without income, market −25%`}
            tone="warn"
          />
          <Stat label="Base case" value={crore(base.corpus)} note="no shocks" />
          <Stat label="Best case" value={crore(best.corpus)} note="14% return, no shocks" tone="good" />
        </div>
        <div className="mt-3 rounded-lg border border-white/10 bg-ink-950/50 p-3 text-xs">
          <p className={worst.survives ? 'text-brand-300' : 'text-rose-300'}>
            {worst.survives
              ? `Essentials survive: ${rupees(worst.liquidAfter)} of the buffer is left after ${jobLoss} months.`
              : `Essentials do not survive: the buffer is ${rupees(Math.abs(worst.liquidAfter))} short and the difference is new borrowing.`}
          </p>
          <p className="mt-1 text-ink-400">
            Buffer {rupees(LIQUID)} · essentials {rupees(ESSENTIALS)} a month ·{' '}
            {worst.monthsCovered.toFixed(1)} months of cover before the shock.
          </p>
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------ l5-146 stress-test model */

const STRESS_PRESETS = {
  mild: { label: 'Mild', jobLossMonths: 3, marketFallPct: 10, rateRisePct: 0 },
  combined: { label: 'Combined', jobLossMonths: 6, marketFallPct: 25, rateRisePct: 2 },
  severe: { label: 'Severe', jobLossMonths: 9, marketFallPct: 35, rateRisePct: 3 },
} as const

type PresetKey = keyof typeof STRESS_PRESETS

export function L5StressTestModel() {
  const [preset, setPreset] = useState<PresetKey>('combined')
  const shock = STRESS_PRESETS[preset]
  const result = stressTest(BASE_PLAN, LIQUID, ESSENTIALS, LOAN, shock)

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Stress-test model</h4>
        <p className="mt-1 text-sm text-ink-300">
          Test the shocks together, not one at a time. A job loss and a rate rise and a market fall
          share the same buffer, which is why the combined case is the one that breaks.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(Object.keys(STRESS_PRESETS) as PresetKey[]).map((k) => (
            <Choice key={k} label={STRESS_PRESETS[k].label} active={preset === k} onClick={() => setPreset(k)} />
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="EMI before the rise" value={rupees(result.emiBefore)} note={`${shock.rateRisePct} point rise assumed`} />
          <Stat label="EMI after the rise" value={rupees(result.emiAfter)} note={`+${rupees(result.emiIncrease)} a month`} tone="warn" />
          <Stat label="Corpus after the fall" value={crore(result.corpusAfter)} note={`market −${shock.marketFallPct}%`} />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat
            label="Months of burn covered"
            value={result.monthsCovered.toFixed(1)}
            note={`${rupees(result.monthlyBurn)} a month during the shock`}
          />
          <Stat
            label="Breaking point"
            value={`${result.breakingPoint} months`}
            note="income-free months the buffer absorbs"
            tone="warn"
          />
        </div>
        <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          result.survives
            ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
            : 'border-rose-400/40 bg-rose-400/10 text-rose-200'
        }`}>
          {result.survives
            ? `Survives: ${rupees(result.liquidAfter)} of the buffer is left after ${shock.jobLossMonths} months without income.`
            : `Fails in month ${result.breakingPoint + 1}: the buffer runs out there, and the ${shock.jobLossMonths}-month stress leaves ${rupees(Math.abs(result.liquidAfter))} to borrow.`}
        </div>
        <p className="mt-2 text-[11px] text-ink-500">
          Contributions are assumed to stop while there is no income, which is the conservative
          reading of a job loss.
        </p>
      </Panel>
    </div>
  )
}
