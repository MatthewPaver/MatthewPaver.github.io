import { expect, test } from "@playwright/test";

test("homepage is a compact public project store with a personal introduction", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Matthew Paver \| Software and AI engineering/);
  const heroHeading = page.getByRole("heading", { name: "Evidence-led software." });
  await expect(heroHeading).toBeVisible();
  if (test.info().project.name === "desktop") {
    const lines = await heroHeading.evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
    });
    expect(lines).toBeLessThanOrEqual(2);
  }
  await expect(page.getByRole("heading", { name: "Start with three applications." })).toBeVisible();
  await expect(page.locator(".selected-card")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Explore the store" })).toHaveAttribute("href", "#selected");
  await expect(page.getByRole("link", { name: "View CV" }).first()).toHaveAttribute(
    "href",
    "https://github.com/MatthewPaver/MatthewPaver/blob/main/CV.pdf",
  );
  await expect(page.getByText("Private", { exact: true })).toHaveCount(0);
});

test("the Decision Contract changes with each real project", async ({ page }) => {
  await page.goto("/");
  const contract = page.locator("[data-decision-contract]");
  await contract.getByRole("button", { name: "ProjectLens" }).click();
  await expect(contract.locator("[data-contract-summary]")).toContainText("schedule dates remain authoritative");
  await expect(contract.locator('[data-contract-value="authority"]')).toHaveText("Date, milestone and logic conflict checks");
  await expect(contract.locator('[data-contract-value="owner"]')).toHaveText("Project change board");
  await expect(contract.getByRole("button", { name: "ProjectLens" })).toHaveAttribute("aria-pressed", "true");

  await page.waitForTimeout(1300);
  await contract.getByRole("button", { name: "ProjectLens" }).click();
  await expect(contract.locator("[data-contract-canvas]")).not.toHaveClass(/is-playing/);

  await contract.getByRole("button", { name: "ML Lakehouse" }).click();
  await expect(contract.locator('[data-contract-value="stop"]')).toContainText("data quality or baseline checks fail");
});

test("full catalogue search, category filters and category links narrow seven public projects", async ({ page }) => {
  await page.goto("/work/?category=decision#catalogue");
  const cards = page.locator(".work-card:visible");
  await expect(cards).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Decision tools" })).toHaveAttribute("aria-pressed", "true");
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

test("selected work exposes a result, boundary and case route", async ({ page }) => {
  await page.goto("/");
  const policy = page.locator('[data-project="policylens"]');
  await expect(policy.getByText("55/55 documented decisions matched")).toBeVisible();
  await expect(policy.getByText("AI explains the verdict; it cannot change it")).toBeVisible();
  await expect(policy.getByRole("link", { name: "Open case" })).toHaveAttribute(
    "href",
    "./preview.html?app=policylens",
  );

  const project = page.locator('[data-project="projectlens"]');
  await expect(project.getByText(/three blockers, including a 73-day finish movement/i)).toBeVisible();
  await expect(project.getByRole("link", { name: "Open case" })).toHaveAttribute(
    "href",
    "./preview.html?app=projectlens",
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
  await expect(page.getByRole("heading", { name: "PolicyLens", exact: true })).toBeVisible();
  await expect(page.locator(".supporting-item")).toHaveCount(4);
  await expect(page.locator('[data-contract-value="owner"]')).toHaveText("Cloud security reviewer");
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
  const button = page.getByRole("button", { name: "ProjectLens" });
  const box = await button.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(box?.width).toBeGreaterThanOrEqual(44);

  await page.goto("/work/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});
