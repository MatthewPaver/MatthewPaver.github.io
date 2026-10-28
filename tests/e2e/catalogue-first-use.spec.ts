import { expect, test } from '@playwright/test';

test('catalogue offers direct first actions and honest setup requirements', async ({ page }) => {
  await page.goto('/work/');
  const actions = {
    policylens: ['Open the example', 'https://matthewpaver.github.io/iam-policy-auditor/'],
    projectlens: ['Open the example', 'https://matthewpaver.github.io/ProjectLens/change-assurance.html'],
    'rag-regression-gate': ['Open the example', '../demos/rag-gate/'],
    winchester: ['Open the shortlist', 'https://matthewpaver.github.io/winchester-buyer-check/'],
    lakehouse: ['Open the data checks', 'https://matthewpaver.github.io/marketing-ml-lakehouse/#quality'],
  };
  for (const [slug, [name, href]] of Object.entries(actions)) {
    const card = page.locator(`[data-slug="${slug}"]`);
    await expect(card.getByRole('link', {name, exact:true})).toHaveAttribute('href',href);
    await expect(card.locator('.work-access')).toContainText(/browser/i);
  }
  await expect(page.locator('[data-slug="projectlens"] a.first-steps-link', {hasText:'Take the guided walkthrough'})).toHaveAttribute('href','https://matthewpaver.github.io/ProjectLens/change-assurance.html?walkthrough=1');
  await expect(page.locator('[data-slug="policylens"] .work-card-proof')).toContainText('Node.js');
  await expect(page.locator('[data-slug="quicksupply"] .work-access')).toContainText('Recorded walkthrough');
  await expect(page.locator('[data-slug="hr"] .work-access')).toContainText('Power BI Desktop');
});

test('all eight thumbnails preserve the real interface and first-use help works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page = await context.newPage();
  await page.goto('/work/');
  await expect(page.locator('.app-cover-screen img')).toHaveCount(8);
  for (const img of await page.locator('.app-cover-screen img').all()) {
    await expect(img).toHaveCSS('object-fit','contain');
  }
  const project = page.locator('[data-slug="projectlens"]');
  await project.getByText('First steps', {exact:true}).click();
  await expect(project.getByText(/Try the Northstar example/)).toBeVisible();
  await expect(page.locator('.work-card')).toHaveCount(8);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await context.close();
});
