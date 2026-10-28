import { expect, test } from '@playwright/test';

test('homepage opens all three evidence-led case studies with real capture pairs', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.flagship-release')).toHaveCount(0);
  for (const slug of ['projectlens', 'policylens', 'rag-regression-gate']) await expect(page.locator(`[data-project="${slug}"] a[href="./work/${slug}/"]`)).toHaveCount(1);
  for (const slug of ['projectlens', 'policylens', 'rag-regression-gate']) {
    await page.goto(`/work/${slug}/`);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://matthewpaver.github.io/work/${slug}/`);
    const images = page.locator('.comparison-pair img');
    await expect(images).toHaveCount(2);
    for (const image of await images.all()) await expect.poll(() => image.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { name: 'Limits', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  const response = await page.request.get('/demos/rag-gate/comparison.json');
  const report = await response.json();
  expect(report.passed).toBe(false);
  expect(report.regressions).toContain('mrr_at_k');
  await page.goto('/demos/rag-gate/');
  await expect(page.getByRole('heading', { name: 'Keep the right policy within reach.', exact: true })).toBeVisible();
  await page.goto('/demos/rag-gate/report.html');
  await expect(page.getByRole('heading', { name: 'Candidate regresses', exact: true })).toBeVisible();
});

test('before-and-after evidence and demo links remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const slug of ['projectlens', 'policylens', 'rag-regression-gate']) {
    await page.goto(`http://127.0.0.1:4321/work/${slug}/`);
    await expect(page.locator('.comparison-pair img')).toHaveCount(2);
    await expect(page.getByRole('heading', { name: 'Limits', exact: true })).toBeVisible();
    await expect(page.locator('.case-actions a').first()).toBeVisible();
  }
  await context.close();
});


test('ProjectLens product landing is primary and its walkthrough stays reachable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const url = 'https://matthewpaver.github.io/ProjectLens/change-assurance.html?walkthrough=1';
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('.screening-room').getByRole('link', { name: 'Open ProjectLens', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/ProjectLens/change-assurance.html');
  await page.goto('http://127.0.0.1:4321/work/projectlens/');
  await expect(page.locator('.case-actions').first().getByRole('link', { name: 'Take the interactive walkthrough', exact: true })).toHaveAttribute('href', url);
  await expect(page.getByRole('link', { name: 'Try ProjectLens', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/ProjectLens/change-assurance.html');
  const data = await (await page.request.get('http://127.0.0.1:4321/previews.json')).json();
  expect(data.projectlens.links.find((link: {primary?: boolean}) => link.primary).href).toBe('https://matthewpaver.github.io/ProjectLens/change-assurance.html');
  expect(data.projectlens.links.some((link: {href:string}) => link.href === url)).toBe(true);
  await context.close();
});
