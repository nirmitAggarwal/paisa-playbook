import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-126: a total is a claim about a range. */

export const l5_126: Chapter = {
  id: 'l5-126',
  title: 'SUM',
  subtitle: 'Total ranges correctly, including the hidden traps of text, blanks and duplicated rows.',
  minutes: 8,
  blocks: [
    scene(
      'sum-traps',
      'A column of ten expenses. SUM adds nine of them, and one of the nine is entered twice.',
    ),
    {
      kind: 'p',
      text: 'SUM is the first function anyone learns and the one that causes the most quiet errors, because it almost never fails. It returns a number for text, for blanks, for duplicated rows, for a range that stops one row short. That number looks exactly like a correct total. The skill is not writing =SUM(B2:B11); it is knowing what the range contains before you believe the result.',
    },
    { kind: 'h', text: 'What SUM actually does' },
    {
      kind: 'p',
      text: 'SUM adds the numeric cells in a range and ignores everything else. Text is skipped, blanks are skipped, and a number stored as text is skipped too — even though it looks identical to a number on screen. This is not a bug; it is how the function is defined. But it means the total answers the question “what do the numbers in this range add up to”, which is not always the same as “what did I spend”.',
    },
    {
      kind: 'table',
      caption: 'Three ways a total goes wrong without an error',
      headers: ['Trap', 'What it looks like', 'How to catch it'],
      rows: [
        ['A number stored as text', '“1980 pending” or a figure pasted from a PDF, left-aligned in the column', 'Compare COUNT with COUNTA: the gap is the number of non-numeric entries'],
        ['A duplicated row', 'The same bill entered twice, usually the same day and amount', 'Sort by amount and date and look for adjacent identical pairs, or count rows per vendor per month'],
        ['A range that misses rows', 'The total is right for last month and short by two rows this month', 'Use a whole-column range or an Excel Table, so new rows are inside the range by construction'],
      ],
    },
    {
      kind: 'formula',
      label: 'The reconciliation, in two cells',
      expr: 'COUNT(B2:B11) versus COUNTA(B2:B11)',
      note: 'Nine numeric cells and ten non-empty cells means one entry is text. That single comparison finds the most common cause of a total that is quietly too low.',
    },
    {
      kind: 'p',
      text: 'Blanks deserve a separate warning. A blank in an amount column might mean zero, might mean “not paid yet”, and might mean “I forgot to enter it”. SUM treats all three the same way, and a month that is genuinely incomplete totals exactly like a month that is complete. If the difference matters, count the rows as well as summing them: a count that is lower than expected is the signal that the total is describing an incomplete month.',
    },
    { kind: 'h', text: 'Cross-sheet totals and the case for one log' },
    {
      kind: 'list',
      items: [
        'A total built from twelve monthly tabs is a chain of assumptions: that each tab exists, that each has the same layout, and that the range on each covers the right rows. One missing tab silently reduces the year.',
        'A single transaction log with a month column needs one SUMIF, survives a new month being added as rows rather than as a tab, and can be checked by counting rows per month.',
        'If you do keep monthly tabs, add a control row that counts the tabs and compares it with the number of months you expect. A year with eleven months is a finding, not a rounding difference.',
      ],
    },
    {
      kind: 'example',
      title: 'The month that cost ₹62,739 and totalled ₹60,759',
      text: 'Ten expenses are entered. Nine are numbers; the electricity bill was typed as “1980 pending”, so SUM skips it. Two doctor visits are the same ₹1,500 bill entered twice, so SUM adds it twice. The total, ₹60,759, is wrong in both directions at once: it is ₹1,980 too low and ₹1,500 too high. COUNT returns 9 and COUNTA returns 10, which is the clue; correcting the text and removing the duplicate produces ₹62,739.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A total is an answer, not evidence',
      text: 'The number at the bottom of a column feels like proof because it is precise. It is only as good as the range behind it. Two habits turn it into evidence: reconcile it against an independent count, and reconcile it against a second source — the bank statement, the card statement, the closing balance. When two independent methods agree, you have a fact; when only the sheet agrees with itself, you have a formula.',
    },
    sim(
      'sheet',
      'A column with a text entry and a duplicate. Total it, count what SUM counted, and reconcile the gap before you believe the month.',
    ),
    l5Illustrative(
      'The expenses, the amounts and the duplicate in the lab are invented. COUNT versus COUNTA and the reconciliation habit are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Text stored number',
          meaning: 'A figure entered or pasted as text. It looks numeric on screen and is skipped by SUM, AVERAGE and COUNT.',
        },
        {
          term: 'COUNTA',
          meaning: 'Counts every non-empty cell in a range, including text and errors. Compared with COUNT, it reveals how many entries are not numbers.',
        },
        {
          term: 'Duplicate row',
          meaning: 'The same transaction entered twice. SUM has no way to detect intent, so the duplicate is simply added.',
        },
        {
          term: 'Reconciliation',
          meaning: 'Proving two independent records of the same thing agree, and locating the line where they do not.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the utility sheets and schedules show how an official total is built and checked, and why a range that misses a row is treated as an error rather than a rounding difference',
    ]),
  ],
  quiz: [
    {
      q: 'A column of ten expenses returns a SUM of ₹60,759, but COUNT is 9 and COUNTA is 10. What have you learnt?',
      options: [
        {
          text: 'One entry is not a number, so SUM skipped it',
          correct: true,
          why: 'COUNTA counts cells that hold anything; COUNT counts only numeric cells. The difference of one is a text entry hiding inside the column.',
        },
        {
          text: 'One cell is empty',
          why: 'An empty cell would reduce both COUNT and COUNTA. The gap between them is specifically about type, not presence.',
        },
        {
          text: 'The range includes a header row',
          why: 'A header in the range would count once in COUNTA and not in COUNT, but it would also be visible at the top. Check the address before concluding.',
        },
        {
          text: 'The total is correct and the counts are wrong',
          why: 'Both counts are behaving as defined. The total is the one that has silently left a value out.',
        },
      ],
    },
    {
      q: 'Why does a duplicated row survive every check except a deliberate one?',
      options: [
        {
          text: 'SUM has no way to know two identical entries are the same transaction, so it adds both',
          correct: true,
          why: 'The function adds values. Detecting intent requires a separate check — by date and vendor, or a count of rows per month.',
        },
        {
          text: 'Duplicates are removed automatically when the sheet is saved',
          why: 'Nothing removes rows without being asked. A save changes the file, not the data.',
        },
        {
          text: 'Duplicates only affect the count, not the total',
          why: 'A duplicate is a real numeric cell, so it is added to the total as well as counted.',
        },
        {
          text: 'SUM detects duplicates and returns a warning',
          why: 'SUM returns a number. It has no concept of a duplicate transaction.',
        },
      ],
    },
    {
      q: 'Why is a blank cell in an amount column more dangerous than a zero?',
      options: [
        {
          text: 'A zero is a statement that nothing was spent; a blank may mean unpaid, forgotten or not applicable',
          correct: true,
          why: 'SUM treats both the same, but the month means something different. Counting the rows distinguishes an incomplete month from a cheap one.',
        },
        {
          text: 'A blank makes the formula return an error',
          why: 'SUM skips blanks without complaint. That silence is precisely the problem.',
        },
        {
          text: 'A blank is counted by SUM as zero and by COUNT as one',
          why: 'COUNT does not count blanks. The issue is interpretation, not the arithmetic.',
        },
        {
          text: 'A zero cannot be entered in a currency-formatted cell',
          why: 'Zero is a valid number in any numeric format. The difference is what the number claims.',
        },
      ],
    },
    {
      q: 'What is the strongest check on a total before you act on it?',
      options: [
        {
          text: 'Reconcile it against an independent record and against a row count',
          correct: true,
          why: 'A count catches entries SUM skipped, and a second source catches entries that were never entered. Together they test the range and the data, not just the arithmetic.',
        },
        {
          text: 'Format the total in bold so it stands out',
          why: 'Formatting changes how the number looks, not whether it is right.',
        },
        {
          text: 'Round it to the nearest thousand so small errors disappear',
          why: 'Rounding conceals errors of exactly the size that matter in a household budget.',
        },
        {
          text: 'Check that the formula contains the whole column address',
          why: 'A whole-column range is a good habit, but it cannot tell you whether the rows inside it are complete or duplicated.',
        },
      ],
    },
  ],
  takeaway:
    'SUM adds numbers and silently skips everything else. Compare COUNT with COUNTA, look for duplicated rows, make sure the range covers every row, and reconcile the total against a second record before trusting it.',
}
