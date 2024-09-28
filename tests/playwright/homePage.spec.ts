// simple procedural test for playwright

import { test, expect } from '@playwright/test';

test('launch playwright.dev and click getStarted', {tag: '@playwright-demo' }, async ({ page }) => {
  // Go to the Playwright homepage
  await page.goto('https://playwright.dev/');

  // Get the title of the page and assert that it contains "Playwright"
  const title = await page.title();
  expect(title).toContain('Playwright');

  // Assert that the 'Get Started' link is visible
  const getStarted = page.locator('text=Get Started');
  await expect(getStarted).toBeVisible();

  // Click on the 'Get Started' link
  await getStarted.click();

  // Assert that the URL changed
  await expect(page).toHaveURL(/.*docs\/intro/);
  await page.close()
});