import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-151: make the right action the default one. */

export const l5_151: Chapter = {
  id: 'l5-151',
  title: 'Financial Trick: Automate Good Financial Behavior',
  subtitle: 'Design a small set of automations that make the right financial action the default one.',
  minutes: 8,
  blocks: [
    scene(
      'automation-loop',
      'Payday, bills, savings and an alert in one direction, with a manual override kept for exceptions.',
    ),
    {
      kind: 'p',
      text: 'A financial habit that depends on remembering is a habit that fails in the month you are busiest. Automation is not a technology preference; it is a way of moving a decision from the moment of temptation to a moment of calm. The design question is which decisions to move, when to run them, and what happens when the money is not there.',
    },
    { kind: 'h', text: 'Automate the actions, not the judgment' },
    {
      kind: 'table',
      caption: 'What is worth automating, and what should stay manual',
      headers: ['Action', 'Automate?', 'Why'],
      rows: [
        ['Savings transfer on payday', 'Yes', 'The money leaves before it can be spent'],
        ['SIP dated after the credit', 'Yes', 'Consistent investing without a monthly decision'],
        ['Fixed bills with a cap', 'Yes', 'Late fees are more expensive than the attention saved'],
        ['Variable bills', 'Check each month', 'Autopay on a bill that can be wrong is how errors persist'],
        ['Investment switches', 'No', 'A market move is not a reason to change a plan'],
        ['Prepayment decisions', 'No', 'Liquidity and tax make this a decision, not a default'],
      ],
    },
    {
      kind: 'p',
      text: 'The most valuable automation is the one that runs immediately after income arrives. A transfer scheduled on payday moves the money before it can be absorbed by the month. A transfer scheduled before payday fails whenever the salary is late, and a failed debit can carry a charge, a mark on the mandate and a repair job with the bank. The date is not a detail; it is the part most likely to break.',
    },
    { kind: 'h', text: 'Design the failure path first' },
    {
      kind: 'list',
      items: [
        'Keep a small buffer in the account the debit runs from, so a weekend or a delayed credit does not fail the payment.',
        'Turn on a low-balance alert before each debit. A failed debit discovered by the lender is a different problem from one discovered by you the same morning.',
        'Check the mandate limit. An SIP or autopay above the mandate cap fails even when the money is there.',
        'Do not automate a variable bill without a cap. A duplicate charge or a wrong amount should be disputed before it is paid, not after.',
        'Keep one manual override — a pause instruction or a named human — for the month the plan needs to change.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Automation hides errors as efficiently as it hides effort',
      text: 'A recurring charge that nobody reviews will keep renewing; a SIP into a fund that has changed strategy will keep buying. The automation removes the monthly decision, not the annual review. Put the review on the calendar: once a year, list every recurring debit, check the amount and the purpose, and cancel what no longer earns its place.',
    },
    {
      kind: 'example',
      title: 'A five-step loop that survives a bad month',
      text: 'Salary lands on the first. On the second, a fixed transfer goes to savings and a SIP is dated the fourth. Fixed bills are on autopay with a per-bill cap; variable bills are paid after a two-minute check. A low-balance alert fires before every debit, and the buffer in the account covers a delayed credit. Five automations, one manual check, one annual review. The month runs without a decision, and the exceptions surface as alerts rather than as surprises.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'The rails have limits, and they are written down',
      text: 'Standing instructions, e-mandates and UPI autopay have different caps, different failure behaviour and different dispute windows. A mandate can be cancelled at the bank or the provider, and a failed debit can attract a charge. Read the mandate terms once, keep the cancellation route in the document inventory, and do not assume a debit will retry quietly.',
    },
    sim(
      'l5-automation-designer',
      'Switch the automations on, move the savings transfer before payday, and see which failure the design creates.',
    ),
    l5Illustrative(
      'The loop in the lab is illustrative. The timing rule, the failure path and the annual review are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Standing instruction',
          meaning: 'A fixed transfer a bank executes on a schedule, usually on a chosen date each month.',
        },
        {
          term: 'E-mandate',
          meaning: 'An electronic authorisation for recurring debits, with a cap and a cancellation route.',
        },
        {
          term: 'Low-balance alert',
          meaning: 'A message sent before or when the balance falls below a threshold, which is how a failed debit is caught early.',
        },
        {
          term: 'Manual override',
          meaning: 'A deliberate way to pause or change an automation when the plan, not the payment, has changed.',
        },
      ],
    },
    l5Sources(['rbi', 'npci'], [
      'Reserve Bank of India — the rules on standing instructions, e-mandates and the handling of failed debits, including customer protection around unauthorised or failed transactions',
      'National Payments Corporation of India — the UPI autopay and mandate guidance, including caps and cancellation',
    ]),
  ],
  quiz: [
    {
      q: 'Which action is the best candidate for automation?',
      options: [
        {
          text: 'A fixed savings transfer scheduled the day after income arrives',
          correct: true,
          why: 'The amount is known, the date is safe, and the action is the one most likely to be skipped. That is the profile of a good automation.',
        },
        {
          text: 'A decision to switch funds after a market fall',
          why: 'That is a judgment, and automating it would turn a bad week into a permanent change.',
        },
        {
          text: 'Paying a variable bill without a cap',
          why: 'Autopay on a bill that can be wrong lets errors through. Fixed bills with a cap are the safe version.',
        },
        {
          text: 'Prepaying a loan whenever there is a surplus',
          why: 'Prepayment depends on liquidity and alternatives. It should be a decision, not a default.',
        },
      ],
    },
    {
      q: 'Why should a savings transfer run after payday rather than before?',
      options: [
        {
          text: 'Because a debit before the credit fails whenever the salary is late, and a failed debit has consequences',
          correct: true,
          why: 'Timing against the credit date is the difference between a plan that runs and one that fails on a short month.',
        },
        {
          text: 'Because banks pay interest on the transfer date',
          why: 'Interest is not the issue. Availability of funds on the debit date is.',
        },
        {
          text: 'Because the transfer is larger after payday',
          why: 'The amount is fixed by the instruction. The date is what changes.',
        },
        {
          text: 'Because a transfer before payday is illegal',
          why: 'It is not illegal. It is a design fault that produces failed debits.',
        },
      ],
    },
    {
      q: 'What does a low-balance alert add to an automated plan?',
      options: [
        {
          text: 'It tells you about a shortfall before the debit fails, so the fix happens before the charge',
          correct: true,
          why: 'Automation fails silently. The alert is the monitoring that turns a failed debit into a same-morning correction.',
        },
        {
          text: 'It increases the mandate limit',
          why: 'An alert does not change the mandate. It reports the balance.',
        },
        {
          text: 'It cancels the debit automatically',
          why: 'It may prompt you to act, but the alert itself is information.',
        },
        {
          text: 'It replaces the need for a buffer',
          why: 'The buffer prevents the shortfall. The alert tells you when the buffer is not enough.',
        },
      ],
    },
    {
      q: 'Why is an annual review still needed when everything is automated?',
      options: [
        {
          text: 'Because recurring debits keep running whether or not they still earn their place',
          correct: true,
          why: 'Automation removes the monthly decision, not the judgment. A yearly list of every debit catches the ones that no longer fit.',
        },
        {
          text: 'Because the bank requires a review to keep the mandate active',
          why: 'No such general requirement exists. The reason is the household’s own priorities.',
        },
        {
          text: 'Because automated transfers stop after twelve months',
          why: 'They do not generally stop. That is precisely why they need review.',
        },
        {
          text: 'Because the review increases the return',
          why: 'It does not change the return. It changes what is being paid for.',
        },
      ],
    },
  ],
  takeaway:
    'Automate fixed actions just after income arrives, keep a buffer and a low-balance alert for the month it fails, and review every recurring debit once a year.',
}
