import { expect, test } from "@playwright/test";

test("homepage introduces Matthew and shows three selected projects plus five more", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver · Product engineer/);
  await expect(page.getByRole("heading", { name: "Matthew Paver" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Everything else I have built" })).toBeVisible();
  await expect(page.locator("[data-portfolio-entry]")).toHaveCount(17);
  await expect(page.locator(".featured-project")).toHaveCount(3);
  await expect(page.locator(".product-grid .product-card")).toHaveCount(14);
  await expect(page.locator(".method-card, .journey-choices")).toHaveCount(0);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
});

test("selected work provides direct demo and build-note links", async ({ page }) => {
  await page.goto("/");
  const projectLens = page.locator(".featured-project").first();
  await expect(projectLens.getByRole("heading", { name: "ProjectLens" })).toBeVisible();
  await expect(projectLens.getByRole("link", { name: "Open demo" })).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/ProjectLens/change-assurance.html",
  );
  await projectLens.getByRole("link", { name: "Build notes" }).click();
  await expect(page).toHaveURL(/\/store\/apps\/projectlens\/$/);
  await expect(page.getByRole("heading", { name: "ProjectLens", exact: true })).toBeVisible();
});

test("app pages are static, indexable and include a real install path", async ({ page }) => {
  await page.goto("/store/apps/meetingproof/");
  await expect(page.getByRole("heading", { name: "MeetingProof", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/store/apps/meetingproof/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\.png$/);
  await expect(page.getByRole("heading", { name: "Run it locally" })).toBeVisible();
  await expect(page.locator("[data-copy]")).not.toHaveCount(0);
  await expect(page.getByRole("link", { name: /^Download / })).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/MeetingProof/releases/latest",
  );
});

test("the portfolio remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-portfolio-entry]")).toHaveCount(17);
  await expect(page.getByRole("heading", { name: "Selected projects" })).toBeVisible();
  await expect(page.locator(".featured-project").first().getByRole("link", { name: "Open demo" })).toBeVisible();
  await context.close();
});

test("mobile layout has usable controls and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const link = page.locator(".featured-project").first().getByRole("link", { name: "Open demo" });
  const box = await link.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
});
