# Hero image — generation brief

Goal: a **cut-out portrait with a transparent background**, in the style of the
portfolio hero sections on Dribbble/Figma — person floating over a brand-coloured
shape rather than sitting inside a photo frame.

Reference photo to upload: **`src/assets/phote5.jpeg`** (the suit photo).
It has the largest, sharpest, unobstructed front-facing face with direct eye
contact — that's what identity-preserving models lock onto.

---

## The prompt

Upload `phote5.jpeg` as the reference image, then paste:

```
Professional studio portrait of the man in the reference photo. Preserve his
exact facial features, skin tone, facial hair and hairstyle — this must be
clearly recognisable as the same person.

Framing: three-quarter body, from mid-thigh up, standing, squared to camera.
Pose: confident and relaxed, arms crossed at chest.
Expression: calm, self-assured, slight closed-mouth smile, direct eye contact.
Wardrobe: well-fitted charcoal blazer over a plain black crew-neck shirt.
Modern, minimal, no patterns, no visible branding.

Lighting: clean studio setup. Large soft key light from the front left, gentle
fill on the right, and a subtle magenta rim light (#e748c8) tracing the right
edge of his shoulder, arm and hair to separate him from the background.

Background: completely plain and empty. No scenery, no props, no text, no logos.

Composition: entire figure inside the frame with even margins. Do not crop the
head, hands or elbows. Sharp focus throughout.

Photorealistic, shot on an 85mm lens at f/4, high detail, 4K.
```

Then add, as a second line if the tool allows it:

```
Do not alter his face. Keep the head and facial proportions identical to the
reference.
```

If your tool supports alpha output, append:

```
Output as a PNG with a fully transparent background (alpha channel).
```

---

## Pose variants

Swap the **Pose** line. A is the safest and most common in the references.

| | Pose line |
|---|---|
| **A** | `confident and relaxed, arms crossed at chest` |
| **B** | `standing at a slight angle, hands in trouser pockets, shoulders relaxed` |
| **C** | `one hand in pocket, the other relaxed at his side, weight on one leg` |
| **D** | `seated on a simple stool, leaning slightly forward, forearms on knees, hands loosely clasped` |

**D is the highest-fidelity option** — it's closest to the reference photo's
actual pose, so the model has to invent less and your face survives better.
Standing poses (A–C) look more like the Dribbble examples but drift more.

---

## Tools, ranked for this job

| Tool | Why |
|---|---|
| **Gemini image ("Nano Banana")** | Best at "keep this exact person, change everything else". You're already in Google. |
| **Flux Kontext** | Purpose-built for editing an existing photo while preserving identity. Best fidelity. |
| **ChatGPT (GPT Image)** | Upload the photo and paste the prompt. Good adherence, easy. |
| **Midjourney** | Needs `--cref <image-url> --cw 100` for character reference. Most stylised, least faithful. |

---

## ⚠️ About transparency

**Most image generators cannot actually output an alpha channel.** They will hand
you a solid background even when you ask for transparency. Plan on two steps:

1. **Generate** on a plain background. Ask for **plain solid white** — it cuts
   more cleanly than grey or gradient, especially around dark hair against a
   dark edge.
2. **Remove the background:**
   - **macOS (fastest):** right-click the file in Finder → *Quick Actions* →
     *Remove Background*. Produces a PNG with alpha, no upload, no account.
   - remove.bg — good edge detection on hair
   - Photoshop / Photopea → *Remove Background*
   - Adobe Express (free tier)

Tools that *can* export real transparency directly: **Recraft**, **Adobe
Firefly**, **Ideogram**.

### Check the edges

Zoom to 200% around the **hair and shoulders** before you ship it. Bad cutouts
show a pale halo or chewed-up hair edges, and it reads as cheap — worse than the
photo you have now.

---

## Output spec

- **Resolution:** at least **1200 × 1600**; 2000px tall is better. The hero
  renders at 450×550 CSS px but must stay sharp on 2× and 3× displays.
- **Format:** PNG with alpha → then convert to **WebP** for size (`cwebp` or
  Squoosh). PNG cut-outs are often 2–4 MB; WebP gets that under 300 KB.
- **Save to:** `src/assets/hero-cutout.webp` (keep the PNG as a source file
  outside `src/`, or in `docs/`).

---

## The non-AI option — genuinely worth considering

Take a **real photo against a plain light wall**, then run macOS *Remove
Background* on it. Five minutes, zero cost, and it's actually you.

AI-generated portraits of yourself carry two risks on a portfolio specifically:
they often land in uncanny-valley territory around hands and ears, and if a
recruiter meets you and you don't quite match your own site, that's an awkward
first impression. Your face is the one asset on this site that doesn't benefit
from being synthetic.

A real photo + a clean cutout gets you the same Dribbble look with none of that.

---

## CSS work this triggers

The current hero image is a **450×550 ellipse** with `overflow: hidden`, a border
and a glow (`src/components/hero/Hero.css`). A transparent cut-out needs the
opposite treatment — the figure should float free:

- Remove `border-radius: 50%`, `overflow: hidden`, and the border from
  `.hero-image`
- Remove `border-radius: inherit` from `.hero-image img` (added in Phase 0)
- Keep a **radial magenta glow behind** the figure via `::before` so he reads
  against the dark background — this is what the reference designs all do
- Let the image slightly overflow the section bottom for depth
- Re-check mobile: cut-outs need more vertical room than a cropped circle

Do this as part of **Phase 2**, once the image exists.
