import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.title = this.page.locator('[data-test="title"]');
    this.firstName = this.page.locator('[data-test="firstName"]');
    this.lastName = this.page.locator('[data-test="lastName"]');
    this.postalCode = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async expectCheckoutInformationPage() {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async completeCustomerInformation(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async expectValidationError() {
    await expect(this.errorMessage).toBeVisible();
  }
}