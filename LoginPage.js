import { test, expect } from '@playwright/test';
import { urls } from '../test-data/credentials';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel(/email/i).or(page.getByPlaceholder(/you@example\.com/i));
    this.password = page.getByLabel(/password/i).or(page.getByPlaceholder(/enter your password/i));
    this.loginBtn = page.getByRole('button', { name: /^login$/i });
    // this.anyError = page.getByText('Authentication failed: Invalid credentials');
  }

  async assertLoaded() {
    await expect(this.loginBtn).toBeVisible();
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
    // wait for navigation to the dashboard (adjust the URL pattern as needed)
    await expect(this.page).toHaveURL(urls.dashboard);
    await this.page.screenshot({path: 'screenshots/dashboard.png'});
  }
  
  async tryInvalidAttempts(cases) {
    for (const c of cases) {
      await this.email.fill(c.email);
      await this.password.fill(c.password);
      await this.loginBtn.click();
      await this.page.waitForTimeout(500); // small wait for error messages or reload
      await this.email.clear();
      await this.password.clear();
    }
  }
}