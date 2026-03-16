import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    // Verification 1: Check the main header
    await expect(page.getByRole('heading', { name: 'Secure Area', exact: true })).toBeVisible();
    
    // Verification 2: Check the logout link
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass');
    await page.getByRole('button', { name: ' Login' }).click();

    // Verification: Check the flash error message
    // Note: We use toContainText because the message often has extra spaces or a "x" button
    const flashMessage = page.locator('#flash');
    await expect(flashMessage).toContainText('Your password is invalid!');
  });

});