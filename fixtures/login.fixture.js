import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { loginData } from "../test-data/loginData";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await use(page);
  },
});