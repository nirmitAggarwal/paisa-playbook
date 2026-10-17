/**
 * Level 5 illustrations — band six, batch 3 (chapters l5-143 to l5-146).
 *
 *   scenario-fan        one plan, three named futures, and the responses beside them
 *   tornado-chart       four assumptions ranked by how far they move coverage
 *   case-range          best, base and worst on one range, with the essentials line
 *   stress-test-panel   three shocks at once feeding one liquidity gauge
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

/** l5-143 — one base case, three named branches, and a response on each. */
export function ScenarioFan() {
  const branches = [
    { name: 'Bad decade · 7%', y: 62, value: '₹1.13 crore', c: ROSE, response: 'save ₹10,000 more' },
    { name: 'Base · 11%', y: 110, value: '₹1.72 crore', c: GOOD, response: 'review each year' },
    { name: 'High inflation · 8%', y: 158, value: '₹1.72 crore', c: AMBER, response: 'raise the goal' },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        One plan, three futures
      </text>
      <circle cx="42" cy="110" r="14" fill={BLUE} opacity="0.3" stroke={BLUE} />
      <text x="42" y="113" fill={BLUE} fontSize="7" textAnchor="middle">
        plan
      </text>
      {branches.map((b) => (
        <g key={b.name}>
          <path
            d={`M56 110 C110 110 120 ${b.y} 172 ${b.y}`}
            fill="none"
            stroke={b.c}
            strokeWidth="1.6"
          />
          <circle cx="176" cy={b.y} r="4" fill={b.c} />
          <text x="188" y={b.y - 6} fill={INK} fontSize="8">
            {b.name}
          </text>
          <text x="188" y={b.y + 6} fill={b.c} fontSize="9" fontWeight="600">
            {b.value}
          </text>
          <text x="188" y={b.y + 18} fill={MUTED} fontSize="7">
            → {b.response}
          </text>
        </g>
      ))}
      <text x="24" y="202" fill={MUTED} fontSize="7.5">
        Each branch is written down before it happens, with the response attached.
      </text>
    </>
  )
}

/** l5-144 — the tornado: assumptions sorted by the size of their swing. */
export function TornadoChart() {
  const rows = [
    { label: 'Horizon 10–20y', low: 33, high: 66, c: AMBER },
    { label: 'Return 8–14%', low: 35, high: 66, c: GOOD },
    { label: 'Inflation 4–8%', low: 36, high: 64, c: ROSE },
    { label: 'Saving 15k–35k', low: 35, high: 61, c: BLUE },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Which assumption moves the answer most?
      </text>
      <line x1="196" y1="36" x2="196" y2="172" stroke={LINE} strokeDasharray="3 3" />
      <text x="196" y="184" fill={MUTED} fontSize="7" textAnchor="middle">
        base 48%
      </text>
      {rows.map((r, i) => {
        const y = 46 + i * 32
        const left = 196 - (48 - r.low) * 3.6
        const right = 196 + (r.high - 48) * 3.6
        return (
          <g key={r.label}>
            <text x="24" y={y + 9} fill={INK} fontSize="8">
              {r.label}
            </text>
            <rect x={left} y={y} width={196 - left} height="12" fill={r.c} opacity="0.45" />
            <rect x="196" y={y} width={right - 196} height="12" fill={r.c} opacity="0.8" />
            <text x={left - 4} y={y + 9} fill={MUTED} fontSize="6.5" textAnchor="end">
              {r.low}%
            </text>
            <text x={right + 4} y={y + 9} fill={MUTED} fontSize="6.5">
              {r.high}%
            </text>
          </g>
        )
      })}
      <text x="24" y="208" fill={MUTED} fontSize="7.5">
        Coverage of the goal, with one knob moved at a time.
      </text>
    </>
  )
}

/** l5-145 — a range, not a point, and the line the essentials must clear. */
export function CaseRange() {
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Worst, base and best on one line
      </text>
      <line x1="40" y1="112" x2="360" y2="112" stroke={LINE} strokeWidth="4" />
      <line x1="40" y1="112" x2="132" y2="112" stroke={ROSE} strokeWidth="4" />
      <line x1="132" y1="112" x2="248" y2="112" stroke={GOOD} strokeWidth="4" />
      <line x1="248" y1="112" x2="360" y2="112" stroke={BLUE} strokeWidth="4" />
      <circle cx="40" cy="112" r="5" fill={ROSE} />
      <circle cx="132" cy="112" r="5" fill={GOOD} />
      <circle cx="248" cy="112" r="5" fill={AMBER} />
      <circle cx="360" cy="112" r="5" fill={BLUE} />
      <text x="40" y="92" fill={ROSE} fontSize="8" textAnchor="middle">
        worst
      </text>
      <text x="40" y="138" fill={MUTED} fontSize="7" textAnchor="middle">
        ₹0
      </text>
      <text x="132" y="92" fill={GOOD} fontSize="8" textAnchor="middle">
        base
      </text>
      <text x="132" y="138" fill={MUTED} fontSize="7" textAnchor="middle">
        ₹3.1 lakh
      </text>
      <text x="248" y="92" fill={AMBER} fontSize="8" textAnchor="middle">
        essentials
      </text>
      <text x="248" y="138" fill={MUTED} fontSize="7" textAnchor="middle">
        ₹6.2 lakh
      </text>
      <text x="360" y="92" fill={BLUE} fontSize="8" textAnchor="middle">
        best
      </text>
      <text x="360" y="138" fill={MUTED} fontSize="7" textAnchor="middle">
        ₹9.8 lakh
      </text>
      <text x="24" y="170" fill={INK} fontSize="8">
        The worst case is not zero. It is short enough to survive,
      </text>
      <text x="24" y="184" fill={INK} fontSize="8">
        long enough to be honest, and written before it happens.
      </text>
      <text x="24" y="204" fill={MUTED} fontSize="7.5">
        A probability belongs beside each case, not inside it.
      </text>
    </>
  )
}

/** l5-146 — three shocks at once, and one gauge that decides. */
export function StressTestPanel() {
  const shocks = [
    { label: 'Job loss', value: '6 months', c: ROSE },
    { label: 'Rate rise', value: '+2.0%', c: AMBER },
    { label: 'Market fall', value: '−25%', c: PURPLE },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Three shocks, one question
      </text>
      {shocks.map((s, i) => (
        <g key={s.label}>
          <rect x="30" y={40 + i * 42} width="104" height="30" rx="5" fill={s.c} opacity="0.16" stroke={s.c} />
          <text x="40" y={52 + i * 42} fill={MUTED} fontSize="7">
            {s.label}
          </text>
          <text x="40" y={65 + i * 42} fill={s.c} fontSize="10" fontWeight="600">
            {s.value}
          </text>
        </g>
      ))}
      <path d="M140 55 H170 V124 H196" fill="none" stroke={LINE} strokeWidth="1.2" />
      <path d="M140 97 H170" fill="none" stroke={LINE} strokeWidth="1.2" />
      <path d="M140 139 H170" fill="none" stroke={LINE} strokeWidth="1.2" />
      <rect x="200" y="46" width="168" height="104" rx="8" fill="#11131f" stroke={LINE} />
      <text x="212" y="64" fill={MUTED} fontSize="7.5">
        Buffer, in months of burn
      </text>
      <rect x="212" y="74" width="144" height="14" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="212" y="74" width="72" height="14" rx="3" fill={ROSE} opacity="0.7" />
      <line x1="284" y1="70" x2="284" y2="92" stroke={AMBER} strokeWidth="1.5" />
      <text x="284" y="104" fill={AMBER} fontSize="7" textAnchor="middle">
        breaking point · 5
      </text>
      <text x="212" y="124" fill={ROSE} fontSize="16" fontWeight="700">
        ₹44,040 short
      </text>
      <text x="212" y="140" fill={MUTED} fontSize="7">
        before month six is paid for
      </text>
      <text x="24" y="190" fill={INK} fontSize="8">
        Each shock is survivable alone. Together they break the plan.
      </text>
      <text x="24" y="206" fill={MUTED} fontSize="7.5">
        That is the number to fix before it happens, not after.
      </text>
    </>
  )
}
