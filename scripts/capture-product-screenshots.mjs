import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "public", "assets", "apps");
await mkdir(output, { recursive: true });

async function align(page, selector, offset = 84) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.evaluate((distance) => window.scrollBy(0, -distance), offset);
  await page.waitForTimeout(180);
}

async function capture(page, { name, url, selector, prepare }) {
  await page.goto(url, { waitUntil: "networkidle" });
  if (prepare) await prepare(page);
  await align(page, selector);
  await page.screenshot({
    path: join(output, `${name}.png`),
    animations: "disabled",
  });
  console.log(`Captured ${name} -> public/assets/apps/${name}.png`);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 675 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "reduce",
});

try {
  await capture(page, {
    name: "projectlens",
    url: "https://matthewpaver.github.io/ProjectLens/change-assurance.html",
    selector: "#readinessWorkspace",
    prepare: async (target) => {
      await target.getByText("Try the Northstar example", { exact: false }).click();
      await target.waitForTimeout(220);
    },
  });
  await capture(page, {
    name: "meetingproof",
    url: "https://matthewpaver.github.io/MeetingProof/",
    selector: "#workspace",
    prepare: async (target) => {
      await target.getByText("Load the safe example", { exact: true }).click();
      await target.getByText("Create review draft", { exact: true }).click();
      await target.waitForTimeout(220);
    },
  });
  await capture(page, {
    name: "output-gate",
    url: "https://matthewpaver.github.io/ai-workflow-evaluator/app/",
    selector: "#gate",
  });
  await capture(page, {
    name: "decisiongraph",
    url: "https://matthewpaver.github.io/DecisionGraph/",
    selector: "#resultsSection",
  });
  await capture(page, {
    name: "lakehouse",
    url: "https://matthewpaver.github.io/marketing-ml-lakehouse/",
    selector: ".metric-grid",
  });
  await capture(page, {
    name: "paper-trading",
    url: "https://matthewpaver.github.io/paper-trading-bot/",
    selector: ".score-row",
  });
  await capture(page, {
    name: "happening",
    url: "https://matthewpaver.github.io/happening-open-core/",
    selector: ".event-layout",
  });
  await capture(page, {
    name: "winchester",
    url: "https://matthewpaver.github.io/winchester-buyer-check/",
    selector: ".feature-hero",
  });
} finally {
  await browser.close();
}
