import {chromium} from 'playwright';import {spawn} from 'node:child_process';import fs from 'node:fs/promises';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4176'],{windowsHide:true,stdio:'ignore'});
let browser;const results=[];
try{for(let i=0;i<100;i++){try{const r=await fetch('http://127.0.0.1:4176/');if(r.ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
browser=await chromium.launch({headless:true});
for(const [width,height] of [[466,604],[390,844],[1440,900]]){const page=await browser.newPage({viewport:{width,height},isMobile:width<700,hasTouch:width<700});await page.goto('http://127.0.0.1:4176/?v=7.1',{waitUntil:'networkidle'});await page.locator('.sgpb-popup-close-button-1').evaluateAll(a=>a.forEach(e=>e.click()));
const check=await page.evaluate(()=>{const logo=Array.from(document.querySelectorAll('#header img.blu-brand-mark')).find(e=>e.getBoundingClientRect().width>0),menu=Array.from(document.querySelectorAll('#header .menu-trigger')).find(e=>e.getBoundingClientRect().width>0),r=logo.getBoundingClientRect(),m=menu?.getBoundingClientRect();return {letteringCount:document.querySelectorAll('.wc-lettering').length,logo:{width:r.width,height:r.height,loaded:logo.naturalWidth>0},menu:m?{width:m.width,height:m.height,top:m.top}:null,overflow:document.documentElement.scrollWidth>innerWidth,coinLoaded:document.querySelector('.wc-blue-coin').naturalWidth>0}});
await page.screenshot({path:`evidence/screenshots/v7-header-revised-${width}.png`});results.push({width,height,...check});await page.close();}
await fs.writeFile('evidence/v7-header-review.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));if(results.some(r=>r.letteringCount||r.overflow||!r.logo.loaded||!r.coinLoaded||r.logo.width<=0||r.logo.width>110))process.exitCode=1;
}finally{await browser?.close();server.kill();}

