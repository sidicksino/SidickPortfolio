---
name: portfolio-design
description: The design system for the SidickSino portfolio - colour tokens, typography scale, spacing, motion and component rules. Load before writing or changing any CSS, JSX styling, layout or visual design in this repo, and before running /design to mock up a section. Use when asked to restyle, redesign, "make it look better", fix the design, adjust colours or spacing, or build a new section.
---

# SidickSino Portfolio — Design System

Rules for keeping this portfolio visually coherent. Established 2026-09-07 after
a full audit found 33 distinct hex values and no colour discipline. See
`plan.md` at the repo root for the remediation plan these rules come from.

## The three rules that matter most

1. **One accent colour.** Magenta `#e748c8` is the brand — it's in the logo.
   Everything interactive is magenta. Nothing else is chromatic.
2. **Colour carries meaning, never decoration.** Interactive, success, error.
   If a colour isn't communicating one of those, it shouldn't be there.
3. **Categories differ by shape and label, not hue** — with one sanctioned
   exception, the project-category palette below. Do not invent new colour
   codings beyond it.

## Tokens

Defined in `src/index.css`. **Never hard-code a hex value in component CSS** —
if you need a colour that isn't here, that's a signal to reconsider, not to add
one.

```css
--accent / --accent-hover / --accent-strong / --accent-subtle
--accent-text                /* accent as GLYPHS — theme-aware, see below */
--font-logo                  /* Outfit 700 — the wordmark ONLY, not headings */
--on-accent                  /* text colour on an accent fill */
--bg / --surface / --elevated
--text / --text-2 / --text-muted
--border / --grid-line       /* --grid-line is theme-aware; it was white-only
                                and invisible on the light page */
--success / --error          /* status messages only */
--fam-1..4                   /* the hue family */
--cat-web / --cat-mobile / --cat-design / --cat-ai   /* semantic aliases */
--font-display / --font-body
--s-1 … --s-9                /* 4px scale */
--radius / --radius-lg
```

Theme switching overrides **only** surfaces, text and border. `--accent` is
constant across themes — a brand colour that changes isn't a brand colour.

### `--accent` vs `--accent-strong` — this one matters

Measured, not guessed:

| Combination | Ratio | Verdict |
|---|---|---|
| white on `--accent` `#e748c8` | 3.41:1 | ❌ fails body text |
| white on `--accent-strong` `#b52a9d` | 5.55:1 | ✅ |
| `--accent` as text on light `#f8f9fa` | 3.23:1 | ⚠️ large text only |
| `--accent-strong` as text on light | 5.27:1 | ✅ |
| `--accent` as text on dark `#181737` | 5.06:1 | ✅ |

So, three rules:

- **Filling a shape** → `--accent`.
- **Filling a shape that carries white text** → `--accent-strong` with
  `--on-accent`. Never `--accent`: white on it is 3.41:1 and fails in *both*
  themes, not just light.
- **Colouring glyphs** (text, icons, thin borders) → **`--accent-text`**. It is
  `--accent` on dark and `--accent-strong` on light, so it stays legible
  either way. Never use raw `--accent`/`--primary` as a `color:`.

And never set a button's text to `var(--text)` — that token flips with the
theme, which is how `.btn-primary` ended up white-on-magenta in dark and
black-on-magenta in light.

### Legacy aliases

`--primary`, `--background`, `--text-secondary`, `--background-light` and
friends still exist in `index.css`, mapped onto the canonical tokens, because
~10 stylesheets consume them. **Retire them as you touch each component; never
introduce a new use.**

### Never redeclare `:root`

Until 2026-09-07 all 11 stylesheets declared their own `:root` copy and
whichever loaded last won. `src/index.css` is now the only file that may
declare tokens. If a component needs a value that isn't there, that's a signal
to reconsider — not to add a local block.

(Per-instance custom properties set inline from data, like `--card-color` on a
project card, are a different thing and are fine.)

## Typography

| Role | Font | Size | Notes |
|---|---|---|---|
| h1 | `--font-display` | 48–64px | Elsie. Display only. |
| h2 | `--font-display` | 32–40px | Section headings. |
| h3 | `--font-body` | 20–24px | 600 weight. |
| Body | `--font-body` | 16–18px | `line-height: 1.6`, `max-width: 65ch` |
| UI (nav, buttons, labels) | `--font-body` | 14–16px | 500 weight. |

**Elsie is a decorative display serif — never use it for paragraphs, form
labels, or buttons.** It was previously rendering body copy at 28.8px and is the
source of the stray circular glyph artifact seen in "Projects" and "Contact".

Body default is `var(--font-body)`, not Arial.

**No emoji in headings.** Ever.

## Spacing & layout

- Use the `--s-*` scale. No arbitrary px values.
- Section vertical rhythm: `--s-9` (96px) desktop, `--s-7` (48px) mobile.
- Content max-width 1200px, centred.
- **Watch trailing dead space** — several sections currently run 800px+ of empty
  background before the next one. Cap section height to content.

## Motion

- **Entrance animations only.** One pattern: fade in + 8px rise, 400ms,
  `ease-out`.
- **No infinite loops on content.** A spinning headshot reads as a bug, not a
  feature. This was a real defect (`Hero.css:222`) — don't reintroduce it.
  **Exception:** the green `.nav-active` status dot beside the logo pulses, and
  that is intentional — see "Deliberate exceptions" below.
- Always wrap in `@media (prefers-reduced-motion: no-preference)`.
- Never animate `transform` on an element that also uses `transform` on hover —
  they fight.

## Deliberate exceptions

Rules Sidick has explicitly overruled. **Do not "fix" these** — they were
removed once and restored on request.

- **The green status dot** (`.nav-active`, `#26a32c`) beside the logo, in both
  `Navbar` and `HeroPage`. It breaks the one-accent rule and it pulses forever.
  Sidick likes it and it stays. Its pulse *is* wrapped in
  `prefers-reduced-motion: no-preference`, and its parent `.nav-logo` needs
  `position: relative` in both stylesheets or it anchors to the fixed navbar.

- **The hue family** `--fam-1..4`, and its semantic aliases `--cat-web` /
  `--cat-mobile` / `--cat-design` / `--cat-ai`. Project cards, About icons and
  Skills icons are all colour-coded from it on purpose — Sidick's call, so
  visitors can tell items apart at a glance. **Do not collapse any of them to a
  single accent.** Components reference a meaning (`--icon-color`, `--card-color`,
  `--cat-*`), never a raw hue.

  It is not four arbitrary colours, and that distinction is the whole point:
  one shared saturation, hues spaced evenly and anchored on the brand magenta,
  lightness tuned per hue so each lands at **~5:1 against its own theme's card
  surface** (both themes are defined; the dark values are unreadable on white).
  The set it replaced — `#6366f1` / `#8b5cf6` / `#ec4899` / `#f59e0b` — was
  default palette entries with no relationship to each other or the brand, and
  *that* was what looked amateur, not the colour-coding.

  Adding a fifth category means re-deriving the whole set, not appending a
  colour you like. Reach for the solver approach: fix saturation, spread hue,
  solve lightness for equal contrast.

- ~~The logo gradient runs magenta → green.~~ **Resolved 2026-09-08** — Sidick
  asked for it fixed. The wordmark is now `--font-logo` (Outfit 700) with a
  magenta-only gradient, and the shimmer was slowed 2s → 8s. Green now survives
  in exactly one place site-wide: the `.nav-active` status dot.

  ⚠️ `.nav-logo-text` and `.nav-logo-text span` are declared in **both**
  `Navbar.css` and `HeroPage.css`. CSS isn't scoped, both ship in the same
  bundle, and HeroPage.css loads later — so **its rule wins on every route,
  including the homepage**. They are kept byte-identical on purpose. Change
  both together, or the homepage will silently take the other file's styling.

If you think one of these is wrong, say so — don't silently change it.

## Components

**Buttons** — primary: **`--accent-strong` background with `--on-accent` text**
(white on plain `--accent` is 3.41:1 and fails in both themes; never let
`--text` set button text — it flips with the theme).
Secondary: transparent, `--accent-text` border and text.

**Cards** — `--surface` background, `--border` 1px, `--radius-lg`. Hover lifts
`translateY(-4px)` with a shadow. The whole card is the click target, not just
the button inside it.

**Inputs** — `--border`, not a coloured border. Focus ring in `--accent-text`.
Every input needs a real `<label for>`.

**Icons** — `--accent` on `--accent-subtle` circles. Consistent size per group.

## Content principles

- **Show work, not categories.** `src/data/projectData.js` has 19 real projects
  with screenshots and live URLs. Surface them; don't hide them behind generic
  category cards.
- Project descriptions state what it does and for whom — concrete outcomes, not
  adjectives. "Bilingual news platform for Chad" beats "ultra-fast and elegant".
- Copy is bilingual: every user-facing string goes in `src/locales/en.json` and
  `fr.json`. Never hard-code text in JSX.

## Before you call it done

Run the app and **look at it** — don't trust the CSS.

```bash
npm run dev    # http://localhost:5173
```

- [ ] All six sections, dark theme
- [ ] All six sections, light theme
- [ ] 390px wide
- [ ] Keyboard tab-through shows visible focus
- [ ] Console clean, no failed requests
- [ ] `grep -rhoE "#[0-9a-fA-F]{3,8}" src/ | sort -u` — under ~12 values
- [ ] **Contrast audited, not eyeballed.** Walk every visible leaf text node,
      resolve its *effective* background by climbing ancestors to the first
      opaque one, and check against 4.5:1 (3:1 for large text). Run it in
      **both** themes — the accent-button failure lived in dark mode too, and
      eyeballing never caught it.
      Force `*{opacity:1;animation:none}` first, or elements that haven't
      finished their entrance animation get skipped and you get a false pass.

Note: a full-page screenshot shows blank sections because scroll-triggered
reveals haven't fired. Scroll to each section before capturing.

## Mocking up a redesign

For a new or substantially reworked section, run `/design` and mock it before
writing CSS — iterating on a canvas is far cheaper than iterating in code. Apply
the tokens above to whatever comes out of it.
