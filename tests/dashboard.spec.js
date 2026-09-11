import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Page @inventory @dashboard', () => {

  test('should validate inventory text is A-Z', async ({ page }) => {

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate directly to inventory page', () =>
      dashboardPage.goto()
    );

    await test.step('Select A-Z inventory sorting', () =>
      dashboardPage.sortAtoZ()
    );

    await test.step('Verify inventory names are alphabetically ordered', async () => {
      const names = await dashboardPage.getInventoryNames();

      const expected = [...names].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      );

      expect(names).toEqual(expected);
    });

  });

});