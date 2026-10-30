import { expect, test } from "@playwright/test";

test('homepage navigation always exposes the full project catalogue', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const catalogue = nav.getByRole('link', { name: 'All work', exact: true });
    await expect(catalogue).toBeVisible();
    await expect(catalogue).toHaveAttribute('href', './work/');
    const box = await catalogue.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
  await nav.getByRole('link', { name: 'All work', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator('.work-card')).toHaveCount(8);
  await expect(page.locator('.template-row')).toHaveCount(2);
});

test("enterprise palette keeps hero links and actions readable in both themes", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    for (const selector of [".hero-bottom > a", ".landing-hero .lede", ".hero-actions .primary", ".hero-actions .ghost", ".row-link"]) {
      const ratio = await page.locator(selector).first().evaluate((element) => {
        const rgb = (value: string) => value.match(/[\d.]+/g)!.map(Number);
        const luminance = (values: number[]) => values.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
        let background = element;
        while (background.parentElement && rgb(getComputedStyle(background).backgroundColor)[3] === 0) background = background.parentElement;
        const a = luminance(rgb(getComputedStyle(element).color));
        const b = luminance(rgb(getComputedStyle(background).backgroundColor));
        return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      });
      expect(ratio, `${colorScheme}: ${selector}`).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test("homepage is a compact public portfolio with a personal introduction", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver \| AI solutions architect/);
  const heroHeading = page.getByRole("heading", { name: "I design AI systems and build them." });
  await expect(heroHeading).toBeVisible();
  if (test.info().project.name === "desktop") {
    const lines = await heroHeading.evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
    });
    expect(lines).toBeLessThanOrEqual(2);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator("[data-hero-card]")).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "Selected work", exact: true })).toBeVisible();
  await expect(page.locator(".work-row")).toHaveCount(5);
  await expect(page.getByRole("link", { name: "See my work" })).toHaveAttribute("href", "#selected");
  await expect(page.getByRole("link", { name: "Open CV (PDF)", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/MatthewPaver/blob/main/CV.pdf",
  );
  await expect(page.getByText("Private", { exact: true })).toHaveCount(0);
});

test("Method gives three direct paths to project evidence", async ({ page }) => {
  await page.goto("/#contract");
  const method = page.locator("#contract");
  await expect(method.getByRole("heading", {name:"How I work", exact: true})).toBeVisible();
  await expect(method.locator(".method-example")).toHaveCount(3);
  await method.getByRole("link", {name:"Read the lakehouse evaluation"}).click();
  await expect(page).toHaveURL(/app=lakehouse#case-story$/);
});

test("full catalogue search, category filters and category links narrow eight public projects", async ({ page }) => {
  await page.goto("/work/?category=decision#catalogue");
  const cards = page.locator(".work-card:visible");
  await expect(cards).toHaveCount(4);
  await expect(page.getByRole("combobox", { name: "Subject" })).toHaveValue("decision");
  await page.getByRole("combobox", { name: "Subject" }).selectOption("data");
  await expect(cards).toHaveCount(2);
  await expect(page.locator('.template-row:visible')).toHaveCount(2);
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("sick-leave balance");
  await expect(cards).toHaveCount(1);
  await expect(cards.getByRole("heading", { name: "HR Performance Analytics" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("zzz-no-match");
  await expect(cards).toHaveCount(0);
  await expect(page.locator("[data-catalogue-empty]")).toBeVisible();
});

test("selected work exposes real public results, boundaries and case routes", async ({ page }) => {
  await page.goto("/#selected");
  const policy = page.locator('[data-project="policylens"]');
  await expect(policy).toContainText('s3:GetObject');
  await expect(policy).toContainText('line 1640');
  await expect(policy).toContainText('Checks only the policies you give it, not a whole AWS account');
  await expect(policy.getByRole('link', {name:'Read the PolicyLens case study',exact:true})).toHaveAttribute('href','./work/policylens/');
  const project = page.locator('[data-project="projectlens"]');
  await expect(project).toContainText('913 days');
  await expect(project).toContainText('31/12/2027');
  await expect(project).toContainText('01/07/2030');
  await expect(project.getByRole('link', {name:'Read the ProjectLens case study',exact:true})).toHaveAttribute('href','./work/projectlens/');
});

test("live results remain readable and biography stays separate from project evidence", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const project of ["policylens", "projectlens"]) {
    const result = page.locator(`[data-project="${project}"] [data-ui]`);
    await expect(result).toBeVisible();
    await expect(result).not.toHaveAttribute('aria-hidden', 'true');
  }
  await expect(page.locator("#about")).toContainText("Automation & AI Consultant at Ciklum, placed at Trustpilot");
  await expect(page.locator("#about")).toContainText("six years at Projecting Success");
  await expect(page.locator(".about-facts")).toContainText("University of Liverpool");
  await expect(page.locator("#selected")).toContainText("None of them is client or employer work");
});

test("hero leads only with PolicyLens and links its real source", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('[data-hero]');
  await expect(hero.locator('[data-screening-tab], .tab-progress, .ambient')).toHaveCount(0);
  await expect(hero.locator('[data-card]')).toHaveCount(1);
  await expect(hero).toContainText('AWSSupportServiceRolePolicy, v19 to v20');
  await expect(hero).toContainText('21 December 2021');
  await expect(hero).toContainText('+40 lower-risk additions');
  await expect(hero).toContainText('AWS says its support systems could not use the permission');
  await expect(hero.getByRole('link', {name:'AWS security bulletin AWS-2021-007'})).toHaveAttribute('href','https://aws.amazon.com/security/security-bulletins/AWS-2021-007/');
  await expect(hero.getByRole('link', {name:'Try it on your own policy'})).toHaveAttribute('href','https://matthewpaver.github.io/iam-policy-auditor/');
  await expect(hero.getByRole('link', {name:'See the real AWS policy versions'})).toHaveAttribute('href', /iam-policy-auditor\/tree\/.+\/examples\/policies/);
});

test("hero animation pauses, runs twice and rests on its final result", async ({ page }) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto("/");
  const hero = page.locator('[data-hero]');
  await expect(hero).toHaveAttribute('data-motion', 'running');
  await page.getByRole('button', {name:'Pause animation',exact:true}).click();
  await expect(hero).toHaveAttribute('data-motion','paused');
  await expect(page.locator('[data-check-toggle]')).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button', {name:'Resume animation',exact:true}).click();
  await expect(hero).toHaveAttribute('data-motion','running');
  // Only the scripted hero animations: button press transitions also show up in getAnimations().
  const iterations = await hero.evaluate(el => el.getAnimations({subtree:true}).filter(animation => !(animation instanceof CSSTransition) && !(animation instanceof CSSAnimation)).map(animation => animation.effect!.getTiming().iterations));
  expect(iterations.length).toBeGreaterThan(0);
  expect(iterations.every(value => value === 2)).toBe(true);
  await hero.evaluate(el => el.getAnimations({subtree:true}).forEach(animation => animation.finish()));
  await expect(hero).toHaveAttribute('data-motion','finished');
  await expect(page.locator('[data-hero-card]')).toHaveClass(/is-found/);
  await expect(page.locator('[data-check-toggle]')).toBeHidden();
  expect(await hero.evaluate(el => el.getAnimations({subtree:true}).filter(animation => !(animation instanceof CSSTransition) && !(animation instanceof CSSAnimation)).length)).toBe(0);
});

test("changing reduced motion during the check restores the final frame", async ({ page }) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await expect(page.locator('[data-hero]')).toHaveAttribute('data-motion','running');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('[data-hero]')).toHaveAttribute('data-motion','finished');
  await expect(page.locator('[data-check-toggle]')).toBeHidden();
  await expect(page.locator('[data-hero-card]')).toHaveClass(/is-found/);
});

test("QuickSupply recording has native controls and a case fallback", async ({ page }) => {
  await page.route('**/quicksupply-demo.m4v', route => route.abort());
  await page.goto('/#case-quicksupply');
  const row = page.locator('#case-quicksupply');
  await expect(row.locator('video')).toHaveAttribute('controls','');
  await expect(row.locator('video')).toHaveAttribute('preload','none');
  expect(await row.locator('video').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  await expect(row.getByRole('link', {name:'Watch and read the QuickSupply case study',exact:true})).toHaveAttribute('href','./preview.html?app=quicksupply');
});

test("PolicyLens has an indexable detail page and public source", async ({ page }) => {
  await page.goto("/store/apps/policylens/");
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/store/apps/policylens/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /previews\/policylens-2026-10-28\.png$/);
  await expect(page.getByRole("heading", { name: "What the example shows" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Run public IAM demo" }).first()).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/iam-policy-auditor#quick-start",
  );
});

test("the portfolio remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".work-row")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator(".route-list a")).toHaveCount(3);
  await expect(page.locator('.method-example')).toHaveCount(3);
  await page.goto("/work/");
  await expect(page.locator(".work-card:visible")).toHaveCount(8);
  await expect(page.locator("[data-catalogue-controls]")).toBeHidden();
  await context.close();
});

test("mobile layout has usable controls and no page-level horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const button = page.locator(".screening-room").getByRole("link", {name:"Try it on your own policy"});
  const box = await button.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
  await expect(page.getByRole("link", { name: "All work", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Method", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "CV (PDF)", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();

  await expect(page.locator(".work-row:visible")).toHaveCount(5);

  await page.goto("/work/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});

test("dark and reduced-motion preferences keep the method usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop coverage is sufficient");
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('meta[name="theme-color"]')).toHaveCount(2);
  await expect(page.locator(".method-example")).toHaveCount(3);
  await expect(page.locator("#case-projectlens")).toBeVisible();
});
