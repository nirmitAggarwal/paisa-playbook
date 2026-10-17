import { expect, test, type Page } from '@playwright/test'

/**
 * Level 5 — chapters l5-143 to l5-152.
 *
 * Four chapters on one household plan (scenarios, sensitivity, best/worst and
 * stress testing), then the opening of the security-and-habits band (documents,
 * encryption, backups, data security, automation and emergency-money
 * separation). The model arithmetic is unit-tested in `scripts/check-model.ts`;
 * this spec walks the batch against the production build and exercises the
 * control that changes each lab's answer.
 */
test.describe.configure({ mode: 'serial' })

async function openChapter(page: Page, id: string) {
  await page.goto(`/chapter/${id}`)
  await page.getByText('Takeaway').first().waitFor({ timeout: 60_000 })
}

type BatchChapter = {
  id: string
  title: string
  scene: string
  lab: string
  control: string
}

const BATCH: BatchChapter[] = [
  {
    id: 'l5-143',
    title: 'Scenario Analysis',
    scene: 'branching into a bad decade',
    lab: 'Scenario planner',
    control: 'Coverage',
  },
  {
    id: 'l5-144',
    title: 'Sensitivity Analysis',
    scene: 'ranked by how far they move goal coverage',
    lab: 'Sensitivity model',
    control: 'Base coverage 48%',
  },
  {
    id: 'l5-145',
    title: 'Best-Case/Worst-Case Analysis',
    scene: 'with the essentials marked between them',
    lab: 'Best-case / worst-case model',
    control: 'Months without income in the worst case',
  },
  {
    id: 'l5-146',
    title: 'Financial Stress Testing',
    scene: 'feeding one liquidity gauge',
    lab: 'Stress-test model',
    control: 'Breaking point',
  },
  {
    id: 'l5-147',
    title: 'Personal Document Management',
    scene: 'with one row nobody can find',
    lab: 'Document inventory',
    control: '6 of 8 recoverable',
  },
  {
    id: 'l5-148',
    title: 'Encrypted Storage',
    scene: 'the key held somewhere else',
    lab: 'Encrypted storage setup',
    control: 'The key is on the device',
  },
  {
    id: 'l5-149',
    title: 'Backups',
    scene: 'ransomware encrypting the laptop',
    lab: 'Backup planner',
    control: '3-2-1 checks',
  },
  {
    id: 'l5-150',
    title: 'Financial Data Security',
    scene: 'three of them open',
    lab: 'Attack-surface hardening',
    control: 'Weakest open door',
  },
  {
    id: 'l5-151',
    title: 'Financial Trick: Automate Good Financial Behavior',
    scene: 'with a manual override kept for exceptions',
    lab: 'Automation designer',
    control: 'Defaults switched on',
  },
  {
    id: 'l5-152',
    title: 'Financial Trick: Keep Emergency Money Separate From Everyday Spending',
    scene: 'behind a wall in another',
    lab: 'Emergency-money separation',
    control: 'Months of essentials',
  },
]

test.describe('level 5 model and security batch (l5-143 to l5-152)', () => {
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
      await expect(page.getByRole('heading', { name: c.lab }).last(), `${c.id} lab`).toBeVisible()
      await expect(page.getByText(c.control).first(), `${c.id} lab control`).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Quick check' }), `${c.id} quiz`).toBeVisible()
      await expect(page.getByRole('button', { name: 'Check answers' }), `${c.id} quiz submit`).toBeVisible()
      await expect(page.getByText(/Last verified/).first(), `${c.id} verification date`).toBeVisible()
    }

    expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([])
    expect(failedRequests, `failed requests:\n${failedRequests.join('\n')}`).toEqual([])
  })

  test('the scenario lab changes the future and prints the response', async ({ page }) => {
    await openChapter(page, 'l5-143')
    await expect(page.getByText('48%', { exact: true }).last()).toBeVisible()

    await page.getByRole('button', { name: 'Bad decade', exact: true }).click()
    await expect(page.getByText('31%', { exact: true }).last()).toBeVisible()
    await expect(page.getByText(/Raise the monthly saving by about ₹10,000/)).toBeVisible()
  })

  test('the sensitivity lab ranks the assumption with the largest swing', async ({ page }) => {
    await openChapter(page, 'l5-144')

    await page.getByRole('button', { name: 'Return 8–14%', exact: true }).click()
    await expect(page.getByText(/Not the largest\. Horizon 10–20 years moves coverage/)).toBeVisible()

    await page.getByRole('button', { name: 'Horizon 10–20 years', exact: true }).click()
    await expect(page.getByText(/Correct — the horizon moves coverage by 32.4 points/)).toBeVisible()
  })

  test('the best/worst lab moves the buffer across the survival line', async ({ page }) => {
    await openChapter(page, 'l5-145')
    await expect(page.getByText(/Essentials do not survive/)).toBeVisible()

    await page.getByRole('button', { name: '4 months', exact: true }).click()
    await expect(page.getByText(/Essentials survive: ₹92,000 of the buffer is left/)).toBeVisible()
    await expect(page.getByText(/Essentials do not survive/)).toHaveCount(0)
  })

  test('the stress test reports the month the plan breaks', async ({ page }) => {
    await openChapter(page, 'l5-146')
    await expect(page.getByText(/Fails in month 6: the buffer runs out there/)).toBeVisible()
    await expect(page.getByText(/6-month stress leaves ₹44,040 to borrow/)).toBeVisible()

    await page.getByRole('button', { name: 'Mild', exact: true }).click()
    await expect(page.getByText(/Survives: ₹1,44,000 of the buffer is left/)).toBeVisible()
  })

  test('the document inventory counts a recovered row', async ({ page }) => {
    await openChapter(page, 'l5-147')
    await expect(page.getByText('6 of 8 recoverable', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'Mark Will found', exact: true }).click()
    await expect(page.getByText('7 of 8 recoverable', { exact: true })).toBeVisible()
  })

  test('the encryption lab walks from a key on the device to a survivable setup', async ({ page }) => {
    await openChapter(page, 'l5-148')
    await expect(page.getByText(/The key is on the device it protects/)).toBeVisible()

    await page.getByRole('button', { name: 'password manager', exact: true }).click()
    await expect(page.getByText(/Recovery is the gap/)).toBeVisible()

    await page.getByRole('button', { name: 'off-device', exact: true }).click()
    await expect(page.getByText(/Survives a lost laptop/)).toBeVisible()
  })

  test('the backup lab completes the 3-2-1 checks', async ({ page }) => {
    await openChapter(page, 'l5-149')
    await expect(page.getByText('1 of 4', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: /Copy in offsite cloud storage/ }).click()
    await expect(page.getByText('3 of 4', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: /Restore has been tested/ }).click()
    await expect(page.getByText('4 of 4', { exact: true })).toBeVisible()
    await expect(page.getByText(/Complete: three copies, two media, one offsite/)).toBeVisible()
  })

  test('the hardening lab weights the email door above the rest', async ({ page }) => {
    await openChapter(page, 'l5-150')
    await expect(page.getByText('2 of 11', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: /2FA on the email that resets everything/ }).click()
    await expect(page.getByText('5 of 11', { exact: true })).toBeVisible()
  })

  test('the automation lab catches a transfer timed before payday', async ({ page }) => {
    await openChapter(page, 'l5-151')
    await expect(page.getByText('3 of 5', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: /Low-balance alert before each debit/ }).click()
    await expect(page.getByText('4 of 5', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'day before payday', exact: true }).click()
    await expect(page.getByText(/A debit scheduled before payday fails/)).toBeVisible()
  })

  test('the separation lab makes the wall visible in the balance', async ({ page }) => {
    await openChapter(page, 'l5-152')
    await expect(page.getByText('5.8', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'separate bank, no card', exact: true }).click()
    await page.getByRole('button', { name: 'A ₹25,000 festival offer appears', exact: true }).click()
    await expect(page.getByText(/The offer expires while the transfer clears/)).toBeVisible()
    await expect(page.getByText(/funding a discount/)).toHaveCount(0)

    await page.getByRole('button', { name: 'same account', exact: true }).click()
    await expect(page.getByText(/funding a discount/)).toBeVisible()
  })

  test('a quiz scores a wrong answer and a right one differently', async ({ page }) => {
    await openChapter(page, 'l5-143')
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

  test('chapter navigation moves into security and habits', async ({ page }) => {
    await openChapter(page, 'l5-146')
    const next = page.getByRole('button', { name: /^Next: Personal Document Management/ })
    await expect(next).toBeVisible()
    await next.click()
    await expect(page).toHaveURL(/\/chapter\/l5-147$/)
  })
})
