/**
 * Level 5 illustrations — band seven, batch 1 (chapters l5-147 to l5-152).
 *
 *   document-inventory  what exists, where it is, and the one row nobody can find
 *   encryption-layer    a file, a lock, a key and a recovery route
 *   backup-rule         three copies, two media, one offsite — and ransomware
 *   attack-surface      the ways into a financial life, ranked by exposure
 *   automation-loop     payday to transfer to alert, with a manual override
 *   separation-wall     everyday money and emergency money on opposite sides
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

/** l5-147 — an inventory is only useful if it names the gaps. */
export function DocumentInventory() {
  const rows = [
    { doc: 'PAN', where: 'drawer · scanned', ok: true },
    { doc: 'Aadhaar', where: 'drawer · scanned', ok: true },
    { doc: 'Will', where: 'not located', ok: false },
    { doc: 'Insurance', where: 'email · shared', ok: true },
    { doc: 'Property deed', where: 'bank locker', ok: true },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        What exists, where it is, who can reach it
      </text>
      <rect x="24" y="32" width="352" height="140" rx="8" fill="#11131f" stroke={LINE} />
      {rows.map((r, i) => (
        <g key={r.doc}>
          <text x="36" y={54 + i * 24} fill={r.ok ? INK : ROSE} fontSize="8" fontWeight={r.ok ? 400 : 600}>
            {r.doc}
          </text>
          <text x="132" y={54 + i * 24} fill={r.ok ? MUTED : ROSE} fontSize="7.5">
            {r.where}
          </text>
          <circle cx="352" cy={51 + i * 24} r="4" fill={r.ok ? GOOD : ROSE} opacity="0.85" />
          <line x1="36" y1={62 + i * 24} x2="364" y2={62 + i * 24} stroke={LINE} opacity="0.4" />
        </g>
      ))}
      <text x="24" y="190" fill={AMBER} fontSize="8">
        One missing row is enough to stop a claim.
      </text>
      <text x="24" y="206" fill={MUTED} fontSize="7.5">
        The inventory is the map; the originals are the territory.
      </text>
    </>
  )
}

/** l5-148 — encryption moves the secret from the file to the key. */
export function EncryptionLayer() {
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        The file is safe because the key is somewhere else
      </text>
      {[
        { x: 36, label: 'document', sub: 'readable', c: BLUE },
        { x: 148, label: 'ciphertext', sub: 'unreadable', c: PURPLE },
        { x: 260, label: 'key', sub: 'in a vault', c: AMBER },
      ].map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="64" width="96" height="52" rx="7" fill={b.c} opacity="0.18" stroke={b.c} />
          <text x={b.x + 48} y="86" fill={INK} fontSize="9" textAnchor="middle">
            {b.label}
          </text>
          <text x={b.x + 48} y="100" fill={MUTED} fontSize="7" textAnchor="middle">
            {b.sub}
          </text>
        </g>
      ))}
      {[132, 244].map((x) => (
        <g key={x}>
          <line x1={x} y1="90" x2={x + 16} y2="90" stroke={GOOD} strokeWidth="1.4" />
          <polygon points={`${x + 12},86 ${x + 18},90 ${x + 12},94`} fill={GOOD} />
        </g>
      ))}
      <rect x="36" y="140" width="196" height="44" rx="6" fill={ROSE} opacity="0.12" stroke={ROSE} />
      <text x="46" y="157" fill={ROSE} fontSize="8">
        laptop stolen → ciphertext is useless
      </text>
      <text x="46" y="172" fill={MUTED} fontSize="7.5">
        unless the key was on the same laptop
      </text>
      <rect x="244" y="140" width="132" height="44" rx="6" fill={GOOD} opacity="0.12" stroke={GOOD} />
      <text x="254" y="157" fill={GOOD} fontSize="8">
        recovery code
      </text>
      <text x="254" y="172" fill={MUTED} fontSize="7.5">
        somewhere you can reach
      </text>
      <text x="24" y="208" fill={INK} fontSize="8">
        Encryption without key recovery is a very secure way to lose your own files.
      </text>
    </>
  )
}

/** l5-149 — the copies only count if one survives the event. */
export function BackupRule() {
  const copies = [
    { label: 'laptop', x: 40, c: BLUE, hit: true },
    { label: 'external disk', x: 152, c: PURPLE, hit: false },
    { label: 'offsite cloud', x: 264, c: GOOD, hit: false },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Three copies, two media, one offsite
      </text>
      {copies.map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="54" width="98" height="54" rx="7" fill={c.c} opacity="0.16" stroke={c.c} />
          <text x={c.x + 49} y="76" fill={INK} fontSize="8" textAnchor="middle">
            {c.label}
          </text>
          <text x={c.x + 49} y="92" fill={MUTED} fontSize="7" textAnchor="middle">
            copy {copies.indexOf(c) + 1}
          </text>
          {c.hit && (
            <text x={c.x + 49} y="128" fill={ROSE} fontSize="12" textAnchor="middle">
              ✕
            </text>
          )}
        </g>
      ))}
      <text x="40" y="152" fill={ROSE} fontSize="8">
        ransomware encrypts the laptop and every disk attached to it
      </text>
      <line x1="40" y1="166" x2="360" y2="166" stroke={LINE} />
      <text x="40" y="184" fill={GOOD} fontSize="8">
        the offsite copy is the one that makes the rule a backup
      </text>
      <text x="40" y="200" fill={AMBER} fontSize="8">
        a copy you have never restored is a hope, not a backup
      </text>
    </>
  )
}

/** l5-150 — the attack surface is every door, not the front one. */
export function AttackSurface() {
  const doors = [
    { label: 'reused password', open: true, x: 60 },
    { label: 'no 2FA on email', open: true, x: 152 },
    { label: 'old app permissions', open: true, x: 244 },
    { label: 'device lock + alerts', open: false, x: 320 },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Every door into a financial life
      </text>
      <rect x="60" y="44" width="280" height="94" rx="10" fill="#11131f" stroke={LINE} />
      <text x="200" y="64" fill={INK} fontSize="9" textAnchor="middle">
        accounts · email · phone · documents
      </text>
      {doors.map((d) => (
        <g key={d.label}>
          <rect
            x={d.x - 26}
            y="78"
            width="52"
            height="40"
            rx="4"
            fill={d.open ? ROSE : GOOD}
            opacity="0.16"
            stroke={d.open ? ROSE : GOOD}
          />
          <text x={d.x} y="102" fill={d.open ? ROSE : GOOD} fontSize="14" textAnchor="middle">
            {d.open ? '○' : '●'}
          </text>
          <text x={d.x} y="156" fill={MUTED} fontSize="6.5" textAnchor="middle">
            {d.label.split(' ').slice(0, 2).join(' ')}
          </text>
        </g>
      ))}
      <text x="24" y="182" fill={INK} fontSize="8">
        The strongest lock does not matter if the email behind it is open.
      </text>
      <text x="24" y="198" fill={MUTED} fontSize="7.5">
        Close the doors that can reset the others first.
      </text>
    </>
  )
}

/** l5-151 — good behaviour as a loop, with one deliberate way out. */
export function AutomationLoop() {
  const steps = [
    { label: 'payday', x: 34, c: BLUE },
    { label: 'rent + EMI', x: 118, c: PURPLE },
    { label: 'savings + SIP', x: 208, c: GOOD },
    { label: 'alert + review', x: 292, c: AMBER },
  ]
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        The month runs itself, in one direction
      </text>
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="64" width="70" height="46" rx="6" fill={s.c} opacity="0.18" stroke={s.c} />
          <text x={s.x + 35} y="84" fill={INK} fontSize="7.5" textAnchor="middle">
            {s.label.split(' ')[0]}
          </text>
          <text x={s.x + 35} y="98" fill={MUTED} fontSize="6.5" textAnchor="middle">
            {s.label.split(' ').slice(1).join(' ') || 'automatic'}
          </text>
          {i < steps.length - 1 && (
            <g>
              <line x1={s.x + 72} y1="87" x2={s.x + 84} y2="87" stroke={LINE} strokeWidth="1.2" />
              <polygon
                points={`${s.x + 80},83 ${s.x + 86},87 ${s.x + 80},91`}
                fill={LINE}
              />
            </g>
          )}
        </g>
      ))}
      <path d="M327 116 C327 150 240 150 200 150 C150 150 100 146 70 120" fill="none" stroke={GOOD} strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="150" y="166" fill={GOOD} fontSize="7.5">
        every step leaves a record
      </text>
      <rect x="34" y="180" width="330" height="28" rx="5" fill={AMBER} opacity="0.12" stroke={AMBER} />
      <text x="44" y="198" fill={AMBER} fontSize="7.5">
        manual override, used deliberately — not as the monthly method
      </text>
    </>
  )
}

/** l5-152 — a wall, a rule, and a buffer that is harder to spend. */
export function SeparationWall() {
  return (
    <>
      <text x="24" y="20" fill={INK} fontSize="13" fontWeight="600">
        Two accounts, one wall
      </text>
      <rect x="28" y="44" width="150" height="96" rx="8" fill={BLUE} opacity="0.12" stroke={BLUE} />
      <text x="40" y="64" fill={BLUE} fontSize="9" fontWeight="600">
        everyday account
      </text>
      <text x="40" y="84" fill={INK} fontSize="8">
        salary lands here
      </text>
      <text x="40" y="100" fill={MUTED} fontSize="7.5">
        card · UPI · autopay
      </text>
      <text x="40" y="122" fill={MUTED} fontSize="7.5">
        balance ₹18,400
      </text>
      <rect x="186" y="52" width="14" height="80" rx="3" fill={AMBER} opacity="0.35" stroke={AMBER} />
      <text x="193" y="146" fill={AMBER} fontSize="7" textAnchor="middle">
        wall
      </text>
      <rect x="212" y="44" width="160" height="96" rx="8" fill={GOOD} opacity="0.12" stroke={GOOD} />
      <text x="224" y="64" fill={GOOD} fontSize="9" fontWeight="600">
        emergency vault
      </text>
      <text x="224" y="84" fill={INK} fontSize="8">
        separate bank
      </text>
      <text x="224" y="100" fill={MUTED} fontSize="7.5">
        no card · no UPI
      </text>
      <text x="224" y="122" fill={GOOD} fontSize="9" fontWeight="600">
        5.8 months
      </text>
      <rect x="28" y="160" width="344" height="42" rx="6" fill="#11131f" stroke={LINE} />
      <text x="40" y="177" fill={INK} fontSize="7.5">
        Rule: used for loss of income, a medical bill or a safety repair.
      </text>
      <text x="40" y="192" fill={MUTED} fontSize="7.5">
        Anything else waits a week; if it still matters, it is saved for.
      </text>
    </>
  )
}
