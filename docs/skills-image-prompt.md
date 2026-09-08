# Skills image — generation brief (v3)

**v2 fixed the layout.** Spelling out the rotated 3×3 grid, the 1-2-3-2-1 row
counts and a required half-cube gap produced a correct diamond — attempt 1 had
packed everything into a honeycomb wrapped in a white halo. Keep that section
of the prompt verbatim; it works.

**v3 only swaps one icon:** Expo out, TypeScript in. Expo's mark came back as a
generic starburst, twice — it isn't distinctive enough for a generator to draw
from its name.

Reference to upload: **`src/assets/skills.webp`** (the image on the site now).

---

## What the reference actually is

These are the properties that must survive:

| | |
|---|---|
| Size | 600 × 402 (landscape, ~3:2) |
| Background | **transparent** — 83% of the canvas is empty |
| Style | isometric 3D rounded cubes, soft pastel gradients, flat white mark on top |
| Count | **9 cubes** |
| Layout | a 3×3 grid **rotated 45°** — a diamond, rows of **1 · 2 · 3 · 2 · 1** |
| Spacing | **clear gaps** — no cube touches another |

The spacing and the gaps are what the first attempt lost. The cubes in the
reference float as separate objects; the generated ones were fused into a
honeycomb slab.

---

## The prompt

Upload `skills.webp` as the reference, then paste this whole block:

```
Recreate this illustration in exactly the same style, with different icons.

STYLE — match the reference precisely:
Isometric 3D cubes with softly rounded corners, all drawn at the identical
isometric angle and all exactly the same size. Each cube has a smooth pastel
gradient across its top face — teal, mint green, lavender, purple, magenta
pink, cyan, coral orange — with slightly darker shaded left and right faces to
give depth. A single flat white icon sits centred and flat on each cube's top
face, following the same isometric perspective as the cube.

LAYOUT — this is the most important instruction:
Arrange the nine cubes as a 3×3 grid rotated 45 degrees, forming a diamond.
Reading top to bottom, the rows contain 1, then 2, then 3, then 2, then 1 cube.
Leave a clear empty gap of roughly half a cube's width between every cube.
The cubes must be visually separate, floating objects — they must NOT touch,
overlap, interlock, or form a honeycomb. Even, regular spacing throughout.

ICONS — one per cube:
  · Python — the two interlocking snakes
  · TensorFlow — the angular "TF" mark
  · Pandas — three vertical bars of differing heights, no frame
  · Power BI — four ascending vertical bars, drawn in white, with NO
    surrounding box, frame or rounded rectangle around them
  · React — the atom with elliptical orbits
  · JavaScript — the letters "JS"
  · Node.js — the hexagon mark
  · Figma — the stacked coloured shapes, drawn in white
  · TypeScript — the letters "TS" in a rounded square

BACKGROUND — plain solid white. Nothing else.
No glow, no halo, no aura, no light bloom, no coloured mist, no drop shadow on
the ground, no reflection, no grid, no text, no labels outside the cubes.

COMPOSITION: landscape, roughly 3:2, cluster centred with even margins.
Clean, flat, modern vector illustration. High resolution.
```

---

## Why these nine

The image on the site now is **all front-end** — JS, HTML, CSS, Figma, React,
Node — while the Skills section leads with Data Science. That mismatch is the
reason to redo it. But an all-data-science image is the same mistake reversed.

The site already states the split, so the picture should match it: the About
tile says **Data** and **Product**; Skills lists data, frontend and backend.

| | |
|---|---|
| **Data (4)** | Python · TensorFlow · Pandas · Power BI |
| **Product (5)** | React · JavaScript · TypeScript · Node.js · Figma |

**R is out**, per Sidick, and Power BI takes its place — Power BI is already in
the Skills list under Data Science & Visualization.

Every one of the nine is genuinely in the Skills section or the project data:
TypeScript appears in 3 projects, Figma in 4, React in 5, Node.js in 5.

**Expo was dropped after attempt 2.** Its mark came back as a generic
starburst — and the honest reason is that Expo's logo isn't distinctive enough
for a generator to reproduce from a name alone. "TS" is two letters in a
square, the same shape class as "JS", which has rendered perfectly every time.
Pick marks a model can actually draw.

**React Native is deliberately absent** — its logo is the same atom as React,
so it would read as a duplicate cube. React covers both.

---

## What to expect, and what to do about it

**The layout is the thing to check first.** Look at the result and ask: are
there clear gaps between all nine cubes, and do the rows read 1-2-3-2-1? If
they're touching or honeycombed, regenerate — that instruction is the one the
model is most likely to drop.

### How accurate does a logo need to be here?

Each icon renders at roughly **53px** on the page — the cluster is ~555px wide,
so each cube is ~139px and the mark inside it about a third of that. A favicon
is 32px; brand marks stop being identifiable somewhere around 40–50px.

So brand accuracy matters far less than **semantic legibility**. Power BI came
back as a chart inside a frame rather than the real ascending-bars mark, and
Pandas as generic data bars — neither is correct, and at 53px neither is
noticeable. Both read as "charts / data", which is the job.

Expo failed on a different axis: its starburst read as *nothing at all*. That's
the line worth holding — a mark that's approximately right is fine, a mark that
communicates nothing is not.

**Icons render better than expected.** Across two attempts, clean results for
Python, TensorFlow, Jupyter, Tableau, Power BI, React, JS, Node and the
scatter plot. **Pandas and Figma are approximate but acceptable.**

The failure mode is logos without a simple, memorable geometry — Expo came back
as a meaningless starburst twice over. If a cube is unreadable, don't fight it:
ask for that one as a plain symbol instead — a bar chart, a scatter plot, a
neural-network node graph, a database cylinder. They generate cleanly and still
read as the right kind of work.

**Ask for white, not transparent.** Generators mostly ignore the transparency
instruction, and the first attempt "solved" it with a fake halo. A plain white
background cuts cleanly — send it to me and I'll remove it locally with Apple's
Vision framework, the same way I did the hero portrait. No upload, no
third-party service.

---

## Output spec

- **At least 1200 × 800.** The current file is only 600 × 402 and renders at
  ~555px wide, so it's already soft on a retina screen.
- Landscape, close to **3:2**
- Send it over however is easiest — I'll cut out the background, convert to
  WebP and wire it in.

---

## A separate bug I'll fix at the same time

The current image is **stretched by 36%**. `.skills-img` sets
`width: 550px; height: 500px` with no `object-fit`, forcing a 1.49-ratio image
into a 1.10 box — every cube is squashed. The class sits on **both** the
wrapper and the `<img>`, which is how it went unnoticed.

Whatever image lands, I'll fix that so the replacement isn't distorted the same
way, and keep the existing float animation.

---

## The alternative, still worth considering

Generated logos are always approximate. The crisp version is to **build the
cluster in code** — real SVG logos on CSS-transformed cubes. Sharp at any size,
animates identically, adapts to light and dark themes, and shows the actual
marks rather than an AI's impression of them. It also makes the layout exact by
construction, which is the very thing the generator keeps getting wrong.
