import { expect, test } from '@playwright/test'
import { addToBagAndOpen, expectBagCount, openFirstProduct } from './helpers'

test.describe('bag and checkout', () => {
  test('adding a product updates the bag count and shows it in the bag', async ({ page }) => {
    const name = await openFirstProduct(page)
    await addToBagAndOpen(page)

    const bag = page.getByRole('dialog', { name: 'Your bag' })
    await expect(bag.getByText(name)).toBeVisible()
    await expect(bag.getByText('Subtotal')).toBeVisible()
    await expect(bag.getByRole('button', { name: 'Checkout' })).toBeEnabled()
  })

  test('quantity steppers change the line total and subtotal', async ({ page }) => {
    await openFirstProduct(page)
    await addToBagAndOpen(page)

    const bag = page.getByRole('dialog', { name: 'Your bag' })
    const subtotal = bag.locator('span', { hasText: /^£/ }).last()
    const before = await subtotal.innerText()

    await bag.getByRole('button', { name: /^Increase quantity/ }).click()
    await expectBagCount(page, 2)
    await expect(subtotal).not.toHaveText(before)

    await bag.getByRole('button', { name: /^Decrease quantity/ }).click()
    await expect(subtotal).toHaveText(before)
  })

  test('the bag survives a reload', async ({ page }) => {
    await openFirstProduct(page)
    await addToBagAndOpen(page)

    await page.reload()
    await expectBagCount(page, 1)
  })

  test('removing the last item shows the empty state', async ({ page }) => {
    await openFirstProduct(page)
    await addToBagAndOpen(page)

    const bag = page.getByRole('dialog', { name: 'Your bag' })
    await bag.getByRole('button', { name: /^Remove / }).click()
    await expect(bag.getByText('Your bag is empty')).toBeVisible()
    await expectBagCount(page, 0)
  })

  test('checkout sends only ids and quantities, never prices', async ({ page }) => {
    await openFirstProduct(page)
    await addToBagAndOpen(page)

    let payload: unknown
    await page.route('**/api/checkout', async (route) => {
      payload = route.request().postDataJSON()
      await route.fulfill({ status: 200, json: { url: '/about' } })
    })

    await page.getByRole('button', { name: 'Checkout' }).click()
    await expect(page).toHaveURL('/about')

    expect(payload).toEqual({ items: [{ id: expect.any(String), quantity: 1 }] })
    expect(JSON.stringify(payload)).not.toMatch(/price|name/i)
  })

  test('a checkout error is shown and the button recovers', async ({ page }) => {
    await openFirstProduct(page)
    await addToBagAndOpen(page)

    await page.route('**/api/checkout', (route) =>
      route.fulfill({ status: 409, json: { error: 'Toggles - Yellow is sold out.' } }),
    )

    const checkout = page.getByRole('button', { name: 'Checkout' })
    await checkout.click()

    await expect(page.getByText('Toggles - Yellow is sold out.')).toBeVisible()
    await expect(checkout).toBeEnabled()
    await expect(page).not.toHaveURL(/stripe|about/)
  })
})

test('the real checkout endpoint rejects a cart with an unknown product', async ({ request }) => {
  const res = await request.post('/api/checkout', {
    data: { items: [{ id: 'not-a-real-product', quantity: 1 }] },
  })
  expect(res.status()).toBe(409)
})
