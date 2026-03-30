import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login using Page Object Model', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  
  await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
  await expect(page).toHaveScreenshot();
});