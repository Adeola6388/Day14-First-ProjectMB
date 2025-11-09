import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials, urls } from '../test-data/credentials';

test('Dashboard: assert, goto accounts, copy, search, screenshot' , async ({ page }) => {
  const landing = new LandingPage(page);
  const login = new LoginPage(page);
  const dash = new DashboardPage(page);

  // Login First
  await landing.goto(urls.home);
  console.log('✅ Step 1: Go to homepage');
  await landing.clickLogin();
  
  console.log('✅ Step 2:Login Clciked');
  await login.login(credentials.valid.email, credentials.valid.password);
  
  console.log('✅ Step 3: Email, Password Entered & Login ButtonClicked');
  // Assertions that were on Dashboard
  await dash.assertOnDashboard();
  
  console.log('✅ Step 4: Dashboard Page confirmed');
  // Accounts > copy number > back > search > screenshot
  await dash.goToAccounts();
  
  console.log('✅ Step 5: Accounts Page Clicked');
  const accountNumber = await dash.copyFirstAccountNumber();
  
  console.log('✅ Step 6: Account Number Copied');
  await dash.backToDashboard();
 
  console.log('✅ Step 7: Back to Dashboard Page');
  await dash.searchFor(accountNumber);
 
  console.log('✅ Step 8: Enter the copied Account Number In Search Field');
    await dash.screenshot('searched-account.png');

    console.log('✅ Step 9: Screenshot taken and saved successfully');
  });