import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-143: name the future, write the response. */

export const l5_143: Chapter = {
  id: 'l5-143',
  title: 'Scenario Analysis',
  subtitle: 'Build named scenarios for a plan and write the response you would take in each one.',
  minutes: 9,
  blocks: [
    scene(
      'scenario-fan',
      'One base plan branching into a bad decade, a high-inflation case and a strong-market case, each with its response.',
    ),
    {
      kind: 'p',
      text: 'A forecast asks what will happen. A scenario asks what you would do if a particular thing happened. The difference is the difference between being right and being prepared. A plan with one set of assumptions is a bet that those assumptions hold for fifteen years; a plan with four named scenarios is a set of decisions that has already survived four different futures on paper.',
    },
    { kind: 'h', text: 'A scenario is three things, not one' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'A name, so it can be discussed. “Bad decade” is a name; “the pessimistic one” is not.',
        'The assumptions that change, stated as numbers. A scenario that says “markets are poor” cannot be tested; one that says “7% return for fifteen years” can.',
        'The response you would take. Without it, the scenario is a mood rather than a plan.',
      ],
    },
    {
      kind: 'p',
      text: 'The base case is not the most likely case. It is the case the plan was built for, and it earns its place by being the reference against which the others are measured. The other scenarios should be chosen for what they would force you to change, not for how likely they feel. A scenario that produces no different response is not worth maintaining; a scenario that produces a response you would refuse to take is telling you something about the plan.',
    },
    {
      kind: 'table',
      caption: 'A household plan under four named scenarios',
      headers: ['Scenario', 'What changes', 'Corpus', 'Coverage of goal', 'Response'],
      rows: [
        ['Base', '11% return, 6% inflation', '₹1.72 crore', '48%', 'Review yearly'],
        ['Bad decade', '7% return for 15 years', '₹1.13 crore', '31%', 'Save ₹10,000 more a month'],
        ['High inflation', '8% inflation', '₹1.72 crore', '36%', 'Restate the goal, raise saving'],
        ['Strong markets', '14% return for 15 years', '₹2.39 crore', '66%', 'Do not raise spending'],
      ],
    },
    {
      kind: 'p',
      text: 'Notice that the strong-markets scenario also has a response: do not treat the extra as income. A scenario is not only a warning. It is a rehearsed decision for a good outcome too, because the good outcome is where lifestyle spending quietly absorbs the margin the plan needed for the bad one.',
    },
    { kind: 'h', text: 'Do not multiply scenarios' },
    {
      kind: 'p',
      text: 'Four assumptions with three values each produce eighty-one combinations. Nobody maintains eighty-one responses, and a plan that tries becomes a spreadsheet nobody opens. The practical rule is four to six scenarios, each chosen because it changes a decision: a bad return, a high-inflation path, a job loss, a rate rise, a good market. Combinations are handled by the stress test, which is the next chapter but one.',
    },
    {
      kind: 'example',
      title: 'The same ₹25,000, four different futures',
      text: 'With ₹12 lakh already invested, ₹25,000 saved a month, a ₹1.5 crore goal in fifteen years and 6% inflation, the base case projects ₹1.72 crore against a ₹3.59 crore goal — 48%. A 7% return leaves ₹1.13 crore and 31%. Eight per cent inflation leaves the corpus unchanged but raises the goal to ₹4.76 crore, for 36%. A 14% return gives ₹2.39 crore and 66%. Four futures, four written responses, one page.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'A scenario is not a probability',
      text: 'Attaching a 30% chance to a scenario invites false precision and endless argument about the number. The scenarios are there to be survived, not to be weighted into an expected value. If a probability helps you decide how much to prepare, write it down as a judgment, label it as a judgment, and do not let it become the plan.',
    },
    sim(
      'l5-scenario-planner',
      'Select each named scenario, read what it does to corpus and coverage, and compare the response written beside it.',
    ),
    l5Illustrative(
      'The household plan, returns and goal in the lab are invented. The three-part scenario structure, the response discipline and the small-number rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Base case',
          meaning: 'The set of assumptions the plan was built on, used as the reference for every other scenario.',
        },
        {
          term: 'Scenario',
          meaning: 'A named set of changed assumptions together with the response the household would take.',
        },
        {
          term: 'Coverage',
          meaning: 'The projected corpus as a fraction of the goal restated at the goal date. Below 100% is a shortfall.',
        },
        {
          term: 'Response',
          meaning: 'The action already decided for a scenario, so the decision does not have to be made in the middle of it.',
        },
      ],
    },
    l5Sources(['rbi', 'sebi'], [
      'Reserve Bank of India — the financial stability reports discuss scenario and stress analysis explicitly, which is the same method applied to a household rather than a bank',
      'Securities and Exchange Board of India — the risk-disclosure and investor-education material on market returns is the context for why a single return assumption is not a plan',
    ]),
  ],
  quiz: [
    {
      q: 'What turns a set of assumptions into a scenario?',
      options: [
        {
          text: 'A name, the specific assumptions that change, and the response you would take',
          correct: true,
          why: 'All three are needed. Without a response it is a mood; without stated numbers it cannot be tested.',
        },
        {
          text: 'A probability assigned to it',
          why: 'A probability is optional and often false precision. The response is what makes the scenario useful.',
        },
        {
          text: 'A longer time horizon than the base case',
          why: 'The horizon can be one of the changed assumptions, but it is not what defines a scenario.',
        },
        {
          text: 'Agreement from everyone in the household',
          why: 'Agreement matters for acting on a plan, but the scenario exists as soon as the assumptions and response are written.',
        },
      ],
    },
    {
      q: 'Why write the response before the scenario happens?',
      options: [
        {
          text: 'Because the decision is easier to make calmly, and the response is what makes the scenario actionable',
          correct: true,
          why: 'A scenario without a response is a prediction in disguise. The written response converts it into a prepared decision.',
        },
        {
          text: 'Because it guarantees the scenario will not happen',
          why: 'It does not. Preparation changes what you do, not what occurs.',
        },
        {
          text: 'Because the response must be approved by a regulator',
          why: 'No approval is involved. It is a personal plan.',
        },
        {
          text: 'Because a response makes the projection more accurate',
          why: 'The projection is unaffected. The response changes the outcome, not the model.',
        },
      ],
    },
    {
      q: 'Why keep the number of scenarios small?',
      options: [
        {
          text: 'Because each scenario needs a maintained response, and many combinations produce a document nobody uses',
          correct: true,
          why: 'Four assumptions with three values each give eighty-one cases. A handful chosen for the decisions they change is what stays useful.',
        },
        {
          text: 'Because a spreadsheet cannot hold more than five scenarios',
          why: 'It can hold as many as you build. The limit is attention and maintenance, not the tool.',
        },
        {
          text: 'Because more scenarios make each one less likely',
          why: 'Likelihood is not a budget that gets divided. The reason is usability, not probability.',
        },
        {
          text: 'Because the base case already covers the others',
          why: 'The base case covers one set of assumptions. The others are there precisely because it does not cover them.',
        },
      ],
    },
    {
      q: 'A scenario shows 48% coverage. What does that mean?',
      options: [
        {
          text: 'The projected corpus would fund 48% of the goal restated at the goal date, so the plan needs a change',
          correct: true,
          why: 'Coverage compares the projected corpus with the inflated goal. Below 100% is a shortfall that has to be closed by saving more, changing the goal or changing the date.',
        },
        {
          text: 'The plan has a 48% chance of success',
          why: 'Coverage is a ratio of amounts, not a probability. No likelihood is implied.',
        },
        {
          text: 'The corpus is 48% of today’s goal, before inflation',
          why: 'A useful projection restates the goal at the goal date. Comparing with today’s amount would overstate coverage.',
        },
        {
          text: 'The return assumption is 48% of the target return',
          why: 'Coverage is about corpus against goal, not about the return input.',
        },
      ],
    },
  ],
  takeaway:
    'Name four to six futures that would change a decision, state the assumptions as numbers, write the response beside each one, and treat the base case as the reference rather than the forecast.',
}
