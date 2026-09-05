import { expect, test, type Page } from '@playwright/test';

async function selectMode(page: Page, label: string, mode: string) {
  const compact = page.getByRole('combobox', { name: 'Explore', exact: true });
  if (await compact.isVisible()) await compact.selectOption(mode);
  else await page.getByRole('button', { name: label, exact: true }).click();
}

async function expectMode(page: Page, mode: string) {
  await expect(page.locator(`[data-work-filter="${mode}"]`)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-catalogue-mode]')).toHaveValue(mode);
}

const projectSlugs = ['policylens', 'projectlens', 'quicksupply', 'winchester', 'lakehouse', 'hr', 'england'];

test('query preview screenshots fit their available width without cropping or a tall fixed-height box', async ({ page }) => {
  for (const slug of ['policylens', 'projectlens', 'winchester', 'lakehouse', 'hr']) {
    await test.step(slug, async () => {
      await page.goto(`/preview.html?app=${slug}`);
      const image = page.locator('#preview-image');
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
      await expect.soft(image, `${slug}: preserve the full evidence capture`).toHaveCSS('object-fit', 'contain');
      const box = await image.boundingBox();
      expect(box).not.toBeNull();
      // Every evidence capture is landscape. A portrait-shaped image box is
      // wasted space even when object-fit happens to preserve the pixels.
      expect.soft(box!.height, `${slug}: landscape evidence should not retain height=900`).toBeLessThanOrEqual(box!.width + 1);
      expect.soft(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        await page.evaluate(() => document.documentElement.clientWidth),
      );
    });
  }
});

test('long case titles stay inside their text column at 1280px on query and generated routes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const slug of ['policylens', 'quicksupply', 'winchester', 'lakehouse', 'hr']) {
    for (const path of [`/preview.html?app=${slug}`, `/store/apps/${slug}/`]) {
      await page.goto(path);
      await expect(page.locator('.preview-copy h1')).not.toHaveText('Project preview');
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.locator('.preview-copy').evaluate((column) => {
        const heading = column.querySelector('h1')!;
        const range = document.createRange();
        range.selectNodeContents(heading);
        const bounds = column.getBoundingClientRect();
        return Math.max(0, ...Array.from(range.getClientRects(), (rect) => Math.max(bounds.left - rect.left, rect.right - bounds.right)));
      });
      expect.soft(overflow, `${path}: rendered title text must fit its column`).toBeLessThanOrEqual(1);
    }
  }
});

test('method evidence is available together in reading order', async ({ page }) => {
  await page.goto('/#contract');
  const method = page.locator('#contract');
  for (const slug of ['projectlens','policylens','lakehouse']) {
    await expect(method.locator('a[href="./preview.html?app=' + slug + '#case-story"]')).toBeVisible();
  }
  const tops = await method.locator('.method-example').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
  expect(tops[0]).toBeLessThan(tops[1]);
  expect(tops[1]).toBeLessThan(tops[2]);
});

test('a direct Method link stays on the method after compact cases enhance', async ({ page }) => {
  await page.setViewportSize({width:1280,height:800});
  await page.goto('/#contract');
  await expect(page.locator('[data-work-story]')).toHaveAttribute('data-story-mode', 'tabs');
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator('#contract').evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(150);
});

test('Data and ML route includes its two projects and all three patterns', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link').filter({ has: page.getByText('Data and ML', { exact: true }) }).click();
  await expect(page.locator('.work-card:visible')).toHaveCount(2);
  await expect(page.locator('[data-slug="lakehouse"]')).toBeVisible();
  await expect(page.locator('[data-slug="hr"]')).toBeVisible();
  await expect(page.locator('.template-row:visible')).toHaveCount(3);
});

test('Patterns navigation escapes an incompatible active filter', async ({ page }) => {
  await page.goto('/work/?mode=browser&category=decision&q=ProjectLens#catalogue');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Patterns', exact: true }).click();
  await expect(page.locator('.template-row:visible')).toHaveCount(3);
  await expect(page.locator('.work-card:visible')).toHaveCount(0);
});

const modes = [
  { label: 'Try in browser', mode: 'browser', slugs: ['projectlens', 'winchester', 'lakehouse', 'england'] },
  { label: 'Run locally', mode: 'local', slugs: ['policylens', 'lakehouse'] },
  { label: 'Watch or read', mode: 'case', slugs: ['quicksupply', 'hr', 'england'] },
  { label: 'Reuse a pattern', mode: 'pattern', slugs: [] },
];

for (const { label, mode, slugs } of modes) {
  test(`action filter ${label} selects its work and persists in the URL`, async ({ page }) => {
    await page.goto('/work/');
    await selectMode(page, label, mode);
    await expectMode(page, mode);
    await expect.poll(() => new URL(page.url()).searchParams.get('mode')).toBe(mode);
    await expect.poll(() => page.locator('.work-card:visible').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-slug')))).toEqual(slugs);
    await expect(page.locator('.template-row:visible')).toHaveCount(mode === 'pattern' ? 3 : 0);
    await page.reload();
    await expectMode(page, mode);
    await expect.poll(() => page.locator('.work-card:visible').evaluateAll((cards) => cards.map((card) => card.getAttribute('data-slug')))).toEqual(slugs);
    await expect(page.locator('.template-row:visible')).toHaveCount(mode === 'pattern' ? 3 : 0);
  });
}

test('catalogue search and action mode survive reload together', async ({ page }) => {
  await page.goto('/work/');
  const search = page.getByRole('searchbox', { name: 'Search public work' });
  await search.fill('ProjectLens');
  await selectMode(page, 'Try in browser', 'browser');
  await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('ProjectLens');
  await expect.poll(() => new URL(page.url()).searchParams.get('mode')).toBe('browser');
  await page.reload();
  await expect(search).toHaveValue('ProjectLens');
  await expectMode(page, 'browser');
  await expect(page.locator('.work-card:visible')).toHaveCount(1);
  await expect(page.locator('[data-slug="projectlens"]')).toBeVisible();
});

test('browser Back restores the filtered catalogue after reading a case', async ({ page }) => {
  await page.goto('/work/?mode=browser&q=ProjectLens#catalogue');
  await page.locator('[data-slug="projectlens"] a[href*="preview.html"]').click();
  await expect(page.locator('.preview-copy h1')).toHaveText('ProjectLens');
  await page.goBack();
  await expect(page.getByRole('searchbox', { name: 'Search public work' })).toHaveValue('ProjectLens');
  await expectMode(page, 'browser');
  await expect(page.locator('.work-card:visible')).toHaveCount(1);
  await expect(page.locator('[data-slug="projectlens"]')).toBeVisible();
});

test('the top All work link returns to the same catalogue query and filter', async ({ page }) => {
  await page.goto('/work/?mode=browser&q=ProjectLens#catalogue');
  await page.locator('[data-slug="projectlens"] a[href*="preview.html"]').click();
  await expect(page.locator('.preview-copy h1')).toHaveText('ProjectLens');
  const allWork = page.getByRole('navigation', { name: 'Preview navigation' }).getByRole('link', { name: 'All work', exact: true });
  await expect(allWork).toBeVisible();
  await allWork.click();
  const destination = new URL(page.url());
  expect(destination.pathname).toBe('/work/');
  expect(destination.searchParams.get('mode')).toBe('browser');
  expect(destination.searchParams.get('q')).toBe('ProjectLens');
  await expect(page.getByRole('searchbox', { name: 'Search public work' })).toHaveValue('ProjectLens');
  await expect(page.locator('.work-card:visible')).toHaveCount(1);
});

test('catalogue search includes reusable patterns and handles a true zero-result query', async ({ page }) => {
  await page.goto('/work/');
  const search = page.getByRole('searchbox', { name: 'Search public work' });
  await search.fill('Kafka');
  await expect(page.locator('.work-card:visible')).toHaveCount(0);
  await expect(page.locator('.template-row:visible')).toHaveCount(1);
  await expect(page.locator('.template-row:visible')).toContainText('Kafka');
  await expect(page.locator('[data-catalogue-empty]')).toBeHidden();
  await search.fill('zzzz-no-work-or-pattern-matches');
  await expect(page.locator('.work-card:visible')).toHaveCount(0);
  await expect(page.locator('.template-row:visible')).toHaveCount(0);
  await expect(page.locator('[data-catalogue-empty]')).toBeVisible();
});

test('a failed previews fetch offers a retry and recovers without claiming the project is unknown', async ({ page }) => {
  let failFetch = true;
  await page.route('**/previews.json', async (route) => {
    if (failFetch) await route.fulfill({ status: 503, contentType: 'text/plain', body: 'Temporarily unavailable' });
    else await route.continue();
  });
  await page.goto('/preview.html?app=projectlens');
  await expect.soft(page.locator('.preview-copy h1')).not.toHaveText(/not found|no preview|unknown project/i);
  const retry = page.getByRole('button', { name: /try again|retry|reload/i });
  await expect(retry).toBeVisible();
  await expect(page.locator('.preview-copy')).toContainText(/load|unavailable|connection/i);
  failFetch = false;
  await retry.click();
  await expect(page.locator('.preview-copy h1')).toHaveText('ProjectLens');
  await expect(page.locator('.preview-media')).toBeVisible();
  await expect(page.locator('.preview-layout')).toBeVisible();
  await expect(retry).toHaveCount(0);
});

test('a genuine unknown project remains distinct from a fetch failure', async ({ page }) => {
  await page.goto('/preview.html?app=not-a-retained-project');
  await expect(page.locator('.preview-copy h1')).toHaveText(/not found|no preview|unknown project/i);
  await expect(page.getByRole('button', { name: /try again|retry|reload/i })).toHaveCount(0);
  await expect(page.locator('.preview-media')).toBeHidden();
  await expect(page.locator('.preview-layout')).toBeHidden();
  await expect(page.getByRole('link', { name: /all (public )?work/i }).first()).toBeVisible();
});

test('a corrections deep link lands on the story after delayed project data loads', async ({ page }) => {
  let release: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/previews.json', async route => { await gate; await route.continue(); });
  await page.goto('/preview.html?app=hr#case-story', { waitUntil:'domcontentloaded' });
  await page.waitForLoadState('load');
  release!();
  await expect(page.locator('#preview-title')).toHaveText('HR Performance Analytics');
  await expect.poll(() => page.locator('#case-story').evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(100);
  await expect(page.locator('#case-story')).toContainText('SickLeaveHours is an available balance');
});

test('unsafe returnTo values cannot replace the local All work destination', async ({ page }) => {
  for (const returnTo of ['https://attacker.invalid/work/', '//attacker.invalid/work/', 'javascript:alert(1)', '/preview.html?app=hr']) {
    await page.goto(`/preview.html?app=projectlens&returnTo=${encodeURIComponent(returnTo)}`);
    await expect(page.locator('.preview-copy h1')).toHaveText('ProjectLens');
    const allWork = page.getByRole('navigation', { name: 'Preview navigation' }).getByRole('link', { name: 'All work', exact: true });
    await expect(allWork).toBeVisible();
    const href = await allWork.getAttribute('href');
    expect(href).not.toBeNull();
    const destination = new URL(href!, page.url());
    expect(destination.origin).toBe(new URL(page.url()).origin);
    expect(destination.pathname).toBe('/work/');
    expect(destination.search).toBe('');
  }
});

test('query previews without JavaScript link to every usable static project page', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto('/preview.html?app=projectlens');
    for (const slug of projectSlugs) {
      await expect(page.locator(`a[href$="/store/apps/${slug}/"]`)).toBeVisible();
    }
    await page.locator('a[href$="/store/apps/projectlens/"]').click();
    await expect(page.locator('.preview-copy h1')).toHaveText('ProjectLens');
    await expect(page.locator('.preview-copy h1')).toBeVisible();
    await expect(page.locator('.preview-layout')).toBeVisible();
  } finally {
    await context.close();
  }
});

for (const slug of ['quicksupply', 'england']) {
  test(`generated ${slug} case includes a playable local video`, async ({ page }) => {
    await page.goto(`/store/apps/${slug}/`);
    const video = page.locator('.preview-media video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('controls', '');
    const source = await video.evaluate((element: HTMLVideoElement) => element.currentSrc || element.src || element.querySelector('source')?.src);
    expect(source).toBeTruthy();
    expect(new URL(source!).origin).toBe(new URL(page.url()).origin);
    await video.evaluate(async (element: HTMLVideoElement) => {
      element.muted = true;
      await element.play();
    });
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  });

  test(`generated ${slug} case keeps its preview and catalogue links on the current site`, async ({ page }) => {
    await page.goto(`/store/apps/${slug}/`);
    const previewLink = page.locator('.preview-nav a[href*="preview.html"]');
    const previewUrl = new URL((await previewLink.getAttribute('href'))!, page.url());
    expect(previewUrl.origin).toBe(new URL(page.url()).origin);
    expect(previewUrl.pathname).toBe('/preview.html');
    expect(previewUrl.searchParams.get('app')).toBe(slug);
    const catalogue = page.getByRole('link', { name: /all (public )?work/i }).first();
    const catalogueUrl = new URL((await catalogue.getAttribute('href'))!, page.url());
    expect(catalogueUrl.origin).toBe(new URL(page.url()).origin);
    expect(catalogueUrl.pathname).toBe('/work/');
  });
}

test('all seventeen retained app routes resolve and QuickSupply has one lowercase canonical', async ({ request }) => {
  const retainedRoutes = [
    ...projectSlugs,
    'iam-policy-auditor', 'policy-lens', 'marketing-ml-lakehouse', 'hr-performance',
    'hr-performance-dashboards', 'can-england-win-it', 'project-lens', 'QuickSupply',
    'quick-supply', 'winchester-buyer-check',
  ];
  expect(retainedRoutes).toHaveLength(17);
  for (const slug of retainedRoutes) {
    const response = await request.get(`/store/apps/${slug}/`);
    expect.soft(response.ok(), slug).toBe(true);
    const html = await response.text();
    expect.soft(html, slug).toMatch(/<h1(?:\s[^>]*)?>[^<]+<\/h1>/);
    if (slug === 'QuickSupply' || slug === 'quicksupply') {
      expect.soft(html, `${slug}: lowercase canonical`).toMatch(/<link\s+rel="canonical"\s+href="https:\/\/matthewpaver\.github\.io\/store\/apps\/quicksupply\/"\s*\/>/);
    }
  }
});

test('every case stays readable at narrow and intermediate widths without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 768]) {
    await page.setViewportSize({width, height:900});
    for (const slug of projectSlugs) {
      await page.goto(`/preview.html?app=${slug}`);
      await expect(page.locator('#preview-title')).not.toHaveText('Loading project…');
      await expect(page.locator('#preview-choice')).not.toBeEmpty();
      await expect(page.locator('#preview-result')).not.toBeEmpty();
      await expect(page.locator('#preview-learning')).not.toBeEmpty();
      await expect(page.locator('#preview-boundary')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const image = page.locator('#preview-image');
      await expect.poll(() => image.evaluate((img:HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      const dimensions = await image.evaluate((img:HTMLImageElement) => ({ declared:img.width / img.height, natural:img.naturalWidth / img.naturalHeight }));
      expect(Math.abs(dimensions.declared - dimensions.natural)).toBeLessThan(.02);
    }
  }
  expect(errors).toEqual([]);
});

test('catalogue and preview reading text and actions have contrast in both themes', async ({ page }) => {
  for (const colorScheme of ['light','dark'] as const) {
    await page.emulateMedia({colorScheme});
    for (const [url, selectors] of [
      ['/work/', ['.work-access', '.work-card-proof dd', '.work-launch', '.catalogue-clear', '.work-filters button[aria-pressed="true"]:visible, .catalogue-mode select:visible', '.catalogue-subject select']],
      ['/preview.html?app=hr', ['.preview-access', '.preview-boundary p', '.preview-media-caption', '.preview-actions .primary', '.preview-panel p']],
    ] as const) {
      await page.goto(url);
      for (const selector of selectors) {
        await expect(page.locator(selector).first()).toBeVisible();
        const ratios = await page.locator(selector).evaluateAll(elements => elements.filter(el => el.getClientRects().length).map(el => {
          const rgb = (value:string) => value.match(/[\d.]+/g)!.map(Number);
          const luminance = (values:number[]) => values.slice(0,3).map(v => v/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((total,v,i) => total+v*[.2126,.7152,.0722][i],0);
          let background = el;
          while (background.parentElement && rgb(getComputedStyle(background).backgroundColor)[3] === 0) background = background.parentElement;
          const a=luminance(rgb(getComputedStyle(el).color)), b=luminance(rgb(getComputedStyle(background).backgroundColor));
          return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
        }));
        expect(Math.min(...ratios), `${colorScheme} ${selector}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});
