import { expect, test } from '@playwright/test';

test('selected rows have direct actions and readable HTML results', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toContainText('Automation & AI Consultant at Ciklum, placed at Trustpilot');
  await expect(page.locator('.hero-copy .lede')).not.toContainText('Projecting Success');
  await expect(page.locator('#about')).toContainText('six years at Projecting Success');
  for (const [slug, name] of [
    ['policylens', 'PolicyLens'], ['projectlens', 'ProjectLens'], ['rag-regression-gate', 'RAG Regression Gate'],
  ]) {
    const row = page.locator(`[data-project="${slug}"]`);
    await expect(row.getByRole('link', {name:`Read the ${name} case study`,exact:true})).toHaveAttribute('href', `./work/${slug}/`);
    await expect(row.locator('[data-card]')).toBeVisible();
    await expect(row.locator('.row-summary')).toBeVisible();
  }
  await expect(page.locator('#case-lakehouse .row-question')).toHaveText('Can a campaign report be rebuilt and checked from the raw files?');
});

test('catalogue leads with the strongest AI work: PolicyLens, then ProjectLens', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.app-card').first()).toHaveAttribute('data-slug', 'policylens');
  await expect(page.locator('.app-card').nth(1)).toHaveAttribute('data-slug', 'projectlens');
  await expect(page.locator('.app-card').nth(2)).toHaveAttribute('data-slug', 'rag-regression-gate');
  await expect(page.locator('.template-row').first()).toContainText('PySpark and Kafka starter');
});
