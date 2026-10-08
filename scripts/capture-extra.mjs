import fs from'node:fs/promises';import crypto from'node:crypto';import{load}from'cheerio';
const m=JSON.parse(await fs.readFile('evidence/manifest.json','utf8'));const urls=new Set();
for(const p of m.pages){const html=await fs.readFile(`evidence/source/${p.key}.html`,'utf8');const $=load(html);
 $('[data-src],[data-srcset],a[href]').each((_,e)=>{for(const a of ['data-src','data-srcset','href']){const s=$(e).attr(a);if(!s)continue;for(const x of s.split(',')){try{const u=new URL(x.trim().split(/\s+/)[0],p.url).href;if(u.startsWith(m.origin)&&/\.(png|jpg|jpeg|webp|svg|pdf|woff2?)(\?|$)/i.test(u))urls.add(u);}catch{}}}});
 for(const x of html.matchAll(/https?:[^\s"<>]+?\.(?:png|jpe?g|webp|svg|woff2?)(?:\?[^\s"<>]*)?/gi)){urls.add(x[0].replaceAll('&amp;','&').replaceAll('\\/','/'));}
}
const queue=[...urls].filter(u=>!m.assets[u]);
for(let i=0;i<queue.length;i+=8){await Promise.all(queue.slice(i,i+8).map(async u=>{try{const r=await fetch(u,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(r.status);const ext=new URL(u).pathname.match(/\.[a-z0-9]+$/i)?.[0]||'.bin',file=`assets/${crypto.createHash('sha256').update(u).digest('hex').slice(0,16)}${ext}`;await fs.writeFile('public/'+file,Buffer.from(await r.arrayBuffer()));m.assets[u]=file;}catch(e){m.failures.push({url:u,error:String(e)});}}));console.log(i,queue.length);}
await fs.writeFile('evidence/manifest.json',JSON.stringify(m,null,2));
