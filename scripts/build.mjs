import fs from'node:fs/promises';import path from'node:path';import{load}from'cheerio';
const m=JSON.parse(await fs.readFile('evidence/manifest.json','utf8'));
// The original blog script calls a global "$" outside its jQuery closure.
// WordPress uses noConflict; qualify these calls in the presentation copy.
const blogScript='public/assets/850c215a17fff2d1.js';
await fs.writeFile(blogScript,(await fs.readFile(blogScript,'utf8')).replace(/(?<![\w$])\$\(/g,'jQuery('));
function local(u,base){const absolute=new URL(u,base).href;return m.assets[absolute]?base+m.assets[absolute]:u;}
// CSS resource paths are relative to the downloaded stylesheet, not the page.
for(const[u,file]of Object.entries(m.assets)){if(!file?.endsWith('.css'))continue;
let css=await fs.readFile('public/'+file,'utf8');css=css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g,(all,q,v)=>{if(v.startsWith('data:')||v.startsWith('#'))return all;try{const asset=m.assets[new URL(v,u).href];return asset?`url("${path.posix.basename(asset)}")`:all;}catch{return all;}});await fs.writeFile('public/'+file,css);}
for(const p of m.pages){const original=await fs.readFile(`evidence/source/${p.key}.html`,'utf8'),$=load(original),depth=p.path.split('/').filter(Boolean).length,base='../'.repeat(depth)||'./';
 // Content DOM remains in its original order. No editorial extraction or rewriting.
 $('script[src],link[href],img[src],video[src],source[src]').each((_,el)=>{const n=$(el),attr=n.attr('src')?'src':'href',v=n.attr(attr);if(!v||v.startsWith('data:'))return;try{const u=new URL(v,p.url).href;if(m.assets[u])n.attr(attr,base+m.assets[u]);}catch{}});
 $('[srcset],[data-src],[data-srcset]').each((_,el)=>{for(const a of ['srcset','data-src','data-srcset']){const v=$(el).attr(a);if(!v)continue;$(el).attr(a,v.split(',').map(s=>{const bits=s.trim().split(/\s+/);try{const file=m.assets[new URL(bits[0],p.url).href];if(file)bits[0]=base+file;}catch{}return bits.join(' ');}).join(', '));}});
 $('[style],[data-settings]').each((_,el)=>{for(const a of ['style','data-settings']){let v=$(el).attr(a);if(!v)continue;for(const[u,file]of Object.entries(m.assets)){if(file){v=v.replaceAll(u,base+file).replaceAll(u.replaceAll('/','\\/'),(base+file).replaceAll('/','\\/'));}}$(el).attr(a,v);}});
 // Keep canonical CTA hrefs byte-for-byte; navigation interception is presentation-only.
 $('a[href]').each((_,el)=>{const href=$(el).attr('href');if(!href||href.startsWith('#'))return;try{const u=new URL(href,p.url),route=u.pathname.endsWith('/')?u.pathname:u.pathname+'/';if(u.origin===m.origin&&m.pages.some(x=>x.path===route))$(el).attr('data-preview-route',base+route.slice(1)+u.search+u.hash);}catch{}});
 $('body').addClass('blu-redesign').attr('data-preview-base',base);
 $('meta[name="robots"]').attr('content','noindex, nofollow');
 $('head').append(`<link rel="stylesheet" href="${base}src/design.css">`);
 // Snapshot scripts retain interactions; analytics is omitted in a review preview.
 $('script').each((_,el)=>{const s=$(el).html()||'',src=$(el).attr('src')||'';if(/googletagmanager|google-analytics|gtag\(/.test(s+src)||s.trim()==="alert(\\'JS Loaded\\');")$(el).remove();
 if(src.includes('850c215a17fff2d1'))$(el).before('<script>window.$=window.jQuery;</script>');});
 $('#header img').filter((_,el)=>/Blu-Green-Token_Logo|Logo-Bul/.test($(el).attr('src')||'')||/c421d15d|aac7cc37/.test($(el).attr('src')||'')).attr('src',base+'brand/logo.svg').removeAttr('srcset');
 $('#header img').addClass('blu-brand-mark').attr('src',base+'brand/logo.svg').removeAttr('srcset');
 // Recompose original homepage section nodes into a completely new editorial scene grid.
 // Move existing DOM nodes rather than copying/editing content; text, anchor targets,
 // warnings, image-embedded content and the original content order remain untouched.
 if(p.path==='/'||p.path==='/en/main-en/'){
   const originalSections=$('#main .elementor-3292 > section.elementor-top-section').toArray();
   const names=['opening','introduction','figures','purpose','purpose-alternate','businesses','journal'];
   const layout=$('<div class="blu-homepage-layout" data-visual-rebuild="true"></div>');
   originalSections.forEach((el,i)=>{
     const scene=$('<div class="blu-scene blu-scene-'+(names[i]||'extra')+'"></div>');
     if(i===0||i===3||i===5)scene.append('<div class="blu-scene-art" aria-hidden="true"></div>');
     scene.append($(el).detach());
     layout.append(scene);
   });
   $('#main .elementor-3292').append(layout);
   $('body').addClass('blu-homepage-v3');
   $('head').append('<link rel="stylesheet" href="'+base+'src/homepage.css">');
 }
 $('#main').attr('tabindex','-1');
 if(p.path==='/'||p.path==='/en/main-en/')$('#main').before('<div id="blu-intro-root" aria-hidden="true"></div>');
 $('#footer').prepend('<div id="blu-ecosystem-root" aria-hidden="true"></div>');
 $('body').append(`<script type="module" src="${base}src/presentation.jsx"></script>`);
 const file=p.path==='/'?'index.html':p.path.slice(1)+'index.html';await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,$.html());
}
console.log('Built source HTML for',m.pages.length,'routes');
