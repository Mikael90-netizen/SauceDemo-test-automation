import { test, expect } from '@playwright/test';

test('validate number of items in cart @cart @smoke', async ({ page }) => {

  // Navigate directly to the dashboard
  await page.goto('/inventory.html');

  // Add 4 items
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Validate cart badge shows 4 items
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('4');

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Remove 1 item
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  // Validate cart badge now shows 3 items
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('3');

  // Validate that 3 products are actually displayed in the cart
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(3);
});