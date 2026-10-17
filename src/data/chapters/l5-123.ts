import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Rule, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-123: the shape of a workbook that stays true. */

export const l5_123: Chapter = {
  id: 'l5-123',
  title: 'Spreadsheet Finance',
  subtitle: 'Set up a personal finance workbook with separate input, calculation and summary sheets.',
  minutes: 9,
  blocks: [
    scene(
      'workbook-architecture',
      'One workbook, three jobs. Each arrow points one way, and nothing is typed twice.',
    ),
    {
      kind: 'p',
      text: 'Most personal finance spreadsheets fail for a reason that has nothing to do with formulas. They mix three different jobs on one sheet: entering data, calculating something from it, and reporting the answer. The moment those jobs share a grid, a report cell gets typed over, a calculation starts reading a number someone edited, and two versions of the truth begin to exist. The fix is architectural, and it costs about an hour.',
    },
    { kind: 'h', text: 'Three layers, and what each may contain' },
    {
      kind: 'table',
      caption: 'The layers of a workbook, and the rule that keeps each one honest',
      headers: ['Layer', 'What belongs there', 'What breaks it'],
      rows: [
        ['Inputs', 'Raw facts: salary, rent, EMI, balances, dates', 'A total typed in by hand, or a figure that was calculated somewhere else and pasted as a value'],
        ['Calculations', 'Formulas that read the input cells and produce intermediate results', 'Typing a number to “fix” a result, which severs it from the input forever'],
        ['Summary', 'A handful of results, read by a human, copied into decisions', 'More than a screen of numbers, or any number that is not a reference to the calculation layer'],
      ],
    },
    {
      kind: 'p',
      text: 'The direction matters more than the number of sheets. Inputs feed calculations, calculations feed the summary, and no arrow points backwards. You can build the three layers as three tabs, as three blocks on one sheet, or as three columns — the layout is a matter of taste. The one-way flow is not. A summary that writes back into an input has created a loop in which the answer can change the question.',
    },
    { kind: 'h', text: 'The four rules worth writing at the top of the file' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Every fact is entered once, in the input layer, in its own cell. If the same salary appears in two places, one of them is wrong and will stay wrong.',
        'Every calculation is a formula that names cells, never a number that repeats one. A formula that contains a number you could have pointed at is a future reconciliation problem.',
        'The summary contains results only, and each result is a reference. If a summary cell can be edited without changing anything upstream, it is not a summary.',
        'At least one cell checks the workbook against itself. Surplus should equal income minus spending; a balance sheet should balance; a total should equal the sum of its parts.',
      ],
    },
    l5Rule(
      'The audit cell is the cheapest control you will ever build',
      'A cell that returns 1 when the workbook agrees with itself and 0 when it does not is a control, not a calculation. It catches the two failures that matter: a number that was overwritten, and a range that no longer covers every row. The habit is the same one auditors use on a company’s books, scaled down to a household — and it is worth building before the workbook has thirty tabs.',
    ),
    {
      kind: 'example',
      title: 'A monthly workbook, in three blocks',
      text: 'Inputs: salary 78,000 and freelance 12,000, then rent 18,000, groceries 14,500, transport 4,200 and an EMI of 11,000. Calculations: total income, total spending, surplus. Summary: the surplus, the saving rate, and one flag saying whether the salary alone covers the month. Change the rent in the input block and all five summary numbers move; nothing in the summary is typed. The audit cell compares income minus spending with the surplus and returns 1.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A workbook is a model, not a record',
      text: 'A bank statement is a record: it says what happened. A workbook is a model: it says what your numbers imply, given the assumptions you put in. Keeping the assumptions visible — as input cells with labels, not as numbers buried inside formulas — is what lets you change one and see what happens. That is the entire value of building it yourself instead of accepting a calculator’s answer.',
    },
    sim(
      'sheet',
      'Build the three layers on one grid: total income, total spending, surplus, a saving rate, a coverage test and an audit cell.',
    ),
    l5Illustrative(
      'The salary, expenses and rates in this chapter and its lab are invented to teach the structure. The structure itself is the content; the amounts are not a recommendation.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Input layer',
          meaning: 'The cells that hold facts you look up or are told: salary, rent, balances, dates. Nothing in this layer is calculated.',
        },
        {
          term: 'Hard-coded value',
          meaning: 'A number typed directly into a formula or a summary cell instead of a reference to the cell that holds it. It survives every later change, which is exactly the problem.',
        },
        {
          term: 'Audit cell',
          meaning: 'A cell whose only job is to test whether two parts of the workbook still agree. It returns 1 for agreement and 0 for a break.',
        },
        {
          term: 'Single source of truth',
          meaning: 'The one cell where a fact lives. Every other appearance of that fact is a reference to it, never a copy.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the Excel utilities and return schedules published here are real examples of an input sheet separated from a calculation sheet, and are worth opening once to see the pattern at scale',
    ]),
  ],
  quiz: [
    {
      q: 'You notice the monthly surplus in your summary is wrong, and you type the correct figure over the formula. What have you just done?',
      options: [
        {
          text: 'Fixed this month and broken every future month, because the cell no longer follows the inputs',
          correct: true,
          why: 'The typed number is now a fact that nothing updates. Next month the inputs change, the calculation layer moves, and the summary keeps showing this month’s figure.',
        },
        {
          text: 'Nothing important, as long as you remember the change',
          why: 'A workbook is meant to work without your memory. The whole point of the calculation layer is that it re-derives the answer when an input changes.',
        },
        {
          text: 'Improved the workbook, because a correct number is better than a wrong formula',
          why: 'If the formula is wrong, the formula is what needs fixing. Overwriting the result hides the bug and leaves it in place for every other row.',
        },
        {
          text: 'Converted the cell into an input, which is the correct layer for a figure you know',
          why: 'A surplus is derived, not observed. Moving it into the input layer means the workbook now contains two versions of the same fact.',
        },
      ],
    },
    {
      q: 'Which of these belongs in the input layer?',
      options: [
        {
          text: 'The rent you actually pay each month',
          correct: true,
          why: 'Rent is an observed fact. It is looked up or remembered, not calculated, so it is entered once and referenced everywhere else.',
        },
        {
          text: 'Total spending for the month',
          why: 'A total is derived from the individual lines. Putting it in the input layer means it can drift away from the rows it is supposed to sum.',
        },
        {
          text: 'The saving rate',
          why: 'A ratio of two derived numbers. It belongs in the summary, as a formula over the calculation layer.',
        },
        {
          text: 'The audit result',
          why: 'A test that compares two results. It is the last cell in the chain, not an input to it.',
        },
      ],
    },
    {
      q: 'What is the audit cell for?',
      options: [
        {
          text: 'It tests that two parts of the workbook still agree, and shows a break before you act on a wrong number',
          correct: true,
          why: 'Checks such as income minus spending equals surplus catch overwritten cells and ranges that no longer cover every row.',
        },
        {
          text: 'It stores a backup copy of the summary in case the summary is deleted',
          why: 'A backup is a copy, and a copy can go stale. The audit cell compares live values; it does not preserve old ones.',
        },
        {
          text: 'It rounds the summary so the totals look consistent',
          why: 'Rounding is cosmetic and can hide a real gap. A check has to compare the actual values, not a presentation of them.',
        },
        {
          text: 'It records who last edited the file',
          why: 'Version history is a feature of the application. The audit cell is about arithmetic agreeing with itself.',
        },
      ],
    },
    {
      q: 'You keep the inputs, calculations and summary on three separate tabs. What still has to be true?',
      options: [
        {
          text: 'The arrows point one way: inputs feed calculations, calculations feed the summary, and nothing writes back',
          correct: true,
          why: 'Separate tabs do not enforce anything by themselves. The one-way flow is the rule; the tabs are only a place to put it.',
        },
        {
          text: 'Every tab has to contain at least one typed number so it can stand alone',
          why: 'A calculation tab that contains typed numbers is no longer a calculation tab. Independence is the opposite of what you want here.',
        },
        {
          text: 'The summary tab has to repeat the input figures so a reader can see them',
          why: 'Repeating a fact is how two versions begin. Link to the input tab, or show a calculated result, but do not retype it.',
        },
        {
          text: 'The tabs have to be in the order inputs, calculations, summary in the file',
          why: 'Tab order is presentation. A workbook with the summary first is perfectly sound as long as the references flow one way.',
        },
      ],
    },
  ],
  takeaway:
    'Enter every fact once, calculate from it in a layer that contains no typed numbers, report only results, and keep one cell that checks the whole thing still agrees with itself.',
}
