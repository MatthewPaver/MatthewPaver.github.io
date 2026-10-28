import { expect, test } from '@playwright/test';

test('selected cases have short action names and directly inspectable captures', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toContainText('Automation & AI Consultant at Ciklum, placed at Trustpilot');
  await expect(page.locator('.hero-copy')).toContainText('six years at Projecting Success');
  for (const [slug, name, image] of [
    ['policylens', 'PolicyLens', 'previews/policylens-2026-10-24-terms.png'],
    ['projectlens', 'ProjectLens', 'previews/projectlens-2026-10-24-terms.png'],
    ['rag-regression-gate', 'RAG Regression Gate', 'previews/rag-regression-gate-2026-10-24-terms.png'],
    ['quicksupply', 'QuickSupply', 'quicksupply-dashboard.png'],
  ]) {
    await page.getByRole('tab', {name, exact:true}).click();
    const card = page.locator(`[data-project="${slug}"]`);
    await expect(card.getByRole('link', { name: slug === 'quicksupply' ? 'Watch and read the QuickSupply case study' : `Read the ${name} case study`, exact: true }))
      .toHaveAttribute('href', slug === 'quicksupply' ? `./preview.html?app=${slug}` : `./work/${slug}/`);
    const capture = card.getByRole('link', { name: `View the ${name} screenshot`, exact: true });
    await expect(capture).toHaveAttribute('href', `./assets/${image}`);
    await expect(card.locator('a .project-summary')).toHaveCount(0);
    await expect(card.getByRole('link')).toHaveCount(slug === 'quicksupply' ? 2 : 3);
    if (slug === 'policylens') await expect(card.getByRole('link', { name: 'Open PolicyLens', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/iam-policy-auditor/');
  }
});

test('catalogue leads with the strongest AI work: PolicyLens, then ProjectLens', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.app-card').first()).toHaveAttribute('data-slug', 'policylens');
  await expect(page.locator('.app-card').nth(1)).toHaveAttribute('data-slug', 'projectlens');
  await expect(page.locator('.app-card').nth(2)).toHaveAttribute('data-slug', 'rag-regression-gate');
  await expect(page.locator('.template-row').first()).toContainText('PySpark and Kafka starter');
});
