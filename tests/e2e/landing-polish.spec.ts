import { expect, test } from '@playwright/test';

test('selected cases have direct actions without the redundant jump row', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 650 });
  await page.goto('/#selected');
  await expect(page.getByRole('navigation', { name: 'Jump to a selected project' })).toHaveCount(0);
  await expect(page.getByRole('tablist', {name:'Selected case studies'})).toBeVisible();
  for (const project of ['policylens', 'projectlens', 'quicksupply']) {
    await expect(page.locator(`#case-${project} .project-link`)).toHaveAttribute('href', `./preview.html?app=${project}`);
  }
});

test('the complete homepage navigation remains usable on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const name of ['All projects', 'Method', 'About', 'CV (PDF)']) {
    const link = nav.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByRole('heading', { name: 'An architect who builds.' })).toBeInViewport();
});

test('mobile exploration is compact and keeps filter state across resize and history', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/work/');
  const mode = page.getByRole('combobox', { name: 'Explore', exact: true });
  await expect(mode).toBeVisible();
  await expect(page.getByRole('group', { name: 'Choose how to explore' })).toBeHidden();
  const cover = await page.locator('[data-slug="projectlens"] .app-cover').boundingBox();
  expect(cover!.y).toBeLessThan(550);
  await mode.selectOption('browser');
  await page.getByRole('combobox', { name: 'Subject', exact: true }).selectOption('decision');
  await expect(page.locator('.work-card:visible')).toHaveCount(2);
  await expect(page).toHaveURL(/mode=browser/);
  await page.reload();
  await expect(mode).toHaveValue('browser');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(mode).toBeHidden();
  await expect(page.getByRole('button', { name: 'Try in browser', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Run locally', exact: true }).click();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(mode).toHaveValue('local');
  await page.goBack();
  await expect(mode).toHaveValue('browser');
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(mode).toHaveValue('all');
  await expect(page.locator('.work-card:visible')).toHaveCount(7);
});

test('shared marks and controls stay consistent between the homepage and inner pages', async ({ page }) => {
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const path of ['/', '/work/']) {
      await page.goto(path);
      const mark = page.locator('.brand-mark');
      await expect(mark).toHaveCSS('background-color', 'rgb(28, 55, 98)');
      await expect(mark).toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect(mark).toHaveCSS('border-radius', '7px');
    }
    await expect(page.locator('.work-launch').first()).toHaveCSS('border-radius', '7px');
    await page.goto('/preview.html?app=projectlens');
    await expect(page.locator('.preview-actions .button').first()).toHaveCSS('border-radius', '7px');
  }
});

test('catalogue search placeholder stays readable in both themes', async ({ page }) => {
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto('/work/');
    const ratio = await page.locator('[data-catalogue-search]').evaluate(input => {
      const luminance = (color: string) => color.match(/[\d.]+/g)!.slice(0, 3).map(Number)
        .map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
        .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
      const a = luminance(getComputedStyle(input, '::placeholder').color);
      const b = luminance(getComputedStyle(input).backgroundColor);
      return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    });
    expect(ratio, `${colorScheme} placeholder contrast`).toBeGreaterThanOrEqual(4.5);
  }
});
