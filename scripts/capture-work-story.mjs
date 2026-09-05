import { chromium } from '@playwright/test';
import fs from 'node:fs';

const output = process.argv[2] ?? '.impeccable/review/scroll-story-2026-09-05';
fs.mkdirSync(output, {recursive:true});
const browser = await chromium.launch();
for (const [name, viewport, colorScheme] of [
  ['desktop', {width:1440,height:1000}, 'light'],
  ['mobile', {width:390,height:844}, 'light'],
  ['dark', {width:1440,height:1000}, 'dark'],
]) {
  const page = await browser.newPage({viewport,colorScheme,reducedMotion:'no-preference'});
  const errors = [];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4321/', {waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  for (const project of ['policylens','projectlens','quicksupply']) {
    await page.locator(`[data-project="${project}"] .project-copy`).evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    if (name !== 'mobile') {
      await page.waitForFunction(id=>document.querySelector('[data-work-story]').dataset.activeProject===id, project);
      await page.locator('.work-story-stage').evaluate(async stage=>{
        await Promise.all(stage.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));
      });
    }
    await page.screenshot({path:`${output}/${name}-${project}.png`});
  }
  await page.screenshot({path:`${output}/${name}-full.png`,fullPage:true});
  console.log(JSON.stringify({name,errors,scrollWidth:await page.evaluate(()=>document.documentElement.scrollWidth),viewport:viewport.width}));
  await page.close();
}
// A short, real browser recording lets the owner inspect the motion, not only stills.
const context = await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:output,size:{width:1440,height:1000}}});
const page = await context.newPage();
await page.goto('http://127.0.0.1:4321/#selected',{waitUntil:'networkidle'});
for (let i=0;i<11;i++) {
  await page.mouse.wheel(0,180);
  await page.waitForTimeout(350);
}
const video = page.video();
await context.close();
await video.saveAs(`${output}/scroll-demo.webm`);
await browser.close();
