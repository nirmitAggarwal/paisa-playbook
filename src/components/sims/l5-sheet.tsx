import { useMemo, useState } from 'react'

/**
 * Level 5, band six — spreadsheets and models (chapters l5-129 to l5-132).
 *
 * Four labs, one per chapter. The first six chapters of the band use the
 * data-driven spreadsheet lab (`sim: 'sheet'`) and each has its own scenario in
 * `sheet-scenarios.ts`; these four teach operations the small formula engine
 * does not evaluate — lookups, dynamic filters, chart choice and pivots — so
 * each gets a lab that models the operation rather than a cell grid.
 *
 *   l5-lookup-builder   resolve a key, and handle the miss
 *   l5-filter-builder   build a condition and watch the rows that pass
 *   l5-chart-builder    match the question to the chart, and see an honest axis
 *   l5-pivot-builder    fold a transaction list into a grid, and change the measure
 *
 * Every figure here is illustrative. The chapters carry the sources.
 */

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">{children}</div>
)

const Choice = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition ${
      active
        ? 'border-brand-400/60 bg-brand-400/15 text-white'
        : 'border-white/10 bg-white/5 text-ink-300 hover:border-white/30'
    }`}
  >
    {label}
  </button>
)

const Verdict = ({ tone, children }: { tone: 'good' | 'ok' | 'bad'; children: React.ReactNode }) => {
  const styles = {
    good: 'border-brand-400/40 bg-brand-400/10 text-brand-200',
    ok: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
    bad: 'border-rose-400/40 bg-rose-400/10 text-rose-200',
  }
  return <div className={`rounded-lg border px-3 py-2 text-xs ${styles[tone]}`}>{children}</div>
}

const Score = ({ right, total }: { right: number; total: number }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-ink-300">
    Score <span className="font-semibold text-white">{right}</span> / {total}
  </div>
)

const inr = (n: number) => n.toLocaleString('en-IN')

type Option = { text: string; correct?: boolean; why: string }
type Question = { q: string; options: Option[] }

/** Renders a question, its options and the explanation once one is chosen. */
function QuestionCard({
  question,
  index,
  picked,
  onPick,
}: {
  question: Question
  index: number
  picked?: number
  onPick: (i: number) => void
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs text-ink-200">
        <span className="mr-1 text-ink-500">Q{index + 1}.</span>
        {question.q}
      </p>
      <div className="mt-2 space-y-1.5">
        {question.options.map((o, i) => (
          <button
            key={o.text}
            type="button"
            onClick={() => onPick(i)}
            className={`block w-full rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition ${
              picked === undefined
                ? 'border-white/10 bg-white/5 text-ink-300 hover:border-white/30'
                : picked === i
                  ? o.correct
                    ? 'border-brand-400/60 bg-brand-400/15 text-brand-100'
                    : 'border-rose-400/60 bg-rose-400/15 text-rose-100'
                  : 'border-white/10 bg-white/5 text-ink-400'
            }`}
          >
            {o.text}
          </button>
        ))}
      </div>
      {picked !== undefined && (
        <p className="mt-2 text-[11px] text-ink-300">{question.options[picked].why}</p>
      )}
    </div>
  )
}

/* ------------------------------------------------- l5-129 lookup and the miss */

type Folio = { code: string; holder: string; value: number; status: string }

const FOLIOS: Folio[] = [
  { code: 'FOL-204', holder: 'A. Menon', value: 124000, status: 'Active' },
  { code: 'FOL-311', holder: 'R. Iyer', value: 88500, status: 'Active' },
  { code: 'FOL-418', holder: 'S. Khan', value: 210400, status: 'Active' },
  { code: 'FOL-509', holder: 'P. Das', value: 64200, status: 'Closed' },
]

const LOOKUP_QUESTIONS: Question[] = [
  {
    q: 'You need the value held against folio FOL-418. Which formula returns it?',
    options: [
      {
        text: '=XLOOKUP("FOL-418", A2:A5, C2:C5)',
        correct: true,
        why: 'The key is searched in the code column and the value comes from the value column. This is the whole shape of a lookup.',
      },
      {
        text: '=XLOOKUP("FOL-418", C2:C5, A2:A5)',
        why: 'The arguments are reversed: this searches the value column for the text "FOL-418" and returns a code, so it finds nothing.',
      },
      {
        text: '=XLOOKUP("FOL-418", A2:A5, C2:C5, , 1)',
        why: 'A match mode of 1 asks for the nearest smaller value. Codes are not a sorted scale, so a near match is simply a different person.',
      },
      {
        text: '=XLOOKUP(C2:C5, "FOL-418", A2:A5)',
        why: 'The lookup value and the lookup array are swapped. A lookup array can never be a single string, and a key can never be a range of values.',
      },
    ],
  },
  {
    q: 'A colleague gives you the code FOL-777 and it is not in the table. What does the fourth argument of XLOOKUP change?',
    options: [
      {
        text: 'It is the value returned when no match is found, instead of #N/A',
        correct: true,
        why: 'A fallback such as 0, "Not on file" or "" keeps the sheet readable. Without it the miss is visible as #N/A, which is at least honest.',
      },
      {
        text: 'It sorts the lookup column so the search is faster',
        why: 'XLOOKUP does not sort anything. Sorting is a separate action on the data, and it does not make a missing code appear.',
      },
      {
        text: 'It turns on approximate matching',
        why: 'Match mode is the fifth argument, and approximate matching needs a sorted column of brackets. The fourth argument only supplies a fallback.',
      },
      {
        text: 'It hides the row that failed',
        why: 'A formula returns a value; it does not delete or hide the row it lives in. Hiding is a filter, which is a different operation.',
      },
    ],
  },
  {
    q: 'Why is approximate matching the wrong choice for a folio code?',
    options: [
      {
        text: 'Codes are identifiers, not brackets, so the nearest code is a different folio',
        correct: true,
        why: 'Approximate matching belongs to things like tax slabs and grade bands, where the nearest lower threshold is the intended answer. For an identifier it returns a wrong record with no error.',
      },
      {
        text: 'It is slower than an exact match, which matters on large sheets',
        why: 'Speed is not the issue. Correctness is: an approximate match on an unsorted identifier column returns whatever the search happens to land on.',
      },
      {
        text: 'It cannot return a number, only text',
        why: 'It returns whatever the return column holds. The problem is which row it picks, not the type of the result.',
      },
      {
        text: 'It is the same as an exact match, so the choice does not matter',
        why: 'The two return different rows whenever the key is missing or the column is unsorted. That difference is exactly the risk.',
      },
    ],
  },
]

export function L5LookupBuilder() {
  const [picked, setPicked] = useState<Record<number, number>>({})
  const [key, setKey] = useState('FOL-418')
  const [fallback, setFallback] = useState(true)

  const hit = FOLIOS.find((f) => f.code === key)
  const right = LOOKUP_QUESTIONS.filter((q, i) => picked[i] !== undefined && q.options[picked[i]].correct).length

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Resolve a key, and decide what a miss looks like</h4>
        <p className="mt-1 text-sm text-ink-300">
          Pick a code. The table is the lookup array; the answer is what a formula would return for that key.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[...FOLIOS.map((f) => f.code), 'FOL-777'].map((c) => (
            <Choice key={c} label={c} active={key === c} onClick={() => setKey(c)} />
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Code</th>
                <th className="px-2 py-1.5 font-medium">Holder</th>
                <th className="px-2 py-1.5 font-medium">Value ₹</th>
                <th className="px-2 py-1.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {FOLIOS.map((f) => (
                <tr key={f.code} className={f.code === key ? 'bg-brand-400/10 text-white' : 'text-ink-300'}>
                  <td className="px-2 py-1.5">{f.code}</td>
                  <td className="px-2 py-1.5">{f.holder}</td>
                  <td className="px-2 py-1.5">{inr(f.value)}</td>
                  <td className="px-2 py-1.5">{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label className="mt-3 flex items-center gap-2 text-[11px] text-ink-300">
          <input
            type="checkbox"
            checked={fallback}
            onChange={(e) => setFallback(e.target.checked)}
            className="accent-brand-400"
          />
          Supply the fourth argument, a fallback for a missing key
        </label>
        <div className="mt-3 space-y-2 font-mono text-[11px]">
          <p className="text-ink-400">
            =XLOOKUP(&quot;{key}&quot;, A2:A5, C2:C5{fallback ? ', "Not on file"' : ''})
          </p>
          {hit ? (
            <Verdict tone="good">
              Returns {inr(hit.value)} — {hit.holder}, {hit.status}.
            </Verdict>
          ) : (
            <Verdict tone={fallback ? 'ok' : 'bad'}>
              {fallback
                ? 'No match: returns "Not on file". The sheet still reads, and the miss is visible.'
                : 'No match: returns #N/A. Honest, but it will break any total that includes this cell.'}
            </Verdict>
          )}
        </div>
      </Panel>

      {LOOKUP_QUESTIONS.map((q, i) => (
        <QuestionCard
          key={q.q}
          question={q}
          index={i}
          picked={picked[i]}
          onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))}
        />
      ))}
      <Score right={right} total={LOOKUP_QUESTIONS.length} />
    </div>
  )
}

/* ---------------------------------------------- l5-130 filter and the spill */

type Txn = { month: string; category: string; mode: string; amount: number }

const TXNS: Txn[] = [
  { month: 'Aug', category: 'Food', mode: 'Card', amount: 1450 },
  { month: 'Aug', category: 'Food', mode: 'UPI', amount: 620 },
  { month: 'Aug', category: 'Home', mode: 'Auto-debit', amount: 1800 },
  { month: 'Aug', category: 'Transport', mode: 'UPI', amount: 380 },
  { month: 'Aug', category: 'Health', mode: 'UPI', amount: 1500 },
  { month: 'Sep', category: 'Food', mode: 'Card', amount: 3100 },
  { month: 'Sep', category: 'Food', mode: 'UPI', amount: 750 },
  { month: 'Sep', category: 'Transport', mode: 'Card', amount: 1200 },
  { month: 'Sep', category: 'Home', mode: 'Auto-debit', amount: 1800 },
  { month: 'Sep', category: 'Health', mode: 'UPI', amount: 4200 },
]

const FILTER_FIELDS = ['Category', 'Month', 'Mode', 'Amount above ₹2,000'] as const
type FilterField = (typeof FILTER_FIELDS)[number]

const FIELD_VALUES: Record<FilterField, string[]> = {
  Category: ['Food', 'Home', 'Transport', 'Health'],
  Month: ['Aug', 'Sep'],
  Mode: ['Card', 'UPI', 'Auto-debit'],
  'Amount above ₹2,000': ['Yes'],
}

function passes(t: Txn, field: FilterField, value: string): boolean {
  if (field === 'Amount above ₹2,000') return t.amount > 2000
  if (field === 'Category') return t.category === value
  if (field === 'Month') return t.month === value
  return t.mode === value
}

const FILTER_QUESTIONS: Question[] = [
  {
    q: 'Where can a FILTER formula be written?',
    options: [
      {
        text: 'In one cell, with empty cells below and to the right for the result to spill into',
        correct: true,
        why: 'A FILTER returns a block of rows, and a block needs room. One formula in the top-left cell produces the whole table.',
      },
      {
        text: 'In one cell, and Excel shrinks the surrounding rows to fit the answer',
        why: 'Nothing is resized automatically. If the cells below hold anything at all, the result cannot land and the formula returns #SPILL!.',
      },
      {
        text: 'Only in the first row of a sheet, because a spill cannot cross a row',
        why: 'A spill crosses rows freely. What it cannot do is overwrite a cell that already has content.',
      },
      {
        text: 'It has to be copied down once for every row you expect',
        why: 'That is the old helper-column approach. FILTER is dynamic: one formula, and the block grows or shrinks with the data.',
      },
    ],
  },
  {
    q: 'A note is typed in a cell two rows below a FILTER result. What happens?',
    options: [
      {
        text: 'The formula returns #SPILL! until the blocking cell is cleared',
        correct: true,
        why: 'The formula is not wrong; the space is occupied. #SPILL! is the spreadsheet telling you the result had nowhere to go.',
      },
      {
        text: 'The note is deleted automatically to make room',
        why: 'Spilled results never overwrite existing content. The refusal is the safety mechanism, not a bug.',
      },
      {
        text: 'The result quietly shrinks to exclude the rows that would have touched the note',
        why: 'There is no partial spill. Either the whole block fits or the formula errors, so a silent truncation cannot hide rows from you.',
      },
      {
        text: 'Nothing: the note sits on top of the result and both are readable',
        why: 'Two values cannot occupy one cell. One of them has to move, and the formula is the one that gives way.',
      },
    ],
  },
  {
    q: 'A new transaction is added to the bottom of the source table. What does a FILTER whose range covers the whole column do?',
    options: [
      {
        text: 'It includes the new row on recalculation, without the formula being edited',
        correct: true,
        why: 'That is the difference between filtering a view and building a live table: the result is derived, so it follows the data.',
      },
      {
        text: 'It keeps the old rows until the formula is copied down again',
        why: 'A dynamic range does not need copying. The block is recomputed from the source on every change.',
      },
      {
        text: 'It returns #SPILL! because the result grew',
        why: 'Growth is expected. A spill error appears when the destination is blocked, not when the answer gets longer.',
      },
      {
        text: 'It includes the row only if the new row is inside the original selection exactly',
        why: 'The range decides what is read. Cover the table, or better a whole-column range, and new rows fall inside it by definition.',
      },
    ],
  },
]

export function L5FilterBuilder() {
  const [field, setField] = useState<FilterField>('Category')
  const [value, setValue] = useState('Food')
  const [picked, setPicked] = useState<Record<number, number>>({})

  const rows = useMemo(() => TXNS.filter((t) => passes(t, field, value)), [field, value])
  const total = rows.reduce((n, t) => n + t.amount, 0)
  const right = FILTER_QUESTIONS.filter((q, i) => picked[i] !== undefined && q.options[picked[i]].correct).length

  const chooseField = (f: FilterField) => {
    setField(f)
    setValue(FIELD_VALUES[f][0])
  }

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">One condition, and the rows that pass it</h4>
        <p className="mt-1 text-sm text-ink-300">
          This is what FILTER does to a list: it reads every row, keeps the ones that pass, and returns them as a block.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {FILTER_FIELDS.map((f) => (
            <Choice key={f} label={f} active={field === f} onClick={() => chooseField(f)} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {FIELD_VALUES[field].map((v) => (
            <Choice key={v} label={v} active={value === v} onClick={() => setValue(v)} />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-ink-400">
          =FILTER(A2:D11, {field === 'Amount above ₹2,000' ? 'D2:D11>2000' : `${field[0] === 'C' ? 'B' : field[0] === 'M' ? 'A' : 'C'}2:${field[0] === 'C' ? 'B' : field[0] === 'M' ? 'A' : 'C'}11="${value}"`}, &quot;none&quot;)
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Month</th>
                <th className="px-2 py-1.5 font-medium">Category</th>
                <th className="px-2 py-1.5 font-medium">Mode</th>
                <th className="px-2 py-1.5 font-medium">Amount ₹</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-2 py-2 text-ink-400">
                    No rows pass — the fallback &quot;none&quot; is what keeps the sheet readable.
                  </td>
                </tr>
              ) : (
                rows.map((t) => (
                  <tr key={`${t.month}-${t.category}-${t.amount}`} className="text-ink-300">
                    <td className="px-2 py-1.5">{t.month}</td>
                    <td className="px-2 py-1.5">{t.category}</td>
                    <td className="px-2 py-1.5">{t.mode}</td>
                    <td className="px-2 py-1.5">{inr(t.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-ink-300">
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
            {rows.length} rows pass
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">₹{inr(total)} in total</span>
          <span className="text-ink-500">The block below this formula has to stay empty.</span>
        </div>
      </Panel>

      {FILTER_QUESTIONS.map((q, i) => (
        <QuestionCard
          key={q.q}
          question={q}
          index={i}
          picked={picked[i]}
          onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))}
        />
      ))}
      <Score right={right} total={FILTER_QUESTIONS.length} />
    </div>
  )
}

/* -------------------------------------------- l5-131 chart choice and the axis */

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
const SURPLUS = [17000, 11500, 24000, 6500, 15000, 25000]

type ChartKind = 'line' | 'bars' | 'stacked' | 'scatter'

const CHART_LABEL: Record<ChartKind, string> = {
  line: 'Line',
  bars: 'Bars',
  stacked: 'Stacked share',
  scatter: 'Scatter',
}

const CHART_QUESTIONS: Question[] = [
  {
    q: 'You need to show how the monthly surplus moved from April to September. Which chart answers it?',
    options: [
      {
        text: 'A line chart, months across the x-axis',
        correct: true,
        why: 'A line is a claim about direction over an ordered axis. Time is ordered, so the line is the honest default for a trend.',
      },
      {
        text: 'A pie chart of the six months',
        why: 'A pie compares parts of a whole. Six months are not parts of a total; a pie would imply that September is a share of the year.',
      },
      {
        text: 'A stacked bar of the six months',
        why: 'Stacking sums the months into one meaningless total. It also hides the very movement you are trying to show.',
      },
      {
        text: 'A scatter of month number against surplus',
        why: 'A scatter is for the relationship between two measurements, not for a single series over time. It would work, but it adds nothing here.',
      },
    ],
  },
  {
    q: 'You need to show that rent, food and transport together make up most of a month. Which chart?',
    options: [
      {
        text: 'A stacked bar or 100% stacked bar of the three categories',
        correct: true,
        why: 'Composition is a part-to-whole question. Stacking the parts into one bar shows both the shares and the total at a glance.',
      },
      {
        text: 'Three separate lines, one per category',
        why: 'Lines show movement. They make the reader add three trajectories in their head to see a share of the month.',
      },
      {
        text: 'A scatter of category against amount',
        why: 'Category names are labels, not measurements. Plotting them against amounts produces a column of dots, not a composition.',
      },
      {
        text: 'A bar chart sorted by amount',
        why: 'Sorted bars compare the categories well but do not show that they are parts of one month. Add a total, or stack them.',
      },
    ],
  },
  {
    q: 'You need to compare the surplus of six months side by side. Which chart?',
    options: [
      {
        text: 'A bar chart with one bar per month',
        correct: true,
        why: 'Lengths on a common baseline are the easiest comparison the eye makes. Bars are the right tool for ranked or categorical comparison.',
      },
      {
        text: 'A single line through the six points',
        why: 'A line implies continuity between the points. For a comparison of discrete months, the line hides the individual values behind a shape.',
      },
      {
        text: 'A pie chart with six slices',
        why: 'Six slices are hard to compare, and the months are not shares of one quantity unless you define the year as the whole.',
      },
      {
        text: 'A stacked bar with all six months in one bar',
        why: 'That answers what the six months add up to, not how they compare. The tallest month would be invisible.',
      },
    ],
  },
  {
    q: 'A bar chart of the same four values starts its axis at 90 instead of 0. What has changed?',
    options: [
      {
        text: 'The differences look far larger than they are, because bar length no longer encodes the value',
        correct: true,
        why: 'A bar is read by its length from the axis. Cutting the bottom off leaves a short bar standing for a large value, which is a visual exaggeration.',
      },
      {
        text: 'Nothing: the numbers on the axis are still correct',
        why: 'The labels are correct and the picture is not. The reader compares the drawn lengths, and those lengths no longer represent the values.',
      },
      {
        text: 'The chart becomes a log scale, which is the honest fix',
        why: 'A log axis is a different, explicit choice, and it is labelled as one. Truncating an axis is not a scale: it is an unlabelled crop.',
      },
      {
        text: 'The chart is fine as long as the data labels are shown',
        why: 'Labels help, but the shape still carries the message. If the shape is misleading, most readers will take the message, not the numbers.',
      },
    ],
  },
]

export function L5ChartBuilder() {
  const [picked, setPicked] = useState<Record<number, number>>({})
  const [axis, setAxis] = useState(0)
  const max = Math.max(...SURPLUS)
  const right = CHART_QUESTIONS.filter((q, i) => picked[i] !== undefined && q.options[picked[i]].correct).length

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">The same data, and an axis you choose</h4>
        <p className="mt-1 text-sm text-ink-300">
          Six months of surplus. Move the axis floor and watch the story change while the numbers do not.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-300">
          <span>Axis starts at</span>
          {[0, 40, 80].map((v) => (
            <Choice key={v} label={`₹${v}k`} active={axis === v} onClick={() => setAxis(v)} />
          ))}
        </div>
        <svg viewBox="0 0 340 130" className="mt-2 w-full" role="img" aria-label="Monthly surplus bars">
          {MONTHS.map((m, i) => {
            const h = Math.max(2, ((SURPLUS[i] - axis * 100) / (max - axis * 100)) * 92)
            return (
              <g key={m}>
                <rect x={26 + i * 52} y={104 - h} width="30" height={h} rx="2" fill="#38bdf8" opacity="0.55" />
                <text x={30 + i * 52} y="116" fill="#8b93ad" fontSize="8">
                  {m}
                </text>
                <text x={30 + i * 52} y={100 - h} fill="#c9cfe4" fontSize="7">
                  {Math.round(SURPLUS[i] / 1000)}k
                </text>
              </g>
            )
          })}
          <line x1="20" y1="104" x2="336" y2="104" stroke="rgba(255,255,255,0.18)" />
        </svg>
        <Verdict tone={axis === 0 ? 'good' : 'bad'}>
          {axis === 0
            ? 'Starting at zero: the bar lengths are proportional to the values, so July really does look like the smallest month.'
            : `Starting at ₹${axis}k: June (₹24k) and September (₹25k) now look like a different order of magnitude from July (₹6.5k). The numbers are unchanged; the picture is not.`}
        </Verdict>
      </Panel>

      <Panel>
        <h4 className="font-display text-white">Which chart would you draw?</h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(['line', 'bars', 'stacked', 'scatter'] as ChartKind[]).map((k) => (
            <div key={k} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="mb-1 text-[11px] text-ink-300">{CHART_LABEL[k]}</p>
              <svg viewBox="0 0 150 52" className="w-full" role="img" aria-label={`${CHART_LABEL[k]} preview`}>
                {k === 'line' && (
                  <polyline
                    points="6,44 34,30 62,36 90,18 118,26 144,8"
                    fill="none"
                    stroke="#34e0a1"
                    strokeWidth="1.8"
                  />
                )}
                {k === 'bars' &&
                  [18, 26, 12, 34, 22, 38].map((h, i) => (
                    <rect key={i} x={6 + i * 24} y={46 - h} width="14" height={h} fill="#38bdf8" opacity="0.6" />
                  ))}
                {k === 'stacked' && (
                  <>
                    <rect x="10" y="30" width="18" height="16" fill="#c084fc" opacity="0.6" />
                    <rect x="10" y="18" width="18" height="12" fill="#facc15" opacity="0.6" />
                    <rect x="10" y="10" width="18" height="8" fill="#34e0a1" opacity="0.6" />
                    <rect x="60" y="34" width="18" height="12" fill="#c084fc" opacity="0.6" />
                    <rect x="60" y="24" width="18" height="10" fill="#facc15" opacity="0.6" />
                    <rect x="60" y="14" width="18" height="10" fill="#34e0a1" opacity="0.6" />
                    <rect x="110" y="36" width="18" height="10" fill="#c084fc" opacity="0.6" />
                    <rect x="110" y="28" width="18" height="8" fill="#facc15" opacity="0.6" />
                    <rect x="110" y="16" width="18" height="12" fill="#34e0a1" opacity="0.6" />
                  </>
                )}
                {k === 'scatter' &&
                  [
                    [16, 40],
                    [34, 32],
                    [52, 36],
                    [74, 24],
                    [96, 28],
                    [118, 16],
                    [134, 20],
                  ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#fb7185" opacity="0.7" />)}
              </svg>
            </div>
          ))}
        </div>
      </Panel>

      {CHART_QUESTIONS.map((q, i) => (
        <QuestionCard
          key={q.q}
          question={q}
          index={i}
          picked={picked[i]}
          onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))}
        />
      ))}
      <Score right={right} total={CHART_QUESTIONS.length} />
    </div>
  )
}

/* -------------------------------------------- l5-132 pivot rows, columns, values */

type PivotTxn = { month: string; category: string; amount: number }

const PIVOT_TXNS: PivotTxn[] = [
  { month: 'Aug', category: 'Food', amount: 1450 },
  { month: 'Aug', category: 'Food', amount: 620 },
  { month: 'Aug', category: 'Home', amount: 18000 },
  { month: 'Aug', category: 'Transport', amount: 380 },
  { month: 'Sep', category: 'Food', amount: 3100 },
  { month: 'Sep', category: 'Food', amount: 750 },
  { month: 'Sep', category: 'Home', amount: 1800 },
  { month: 'Sep', category: 'Transport', amount: 1200 },
  { month: 'Oct', category: 'Food', amount: 2000 },
  { month: 'Oct', category: 'Home', amount: 1800 },
  { month: 'Oct', category: 'Transport', amount: 900 },
  { month: 'Oct', category: 'Health', amount: 4200 },
]

type RowField = 'category' | 'month'
type ValueKind = 'sum' | 'count' | 'average'

const PIVOT_QUESTIONS: Question[] = [
  {
    q: 'You switch the value field from Sum to Count. Why do the numbers fall so sharply?',
    options: [
      {
        text: 'Count returns the number of rows in each cell, not the rupees those rows hold',
        correct: true,
        why: 'A pivot has three independent choices: what goes on the rows, what goes on the columns, and what is measured. Changing the measure changes the question.',
      },
      {
        text: 'Count is capped at 100, so large totals are truncated',
        why: 'There is no cap. Count of a category with four rows is four, whatever the amounts are.',
      },
      {
        text: 'Count excludes blank cells, which removes most transactions',
        why: 'Count excludes blanks, but the drop here is because it is counting rows rather than adding amounts. The two measures answer different questions.',
      },
      {
        text: 'The pivot has not refreshed yet, so it is showing stale sums',
        why: 'A stale pivot shows old sums, not small counts. The change in magnitude is the measure changing, not the data.',
      },
    ],
  },
  {
    q: 'Three October rows are added to the source list. The pivot still shows the old totals. What is the reason?',
    options: [
      {
        text: 'The pivot caches its result and has to be refreshed after the source changes',
        correct: true,
        why: 'That cache is why a pivot is fast and why it can be wrong. Refresh is a deliberate step, and the source range has to include the new rows.',
      },
      {
        text: 'A pivot cannot include rows added after it was created',
        why: 'It can, once refreshed. The limitation is that the change is not automatic, not that it is impossible.',
      },
      {
        text: 'October has to be added as a new column field first',
        why: 'New values in an existing field appear on refresh. The field already exists; the cache is the problem.',
      },
      {
        text: 'The pivot is summing only the first ten rows it was built from',
        why: 'It sums whatever the source range covers. If the range excludes the new rows, extend the range and refresh.',
      },
    ],
  },
  {
    q: 'A cell in the pivot is blank. What does it mean?',
    options: [
      {
        text: 'No rows matched that row-and-column combination — which is not the same as a total of zero',
        correct: true,
        why: 'An empty cell can mean there were no transactions, or that the transactions summed to zero. The pivot cannot tell you which, and that matters before you act on it.',
      },
      {
        text: 'The formula in that cell is broken',
        why: 'A pivot cell is not a formula you wrote. A blank is a statement about the rows that matched, not an error.',
      },
      {
        text: 'The source data has a missing value in that row',
        why: 'A missing source value would show as a blank or a zero in the measure, but the empty cell here is about the combination of fields.',
      },
      {
        text: 'The pivot needs to be refreshed before it can show a zero',
        why: 'Refreshing does not change an empty combination into a zero. If you need to distinguish the two, count the rows as well as summing them.',
      },
    ],
  },
]

export function L5PivotBuilder() {
  const [rowField, setRowField] = useState<RowField>('category')
  const [colField, setColField] = useState<RowField | 'none'>('month')
  const [measure, setMeasure] = useState<ValueKind>('sum')
  const [picked, setPicked] = useState<Record<number, number>>({})

  const table = useMemo(() => {
    const rowKeys = [...new Set(PIVOT_TXNS.map((t) => t[rowField]))]
    const colKeys = colField === 'none' ? ['Total'] : [...new Set(PIVOT_TXNS.map((t) => t[colField]))]
    const cell = (rk: string, ck: string) => {
      const rows = PIVOT_TXNS.filter(
        (t) => t[rowField] === rk && (colField === 'none' || t[colField] === ck),
      )
      if (rows.length === 0) return null
      if (measure === 'count') return rows.length
      const sum = rows.reduce((n, t) => n + t.amount, 0)
      return measure === 'sum' ? sum : Math.round(sum / rows.length)
    }
    return { rowKeys, colKeys, cell }
  }, [rowField, colField, measure])

  const right = PIVOT_QUESTIONS.filter((q, i) => picked[i] !== undefined && q.options[picked[i]].correct).length

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Twelve transactions, one grid</h4>
        <p className="mt-1 text-sm text-ink-300">
          Rows, columns and values are three separate decisions. Change one and the same list gives a different table.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Rows</p>
            <div className="flex flex-wrap gap-1.5">
              {(['category', 'month'] as RowField[]).map((f) => (
                <Choice key={f} label={f} active={rowField === f} onClick={() => setRowField(f)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Columns</p>
            <div className="flex flex-wrap gap-1.5">
              {(['month', 'category', 'none'] as const).map((f) => (
                <Choice key={f} label={f} active={colField === f} onClick={() => setColField(f)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Values</p>
            <div className="flex flex-wrap gap-1.5">
              {(['sum', 'count', 'average'] as ValueKind[]).map((m) => (
                <Choice key={m} label={m} active={measure === m} onClick={() => setMeasure(m)} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">{rowField === 'category' ? 'Category' : 'Month'}</th>
                {table.colKeys.map((c) => (
                  <th key={c} className="px-2 py-1.5 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rowKeys.map((rk) => (
                <tr key={rk} className="text-ink-300">
                  <td className="px-2 py-1.5 text-white">{rk}</td>
                  {table.colKeys.map((ck) => {
                    const v = table.cell(rk, ck)
                    return (
                      <td key={ck} className={`px-2 py-1.5 ${v === null ? 'text-ink-600' : ''}`}>
                        {v === null ? '—' : measure === 'count' ? v : inr(v)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-ink-400">
          {measure === 'count'
            ? 'Count of rows. Four food transactions read as 4, whatever they cost.'
            : measure === 'average'
              ? 'Average amount per transaction in each cell.'
              : 'Sum of amounts. A dash means no row matched that combination.'}
        </p>
      </Panel>

      {PIVOT_QUESTIONS.map((q, i) => (
        <QuestionCard
          key={q.q}
          question={q}
          index={i}
          picked={picked[i]}
          onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))}
        />
      ))}
      <Score right={right} total={PIVOT_QUESTIONS.length} />
    </div>
  )
}
