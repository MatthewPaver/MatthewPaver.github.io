import { expect, test } from '@playwright/test';

const products = [
  ['ProjectLens', 'projectlens', 'https://matthewpaver.github.io/ProjectLens/change-assurance.html', 'ProjectLens'],
  ['PolicyLens', 'policylens', 'https://matthewpaver.github.io/iam-policy-auditor/', 'iam-policy-auditor'],
  ['RAG Regression Gate', 'rag-regression-gate', '../../demos/rag-gate/', 'rag-retrieval-gate'],
] as const;

for (const [name, slug, demo, repo] of products) {
  test(`${name} has a complete homepage, case, evidence and demo path`, async ({ page }) => {
    await page.goto('/#selected');
    const panel = page.locator(`[data-project="${slug}"]`);
    await expect(panel.getByRole('link', { name: `Open ${name}`, exact: true })).toBeVisible();
    await panel.getByRole('link', { name: `Read the ${name} case study`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}/$`));
    await expect(page.locator('.case-note h1')).toContainText(name);
    await expect(page.getByRole('heading', { name: 'The decision it supports', exact: true })).toBeVisible();
    // The caveat remains readable before any historic captures or technical disclosure.
    expect(await page.locator('.case-note').evaluate(el => {
      const headings = [...el.querySelectorAll('h2')].map(h => h.textContent);
      return headings.indexOf('Limits') < headings.indexOf('Before and after');
    })).toBe(true);
    await expect(page.getByRole('link', { name: `Try ${name}`, exact: true })).toHaveAttribute('href', demo);
    await page.locator('.case-actions').first().getByRole('link', { name: 'Technical evidence', exact: true }).click();
    await expect(page).toHaveURL(/#technical-evidence$/);
    await expect(page.getByRole('link', { name: 'Results and reproducible tests', exact: true }))
      .toHaveAttribute('href', `https://github.com/MatthewPaver/${repo}#results`);
    await expect(page.locator('.comparison-pair img')).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
  });
}

test('all three flagship cases remain reachable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL + '/');
  for (const [name, slug] of products) {
    const card = page.locator(`[data-project="${slug}"]`);
    await expect(card.getByRole('link', { name: `Open ${name}`, exact: true })).toBeVisible();
    await card.getByRole('link', { name: `Read the ${name} case study`, exact: true }).click();
    await expect(page.locator('.case-actions a').first()).toBeVisible();
    await page.getByRole('link', { name: 'Home', exact: true }).click();
  }
  await context.close();
});
