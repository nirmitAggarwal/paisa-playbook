import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-145: a worst case has to be survivable, not dramatic. */

export const l5_145: Chapter = {
  id: 'l5-145',
  title: 'Best-Case/Worst-Case Analysis',
  subtitle: 'Define a realistic worst case and make sure the essentials survive it without new borrowing.',
  minutes: 9,
  blocks: [
    scene(
      'case-range',
      'Worst, base and best outcomes on one line, with the essentials marked between them.',
    ),
    {
      kind: 'p',
      text: 'A best-case and worst-case analysis is not pessimism and optimism placed side by side. It is a test of survival. The worst case exists to answer one question: if the bad version of the next year happens, can the household pay for essentials without borrowing? If the answer is yes, the plan has a floor. If it is no, the plan has a breaking point that is worth finding before the bad year does.',
    },
    { kind: 'h', text: 'Define the worst case as an event, not a mood' },
    {
      kind: 'p',
      text: '“Markets crash” is not a worst case. “A 25% fall in the invested corpus, six months without income, and no change in the EMI” is one, because each part can be measured. The definition should be specific enough that a different person could rerun it and get the same answer, and severe enough that it is uncomfortable but not absurd. A worst case that assumes the bank fails, the insurer fails and the house burns down is not a plan; it is a reason to stop planning.',
    },
    {
      kind: 'table',
      caption: 'The same household, three cases',
      headers: ['Case', 'Assumptions', 'Invested corpus', 'Essentials'],
      rows: [
        ['Worst', '6 months without income, market −25%', '₹1.29 crore', 'Buffer ₹12,000 short'],
        ['Base', 'No shocks, 11% return', '₹1.72 crore', 'Covered'],
        ['Best', 'No shocks, 14% return', '₹2.39 crore', 'Covered'],
      ],
    },
    {
      kind: 'p',
      text: 'In the worst case the corpus is not the problem. A ₹1.29 crore portfolio still exists; it has simply fallen. The problem is liquidity. Six months without income at ₹52,000 of essentials needs ₹3.12 lakh, and the buffer is ₹3 lakh, so the plan borrows ₹12,000 — a small number that is the difference between a shock and a debt spiral. Four months of income loss leaves ₹92,000 and no borrowing. The exact month count is the variable that decides it, which is why the worst case should state it.',
    },
    { kind: 'h', text: 'Survival first, optimisation second' },
    {
      kind: 'list',
      items: [
        'Rank the essentials: housing, food, utilities, medicines, insurance premiums, minimum loan payments. These are the line the worst case has to clear.',
        'Discretionary spending can fall to near zero in the calculation, but only if you would actually cut it. A worst case that assumes a household cancels everything is testing a different household.',
        'Do not count the emergency fund twice — once as a buffer and once as an investment. It is one pool with one job.',
        'Do not assume a new loan is available in the worst case. Lenders tighten exactly when households need them most.',
        'Check the insurance before the investment. A hospitalisation is the event most likely to turn a bad month into a borrowed year, and cover is the instrument designed for it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Probability belongs beside the case, not inside it',
      text: 'A worst case is not made more useful by assigning it a 5% chance. The number invites an argument about the guess and can be used to justify ignoring the case entirely. The question is not whether it is likely; it is whether it is survivable. If a 5% event is unsurvivable, it still deserves a response, because the cost of being wrong is not symmetric.',
    },
    {
      kind: 'example',
      title: 'Shrinking the worst case until it survives',
      text: 'With six months of income loss the plan is ₹12,000 short. The household has three ways to fix it, and only one of them is a projection. It can hold a larger buffer — another month of essentials would cover it. It can cut a fixed cost — moving the car loan to a lower rate or dropping a subscription changes the monthly burn. Or it can pre-arrange a response: a family loan, a credit line that is set up while employed, a plan to pause the SIP. The first two change the arithmetic; the third changes what happens on the day. A complete worst-case analysis contains at least one of each.',
    },
    {
      kind: 'p',
      text: 'The best case is not there to feel good. It answers a different question: what would you do with a good outcome? If the plan produces a surplus, the response should already be written — pay down the loan, top up the emergency fund, fund the next goal — because an unassigned surplus is the money that lifestyle spending absorbs by default.',
    },
    sim(
      'l5-best-worst-model',
      'Change the months without income in the worst case and watch the buffer move from “₹12,000 short” to “₹92,000 left”.',
    ),
    l5Illustrative(
      'The household, buffer and shock in the lab are invented. The event-based definition, the essentials line and the survival test are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Worst case',
          meaning: 'A named, measurable set of adverse events used to test whether essentials can be funded without new borrowing.',
        },
        {
          term: 'Essentials',
          meaning: 'The spending that cannot be cut in a shock: housing, food, utilities, medicines, insurance and minimum debt payments.',
        },
        {
          term: 'Contingency action',
          meaning: 'A response arranged in advance for the worst case — a pause in contributions, a pre-approved credit line, a family agreement.',
        },
        {
          term: 'Probability honesty',
          meaning: 'Stating a likelihood as a judgment rather than a fact, and not letting a low probability justify ignoring an unsurvivable outcome.',
        },
      ],
    },
    l5Sources(['rbi', 'irdai'], [
      'Reserve Bank of India — the financial stability reports and the household debt data are the context for how a liquidity shortfall becomes a borrowing problem',
      'Insurance Regulatory and Development Authority of India — the policy terms that decide whether a hospitalisation or a loss is covered, which is the event most likely to define the worst case',
    ]),
  ],
  quiz: [
    {
      q: 'What makes a worst case useful?',
      options: [
        {
          text: 'It is specific enough to rerun, severe enough to matter, and survivable with a written response',
          correct: true,
          why: 'A measurable event with a defined response is a plan. A vague mood or an unsurvivable catastrophe is not.',
        },
        {
          text: 'It assumes every possible thing goes wrong at once',
          why: 'That produces a case nobody can prepare for and no response worth writing. Combined shocks belong in a stress test, not in an everything-at-once case.',
        },
        {
          text: 'It is assigned a probability below 10%',
          why: 'The probability is a judgment and does not make the case useful. Survivability does.',
        },
        {
          text: 'It always shows a positive corpus',
          why: 'A positive corpus can coexist with a liquidity failure. The case should show the truth, not a comfortable number.',
        },
      ],
    },
    {
      q: 'A worst case leaves the portfolio at ₹1.29 crore but the buffer ₹12,000 short. What is the actual problem?',
      options: [
        {
          text: 'Liquidity, not net worth: the household cannot fund essentials in the short term without borrowing',
          correct: true,
          why: 'A large but fallen portfolio does not pay this month’s bills. The shortfall is a cash-flow problem, and ₹12,000 of new borrowing is where a spiral can start.',
        },
        {
          text: 'The portfolio has fallen, so the plan has failed',
          why: 'A market fall is not a plan failure unless it forces selling or borrowing. The binding constraint here is cash.',
        },
        {
          text: 'The emergency fund is too large',
          why: 'The buffer is ₹12,000 short for this shock. It is too small, not too large.',
        },
        {
          text: 'The insurance is inadequate',
          why: 'Insurance matters, but this scenario is income loss and a market fall. The measured gap is liquidity.',
        },
      ],
    },
    {
      q: 'Why should a worst case not assume that a new loan will be available?',
      options: [
        {
          text: 'Because lenders tighten credit exactly when households are most likely to need it',
          correct: true,
          why: 'Availability of credit is conditional on income and conditions. A survival plan that depends on a loan being approved is not a survival plan.',
        },
        {
          text: 'Because borrowing is always wrong',
          why: 'Borrowing can be appropriate. The point is not to assume it will be offered at the moment of stress.',
        },
        {
          text: 'Because loans are not counted in net worth',
          why: 'Loans are liabilities on a balance sheet. The issue here is whether new credit would be available at all.',
        },
        {
          text: 'Because the worst case must show a positive corpus',
          why: 'The corpus can be positive and the plan can still fail on liquidity. That is what the case is testing.',
        },
      ],
    },
    {
      q: 'A worst case has a 5% chance. Why might it still deserve a response?',
      options: [
        {
          text: 'Because the cost of being wrong is not symmetric: an unsurvivable outcome is worth insuring against even when unlikely',
          correct: true,
          why: 'The question is not only likelihood but consequence. A small chance of a ruinous outcome can justify a cheap precaution.',
        },
        {
          text: 'Because 5% is actually a high probability',
          why: 'It may or may not be high. The argument does not depend on calling it high.',
        },
        {
          text: 'Because probabilities cannot be estimated',
          why: 'They can be estimated, with uncertainty. The point is that the estimate is not the decision rule.',
        },
        {
          text: 'Because insurance is always the right response',
          why: 'Insurance is one response among several. The reason to act is the asymmetry of the consequence.',
        },
      ],
    },
  ],
  takeaway:
    'Define the worst case as a measurable event, test it against the essentials rather than the portfolio, arrange the response before it happens, and do not let a probability argument dismiss an unsurvivable outcome.',
}
