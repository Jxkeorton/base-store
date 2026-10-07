import { expect, type Page } from '@playwright/test'

// includeHidden: while the bag dialog is open, everything behind it is (correctly) hidden from assistive tech.
export const bagButton = (page: Page) =>
  page.getByRole('button', { name: /^Open bag/, includeHidden: true })

/** Asserts the bag count via the button's aria-label (its computed name is empty while a dialog hides it). */
export const expectBagCount = (page: Page, count: number) =>
  expect(bagButton(page)).toHaveAttribute(
    'aria-label',
    count === 0 ? 'Open bag' : `Open bag, ${count} ${count === 1 ? 'item' : 'items'}`,
  )

/** Opens the first product from the home page grid and returns its name. */
export async function openFirstProduct(page: Page) {
  await page.goto('/')
  const card = page.locator('#gear article').first()
  const name = (await card.locator('h3').innerText()).trim()
  await card.locator('h3').click()
  await expect(page.getByRole('heading', { level: 1, name })).toBeVisible()
  return name
}

/** Adds the product on the current page to the bag and opens the bag. */
export async function addToBagAndOpen(page: Page) {
  await page.getByRole('button', { name: 'Add to bag' }).click()
  await expectBagCount(page, 1)
  await bagButton(page).click()
  await expect(page.getByRole('dialog', { name: 'Your bag' })).toBeVisible()
}
