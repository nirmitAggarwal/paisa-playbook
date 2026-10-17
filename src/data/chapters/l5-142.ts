import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-142: the return you keep is the shortest bar. */

export const l5_142: Chapter = {
  id: 'l5-142',
  title: 'Real-Return Calculator',
  subtitle: 'Strip tax and inflation out of a return to see what a holding actually earns.',
  minutes: 9,
  blocks: [
    scene(
      'real-return-layers',
      'A 12% headline return peeled by fees, tax and inflation, leaving 3.25% of buying power.',
    ),
    {
      kind: 'p',
      text: 'A headline return is a gross number. Between the fund’s return and the extra buying power in your account sit three deductions: the fee the fund charges, the tax on the gain, and the inflation that raises the price of everything you will spend the money on. Each is quoted separately and each compounds, so the order and the multiplication matter. The number that survives all three is the real, after-tax return, and it is the only one that can be compared across assets.',
    },
    { kind: 'h', text: 'Peel the layers in order' },
    {
      kind: 'formula',
      label: 'Real return',
      expr: 'Real return = (1 + after-tax return) / (1 + inflation) − 1',
      note: 'Divide rather than subtract. Subtracting overstates the real return whenever both numbers are positive and meaningful.',
    },
    {
      kind: 'table',
      caption: 'Three assets, the same three deductions (illustrative rates)',
      headers: ['Asset', 'Nominal', 'After fees', 'After tax', 'Real at 6% inflation'],
      rows: [
        ['Equity fund', '12.0%', '10.8%', '9.45%', '3.25%'],
        ['Debt fund', '8.0%', '7.5%', '5.25%', '−0.71%'],
        ['Fixed deposit', '7.0%', '7.0%', '4.90%', '−1.04%'],
      ],
    },
    {
      kind: 'p',
      text: 'The equity fund is assumed to lose 1.2% to fees and 12.5% of the remaining gain to tax, which is a simplification: equity tax is usually paid when units are sold, not every year. The debt fund and the fixed deposit are taxed at 30%, which is the marginal rate for many households, and their interest is taxed as it accrues. At 6% inflation, a fixed deposit returning 7% before tax keeps none of its buying power — it loses about 1% a year in real terms. That is not an argument against fixed deposits; it is an argument for knowing what they are for.',
    },
    { kind: 'h', text: 'Why the arithmetic is multiplication, not subtraction' },
    {
      kind: 'p',
      text: 'A 12% return and 6% inflation do not leave 6%. The return multiplies the money, then inflation multiplies the prices, and the two factors have to be divided: 1.0945 / 1.06 − 1 = 3.25%. The subtraction gives 4.95%, which is wrong by more than a percentage point a year. Over twenty years that error is the difference between a plan that works and one that quietly does not. The same logic applies to fees: a 1.2% fee on a 12% return leaves 10.8%, not 12% minus 1.2 percentage points of the final corpus.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Tax timing changes the answer',
      text: 'Equity gains are typically taxed only when sold, so an unrealised gain compounds untaxed until the sale. Interest is usually taxed as it accrues, which removes money that would otherwise have compounded. A debt fund and an equity fund with the same pre-tax return are not the same after-tax return, and two investors with different holding periods face different rates on the same product. The calculator’s single tax rate is an average of a rule that depends on when you sell.',
    },
    {
      kind: 'list',
      items: [
        'Compare assets on real, after-tax return — a 7% deposit and a 10% fund are not comparable on the headline.',
        'Use your marginal rate for interest, and the rate that applies to your holding period for capital gains. Do not use someone else’s.',
        'Include the expense ratio and any advisory fee. A 1% fee is a permanent deduction from a return you are trying to keep.',
        'State the inflation assumption. A 5% and a 7% assumption produce very different verdicts on the same asset.',
        'Check the real return against the goal. A goal that needs 4% real cannot be funded by an asset returning 3.25%.',
      ],
    },
    {
      kind: 'example',
      title: 'Why the fixed deposit felt better than it was',
      text: 'A 7% fixed deposit for one year on ₹1,00,000 pays ₹7,000 of interest. At a 30% slab that is ₹4,900 after tax, leaving ₹1,04,900. If prices rose 6%, the basket that cost ₹1,00,000 now costs ₹1,06,000. The deposit has lost about ₹1,100 of buying power, a real return of −1.04%. The statement shows a gain, the tax is paid, and the purchasing power is lower. That is not a scandal; it is why the real return belongs next to the nominal one.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'The rate you pay depends on the asset and the holding period',
      text: 'Interest income, capital gains and dividends are taxed under different rules, and the holding period can change which rule applies. Those rules change with the annual Finance Act, so the rate in this chapter is an assumption for the arithmetic, not a statement of current law. Check the Income Tax Department’s current-year pages, or your Form 26AS and AIS, before you use a rate in a real decision.',
    },
    sim(
      'l5-real-return-model',
      'Switch between an equity fund, a debt fund and a fixed deposit, then move the fee and the tax rate and watch the real return cross zero.',
    ),
    l5Illustrative(
      'The rates, fees and tax assumptions in the lab are illustrative and rounded. The layer order, the division rather than subtraction, and the tax-timing point are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Nominal return',
          meaning: 'The return before fees, tax and inflation. It is the number a product advertises.',
        },
        {
          term: 'Real return',
          meaning: 'The return after inflation, expressed in purchasing power. It is the number that changes what you can buy.',
        },
        {
          term: 'Expense ratio',
          meaning: 'The annual fee deducted from a fund’s assets, which reduces the return before you receive it.',
        },
        {
          term: 'Tax drag',
          meaning: 'The reduction in compounded return caused by tax being paid on gains or interest, especially when it is paid annually.',
        },
      ],
    },
    l5Sources(['incometax', 'rbi'], [
      'Income Tax Department — the current-year rates for interest, capital gains and dividends, and the AIS/Form 26AS statements that show what was actually paid',
      'Reserve Bank of India — the inflation series and the deposit-rate context, so the nominal and real sides of the comparison come from the same official sources',
    ]),
  ],
  quiz: [
    {
      q: 'A fund returns 12% before fees. It charges 1.2% and you pay 12.5% tax on the gain. Inflation is 6%. What is the real return?',
      options: [
        {
          text: 'About 3.25%, after fees, tax and inflation are divided out in order',
          correct: true,
          why: '12% less 1.2% is 10.8%; less 12.5% of that is 9.45%; divided by 1.06 is 3.25%. Each layer multiplies.',
        },
        {
          text: 'About 3.45%, by subtracting each layer from the nominal return',
          why: 'Subtracting the layers is an approximation that drifts. The correct restatement divides by the inflation factor.',
        },
        {
          text: 'About 10.8%, because fees are the only deduction from the fund’s return',
          why: 'Tax and inflation also reduce what the return is worth. 10.8% is the after-fee figure, not the real one.',
        },
        {
          text: 'About 9.45%, which is the after-tax return',
          why: '9.45% is after tax but before inflation. The real return is lower.',
        },
      ],
    },
    {
      q: 'A fixed deposit pays 7% and inflation is 6%. Why can the real return be negative after tax?',
      options: [
        {
          text: 'Because tax is charged on the nominal interest, leaving less than the rise in prices',
          correct: true,
          why: 'At a 30% slab the after-tax return is 4.9%, below 6% inflation. The nominal gain is real, the purchasing power is not.',
        },
        {
          text: 'Because fixed deposits are not protected by deposit insurance',
          why: 'Deposit insurance covers a failure of the bank, not the erosion of purchasing power. The negative real return comes from tax and inflation.',
        },
        {
          text: 'Because inflation is charged on the interest only',
          why: 'Inflation applies to the prices of goods and services, not to the interest. The comparison is between the after-tax return and the rise in prices.',
        },
        {
          text: 'Because the deposit’s rate is variable',
          why: 'A fixed deposit’s rate is fixed for its term. The issue is the gap between that rate, after tax, and inflation.',
        },
      ],
    },
    {
      q: 'Why is real return calculated by division rather than subtraction?',
      options: [
        {
          text: 'Because the return and inflation both multiply the amount, so their factors have to be divided',
          correct: true,
          why: 'Subtraction is a rough approximation that overstates the real return. Dividing the growth factors is the exact restatement.',
        },
        {
          text: 'Because subtraction is only valid for negative returns',
          why: 'Subtraction is an approximation in either direction. The exact relationship is multiplicative.',
        },
        {
          text: 'Because tax has already been subtracted, so inflation must be divided',
          why: 'Tax and inflation are separate deductions. The reason for division is that both act as multipliers.',
        },
        {
          text: 'Because inflation is always higher than the return',
          why: 'It is not always higher. Division is correct whatever the relative size.',
        },
      ],
    },
    {
      q: 'Two funds have the same pre-tax return, but one is held for three years and the other for ten. What changes?',
      options: [
        {
          text: 'The tax treatment and the amount of compounding before the tax is paid',
          correct: true,
          why: 'A gain taxed on sale compounds untaxed until then. A longer holding period also changes which rate applies in many cases.',
        },
        {
          text: 'Nothing, because the pre-tax return is the same',
          why: 'The pre-tax return is the same; the after-tax return is not. Timing changes both the rate and the compounding.',
        },
        {
          text: 'Only the inflation rate, which is fixed at 6%',
          why: 'Inflation is an assumption, not a fixed constant, and it is not the main difference here. Tax timing is.',
        },
        {
          text: 'The expense ratio, which rises with the holding period',
          why: 'The expense ratio is an annual percentage; it applies every year rather than rising with the period. The tax timing is the difference.',
        },
      ],
    },
  ],
  takeaway:
    'Compare assets on real, after-tax return; divide rather than subtract when removing inflation; and state the fee, tax and inflation assumptions before acting on the comparison.',
}
