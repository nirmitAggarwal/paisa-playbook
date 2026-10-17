import type { Chapter } from '../../types'
import { scene, sim } from '../../lib/chapter-blocks'
import { l5Illustrative, l5Sources } from '../../lib/l5-blocks'

/** Level 5, band six — l5-131: a chart is an argument, not a decoration. */

export const l5_131: Chapter = {
  id: 'l5-131',
  title: 'Charts',
  subtitle: 'Choose the chart that answers the question, and avoid the ones that mislead you.',
  minutes: 9,
  blocks: [
    scene(
      'chart-choice',
      'Four questions, four charts, and the same four bars drawn twice with different axes.',
    ),
    {
      kind: 'p',
      text: 'A chart is a claim about data, made in shapes. The shape decides what a reader notices before they read a single number, which is why the choice of chart is an argument about what matters. Most bad charts are not lies; they are answers to a question nobody asked. A pie of twelve months, a line through categories, a bar chart whose axis starts at 90 — each is technically made from the data and each sends the reader somewhere the data does not go.',
    },
    { kind: 'h', text: 'Start with the question, not the data' },
    {
      kind: 'table',
      caption: 'Four questions and the chart that answers each',
      headers: ['The question', 'The chart', 'Why'],
      rows: [
        ['How did it change over time?', 'A line, with time on the horizontal axis', 'A line encodes direction and continuity, which is what a trend is'],
        ['Which one is biggest?', 'Bars on a common baseline', 'Length is the comparison the eye makes most accurately'],
        ['What is it made of?', 'A stacked bar, or a 100% stacked bar', 'Stacking shows parts of a whole and the total at the same time'],
        ['Do these two move together?', 'A scatter plot', 'Two measurements per point is exactly what a scatter encodes'],
      ],
    },
    {
      kind: 'p',
      text: 'The corollary is that some charts are almost never right. A pie is readable with three or four slices and unreadable with twelve; it also forces every comparison to be a comparison of angles, which people judge poorly. A line through categorical data implies an order and a continuity that do not exist. A 3D chart adds a dimension that encodes nothing and distorts the lengths that were the point.',
    },
    { kind: 'h', text: 'The axis is where a chart becomes dishonest' },
    {
      kind: 'p',
      text: 'A bar chart is read by the length of the bar from the axis. Truncate the axis — start it at 90 instead of 0 — and a bar representing ₹25,000 becomes a sliver next to a bar representing ₹24,000, or the reverse, depending on where the cut falls. The numbers on the axis remain correct. The picture does not, and the picture is what most readers take away. Line charts may legitimately start away from zero, because a line encodes change rather than magnitude, but the axis still has to be labelled so the reader knows.',
    },
    {
      kind: 'example',
      title: 'Six months, three honest charts, one dishonest one',
      text: 'Surplus across April to September runs 17,000, 11,500, 24,000, 6,500, 15,000 and 25,000. A line shows the dip in July and the recovery. Bars compare the months. A stacked bar of rent, food and transport shows what the month is made of. The same bars with an axis starting at ₹20,000 make July disappear and June look like a rounding error, while every printed number stays correct.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Label the axis with units. A chart whose vertical axis says only “value” cannot be checked by the person reading it.',
        'Put a target or a reference line on any chart used for a decision: a 20% saving target turns a pleasant shape into an answer.',
        'Use one colour per meaning across every chart in a report. A category that is green on one page and red on the next costs the reader attention.',
        'Prefer small multiples — the same chart repeated for each year — over one crowded chart with twelve series.',
        'If the chart needs a paragraph to explain what to look at, the chart has not done its job.',
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'A log scale is honest only when it is labelled',
      text: 'A log axis compresses large values, which is useful when a series grows by multiples: the early years would otherwise vanish into the axis. It is not a trick, and it is not a substitute for a truncated axis either. The rule is that the reader must be told, because equal vertical distances no longer mean equal amounts. An unlabelled log axis is a misleading chart with a respectable name.',
    },
    sim(
      'l5-chart-builder',
      'Match four questions to four charts, then move a bar chart axis from zero and watch the same six months tell a different story.',
    ),
    l5Illustrative(
      'The six monthly surpluses in the lab are invented. The question-to-chart mapping and the axis rule are the content.',
    ),
    {
      kind: 'terms',
      items: [
        {
          term: 'Truncated axis',
          meaning: 'An axis that starts above zero. Correct for a line of change, misleading for a bar, where length is the value.',
        },
        {
          term: 'Log scale',
          meaning: 'An axis where equal distances represent multiplication rather than addition. Honest when labelled, misleading when not.',
        },
        {
          term: 'Small multiples',
          meaning: 'The same chart repeated side by side for different periods or groups, instead of one chart with many series.',
        },
        {
          term: 'Reference line',
          meaning: 'A target or threshold drawn on the chart, so the reader can see whether the data clears it rather than judging a shape in isolation.',
        },
      ],
    },
    l5Sources(['incometax'], [
      'Income Tax Department — the published statistics are a good exercise in reading official charts critically: check the axis, the units and the year before drawing a conclusion',
    ]),
  ],
  quiz: [
    {
      q: 'You need to show how the monthly surplus moved from April to September. Which chart?',
      options: [
        {
          text: 'A line chart with the months on the horizontal axis',
          correct: true,
          why: 'Time is ordered, and a line encodes direction. It shows the dip and the recovery in one shape.',
        },
        {
          text: 'A pie chart of the six months',
          why: 'A pie compares parts of a whole. Six months are not slices of a total, and the angles would be unreadable.',
        },
        {
          text: 'A stacked bar of all six months',
          why: 'Stacking adds the months into a total nobody asked for, and hides the movement completely.',
        },
        {
          text: 'A 3D column chart',
          why: 'The third dimension encodes nothing and distorts the heights that were the point.',
        },
      ],
    },
    {
      q: 'A bar chart of four values starts its axis at 90. What is the effect?',
      options: [
        {
          text: 'The bars no longer represent the values by length, so small differences look enormous',
          correct: true,
          why: 'A bar is read from the axis. Cutting the bottom off leaves a short bar standing for a large value, which is a visual exaggeration even though the labels are right.',
        },
        {
          text: 'Nothing, because the axis labels are still correct',
          why: 'The labels are correct and the shape is not. Readers take the shape, not the labels.',
        },
        {
          text: 'It converts the chart to a log scale',
          why: 'A log scale is a labelled transformation. Truncation is a crop that is not disclosed.',
        },
        {
          text: 'The bars become proportional again if data labels are shown',
          why: 'Labels help a careful reader. The picture still carries the message, and the picture is distorted.',
        },
      ],
    },
    {
      q: 'When is a truncated axis defensible?',
      options: [
        {
          text: 'On a line chart showing small changes, where the axis is labelled and the zero point is stated',
          correct: true,
          why: 'A line encodes change, not length, so starting away from zero can be legitimate — as long as the reader is told where it starts.',
        },
        {
          text: 'On a bar chart, where the bars would otherwise look similar',
          why: 'Making similar values look different is exactly the distortion a bar chart cannot afford.',
        },
        {
          text: 'Whenever the differences are small enough to need emphasis',
          why: 'Emphasis is an editorial choice; the axis is a factual one. Small differences should look small.',
        },
        {
          text: 'Never, under any circumstances',
          why: 'A line of a share price or a temperature series often needs a non-zero floor to be readable. The rule is disclosure, not prohibition.',
        },
      ],
    },
    {
      q: 'Which chart answers “what is this month made of”?',
      options: [
        {
          text: 'A stacked bar of the categories, with the whole bar representing the month',
          correct: true,
          why: 'Composition is a part-to-whole question, and stacking shows the parts and the total together.',
        },
        {
          text: 'A scatter of category against amount',
          why: 'Categories are labels, not measurements. A scatter would produce a column of dots.',
        },
        {
          text: 'Three separate lines, one per category',
          why: 'Lines show movement over time. They make the reader add three trajectories in their head to see a share.',
        },
        {
          text: 'A pie of the twelve months of the year',
          why: 'That answers how the year splits by month, not what one month is made of.',
        },
      ],
    },
  ],
  takeaway:
    'Choose the chart from the question — trend, comparison, composition or relationship — label the units, keep bars on a zero baseline, and state the axis whenever it does not start at zero.',
}
