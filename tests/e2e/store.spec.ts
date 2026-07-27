import { expect, test } from "@playwright/test";

test("canonical store exposes eight products and three protected cases", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Useful software, with evidence/);
  await expect(page.locator("[data-catalogue-item]")).toHaveCount(8);
  await expect(page.locator(".case-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "ProjectLens" }).first()).toBeVisible();
  await expect(page.getByText("Counts describe this catalogue")).toBeVisible();
});

test("search and multi-select filters are reflected in browser history", async ({ page }) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "Search products" });
  await search.fill("evidence");
  await expect(page.locator("[data-catalogue-item]:visible")).toHaveCount(2);
  await expect(page).toHaveURL(/q=evidence/);

  await search.fill("");
  await page.getByRole("button", { name: "Live", exact: true }).click();
  await page.getByRole("button", { name: "Open source", exact: true }).click();
  await expect(page.locator("[data-catalogue-item]:visible")).toHaveCount(7);
  await expect(page).toHaveURL(/facet=live/);
  await expect(page).toHaveURL(/facet=public/);

  await page.goBack();
  await expect(page.getByRole("button", { name: "Open source", exact: true })).toHaveAttribute(
    "aria-pressed",
    "false",
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
});

test("the primary catalogue remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("[data-catalogue-item]")).toHaveCount(8);
  await expect(page.getByRole("link", { name: "View MeetingProof details" })).toBeVisible();
  await expect(page.locator(".catalogue-controls")).toBeHidden();
  await context.close();
});

test("mobile layout has usable controls and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const searchButton = page.getByRole("button", { name: "Search products", exact: true });
  const box = await searchButton.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);
});
