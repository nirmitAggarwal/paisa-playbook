import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-134: frequency is a second rate hidden in the headline. */

export const l5_134: Chapter = {
  id: 'l5-134',
  title: 'Compound-Interest Calculator',
  subtitle: 'Model compounding with the right frequency and add regular contributions correctly.',
  minutes: 9,
  blocks: [
    scene(
      'compound-curves',
      'The same 8% compounded yearly and monthly over fifteen years, and the ₹26,950 gap between them.',
    ),
    {
      kind: 'p',
      text: 'Compound interest is the only place in personal finance where time does most of the work. A calculator for it looks simple — principal, rate, years — and is usually used too optimistically, because the number on the screen is the end of a process that assumes nothing interrupts it. Understanding the model means understanding what the frequency, the contributions and the rate each do to the answer.',
    },
    { kind: 'h', text: 'The nominal rate is only half a number' },
    {
      kind: 'p',
      text: 'An 8% rate means different things depending on how often it is applied. Compounded once a year, ₹1,00,000 becomes ₹1,08,000. Compounded monthly, each month adds 8/12 of a percent, and the year ends at ₹1,08,300. That 8.30% is the effective annual rate, and it is the number to compare across products. A bank advertising 8% monthly is offering more than a bank advertising 8% annually, even though both print the same headline.',
    },
    {
      kind: 'table',
      caption: 'A nominal 8% on ₹2,00,000 for 15 years, by frequency',
      headers: ['Frequency', 'Maturity', 'Effective annual rate'],
      rows: [
        ['Yearly', '₹6,34,434', '8.00%'],
        ['Half-yearly', '₹6,48,680', '8.16%'],
        ['Quarterly', '₹6,56,206', '8.24%'],
        ['Monthly', '₹6,61,384', '8.30%'],
        ['Daily', '₹6,63,936', '8.33%'],
      ],
    },
    {
      kind: 'p',
      text: 'The gap between yearly and monthly compounding is ₹26,950 on this sum, and it widens with the rate and the horizon. At low rates over short periods it is trivial; at 15% over thirty years it is the difference between two different products. The rule is not to chase the highest frequency. It is to compare effective rates, and to know that a quoted nominal rate without a frequency is incomplete.',
    },
    { kind: 'h', text: 'Contributions are a different formula' },
    {
      kind: 'p',
      text: 'A lump sum compounds; a series of contributions compounds and is also being added to. The order matters. A monthly contribution made at the start of the month earns that month’s return; one made at the end does not. Over 180 months the difference is small per payment and material in total. Most SIP calculators assume the start of the month, and most people never check which convention the calculator used. If you are rebuilding the number, match the convention before you compare.',
    },
    {
      kind: 'example',
      title: 'Two lakh, three ways',
      text: '₹2,00,000 left alone at 8% for fifteen years becomes ₹6,34,434 compounded yearly and ₹6,61,384 compounded monthly. Add ₹5,000 a month at the same 8% and the answer depends on when each contribution lands and whether the rate is applied monthly. The lump-sum figures are the ones worth memorising, because they show the size of the frequency effect without any contribution convention in the way.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The rule of 72 is a check, not a calculation',
      text: 'Divide 72 by the annual rate to estimate the years it takes to double. At 8% the rule says 9 years; the exact answer is 9.01. At 12% it says 6 years against an exact 6.12; at 4% it says 18 against 17.67. The rule is accurate enough to sanity-check a calculator and too rough to plan with. Use it to notice when a projection implies a doubling that the rate cannot deliver.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Compounding works on the fees too',
      text: 'A 1.5% annual expense ratio is deducted from the fund, so it compounds against you for the whole holding period. On ₹10,00,000 over twenty years at 10%, a 1.5% fee costs several lakh — not 1.5% of the final value. Any compounding model that leaves out costs is modelling a product nobody can buy.',
    },
    sim(
      'l5-compound-model',
      'Change the frequency, the horizon and a monthly addition, and watch the effective rate and the maturity value separate.',
    ),
    l5Illustrative(
      'The rate, principal and maturity figures in the lab are illustrative. The frequency effect, the contribution convention and the rule-of-72 check are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Nominal rate',
          meaning: 'The advertised annual rate before compounding is applied. It is not the rate your money actually earns.',
        },
        {
          term: 'Effective annual rate',
          meaning: 'The rate actually earned in a year once compounding is included. This is the number to compare across products.',
        },
        {
          term: 'Compounding frequency',
          meaning: 'How often interest is added to the balance — yearly, quarterly, monthly or daily.',
        },
        {
          term: 'Annuity',
          meaning: 'A series of equal payments at regular intervals. A SIP is an annuity; so is an EMI, viewed from the lender’s side.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — the deposit and lending directions set out how interest is calculated and disclosed, including the requirement to quote an annualised rate so that frequencies can be compared',
    ]),
  ],
  quiz: [
    {
      q: 'Two deposits both advertise 8%. One compounds yearly and one monthly. Which is worth more?',
      options: [
        {
          text: 'The monthly one, because it earns 8.30% effective against 8.00%',
          correct: true,
          why: 'More frequent compounding means each period’s interest starts earning sooner. The effective annual rate is the comparison.',
        },
        {
          text: 'They are identical, because both advertise 8%',
          why: 'The advertised nominal rate is not the effective rate. Frequency is part of the product.',
        },
        {
          text: 'The yearly one, because it compounds on a larger balance',
          why: 'The balance is the same. The monthly product adds interest more often, so it finishes higher.',
        },
        {
          text: 'It depends only on the tenure, not the frequency',
          why: 'Tenure amplifies the difference but does not create it. At any positive tenure, monthly compounding wins.',
        },
      ],
    },
    {
      q: 'A projection shows ₹2,00,000 becoming ₹6,34,434 in 15 years at 8%. What does the rule of 72 tell you?',
      options: [
        {
          text: 'The money should roughly double every 9 years, so 15 years is a little under two doublings — consistent with the figure',
          correct: true,
          why: 'Two doublings would be about ₹8,00,000; 15 years is 1.67 doublings, which lands near ₹6.3 lakh. The projection passes the sanity check.',
        },
        {
          text: 'The figure is wrong, because 15 years is more than one doubling',
          why: 'More than one doubling is exactly what a 15-year horizon at 8% should produce.',
        },
        {
          text: 'The figure is guaranteed, because the rule of 72 confirms it',
          why: 'The rule confirms arithmetic, not the return. Whether 8% is achievable is a separate question.',
        },
        {
          text: 'The rule of 72 only applies to loans, not investments',
          why: 'It applies to any quantity growing at a compound rate, including a loan balance and a deposit.',
        },
      ],
    },
    {
      q: 'Why do two SIP calculators give different answers for the same monthly amount, rate and tenure?',
      options: [
        {
          text: 'One credits each contribution at the start of the month and the other at the end',
          correct: true,
          why: 'A start-of-month contribution earns one extra month of return each time. Over 180 months that is a visible difference.',
        },
        {
          text: 'One of them must be using simple interest',
          why: 'Simple interest would produce a much larger gap and is not how SIP projections are built.',
        },
        {
          text: 'The monthly amount is being entered in different units',
          why: 'That would also cause a difference, but the question fixes the amount. The convention is the usual culprit.',
        },
        {
          text: 'SIP returns cannot be modelled, so any difference is noise',
          why: 'The return is uncertain; the arithmetic of contributions is not. Given the same assumptions, the answer should match.',
        },
      ],
    },
    {
      q: 'A fund charges a 1.5% annual expense ratio. How does that interact with compounding?',
      options: [
        {
          text: 'The fee is deducted every year, so it compounds against you for the whole holding period',
          correct: true,
          why: 'A yearly drag on the balance reduces the base that future returns grow from. Over decades it costs far more than 1.5% of the final value.',
        },
        {
          text: 'It is a one-time cost of 1.5% at purchase',
          why: 'An expense ratio is annual, not a one-time charge. That is why it matters so much over long horizons.',
        },
        {
          text: 'It only affects the returns you withdraw, not the balance',
          why: 'The fee is taken from the fund’s assets, reducing the NAV and therefore the balance that compounds.',
        },
        {
          text: 'It cancels out because the fund earns a higher return',
          why: 'A higher gross return is possible, but the fee still reduces whatever return the fund does earn. The two are separate effects.',
        },
      ],
    },
  ],
  takeaway:
    'Compare effective annual rates rather than nominal ones, match the contribution convention before comparing calculators, and remember that fees compound against you exactly as returns compound for you.',
}
