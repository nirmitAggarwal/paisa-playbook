import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-129: find the row, then bring back one value. */

export const l5_129: Chapter = {
  id: 'l5-129',
  title: 'XLOOKUP',
  subtitle: 'Look up values across sheets reliably, including when the lookup fails and needs a fallback.',
  minutes: 9,
  blocks: [
    scene(
      'lookup-line',
      'A key found in the identifier column, and one that is not there at all.',
    ),
    {
      kind: 'p',
      text: 'Most money work involves the same shape of problem: you have an identifier and you need a value that belongs to it. A folio code and its balance. An invoice number and its amount. A month name and its budget. This is a lookup, and for twenty years the standard answer was VLOOKUP, a function that works well until the day a column is inserted and every result silently shifts one column to the right.',
    },
    {
      kind: 'formula',
      label: 'The shape of an XLOOKUP',
      expr: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
      note: 'The value you have, the column you expect to find it in, and the column you want back. The fourth argument is optional and is the one that saves a report.',
    },
    { kind: 'h', text: 'Exact by default, which is the change that matters' },
    {
      kind: 'p',
      text: 'VLOOKUP defaults to approximate matching and relies on a sorted column; the default has caused more wrong numbers than almost any other spreadsheet feature. XLOOKUP defaults to exact matching. For an identifier — a code, an account number, an invoice — exact is the only sensible mode, and getting it by default removes a whole category of error. Approximate matching still exists for the cases where it is correct: tax slabs, grade bands, discount tiers, where the nearest lower threshold is the intended answer and the threshold column is sorted.',
    },
    {
      kind: 'table',
      caption: 'What each argument is for, and what goes wrong when it is wrong',
      headers: ['Argument', 'What it does', 'Failure if wrong'],
      rows: [
        ['lookup_value', 'The key you are searching for', 'A key with a trailing space or a different case never matches, and returns the fallback'],
        ['lookup_array', 'The column that should contain the key', 'Searching the value column for a code returns nothing, or the wrong row'],
        ['return_array', 'The column the answer comes from', 'The most common error: the right row, the wrong column'],
        ['if_not_found', 'What to return when the key is absent', 'Without it the cell shows #N/A, which breaks any total that includes it'],
        ['match_mode', 'Exact, exact-or-next-smaller, exact-or-next-larger, or wildcard', 'Approximate on an unsorted identifier column returns a different record, confidently'],
      ],
    },
    {
      kind: 'p',
      text: 'The return array is the argument to check twice. A lookup that finds the right row and returns the wrong column produces a number of exactly the expected shape — a balance, a date, an amount — and there is nothing in the cell to suggest it belongs to somebody else. Reading the header of the returned column, once, is the whole control.',
    },
    { kind: 'h', text: 'The miss is the part people forget' },
    {
      kind: 'list',
      items: [
        'Without a fallback, a missing key returns #N/A. That is honest, and it will also break every SUM that includes the cell.',
        'A fallback of 0 is often worse than #N/A, because a missing balance becomes a real-looking zero in a total. Prefer a text fallback such as "Not on file", or count the misses separately.',
        'Wrap the result in IFNA or test it with COUNTIF when the answer feeds a calculation, so a miss is visible before it is aggregated.',
        'A duplicate key returns the first match. If the source can contain duplicates, the lookup is answering a question the data has not settled.',
      ],
    },
    {
      kind: 'example',
      title: 'One code in, one balance out',
      text: 'A folio table holds four codes. Asking for FOL-418 returns ₹2,10,400 from the value column; asking for FOL-509 returns ₹64,200 and the status Closed, which is the kind of second fact that changes what you do with the number. Asking for FOL-777, which is not in the table, returns #N/A without a fallback and "Not on file" with one. The formula is identical in all three cases; only the key changes.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why XLOOKUP replaces the old habits',
      text: 'VLOOKUP can only look to the right of the key and counts columns by number, so inserting a column breaks it. INDEX with MATCH fixed the direction problem but still needs two functions and two ranges. XLOOKUP takes the two columns directly, so inserting a column between them changes nothing. Where a file must open in an older version, INDEX with MATCH remains the portable answer — and the discipline of naming the return column is the same in both.',
    },
    sim(
      'l5-lookup-builder',
      'Resolve a folio code across columns, then ask what a missing key should return and why approximate matching is the wrong mode for an identifier.',
    ),
    l5Illustrative(
      'The folio codes, holders and balances in the lab are invented. The argument order, the exact-match default and the fallback decision are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Lookup value',
          meaning: 'The key you already have — a code, an invoice number, a month name — that you want to resolve to something else.',
        },
        {
          term: 'Return array',
          meaning: 'The column the answer comes from. It must be the same height as the lookup array.',
        },
        {
          term: 'Match mode',
          meaning: 'Whether the match must be exact, or may be the nearest smaller or larger value. Exact is the default and the right choice for identifiers.',
        },
        {
          term: 'Fallback',
          meaning: 'The value returned when no match is found, supplied as the fourth argument. It keeps a miss visible without breaking every total that reads the cell.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the utilities match PAN, assessment year and schedule codes across sheets, which is exactly the lookup shape this chapter describes',
    ]),
  ],
  quiz: [
    {
      q: 'You want the balance for folio FOL-418, with codes in A2:A5 and balances in C2:C5. Which formula is right?',
      options: [
        {
          text: '=XLOOKUP("FOL-418", A2:A5, C2:C5)',
          correct: true,
          why: 'The key, the column that holds keys, and the column that holds the answer. Exact matching is the default.',
        },
        {
          text: '=XLOOKUP("FOL-418", C2:C5, A2:A5)',
          why: 'The columns are swapped: this searches balances for the text of a code and returns a code. It finds nothing.',
        },
        {
          text: '=XLOOKUP(C2:C5, "FOL-418", A2:A5)',
          why: 'A lookup array cannot be a range of answers and a lookup value cannot be a range either. The arguments are in the wrong roles.',
        },
        {
          text: '=XLOOKUP("FOL-418", A2:A5, C2:C5, , 1)',
          why: 'A match mode of 1 asks for the nearest smaller value. Codes are not a sorted scale, so a near match is a different folio.',
        },
      ],
    },
    {
      q: 'What does the fourth argument of XLOOKUP do?',
      options: [
        {
          text: 'It supplies the value returned when no match is found',
          correct: true,
          why: 'A fallback such as "Not on file" keeps the sheet readable. Without it, a miss shows #N/A and can break a total.',
        },
        {
          text: 'It chooses between exact and approximate matching',
          why: 'That is the fifth argument. The fourth is only about what to return when the key is missing.',
        },
        {
          text: 'It limits the search to the first N rows',
          why: 'There is no row limit argument. The lookup array defines the search space.',
        },
        {
          text: 'It formats the returned value as text or as a number',
          why: 'Formatting is a cell property. The function returns a value, not a presentation of one.',
        },
      ],
    },
    {
      q: 'Why is approximate matching inappropriate for an account code?',
      options: [
        {
          text: 'A code is an identifier, so the nearest code belongs to a different account, not to the same one',
          correct: true,
          why: 'Approximate matching is for brackets where the nearest lower threshold is intended. For identifiers it returns a wrong record with no error.',
        },
        {
          text: 'It is slower than exact matching',
          why: 'Speed is not the issue. The returned row is simply the wrong one.',
        },
        {
          text: 'It cannot return a number',
          why: 'It returns whatever the return column holds, including numbers. The problem is which row it lands on.',
        },
        {
          text: 'It requires the lookup column to be text',
          why: 'Approximate matching needs a sorted column of comparable values. The suitability depends on what the values mean, not their type.',
        },
      ],
    },
    {
      q: 'A lookup finds the right row but returns the amount instead of the balance. What went wrong?',
      options: [
        {
          text: 'The return array points at the wrong column',
          correct: true,
          why: 'The row was resolved correctly; the column was not. Reading the header of the return column is the check that catches it.',
        },
        {
          text: 'The lookup value has a trailing space',
          why: 'A bad key returns no match or a fallback. It cannot return a different column of the right row.',
        },
        {
          text: 'The match mode is approximate',
          why: 'An approximate match would land on a different row, not a different column of the same row.',
        },
        {
          text: 'The source table has duplicate keys',
          why: 'Duplicates would return the first matching row, which may be the wrong record, but the column would still be the one named.',
        },
      ],
    },
  ],
  takeaway:
    'Look up with the key column, return from a named column, keep exact matching, and decide on purpose what a missing key should show — then check the return column header once, because a wrong column returns a perfectly plausible number.',
}
