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
3. **Categories differ by shape and label, not hue.** Four buttons in four
   colours is the single most amateur pattern this site has had. Use different
   *icons*, same accent.

## Tokens

Defined in `src/index.css`. **Never hard-code a hex value in component CSS** —
if you need a colour that isn't here, that's a signal to reconsider, not to add
one.

```css
--accent / --accent-hover / --accent-press / --accent-subtle
--bg / --surface / --elevated
--text / --text-2 / --text-muted
--border
--success / --error          /* status messages only */
--font-display / --font-body
--s-1 … --s-9                /* 4px scale */
--radius / --radius-lg
```

Theme switching overrides **only** surfaces, text and border. `--accent` is
constant across themes — a brand colour that changes isn't a brand colour.

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

If you think one of these is wrong, say so — don't silently change it.

## Components

**Buttons** — primary: `--accent` background, **white text in both themes**
(don't let `--text` flip it to black in light mode; that was a real bug).
Secondary: transparent, `--accent` border and text.

**Cards** — `--surface` background, `--border` 1px, `--radius-lg`. Hover lifts
`translateY(-4px)` with a shadow. The whole card is the click target, not just
the button inside it.

**Inputs** — `--border`, not a coloured border. Focus ring in `--accent`.
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

Note: a full-page screenshot shows blank sections because scroll-triggered
reveals haven't fired. Scroll to each section before capturing.

## Mocking up a redesign

For a new or substantially reworked section, run `/design` and mock it before
writing CSS — iterating on a canvas is far cheaper than iterating in code. Apply
the tokens above to whatever comes out of it.
