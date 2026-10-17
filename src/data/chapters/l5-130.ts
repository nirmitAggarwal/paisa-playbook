import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-130: keep the rows that pass, as a live table. */

export const l5_130: Chapter = {
  id: 'l5-130',
  title: 'FILTER',
  subtitle: 'Extract a live subset of rows for review instead of building a new sheet every month.',
  minutes: 9,
  blocks: [
    scene(
      'filter-sieve',
      'Rows enter with a condition and leave as a smaller table, which keeps updating.',
    ),
    {
      kind: 'p',
      text: 'There are two ways to look at part of a table. A filter hides rows in the view: the data is still there, and a total over the range still sees it. FILTER is different. It builds a second, smaller table containing only the rows that pass a condition, and that table is live — change an amount, add a row, and the result follows. One is a way of looking; the other is a derived dataset you can calculate from.',
    },
    {
      kind: 'formula',
      label: 'The shape of a FILTER',
      expr: '=FILTER(array, include, [if_empty])',
      note: 'The include argument is a column of TRUE and FALSE, one per row. Every row where it is TRUE appears in the result, in the original order.',
    },
    { kind: 'h', text: 'The spill is the feature and the failure mode' },
    {
      kind: 'p',
      text: 'A FILTER is written in one cell and its result occupies a block of cells, spilling down and across. That block needs empty space. Put a note, a total or a heading where the result wants to land and the formula returns #SPILL! — not a wrong answer, a refusal. The refusal is useful: it means a spilled result can never silently overwrite something you wrote. The discipline is to reserve the area under and to the right of the formula before writing it.',
    },
    {
      kind: 'table',
      caption: 'Filter as a view, filter as a formula',
      headers: ['', 'A filter on the table', 'FILTER'],
      rows: [
        ['What it changes', 'Which rows are visible', 'Produces a separate block of rows'],
        ['What a SUM sees', 'Every row in the range, hidden or not', 'Only the rows in the spilled block, if you point at it'],
        ['When new data arrives', 'New rows appear, subject to the filter', 'The block grows, if the source range covers the new rows'],
        ['Failure mode', 'A total that quietly includes hidden rows', '#SPILL! when the destination is blocked'],
      ],
    },
    {
      kind: 'p',
      text: 'Because the result is a real block of cells, other formulas can read it. That is what makes it useful for review: filter a year of transactions down to the disputed ones, then total the filtered block, count it, or chart it, without maintaining a second sheet. The alternative — copy, paste, delete rows — produces a snapshot that is wrong the moment the source changes, and nobody can tell by looking.',
    },
    { kind: 'h', text: 'Conditions, combinations and the limits' },
    {
      kind: 'list',
      items: [
        'One condition is a comparison against a column: the include argument is something like B2:B200="Food".',
        'Two conditions that must both hold are multiplied: (B2:B200="Food")*(A2:A200="Aug"). TRUE times TRUE is 1; anything with a FALSE is 0.',
        'Two conditions where either may hold are added and compared with zero: (B2:B200="Food")+(A2:A200="Aug")>0.',
        'A result that may legitimately be empty needs the third argument, or the formula returns #CALC! instead of a blank.',
        'The source should be a clean table: one header row, no merged cells, no totals inside the range. A total row inside the source gets filtered like any other row.',
        'On a very large sheet, a whole-column FILTER is expensive because it evaluates every row. Bound the range to the table, or use an Excel Table so the range follows the data.',
      ],
    },
    {
      kind: 'example',
      title: 'Three rows out of ten, and a note that breaks it',
      text: 'Ten transactions, of which three are food. A FILTER on the category column spills those three rows below the formula. Type a note two rows under the result and the whole formula returns #SPILL!, because the block can no longer fit. Clear the note and the three rows return. Add an eleventh transaction in September and the block becomes four rows without the formula being touched — provided the source range already included row 11.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A snapshot is not a filter',
      text: 'Copying a filtered range and pasting it into a new sheet is a common habit, and it produces a table that looks identical and behaves differently: it no longer knows about the source. Within a month it is out of date, and there is no signal in the file to say so. If the subset is going to be used more than once, derive it with a formula; if it must be a snapshot, date it in the sheet name and treat it as a record, not a live view.',
    },
    sim(
      'l5-filter-builder',
      'Build a condition, watch which rows pass, then answer what a spill needs and what happens when the source table grows.',
    ),
    l5Illustrative(
      'The transactions and amounts in the lab are invented. The include argument, the spill requirement and the live-versus-snapshot distinction are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Include argument',
          meaning: 'A column of TRUE and FALSE, one entry per source row, that decides which rows appear in the result.',
        },
        {
          term: 'Spill',
          meaning: 'A result that occupies a block of cells starting from the formula cell. It needs empty space, and it grows and shrinks with the data.',
        },
        {
          term: 'Dynamic array',
          meaning: 'A formula result whose size is decided at calculation time rather than fixed when it was written. FILTER, SORT and UNIQUE all return one.',
        },
        {
          term: 'Snapshot',
          meaning: 'A copied set of values that no longer follows the source. Useful as a dated record, dangerous as a report.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the return utilities filter large schedules down to the rows that need attention, which is the review use this chapter describes',
    ]),
  ],
  quiz: [
    {
      q: 'A FILTER result has a note typed two rows below it. What happens?',
      options: [
        {
          text: 'The formula returns #SPILL! until the blocking cell is cleared',
          correct: true,
          why: 'The result needs the whole block. A blocked destination is a refusal, not a partial answer, which is why spilled data cannot overwrite your notes.',
        },
        {
          text: 'The note is moved down automatically',
          why: 'Spilled results never displace existing content. The formula gives way instead.',
        },
        {
          text: 'The result shrinks to the rows that fit',
          why: 'There is no partial spill. A truncated result would hide rows without telling you, which is worse than an error.',
        },
        {
          text: 'The note and the result share the cell',
          why: 'One cell holds one value. Both cannot occupy the same address.',
        },
      ],
    },
    {
      q: 'You add rows to the bottom of the source table. What does a FILTER over that table do?',
      options: [
        {
          text: 'It includes the new rows on recalculation, as long as the source range covers them',
          correct: true,
          why: 'The result is derived, so it follows. The range is the limit: a range that stops at the old last row cannot see what was added below it.',
        },
        {
          text: 'It keeps the original rows until the formula is copied down again',
          why: 'Dynamic arrays do not need copying. The block is recalculated from the source.',
        },
        {
          text: 'It returns #SPILL! because the answer grew',
          why: 'Growth is expected. A spill error is about a blocked destination, not about a longer answer.',
        },
        {
          text: 'It includes the rows only if they match the condition exactly as typed',
          why: 'Matching is the point of the condition. The question is whether the range reaches the new rows at all.',
        },
      ],
    },
    {
      q: 'How do you require both “Food” and “August” in a FILTER include argument?',
      options: [
        {
          text: 'Multiply the two comparisons: (category="Food")*(month="Aug")',
          correct: true,
          why: 'TRUE is 1 and FALSE is 0, so the product is 1 only where both conditions hold. Non-zero means the row is included.',
        },
        {
          text: 'Add the two comparisons: (category="Food")+(month="Aug")',
          why: 'Addition is OR: a row that is Food in September would pass. Use addition only when either condition is enough.',
        },
        {
          text: 'Pass the two comparisons as separate arguments after the array',
          why: 'FILTER takes one include argument. Extra arguments are read as if_empty and beyond, not as additional conditions.',
        },
        {
          text: 'Use a single comparison with the text "FoodAug"',
          why: 'The columns are separate. Concatenating the labels would look for a value that does not exist.',
        },
      ],
    },
    {
      q: 'Why is a copied subset of a filtered table worse than a FILTER formula for a recurring review?',
      options: [
        {
          text: 'The copy stops following the source and gives no sign that it is out of date',
          correct: true,
          why: 'A snapshot looks identical to a live table. A formula keeps the link, so next month is a recalculation rather than a rebuild.',
        },
        {
          text: 'A copy takes more space in the file',
          why: 'Size is minor. The problem is that the values are frozen while the situation moves.',
        },
        {
          text: 'Copied values cannot be formatted',
          why: 'They can be formatted normally. Formatting is not the issue.',
        },
        {
          text: 'A copy cannot be summed',
          why: 'Copied numbers sum perfectly well. That is precisely why the staleness is hard to notice.',
        },
      ],
    },
  ],
  takeaway:
    'FILTER builds a live subset, not a view: write it where the result has room, combine conditions with multiplication for AND and addition for OR, give an empty result a fallback, and keep the source range wide enough to include tomorrow’s rows.',
}
