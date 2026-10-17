import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-136: a plan that grows with your pay, not just with the market. */

export const l5_136: Chapter = {
  id: 'l5-136',
  title: 'SIP Calculator',
  subtitle: 'Model a systematic plan including step-ups, and read the results as a range rather than a promise.',
  minutes: 9,
  blocks: [
    scene(
      'sip-ladder',
      'Monthly contributions rising once a year, each rung larger than the last.',
    ),
    {
      kind: 'p',
      text: 'A systematic investment plan is a schedule, not a product. It fixes the amount and the date, and leaves the price to the market. That removes the hardest part of investing — deciding when — and replaces it with a decision that is easier to keep: how much, every month, for how long. A SIP calculator models that schedule. What it cannot model is the return, which is why the number it produces should always be read as one point in a range.',
    },
    { kind: 'h', text: 'What the calculator is actually adding up' },
    {
      kind: 'p',
      text: 'Each instalment buys units at that month’s price. When the price is low you buy more units; when it is high you buy fewer. The corpus at the end is the number of units times the final price. The calculator does not know the path — it assumes a constant return and applies it every month, which is mathematically convenient and behaviourally unrealistic. A real SIP of ₹10,000 a month for fifteen years at 12% is projected at about ₹50.5 lakh on ₹18 lakh contributed. The same contributions through a market that returned 12% on average but fell 35% in year eight would not end at the same number.',
    },
    {
      kind: 'table',
      caption: 'A ₹10,000 SIP at 12% for 15 years, by convention',
      headers: ['What changes', 'Corpus', 'Why'],
      rows: [
        ['Flat ₹10,000 a month', '₹50.46 lakh', 'The base case the calculator shows'],
        ['10% step-up each year', '₹86.84 lakh', 'Later instalments are much larger; you contribute ₹38.13 lakh'],
        ['Return of 10% instead of 12%', '₹41.78 lakh', 'Two percentage points of assumption, nine lakh of outcome'],
        ['Return of 14% instead of 12%', '₹61.26 lakh', 'The same uncertainty works in the other direction'],
      ],
    },
    {
      kind: 'p',
      text: 'The step-up is the most under-used control on the page. A 10% annual increase is roughly what a salary increment looks like, and it raises the corpus by more than seventy percent here without ever feeling like a larger commitment than the year before. It fails in exactly one situation: when income does not rise, or falls. A step-up is a promise to your future self that your future self may not be able to keep, so it should be set at a level that survives a bad year.',
    },
    { kind: 'h', text: 'Returns are an input, not a feature' },
    {
      kind: 'list',
      items: [
        'A 12% assumption is not a guarantee, a target or a promise. It is a round number that makes the arithmetic easy.',
        'Equity returns arrive unevenly. A decade at 12% can contain two years at −25% and still average out; the SIP survives only if you keep contributing through them.',
        'Changing the return by two percentage points moves a fifteen-year corpus by roughly a fifth. The assumption is doing as much work as the contribution.',
        'Expense ratios and exit loads reduce the return before you see it. A direct plan and a regular plan of the same fund are different products.',
        'A SIP does not protect against a bad fund. It averages the price of the units you buy, not the quality of what you bought.',
      ],
    },
    {
      kind: 'example',
      title: 'Flat versus step-up, over the same fifteen years',
      text: '₹10,000 a month for fifteen years at 12% contributes ₹18,00,000 and is projected at ₹50.46 lakh. The same start with a 10% step-up contributes ₹38.13 lakh and is projected at ₹86.84 lakh. The step-up plan puts in more than twice as much money, so the comparison is not free — but the extra ₹20.13 lakh of contributions produces an extra ₹36.38 lakh of corpus, because the larger instalments have less time to compound and yet still earn their return. The contribution is the part you control; the return is the part you do not.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A projection is not a balance',
      text: 'The gap between a 10% and a 14% assumption on the same plan is larger than most people’s annual savings. That gap is uncertainty, not opportunity. Plan the goal against the low end, and treat the midpoint as a hope. If the plan only works at 14%, it does not work — it depends on a number nobody can promise.',
    },
    sim(
      'l5-sip-model',
      'Change the contribution, the step-up and the assumed return, and watch the corpus and the range around it move.',
    ),
    l5Illustrative(
      'The contributions and projected corpus in the lab are illustrative. The schedule, the step-up arithmetic and the range-reading habit are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'SIP',
          meaning: 'A systematic investment plan: a fixed amount invested at a fixed interval, usually monthly, into a mutual fund scheme.',
        },
        {
          term: 'Step-up',
          meaning: 'An instruction to raise the instalment by a set percentage each year, usually tied to an income increase.',
        },
        {
          term: 'Rupee-cost averaging',
          meaning: 'Buying more units when prices are low and fewer when they are high, which is what a fixed-rupee SIP does mechanically.',
        },
        {
          term: 'Expense ratio',
          meaning: 'The annual fee deducted from a fund’s assets, which reduces the return the investor actually receives.',
        },
      ],
    },
    l5Sources(['amfi', 'sebi'], [
      'Association of Mutual Funds in India — the investor education pages explain SIP mechanics, step-ups and the difference between direct and regular plans',
      'Securities and Exchange Board of India — the mutual fund regulations and investor charter set out what a scheme may promise and what it must disclose about returns',
    ]),
  ],
  quiz: [
    {
      q: 'A SIP calculator projects ₹50.46 lakh from ₹10,000 a month for 15 years at 12%. What is that figure?',
      options: [
        {
          text: 'One outcome under one constant-return assumption, useful mainly for comparing inputs',
          correct: true,
          why: 'The calculator applies the same return every month. Real returns vary, so the projection is a scenario, not a forecast.',
        },
        {
          text: 'The minimum you can expect, because SIPs average out the market',
          why: 'Averaging the purchase price does not guarantee a return. A long flat or falling market can leave the corpus below the projection.',
        },
        {
          text: 'The amount the fund will pay at maturity',
          why: 'A mutual fund scheme has no maturity value. The corpus is whatever the units are worth on the day you sell.',
        },
        {
          text: 'A guaranteed figure because it comes from an official calculator',
          why: 'Official calculators use the same arithmetic as any other. The guarantee would have to come from the product, and equity funds do not offer one.',
        },
      ],
    },
    {
      q: 'What does a 10% annual step-up actually change?',
      options: [
        {
          text: 'The amount invested each year, so later instalments are larger and the corpus rises',
          correct: true,
          why: 'A step-up raises the contribution once a year. On a 15-year plan it more than doubles the money invested and raises the corpus substantially.',
        },
        {
          text: 'The return the fund earns',
          why: 'The fund’s return is unaffected by how much you invest. The step-up changes your contributions, not the market.',
        },
        {
          text: 'The expense ratio of the scheme',
          why: 'The expense ratio is a property of the plan, not of your contribution schedule.',
        },
        {
          text: 'The date of each instalment',
          why: 'The step-up changes the amount, not the date. The mandate still debits on the same day each month.',
        },
      ],
    },
    {
      q: 'Why should a plan be built against the low end of the return range?',
      options: [
        {
          text: 'The return is the input you do not control, so the plan should survive a poor one',
          correct: true,
          why: 'Contributions are controllable; returns are not. A plan that only works at the top of the range is a hope, not a plan.',
        },
        {
          text: 'Because markets always return less than the average',
          why: 'They do not always. The point is that you cannot know which outcome you will get, so the plan must tolerate the weak one.',
        },
        {
          text: 'Because the calculator is usually wrong',
          why: 'The arithmetic is right. The uncertainty is in the assumption, which is why the low end matters.',
        },
        {
          text: 'Because a higher return would be taxed more',
          why: 'Tax reduces the outcome, but the reason to plan low is uncertainty about the return itself.',
        },
      ],
    },
    {
      q: 'What does a SIP protect you from, and what does it not?',
      options: [
        {
          text: 'It removes the timing decision; it does not remove the risk of a bad fund or a long flat market',
          correct: true,
          why: 'A schedule solves the “when to invest” problem. It cannot fix what you invested in or what the market did.',
        },
        {
          text: 'It protects against loss, because you buy more units when prices fall',
          why: 'Buying more units at low prices lowers your average cost, but the value can still be below what you contributed.',
        },
        {
          text: 'It guarantees a return if you stay invested long enough',
          why: 'Longer holding periods reduce some risks, but no equity SIP carries a guarantee.',
        },
        {
          text: 'It removes the need to review the fund',
          why: 'A SIP automates the purchase, not the judgment. The scheme still has to be worth holding.',
        },
      ],
    },
  ],
  takeaway:
    'Treat the return as an assumption and the contribution as the decision, use a step-up you can keep through a bad year, and size the goal against the low end of the range.',
}
