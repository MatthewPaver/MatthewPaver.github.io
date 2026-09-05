import { expect, test } from '@playwright/test';

test('compact case tabs show one complete case and preserve the catalogue route', async ({ page }) => {
  await page.goto('/#selected');
  const tabs = page.getByRole('tablist', {name:'Selected case studies'});
  for (const [name, slug] of [['PolicyLens','policylens'],['ProjectLens','projectlens'],['QuickSupply','quicksupply']]) {
    await tabs.getByRole('tab', {name, exact:true}).click();
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    const panel = page.getByRole('tabpanel', {name, exact:true});
    await expect(panel).toBeVisible();
    await expect(panel.locator('.project-link')).toHaveAttribute('href', `./preview.html?app=${slug}`);
    await expect(panel.locator('.project-media img')).toHaveCSS('object-fit','contain');
    await expect.poll(() => panel.locator('.project-media img').evaluate((img:HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(page).toHaveURL(new RegExp(`#case-${slug}$`));
  }
  await expect(page.getByRole('link', {name:'View all public work', exact:true})).toHaveAttribute('href','./work/');
});

test('tabs support arrow keys, Home, End, bookmarks and browser Back', async ({ page }) => {
  await page.goto('/#case-projectlens');
  const tabs = page.getByRole('tablist', {name:'Selected case studies'});
  const project = tabs.getByRole('tab', {name:'ProjectLens',exact:true});
  await expect(project).toHaveAttribute('aria-selected','true');
  await project.focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab',{name:'QuickSupply'})).toBeFocused();
  await expect(page.getByRole('tabpanel',{name:'QuickSupply'})).toBeVisible();
  await page.keyboard.press('Home');
  await expect(tabs.getByRole('tab',{name:'PolicyLens'})).toBeFocused();
  await page.keyboard.press('End');
  await expect(tabs.getByRole('tab',{name:'QuickSupply'})).toBeFocused();
  await page.goBack();
  await expect(page.getByRole('tabpanel',{name:'PolicyLens'})).toBeVisible();
});

test('reduced motion and narrow screens retain working tabs without overflow', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [320,768,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('/#selected');
    await page.getByRole('tab', {name:'QuickSupply',exact:true}).click();
    const panel = page.getByRole('tabpanel',{name:'QuickSupply'});
    await expect(panel).toBeVisible();
    expect(await panel.evaluate(el => el.getAnimations().length)).toBe(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  }
});

test('failed enhancement and printing keep every case available', async ({ page }) => {
  await page.route('**/work-story.js*', route => route.abort());
  await page.goto('/#selected');
  await expect(page.locator('.selected-card:visible')).toHaveCount(3);
  await expect(page.locator('[data-case-tabs]')).toBeHidden();
  await page.unroute('**/work-story.js*');
  await page.reload();
  await page.emulateMedia({media:'print'});
  await expect(page.locator('.selected-card:visible')).toHaveCount(3);
});

test('Method is concise, evidence-linked and honest about local extensions', async ({ page }) => {
  await page.goto('/#contract');
  const method = page.locator('#contract');
  await expect(method.locator('.method-example')).toHaveCount(3);
  expect((await method.innerText()).split(/\s+/).length).toBeLessThan(210);
  for (const slug of ['projectlens','policylens','lakehouse']) {
    await expect(method.locator(`a[href="./preview.html?app=${slug}#case-story"]`)).toBeVisible();
  }
  await expect(method).toContainText('local');
  await expect(method).toContainText('simple baseline');
  await expect(method.locator('button')).toHaveCount(0);
});
