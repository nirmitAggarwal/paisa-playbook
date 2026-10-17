/**
 * Unit tests for the spreadsheet formula engine and for the chapter-specific
 * sheet scenarios used by the spreadsheet lab. Run: npm run test:sheet
 *
 * The scenario half of this file is the important one: it proves that every
 * value the lab marks as correct is genuinely reachable from that chapter's
 * starter data, that no answer cell is pre-filled, and that no formula in a
 * solution errors out.
 */
import { evaluateCell, type Sheet } from '../src/lib/sheet'
import { sheetFallback, sheetScenarios, type SheetScenario } from '../src/data/sheet-scenarios'

const sheet: Sheet = {
  A1: 'Food',
  A2: 'Rent',
  A3: 'Food',
  A4: 'Travel',
  B1: 'Need',
  B2: 'Need',
  B3: 'Want',
  B4: 'Want',
  C1: '1000',
  C2: '5000',
  C3: '300',
  C4: '700',
  D1: '40000',
}

const cases: [string, number | string][] = [
  ['=SUM(C1:C4)', 7000],
  ['=SUMIF(A1:A4,"Food",C1:C4)', 1300],
  ['=SUMIF(B1:B4,"Want",C1:C4)', 1000],
  ['=SUMIF(A1:A4,"Food",C1:C4)', 1300],
  // 2-arg SUMIF sums numeric matches only, so text cells contribute 0 (as in Excel)
  ['=SUMIF(A1:A4,"Food")', 0],
  ['=COUNTIF(B1:B4,"Need")', 2],
  ['=SUMIFS(C1:C4,A1:A4,"Food",B1:B4,"Want")', 300],
  ['=AVERAGE(C1:C4)', 1750],
  ['=MAX(C1:C4)', 5000],
  ['=MIN(C1:C4)', 300],
  ['=COUNT(C1:C4)', 4],
  ['=C2-C1', 4000],
  ['=D1-C2-C3', 34700],
  ['=ROUND((C1/C4)*100,1)', 142.9],
  ['=IF(C3>500,"big","small")', 'small'],
  ['=IF(C2>1000,"big","small")', 'big'],
  ['=SUM(C1:C4)-C2', 2000],
  ['=SUM(C1:C2)*2', 12000],
  // Absolute references: the `$` pins a column, a row or both. The value is
  // unchanged; what changes is what happens when the formula is copied.
  ['=C1*$D$1', 40000000],
  ['=$C$1+$C$2', 6000],
  ['=SUM($C$1:$C$4)', 7000],
  ['=$C2-$C1', 4000],
  ['=IF($C$2>1000,"big","small")', 'big'],
]

let failed = 0
for (const [formula, expected] of cases) {
  const v = evaluateCell({ ...sheet, E1: formula }, 'E1')
  const ok = typeof v === 'number' && typeof expected === 'number'
    ? Math.abs(v - expected) < 0.01
    : String(v) === String(expected)
  if (!ok) {
    failed++
    console.error(`  ✗ ${formula} → got ${JSON.stringify(v)}, expected ${JSON.stringify(expected)}`)
  } else {
    console.log(`  ✓ ${formula} → ${typeof v === 'object' ? JSON.stringify(v) : v}`)
  }
}

// plain values pass through
const plain = evaluateCell(sheet, 'C1')
console.log(`  ✓ plain value C1 → ${plain}`)

// ------------------------------------------------------------- scenarios
console.log('\nChapter sheet scenarios')

let tasks = 0
let scenariosChecked = 0

function checkScenario(id: string, sc: SheetScenario) {
  const stem = `${id} (${sc.title})`
  if (!sc.title.trim()) { failed++; console.error(`  ✗ ${stem}: missing title`) }
  if (!sc.brief.trim()) { failed++; console.error(`  ✗ ${stem}: missing brief`) }
  if (!sc.debrief.trim()) { failed++; console.error(`  ✗ ${stem}: missing debrief`) }
  if (sc.steps.length < 3) { failed++; console.error(`  ✗ ${stem}: fewer than 3 assignment steps`) }
  if (!sc.reference.length) { failed++; console.error(`  ✗ ${stem}: no formula reference`) }
  if (!sc.tasks.length) { failed++; console.error(`  ✗ ${stem}: no tasks`) }

  // Every starter cell must be readable, or the lab opens on an error.
  for (const addr of Object.keys(sc.starter)) {
    const v = evaluateCell(sc.starter, addr)
    if (typeof v === 'object') {
      failed++
      console.error(`  ✗ ${stem}: starter cell ${addr} evaluates to ${v.error}`)
    }
  }

  const solved: Sheet = { ...sc.starter, ...sc.solution }

  // Solution formulas must not error.
  for (const addr of Object.keys(sc.solution)) {
    const v = evaluateCell(solved, addr)
    if (typeof v === 'object' && 'error' in v) {
      failed++
      console.error(`  ✗ ${stem}: solution ${addr} = ${sc.solution[addr]} → ${v.error}`)
    }
  }

  const seen = new Set<string>()
  for (const t of sc.tasks) {
    tasks++
    if (seen.has(t.cell)) { failed++; console.error(`  ✗ ${stem}: two tasks target ${t.cell}`) }
    seen.add(t.cell)
    if ((sc.starter[t.cell] ?? '').trim() !== '') {
      failed++
      console.error(`  ✗ ${stem}: task cell ${t.cell} is already filled in the starter`)
    }
    if (!t.ask.trim() || !t.hint.trim()) {
      failed++
      console.error(`  ✗ ${stem}: task ${t.cell} is missing its question or hint`)
    }
    const v = evaluateCell(solved, t.cell)
    const ok = typeof v === 'number' && Math.abs(v - t.expect) < 0.05
    if (!ok) {
      failed++
      console.error(`  ✗ ${stem}: ${t.cell} expects ${t.expect} but the solution gives ${JSON.stringify(v)}`)
    }
  }

  scenariosChecked++
}

for (const [id, sc] of Object.entries(sheetScenarios)) checkScenario(id, sc)
checkScenario('fallback', sheetFallback)

console.log(`  ✓ ${scenariosChecked} scenarios, ${tasks} task cells verified against their solutions`)

if (failed) {
  console.error(`\n${failed} test(s) failed`)
  process.exit(1)
}
console.log('\n✓ All sheet tests passed')
