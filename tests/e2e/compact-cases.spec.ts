import { expect, test } from '@playwright/test';

const slugs = ['policylens', 'projectlens', 'rag-regression-gate', 'quicksupply', 'lakehouse'];

test('selected work keeps all five complete rows in the approved order', async ({ page }) => {
  await page.goto('/#selected');
  expect(await page.locator('[data-work-row]').evaluateAll(rows => rows.map(row => row.id))).toEqual(slugs.map(slug => `case-${slug}`));
  await expect(page.getByRole('tablist')).toHaveCount(0);
  for (const slug of slugs) {
    const row = page.locator(`#case-${slug}`);
    await expect(row.getByRole('heading')).toBeVisible();
    await expect(row.locator('.row-proof')).toContainText('Limits');
    await expect(row.locator('.row-actions a').first()).toHaveAttribute('href', /.+/);
    await expect(row.locator('.row-actions a').last()).toHaveAttribute('href', ['quicksupply', 'lakehouse'].includes(slug) ? `./preview.html?app=${slug}` : `./work/${slug}/`);
  }
  await expect(page.locator('.hero-bottom').getByRole('link', {name:'See all work',exact:true})).toHaveAttribute('href','./work/');
});

test('project bookmarks land on visible rows and browser Back keeps the earlier anchor', async ({ page }) => {
  await page.goto('/#case-projectlens');
  await expect(page.locator('#case-projectlens')).toBeInViewport();
  await page.locator('.nav-links').getByRole('link', {name:'About',exact:true}).click();
  await expect(page).toHaveURL(/#about$/);
  await page.goBack();
  await expect(page).toHaveURL(/#case-projectlens$/);
  await expect(page.locator('#case-projectlens')).toBeInViewport();
});

test('reduced motion keeps final results and no overflow at phone, tablet and desktop widths', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    await expect(page.locator('[data-hero]')).toHaveAttribute('data-motion','finished');
    await expect(page.locator('[data-check-toggle]')).toBeHidden();
    await expect(page.locator('[data-work-row]')).toHaveCount(5);
    expect(await page.locator('main').evaluate(el => el.getAnimations({subtree:true}).length)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test('failed enhancement and printing keep every result available', async ({ page }) => {
  await page.route('**/d2.js*', route => route.abort());
  await page.route('**/lower.js*', route => route.abort());
  await page.goto('/#selected');
  await expect(page.locator('[data-work-row]:visible')).toHaveCount(5);
  await expect(page.locator('[data-hero-card]')).toHaveClass(/is-found/);
  await expect(page.locator('[data-check-toggle]')).toBeHidden();
  await page.unroute('**/d2.js*');
  await page.unroute('**/lower.js*');
  await page.goto('/');
  await page.emulateMedia({media:'print'});
  await expect(page.locator('[data-work-row]:visible')).toHaveCount(5);
  for (const verdict of await page.locator('.rc-out').all()) await expect(verdict).toHaveCSS('opacity','1');
});

test('Method is concise, evidence-linked and honest about local extensions', async ({ page }) => {
  await page.goto('/#contract');
  const method = page.locator('#contract');
  await expect(method.locator('.method-example')).toHaveCount(3);
  expect((await method.innerText()).split(/\s+/).length).toBeLessThan(230);
  for (const slug of ['projectlens','policylens','lakehouse']) {
    await expect(method.locator(slug === 'lakehouse' ? `a[href="./preview.html?app=${slug}#case-story"]` : `a[href="./work/${slug}/#technical-evidence"]`)).toBeVisible();
  }
  await expect(method).toContainText('local extension');
  await expect(method).toContainText('does no better');
  await expect(method.locator('button')).toHaveCount(0);
});


test('phone check wires finish drawing after a row enters view', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const row = page.locator('#case-projectlens');
  await row.scrollIntoViewIfNeeded();
  await expect(row).toHaveClass(/is-drawn/);
  for (const wire of await row.locator('.rc-wire i').all()) await expect(wire).toHaveCSS('transform','none');
});
