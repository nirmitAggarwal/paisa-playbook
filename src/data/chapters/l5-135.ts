import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-135: the EMI is fixed, what it buys is not. */

export const l5_135: Chapter = {
  id: 'l5-135',
  title: 'EMI Calculator',
  subtitle: 'Rebuild an EMI calculation and decompose each payment into interest and principal.',
  minutes: 10,
  blocks: [
    scene(
      'amortisation-stack',
      'The same EMI split into interest and principal in years 1, 5, 10, 15 and 20.',
    ),
    {
      kind: 'p',
      text: 'An EMI is a flat payment that hides a changing composition. The bank charges interest on the outstanding balance, and the rest of the payment reduces that balance. At the start the balance is large, so most of the EMI is interest. At the end it is small, so most of it is principal. The payment never moves; the job it does changes every month. That is the whole of amortisation, and it explains why prepaying early is worth more than prepaying late.',
    },
    { kind: 'h', text: 'The formula, and why it is not intuitive' },
    {
      kind: 'formula',
      label: 'EMI',
      expr: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
      note: 'P is the amount borrowed, r is the monthly rate (annual ÷ 12 ÷ 100), and n is the number of monthly payments.',
    },
    {
      kind: 'p',
      text: 'The formula solves for the payment that drives the balance to exactly zero after n months. It is not the principal divided by n plus interest on the original amount — that is a flat-rate loan, and it costs much more. The difference matters: a “flat rate” of 8% on a five-year loan is roughly a 14.5% reducing-balance rate, because you are charged interest on the full principal for the whole tenure even as you repay it.',
    },
    {
      kind: 'table',
      caption: '₹25,00,000 at 8.6% for 20 years, by year',
      headers: ['Year', 'Share of EMI that is interest', 'What it means'],
      rows: [
        ['1', '81%', 'The balance has barely moved'],
        ['5', '74%', 'Five years of payments, a fifth of the way'],
        ['10', '59%', 'Principal finally outpaces interest'],
        ['15', '38%', 'The loan is now cheap to carry'],
        ['20', '5%', 'The last payments are almost all principal'],
      ],
    },
    {
      kind: 'p',
      text: 'On this loan the EMI is ₹21,854 and the total interest is about ₹27.4 lakh — more than the amount borrowed. That is not a trick; it is what a twenty-year loan at 8.6% costs. The number to hold next to it is the total outflow: ₹52.4 lakh, of which ₹25 lakh is principal. A shorter tenure raises the EMI and cuts the interest sharply, which is why the tenure field is the most consequential one on any home-loan calculator.',
    },
    { kind: 'h', text: 'Prepayment is a bet on the rate' },
    {
      kind: 'p',
      text: 'Every extra rupee paid early removes interest from every future month, so it earns the loan rate with certainty. On the same ₹25 lakh loan, ₹5,000 extra a month clears it in 155 months instead of 240 and cuts interest from ₹27.4 lakh to ₹16.4 lakh — a saving of about ₹11.1 lakh on ₹7.75 lakh of extra payments. That is a guaranteed return at 8.6%, which is a high bar for a debt fund to beat after tax. The trade-off is liquidity: money put into the loan cannot be taken back out cheaply.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The EMI is not the cost of the loan',
      text: 'Processing fees, insurance bundled with the loan, documentation charges and a prepayment penalty where it applies are all real costs that the EMI does not include. A loan with a lower EMI and a 2% fee can be more expensive than one with a slightly higher EMI and no fee. Compare the total outflow, including fees, and check whether the rate is fixed or floating before comparing two offers at all.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Rebuild the EMI once by hand or in a spreadsheet, so you know which inputs are doing the work.',
        'Compare loans on the annualised reducing-balance rate, not on the EMI. A longer tenure always lowers the EMI and raises the cost.',
        'Ask what the total interest will be, in rupees, before you sign. It is the number the EMI hides.',
        'Check whether prepayment is allowed without penalty, and how the lender applies an extra payment — to principal, or to future EMIs.',
        'Keep an emergency fund before you start prepaying. A loan with no buffer turns a job loss into a default.',
      ],
    },
    sim(
      'l5-emi-model',
      'Move the loan, the rate and the tenure, then add ₹5,000 a month and see the months and the interest fall.',
    ),
    l5Illustrative(
      'The loan, rate and amortisation figures in the lab are invented for the lesson. The formula, the interest-first structure and the prepayment arithmetic are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Amortisation',
          meaning: 'The schedule that splits each payment into interest on the outstanding balance and repayment of principal.',
        },
        {
          term: 'Reducing balance',
          meaning: 'Interest charged on what is still owed, which is how most retail loans work and why the effective rate is lower than a flat rate.',
        },
        {
          term: 'Flat rate',
          meaning: 'Interest charged on the full principal for the whole tenure. It looks lower than the reducing-balance rate and usually is not.',
        },
        {
          term: 'Prepayment',
          meaning: 'An extra payment towards principal, which shortens the loan and removes future interest.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — the fair-practice code and the master directions on loans set out what a lender must disclose about the rate, the fees and prepayment terms before you sign',
    ]),
  ],
  quiz: [
    {
      q: 'In year one of a 20-year loan, 81% of each EMI is interest. Why?',
      options: [
        {
          text: 'Interest is charged on the outstanding balance, which is still close to the full amount borrowed',
          correct: true,
          why: 'The balance falls slowly at first, so the interest charge stays large and only a small part of each payment reduces principal.',
        },
        {
          text: 'The bank charges a higher rate in the early years',
          why: 'The rate is constant. The balance is what makes early interest large.',
        },
        {
          text: 'The EMI is smaller in the early years',
          why: 'The EMI is the same every month. Its composition changes, not its size.',
        },
        {
          text: 'Processing fees are recovered from the first year’s payments',
          why: 'Fees are charged separately. The 81% is the interest on a large outstanding balance.',
        },
      ],
    },
    {
      q: 'A lender offers an 8% flat rate on a five-year loan. What is the catch?',
      options: [
        {
          text: 'Interest is charged on the full principal for the whole tenure, so the effective reducing-balance rate is much higher',
          correct: true,
          why: 'You repay principal every month but are charged interest as if you had not. On a five-year loan the effective rate is roughly 14.5%.',
        },
        {
          text: 'The rate is fixed, so it cannot change',
          why: 'A flat rate can be fixed or floating. The issue is the base the interest is charged on, not whether it moves.',
        },
        {
          text: 'The tenure is shorter than it appears',
          why: 'The tenure is what it says. The cost is higher because of how interest is calculated, not because the loan ends sooner.',
        },
        {
          text: 'There is no catch, because 8% is lower than 8.6%',
          why: 'The two numbers are not comparable. A flat 8% is substantially more expensive than a reducing-balance 8%.',
        },
      ],
    },
    {
      q: 'You have ₹5,000 spare each month on a 20-year loan at 8.6%. Why does prepaying beat investing in a debt fund?',
      options: [
        {
          text: 'The prepayment earns the loan rate with certainty and without tax, while the fund’s return is uncertain and taxed',
          correct: true,
          why: 'Removing interest at 8.6% is a guaranteed saving. A debt fund must beat that after tax and after its own costs, with risk.',
        },
        {
          text: 'Because prepayment always has a higher expected return than any investment',
          why: 'Equity can beat the loan rate over long periods. The point is certainty and tax, not a universal ranking.',
        },
        {
          text: 'Because the bank pays you interest on prepayments',
          why: 'The bank charges no interest on the amount you repay early. The saving is the interest you no longer pay.',
        },
        {
          text: 'Because a longer tenure always costs less',
          why: 'A longer tenure lowers the EMI and raises total interest. That is the opposite of the reason to prepay.',
        },
      ],
    },
    {
      q: 'Which comparison between two loan offers is the fair one?',
      options: [
        {
          text: 'Total outflow including fees, at the annualised reducing-balance rate, over the same tenure',
          correct: true,
          why: 'The EMI alone hides tenure, fees and the interest method. Total outflow on a common basis is the number that can be compared.',
        },
        {
          text: 'The one with the lower EMI, because it is easier to pay',
          why: 'A lower EMI can come from a longer tenure, which costs more in total. Affordability and cost are separate questions.',
        },
        {
          text: 'The one with the lower headline rate, regardless of fees',
          why: 'Fees can outweigh a small rate difference. The annualised cost including fees is the comparison.',
        },
        {
          text: 'The one the bank’s calculator recommends',
          why: 'A lender’s calculator is a tool for its own products. It is not a comparison across lenders.',
        },
      ],
    },
  ],
  takeaway:
    'Rebuild the EMI once, read the total interest rather than the monthly figure, compare loans on total outflow at an annualised reducing-balance rate, and prepay early only after the emergency fund is funded.',
}
