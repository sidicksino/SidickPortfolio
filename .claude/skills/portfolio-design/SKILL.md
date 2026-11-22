---
name: portfolio-design
description: The design system for the SidickSino portfolio - colour tokens, typography scale, spacing, motion and component rules. Load before writing or changing any CSS, JSX styling, layout or visual design in this repo, and before running /design to mock up a section. Use when asked to restyle, redesign, "make it look better", fix the design, adjust colours or spacing, or build a new section.
---

# SidickSino Portfolio — Design System

Rules for keeping this portfolio visually coherent. Rewritten 2026-11-22 for
the **"Portal" redesign**, which Sidick chose from a canvas of options: a
near-black page, one magenta accent, Space Grotesk over Inter, and a hero where
3D rings orbit through his portrait.

## The page is one continuous scroll

Navbar → Hero (Portal) → 01 About → 02 Where I build from (globe) → 03 Skills →
04 Work → 05 Services → 06 Contact → Footer.

- **No standalone pages.** The old `/projects/*` category pages and
  `/pages/hero` were folded into the homepage. Those URLs still resolve:
  `/projects/:category` renders the homepage with the Work filter preset,
  `/pages/hero` redirects to `/#about`. Don't add a new route for content —
  add a section.
- **Every section uses the shared blocks** in `src/index.css`: `.section`,
  `.container`, `.section-head`, `.eyebrow` ("04 — Work"), `.section-title`
  (with an `<em>` for the magenta half), `.section-lead`, `.btn-primary`,
  `.btn-ghost`. The numbered eyebrows run in page order; renumber if you
  insert a section.
- **One entrance animation**: `<Reveal>` (`src/components/common/Reveal.jsx`) —
  fade + 24px rise, once. Don't hand-roll framer-motion variants per section.

## The three rules that matter most

1. **One accent colour.** Electric violet `#8b7cff` is the brand (was magenta,
   then aqua, on 2026-11-22) — it's in the logo.
   Everything interactive is magenta. Nothing else is chromatic, except the
   exceptions listed below.
2. **Colour carries meaning, never decoration.**
3. **Never hard-code a hex in component CSS.** Tokens live only in
   `src/index.css`; no other file may declare `:root`.

## Tokens (src/index.css)

**The brand colour is ONE line: `--accent` in `src/index.css`.** Every other
accent shade is derived from it with `color-mix()` — hover, strong (light-theme
text), subtle, glow, `--fam-1`, and the logo (`<LogoMark>` uses
`currentColor`). Never hard-code an accent shade anywhere else, or changing
the brand colour stops working. Exceptions that can't follow CSS:
`public/favicon.svg` and `public/preview.jpg` — update both by hand
when you change the default `--accent` (the picker redraws the tab icon at
runtime, but search results and first paint use the file). The chat widget
reads `--accent` and `--on-accent` via `main.jsx`.

Tested choices (dark text on the fill, accent text on dark, and the derived
strong shade on the light theme all pass 4.5:1):

| Colour | Hex |
|---|---|
| Electric violet (current) | `#8b7cff` |
| Aqua | `#2dd4bf` |
| Magenta (original) | `#e748c8` |
| Lime | `#a3e635` |

**Visitors can switch between the tested colours** with the picker in the
navbar (`AccentPicker.jsx`). The list lives in
`src/components/theme/accents.js` and is duplicated in a small inline script
in `index.html` that applies a saved choice before first paint — keep the two
in sync. The choice is saved per browser (`localStorage.accent`); the line in
`index.css` stays the default for anyone who hasn't picked. The picker also
redraws the tab icon in the chosen colour.

Pick bright colours: `--on-accent` is near-black, so a dark accent would fail.

```css
--accent           /* THE line */
--accent-hover / --accent-strong / --accent-subtle / --accent-glow  /* derived */
--accent-text      /* accent as GLYPHS — --accent on dark, --accent-strong on light */
--on-accent        /* #0b0b12 — text on an accent fill */
--bg / --surface / --elevated / --overlay
--text / --text-2 / --text-muted
--border / --border-strong / --grid-line
--fam-1..4, --cat-web / --cat-mobile / --cat-design / --cat-ai
--font-display (Space Grotesk) / --font-body (Inter) / --font-mono (JetBrains Mono)
--s-1 … --s-10, --radius / --radius-lg / --radius-xl, --container, --ease-out
```

Dark is the default (`#07070c` page). `html.light-theme` overrides surfaces,
text, lines and `--accent-text`; `--accent` itself never changes.

### Text on magenta is near-black, not white

| Combination | Ratio |
|---|---|
| `--on-accent` #0b0b12 on `--accent` | 6.0:1 ✅ |
| white on `--accent` | 3.41:1 ❌ (why the old buttons failed) |
| `--accent` as text on dark `--bg` | 5.4:1 ✅ |
| `--accent-strong` as text on light | 5.27:1 ✅ |

So: fill with `--accent`, put `--on-accent` on it, colour glyphs with
`--accent-text`. Never `color: var(--accent)` directly.

Legacy aliases (`--primary`, `--background`, `--text-secondary`…) remain only
for the admin dashboard and NotFound. Never introduce a new use.

## Typography

| Role | Font | Size |
|---|---|---|
| Hero title | `--font-display` 700 | 56–112px, tracking −0.045em |
| Section title | `--font-display` 600 | 36–64px (`.section-title`) |
| Card heading | `--font-display` 600 | 22–26px |
| Body | `--font-body` | 16–19px, line-height 1.6, max ~60ch |
| Labels / eyebrows / counts | `--font-mono` | 11–13px, uppercase, tracked |

**No emoji in headings or UI labels.** (The language toggle reads "FR"/"EN".)

## Motion

- Entrance: `<Reveal>` only.
- Decorative loops are allowed **only** in: the hero rings, hero badge and
  floating chips, the globe, the green status dot, the tech cubes and the
  scroll cue. Content (text, cards, photos) never loops.
- About is four sticky cards that pile up as you scroll (each sticks 28px
  lower than the last) and settle in via `animation-timeline: view()`.
  Sticky only works because html/body use `overflow-x: clip` — never change
  that back to `hidden`. The About portrait is the lake photo
  (`about-portrait.webp`), cut out with a background-removal model.
- **Photos of Sidick are never regenerated by AI.** Generators (Flow,
  ChatGPT) changed his face every time. Only edit real photos — colour,
  light, or background removal (rembg `isnet-general-use`) — and check the
  face against the original.
- Hovering the hero portrait shows a scan lens (accent dot-matrix masked to
  his silhouette and a circle at the cursor). Fine pointers only.
- Pointer effects (hero ring tilt and spotlight) write CSS variables inside
  `requestAnimationFrame` — never React state — and are skipped for touch and
  reduced motion.
- Every CSS animation must be inside `@media (prefers-reduced-motion:
  no-preference)`; `index.css` also has a global reduced-motion reset, and
  `<MotionConfig reducedMotion="user">` covers framer-motion.
- Never animate `transform` on an element that also transforms on hover.

## How the Portal hero works (don't break it)

- Each ring is rendered **twice** (`<Orbit />` and `<Orbit front />`): once
  behind the portrait, once in front clipped to its lower half. That's what
  lets the rings pass behind his back and in front of his chest.
- Everything scales from one variable, `--stage-h`, set per breakpoint in
  `Hero.css`. The portrait's `margin-left` is `-0.2204 × --stage-h` (half its
  rendered width for a 638×1404 cutout) — change the image and you must
  recompute it.

## Deliberate exceptions

Rules Sidick has explicitly overruled. **Do not "fix" these.**

- **The green status dot** (`.nav-active`, `#26a32c`) beside the logo. Breaks
  the one-accent rule and pulses forever, on purpose.
- **The hue family** `--fam-1..4` / `--cat-*`: project category tags, Skills
  icons and Services icons are colour-coded from it. One shared saturation,
  hues spaced from the brand magenta, lightness tuned to ~5:1 on each theme's
  `--surface`. A fifth category means re-deriving the set. Tags that carry
  these colours need a **solid** `--surface` behind them — on a translucent
  pill over a screenshot they drop to 4.2:1.
- **Social brand colours on hover** (`--brand-*`), social icons only.
- **The tech-cube cluster** in Skills uses each tool's real brand colours.

If you think one of these is wrong, say so — don't silently change it.

## Content principles

- Show work, not categories: projects come from the API via
  `src/data/projectData.js`; the Work grid filters them.
- Concrete over adjectives: say what it does and for whom.
- Every user-facing string lives in both `src/locales/en.json` and `fr.json`
  (keys must stay in parity). French copy uses "tu".

## Before you call it done

Run the app and **look at it**:

```bash
npm run dev    # http://localhost:5173
```

- [ ] Every section, dark theme and light theme
- [ ] 390px wide — no horizontal scroll, drawer menu opens
- [ ] `/projects/ai` lands on Work with "ML & AI" selected; `/pages/hero` lands on About
- [ ] Console clean
- [ ] **Contrast audited, not eyeballed**, in both themes: walk every visible
      leaf text node, resolve its effective background by climbing to the
      first opaque ancestor, check 4.5:1 (3:1 for large text). Force
      `*{opacity:1;animation:none}` first so unrevealed elements aren't skipped.
- [ ] Scroll with `behavior: "instant"` when screenshotting — the page has
      `scroll-behavior: smooth`, and reveals fire on entry.
