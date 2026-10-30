import { expect, test } from '@playwright/test';

test('failed check-line JavaScript leaves results, copy and case links available', async ({ page }) => {
  await page.route('**/lower.js*', route => route.abort());
  await page.goto('/#selected');
  await expect(page.locator('[data-work-row]')).toHaveCount(5);
  await expect(page.locator('[data-project="policylens"] .row-media')).toBeVisible();
  await expect(page.locator('[data-project="projectlens"]').getByRole('link', {name:'Read the ProjectLens case study',exact:true})).toHaveAttribute('href','./work/projectlens/');
});

test('visible link wording remains available to assistive technology', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-actions').getByRole('link', {name:'Open CV (PDF)',exact:true})).toBeVisible();
  await expect(page.locator('.brand')).toHaveAccessibleName(/MP/);
  for (const project of ['policylens','projectlens','rag-regression-gate','quicksupply','lakehouse']) {
    await expect(page.locator(`[data-project="${project}"] .row-actions a`).last()).not.toHaveAttribute('aria-label');
  }
});
