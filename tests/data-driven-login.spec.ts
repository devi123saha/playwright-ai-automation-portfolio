import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const testData = require('../data/users.json');

for (const user of testData) {
  test(`Login Attempt for: ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    if (user.expected === 'success') {
      await expect(page.getByText('You logged into a secure area!')).toBeVisible();
    } else {
      await expect(page.getByText('Your username is invalid!')).toBeVisible();
    }
  });
}