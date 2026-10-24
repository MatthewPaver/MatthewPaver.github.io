// Real local application states only. Start PolicyLens on 4177 and ProjectLens docs on 4377.
// Current captures default to the published products; optional URLs support local verification.
// Historical assets are immutable: new previews always use a dated path under assets/previews/.
import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import crypto from "node:crypto";

const date = process.argv[2] ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Capture date must be YYYY-MM-DD");
const revision = process.argv[3] ?? "";
if (revision && !/^[a-z0-9-]+$/.test(revision)) throw new Error("Capture revision must use lowercase letters, digits and hyphens");
const suffix = revision ? `-${revision}` : "";
const directory = "store/assets/previews";
fs.mkdirSync(directory, { recursive: true });
const products = [
  ["projectlens", "ProjectLens", process.env.PROJECTLENS_CAPTURE_URL ?? "https://matthewpaver.github.io/ProjectLens/change-assurance.html", "#example-finish"],
  ["policylens", "PolicyLens", process.env.POLICYLENS_CAPTURE_URL ?? "https://matthewpaver.github.io/iam-policy-auditor/", "#demoAfter"],
  ["rag-regression-gate", "RAG Regression Gate", process.env.RAG_CAPTURE_URL ?? "https://matthewpaver.github.io/demos/rag-gate/", "#switch-result"],
];
const browser = await chromium.launch();
const captured = [];
try {
  for (const [slug, product, url, ready] of products) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (response?.status() !== 200) throw new Error(`${product} capture did not load successfully`);
    if (slug === "policylens") await expect(page.locator(ready)).toHaveText("Allow");
    else await expect(page.locator(ready)).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.getAnimations().forEach(animation => animation.finish()));
    const file = `${slug}-${date}${suffix}.png`;
    await page.screenshot({ path: `${directory}/${file}` });
    captured.push({
      product, url, source_kind: /^https:\/\/matthewpaver\.github\.io\//.test(url) ? "published product" : "local candidate build", captured_utc: new Date().toISOString(), viewport: { width: 1280, height: 800 },
      state: "Landing with ready synthetic example; reduced motion; no input files or edits",
      file, sha256: crypto.createHash("sha256").update(fs.readFileSync(`${directory}/${file}`)).digest("hex"),
      source_html_sha256: crypto.createHash("sha256").update(await response.body()).digest("hex"),
    });
    await page.close();
  }
  fs.writeFileSync(`${directory}/${revision ? `captures-${date}${suffix}.json` : "captures.json"}`, JSON.stringify(captured, null, 2) + "\n");
} finally {
  await browser.close();
}
console.log(`Captured ${captured.length} current previews. Historical captures unchanged.`);
