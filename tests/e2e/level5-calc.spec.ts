import { expect, test, type Page } from '@playwright/test'

/**
 * Level 5, band six, batch 2 — chapters l5-133 to l5-142.
 *
 * Ten chapters about numbers a household is routinely shown: an EMI, a corpus,
 * a CAGR, a real return. Each carries its own illustration and its own
 * calculator lab, and the arithmetic behind all of them lives in one module
 * (`src/lib/finance.ts`) that `npm run test:calc` checks independently.
 *
 * This spec walks the batch against the production build, then exercises the
 * control that makes each lab worth having — the one that changes the answer
 * rather than the formatting.
 */
test.describe.configure({ mode: 'serial' })

async function openChapter(page: Page, id: string) {
  await page.goto(`/chapter/${id}`)
  await page.getByText('Takeaway').first().waitFor({ timeout: 60_000 })
}

type BatchChapter = {
  id: string
  title: string
  /** A distinctive fragment of this chapter's illustration caption. */
  scene: string
  /** The lab heading. */
  lab: string
  /** A label or figure the lab must show on open. */
  control: string
}

const BATCH: BatchChapter[] = [
  {
    id: 'l5-133',
    title: 'Financial Calculators',
    scene: 'the same fields read with a monthly rate',
    lab: 'Calculator sanity check',
    control: 'Matches the quote',
  },
  {
    id: 'l5-134',
    title: 'Compound-Interest Calculator',
    scene: 'the ₹26,950 gap',
    lab: 'Compound-interest model',
    control: 'Effective annual rate',
  },
  {
    id: 'l5-135',
    title: 'EMI Calculator',
    scene: 'split into interest and principal',
    lab: 'EMI and amortisation model',
    control: 'First-year interest share',
  },
  {
    id: 'l5-136',
    title: 'SIP Calculator',
    scene: 'each rung larger than the last',
    lab: 'SIP model',
    control: 'You contributed',
  },
  {
    id: 'l5-137',
    title: 'Inflation Calculator',
    scene: 'the same basket costs in ten years',
    lab: 'Inflation model',
    control: 'Goal in future rupees',
  },
  {
    id: 'l5-138',
    title: 'Retirement Calculator',
    scene: 'spending it down',
    lab: 'Retirement model',
    control: 'Corpus needed at retirement',
  },
  {
    id: 'l5-139',
    title: 'CAGR Calculator',
    scene: 'the single straight line',
    lab: 'CAGR model',
    control: 'Absolute return',
  },
  {
    id: 'l5-140',
    title: 'Net-Worth Calculator',
    scene: 'depends on the valuations chosen',
    lab: 'Net-worth model',
    control: 'Liquid net worth',
  },
  {
    id: 'l5-141',
    title: 'Debt-Repayment Calculator',
    scene: 'finishing 43 and 46 months',
    lab: 'Debt-repayment model',
    control: 'Snowball · smallest balance first',
  },
  {
    id: 'l5-142',
    title: 'Real-Return Calculator',
    scene: 'leaving 3.25% of buying power',
    lab: 'Real-return model',
    control: 'Real return',
  },
]

test.describe('level 5 calculator batch (l5-133 to l5-142)', () => {
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

      const caption = page.locator('figure figcaption', { hasText: c.scene })
      await expect(caption, `${c.id} illustration caption`).toBeVisible()
      await expect(page.locator('figure svg[role="img"]').first(), `${c.id} illustration svg`).toBeVisible()

      await expect(page.getByText('Interactive', { exact: true }), `${c.id} lab marker`).toBeVisible()
      // The lab frame repeats the sim title as its own heading, so take the last match.
      await expect(page.getByRole('heading', { name: c.lab }).last(), `${c.id} lab`).toBeVisible()
      await expect(page.getByText(c.control).first(), `${c.id} lab control`).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Quick check' }), `${c.id} quiz`).toBeVisible()
      await expect(page.getByRole('button', { name: 'Check answers' }), `${c.id} quiz submit`).toBeVisible()
      await expect(page.getByText(/Last verified/).first(), `${c.id} verification date`).toBeVisible()
    }

    expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([])
    expect(failedRequests, `failed requests:\n${failedRequests.join('\n')}`).toEqual([])
  })

  test('the sanity lab names the unit that breaks the quote', async ({ page }) => {
    await openChapter(page, 'l5-133')
    await expect(page.getByText(/Matches the quote/)).toBeVisible()

    // The annual rate entered as a monthly one.
    await page.getByRole('button', { name: 'per month', exact: true }).click()
    await expect(page.getByText(/ten times too large/)).toBeVisible()
    await expect(page.getByText('₹85,000', { exact: true }).last()).toBeVisible()

    // Back to an annual rate, but a tenure in months.
    await page.getByRole('button', { name: 'per year', exact: true }).click()
    await page.getByRole('button', { name: 'months', exact: true }).click()
    await expect(page.getByText(/The tenure is in years/)).toBeVisible()
    await expect(page.getByText(/Matches the quote/)).toHaveCount(0)
  })

  test('the compounding lab separates the nominal rate from the effective one', async ({ page }) => {
    await openChapter(page, 'l5-134')
    await expect(page.getByText('₹6,34,434', { exact: true }).last()).toBeVisible()
    await expect(page.getByText('8.00%', { exact: true }).last()).toBeVisible()

    await page.getByRole('button', { name: 'Monthly', exact: true }).click()
    await expect(page.getByText('₹6,61,384', { exact: true }).last()).toBeVisible()
    await expect(page.getByText('8.30%', { exact: true }).last()).toBeVisible()
  })

  test('the EMI lab prices an extra payment in months and rupees', async ({ page }) => {
    await openChapter(page, 'l5-135')
    await expect(page.getByText(/Loan clears in 240 months/)).toBeVisible()

    await page.getByRole('button', { name: '₹5,000', exact: true }).click()
    await expect(page.getByText(/clears in 155 months/)).toBeVisible()
    await expect(page.getByText(/a saving of ₹11\.08 lakh/)).toBeVisible()
  })

  test('the SIP lab shows what a step-up contributes', async ({ page }) => {
    await openChapter(page, 'l5-136')
    await expect(page.getByText('₹18.00 lakh', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: '+10% a year', exact: true }).click()
    await expect(page.getByText('₹38.13 lakh', { exact: true })).toBeVisible()
    await expect(page.getByText('₹86.84 lakh', { exact: true }).first()).toBeVisible()
  })

  test('the inflation lab uses the category rate, not the headline', async ({ page }) => {
    await openChapter(page, 'l5-137')
    await expect(page.getByText('₹89,542', { exact: true }).last()).toBeVisible()

    await page.getByRole('button', { name: 'Education 8%', exact: true }).click()
    await expect(page.getByText('₹1,07,946', { exact: true }).last()).toBeVisible()
  })

  test('the retirement lab moves both sides of the equation', async ({ page }) => {
    await openChapter(page, 'l5-138')
    await expect(page.getByText('Shortfall', { exact: true })).toBeVisible()
    await expect(page.getByText('₹2.10 crore', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Retire at 65', exact: true }).click()
    await expect(page.getByText('Surplus', { exact: true })).toBeVisible()
    await expect(page.getByText('₹2.39 crore', { exact: true })).toBeVisible()
  })

  test('the CAGR lab holds the endpoints and changes only the time', async ({ page }) => {
    await openChapter(page, 'l5-139')
    await expect(page.getByText('12.14%', { exact: true }).first()).toBeVisible()

    await page.getByRole('button', { name: '12 years', exact: true }).click()
    await expect(page.getByText('7.93%', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('9.1 years', { exact: true })).toBeVisible()
  })

  test('the net-worth lab revalues the same balance sheet', async ({ page }) => {
    await openChapter(page, 'l5-140')
    await expect(page.getByText('₹41.00 lakh', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Distress', exact: true }).click()
    await expect(page.getByText('₹21.77 lakh', { exact: true })).toBeVisible()
    await expect(page.getByText('₹41.00 lakh', { exact: true })).toHaveCount(0)
  })

  test('the debt lab shows the order of attack costing money', async ({ page }) => {
    await openChapter(page, 'l5-141')
    await expect(page.getByText(/With no spare cash, both methods take the same time/)).toBeVisible()

    await page.getByRole('button', { name: '₹5,000', exact: true }).click()
    await expect(page.getByText('43 months', { exact: true }).last()).toBeVisible()
    await expect(page.getByText('46 months', { exact: true }).last()).toBeVisible()
    await expect(page.getByText(/Avalanche is cheaper here by ₹43,189 and 3 months/)).toBeVisible()
  })

  test('the real-return lab crosses zero between assets', async ({ page }) => {
    await openChapter(page, 'l5-142')
    await expect(page.getByText('3.25%', { exact: true }).first()).toBeVisible()

    await page.getByRole('button', { name: 'Fixed deposit', exact: true }).click()
    await expect(page.getByText('-1.04%', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('₹98,962', { exact: true })).toBeVisible()
  })

  test('a quiz scores a wrong answer and a right one differently', async ({ page }) => {
    await openChapter(page, 'l5-133')
    await page.getByRole('heading', { name: 'Quick check' }).scrollIntoViewIfNeeded()

    const groups = page.locator('section:has(h3:text-is("Quick check")) div.space-y-2')
    const count = await groups.count()
    expect(count, 'the chapter ships four questions').toBe(4)

    for (let i = 0; i < count; i++) await groups.nth(i).locator('button').last().click()
    await page.getByRole('button', { name: 'Check answers' }).click()
    await expect(page.getByText('0/4 correct')).toBeVisible()

    await page.getByRole('button', { name: 'Try again' }).click()
    for (let i = 0; i < count; i++) await groups.nth(i).locator('button').first().click()
    await page.getByRole('button', { name: 'Check answers' }).click()
    await expect(page.getByText('4/4 correct')).toBeVisible()
  })

  test('chapter navigation moves to the next calculator', async ({ page }) => {
    await openChapter(page, 'l5-139')
    const next = page.getByRole('button', { name: /^Next: Net-Worth Calculator/ })
    await expect(next).toBeVisible()
    await next.click()
    await expect(page).toHaveURL(/\/chapter\/l5-140$/)
  })
})
