import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-138: two phases, and the second one is the one people skip. */

export const l5_138: Chapter = {
  id: 'l5-138',
  title: 'Retirement Calculator',
  subtitle: 'Project a retirement corpus and its drawdown, then test the assumptions that matter most.',
  minutes: 10,
  blocks: [
    scene(
      'retirement-phases',
      'Thirty years of accumulation, a retirement line, and twenty-five years of spending it down.',
    ),
    {
      kind: 'p',
      text: 'Most retirement calculators answer one half of the question: how much will I have? The harder half is how much will I need, and for how long, and what happens if the years arrive in a different order. A retirement plan is two phases joined at a date. In the first, contributions and returns build a corpus. In the second, the corpus and its return fund a monthly expense that rises with inflation. Both halves have to be modelled, and the second one is where plans fail.',
    },
    { kind: 'h', text: 'The corpus needed is an annuity, not a multiple' },
    {
      kind: 'p',
      text: 'A common shortcut is to multiply your annual expense by twenty-five or thirty. That assumes a withdrawal rate and ignores inflation, the return on the corpus after retirement and how long you live. The proper figure is the present value of a rising stream of expenses: the first year’s cost, inflated to the retirement date, discounted at the real return above inflation for the number of years in retirement.',
    },
    {
      kind: 'formula',
      label: 'Corpus at retirement',
      expr: 'C = E₁ × (1 − (1 + r)^−n) / r',
      note: 'E₁ is the first year’s expense in retirement rupees, r is the real return after inflation, and n is the number of years in retirement.',
    },
    {
      kind: 'table',
      caption: 'A ₹60,000 monthly expense today, retiring at 55, 60 or 65',
      headers: ['Retire at', 'Years of retirement', 'Corpus needed', 'Projected at ₹25,000 a month'],
      rows: [
        ['55', '30', '₹8.04 crore', '₹3.98 crore — a ₹4.06 crore gap'],
        ['60', '25', '₹9.17 crore', '₹7.08 crore — a ₹2.10 crore gap'],
        ['65', '20', '₹10.04 crore', '₹12.43 crore — a surplus'],
      ],
    },
    {
      kind: 'p',
      text: 'The corpus needed rises as retirement is delayed, because inflation has longer to raise the first year’s expense. But the projected corpus rises faster, because the contributions run for more years and compound for longer. That is why retiring later is usually cheaper in monthly-contribution terms, and why the retirement age is the single most powerful control on the page. It is also the control people treat as fixed.',
    },
    { kind: 'h', text: 'The drawdown is where the assumptions bite' },
    {
      kind: 'list',
      items: [
        'Longevity: a plan to 85 is a plan for about half of a couple’s chances. Running the numbers to 95 is not pessimism; it is the length of the tail.',
        'Inflation: a 6% assumption doubles the expense every twelve years. Over a 25-year retirement that is more than two doublings.',
        'Sequence risk: a 30% fall in the first two years of drawdown does far more damage than the same fall ten years in, because you are selling units to fund the expense.',
        'The post-retirement return: cash and debt are safer but may not beat inflation after tax. The real return on the corpus is the number that matters.',
        'One-off costs: a medical event, a house repair, a child’s wedding. The base case has no room for them unless you put them in.',
      ],
    },
    {
      kind: 'example',
      title: 'The same ₹60,000, three retirement dates',
      text: 'At 55, ₹60,000 a month today becomes ₹2.57 lakh a month at retirement after 25 years of 6% inflation, and funding thirty years of that needs ₹8.04 crore. At 60 the first-year expense is ₹3.45 lakh and the corpus ₹9.17 crore over twenty-five years. At 65 the expense is ₹4.61 lakh but the corpus is only needed for twenty years, so it is ₹10.04 crore. Meanwhile ₹25,000 a month at 11% grows to ₹3.98 crore by 55, ₹7.08 crore by 60 and ₹12.43 crore by 65. The retirement date changes both sides of the equation at once.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Count the guaranteed layers before the projected one',
      text: 'EPF, EPS where applicable, NPS and any annuity are retirement income with different risk from a market portfolio. Add them as income in the drawdown rather than as part of a corpus you will withdraw at 7%. A plan that assumes a 7% post-retirement return on the entire corpus is assuming equity-like returns through the years you can least afford a fall. The conservative version — annuitise the essentials, invest the rest — produces a smaller projected number and a plan that survives a bad decade.',
    },
    sim(
      'l5-retirement-model',
      'Change the retirement age, the expense and the contribution, and watch the corpus needed and the projected corpus move in opposite directions.',
    ),
    l5Illustrative(
      'The expenses, rates and corpus figures in the lab are illustrative. The two-phase structure, the annuity arithmetic and the sequence-risk point are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Accumulation phase',
          meaning: 'The years before retirement, when contributions and returns build the corpus.',
        },
        {
          term: 'Drawdown phase',
          meaning: 'The years after retirement, when the corpus funds expenses and is gradually spent.',
        },
        {
          term: 'Sequence risk',
          meaning: 'The danger that poor returns early in drawdown permanently reduce the corpus, even if later returns are normal.',
        },
        {
          term: 'Annuity',
          meaning: 'A product or calculation that converts a lump sum into a regular income, usually for life.',
        },
      ],
    },
    l5Sources(['pfrda', 'epfo', 'rbi'], [
      'Pension Fund Regulatory and Development Authority — the NPS rules, withdrawal options and annuity requirements that shape the drawdown phase',
      'Employees’ Provident Fund Organisation — the EPF and EPS rules, including the pensionable salary ceiling, which determine how much retirement income is already contracted',
      'Reserve Bank of India — the inflation and interest-rate context in which any long projection is being made',
    ]),
  ],
  quiz: [
    {
      q: 'Why does a retirement corpus need to be calculated as an annuity rather than a multiple of annual expenses?',
      options: [
        {
          text: 'Because the expenses rise with inflation for every year of retirement, and the corpus still earns a return while it is drawn down',
          correct: true,
          why: 'The multiple ignores both the rising expense and the return on the remaining corpus. The annuity formula accounts for both.',
        },
        {
          text: 'Because a multiple cannot be calculated without knowing the tax rate',
          why: 'Tax matters, but the core reason is that expenses rise and the corpus keeps earning. A multiple treats both as zero.',
        },
        {
          text: 'Because retirement expenses are always higher than working expenses',
          why: 'They are often lower. The problem is not the level but the inflation and the length of the drawdown.',
        },
        {
          text: 'Because the multiple assumes you will spend the corpus in one year',
          why: 'A multiple of 25 or 30 assumes a withdrawal rate over many years. It still ignores inflation and return.',
        },
      ],
    },
    {
      q: 'Delaying retirement from 60 to 65 raises the corpus needed. Why can it still make the plan easier?',
      options: [
        {
          text: 'Because five more years of contributions and compounding raise the projected corpus by more than the target rises',
          correct: true,
          why: 'Both sides grow, but the projected side grows faster. In the example the plan moves from a ₹2.10 crore gap to a surplus.',
        },
        {
          text: 'Because the corpus needed falls after 60',
          why: 'It rises, from ₹9.17 crore to ₹10.04 crore, because inflation has longer to lift the first year’s expense.',
        },
        {
          text: 'Because inflation stops at retirement',
          why: 'Inflation continues through retirement. The corpus needed reflects that.',
        },
        {
          text: 'Because the retirement age does not affect the calculation',
          why: 'It changes both the number of contribution years and the number of drawdown years, which is why it matters so much.',
        },
      ],
    },
    {
      q: 'What is sequence risk in the drawdown phase?',
      options: [
        {
          text: 'Poor returns early in retirement do more damage than the same returns later, because you are selling units to fund expenses',
          correct: true,
          why: 'Withdrawing from a fallen portfolio locks in the loss. The order of returns matters when cash is flowing out.',
        },
        {
          text: 'The risk that you live longer than expected',
          why: 'That is longevity risk. Sequence risk is about the order of returns, though the two interact.',
        },
        {
          text: 'The risk that inflation is higher than assumed',
          why: 'That is inflation risk. Sequence risk is specifically about the timing of market returns during drawdown.',
        },
        {
          text: 'The risk that the annuity provider fails',
          why: 'That is counterparty risk. Sequence risk applies to a portfolio you are drawing down yourself.',
        },
      ],
    },
    {
      q: 'A plan assumes a 7% post-retirement return on the whole corpus. What is the objection?',
      options: [
        {
          text: 'It assumes equity-like returns through the years you can least afford a fall, and ignores that essentials may need guaranteed income',
          correct: true,
          why: 'The drawdown phase has less time to recover from a bad decade. Mixing guaranteed income for essentials with growth for the rest is more robust.',
        },
        {
          text: 'Because 7% is higher than any investment can return',
          why: 'Equity can return 7% or more over long periods. The issue is the risk of that assumption in the drawdown years, not its impossibility.',
        },
        {
          text: 'Because the corpus should not earn anything after retirement',
          why: 'It should earn something, or inflation will consume it faster. The question is how much risk that return should carry.',
        },
        {
          text: 'Because tax is not included',
          why: 'Tax is one reason the net return is lower, but the deeper problem is that the assumption applies a growth-portfolio return to money that is being spent.',
        },
      ],
    },
  ],
  takeaway:
    'Model both phases, build the corpus from a rising expense rather than a multiple, treat the retirement date as a lever, and keep guaranteed income under the essentials so a bad early decade cannot break the plan.',
}
