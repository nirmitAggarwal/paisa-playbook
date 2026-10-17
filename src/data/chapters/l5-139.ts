import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-139: one straight rate that fits two endpoints and ignores the path. */

export const l5_139: Chapter = {
  id: 'l5-139',
  title: 'CAGR Calculator',
  subtitle: 'Compute and interpret a compound growth rate, and know when CAGR misleads.',
  minutes: 9,
  blocks: [
    scene(
      'cagr-smoothing',
      'A jagged eight-year path and the single straight line that joins its endpoints at 12.14% a year.',
    ),
    {
      kind: 'p',
      text: 'CAGR — compound annual growth rate — is the constant yearly rate that would take a starting value to an ending value over a given number of years. It is the most useful single number for comparing investments of different sizes and durations, and the most misused, because it describes only two points. Everything that happened between them is invisible in the answer, including the years the investment lost a third of its value.',
    },
    { kind: 'h', text: 'The formula and the two things it needs' },
    {
      kind: 'formula',
      label: 'CAGR',
      expr: 'CAGR = (End / Start)^(1 / years) − 1',
      note: 'It needs an end value, a start value and the time between them. Anything else — contributions, withdrawals, dividends — has to be handled separately.',
    },
    {
      kind: 'p',
      text: 'An investment that goes from ₹1,00,000 to ₹2,50,000 has returned 150% in absolute terms, whatever the period. That absolute number is true and almost useless for comparison. Over four years the CAGR is 25.74%; over eight years it is 12.14%; over twelve years it is 7.93%; over sixteen years it is 5.89%. The gain is identical in every case. Only the time changed, and the annual rate moved by a factor of four.',
    },
    {
      kind: 'table',
      caption: 'The same ₹1,50,000 gain, four holding periods',
      headers: ['Held for', 'Absolute return', 'CAGR'],
      rows: [
        ['4 years', '150%', '25.74%'],
        ['8 years', '150%', '12.14%'],
        ['12 years', '150%', '7.93%'],
        ['16 years', '150%', '5.89%'],
      ],
    },
    { kind: 'h', text: 'Where CAGR stops being the right tool' },
    {
      kind: 'list',
      items: [
        'Contributions and withdrawals. A SIP has no single start value, so a CAGR calculated from the first and last balance is meaningless. Use XIRR, which solves for the rate that makes the dated cash flows net to zero.',
        'Uneven paths. Two funds can have the same ten-year CAGR with very different volatility. The one that fell 45% in year three is a different experience, and a different risk.',
        'Volatility drag. A 10% gain followed by a 10% loss leaves you 1% down, not flat, because the loss is charged on the larger balance. CAGR captures the net; the arithmetic average of the yearly returns overstates it.',
        'Currency. A fund returning 12% in dollars and 9% in rupees has two CAGRs. State the currency.',
        'Short periods. A six-month CAGR annualises noise. A 40% six-month gain is not a 96% annual rate in any useful sense.',
      ],
    },
    {
      kind: 'example',
      title: 'Two funds, one CAGR, different rides',
      text: 'Fund A returns 12%, 12%, 12%, 12% and 12%. Fund B returns 40%, −20%, 35%, −10% and 6%. Both average around 10–12% a year, and their five-year CAGRs can end up close. Fund B’s investor had to sit through a 20% fall and a 10% fall, and may have sold. The CAGR is the same kind of number; the experience is not. When comparing, put the CAGR next to the worst year and the maximum fall.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'CAGR is not a forecast',
      text: 'A fund that returned 18% CAGR for ten years has not promised 18% for the next ten. Past CAGR is a description of a path that has already happened, under conditions that will not repeat. It is evidence about the fund’s strategy and costs, not a rate of return you can project. Any calculator that asks for a CAGR and calls the output a maturity value is confusing history with a promise.',
    },
    sim(
      'l5-cagr-model',
      'Hold the endpoints fixed, change only the holding period, and watch the annual rate move while the absolute gain stays the same.',
    ),
    l5Illustrative(
      'The values in the lab are invented. The endpoint dependence, the XIRR distinction and the volatility-drag point are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'CAGR',
          meaning: 'The constant annual rate that takes a start value to an end value over a given number of years.',
        },
        {
          term: 'Absolute return',
          meaning: 'The total percentage gain or loss, without any adjustment for how long it took.',
        },
        {
          term: 'XIRR',
          meaning: 'A money-weighted annual rate that accounts for the size and date of every cash flow, used for SIPs and portfolios with additions or withdrawals.',
        },
        {
          term: 'Volatility drag',
          meaning: 'The gap between the arithmetic average of yearly returns and the compound rate actually achieved, caused by losses being charged on a reduced balance.',
        },
      ],
    },
    l5Sources(['sebi', 'amfi'], [
      'Securities and Exchange Board of India — the mutual fund regulations require standardised return disclosures, including the period over which a return is calculated',
      'Association of Mutual Funds in India — publishes return conventions and the distinction between point-to-point returns and those for schemes with cash flows',
    ]),
  ],
  quiz: [
    {
      q: 'An investment grows from ₹1,00,000 to ₹2,50,000 in 8 years. What is the CAGR?',
      options: [
        {
          text: '12.14% a year',
          correct: true,
          why: 'The eighth root of 2.5 is about 1.1214, so the compound annual rate is 12.14%.',
        },
        {
          text: '18.75% a year, because the gain is 150% divided by 8',
          why: 'That divides a total return by time, which ignores compounding. The annual rate is lower because each year’s gain compounds.',
        },
        {
          text: '150% a year',
          why: '150% is the absolute return over the whole period, not a rate per year.',
        },
        {
          text: '9.05% a year, because the gain is split evenly',
          why: 'Splitting the gain evenly is simple interest. CAGR solves for the rate that compounds to the end value.',
        },
      ],
    },
    {
      q: 'Why can a CAGR calculated from the first and last balance of a SIP be misleading?',
      options: [
        {
          text: 'Because money was added along the way, so the growth came from contributions as well as return',
          correct: true,
          why: 'CAGR assumes a single starting amount. A SIP needs a money-weighted rate such as XIRR to account for when each contribution arrived.',
        },
        {
          text: 'Because SIPs do not have a start or end value',
          why: 'They have both. The problem is the contributions in between, which a two-point calculation cannot see.',
        },
        {
          text: 'Because CAGR cannot be calculated for periods longer than five years',
          why: 'It can be calculated for any positive period. The obstacle is the cash flows, not the length.',
        },
        {
          text: 'Because mutual fund returns are always negative',
          why: 'They are not. The issue is the method, not the sign of the return.',
        },
      ],
    },
    {
      q: 'Fund A and Fund B have the same ten-year CAGR. What else should you compare?',
      options: [
        {
          text: 'The worst year and the maximum fall, because the path determines whether an investor could stay invested',
          correct: true,
          why: 'Two funds can compound to the same endpoint with very different volatility. The one with the deeper falls is harder to hold.',
        },
        {
          text: 'Nothing — the CAGR already captures everything that matters',
          why: 'CAGR captures the endpoints. It says nothing about the volatility along the way.',
        },
        {
          text: 'Only the expense ratio, because returns are otherwise identical',
          why: 'Costs matter, but so does volatility. The same CAGR with different paths is a different product.',
        },
        {
          text: 'The number of investors in each fund',
          why: 'Popularity is not a risk measure and does not describe the path either.',
        },
      ],
    },
    {
      q: 'A fund gained 10% one year and lost 10% the next. What is the two-year result?',
      options: [
        {
          text: 'About −1%, because the loss is charged on the larger balance',
          correct: true,
          why: '₹100 becomes ₹110, then ₹99. The arithmetic average is zero; the compound result is negative. That gap is volatility drag.',
        },
        {
          text: 'Exactly 0%, because the gain and loss cancel',
          why: 'They cancel only on the same base. In compounding, the second percentage applies to a different amount.',
        },
        {
          text: 'About +1%, because the gain came first',
          why: 'Coming first does not help; it makes the base for the loss larger. The net is −1%.',
        },
        {
          text: 'It depends on the inflation rate',
          why: 'Inflation changes the real value, not the nominal arithmetic of the two returns.',
        },
      ],
    },
  ],
  takeaway:
    'Use CAGR to compare two endpoints over time, state the period and the currency, and switch to XIRR whenever money was added or withdrawn along the way.',
}
