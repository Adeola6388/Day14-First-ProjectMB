// ✅ Step 1: Go to homepage
// ✅ Step 2: Login Clicked
// ✅ Step 3: Email, password entered & Login button Clicked
// ✅ Step 4: Dahboard Page Confirmed
// ✅ Step 5: Accounts Page Clicked
// ✅ Step 6: Account Number copied
// ✅ Step 7: Back to Dashboard Page
// ✅ Step 8: Enter the copied Account number in search field.

import { expect } from "playwright/test";

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.overviewHeading = page.getByRole('heading', {name: /overview/i });
    this.accountBalanceCard = page.getByText(/account balance/i);
    this.sidebarDashboard = page.getByRole('link', {name: /dashboard/i});
    this.sidebarAccounts = page.getByRole('link', {name: /^accounts$/i});
    this.searchInput = page.getByPlaceholder(/search/i).or(page.getByRole('searchbox'));
  }

  async assertOnDashboard() {
      await expect(this.overviewHeading).toBeVisible();
      await expect(this.sidebarDashboard).toBeVisible();
      await expect(this.accountBalanceCard).toBeVisible();
    }
  
    async goToAccounts() {
      await this.sidebarAccounts.click();
    }

    async copyFirstAccountNumber() {
        const accountNumber = await this.page.locator("//p[text()='Account Number']/following-sibling::div//p").first().innerText();
        console.log(accountNumber);
        return accountNumber.trim();
    }
      
    async backToDashboard(){
        await this.sidebarDashboard.click();
    }
    
    async searchFor(text) {
        await this.searchInput.fill(text);
    }
        async screenshot(name = 'dashboard-search.png') {
            await this.page.screenshot({ path: `screenshots/${name}`, fullPage: true });
        }
    }