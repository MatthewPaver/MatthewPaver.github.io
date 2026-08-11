import { expect, test } from "@playwright/test";

test("homepage leads with three public projects and a short route through the work", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver \| AI Engineer and Solution Architect/);
  await expect(
    page.getByRole("heading", { name: "AI systems that show their work." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lead projects" })).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(3);
  await expect(page.locator(".project-panel")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "View my CV" })).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/MatthewPaver/blob/main/CV.pdf",
  );
  await expect(page.getByText("Private", { exact: true })).toHaveCount(0);
});

test("the assurance map explains how evidence becomes a human decision", async ({ page }) => {
  await page.goto("/");
  const map = page.locator("[data-assurance-map]");
  await page.getByRole("button", { name: "Project change" }).click();
  await expect(page.locator("[data-flow-summary]")).toContainText("change narrative matches the schedule dates");
  await expect(map.locator('[data-flow-title="decision"]')).toHaveText("Record the board response");
  await expect(page.locator("[data-flow-owner]")).toHaveText("Project change board");
  await expect(page.getByRole("button", { name: "Project change" })).toHaveAttribute("aria-pressed", "true");
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

test("selected work exposes public evidence and source", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("55/55 documented scenarios match the expected decision.")).toBeVisible();
  await expect(page.getByRole("link", { name: "View source" }).first()).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/iam-policy-auditor",
  );
  await page.getByRole("tab", { name: "ProjectLens" }).click();
  await expect(page.getByText(/three board blockers, including an unacknowledged 73-day finish movement/i)).toBeVisible();
  await expect(page.locator("#panel-project").getByRole("link", { name: "Open demo" })).toHaveAttribute(
    "href",
    "https://matthewpaver.github.io/ProjectLens/change-assurance.html",
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
  await expect(page.locator(".project-panel:visible")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "See who gains sensitive cloud access before you approve it." })).toBeVisible();
  await expect(page.locator(".origin-story")).toHaveCount(2);
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
  const button = page.getByRole("tab", { name: "ProjectLens" });
  const box = await button.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);

  await page.goto("/work/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});
