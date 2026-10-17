import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band seven — l5-152: a wall, a rule, and money that is harder to spend. */

export const l5_152: Chapter = {
  id: 'l5-152',
  title: 'Financial Trick: Keep Emergency Money Separate From Everyday Spending',
  subtitle: 'Separate emergency money physically and psychologically, with a written rule for using it.',
  minutes: 8,
  blocks: [
    scene(
      'separation-wall',
      'Everyday money in one account and the emergency fund behind a wall in another, with the rule written below.',
    ),
    {
      kind: 'p',
      text: 'An emergency fund that sits in the spending account is not an emergency fund. It is a balance, and balances get spent. The fix is not willpower; it is structure. Move the money to a separate account, ideally at a different institution, remove the easy payment rails, and write down the rule for when it can be used. The barrier is the product. The rule is what makes the barrier legitimate.',
    },
    { kind: 'h', text: 'Separate institution, not just separate account' },
    {
      kind: 'p',
      text: 'A second account at the same bank is visible in the same app and one transfer away. That is better than the spending account and worse than a different institution, where the transfer takes a day and the balance is not on the home screen. The friction is the point. A fund that can be spent in two taps will be spent on a sale, a holiday or a “once-in-a-lifetime” offer, and each of those feels like an emergency at the moment it appears.',
    },
    {
      kind: 'table',
      caption: 'Three places to hold the fund, and what each actually protects against',
      headers: ['Held in', 'Friction', 'Protects against'],
      rows: [
        ['The spending account', 'None', 'Nothing — it is part of everyday money'],
        ['A second account at the same bank', 'One transfer', 'Some impulse spending, not a determined one'],
        ['A separate bank, no card, no UPI', 'A day or a branch visit', 'Most impulse spending, and a compromised phone'],
      ],
    },
    {
      kind: 'p',
      text: 'The trade-off is real: in a genuine emergency, a fund that takes a day is a day slower. That is why the rule matters, and why a small instant-access layer can sit beside the main fund. The design is not “make it impossible to reach”. It is “make the default hard, and make the exception deliberate”.',
    },
    { kind: 'h', text: 'Write the rule, then follow it' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Name the events: loss of income, a medical bill not covered by insurance, a safety repair, a family emergency that cannot wait.',
        'Name what it is not for: a sale, a holiday, an investment opportunity, a loan to a friend, a gadget.',
        'Set a threshold above which the decision waits a week. A real emergency rarely improves with a week; an impulse usually does not survive one.',
        'Record every withdrawal with the reason and the date. A fund with a log is harder to raid than one without.',
        'Replenish on a schedule after use, and treat the replenishment as a bill until the balance is restored.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The ₹25,000 test',
      text: 'A ₹3 lakh fund covering 5.8 months of essentials is a real buffer. Spend ₹25,000 on an offer and it covers 5.3 months — not a catastrophe, which is exactly why the withdrawal feels harmless. The danger is not one withdrawal; it is the precedent. A fund that has been used once for a non-emergency is a fund that will be used again, and the fifth withdrawal is the one that arrives in the same month as the job loss.',
    },
    {
      kind: 'p',
      text: 'Where should the fund be held? Somewhere safe, liquid within a day or two, and separate from the market. A savings account or a short fixed deposit is the usual answer; the point of the fund is certainty, not return. The interest it gives up is the premium on a guarantee, and it is small compared with the cost of borrowing in the month the income stops.',
    },
    {
      kind: 'callout',
      tone: 'india',
      title: 'Keep the access route recoverable',
      text: 'A separate bank means a separate login, a separate card and a separate set of recovery details. Keep the account in the document inventory, with the branch and the nomination, and make sure one other person knows it exists. A fund nobody can reach in an emergency is a different failure from one that is too easy to reach.',
    },
    sim(
      'l5-emergency-separation',
      'Move the fund from the spending account to a separate bank, then send a ₹25,000 offer at it and see what the wall does.',
    ),
    l5Illustrative(
      'The fund, expenses and offer in the lab are invented. The separation, the friction and the written rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Emergency fund',
          meaning: 'Money reserved for loss of income, a medical cost or a safety repair, held where it is safe and reachable within days.',
        },
        {
          term: 'Friction by design',
          meaning: 'Deliberately making a fund slower to reach so that impulse spending needs a second, deliberate action.',
        },
        {
          term: 'Borrowing rule',
          meaning: 'The written list of events the fund may be used for, and the events it may not.',
        },
        {
          term: 'Replenishment',
          meaning: 'The scheduled transfers that restore the fund after a withdrawal, treated as a bill until it is whole.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — the deposit rules and the deposit-insurance framework that determine how safe and how accessible a savings balance actually is',
    ]),
  ],
  quiz: [
    {
      q: 'Why is a separate account at the same bank only a partial fix?',
      options: [
        {
          text: 'Because it is still visible in the same app and one transfer away',
          correct: true,
          why: 'Friction is what protects the fund. The same app with one transfer is a speed bump, not a wall.',
        },
        {
          text: 'Because the same bank pays less interest',
          why: 'Interest is not the issue. Accessibility is.',
        },
        {
          text: 'Because deposits at the same bank are not insured',
          why: 'Deposit insurance is per bank and per depositor, and it is not the reason to separate.',
        },
        {
          text: 'Because the fund cannot be nominated',
          why: 'Nomination is possible on a second account. The issue is the ease of spending.',
        },
      ],
    },
    {
      q: 'What does a written rule add to a separated fund?',
      options: [
        {
          text: 'A definition of what counts as an emergency, so a withdrawal is a decision rather than a mood',
          correct: true,
          why: 'The wall handles impulse. The rule handles the moment when the money is reachable and the reason sounds convincing.',
        },
        {
          text: 'A higher interest rate',
          why: 'A rule does not change the product. It changes the decision.',
        },
        {
          text: 'A guarantee that the fund will never be used',
          why: 'It will be used. The rule makes the use deliberate and recorded.',
        },
        {
          text: 'A legal protection against creditors',
          why: 'A personal rule has no such effect. Legal protection is a separate question.',
        },
      ],
    },
    {
      q: 'A ₹3 lakh fund covers 5.8 months. Spending ₹25,000 on an offer leaves what, and why is that dangerous?',
      options: [
        {
          text: '5.3 months — the danger is the precedent, not the single withdrawal',
          correct: true,
          why: 'One withdrawal looks harmless. The habit of treating the fund as available is what empties it before the real emergency.',
        },
        {
          text: 'Zero months, because the fund is gone',
          why: 'The balance is still ₹2.75 lakh. The arithmetic does not collapse from one withdrawal.',
        },
        {
          text: '5.8 months, because the offer is not an emergency',
          why: 'If the money is spent, the cover falls. The rule is what should have prevented the spending.',
        },
        {
          text: 'It cannot be calculated without the interest rate',
          why: 'Cover is the balance divided by monthly essentials. The interest rate is not needed for the months figure.',
        },
      ],
    },
    {
      q: 'Where should the emergency fund be held?',
      options: [
        {
          text: 'Somewhere safe and liquid within a day or two, separate from the market',
          correct: true,
          why: 'The fund’s job is certainty. Market-linked holdings can fall exactly when the emergency arrives.',
        },
        {
          text: 'In equity funds, for a higher return',
          why: 'A market fall and a job loss often arrive together. The fund should not depend on the market.',
        },
        {
          text: 'In a long-term fixed deposit with a penalty for early withdrawal',
          why: 'A penalty is friction, but the money also needs to be reachable quickly. A short deposit or savings account fits better.',
        },
        {
          text: 'In the spending account, for convenience',
          why: 'That is the arrangement the chapter is trying to replace.',
        },
      ],
    },
  ],
  takeaway:
    'Hold the fund at a separate institution, remove the easy rails, write the events it may and may not be used for, and replenish it on a schedule after every use.',
}
