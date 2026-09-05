import { expect, test } from '@playwright/test';

const photographicProjects = ['projectlens', 'quicksupply', 'winchester'];

test('loading the filters does not move the catalogue covers', async ({ page }) => {
  let release!: () => void;
  const ready = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/work/catalogue.js*', async route => { await ready; await route.continue(); });
  try {
    await page.goto('/work/', { waitUntil: 'commit' });
    await expect(page.locator('.app-cover').first()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const before = await page.locator('[data-catalogue-grid]').boundingBox();
    release();
    await expect(page.locator('[data-catalogue-controls]')).toBeVisible();
    const after = await page.locator('[data-catalogue-grid]').boundingBox();
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  } finally { release(); }
});

test('prototype covers pair contextual photos with genuine uncropped screens', async ({ page }) => {
  await page.goto('/work/');
  for (const slug of photographicProjects) {
    const cover = page.locator(`[data-slug="${slug}"] .app-cover`);
    await cover.scrollIntoViewIfNeeded();
    await expect(cover.locator('.app-cover-photo')).toHaveAttribute('alt', '');
    await expect(cover.locator('.app-cover-photo')).toHaveAttribute('aria-hidden', 'true');
    await expect(cover.locator('.app-cover-screen img')).toHaveCSS('object-fit', 'contain');
    for (const image of await cover.locator('img').all()) {
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    const boxes = await cover.evaluate((element) => {
      const frame = element.getBoundingClientRect();
      const screen = element.querySelector('.app-cover-screen')!.getBoundingClientRect();
      return { ratio: frame.width / frame.height, inset: screen.left - frame.left, right: frame.right - screen.right, bottom: frame.bottom - screen.bottom };
    });
    expect(boxes.ratio).toBeCloseTo(1.6, 1);
    expect(boxes.inset).toBeGreaterThan(0);
    expect(boxes.right).toBeGreaterThan(0);
    expect(boxes.bottom).toBeGreaterThan(0);
  }
  await expect(page.getByText('Photography & screen captures', { exact: true })).toHaveCount(0);
  await expect(page.locator('.image-credits')).toHaveCount(0);
});

test('all seven covers share a stable frame and preserve the original source captures', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.locator('.app-cover')).toHaveCount(7);
  await expect(page.locator('.app-cover-screen img')).toHaveCount(7);
  await expect(page.locator('.app-cover-photo')).toHaveCount(3);
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const cover of await page.locator('.app-cover').all()) {
      await cover.scrollIntoViewIfNeeded();
      const box = await cover.boundingBox();
      expect(box!.width / box!.height).toBeCloseTo(1.6, 1);
      await expect(cover.locator('.app-cover-screen img')).toHaveCSS('object-fit', 'contain');
      await expect.poll(() => cover.locator('.app-cover-screen img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      const sizing = await cover.locator('.app-cover-screen img').evaluate((img: HTMLImageElement) => {
        const box = img.getBoundingClientRect();
        const stage = img.closest('.app-cover-screen')!.getBoundingClientRect();
        return { actual: box.width / box.height, intrinsic: img.naturalWidth / img.naturalHeight, coverage: Math.max(box.width / stage.width, box.height / stage.height), fits: box.left >= stage.left - 1 && box.right <= stage.right + 1 && box.top >= stage.top - 1 && box.bottom <= stage.bottom + 1 };
      });
      expect(sizing.actual).toBeCloseTo(sizing.intrinsic, 2);
      expect(sizing.fits).toBe(true);
      expect(sizing.coverage).toBeGreaterThan(.99);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
});

test('photo failure leaves genuine screenshots visible and reduced motion stays still', async ({ page }) => {
  await page.route('**/assets/photography/*.jpg', route => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/');
  for (const slug of photographicProjects) {
    const screen = page.locator(`[data-slug="${slug}"] .app-cover-screen img`);
    await screen.scrollIntoViewIfNeeded();
    await expect(screen).toBeVisible();
    await expect.poll(() => screen.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(screen).toHaveCSS('transform', 'none');
  }
});
