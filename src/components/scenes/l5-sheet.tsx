/**
 * Level 5 illustrations — band six, batch 1 (chapters l5-123 to l5-132).
 *
 * One illustration per chapter, drawn for that chapter's own idea:
 *   workbook-architecture  inputs, calculations and a summary, in one direction
 *   sheet-feature-map      the four features that matter, and where they sit
 *   reference-types        a formula copied down, with and without a `$`
 *   sum-traps              what SUM quietly leaves out, and what it counts twice
 *   if-branch              one test, two branches, and a nested second test
 *   criteria-grid          SUMIFS as a set of intersecting conditions
 *   lookup-line            a key found in another column, and the miss that needs a fallback
 *   filter-sieve           rows passing a condition, and the spill below
 *   chart-choice           four questions and the chart that answers each
 *   pivot-cube             a transaction list folded into a category-by-month grid
 *
 * Scenes are plain SVG fragments; the `Scene` wrapper supplies the
 * viewBox="0 0 400 220" and the caption. Each is used by exactly one chapter.
 */

const INK = '#c9cfe4'
const MUTED = '#8b93ad'
const LINE = 'rgba(255,255,255,0.14)'
const GOOD = '#34e0a1'
const BLUE = '#38bdf8'
const PURPLE = '#c084fc'
const AMBER = '#facc15'
const ROSE = '#fb7185'

/** l5-123 — three layers, and the one-direction rule between them. */
export function WorkbookArchitecture() {
  const sheets = [
    { name: 'Inputs', c: AMBER, y: 44, lines: ['salary 78,000', 'rent 18,000', 'EMI 11,000'] },
    { name: 'Calculations', c: BLUE, y: 96, lines: ['total income', 'total spending', 'surplus'] },
    { name: 'Summary', c: GOOD, y: 148, lines: ['saving rate 47%', 'surplus 42,300'] },
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        One workbook, three jobs
      </text>
      {sheets.map((s) => (
        <g key={s.name}>
          <rect x="40" y={s.y} width="140" height="40" rx="5" fill={s.c} opacity="0.16" stroke={LINE} />
          <text x="50" y={s.y + 16} fill={s.c} fontSize="10" fontWeight="600">
            {s.name}
          </text>
          <text x="50" y={s.y + 30} fill={MUTED} fontSize="7.5">
            {s.lines[0]} · {s.lines[1]}
          </text>
          <text x="192" y={s.y + 16} fill={INK} fontSize="8">
            {s.lines[2]}
          </text>
        </g>
      ))}
      {[84, 136].map((y) => (
        <g key={y}>
          <line x1="110" y1={y} x2="110" y2={y + 12} stroke={GOOD} strokeWidth="1.4" />
          <polygon points={`106,${y + 8} 114,${y + 8} 110,${y + 14}`} fill={GOOD} />
        </g>
      ))}
      <rect x="232" y="44" width="144" height="144" rx="6" fill="rgba(255,255,255,0.03)" stroke={LINE} />
      <text x="244" y="62" fill={INK} fontSize="9" fontWeight="600">
        The rule that keeps it honest
      </text>
      <text x="244" y="82" fill={MUTED} fontSize="8">
        Data enters once, on Inputs.
      </text>
      <text x="244" y="98" fill={MUTED} fontSize="8">
        Calculations only read cells.
      </text>
      <text x="244" y="114" fill={MUTED} fontSize="8">
        Summary only reads results.
      </text>
      <text x="244" y="136" fill={AMBER} fontSize="8">
        A number typed into the
      </text>
      <text x="244" y="150" fill={AMBER} fontSize="8">
        summary is a number that
      </text>
      <text x="244" y="164" fill={AMBER} fontSize="8">
        stops updating tomorrow.
      </text>
      <text x="24" y="210" fill={MUTED} fontSize="7.5">
        Every arrow points one way. The day a summary cell is typed by hand, the workbook has two versions of the truth.
      </text>
    </>
  )
}

/** l5-124 — the features that matter, mapped onto the grid they act on. */
export function SheetFeatureMap() {
  const cols = [0, 1, 2, 3, 4]
  const rows = [0, 1, 2, 3]
  const cell = (c: number, r: number) => ({ x: 148 + c * 44, y: 44 + r * 26 })
  const features = [
    { label: 'Named range', c: BLUE, at: cell(1, 1), note: 'B2:B9 has a name' },
    { label: 'Filter', c: GOOD, at: cell(0, 2), note: 'hides rows, keeps them' },
    { label: 'Validation', c: AMBER, at: cell(3, 0), note: 'a list, not free text' },
    { label: 'Share link', c: ROSE, at: cell(4, 3), note: 'read-only, or not at all' },
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Four features, one grid
      </text>
      {rows.map((r) =>
        cols.map((c) => {
          const { x, y } = cell(c, r)
          const head = r === 0 || c === 0
          return (
            <rect
              key={`${c}-${r}`}
              x={x}
              y={y}
              width="44"
              height="26"
              fill={head ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)'}
              stroke={LINE}
            />
          )
        }),
      )}
      {features.map((f, i) => {
        const y = 66 + i * 34
        return (
          <g key={f.label}>
            <circle cx="30" cy={y - 3} r="3.5" fill={f.c} opacity="0.7" />
            <text x="40" y={y} fill={INK} fontSize="8.5">
              {f.label}
            </text>
            <text x="40" y={y + 11} fill={MUTED} fontSize="7">
              {f.note}
            </text>
            <line x1="122" y1={y - 3} x2={f.at.x + 6} y2={f.at.y + 13} stroke={f.c} strokeWidth="0.9" opacity="0.7" />
          </g>
        )
      })}
      <text x="148" y="164" fill={MUTED} fontSize="7.5">
        Sorting reorders the rows a filter is hiding. That is why a
      </text>
      <text x="148" y="176" fill={MUTED} fontSize="7.5">
        sorted view and a filtered view are both just a view.
      </text>
      <text x="24" y="206" fill={MUTED} fontSize="7.5">
        Excel and Google Sheets disagree about menus, not about these four ideas.
      </text>
    </>
  )
}

/** l5-125 — the same formula copied down, with and without a `$`. */
export function ReferenceTypes() {
  const rows = [
    { name: 'Fund A', amt: '2,50,000', rel: 'B4*B1', abs: 'B4*$B$1' },
    { name: 'Fund B', amt: '4,00,000', rel: 'B5*B2', abs: 'B5*$B$1' },
    { name: 'Fund C', amt: '1,50,000', rel: 'B6*B3', abs: 'B6*$B$1' },
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Copying a formula down
      </text>
      <text x="24" y="40" fill={AMBER} fontSize="8.5">
        Rate lives in B1 = 1.2%
      </text>
      <rect x="24" y="50" width="168" height="112" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
      <text x="34" y="66" fill={ROSE} fontSize="8.5" fontWeight="600">
        Relative — =B4*B1
      </text>
      {rows.map((r, i) => (
        <g key={r.name}>
          <text x="34" y={86 + i * 24} fill={INK} fontSize="8">
            {r.name} {r.amt}
          </text>
          <text x="140" y={86 + i * 24} fill={i === 0 ? GOOD : ROSE} fontSize="7.5">
            {r.rel}
          </text>
        </g>
      ))}
      <text x="34" y="154" fill={ROSE} fontSize="7.5">
        Row 3 reads an empty cell, so the fee is zero.
      </text>
      <rect x="208" y="50" width="168" height="112" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
      <text x="218" y="66" fill={GOOD} fontSize="8.5" fontWeight="600">
        Absolute — =B4*$B$1
      </text>
      {rows.map((r, i) => (
        <g key={r.name}>
          <text x="218" y={86 + i * 24} fill={INK} fontSize="8">
            {r.name} {r.amt}
          </text>
          <text x="316" y={86 + i * 24} fill={GOOD} fontSize="7.5">
            {r.abs}
          </text>
        </g>
      ))}
      <text x="218" y="154" fill={GOOD} fontSize="7.5">
        The `$` pins the rate on every row.
      </text>
      <text x="24" y="182" fill={MUTED} fontSize="7.5">
        Four anchors: $A$1 pins both, A$1 pins the row, $A1 the column. The anchor decides what moves when the formula
      </text>
      <text x="24" y="196" fill={MUTED} fontSize="7.5">
        is copied — never what the cell currently reads.
      </text>
      <text x="24" y="212" fill={AMBER} fontSize="7.5">
        A wrong anchor rarely shows up as an error. It shows up as a plausible, wrong number.
      </text>
    </>
  )
}

/** l5-126 — three traps inside one range. */
export function SumTraps() {
  const rows = [
    { label: 'Rent', v: '18,000', tone: INK },
    { label: 'Groceries', v: '9,500', tone: INK },
    { label: 'Petrol', v: '3,200', tone: INK },
    { label: 'Electricity', v: '1980 pending', tone: ROSE },
    { label: 'Internet', v: '1,499', tone: INK },
    { label: 'School fees', v: '12,000', tone: INK },
    { label: 'Doctor', v: '1,500', tone: AMBER },
    { label: 'Doctor', v: '1,500', tone: AMBER },
    { label: 'Insurance', v: '12,360', tone: INK },
    { label: 'Gym', v: '1,200', tone: INK },
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Three traps in one column
      </text>
      {rows.map((r, i) => (
        <g key={`${r.label}-${i}`}>
          <rect x="24" y={34 + i * 16} width="176" height="14" rx="2" fill={r.tone} opacity="0.1" />
          <text x="30" y={44 + i * 16} fill={INK} fontSize="7.5">
            {r.label}
          </text>
          <text x="130" y={44 + i * 16} fill={r.tone} fontSize="7.5">
            {r.v}
          </text>
        </g>
      ))}
      <rect x="216" y="42" width="160" height="56" rx="5" fill="rgba(251,113,133,0.12)" stroke={LINE} />
      <text x="226" y="58" fill={ROSE} fontSize="8">
        Text is not zero — it is skipped
      </text>
      <text x="226" y="72" fill={MUTED} fontSize="7.5">
        “1980 pending” is invisible to SUM.
      </text>
      <text x="226" y="86" fill={MUTED} fontSize="7.5">
        COUNT counts 9 cells, COUNTA counts 10.
      </text>
      <rect x="216" y="106" width="160" height="56" rx="5" fill="rgba(250,204,21,0.1)" stroke={LINE} />
      <text x="226" y="122" fill={AMBER} fontSize="8">
        Two rows, one bill
      </text>
      <text x="226" y="136" fill={MUTED} fontSize="7.5">
        A duplicate is a real number, added
      </text>
      <text x="226" y="150" fill={MUTED} fontSize="7.5">
        twice. SUM cannot see intent.
      </text>
      <rect x="216" y="170" width="160" height="40" rx="5" fill="rgba(52,224,161,0.1)" stroke={LINE} />
      <text x="226" y="186" fill={GOOD} fontSize="8">
        SUM = 60,759
      </text>
      <text x="226" y="200" fill={GOOD} fontSize="8">
        Corrected = 62,739
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7.5">
        A total is an answer to “what does the sheet hold”, not “what did I spend”.
      </text>
    </>
  )
}

/** l5-127 — one test, two branches, then a nested test. */
export function IfBranch() {
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        A flag is a decision in a cell
      </text>
      <rect x="136" y="34" width="128" height="26" rx="5" fill="rgba(56,189,248,0.16)" stroke={LINE} />
      <text x="150" y="51" fill={BLUE} fontSize="8.5">
        Days late &gt; 30?
      </text>
      <line x1="168" y1="60" x2="96" y2="92" stroke={ROSE} strokeWidth="1" />
      <line x1="232" y1="60" x2="304" y2="92" stroke={GOOD} strokeWidth="1" />
      <text x="108" y="82" fill={ROSE} fontSize="7.5">
        no
      </text>
      <text x="286" y="82" fill={GOOD} fontSize="7.5">
        yes
      </text>
      <rect x="40" y="92" width="112" height="26" rx="5" fill="rgba(255,255,255,0.05)" stroke={LINE} />
      <text x="52" y="109" fill={INK} fontSize="8.5">
        0 — leave it alone
      </text>
      <rect x="248" y="92" width="112" height="26" rx="5" fill="rgba(250,204,21,0.12)" stroke={LINE} />
      <text x="260" y="109" fill={AMBER} fontSize="8.5">
        Proof on file?
      </text>
      <line x1="286" y1="118" x2="256" y2="146" stroke={ROSE} strokeWidth="1" />
      <line x1="330" y1="118" x2="356" y2="146" stroke={GOOD} strokeWidth="1" />
      <text x="240" y="140" fill={ROSE} fontSize="7.5">
        no
      </text>
      <text x="336" y="140" fill={GOOD} fontSize="7.5">
        yes
      </text>
      <rect x="196" y="146" width="104" height="26" rx="5" fill="rgba(251,113,133,0.14)" stroke={LINE} />
      <text x="208" y="163" fill={ROSE} fontSize="8.5">
        1 — chase the bill
      </text>
      <rect x="310" y="146" width="66" height="26" rx="5" fill="rgba(255,255,255,0.05)" stroke={LINE} />
      <text x="324" y="163" fill={INK} fontSize="8.5">
        0 — fine
      </text>
      <text x="24" y="192" fill={MUTED} fontSize="7.5">
        The flag is a number so it can be summed: COUNTIF over the flag column is the count of rows that need action.
      </text>
      <text x="24" y="208" fill={AMBER} fontSize="7.5">
        Nesting more than two tests inside one IF is how formulas become unreadable. Give the flag its own column.
      </text>
    </>
  )
}

/** l5-128 — conditions intersecting on one block of rows. */
export function CriteriaGrid() {
  const header = ['Month', 'Category', 'Mode', 'Amount']
  const rows = [
    ['Aug', 'Food', 'Card', '1,450'],
    ['Aug', 'Food', 'UPI', '620'],
    ['Aug', 'Home', 'Auto', '1,800'],
    ['Sep', 'Food', 'Card', '3,100'],
    ['Sep', 'Health', 'UPI', '4,200'],
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Three conditions, one number
      </text>
      {header.map((h, i) => (
        <text key={h} x={[28, 88, 156, 214][i]} y="44" fill={MUTED} fontSize="7.5">
          {h}
        </text>
      ))}
      {rows.map((r, ri) => (
        <g key={ri}>
          <rect
            x="24"
            y={50 + ri * 22}
            width="228"
            height="20"
            fill={ri === 0 ? 'rgba(52,224,161,0.12)' : 'rgba(255,255,255,0.02)'}
            stroke={LINE}
          />
          {r.map((c, ci) => (
            <text key={ci} x={[30, 90, 158, 216][ci]} y={64 + ri * 22} fill={ri === 0 ? GOOD : INK} fontSize="7.5">
              {c}
            </text>
          ))}
        </g>
      ))}
      {['= "Aug"', '= "Food"', '= "Card"'].map((c, i) => (
        <g key={c}>
          <rect x={24 + i * 78} y="166" width="72" height="18" rx="4" fill="rgba(192,132,252,0.16)" stroke={LINE} />
          <text x={30 + i * 78} y="178" fill={PURPLE} fontSize="7">
            {c}
          </text>
        </g>
      ))}
      <rect x="262" y="50" width="114" height="134" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
      <text x="272" y="68" fill={INK} fontSize="8">
        Sum range
      </text>
      <text x="272" y="82" fill={MUTED} fontSize="7.5">
        Amount, D2:D13
      </text>
      <text x="272" y="104" fill={INK} fontSize="8">
        Row 1 passes all three
      </text>
      <text x="272" y="118" fill={GOOD} fontSize="14" fontWeight="600">
        3,850
      </text>
      <text x="272" y="140" fill={MUTED} fontSize="7.5">
        Row 2 fails “Card”.
      </text>
      <text x="272" y="154" fill={MUTED} fontSize="7.5">
        Row 4 fails “Aug”.
      </text>
      <text x="272" y="172" fill={AMBER} fontSize="7.5">
        Criteria are strings.
      </text>
      <text x="24" y="204" fill={MUTED} fontSize="7.5">
        SUMIFS does not care about the order of rows: it asks each condition of every row, then adds the ones that pass.
      </text>
      <text x="24" y="216" fill={AMBER} fontSize="7.5">
        A range that is one row short is the most common error, and it never raises one.
      </text>
    </>
  )
}

/** l5-129 — a key found elsewhere, and the miss that needs a fallback. */
export function LookupLine() {
  const keys = ['FOL-204', 'FOL-311', 'FOL-418', 'FOL-509', 'FOL-612']
  const vals = ['₹1,24,000', '₹88,500', 'not on file', '₹2,10,400', '₹64,200']
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        The key, the value, and the miss
      </text>
      <text x="24" y="42" fill={MUTED} fontSize="7.5">
        Key column
      </text>
      <text x="182" y="42" fill={MUTED} fontSize="7.5">
        Return column
      </text>
      {keys.map((k, i) => (
        <g key={k}>
          <rect
            x="24"
            y={50 + i * 24}
            width="92"
            height="20"
            rx="3"
            fill={i === 1 ? 'rgba(52,224,161,0.16)' : 'rgba(255,255,255,0.03)'}
            stroke={LINE}
          />
          <text x="32" y={64 + i * 24} fill={i === 1 ? GOOD : INK} fontSize="7.5">
            {k}
          </text>
          <text x="182" y={64 + i * 24} fill={i === 2 ? ROSE : INK} fontSize="7.5">
            {vals[i]}
          </text>
          {i === 1 && <line x1="118" y1={60 + i * 24} x2="176" y2={60 + i * 24} stroke={GOOD} strokeWidth="1.2" />}
          {i === 2 && (
            <line
              x1="118"
              y1={60 + i * 24}
              x2="176"
              y2={60 + i * 24}
              stroke={ROSE}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}
        </g>
      ))}
      <rect x="182" y="126" width="192" height="46" rx="5" fill="rgba(251,113,133,0.1)" stroke={LINE} />
      <text x="192" y="142" fill={ROSE} fontSize="8">
        No match is not an error you can see
      </text>
      <text x="192" y="156" fill={MUTED} fontSize="7.5">
        Without a fallback it returns #N/A — or worse, a 0
      </text>
      <text x="192" y="166" fill={MUTED} fontSize="7.5">
        that looks like a real balance.
      </text>
      <text x="24" y="196" fill={MUTED} fontSize="7.5">
        Exact match is the default for a code. Approximate match is for brackets — tax slabs, grade bands — and it needs
      </text>
      <text x="24" y="210" fill={MUTED} fontSize="7.5">
        a sorted column. Choosing the wrong one returns the nearest row, confidently.
      </text>
    </>
  )
}

/** l5-130 — rows that pass a condition, and the block they spill into. */
export function FilterSieve() {
  const passes = [true, false, true, false, false, true, false, false]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        A filter is a condition, not a copy
      </text>
      {passes.map((p, i) => (
        <g key={i}>
          <rect
            x="20"
            y={40 + i * 17}
            width="104"
            height="14"
            rx="2"
            fill={p ? 'rgba(52,224,161,0.14)' : 'rgba(255,255,255,0.03)'}
            stroke={LINE}
          />
          <text x="26" y={50 + i * 17} fill={p ? GOOD : MUTED} fontSize="7">
            {p ? 'kept' : 'hidden'} row {i + 1}
          </text>
        </g>
      ))}
      <polygon points="138,48 208,58 208,150 138,160" fill="rgba(56,189,248,0.1)" stroke={BLUE} opacity="0.7" />
      <text x="150" y="104" fill={BLUE} fontSize="7.5">
        condition
      </text>
      <text x="150" y="116" fill={BLUE} fontSize="7.5">
        Category = Food
      </text>
      {[0, 0, 0].map((_, i) => (
        <rect
          key={i}
          x="224"
          y={58 + i * 22}
          width="152"
          height="18"
          rx="3"
          fill="rgba(52,224,161,0.14)"
          stroke={LINE}
        />
      ))}
      {['Groceries 14,500', 'Eating out 6,800', 'Delivery 2,240'].map((t, i) => (
        <text key={t} x="232" y={71 + i * 22} fill={GOOD} fontSize="7.5">
          {t}
        </text>
      ))}
      <text x="224" y="140" fill={MUTED} fontSize="7.5">
        one formula, three rows
      </text>
      <text x="224" y="154" fill={AMBER} fontSize="7.5">
        the block below is reserved
      </text>
      <text x="20" y="186" fill={MUTED} fontSize="7.5">
        A spill needs empty cells under it. Put anything there and the whole result becomes #SPILL! — the formula is
      </text>
      <text x="20" y="200" fill={MUTED} fontSize="7.5">
        not wrong, the space is occupied. The rows are live: change an amount and the block follows.
      </text>
      <text x="20" y="214" fill={AMBER} fontSize="7.5">
        Filtering a view hides rows for you. FILTER builds a second, smaller table that other formulas can read.
      </text>
    </>
  )
}

/** l5-131 — four questions, four charts, and one dishonesty. */
export function ChartChoice() {
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        The question chooses the chart
      </text>
      <g>
        <rect x="24" y="34" width="168" height="60" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
        <text x="34" y="50" fill={MUTED} fontSize="7.5">
          How did it change?
        </text>
        <polyline points="34,84 62,74 90,78 118,62 146,58 176,44" fill="none" stroke={GOOD} strokeWidth="1.6" />
        <text x="34" y="92" fill={GOOD} fontSize="7.5">
          line
        </text>
      </g>
      <g>
        <rect x="204" y="34" width="172" height="60" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
        <text x="214" y="50" fill={MUTED} fontSize="7.5">
          Which is biggest?
        </text>
        {[18, 30, 12, 38].map((h, i) => (
          <rect key={i} x={216 + i * 32} y={84 - h} width="20" height={h} fill={BLUE} opacity="0.55" />
        ))}
        <text x="214" y="92" fill={BLUE} fontSize="7.5">
          bars
        </text>
      </g>
      <g>
        <rect x="24" y="102" width="168" height="60" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
        <text x="34" y="118" fill={MUTED} fontSize="7.5">
          What is it made of?
        </text>
        <rect x="34" y="126" width="60" height="18" fill={PURPLE} opacity="0.5" />
        <rect x="94" y="126" width="44" height="18" fill={AMBER} opacity="0.5" />
        <rect x="138" y="126" width="30" height="18" fill={GOOD} opacity="0.5" />
        <text x="34" y="158" fill={PURPLE} fontSize="7.5">
          stacked share
        </text>
      </g>
      <g>
        <rect x="204" y="102" width="172" height="60" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
        <text x="214" y="118" fill={MUTED} fontSize="7.5">
          Do these move together?
        </text>
        {[
          [228, 148],
          [244, 140],
          [260, 144],
          [276, 132],
          [292, 136],
          [308, 124],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" fill={ROSE} opacity="0.7" />
        ))}
        <text x="214" y="158" fill={ROSE} fontSize="7.5">
          scatter
        </text>
      </g>
      <rect x="24" y="170" width="352" height="42" rx="5" fill="rgba(250,204,21,0.1)" stroke={LINE} />
      <text x="34" y="186" fill={AMBER} fontSize="7.5">
        Same four bars, axis starting at 0 and at 90
      </text>
      {[0, 1].map((g) => (
        <g key={g}>
          <text x={230 + g * 78} y="186" fill={MUTED} fontSize="7">
            {g === 0 ? 'from 0' : 'from 90'}
          </text>
          <rect x={230 + g * 78} y="192" width="26" height={g === 0 ? 8 : 18} fill={BLUE} opacity="0.5" />
          <rect x={260 + g * 78} y="192" width="26" height={g === 0 ? 10 : 8} fill={BLUE} opacity="0.5" />
        </g>
      ))}
      <text x="24" y="220" fill={MUTED} fontSize="7">
        The second picture is the same data with an axis that starts at 90.
      </text>
    </>
  )
}

/** l5-132 — a list folded into a grid of categories and months. */
export function PivotCube() {
  const rows = [
    ['03 Aug', 'Food', '1,450'],
    ['04 Aug', 'Home', '18,000'],
    ['11 Aug', 'Food', '620'],
    ['02 Sep', 'Transport', '3,200'],
    ['09 Sep', 'Home', '1,800'],
    ['15 Sep', 'Food', '2,400'],
  ]
  const cats = ['Food', 'Home', 'Transport']
  const months = ['Aug', 'Sep']
  const grid = [
    [2070, 18000, 0],
    [2400, 1800, 3200],
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Six rows in, six numbers out
      </text>
      <text x="24" y="40" fill={MUTED} fontSize="7">
        Date · Category · Amount
      </text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="20" y={46 + i * 18} width="148" height="16" rx="2" fill="rgba(255,255,255,0.03)" stroke={LINE} />
          <text x="26" y={57 + i * 18} fill={INK} fontSize="7">
            {r[0]}
          </text>
          <text x="68" y={57 + i * 18} fill={MUTED} fontSize="7">
            {r[1]}
          </text>
          <text x="126" y={57 + i * 18} fill={INK} fontSize="7">
            {r[2]}
          </text>
        </g>
      ))}
      <line x1="176" y1="88" x2="204" y2="88" stroke={GOOD} strokeWidth="1.4" />
      <polygon points="200,84 200,92 208,88" fill={GOOD} />
      <text x="180" y="76" fill={GOOD} fontSize="7">
        group
      </text>
      <text x="180" y="106" fill={GOOD} fontSize="7">
        sum
      </text>
      <text x={212 + 44} y="46" fill={MUTED} fontSize="7">
        Aug
      </text>
      <text x={212 + 100} y="46" fill={MUTED} fontSize="7">
        Sep
      </text>
      {cats.map((c, ri) => (
        <g key={c}>
          <text x="212" y={62 + ri * 26} fill={INK} fontSize="7.5">
            {c}
          </text>
          {months.map((m, ci) => (
            <g key={m}>
              <rect
                x={256 + ci * 56}
                y={50 + ri * 26}
                width="52"
                height="20"
                rx="2"
                fill={grid[ci][ri] ? 'rgba(56,189,248,0.14)' : 'rgba(255,255,255,0.02)'}
                stroke={LINE}
              />
              <text x={262 + ci * 56} y={64 + ri * 26} fill={inkFor(grid[ci][ri])} fontSize="7">
                {grid[ci][ri] ? grid[ci][ri].toLocaleString('en-IN') : '–'}
              </text>
            </g>
          ))}
        </g>
      ))}
      <rect x="212" y="132" width="158" height="72" rx="5" fill="rgba(255,255,255,0.03)" stroke={LINE} />
      <text x="222" y="148" fill={AMBER} fontSize="7.5">
        What the grid hides
      </text>
      <text x="222" y="162" fill={MUTED} fontSize="7">
        A blank may be no rows, or a zero.
      </text>
      <text x="222" y="176" fill={MUTED} fontSize="7">
        Count and sum answer differently.
      </text>
      <text x="222" y="190" fill={MUTED} fontSize="7">
        Refresh after new rows arrive.
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7.5">
        The pivot does not store these numbers. It recomputes them from the list every time it is refreshed.
      </text>
    </>
  )
}

const inkFor = (v: number) => (v === 0 ? MUTED : INK)
