import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-137: a goal has a price today and a different one on the day you pay. */

export const l5_137: Chapter = {
  id: 'l5-137',
  title: 'Inflation Calculator',
  subtitle: 'Convert nominal amounts into today’s purchasing power and back again, correctly.',
  minutes: 9,
  blocks: [
    scene(
      'inflation-bridge',
      '₹50,000 today and the ₹89,542 that the same basket costs in ten years at 6% a year.',
    ),
    {
      kind: 'p',
      text: 'Every goal in a financial plan is a number with a date on it. A child’s education priced today is not the amount you will need in fifteen years, and a retirement expense of ₹60,000 a month is not the expense you will face at 60. Inflation is the translation between those two numbers. It is the least dramatic input on any calculator and the one most likely to make a plan fail quietly, because it compounds in the same direction as the return and is easy to leave out.',
    },
    { kind: 'h', text: 'Two directions, one formula' },
    {
      kind: 'formula',
      label: 'Future cost',
      expr: 'Future cost = amount today × (1 + inflation)^years',
      note: 'Divide instead of multiplying to go the other way: what a future amount is worth in today’s money.',
    },
    {
      kind: 'p',
      text: 'At 6% a year, ₹50,000 today is ₹89,542 in ten years. The same ₹50,000 in twenty years is ₹1,60,357. Doubling the horizon roughly doubles the future cost, which is the arithmetic of compounding and the reason long-dated goals need to be restated rather than estimated. Going the other way: a ₹1,00,000 salary in 2036 at 6% inflation buys what ₹55,839 buys today. A raise that has not matched inflation is a pay cut in real terms.',
    },
    {
      kind: 'table',
      caption: 'What ₹50,000 becomes in ten years, by category',
      headers: ['Category', 'Assumed inflation', 'Cost in 10 years'],
      rows: [
        ['Headline CPI', '6%', '₹89,542'],
        ['Education', '8%', '₹1,07,946'],
        ['Food at home', '6%', '₹89,542'],
        ['Electronics', '2%', '₹60,950'],
        ['Medical care', '7% (illustrative)', '₹98,358'],
      ],
    },
    {
      kind: 'p',
      text: 'There is no single inflation rate. The headline number is a weighted average of a basket that includes things you do not buy, weighted by households that are not yours. Your personal inflation depends on your spending: a household that rents, pays school fees and buys medicines faces a different rate from one that owns a home and spends on travel. For a goal with a narrow category — school fees, a medical procedure, a vehicle — use the rate for that category rather than the headline, and state the assumption in the plan.',
    },
    { kind: 'h', text: 'Wages and prices are not the same series' },
    {
      kind: 'p',
      text: 'Inflation erodes an amount of money; wage growth changes the amount of money arriving. A salary that rises 8% while prices rise 6% is a real raise of about 1.9%, not 2%, because the two compound. Over a career the difference between a real raise and a nominal one is the difference between getting ahead and standing still. When you project a retirement contribution that steps up with your salary, you are assuming wage growth; when you project the expense it has to cover, you are assuming price inflation. Use both, and do not use one for the other.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The quiet failure: a goal funded at today’s price',
      text: 'A plan that saves ₹50,000 for a goal that will cost ₹89,542 does not fail loudly. It arrives at the date with 56% of the money and a decision to make. That is why the goal should be written in future rupees at the start, not adjusted at the end. Restating a goal takes one line of arithmetic and removes the most common reason a plan comes up short.',
    },
    {
      kind: 'list',
      items: [
        'Write every goal as an amount and a date. An amount without a date cannot be restated.',
        'Use a category rate where one exists, and the headline rate only as a fallback.',
        'Do not subtract inflation from the return and call it done. Divide: real return is (1 + nominal) / (1 + inflation) − 1.',
        'Re-check the assumption once a year against the published series, and change the plan rather than the number.',
        'Remember that some costs fall in real terms. Electronics and air travel have done so; school fees and medical care have not.',
      ],
    },
    sim(
      'l5-inflation-model',
      'Restate a goal in future rupees, switch between the headline rate and a category rate, and see the gap open.',
    ),
    l5Illustrative(
      'The rates and amounts in the lab are illustrative. The direction of the conversion, the category distinction and the compounding arithmetic are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Nominal amount',
          meaning: 'A number of rupees as printed, before adjusting for what those rupees can buy.',
        },
        {
          term: 'Real amount',
          meaning: 'An amount restated in the purchasing power of a chosen year, so that two dates can be compared.',
        },
        {
          term: 'Headline inflation',
          meaning: 'The change in a weighted basket of consumer goods and services, published as a single rate.',
        },
        {
          term: 'Category inflation',
          meaning: 'The rate for one component of the basket, such as education or medical care, which can differ sharply from the headline.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — publishes the monetary policy statements and the inflation outlook, and links to the official consumer price series that the headline rate comes from',
    ]),
  ],
  quiz: [
    {
      q: 'A goal costs ₹50,000 today and will be paid in 10 years. At 6% inflation, what should the plan fund?',
      options: [
        {
          text: '₹89,542, because the same basket costs more in future rupees',
          correct: true,
          why: 'Future cost is today’s amount compounded at inflation. Funding ₹50,000 would leave the goal 44% short.',
        },
        {
          text: '₹50,000, because inflation does not change the real cost',
          why: 'Inflation does not change the real cost, but the plan is funded in nominal rupees. The nominal amount has to rise.',
        },
        {
          text: '₹80,000, because 6% of 50,000 is 3,000 a year for 10 years',
          why: 'That is simple interest. Inflation compounds, so each year’s increase is charged on the previous year’s higher price.',
        },
        {
          text: '₹53,000, because only one year of inflation applies at the time of payment',
          why: 'Inflation applies every year between today and the payment date, not only in the final year.',
        },
      ],
    },
    {
      q: 'Why might a household use 8% rather than the 6% headline rate for a school-fee goal?',
      options: [
        {
          text: 'Because education costs have their own inflation rate, which can run above the whole-basket average',
          correct: true,
          why: 'The headline is a weighted average of many categories. A goal concentrated in one category should use that category’s rate.',
        },
        {
          text: 'Because 8% is the maximum rate the calculator accepts',
          why: 'There is no such cap. The choice is about the relevant category, not a limit.',
        },
        {
          text: 'Because school fees are paid annually, and annual payments compound faster',
          why: 'Payment frequency changes the timing of cash flows, not the inflation rate applied to the cost.',
        },
        {
          text: 'Because a higher rate makes the plan safer regardless of the category',
          why: 'A higher assumption produces a larger target, but it should be justified by the category. Padding the rate hides the reasoning.',
        },
      ],
    },
    {
      q: 'Your salary rises 8% while prices rise 6%. What is the real change?',
      options: [
        {
          text: 'About 1.9%, because the two rates compound rather than subtract',
          correct: true,
          why: 'Real growth is (1.08 / 1.06) − 1 = 1.89%. Subtracting gives 2%, which overstates the gain.',
        },
        {
          text: '2%, because 8 minus 6 is 2',
          why: 'Subtraction is the rough approximation. The correct restatement divides the growth factors.',
        },
        {
          text: '8%, because the salary is the only number that changed',
          why: 'The salary changed in nominal terms. Its purchasing power changed by the difference between wage growth and price growth.',
        },
        {
          text: '−6%, because inflation is charged on the whole salary',
          why: 'Inflation is not a charge on the salary. It changes what the salary can buy, relative to the price level.',
        },
      ],
    },
    {
      q: 'A plan funds a 15-year goal at today’s price. What happens?',
      options: [
        {
          text: 'It arrives at the date with less than the goal costs, and the shortfall is not visible until then',
          correct: true,
          why: 'The nominal target was too low from the start. Restating the goal in future rupees at the beginning is what prevents this.',
        },
        {
          text: 'It succeeds, because the investment return also compounds',
          why: 'The return helps, but the goal is a cost that compounds too. Funding the wrong target can still fall short after a good return.',
        },
        {
          text: 'Inflation only matters for cash, not for invested money',
          why: 'Inflation matters for the goal, whatever the money is invested in. The investment has to beat it, not ignore it.',
        },
        {
          text: 'The shortfall is automatically covered by a step-up',
          why: 'A step-up only helps if it was part of the plan. It is not automatic.',
        },
      ],
    },
  ],
  takeaway:
    'Write every goal as an amount and a date, restate it in future rupees using the rate for its category, and divide rather than subtract when converting between nominal and real.',
}
