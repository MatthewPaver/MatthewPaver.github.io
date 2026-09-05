import { expect, test } from "@playwright/test";

test('homepage navigation always exposes the full project catalogue', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const catalogue = nav.getByRole('link', { name: 'All projects', exact: true });
    await expect(catalogue).toBeVisible();
    await expect(catalogue).toHaveAttribute('href', './work/');
    const box = await catalogue.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  }
  await nav.getByRole('link', { name: 'All projects', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator('.work-card')).toHaveCount(7);
  await expect(page.locator('.template-row')).toHaveCount(3);
});

test("enterprise palette keeps hero links and actions readable in both themes", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    for (const selector of [".hero-bottom > a", ".landing-hero .lede", ".hero-actions .primary", ".hero-actions .ghost", ".project-link"]) {
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
  await expect(page).toHaveTitle(/Matthew Paver \| Software and AI engineering/);
  const heroHeading = page.getByRole("heading", { name: "AI architecture. Working software." });
  await expect(heroHeading).toBeVisible();
  if (test.info().project.name === "desktop") {
    const lines = await heroHeading.evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
    });
    expect(lines).toBeLessThanOrEqual(2);

    await page.setViewportSize({ width: 1280, height: 720 });
    const hero = await page.locator(".hero").boundingBox();
    expect((hero?.y ?? 0) + (hero?.height ?? 0)).toBeLessThanOrEqual(721);
  }
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
  await expect(page.locator(".selected-card")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Explore the work" })).toHaveAttribute("href", "#selected");
  await expect(page.getByRole("link", { name: "Open CV (PDF)", exact: true })).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/MatthewPaver/blob/main/CV.pdf",
  );
  await expect(page.getByText("Private", { exact: true })).toHaveCount(0);
});

test("Method gives three direct paths to project evidence", async ({ page }) => {
  await page.goto("/#contract");
  const method = page.locator("#contract");
  await expect(method.getByRole("heading", {name:"How I work."})).toBeVisible();
  await expect(method.locator(".method-example")).toHaveCount(3);
  await method.getByRole("link", {name:"Read the lakehouse evaluation"}).click();
  await expect(page).toHaveURL(/app=lakehouse#case-story$/);
});

test("full catalogue search, category filters and category links narrow seven public projects", async ({ page }) => {
  await page.goto("/work/?category=decision#catalogue");
  const cards = page.locator(".work-card:visible");
  await expect(cards).toHaveCount(3);
  await expect(page.getByRole("combobox", { name: "Subject" })).toHaveValue("decision");
  await page.getByRole("combobox", { name: "Subject" }).selectOption("data");
  await expect(cards).toHaveCount(2);
  await expect(page.locator('.template-row:visible')).toHaveCount(3);
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("sick-leave balance");
  await expect(cards).toHaveCount(1);
  await expect(cards.getByRole("heading", { name: "HR Performance Analytics" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("zzz-no-match");
  await expect(cards).toHaveCount(0);
  await expect(page.locator("[data-catalogue-empty]")).toBeVisible();
});

test("selected work exposes a result, boundary and case route", async ({ page }) => {
  await page.goto("/");
  const policy = page.locator('[data-project="policylens"]');
  await expect(policy.getByText("Database deletion changes from denied to allowed")).toBeVisible();
  await expect(policy.getByText("Supplied policies only; the public repo still starts with the earlier Org demo")).toBeVisible();
  await expect(policy.getByText("Node.js · AWS IAM · AI evaluation")).toBeVisible();
  await expect(policy.getByRole("link", {name:"Review PolicyLens case", exact:true})).toHaveAttribute(
    "href",
    "./preview.html?app=policylens",
  );

  const project = page.locator('[data-project="projectlens"]');
  await page.getByRole('tab', {name:'ProjectLens',exact:true}).click();
  await expect(project.getByText(/three blockers, including a 73-day finish movement/i)).toBeVisible();
  await expect(project.getByRole("link", {name:"Review ProjectLens case", exact:true})).toHaveAttribute(
    "href",
    "./preview.html?app=projectlens",
  );
});

test("result screenshots remain uncropped and biography stays separate from project evidence", async ({ page }) => {
  // The reduced-motion view keeps source images inline; the scroll-view frames
  // have their own containment and loading checks in work-story.spec.ts.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const project of ["policylens", "projectlens"]) {
    await page.locator(`[role="tab"][aria-controls="case-${project}"]`).click();
    const screenshot = page.locator(`[data-project="${project}"] .project-media img`);
    await screenshot.scrollIntoViewIfNeeded();
    await expect(screenshot).toHaveCSS("object-fit", "contain");
    await expect.poll(() => screenshot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.locator("#about")).toContainText("over six years at Projecting Success");
  await expect(page.locator(".about-background")).toContainText("University of Liverpool");
  await expect(page.locator("#selected")).toContainText("not work delivered for an employer or client");
});

test("screening room switches real projects and pauses video when switching away", async ({ page }) => {
  await page.goto("/");
  const room = page.locator("[data-screening-room]");
  const video = room.locator("video");
  expect(await video.evaluate((element: HTMLVideoElement) => element.readyState)).toBe(0);
  await room.getByRole("button", { name: "Watch the walkthrough" }).click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  await room.getByRole("button", { name: "ProjectLens", exact: true }).click();
  await expect(room.locator('[data-screening-panel="projectlens"]')).toBeVisible();
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await page.keyboard.press("ArrowRight");
  await expect(room.getByRole("button", { name: "ML Lakehouse" })).toHaveAttribute("aria-pressed", "true");
  await expect(room.getByText("Check the data before trusting the forecast.")).toBeVisible();
});

test("background motion can be paused and obeys reduced motion", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator(".landing-hero");
  await expect(hero).toHaveAttribute("data-background-running", "true");
  await page.getByRole("button", { name: "Pause background motion" }).click();
  await expect(hero).toHaveAttribute("data-background-running", "false");
  await page.getByRole("button", { name: "Resume background motion" }).click();
  await expect(hero).toHaveAttribute("data-background-running", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero).toHaveAttribute("data-background-running", "false");
  await expect(page.locator("[data-motion-toggle]")).toBeHidden();
});

test("unavailable video has a useful recovery path", async ({ page }) => {
  await page.route("**/quicksupply-demo.m4v", (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Watch the walkthrough" }).click();
  await expect(page.locator(".screening-error")).toBeVisible();
  await expect(page.locator(".screening-error a").first()).toHaveAttribute("href", "./assets/quicksupply-demo.m4v");
});

test("PolicyLens has an indexable detail page and public source", async ({ page }) => {
  await page.goto("/store/apps/policylens/");
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/store/apps/policylens/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /policylens-review\.png$/);
  await expect(page.getByRole("heading", { name: "What the example shows" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Run public IAM demo" }).first()).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/iam-policy-auditor#quick-start-stranger-usable-in-90-seconds",
  );
});

test("the portfolio remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".selected-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator(".capability-routes a")).toHaveCount(3);
  await expect(page.locator('.method-example')).toHaveCount(3);
  await page.goto("/work/");
  await expect(page.locator(".work-card:visible")).toHaveCount(7);
  await expect(page.locator("[data-catalogue-controls]")).toBeHidden();
  await context.close();
});

test("mobile layout has usable controls and no page-level horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const button = page.getByRole("tab", { name: "ProjectLens", exact:true });
  const box = await button.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
  await expect(page.getByRole("link", { name: "All projects", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Method", exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "CV (PDF)", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeVisible();

  await expect(page.locator(".selected-card:visible")).toHaveCount(1);
  await button.click();
  await expect(page.getByRole("tabpanel", {name:"ProjectLens",exact:true})).toBeVisible();

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
  await page.getByRole("tab", {name:"ProjectLens",exact:true}).click();
  await expect(page.getByRole("tabpanel", {name:"ProjectLens",exact:true})).toBeVisible();
});
