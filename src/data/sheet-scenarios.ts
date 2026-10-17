import type { Sheet } from '../lib/sheet'

/**
 * Chapter-specific datasets and assignments for the spreadsheet lab.
 *
 * The lab used to show the same monthly budget in every chapter that used it.
 * Each entry here gives one chapter its own sheet, its own data, its own
 * numbered assignment and the formula vocabulary that chapter actually teaches.
 *
 * `solution` is not shown to the learner — it exists so `npm run test:sheet`
 * can prove that every `expect` value below is genuinely reachable from the
 * starter data, and that no task cell is pre-filled.
 */
export type SheetTask = {
  /** Cell the learner must fill in. */
  cell: string
  /** The question, in the chapter's language. */
  ask: string
  /** Formula that produces the answer. */
  hint: string
  /** Value the finished cell must hold. */
  expect: number
}

export type SheetScenario = {
  /** Title of the sheet, shown above the grid. */
  title: string
  /** Why this sheet belongs to this chapter. */
  brief: string
  /** The numbered assignment. */
  steps: string[]
  /** Starting cells: raw data, with the answer cells deliberately empty. */
  starter: Sheet
  /** What the learner has to produce. */
  tasks: SheetTask[]
  /** The intended answers, used only by the unit tests. */
  solution: Sheet
  /** Formula cheat sheet for this lesson. */
  reference: [string, string][]
  /** What the finished numbers mean. */
  debrief: string
}

export const sheetScenarios: Record<string, SheetScenario> = {
  'l1-012': {
    title: 'Salary slip builder: CTC to in-hand',
    brief:
      'A CTC of ₹12 lakh is not ₹12 lakh of take-home. Build the slip line by line and find out what actually reaches a bank account.',
    steps: [
      'Read the components in column B. The CTC is split into basic pay, HRA, a special allowance and the employer PF contribution.',
      'Employee PF is 12% of basic pay. Write it in G2 using a percentage of a cell, not a typed number.',
      'Add up every deduction — PF, professional tax and income tax — in G3.',
      'Take-home is the salary you are actually paid (basic + HRA + special allowance) minus those deductions. Compute it in G4.',
      'Divide by 12 for the monthly in-hand figure (G5), then express take-home as a percentage of CTC (G6).',
    ],
    starter: {
      A1: 'Component', B1: 'Annual ₹',
      A2: 'CTC', B2: '1200000',
      A3: 'Basic pay (50% of CTC)', B3: '600000',
      A4: 'HRA (20% of CTC)', B4: '240000',
      A5: 'Special allowance', B5: '288000',
      A6: 'Employer PF (12% of basic)', B6: '72000',
      D1: 'Deduction', E1: 'Annual ₹',
      D2: 'Employee PF (12% of basic)', E2: '72000',
      D3: 'Professional tax', E3: '2400',
      D4: 'Income tax', E4: '90000',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Employee PF from basic', 
      F3: 'Total deductions',
      F4: 'Annual take-home',
      F5: 'Monthly in-hand',
      F6: 'Take-home as % of CTC',
    },
    tasks: [
      { cell: 'G2', ask: 'Employee PF, which is 12% of basic pay', hint: '=B3*12/100', expect: 72000 },
      { cell: 'G3', ask: 'Every deduction added up', hint: '=G2+E3+E4', expect: 164400 },
      { cell: 'G4', ask: 'What is actually paid out: salary minus deductions', hint: '=B3+B4+B5-G3', expect: 963600 },
      { cell: 'G5', ask: 'Monthly in-hand, rounded to the rupee', hint: '=ROUND(G4/12,0)', expect: 80300 },
      { cell: 'G6', ask: 'Take-home as a percentage of CTC, one decimal', hint: '=ROUND((G4/B2)*100,1)', expect: 80.3 },
    ],
    solution: { G2: '=B3*12/100', G3: '=G2+E3+E4', G4: '=B3+B4+B5-G3', G5: '=ROUND(G4/12,0)', G6: '=ROUND((G4/B2)*100,1)' },
    reference: [
      ['=B3*12/100', 'a percentage of another cell'],
      ['=ROUND(x,0)', 'round to whole rupees'],
      ['=B3+B4+B5-G3', 'add cells, then subtract a total'],
      ['=SUM(E2:E4)', 'add a whole range instead of naming cells'],
    ],
    debrief:
      'About 80% of CTC reaches your account here, and the 20% that does not is not a loss — it includes pension and tax. The gap between the number you are offered and the number you can spend is the first thing to check in any offer letter.',
  },

  'l1-023': {
    title: 'Income vs expenses: your real monthly number',
    brief:
      'Every rupee is either money in or money out. Split this month both ways and find the single number that says whether the month worked.',
    steps: [
      'Column C holds the amounts and column B says whether each line is Income or Expense.',
      'Column D is the second lens: is the expense fixed or does it vary month to month?',
      'Total income in G2 and total expenses in G3 with SUMIF, so the totals react if you edit a row.',
      'Surplus in G4, then the saving rate as a percentage in G5.',
      'Add up just the fixed expenses in G6 — that is your floor, the amount you must earn before anything flexible happens.',
    ],
    starter: {
      A1: 'Item', B1: 'Type', C1: 'Amount ₹', D1: 'Fixed / Variable',
      A2: 'Salary', B2: 'Income', C2: '65000',
      A3: 'Freelance project', B3: 'Income', C3: '12000',
      A4: 'Dividend', B4: 'Income', C4: '1500',
      A5: 'Rent', B5: 'Expense', C5: '18000', D5: 'Fixed',
      A6: 'Groceries', B6: 'Expense', C6: '9500', D6: 'Variable',
      A7: 'Transport', B7: 'Expense', C7: '4200', D7: 'Variable',
      A8: 'Eating out', B8: 'Expense', C8: '6800', D8: 'Variable',
      A9: 'EMI', B9: 'Expense', C9: '14500', D9: 'Fixed',
      A10: 'Utilities', B10: 'Expense', C10: '3100', D10: 'Variable',
      F1: 'Answer', G1: 'Value',
      F2: 'Total income',
      F3: 'Total expenses',
      F4: 'Surplus this month',
      F5: 'Saving rate %',
      F6: 'Fixed expenses',
    },
    tasks: [
      { cell: 'G2', ask: 'All income, wherever it came from', hint: '=SUMIF(B2:B10,"Income",C2:C10)', expect: 78500 },
      { cell: 'G3', ask: 'All expenses', hint: '=SUMIF(B2:B10,"Expense",C2:C10)', expect: 56100 },
      { cell: 'G4', ask: 'What is left over', hint: '=G2-G3', expect: 22400 },
      { cell: 'G5', ask: 'Surplus as a percentage of income, one decimal', hint: '=ROUND((G4/G2)*100,1)', expect: 28.5 },
      { cell: 'G6', ask: 'The expenses you cannot avoid next month', hint: '=SUMIF(D2:D10,"Fixed",C2:C10)', expect: 32500 },
    ],
    solution: { G2: '=SUMIF(B2:B10,"Income",C2:C10)', G3: '=SUMIF(B2:B10,"Expense",C2:C10)', G4: '=G2-G3', G5: '=ROUND((G4/G2)*100,1)', G6: '=SUMIF(D2:D10,"Fixed",C2:C10)' },
    reference: [
      ['=SUMIF(B2:B10,"Income",C2:C10)', 'add a range only where another column matches'],
      ['=SUM(C2:C10)', 'add everything in a column'],
      ['=G2-G3', 'the surplus line'],
      ['=ROUND(x,1)', 'one decimal place'],
    ],
    debrief:
      'A 28.5% saving rate is healthy, but ₹32,500 of it is fixed cost. That number is what you must cover even in a bad month, which is exactly why the emergency fund is measured in months of fixed expenses rather than income.',
  },

  'l1-032': {
    title: 'Interest earned vs interest paid',
    brief:
      'Interest is the price of money and it is charged both ways. Put your deposits and your debts in one sheet and see which side is winning.',
    steps: [
      'Each row is one account or loan, with its principal, rate and whether it earns or pays interest.',
      'Column E is interest for a full year at the stated rate. Build it once in E2 and copy the formula down.',
      'Total interest earned in G2 and interest paid in G3, using the Type column.',
      'Net interest in G4 tells you whether your money is working for you or against you.',
      'In G5, find the highest interest rate on the sheet with MAX — that is your most expensive money.',
    ],
    starter: {
      A1: 'Account', B1: 'Type', C1: 'Principal ₹', D1: 'Rate %', E1: 'Interest ₹',
      A2: 'Savings account', B2: 'Earns', C2: '85000', D2: '3',
      A3: 'FD, 1 year', B3: 'Earns', C3: '300000', D3: '7',
      A4: 'Recurring deposit', B4: 'Earns', C4: '120000', D4: '6.5',
      A5: 'Home loan', B5: 'Pays', C5: '2400000', D5: '8.6',
      A6: 'Credit card, unpaid', B6: 'Pays', C6: '45000', D6: '42',
      A7: 'Personal loan', B7: 'Pays', C7: '180000', D7: '15',
      F1: 'Answer', G1: 'Value',
      F2: 'Interest earned (1 year)',
      F3: 'Interest paid (1 year)',
      F4: 'Net interest',
      F5: 'Highest rate on the sheet',
    },
    tasks: [
      { cell: 'E2', ask: 'One year of interest on the savings account', hint: '=C2*D2/100', expect: 2550 },
      { cell: 'G2', ask: 'Everything you earn in a year', hint: '=SUMIF(B2:B7,"Earns",E2:E7)', expect: 31350 },
      { cell: 'G3', ask: 'Everything the lenders earn from you', hint: '=SUMIF(B2:B7,"Pays",E2:E7)', expect: 252300 },
      { cell: 'G4', ask: 'Which side is winning', hint: '=G2-G3', expect: -220950 },
      { cell: 'G5', ask: 'The most expensive money in the list', hint: '=MAX(D2:D7)', expect: 42 },
    ],
    solution: { E2: '=C2*D2/100', E3: '=C3*D3/100', E4: '=C4*D4/100', E5: '=C5*D5/100', E6: '=C6*D6/100', E7: '=C7*D7/100', G2: '=SUMIF(B2:B7,"Earns",E2:E7)', G3: '=SUMIF(B2:B7,"Pays",E2:E7)', G4: '=G2-G3', G5: '=MAX(D2:D7)' },
    reference: [
      ['=C2*D2/100', 'simple interest for one year'],
      ['=SUMIF(B2:B7,"Earns",E2:E7)', 'total a category'],
      ['=G2-G3', 'net interest, which can be negative'],
      ['=MAX(D2:D7) / =MIN(D2:D7)', 'highest and lowest values'],
    ],
    debrief:
      'You earn ₹31,350 of interest and pay ₹2,52,300 — a gap of over ₹2.2 lakh a year. The credit card alone costs ₹18,900, more than all your savings accounts and deposits earn together. Clearing the highest-rate debt first is arithmetic, not sacrifice.',
  },

  'l1-033': {
    title: 'Simple vs compound interest, year by year',
    brief:
      'Simple interest grows in a straight line; compound interest grows on its own interest. Build both columns and compare the same principal at the same rate.',
    steps: [
      'The principal sits in G1 and the rate in G2. Do not type numbers into the columns — reference those cells.',
      'Column B is simple interest, which earns the same amount every year.',
      'Column C is compound interest. Each year earns on the principal plus everything earned before it.',
      'Fill in G4 and G5 for the five-year totals, then G6 for the difference between the two methods.',
      'Finish with G7, the rule-of-72 estimate of how long this rate takes to double your money.',
    ],
    starter: {
      A1: 'Year', B1: 'Simple, cumulative ₹', C1: 'Compound, cumulative ₹',
      A2: '1', A3: '2', A4: '3', A5: '4', A6: '5',
      F1: 'Principal ₹', G1: '100000',
      F2: 'Rate %', G2: '10',
      F3: 'Answer', G3: 'Value',
      F4: 'Simple interest after 5 years',
      F5: 'Compound interest after 5 years',
      F6: 'Extra earned by compounding',
      F7: 'Years to double (rule of 72)',
    },
    tasks: [
      { cell: 'B2', ask: 'Simple interest after year 1', hint: '=G1*G2/100', expect: 10000 },
      { cell: 'C2', ask: 'Compound interest after year 1', hint: '=G1*G2/100', expect: 10000 },
      { cell: 'G4', ask: 'Simple interest after five years', hint: '=B6', expect: 50000 },
      { cell: 'G5', ask: 'Compound interest after five years', hint: '=C6', expect: 61051 },
      { cell: 'G6', ask: 'What compounding added on top', hint: '=G5-G4', expect: 11051 },
      { cell: 'G7', ask: 'Years to double, using 72 ÷ rate', hint: '=ROUND(72/G2,1)', expect: 7.2 },
    ],
    solution: {
      B2: '=G1*G2/100', B3: '=B2+G1*G2/100', B4: '=B3+G1*G2/100', B5: '=B4+G1*G2/100', B6: '=B5+G1*G2/100',
      C2: '=G1*G2/100', C3: '=C2+(G1+C2)*G2/100', C4: '=C3+(G1+C3)*G2/100', C5: '=C4+(G1+C4)*G2/100', C6: '=C5+(G1+C5)*G2/100',
      G4: '=B6', G5: '=C6', G6: '=G5-G4', G7: '=ROUND(72/G2,1)',
    },
    reference: [
      ['=G1*G2/100', 'one year of interest on a cell reference'],
      ['=C2+(G1+C2)*G2/100', 'interest on principal plus interest already earned'],
      ['=ROUND(72/G2,1)', 'the rule of 72: 72 divided by the rate'],
      ['=B6', 'point another cell at a column total'],
    ],
    debrief:
      'Over five years compounding adds ₹11,051 with nothing extra invested. The rate is the same and the principal is the same — the difference is entirely that compounding pays interest on interest, and it keeps widening with every year.',
  },

  'l1-040': {
    title: 'Digital payments: where the money went',
    brief:
      'UPI and cards feel frictionless, which is exactly why they need reconciling. Categorise one month of payments and find the spending that commits itself.',
    steps: [
      'Each row is a real-style payment: the mode is in column C and the amount in column D.',
      'Total UPI, card and auto-debit spending separately in G2, G3 and G4 using the Mode column.',
      'Add the whole month in G5 and count how many UPI payments you made in G6.',
      'Change one amount and watch every answer update — that is why the formulas use ranges, not typed totals.',
    ],
    starter: {
      A1: 'Day', B1: 'Paid to', C1: 'Mode', D1: 'Amount ₹',
      A2: '02', B2: 'Kirana ', C2: 'UPI', D2: '1450',
      A3: '02', B3: 'Cab', C3: 'UPI', D3: '230',
      A4: '05', B4: 'Electricity', C4: 'Auto-debit', D4: '1980',
      A5: '07', B5: 'Online order', C5: 'Card', D5: '1299',
      A6: '09', B6: 'Mobile recharge', C6: 'UPI', D6: '299',
      A7: '12', B7: 'OTT subscription', C7: 'Auto-debit', D7: '649',
      A8: '15', B8: 'Petrol', C8: 'Card', D8: '2200',
      A9: '19', B9: 'Restaurant', C9: 'Card', D9: '1640',
      A10: '24', B10: 'Gym', C10: 'Auto-debit', D10: '1200',
      A11: '29', B11: 'Pharmacy', C11: 'UPI', D11: '780',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Paid by UPI',
      F3: 'Paid by card',
      F4: 'Committed to auto-debits',
      F5: 'Total for the month',
      F6: 'Number of UPI payments',
    },
    tasks: [
      { cell: 'G2', ask: 'How much left the account by UPI', hint: '=SUMIF(C2:C11,"UPI",D2:D11)', expect: 2759 },
      { cell: 'G3', ask: 'Card spending', hint: '=SUMIF(C2:C11,"Card",D2:D11)', expect: 5139 },
      { cell: 'G4', ask: 'Money that leaves without a tap', hint: '=SUMIF(C2:C11,"Auto-debit",D2:D11)', expect: 3829 },
      { cell: 'G5', ask: 'The whole month', hint: '=SUM(D2:D11)', expect: 11727 },
      { cell: 'G6', ask: 'How many payments used UPI', hint: '=COUNTIF(C2:C11,"UPI")', expect: 4 },
    ],
    solution: { G2: '=SUMIF(C2:C11,"UPI",D2:D11)', G3: '=SUMIF(C2:C11,"Card",D2:D11)', G4: '=SUMIF(C2:C11,"Auto-debit",D2:D11)', G5: '=SUM(D2:D11)', G6: '=COUNTIF(C2:C11,"UPI")' },
    reference: [
      ['=SUM(D2:D11)', 'total a column of amounts'],
      ['=SUMIF(C2:C11,"UPI",D2:D11)', 'total one payment mode'],
      ['=COUNTIF(C2:C11,"UPI")', 'count matching rows, not amounts'],
      ['=AVERAGE(D2:D11)', 'typical payment size'],
    ],
    debrief:
      'UPI looks dominant because it is used most often, but cards cost more in total and auto-debits cost ₹3,829 without a single conscious decision. That is the real lesson of digital money: frequency is not the same as size.',
  },

  'l1-002': {
    title: 'How long each form of money has survived',
    brief:
      'Every form of money is an answer to a trust problem: shells, coins, notes, transfers, UPI. Age each one and see how recently the money you use daily actually arrived.',
    steps: [
      'Column B is the year each form of money first appeared in India, and G1 holds the current year.',
      'Column C is age in years. It is filled in for the first five rows — finish the row for UPI in C7 by subtracting its year from the year in G1.',
      'That one formula plus COUNTIF answers how many forms have survived more than two centuries.',
      'AVERAGE, MAX and MIN describe the set: mean age, oldest, newest.',
      'Finally, in G9, measure the gap in years between the earliest coins and UPI.',
    ],
    starter: {
      A1: 'Payment form', B1: 'First used (year)', C1: 'Age in years',
      A2: 'Cowrie shells as money', B2: '500', C2: '1526',
      A3: 'Silver rupee (rupaya)', B3: '1540', C3: '486',
      A4: 'First paper notes', B4: '1861', C4: '165',
      A5: 'Cheque clearing', B5: '1881', C5: '145',
      A6: 'Credit and debit cards', B6: '1980', C6: '46',
      A7: 'UPI', B7: '2016',
      F1: 'Year today', G1: '2026',
      F2: 'Answer', G2: 'Value',
      F3: 'Age of UPI',
      F4: 'Forms older than 200 years',
      F5: 'Average age of all six forms',
      F6: 'Oldest form, in years',
      F7: 'Newest form, in years',
      F8: 'First coins to UPI, in years',
    },
    tasks: [
      { cell: 'C7', ask: 'How old UPI is, measured against the year in G1', hint: '=G1-B7', expect: 10 },
      { cell: 'G4', ask: 'How many of the six forms have survived more than 200 years', hint: '=COUNTIF(C2:C7,">200")', expect: 2 },
      { cell: 'G5', ask: 'Average age of the six forms, rounded to whole years', hint: '=ROUND(AVERAGE(C2:C7),0)', expect: 396 },
      { cell: 'G6', ask: 'The oldest form, in years', hint: '=MAX(C2:C7)', expect: 1526 },
      { cell: 'G8', ask: 'Years between the earliest coins and UPI', hint: '=B7-B2', expect: 1516 },
    ],
    solution: { C7: '=G1-B7', G4: '=COUNTIF(C2:C7,">200")', G5: '=ROUND(AVERAGE(C2:C7),0)', G6: '=MAX(C2:C7)', G7: '=MIN(C2:C7)', G8: '=B7-B2' },
    reference: [
      ['=G1-B7', 'subtract one cell from another'],
      ['=COUNTIF(C2:C7,">200")', 'count values that clear a threshold'],
      ['=ROUND(AVERAGE(C2:C7),0)', 'mean, rounded'],
      ['=MAX(C2:C7)', 'the largest value in a range'],
    ],
    debrief:
      'Coins and shells held their place for over a millennium; UPI has been with us for about a decade. The pattern in the history of money is not that old forms disappear but that each new one makes transactions cheaper to trust, and the newest arrival always looks permanent.',
  },

  'l1-046': {
    title: 'Reconciling a bank statement against your own records',
    brief:
      'A statement is the bank\'s version of your month. Your records are yours. Reconciliation is the exercise of proving the two agree — and finding the one line where they do not.',
    steps: [
      'Column D is what the bank says happened and column E is what your own record says, line by line.',
      'Comparing the totals is faster than checking eight rows by eye. Total the debits in G2 and in G3 using the Type column.',
      'Subtract: G4 is the gap, the amount the two versions disagree by.',
      'G5 pulls out the credits so you can confirm your salary landed.',
      'Express the gap as a percentage of the bank total in G6 — it shows how big a problem you are chasing.',
    ],
    starter: {
      A1: 'Date', B1: 'Description', C1: 'Type', D1: 'Bank ₹', E1: 'My record ₹',
      A2: '03 Aug', B2: 'Salary credit', C2: 'In', D2: '78000', E2: '78000',
      A3: '04 Aug', B3: 'Rent', C3: 'Out', D3: '18000', E3: '18000',
      A4: '07 Aug', B4: 'Kirana', C4: 'Out', D4: '2450', E4: '2450',
      A5: '11 Aug', B5: 'Card payment', C5: 'Out', D5: '5120', E5: '5120',
      A6: '14 Aug', B6: 'UPI to friend', C6: 'Out', D6: '2000', E6: '2000',
      A7: '18 Aug', B7: 'Mobile bill, auto-debit', C7: 'Out', D7: '1999', E7: '1549',
      A8: '22 Aug', B8: 'ATM withdrawal', C8: 'Out', D8: '5000', E8: '5000',
      A9: '28 Aug', B9: 'Insurance premium', C9: 'Out', D9: '12360', E9: '12360',
      F1: 'Answer', G1: 'Value',
      F2: 'Total debits per the bank',
      F3: 'Total debits per my records',
      F4: 'The gap between the two',
      F5: 'Salary credited this month',
      F6: 'The gap as a % of the bank total',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything that left the account, according to the bank', hint: '=SUMIF(C2:C9,"Out",D2:D9)', expect: 46929 },
      { cell: 'G3', ask: 'The same figure, according to your own records', hint: '=SUMIF(C2:C9,"Out",E2:E9)', expect: 46479 },
      { cell: 'G4', ask: 'By how much the two versions disagree', hint: '=G2-G3', expect: 450 },
      { cell: 'G5', ask: 'Total credits for the month', hint: '=SUMIF(C2:C9,"In",D2:D9)', expect: 78000 },
      { cell: 'G6', ask: 'The gap as a percentage of the bank total, one decimal', hint: '=ROUND((G4/G2)*100,1)', expect: 1 },
    ],
    solution: { G2: '=SUMIF(C2:C9,"Out",D2:D9)', G3: '=SUMIF(C2:C9,"Out",E2:E9)', G4: '=G2-G3', G5: '=SUMIF(C2:C9,"In",D2:D9)', G6: '=ROUND((G4/G2)*100,1)' },
    reference: [
      ['=SUMIF(C2:C9,"Out",D2:D9)', 'total one category of rows'],
      ['=G2-G3', 'the reconciliation gap'],
      ['=SUM(D2:D9)', 'total a whole column'],
      ['=ROUND((G4/G2)*100,1)', 'gap as a percentage'],
    ],
    debrief:
      'The gap is ₹450 — the same mobile bill charged twice, which is exactly the kind of error the eye skips over eight rows. One percent sounds small, but the point of reconciliation is not the size of the gap: it is that you now know precisely which line to dispute.',
  },

  'l1-047': {
    title: 'A receipt is proof — what happens without it',
    brief:
      'A record is only as strong as the evidence behind it. Mark which purchases in this month have a document to back them up, and price the spending that does not.',
    steps: [
      'Column E says what proof exists for each payment: a bill, a warranty card, or nothing at all.',
      'Total the spending with no proof in G2 and count those purchases in G3.',
      'Use the Category column to total what the Home category cost in G4.',
      'Add every line in G5, then express the unproven spending as a share of it in G6.',
    ],
    starter: {
      A1: 'Date', B1: 'Paid for', C1: 'Amount ₹', D1: 'Category', E1: 'Proof on file',
      A2: '02 Jul', B2: 'Rent', C2: '18000', D2: 'Home', E2: 'Receipt',
      A3: '05 Jul', B3: 'Groceries', C3: '4200', D3: 'Food', E3: 'Bill',
      A4: '08 Jul', B4: 'Doctor visit', C4: '1500', D4: 'Health', E4: 'Bill',
      A5: '09 Jul', B5: 'Diagnostics', C5: '6800', D5: 'Health', E5: 'None',
      A6: '12 Jul', B6: 'Laptop repair', C6: '3200', D6: 'Work', E6: 'None',
      A7: '16 Jul', B7: 'Television', C7: '28000', D7: 'Home', E7: 'Warranty card',
      A8: '21 Jul', B8: 'Tutor fees', C8: '6000', D8: 'Education', E8: 'None',
      A9: '28 Jul', B9: 'Electricity', C9: '1980', D9: 'Home', E9: 'Bill',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Spend with no proof at all',
      F3: 'Purchases with no proof',
      F4: 'Spend on Home',
      F5: 'Everything recorded this month',
      F6: 'Spend without proof, as a %',
    },
    tasks: [
      { cell: 'G2', ask: 'The value of purchases you cannot prove', hint: '=SUMIF(E2:E9,"None",C2:C9)', expect: 16000 },
      { cell: 'G3', ask: 'How many purchases have no proof', hint: '=COUNTIF(E2:E9,"None")', expect: 3 },
      { cell: 'G4', ask: 'Total spent on the Home category', hint: '=SUMIF(D2:D9,"Home",C2:C9)', expect: 47980 },
      { cell: 'G5', ask: 'Total value of everything recorded', hint: '=SUM(C2:C9)', expect: 69680 },
      { cell: 'G6', ask: 'Unproven spend as a percentage of the month, one decimal', hint: '=ROUND((G2/G5)*100,1)', expect: 23 },
    ],
    solution: { G2: '=SUMIF(E2:E9,"None",C2:C9)', G3: '=COUNTIF(E2:E9,"None")', G4: '=SUMIF(D2:D9,"Home",C2:C9)', G5: '=SUM(C2:C9)', G6: '=ROUND((G2/G5)*100,1)' },
    reference: [
      ['=SUMIF(E2:E9,"None",C2:C9)', 'value of rows matching text'],
      ['=COUNTIF(E2:E9,"None")', 'how many rows match'],
      ['=SUM(C2:C9)', 'the grand total'],
      ['=ROUND((G2/G5)*100,1)', 'one total as a share of another'],
    ],
    debrief:
      'About a quarter of this month cannot be proven. The ₹6,800 diagnostics, the ₹3,200 repair and the ₹6,000 tutor fees are all real spending — they are just invisible to an insurer, a tax officer or a warranty claim. Keep the bill at the moment of payment; recreating it later is not possible.',
  },

  'l1-057': {
    title: 'Build the tracker: one column in, four answers out',
    brief:
      'You cannot manage what you have never written down. This is the smallest tracker worth keeping: a list of expenses, one total, and three formulas that tell you how the month actually behaved.',
    steps: [
      'Column B is a month of expenses, already written down. Nothing else in the sheet is data.',
      'Start with the total in G2 and the largest line in G3.',
      'Average the column in G4 — the typical expense, not the total.',
      'G5 turns the biggest line into a share of the whole, which is what you act on when you need to cut.',
      'G6 counts how many expenses are large, and G7 gives the month without its largest line.',
    ],
    starter: {
      A1: 'Expense', B1: 'Amount ₹',
      A2: 'Rent', B2: '18000',
      A3: 'Groceries', B3: '9500',
      A4: 'Transport', B4: '4200',
      A5: 'Eating out', B5: '6800',
      A6: 'Mobile and internet', B6: '1499',
      A7: 'Electricity', B7: '2200',
      A8: 'OTT subscriptions', B8: '649',
      A9: 'Gym', B9: '1200',
      F1: 'Answer', G1: 'Value',
      F2: 'Total spend',
      F3: 'Biggest single expense',
      F4: 'Average expense',
      F5: 'Rent as a % of the total',
      F6: 'Expenses above ₹5,000',
      F7: 'Month without the rent line',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything spent this month', hint: '=SUM(B2:B9)', expect: 44048 },
      { cell: 'G3', ask: 'The single largest expense', hint: '=MAX(B2:B9)', expect: 18000 },
      { cell: 'G4', ask: 'The average expense, rounded to whole rupees', hint: '=ROUND(AVERAGE(B2:B9),0)', expect: 5506 },
      { cell: 'G5', ask: 'Rent as a percentage of the total, one decimal', hint: '=ROUND((B2/G2)*100,1)', expect: 40.9 },
      { cell: 'G6', ask: 'How many expenses are above ₹5,000', hint: '=COUNTIF(B2:B9,">5000")', expect: 3 },
      { cell: 'G7', ask: 'The total with the rent line removed', hint: '=G2-B2', expect: 26048 },
    ],
    solution: { G2: '=SUM(B2:B9)', G3: '=MAX(B2:B9)', G4: '=ROUND(AVERAGE(B2:B9),0)', G5: '=ROUND((B2/G2)*100,1)', G6: '=COUNTIF(B2:B9,">5000")', G7: '=G2-B2' },
    reference: [
      ['=SUM(B2:B9)', 'total a column'],
      ['=MAX(B2:B9) / =MIN(B2:B9)', 'largest and smallest'],
      ['=ROUND(AVERAGE(B2:B9),0)', 'typical value, rounded'],
      ['=COUNTIF(B2:B9,">5000")', 'how many clear a threshold'],
    ],
    debrief:
      'Rent alone is 40.9% of this month. Three lines — rent, groceries and eating out — are most of the total, so those are the only three worth reviewing. A tracker you update in five minutes is worth more than one with thirty categories you abandon by week three.',
  },

  'l1-061': {
    title: 'The one-month track-every-rupee challenge',
    brief:
      'The trick only works if the record has no holes in it. Track twelve days honestly, then measure the coverage — because a month with three missing days is not a tracker, it is a guess.',
    steps: [
      'Column B is what was spent on each of the twelve days; ₹0 means a genuine no-spend day.',
      'Column C records whether that day was actually logged. Two days are marked No — the spending on those days never got written down.',
      'Total the spend in G2 and count the logged days in G3, then the missed ones in G4.',
      'Averages only work on days you have data for, so divide the total by the logged days in G5, not by twelve.',
      'In G6 find the biggest day, and in G7 express logged days as a percentage of the twelve.',
    ],
    starter: {
      A1: 'Day', B1: 'Spent ₹', C1: 'Logged?',
      A2: '1', B2: '320', C2: 'Yes',
      A3: '2', B3: '1450', C3: 'Yes',
      A4: '3', B4: '0', C4: 'No',
      A5: '4', B5: '780', C5: 'Yes',
      A6: '5', B6: '2100', C6: 'Yes',
      A7: '6', B7: '640', C7: 'Yes',
      A8: '7', B8: '5000', C8: 'Yes',
      A9: '8', B9: '250', C9: 'Yes',
      A10: '9', B10: '1199', C10: 'Yes',
      A11: '10', B11: '0', C11: 'No',
      A12: '11', B12: '890', C12: 'Yes',
      A13: '12', B13: '3450', C13: 'Yes',
      F1: 'Answer', G1: 'Value',
      F2: 'Total spend',
      F3: 'Days logged',
      F4: 'Days missed',
      F5: 'Average on a logged day',
      F6: 'Biggest single day',
      F7: 'Coverage of the 12 days, %',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything spent across the twelve days', hint: '=SUM(B2:B13)', expect: 16079 },
      { cell: 'G3', ask: 'How many days were logged', hint: '=COUNTIF(C2:C13,"Yes")', expect: 10 },
      { cell: 'G4', ask: 'How many days were missed', hint: '=COUNTIF(C2:C13,"No")', expect: 2 },
      { cell: 'G5', ask: 'Average spend on a day you actually logged', hint: '=ROUND(G2/G3,0)', expect: 1608 },
      { cell: 'G6', ask: 'The biggest single day', hint: '=MAX(B2:B13)', expect: 5000 },
      { cell: 'G7', ask: 'Logged days as a percentage of the twelve', hint: '=ROUND((G3/12)*100,1)', expect: 83.3 },
    ],
    solution: { G2: '=SUM(B2:B13)', G3: '=COUNTIF(C2:C13,"Yes")', G4: '=COUNTIF(C2:C13,"No")', G5: '=ROUND(G2/G3,0)', G6: '=MAX(B2:B13)', G7: '=ROUND((G3/12)*100,1)' },
    reference: [
      ['=SUM(B2:B13)', 'total the column'],
      ['=COUNTIF(C2:C13,"Yes")', 'count only the days that were done'],
      ['=ROUND(G2/G3,0)', 'divide by the count, not by 12'],
      ['=MAX(B2:B13)', 'the outlier day'],
    ],
    debrief:
      'The total is ₹16,079 across 10 logged days, and coverage is 83.3%. That missing 16.7% is the real finding: the two unlogged days could hide anything, which is why the honest number is a range, not a figure. Track every rupee for one month and the same exercise turns into a habit.',
  },

  'l2-005': {
    title: 'Income sources: how concentrated are you?',
    brief:
      'One job is one source, and one source is a risk. Lay out a year of income by source and measure how much of it depends on a single payer.',
    steps: [
      'Column C is a full year of income, and column B splits it into active income (your time) and passive income (your assets).',
      'Total the year in G2, then active and passive separately in G3 and G4 using SUMIF.',
      'The concentration number is the important one: the largest single source as a percentage of the total, in G5.',
      'G6 is the passive share — the part of your income that would keep arriving if you stopped working tomorrow.',
      'Count how many sources you actually have in G7.',
    ],
    starter: {
      A1: 'Source', B1: 'Type', C1: 'Annual ₹',
      A2: 'Salary, one employer', B2: 'Active', C2: '900000',
      A3: 'Freelance design work', B3: 'Active', C3: '180000',
      A4: 'Rent from a shop', B4: 'Passive', C4: '144000',
      A5: 'Dividends', B5: 'Passive', C5: '24000',
      A6: 'Interest on FD', B6: 'Passive', C6: '36000',
      F1: 'Answer', G1: 'Value',
      F2: 'Total annual income',
      F3: 'Active income',
      F4: 'Passive income',
      F5: 'Largest source, as a % of income',
      F6: 'Passive share of income, %',
      F7: 'Number of income sources',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything earned in the year', hint: '=SUM(C2:C6)', expect: 1284000 },
      { cell: 'G3', ask: 'The part that depends on your working hours', hint: '=SUMIF(B2:B6,"Active",C2:C6)', expect: 1080000 },
      { cell: 'G4', ask: 'The part that arrives whether you work or not', hint: '=SUMIF(B2:B6,"Passive",C2:C6)', expect: 204000 },
      { cell: 'G5', ask: 'The single largest source as a percentage of income, one decimal', hint: '=ROUND((MAX(C2:C6)/G2)*100,1)', expect: 70.1 },
      { cell: 'G6', ask: 'Passive income as a percentage of the total, one decimal', hint: '=ROUND((G4/G2)*100,1)', expect: 15.9 },
      { cell: 'G7', ask: 'How many income sources are listed', hint: '=COUNT(C2:C6)', expect: 5 },
    ],
    solution: { G2: '=SUM(C2:C6)', G3: '=SUMIF(B2:B6,"Active",C2:C6)', G4: '=SUMIF(B2:B6,"Passive",C2:C6)', G5: '=ROUND((MAX(C2:C6)/G2)*100,1)', G6: '=ROUND((G4/G2)*100,1)', G7: '=COUNT(C2:C6)' },
    reference: [
      ['=SUM(C2:C6)', 'total the year'],
      ['=SUMIF(B2:B6,"Active",C2:C6)', 'total by type'],
      ['=ROUND((MAX(C2:C6)/G2)*100,1)', 'largest item as a share of the total'],
      ['=COUNT(C2:C6)', 'how many numeric entries'],
    ],
    debrief:
      'Five sources sounds diversified, but one employer is 70% of the income and only 15.9% arrives without work. The number of sources is not the measure of safety — the share of the largest one is.',
  },

  'l2-019': {
    title: 'Sinking funds: turning annual shocks into twelve small parts',
    brief:
      'Irregular costs feel like emergencies only because they are unplanned. List the big annual bills, total them, and see the number that makes them boring.',
    steps: [
      'Each row is a cost you know is coming but pay once a year.',
      'Add a full year of them in G2.',
      'Divide by twelve in G3 — that is the monthly transfer into the sinking fund, and it is the whole trick.',
      'G4 shows what should be set aside by the halfway point of the year.',
      'Finish with the largest single bill in G5 and the average bill in G6, so you know which month needs attention.',
    ],
    starter: {
      A1: 'Irregular cost', B1: 'How often', C1: 'Per year ₹',
      A2: 'Insurance premium', B2: 'Annual', C2: '24000',
      A3: 'School fees', B3: 'Annual', C3: '96000',
      A4: 'Festival and gifts', B4: 'Annual', C4: '18000',
      A5: 'Car service and tyres', B5: 'Annual', C5: '12000',
      A6: 'Property tax', B6: 'Annual', C6: '8000',
      A7: 'Dental and medical', B7: 'Annual', C7: '6000',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Total annual cost',
      F3: 'Monthly sinking fund amount',
      F4: 'Set aside by month six',
      F5: 'Largest single bill',
      F6: 'Average bill per item',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything the year will demand', hint: '=SUM(C2:C7)', expect: 164000 },
      { cell: 'G3', ask: 'The monthly amount that makes it painless, rounded to the rupee', hint: '=ROUND(G2/12,0)', expect: 13667 },
      { cell: 'G4', ask: 'What should be sitting aside after six months', hint: '=ROUND(G2/2,0)', expect: 82000 },
      { cell: 'G5', ask: 'The biggest bill of the year', hint: '=MAX(C2:C7)', expect: 96000 },
      { cell: 'G6', ask: 'The average bill per item, rounded to the rupee', hint: '=ROUND(AVERAGE(C2:C7),0)', expect: 27333 },
    ],
    solution: { G2: '=SUM(C2:C7)', G3: '=ROUND(G2/12,0)', G4: '=ROUND(G2/2,0)', G5: '=MAX(C2:C7)', G6: '=ROUND(AVERAGE(C2:C7),0)' },
    reference: [
      ['=SUM(C2:C7)', 'total the annual items'],
      ['=ROUND(G2/12,0)', 'the same figure per month'],
      ['=ROUND(G2/2,0)', 'half the annual figure'],
      ['=ROUND(AVERAGE(C2:C7),0)', 'average item, rounded'],
    ],
    debrief:
      '₹1,64,000 a year becomes about ₹13,667 a month, and the school fee month stops being a crisis. A sinking fund does not reduce the cost; it removes the surprise, which is the part that actually hurts.',
  },

  'l2-049': {
    title: 'Checking the bank\'s EMI arithmetic yourself',
    brief:
      'A lender gives you one number. Rebuild it here from the loan amount, the rate and the tenure, and see how much of each early EMI is interest rather than your own loan.',
    steps: [
      'Rows 2 to 5 hold the loan, the annual rate, the tenure and the EMI the bank quoted.',
      'Convert the annual rate into a monthly rate in G3.',
      'Interest for the first month is the outstanding loan multiplied by that monthly rate — G4.',
      'The rest of the first EMI reduces your loan: G5 is the EMI minus that interest.',
      'Then look at the whole tenure: the total repaid in G6 and the total interest in G7, with G8 and G9 expressing the interest as a share.',
    ],
    starter: {
      A1: 'Input', B1: 'Value',
      A2: 'Loan amount ₹', B2: '2000000',
      A3: 'Annual interest rate %', B3: '8.6',
      A4: 'Tenure in months', B4: '240',
      A5: 'EMI quoted by the bank ₹', B5: '17483',
      F1: 'Answer', G1: 'Value',
      F2: 'Monthly interest rate, % (4 decimals)',
      F3: 'Interest charged in month 1',
      F4: 'Principal repaid in month 1',
      F5: 'Total repaid over the tenure',
      F6: 'Total interest over the tenure',
      F7: 'Interest as a % of the loan',
      F8: 'Share of the first EMI that is interest, %',
    },
    tasks: [
      { cell: 'G2', ask: 'The annual rate converted to a monthly rate', hint: '=ROUND(B3/12,4)', expect: 0.7167 },
      { cell: 'G3', ask: 'Interest charged in the very first month', hint: '=ROUND(B2*B3/1200,0)', expect: 14333 },
      { cell: 'G4', ask: 'How much of the first EMI actually repaid the loan', hint: '=B5-G3', expect: 3150 },
      { cell: 'G5', ask: 'Everything you will pay over 240 months', hint: '=B5*B4', expect: 4195920 },
      { cell: 'G6', ask: 'Total interest over the tenure', hint: '=G5-B2', expect: 2195920 },
      { cell: 'G7', ask: 'Total interest as a percentage of the amount borrowed, one decimal', hint: '=ROUND((G6/B2)*100,1)', expect: 109.8 },
      { cell: 'G8', ask: 'The share of the first EMI that is just interest, one decimal', hint: '=ROUND((G3/B5)*100,1)', expect: 82 },
    ],
    solution: { G2: '=ROUND(B3/12,4)', G3: '=ROUND(B2*B3/1200,0)', G4: '=B5-G3', G5: '=B5*B4', G6: '=G5-B2', G7: '=ROUND((G6/B2)*100,1)', G8: '=ROUND((G3/B5)*100,1)' },
    reference: [
      ['=ROUND(B3/12,4)', 'annual rate to monthly rate'],
      ['=ROUND(B2*B3/1200,0)', 'one month of interest on the loan'],
      ['=B5-G3', 'EMI minus interest is principal'],
      ['=ROUND((G6/B2)*100,1)', 'total interest as a share of the loan'],
    ],
    debrief:
      '₹21.9 lakh of interest on a ₹20 lakh loan, and 82% of the first EMI is interest. That is not a bank trick — it is what a long tenure does, and it is why paying extra in the early years saves far more than paying the same amount later.',
  },

  'l2-079': {
    title: 'Subscription audit: the money that leaves by itself',
    brief:
      'Subscriptions are small, automatic and invisible. Put every one of them on one sheet, convert them all to the same unit, and see what a habit costs per year.',
    steps: [
      'Column C is the amount per billing cycle, and column B says whether that cycle is Monthly or Annual.',
      'Total the monthly-billed and annual-billed subscriptions in G2 and G3.',
      'Annual plans cannot be compared to monthly ones until both are per year, so multiply the monthly total by twelve in G4.',
      'G5 is the full yearly cost and G6 reduces it back to a monthly number you can hold in your head.',
      'Count the expensive ones in G7 — anything over ₹1,000 per cycle deserves a second look.',
    ],
    starter: {
      A1: 'Subscription', B1: 'Billed', C1: 'Per cycle ₹',
      A2: 'Mobile plan', B2: 'Monthly', C2: '499',
      A3: 'OTT video', B3: 'Monthly', C3: '649',
      A4: 'Music streaming', B4: 'Monthly', C4: '119',
      A5: 'Cloud storage', B5: 'Monthly', C5: '130',
      A6: 'Gym', B6: 'Monthly', C6: '1200',
      A7: 'News app', B7: 'Annual', C7: '1499',
      A8: 'Cloud backup', B8: 'Annual', C8: '2400',
      A9: 'Domain and hosting', B9: 'Annual', C9: '3600',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Billed monthly, per cycle',
      F3: 'Billed annually, per cycle',
      F4: 'Monthly plans, over a year',
      F5: 'Everything, per year',
      F6: 'Everything, per month',
      F7: 'Subscriptions above ₹1,000 per cycle',
    },
    tasks: [
      { cell: 'G2', ask: 'What the monthly-billed plans cost each month', hint: '=SUMIF(B2:B9,"Monthly",C2:C9)', expect: 2597 },
      { cell: 'G3', ask: 'What the annual-billed plans cost per year', hint: '=SUMIF(B2:B9,"Annual",C2:C9)', expect: 7499 },
      { cell: 'G4', ask: 'The monthly plans converted to a year', hint: '=G2*12', expect: 31164 },
      { cell: 'G5', ask: 'The true yearly cost of every subscription', hint: '=G4+G3', expect: 38663 },
      { cell: 'G6', ask: 'That yearly cost per month, rounded', hint: '=ROUND(G5/12,0)', expect: 3222 },
      { cell: 'G7', ask: 'How many cost more than ₹1,000 per cycle', hint: '=COUNTIF(C2:C9,">1000")', expect: 4 },
    ],
    solution: { G2: '=SUMIF(B2:B9,"Monthly",C2:C9)', G3: '=SUMIF(B2:B9,"Annual",C2:C9)', G4: '=G2*12', G5: '=G4+G3', G6: '=ROUND(G5/12,0)', G7: '=COUNTIF(C2:C9,">1000")' },
    reference: [
      ['=SUMIF(B2:B9,"Monthly",C2:C9)', 'total by billing cycle'],
      ['=G2*12', 'a monthly cost, annualised'],
      ['=ROUND(G5/12,0)', 'an annual cost, back to monthly'],
      ['=COUNTIF(C2:C9,">1000")', 'which ones are worth reviewing'],
    ],
    debrief:
      '₹38,663 a year, or ₹3,222 a month, and the eight reminders you never see. Annualising is the only fair way to compare a ₹649 monthly plan with a ₹3,600 yearly one — and the gym at ₹1,200 a month is the single biggest line here.',
  },

  'l2-081': {
    title: 'Your monthly dashboard: four numbers you should know',
    brief:
      'A dashboard is not thirty line items. It is a few numbers you can recall without looking. Build one row per month, then the four figures that sit at the top of it.',
    steps: [
      'One row per month, with income and expenses given. Row 2 is unfinished: compute saved (D2) and the saving rate (E2), then notice the same pattern in the rows below.',
      'Total income and total saved in G2 and G4.',
      'G5 is the saving rate across all six months — save divided by income, not an average of the monthly percentages.',
      'G6 finds the best month, and G7 counts how many months missed the 20% target.',
      'Change one expense and watch all four numbers move. That is what makes it a dashboard rather than a report.',
    ],
    starter: {
      A1: 'Month', B1: 'Income ₹', C1: 'Expenses ₹', D1: 'Saved ₹', E1: 'Saving rate %',
      A2: 'Apr', B2: '78000', C2: '61000',
      A3: 'May', B3: '78000', C3: '66500', D3: '=B3-C3', E3: '=ROUND((D3/B3)*100,1)',
      A4: 'Jun', B4: '82000', C4: '58000', D4: '=B4-C4', E4: '=ROUND((D4/B4)*100,1)',
      A5: 'Jul', B5: '78000', C5: '71500', D5: '=B5-C5', E5: '=ROUND((D5/B5)*100,1)',
      A6: 'Aug', B6: '78000', C6: '63000', D6: '=B6-C6', E6: '=ROUND((D6/B6)*100,1)',
      A7: 'Sep', B7: '85000', C7: '60000', D7: '=B7-C7', E7: '=ROUND((D7/B7)*100,1)',
      F1: 'Answer', G1: 'Value',
      F2: 'Total income',
      F3: 'Total expenses',
      F4: 'Total saved',
      F5: 'Saving rate across six months',
      F6: 'Best month by savings',
      F7: 'Months below the 20% target',
    },
    tasks: [
      { cell: 'D2', ask: 'What April saved', hint: '=B2-C2', expect: 17000 },
      { cell: 'E2', ask: 'April as a saving rate, one decimal', hint: '=ROUND((D2/B2)*100,1)', expect: 21.8 },
      { cell: 'G2', ask: 'Income across the six months', hint: '=SUM(B2:B7)', expect: 479000 },
      { cell: 'G4', ask: 'Everything saved in six months', hint: '=G2-G3', expect: 99000 },
      { cell: 'G5', ask: 'The overall saving rate, one decimal', hint: '=ROUND((G4/G2)*100,1)', expect: 20.7 },
      { cell: 'G7', ask: 'How many months missed the 20% target', hint: '=COUNTIF(E2:E7,"<20")', expect: 3 },
    ],
    solution: { D2: '=B2-C2', E2: '=ROUND((D2/B2)*100,1)', G2: '=SUM(B2:B7)', G3: '=SUM(C2:C7)', G4: '=G2-G3', G5: '=ROUND((G4/G2)*100,1)', G6: '=MAX(D2:D7)', G7: '=COUNTIF(E2:E7,"<20")' },
    reference: [
      ['=B2-C2', 'the saved column, row by row'],
      ['=ROUND((D2/B2)*100,1)', 'a ratio as a percentage'],
      ['=ROUND((G4/G2)*100,1)', 'annual rate from totals, not an average of rates'],
      ['=COUNTIF(E2:E7,"<20")', 'months that breached the target'],
    ],
    debrief:
      'The overall saving rate is 20.7%, which looks fine — but only three of six months cleared 20%, and August saved 19.2% while July managed 8.3%. A single average hides the swings, which is exactly why one row per month earns a place on the dashboard.',
  },

  'l3-094': {
    title: 'Investment tracker: value, allocation, and the drift',
    brief:
      'A tracker answers three questions: what do I own, what is it worth, and am I still at my target allocation? Build the value column, then measure the gap.',
    steps: [
      'Columns C and D hold units and price. Column E is value — finish E2 by multiplying units by price, and note the same formula in the rows below.',
      'In the answer block below the table, total the portfolio in B8.',
      'B9 adds up only the equity holdings using the Type column.',
      'B10 turns that into a share of the portfolio, and B11 is what equity should be worth if the targets in column F are followed.',
      'B12 is the drift: how much equity is above its target. That single number is what you act on once a year.',
    ],
    starter: {
      A1: 'Holding', B1: 'Type', C1: 'Units', D1: 'Price ₹', E1: 'Value ₹', F1: 'Target %',
      A2: 'Index fund, Nifty 50', B2: 'Equity', C2: '1200', D2: '210', F2: '45',
      A3: 'Mid-cap fund', B3: 'Equity', C3: '800', D3: '320', E3: '=C3*D3', F3: '20',
      A4: 'Debt fund', B4: 'Debt', C4: '1500', D4: '42', E4: '=C4*D4', F4: '25',
      A5: 'Gold ETF', B5: 'Gold', C5: '200', D5: '78', E5: '=C5*D5', F5: '10',
      A7: 'Answer', B7: 'Value',
      A8: 'Total value',
      A9: 'Equity ₹',
      A10: 'Equity %',
      A11: 'Target ₹',
      A12: 'Drift ₹',
    },
    tasks: [
      { cell: 'E2', ask: 'The value of the index fund holding', hint: '=C2*D2', expect: 252000 },
      { cell: 'B8', ask: 'What the whole portfolio is worth', hint: '=SUM(E2:E5)', expect: 586600 },
      { cell: 'B9', ask: 'How much of it is equity', hint: '=SUMIF(B2:B5,"Equity",E2:E5)', expect: 508000 },
      { cell: 'B10', ask: 'Equity as a percentage of the portfolio, one decimal', hint: '=ROUND((B9/B8)*100,1)', expect: 86.6 },
      { cell: 'B11', ask: 'What equity should be worth at the 65% target', hint: '=ROUND(B8*65/100,0)', expect: 381290 },
      { cell: 'B12', ask: 'How far equity has drifted above its target', hint: '=B9-B11', expect: 126710 },
    ],
    solution: { E2: '=C2*D2', B8: '=SUM(E2:E5)', B9: '=SUMIF(B2:B5,"Equity",E2:E5)', B10: '=ROUND((B9/B8)*100,1)', B11: '=ROUND(B8*65/100,0)', B12: '=B9-B11' },
    reference: [
      ['=C2*D2', 'units x price'],
      ['=SUM(E2:E5)', 'portfolio value'],
      ['=SUMIF(B2:B5,"Equity",E2:E5)', 'value of one asset class'],
      ['=ROUND(B8*65/100,0)', 'what a target weight requires'],
    ],
    debrief:
      'Equity is 86.6% of the portfolio against a 65% target — a drift of ₹1,26,710, funded entirely by a bull run. Rebalancing means selling that much equity into debt and gold, which is the only time most investors are asked to sell what has done well.',
  },

  'l4-084': {
    title: 'Sole proprietorship: the same books, two views',
    brief:
      'A proprietorship is the simplest business form and the one where you are fully on the hook. Run a year through it once, and see what is left for the owner.',
    steps: [
      'Row 2 is revenue; rows 3 to 8 are the year\'s expenses, largest first.',
      'Total the expenses in G2, then subtract them from revenue in G3 to get profit before tax.',
      'Apply the tax rate shown in row 9 to get the tax in G4 and the profit after tax in G5.',
      'G6 subtracts an owner withdrawal of ₹60,000 — money taken out of the business, not an expense.',
      'G7 expresses profit before tax as a margin, the number a lender or buyer will ask for first.',
    ],
    starter: {
      A1: 'Line', B1: 'Amount ₹',
      A2: 'Revenue for the year', B2: '1850000',
      A3: 'Cost of goods sold', B3: '1120000',
      A4: 'Rent and utilities', B4: '180000',
      A5: 'Salaries to staff', B5: '240000',
      A6: 'Marketing', B6: '60000',
      A7: 'Internet and software', B7: '24000',
      A8: 'Professional fees', B8: '35000',
      A9: 'Tax rate %', B9: '30',
      D9: 'Owner withdrawal ₹', E9: '60000',
      F1: 'Answer', G1: 'Value',
      F2: 'Total expenses',
      F3: 'Profit before tax',
      F4: 'Tax at the rate in B9',
      F5: 'Profit after tax',
      F6: 'Left in the business after the owner draws',
      F7: 'Net margin, %',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything the business spent', hint: '=SUM(B3:B8)', expect: 1659000 },
      { cell: 'G3', ask: 'Revenue minus those expenses', hint: '=B2-G2', expect: 191000 },
      { cell: 'G4', ask: 'Tax on that profit, using the rate in B9', hint: '=ROUND(G3*B9/100,0)', expect: 57300 },
      { cell: 'G5', ask: 'What the business keeps after tax', hint: '=G3-G4', expect: 133700 },
      { cell: 'G6', ask: 'Cash left after the owner withdraws ₹60,000', hint: '=G5-E9', expect: 73700 },
      { cell: 'G7', ask: 'Profit before tax as a percentage of revenue, one decimal', hint: '=ROUND((G3/B2)*100,1)', expect: 10.3 },
    ],
    solution: { G2: '=SUM(B3:B8)', G3: '=B2-G2', G4: '=ROUND(G3*B9/100,0)', G5: '=G3-G4', G6: '=G5-E9', G7: '=ROUND((G3/B2)*100,1)' },
    reference: [
      ['=SUM(B3:B8)', 'total the expense lines'],
      ['=B2-G2', 'revenue minus expenses'],
      ['=ROUND(G3*B9/100,0)', 'apply a tax rate held in a cell'],
      ['=G5-E9', 'profit minus what the owner took out'],
    ],
    debrief:
      'A 10.3% net margin, and after tax and a ₹60,000 draw the business retains ₹73,700. Because it is a proprietorship, that profit is taxed as the owner\'s income and the owner is personally liable for any loss the business cannot cover — which is exactly why the next chapter compares other forms.',
  },

  'l4-085': {
    title: 'Partnership: splitting a profit that is not equal',
    brief:
      'A partnership runs on a profit-sharing agreement, and the moment one partner draws a salary the split stops matching the ratio. Do the division here and see the skew.',
    steps: [
      'Revenue and expenses are in rows 2 and 3; partner A\'s salary is in row 4.',
      'G2 is profit before any partner payments, and G3 is what is left to split after that salary.',
      'Split G3 in the agreed 60:40 ratio to get A\'s share in G4 and B\'s share in G5.',
      'Add the salary back to get everything A receives in total (G6).',
      'G7 and G8 express what A and B each actually get as a share of the profit — and they will not be 60 and 40.',
    ],
    starter: {
      A1: 'Item', B1: 'Amount ₹',
      A2: 'Revenue for the year', B2: '2400000',
      A3: 'Total expenses', B3: '1800000',
      A4: 'Partner A salary', B4: '90000',
      A5: 'Agreed profit-sharing ratio', B5: 'A 60% / B 40%',
      F1: 'Answer', G1: 'Value',
      F2: 'Profit before partner payments',
      F3: 'Profit left to split after the salary',
      F4: "Partner A's 60% share",
      F5: "Partner B's 40% share",
      F6: 'Everything A receives, salary included',
      F7: 'A as a % of the profit pool',
      F8: 'B as a % of the profit pool',
    },
    tasks: [
      { cell: 'G2', ask: 'Profit before any partner is paid', hint: '=B2-B3', expect: 600000 },
      { cell: 'G3', ask: 'What remains to be split once the salary is paid', hint: '=G2-B4', expect: 510000 },
      { cell: 'G4', ask: 'A 60% share of the amount being split', hint: '=ROUND(G3*60/100,0)', expect: 306000 },
      { cell: 'G5', ask: 'B 40% share of the same amount', hint: '=G3-G4', expect: 204000 },
      { cell: 'G6', ask: 'A total take, salary plus share', hint: '=G4+B4', expect: 396000 },
      { cell: 'G7', ask: 'What A actually ends up with, as a percentage of profit', hint: '=ROUND((G6/G2)*100,1)', expect: 66 },
    ],
    solution: { G2: '=B2-B3', G3: '=G2-B4', G4: '=ROUND(G3*60/100,0)', G5: '=G3-G4', G6: '=G4+B4', G7: '=ROUND((G6/G2)*100,1)', G8: '=ROUND((G5/G2)*100,1)' },
    reference: [
      ['=B2-B3', 'revenue minus expenses'],
      ['=ROUND(G3*60/100,0)', 'a share of a pool'],
      ['=G3-G4', 'the remainder to the other partner'],
      ['=ROUND((G6/G2)*100,1)', 'real share, not agreed share'],
    ],
    debrief:
      'A gets 66% of the profit and B gets 34% — not 60:40 — because the salary is paid before the split. A partner salary is not an expense; it is a first draw on profit, and every partnership deed should say so in writing.',
  },

  'l4-086': {
    title: 'LLP: capital shares, profit shares, and your own exposure',
    brief:
      'In an LLP the partners share profits in an agreed ratio and their personal liability stops at what they contributed. Put both facts on one sheet.',
    steps: [
      'Rows 2 to 4 hold each partner\'s capital, and row 5 is the profit available this year.',
      'Total the capital in G2.',
      'Measure each partner\'s capital share in G3 and G4 as a percentage of that total.',
      'When nothing else is agreed, profit follows capital, so C\'s share of ₹8,00,000 is G5.',
      'G6 is the profit C does not receive, and G7 answers the liability question — what a partner can personally lose beyond their contribution.',
    ],
    starter: {
      A1: 'Item', B1: 'Amount ₹',
      A2: "Partner A's capital", B2: '1000000',
      A3: "Partner B's capital", B3: '600000',
      A4: "Partner C's capital", B4: '400000',
      A5: 'Profit to distribute this year', B5: '800000',
      F1: 'Answer', G1: 'Value',
      F2: 'Total capital contributed',
      F3: "A's share of capital, %",
      F4: "C's share of capital, %",
      F5: "C's profit share in the capital ratio",
      F6: 'Profit C does not receive',
      F7: 'What a partner can lose beyond their capital',
    },
    tasks: [
      { cell: 'G2', ask: 'All the capital the partners have put in', hint: '=SUM(B2:B4)', expect: 2000000 },
      { cell: 'G3', ask: "A's share of that capital, one decimal", hint: '=ROUND((B2/G2)*100,1)', expect: 50 },
      { cell: 'G4', ask: "C's share of that capital, one decimal", hint: '=ROUND((B4/G2)*100,1)', expect: 20 },
      { cell: 'G5', ask: "C's share of this year's profit, following capital", hint: '=ROUND(B5*G4/100,0)', expect: 160000 },
      { cell: 'G6', ask: 'The profit that goes to the other partners', hint: '=B5-G5', expect: 640000 },
      { cell: 'G7', ask: 'The amount a partner can personally lose beyond their contribution', hint: 'the design answer is 0 — limited liability, so 0 is the correct cell value', expect: 0 },
    ],
    solution: { G2: '=SUM(B2:B4)', G3: '=ROUND((B2/G2)*100,1)', G4: '=ROUND((B4/G2)*100,1)', G5: '=ROUND(B5*G4/100,0)', G6: '=B5-G5', G7: '=0' },
    reference: [
      ['=SUM(B2:B4)', 'total contributed capital'],
      ['=ROUND((B2/G2)*100,1)', 'one contribution as a share'],
      ['=ROUND(B5*G4/100,0)', 'a profit share from a capital ratio'],
      ['=B5-G5', 'what is left for the others'],
    ],
    debrief:
      'C put in 20% and takes 20% — ₹1,60,000 — and if the firm collapses owing money, C risks the ₹4,00,000 contributed and nothing personal. That separation is the entire reason an LLP exists, and it is why the deed must name the profit ratio rather than leaving it to be inferred.',
  },

  'l4-088': {
    title: 'Registration: what starting a business actually costs',
    brief:
      'Registration is a paper trail you pay for once and then maintain forever. Sort the costs into one-time and recurring, and find the monthly number the compliance calendar really demands.',
    steps: [
      'Column B labels each cost as One-time or Annual; some registrations are genuinely free.',
      'Total the one-time costs in G2 and the recurring ones in G3.',
      'G4 is the full first-year bill, and G5 spreads it across twelve months.',
      'From the second year the one-time costs are gone, so G6 is the recurring bill per month — the number that decides whether the business can carry itself.',
      'G7 counts how many items cost nothing, which is worth knowing before you pay an agent.',
    ],
    starter: {
      A1: 'Item', B1: 'Type', C1: 'Amount ₹',
      A2: 'LLP or company registration fee', B2: 'One-time', C2: '8000',
      A3: 'Digital signatures for two partners', B3: 'One-time', C3: '4000',
      A4: 'GST registration', B4: 'One-time', C4: '0',
      A5: 'Professional fee for incorporation', B5: 'One-time', C5: '12000',
      A6: 'GST return filing, per year', B6: 'Annual', C6: '18000',
      A7: 'Accounting and audit', B7: 'Annual', C7: '24000',
      A8: 'ROC annual filing', B8: 'Annual', C8: '6000',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'One-time cost to get started',
      F3: 'Recurring cost per year',
      F4: 'Total bill in year one',
      F5: 'Compliance per month in year one',
      F6: 'Compliance per month from year two',
      F7: 'Costs that are free',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything paid once, at the start', hint: '=SUMIF(B2:B8,"One-time",C2:C8)', expect: 24000 },
      { cell: 'G3', ask: 'What repeats every year', hint: '=SUMIF(B2:B8,"Annual",C2:C8)', expect: 48000 },
      { cell: 'G4', ask: 'The whole first-year bill', hint: '=G2+G3', expect: 72000 },
      { cell: 'G5', ask: 'That first year spread across twelve months', hint: '=ROUND(G4/12,0)', expect: 6000 },
      { cell: 'G6', ask: 'The monthly cost once the one-time items are behind you', hint: '=ROUND(G3/12,0)', expect: 4000 },
      { cell: 'G7', ask: 'How many items cost nothing at all', hint: '=COUNTIF(C2:C8,0)', expect: 1 },
    ],
    solution: { G2: '=SUMIF(B2:B8,"One-time",C2:C8)', G3: '=SUMIF(B2:B8,"Annual",C2:C8)', G4: '=G2+G3', G5: '=ROUND(G4/12,0)', G6: '=ROUND(G3/12,0)', G7: '=COUNTIF(C2:C8,0)' },
    reference: [
      ['=SUMIF(B2:B8,"One-time",C2:C8)', 'total by cost type'],
      ['=G2+G3', 'first-year total'],
      ['=ROUND(G3/12,0)', 'recurring cost per month'],
      ['=COUNTIF(C2:C8,0)', 'count of zero-cost items'],
    ],
    debrief:
      '₹24,000 to start, ₹48,000 every year after, and about ₹4,000 a month forever. GST registration itself is free — the fee is for the professional handling it — so it is worth checking which parts you can file yourself before paying for the whole bundle.',
  },

  'l4-090': {
    title: 'The business ledger: if it is not recorded, it did not happen',
    brief:
      'A ledger is not accounting for its own sake. It is the only way to know what the business earned, what it owes, and which entry is missing a category.',
    steps: [
      'Each row is one transaction with a Type of In or Out and an amount.',
      'Total the money in (G2) and the money out (G3) from the ledger itself.',
      'G4 is what the ledger says the business made this month.',
      'Gross profit is different: sales minus the cost of stock purchased, in G5.',
      'G6 adds the two largest cost lines together, and G7 gives the average sale — a useful early warning on pricing.',
    ],
    starter: {
      A1: 'Date', B1: 'Entry', C1: 'Type', D1: 'Amount ₹',
      A2: '01 Mar', B2: 'Sales to customer A', C2: 'In', D2: '85000',
      A3: '03 Mar', B3: 'Purchase of stock', C3: 'Out', D3: '42000',
      A4: '06 Mar', B4: 'Shop rent', C4: 'Out', D4: '24000',
      A5: '09 Mar', B5: 'Sales to customer B', C5: 'In', D5: '62000',
      A6: '12 Mar', B6: 'Staff salary', C6: 'Out', D6: '36000',
      A7: '15 Mar', B7: 'Electricity', C7: 'Out', D7: '4200',
      A8: '18 Mar', B8: 'Cash counter sales', C8: 'In', D8: '31000',
      A9: '21 Mar', B9: 'Marketing', C9: 'Out', D9: '9000',
      A10: '25 Mar', B10: 'Customer refund', C10: 'Out', D10: '3500',
      A11: '28 Mar', B11: 'Sales to customer C', C11: 'In', D11: '58000',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Money in',
      F3: 'Money out',
      F4: 'Net for the month',
      F5: 'Gross profit: sales minus stock',
      F6: 'Stock plus salaries',
      F7: 'Average sale per invoice',
    },
    tasks: [
      { cell: 'G2', ask: 'Everything the business received', hint: '=SUMIF(C2:C11,"In",D2:D11)', expect: 236000 },
      { cell: 'G3', ask: 'Everything the business paid out', hint: '=SUMIF(C2:C11,"Out",D2:D11)', expect: 118700 },
      { cell: 'G4', ask: 'The month\'s net from the ledger', hint: '=G2-G3', expect: 117300 },
      { cell: 'G5', ask: 'Sales minus the cost of stock bought', hint: '=G2-D3', expect: 194000 },
      { cell: 'G6', ask: 'The two biggest costs added together', hint: '=D3+D6', expect: 78000 },
      { cell: 'G7', ask: 'Average value of a sale, rounded', hint: '=ROUND(G2/COUNTIF(C2:C11,"In"),0)', expect: 59000 },
    ],
    solution: { G2: '=SUMIF(C2:C11,"In",D2:D11)', G3: '=SUMIF(C2:C11,"Out",D2:D11)', G4: '=G2-G3', G5: '=G2-D3', G6: '=D3+D6', G7: '=ROUND(G2/COUNTIF(C2:C11,"In"),0)' },
    reference: [
      ['=SUMIF(C2:C11,"In",D2:D11)', 'total receipts'],
      ['=SUMIF(C2:C11,"Out",D2:D11)', 'total payments'],
      ['=G2-D3', 'gross profit from sales and stock'],
      ['=ROUND(G2/COUNTIF(C2:C11,"In"),0)', 'average sale across sales only'],
    ],
    debrief:
      'The ledger shows ₹1,17,300 net for the month on ₹2,36,000 of sales, with stock and salaries alone costing ₹78,000. Every one of those numbers came from recording transactions as they happened — a ledger maintained at year end cannot tell you any of it in time to act.',
  },

  // ------------------------------------------------ Spreadsheets & models (l5-123–128)
  'l5-123': {
    title: 'One workbook, three jobs: inputs, calculations, summary',
    brief:
      'A workbook people trust has a shape: data enters once, calculations only read it, and a summary only reports results. Build all three layers here and prove the summary still agrees with the inputs.',
    steps: [
      'Column B is the input layer: what you earn and what leaves the account each month. Nothing in it is calculated.',
      'The summary in column E is calculated from those inputs only. Total income in E2, total spending in E3, and the surplus in E4.',
      'E5 and E7 turn two of those results into percentages. Percentages are easier to compare across months than rupees.',
      'E6 is a test, not a total: it answers whether the salary alone covers the month, and returns 1 for yes or 0 for no.',
      'E8 is the audit cell. It re-checks that income minus spending still equals the surplus. A 1 means the three layers agree.',
    ],
    starter: {
      A1: 'Input', B1: 'Value ₹',
      A2: 'Salary, monthly', B2: '78000',
      A3: 'Freelance income, monthly', B3: '12000',
      A4: 'Rent', B4: '18000',
      A5: 'Groceries and household', B5: '14500',
      A6: 'Transport', B6: '4200',
      A7: 'Loan EMI', B7: '11000',
      A8: 'Investments, monthly', B8: '15000',
      D1: 'Summary', E1: 'Value',
      D2: 'Total income',
      D3: 'Total spending',
      D4: 'Surplus',
      D5: 'Saving rate %',
      D6: 'Does salary alone cover the month? 1 = yes',
      D7: 'Investments as % of income',
      D8: 'Audit: does income minus spending equal the surplus?',
    },
    tasks: [
      { cell: 'E2', ask: 'Every rupee that came in this month', hint: '=B2+B3', expect: 90000 },
      { cell: 'E3', ask: 'Everything that left, before investments', hint: '=B4+B5+B6+B7', expect: 47700 },
      { cell: 'E4', ask: 'What is left after spending', hint: '=E2-E3', expect: 42300 },
      { cell: 'E5', ask: 'Surplus as a percentage of income, one decimal', hint: '=ROUND((E4/E2)*100,1)', expect: 47 },
      { cell: 'E6', ask: '1 if the salary alone equals or beats spending, otherwise 0', hint: '=IF(B2>=E3,1,0)', expect: 1 },
      { cell: 'E8', ask: '1 if the summary still agrees with the inputs', hint: '=IF(E2-E3=E4,1,0)', expect: 1 },
    ],
    solution: { E2: '=B2+B3', E3: '=B4+B5+B6+B7', E4: '=E2-E3', E5: '=ROUND((E4/E2)*100,1)', E6: '=IF(B2>=E3,1,0)', E8: '=IF(E2-E3=E4,1,0)' },
    reference: [
      ['=B2+B3', 'a total that names the input cells'],
      ['=E2-E3', 'a calculation that reads two other results'],
      ['=ROUND((E4/E2)*100,1)', 'a ratio as a percentage'],
      ['=IF(E2-E3=E4,1,0)', 'a test that returns 1 or 0'],
    ],
    debrief:
      'Income of ₹90,000, spending of ₹47,700 and a surplus of ₹42,300 — of which ₹15,000 is invested, so the saved share is higher than the visible surplus suggests. The audit cell in E8 is the part worth copying: any workbook that can check itself will tell you when a hand-typed number has crept in.',
  },

  'l5-124': {
    title: 'The same sheet, safely shared',
    brief:
      'A shared link is a filter nobody configured. Mark which lines a visitor may see, then measure how much of the month travels with the link.',
    steps: [
      'Column D is the visibility flag: Shared or Private. It is the only column that decides what a read-only link exposes.',
      'Total the sheet in G2, then use SUMIF on column D to split the visible from the private.',
      'G5 expresses the visible part as a percentage — the number to look at before sending a link to anyone.',
      'G6 counts the private rows. Every one of them has to be removed, or the column has to be excluded, before sharing.',
      'G7 averages a line, which is a different question from a total: what does one entry typically cost?',
    ],
    starter: {
      A1: 'Line', B1: 'Category', C1: 'Amount ₹', D1: 'Visible to shared link',
      A2: 'Rent', B2: 'Home', C2: '18000', D2: 'Shared',
      A3: 'Groceries', B3: 'Food', C3: '14500', D3: 'Shared',
      A4: 'School fees', B4: 'Education', C4: '12000', D4: 'Shared',
      A5: 'Therapy', B5: 'Health', C5: '6000', D5: 'Private',
      A6: 'Gifts', B6: 'Family', C6: '3500', D6: 'Private',
      A7: 'Medical test', B7: 'Health', C7: '4800', D7: 'Private',
      A8: 'Utilities', B8: 'Home', C8: '3200', D8: 'Shared',
      A9: 'Streaming', B9: 'Fun', C9: '649', D9: 'Shared',
      A10: 'Courier', B10: 'Home', C10: '450', D10: 'Shared',
      F1: 'Answer', G1: 'Value',
      F2: 'Everything in the sheet',
      F3: 'Visible through the link',
      F4: 'Hidden from the link',
      F5: 'Visible share of the sheet, %',
      F6: 'Rows that must be removed before sharing',
      F7: 'Average entry, rounded to the rupee',
    },
    tasks: [
      { cell: 'G2', ask: 'Total value of every line', hint: '=SUM(C2:C10)', expect: 63099 },
      { cell: 'G3', ask: 'Value of the lines flagged Shared', hint: '=SUMIF(D2:D10,"Shared",C2:C10)', expect: 48799 },
      { cell: 'G4', ask: 'Value of the lines flagged Private', hint: '=SUMIF(D2:D10,"Private",C2:C10)', expect: 14300 },
      { cell: 'G5', ask: 'Visible value as a percentage of the sheet, one decimal', hint: '=ROUND((G3/G2)*100,1)', expect: 77.3 },
      { cell: 'G6', ask: 'How many rows are private', hint: '=COUNTIF(D2:D10,"Private")', expect: 3 },
      { cell: 'G7', ask: 'Average line, rounded to whole rupees', hint: '=ROUND(AVERAGE(C2:C10),0)', expect: 7011 },
    ],
    solution: { G2: '=SUM(C2:C10)', G3: '=SUMIF(D2:D10,"Shared",C2:C10)', G4: '=SUMIF(D2:D10,"Private",C2:C10)', G5: '=ROUND((G3/G2)*100,1)', G6: '=COUNTIF(D2:D10,"Private")', G7: '=ROUND(AVERAGE(C2:C10),0)' },
    reference: [
      ['=SUM(C2:C10)', 'total a column'],
      ['=SUMIF(D2:D10,"Shared",C2:C10)', 'total only the rows a flag allows'],
      ['=COUNTIF(D2:D10,"Private")', 'count the rows a filter would hide'],
      ['=ROUND(AVERAGE(C2:C10),0)', 'average one entry, not the total'],
    ],
    debrief:
      'The link exposes 77.3% of the sheet — ₹48,799 of ₹63,099 — while ₹14,300 of health and family spending stays private. Sorting and filtering change the order rows appear in, never who may see them; a read-only link is safe only because of the flag column, and only if the private rows are removed before it is sent.',
  },

  'l5-125': {
    title: 'One rate, four funds: making an absolute reference work',
    brief:
      'The fee rate belongs to the whole sheet, not to row 4. Anchor it with dollar signs, copy the formula down, and every row keeps reading the same cell.',
    steps: [
      'B1 holds the advisory fee rate for the whole sheet. It must not move when the formula is copied.',
      'Write the fee in C4 as the amount in B4 multiplied by the rate in B1, with the rate anchored as $B$1.',
      'Copy that formula down. C6 and C7 are already done and show the pattern — the row reference moves, the rate does not.',
      'D4 is what the fund is worth after the fee. The rest of column D is filled in already.',
      'G2 to G5 add the fees, add the net values, express the fee as a share of assets, and find the largest fee.',
    ],
    starter: {
      A1: 'Advisory fee rate %', B1: '1.2',
      A3: 'Fund', B3: 'Amount ₹', C3: 'Fee ₹', D3: 'Net after fee ₹',
      A4: 'Liquid fund', B4: '250000',
      A5: 'Index fund', B5: '400000', D5: '=B5-C5',
      A6: 'Debt fund', B6: '150000', C6: '=ROUND(B6*$B$1/100,0)', D6: '=B6-C6',
      A7: 'Gold ETF', B7: '200000', C7: '=ROUND(B7*$B$1/100,0)', D7: '=B7-C7',
      F1: 'Answer', G1: 'Value',
      F2: 'Total fee across the four funds',
      F3: 'Total net value after fees',
      F4: 'Fee as a % of assets, two decimals',
      F5: 'Largest single fee',
    },
    tasks: [
      { cell: 'C4', ask: 'Fee on the liquid fund, using the rate in B1', hint: '=ROUND(B4*$B$1/100,0)', expect: 3000 },
      { cell: 'C5', ask: 'Fee on the index fund, anchoring the same rate', hint: '=ROUND(B5*$B$1/100,0)', expect: 4800 },
      { cell: 'D4', ask: 'What the liquid fund is worth after the fee', hint: '=B4-C4', expect: 247000 },
      { cell: 'G2', ask: 'Every fee added together', hint: '=SUM(C4:C7)', expect: 12000 },
      { cell: 'G3', ask: 'Every net value added together', hint: '=SUM(D4:D7)', expect: 988000 },
      { cell: 'G4', ask: 'The fee as a share of assets, two decimals', hint: '=ROUND((G2/SUM(B4:B7))*100,2)', expect: 1.2 },
      { cell: 'G5', ask: 'The largest fee in the column', hint: '=MAX(C4:C7)', expect: 4800 },
    ],
    solution: { C4: '=ROUND(B4*$B$1/100,0)', C5: '=ROUND(B5*$B$1/100,0)', D4: '=B4-C4', G2: '=SUM(C4:C7)', G3: '=SUM(D4:D7)', G4: '=ROUND((G2/SUM(B4:B7))*100,2)', G5: '=MAX(C4:C7)' },
    reference: [
      ['=ROUND(B4*$B$1/100,0)', 'the row moves, the rate is pinned'],
      ['=B4-C4', 'amount minus fee'],
      ['=SUM(C4:C7)', 'total the fee column'],
      ['=ROUND((G2/SUM(B4:B7))*100,2)', 'fee as a share of what it is charged on'],
    ],
    debrief:
      '₹12,000 of fees on ₹10 lakh of assets is 1.2%, and the largest single fee is ₹4,800 on the index fund. Copy C4 down without the dollars and the second row would read an empty cell — the fee would quietly become zero, and the total would still look like a number.',
  },

  'l5-126': {
    title: 'The column that does not add up',
    brief:
      'Three things make a total wrong without making it an error: a number stored as text, a row entered twice, and a total nobody checked. Find all three in one column.',
    steps: [
      'Column B holds ten expenses, and one of them is text rather than a number.',
      'Total the column in G2. SUM skips the text cell silently — it does not warn you.',
      'Compare the two counts. COUNTA counts cells that hold something; COUNT counts only the numeric ones. The gap is the trap.',
      'Two doctor visits are the same bill entered twice. G6 removes one of them from the total.',
      'G5 shows what the total becomes once the electricity figure is corrected to a number, and G7 is the average of the lines SUM actually added.',
    ],
    starter: {
      A1: 'Expense', B1: 'Amount ₹',
      A2: 'Rent', B2: '18000',
      A3: 'Groceries', B3: '9500',
      A4: 'Petrol', B4: '3200',
      A5: 'Electricity', B5: '1980 pending',
      A6: 'Internet', B6: '1499',
      A7: 'School fees', B7: '12000',
      A8: 'Doctor visit', B8: '1500',
      A9: 'Doctor visit', B9: '1500',
      A10: 'Insurance premium', B10: '12360',
      A11: 'Gym', B11: '1200',
      D1: 'Answer', E1: 'Value',
      D2: 'What SUM returns',
      D3: 'Cells that hold something',
      D4: 'Cells SUM actually added',
      D5: 'Total once the text row is a number',
      D6: 'Total without the duplicate line',
      D7: 'Average of the lines SUM added, rounded',
    },
    tasks: [
      { cell: 'E2', ask: 'The total as the sheet currently computes it', hint: '=SUM(B2:B11)', expect: 60759 },
      { cell: 'E3', ask: 'How many cells hold any content', hint: '=COUNTA(B2:B11)', expect: 10 },
      { cell: 'E4', ask: 'How many cells SUM counted', hint: '=COUNT(B2:B11)', expect: 9 },
      { cell: 'E5', ask: 'The total with the electricity bill added as 1,980', hint: '=E2+1980', expect: 62739 },
      { cell: 'E6', ask: 'The total once one duplicate doctor line is removed', hint: '=E2-1500', expect: 59259 },
      { cell: 'E7', ask: 'Average of the nine numeric lines, rounded', hint: '=ROUND(AVERAGE(B2:B11),0)', expect: 6751 },
    ],
    solution: { E2: '=SUM(B2:B11)', E3: '=COUNTA(B2:B11)', E4: '=COUNT(B2:B11)', E5: '=E2+1980', E6: '=E2-1500', E7: '=ROUND(AVERAGE(B2:B11),0)' },
    reference: [
      ['=SUM(B2:B11)', 'adds numbers and skips text'],
      ['=COUNTA(B2:B11)', 'how many cells are not empty'],
      ['=COUNT(B2:B11)', 'how many cells hold numbers'],
      ['=ROUND(AVERAGE(B2:B11),0)', 'average of the numeric cells only'],
    ],
    debrief:
      'SUM returns ₹60,759 for a month that actually cost ₹62,739, because “1980 pending” is text. The duplicate doctor line adds another ₹1,500 of error in the opposite direction. The check that catches both costs one cell: compare COUNT with COUNTA, and reconcile the difference before you act on the total.',
  },

  'l5-127': {
    title: 'A flag column that tells you what to chase',
    brief:
      'One IF turns a date into a decision. Build a flag column, count it, then let a second condition decide whether the invoice needs a reminder or an escalation.',
    steps: [
      'Column C is how many days late each invoice is. Column D says whether proof of the bill is on file.',
      'Column E is the flag: 1 where the invoice is more than 30 days late, otherwise 0. Rows 3 to 8 already carry the formula; write E2.',
      'G2 sums the flag column, which is the same as counting the invoices that need action.',
      'G3 is a nested IF: 2 if anything is more than 60 days late, 1 if anything is more than 30, otherwise 0.',
      'G4 and G5 put a rupee value on the problem, and G6 tests whether the overdue amount is more than a quarter of the total.',
    ],
    starter: {
      A1: 'Invoice', B1: 'Amount ₹', C1: 'Days late', D1: 'Proof on file', E1: 'Flag',
      A2: 'Vendor A', B2: '24000', C2: '12', D2: 'Yes',
      A3: 'Vendor B', B3: '8500', C3: '0', D3: 'Yes', E3: '=IF(C3>30,1,0)',
      A4: 'Vendor C', B4: '45000', C4: '45', D4: 'No', E4: '=IF(C4>30,1,0)',
      A5: 'Vendor D', B5: '12000', C5: '5', D5: 'No', E5: '=IF(C5>30,1,0)',
      A6: 'Vendor E', B6: '6800', C6: '0', D6: 'Yes', E6: '=IF(C6>30,1,0)',
      A7: 'Vendor F', B7: '30000', C7: '31', D7: 'Yes', E7: '=IF(C7>30,1,0)',
      A8: 'Vendor G', B8: '15000', C8: '0', D8: 'No', E8: '=IF(C8>30,1,0)',
      F1: 'Answer', G1: 'Value',
      F2: 'Invoices flagged for chasing',
      F3: 'Escalation level: 2 over 60 days, 1 over 30, else 0',
      F4: 'Amount stuck in invoices over 30 days late',
      F5: 'Of that, the amount with no proof on file',
      F6: '1 if more than a quarter of the total is overdue',
      F7: 'Largest single invoice',
    },
    tasks: [
      { cell: 'E2', ask: 'Flag the first invoice: 1 if more than 30 days late, else 0', hint: '=IF(C2>30,1,0)', expect: 0 },
      { cell: 'G2', ask: 'How many invoices the flag column marks', hint: '=SUM(E2:E8)', expect: 2 },
      { cell: 'G3', ask: 'The escalation level, using a nested IF', hint: '=IF(COUNTIF(C2:C8,">60")>0,2,IF(COUNTIF(C2:C8,">30")>0,1,0))', expect: 1 },
      { cell: 'G4', ask: 'Rupee value of everything more than 30 days late', hint: '=SUMIF(C2:C8,">30",B2:B8)', expect: 75000 },
      { cell: 'G5', ask: 'Overdue amount where no proof is on file', hint: '=SUMIFS(B2:B8,C2:C8,">30",D2:D8,"No")', expect: 45000 },
      { cell: 'G6', ask: '1 if overdue value is above a quarter of the total', hint: '=IF(G4/SUM(B2:B8)>0.25,1,0)', expect: 1 },
      { cell: 'G7', ask: 'The biggest invoice on the sheet', hint: '=MAX(B2:B8)', expect: 45000 },
    ],
    solution: { E2: '=IF(C2>30,1,0)', G2: '=SUM(E2:E8)', G3: '=IF(COUNTIF(C2:C8,">60")>0,2,IF(COUNTIF(C2:C8,">30")>0,1,0))', G4: '=SUMIF(C2:C8,">30",B2:B8)', G5: '=SUMIFS(B2:B8,C2:C8,">30",D2:D8,"No")', G6: '=IF(G4/SUM(B2:B8)>0.25,1,0)', G7: '=MAX(B2:B8)' },
    reference: [
      ['=IF(C2>30,1,0)', 'a test that returns a number you can sum'],
      ['=IF(a,2,IF(b,1,0))', 'a nested test, read from the inside out'],
      ['=SUMIF(C2:C8,">30",B2:B8)', 'value of the rows a condition selects'],
      ['=SUMIFS(B2:B8,C2:C8,">30",D2:D8,"No")', 'two conditions at once'],
    ],
    debrief:
      'Two invoices worth ₹75,000 are more than 30 days late, and ₹45,000 of that has no proof on file — which is why the escalation level is 1 and not 2. The flag column is the part to keep: once the decision is a 1 or a 0, counting it, summing it and charting it all become ordinary arithmetic.',
  },

  'l5-128': {
    title: 'Asking several questions of one month',
    brief:
      'A plain total cannot tell you where the money went. Three conditions at once can: one month, one category, one payment mode.',
    steps: [
      'Columns A to D are a transaction log: month, category, payment mode and amount.',
      'G2 asks for food in August — two conditions, two criteria ranges, one sum range.',
      'G3 adds the payment mode as a third condition, which is the only way to separate a card swipe from a UPI transfer.',
      'G4 and G5 look at August as a whole: the month total, then only the rows above ₹2,000. A number can be a criterion, not just a label.',
      'G6 counts the August rows, and G7 turns the food total into a share of the month.',
    ],
    starter: {
      A1: 'Month', B1: 'Category', C1: 'Mode', D1: 'Amount ₹',
      A2: 'Aug', B2: 'Food', C2: 'Card', D2: '1450',
      A3: 'Aug', B3: 'Food', C3: 'UPI', D3: '620',
      A4: 'Aug', B4: 'Transport', C4: 'UPI', D4: '380',
      A5: 'Aug', B5: 'Home', C5: 'Auto-debit', D5: '1800',
      A6: 'Aug', B6: 'Food', C6: 'Card', D6: '2400',
      A7: 'Aug', B7: 'Health', C7: 'UPI', D7: '1500',
      A8: 'Sep', B8: 'Food', C8: 'UPI', D8: '900',
      A9: 'Sep', B9: 'Food', C9: 'Card', D9: '3100',
      A10: 'Sep', B10: 'Transport', C10: 'Card', D10: '1200',
      A11: 'Sep', B11: 'Home', C11: 'Auto-debit', D11: '1800',
      A12: 'Sep', B12: 'Health', C12: 'UPI', D12: '4200',
      A13: 'Sep', B13: 'Food', C13: 'UPI', D13: '750',
      F1: 'Answer', G1: 'Value ₹',
      F2: 'Food in August',
      F3: 'Food paid by card in August',
      F4: 'Everything in August',
      F5: 'August rows above ₹2,000',
      F6: 'How many August rows',
      F7: 'Food as a share of August, %',
    },
    tasks: [
      { cell: 'G2', ask: 'Food in August, two conditions', hint: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food")', expect: 4470 },
      { cell: 'G3', ask: 'Food paid by card in August, three conditions', hint: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food",C2:C13,"Card")', expect: 3850 },
      { cell: 'G4', ask: 'Every August row added together', hint: '=SUMIF(A2:A13,"Aug",D2:D13)', expect: 8150 },
      { cell: 'G5', ask: 'August rows above ₹2,000, using a number as a criterion', hint: '=SUMIFS(D2:D13,A2:A13,"Aug",D2:D13,">2000")', expect: 2400 },
      { cell: 'G6', ask: 'How many rows belong to August', hint: '=COUNTIF(A2:A13,"Aug")', expect: 6 },
      { cell: 'G7', ask: 'Food as a percentage of August, one decimal', hint: '=ROUND((G2/G4)*100,1)', expect: 54.8 },
    ],
    solution: { G2: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food")', G3: '=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food",C2:C13,"Card")', G4: '=SUMIF(A2:A13,"Aug",D2:D13)', G5: '=SUMIFS(D2:D13,A2:A13,"Aug",D2:D13,">2000")', G6: '=COUNTIF(A2:A13,"Aug")', G7: '=ROUND((G2/G4)*100,1)' },
    reference: [
      ['=SUMIFS(D2:D13,A2:A13,"Aug",B2:B13,"Food")', 'sum where two conditions hold'],
      ['=SUMIFS(...,D2:D13,">2000")', 'a numeric criterion needs quotes around the operator'],
      ['=SUMIF(A2:A13,"Aug",D2:D13)', 'one condition is a shorter SUMIFS'],
      ['=ROUND((G2/G4)*100,1)', 'one filtered total as a share of another'],
    ],
    debrief:
      'Food took ₹4,470 of ₹8,150 in August — 54.8% of the month — and ₹3,850 of it went on a card. Every answer here came from one log with no helper columns, which is the point of SUMIFS: it asks the question of the data you already keep.',
  },
}

/**
 * Used only for a chapter that has not been given its own sheet above. It keeps
 * the lab usable rather than blank, and the number of entries in
 * `sheetScenarios` is asserted by `npm run test:sheet`.
 */
export const sheetFallback: SheetScenario = {
  title: 'Spreadsheet sandbox',
  brief:
    'A month of spending, ready to total. Build the four summaries and the formulas will work the same way on any sheet you keep.',
  steps: [
    'Column C holds the amounts and column B the category each expense belongs to.',
    'Total the month in G2.',
    'Use the category column to total Home and Fun separately in G3 and G4.',
    'Find the biggest single expense in G5 and the average in G6.',
    'Finally, use the income in E1 to work out the saving rate in G7.',
  ],
  starter: {
    A1: 'Expense', B1: 'Category', C1: 'Amount ₹',
    A2: 'Rent', B2: 'Home', C2: '15000',
    A3: 'Groceries', B3: 'Food', C3: '4200',
    A4: 'Coffee', B4: 'Food', C4: '350',
    A5: 'Movie', B5: 'Fun', C5: '900',
    A6: 'Electricity', B6: 'Home', C6: '1800',
    A7: 'Shopping', B7: 'Fun', C7: '2600',
    A8: 'Salon', B8: 'Fun', C8: '700',
    D1: 'Monthly income ₹', E1: '50000',
    F1: 'Answer', G1: 'Value',
    F2: 'Total expenses',
    F3: 'Spend on Home',
    F4: 'Spend on Fun',
    F5: 'Largest single expense',
    F6: 'Average expense',
    F7: 'Saving rate %',
  },
  tasks: [
    { cell: 'G2', ask: 'Everything spent this month', hint: '=SUM(C2:C8)', expect: 25550 },
    { cell: 'G3', ask: 'Total spent on the Home category', hint: '=SUMIF(B2:B8,"Home",C2:C8)', expect: 16800 },
    { cell: 'G4', ask: 'Total spent on the Fun category', hint: '=SUMIF(B2:B8,"Fun",C2:C8)', expect: 4200 },
    { cell: 'G5', ask: 'The largest single expense', hint: '=MAX(C2:C8)', expect: 15000 },
    { cell: 'G6', ask: 'The average expense, rounded', hint: '=ROUND(AVERAGE(C2:C8),0)', expect: 3650 },
    { cell: 'G7', ask: 'Saving rate, using the income in E1, one decimal', hint: '=ROUND(((E1-G2)/E1)*100,1)', expect: 48.9 },
  ],
  solution: { G2: '=SUM(C2:C8)', G3: '=SUMIF(B2:B8,"Home",C2:C8)', G4: '=SUMIF(B2:B8,"Fun",C2:C8)', G5: '=MAX(C2:C8)', G6: '=ROUND(AVERAGE(C2:C8),0)', G7: '=ROUND(((E1-G2)/E1)*100,1)' },
  reference: [
    ['=SUM(C2:C8)', 'add a range'],
    ['=SUMIF(B2:B8,"Home",C2:C8)', 'add where a condition matches'],
    ['=MAX(C2:C8) / =AVERAGE(C2:C8)', 'largest and average'],
    ['=ROUND(x,0)', 'round to whole rupees'],
  ],
  debrief:
    '₹25,550 of ₹50,000 spent, a 48.9% saving rate — and the same four formulas work on any sheet you build from here.',
}
