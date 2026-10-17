import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-141: the same extra rupees, aimed at two different debts. */

export const l5_141: Chapter = {
  id: 'l5-141',
  title: 'Debt-Repayment Calculator',
  subtitle: 'Compare avalanche and snowball repayment and quantify the interest saved by each.',
  minutes: 9,
  blocks: [
    scene(
      'repayment-paths',
      'The same three debts under avalanche and snowball, finishing 43 and 46 months after the same extra ₹5,000.',
    ),
    {
      kind: 'p',
      text: 'Paying the minimum on several debts is a schedule that keeps everyone happy and clears almost nothing. The minimum is usually set close to the monthly interest, so the balance falls by a small amount each month and the debt outlives the thing it bought. The way out is not a bigger income alone; it is a decision about where the extra money goes. There are two conventional answers, and the calculator can price both.',
    },
    { kind: 'h', text: 'Avalanche and snowball are the same machine with different orders' },
    {
      kind: 'table',
      caption: 'Three debts, one extra ₹5,000 a month',
      headers: ['Method', 'Order of attack', 'Paid off in', 'Interest paid'],
      rows: [
        ['Avalanche', 'Highest rate first', '43 months', '₹1.83 lakh'],
        ['Snowball', 'Smallest balance first', '46 months', '₹2.26 lakh'],
        ['No extra at all', 'Minimums only', '56 months', '₹3.43 lakh'],
      ],
    },
    {
      kind: 'p',
      text: 'Both methods pay every minimum, then throw the surplus at one chosen debt. When that debt clears, its minimum joins the surplus and the next debt is attacked with a larger payment. The difference is the target. Avalanche targets the 36% card because it is the most expensive money; snowball targets the ₹90,000 personal loan because clearing it first produces a visible win sooner. On these numbers avalanche saves about ₹43,000 and three months. On different numbers the gap can be larger or smaller, but the direction is the same: the highest rate is the mathematically correct target.',
    },
    {
      kind: 'p',
      text: 'The reason to consider snowball anyway is behavioural, and it is not irrational. A person who needs a visible early win to keep going will pay more interest and still finish — and finishing is worth more than the optimal order abandoned in month four. The mistake is to believe snowball is cheaper. It is not. It is a deliberate trade of some interest for motivation, and that trade should be made knowingly.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'With no surplus, the order does nothing',
      text: 'If every rupee already goes to the minimums, there is no surplus to aim, and avalanche and snowball produce identical results. This is the most important thing a repayment calculator shows: the method only matters once there is extra money. Before optimising the order, find the surplus — a subscription, a second loan payment, a temporary cut in discretionary spending — because without it both plans are the same plan.',
    },
    { kind: 'h', text: 'What the calculator leaves out' },
    {
      kind: 'list',
      items: [
        'Prepayment penalties and foreclosure charges, where the loan contract allows them.',
        'The credit report. Cleared accounts should be reported as closed; a paid loan that still shows a balance is a live problem.',
        'Consolidation. Rolling three debts into one lower-rate loan can help, but only if the rate is genuinely lower after fees and the paid-off cards are not run up again.',
        'The emergency fund. Sending every spare rupee to debt leaves nothing for a car repair, which then goes on the card and restarts the cycle.',
        'New borrowing during the payoff. A repayment plan and a new EMI are not compatible unless the plan was built for both.',
      ],
    },
    {
      kind: 'example',
      title: 'The same ₹5,000, two sizes of difference',
      text: 'With no extra, the three debts take 56 months and ₹3.43 lakh of interest under either method. With ₹5,000 extra, avalanche clears them in 43 months for ₹1.83 lakh and snowball in 46 months for ₹2.26 lakh. With ₹10,000 extra, avalanche takes 33 months for ₹1.35 lakh and snowball 36 months for ₹1.67 lakh. The extra money does most of the work; the ordering does the rest. That ordering is the only decision the calculator is really pricing.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Check the rate, not just the EMI',
      text: 'A credit card that charges 36% a year is charging 3% a month on the outstanding balance, and the minimum due is often set at about that level. A personal loan at 14% and a car loan at 9% are cheaper by a wide margin. Before choosing a method, confirm the annualised rate on each account from the statement, because the EMI alone hides the difference. The most expensive debt is the one to attack, whichever method you choose.',
    },
    sim(
      'l5-debt-payoff-model',
      'Choose an extra payment, then compare the avalanche and snowball schedules month by month and in rupees of interest.',
    ),
    l5Illustrative(
      'The debts, rates and payoff figures in the lab are invented. The two methods, the surplus point and the interest arithmetic are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Avalanche method',
          meaning: 'Paying minimums everywhere and directing the surplus to the debt with the highest interest rate.',
        },
        {
          term: 'Snowball method',
          meaning: 'Paying minimums everywhere and directing the surplus to the debt with the smallest balance, for an earlier visible win.',
        },
        {
          term: 'Minimum due',
          meaning: 'The smallest payment the lender will accept, often set close to the monthly interest so the balance falls slowly.',
        },
        {
          term: 'Consolidation',
          meaning: 'Replacing several debts with one loan, usually at a lower rate and a single payment, if the terms genuinely improve.',
        },
      ],
    },
    l5Sources(['rbi', 'cibil'], [
      'Reserve Bank of India — the fair-practice and credit-information directions set out how lenders must report repayments and closures to credit bureaus',
      'TransUnion CIBIL — the credit report is where a cleared loan should appear as closed; a paid account still showing a balance is worth disputing',
    ]),
  ],
  quiz: [
    {
      q: 'You have ₹5,000 spare a month and three debts. Which method costs the least interest?',
      options: [
        {
          text: 'Avalanche — direct the surplus to the highest-rate debt first',
          correct: true,
          why: 'Interest is charged on balances, so removing the most expensive balance first saves the most. The order is the only difference between the methods.',
        },
        {
          text: 'Snowball — clear the smallest balance first',
          why: 'Snowball produces an earlier win but leaves the expensive balance running longer, so it costs more in interest.',
        },
        {
          text: 'Split the surplus equally across all three',
          why: 'Spreading the surplus leaves the most expensive debt outstanding for longer. It feels fair and costs more.',
        },
        {
          text: 'It makes no difference, because the total balance is the same',
          why: 'The total balance is the same, but the rates are not. Where the money goes determines how much interest accrues.',
        },
      ],
    },
    {
      q: 'Why do avalanche and snowball produce identical results when there is no surplus?',
      options: [
        {
          text: 'Because both methods are just the minimums; there is no extra money to direct anywhere',
          correct: true,
          why: 'The methods differ only in how the surplus is allocated. With no surplus, the allocation step does nothing.',
        },
        {
          text: 'Because the calculator ignores the order when balances are small',
          why: 'The order is applied; it simply has no money to apply. The result is a property of the cash flow, not the model.',
        },
        {
          text: 'Because the highest rate and the smallest balance are always the same debt',
          why: 'They are not always the same, and the result is still identical without a surplus. The reason is the missing surplus.',
        },
        {
          text: 'Because minimum payments already include the extra amount',
          why: 'Minimums are set by the lender and do not include anything extra. The surplus is separate.',
        },
      ],
    },
    {
      q: 'When is choosing snowball over avalanche a rational decision?',
      options: [
        {
          text: 'When the earlier visible win is what keeps you paying, and you accept the extra interest as the cost of finishing',
          correct: true,
          why: 'Finishing matters more than the optimal order abandoned. The trade should be deliberate, not a claim that snowball is cheaper.',
        },
        {
          text: 'When snowball saves more interest, which it usually does',
          why: 'Snowball usually costs more interest. It can still be the right choice for behavioural reasons, but not on cost.',
        },
        {
          text: 'When the smallest balance also has the highest rate',
          why: 'In that case the two methods agree, so there is no trade to make.',
        },
        {
          text: 'When you have no surplus to allocate',
          why: 'With no surplus, the choice is irrelevant. The methods only diverge once there is extra money.',
        },
      ],
    },
    {
      q: 'What should you check before celebrating a cleared loan?',
      options: [
        {
          text: 'That the account is reported as closed on your credit report and the lender has issued a closure statement',
          correct: true,
          why: 'A paid loan that still shows a balance affects future borrowing. The closure has to be recorded, not just felt.',
        },
        {
          text: 'That the EMI has been reduced to zero on the next statement only',
          why: 'One statement is not enough. The account and the credit report both need to reflect the closure.',
        },
        {
          text: 'That you can immediately borrow the same amount again',
          why: 'Borrowing again is optional. Confirming the closure is the step that protects you.',
        },
        {
          text: 'That the interest rate on the loan has fallen',
          why: 'A closed loan has no rate. The remaining task is the paperwork and the credit record.',
        },
      ],
    },
  ],
  takeaway:
    'Find the surplus first, aim it at the highest rate unless a visible win is what keeps you going, and confirm the closure on the credit report once the last payment lands.',
}
