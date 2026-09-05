// Capture real, publicly available app states. Never invent results or alter their UI.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import crypto from 'node:crypto';

const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:1280,height:800},reducedMotion:'reduce'});
const captures = [];
async function save(file, source, state, locator = page) {
  await page.evaluate(()=>document.fonts.ready);
  await locator.screenshot({path:`store/assets/${file}`});
  captures.push({file,source,state,capturedAt:new Date().toISOString(),sha256:crypto.createHash('sha256').update(fs.readFileSync(`store/assets/${file}`)).digest('hex')});
}
const projectUrl = 'https://matthewpaver.github.io/ProjectLens/change-assurance.html';
await page.goto(projectUrl,{waitUntil:'networkidle'});
await page.locator('#loadAssuranceDemo').click();
await page.locator('#blockerList > *').first().waitFor();
await save('projectlens-blockers.png',projectUrl,'Bundled synthetic Northstar example after review; actual readiness card',page.locator('#readinessCard'));
const lakehouseUrl = 'https://matthewpaver.github.io/marketing-ml-lakehouse/#quality';
await page.goto(lakehouseUrl,{waitUntil:'networkidle'});
await page.getByRole('heading',{name:'Quality before commentary.'}).waitFor();
await save('lakehouse-quality.png',lakehouseUrl,'Published fixed sample-data quality screen; not a live pipeline execution');
const winchesterUrl = 'https://matthewpaver.github.io/winchester-buyer-check/';
await page.goto(winchesterUrl,{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Under £425k',exact:true}).click();
await save('winchester-shortlist.png',winchesterUrl,'Seeded home shortlist with Under £425k filter selected');
fs.writeFileSync('store/assets/catalogue-captures.json',JSON.stringify(captures,null,2)+'\n');
await browser.close();
