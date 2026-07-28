import { expect, test } from "@playwright/test";

test("homepage leads with three jobs and keeps five entries in supporting work", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver · Selected software/);
  await expect(page.getByRole("heading", {
    name: "Check the evidence before you approve, send or ship.",
  })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What needs checking?" })).toBeVisible();
  await expect(page.locator("[data-portfolio-entry]")).toHaveCount(8);
  await expect(page.locator(".flagship-case")).toHaveCount(3);
  await expect(page.locator(".product-grid--supporting .product-card")).toHaveCount(5);
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /All 8/ })).toHaveCount(0);
});

test("task choices lead to a specific workflow and call to action", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /A project change needs a board decision/ }).click();
  await expect(page).toHaveURL(/#projectlens$/);
  await expect(page.locator("#projectlens")).toBeInViewport();
  await expect(page.getByRole("link", { name: "Review a change pack" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Need a relevant earlier decision too/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Build an approved follow-up" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Run a regression check" })).toBeVisible();
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

test("the primary portfolio remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-portfolio-entry]")).toHaveCount(8);
  await expect(page.getByRole("link", { name: "Build an approved follow-up" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Meeting notes need an accountable follow-up/ })).toBeVisible();
  await context.close();
});

test("mobile layout has usable controls and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const choice = page.getByRole("link", { name: /A project change needs a board decision/ });
  const box = await choice.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(200);
});
