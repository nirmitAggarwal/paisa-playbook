import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Rule, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-124: two applications, four ideas that matter. */

export const l5_124: Chapter = {
  id: 'l5-124',
  title: 'Excel/Google Sheets',
  subtitle: 'Use the core spreadsheet features that matter for money work, in either application.',
  minutes: 9,
  blocks: [
    scene(
      'sheet-feature-map',
      'Four features do most of the work. The menus differ between applications; the ideas do not.',
    ),
    {
      kind: 'p',
      text: 'Excel and Google Sheets are close enough that a skill learnt in one transfers to the other, and different enough that a formula which works in one can fail in the other. For personal finance the differences rarely matter, because the work depends on a small set of features: references, ranges, sorting, filtering, validation and sharing. Learn those four ideas properly and the application becomes a preference rather than a barrier.',
    },
    { kind: 'h', text: 'The four features worth learning first' },
    {
      kind: 'table',
      caption: 'What each feature is for, and the mistake it prevents',
      headers: ['Feature', 'What it does', 'The mistake it prevents'],
      rows: [
        ['Named ranges', 'Give a cell or block a name, such as TaxRate or AugSpend, and use the name in formulas', 'A range that silently stops covering the last few rows when new data is added'],
        ['Sort and filter', 'Reorder rows, or hide the ones that do not match a condition', 'Reading a total that includes rows you thought you had excluded'],
        ['Data validation', 'Restrict a cell to a list, a date range or a whole number', 'A category typed three different ways, which splits one total into three'],
        ['Sharing controls', 'Decide who may view, comment or edit, and what they may see', 'A private line travelling inside a link sent to a group'],
      ],
    },
    {
      kind: 'p',
      text: 'Sorting and filtering are views, not edits. A filter hides rows; it does not delete them, and a total over a filtered range may or may not respect the filter depending on the function you use. That distinction is the source of a great many wrong totals: the sheet looks like it contains eight rows, the formula is summing ten, and both are behaving exactly as designed.',
    },
    { kind: 'h', text: 'Where the two applications differ in ways that matter' },
    {
      kind: 'list',
      items: [
        'Dynamic arrays: modern Excel and Google Sheets both spill a result into neighbouring cells; older Excel files do not, and will show a single value or an error instead.',
        'Lookup functions: XLOOKUP exists in current Excel and Sheets. Older workbooks use VLOOKUP or INDEX with MATCH, and a file shared with someone on an old version may fall back to those.',
        'Collaboration: Sheets is live and multi-user by default, Excel is file-based unless it is on the web. Live editing is convenient and it is also how a formula gets replaced by a number while you are looking at another tab.',
        'Version history: both keep it. The habit worth forming is naming a version before a big change, so “the one that worked” is findable rather than a timestamp you have to guess.',
      ],
    },
    l5Rule(
      'A shared sheet is a data-sharing decision, not a formatting one',
      'Every cell in a workbook is personal data if it describes a person: salary, medical spending, a loan balance, an account number. Under India’s data protection framework, sharing personal data requires a lawful basis and a limit on what is shared — and a read-only link is still sharing. The practical version for a household: mark each row as shared or private, remove or exclude the private rows before sending anything, and prefer sharing a summary you built over sharing the workbook you keep. Current guidance is published at meity.gov.in.',
    ),
    {
      kind: 'example',
      title: 'The link that showed more than intended',
      text: 'A household budget is shared with a financial adviser through a read-only link. The sheet has nine lines worth ₹63,099, of which three are private — therapy, gifts and a medical test — worth ₹14,300. Nothing about the link distinguishes them, so 77.3% of the sheet travels and 22.7% travels with it. The fix is not a password; it is a visibility column and a filtered copy, built before the link is sent.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      title: 'Validation is a gift to your future self',
      text: 'A category column restricted to a list of eight values takes ten seconds to set up and prevents the slow drift into “Food”, “food”, “Food & drink” and “Groceries”. Every one of those variants is a separate category to SUMIF, and the total that comes out is smaller than the truth. Validation is the cheapest data cleaning you will ever do, because it happens at the moment of entry instead of at the moment of analysis.',
    },
    sim(
      'sheet',
      'A shared household sheet: mark each line visible or private, then measure how much of the month a read-only link would expose.',
    ),
    l5Illustrative(
      'The household in the lab is invented. The visibility column, the total it protects and the habit of building a copy before sharing are the real content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Named range',
          meaning: 'A name pointing at a cell or block, used in formulas instead of an address. It survives rows being inserted and makes a formula readable.',
        },
        {
          term: 'Data validation',
          meaning: 'A rule limiting what a cell will accept — a list of values, a date range, a whole number. It prevents inconsistent entries at the source.',
        },
        {
          term: 'View versus edit',
          meaning: 'A filter or a sort changes what you see; it does not change what the sheet contains. Confusing the two produces totals over rows you believe are excluded.',
        },
        {
          term: 'Spill',
          meaning: 'A formula whose result occupies several cells, starting from the one you typed it in. It needs empty space around it.',
        },
      ],
    },
    l5Sources(['meity'], [
      'Ministry of Electronics and Information Technology — the data protection framework, for what counts as personal data and what sharing it requires',
    ]),
  ],
  quiz: [
    {
      q: 'You filter a spending sheet to show only Food, and the total at the bottom does not change. Why?',
      options: [
        {
          text: 'The formula is summing the whole range; a filter hides rows but does not remove them from a SUM',
          correct: true,
          why: 'SUM reads every cell in the range regardless of what is visible. To total only visible rows you need a function that respects the filter, or a condition in the formula.',
        },
        {
          text: 'The filter is broken and needs to be reapplied',
          why: 'The rows are hidden exactly as intended. The mismatch is between what the filter does to the view and what SUM does to the range.',
        },
        {
          text: 'The total needs to be refreshed manually after filtering',
          why: 'Recalculation does not change which cells a range covers. The range is the whole column whether or not rows are hidden.',
        },
        {
          text: 'Filtering only works on text columns, so the amount column was left out',
          why: 'Filters apply to rows, not columns. The amount column is filtered along with the rest of the row.',
        },
      ],
    },
    {
      q: 'Why does a category column restricted by data validation produce better totals?',
      options: [
        {
          text: 'It stops near-duplicate spellings, so one category is not split across several labels',
          correct: true,
          why: 'SUMIF matches exact text. “Food”, “food” and “Food & drink” are three categories, and each total is smaller than the truth.',
        },
        {
          text: 'It makes the sheet calculate faster',
          why: 'Validation adds a small check on entry. The benefit is data quality, not speed.',
        },
        {
          text: 'It automatically totals each category as you type',
          why: 'Validation accepts or rejects an entry. Totalling is a separate formula, which validation neither writes nor updates.',
        },
        {
          text: 'It prevents anyone else from editing the sheet',
          why: 'Validation constrains values in specific cells. Editing rights are a sharing permission, which is a different control.',
        },
      ],
    },
    {
      q: 'You send a read-only link to a workbook that contains a private medical expense. What is true?',
      options: [
        {
          text: 'Read-only still exposes the data; the row has to be removed or excluded before the link is sent',
          correct: true,
          why: 'Read-only limits what the recipient can change, not what they can see. Personal data in a shared file has been shared.',
        },
        {
          text: 'Read-only means the recipient cannot copy the values',
          why: 'A viewer can read and transcribe anything on screen. Technical restrictions are a deterrent, not a guarantee.',
        },
        {
          text: 'The link is safe because the file is not downloadable',
          why: 'Viewing is the exposure. Whether a download button exists changes the convenience of copying, not the fact of disclosure.',
        },
        {
          text: 'Deleting the row after sending the link removes it from the recipient’s copy',
          why: 'A copy is a copy. The recipient already has the data; later edits to your version do not reach it.',
        },
      ],
    },
    {
      q: 'An older Excel file opens a formula that relies on a spilled array. What is the likely result?',
      options: [
        {
          text: 'Only the first value appears, or the formula errors, because that version has no dynamic arrays',
          correct: true,
          why: 'Spill behaviour is a feature of newer versions. In an older file the same formula has to be entered as an array formula or replaced.',
        },
        {
          text: 'The file automatically upgrades to the newer calculation engine',
          why: 'Opening a file does not change its version or its engine. The formula is evaluated by the application doing the opening.',
        },
        {
          text: 'The values spill but cannot be formatted',
          why: 'Without dynamic arrays there is no spill to format. The result is a single value or an error.',
        },
        {
          text: 'Nothing changes, because array behaviour is part of the file rather than the application',
          why: 'The file stores the formula; the application decides how to evaluate it. That is why sharing across versions needs a test open.',
        },
      ],
    },
  ],
  takeaway:
    'Learn references, sorting and filtering, validation and sharing controls — they are the same ideas in either application. Treat a shared link as a data-sharing decision, because a read-only copy still shows everything in it.',
}
