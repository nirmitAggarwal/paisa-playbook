import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-140: net worth is a valuation rule applied to a list. */

export const l5_140: Chapter = {
  id: 'l5-140',
  title: 'Net-Worth Calculator',
  subtitle: 'Build a net-worth statement with conservative valuations and a repeatable monthly update.',
  minutes: 9,
  blocks: [
    scene(
      'networth-waterline',
      'Assets above the waterline, liabilities below it, and the net figure that depends on the valuations chosen.',
    ),
    {
      kind: 'p',
      text: 'Net worth is what you own minus what you owe. The subtraction is trivial; the two lists are not. What counts as an asset, what value to put on it, and which liabilities people forget are the decisions that make the number useful or decorative. A net-worth statement is worth keeping only if the same rules are applied every month, because the number on its own says little and the trend says a great deal.',
    },
    { kind: 'h', text: 'Two lists, and the rules for each' },
    {
      kind: 'table',
      caption: 'A household balance sheet, in ₹ lakh',
      headers: ['Assets', 'Value', 'Liabilities', 'Value'],
      rows: [
        ['Cash and deposits', '1.2', 'Home loan', '38.0'],
        ['Equity funds', '8.5', 'Car loan', '2.1'],
        ['EPF balance', '6.4', '', ''],
        ['Flat', '65.0', '', ''],
        ['Total', '81.1', 'Total', '40.1'],
      ],
    },
    {
      kind: 'p',
      text: 'The rules that make this list honest: use the balance in the account, not the amount you put in; use the current value of the flat, not the price you paid; include every loan, including the one with a balance you have not checked since last year; and do not include the car at its purchase price if you are also counting the loan against it. The most common error is not a wrong number. It is a missing liability — a credit card balance, a personal loan from a friend, a tax due — that makes the total look better than it is.',
    },
    { kind: 'h', text: 'Valuation is a choice, so make it explicitly' },
    {
      kind: 'p',
      text: 'The flat in the table is worth ₹65 lakh at a price a buyer might pay next month, ₹58.5 lakh after a 10% haircut, and ₹48.75 lakh if it had to be sold in a bad quarter. None of those is a lie. The same list produces a net worth of ₹41.0 lakh, ₹33.2 lakh or ₹21.8 lakh depending on the rule. A single number without the rule is not a fact about your finances; it is a fact about your optimism.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A high net worth can be a liquidity trap',
      text: 'Eighty percent of the assets in that table are one flat in one city. It is a real asset and a real concentration. If the household needed ₹10 lakh in a month, the net-worth figure would not help; the cash and funds would. Keep a liquidity line beside the net-worth line: how many months of essential spending could be funded without selling the flat or borrowing? That number, not the net worth, determines whether a shock is survivable.',
    },
    {
      kind: 'p',
      text: 'Net worth also omits things that matter. Human capital — the present value of your future earnings — is usually the largest asset a young household has and the one a balance sheet cannot hold. A pension that has not started, an insurance cover that pays on an event, and a contingent liability such as a guarantee for a relative’s loan are all outside the two lists. State what is excluded, so the number is not asked to answer questions it cannot.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Update on the same date each month, from statements, not from memory.',
        'Value listed assets at the month-end price, property at a documented estimate, and cash at the balance.',
        'List every liability with its outstanding principal, not its original amount.',
        'Record the trend for at least six months before drawing conclusions. One month is noise; a direction is information.',
        'Check the composition, not only the total. A rising net worth concentrated in one illiquid asset is a different position from the same total spread across assets.',
      ],
    },
    sim(
      'l5-networth-model',
      'Apply market, conservative and distress valuations to the same balance sheet, then exclude the flat and see what is left.',
    ),
    l5Illustrative(
      'The household balance sheet in the lab is invented. The valuation rules, the liquidity line and the completeness check are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Net worth',
          meaning: 'The total value of assets minus the total of liabilities, at a stated date and under a stated valuation rule.',
        },
        {
          term: 'Liquid asset',
          meaning: 'An asset that can be converted to cash quickly without a significant loss, such as a deposit or a listed fund.',
        },
        {
          term: 'Contingent liability',
          meaning: 'An obligation that may arise if an event happens, such as a guarantee for someone else’s loan.',
        },
        {
          term: 'Human capital',
          meaning: 'The present value of future earnings, which is not on a balance sheet but is usually a young household’s largest asset.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — the household financial savings data and the deposit insurance rules show what is liquid, what is protected and what a balance sheet can rely on',
    ]),
  ],
  quiz: [
    {
      q: 'Why does the same household have a net worth of ₹41.0 lakh or ₹21.8 lakh depending on the run?',
      options: [
        {
          text: 'The valuation rule changed: property and equity were marked down to what a forced sale might realise',
          correct: true,
          why: 'Net worth is assets minus liabilities under a stated rule. Different rules produce different, equally honest, numbers.',
        },
        {
          text: 'The liabilities were counted twice in one version',
          why: 'The liabilities are the same in both. The difference comes from the asset valuations.',
        },
        {
          text: 'One version includes future salary',
          why: 'Human capital is excluded from both. The difference is the haircut applied to property and equity.',
        },
        {
          text: 'Net worth cannot be calculated for a household with a home loan',
          why: 'It can. The loan is a liability subtracted from the assets, including the home.',
        },
      ],
    },
    {
      q: 'What is the most common error in a personal net-worth statement?',
      options: [
        {
          text: 'Leaving out a liability, which overstates the total',
          correct: true,
          why: 'A forgotten card balance or informal loan is easy to omit and makes the number look better than the position.',
        },
        {
          text: 'Including cash, which is not really an asset',
          why: 'Cash is an asset. It is the most liquid one on the list.',
        },
        {
          text: 'Valuing equity at the market price',
          why: 'That is the correct treatment for a listed asset. The error is omission, not mark-to-market.',
        },
        {
          text: 'Updating too often',
          why: 'Monthly is a sensible cadence. Frequent updates are not the usual error; stale or incomplete lists are.',
        },
      ],
    },
    {
      q: 'A household has ₹41 lakh of net worth and ₹16 lakh of liquid assets. What does the second number add?',
      options: [
        {
          text: 'How much of the net worth could fund a shock without selling the flat',
          correct: true,
          why: 'Net worth says what the household is worth; liquidity says what it can actually use in the short term. Both are needed.',
        },
        {
          text: 'The amount the household could borrow',
          why: 'Borrowing capacity depends on income and credit, not on the liquid balance. The liquid figure is about what is already available.',
        },
        {
          text: 'The tax the household would pay if it sold everything',
          why: 'Tax depends on gains and holding periods. The liquid figure is a pre-tax measure of availability.',
        },
        {
          text: 'Nothing, because net worth already includes those assets',
          why: 'It includes them in the total, but the total does not distinguish a flat from a deposit. The split is the point.',
        },
      ],
    },
    {
      q: 'Which item is correctly left out of a net-worth statement?',
      options: [
        {
          text: 'The present value of your future salary, because it is not an asset you can sell',
          correct: true,
          why: 'Human capital matters for planning but cannot be converted to cash. Including it would make the statement incomparable.',
        },
        {
          text: 'A credit card balance, because it is small',
          why: 'Small liabilities still belong on the list. Omitting them is the classic error.',
        },
        {
          text: 'The current value of a listed fund',
          why: 'A listed fund is an asset and should be valued at its market price.',
        },
        {
          text: 'The outstanding principal of a home loan',
          why: 'That is a liability and must be subtracted. Leaving it out would overstate net worth by the size of the loan.',
        },
      ],
    },
  ],
  takeaway:
    'Keep two complete lists, state the valuation rule, update on a fixed date, and read the trend and the composition rather than a single month’s total.',
}
