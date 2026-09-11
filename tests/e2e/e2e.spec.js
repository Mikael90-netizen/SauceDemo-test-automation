import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/DashboardPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage.js';

test.describe('E2E Purchase Flow @e2e @smoke @standard-user', () => {

  test('should complete purchase and logout back to login', async ({ page }) => {

    const login = new LoginPage(page);
    const inventory = new DashboardPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const overview = new CheckoutOverviewPage(page);

    await test.step('Login as standard user', async () => {
      await login.goto();
      await login.login('standard_user', 'secret_sauce');

      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    await test.step('Verify dashboard is displayed', async () => {
      await inventory.expectDashboard();
    });

    await test.step('Add Sauce Labs Backpack to cart', async () => {
      await inventory.addBackpackToCart();
    });

    await test.step('Open shopping cart', async () => {
      await inventory.openCart();
      await cart.expectCartPage();
    });

    await test.step('Proceed to checkout', async () => {
      await cart.checkout();
      await checkout.expectCheckoutInformationPage();
    });

    await test.step('Enter customer information', async () => {
      await checkout.completeCustomerInformation(
        'Elena',
        'Fish',
        '112564'
      );
    });

    await test.step('Continue to checkout overview', async () => {
      await checkout.continueToOverview();
      await overview.expectOverviewPage();
    });

    await test.step('Complete the order', async () => {
      await overview.finishOrder();
      await overview.expectOrderCompleted();
    });

    await test.step('Return to home/dashboard', async () => {
      await overview.returnHome();
      await inventory.expectDashboard();
    });

    await test.step('Logout from the application', async () => {
      await inventory.logout();
    });

    await test.step('Verify logout returns to login page', async () => {
      await expect(page).toHaveURL('/');
      await login.expectLoginPage();
    });

  });

});


test.describe('Problem User Checkout @negative @problem-user', () => {
  test('should show validation error for incomplete information', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new DashboardPage(page);
    const checkout = new CheckoutPage(page);

    await test.step('Login as problem user', () => {
      return login.goto().then(() => login.login('problem_user', 'secret_sauce'));
    });
    await test.step('Add backpack and open cart', async () => {
      await inventory.addBackpackToCart();
      await inventory.openCart();
    });
    await test.step('Open checkout', async () => {
      await page.locator('[data-test="checkout"]').click();
      await checkout.expectCheckoutInformationPage();
    });
    await test.step('Submit incomplete information', async () => {
      await checkout.firstName.fill('Uche');
      await checkout.lastName.fill('n');
      await checkout.continueToOverview();
    });
    await test.step('Verify validation error', () => checkout.expectValidationError());
  });

})