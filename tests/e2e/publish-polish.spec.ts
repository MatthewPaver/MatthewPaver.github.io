import { expect, test } from '@playwright/test';

test('selected cases have short action names and directly inspectable captures', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toContainText('Six years at Projecting Success');
  for (const [slug, name, image] of [
    ['policylens', 'PolicyLens', 'policylens-review.png'],
    ['projectlens', 'ProjectLens', 'projectlens-questions.png'],
    ['quicksupply', 'QuickSupply', 'quicksupply-dashboard.png'],
  ]) {
    await page.getByRole('tab', {name, exact:true}).click();
    const card = page.locator(`[data-project="${slug}"]`);
    await expect(card.getByRole('link', { name: `Review ${name} case`, exact: true }))
      .toHaveAttribute('href', `./preview.html?app=${slug}`);
    const capture = card.getByRole('link', { name: `Open full-size ${name} capture`, exact: true });
    await expect(capture).toHaveAttribute('href', `./assets/${image}`);
    await expect(card.locator('a .project-summary')).toHaveCount(0);
    await expect(card.getByRole('link')).toHaveCount(2);
  }
});

test('catalogue leads with an immediately usable public browser example', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.app-card').first()).toHaveAttribute('data-slug', 'projectlens');
});
