import { expect, test } from '@playwright/test';

test('failed story JavaScript still leaves images, copy and case links available', async ({ page }) => {
  await page.route('**/work-story.js*', route => route.abort());
  await page.goto('/#selected');
  await expect(page.locator('.selected-card')).toHaveCount(3);
  await expect(page.locator('[data-project="policylens"] .project-media')).toBeVisible();
  await expect(page.locator('[data-project="projectlens"]').getByRole('link', {name:'Review ProjectLens case',exact:true})).toHaveAttribute('href','./preview.html?app=projectlens');
});

test('visible link wording remains available to assistive technology', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-actions').getByRole('link', {name:'Open CV (PDF)', exact:true})).toBeVisible();
  await expect(page.locator('.brand')).toHaveAccessibleName(/MP/);
  for (const project of ['policylens','projectlens','quicksupply']) {
    const link = page.locator(`[data-project="${project}"]`).locator('.project-link');
    await expect(link).not.toHaveAttribute('aria-label');
  }
});
