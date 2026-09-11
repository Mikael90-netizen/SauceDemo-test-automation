import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.title = this.page.locator('[data-test="title"]');
    this.totalLabel = this.page.locator('[data-test="total-label"]');
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.completeHeader = this.page.locator('[data-test="complete-header"]');
    this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
  }

  async expectOverviewPage() {
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.totalLabel).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderCompleted() {
    await expect(this.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  }

  async returnHome() {
    await this.backToProductsButton.click();
  }
}