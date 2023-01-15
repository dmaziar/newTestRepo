import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  const screenshotName = 'screenshot.png'
  const user = 'automation-senior'
  const pw = 'GoodLuck100:)'
  const homePage = 'https://regression-test.elementor.cloud/'
  await page.goto(homePage);
  await expect(page).toHaveTitle('Regression Test – Just another Elementor Cloud website ;)');

  await expect(page).toHaveScreenshot();

  await page.goto('https://regression-test.elementor.cloud/wp-admin/')
  await page.locator('#user_login').type(user)
  await page.locator('[type="password"]').type(pw)
  await page.locator('[name="wp-submit"]').click()

  await expect(page).toHaveTitle('Dashboard ‹ Regression Test — WordPress');

  await page.goto('https://regression-test.elementor.cloud/?elementor')
  await expect(page).toHaveTitle('Elementor | Home');
  const updateScript = `await $e.run('document/elements/settings', {
    container: elementor.getPreviewContainer(),
    settings: { custom_css: '#main h1{font-size: 100px}' }
    });`
    // await $e.run( 'document/save/default' );
  await page.evaluate(updateScript=>updateScript);
  await page.goto(homePage);
  await expect(page).toHaveScreenshot('has-title-1-chromium-darwin.png');
});

