import { test, expect } from '@playwright/test';

test('Safety Check: Can I reach the internet?', async ({ page }) => {
  // We use page.goto because we know your browser works!
  const response = await page.goto('https://jsonplaceholder.typicode.com/posts/1');
  
  // If this is null, your internet or firewall is blocking Node.js
  expect(response).not.toBeNull();
  
  // Check status
  const status = response?.status();
  console.log('Connection Status:', status);
  expect(status).toBe(200);
});