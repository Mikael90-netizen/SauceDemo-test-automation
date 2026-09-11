import { expect } from '@playwright/test';

export class DashboardPage {

  constructor(page) {
    this.page = page;

    this.title = this.page.locator('[data-test="title"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = this.page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = this.page.locator('[data-test="logout-sidebar-link"]');
    this.sortDropdown = this.page.locator('[data-test="product-sort-container"]');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectDashboard() {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart() {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async sortAtoZ() {
    await this.sortDropdown.selectOption('az');
  }

  async getInventoryNames() {
    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }
}