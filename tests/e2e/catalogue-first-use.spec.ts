import { expect, test } from '@playwright/test';

test('catalogue offers direct first actions and honest setup requirements', async ({ page }) => {
  await page.goto('/work/');
  const actions = {
    projectlens: ['Try the schedule review', 'https://matthewpaver.github.io/ProjectLens/change-assurance.html'],
    winchester: ['Try the shortlist', 'https://matthewpaver.github.io/winchester-buyer-check/'],
    lakehouse: ['Explore sample data', 'https://matthewpaver.github.io/marketing-ml-lakehouse/#quality'],
  };
  for (const [slug, [name, href]] of Object.entries(actions)) {
    const card = page.locator(`[data-slug="${slug}"]`);
    await expect(card.getByRole('link', {name, exact:true})).toHaveAttribute('href',href);
    await expect(card.locator('.work-access')).toContainText('Browser');
  }
  await expect(page.locator('[data-slug="policylens"] .work-access')).toContainText('Node.js');
  await expect(page.locator('[data-slug="quicksupply"] .work-access')).toContainText('Recorded case study');
  await expect(page.locator('[data-slug="hr"] .work-access')).toContainText('Power BI Desktop');
});

test('all seven thumbnails preserve the real interface and first-use help works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page = await context.newPage();
  await page.goto('/work/');
  await expect(page.locator('.app-cover-screen img')).toHaveCount(7);
  for (const img of await page.locator('.app-cover-screen img').all()) {
    await expect(img).toHaveCSS('object-fit','contain');
  }
  const project = page.locator('[data-slug="projectlens"]');
  await project.getByText('First steps', {exact:true}).click();
  await expect(project.getByText(/Try the Northstar example/)).toBeVisible();
  await expect(page.locator('.work-card')).toHaveCount(7);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await context.close();
});
