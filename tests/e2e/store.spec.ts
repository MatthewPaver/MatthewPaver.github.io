import { expect, test } from "@playwright/test";

test("software index exposes seven public products and one open-core case study", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver · Software/);
  await expect(page.locator("[data-catalogue-item]")).toHaveCount(8);
  await expect(page.locator('[data-catalogue-item][data-kind="case-study"]')).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "ProjectLens" }).first()).toBeVisible();
  await expect(page.getByText("Software engineer", { exact: true }).first()).toBeVisible();
});

test("search and catalogue tabs are reflected in browser history", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Search products" });
  await search.fill("mortgage");
  await expect(page.locator("[data-catalogue-item]:visible")).toHaveCount(1);
  await expect(page).toHaveURL(/q=mortgage/);

  await search.fill("");
  await page.getByRole("button", { name: "Live 8", exact: true }).click();
  await expect(page.locator("[data-catalogue-item]:visible")).toHaveCount(8);
  await expect(page).toHaveURL(/facet=live/);

  await page.getByRole("button", { name: "Source 8", exact: true }).click();
  await expect(page.locator("[data-catalogue-item]:visible")).toHaveCount(8);
  await expect(page).toHaveURL(/facet=source/);

  await page.goBack();
  await expect(page.getByRole("button", { name: "Live 8", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
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

test("the primary catalogue remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-catalogue-item]")).toHaveCount(8);
  await expect(page.getByRole("link", { name: "View MeetingProof details" })).toBeVisible();
  await expect(page.locator(".catalogue-tools")).toBeHidden();
  await context.close();
});

test("mobile layout has usable controls and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const search = page.getByRole("searchbox", { name: "Search products" });
  const box = await search.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(200);
});
