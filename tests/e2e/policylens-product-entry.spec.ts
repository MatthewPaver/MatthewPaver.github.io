import { expect, test } from '@playwright/test';

test('PolicyLens product and before/after case stay directly reachable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('link', { name: 'Open PolicyLens', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/iam-policy-auditor/');
  await page.goto('http://127.0.0.1:4321/work/policylens/');
  await expect(page.getByRole('link', { name: 'Explore PolicyLens', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/iam-policy-auditor/');
  await expect(page.getByRole('link', { name: 'Review your own policies', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/iam-policy-auditor/?view=review');
  await expect(page.locator('.comparison-pair img')).toHaveCount(2);
  await expect(page.locator('.comparison-pair img').first()).toHaveAttribute('src', /policylens-product-before\.png$/);
  await expect(page.locator('.comparison-pair img').last()).toHaveAttribute('src', /policylens-product-after\.png$/);
  const data = await (await page.request.get('http://127.0.0.1:4321/previews.json')).json();
  expect(data.policylens.links.find((link: {primary?:boolean}) => link.primary).href).toBe('https://matthewpaver.github.io/iam-policy-auditor/');
  expect(data.policylens.steps.join(' ')).toContain('correction');
  await context.close();
});
