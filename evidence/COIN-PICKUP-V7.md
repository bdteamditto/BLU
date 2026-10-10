# V7 local coin pickup concept

Uses the supplied blue watercolor coin reference, with transparent cutouts produced through built-in image_gen. Separate hand layer enters only after scrolling. Floating coin settles before grip; both layers lift together before the next original content section.

Preview: http://127.0.0.1:4175/?v=7

Homepage motion checked at 1440 and 390 px widths: initial hand opacity 0; grip opacity 1; no horizontal overflow. Screenshots: evidence/screenshots/v7-{float,grip,exit,next}-{1440,390}.png. Static source validation passes; this does not certify image text or live form submission. No remote deployment changes; awaiting visual review.

Coin prompt: Background removal only. Preserve supplied blue coin shape, symbol, color, watercolor texture and rim; transparent background.
Hand prompt: Extract watercolor hand and wrist, remove coin and black background, retain pinch pose; transparent background.

Generated originals: exec-6f979366-68d2-4ad5-9752-a1eb3a12b6cc.png and exec-b747c5fe-377f-4dd3-a4f1-e33cadac4ee8.png under Codex generated_images/01a11ad9-9994-72f0-8d2d-c9b7d4ceb569. Workspace assets: public/art/blue-coin-v7.png and pinching-hand-v7.png.
