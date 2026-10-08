import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {load} from 'cheerio';
const origin='https://blufinance.co';
const paths=['/','/project-goals/','/underlying-assets/','/whitepaper/','/category/article/','/about-us/','/faq/'];
await fs.mkdir('evidence/source',{recursive:true});
await fs.mkdir('public/assets',{recursive:true});
const pages=[], assets=new Map(), failures=[];
async function get(url){const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(`${r.status} ${url}`);return r;}
for(let i=0;i<paths.length;i++){
 const path=paths[i], url=origin+path, html=await (await get(url)).text(), $=load(html);
 const key=path==='/'?'home':path.replaceAll('/','_').replace(/^_|_$/g,'');
 await fs.writeFile(`evidence/source/${key}.html`,html);
 const en=$('link[hreflang="en"]').attr('href');
 if(en&&en.startsWith(origin)&&!paths.includes(new URL(en).pathname))paths.push(new URL(en).pathname);
 const resources=[];
 $('img[src],script[src],link[rel="stylesheet"],video[src],source[src]').each((_,el)=>{
  const value=$(el).attr('src')||$(el).attr('href');
  if(value&&!value.startsWith('data:')){try{const u=new URL(value,url).href;if(u.startsWith(origin))resources.push(u);}catch{}}
 });
 $('[srcset]').each((_,el)=>{for(const item of $(el).attr('srcset').split(',')){try{resources.push(new URL(item.trim().split(/\s+/)[0],url).href);}catch{}}});
 const imageText=$('img').map((_,el)=>({url:$(el).attr('src'),alt:$(el).attr('alt')||''})).get();
 pages.push({path,url,key,capturedAt:new Date().toISOString(),sha256:crypto.createHash('sha256').update(html).digest('hex'),title:$('title').text(),imageText});
 for(const u of resources)assets.set(u,null);
 console.log('Captured',path,html.length);
}
const queue=[...assets.keys()];
for(let i=0;i<queue.length;i+=8){await Promise.all(queue.slice(i,i+8).map(async url=>{
 try{
  const r=await get(url),buf=Buffer.from(await r.arrayBuffer());
  const ext=new URL(url).pathname.match(/\.[a-z0-9]+$/i)?.[0]||'.bin';
  const file=`assets/${crypto.createHash('sha256').update(url).digest('hex').slice(0,16)}${ext}`;
  await fs.writeFile('public/'+file,buf);assets.set(url,file);
  if(ext==='.css'){
   const css=buf.toString();for(const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)){
    if(!match[1].startsWith('data:')){try{const u=new URL(match[1],url).href;if(u.startsWith(origin)&&!assets.has(u)){assets.set(u,null);queue.push(u);}}catch{}}
   }
  }
 }catch(e){failures.push({url,error:String(e)});}
}));console.log('Assets',Math.min(i+8,queue.length),'/',queue.length);}
await fs.writeFile('evidence/manifest.json',JSON.stringify({origin,pages,assets:Object.fromEntries(assets),failures},null,2));
console.log('Done',pages.length,'pages',assets.size,'assets',failures.length,'failures');
