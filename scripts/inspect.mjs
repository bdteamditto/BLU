import fs from 'node:fs';import{load}from'cheerio';
for(const file of ['home','underlying-assets','faq','about-us','whitepaper','category_article','project-goals']){try{
const $=load(fs.readFileSync(`evidence/source/${file}.html`,'utf8'));
console.log('\nPAGE',file);console.log($('#main').children().map((i,e)=>e.name+' '+$(e).attr('class')).get());
console.log($('#main img').map((i,e)=>$(e).attr('src')).get());
console.log($('#main .elementor-widget').map((i,e)=>$(e).attr('data-id')+' '+$(e).attr('data-widget_type')+': '+$(e).text().trim().slice(0,100)).get().join('\n'));
}catch{}}
