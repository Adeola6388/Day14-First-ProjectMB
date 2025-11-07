import {test} from '@playwright/test';
import {LandingPage} from '../pages/LandingPage';
import {urls} from '../test-data/credentials';

test('Landing Page: Navigation Assertions & Actions', async ({ page }) => {
  const landing = new LandingPage(page);

  await landing.goto(urls.home);
  console.log('🧭 Step 1: Go to homepage');

  await landing.assertLoaded();
  console.log('✅ Step 2: Page loaded');

  await landing.clickHeroGetStartedAndBack();
  console.log('🧩 Step 3: Button Clicked');
  console.log('🚀 Step 4: Browser navigating back');

  await landing.clickLowerGetStartedAndBack();
  console.log('🔄 Step 5: Button clicked');
  console.log('Step 6: Bowser navigating back');

  await landing.clickLogin();
  console.log('🎯 Login button clicked!');
});
