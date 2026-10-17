import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-146: three shocks at once, and the month the plan breaks. */

export const l5_146: Chapter = {
  id: 'l5-146',
  title: 'Financial Stress Testing',
  subtitle:
    'Run a combined stress test — job loss, rate rise and a market fall at once — and record the plan’s breaking point.',
  minutes: 10,
  blocks: [
    scene(
      'stress-test-panel',
      'Job loss, a rate rise and a market fall feeding one liquidity gauge, with the breaking point marked.',
    ),
    {
      kind: 'p',
      text: 'A stress test is a worst case with several bad things happening together. It exists because shocks are correlated: the job loss and the market fall often arrive in the same quarter, and a rate rise lands while the buffer is already paying for a hospital bill. Testing them one at a time is how a plan passes four checks and still fails the year.',
    },
    { kind: 'h', text: 'Build the stress from the household’s own numbers' },
    {
      kind: 'p',
      text: 'The inputs are not generic. They are the household’s liquid buffer, its essential monthly spend, the outstanding balance and reset terms of its floating-rate loan, and the amount it saves each month. The shocks are stated as numbers: months without income, percentage points of rate rise, the percentage fall in the invested corpus. With those five or six numbers, the test produces a single quantity that decides the answer: how many months of the combined burn the buffer can fund.',
    },
    {
      kind: 'table',
      caption: 'The same household under three combined stresses',
      headers: ['Stress', 'Income-free months', 'Rate rise', 'Market fall', 'Result'],
      rows: [
        ['Mild', '3', '0 points', '−10%', 'Survives, ₹1.44 lakh left'],
        ['Combined', '6', '2 points', '−25%', 'Fails in month 6, ₹44,040 short'],
        ['Severe', '9', '3 points', '−35%', 'Runs out in month 5; a 9-month stress leaves ₹2.41 lakh to borrow'],
      ],
    },
    {
      kind: 'p',
      text: 'In the combined case the EMI rises from ₹38,288 to ₹43,628, an extra ₹5,340 a month. Essentials of ₹52,000 plus the higher EMI make the monthly burn ₹57,340. The ₹3 lakh buffer covers 5.2 months of that, so six months without income leaves a shortfall of ₹44,040 — and the shortfall arrives in the same quarter as a portfolio that has just fallen 25%. That is what a stress test is for: not to predict the quarter, but to know that the plan’s breaking point is five months, not six.',
    },
    { kind: 'h', text: 'The breaking point is the deliverable' },
    {
      kind: 'p',
      text: 'The most useful output is not a pass or fail; it is the month. “The buffer survives five months without income” is a fact you can act on. It tells you how much more buffer would change the answer, which fixed costs are worth cutting, and what response has to be arranged before the event. A plan that fails at month six with a ₹44,040 gap needs either one more month of buffer or a ₹7,500 reduction in monthly burn — both are specific, and both are cheaper to arrange now than during the event.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Write the shocks down with numbers and keep them the same between runs, so the results are comparable.',
        'Use essentials, not total spending, for the burn — and include every minimum debt payment.',
        'Recompute the floating-rate EMI at the stressed rate, not just the interest difference.',
        'Stop counting contributions during the income-free months. The conservative version is the useful one.',
        'Record the breaking point and the response for each stress, and review them once a year.',
      ],
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Stress the reset, not only the rate',
      text: 'A floating-rate home loan does not reprice by a newspaper headline; it reprices on a reset date, and the EMI may stay fixed while the tenure extends. That can hide a rate rise for a year and then deliver it as a longer loan. When you stress a floating-rate loan, check both the EMI and the tenure effect, and read the loan agreement for when the reset happens.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Pre-agreed responses are cheaper than improvisation',
      text: 'The responses worth arranging in advance are unglamorous: a credit line approved while employed, a family agreement about a short-term loan, a written rule for pausing the SIP, a list of fixed costs that can be cut in a week. Each one removes a decision from the worst month. The test is not complete until at least one response is written beside each failing stress.',
    },
    sim(
      'l5-stress-test-model',
      'Switch between mild, combined and severe, and read the EMI, the monthly burn, the breaking point and the shortfall.',
    ),
    l5Illustrative(
      'The household, loan and shocks in the lab are invented. The combined-shock method, the breaking-point measure and the pre-agreed-response rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Stress test',
          meaning: 'A combined set of adverse events applied to the household’s own numbers to find whether the plan survives.',
        },
        {
          term: 'Breaking point',
          meaning: 'The number of months of a shock the liquid buffer can fund before it is exhausted.',
        },
        {
          term: 'Monthly burn',
          meaning: 'The cash needed each month during a shock: essentials plus any increase in debt payments.',
        },
        {
          term: 'Reset date',
          meaning: 'The date on which a floating-rate loan is repriced, which determines when a rate rise reaches the EMI or the tenure.',
        },
      ],
    },
    l5Sources(['rbi', 'sebi', 'irdai'], [
      'Reserve Bank of India — the financial stability reports publish stress tests of the banking system using combined shocks, which is the method applied here to a household',
      'Securities and Exchange Board of India — the risk disclosures that explain how a market fall and a redemption can arrive together',
      'Insurance Regulatory and Development Authority of India — the policy terms that determine whether a medical event is a covered cost or a liquidity shock',
    ]),
  ],
  quiz: [
    {
      q: 'Why test job loss, a rate rise and a market fall together rather than one at a time?',
      options: [
        {
          text: 'Because they are correlated and share the same buffer, so the combined case can be worse than each alone',
          correct: true,
          why: 'A plan can pass three separate tests and fail the quarter they arrive in. The buffer, the income and the portfolio are one system.',
        },
        {
          text: 'Because one-at-a-time testing is mathematically wrong',
          why: 'It is valid for isolating effects. It understates the combined case, which is why the stress test exists.',
        },
        {
          text: 'Because a stress test replaces the need for scenarios',
          why: 'They answer different questions. Scenarios name futures and responses; the stress test measures the breaking point.',
        },
        {
          text: 'Because the bank requires it',
          why: 'A household stress test is not a regulatory requirement. It is a planning method.',
        },
      ],
    },
    {
      q: 'What is the most useful output of a stress test?',
      options: [
        {
          text: 'The breaking point — the number of months of shock the buffer can fund — and the response written beside it',
          correct: true,
          why: 'A month count is specific and actionable. Pass or fail alone does not tell you how much more buffer or how much less burn would change the answer.',
        },
        {
          text: 'A single probability that the plan fails',
          why: 'The shocks are scenarios, not a probability distribution. A failure probability would be false precision.',
        },
        {
          text: 'The projected corpus in the worst year',
          why: 'The corpus matters, but the binding constraint in a shock is usually liquidity. The breaking point measures that.',
        },
        {
          text: 'The number of scenarios tested',
          why: 'The count is not a result. The breaking point and the responses are.',
        },
      ],
    },
    {
      q: 'During the income-free months, what should the monthly burn include?',
      options: [
        {
          text: 'Essentials plus every minimum debt payment, including the higher EMI after the rate rise',
          correct: true,
          why: 'The burn is the cash that must leave the account. Leaving out the EMI increase or the minimum payments understates it.',
        },
        {
          text: 'Total spending, including discretionary categories',
          why: 'The worst case assumes discretionary spending is cut. Using total spending overstates the burn and can make every plan look doomed.',
        },
        {
          text: 'Only the essentials, because loans can be paused',
          why: 'Loans cannot generally be paused without consequence. Minimum payments belong in the burn.',
        },
        {
          text: 'The EMI at the old rate, because the reset may be delayed',
          why: 'The delay is worth noting, but the stress test should use the stressed rate. Otherwise it tests a rate rise that never reaches the payment.',
        },
      ],
    },
    {
      q: 'Why arrange responses before the stress happens?',
      options: [
        {
          text: 'Because a credit line, a family agreement or a written pause rule is easier to arrange while employed and calm',
          correct: true,
          why: 'The worst month is a bad time to negotiate. A pre-agreed response removes a decision from the moment it is hardest to make.',
        },
        {
          text: 'Because pre-agreed responses eliminate the shock',
          why: 'They do not. They change what happens after it, not whether it occurs.',
        },
        {
          text: 'Because lenders must offer credit during a stress',
          why: 'They are least likely to offer it then. That is why the arrangement has to exist beforehand.',
        },
        {
          text: 'Because the stress test is not complete without a probability',
          why: 'Probability is a judgment, not a requirement. The response is what completes the test.',
        },
      ],
    },
  ],
  takeaway:
    'Run the shocks together on the household’s own numbers, report the breaking point in months and rupees, and write the response before the month arrives.',
}
