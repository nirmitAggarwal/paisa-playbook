import { useState } from 'react'
import { emergencyCover } from '../../lib/plan-model'

/**
 * Level 5, band seven — security and habits, batch 1 (l5-147 to l5-152).
 *
 * Six labs, each a small audit rather than a lecture: an inventory with a gap,
 * an encryption setup that has to survive a lost device, a backup plan that has
 * to survive ransomware, a hardening checklist, an automation loop with a
 * timing fault, and an emergency fund behind a wall.
 *
 * Every figure is illustrative. The chapters carry the sources.
 */

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">{children}</div>
)

const Toggle = ({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition ${
      on
        ? 'border-brand-400/60 bg-brand-400/15 text-white'
        : 'border-white/10 bg-white/5 text-ink-300 hover:border-white/30'
    }`}
  >
    <span>{label}</span>
    <span className={on ? 'text-brand-300' : 'text-ink-500'}>{on ? 'on' : 'off'}</span>
  </button>
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

const Stat = ({ label, value, note }: { label: string; value: string; note?: string }) => (
  <div className="rounded-lg border border-white/10 bg-ink-950/50 px-3 py-2">
    <p className="text-[10px] uppercase tracking-wide text-ink-500">{label}</p>
    <p className="mt-0.5 font-display text-lg font-semibold text-white">{value}</p>
    {note && <p className="mt-0.5 text-[10px] text-ink-400">{note}</p>}
  </div>
)

const inr = (n: number) => Math.round(n).toLocaleString('en-IN')
const rupees = (n: number) => `₹${inr(n)}`

/* -------------------------------------------------- l5-147 document inventory */

type Doc = { name: string; where: string; found: boolean; family: boolean }

const DOCS: Doc[] = [
  { name: 'PAN', where: 'drawer + scan', found: true, family: true },
  { name: 'Aadhaar', where: 'drawer + scan', found: true, family: true },
  { name: 'Passport', where: 'drawer', found: true, family: false },
  { name: 'Will', where: 'not located', found: false, family: false },
  { name: 'Insurance policies', where: 'email + shared vault', found: true, family: true },
  { name: 'Property deed', where: 'bank locker', found: true, family: false },
  { name: 'Tax returns', where: 'cloud folder', found: true, family: false },
  { name: 'Nomination records', where: 'not located', found: false, family: false },
]

export function L5DocumentInventory() {
  const [found, setFound] = useState<Record<string, boolean>>(
    Object.fromEntries(DOCS.map((d) => [d.name, d.found])),
  )
  const recoverable = DOCS.filter((d) => found[d.name]).length
  const reachable = DOCS.filter((d) => d.family).length

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Document inventory</h4>
        <p className="mt-1 text-sm text-ink-300">
          For each document, three facts matter: that it exists, where it is, and who could find it
          if you could not answer the question.
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-ink-900/70 text-ink-400">
              <tr>
                <th className="px-2 py-1.5 font-medium">Document</th>
                <th className="px-2 py-1.5 font-medium">Located at</th>
                <th className="px-2 py-1.5 font-medium">Family can reach it</th>
                <th className="px-2 py-1.5 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-ink-300">
              {DOCS.map((d) => (
                <tr key={d.name}>
                  <td className={`px-2 py-1.5 ${found[d.name] ? 'text-white' : 'text-rose-300'}`}>{d.name}</td>
                  <td className="px-2 py-1.5">{found[d.name] ? d.where : 'not located'}</td>
                  <td className={`px-2 py-1.5 ${d.family ? 'text-brand-300' : 'text-ink-500'}`}>
                    {d.family ? 'yes' : 'no'}
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <button
                      type="button"
                      onClick={() => setFound((f) => ({ ...f, [d.name]: !f[d.name] }))}
                      className="rounded border border-white/15 px-2 py-0.5 text-[10px] text-ink-300 transition hover:text-white"
                    >
                      {found[d.name] ? `Mark ${d.name} missing` : `Mark ${d.name} found`}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat label="Inventory" value={`${recoverable} of ${DOCS.length} recoverable`} note="location known, copy verified" />
          <Stat label="Family access" value={`${reachable} of ${DOCS.length}`} note="someone else could find it" />
        </div>
        <p className="mt-3 text-xs text-ink-400">
          {recoverable === DOCS.length
            ? 'Every document has a known location. The remaining work is testing that the copies open.'
            : 'A missing document is not a filing problem. It is the thing that stops a claim, a transfer or a probate at the worst possible moment.'}
        </p>
      </Panel>
    </div>
  )
}

/* ----------------------------------------------------- l5-148 encrypted storage */

export function L5SecureStorageSetup() {
  const [encrypt, setEncrypt] = useState<'device' | 'both'>('device')
  const [key, setKey] = useState<'device' | 'manager' | 'paper'>('device')
  const [recovery, setRecovery] = useState<'none' | 'offsite'>('none')

  const verdict =
    key === 'device'
      ? 'The key is on the device it protects. A stolen laptop takes both halves of the secret.'
      : recovery === 'none'
        ? 'Recovery is the gap: a lost phone with a forgotten password becomes a locked vault nobody can open.'
        : 'Survives a lost laptop: ciphertext at rest, the key in a separate vault, and a recovery code stored off the device.'

  const safe = key !== 'device' && recovery === 'offsite'

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Encrypted storage setup</h4>
        <p className="mt-1 text-sm text-ink-300">
          Encryption turns a stolen file into noise. The design question is not the algorithm; it is
          where the key lives and how you get back in when a device is gone.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Encrypt</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="device only" active={encrypt === 'device'} onClick={() => setEncrypt('device')} />
              <Choice label="device + cloud" active={encrypt === 'both'} onClick={() => setEncrypt('both')} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Key lives in</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="same device" active={key === 'device'} onClick={() => setKey('device')} />
              <Choice label="password manager" active={key === 'manager'} onClick={() => setKey('manager')} />
              <Choice label="paper in a safe" active={key === 'paper'} onClick={() => setKey('paper')} />
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Recovery code</p>
            <div className="flex flex-wrap gap-1.5">
              <Choice label="none" active={recovery === 'none'} onClick={() => setRecovery('none')} />
              <Choice label="off-device" active={recovery === 'offsite'} onClick={() => setRecovery('offsite')} />
            </div>
          </div>
        </div>
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
            safe
              ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
              : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
          }`}
        >
          {verdict}
        </div>
        <p className="mt-2 text-[11px] text-ink-500">
          {encrypt === 'both'
            ? 'Cloud copies are encrypted before upload, so the provider stores noise rather than files.'
            : 'Only the device is encrypted. A cloud backup of the same folder may still be readable.'}
        </p>
      </Panel>
    </div>
  )
}

/* -------------------------------------------------------------- l5-149 backups */

export function L5BackupPlanner() {
  const [copies, setCopies] = useState({ laptop: true, external: true, cloud: false })
  const [tested, setTested] = useState(false)

  const count = Object.values(copies).filter(Boolean).length
  const media = (copies.laptop ? 1 : 0) + (copies.external ? 1 : 0) + (copies.cloud ? 1 : 0)
  const offsite = copies.cloud
  const checks = [count >= 3, media >= 2, offsite, tested].filter(Boolean).length

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Backup planner</h4>
        <p className="mt-1 text-sm text-ink-300">
          Three copies, on two kinds of media, with one kept off site. The fourth check is the one
          people skip: restore a file and prove the copy opens.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Toggle label="Copy on the laptop" on={copies.laptop} onClick={() => setCopies((c) => ({ ...c, laptop: !c.laptop }))} />
          <Toggle label="Copy on an external disk" on={copies.external} onClick={() => setCopies((c) => ({ ...c, external: !c.external }))} />
          <Toggle label="Copy in offsite cloud storage" on={copies.cloud} onClick={() => setCopies((c) => ({ ...c, cloud: !c.cloud }))} />
          <Toggle label="Restore has been tested" on={tested} onClick={() => setTested((t) => !t)} />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Stat label="Copies" value={`${count} of 3`} note="distinct places the data exists" />
          <Stat label="Media" value={`${media} of 2`} note="device, disk and cloud count separately" />
          <Stat label="3-2-1 checks" value={`${checks} of 4`} note={tested ? 'restore proven' : 'restore untested'} />
        </div>
        <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          checks === 4
            ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
            : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
        }`}>
          {checks === 4
            ? 'Complete: three copies, two media, one offsite, and a restore that has been proven.'
            : copies.external && !copies.cloud
              ? 'An external disk that stays plugged in is encrypted by the same ransomware that hits the laptop. The offsite copy is the one that survives.'
              : 'The plan is not complete yet. Add the missing copy, or prove the restore before you need it.'}
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------- l5-150 security hardening */

const HARDENING = [
  { id: 'passwords', label: 'Unique password per financial account', weight: 2 },
  { id: 'email2fa', label: '2FA on the email that resets everything', weight: 3 },
  { id: 'bank2fa', label: '2FA on banking and UPI apps', weight: 2 },
  { id: 'permissions', label: 'App permissions reviewed this year', weight: 1 },
  { id: 'lock', label: 'Device lock and encryption switched on', weight: 1 },
  { id: 'alerts', label: 'Transaction and login alerts on', weight: 1 },
  { id: 'report', label: 'Credit report checked this quarter', weight: 1 },
]

export function L5SecurityHardening() {
  const [on, setOn] = useState<Record<string, boolean>>({ lock: true, alerts: true })
  const score = HARDENING.reduce((n, h) => n + (on[h.id] ? h.weight : 0), 0)
  const total = HARDENING.reduce((n, h) => n + h.weight, 0)
  const weakest = HARDENING.filter((h) => !on[h.id]).sort((a, b) => b.weight - a.weight)[0]

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Attack-surface hardening</h4>
        <p className="mt-1 text-sm text-ink-300">
          Rank the doors by what they unlock. The email account can reset the bank password; the
          bank password cannot reset the email.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {HARDENING.map((h) => (
            <Toggle
              key={h.id}
              label={h.label}
              on={Boolean(on[h.id])}
              onClick={() => setOn((s) => ({ ...s, [h.id]: !s[h.id] }))}
            />
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat label="Weighted score" value={`${score} of ${total}`} note="higher-weight doors count more" />
          <Stat label="Weakest open door" value={weakest ? weakest.label : 'none'} note="fix this one first" />
        </div>
        <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          score === total
            ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
            : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
        }`}>
          {score === total
            ? 'Every door is closed. The remaining risk is a new account, a new app or a new device — which is why this is a yearly review, not a one-time setup.'
            : `The open doors are the attack surface. ${weakest?.label ?? ''} is the cheapest one to close first.`}
        </div>
      </Panel>
    </div>
  )
}

/* ---------------------------------------------- l5-151 automate good behaviour */

export function L5AutomationDesigner() {
  const [on, setOn] = useState({
    save: true,
    sip: true,
    bills: true,
    sweep: false,
    alert: false,
  })
  const [timing, setTiming] = useState<'after' | 'before'>('after')

  const count = Object.values(on).filter(Boolean).length
  const timingProblem = timing === 'before'

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Automation designer</h4>
        <p className="mt-1 text-sm text-ink-300">
          Automate the action you would otherwise skip, on a date the money has already arrived,
          with an alert for the month it fails.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Toggle label="Transfer savings on payday" on={on.save} onClick={() => setOn((s) => ({ ...s, save: !s.save }))} />
          <Toggle label="SIP dated two days after payday" on={on.sip} onClick={() => setOn((s) => ({ ...s, sip: !s.sip }))} />
          <Toggle label="Bill autopay with a per-bill cap" on={on.bills} onClick={() => setOn((s) => ({ ...s, bills: !s.bills }))} />
          <Toggle label="Sweep surplus before the weekend" on={on.sweep} onClick={() => setOn((s) => ({ ...s, sweep: !s.sweep }))} />
          <Toggle label="Low-balance alert before each debit" on={on.alert} onClick={() => setOn((s) => ({ ...s, alert: !s.alert }))} />
        </div>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">The savings transfer runs</p>
          <div className="flex flex-wrap gap-1.5">
            <Choice label="day after payday" active={timing === 'after'} onClick={() => setTiming('after')} />
            <Choice label="day before payday" active={timing === 'before'} onClick={() => setTiming('before')} />
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat label="Defaults switched on" value={`${count} of 5`} note="each one replaces a monthly decision" />
          <Stat label="Timing" value={timingProblem ? 'fails on a short month' : 'safe'} note="relative to the credit date" />
        </div>
        <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          timingProblem || !on.alert
            ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
            : 'border-brand-400/40 bg-brand-400/10 text-brand-200'
        }`}>
          {timingProblem
            ? 'A debit scheduled before payday fails in any month the salary is late — and a failed debit can carry a charge and a mark on the mandate.'
            : !on.alert
              ? 'No alert means a failed debit is discovered by the lender or the fund house, not by you.'
              : 'The loop is timed after the credit and watched by an alert. That is the version that keeps running in a bad month.'}
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------- l5-152 separating emergency money */

const FUND = 300_000
const ESSENTIALS = 52_000

const HOMES = {
  same: { label: 'same account', friction: 0, note: 'one card, one UPI, one tap' },
  separate: { label: 'separate account, same bank', friction: 1, note: 'visible in the same app, one transfer away' },
  bank: { label: 'separate bank, no card', friction: 2, note: 'a transfer that takes a day, or a branch visit' },
} as const

type HomeKey = keyof typeof HOMES

export function L5EmergencySeparation() {
  const [home, setHome] = useState<HomeKey>('same')
  const [spent, setSpent] = useState(false)
  const balance = spent ? FUND - 25_000 : FUND
  const cover = emergencyCover(balance, ESSENTIALS)

  return (
    <div className="space-y-4">
      <Panel>
        <h4 className="font-display text-white">Emergency-money separation</h4>
        <p className="mt-1 text-sm text-ink-300">
          The fund is only an emergency fund if it is hard to spend on something that is not an
          emergency. Separation is friction, and friction is the feature.
        </p>
        <div className="mt-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-500">Where the fund is held</p>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(HOMES) as HomeKey[]).map((k) => (
              <Choice key={k} label={HOMES[k].label} active={home === k} onClick={() => setHome(k)} />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-ink-400">{HOMES[home].note}</p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Stat label="Fund" value={rupees(balance)} note={spent ? '₹25,000 withdrawn' : 'untouched'} />
          <Stat label="Months of essentials" value={cover.toFixed(1)} note={`${rupees(ESSENTIALS)} a month`} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Choice label="A ₹25,000 festival offer appears" active={spent} onClick={() => setSpent(true)} />
          <Choice label="Reset" active={!spent} onClick={() => setSpent(false)} />
        </div>
        <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
          home === 'same' && spent
            ? 'border-rose-400/40 bg-rose-400/10 text-rose-200'
            : home === 'bank'
              ? 'border-brand-400/40 bg-brand-400/10 text-brand-200'
              : 'border-white/10 bg-ink-950/50 text-ink-300'
        }`}>
          {home === 'same' && spent
            ? `The offer was paid in one tap. Cover falls to ${cover.toFixed(1)} months and the emergency fund is now funding a discount.`
            : home === 'bank'
              ? 'The offer expires while the transfer clears. The fund stays at its full cover, which is the point of the wall.'
              : home === 'separate' && spent
                ? 'Two taps were enough to spend it. Separation without friction is a label, not a rule.'
                : 'Decide the rule before the offer arrives: loss of income, a medical bill, a safety repair. Anything else waits a week.'}
        </div>
      </Panel>
    </div>
  )
}
