import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-128: several conditions, one number. */

export const l5_128: Chapter = {
  id: 'l5-128',
  title: 'SUMIFS',
  subtitle: 'Aggregate with multiple conditions to answer the questions a plain total cannot.',
  minutes: 9,
  blocks: [
    scene(
      'criteria-grid',
      'Three conditions, one row that passes all of them, and a single number at the end.',
    ),
    {
      kind: 'p',
      text: 'A monthly total tells you how much left the account. It does not tell you how much of it was food, in August, paid by card. That question has three conditions and one answer, and it is the kind of question a budget actually turns on: not “what did I spend”, but “what did I spend on this, in this period, through this channel”. SUMIFS exists to answer it without building a separate sheet for every combination.',
    },
    {
      kind: 'formula',
      label: 'The shape of a SUMIFS',
      expr: '=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, …)',
      note: 'The sum range comes first, unlike SUMIF where it comes last. Every criteria range must be the same size as the sum range, or the rows stop lining up.',
    },
    { kind: 'h', text: 'Criteria are strings, and that is where the mistakes live' },
    {
      kind: 'table',
      caption: 'Five criteria forms worth knowing',
      headers: ['You want', 'Write', 'Note'],
      rows: [
        ['Exactly Food', '"Food"', 'Text matching is case-insensitive in Excel and Sheets'],
        ['Anything containing Food', '"*Food*"', 'Wildcards work on text, and a question mark matches one character'],
        ['Above ₹2,000', '">2000"', 'The operator lives inside the quotes, with the number'],
        ['Not blank', '"<>"', 'Useful for finding rows where an amount was actually entered'],
        ['A date on or after 1 April', '">="&DATE(2026,4,1)', 'Concatenate the operator with a real date; typing a date as text will not compare reliably'],
      ],
    },
    {
      kind: 'p',
      text: 'The single most common SUMIFS bug is a range that is one row short. If the sum range covers rows 2 to 13 and a criteria range covers 2 to 12, the function does not error — it aligns the ranges from their first cell and quietly ignores the extra row. The result is a number that is slightly too small, in a report that looks finished. The second most common is a hard-coded month name that stops matching when the data says “Aug 2026” instead of “Aug”.',
    },
    { kind: 'h', text: 'Building a question out of conditions' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Start with the sum range: which column holds the number you want to add?',
        'Add one condition at a time, and check the result after each. A single-condition SUMIFS should equal the SUMIF you already trust.',
        'Add the second condition and compare with a manual count of the rows you expect. If the number falls, the condition is doing something.',
        'Keep the month and category values in their own cells and point the criteria at those cells, so the report can be re-pointed at September without editing the formula.',
        'Count the matching rows as well as summing them. A total with no row count cannot tell you whether it is describing one large transaction or forty small ones.',
      ],
    },
    {
      kind: 'example',
      title: 'August, food, and the payment mode that changes the answer',
      text: 'August holds six transactions worth ₹8,150, of which food is ₹4,470 — 54.8% of the month. A third condition splits that food total: ₹3,850 was paid by card and ₹620 by UPI. Without the mode condition the two are one number, and a question about whether card spending is the problem cannot be answered at all. The rows above ₹2,000 in August total ₹2,400, which is a single transaction, not a habit.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'The same shape answers other questions',
      text: 'Once a table has one header row and one row per transaction, the family of functions is interchangeable: SUMIFS adds, COUNTIFS counts, AVERAGEIFS averages, MAXIFS and MINIFS find the extremes. All of them take the same pairs of range and criteria. The skill transfers directly, and the row-count check transfers with it.',
    },
    sim(
      'sheet',
      'A two-month transaction log. Ask it for food in August, food by card, the month total, the rows above ₹2,000 and food as a share of the month.',
    ),
    l5Illustrative(
      'The transactions and amounts in the lab are invented. The criteria syntax, the equal-range rule and the row-count check are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Sum range',
          meaning: 'The column of numbers to add. In SUMIFS it is the first argument; in SUMIF it is the last.',
        },
        {
          term: 'Criteria range',
          meaning: 'A column tested against a condition. It must be the same height as the sum range, or the rows no longer align.',
        },
        {
          term: 'Wildcard',
          meaning: 'A pattern such as *Food* that matches part of a text value. Only meaningful for text, not for numbers or dates.',
        },
        {
          term: 'COUNTIFS',
          meaning: 'The counting version of the same shape: how many rows satisfy all the conditions, rather than what they add up to.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the schedules in the return utilities are built from multi-condition totals over one table, and are a useful example of criteria kept in their own cells',
    ]),
  ],
  quiz: [
    {
      q: 'Which formula totals food paid by card in August, from columns A (month), B (category), C (mode) and D (amount)?',
      options: [
        {
          text: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food",C2:C13,"Card")',
          correct: true,
          why: 'The sum range comes first, then each criteria range paired with its criterion. Three conditions, three pairs.',
        },
        {
          text: '=SUMIFS(A2:A13,"Aug",B2:B13,"Food",C2:C13,"Card",D2:D13)',
          why: 'The sum range is the month column and the criteria pairs are shifted. This would try to add text and misalign every range.',
        },
        {
          text: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food",C2:C13,"Card",E2:E13,"")',
          why: 'An extra, empty condition adds a fourth test that no row satisfies, so the total collapses to zero.',
        },
        {
          text: '=SUMIF(A2:A13,"Aug",D2:D13,B2:B13,"Food")',
          why: 'SUMIF takes one condition. The extra pair is not part of its signature, and the formula will not evaluate as intended.',
        },
      ],
    },
    {
      q: 'The sum range covers rows 2 to 13 and a criteria range covers rows 2 to 12. What happens?',
      options: [
        {
          text: 'The function does not error; it aligns from the top and quietly ignores the extra row',
          correct: true,
          why: 'Mismatched heights are a silent error. The total is slightly too small and looks entirely normal — which is why the ranges are worth checking by sight.',
        },
        {
          text: 'The formula returns #VALUE! because the ranges differ in size',
          why: 'There is no size check. The result is a wrong number, not an error value.',
        },
        {
          text: 'The shorter range is padded with blanks to match',
          why: 'Nothing is padded. The function compares positions, and the last row simply has no partner.',
        },
        {
          text: 'The formula sums the whole column instead',
          why: 'It sums exactly what the ranges cover. The problem is what they do not cover.',
        },
      ],
    },
    {
      q: 'How do you express “amount above ₹2,000” as a SUMIFS criterion?',
      options: [
        {
          text: '">2000" — the operator inside the quotes with the number',
          correct: true,
          why: 'A comparison needs both the operator and the value in the criterion string. The function parses the leading operator.',
        },
        {
          text: '>2000, written without quotes',
          why: 'An unquoted > is read as part of the formula, not as text for the criterion. The criterion has to be a string.',
        },
        {
          text: '"2000>" — the number first, then the operator',
          why: 'The operator is read from the front of the string. Reversed, it is not recognised as a comparison at all.',
        },
        {
          text: '"=2000" — an equals sign before the number',
          why: 'That asks for exactly 2,000, not for values above it. The operator you write is the question you ask.',
        },
      ],
    },
    {
      q: 'Why count the matching rows as well as summing them?',
      options: [
        {
          text: 'A total alone cannot tell you whether it came from one large transaction or many small ones',
          correct: true,
          why: 'The count is the shape of the number. ₹2,400 in one transaction is a different finding from ₹2,400 across forty.',
        },
        {
          text: 'SUMIFS is unreliable without a count beside it',
          why: 'SUMIFS is reliable when the ranges align. The count adds context, not correctness.',
        },
        {
          text: 'Counting rows improves calculation speed',
          why: 'A second formula costs a little more, not less. The benefit is interpretation.',
        },
        {
          text: 'The count replaces the need to check the ranges',
          why: 'A count with the same misaligned ranges would be wrong in the same way. It is a check only when the ranges are right.',
        },
      ],
    },
  ],
  takeaway:
    'Put the sum range first, pair every criteria range with its criterion, keep the ranges the same height, and hold the month and category in cells rather than inside the formula — then count the rows to see the shape of the total.',
}
