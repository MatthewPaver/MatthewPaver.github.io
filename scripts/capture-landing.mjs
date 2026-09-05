import { chromium } from "@playwright/test";
import fs from "node:fs";

const out = process.argv[2] ?? ".impeccable/review/landing-2026-09-05";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [name, viewport, colorScheme] of [
  ["desktop", { width: 1440, height: 1000 }, "light"],
  ["mobile", { width: 390, height: 844 }, "light"],
  ["dark", { width: 1440, height: 1000 }, "dark"],
]) {
  const page = await browser.newPage({ viewport, colorScheme, reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4321", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  console.log(JSON.stringify({ name, width: await page.evaluate(() => document.documentElement.scrollWidth), height: await page.evaluate(() => document.documentElement.scrollHeight) }));
  await page.close();
}
const motionPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: "light", reducedMotion: "no-preference" });
await motionPage.goto("http://127.0.0.1:4321", { waitUntil: "networkidle" });
await motionPage.screenshot({ path: `${out}/desktop-motion.png` });
await motionPage.getByRole("button", { name: "Pause background motion" }).click();
await motionPage.screenshot({ path: `${out}/desktop-paused.png` });
await browser.close();
