import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-127: turning a rule into a 1 or a 0. */

export const l5_127: Chapter = {
  id: 'l5-127',
  title: 'IF',
  subtitle: 'Build conditional logic that flags real problems — overdue payments, budget breaches, missing proof.',
  minutes: 10,
  blocks: [
    scene(
      'if-branch',
      'One test, two branches, and a second test on the branch that matters.',
    ),
    {
      kind: 'p',
      text: 'IF is where a spreadsheet stops being a calculator and starts being a set of rules. The function itself is trivial: a condition, a value if it is true, a value if it is false. What makes it useful in money work is the decision to return a number rather than a sentence. A flag of 1 or 0 can be summed, counted, filtered and charted; the phrase “overdue, chase” cannot. The flag column is the bridge between a rule you can state and a rule your sheet can act on.',
    },
    {
      kind: 'formula',
      label: 'A flag, and the count it makes possible',
      expr: '=IF(C2>30,1,0) … then =SUM(E2:E8)',
      note: 'The flag turns a date comparison into arithmetic. Summing the column is the same as counting the invoices that need action, and it updates as the dates change.',
    },
    { kind: 'h', text: 'Flags versus calculations' },
    {
      kind: 'table',
      caption: 'Two jobs for the same function, kept in different columns',
      headers: ['Use', 'Example', 'Why it belongs on its own'],
      rows: [
        ['Flag', 'Is this invoice more than 30 days late? 1 or 0', 'You can total it, count it and filter on it, and the rule is visible in one place'],
        ['Calculation', 'What is this invoice worth after a 2% late fee?', 'The result is a number to be added up, not a decision — mixing the two makes both hard to check'],
        ['Label', 'Which stage is this account at?', 'Text is for reading. Keep it beside the flag if a human needs it, never instead of the flag'],
      ],
    },
    {
      kind: 'p',
      text: 'The most common mistake is to build the decision into the total. A formula that sums only overdue invoices is useful, but nobody can see the rule without opening it, and a second question — how many are overdue? — needs a second hidden formula. A flag column makes the rule explicit once, and every later question becomes an ordinary SUM, COUNTIF or FILTER over that column.',
    },
    { kind: 'h', text: 'Nesting, and when to stop' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'One test is always readable: IF(condition, value_if_true, value_if_false).',
        'Two tests nested is usually still readable, especially when the second test only applies to the branch that passed the first — overdue, and then: is there proof on file?',
        'Three or more levels of nesting is a signal to restructure. Either give each test its own column, or use a lookup table of bands.',
        'IFS evaluates a list of conditions in order and returns the first match, which reads better than nested IF for bands. It is not available in every older file, so a helper column is the portable answer.',
        'IFERROR wraps a calculation and supplies a fallback when it fails. Use it for a division that might have a zero denominator, not to hide an error you do not understand.',
      ],
    },
    {
      kind: 'example',
      title: 'Two invoices, two tests, one escalation',
      text: 'Seven invoices are between zero and 45 days late. The flag column returns 1 for the two past 30 days — ₹45,000 with no proof and ₹30,000 with proof. A second test asks whether anything is past 60 days: nothing is, so the escalation level is 1 rather than 2. The rupee value of the flagged invoices is ₹75,000, and ₹45,000 of it has no proof on file, which is the specific action the sheet has just produced.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Comparisons with text and dates are where IF quietly goes wrong',
      text: 'Text comparisons are case-insensitive in Excel and Sheets, so “Yes” and “yes” match; a trailing space does not. Dates are numbers, so 45 days late is a number only if the date column really holds dates rather than text that looks like one. And a comparison with an empty cell is not false — it is whatever the empty cell evaluates to, which is why a missing due date can make an invoice look on time. Test the data before you trust the rule.',
    },
    sim(
      'sheet',
      'A flag column of overdue invoices, a nested escalation level, the rupee value behind the flags, and one test of whether the problem is material.',
    ),
    l5Illustrative(
      'The invoices, amounts and due dates in the lab are invented. The flag-in-its-own-column rule and the nested-test structure are the lesson.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Flag',
          meaning: 'A cell that returns 1 or 0 for a condition, so the decision can be summed, counted and filtered like any other number.',
        },
        {
          term: 'Nested IF',
          meaning: 'An IF placed inside another IF, so the second test only runs on one branch of the first. Readable at two levels, rarely at four.',
        },
        {
          term: 'IFS',
          meaning: 'A function that checks conditions in order and returns the value for the first one that is true. Clearer than nested IF for bands, but not available everywhere.',
        },
        {
          term: 'IFERROR',
          meaning: 'A wrapper that returns a fallback value when the inner formula errors. Appropriate for a known, expected failure such as division by zero.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the return utilities use conditional flags and validation extensively; opening one shows how a rule is expressed once and then counted, rather than written into each total',
    ]),
  ],
  quiz: [
    {
      q: 'Why is it better for an overdue check to return 1 or 0 rather than the words “chase” and “fine”?',
      options: [
        {
          text: 'A number can be summed, counted and filtered; text can only be read',
          correct: true,
          why: 'The flag column turns a rule into arithmetic. Counting the invoices that need action becomes SUM over one column.',
        },
        {
          text: 'Text takes more storage space in the file',
          why: 'Storage is irrelevant at this scale. The difference is that one result can be aggregated and the other cannot.',
        },
        {
          text: 'IF cannot return text',
          why: 'IF can return any value, including text. The choice is about what you want to do with the result afterwards.',
        },
        {
          text: 'Numbers are less likely to be mistyped',
          why: 'The flag is a formula, so it is not typed at all. The advantage is aggregation, not typo resistance.',
        },
      ],
    },
    {
      q: 'You need three levels: over 60 days, over 30 days, otherwise fine. Which structure is clearest?',
      options: [
        {
          text: 'A single nested IF that returns 2, then 1, then 0, with the most severe test first',
          correct: true,
          why: 'Order matters in a nested IF: the first condition that is true wins, so the strictest test must come first.',
        },
        {
          text: 'Three separate columns, each testing one threshold independently',
          why: 'Independent flags are useful, but they can contradict each other — an invoice 70 days late would be both “over 30” and “over 60”. A single ordered result avoids that.',
        },
        {
          text: 'A nested IF with the mildest test first',
          why: 'If the mildest test comes first, every invoice past 30 days stops there and the 60-day level is never reached.',
        },
        {
          text: 'A SUM of the days late, compared with the thresholds afterwards',
          why: 'Summing days late across invoices answers nothing. The test is per invoice, not across the column.',
        },
      ],
    },
    {
      q: 'When is IFERROR the right tool?',
      options: [
        {
          text: 'When a specific, understood failure is possible — such as dividing by a cell that may be zero — and you can state what should appear instead',
          correct: true,
          why: 'The fallback is a decision you are making on purpose. Used that way, IFERROR keeps a summary readable without hiding a problem.',
        },
        {
          text: 'Whenever a cell shows an error, so the sheet looks clean',
          why: 'That hides the symptom and keeps the cause. A broken reference or a text value will still be wrong, now without a visible signal.',
        },
        {
          text: 'To round numbers that are too long to display',
          why: 'Display length is a formatting issue. IFERROR does nothing to a value that is simply large.',
        },
        {
          text: 'To replace a nested IF when there are more than three conditions',
          why: 'IFERROR handles failures, not branching. Multiple conditions need IFS, a helper column or a lookup table.',
        },
      ],
    },
    {
      q: 'An invoice has no due date entered. Why can an IF test on days late mislead you?',
      options: [
        {
          text: 'The comparison runs against an empty cell, so the result may look like “on time” when the date is simply missing',
          correct: true,
          why: 'A missing input is not a fact about lateness. Test for the blank first, or make the date a required input, before comparing.',
        },
        {
          text: 'IF treats an empty cell as text and returns an error',
          why: 'An empty cell does not necessarily error. It evaluates to something that compares, which is why the failure is silent.',
        },
        {
          text: 'A missing due date automatically makes the invoice 0 days late',
          why: 'It produces a comparison result, not a considered zero. The distinction matters when the flag drives a chase list.',
        },
        {
          text: 'The invoice is excluded from the range',
          why: 'The row is still in the range. Only the value in one cell is missing.',
        },
      ],
    },
  ],
  takeaway:
    'Put the rule in its own column as a 1 or a 0 so it can be counted and summed. Order nested tests from the strictest condition, and test for missing data before you test for lateness.',
}
