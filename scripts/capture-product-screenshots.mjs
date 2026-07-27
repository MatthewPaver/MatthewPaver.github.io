import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const targets = [
  {
    name: "meetingproof",
    url: "https://matthewpaver.github.io/MeetingProof/",
    output: "public/assets/apps/meetingproof.png",
  },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 675 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "reduce",
});

for (const target of targets) {
  const output = resolve(target.output);
  await mkdir(dirname(output), { recursive: true });
  await page.goto(target.url, { waitUntil: "networkidle" });
  await page.screenshot({ path: output, animations: "disabled" });
  process.stdout.write(`Captured ${target.name} -> ${target.output}\n`);
}

const newcoOutput = resolve("public/assets/apps/newco-assurance.png");
await mkdir(dirname(newcoOutput), { recursive: true });
const coverPage = await browser.newPage({
  viewport: { width: 1200, height: 675 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  reducedMotion: "reduce",
});
await coverPage.setContent(`
  <!doctype html>
  <html lang="en">
    <head>
      <style>
        * { box-sizing: border-box; }
        body {
          width: 1200px;
          height: 675px;
          margin: 0;
          overflow: hidden;
          background:
            linear-gradient(rgba(139, 236, 206, .08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 236, 206, .08) 1px, transparent 1px),
            #10201b;
          background-size: 48px 48px;
          color: #f4efe3;
          font-family: Arial, sans-serif;
        }
        main { height: 100%; padding: 64px; display: grid; grid-template-columns: 1.05fr .95fr; gap: 70px; }
        .eyebrow { color: #8beccd; font-size: 15px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        h1 { max-width: 600px; margin: 34px 0 22px; font-family: Georgia, serif; font-size: 78px; font-weight: 500; letter-spacing: -.05em; line-height: .94; }
        .lede { max-width: 540px; color: #bdc9c4; font-size: 22px; line-height: 1.5; }
        .boundary { display: inline-block; margin-top: 36px; padding: 12px 16px; border: 1px solid #6d7d76; border-radius: 999px; color: #e6ad70; font-size: 14px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .checks { align-self: center; display: grid; gap: 16px; }
        .check { padding: 26px 28px; border: 1px solid #40524a; border-radius: 14px; background: rgba(15, 29, 24, .86); }
        .check small { display: block; color: #8beccd; font-size: 13px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
        .check strong { display: block; margin-top: 10px; font-family: Georgia, serif; font-size: 31px; font-weight: 500; }
        footer { position: absolute; right: 64px; bottom: 44px; color: #8fa099; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <main>
        <section>
          <p class="eyebrow">Newco / Assurance</p>
          <h1>Reliance needs evidence.</h1>
          <p class="lede">A human-reviewed pre-flight for AI-built workflows before another person or a live process depends on them.</p>
          <span class="boundary">Private prototype · interface withheld</span>
        </section>
        <section class="checks" aria-label="Assurance questions">
          <div class="check"><small>01 / Ownership</small><strong>Who answers when it fails?</strong></div>
          <div class="check"><small>02 / Data path</small><strong>Where does the evidence go?</strong></div>
          <div class="check"><small>03 / Controls</small><strong>What blocks unsafe reliance?</strong></div>
        </section>
      </main>
      <footer>Product boundary shown. Private method protected.</footer>
    </body>
  </html>
`, { waitUntil: "load" });
await coverPage.screenshot({ path: newcoOutput, animations: "disabled" });
await coverPage.close();
process.stdout.write("Designed protected Newco cover -> public/assets/apps/newco-assurance.png\n");

await browser.close();
