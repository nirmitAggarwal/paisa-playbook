import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-132: fold a list into a grid without rebuilding it. */

export const l5_132: Chapter = {
  id: 'l5-132',
  title: 'Pivot Tables',
  subtitle: 'Summarise a year of transactions by category and month without rebuilding the sheet.',
  minutes: 9,
  blocks: [
    scene(
      'pivot-cube',
      'Twelve transaction rows folded into a grid of categories and months, recomputed on refresh.',
    ),
    {
      kind: 'p',
      text: 'A pivot table answers the question a long transaction list cannot: what do these rows add up to, by category, by month, by both at once? It does it without a formula per cell and without a new sheet per question. You choose what goes on the rows, what goes on the columns and what is measured, and the grid appears. Change one of those three choices and the same list answers a different question.',
    },
    { kind: 'h', text: 'Three fields and one measure' },
    {
      kind: 'table',
      caption: 'The four slots in a pivot, and what each does',
      headers: ['Slot', 'Example', 'What it decides'],
      rows: [
        ['Rows', 'Category', 'One line per distinct value, top to bottom'],
        ['Columns', 'Month', 'One column per distinct value, left to right'],
        ['Values', 'Sum of amount', 'What is calculated inside each cell of the grid'],
        ['Filters', 'Year, account', 'Which rows from the source are considered at all'],
      ],
    },
    {
      kind: 'p',
      text: 'The measure is the slot people leave on its default. Sum is the obvious choice for amounts, but Count answers a different and often more useful question: how many transactions made up this total? A category with ₹40,000 across two entries is a different story from one with ₹40,000 across forty. Average answers a third question, and it will disagree with the average of the monthly totals, because it weights every transaction equally instead of every month.',
    },
    { kind: 'h', text: 'Refresh, grouping, and the blanks' },
    {
      kind: 'list',
      items: [
        'A pivot caches its result. New rows in the source do not appear until you refresh, and the source range has to include them. This is the single most common reason a pivot is wrong.',
        'Group dates by month or year rather than by day, or a year of daily rows produces hundreds of columns.',
        'A blank cell can mean no rows matched the combination, or that the matching rows summed to zero. The pivot cannot distinguish them; if the difference matters, add a count measure beside the sum.',
        'Keep the source clean: one header row, no merged cells, no totals inside the range, and one data type per column. A total row inside the source gets aggregated like any other row.',
        'GETPIVOTDATA lets a formula read a specific cell of the pivot by row and column name, which survives the grid being rearranged — useful, and fragile if the labels change.',
      ],
    },
    {
      kind: 'example',
      title: 'Twelve rows, two questions, one grid',
      text: 'A log of twelve transactions across August, September and October, in four categories. With Category on the rows and Month on the columns, sum of amount gives a 4 by 3 grid: food is ₹2,070 in August, ₹3,850 in September and ₹2,000 in October. Switch the measure to Count and the same cells read 2, 2 and 1 — the number of transactions, not the rupees. Neither grid is wrong; they answer different questions, and the labels are the only thing telling them apart.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A pivot is a derived view, and views go stale',
      text: 'The workbook can look finished while the pivot is a month behind, because nothing on the page says when it was last refreshed. Two habits prevent that: refresh when the file opens, and put the as-at date in the sheet title as a formula that reads the newest transaction date. A dated view is a fact; an undated one is a claim about a moment nobody can identify.',
    },
    sim(
      'l5-pivot-builder',
      'Fold twelve transactions into a grid, then change the rows, the columns and the measure and see which questions each version answers.',
    ),
    l5Illustrative(
      'The transactions behind the lab are invented. The three slots, the refresh habit and the blank-versus-zero distinction are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Pivot cache',
          meaning: 'The stored copy of the source data that the pivot reads. It is why the grid is fast and why it can be out of date until refreshed.',
        },
        {
          term: 'Measure',
          meaning: 'What is calculated in each cell: sum, count, average, minimum or maximum of a field.',
        },
        {
          term: 'Grouping',
          meaning: 'Combining many values of a field into fewer buckets — days into months, amounts into bands — so the grid stays readable.',
        },
        {
          term: 'GETPIVOTDATA',
          meaning: 'A function that reads one cell of a pivot by naming its row and column, so a formula can follow the pivot instead of a fixed address.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the statement and schedule downloads are large transaction logs, which is exactly the shape a pivot summarises; the utilities show the same discipline of one header row and one type per column',
    ]),
  ],
  quiz: [
    {
      q: 'You switch the value field from Sum to Count and the numbers fall sharply. Why?',
      options: [
        {
          text: 'Count returns the number of rows in each cell, not the rupees they hold',
          correct: true,
          why: 'Rows, columns and measure are independent choices. Changing the measure changes the question being asked of the same rows.',
        },
        {
          text: 'Count excludes blank cells, which removes most transactions',
          why: 'Count excludes blanks, but the fall here is the measure changing, not rows disappearing.',
        },
        {
          text: 'The pivot has not refreshed and is showing old sums',
          why: 'Stale data shows old sums, not small counts. The magnitude change is the measure.',
        },
        {
          text: 'Count is capped at the number of categories',
          why: 'There is no such cap. A cell counts the rows that fall into it.',
        },
      ],
    },
    {
      q: 'Three October rows are added to the source, and the pivot still shows the old totals. Why?',
      options: [
        {
          text: 'The pivot reads a cache and has to be refreshed, and the source range must include the new rows',
          correct: true,
          why: 'The cache is why a pivot is fast and why it can be quietly out of date. Refresh is a deliberate step, not an automatic one.',
        },
        {
          text: 'A pivot cannot include rows added after it was created',
          why: 'It can, once refreshed. The limitation is that the update is not automatic.',
        },
        {
          text: 'October needs to be added as a new column field first',
          why: 'New values in an existing field appear on refresh. The field already exists.',
        },
        {
          text: 'The pivot sums only the first ten rows by design',
          why: 'It covers whatever the source range covers. If the range stops at row ten, extend it and refresh.',
        },
      ],
    },
    {
      q: 'A cell in the pivot is blank. What does it mean?',
      options: [
        {
          text: 'No rows matched that combination — which is not the same as a total of zero',
          correct: true,
          why: 'The pivot cannot distinguish “no transactions” from “transactions that net to zero”. Add a count beside the sum when the difference matters.',
        },
        {
          text: 'The pivot formula is broken',
          why: 'A pivot cell is not a formula you wrote. A blank is a statement about the matching rows.',
        },
        {
          text: 'The source has a missing value in that row',
          why: 'A missing source value affects the measure, but the blank here is about a combination of fields having no rows.',
        },
        {
          text: 'Refreshing will turn it into a zero',
          why: 'Refresh re-reads the source. An empty combination stays empty; the blank is information, not a delay.',
        },
      ],
    },
    {
      q: 'Why does a pivot need a clean source table?',
      options: [
        {
          text: 'Merged cells, a total row inside the range or mixed types get aggregated as if they were data',
          correct: true,
          why: 'A pivot trusts the shape it is given. A total row inside the range is just another row to sum, which double-counts.',
        },
        {
          text: 'A pivot cannot read more than one sheet',
          why: 'It can read from a table on another sheet. The constraint is the shape of the data, not its location.',
        },
        {
          text: 'Clean tables calculate faster, which is the only reason',
          why: 'Speed is a minor benefit. Correctness is the reason: a stray total row changes the answer.',
        },
        {
          text: 'The pivot needs every column to be text',
          why: 'Amounts must be numeric to be summed. Mixed types are the problem, not text.',
        },
      ],
    },
  ],
  takeaway:
    'Decide what goes on the rows, the columns and the measure, keep the source as one clean table, refresh before you read it, and treat a blank cell as “no rows matched” rather than zero.',
}
