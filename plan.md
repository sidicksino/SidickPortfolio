# Portfolio Improvement Plan

Audit date: 2026-09-07 · Branch: `main`

This plan is ordered by **impact per hour**. Phase 0 is the highest ratio on the
list — roughly 40 minutes of work that removes everything currently reading as
"broken". Do the phases in order; each one assumes the previous is done.

Every finding below was verified by running the dev server and screenshotting
the live site at 1440×900 and 390×844, in both themes — not by reading CSS.

**How to work through this:** tick boxes as you go. After each phase, re-run the
verification in [Appendix A](#appendix-a--how-to-verify-a-change) and actually
look at the screenshot before ticking.

---

## Progress tracker

Update this table whenever a phase starts or finishes. Status markers:

| Marker | Meaning |
|---|---|
| ✅ **Done** | Implemented **and** verified in a browser, not just written |
| 🚧 **In progress** | Started, not finished — note what's left |
| ⬜ **Not started** | — |
| ⏸️ **Blocked** | Waiting on a decision, asset, or answer |

| Phase | Status | Finished | Notes |
|---|---|---|---|
| 0 — Critical fixes | ✅ **Done** | 2026-09-07 | All 5 items verified in-browser |
| 1 — Design system | ⬜ Not started | — | Next up |
| 2 — Apply the system | 🚧 **In progress** | — | Hero cut-out done early; colour work still pending |
| 3 — Show the work | ⬜ Not started | — | **Biggest win** |
| 4 — Typography | ⬜ Not started | — | |
| 5 — Light mode | ⬜ Not started | — | |
| 6 — Polish & a11y | ⬜ Not started | — | |
| 7 — Repo hygiene | ⬜ Not started | — | |

### Environment setup

- ✅ **Context7 MCP installed** (2026-09-07) — user scope, health check passing.
  Useful for GSAP / i18next / Tailwind v4 docs. Tools register on session
  restart.
- ✅ **Project design skill** at `.claude/skills/portfolio-design/SKILL.md` —
  loads automatically when design work starts in this repo.
- ⚠️ `node_modules/` installed; `package.json` gained an `allowScripts` block
  (esbuild / @tailwindcss/oxide / fsevents). Vite won't build without it — keep.

---

## Phase 0 — Critical: things that read as broken ✅ **DONE** (2026-09-07)

These are not matters of taste. Each one makes a visitor think the site is
malfunctioning.

> **Verified:** transform sampled twice 3s apart — `none` both times (not
> spinning). `#skills h2` lands at 96px, clear of the 80px navbar. Lint clean,
> console clean, zero failed requests. Hero screenshotted and inspected.

### 0.1 Stop the portrait from spinning ✅ **Done**

`src/components/hero/Hero.css:222` rotates your headshot two full turns per
minute, forever:

```css
.hero-image {
  animation: spin 60s infinite;   /* ← delete this line */
}
```

Every visitor lands on your face at a random angle. It does not read as a design
choice; it reads as a bug.

- [x] Delete `animation: spin 60s infinite;` from `.hero-image`
- [x] Delete the now-unused `@keyframes spin` block
- [x] Check `.hero-image:hover { transform: scale(1.03) }` still works — it was
      fighting the animation for the same `transform` property

> **⚠️ Latent bug this uncovered.** Removing the animation revealed that the
> portrait was no longer clipped to its ellipse — it rendered as a hard-edged
> rectangle. Cause: the `<img>` is composited (it has `transition: transform`),
> so in Chrome it escapes a *non-composited* parent's `border-radius` +
> `overflow: hidden` clip. The `spin` animation had been promoting `.hero-image`
> to its own layer, accidentally masking the bug for as long as it existed.
>
> **Fix applied:** `border-radius: inherit` on `.hero-image img`, so the image
> rounds itself rather than relying on the parent's clip. Verified by
> screenshotting the element directly.
>
> *Lesson: never assume removing a line is safe because it "only" removed an
> animation. Look at the rendered result.*

### 0.2 Fix anchor navigation landing under the navbar ✅ **Done**

There is no `scroll-margin-top` anywhere in `src/`. The navbar is fixed at 80px,
so clicking "Skills" scrolls the heading *underneath* it — confirmed in the
screenshot, the "My Skills" title is cut in half.

- [x] In `src/index.css`, add to the `section` rule: `scroll-margin-top: 96px;`
- [x] Add `html { scroll-behavior: smooth; }`
- [x] Test nav links — measured `#skills h2` at **96px** after a click (was
      tucked under the 80px navbar before)
- [x] Bonus: wrapped `scroll-behavior` in `prefers-reduced-motion: reduce` so
      smooth scrolling is disabled for users who ask for less motion

### 0.3 Replace the hero photo ✅ **Done**

The current hero image (`src/assets/sidick.jpg`) is a casual restaurant photo —
a drink, a plant, and a phone in shot. The photo already in your **About**
section (suit, seated, clean background) is far stronger.

- [x] Swapped hero from `sidick.jpg` → `phote5.jpeg` (the suit photo)
- [x] Added `object-position: center 22%` so the face sits correctly inside the
      ellipse crop instead of being centre-cropped to the torso
- [ ] *Optional, later:* a purpose-shot headshot framed chest-up would be
      stronger still — the current one is a full-body seated shot
- [ ] *Optional:* `phote5.jpeg` now appears in both Hero and About — consider
      giving About a different second photo

### 0.4 Remove emoji from section headings ✅ **Done**

"My Projects ✨" and "Contact ✨" cost credibility and add nothing. The
sparkle is in the `<h2>` content.

- [x] Removed ✨ from the Projects heading (`Projects.jsx:22`)
- [x] Removed ✨ from the Contact heading (`Contact.jsx:65`)
- [x] Removed ✨ from the **Skills** heading too — wasn't in the original audit
      but had the same pattern (`Skills.jsx:21`)
- [x] Checked locales — the emoji were hard-coded in JSX, not in the JSON
      strings, so no translation changes needed

`grep -rn '✨' src/` now returns nothing.

### 0.5 Remove the green dot beside the logo ↩️ **Reverted — keeping it**

> **Sidick's call (2026-09-07): the green dot stays.** It was removed, then
> restored on request. This overrides the original recommendation — it's his
> brand and he likes it. Recorded here and in
> `.claude/skills/portfolio-design/SKILL.md` so it doesn't get stripped out
> again by a future pass.
>
> Restored in both `Navbar.jsx` and `HeroPage.jsx`, with two improvements over
> the original:
> - the pulse is now wrapped in `prefers-reduced-motion: no-preference`
> - `HeroPage.css`'s `.nav-logo` was missing `position: relative`, so the
>   absolutely-positioned dot would have anchored to the *fixed navbar* instead
>   of the logo. Added. (The bug was latent — it never showed because the dot
>   pre-dated that stylesheet's layout.)

<details>
<summary>Original recommendation (superseded)</summary>

A lone green circle next to "SidickSino" that belongs to no other colour on the
page.

- [x] Removed. It was `aria-hidden="true"` and carried no meaning — purely
      decorative, in a colour matching nothing else, pulsing infinitely.
- [x] Removed from **both** `Navbar.jsx` and `HeroPage.jsx` (it was duplicated),
      plus the `.nav-active` rules and `@keyframes navPulse` in both stylesheets

If you do want an "available for work" badge later, build it as a labelled pill
in `--accent` with real text — not an unexplained coloured dot.

</details>

---

## Phase 1 — Build one real design system

The root problem: **33 distinct hex values** and no rule about which to use
where. This phase replaces guesswork with tokens. Everything after depends on it.

### 1.1 Kill the rogue navy blue

`src/index.css:19` defines `--border: #0033a0` — a saturated navy in an
otherwise magenta/violet palette. It is currently the contact form's input
borders and the line under the navbar. It matches nothing.

- [ ] Replace with a neutral: `--border: rgba(255, 255, 255, 0.10);`
- [ ] Light mode: `--border: rgba(17, 17, 17, 0.12);`
- [ ] Grep for hard-coded `#0033a0` and remove every instance

### 1.2 Adopt this token set

Replace the `:root` block in `src/index.css`. **One accent colour.** Magenta is
your brand — it's in the logo — so everything interactive is magenta and nothing
else is.

```css
:root {
  /* Accent — the ONLY chromatic colour for UI */
  --accent:        #e748c8;
  --accent-hover:  #f087dd;
  --accent-press:  #b52a9d;
  --accent-subtle: rgba(231, 72, 200, 0.12);

  /* Surfaces — dark */
  --bg:        #12112a;
  --surface:   #1b1a3a;
  --elevated:  #232245;

  /* Text */
  --text:      #ffffff;
  --text-2:    #b8b6d4;
  --text-muted:#7d7a9e;

  /* Lines */
  --border:    rgba(255, 255, 255, 0.10);

  /* Status — ONLY for success/error messages, never decoration */
  --success: #4ade80;
  --error:   #f87171;

  /* Type */
  --font-display: "Elsie", Georgia, serif;
  --font-body:    "Epilogue", system-ui, sans-serif;

  /* Spacing — 4px base */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;

  --radius:    12px;
  --radius-lg: 20px;
}
```

- [ ] Replace `:root` with the above
- [ ] Update `html.light-theme` to override **only** `--bg`, `--surface`,
      `--elevated`, `--text`, `--text-2`, `--text-muted`, `--border`
- [ ] Never redefine `--accent` per theme — the brand colour is constant

### 1.3 The rule to hold from here on

> **One accent.** Differentiate categories by *icon* and *label*, never by hue.
> Colour carries meaning (interactive / success / error) — not decoration.

---

## Phase 2 — Apply the system, remove the colour chaos 🚧 **In progress**

### 2.0 Hero cut-out portrait ✅ **Done** (2026-09-07)

Pulled forward because a new hero image was generated. See
[`docs/hero-image-prompt.md`](docs/hero-image-prompt.md) for the brief used.

- [x] Generated a studio portrait (charcoal blazer, arms crossed, magenta rim
      light) from `phote5.jpeg` as the identity reference
- [x] **Background removed locally** via Apple's Vision framework
      (`VNGenerateForegroundInstanceMaskRequest`) — the same engine behind
      Finder's *Remove Background*. No upload, no third-party service.
      Trimmed to subject: **638 × 1404**.
- [x] Converted to WebP: **1.1 MB → 119 KB**, no visible loss
- [x] `src/assets/hero-cutout.webp` (chosen), `hero-cutout-half.webp` (waist-up
      alternative), full-res master kept at `docs/hero-cutout-source.png`
- [x] Reworked `.hero-image`: removed the ellipse frame, `overflow: hidden`,
      border and the Phase-0 `border-radius: inherit`. The figure now floats
      over a magenta radial glow — the glow is what separates him from the
      background instead of a frame.
- [x] Glow animation now animates **opacity only** and is wrapped in
      `prefers-reduced-motion: no-preference`
- [x] Rebuilt all four responsive breakpoints — they set a fixed `height` for
      the old circle, which would have squashed the cut-out's aspect ratio

> **Mobile ordering fixed.** The stack put the image *above* the text on small
> screens, so the 484px-tall portrait pushed your name below the fold — a
> visitor's first screen was a photo with no context. Flipped it: headline,
> tagline and buttons now come first (h1 at 140px, buttons done by 520px on a
> 844px viewport), portrait follows.

Edge quality checked at 300% on hair and shoulders — individual strands
preserved, no halo on dark or light. Verified at 1440 / 992 / 390 px in both
themes; console clean, no failed requests, no horizontal overflow.

#### 2.0a Full-bleed hero background ✅ **Done** (2026-09-07)

Spotted by Sidick: the grid pattern stopped short of the screen edges.

**Cause:** `.hero` is capped at `max-width: 1400px; margin: 0 auto`, and both
`.hero::before` (the grid) and `.hero::after` (the radial glow) used
`inset: 0` — so they were clipped to the 1400px content box rather than the
viewport. Invisible below 1400px, obvious above it.

| Viewport | Bare gutter each side (before) |
|---|---|
| 1280 | 0 — fine |
| 1440 | 20px |
| 1512 (MacBook 14") | 56px |
| 1920 | **260px** |
| 2560 | **580px** |

- [x] Both pseudo-elements now break out to `width: 100vw` via
      `left: 50%; transform: translateX(-50%)`
- [x] Verified full-bleed at 1280 / 1440 / 1512 / 1920 / 2560
- [x] Confirmed **no horizontal overflow** introduced at any width
      (`html, body { overflow-x: hidden }` in index.css contains the
      scrollbar-width difference)

#### 2.0b Hero height — viewport-driven ✅ **Done** (2026-09-07)

The hero was a fixed **1073px tall on every device**, because height came from
the image (924px) plus 150px of padding — the viewport had no say. On a
1280×800 laptop that's 1.34× the screen, and `#about` never peeked above the
fold on *any* device, so nothing invited a scroll.

- [x] `.hero` now has `min-height: calc(100vh - 80px)`
- [x] Top padding 150px → **110px** (the 150 was sized for the old circle)
- [x] `.hero-image` is height-driven: `width: auto`, and the img takes
      `max-height: calc(100vh - 280px)` so the portrait scales to the screen
      and can never push the hero past one viewport
- [x] Glow scales with it: `min(520px, 58vh)`
- [x] Fixed the 1200px breakpoint's `padding: 200px` (worse than the base rule)
- [x] Converted every breakpoint's fixed `width` to `max-width` so the
      height cap wins

| Device | Before | After | Portrait |
|---|---|---|---|
| 1280×800 | 1.34× | **0.90×** | 236×520 |
| 1440×900 | 1.19× | **0.91×** | 282×620 |
| 1512×982 | 1.09× | **0.92×** | 319×702 |
| 1920×1080 | 0.99× | **0.93×** | 364×800 |

`#about` now peeks above the fold on every desktop size, and the portrait
*grows* on bigger screens instead of being frozen.

**Known trade-off:** tablet (1.06×) and phone (1.26×) still exceed one screen.
That's deliberate — capping them to 100vh would shrink the portrait to ~150px
wide. The name, tagline and buttons are all above the fold there, which is what
matters; the portrait below is a scroll reward.

**Still open from this work:**

- [ ] The generated expression is neutral-stern rather than the "slight smile"
      the prompt asked for — worth a regeneration if you want warmer
- [ ] Crop lands just above the knee (cropping near a joint); masked by the
      section fade, but a mid-thigh or waist crop would be tidier
- [ ] `phote5.jpeg` is now free again — it's still in About

### 2.1 Unify the four "View Project" buttons

Currently blue, purple, pink and orange — on a single row. This is the single
most amateur-looking element on the site. Their icons are mismatched too.

- [ ] All four buttons → `var(--accent)`
- [ ] All four icons → `var(--accent)`
- [ ] Keep the icon *shapes* different (laptop / phone / brush / brain) — shape
      is what should distinguish them

### 2.2 Unify the About icons

Magenta, green and brown across three adjacent items.

- [ ] All three → `var(--accent)` on `var(--accent-subtle)` circles

### 2.3 Audit every remaining colour

- [ ] `grep -rhoE "#[0-9a-fA-F]{3,8}" src/ | sort -u` — should end up under ~12
- [ ] Replace every survivor with a token
- [ ] Any colour that isn't accent, a surface, text, or a border: delete it

---

## Phase 3 — Show the work, not the categories

**The most valuable content change on this list.**

`src/data/projectData.js` holds **19 real projects** with screenshots, tech
stacks and live URLs — AAPT, Royal School, SinoCoffee, TchadInfos, SinoAgency,
Pima Diabetes, and more. None of them appear on the homepage. Instead visitors
get four cards of generic copy ("Ultra-fast, secure, and elegant web
applications") and have to click to find anything real.

A recruiter gives you about eight seconds. Right now those eight seconds contain
zero evidence that you have built anything.

- [ ] Add a **Featured Projects** grid to the homepage: pick your 3–6 strongest
- [ ] Each card: screenshot, name, one-line outcome, 3 tech tags, live link
- [ ] Move the four category cards *below* the featured grid, or replace them
      with a single "See all 19 projects →" link
- [ ] Write real one-liners — what it does and for whom, not adjectives.
      "Bilingual news platform for Chad, 2k monthly readers" beats
      "ultra-fast and elegant"
- [ ] Make the whole card clickable, not just the button

---

## Phase 4 — Typography

Verified in the browser via `getComputedStyle`, not guessed.

### 4.1 Body text is falling back to Arial

`src/index.css:66` sets `font-family: Arial, sans-serif` on `html, body` — while
you load Epilogue from Google Fonts. Anything without an explicit token gets
Arial.

- [ ] Change to `font-family: var(--font-body);`

### 4.2 Stop setting body copy in a display serif

Computed styles show `<p>` rendering in **Elsie at 28.8px** — a decorative
display serif at near-heading size. Elsie is good for headings; it is tiring to
read in paragraphs, and it's the source of the odd circular glyph artifact
visible in "Projects", "Subject" and "Contact".

- [ ] Restrict `--font-display` to `h1`/`h2` only
- [ ] All `<p>`, labels, buttons, nav → `--font-body`
- [ ] Body copy: 16–18px, `line-height: 1.6`, `max-width: 65ch`

### 4.3 Fix the phantom font

`@font-face` for `"Cheap Fire"` points at `./assets/fonts/CheapFire.ttf`, which
**does not exist** — the path resolves relative to each CSS file. It is declared
in 5 separate files and silently falls back.

- [ ] Delete the `@font-face` block from all 5 files, or ship the actual .ttf
- [ ] `"Modern Negra"` is used in `Art.css` with no `@font-face` at all, though
      the file sits in `public/fonts/` — declare it or drop it
- [ ] `"DM Serif Text"` in `Art.css` is never imported — drop it

### 4.4 De-duplicate the font imports

The Google Fonts `@import` is repeated across **10 CSS files**.

- [ ] Delete every `@import url("https://fonts.googleapis.com/...")` from
      component CSS
- [ ] Move to `<link rel="preconnect">` + one `<link>` in `index.html` — this is
      faster than `@import`, which blocks rendering in a chain

---

## Phase 5 — Light mode

Currently an afterthought, and it shows.

- [ ] **"More About Me" is black text on magenta** — the `--text` token flips
      but the button assumes dark mode. Set button text explicitly to white in
      both themes.
- [ ] **The theme toggle turns blue** in light mode — pin it to `var(--accent)`
- [ ] The near-white background is washed out — use `--bg: #faf9fc` with real
      `--surface` separation so cards are visible
- [ ] Re-check contrast on every muted text colour once flipped
- [ ] **If you can't give light mode real attention, ship dark-only.** A good
      dark theme beats a good dark theme plus a broken light one.

---

## Phase 6 — Polish, accessibility, performance

- [ ] **Reduced motion:** wrap all entrance animations in
      `@media (prefers-reduced-motion: no-preference)`. Currently unconditional.
- [ ] **Contrast:** check `--text-muted` on `--bg` hits 4.5:1 (WebAIM checker)
- [ ] **Focus rings:** `* { outline: none }` patterns break keyboard nav —
      ensure a visible `:focus-visible` style on links, buttons, inputs
- [ ] **Form labels:** confirm each contact input has a real `<label for>`
- [ ] **Images:** the assets are large PNG/JPG. Convert to WebP, add explicit
      `width`/`height` to stop layout shift, keep `loading="lazy"` below fold
- [ ] **Horizontal overflow:** `body.scrollWidth` is 1968px vs a 1440px
      viewport. Mostly off-screen animation start states masked by
      `overflow-x: hidden` — confirm none of it is reachable on mobile
- [ ] **`<html lang="fr">`** in `index.html` is hard-coded while the site
      defaults to English — sync it with i18next on language change

---

## Phase 7 — Repo hygiene

- [ ] **`README.md` is still the stock Vite template.** It's the first thing a
      recruiter sees on GitHub. Replace with: what the site is, live URL,
      screenshot, stack, and how to run it.
- [ ] `plan.md` (this file) — decide whether to keep it tracked or gitignore it
- [ ] `npm audit` reports 16 vulnerabilities (1 critical) — review
- [ ] Remove the commented-out `<Art />` in `src/App.jsx:43` or finish it

---

## Appendix A — How to verify a change

Do not trust the CSS; look at the rendered page. This is how every finding above
was confirmed.

```bash
npm run dev          # http://localhost:5173
```

Then screenshot at 1440×900 and 390×844, in both themes, and **look at the
image**. A full-page screenshot will show blank sections — that is an artifact
of scroll-triggered reveals not firing, not a bug. Scroll to each section first.

Check after every phase:
- [ ] Hero, About, Skills, Projects, Services, Contact — dark
- [ ] Same six — light
- [ ] Same six — 390px wide
- [ ] Browser console clean, no failed requests

---

## Appendix B — Using the design skill

For Phase 3 (featured projects grid) and any section you want to *redesign*
rather than patch, mock it up before writing CSS.

Run:

```
/design
```

…and describe the section. It produces a multi-artboard canvas you can edit
visually — click elements, change type and colour, undo/redo — then export.
Iterating on a mockup is much cheaper than iterating in CSS.

Good candidates:
- The featured-projects card and grid (Phase 3)
- A rebuilt hero once the spin is gone and the photo is swapped
- Light-mode surface treatment (Phase 5)

The project's own design rules live in
`.claude/skills/portfolio-design/SKILL.md` and are loaded automatically when
design work starts in this repo — keep that file in sync with any token change
made in Phase 1.

---

## Suggested order

| Session | Phases | Outcome |
|---|---|---|
| 1 (~40 min) | Phase 0 | Nothing looks broken any more |
| 2 (~1.5 h)  | Phase 1 + 2 | Looks deliberately designed |
| 3 (~2 h)    | Phase 3 | Actually sells your work — biggest win |
| 4 (~1 h)    | Phase 4 | Reads well |
| 5 (~1 h)    | Phase 5 + 6 | Solid in every theme and device |
| 6 (~30 min) | Phase 7 | Presentable on GitHub |

If you only ever do two: **Phase 0 and Phase 3.**
