# Review record — 8 October 2026

## Fixed source of truth

The seven Thai pages and seven linked English alternatives were retrieved from the live website between 16:33:45 and 16:34:01 Asia/Bangkok. Raw HTML, timestamps, original resource URLs and SHA-256 hashes are retained. The browser runtime may load additional content after this retrieval; this distinction must be checked before approval.

Content is not rewritten. Source typos, repetitions, hidden desktop/mobile variants, dates, investment warnings, documents, phone-number formatting and language links are retained. `evidence/content-validation.json` compares built HTML against the source snapshot, normalizing whitespace only, with ordered text nodes, numbers, canonical anchor hrefs and form field definitions.

## Manual review required

- Image-embedded text: source project gallery, maps, article thumbnails and graphics remain original images. Their wording is not transcribed or certified by the HTML validator. Review every image at native resolution against the original; do not replace it with guessed text. This means the requirement to render every image-embedded word as HTML is still incomplete.
- Homepage and project-goals pages include different hidden and visible versions of paragraphs. All versions are retained exactly. The source also contains English/template-looking copy in hidden about-us sections. No editorial cleanup is performed.
- The source project-goals counter starts at `1000` in HTML and specifies its final value in `data-to-value`. The original script performs the count-up. Review the final rendered number and the reduced-motion behavior against the source. Do not substitute a guessed number.
- The 15 original province names are retained as their original HTML list on `/project-goals/`. No per-province area values are created. Project gallery content remains source images.
- The source website currently opens an image popup. It is retained. Browser screenshots dismiss the popup using its original close control. Its image content needs separate review.
- Document and article CTA hrefs remain their original canonical destinations. Original linked documents have also been archived where fetch succeeded. Navigating among the 14 captured routes is intercepted within the preview; other routes open the source website.
- Contact forms retain original field definitions and actions. Live submission is not tested or certified. Production WordPress AJAX requests can fail cross-origin; static hosting alone does not reproduce the WordPress backend. No production submission was sent.
- The video `/mnt/data/Recording 2026-10-08 160007.mp4` is unavailable in this local task. The scroll timeline and illustrated hand are provisional and have not been matched frame-by-frame to that video. The hand currently illustrates reaching/picking up; a final realistic hand model/clip is still needed for that art direction.
- The three supplied earlier image references were retrieved from the linked conversation and visually inspected. Their invented/rephrased wording is never used as content. Footer illustration is a provisional CSS/SVG scene, not a replica of their artwork.
- Vercel is not connected in this task. GitHub Pages provides the independent review URL; production-domain approval is still required before any later switch.

## Branding

Five supplied PNG logo variations are retained verbatim in `public/brand/`. The supplied SVG version 05 is used on the light header. The token artwork comes from the same supplied brand directory, not a drawn imitation. Original files are never recolored or distorted. Header SVG is rendered at 150 × 150 px; the mark's visible height is approximately 83 px, above the guide's 75.6 px digital minimum. Native artwork whitespace is retained; compare clear-space geometry with guide pages 5 and 9 during final review. Token art is mapped as a whole to the coin, preserving its native whitespace and proportions. A green or blue accent is never used as body text on white.

CI: Indigo Night #171C8F, Enthusiasm Green #00FFAC, Ethereal White #F0F6F7, Tech Blue #097EF6. Kanit applies to Thai and English text; icon fonts are preserved for icons. Contrast uses indigo/white and dark ink/light surfaces. Complete accessibility and screenshot review remain separate from static equality.

## Presentation compatibility repairs

- Remove original analytics in the review preview and the original invalid `alert(\'JS Loaded\');` development script.
- Qualify global `$()` calls in the original blog presentation script as `jQuery()` to work with WordPress noConflict.
- Make original entrance-animation elements visible in the static preview, without exposing sections marked hidden for their original device breakpoints.
- Keep original SEO title, description, canonical and alternate language declarations; set the independent review preview to noindex/nofollow.
- Preserve the production domain. No DNS, CNAME, production deployment or PR merge is performed.

See `manifest.json` for download failures. Some source decorative URLs already return 404. Failed decorative assets are not replaced with invented content.
