# V7 local coin pickup concept

Uses the supplied blue watercolor coin reference, with transparent cutouts produced through built-in image_gen. Separate hand layer enters only after scrolling. Floating coin settles before grip; both layers lift together before the next original content section.

Preview: http://127.0.0.1:4175/?v=7

Homepage motion checked at 1440 and 390 px widths: initial hand opacity 0; grip opacity 1; no horizontal overflow. Screenshots: evidence/screenshots/v7-{float,grip,exit,next}-{1440,390}.png. Static source validation passes; this does not certify image text or live form submission. No remote deployment changes; awaiting visual review.

Coin prompt: Background removal only. Preserve supplied blue coin shape, symbol, color, watercolor texture and rim; transparent background.
Hand prompt: Extract watercolor hand and wrist, remove coin and black background, retain pinch pose; transparent background.

Generated originals: exec-6f979366-68d2-4ad5-9752-a1eb3a12b6cc.png and exec-b747c5fe-377f-4dd3-a4f1-e33cadac4ee8.png under Codex generated_images/01a11ad9-9994-72f0-8d2d-c9b7d4ceb569. Workspace assets: public/art/blue-coin-v7.png and pinching-hand-v7.png.

## Online review preview, 2026-10-10

Published at https://bdteamditto.github.io/BLU/v7/?v=7 for review from iPhone. Existing root preview and blufinance.co are unchanged. Source commit: 746305a4fde984b1695fa36a9d3a8124c420772a. Deployment workflow commit: 640f49d11bc07a85400f28d3fc2ab52e20bc250f. Successful deployment: https://github.com/bdteamditto/BLU/actions/runs/38046348624. Draft PR: https://github.com/bdteamditto/BLU/pull/6.

Online mobile emulation check: HTTP 200, coin and hand assets loaded, initial hand hidden, grip hand visible, next section appears with original 17,531.04 text; no failed local-preview resource requests and no horizontal overflow. This uses Chromium at an iPhone viewport, not a physical Safari test. Full result: evidence/v7-online-mobile-check.json.
