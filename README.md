# BLU visual redesign preview

Isolated visual review project for https://blufinance.co/. It does not deploy to or modify the existing website.

The immutable content layer is `evidence/source/`: original HTML captured on 8 October 2026, with timestamps and SHA-256 in `evidence/manifest.json`. `scripts/build.mjs` copies this DOM into 14 static routes, including the seven requested Thai pages and their linked English alternatives. React/Three.js/GSAP and CSS provide the presentation layer. No generated marketing copy is used.

## Run

```sh
corepack pnpm install
pnpm build
pnpm validate
pnpm preview
```

Open http://localhost:4173/. `pnpm test:browser` captures desktop/mobile screenshots and records browser checks; install Chromium using `pnpm exec playwright install chromium` first.

`pnpm capture` deliberately retrieves a NEW snapshot and changes the content baseline. Do not use it as part of a normal build. Keep the reviewed baseline fixed.

## Review limits

Read `evidence/REVIEW.md` and the validation JSON before approval. Static text/link/field equality is not a certification of text embedded in images, live backend submissions, complete accessibility, or final art direction. The preview keeps the original canonical CTA links. Navigation to the captured routes is intercepted locally; original articles and document destinations remain on the source website. No form submission is tested against the production backend.

The GitHub Pages preview is deployed from a separate `preview` branch. No CNAME or production-domain change is made. For Vercel, import this repository, select `preview`, use `pnpm build`, output directory `dist`, and framework preset Other. Do not connect blufinance.co before approval.
