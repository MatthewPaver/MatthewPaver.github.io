// Real local application states only. Start PolicyLens on 4177 and ProjectLens docs on 4377.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import crypto from "node:crypto";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
const captured = [];
async function capture(locator, file, source, state) {
  await locator.screenshot({ path: `store/assets/${file}` });
  const bytes = fs.readFileSync(`store/assets/${file}`);
  captured.push({ file, source, state, capturedAt: new Date().toISOString(), sha256: crypto.createHash("sha256").update(bytes).digest("hex") });
}
await page.goto("http://127.0.0.1:4177/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Change review", exact: true }).click();
await page.locator("#loadChangeExample").click();
await page.locator("#compareBtn").click();
await page.locator("#compareResult .verdict").waitFor({ state: "visible" });
await capture(page.locator("#compareResult"), "policylens-review.png", "iam-policy-auditor/public/index.html", "Bundled before/after AWS policy example after Review this change; AI disabled");
await page.goto("http://127.0.0.1:4377/change-assurance.html", { waitUntil: "networkidle" });
await page.locator("#loadAssuranceDemo").click();
await page.locator("#requestAnswers").click();
await page.locator("#requestPanel").waitFor({ state: "visible" });
await page.evaluate(() => document.fonts.ready);
await capture(page.locator("#requestPanel"), "projectlens-questions.png", "ProjectLens/docs/change-assurance.html", "Synthetic Northstar example, Draft questions for the team; no real client data");
fs.writeFileSync("store/assets/evidence-captures.json", JSON.stringify(captured, null, 2) + "\n");
await browser.close();
