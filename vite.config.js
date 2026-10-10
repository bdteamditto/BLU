import {defineConfig}from'vite';import fs from'node:fs';
const m=JSON.parse(fs.readFileSync('evidence/manifest.json','utf8'));
export default defineConfig({base:'./',build:{outDir:'dist',rollupOptions:{input:Object.fromEntries(m.pages.map(p=>[p.key,p.path==='/'?'index.html':p.path.slice(1)+'index.html']))}}});
