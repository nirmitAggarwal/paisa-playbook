import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-125: a formula is a sentence about cells. */

export const l5_125: Chapter = {
  id: 'l5-125',
  title: 'Formulas',
  subtitle: 'Write formulas that stay correct when data changes, and know the reference types that break them.',
  minutes: 10,
  blocks: [
    scene(
      'reference-types',
      'The same formula, copied down. The only difference is the two dollar signs.',
    ),
    {
      kind: 'p',
      text: 'A formula is a sentence about cells, and like any sentence it can be true today and false tomorrow. What makes the difference is not the arithmetic — addition does not change — but which cells the formula is pointing at. A spreadsheet stores a formula relative to where it sits, so the address you see is not the address the cell will use after it is copied. Understanding that one fact prevents most of the wrong numbers a personal workbook will ever produce.',
    },
    { kind: 'h', text: 'The four reference types' },
    {
      kind: 'table',
      caption: 'What each anchor does when the formula is copied',
      headers: ['Written as', 'Name', 'What moves when copied'],
      rows: [
        ['B4', 'Relative', 'Both the column and the row move with the formula'],
        ['$B$4', 'Absolute', 'Nothing moves: every copy reads the same cell'],
        ['B$4', 'Mixed, row locked', 'The column moves, the row stays on 4'],
        ['$B4', 'Mixed, column locked', 'The row moves, the column stays on B'],
      ],
    },
    {
      kind: 'p',
      text: 'The practical rule is narrower than the table. One number belongs to the whole sheet — a tax rate, a fee percentage, a discount — and everything else varies row by row. Anchor the sheet-wide number with $ signs and leave the row-by-row references relative. A fee of 1.2% in B1, multiplied into four fund amounts, needs $B$1 in every row; the amount beside it must stay relative, or all four rows will read the same fund.',
    },
    { kind: 'h', text: 'Order of operations, and why brackets are not optional' },
    {
      kind: 'formula',
      label: 'A percentage of a difference',
      expr: '=ROUND((B2-B3)/B2*100, 1)',
      note: 'The brackets decide that the subtraction happens before the division. Without them, B3 is divided first and the answer is nonsense that still looks like a percentage.',
    },
    {
      kind: 'p',
      text: 'Spreadsheets follow the arithmetic you learnt at school: brackets first, then exponents, then multiplication and division, then addition and subtraction. The dangerous part is that a wrong order rarely produces an error. It produces a plausible number, which then gets copied into a decision. When a formula mixes a subtraction with a division or a percentage, write the brackets even when they are technically unnecessary — they document the intent to whoever reads the cell next, including you in six months.',
    },
    { kind: 'h', text: 'Circular references, and the errors that are not errors' },
    {
      kind: 'list',
      items: [
        'A circular reference is a formula that depends on its own result — directly, or through a chain of other cells. The application cannot evaluate it and reports a circular reference; the fix is to break the loop, not to raise the iteration limit.',
        '#REF! means a referenced cell was deleted or moved out of range. The formula is intact and the target is gone.',
        '#VALUE! means the formula expected a number and got text. The usual cause is a figure stored as text, or a stray note in a numeric column.',
        '#DIV/0! means a denominator is zero or empty. In a saved workbook, wrap the division in a check rather than leaving an error on the summary.',
        '#NAME? means the function or a named range does not exist in this application or version — often a newer function opened in an older file.',
      ],
    },
    {
      kind: 'example',
      title: 'One rate, four rows, two outcomes',
      text: 'A fee rate of 1.2% sits in B1. In row 4 the formula is =ROUND(B4*$B$1/100,0): copying it down keeps the rate pinned and moves the amount, so the four fees are ₹3,000, ₹4,800, ₹1,800 and ₹2,400. Copy the same formula without the dollars and row 5 reads B2 instead of B1 — an empty cell, a fee of zero, and a total that is still a number. Nothing warns you. The only defence is checking one copied cell against the row above it.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Readability is a correctness feature',
      text: 'A formula nobody can read is a formula nobody will check. Three habits keep one readable: keep the arithmetic short enough to say out loud, move intermediate results into their own labelled column instead of nesting them, and use named ranges for sheet-wide constants so the formula says FeeRate rather than $B$1. Excel and Sheets both support LET for naming intermediate values inside a formula, but not every file you will inherit does — a helper column works everywhere and can be inspected.',
    },
    sim(
      'sheet',
      'Write the fee formula once, anchor the rate, copy it down four funds, and check the total against the assets it is charged on.',
    ),
    l5Illustrative(
      'The funds, amounts and fee rate in the lab are invented. The anchors, the copy behaviour and the reconciliation are the lesson.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Relative reference',
          meaning: 'An address such as B4 that moves with the formula when it is copied. Correct for data that changes row by row.',
        },
        {
          term: 'Absolute reference',
          meaning: 'An address such as $B$1 that stays fixed in every copy. Correct for a rate or constant that belongs to the whole sheet.',
        },
        {
          term: 'Circular reference',
          meaning: 'A formula that depends, directly or through other cells, on its own result. The calculation cannot resolve and the cell reports the loop.',
        },
        {
          term: 'Error value',
          meaning: 'A cell result such as #REF!, #VALUE!, #DIV/0! or #NAME? that names a specific kind of broken reference rather than showing a number.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the downloadable Excel utilities are a working example of anchored rates and protected input cells, and are the kind of file a formula has to survive',
    ]),
  ],
  quiz: [
    {
      q: 'A fee rate sits in B1 and applies to every row. Which formula, copied down from row 4, keeps reading that rate?',
      options: [
        {
          text: '=ROUND(B4*$B$1/100,0)',
          correct: true,
          why: 'The $B$1 anchor keeps the rate fixed while B4 moves down the amount column, which is exactly the split you want.',
        },
        {
          text: '=ROUND(B4*B1/100,0)',
          why: 'Relative references move together. In row 5 this reads B5 and B2, so the rate is taken from an empty cell and the fee becomes zero.',
        },
        {
          text: '=ROUND(B$4*$B1/100,0)',
          why: 'The row anchor on B$4 pins every copy to the first fund amount, so all four rows charge a fee on ₹2,50,000. The rate is right and the amount is wrong.',
        },
        {
          text: '=ROUND(B4*$B1,0)',
          why: 'The rate is stored as 1.2, not 0.012, so leaving out the division by 100 multiplies the amount by 1.2 instead of taking 1.2% of it.',
        },
      ],
    },
    {
      q: 'A cell shows #VALUE!. What is the most likely cause?',
      options: [
        {
          text: 'The formula is doing arithmetic on a cell that holds text',
          correct: true,
          why: 'A number stored as text, or a note left in a numeric column, makes an arithmetic operation impossible. The answer is to fix the cell, not the formula.',
        },
        {
          text: 'A referenced cell was deleted',
          why: 'A deleted reference produces #REF!, which names the broken address. #VALUE! is about the type of a value that still exists.',
        },
        {
          text: 'The formula refers to itself',
          why: 'A self-reference is a circular reference, reported as such. #VALUE! is a type mismatch.',
        },
        {
          text: 'The function does not exist in this version',
          why: 'An unknown function produces #NAME?, not #VALUE!.',
        },
      ],
    },
    {
      q: 'Why is a circular reference a problem rather than something to allow?',
      options: [
        {
          text: 'The result depends on itself, so there is no value to calculate without an arbitrary starting guess',
          correct: true,
          why: 'A formula that reads its own output has no fixed point unless one is imposed. The spreadsheet refuses rather than inventing one.',
        },
        {
          text: 'It makes the file larger',
          why: 'File size is not the issue. The calculation cannot be resolved, which is a correctness problem.',
        },
        {
          text: 'It always produces a zero',
          why: 'The application reports the loop and may show 0 as a placeholder, but the cell has no valid result at all.',
        },
        {
          text: 'It only matters in shared files',
          why: 'A circular reference is a property of the formulas, not of who can open the file.',
        },
      ],
    },
    {
      q: 'Which habit most reduces the chance of a copied formula going wrong?',
      options: [
        {
          text: 'Check one copied cell against the row above it and confirm it points where you expect',
          correct: true,
          why: 'Copy errors are silent. Reading one copy, and looking at which cells it highlights, catches the anchor mistake before it reaches a total.',
        },
        {
          text: 'Use the same formula in every row of the workbook',
          why: 'Different columns need different references. Uniformity is not the goal; the right anchors are.',
        },
        {
          text: 'Avoid copying formulas and retype each one',
          why: 'Retyping guarantees inconsistency and multiplies the chances of a typo. One correct formula, copied, is safer.',
        },
        {
          text: 'Round every result so small differences disappear',
          why: 'Rounding hides the symptom in the displayed value while the underlying error keeps growing.',
        },
      ],
    },
  ],
  takeaway:
    'Anchor what belongs to the whole sheet, leave row-by-row references relative, bracket the arithmetic so the order is explicit, and read one copied cell before you trust the column.',
}
