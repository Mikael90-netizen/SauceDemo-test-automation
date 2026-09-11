import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    this.title = this.page.locator('[data-test="title"]');
    this.checkoutButton = this.page.locator('[data-test="checkout"]');
  }

  async expectCartPage() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}