import { expect, test } from '@playwright/test';

test('selected cases have short action names and directly inspectable captures', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toContainText('AI solutions architect at Trustpilot through Ciklum');
  await expect(page.locator('.hero-copy')).toContainText('Seven years in data and AI');
  for (const [slug, name, image] of [
    ['policylens', 'PolicyLens', 'previews/policylens-2026-10-24-terms.png'],
    ['projectlens', 'ProjectLens', 'previews/projectlens-2026-10-24-terms.png'],
    ['rag-regression-gate', 'RAG Regression Gate', 'previews/rag-regression-gate-2026-10-24-terms.png'],
    ['quicksupply', 'QuickSupply', 'quicksupply-dashboard.png'],
  ]) {
    await page.getByRole('tab', {name, exact:true}).click();
    const card = page.locator(`[data-project="${slug}"]`);
    await expect(card.getByRole('link', { name: `Review ${name} case`, exact: true }))
      .toHaveAttribute('href', slug === 'quicksupply' ? `./preview.html?app=${slug}` : `./work/${slug}/`);
    const capture = card.getByRole('link', { name: `Open full-size ${name} capture`, exact: true });
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
  await expect(page.locator('.template-row').first()).toContainText('RAG Regression Gate');
});
