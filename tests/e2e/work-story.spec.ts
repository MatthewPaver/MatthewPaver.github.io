import { expect, test } from '@playwright/test';

test('selected work follows the visible chapter without taking over scrolling', async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/#selected');
  const story = page.locator('[data-work-story]');
  await expect(story).toHaveAttribute('data-story-mode', 'scroll');
  for (const project of ['policylens', 'projectlens', 'quicksupply']) {
    await page.locator(`[data-project="${project}"] .project-copy`).evaluate(el => el.scrollIntoView({block:'center',behavior:'instant'}));
    await expect(story).toHaveAttribute('data-active-project', project);
    const frame = story.locator(`[data-story-frame="${project}"]`);
    await expect(frame).toHaveCSS('opacity', '1');
    await expect(frame.locator('img')).toHaveCSS('object-fit', 'contain');
    expect(await frame.locator('img').evaluate((img:HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  await page.locator('[data-project="policylens"] .project-copy').evaluate(el => el.scrollIntoView({block:'center',behavior:'instant'}));
  await expect(story).toHaveAttribute('data-active-project', 'policylens');
  await page.getByRole('button', {name:'Use simple view'}).click();
  await expect(story).toHaveAttribute('data-story-mode','simple');
  await expect(page.locator('[data-project="policylens"] .project-media')).toBeVisible();
});

test('small screens and reduced motion keep every story image inline', async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#selected');
  await expect(page.locator('[data-work-story]')).toHaveAttribute('data-story-mode','simple');
  for (const project of ['policylens','projectlens','quicksupply']) {
    await expect(page.locator(`[data-project="${project}"] .project-media`)).toBeVisible();
  }
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('[data-work-story]')).toHaveAttribute('data-story-mode','scroll');
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('[data-work-story]')).toHaveAttribute('data-story-mode','simple');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
});

test('failed story JavaScript still leaves images, copy and case links available', async ({ page }) => {
  await page.route('**/work-story.js*', route => route.abort());
  await page.goto('/#selected');
  await expect(page.locator('.selected-card')).toHaveCount(3);
  await expect(page.locator('[data-project="policylens"] .project-media')).toBeVisible();
  await expect(page.locator('[data-project="projectlens"]').getByRole('link', {name:'Review ProjectLens case',exact:true})).toHaveAttribute('href','./preview.html?app=projectlens');
});

test('visible link wording remains available to assistive technology', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-actions').getByRole('link', {name:'Open CV (PDF)', exact:true})).toBeVisible();
  await expect(page.locator('.brand')).toHaveAccessibleName(/MP/);
  for (const project of ['policylens','projectlens','quicksupply']) {
    const link = page.locator(`[data-project="${project}"]`).locator('.project-link');
    await expect(link).not.toHaveAttribute('aria-label');
  }
});

test('project jumps and keyboard focus keep the matching image visible', async ({ page }) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/#selected');
  const story = page.locator('[data-work-story]');
  await page.getByRole('navigation', {name:'Jump to a selected project'}).getByRole('link', {name:'ProjectLens', exact:true}).click();
  await expect(story).toHaveAttribute('data-active-project','projectlens');
  const quickSupply = page.locator('[data-project="quicksupply"]').getByRole('link', {name:'Review QuickSupply case',exact:true});
  await quickSupply.focus();
  await expect(quickSupply).toBeFocused();
  await expect(story).toHaveAttribute('data-active-project','quicksupply');
});
