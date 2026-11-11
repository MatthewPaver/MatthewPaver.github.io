import { expect, test } from '@playwright/test';

test('selected rows have direct actions and readable HTML results', async ({ page }) => {
  await page.goto('/');
  // Hero is purpose-first; employer detail lives under About, not in the first viewport.
  await expect(page.locator('.hero-copy h1')).toContainText('I build AI review tools that show their evidence.');
  await expect(page.locator('.hero-copy .lede')).not.toContainText('Projecting Success');
  await expect(page.locator('#about')).toContainText('Automation & AI Consultant at Ciklum, placed at Trustpilot');
  await expect(page.locator('#about')).toContainText('six years at Projecting Success');
  for (const [slug] of [
    ['policylens', 'PolicyLens'], ['projectlens', 'ProjectLens'], ['rag-regression-gate', 'RAG Regression Gate'],
  ]) {
    const row = page.locator(`[data-project="${slug}"]`);
    await expect(row.getByRole('link', {name:'Evidence, cases and limits',exact:true})).toHaveAttribute('href', `./work/${slug}/`);
    await expect(row.locator('[data-card]')).toBeVisible();
    await expect(row.locator('.row-summary')).toBeVisible();
  }
  await expect(page.locator('#case-lakehouse .row-question')).toHaveText('For analysts and data engineers who report on ad campaigns');
});

test('catalogue leads with the strongest AI work: PolicyLens, then ProjectLens', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.app-card').first()).toHaveAttribute('data-slug', 'policylens');
  await expect(page.locator('.app-card').nth(1)).toHaveAttribute('data-slug', 'projectlens');
  await expect(page.locator('.app-card').nth(2)).toHaveAttribute('data-slug', 'rag-regression-gate');
  await expect(page.locator('.template-row').first()).toContainText('PySpark and Kafka starter');
});

test('selected evidence keeps measured failures and prototype limits explicit', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-inventory')).toHaveText('5 selected of 8: three review tools, a booking prototype and a data pipeline, all personal prototypes you can inspect');
  const policy = page.locator('#case-policylens');
  await expect(policy.locator('.row-observe')).toContainText('21 of 30');
  await expect(policy.locator('.row-observe')).toContainText('wrongly passed a made-up change that removes multi-factor authentication (MFA)');
  const project = page.locator('#case-projectlens');
  await expect(project.locator('.row-observe')).toContainText('29 of 40');
  await expect(project.locator('.row-observe')).not.toContainText('3 of 10');
  await expect(project.locator('.row-proof div').filter({ has: page.getByText('Limits', { exact: true }) })).toContainText('Found only 3 of 10 labelled contradictions');
  for (const row of [policy, project]) {
    await expect(row.locator('.row-copy')).not.toContainText(/Set 5|PLH5-A21/);
  }
  const rag = page.locator('#case-rag-regression-gate');
  await expect(rag.locator('.row-question')).toHaveText('For teams with an AI assistant that looks up documents before it answers');
  await expect(rag.locator('.row-observe')).toContainText('6 example questions');
  await expect(rag.locator('.row-observe')).toContainText('an unapproved 2022 proposal overtook the approved policy');
  await expect(rag.locator('.row-proof')).toContainText('does not search your documents');
  await expect(rag.getByRole('link', { name: 'Inspect a saved run', exact: true })).toHaveAttribute('href', './demos/rag-gate/');
  const also = page.getByRole('region', { name: 'Also built', exact: true });
  await expect(also.getByRole('heading', { name: 'Also built', exact: true })).toBeVisible();
  await expect(also.locator('.work-row')).toHaveCount(2);
  const supply = also.locator('#case-quicksupply');
  await expect(supply.locator('.row-question')).toHaveText('For schools and supply agencies following a cover booking');
  await expect(supply.locator('.row-observe')).toContainText('one request through the separate school, agency and teacher views');
  await expect(supply.locator('.row-proof')).toContainText('made-up data, not a live booking service');
  const lakehouse = also.locator('#case-lakehouse');
  await expect(lakehouse.locator('.row-observe')).toContainText('7 data checks: 6 pass and 1 warns about five repeated rows');
  await expect(lakehouse.locator('.row-proof')).toContainText('forecast does no better than assuming tomorrow matches today');
  await expect(lakehouse.getByRole('link', { name: 'Open the example', exact: true })).toHaveAttribute('href', 'https://matthewpaver.github.io/marketing-ml-lakehouse/#quality');
});
