/**
 * Data integrity check for authored chapters.
 * Run with: npm run check
 *
 * Chapter content is code-split per level, so we must pull every level in
 * before validating.
 */
import { allChapters, chapterContent, loadAllContent } from '../src/data/curriculum'
import { levels } from '../src/data/curriculum.generated'
import { glossarySeeds } from '../src/data/glossary'
import { sheetScenarios } from '../src/data/sheet-scenarios'
import { L5_SOURCES, l5Bands, level5Plan } from '../src/data/level5-plan'
import type { Block } from '../src/types'

await loadAllContent()

let problems = 0
const fail = (msg: string) => {
  problems++
  console.error(`  ✗ ${msg}`)
}

const SIMS = new Set([
  'compound', 'budget', 'networth', 'market', 'sheet', 'rupee10', 'scam-spotter',
  'emi', 'salary-slip', 'minpayment', 'cover',
  'portfolio', 'bond', 'realreturn', 'currency', 'valuation', 'feedrag', 'cycle',
  'tax', 'options-payoff',
  // Level 5 labs — band one
  'l5-first-salary-split', 'l5-negotiation-rounds', 'l5-offer-compare', 'l5-ctc-decompose',
  // Level 5 labs — band one, batch 2
  'l5-benefit-valuator', 'l5-pf-lifecycle', 'l5-regime-picker', 'l5-monthly-routine', 'l5-emergency-sizing',
  'l5-sinking-planner', 'l5-budget-system-picker', 'l5-zero-based-builder', 'l5-ratio-stress-test',
  'l5-cashflow-timing',
  // Level 5 labs — band one, batch 3
  'l5-automation-blueprint', 'l5-sip-automation', 'l5-bill-automation-board', 'l5-alert-tuning',
  'l5-dashboard-designer',
  // Level 5 labs — band two, batch 1
  'l5-portfolio-architect', 'l5-allocation-designer', 'l5-overlap-checker', 'l5-rebalance-trigger',
  'l5-goal-mapper', 'l5-reit-analyser', 'l5-invit-analyser', 'l5-global-diversifier',
  'l5-etf-cost-check', 'l5-alternatives-screener',
  // Level 5 labs — band two, batch 2
  'l5-pe-waterfall', 'l5-vc-portfolio', 'l5-liquidity-map', 'l5-total-cost-of-ownership',
  'l5-tax-planner', 'l5-retirement-projector', 'l5-independence-number', 'l5-fire-stress-test',
  'l5-savings-rate-lab', 'l5-passive-income-audit',
  // Level 5 labs — band three, batch 1
  'l5-jurisdiction-finder', 'l5-rbi-checklist', 'l5-sebi-verify', 'l5-insurer-verify',
  'l5-pension-setup', 'l5-bank-picker', 'l5-nbfc-check', 'l5-insurer-scorecard',
  'l5-amc-diligence', 'l5-exchange-role',
  // Level 5 labs — band three, batch 2
  'l5-broker-compare', 'l5-demat-service-check', 'l5-kyc-doctor', 'l5-aml-simulator',
  'l5-protection-limits', 'l5-complaint-builder', 'l5-consumer-case-builder',
  'l5-contract-scanner', 'l5-loan-agreement-audit', 'l5-policy-reader',
  // Level 5 labs — band three, batch 3
  'l5-card-agreement-audit', 'l5-broker-agreement-audit', 'l5-rent-agreement-audit',
  'l5-hidden-cost-hunt', 'l5-fee-normaliser', 'l5-penalty-dispute', 'l5-clause-spotter',
  'l5-raise-negotiation', 'l5-rent-negotiation', 'l5-loan-negotiation', 'l5-freelance-rate',
  // Level 5 labs — band four, batch 1
  'l5-estate-planner', 'l5-nomination-audit', 'l5-beneficiary-designer', 'l5-will-builder',
  'l5-inheritance-processor', 'l5-succession-planner', 'l5-joint-holding-chooser',
  'l5-family-finance-setup', 'l5-marriage-finance-plan', 'l5-parent-care-budget',
  // Level 5 labs — band four, batch 2
  'l5-dependant-planner', 'l5-education-goal', 'l5-major-purchase-analyser', 'l5-house-affordability',
  'l5-vehicle-tco', 'l5-education-roi', 'l5-rent-buy-model', 'l5-new-vs-used',
  'l5-cash-vs-finance', 'l5-crisis-drill',
  // Level 5 labs — band four, batch 3, and the first of fraud & due diligence
  'l5-job-loss-plan', 'l5-medical-claim-run', 'l5-crash-simulator', 'l5-recession-adjuster',
  'l5-debt-triage',  'l5-fraud-response-drill', 'l5-account-recovery', 'l5-identity-repair',
  'l5-scam-inbox', 'l5-guru-audit',
  // Level 5 labs — band four, batch 4: fraud & due diligence
  'l5-pump-dump-detective', 'l5-verify-call', 'l5-platform-verifier', 'l5-job-scam-screener',
  'l5-crypto-claim-check', 'l5-social-engineering-defence', 'l5-diligence-worksheet',
  'l5-product-comparator', 'l5-return-source-analyser', 'l5-risk-register',
  'l5-liquidity-stress', 'l5-fee-audit', 'l5-verify-entity',
  // Level 5 labs — band five: AI tools (l5-114 to l5-122)
  'l5-ai-assistants', 'l5-ai-budget-review', 'l5-ai-formula-checker', 'l5-ai-policy-reader',
  'l5-ai-tutor-audit', 'l5-ai-stress-test', 'l5-ai-claim-verifier', 'l5-ai-privacy-audit',
  'l5-credential-defence',
  // Level 5 labs — band six, batch 1: spreadsheets and models (l5-129 to l5-132)
  'l5-lookup-builder', 'l5-filter-builder', 'l5-chart-builder', 'l5-pivot-builder',
  // Level 5 labs — band six, batch 2: the calculators (l5-133 to l5-142)
  'l5-calculator-sanity', 'l5-compound-model', 'l5-emi-model', 'l5-sip-model',
  'l5-inflation-model', 'l5-retirement-model', 'l5-cagr-model', 'l5-networth-model',
  'l5-debt-payoff-model', 'l5-real-return-model',
  // Level 5 labs — batch 3 and security & habits batch 1 (l5-143 to l5-152)
  'l5-scenario-planner', 'l5-sensitivity-model', 'l5-best-worst-model', 'l5-stress-test-model',
  'l5-document-inventory', 'l5-secure-storage-setup', 'l5-backup-planner', 'l5-security-hardening',
  'l5-automation-designer', 'l5-emergency-separation',
])
const SCENES = new Set([
  'coins', 'barter', 'timeline', 'rupee', 'rupee-erode', 'money-flow', 'rbi-funnel', 'bank-pyramid',
  'income-streams', 'pie-needs-wants', 'spend-leak', 'ad-trap', 'peer-circle', 'budget-pie', 'expense-bars',
  'goal-ladder', 'safe-vs-risk', 'interest-growth', 'inflation-crocodile', 'opportunity-fork', 'upi-flow',
  'atm-machine', 'payment-rail', 'scam-hook', 'phishing-hook', 'shield', 'balance-sheet', 'emi-split',
  'emergency-ladder', 'minpayment-trap', 'secured-vs-unsecured', 'insurance-umbrella', 'ponzi-chain',
  'pyramid', 'fomo-chase', 'lifestyle-inflation', 'dashboard', 'score-meter', 'salary-deductions',
  'risk-return-curve', 'capacity-tolerance', 'yield-curve', 'price-yield-inverse', 'profit-waterfall',
  'share-slice', 'market-cap-ladder', 'fee-drag-visual', 'allocation-pie', 'currency-erosion',
  'dividend-stream', 'property-cashflow', 'time-horizon', 'passive-vs-active', 'real-vs-nominal',
  'gold-role', 'money-allocation',
  // Level 4 scenes
  'tax-bracket', 'tds-flow', 'cover-ladder', 'emi-split-early', 'nps-annuity',
  'call-put', 'rent-vs-buy', 'loan-amort', 'deriv-payoff', 'currency-risk', 'growth-vs-value', 'corpus-ladder',
  // Additional illustrations
  'freelance-climb',
  'fee-addons', 'foreclosure-balance', 'vehicle-emi-true', 'due-date-clock', 'late-fee-record',
  'policy-gaps', 'claim-steps', 'limit-vs-repay', 'default-cascade', 'credit-exposure',
  'life-cover-dependants', 'motor-third-party', 'bnpl-stack',
  'land-idle', 'apartment-dues', 'appreciation-forecast', 'property-tax-clock', 'stamp-duty-cost',
  'registration-records', 'maintenance-drag', 'property-liquidity', 'mf-pool', 'nav-calc', 'hybrid-mix',
  'diversify-fail', 'portfolio-build', 'target-vs-actual', 'expense-lines', 'cash-vs-profit', 'eps-split',
  'roe-levers', 'debt-equity-mix', 'amc-expense', 'credit-spread', 'bond-terms', 'credit-vs-rate-risk',
  'debt-fund-nav', 'nifty-50', 'pb-ratio', 'nifty-weights', 'sensex-30', 'manager-discretion', 'etf-wrapper',
  'physical-gold-cost', 'silver-volatility', 'gain-pre-post-tax', 'face-vs-price', 'broker-costs', 'decision-journal',
  'term-cover-rungs', 'whole-life-bundle', 'endowment-mix', 'ulip-charges', 'deductible-tradeoff', 'copay-slice',
  'waiting-period', 'cover-exclusions', 'cover-claim-steps', 'contract-sizing', 'margin-leverage', 'expiry-intrinsic',
  'mark-to-market', 'naked-speculation', 'risk-transfer', 'commodity-futures-roles', 'index-futures',
  'direct-vs-indirect', 'taxable-base', 'deduction-effect', 'capital-gains-holding', 'stcg-vs-ltcg', 'business-taxes',
  'inflation-target', 'epf-monthly', 'annuity-income', 'education-payoff', 'runway-cash', 'moneyness', 'premium-split',
  'time-decay', 'volatility-effect', 'put-protection', 'accounting-quality', 'llp-liability', 'revenue-records',
  'scholarship-offset', 'profit-growth-cash', 'exporter-importer', 'forward-lock', 'sole-prop-exposure',
  'equity-financing', 'moat-defence', 'cashflow-reality', 'partnership-split', 'downpayment-effect', 'raise-compounding',
  // Level 5 illustrations — band one
  'first-payslip-split', 'negotiation-band', 'offer-total-value', 'ctc-waterfall',
  // Level 5 illustrations — band one, batch 2
  'benefit-stack', 'pf-ledger', 'regime-seesaw', 'monthly-cycle', 'cover-months',
  'sinking-jars', 'budget-shapes', 'zero-bucket', 'frame-vs-reality', 'cashflow-timeline',
  // Level 5 illustrations — band one, batch 3
  'auto-transfer-rail', 'sip-machine', 'bill-clock', 'alert-trials', 'dashboard-one-page',
  // Level 5 illustrations — band two, batch 1
  'construction-blocks', 'weight-targets', 'diversity-web', 'rebalance-band', 'goal-bucket-tree',
  'reit-cashflow', 'invit-toll-road', 'currency-bridge', 'etf-nav-gap', 'alternatives-map',
  // Level 5 illustrations — band two, batch 2
  'j-curve', 'power-law', 'liquidity-ladder', 'fee-stack', 'tax-year-grid',
  'retirement-bridge', 'multiple-ladder', 'fire-timeline', 'rate-lever', 'income-stream-types',
  // Level 5 illustrations — band three, batch 1
  'regulator-map', 'rbi-tools', 'sebi-shield', 'irdai-records', 'pension-architecture',
  'bank-choice-grid', 'nbfc-boundary', 'insurer-scoreboard', 'amc-economics', 'exchange-plumbing',
  // Level 5 illustrations — band three, batch 2
  'broker-fee-anatomy', 'depository-layer', 'kyc-flow', 'aml-funnel', 'protection-layers',
  'complaint-ladder', 'rights-pathway', 'contract-anatomy', 'loan-clause-map', 'policy-anatomy',
  // Level 5 illustrations — band three, batch 3
  'card-terms', 'broker-agreement-map', 'rent-agreement-terms', 'hidden-charge-radar', 'fee-normaliser',
  'penalty-clock', 'clause-library', 'raise-negotiation', 'rent-levers', 'loan-levers',
  'freelance-rate-build',
  // Level 5 illustrations — band four, batch 1
  'estate-map', 'nominee-grid', 'beneficiary-tree', 'will-anatomy', 'inheritance-path',
  'succession-timeline', 'joint-holding-modes', 'family-money-map', 'marriage-money-defaults',
  'parent-support-plan',
  // Level 5 illustrations — band four, batch 2
  'dependant-matrix', 'education-ladder', 'tco-breakdown', 'house-cost-stack', 'vehicle-five-year-cost',
  'education-payback', 'rent-buy-crossover', 'new-used-curve', 'cash-finance-seesaw', 'crisis-order',
  // Level 5 illustrations — band four, batch 3, and the first of fraud & due diligence
  'runway-months', 'hospital-flow', 'crash-playbook', 'recession-map', 'debt-triage',
  'golden-hour', 'compromise-recovery', 'identity-trail', 'scam-triage', 'guru-credibility',
  // Level 5 illustrations — band four, batch 4: fraud & due diligence
  'pump-dump-cycle', 'deepfake-check', 'fake-platform-funnel', 'job-offer-redflags',
  'crypto-custody-layers', 'social-engineering-loop', 'diligence-checklist',
  'product-compare-axes', 'return-source-tree', 'risk-matrix', 'time-to-cash',
  'fee-waterfall', 'verification-desk',
  // Level 5 illustrations — band five: AI tools (l5-114 to l5-122)
  'ai-assist-boundary', 'ai-budget-loop', 'ai-formula-test', 'doc-ai-verify', 'learning-loop',
  'ai-failure-modes', 'hallucination-hunt', 'redaction-filter', 'credential-wall',
  // Level 5 illustrations — band six, batch 1: spreadsheets and models (l5-123 to l5-132)
  'workbook-architecture', 'sheet-feature-map', 'reference-types', 'sum-traps', 'if-branch',
  'criteria-grid', 'lookup-line', 'filter-sieve', 'chart-choice', 'pivot-cube',
  // Level 5 illustrations — band six, batch 2: the calculators (l5-133 to l5-142)
  'calculator-inputs', 'compound-curves', 'amortisation-stack', 'sip-ladder', 'inflation-bridge',
  'retirement-phases', 'cagr-smoothing', 'networth-waterline', 'repayment-paths', 'real-return-layers',
  // Level 5 illustrations — batch 3 and security & habits batch 1 (l5-143 to l5-152)
  'scenario-fan', 'tornado-chart', 'case-range', 'stress-test-panel',
  'document-inventory', 'encryption-layer', 'backup-rule', 'attack-surface',
  'automation-loop', 'separation-wall',
])

/** Every string a block renders, for source and wording checks. */
function blockText(block: Block): string[] {
  switch (block.kind) {
    case 'p':
    case 'h':
      return [block.text]
    case 'callout':
      return [block.title ?? '', block.text]
    case 'example':
    case 'formula':
      return [block.title ?? block.label, block.text ?? block.expr, block.note ?? '']
    case 'list':
      return block.items
    case 'table':
      return [block.caption ?? '', ...block.headers, ...block.rows.flat()]
    case 'terms':
      return block.items.flatMap((t) => [t.term, t.meaning])
    case 'scene':
    case 'sim':
      return [block.caption ?? '']
  }
}

/** Official domains Level 5 chapters are allowed to cite, without the www. */
const OFFICIAL_DOMAINS = Object.values(L5_SOURCES).map((u) => new URL(u).host.replace(/^www\./, ''))
const l5PlanById = new Map(level5Plan.map((p) => [p.id, p]))
const L5_CHAPTERS = levels.find((l) => l.level === 5)?.chapters ?? []

for (const level of levels) {
  const authored = level.chapters.filter((c) => chapterContent[c.id]).length
  console.log(
    `Level ${level.level} — ${level.title}: ${authored}/${level.chapters.length} authored` +
      (authored === level.chapters.length ? ' ✓' : authored ? '' : ' (stubbed)'),
  )
  if (authored === 0 && level.level > 1) continue
}

const knownChapterIds = new Set(allChapters.map((c) => c.id))
const authoredCount = Object.keys(chapterContent).length
console.log(`\nTotal authored: ${authoredCount} / ${allChapters.length} chapters`)

// Chapters that render the spreadsheet lab, so we can confirm each of them has
// its own dataset and assignment rather than the generic fallback sheet.
const sheetChapters: string[] = []

for (const ref of allChapters) {
  const ch = chapterContent[ref.id]
  if (!ch) continue

  // Titles are deliberately editorialised for readability (e.g. "FD" ->
  // "Fixed Deposits"), so only the id linkage is enforced.
  if (ch.id !== ref.id) fail(`${ref.id} id mismatch: content declares "${ch.id}"`)
  if (!ch.subtitle) fail(`${ref.id} missing subtitle`)
  if (!ch.takeaway) fail(`${ref.id} missing takeaway`)
  if (!ch.blocks.length) fail(`${ref.id} has no blocks`)
  if (!ch.quiz.length) fail(`${ref.id} has no quiz questions`)
  if (!ch.minutes || ch.minutes < 1) fail(`${ref.id} has no sensible reading time`)

  for (const [i, q] of ch.quiz.entries()) {
    const correct = q.options.filter((o) => o.correct).length
    if (correct !== 1) fail(`${ref.id} Q${i + 1} has ${correct} correct options (expected exactly 1)`)
    if (q.options.length < 3) fail(`${ref.id} Q${i + 1} has fewer than 3 options`)
    for (const [j, o] of q.options.entries()) {
      if (!o.text) fail(`${ref.id} Q${i + 1} option ${j + 1} has no text`)
      if (!o.why) fail(`${ref.id} Q${i + 1} option ${j + 1} has no explanation`)
    }
  }

  let hasVisual = false
  let simCount = 0
  let sceneCount = 0
  for (const b of ch.blocks) {
    if (b.kind === 'scene') {
      hasVisual = true
      sceneCount++
      if (!SCENES.has(b.name)) fail(`${ref.id} references unknown scene "${b.name}"`)
      if (!(b.caption ?? '').trim()) fail(`${ref.id} has a scene without a caption`)
    }
    if (b.kind === 'sim') {
      hasVisual = true
      simCount++
      if (!SIMS.has(b.name)) fail(`${ref.id} references unknown sim "${b.name}"`)
      if (!(b.caption ?? '').trim()) fail(`${ref.id} has a simulation without a caption`)
      if (b.name === 'sheet') sheetChapters.push(ref.id)
    }
    if (b.kind === 'p' && !b.text.trim()) fail(`${ref.id} has an empty paragraph`)
    if (b.kind === 'callout' && !b.text.trim()) fail(`${ref.id} has an empty callout`)
  }
  if (!hasVisual) fail(`${ref.id} has neither an illustration nor a simulation`)

  // ------------------------------------------------------------ level 5 rules
  if (ref.level === 5) {
    const plan = l5PlanById.get(ref.id)
    const text = [
      ch.subtitle,
      ch.takeaway,
      ...ch.blocks.flatMap(blockText),
      ...ch.quiz.flatMap((q) => [q.q, ...q.options.flatMap((o) => [o.text, o.why])]),
    ].join('\n')

    if (!plan) {
      fail(`${ref.id} is authored but has no entry in level5-plan.ts`)
    } else {
      if (plan.status !== 'authored') fail(`${ref.id} exists but level5-plan.ts still marks it "${plan.status}"`)
      const names = ch.blocks.filter((b) => b.kind === 'scene' || b.kind === 'sim').map((b) => b.name)
      if (!names.includes(plan.scene)) fail(`${ref.id} does not render the illustration it declares (${plan.scene})`)
      if (!names.includes(plan.sim)) fail(`${ref.id} does not render the simulation it declares (${plan.sim})`)
    }

    // Level 5 claims statutory rules, so each chapter must say where to check
    // them and when it last did.
    if (!OFFICIAL_DOMAINS.some((d) => text.includes(d))) fail(`${ref.id} cites no official source domain`)
    if (!text.includes('Last verified')) fail(`${ref.id} carries no "Last verified" date`)
    if (text.includes('TODO') || text.includes('Lorem')) fail(`${ref.id} contains placeholder text`)

    // A repeated lab or illustration is filler, and it also inflates the
    // chapter's share of the level's illustration cap.
    for (const kind of ['scene', 'sim'] as const) {
      const names = ch.blocks.filter((b) => b.kind === kind).map((b) => b.name)
      const repeated = names.filter((n, i) => names.indexOf(n) !== i)
      if (repeated.length) fail(`${ref.id} repeats the same ${kind} block: ${[...new Set(repeated)].join(', ')}`)
    }

    // Assessments must explain every option, not just the correct one.
    if (ch.quiz.length < 3) fail(`${ref.id} has ${ch.quiz.length} quiz question(s); level 5 requires at least 3`)
    for (const [i, q] of ch.quiz.entries()) {
      if (q.options.length < 3) fail(`${ref.id} Q${i + 1} has fewer than 3 options`)
      for (const [j, o] of q.options.entries()) {
        if (!o.why.trim()) fail(`${ref.id} Q${i + 1} option ${j + 1} has no explanation`)
      }
    }
  }

  // Levels 3 and 4 are held to a higher bar: every chapter must carry BOTH a
  // chapter-related illustration and a hands-on simulation, not just one.
  if (ref.level >= 3) {
    if (sceneCount === 0) fail(`${ref.id} has no illustration`)
    if (simCount === 0) fail(`${ref.id} has no simulation`)
  }
}

// ------------------------------------------------------------ level 5 plan
// The plan is the tracker for all 161 chapters, so it must agree with the
// syllabus and with the chapters that actually exist.
const planIds = level5Plan.map((p) => p.id)
for (const c of L5_CHAPTERS) {
  if (!planIds.includes(c.id)) fail(`level5-plan.ts has no entry for ${c.id} (${c.title})`)
}
for (const p of level5Plan) {
  const ref = L5_CHAPTERS.find((c) => c.id === p.id)
  if (!ref) {
    fail(`level5-plan.ts lists ${p.id}, which is not in the level 5 syllabus`)
    continue
  }
  if (ref.title !== p.title) fail(`${p.id} plan title "${p.title}" does not match the syllabus title "${ref.title}"`)
  if (!l5Bands.includes(p.band)) fail(`${p.id} has unknown band "${p.band}"`)
  if (!p.goal.trim()) fail(`${p.id} has no learning goal`)
  if (p.topics.length < 3) fail(`${p.id} lists ${p.topics.length} topics; at least 3 are expected`)
  if (!p.scene.trim()) fail(`${p.id} declares no illustration`)
  if (!p.sim.trim()) fail(`${p.id} declares no simulation`)
  if (p.sources.length === 0) fail(`${p.id} cites no sources`)
  for (const s of p.sources) if (!L5_SOURCES[s]) fail(`${p.id} cites unknown source key "${s}"`)
  if (p.status === 'authored' && !chapterContent[p.id]) fail(`${p.id} is marked authored but has no chapter`)
  if (planIds.filter((x) => x === p.id).length > 1) fail(`${p.id} appears twice in level5-plan.ts`)
}

// Illustration reuse: at most three chapters per illustration across the level.
const sceneUse = new Map<string, string[]>()
const simUse = new Map<string, string[]>()
for (const p of level5Plan) {
  sceneUse.set(p.scene, [...(sceneUse.get(p.scene) ?? []), p.id])
  simUse.set(p.sim, [...(simUse.get(p.sim) ?? []), p.id])
}
for (const [name, ids] of sceneUse) {
  if (ids.length > 3) fail(`illustration "${name}" is used by ${ids.length} level 5 chapters (cap is 3): ${ids.join(', ')}`)
}
// A data-driven lab repeats by design, because each chapter supplies its own
// scenario data — but only if the chapter has actually been given one, which is
// checked here for every authored chapter and by the sheet-lab check above.
const DATA_DRIVEN_LABS = new Set(['sheet'])
for (const [name, ids] of simUse) {
  if (ids.length <= 1) continue
  if (DATA_DRIVEN_LABS.has(name)) {
    for (const id of ids) {
      if (chapterContent[id] && !sheetScenarios[id]) {
        fail(`${id} uses the data-driven lab "${name}" but has no scenario of its own`)
      }
    }
    continue
  }
  fail(`simulation "${name}" is shared by ${ids.length} level 5 chapters: ${ids.join(', ')}`)
}

const authored5 = level5Plan.filter((p) => p.status === 'authored').length
console.log(`Level 5 tracker: ${authored5}/${level5Plan.length} chapters authored, ${level5Plan.length - authored5} planned`)
for (const band of l5Bands) {
  const all = level5Plan.filter((p) => p.band === band)
  const done = all.filter((p) => p.status === 'authored').length
  console.log(`   ${band}: ${done}/${all.length}`)
}

// ------------------------------------------------------------- sheet lab
// Every chapter with the spreadsheet lab must have its own scenario, otherwise
// it silently shows the generic sandbox sheet.
for (const id of sheetChapters) {
  if (!sheetScenarios[id]) fail(`${id} uses the spreadsheet lab but has no scenario in sheet-scenarios.ts`)
}
for (const id of Object.keys(sheetScenarios)) {
  if (!knownChapterIds.has(id)) fail(`sheet scenario "${id}" does not match any chapter`)
}
const orphanScenarios = Object.keys(sheetScenarios).filter((id) => !sheetChapters.includes(id))
if (orphanScenarios.length) {
  fail(`sheet scenarios that no chapter renders: ${orphanScenarios.join(', ')}`)
}
console.log(`Spreadsheet lab: ${sheetChapters.length} chapters, ${Object.keys(sheetScenarios).length} chapter-specific sheets`)

// Orphan check: authored chapters that are not in the syllabus
const orphanIds = Object.keys(chapterContent).filter((id) => !knownChapterIds.has(id))
for (const id of orphanIds) {
  fail(`${id} is authored but not in the syllabus`)
}

// ---------------------------------------------------------------- glossary
// Seeds must be unique and non-empty; the glossary page renders them directly.
const seenTerms = new Set<string>()
for (const g of glossarySeeds) {
  const key = g.term.trim().toLowerCase()
  if (!g.term.trim()) fail('glossary has an empty term')
  if (!g.meaning.trim()) fail(`glossary term "${g.term}" has an empty meaning`)
  if (seenTerms.has(key)) fail(`glossary has a duplicate term "${g.term}"`)
  seenTerms.add(key)
}
console.log(`Glossary: ${glossarySeeds.length} seed terms`)

console.log(problems === 0 ? '\n✓ All checks passed' : `\n${problems} problem(s) found`)
process.exit(problems === 0 ? 0 : 1)