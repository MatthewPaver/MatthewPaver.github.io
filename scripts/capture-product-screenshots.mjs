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

async function renderNewco(page) {
  await page.setContent(
    `<!doctype html>
    <html lang="en">
      <head>
        <style>
          * { box-sizing: border-box; }
          body {
            width: 1200px; height: 675px; margin: 0; overflow: hidden;
            background: #eceeea; color: #171917;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          main { width: 1080px; margin: 54px auto; border: 1px solid #c8ccc5; background: #fff; }
          header {
            height: 86px; display: flex; align-items: center; justify-content: space-between;
            padding: 0 30px; border-bottom: 1px solid #d8dbd5;
          }
          .identity { display: flex; align-items: center; gap: 14px; }
          .icon {
            width: 44px; height: 44px; display: grid; place-items: center;
            border-radius: 10px; background: #202b25; color: #fff; font-weight: 750;
          }
          strong { display: block; font-size: 17px; }
          small { color: #6b716b; font-size: 12px; }
          .status { color: #7a4b12; font-size: 12px; font-weight: 700; }
          section { padding: 30px; }
          h1 { max-width: 660px; margin: 0 0 12px; font-size: 34px; line-height: 1.12; }
          p { max-width: 760px; margin: 0; color: #5f655f; font-size: 16px; line-height: 1.5; }
          table { width: 100%; margin-top: 30px; border-collapse: collapse; font-size: 14px; }
          th, td { padding: 16px 14px; border-top: 1px solid #d8dbd5; text-align: left; }
          th { color: #6b716b; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
          td:last-child { width: 210px; font-weight: 700; }
          .review { color: #9c4f12; }
          .ready { color: #17613c; }
          footer { padding: 15px 30px; border-top: 1px solid #d8dbd5; color: #6b716b; font-size: 12px; }
        </style>
      </head>
      <body>
        <main>
          <header>
            <div class="identity">
              <span class="icon">NA</span>
              <span><strong>Newco Assurance</strong><small>Prototype review</small></span>
            </div>
            <span class="status">PRIVATE PROTOTYPE</span>
          </header>
          <section>
            <h1>Reliance review</h1>
            <p>Three checks for teams deciding whether an AI-built workflow can enter a live process.</p>
            <table>
              <thead><tr><th>Review item</th><th>Recorded state</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>Named owner</td><td>Operations lead assigned</td><td class="ready">Recorded</td></tr>
                <tr><td>Customer data path</td><td>Storage location not confirmed</td><td class="review">Needs review</td></tr>
                <tr><td>Failure control</td><td>Manual fallback documented</td><td class="ready">Recorded</td></tr>
                <tr><td>Release evidence</td><td>Evaluation run is out of date</td><td class="review">Needs review</td></tr>
              </tbody>
            </table>
          </section>
          <footer>Illustrative preview. Product code and customer data are not public.</footer>
        </main>
      </body>
    </html>`,
    { waitUntil: "load" },
  );
  await page.screenshot({
    path: join(output, "newco-assurance.png"),
    animations: "disabled",
  });
  console.log("Rendered newco-assurance -> public/assets/apps/newco-assurance.png");
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
  console.log("Preserved Winchester showcase from the protected product repository");
  await renderNewco(page);
} finally {
  await browser.close();
}
