import { chromium } from '@playwright/test';
import fs from 'node:fs';

const output = process.argv[2] ?? '.impeccable/review/catalogue-first-use-2026-09-05';
fs.mkdirSync(output,{recursive:true});
const browser = await chromium.launch();
for (const [name, width, height, colorScheme] of [
  ['desktop',1440,1000,'light'],['tablet',768,1024,'light'],
  ['mobile',390,844,'light'],['small',320,740,'light'],['dark',1440,1000,'dark'],
]) {
  const page = await browser.newPage({viewport:{width,height},colorScheme,reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4321/work/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`${output}/${name}.png`,fullPage:true});
  const card = page.locator('[data-slug="projectlens"]');
  await card.getByText('First steps',{exact:true}).click();
  await card.screenshot({path:`${output}/${name}-first-steps.png`});
  console.log(JSON.stringify({name,errors,width,scrollWidth:await page.evaluate(()=>document.documentElement.scrollWidth)}));
  await page.close();
}
// Verify the new minimal local-server instructions, without installing ProjectLens dependencies.
const local = await browser.newPage();
await local.goto('http://127.0.0.1:4377/change-assurance.html',{waitUntil:'networkidle'});
await local.locator('#loadAssuranceDemo').click();
await local.locator('#blockerList > *').first().waitFor();
console.log(JSON.stringify({localProjectLensBlockers:await local.locator('#blockerList > *').count()}));
await browser.close();
