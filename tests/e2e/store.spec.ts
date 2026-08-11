import { expect, test } from "@playwright/test";

test("homepage leads with three public projects and a short route through the work", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver · Software and AI engineering/);
  await expect(
    page.getByRole("heading", { name: "I build software that helps people make difficult decisions." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Three projects to open first." })).toBeVisible();
  await expect(page.locator(".selected-card")).toHaveCount(3);
  await expect(page.getByRole("link", { name: /Browse all seven public projects/ })).toHaveAttribute("href", "./work/");
  await expect(page.getByText("Private", { exact: true })).toHaveCount(0);
});

test("PolicyLens evidence story explains the decision boundary", async ({ page }) => {
  await page.goto("/");
  const story = page.locator("[data-evidence-story]");
  await page.getByRole("button", { name: "Cited finding" }).click();
  await expect(story).toHaveAttribute("data-stage", "finding");
  await expect(page.locator("[data-evidence-caption]")).toContainText("names the statement and access path");
  await expect(page.getByRole("button", { name: "Cited finding" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Reviewer decision" }).click();
  await expect(page.locator("[data-evidence-caption]")).toContainText("AI explanation never owns the verdict");
});

test("full catalogue search and category filters narrow seven public projects", async ({ page }) => {
  await page.goto("/work/");
  const cards = page.locator(".work-card:visible");
  await expect(cards).toHaveCount(7);
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expect(cards).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("semantic contract");
  await expect(cards).toHaveCount(1);
  await expect(cards.getByRole("heading", { name: "HR Performance Analytics" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search public work" }).fill("zzz-no-match");
  await expect(cards).toHaveCount(0);
  await expect(page.locator("[data-catalogue-empty]")).toBeVisible();
});

test("selected work opens its public evidence page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Open the PolicyLens case/ }).click();
  await expect(page).toHaveURL(/preview\.html\?app=policylens$/);
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open repo" })).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/iam-policy-auditor",
  );
});

test("PolicyLens has an indexable detail page and public source", async ({ page }) => {
  await page.goto("/store/apps/policylens/");
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/store/apps/policylens/",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /policylens\.png$/);
  await expect(page.getByRole("heading", { name: "What it solves" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open repo" }).first()).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/iam-policy-auditor",
  );
});

test("the portfolio remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".selected-card")).toHaveCount(3);
  await expect(page.locator(".evidence-controls")).toBeHidden();
  await page.goto("/work/");
  await expect(page.locator(".work-card:visible")).toHaveCount(7);
  await expect(page.locator("[data-catalogue-controls]")).toBeHidden();
  await context.close();
});

test("mobile layout has usable controls and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile project only");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  const button = page.getByRole("button", { name: "Access check" });
  const box = await button.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);

  await page.goto("/work/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});
