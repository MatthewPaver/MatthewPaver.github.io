import { expect, test } from '@playwright/test';
import fs from 'node:fs/promises';

const demo = '/demos/rag-gate/';

test('review the changed evidence, compare another update, and download the exact engine result', async ({ page }) => {
  const errors: string[] = [];
  const unexpected: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (request.method() !== 'GET' || !request.url().startsWith('http://127.0.0.1:4321/')) unexpected.push(request.url());
  });
  await page.goto(demo);
  await page.getByRole('link', { name: 'Explore the example', exact: true }).click();
  await expect(page.locator('#switch-result')).toBeEnabled();
  // Anchor scrolling can move the viewport between separate boundingBox calls.
  // Sample both rectangles in one browser task so the order check stays meaningful.
  const positions = await page.evaluate(() => ({
    outcomeBottom: document.querySelector('#decision')!.getBoundingClientRect().bottom,
    sourcesTop: document.querySelector('.rankings')!.getBoundingClientRect().top,
  }));
  expect(positions.outcomeBottom).toBeLessThan(positions.sourcesTop);
  expect(await page.locator('#decision').evaluate(el => !!(el.compareDocumentPosition(document.querySelector('.rankings')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(page.locator('#before-sources h4').first()).toHaveText('Approved retention policy');
  await expect(page.locator('#after-sources h4').first()).toHaveText('2022 proposal');
  await expect(page.locator('#consequence')).toContainText('outdated proposal now ranks above it');
  await expect(page.locator('#case-summary')).toHaveText('6 of 6 question checks pass. The overall order of documents still got worse, so a simple pass count would miss this.');
  await page.getByRole('link', { name: 'See the full evidence', exact: true }).click();
  await page.getByText('Read every retrieved source', { exact: true }).click();
  await expect(page.locator('#source-evidence section').first().locator('li')).toHaveCount(3);
  await expect(page.locator('#source-evidence')).toContainText('it was never approved');
  await page.getByText('Inspect the technical result and reproduce it', { exact: true }).click();
  await expect(page.locator('#metric-summary')).toContainText('0.9167 before, 0.8333 after');
  for (const [passed, filename] of [[false, 'comparison.json'], [true, 'unchanged.json']] as const) {
    if (passed) await page.getByRole('button', { name: 'Show an update that changes nothing', exact: true }).click();
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download JSON report', exact: true }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(filename);
    const downloaded = JSON.parse(await fs.readFile((await download.path())!, 'utf8'));
    expect(downloaded).toEqual(await (await page.request.get(demo + filename)).json());
    expect(downloaded.passed).toBe(passed);
  }
  await expect(page.locator('#verdict')).toHaveText('No drop found');
  await expect(page.locator('#result-heading')).toHaveText('Nothing got worse in this test.');
  await expect(page.locator('#decision-mark')).toHaveAttribute('d', 'M8 15h14');
  await expect(page.locator('#after-sources h4').first()).toHaveText('Approved retention policy');
  await expect(page.locator('#reproduce')).toContainText('candidate-bm25-b05.json');
  await expect(page.locator('#full-report')).toHaveAttribute('href', 'unchanged-report.html');
  await expect(page.getByRole('link', { name: 'Read report (HTML)', exact: true })).toHaveAttribute('href', /\/unchanged-report\.html$/);
  await page.getByRole('button', { name: 'Show the update that got worse', exact: true }).click();
  await expect(page.locator('#verdict')).toHaveText('Hold this update');
  expect(errors).toEqual([]);
  expect(unexpected).toEqual([]);
});

test('all questions preserve exact source order in both saved comparisons', async ({ page }) => {
  const bundle = await (await page.request.get(demo + 'evidence.json')).json();
  await page.goto(demo);
  await expect(page.locator('#question-picker')).toBeVisible();
  await page.getByText('Read every retrieved source', { exact: true }).click();
  for (const scenario of ['regression', 'unchanged']) {
    if (scenario === 'unchanged') await page.getByRole('button', { name: 'Show an update that changes nothing', exact: true }).click();
    const report = bundle.scenarios[scenario];
    for (let index = 0; index < 6; index++) {
      await page.getByLabel('Choose a staff question').selectOption(String(index));
      await expect(page.locator('#question')).toHaveText(report.baseline_report.cases[index].query);
      for (const [column, run] of [['first', report.baseline_report], ['last', report.candidate_report]] as const) {
        const section = column === 'first' ? page.locator('#source-evidence section').first() : page.locator('#source-evidence section').last();
        await expect(section.locator('code')).toHaveText(run.cases[index].retrieved_ids);
      }
      await expect(page.locator('#verdict')).toHaveText(report.passed ? 'No drop found' : index === 2 ? 'Hold this update' : 'No drop on this question');
      if (index === 3) await expect(page.locator('#consequence')).toContainText('The update did not make this worse, but it was already a problem');
      if (scenario === 'regression' && index !== 2) await expect(page.locator('#consequence')).toContainText('still on hold because the data-retention question got worse');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  }
});

test('keyboard controls have bounded navigation and readable status updates', async ({ page }) => {
  await page.goto(demo);
  await expect(page.locator('#question-picker')).toBeVisible();
  await page.getByLabel('Choose a staff question').selectOption('0');
  await expect(page.getByRole('button', { name: 'Previous question', exact: true })).toBeDisabled();
  const next = page.getByRole('button', { name: 'Next question', exact: true });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#position')).toHaveText('Question 2 of 6');
  await expect(page.locator('#announcement')).toContainText('How often should production API credentials be rotated?');
  await page.getByLabel('Choose a staff question').selectOption('5');
  await expect(next).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Previous question', exact: true })).toBeEnabled();
});

for (const failure of ['network', 'malformed']) {
  test(`unavailable evidence recovers to the readable saved report: ${failure}`, async ({ page }) => {
    await page.route('**/evidence.json', (route) => failure === 'network' ? route.abort() : route.fulfill({ json: { version: 1, documents: [], scenarios: {} } }));
    await page.goto(demo);
    await expect(page.locator('#load-error')).toBeVisible();
    await expect(page.locator('#question')).toContainText('raw customer event records');
    await expect(page.locator('#switch-result')).toBeHidden();
    await expect(page.locator('.question-navigation')).toBeHidden();
    await page.getByText('Inspect the technical result and reproduce it', { exact: true }).click();
    await page.getByRole('link', { name: 'Open the full offline report', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Candidate regresses', exact: true })).toBeVisible();
  });
}

test('no JavaScript still offers the full report, source text and own-data setup', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL + demo);
  await expect(page.getByRole('heading', { name: 'Keep the right policy within reach.', exact: true })).toBeVisible();
  await page.getByText('Read every retrieved source', { exact: true }).click();
  await expect(page.locator('#source-evidence')).toContainText('retention-superseded');
  await expect(page.getByRole('link', { name: 'Set up the gate', exact: true })).toHaveAttribute('href', /#quickstart$/);
  await page.getByRole('link', { name: 'Open all six questions in the offline report', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Candidate regresses', exact: true })).toBeVisible();
  await context.close();
});

test('reduced motion keeps result switching immediate and content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo);
  await page.getByRole('button', { name: 'Show an update that changes nothing', exact: true }).click();
  await expect(page.locator('#verdict')).toHaveText('No drop found');
  await expect(page.locator('#result-heading')).toHaveText('Nothing got worse in this test.');
  await expect(page.locator('#decision-mark')).toHaveAttribute('d', 'M8 15h14');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});
