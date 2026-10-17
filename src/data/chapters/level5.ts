import type { Chapter } from '../../types'
import { l5Career } from './l5-career'
import { l5Money } from './l5-money'
import { l5System } from './l5-system'
import { l5InvestA } from './l5-invest'
import { l5RetireA } from './l5-retire'
import { l5InstA } from './l5-inst'
import { l5InstB } from './l5-inst2'
import { l5InstC } from './l5-inst3'
import { l5Estate } from './l5-estate'
import { l5Life } from './l5-life'
import { l5Protect } from './l5-protect'
import { l5Fraud } from './l5-fraud'
import { l5Ai } from './l5-ai'
import { l5Sheet } from './l5-sheet'
import { l5Calc } from './l5-calc'
import { l5Model } from './l5-model'
import { l5Security } from './l5-security'

/**
 * Authored Level 5 chapters, keyed by chapter id.
 *
 * Level 5 has 161 chapters. They are authored in batches, one theme at a time,
 * and each batch adds its own module here:
 *
 *   l5-career.ts   band 1, batch 1 — first salary, negotiation, offers, CTC (l5-001 to l5-004)
 *   l5-money.ts    band 1, batch 2 — benefits, PF, taxation and the monthly money system (l5-005 to l5-014)
 *   l5-system.ts   band 1, batch 3 — savings, investment and bill automation, alerts, dashboards (l5-015 to l5-019)
 *   l5-invest.ts   band 2, batch 1 — portfolio construction, allocation, diversification, rebalancing, goals,
 *                  REITs, InvITs, international investing, ETFs, alternatives (l5-020 to l5-029)
 *   l5-retire.ts   band 2, batch 2 — private equity, venture capital, liquidity, fees, advanced tax,
 *                  retirement, independence, FIRE, savings rate, passive income (l5-030 to l5-039)
 *   l5-inst.ts     band 3, batch 1 — regulators, the RBI, SEBI, IRDAI and PFRDA, banks, NBFCs,
 *                  insurers, asset managers and exchanges (l5-040 to l5-049)
 *   l5-inst2.ts    band 3, batch 2 — brokers, depositories, KYC and AML, investor protection,
 *                  complaints and consumer rights, and the contracts people sign (l5-050 to l5-059)
 *   l5-inst3.ts    band 3, batch 3 — card and broking terms, tenancy, hidden charges, fees,
 *                  penalties and clauses, then negotiating pay, rent, loans and rates
 *                  (l5-060 to l5-070)
 *   l5-estate.ts   band 4, batch 1 — the estate and the family: nominations, wills,
 *                  inheritance, succession, joint holdings, household money, marriage
 *                  and supporting parents (l5-071 to l5-080)
 *   l5-life.ts     band 4, batch 2 — dependants and education, the big purchases of a
 *                  household (house, vehicle, cash versus financing, new versus used),
 *                  and working a financial crisis in order (l5-081 to l5-090)
 *   l5-protect.ts  band 4, batch 3, and the opening of fraud & due diligence — job loss,
 *                  medical claims, market falls, recession, debt, fraud response, account
 *                  compromise, identity theft, scam detection and fake gurus
 *                  (l5-091 to l5-100)
 *   l5-fraud.ts    band 4, batch 4, closing fraud & due diligence — pump-and-dumps,
 *                  deepfakes, fake platforms and jobs, crypto schemes, social
 *                  engineering, and due diligence on products, returns, risk, liquidity,
 *                  fees and the regulator's register (l5-101 to l5-113)
 *   l5-sheet.ts    band 6, batch 1 — workbook architecture, formulas and references,
 *                  SUM, IF, SUMIFS, XLOOKUP, FILTER, charts and pivot tables
 *                  (l5-123 to l5-132)
 *   l5-calc.ts     band 6, batch 2 — the calculator band: the sanity checks, then
 *                  compound interest, EMI, SIP, inflation, retirement, CAGR,
 *                  net worth, debt repayment and real return (l5-133 to l5-142)
 *   l5-model.ts    band 6, batch 3 — scenario, sensitivity, best/worst-case and
 *                  stress testing on one household plan (l5-143 to l5-146)
 *   l5-security.ts band 7, batch 1 — documents, encryption, backups, data
 *                  security, automation and emergency-money separation
 *                  (l5-147 to l5-152)
 *
 * The plan for every chapter — including the ones not yet written, with their
 * goal, topics, illustration, simulation and sources — lives in
 * `src/data/level5-plan.ts`. `npm run check` keeps this file and the plan in
 * step, so a chapter cannot ship without its own illustration, its own lab,
 * a quiz of at least three explained questions, and a linked official source
 * with a verification date.
 */
export const level5: Record<string, Chapter> = {
  ...l5Career,
  ...l5Money,
  ...l5System,
  ...l5InvestA,
  ...l5RetireA,
  ...l5InstA,
  ...l5InstB,
  ...l5InstC,
  ...l5Estate,
  ...l5Life,
  ...l5Protect,
  ...l5Fraud,
  ...l5Ai,
  ...l5Sheet,
  ...l5Calc,
  ...l5Model,
  ...l5Security,
}
