import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-144: find the assumption that is doing the work. */

export const l5_144: Chapter = {
  id: 'l5-144',
  title: 'Sensitivity Analysis',
  subtitle: 'Find which single assumption moves your plan most, and hedge that one.',
  minutes: 9,
  blocks: [
    scene(
      'tornado-chart',
      'Four assumptions ranked by how far they move goal coverage, with the horizon at the top.',
    ),
    {
      kind: 'p',
      text: 'A projection is a stack of assumptions, and they are not equally important. Change one by a reasonable amount and the answer barely moves; change another and the plan goes from funded to short. Sensitivity analysis is the habit of testing them one at a time, so that the effort you spend on the plan goes to the assumption that actually decides it. Without it, people optimise the number they find easiest to change.',
    },
    { kind: 'h', text: 'One knob at a time' },
    {
      kind: 'p',
      text: 'The method is mechanical. Take the base plan, pick an assumption, move it to a plausible low and a plausible high while holding everything else still, and record how far the output moves. Do that for each assumption and sort the results by the size of the swing. The chart that comes out — widest bar at the top, narrowing down — is called a tornado chart, and the ordering is the whole point.',
    },
    {
      kind: 'table',
      caption: 'Coverage of a ₹1.5 crore goal under four assumptions, one at a time',
      headers: ['Assumption', 'Low case', 'High case', 'Swing in coverage'],
      rows: [
        ['Horizon 10–20 years', '33%', '66%', '32.4 points'],
        ['Return 8–14%', '35%', '66%', '31.6 points'],
        ['Inflation 4–8%', '64%', '36%', '27.5 points'],
        ['Saving ₹15k–35k', '35%', '61%', '25.5 points'],
      ],
    },
    {
      kind: 'p',
      text: 'The order is not a law of nature; it depends on the ranges you choose. With a wider range for inflation, inflation could come top. That is why the low and high values have to be plausible rather than dramatic: a range of 0% to 20% inflation would make inflation dominate any plan and teach nothing. The useful question is not “what is the worst imaginable value” but “what range would a reasonable person actually plan across”.',
    },
    { kind: 'h', text: 'The largest driver is not always the one to change' },
    {
      kind: 'p',
      text: 'In the table above, the horizon dominates. But the horizon is often fixed by the goal — a school fee is due when it is due, and retirement arrives at an age. When the biggest driver cannot be moved, the ranking tells you what to do next: work down the list to the largest one you control. Here that is the return assumption, and the honest response to it is not to assume a higher return; it is to save more, hold the plan longer where possible, or lower the goal. The ranking tells you where the leverage is, not that the lever is yours to pull.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'One at a time hides the interaction',
      text: 'A one-way sensitivity moves one assumption and leaves the rest at the base. Reality moves several at once, and the effects can compound: high inflation and a low return together are worse than the sum of the two separate swings, because the goal grows while the corpus does not. The tornado is a screening tool. Once it names the two largest drivers, test them together — that is what a stress test does.',
    },
    {
      kind: 'example',
      title: 'What the ranking changes about the advice',
      text: 'A household with a fifteen-year goal, an 11% return assumption, 6% inflation and ₹25,000 of monthly saving is 48% funded. The tornado says the horizon moves coverage 32 points, the return 32, inflation 28 and the monthly saving 26. The temptation is to argue about the return. The ranking says the return is roughly as important as the horizon and more important than the saving — and the return is the one thing the household cannot set. The action follows from that: hold the plan for the full horizon, do not spend the good years, and raise the saving because it is the controllable input nearest the top.',
    },
    {
      kind: 'list',
      items: [
        'Choose plausible ranges and write them down; the ranking is only as meaningful as the ranges.',
        'Measure the output you care about — coverage, months of cover, years to the goal — not a proxy.',
        'Sort by swing, then ask which of the top two you can actually change.',
        'Re-run the analysis when the plan changes, because the ranking moves with the base case.',
        'Do not average the scenarios into one number. The point is to act on the driver, not to produce a middle estimate.',
      ],
    },
    sim(
      'l5-sensitivity-model',
      'Read the tornado, then pick the assumption that moves coverage most and check your answer against the ranking.',
    ),
    l5Illustrative(
      'The plan and the assumption ranges in the lab are invented. The one-at-a-time method, the tornado ordering and the controllable-driver rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'One-way sensitivity',
          meaning: 'Changing a single assumption while holding every other input at its base value.',
        },
        {
          term: 'Tornado chart',
          meaning: 'A horizontal bar chart of sensitivities, sorted largest swing first, so the shape narrows down the page.',
        },
        {
          term: 'Interaction effect',
          meaning: 'The extra change produced when two assumptions move together, beyond the sum of their separate effects.',
        },
        {
          term: 'Controllable driver',
          meaning: 'An assumption the household can actually change — saving, costs, goal date — as opposed to the market return.',
        },
      ],
    },
    l5Sources(['rbi'], [
      'Reserve Bank of India — the financial stability reports publish sensitivity analyses of the banking system, which is the same one-knob-at-a-time method applied at a different scale',
    ]),
  ],
  quiz: [
    {
      q: 'What does a tornado chart rank?',
      options: [
        {
          text: 'Assumptions by how far the output moves when each is changed alone across a plausible range',
          correct: true,
          why: 'One knob at a time, everything else at base, sorted by the size of the swing. The widest bar is the assumption that decides the plan.',
        },
        {
          text: 'Assumptions by how likely they are to happen',
          why: 'Likelihood is not measured by the chart. The bars show the size of the effect, not its probability.',
        },
        {
          text: 'Scenarios by how bad their outcomes are',
          why: 'Scenarios combine several changes. A tornado isolates one assumption at a time.',
        },
        {
          text: 'Investments by their expected return',
          why: 'The chart is about the plan’s assumptions, not a product comparison.',
        },
      ],
    },
    {
      q: 'The largest driver is the horizon, which is fixed by the goal date. What should you do?',
      options: [
        {
          text: 'Work down the ranking to the largest driver you control, such as the monthly saving',
          correct: true,
          why: 'The ranking shows leverage, not permission. When the top lever cannot move, the next one is where the action is.',
        },
        {
          text: 'Ignore the analysis, because the top driver cannot be changed',
          why: 'The remaining drivers still have an order. Ignoring the ranking wastes the information about where the next unit of effort goes.',
        },
        {
          text: 'Change the goal date to make the horizon longer',
          why: 'Sometimes that is right, but it changes the goal rather than the plan. It should be a deliberate trade, not an automatic fix.',
        },
        {
          text: 'Assume a higher return to compensate',
          why: 'Raising an assumption does not raise the return. That is the one move the ranking warns against.',
        },
      ],
    },
    {
      q: 'Why can one-at-a-time sensitivity understate the risk?',
      options: [
        {
          text: 'Because assumptions can move together, and the combined effect can be worse than the separate swings added up',
          correct: true,
          why: 'High inflation with a low return hurts twice — the goal grows while the corpus does not. A one-way test holds the others still.',
        },
        {
          text: 'Because it changes too many assumptions at once',
          why: 'It changes exactly one. That is the source of the blind spot, not the cure.',
        },
        {
          text: 'Because the base case is always wrong',
          why: 'The base case is a reference, not a prediction. The issue is the interaction between assumptions.',
        },
        {
          text: 'Because plausible ranges are too wide',
          why: 'Narrow ranges would understate each effect too. The missing interaction is the specific problem.',
        },
      ],
    },
    {
      q: 'What should determine the low and high values for each assumption?',
      options: [
        {
          text: 'A range a reasonable person would actually plan across, written down so the ranking can be interpreted',
          correct: true,
          why: 'The ranking is only meaningful relative to the ranges. Dramatic extremes make whichever assumption has the widest range dominate.',
        },
        {
          text: 'The most extreme values ever recorded',
          why: 'Extremes produce a chart about history’s tail, not about the plan. The question is what to plan across.',
        },
        {
          text: 'Whatever makes the chart look balanced',
          why: 'Balancing the chart is presentation. The ranges should reflect the plan.',
        },
        {
          text: 'The values that produce the highest projected corpus',
          why: 'Choosing optimistic values defeats the purpose of a sensitivity test.',
        },
      ],
    },
  ],
  takeaway:
    'Move one assumption at a time across a written, plausible range, rank the swings, then act on the largest driver you can actually control and test the top two together.',
}
