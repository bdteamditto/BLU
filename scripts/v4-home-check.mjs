import fs from 'node:fs/promises';
import {chromium} from 'playwright';
await fs.mkdir('evidence/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
const results=[];
for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForTimeout(1600);
  const close=page.locator('.sgpb-popup-close-button-1');
  if(await close.isVisible().catch(()=>false)) await close.click();
  await page.locator('.blu-home-v4').scrollIntoViewIfNeeded();
  await page.screenshot({path:`evidence/screenshots/home-v4-${width}.png`,fullPage:false,timeout:25000});
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sceneCount:document.querySelectorAll('.v4-scene').length,widgetCount:document.querySelectorAll('.v4-scene .v4-block').length,visibleMainText:document.querySelector('#main')?.innerText?.length||0,background:getComputedStyle(document.querySelector('.v4-opening')).backgroundColor,bodyFont:getComputedStyle(document.body).fontFamily}));
  results.push({width,metrics,errors});console.log(JSON.stringify({width,metrics,errors}));
  if(metrics.sceneCount<7||metrics.widgetCount<15||metrics.visibleMainText<2500)throw new Error('Homepage source content or visual layout missing');
  if(metrics.scrollWidth>width+5)throw new Error('Unexpected horizontal overflow');
  await page.close();
}
await browser.close();
await fs.writeFile('evidence/home-v4-check.json',JSON.stringify(results,null,2));
