import { expect, test, type Page } from '@playwright/test'

/**
 * Level 5, band six, batch 1 — chapters l5-123 to l5-132.
 *
 * These ten chapters are about operations rather than products: the shape of a
 * workbook, the reference types, and then one function per chapter — SUM, IF,
 * SUMIFS, XLOOKUP, FILTER — followed by charts and pivot tables. Six of them run
 * in the data-driven spreadsheet lab with their own scenario, and four have a
 * dedicated lab. This spec walks the batch against the production build and
 * asserts that each chapter carries its own illustration, its own lab and a
 * quiz that scores, then exercises the controls that make the labs worth having.
 *
 * The labs are heavy, and ten long pages in parallel starve the renderer, so the
 * chapters are walked serially.
 */
test.describe.configure({ mode: 'serial' })

/**
 * Open a chapter and wait for its body. Chapter prose is code-split, so on a
 * cold load the heading can arrive after the page; waiting for the takeaway is
 * the signal that the body has rendered.
 */
async function openChapter(page: Page, id: string) {
  await page.goto(`/chapter/${id}`)
  await page.getByText('Takeaway').first().waitFor({ timeout: 60_000 })
}

type BatchChapter = {
  id: string
  title: string
  /** A distinctive fragment of this chapter's illustration caption. */
  scene: string
  /** The lab heading, or the scenario title for the spreadsheet lab. */
  lab: string
  /** A control or label the lab must show. */
  control: string
}

const BATCH: BatchChapter[] = [
  {
    id: 'l5-123',
    title: 'Spreadsheet Finance',
    scene: 'nothing is typed twice',
    lab: 'One workbook, three jobs: inputs, calculations, summary',
    control: 'Total income',
  },
  {
    id: 'l5-124',
    title: 'Excel/Google Sheets',
    scene: 'The menus differ between applications',
    lab: 'The same sheet, safely shared',
    control: 'Visible through the link',
  },
  {
    id: 'l5-125',
    title: 'Formulas',
    scene: 'The only difference is the two dollar signs',
    lab: 'One rate, four funds: making an absolute reference work',
    control: 'Largest single fee',
  },
  {
    id: 'l5-126',
    title: 'SUM',
    scene: 'one of the nine is entered twice',
    lab: 'The column that does not add up',
    control: 'Cells SUM actually added',
  },
  {
    id: 'l5-127',
    title: 'IF',
    scene: 'a second test on the branch that matters',
    lab: 'A flag column that tells you what to chase',
    control: 'Escalation level',
  },
  {
    id: 'l5-128',
    title: 'SUMIFS',
    scene: 'one row that passes all of them',
    lab: 'Asking several questions of one month',
    control: 'Food in August',
  },
  {
    id: 'l5-129',
    title: 'XLOOKUP',
    scene: 'one that is not there at all',
    lab: 'Lookup builder',
    control: 'FOL-777',
  },
  {
    id: 'l5-130',
    title: 'FILTER',
    scene: 'leave as a smaller table',
    lab: 'Filter builder',
    control: 'Amount above ₹2,000',
  },
  {
    id: 'l5-131',
    title: 'Charts',
    scene: 'the same four bars drawn twice',
    lab: 'Chart builder',
    control: 'Starting at zero',
  },
  {
    id: 'l5-132',
    title: 'Pivot Tables',
    scene: 'folded into a grid of categories and months',
    lab: 'Pivot builder',
    control: 'Twelve transactions, one grid',
  },
]

test.describe('level 5 spreadsheet batch (l5-123 to l5-132)', () => {
  test('every chapter renders its title, illustration, lab and quiz', async ({ page }) => {
    test.setTimeout(240_000)
    page.setDefaultTimeout(15_000)

    const errors: string[] = []
    const failedRequests: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`${page.url()} :: ${m.text()}`)
    })
    page.on('pageerror', (e) => errors.push(`${page.url()} :: ${e.message}`))
    page.on('requestfailed', (r) => failedRequests.push(`${r.url()} :: ${r.failure()?.errorText}`))

    for (const c of BATCH) {
      await openChapter(page, c.id)

      await expect(page.getByRole('heading', { level: 1 }), `${c.id} title`).toContainText(c.title)
      await expect(page.getByText('queued for writing'), `${c.id} is authored`).toHaveCount(0)

      // The illustration that belongs to this chapter, and its caption.
      const caption = page.locator('figure figcaption', { hasText: c.scene })
      await expect(caption, `${c.id} illustration caption`).toBeVisible()
      await expect(page.locator('figure svg[role="img"]').first(), `${c.id} illustration svg`).toBeVisible()

      // The lab it declares. Sheet-lab chapters name their own scenario.
      await expect(page.getByText('Interactive', { exact: true }), `${c.id} lab marker`).toBeVisible()
      await expect(page.getByRole('heading', { name: c.lab }), `${c.id} lab`).toBeVisible()
      await expect(page.getByText(c.control).first(), `${c.id} lab control`).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Quick check' }), `${c.id} quiz`).toBeVisible()
      await expect(page.getByRole('button', { name: 'Check answers' }), `${c.id} quiz submit`).toBeVisible()

      await expect(page.getByText(/Last verified/).first(), `${c.id} verification date`).toBeVisible()
    }

    expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([])
    expect(failedRequests, `failed requests:\n${failedRequests.join('\n')}`).toEqual([])
  })

  test('the spreadsheet lab accepts a formula and grades the cell', async ({ page }) => {
    await openChapter(page, 'l5-126')
    await expect(page.getByText('0 of 6 done'), 'nothing filled in yet').toBeVisible()

    // The lab opens on the first task cell (E2), and the formula that answers it.
    const input = page.getByPlaceholder('Type a value or a formula starting with =')
    await expect(page.locator('span.font-mono', { hasText: 'E2' }).first()).toBeVisible()
    await input.fill('=SUM(B2:B11)')
    await page.getByRole('button', { name: 'Enter', exact: true }).click()

    await expect(page.getByText('1 of 6 done'), 'the graded cell counts').toBeVisible()
    await page.getByRole('button', { name: 'Check my answers' }).click()
    await expect(page.getByText(/Not yet — 1 of 6 cells match/)).toBeVisible()
  })

  test('an absolute reference is evaluated, not rejected', async ({ page }) => {
    // The engine behind the spreadsheet lab gained `$` anchors with this batch;
    // the chapter that teaches them has to be able to enter one.
    await openChapter(page, 'l5-125')
    const input = page.getByPlaceholder('Type a value or a formula starting with =')
    await input.fill('=ROUND(B4*$B$1/100,0)')
    await page.getByRole('button', { name: 'Enter', exact: true }).click()

    await expect(page.getByText('1 of 7 done'), 'the anchored formula is accepted').toBeVisible()
    // The lab prints the computed value above the formula it came from, with no
    // thousands separator, so the cell name starts with the number.
    await expect(page.getByRole('cell', { name: /^3000/ })).toBeVisible()
  })

  test('the lookup lab distinguishes a hit from a missing key', async ({ page }) => {
    await openChapter(page, 'l5-129')

    await page.getByRole('button', { name: 'FOL-418', exact: true }).click()
    await expect(page.getByText(/Returns 2,10,400/)).toBeVisible()

    // A key that is not in the table: the fallback is what keeps the sheet readable.
    await page.getByRole('button', { name: 'FOL-777', exact: true }).click()
    await expect(page.getByText(/No match: returns "Not on file"/)).toBeVisible()
    await expect(page.getByText(/Returns 2,10,400/)).toHaveCount(0)
  })

  test('the filter lab follows the condition it is given', async ({ page }) => {
    await openChapter(page, 'l5-130')

    await expect(page.getByText('4 rows pass'), 'Food is selected at the start').toBeVisible()
    await page.getByRole('button', { name: 'Month', exact: true }).click()
    await page.getByRole('button', { name: 'Sep', exact: true }).click()
    await expect(page.getByText('5 rows pass'), 'five September transactions').toBeVisible()
  })

  test('the chart lab shows an honest axis and a truncated one', async ({ page }) => {
    await openChapter(page, 'l5-131')

    await expect(page.getByText(/Starting at zero: the bar lengths are proportional/)).toBeVisible()
    await page.getByRole('button', { name: '₹40k', exact: true }).click()
    await expect(page.getByText(/Starting at ₹40k:/)).toBeVisible()
    await expect(page.getByText(/The numbers are unchanged; the picture is not/)).toBeVisible()
  })

  test('the pivot lab changes its measure, not just its size', async ({ page }) => {
    await openChapter(page, 'l5-132')

    // Sum at the start: food in August is two transactions worth 2,070. The
    // illustration also prints that figure, so scope the assertion to the grid.
    await expect(page.getByRole('cell', { name: '2,070' })).toBeVisible()
    await page.getByRole('button', { name: 'count', exact: true }).click()
    await expect(page.getByText(/Count of rows\. Four food transactions read as 4/)).toBeVisible()
    await expect(page.getByRole('cell', { name: '2,070' })).toHaveCount(0)
  })

  test('a quiz scores a wrong answer and a right one differently', async ({ page }) => {
    await openChapter(page, 'l5-123')
    await page.getByRole('heading', { name: 'Quick check' }).scrollIntoViewIfNeeded()

    const groups = page.locator('section:has(h3:text-is("Quick check")) div.space-y-2')
    const count = await groups.count()
    expect(count, 'the chapter ships four questions').toBe(4)

    // The last option of all four questions is wrong in this chapter.
    for (let i = 0; i < count; i++) await groups.nth(i).locator('button').last().click()
    await page.getByRole('button', { name: 'Check answers' }).click()
    await expect(page.getByText('0/4 correct')).toBeVisible()
    await expect(page.getByText(/Re-read the highlighted explanations/)).toBeVisible()

    await page.getByRole('button', { name: 'Try again' }).click()
    for (let i = 0; i < count; i++) await groups.nth(i).locator('button').first().click()
    await page.getByRole('button', { name: 'Check answers' }).click()
    await expect(page.getByText('4/4 correct')).toBeVisible()
    await expect(page.getByText(/Perfect score/)).toBeVisible()
  })

  test('chapter navigation moves to the next chapter in the band', async ({ page }) => {
    await openChapter(page, 'l5-129')
    const next = page.getByRole('button', { name: /^Next: FILTER/ })
    await expect(next).toBeVisible()
    await next.click()
    await expect(page).toHaveURL(/\/chapter\/l5-130$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('FILTER')
  })
})
