import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-133: a calculator is four assumptions wearing one number. */

export const l5_133: Chapter = {
  id: 'l5-133',
  title: 'Financial Calculators',
  subtitle: 'Use a calculator as a check on a decision, and know exactly which assumption drives the answer.',
  minutes: 9,
  blocks: [
    scene(
      'calculator-inputs',
      'Four fields, one EMI, and the same fields read with a monthly rate instead of an annual one.',
    ),
    {
      kind: 'p',
      text: 'A financial calculator does not know anything about your life. It takes a handful of numbers, applies one formula and returns a figure with more digits than it deserves. That is useful — arithmetic is where people make avoidable mistakes — but it also means the output is only as honest as the four or five inputs nobody re-reads. The calculator is not the decision. It is a check on whether the decision adds up.',
    },
    { kind: 'h', text: 'Every calculator is the same calculator' },
    {
      kind: 'p',
      text: 'Almost every retail finance calculator is one of four models in disguise: a loan, a lump sum, a series of payments, or a restatement of an amount through time. The EMI calculator, the home-loan calculator and the car-loan calculator are the same formula with different defaults. The SIP calculator and the retirement calculator are the same annuity with different labels. Once you can name the model, you can rebuild the answer on a spreadsheet and stop trusting a website you cannot inspect.',
    },
    {
      kind: 'table',
      caption: 'The input that changes most often, and what it actually changes',
      headers: ['Input', 'What people type', 'What the formula needs'],
      rows: [
        ['Rate', '8.5', '8.5% a year, converted to a monthly rate of 0.708%'],
        ['Tenure', '20', '240 monthly payments, not 20'],
        ['Principal', 'the loan amount', 'the amount disbursed, plus any fee that was financed'],
        ['Frequency', 'monthly, by default', 'the same frequency as the rate and the payment'],
        ['Start date', 'today', 'the date the first payment is due, which changes the first interest charge'],
      ],
    },
    {
      kind: 'p',
      text: 'The rate and the tenure are where nearly every error lives, because both are unitless numbers on the screen. “8.5” can mean a year or a month. “20” can mean years or months. A calculator will happily multiply either reading into a precise-looking answer. When a quote and your rebuild disagree, check the units before you check the arithmetic.',
    },
    { kind: 'h', text: 'What a calculator cannot tell you' },
    {
      kind: 'list',
      items: [
        'Whether the payment is affordable. Affordability is a cash-flow question, and the calculator never sees your other obligations.',
        'Whether the rate will stay fixed. A floating-rate loan has one rate today and a distribution of rates over twenty years.',
        'What the fee does to the effective cost. A processing fee outside the EMI is real money that the EMI figure omits.',
        'Whether the assumption is reasonable. A retirement calculator will project a 12% return for forty years without asking whether you can tolerate the years it falls 30%.',
        'What happens if you prepay, miss a payment or change jobs. The standard output describes one path through one set of assumptions.',
      ],
    },
    {
      kind: 'example',
      title: 'One quote, three readings',
      text: 'A quote offers ₹8,678 a month for ₹10,00,000 at 8.5% over 20 years. Read as written, the formula returns ₹8,678 — the quote is internally consistent. Read the rate as monthly, it returns ₹85,000, ten times too high. Read the tenure as 20 months, it returns ₹53,802, because the same principal is being repaid in under two years. Read the fee as financed, with 0.5% added to the loan, it returns ₹8,722. Only the first reading matches, and only the first reading is the loan on offer.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A precise answer to an imprecise question',
      text: 'Calculators print two decimal places because the formula produces them, not because the input deserves them. An 8.5% assumption is not accurate to 0.01%, and a twenty-year tenure is not accurate to the month. Before you act on a figure, round it to the precision of the weakest input: a retirement corpus is a range of crores, not ₹9,17,12,957. The extra digits create confidence the model has not earned.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Read the assumptions page, not just the result',
      text: 'Indian bank and AMC calculators usually publish their defaults: the rate, the compounding frequency, whether the rate is fixed, and whether fees are included. Those defaults are the model. A home-loan calculator that assumes a fixed 8.5% for twenty years is describing a product most borrowers do not have. Use the calculator to check the arithmetic of a specific quote, and read the quote for the terms.',
    },
    sim(
      'l5-calculator-sanity',
      'Rebuild a quoted EMI field by field, then change one unit at a time and watch which entry breaks the answer.',
    ),
    l5Illustrative(
      'The quote and the loan in the lab are invented. The four inputs, the unit errors and the precision rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Nominal rate',
          meaning: 'The rate printed on the product, before compounding frequency is taken into account. It is the number a calculator asks for.',
        },
        {
          term: 'Effective annual rate',
          meaning: 'What the nominal rate actually delivers after compounding. A nominal 8% compounded monthly is 8.30% effective.',
        },
        {
          term: 'Amortisation',
          meaning: 'The schedule that splits each payment into interest on the outstanding balance and repayment of principal.',
        },
        {
          term: 'Sensitivity',
          meaning: 'How much the output moves when one input moves. It tells you which assumption deserves the most scrutiny.',
        },
      ],
    },
    l5Sources(['rbi', 'incometax'], [
      'Reserve Bank of India — the master directions on loans and advances define what a lender must disclose, including the annualised rate, so a quote can be checked against a rule rather than a calculator',
      'Income Tax Department — interest and deduction rules change the effective cost of a loan, and the current-year page is the only version worth using',
    ]),
  ],
  quiz: [
    {
      q: 'A calculator returns ₹8,678 for ₹10,00,000 at 8.5% over 20 years. You enter the rate as 8.5% a month and get ₹85,000. What went wrong?',
      options: [
        {
          text: 'The rate is annual, so it has to be divided by twelve before it is applied to a monthly payment',
          correct: true,
          why: 'A monthly payment needs a monthly rate. Entering the annual number as a monthly rate makes the loan ten times more expensive per month.',
        },
        {
          text: 'The calculator is broken; the EMI cannot exceed the principal',
          why: 'An EMI can exceed the principal when the rate is high enough. Here it is the unit error, not the formula.',
        },
        {
          text: 'The tenure should have been 240 months, which would fix the rate error too',
          why: 'The tenure is already 240 months in this comparison. Changing it does not correct a rate entered per month.',
        },
        {
          text: 'The principal should have been entered in lakhs',
          why: 'The unit of the principal changes the scale but not the tenfold gap. The rate unit is the error.',
        },
      ],
    },
    {
      q: 'Which input is most likely to make two calculators disagree about the same loan?',
      options: [
        {
          text: 'Whether fees are financed into the principal and which rate the calculator treats as annual',
          correct: true,
          why: 'The formula is standard. The disagreement comes from what was included in the principal and how the rate unit was interpreted.',
        },
        {
          text: 'The number of decimal places in the output',
          why: 'Rounding changes the last rupee, not the monthly figure. A disagreement of hundreds is an input difference.',
        },
        {
          text: 'The colour scheme of the calculator',
          why: 'Presentation does not enter the formula. The inputs do.',
        },
        {
          text: 'The date the calculator was built',
          why: 'The formula has not changed. What changes is the rate and the rules, which are inputs you supply.',
        },
      ],
    },
    {
      q: 'A retirement calculator projects a corpus of ₹9.17 crore. How should you use that number?',
      options: [
        {
          text: 'As one outcome under one set of assumptions, to be tested by changing the return and inflation inputs',
          correct: true,
          why: 'The figure is a conditional answer. Its value is in the sensitivity: how far it moves when the assumptions move.',
        },
        {
          text: 'As the amount to save, because calculators are conservative',
          why: 'Nothing in a calculator is inherently conservative. It is exactly as optimistic as the return you typed in.',
        },
        {
          text: 'As proof that the plan will work if you invest exactly that much',
          why: 'The projection assumes a constant return for decades. Markets do not deliver a constant return, and the order of returns matters.',
        },
        {
          text: 'As irrelevant, because retirement cannot be predicted',
          why: 'It cannot be predicted precisely, which is why the model is run with ranges. That is different from being useless.',
        },
      ],
    },
    {
      q: 'The EMI is affordable on today’s salary. What has the calculator not checked?',
      options: [
        {
          text: 'Whether the payment stays affordable through a job change, a rate reset or a rise in other obligations',
          correct: true,
          why: 'Affordability is a cash-flow question over time. The calculator tests one payment against one rate.',
        },
        {
          text: 'Whether the arithmetic is correct',
          why: 'The arithmetic is the one thing the calculator does check. The question is about everything outside the formula.',
        },
        {
          text: 'Whether the loan will be approved',
          why: 'Approval depends on credit assessment. It is a separate question from affordability, and the calculator answers neither.',
        },
        {
          text: 'Whether the tenure is in months',
          why: 'That is an input unit, and the calculator has already used it to produce the EMI.',
        },
      ],
    },
  ],
  takeaway:
    'Name the model, check the units of the rate and the tenure, include the fees, and treat the output as one conditional answer to be stress-tested rather than a number to act on.',
}
