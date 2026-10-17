/**
 * Level 5 illustrations — band six, batch 2 (chapters l5-133 to l5-142).
 *
 * One illustration per chapter, drawn for that chapter's own idea:
 *   calculator-inputs   four fields, one answer, and the assumption that moves it
 *   compound-curves     the same 8% compounded yearly and monthly, and the gap
 *   amortisation-stack  early EMIs are mostly interest; late ones are mostly principal
 *   sip-ladder          monthly rungs that rise once a year
 *   inflation-bridge    a goal restated in future rupees, and the gap that opens
 *   retirement-phases   accumulation, a retirement line, then a drawdown
 *   cagr-smoothing      a jagged path and the single rate that describes its endpoints
 *   networth-waterline  assets above the line, liabilities below, what is left
 *   repayment-paths     the same debts under avalanche and snowball
 *   real-return-layers  a nominal return peeled by fees, tax and inflation
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

/** l5-133 — a calculator is four assumptions wearing one number. */
export function CalculatorInputs() {
  const rows = [
    { label: 'Principal', value: '₹10,00,000' },
    { label: 'Rate', value: '8.5% a year' },
    { label: 'Tenure', value: '20 years' },
    { label: 'Compounding', value: 'monthly', hot: true },
  ]
  return (
    <>
      <text x="24" y="22" fill={INK} fontSize="13" fontWeight="600">
        Four inputs, one answer
      </text>
      <rect x="24" y="34" width="180" height="150" rx="10" fill="#11131f" stroke={LINE} />
      {rows.map((r, i) => (
        <g key={r.label}>
          <rect
            x="34"
            y={46 + i * 32}
            width="160"
            height="26"
            rx="5"
            fill={r.hot ? AMBER : '#1a1d2c'}
            opacity={r.hot ? 0.14 : 1}
            stroke={r.hot ? AMBER : LINE}
          />
          <text x="42" y={63 + i * 32} fill={MUTED} fontSize="7.5">
            {r.label}
          </text>
          <text x="186" y={63 + i * 32} fill={r.hot ? AMBER : INK} fontSize="9" textAnchor="end">
            {r.value}
          </text>
        </g>
      ))}
      <text x="222" y="58" fill={MUTED} fontSize="8">
        EMI
      </text>
      <text x="222" y="82" fill={GOOD} fontSize="27" fontWeight="700">
        ₹8,678
      </text>
      <text x="222" y="98" fill={MUTED} fontSize="8">
        a month for 20 years
      </text>
      <line x1="222" y1="110" x2="374" y2="110" stroke={LINE} />
      <text x="222" y="126" fill={ROSE} fontSize="8">
        same fields, rate read monthly
      </text>
      <text x="222" y="146" fill={ROSE} fontSize="20" fontWeight="700">
        ₹85,000
      </text>
      <text x="222" y="162" fill={MUTED} fontSize="7.5">
        ten times the answer, from one unit
      </text>
      <text x="24" y="200" fill={INK} fontSize="8">
        The field in amber is the one nobody re-reads.
      </text>
    </>
  )
}

/** l5-134 — frequency is a second rate hiding inside the headline rate. */
export function CompoundCurves() {
  const curve = (rate: number, y0: number, h: number) =>
    Array.from({ length: 13 }, (_, i) => {
      const px = 40 + (i / 12) * 300
      const py = y0 - (Math.pow(1 + rate, i) - 1) * h
      return `${px.toFixed(1)},${py.toFixed(1)}`
    }).join(' ')
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        The same 8%, compounded differently
      </text>
      <line x1="40" y1="170" x2="348" y2="170" stroke={LINE} />
      <line x1="40" y1="36" x2="40" y2="170" stroke={LINE} />
      <polyline points={curve(0.08, 170, 150)} fill="none" stroke={BLUE} strokeWidth="1.6" />
      <polyline points={curve(0.0829995, 170, 150)} fill="none" stroke={GOOD} strokeWidth="1.9" />
      <line x1="340" y1={170 - (Math.pow(1.08, 12) - 1) * 150} x2="340" y2={170 - (Math.pow(1.0829995, 12) - 1) * 150} stroke={AMBER} strokeWidth="1.2" />
      <text x="244" y="52" fill={GOOD} fontSize="8">
        monthly: 8.30% effective
      </text>
      <text x="252" y="66" fill={BLUE} fontSize="8">
        annual: 8.00%
      </text>
      <text x="252" y="88" fill={AMBER} fontSize="7.5">
        ₹26,950 more
      </text>
      <text x="44" y="186" fill={MUTED} fontSize="7.5">
        15 years · ₹2,00,000
      </text>
      <text x="44" y="200" fill={INK} fontSize="8">
        A nominal rate without its frequency is only half a number.
      </text>
    </>
  )
}

/** l5-135 — the EMI does not change, but what it buys does. */
export function AmortisationStack() {
  const years = [
    { y: '1', interest: 81 },
    { y: '5', interest: 74 },
    { y: '10', interest: 59 },
    { y: '15', interest: 38 },
    { y: '20', interest: 5 },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        The same EMI, a different job each year
      </text>
      {years.map((yr, i) => {
        const h = 120
        const ix = 44 + i * 62
        const interestH = (yr.interest / 100) * h
        return (
          <g key={yr.y}>
            <rect x={ix} y={160 - h} width="34" height={interestH} fill={ROSE} opacity="0.75" />
            <rect
              x={ix}
              y={160 - h + interestH}
              width="34"
              height={h - interestH}
              fill={GOOD}
              opacity="0.8"
            />
            <text x={ix + 17} y="176" fill={MUTED} fontSize="8" textAnchor="middle">
              yr {yr.y}
            </text>
            <text x={ix + 17} y={156 - h} fill={MUTED} fontSize="7" textAnchor="middle">
              {yr.interest}% int
            </text>
          </g>
        )
      })}
      <rect x="44" y="188" width="8" height="8" fill={ROSE} />
      <text x="56" y="195" fill={MUTED} fontSize="7.5">
        interest
      </text>
      <rect x="104" y="188" width="8" height="8" fill={GOOD} />
      <text x="116" y="195" fill={MUTED} fontSize="7.5">
        principal
      </text>
      <text x="196" y="195" fill={INK} fontSize="7.5">
        prepaying year one buys the most.
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7">
        ₹25 lakh at 8.6% for 20 years.
      </text>
    </>
  )
}

/** l5-136 — a plan that grows with your pay, not just with the market. */
export function SipLadder() {
  const rungs = [10_000, 11_000, 12_100, 13_310, 14_641]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        A step-up adds rungs, not just returns
      </text>
      {rungs.map((amount, i) => {
        const y = 168 - i * 27
        const w = 120 + i * 42
        return (
          <g key={amount}>
            <rect x="44" y={y - 12} width={w} height="13" rx="2" fill={GOOD} opacity={0.3 + i * 0.12} />
            <text x="50" y={y - 2} fill="#0d1017" fontSize="7.5" fontWeight="600">
              ₹{amount.toLocaleString('en-IN')}
            </text>
            <text x={52 + w} y={y - 2} fill={MUTED} fontSize="7">
              year {i * 3 + 1}
            </text>
          </g>
        )
      })}
      <line x1="44" y1="176" x2="360" y2="176" stroke={LINE} />
      <text x="24" y="198" fill={AMBER} fontSize="8">
        ₹10,000 rising 10% a year: ₹86.8 lakh in 15 years, not ₹50.5 lakh.
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7">
        Illustrative at a 12% return, which no fund owes you.
      </text>
    </>
  )
}

/** l5-137 — a goal has two prices: today's and the one you will pay. */
export function InflationBridge() {
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        What ₹50,000 buys, and when
      </text>
      <rect x="34" y="88" width="62" height="92" fill={BLUE} opacity="0.3" stroke={BLUE} />
      <text x="65" y="78" fill={BLUE} fontSize="12" fontWeight="700" textAnchor="middle">
        ₹50,000
      </text>
      <text x="65" y="194" fill={MUTED} fontSize="7.5" textAnchor="middle">
        today
      </text>
      <rect x="196" y="44" width="62" height="136" fill={ROSE} opacity="0.28" stroke={ROSE} />
      <text x="227" y="34" fill={ROSE} fontSize="12" fontWeight="700" textAnchor="middle">
        ₹89,542
      </text>
      <text x="227" y="194" fill={MUTED} fontSize="7.5" textAnchor="middle">
        in 10 years
      </text>
      <path d="M96 132 C140 132 156 108 196 108" stroke={AMBER} strokeWidth="1.4" fill="none" />
      <path d="M192 104 l6 4 -6 4" stroke={AMBER} strokeWidth="1.4" fill="none" />
      <text x="112" y="102" fill={AMBER} fontSize="7.5">
        6% a year
      </text>
      <text x="272" y="90" fill={INK} fontSize="8">
        the same basket,
      </text>
      <text x="272" y="104" fill={MUTED} fontSize="8">
        almost twice
      </text>
      <text x="272" y="118" fill={MUTED} fontSize="8">
        the rupees
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7">
        Education at 8% and electronics at 2% are not the same bridge.
      </text>
    </>
  )
}

/** l5-138 — two phases, and the second one is the one people skip. */
export function RetirementPhases() {
  const accumulation = Array.from({ length: 31 }, (_, i) => {
    const x = 40 + i * 5.5
    const y = 168 - 110 * Math.pow(i / 30, 1.7)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const drawdown = Array.from({ length: 26 }, (_, i) => {
    const x = 205 + i * 5.5
    const y = 58 + 96 * (i / 25)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Thirty years to build, twenty-five to spend
      </text>
      <line x1="40" y1="170" x2="360" y2="170" stroke={LINE} />
      <polyline points={accumulation} fill="none" stroke={GOOD} strokeWidth="2" />
      <polyline points={drawdown} fill="none" stroke={AMBER} strokeWidth="2" />
      <line x1="205" y1="36" x2="205" y2="176" stroke={ROSE} strokeDasharray="3 3" />
      <text x="197" y="32" fill={ROSE} fontSize="7.5" textAnchor="end">
        retire
      </text>
      <text x="88" y="86" fill={GOOD} fontSize="8">
        contributions + growth
      </text>
      <text x="256" y="70" fill={AMBER} fontSize="8">
        expenses + inflation
      </text>
      <text x="40" y="188" fill={MUTED} fontSize="7.5">
        age 30
      </text>
      <text x="190" y="188" fill={MUTED} fontSize="7.5">
        age 60
      </text>
      <text x="320" y="188" fill={MUTED} fontSize="7.5">
        age 85
      </text>
      <text x="24" y="208" fill={INK} fontSize="8">
        A corpus that never draws down is a number, not a plan.
      </text>
    </>
  )
}

/** l5-139 — CAGR is a single rate that fits the endpoints and ignores the path. */
export function CagrSmoothing() {
  const path = [
    [40, 160], [78, 128], [116, 148], [154, 106], [192, 122], [230, 76], [268, 92],
    [306, 52], [344, 40],
  ].map(([x, y]) => `${x},${y}`).join(' ')
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        One straight answer to a jagged eight years
      </text>
      <line x1="40" y1="170" x2="360" y2="170" stroke={LINE} />
      <line x1="40" y1="36" x2="40" y2="170" stroke={LINE} />
      <polyline points={path} fill="none" stroke={BLUE} strokeWidth="1.6" />
      <line x1="40" y1="160" x2="344" y2="40" stroke={AMBER} strokeWidth="1.8" strokeDasharray="5 3" />
      <text x="176" y="128" fill={AMBER} fontSize="8">
        12.14% a year
      </text>
      <text x="52" y="48" fill={BLUE} fontSize="8">
        +31% · −9% · +38% · …
      </text>
      <text x="42" y="186" fill={MUTED} fontSize="7.5">
        ₹1,00,000
      </text>
      <text x="304" y="186" fill={MUTED} fontSize="7.5">
        ₹2,50,000
      </text>
      <text x="24" y="206" fill={INK} fontSize="8">
        CAGR describes the endpoints. It says nothing about the ride.
      </text>
    </>
  )
}

/** l5-140 — net worth is a waterline, and it depends on the valuations you choose. */
export function NetworthWaterline() {
  const assets = [
    { name: 'cash', v: 1.2, c: BLUE },
    { name: 'equity', v: 8.5, c: GOOD },
    { name: 'EPF', v: 6.4, c: PURPLE },
    { name: 'flat', v: 65, c: AMBER },
  ]
  let x = 44
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        What you own, what you owe, what is left
      </text>
      {assets.map((a) => {
        const w = a.v * 3.1
        const el = (
          <g key={a.name}>
            <rect x={x} y={70} width={w} height={26} fill={a.c} opacity="0.35" stroke={a.c} />
            <text x={x + w / 2} y="87" fill={INK} fontSize="7" textAnchor="middle">
              {a.name}
            </text>
          </g>
        )
        x += w + 3
        return el
      })}
      <line x1="24" y1="104" x2="376" y2="104" stroke={BLUE} strokeWidth="1.4" strokeDasharray="4 3" />
      <text x="332" y="100" fill={BLUE} fontSize="7">
        waterline
      </text>
      <rect x="44" y="112" width="118" height="26" fill={ROSE} opacity="0.35" stroke={ROSE} />
      <text x="103" y="129" fill={INK} fontSize="7" textAnchor="middle">
        home loan 38.0
      </text>
      <rect x="166" y="112" width="30" height="26" fill={ROSE} opacity="0.35" stroke={ROSE} />
      <text x="181" y="129" fill={INK} fontSize="7" textAnchor="middle">
        2.1
      </text>
      <text x="206" y="129" fill={MUTED} fontSize="7">
        car loan
      </text>
      <text x="24" y="162" fill={MUTED} fontSize="7.5">
        assets 81.1 · liabilities 40.1
      </text>
      <text x="24" y="182" fill={GOOD} fontSize="15" fontWeight="700">
        net worth ₹41.0 lakh
      </text>
      <text x="24" y="200" fill={AMBER} fontSize="7.5">
        value the flat at distress prices and this line turns to ₹24.9 lakh.
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7">
        Illustrative balance sheet, in ₹ lakh.
      </text>
    </>
  )
}

/** l5-141 — the same rupees, aimed at two different debts. */
export function RepaymentPaths() {
  const path = (clearMonth: number) =>
    Array.from({ length: 13 }, (_, i) => {
      const m = (i / 12) * clearMonth
      const x = 40 + (m / 60) * 310
      const y = 160 - 120 * Math.pow(1 - m / clearMonth, 1.4)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Same debts, same extra ₹5,000
      </text>
      <line x1="40" y1="160" x2="360" y2="160" stroke={LINE} />
      <polyline points={path(43)} fill="none" stroke={GOOD} strokeWidth="2" />
      <polyline points={path(46)} fill="none" stroke={ROSE} strokeWidth="1.8" strokeDasharray="4 3" />
      <text x="286" y="52" fill={GOOD} fontSize="8">
        avalanche · 43 months
      </text>
      <text x="286" y="66" fill={ROSE} fontSize="8">
        snowball · 46 months
      </text>
      <text x="44" y="176" fill={MUTED} fontSize="7.5">
        today
      </text>
      <text x="316" y="176" fill={MUTED} fontSize="7.5">
        5 years
      </text>
      <text x="24" y="196" fill={INK} fontSize="8">
        Highest rate first: ₹1.83 lakh of interest.
      </text>
      <text x="24" y="210" fill={AMBER} fontSize="8">
        Smallest balance first: ₹2.26 lakh. The order is worth ₹43,000.
      </text>
    </>
  )
}

/** l5-142 — four numbers stacked into one honest return. */
export function RealReturnLayers() {
  const layers = [
    { label: 'nominal return', v: 12, c: BLUE, note: '12.0%' },
    { label: 'less fees', v: 1.2, c: PURPLE, note: '−1.2%' },
    { label: 'less tax on gains', v: 1.35, c: ROSE, note: '−1.35%' },
    { label: 'less inflation', v: 5.8, c: AMBER, note: '−5.8%' },
  ]
  let x = 44
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        The return you keep is the shortest bar
      </text>
      {layers.map((l) => {
        const w = l.v * 14
        const el = (
          <g key={l.label}>
            <rect x={x} y="48" width={w} height="26" fill={l.c} opacity="0.35" stroke={l.c} />
            <text x={x + w / 2} y="64" fill={INK} fontSize="7" textAnchor="middle">
              {l.note}
            </text>
            <text x={x + w / 2} y="90" fill={MUTED} fontSize="6.5" textAnchor="middle">
              {l.label}
            </text>
          </g>
        )
        x += w + 3
        return el
      })}
      <text x="24" y="122" fill={MUTED} fontSize="8">
        ₹1,00,000 left for one year produces
      </text>
      <text x="24" y="152" fill={GOOD} fontSize="24" fontWeight="700">
        ₹3,255
      </text>
      <text x="150" y="140" fill={MUTED} fontSize="8">
        of buying power,
      </text>
      <text x="150" y="154" fill={MUTED} fontSize="8">
        not ₹12,000
      </text>
      <text x="24" y="182" fill={INK} fontSize="8">
        3.25% real, from a 12% headline and a 6% inflation rate.
      </text>
      <text x="24" y="200" fill={AMBER} fontSize="7.5">
        A 7% fixed deposit taxed at 30% and 6% inflation returns −1.0%.
      </text>
      <text x="24" y="212" fill={MUTED} fontSize="7">
        Illustrative rates; the arithmetic is the content.
      </text>
    </>
  )
}
