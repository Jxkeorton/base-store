import { expect, test } from '@playwright/test'

test.describe('storefront', () => {
  test('home page shows the hero, the trust strip and products', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Traverse Base/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'All gear' })).toBeVisible()
    expect(await page.locator('#gear article').count()).toBeGreaterThan(0)
    await expect(page.getByText('Ships within the UK').first()).toBeVisible()
  })

  test('product prices are formatted as pounds', async ({ page }) => {
    await page.goto('/')
    const price = page.locator('#gear article').first().getByText(/^£\d/)
    await expect(price).toBeVisible()
  })

  test('has no horizontal scroll', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('category filter chips narrow the grid', async ({ page }) => {
    await page.goto('/')
    const chips = page.getByRole('group', { name: 'Filter by category' }).getByRole('button')
    test.skip((await chips.count()) < 2, 'needs at least one product category in Sanity')

    const all = await page.locator('#gear article').count()
    await chips.nth(1).click()
    await expect(chips.nth(1)).toHaveAttribute('aria-pressed', 'true')

    const filtered = await page.locator('#gear article').count()
    expect(filtered).toBeGreaterThan(0)
    expect(filtered).toBeLessThan(all)

    await chips.first().click()
    await expect(page.locator('#gear article')).toHaveCount(all)
  })

  test('category pages and info pages load', async ({ page }) => {
    for (const [path, heading] of [
      ['/canopies', 'Canopies'],
      ['/used-gear', 'Used gear'],
      ['/about', /BASE gear for the UK/],
      ['/contact', /Let's talk BASE/],
    ] as const) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    }
  })

  test('an unknown product shows the not-found page', async ({ page }) => {
    const response = await page.goto('/product/this-product-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  })

  test('the success page redirects home without a session id', async ({ page }) => {
    await page.goto('/success')
    await expect(page).toHaveURL('/')
  })

  test('the success page redirects home for a session id Stripe does not know', async ({ page }) => {
    test.skip(!process.env.STRIPE_SECRET_KEY, 'needs STRIPE_SECRET_KEY to ask Stripe')
    await page.goto('/success?session_id=cs_test_not_real')
    await expect(page).toHaveURL('/')
  })

  test('the success page never crashes when Stripe cannot be reached', async ({ page }) => {
    test.skip(!!process.env.STRIPE_SECRET_KEY, 'only meaningful without a Stripe key')
    await page.goto('/success?session_id=cs_test_anything')
    await expect(page.getByRole('heading', { name: /couldn.t confirm your order/i })).toBeVisible()
  })

  test('sitemap and robots are served', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBe(true)
    expect(await sitemap.text()).toContain('/product/')

    const robots = await request.get('/robots.txt')
    expect(await robots.text()).toContain('Disallow: /studio')
  })
})

test.describe('navigation', () => {
  test('desktop nav marks the current page', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'desktop navigation')
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
    await expect(
      page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('the home link is marked as current on a fresh load of the home page', async ({ page, isMobile }) => {
    test.skip(!!isMobile, 'desktop navigation')
    await page.goto('/')
    await expect(
      page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Home' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('mobile menu opens, navigates and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile navigation')
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()

    const menu = page.getByRole('dialog')
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: 'Contact' }).click()

    await expect(page).toHaveURL('/contact')
    await expect(menu).toBeHidden()
  })
})
