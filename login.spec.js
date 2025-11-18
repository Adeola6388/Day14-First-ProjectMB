import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { credentials, urls } from '../test-data/credentials';
import { LoginPage } from '../pages/LoginPage';

test('Login: 2 invalid attempts then valid login', async ({ page }) => {
  const landing = new LandingPage(page);
  const login = new LoginPage(page);

  // Navigate to home page
  await landing.goto(urls.home);

  // Click login button/link on landing page
  await landing.clickLogin();

  // Ensure the login page is loaded
  await login.assertLoaded();

  // Try invalid login attempts (method should loop or handle internally)
  await login.tryInvalidAttempts(credentials.invalid);

  // Perform valid login
  await login.login(credentials.valid.email, credentials.valid.password);

  // Optional: Verify successful login
  await expect(page).toHaveURL(/dashboard/i);
});

test('Take screenshot', async ({ page }) => {
  await page.goto('https://mini-bank.testamplify.com');
  await page.screenshot({ path: 'screenshots/login-success.png', fullPage: true });
  console.log('✅ Screenshot saved successfully!');
});