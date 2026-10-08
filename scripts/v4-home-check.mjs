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
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.locator('.v4-opening').screenshot({path:`evidence/screenshots/home-v4-${width}.png`,timeout:30000});
  if(width===1440) {
    const debug=await page.evaluate(()=>{
      const nodes=['.v4-journal .wdt-post-entry','.v4-businesses .wdt-flex-banner-option','.v4-figures #wdt-image-box-778559f'].map(sel=>{
        let node=document.querySelector(sel),path=[];
        for(let i=0;node&&i<11;i++,node=node.parentElement){const rect=node.getBoundingClientRect(),c=getComputedStyle(node);path.push({tag:node.tagName,cls:String(node.className).slice(0,120),width:Math.round(rect.width),display:c.display,gridColumn:c.gridColumn,position:c.position});}
        return {sel,path};
      });
      return nodes;
    });
    await fs.writeFile('evidence/screenshots/v4-dom-debug.json',JSON.stringify(debug,null,2));
    for(const name of ['figures','purpose','businesses','journal']){
      const target=page.locator('.v4-'+name);
      if(await target.count()) await target.screenshot({path:`evidence/screenshots/v4-${name}.png`,timeout:45000});
    }
  }
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,sceneCount:document.querySelectorAll('.v4-scene').length,widgetCount:document.querySelectorAll('.v4-scene .v4-block').length,visibleMainText:document.querySelector('#main')?.innerText?.length||0,background:getComputedStyle(document.querySelector('.v4-opening')).backgroundColor,bodyFont:getComputedStyle(document.body).fontFamily}));
  results.push({width,metrics,errors});console.log(JSON.stringify({width,metrics,errors}));
  if(metrics.sceneCount<7||metrics.widgetCount<15||metrics.visibleMainText<2500)throw new Error('Homepage source content or visual layout missing');
  if(metrics.scrollWidth>width+5)throw new Error('Unexpected horizontal overflow');
  await page.close();
}
await browser.close();
await fs.writeFile('evidence/home-v4-check.json',JSON.stringify(results,null,2));
