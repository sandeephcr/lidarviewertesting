import { test, expect } from '@playwright/test'

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(page).toHaveTitle(/Playwright/)
  await page.getByRole('link', { name: 'Get started' }).click()
  await expect(page).toHaveURL(/.*intro/)
})
