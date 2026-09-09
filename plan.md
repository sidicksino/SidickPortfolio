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
| 1 — Design system | ✅ **Done** | 2026-09-07 | 11 `:root` blocks → 1; navy purged |
| 2 — Apply the system | ✅ **Done** | 2026-09-07 | One accent everywhere; 27 → 8 stray hex |
| 3 — Show the work | ✅ **Done** | 2026-09-07 | Featured grid live on the homepage |
| 4 — Typography | ✅ **Done** | 2026-09-07 | Arial purged; 26 @imports → 1 <link> |
| 5 — Light mode | ✅ **Done** | 2026-09-08 | 0 contrast failures, both themes |
| 6 — Polish & a11y | ✅ **Done** | 2026-09-08 | Images 15.5MB→1.2MB; 19 missing alts fixed |
| 7 — Repo hygiene | ✅ **Done** | 2026-09-08 | Real README; 0 prod vulnerabilities |

### Phase 8 — SEO & social preview ✅ **Done** (2026-09-08)

Raised by Sidick: *"if I publish, will people find the new images or the old
ones?"* Investigating turned up a live bug.

**`og:image` pointed at `/preview.jpg`, which never existed.** `curl` returns
HTTP 200, but `content-type: text/html` — `vercel.json` rewrites every unmatched
path to `/`, so the 200 was the SPA fallback serving `index.html` under an image
filename. **Every share on WhatsApp / LinkedIn / X / Slack had no preview card.**

- [x] Built a real `public/preview.jpg` — 1200×630, 78 KB, brand background with
      the cut-out portrait, name, role and URL
- [x] Added `og:image:width` / `:height` / `:alt`, `og:site_name`, `og:locale`
      (+ `fr_FR` alternate) and `twitter:image:alt` so platforms render the large
      card reliably instead of guessing
- [x] `sitemap.xml` `lastmod` was frozen at **2025-10-24** on all 5 URLs —
      now today's date, which is the signal crawlers use to re-fetch
**Sidick's answer: both French and English are primary audiences.** That made
the single-URL setup the real problem — the language lived only in
`localStorage`, so both translations shared one URL, and a search engine can
only index one version of a URL. **The French site was invisible to search.**

- [x] `?lang=` support in `src/i18n.js`, resolved most-explicit-first:
      URL param → localStorage → browser language → `en`
- [x] The toggle writes `?lang=` via `replaceState`, so a shared link keeps its
      language and doesn't trap anyone behind extra back presses
- [x] `hreflang` alternates (en / fr / x-default) and a rewritten `sitemap.xml`
      — 5 pages × 2 languages, with **reciprocal** annotations, which Google
      requires or it ignores them
- [x] `seo.title` / `seo.description` per locale, key parity verified
- [x] New `src/components/Seo.jsx` owns `<title>`, description, canonical and
      hreflang; `index.html` keeps `og:*`/`twitter:*`. **Nothing is declared in
      both places.**

### The bug this uncovered: metadata was never rendering

`react-helmet-async` 2.0.5 under **React 19** emitted `<title>` but **silently
dropped every `<meta>` and `<link>`**. Verified in the DOM: `/projects/web` had
`descCount: 0` despite having a `<meta name="description">` in its Helmet.
**All four project pages have been shipping with no meta description** — this
predates every change in this plan.

React 19 hoists `<title>`/`<meta>`/`<link>` natively, so Helmet is redundant
here and actively harmful. Removed from all five components plus the now-dead
`HelmetProvider`. Confirmed: 6 pages, correct title and description on each,
exactly **1** description tag per page.

> Two of my own verification steps were wrong before this landed, both worth
> remembering:
> - A `grep -c` for `<meta name="description"` returned **0** while the tag was
>   still there — the attribute sits on its own line and the single-line
>   pattern missed it. Re-checked with a multi-line regex.
> - Switching to native hoisting blanked every project-page `<title>`. React 19
>   only hoists a `<title>` with a **single** text child; `{t(...)} | Sidick
>   Sino` is two. Fixed with a template literal — caught only because the check
>   printed the actual titles rather than asserting they existed.

- [x] **`react-helmet-async` uninstalled** (Phase 10).

### Phase 9 — Nothing that ages is typed by hand ✅ **Done** (2026-09-08)

Raised by Sidick: the SEO copy said *"19 shipped projects"* — wrong the day he
ships the twentieth, and it appeared in six places. The principle generalises,
so the sweep covered every value that drifts, not just that one.

**Counts removed from prose.** A description should describe, not tally.
`seo.description` (en + fr), `og:description`, `twitter:description` and two
places in the README now say *"web platforms, mobile apps and machine-learning
products"* — accurate at any number.

**`sitemap.xml` `lastmod` was the same mistake, and I made it.** I typed
`2026-09-08` in this session; the value before that had been frozen at
`2025-10-24` for months, which tells crawlers nothing has changed. Now generated
by `scripts/generate-sitemap.mjs`, wired to `prebuild` so it can't be forgotten.
Routes and languages live in one list in that script.

**README said `react-helmet-async`** under SEO after Helmet had been removed —
documentation drifts too.

Already correct, left alone: the footer year (`getFullYear()`) and the
"Browse all N projects" link (`totalProjectCount`, derived from the arrays).
Those are the pattern to copy — a number is fine when it computes itself.

- [ ] **Sidick's to review:** `about.whoIAmText` says *"I'm a Data Science
      student"* (both locales). True today, dated after graduation. Not
      something to automate — just worth a diary note.

### Phase 10 — Dependency upgrades ✅ **Done** (2026-09-08)

- [x] **`react-helmet-async` uninstalled.** Nothing imported it after Phase 8
      replaced it with React 19's native metadata hoisting.
- [x] **Vite 7.1.6 → 8.2.2** with `@vitejs/plugin-react` 5.0.3 → 6.1.1.
      Checked first that `@tailwindcss/vite` 4.3.3 already declares `vite ^8`
      and that plugin-react 6's extra peers (`oxc-transform-react`,
      `@rolldown/plugin-babel`, `babel-plugin-react-compiler`) are all
      **optional** — otherwise this needed three more installs.
- [x] **`npm audit fix`** for the last 6, all transitive under `eslint@9.35.0`
      and touching only `npm run lint`.

| | Before | After |
|---|---|---|
| Total advisories | 13 | **0** |
| Production advisories | 0 | **0** |
| Build time | 1.46 s | **0.21 s** |
| Main bundle | 670.4 kB | **654.9 kB** |

Vite 8 swaps Rollup for **Rolldown**, so this was a real bundler change, not a
version number. Verified after: lint clean, build clean, all **7** routes
render with correct per-language title and description, language toggle,
theme toggle, the 6 featured cards and client-side navigation all work, no
console or page errors, no failed requests.

`package.json` / `package-lock.json` were backed up to `/tmp` before the bump
so the dependency change could be reverted on its own if the build broke.

- [x] **`/pages/hero` meta description added** (Phase 11). All 7 routes now
      carry a title and a description.
- [x] **Bundle cut 655 kB → 453 kB** (Phase 11); the chunk-size warning is gone
      and `codeSplitting` config was never needed.

### Phase 11 — Last two loose ends ✅ **Done** (2026-09-08)

**`/pages/hero` had no meta description** — the one route without one. Added
`seo.heroPageTitle` / `seo.heroPageDescription` in both locales, rendered as
plain elements (React 19 hoists them). All **7** routes now carry a title and a
description.

**The 655 kB main bundle.** Most of it turned out to be dead weight rather than
anything needing clever chunking:

| Step | Bundle | gzip |
|---|---|---|
| Starting point | 655.6 kB | 213.8 kB |
| Remove dead GSAP import | **535.2 kB** | 166.4 kB |
| Defer emailjs + sweetalert2 | **453.3 kB** | **144.1 kB** |

**−31% raw, −33% gzip. The chunk-size warning is gone** (453 < 500 kB), so
`build.rolldownOptions.output.codeSplitting` was never needed.

- [x] **GSAP was imported and its plugins registered in `App.jsx`, but the only
      component that ever used it is `<Art />`, which is disabled.** The whole
      of gsap + ScrollTrigger + SplitText was shipping for nothing — 120 kB.
      Removed with a note to register inside `Art.jsx` if it's ever re-enabled.
- [x] **`emailjs` and `sweetalert2` were static imports** but are only reachable
      from `handleSubmit`. Now dynamically imported on submit — sweetalert2 is
      its own 77.7 kB chunk that most visitors never download.
- [x] `react-anchor-link-smooth-scroll` uninstalled — imported nowhere.
- [x] SweetAlert's confirm button was its own blue-purple; it now reads
      `--accent-strong` from the live tokens, so it follows the active theme.

Verified without sending a real email: the EmailJS request was blocked at the
network layer to force the error path. Neither chunk is requested on page load;
both are fetched on submit; the styled alert renders correctly.

### Phase 12 — Logo wordmark ✅ **Done** (2026-09-08)

- [x] **Gradient fixed.** The logo ran magenta → olive → magenta → green, the
      same muddy patchwork already fixed on the `SIDICK` headline. At logo size
      the green read as a rendering fault. Now magenta-only, built from tokens.
- [x] **Font changed to Outfit 700** (`--font-logo`), chosen from a rendered
      comparison of 9 candidates at real navbar size. Elsie's ball terminals
      collided at 2.2rem — the "k" in "Sidick" ran into the next letter.
- [x] **Shimmer slowed 2s → 8s.** Two seconds flickered; eight sweeps. The
      global `prefers-reduced-motion` reset stops it entirely for anyone who
      asks for less motion.
- [x] Applied to **both** navbars — `/pages/hero` had its own copy of the green
      gradient, so the logo differed between routes.
- [x] Only one weight added to the font link (Outfit 700), keeping the payload
      minimal.

**Green is now confined to the `.nav-active` status dot** — the one place
Sidick asked to keep it. Verified: zero other green values in `src/`.

> **Found while verifying.** The computed gradient on the homepage came back
> with two colour stops, not the four in `Navbar.css`. Cause: `HeroPage.css`
> also declares `.nav-logo-text span`, CSS isn't scoped, both files ship in one
> bundle, and HeroPage.css loads later — **so it was overriding the navbar on
> every route.** Both were magenta by then so nothing looked wrong, which is
> exactly what makes it dangerous. Kept byte-identical with a warning comment in
> both files. Same class of bug as the 11 duplicate `:root` blocks in Phase 1.

### Phase 13 — Social links in the hero ✅ **Done** (2026-09-08)

Sidick's idea, and a good one: the left column ended at the CTAs, leaving a
dead band of ~200px in the most valuable space on the site. For a developer,
GitHub above the fold is worth more than GitHub in the footer.

- [x] New `SocialLinks` component, links defined once in
      `siteData.js` → `socialLinks`
- [x] Rendered under the hero buttons, **muted at rest** (`--text-muted`) so it
      doesn't compete with the primary CTAs — colour only on hover/focus
- [x] **Hover: each network's own brand colour floods in from the centre** —
      `::before` scales 0 → 1 on a 0.4s `cubic-bezier(.16,1,.3,1)`, icon turns
      white and scales 1.15, the card lifts 5px and casts a shadow tinted with
      the same brand colour. Scaling rather than fading makes the colour read as
      *arriving*. All of it is disabled under `prefers-reduced-motion`.
- [x] Brand values are **tokens, not hex in the data** (`--brand-github` etc.),
      and `--brand-github` is theme-aware: its official `#24292f` is nearly
      invisible on the dark page, so the dark theme lifts it to `#4a5261`.
      Verified by hovering each icon in both themes.
- [x] Footer and `/pages/hero` now consume the same component. Zero hard-coded
      social URLs left in `src/components/`.

### Two live bugs this surfaced

**`https://twitter.com/sidick_sino` returns 404.** `/pages/hero` had been
linking to an account that doesn't exist. Dropped.

**Two different LinkedIn URLs were live at once:**
- Footer: `http://linkedin.com/in/sidick-abdoulaye-sino-72153a384` — note `http`
- `/pages/hero`: `https://linkedin.com/in/sidick-abdoulaye`

Standardised on the long-slug one over `https://www.`, since that's the shape
LinkedIn's own share URLs use.

- [x] **Instagram and X added** (2026-09-08). Tracking parameters stripped from
      the supplied URLs — `?stkn=…&utm_source=qr` on Instagram (a share token
      tied to his device) and `?s=11` on X. Both confirmed HTTP 200.
- [x] Instagram hovers to its real **gradient**; `--brand-x` is theme-aware like
      GitHub, since pure black vanishes on the dark page. Ring and shadow use a
      separate solid `--glow`, because `color-mix()` cannot take a gradient.
- [x] **Footer icons were cropped.** `.footer-col ul li a` — the footer's
      *navigation* rule — also matched the social row, since that's a
      `<ul><li><a>` inside `.footer-col` too. At (0,1,3) it beat
      `.social-row a` (0,1,1) and forced `display: inline-block`, so the flex
      centring never applied and `overflow: hidden` clipped the icons. Its
      `::before { content: "→" }` was also colliding with the colour fill.
      Scoped all six `.footer-col ul` selectors with `:not(.social-row)`.
      Now measured at 11px above / 11px below in both themes.
- [x] Removed the redundant `.footer-socials` wrapper (a second rule set on the
      same links) and the `@keyframes glow` it orphaned.

- [x] **LinkedIn resolved** (2026-09-08). Sidick's share sheet returned a
      **third** slug — `/in/sidick-sino` — matching neither of the two that were
      live in the code. Both of those were wrong: the long
      `sidick-abdoulaye-sino-72153a384` was LinkedIn's auto-generated fallback,
      and `sidick-abdoulaye` didn't correspond to anything. `?utm_source=share_via`
      and the other iOS share-sheet markers stripped. Both return
      200, but LinkedIn serves a page for almost any `/in/` path, so the check
      is not conclusive.

> **Two near-misses while building this.** First, my initial string-slicing
> edit to `HeroPage.jsx` matched nothing and corrupted the file — caught by
> `npm run lint` ("Unexpected token"), restored with `git checkout`, redone
> against the real markup. Second, I had named the component's class
> `.social-links` — which **`HeroPage.css` already owns**. Same collision that
> made the logo gradient diverge between routes. Renamed to `.social-row`
> before it shipped.

### Phase 14 — Navbar ✅ **Done** (2026-09-08)

Sidick reported two things: the nav doesn't cover all the sections, and the
highlight shows the wrong one. Investigating found five defects.

| # | Defect | Evidence |
|---|---|---|
| 1 | **`#work` was never watched.** `SECTION_IDS` was hand-maintained and Featured Work was added later, so the highlight went stale and kept showing Skills. | Scrolled to `#work`, navbar said `#skills` |
| 2 | **Nav order ≠ page order.** Nav listed Contact before Services; the page renders Services then Contact, so scrolling moved the highlight backwards. | — |
| 3 | **`threshold: 0.5` can't work on tall sections.** It asks "is half of this on screen", impossible above 2× viewport. Latent, but `#work` is 1541px — it would have failed on any screen under 770px tall. | Measured every section height |
| 4 | **The observer was rebuilt on every render.** `options = {}` defaulted to a fresh object sitting in the effect's dependency array. | — |
| 5 | **Mobile menu stayed open after tapping a link** — one `onClick` in the whole component, on the toggle. | — |

- [x] Hook rewritten to observe a **band** (25–35% of viewport, just under the
      navbar) instead of a proportion of the section, so height stops mattering.
      When two sections overlap the band the **topmost** wins, so the highlight
      moves in reading order rather than by observer callback order.
- [x] `options` parameter removed entirely.
- [x] Nav rebuilt from a `NAV_ITEMS` array in page order; **`SECTION_IDS` is
      derived from it**, so the watch list can no longer drift from the nav —
      that was the root cause of #1.
- [x] "Projects" points at `#work` (the real work) and stays lit across the
      category cards in `#projects`, via a `match` array. Keeps the nav at six.
- [x] Mobile menu closes on link tap; added `aria-expanded` and `aria-current`.
- [x] **Fixed invalid HTML**: the CTA was `<button><a href>…</a></button>`.
      An anchor inside a button is not valid and breaks keyboard and screen
      reader behaviour. Now a single `<a class="nav-cta">`.

Verified at **700px and 900px** viewport heights: all seven scroll positions
highlight correctly, mobile menu closes, no console errors.

### Mobile drawer redesigned

The old panel used `--background-dark` — darker than the page itself, so it
read as a different app. It sat at `top: 65px` with `height: 100vh`, overhanging
the bottom by 65px. A stray magenta "handle" bar floated above it. The page
behind stayed at full opacity with no scrim. And the desktop underline followed
it in: positioned at `left: 16px` with `width: 100%`, so the active item's line
ran 16px **past the right edge of the panel**.

- [x] Full-height panel on `--surface`, `100dvh` (not `vh`, which ignores the
      mobile browser's collapsing address bar and hides the last item)
- [x] Dimmed, blurred backdrop that closes the drawer on tap
- [x] Body scroll locked while open; **Escape** closes it
- [x] Items on the `--s-*` scale; active state is a filled row with an accent
      icon chip. The overflowing `::after` is `content: none` here.
- [x] Language toggle and CTA pinned to the bottom

**Two stacking-context bugs, same root cause.** `.navbar` has
`backdrop-filter`, which makes it the containing block for `position: fixed`
descendants:

1. The backdrop was rendered *inside* `<nav>`, so `inset: 0` resolved to the
   navbar's own **65px box** — it covered nothing and swallowed no taps.
   Moved outside `<nav>`.
2. The drawer is a `z-index: 999` child of that same context, so it painted
   **over the logo and the close button** — leaving no way to shut the menu.
   Both raised to 1001.

The drawer stays inside `<nav>` because on desktop it's a flex child of it; its
`bottom: 0` was removed, since that would have resolved to the navbar's box
too. Height is set explicitly instead, and the reason is commented in place.

- [x] **Real close icon.** Sidick's catch: the button rotated the hamburger
      135° to "become" a close mark — but its three lines are 15, 20 and 10
      units long, so rotating them produced three diagonal slashes, not an X.
      There was no way to tell what the button did once the menu was open.
      Added an explicit `CloseIcon`, swapped on state, with a short scale-in so
      it doesn't just pop. `aria-label` follows the state and is translated
      (`nav.openMenu` / `nav.closeMenu`, both locales); `aria-expanded` too.
- [x] Bottom padding clears the floating theme toggle, which was sitting on top
      of the Get Started button (verified: CTA bottom 746, toggle top 785).

> **A lint quirk worth recording.** Destructuring `Icon` in the map parameter
> tripped `no-unused-vars` — `eslint-plugin-react` isn't installed, so ESLint
> can't tell that `<Icon />` is a use, and the config's `varsIgnorePattern`
> `^[A-Z_]` covers *variables* but not *arguments*. Held as a local instead.

### Phase 15 — About section ✅ **Done** (2026-09-08)

**A broken sentence was live in English but correct in French.**
`myMissionText` read *"…entrepreneurs in Africa scalable, reliable and simple
to use."* The French carried an em-dash (`en Afrique—scalables`); the English
had lost it, so the sentence didn't parse. Two more places where the English
had drifted from the French:

| | English (before) | French says |
|---|---|---|
| Word order | "developer of **web, app platforms**" | "plateformes web, d'applications" → *web platforms, applications* |
| Hyphens | "product minded", "detail oriented" | correct in FR |

The French version was the more carefully written one throughout — worth
checking the English against it elsewhere.

- [x] All three fixed, in both locales, em-dash verified present in each
- [x] Copy grounded in facts **already in `projectData.js`** — a Chadian
      non-profit site (AAPT), diabetes and disease-risk models on Streamlit,
      working between N'Djamena and Kigali. No metrics or claims invented.
- [x] **Photo 2 swapped** `phote5` → `sidick1`. `phote5` is the exact source
      the hero cut-out was generated from, so the same person, outfit and pose
      appeared twice within one scroll.
### ↩️ The "280px of dead space" — my call was wrong, reverted

I read the gap between the photos and the text as dead space and tightened it.
Sidick compared before and after and preferred the original, correctly:

> *"the spacing is better the one before… we have also a gap between the images
> and the text nicely… for you the one you changed is like you take the same
> space as the hero section."*

He's right. That gap is the trailing half of a **50/50 split**, and the split is
what makes the section span the page. Sizing the photo column to its contents
pulled everything inward and left large outer margins — the section stopped
filling the width and started looking like the hero's narrower centred column.
I optimised a local measurement and broke the composition.

Reverted to `justify-content: space-between`, `flex: 1` on both columns,
`gap: 80px`. Verified back to the original geometry exactly: images 80–680,
text 760–1360, 80px margins each side.

*(Worth keeping in mind: an empty region isn't automatically wasted. It was
doing work here — holding the layout open.)*

- [ ] **Still Sidick's to add:** a concrete outcome per block — who used a
      thing, what changed. The copy is accurate now but still describes
      capability rather than result.

### Phase 16 — About section redesigned ✅ **Done** (2026-09-08)

Sidick asked for a full redesign — the layout was a year old. Three directions
were mocked up with his real content and tokens (editorial / profile+facts /
journey timeline); he chose **profile card + fact tiles**.

**The problem it solves:** the old section made a visitor read three paragraphs
to learn where he is, what he focuses on, or what he builds with — and none of
those were actually stated. The tiles surface all four at a glance; the
paragraph carries the voice.

- [x] `About.jsx` and `About.css` rewritten (CSS 270 → 223 lines)
- [x] Portrait card with name and role, beside a lead paragraph and a **2×2
      grid of fact tiles**: Based in · Focus · Working with · Mission
- [x] Tiles take their hue from the existing `--fam-*` family, so the section
      joins the system rather than introducing new colour. Hue on the left edge
      only — four filled colour blocks would have fought the rest of the page.
- [x] **13 new locale keys in both languages**, parity verified
- [x] **Copy kept durable, on Sidick's correction.** My first draft named the
      current builds — *"a site for a Chadian non-profit… diabetes and
      disease-risk models deployed with Streamlit"* — and the stack tile listed
      Django/Streamlit/Supabase, tools tied to those same projects. Both go
      stale the moment the portfolio grows.

      > *"imagine if I built a big project, many other projects, not only those…
      > don't focus on my projects that I have."*

      He's right, and it's the same rule he set in Phase 9: **nothing that
      changes over time gets typed by hand.** I applied it to counts and then
      broke it with project names. About now describes the work; **Featured
      Work names the projects, and that section is generated from the data** —
      so the specifics stay in the one place that updates itself.
      Stack tile then split again, on Sidick's second correction:

      > *"Actually I'm a data scientist. So I will mention those of machine
      > learning analysis things."*

      Also correct, and it was a positioning contradiction, not just a list
      problem. The role says *Data Scientist · Full-Stack Developer*, the Focus
      tile says *Data Science*, and the Skills section **leads** with R, Pandas,
      NumPy, Scikit-learn and TensorFlow — while the one tile naming tools
      showed an almost entirely web stack. A reader would have concluded the
      data-science claim was thin.

      Then raised again, on his third note — the Skills section directly below
      already lists every tool, so naming them here was duplication:

      > *"we have also my skill section… not listing all the tools that I'm
      > using or framework that I'm using."*

      The tile is now **"Working on"** at discipline level:
      **Data** — Machine learning, analysis and visualisation
      **Product** — Web platforms and mobile apps

      **Zero tool or framework names remain anywhere in the About copy**, in
      either locale — verified. The division is now clean: About says what the
      work *is*, Skills says what it's *built with*, Featured Work says what was
      *shipped*. Each fact lives in exactly one place.
- [x] Verified no About string names a project or a count, in either locale
- [x] Kept the **80px gutters** Sidick asked for; verified 80/80 at 1440

**Phone layout, on Sidick's request:** "Based in" and "Focus" share a row —
they're short enough — while "Working on" and "Mission" carry full sentences
and span both columns rather than being squeezed to ~165px. Below **360px**
the pair drops to one column too, since "N'Djamena, Chad" starts breaking
badly at that width. Verified at 430 / 414 / 390 / 375 / 360 / 320.

`auto-fit` on the tile grid packed three across and stranded the fourth on its
own row — replaced with a fixed 2×2 that collapses to one column at 1100 and
back to two at 900 (once the card moves above the text).

Verified in both themes at 1440 / 1280 / 1100 / 900 / 600 / 390: no horizontal
overflow at any width, no console errors.

### Phase 17 — Skills cube cluster, built in code ✅ **Done** (2026-09-08)

Three rounds of image generation couldn't produce a usable illustration. Round
1 fused the cubes into a honeycomb wrapped in a fake halo. Round 2 fixed the
layout but drew Expo as a meaningless starburst and Power BI as a chart in a
box. There was no round 3 — Sidick's call:

> *"if you can do it for me from the code, why am I going to generate the
> image? So just do it."*

Right call. The generator problem was never solvable: it can't draw a mark it
doesn't know, and every regeneration re-rolled the layout too.

- [x] New `TechCubes.jsx` + `TechCubes.css`; the generated PNG is deleted
- [x] **Official brand paths** via Simple Icons in `react-icons` — already a
      dependency, so no new package. 8 of 9 were available directly.
      **`SiExpo` exists** — the logo the generator failed at twice was sitting
      in the project the whole time.
- [x] **Power BI isn't in Simple Icons** (Microsoft's marks were removed over
      licensing), so **scikit-learn** takes that slot — it's in the Skills list
      already, so it's a claim Sidick already makes.
- [x] Layout is **exact by construction**: a 5×5 lattice gives the 1-2-3-2-1
      diamond. Verified from the DOM, not by eye.
- [x] Colours are each brand's real value, clamped into a lightness band so the
      near-blacks stay visible on a dark page (pandas `#150458`, Expo
      `#000020`). **Ink is chosen per cube** — white or near-black, whichever
      contrasts better. All ≥ 4.76:1. That's also what the real JavaScript and
      React marks do: dark on yellow, dark on cyan.
- [x] Float animation kept, now **staggered** per cube and behind
      `prefers-reduced-motion`
- [x] Hover reveals each technology's name; the `<ul>` carries an aria-label

### Two bugs found while building

**Transform order.** `rotate(45deg) scaleY(0.575)` rendered tilted lozenges,
not isometric diamonds — CSS applies transform functions **right to left**, so
it squashed the square first and rotated the result. `scaleY() rotate()` is the
correct order.

**The last cube was clipped**, hanging 52px below the container. The grid rows
are deliberately shorter than the cubes — that overlap is what makes the
lattice read as isometric — so the final row overflows. The container now
reserves `calc(var(--cube) * 0.56)` of bottom padding.

Also fixed in passing: **`Skills.jsx` imported `./Skills.css` twice**, and the
old `.skills-img` rules that were stretching the PNG by 36% are gone with it.

### Phase 17b — the cubes rebuilt as real solids ✅ **Done** (2026-09-08)

Sidick rejected the first build: *"the one you create with code is not looking
good"* — next to the reference illustration the cubes read as flat stickers.
He was right, and the reason was structural, not cosmetic.

**A drop-shadow chain cannot make a solid.** The extrusion was
`drop-shadow(0 3px 0 var(--side))` repeated five times. That paints one flat
colour under the rhombus — a slab, with no separate planes. A cube reads as a
cube because you see **three differently-lit faces at once**. So each cube is
now three real elements in a `preserve-3d` context: a lit top, a lighter
left wall, a shadowed right wall, folded into place with `transform-origin`.

**The layout was sized in the wrong units.** The grid was laid out in the cube's
footprint (`--cube`), but a cube at the isometric angle *paints* a rhombus
`1.4142 × --cube` wide and `0.8172 × --cube` tall. Every cell was therefore
~30% narrower than the art in it, which is why the cubes collided. The
container now derives `--rw` / `--rh` / `--dp` from that projection and lays
the grid out in those, so the spacing is real.

**`perspective` was breaking the isometry.** Perspective converges on a
vanishing point, so cubes away from centre tilted differently from the ones
near it and the lattice stopped looking like one grid. True isometric
projection is orthographic — the `perspective` declaration is gone, and all
nine cubes are now identical in shape.

Also: the walls were mixed too far toward black and read as mud rather than as
shaded planes, and the idle float pushed the top and bottom cubes outside the
container — the padding now accounts for `--float`.

### Phase 17c — two defects visible in Sidick's crop ✅ **Done** (2026-09-08)

**Dark cubes lost their right wall.** The shadowed face was a fixed
`color-mix(... 66%, #000)`, which is fine for a bright side but sinks an
already-dark one into the page. Python's `#20517a` landed near `#0a1a28`
against a `#181737` background, so the cube looked like it had only one wall —
same for Expo. The step is gentler now (84%/76%) and the two darkest `side`
values were lifted. Shading has to be *relative* to the colour it shades.

**scikit-learn's logo is a wordmark**, so at ~40px it rendered as a smudge
rather than a mark. Replaced with **Tableau** — same Skills row, keeps the
orange in that lattice slot, geometric enough to read small. Its strokes are
thin, so cubes now support an optional `icon` scale (`--icon`, default 44%) to
keep visual weight even across the cluster.

Expo stays despite a minimal mark — Sidick asked for it by name.

### Phase 17d — closed cubes, wider gaps, lid opens on hover ✅ **Done** (2026-09-09)

**The lids were floating.** `rotateX(-90deg)` about a hinge at the base sends a
wall to `z = 0 .. -depth`, but the top face sits at `z = +depth` — so every wall
hung a full depth *below* its own lid, and the dark seam under each top face was
the page showing through the gap. Sidick spotted it as "the top is more open."
The walls now `translateZ(var(--depth))` before folding, so they span
`0 .. depth` and meet the lid. This also made the geometry match the layout
maths that `--rw / --rh / --dp` already assumed.

**Gaps widened** — `--gap-x` 34→48px, `--gap-y` 8→20px — so the cubes read as
separate objects rather than a fused lattice.

**Hover now opens the lid** instead of lifting the whole cube: the top face
rises by `--lift` (15px) along the cube's own up-axis, which is the "open" look
the closed default gave up. Verified from the DOM: `translateZ` steps 25 → 40px
and the name label goes 0 → 1 opacity.

Note: the section has `padding-bottom: 0`, so on phone the bottom cube sits
flush against the next section. Pre-existing, not caused by this change —
raised with Sidick rather than changed, since section spacing is his call.

### Phase 17d — closed-ish cubes, wider gaps, lid opens on hover ✅ **Done** (2026-09-09)

**The lids were floating.** `rotateX(-90deg)` about a hinge at the base sends a
wall to `z = 0 .. -depth`, but the top face sits at `z = +depth` — so every wall
hung a full depth *below* its own lid, and the dark seam under each top face was
the page showing through. Sidick spotted it as "the top is more open." The walls
now `translateZ(var(--depth))` before folding, so they span `0 .. depth`. This
also made the geometry match the maths `--rw / --rh / --dp` already assumed.

**The lid rests ajar, not shut.** Fully flush read as too tight, so `--rest`
(8px) leaves a deliberate sliver of shadow; hover raises it to `--lift` (22px).
Verified from the DOM: `translateZ` 33 → 47px, label opacity 0 → 1.

**Gaps widened** — `--gap-x` 34→64px, `--gap-y` 8→30px — and the container
reserves one `--gap-y` below the cluster, since the taller art was landing flush
against the next section (`#skills` has `padding-bottom: 0`). That padding lives
on `.tech-cubes`, not the section, so it doesn't touch Sidick's page rhythm.

### Phase 18 — Skills text and alignment ✅ **Done** (2026-09-09)

**The picture and the words disagreed again.** The cube cluster showed Figma and
Expo; neither appeared in any category. That is the same fault that started this
whole section — an all-frontend image over a data-science list — just inverted.
There are four categories now, and every one of the nine cubes appears in
exactly one of them:

| | |
|---|---|
| Data Science & Visualization | Python, Pandas, NumPy, Scikit-learn, TensorFlow, Power BI, Tableau, Matplotlib, Seaborn |
| Frontend Development | HTML, CSS, JavaScript, React.js |
| Mobile & Design | React Native, Expo, Figma |
| Backend Development | Node.js, SQL, MySQL, MongoDB |

- **R is gone**, as Sidick asked when the image was still being generated.
- **Python leads Data Science** instead of sitting under Backend. It is his lead
  data language and the crown cube; filing it under Backend read as a mismatch.
  *Assumption flagged to him* — his call to move it back.

**Tool lists now go through i18n.** They were hardcoded English in
`siteData.js` while the titles used `t()` — the only user-facing strings in the
section bypassing the locale files. Now `descKey` + entries in `en.json` /
`fr.json`, so both languages are complete. Verified by rendering `?lang=fr`.

**Two alignment defects, both measured:**

- `.skill-category { margin-top: 3rem }` applied to the *first* category too, so
  the opening heading sat **37px below** the top of the cube cluster while the
  two column boxes aligned perfectly at 405px. Scoped to
  `.skill-category + .skill-category`; the heading now sits 11px above.
- `.skills` had `padding: 0rem 6rem` — **zero vertical**. The next section began
  at the exact pixel this one ended. Now `var(--s-9)`, matching About's rhythm.
  The `768px` and `390px` queries were resetting it back to `0rem 2rem`, so they
  carry `var(--s-8)` now — the phone gap went 25px → 89px.

### Phase 20 — Services fixes + cleanup ✅ **Done** (2026-09-09)

**Services content reverted to invisible.** All five `whileInView` animations in
`Services.jsx` had **no `viewport={{ once: true }}`** — the only section in the
site missing it. framer-motion therefore reversed each one on exit, so scrolling
past Services and back left the heading, paragraph, list and image at
`opacity: 0`. The list was worse: its `initial` is `scale: 0`, so it measured
**0px tall**. Reproduced by scrolling the full page on a phone viewport, then
re-checked after the fix — everything holds at opacity 1, list 108–120px.

**A third `.services-section` padding rule.** The base rule sets
`0px 120px` and the 768px query sets `80px 20px`, but a **fourth**
declaration inside `@media (max-width: 480px)` set `padding: 0px` — content ran
to both screen edges on phones. Base is `var(--s-9) 120px` now (zero vertical
had it butting into its neighbours) and the 480 rule is `var(--s-8) 20px`.
Measured: desktop `96px 120px`, phone `64px 20px`.

**Featured now guards its image.** `MobileProjects.jsx` already did
(`{project.image && …}`); the featured card did not, so promoting any project
with `image: ""` would have rendered a broken-image box. Guarded, with a tinted
placeholder. *The underlying data gap stands* — mobile 1 and 4 still have no
screenshot; that is content, not code.

**Category pill moved to the bottom of the media.** `object-position: top
center` means the top strip of every screenshot is the app's own header, which
is exactly what the pill covered on the two ML & AI cards.

**Deleted `docs/skills-image-prompt.md`** — the code-built cluster replaced it.

### Phase 21 — Services design pass ✅ **Done** (2026-09-09)

Services had only ever been bug-fixed, never reviewed. The review found that
**the copy was already written and simply never rendered**:

| key | uses before |
|---|---|
| `uiDesignDesc` | 0 |
| `consultingDesc` | 0 |
| `mobileApp` / `mobileAppDesc` | 0 |
| `webDevDesc` | 1 — as the *section subtitle*, not Web Development's own line |

So the section showed three bare bullets while three finished descriptions sat
unused in both locale files, and Skills — a section that only lists tools — was
richer than the section that actually sells.

Now a **2x2 grid** matching the Skills pattern: tinted `--fam-*` icon, title,
and the description that already existed. `services.subtitle` is a new key so
the tagline stops doubling as Web Development's description.

**Two content decisions were Sidick's, not mine:**
- **Mobile Development added** as a fourth service — it was written in both
  locales but never shown, and Skills/Featured both carry mobile work.
- **Flutter dropped** from `mobileAppDesc` (now React Native and Expo). Nothing
  else on the site mentioned Flutter; Skills lists Expo.

### Phase 22 — Contact + footer ✅ **Done** (2026-09-09)

**The animation bug was systemic, not a Services quirk.** Fixing one file was
the wrong response — a repo-wide audit found **25 unanchored `whileInView`**
across five components:

| file | unanchored |
|---|---|
| `pages/HeroPage.jsx` | 16 of 17 |
| `contact/Contact.jsx` | 4 of 4 |
| `project/Projects.jsx` | 2 of 2 |
| `skills/Skills.jsx` | 2 of 3 |
| `hero/Hero.jsx` | 1 of 1 |

Every one reverted to its `initial` state on scroll-out. All 39 `whileInView`
calls now carry `viewport`. The sweep adds `{ once: true }` **only** — no
`amount` — so trigger timing is unchanged and the single behavioural difference
is that content stops disappearing.

**`footer.byMe` was the template placeholder** — "MyPortfolio" / "MonPortfolio",
rendered twice (footer heading and copyright) while the site brands itself
SidickSino everywhere else. Now SidickSino in both locales.

**Email and phone were dead text.** `#contact` contained **zero links**; the
footer's address and number were plain `<span>`s. Tapping a phone number on a
phone did nothing. Now `mailto:` / `tel:` in both places (2 of each), with the
`Email` heading in the contact card i18n'd — it was hardcoded English.

Also: copyright read "All rights reserved Made with 💜" (no separator), and the
`480px` query zeroed `.contact-section` padding — **the third section with that
exact fault**, after Skills and Services. Every section now measures real
vertical padding at both sizes; none is 0.

### Phase 23 — shadows + contact card layout ✅ **Done** (2026-09-09)

Per Sidick: the project cards and the contact form were casting heavy shadows.
They were — 35px and 50px blurs read as a drop, not a lift:

| | before | after |
|---|---|---|
| `.project-card` | `0 15px 35px` | `0 4px 12px` |
| `.project-wrapper` | `0 8px 25px` | `0 3px 10px` |
| `.project-wrapper:hover` | `0 15px 35px` | `0 8px 20px` |
| `.contact-form-wrapper` | `0 20px 50px` | `0 6px 16px` |
| `.contact-form-wrapper:hover` | `0 30px 60px` | `0 10px 26px` |
| `.info-card:hover` | `0 15px 35px` | `0 8px 20px` |

**Location and Phone now share a row on phones**, Email keeps the full width —
its address would wrap badly in half. `.contact-info` becomes a 2-column grid
below 768px with the third card spanning; below 360px it stacks, since two
cards cannot hold an icon plus a label at that width.

The half-width card broke the phone number mid-number — "+250 793 22 / 58 53",
which reads as two numbers. Its copy drops to 0.86rem with `white-space: nowrap`
on that card only. Verified at 390 / 375 / 340px: one line, no overflow, no
horizontal scroll.

### Phase 23b — light-mode shadows + equal-height cards ✅ **Done** (2026-09-09)

Sidick sent a real-device light-mode screenshot showing two faults.

**`--shadow` had no light-mode value.** It is declared once —
`rgba(0, 0, 0, 0.3)` — and the `html.light-theme` block overrode surfaces, text,
borders, hues and `--grid-line` but never this. So a 30%-black drop landed on a
white page and read as a grey smudge. Light theme now gets
`rgba(16, 24, 40, 0.08)`.

Six more shadows were **hardcoded black** and could not follow the theme at all
(`Navbar.css` x2, `Contact.css`, `Hero.css`, `HeroPage.css` x2). All now use
`var(--shadow)`. Verified: the token resolves to `rgba(16, 24, 40, 0.08)` in
light and `rgba(0, 0, 0, 0.3)` in dark.

**The mismatched card heights were my own doing.** I had written
`align-items: start` on the mobile `.contact-info` grid, which sizes each card
to its own content — Location wraps to two lines, Phone to one. Removed, so
grid's default `stretch` applies; both measure 226px. The shorter card's
content is centred rather than stranded at the top.

### Phase 24 — Hero, #projects, category pages, token sweep ✅ **Done** (2026-09-09)

**`min-height: 100vh` was manufacturing dead space.** `.projects-section` and
`.contact-section` both forced a viewport height, but neither has enough content
to fill one — so the browser padded the difference, and **the gap grew with
screen height**: 355px of nothing under the project cards at 1000px tall,
**755px at 1400px**. That scaling is what identified it as forced height rather
than a layout bug. Removed from both; every section's slack now equals its own
padding-bottom. `#projects` 1400 → 745px, `#contact` 1400 → 1025px. The hero
keeps its 100vh — filling the viewport is the point there.

**The category pages were a navigation dead end.** `/projects/web|mobile|design|ai`
render *outside* the `"/"` route element, so they get no Navbar and no Footer,
and no page carried a back link. A visitor arriving from "View Project" could
only use the browser button. Worth noting why simply adding the chrome would not
have fixed it: every nav and footer link is an `#anchor`, which does nothing from
a sub-route. Added a `BackToHome` component — a real `<Link to="/">` — to all
four, with `projectsPage.backHome` in both locales. Verified by clicking it:
lands on `/` with the hero mounted.

**Category card CTAs were at four different heights per row**, because tech
chips wrap to a different number of lines per project. `.project-wrapper` is a
column flex, `.project-card1` grows, and `.project-links` takes `margin-top:
auto`. Measured across all four pages: **0 rows with a misaligned CTA**.

**36 hardcoded brand colours replaced.** Every `rgba(231, 72, 200, α)` became
`color-mix(in srgb, var(--accent) α%, transparent)` across 8 files — three more
than the first count found (`LanguageToggle`, `ThemeToggle`, `Footer` also had
them). Changing `--accent` now actually changes the site.

### A string comparison that reported a false mismatch

The check that the colour refactor was a no-op compared computed values with
`===` and reported every one as differing. They were identical — `color-mix`
serializes as `color(srgb 0.905882 0.282353 0.784314 / 0.3)` while `rgba()`
serializes as `rgba(231, 72, 200, 0.3)`. Same colour, different notation
(`0.905882 x 255 = 231`). Fixed to normalise both to 0–255 channels before
comparing: **all identical**.

Fourth instance this session of asserting on a representation instead of the
thing itself, after the theme attribute, the grid-template string, and the
`.tech-cubes` padding box.

### A screenshot taken mid-animation

The first light-mode capture came back as a half-transparent, half-slid mess,
because it used a bare `scrollIntoView` instead of the walk-then-settle
sequence established in Phase 19. The capture now **asserts** that nothing in
`#contact` is below full opacity or still carrying a transform, and throws
rather than saving a misleading picture.

### Two visual reads that measurement overturned

The footer's "Contact" column *looked* washed out next to "Navigation" in every
screenshot. Contrast said otherwise: **17.26:1, identical to "Navigation"**, and
the faded audit found no footer element below 0.99 opacity. It is a
`fade-up delay-2` CSS animation caught mid-flight by the capture.

And the final audit's 13 faded elements were all deliberate hover-reveals —
9 `.tech-cube__label` and 4 `.card-glow` (`.project-card:hover`). Checking
*which* elements, rather than the count, is what separated those from the real
reverts.

### A leftover rule that silently killed the grid

`@media (max-width: 1024px) { .services-text ul { display: inline-block } }` —
written to centre the old bullet list — **overrode `display: grid`** on the new
list. Below 1024px it was not a grid at all, so it collapsed to one column *by
accident*. Now explicit: 2 columns to 700px, 1 column below.

### A check that read an unresolved value

The column check was
`getComputedStyle(el).gridTemplateColumns.split(' ').length`. When an element is
**not** a grid container, that property returns the *specified* value —
`"repeat(2, 1fr)"` — which splits into 2 tokens. So it reported "2 columns" for
a page rendering a single column, and it was the screenshot that contradicted
it. It counts distinct `left` offsets of the actual items now, and reports
`display` alongside. Third variant of the same mistake this session: asserting
on a proxy rather than the rendered result.

### An over-strict check

The verification flagged desktop FAIL on one element at `opacity: 0` — the
`.rrrr` theme illustration, which is `display: none` above 480px. A hidden
element's opacity is meaningless. Counting invisible nodes as failures is the
mirror of the earlier problem: those checks could not fail, this one could not
pass. Both come from asserting on a proxy instead of the thing itself.

### Phase 19 — Featured Work card size ✅ **Done** (2026-09-09)

Cards were **424 x 504** — a 0.84 portrait ratio, which is what made them read
as oversized. Four changes, all proportional rather than scaling anything down:

| | before | after |
|---|---|---|
| media aspect | 16 / 10 (265px) | 16 / 9 (238px) |
| body top padding | `--s-5` | `--s-4` |
| card title | 1.35rem | 1.22rem |
| description | unbounded (3 lines) | clamped to 2 |

The clamp mattered most: the paragraph is the `flex: 1` element, so the single
longest blurb set the height of **all six** cards. Result — card 504 → **444**
(now 1.05, roughly square), grid 1041 → 919, section 1541 → 1419.

**Second pass — still too big.** Height alone was not the lever: card *width*
is set by the grid band, and three columns across a 1400px section forces 424px
regardless of what the card does. Narrowing the band to **1140px** keeps the
tidy 3+3 layout while shrinking every card, plus a tighter body
(`--s-4` padding, `--s-2` gap, 1.12rem title, 0.88rem copy).

**424 x 504 → 337 x 369 — 42% less area.** Grid 1041 → 770, section 1541 → 1270.

**Third pass — 4x2 desktop, 6 on phones.** Per Sidick: four across on
laptop/desktop showing the **top 8**, single column on phones showing the
**best 6**.

- `.featured-grid` is now an explicit `repeat(4, 1fr)`. The old
  `auto-fill, minmax(320px, 1fr)` resolved to 3 columns at this width — that
  implicit resolution is what pinned cards at 424px in the first place.
- Band restored to 1400px (it had been narrowed to 1140 to shrink 3 columns;
  with 4 columns the wider band is what keeps cards readable).
- 2 columns between 768–1180px; 1 column below 768.
- The phone cap is `\.featured-card:nth-child(n + 7) { display: none }`, not a
  JS viewport check — no resize listener, no hydration mismatch, and
  `display: none` means those two lazy images are never fetched on a phone.
- `featuredProjects` grew 6 → 8. **Order matters now**: 7–8 are the ones phones
  drop, so the strongest six stay first.

**Picking the two additions surfaced data problems.** The obvious candidates
were unusable and only a check caught it: **mobile 1 and 4 have `image: ""`**,
and **design 1 reuses the TchadInfos image** already shown by the featured
mobile card. Also **web 5 and ai 1 are the same project** (identical liveUrl),
so featuring both would have shown it twice. Added SinoAI (ai 1) and Sino
Coffee (web 3) — distinct images, real live URLs.

Verified: desktop 8 visible / 4 cols / **316 x 357**; tablet 8 / 2 cols; phone
**6 of 8** / 1 col. Zero broken images, zero faded cards, no console errors.

### The dead space that wasn't

The first screenshot showed three cards and ~850px of emptiness below, which
looked like a serious layout bug. It was not. There are **six** featured
projects in two rows, and the second row plus the See-all button were still at
`opacity: 0` — framer-motion's `whileInView` had not fired for anything below
the fold at capture time.

`scrollIntoView` alone does not trigger it either. The capture now walks the
whole section in 200px steps, settles, and then **asserts every card and the
See-all link have reached full opacity** before screenshotting; it prints the
count of still-faded elements (0 desktop, 0 phone). Screenshotting an animated
page without waiting for its entrance animations reports a layout that never
ships.

**Noted, not fixed:** the category pill collides with the app's own header text
on the two ML & AI cards — `object-position: top center` shows the very top of
each screenshot, which is exactly where those apps put their titles. Raised with
Sidick rather than changed.

### A third measurement that couldn't fail

"Does the next section start after this one ends" is always true for adjacent
siblings, and padding added *inside* a box moves its border edge with it — so
both framings reported 0 regardless. Measure the last **cube** against the next
**section**: 159px desktop, 89px phone.

Same lesson as the `.tech-cubes` padding check and the `data-theme` theme check:
**a check whose value cannot change is not a check.** Also nearly reported the
Skills title as hidden under the navbar — that was `scrollIntoViewIfNeeded`
ignoring `scroll-margin-top`. A real scroll clears it by 114px.

### Two process failures worth keeping

**A rewind silently undid this work mid-edit.** Sidick ran Code rewind, which
reverted `TechCubes.css` to its pre-hinge-fix state and killed the dev server.
The follow-up patch was written against the file as I remembered it, so most of
its `str.replace` calls matched nothing and did nothing — except one, which left
a `var(--rest)` reference with no definition. **`str.replace` without a check is
silent on failure.** Every substitution in the reapply asserts its anchor exists
first and prints per-edit, which is how the half-state was caught.

**A measurement that couldn't detect what it claimed to.** The fit check
compared `.tech-cubes`' bottom to the section's to prove there was room below the
last cube — but the new padding is *inside* `.tech-cubes`, so its border box
moves with it and the number is 0 no matter what. It measures the last
`.tech-cube` against the section now: 35px desktop, 25px phone.

### A test that lied

The first pass at verifying both themes reported light mode passing while the
screenshot was plainly still dark. The script set `data-theme` on `<html>`; the
app actually toggles a **`.light-theme` class** driven by `localStorage`
(`ThemeProvider.jsx`). Setting an attribute nothing reads fails silently.

This is the same failure as the `.language-toggle` false negative in Phase 6.
The check now asserts the class landed *and* that `body`'s computed background
actually changed, and throws if it didn't — a theme test that cannot detect the
theme is worse than no test.

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

## Phase 1 — Build one real design system ✅ **DONE** (2026-09-07)

The root problem turned out to be worse than "33 hex values with no rule":
**every one of the 11 stylesheets declared its own `:root` block**, each a
near-identical copy of the same ~20 tokens. They all had equal specificity, so
whichever file loaded last silently won. There was no source of truth to
change.

| | Before | After |
|---|---|---|
| Files declaring `:root` | **11** | **1** (`src/index.css`) |
| Hex values outside `index.css` | 27 | **10** |
| `#0033a0` (the navy) | 12 declarations | **0** |

Each component file now carries a pointer comment where its block used to be,
so the next person sees why it's gone.

### Two corrections to this plan, found by measuring

The token values written below were **guessed**. Measuring contrast ratios
before applying them caught two that would have shipped accessibility bugs:

1. **`--text-muted: #7d7a9e` fails** — 4.23:1 on the dark background, under the
   4.5:1 minimum. It was *worse* than the `#8888aa` it replaced (5.05:1).
   Shipped **`#9c99bd`** instead: **6.33:1**.
2. **White text on `--accent` (`#e748c8`) fails at 3.41:1.** The design skill
   said "white text in both themes" — that would have been an accessibility
   bug on every primary button. Black on the same magenta is 6.16:1.
   Added **`--accent-strong: #b52a9d`**, which carries white at **5.55:1** and
   also works as accent *text* on light backgrounds (5.27:1, vs plain accent's
   3.23:1). Every ratio is recorded as a comment beside its token.

**Deviation:** kept `--bg: #181737` rather than the `#12112a` written below.
The darker value was arbitrary, and the hero glow, grid and portrait mask are
all tuned against `#181737`. Changing the base background is a large visual
risk for no stated benefit. Layering comes from `--surface: #1f1e42` and
`--elevated: #262550` instead.

**Legacy aliases:** ~10 stylesheets still use the old names (`--primary`,
`--background`, `--text-secondary`, …). They're aliased onto the canonical
tokens in `index.css`, so nothing broke. Retire them per component during
Phase 2; don't add new uses.

Verified: production build passes, lint clean, all six sections screenshotted
in both themes at 1440×900, zero console errors, zero failed requests.

**Found but deferred to Phase 2:** `--card-color` is used four times in
`Projects.css` but was never defined in *any* of the 11 blocks — it's set
inline per-card from `project.color` in `Projects.jsx:29`. That is the exact
mechanism behind the four-colour button row in 2.1.

### 1.1 Kill the rogue navy blue ✅

`src/index.css:19` defines `--border: #0033a0` — a saturated navy in an
otherwise magenta/violet palette. It is currently the contact form's input
borders and the line under the navbar. It matches nothing.

- [x] Replace with a neutral: `--border: rgba(255, 255, 255, 0.10);`
- [x] Light mode: `--border: rgba(17, 17, 17, 0.12);`
- [x] Grep for hard-coded `#0033a0` and remove every instance

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

- [x] Replace `:root` with the above
- [x] Update `html.light-theme` to override **only** surfaces, text, border —
      plus the theme-aware `--accent-text`, `--fam-*` and `--grid-line` added
      later. `--accent` itself is never redefined.
- [x] Never redefine `--accent` per theme — the brand colour is constant

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

#### 2.0c Bottom-edge alignment ✅ **Done** (2026-09-07)

Spotted by Sidick from a zoomed screenshot: the figure didn't line up with the
bottom of the grid rectangles. Investigating found **three competing horizontal
edges** stacked within 40px:

1. the grid's bottom boundary,
2. where the figure faded out,
3. the top of the About section.

- [x] **Fade set to `72% → 100%`.** Briefly shortened to `93% → 100%` to stop
      the figure floating, but that removed an effect Sidick liked: with a long
      fade the background grid reads **through** the legs, so the figure looks
      like it recedes behind the rectangles rather than being chopped off.
      The two goals weren't in conflict — the long fade is back, with the
      gradient reaching zero at exactly `100%` (the element bottom = hero
      bottom = where the grid stops) instead of the original `97%`, which left
      him dissolving a few px shy of the seam.

> **Keep the long fade.** `72% → 100%` is deliberate: the see-through legs are
> the intended look. Don't "tidy" it to a short fade.
- [x] **Grid anchored to the bottom** (`background-position: left bottom`). It
      tiled from the top, so the final row was cut mid-cell and the rectangles
      never completed at the section edge. Any partial row now falls at the
      top, behind the navbar.
- [x] **`margin-bottom: 40px` removed from `.hero`** — it exposed a 40px band
      of bare body background between the grid and About, reading as an extra
      stripe under the figure. About supplies its own top padding.

Result: grid end, figure base and About top all land on the **same pixel**
(882 at 1728×962). Verified aligned at 1280 / 1440 / 1728 / 1920.

Tablet and mobile intentionally differ — the stacked layout keeps 100px of
bottom padding, so the figure floats rather than sitting on the seam. Checked
at 390px: the short fade still dissolves cleanly there, no hard edge.

**Still open from this work:**

- [ ] The generated expression is neutral-stern rather than the "slight smile"
      the prompt asked for — worth a regeneration if you want warmer
- [ ] Crop lands just above the knee (cropping near a joint); masked by the
      section fade, but a mid-thigh or waist crop would be tidier
- [ ] `phote5.jpeg` is now free again — it's still in About

### 2.1 Unify the four "View Project" buttons ✅ **Done** (2026-09-07)

The four colours lived in **`src/data/siteData.js`** as a `color` field per
category — `#6366f1`, `#8b5cf6`, `#ec4899`, `#f59e0b`. **None of them was the
brand magenta.** `Projects.jsx` piped each into `--card-color` as an inline
style, and `Projects.css` used it for the icon, the top bar, the glow and the
link.

- [x] Deleted the `color` field from all four entries — presentation doesn't
      belong in the data layer
- [x] Removed the inline `style={{ "--card-color": … }}` from `Projects.jsx`
- [x] Replaced all four `var(--card-color)` uses with `var(--accent)`

**↩️ Then revised, on Sidick's push-back (2026-09-07).** He was right that
colour-coding the categories has real value — visitors can tell them apart at a
glance — and flattening all four to one magenta lost that. The mistake in my
original analysis was conflating *"four colours"* with *"four **unrelated**
colours"*. Only the second was the problem.

Shipped a third option instead of either extreme: **one derived family.**

- [x] Four tokens `--cat-web` / `--cat-mobile` / `--cat-design` / `--cat-ai`
      in `index.css` — one shared saturation, hues spaced evenly and anchored
      on the brand magenta, **lightness solved per hue so each lands at ~5:1
      against its own theme's card surface**
- [x] Separate light-theme values — the dark set is unreadable on a white card
- [x] `siteData.js` references the token by name (`var(--cat-web)`), never a
      raw hex, so colour stays in the design system
- [x] `Projects.css` uses `var(--card-color, var(--accent))` — accent fallback
      if a card ever ships without one

| | Old | New (dark) | New (light) |
|---|---|---|---|
| Web | `#6366f1` indigo | `#e24dc4` | `#c720a5` |
| Mobile | `#8b5cf6` violet | `#e45b77` | `#d62347` |
| Design | `#ec4899` pink | `#b468e6` | `#9e3ddf` |
| ML & AI | `#f59e0b` amber | `#5e87e5` | `#3668de` |

Matched *contrast* rather than matched lightness is what makes them read as one
set. Verified in both themes; resolved `--card-color` confirmed per card in the
browser.

### 2.2c Hero grid invisible in light mode ✅ **Done** (2026-09-07)

Reported by Sidick. The grid was drawn with a hard-coded
`rgba(255, 255, 255, 0.08)` — **white lines**, so it only ever existed on the
dark theme and vanished completely on the light page.

- [x] Added a theme-aware `--grid-line` token: white at 8% on dark, dark ink at
      7% on light
- [x] `Hero.css` consumes it instead of the literal

Verified the token resolves differently per theme and the grid is visible in
both.

### 2.2 About + Skills icons ✅ **Done** (2026-09-07)

Originally flattened all three About icons to one magenta. **Reverted on the
same reasoning as the project cards** — Sidick asked for both About *and*
Skills icons to be varied.

- [x] Generalised the palette: `--fam-1..4` are the family; `--cat-*` are now
      semantic aliases onto it, so components name a *meaning* and the hues are
      re-derivable in one place
- [x] About: one `.icon-circle` rule taking `--icon-color` per item (was three
      near-identical rules in three unrelated hues, with those hues *also*
      hard-coded into the SVG `fill` attributes — the CSS alone did nothing;
      fills are now `currentColor`)
- [x] Skills: colour moved into `skillsData` as a token reference, passed
      through `--icon-color`. The glyph had been `var(--text)` — a white icon on
      a magenta wash, so its colour carried no meaning at all.
- [x] Circle tint derives from the icon hue via `color-mix()` rather than a
      second hard-coded rgba per item

<details>
<summary>Original 2.2 (superseded — single accent)</summary>

Three near-identical CSS rules (`.icon-circle-1/2/3`) differing only in hue —
magenta, olive green, tan — **and the SVGs had those same hues hard-coded as
`fill=`**, so fixing the CSS alone would not have worked.

- [x] Collapsed three classes into one `.icon-circle`
- [x] SVG fills → `currentColor`, so icons inherit from the circle
- [x] Circle is now `--accent-subtle` background with `--accent` icons

</details>

### 2.2b The "SIDICK" headline gradient ✅ **Done** (2026-09-07)

Flagged in the very first audit as "a broken gradient, rendering green/magenta
patchy". Root cause found: **your name ran magenta → olive green (`#6A9955`) →
dark magenta.** Two rules targeted the same span, the later one winning.

- [x] Both rules rewritten magenta-only using `--accent` / `--accent-hover` /
      `--accent-strong`; the animated shimmer is kept
- [ ] **The logo `SidickSino` still uses the same magenta→green gradient**
      (`Navbar.css:71`). Left alone deliberately — it's the brand mark and it
      pairs with the green status dot Sidick chose to keep. Ask before changing.

### 2.3 Audit every remaining colour ✅ **Done** (2026-09-07)

- [x] Removed dead `.span2` rules from `Projects.css` and `Skills.css`
      (orphaned when the ✨ emoji went in Phase 0)
- [x] Tokenised the Footer's hard-coded magenta gradient

**Stray hex outside `index.css`: 27 at session start → 10 after Phase 1 → 8 now.**

All eight remaining are deliberate or dead:

| File | Values | Verdict |
|---|---|---|
| `art/Art.css` | 5 | Dead — `<Art />` is commented out in `App.jsx:43` |
| `hero/Hero.css` | `#000` | Correct — a mask gradient needs opaque black |
| `navbar/Navbar.css` | `#26a32c` | Deliberate — the green status dot |
| `pages/HeroPage.css` | `#000`, `#26a32c` | Dot + button hover text; `/pages/hero` is a side route |

<details>
<summary>Original 2.1–2.3 instructions (superseded)</summary>

### Original 2.1 — Unify the four "View Project" buttons

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

</details>

---

## Phase 3 — Show the work, not the categories ✅ **DONE** (2026-09-07)

New `Featured` section on the homepage, above the category cards. Six real
projects with their own screenshots, descriptions, tech and links.

**Which six, and how to change them:** `featuredProjects` at the bottom of
`src/data/projectData.js`. Each entry references an existing project *by id*,
so titles, images, tech and URLs stay defined once. Editing that one list is
the whole job — aim for 4–6, since more stops feeling curated.

Currently: AAPT, Académie Royale, SINOINFOS (web) · TchadInfos (mobile) ·
Pima Diabetes, Disease Prediction (ML). Chosen for real clients plus technical
range across dev and ML — swap freely, it's a taste call.

- [x] `Featured.jsx` + `Featured.css`, wired into `App.jsx` before `<Projects />`
- [x] Category pills coloured from the `--cat-*` aliases, so the featured grid
      and the category cards below agree on what colour "web" is
- [x] Whole card is the link, with a visible `:focus-visible` ring
- [x] Three tech chips per card (`technologies.slice(0, 3)`)
- [x] `featured.*` strings added to **both** `en.json` and `fr.json`; key parity
      between locales verified programmatically
- [x] `Browse all 19 projects` CTA — count derived from `totalProjectCount`,
      not typed by hand, so it can't go stale
- [x] Reduced-motion guard; entrance animations only

### Two problems this surfaced

**All four mobile projects have `liveUrl: "#"`** — they're apps, so there is no
public web URL. The card would have looked clickable and gone nowhere. Cards
without a real URL now route to their category page instead, with the CTA
reading *"See details →"* rather than *"Visit site"*. Verified by clicking
through to `/projects/mobile`.

**`SinoBoutique` and `To-Do` have no screenshot in `projectData.js`**, so
`MobileProjects.jsx` was rendering `<img src="">` — React warns about this and
the browser re-requests the page. Pre-existing, but Phase 3 made that page far
more reachable, so it's fixed: the image block is conditional now.

- [ ] **Add screenshots for SinoBoutique and To-Do**, then they can be featured
      too. Two of your 19 projects currently have no image at all.

### Still worth doing (yours, not mine)

- [ ] **Sharpen the descriptions.** They're currently adjective-led ("modern",
      "sleek", "seamless"). Concrete outcomes read far better — what it does,
      for whom, and any real number you can stand behind. I deliberately did
      not invent metrics.
- [ ] The subtitle originally claimed "every one is live" — corrected, since
      TchadInfos isn't. Keep an eye on that if you change the featured six.

<details>
<summary>Original Phase 3 instructions (superseded)</summary>

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

</details>

---

## Phase 4 — Typography ✅ **DONE** (2026-09-07)

Verified in the browser via `getComputedStyle`, not guessed — an audit script
walked every leaf text node and reported which face, size and weight actually
rendered.

| | Before | After |
|---|---|---|
| Elements computing to Arial | many | **0** |
| Body text set in a display serif | 4 form labels | **0** |
| `@import` lines in component CSS | 26 across 10 files | **0** |
| Google-Fonts CSS requests | 3 distinct, render-blocking | **1 `<link>`** |
| Font families downloaded | 3 | **2** |
| Epilogue weights requested | 14 (incl. 7 italics) | **6** |

### What was actually wrong

**4.1 — `body { font-family: Arial }`** while Epilogue was being downloaded.
Anything without an explicit family fell back to Arial. Now `var(--font-body)`;
the audit confirms **zero** elements compute to Arial.

**4.2 — the offender was the contact form's `<label>`s**, not paragraphs.
They were Elsie at 17.6px — a decorative display serif used for UI text, and
the source of the odd ball-terminal glyphs visible in "Subject". Now the body
face at 0.9rem/500. Every heading correctly stays in Elsie.

**4.3 — three broken font declarations, all failing silently:**
- `@font-face` for `"Cheap Fire"` pointed at `./assets/fonts/CheapFire.ttf`,
  which does not exist — declared in **5** stylesheets. Removed.
- `"Modern Negra"` was used in `Art.css` with **no `@font-face` at all**, even
  though the `.ttf` sits in `public/fonts/`. Declared properly.
- `"DM Serif Text"` was never imported from anywhere → now `--font-display`.

**4.4 — `@import` duplication.** CSS `@import` is render-blocking *and*
serialised: the browser must fetch the stylesheet, parse it, then start the
font request. Moved to one `<link>` in `index.html` with `preconnect`.

**Bonus found while measuring:** `--font-fire` aliases to `--font-display`
(Phase 1), so **Abril Fatface was downloaded on every page load and never
rendered**. Dropped. Italic weights were requested too — `font-style: italic`
appears **nowhere** in `src/`. Requesting only the 6 weights actually used.

<details>
<summary>Original Phase 4 instructions (superseded)</summary>

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

</details>

---

## Phase 5 — Light mode ✅ **DONE** (2026-09-08)

Audited rather than eyeballed: a script walked every visible leaf text node,
resolved its **effective** background by climbing ancestors until it hit an
opaque one, and computed the real contrast ratio against the WCAG AA threshold
for that text's size and weight.

| | Before | After |
|---|---|---|
| Light-theme contrast failures | **6** | **0** |
| Dark-theme contrast failures | **3** | **0** |

### The framing in this plan was wrong

I had this filed as "light mode is an afterthought". The audit showed **dark
mode was failing too**, on the same root cause: white text on `--accent`
(`#e748c8`) is **3.41:1** — under the 4.5:1 minimum — wherever it appears.
Every accent-filled button on the site had been failing in both themes.

So this wasn't a light-mode bug list, it was one systemic issue with a
light-mode-only symptom. Fixed with a token rather than patched per component:

- **`--accent-text`** — accent used as *glyphs* rather than as a fill. Resolves
  to `--accent` on dark (5.06:1) and steps down to `--accent-strong` on light
  (5.27:1, vs plain accent's 3.23:1). Applied to **20** `color:` declarations
  across 8 stylesheets.
- **Accent fills that carry white text** now use `--accent-strong` (white on it
  is 5.55:1): `.btn-primary`, `.nav-cta`, `.language-toggle`.
- **`.btn-primary` had `color: var(--text)`** — which flips with the theme, so
  the button read white-on-magenta in dark and black-on-magenta in light.
  Pinned to `--on-accent`.

### Also fixed

- **The theme toggle was hard-coded `#0077ff`** — the brand turned *blue* on the
  light theme. The source even carried a comment saying "ou garde
  `var(--primary)` si tu veux". Now `--accent-strong`.
- **The featured category pills** sat at ~4.15:1 — 11.5px text over a
  *translucent* chip on top of a photo, so the effective background was
  unpredictable. Chip is opaque now.
- Footer brand gradient moved off raw `--primary` onto the theme-aware tokens.

### Re-verified with animations forced off

The first clean run was suspicious: entrance animations start at `opacity: 0`,
and the audit skips anything under 0.5 opacity — so un-revealed elements were
being silently excluded. Re-ran with `*{opacity:1;animation:none}` injected to
force everything visible. Still **0 failures** in both themes.

**No longer relevant:** the note below suggesting "ship dark-only if you can't
give light mode real attention". Light mode now passes everything dark mode
does.

<details>
<summary>Original Phase 5 instructions (superseded)</summary>

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

</details>

---

## Phase 6 — Polish, accessibility, performance ✅ **DONE** (2026-09-08)

| Check | Before | After |
|---|---|---|
| Images shipped | **15.5 MB** | **1.2 MB** (−91%) |
| Project images with `alt` | **0 of 19** | **19 of 19** |
| Infinite animations guarded for reduced motion | 3 of 16 | **all** |
| Tab stops with a visible focus ring | some | **14 of 14** |
| `<html lang>` | hard-coded `fr`, site defaulted to English | follows the locale |
| Horizontal overflow (1920/1440/768/390) | — | none |

### The two that actually mattered

**Every project image shipped with no `alt` attribute.** Not empty — *absent*.
`WebProjects`, `DesignProjects` and `AIProjects` all rendered
`alt={project.title}`, but **no project object has a `title` field** — they use
`titleKey` for i18n. So `alt` resolved to `undefined` and React omitted it, and
a screen reader announced the filename. Confirmed in the browser (`alt: null`
on all 8 web images) before and after. Now `alt={t(project.titleKey)}`, verified
0 of 17 missing across all four routes.

**15.5 MB of images.** `sdark.png` alone was 5.4 MB. Converted every raster to
WebP (quality 82, capped at 1600px wide) — `sdark` went 5408 KB → 172 KB, 97%
off. 21 imports rewritten; the build now bundles **no** PNG or JPEG at all.
Originals removed from the working tree (git history still has them).

### The rest

- **Focus rings.** `.nav-cta` and `.nav-toggle` set `outline: none` with nothing
  in its place. Removed, plus a site-wide `:focus-visible` baseline in
  `index.css` whose specificity (0,1,1) beats a component class — so it holds
  even if someone reintroduces `outline: none`. Tabbed 14 elements: all ringed.
- **Reduced motion.** Only 3 of 16 infinite animations were guarded. Wrapping
  each is fragile, so: a global `@media (prefers-reduced-motion: reduce)` reset
  for CSS, plus `<MotionConfig reducedMotion="user">` in `App.jsx` — framer
  animates in JS, so CSS can't reach it. Verified under an emulated
  reduced-motion profile: **0** animations still running.
- **`<html lang>`** was `fr` while i18next defaulted to `en`. `src/i18n.js` now
  syncs it on boot and on `languageChanged`. Verified `en → fr → en`.
- **Layout shift** was already handled — both grids use `aspect-ratio`
  containers, so images reserve their space before loading.
- **Form labels** were already correct (`htmlFor`/`id` pairs). No change needed.
- Horizontal overflow: `document.scrollWidth` never exceeds `clientWidth` at any
  tested width. (`body.scrollWidth` reads larger — that's off-screen animation
  start states, contained by `overflow-x: hidden`.)

> **A false negative worth recording.** The first automated pass reported
> `<html lang>` as "static". There are **two** `.language-toggle` buttons
> (desktop + mobile menu) and the test clicked the hidden one, with the failure
> swallowed by a `.catch()`. Re-run against `:visible`, it worked. A silent
> catch around an assertion turns a broken test into a passing lie.

<details>
<summary>Original Phase 6 instructions (superseded)</summary>

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

</details>

---

## Phase 7 — Repo hygiene ✅ **DONE** (2026-09-08)

- [x] **README rewritten.** Was the stock `# React + Vite` template with
      `# SidickPortfolio` appended — the first thing a recruiter sees on GitHub.
      Now: what the site is, the live URL, two screenshots, the stack, how to
      run it, the directory layout, and the two conventions someone needs before
      touching it (tokens live only in `index.css`; content lives in `data/` and
      `locales/`). Every referenced path verified to exist.
- [x] **Screenshots** committed to `docs/`, converted to WebP first —
      801 KB → 26 KB and 867 KB → 69 KB. No point fixing image weight in Phase 6
      and then adding 1.7 MB of PNGs to the repo.
- [x] **Dead `<Art />` removed** from `App.jsx` — a commented-out element plus
      its unused import. The component files stay in `src/components/art/` so it
      can be re-enabled.
- [x] `plan.md` kept tracked — it's the record of what was measured and why.

### Security: 3 vulnerabilities → 0 in production

`npm audit` reported 2 high + 1 critical. They are not equivalent, and the
distinction is the whole point:

| Package | Severity | Ships to the browser? | Action |
|---|---|---|---|
| `react-router` / `react-router-dom` | HIGH | **Yes** | Upgraded 7.9.1 → **7.18.3** |
| `tar` (via `@tailwindcss/oxide`) | CRITICAL | **No** | Upgraded Tailwind 4.1.13 → **4.3.3** |

The `tar` advisories are about extracting malicious archives — it's pulled in to
unpack Tailwind's native binary at **install** time and never reaches the
bundle. Alarming label, no runtime exposure for a static site. The React Router
ones (open redirect via `<Link>`/`useNavigate`, XSS) genuinely do ship.

**`npm audit --omit=dev` now reports 0 vulnerabilities.**

Verified after the router jump: all six routes render, client-side navigation
works, no console or page errors.

### 19 vs 18 — both counts were right (2026-09-09)

Sidick counted 19 projects and the API reports 18. The old hardcoded data had
**19 listings but 18 distinct projects**: SinoAI appeared in *both* `web/5` and
`ai/1` with the identical `liveUrl`
(`https://sinoai-chi.vercel.app/`). The `UNIQUE (live_url)` constraint rejected
the second insert during the migration — that was the "skipped" row. Nothing is
missing; one project simply stopped appearing twice.

### The real bug the question surfaced

`projects.generated.json` had been committed *before* `featured_order` reached
the deployed API, so the featured grid fell back to id order. Live, the first
six were AAPT, Académie Royale, SinoCoffee, Sino Ai, SINOINFOS, TchadInfos —
and phones show only the first six, so **both ML projects were invisible on
mobile**. A data scientist's portfolio was showing no machine-learning work to
phone visitors.

Re-fetched after the redeploy. Order is now AAPT, Académie Royale, SINOINFOS,
TchadInfos, Pima, Disease | Sino Ai, SinoCoffee — verified 8 on desktop and the
right 6 on a 390px viewport.

Worth keeping: **`projects.generated.json` is only as fresh as the last
successful build**, so a schema addition needs a re-fetch *after* the API
redeploys, not before. Nothing warns about this — the stale file is valid JSON
and the site renders happily with the wrong order.

### Sino Ai moved to the AI category (2026-09-09)

The surviving row landed in `web` because it was inserted first, leaving the AI
page with 2 projects on a site that leads with data science. Moved to `ai`:
web 7, ai 3. It also picks up the "ML & AI" tag in Featured, since that label
is derived from the category. AI page order is Pima, Disease, Sino Ai —
`sort_order` is still its legacy web id (5), so it sorts last; say if it should
lead.

### Still open — deliberately

13 advisories remain in **dev** dependencies (vite, rollup, postcss, the eslint
chain). Clearing them needs **Vite 7 → 8**, a major bump that can break the
build. It's a real piece of work, not a one-liner, and it affects nothing a
visitor touches. Do it as its own task with the build verified after.

> **Caught while writing the README:** `package.json`'s `allowScripts` block
> still pinned `@tailwindcss/oxide@4.1.13` after the upgrade to 4.3.3. The
> current `node_modules` was fine, but a **fresh clone** would have had the new
> version's postinstall blocked and the build would have failed — the exact
> thing the README tells people to keep. Re-approved to 4.3.3.

<details>
<summary>Original Phase 7 instructions (superseded)</summary>

- [ ] **`README.md` is still the stock Vite template.** It's the first thing a
      recruiter sees on GitHub. Replace with: what the site is, live URL,
      screenshot, stack, and how to run it.
- [ ] `plan.md` (this file) — decide whether to keep it tracked or gitignore it
- [ ] `npm audit` reports 16 vulnerabilities (1 critical) — review
- [ ] Remove the commented-out `<Art />` in `src/App.jsx:43` or finish it

</details>

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

## Phase 25 — backend API ✅ **Live** (2026-09-09)

**Deployed:** https://sidickportfolio.onrender.com — verified end to end.

| check | result |
|---|---|
| `/health` | 200, 1.9s warm |
| projects seeded | **18** — 19 minus the SinoAI duplicate, exactly as the dry-run predicted |
| by category | web 8, mobile 4, design 4, ai 2 |
| images on Cloudinary | 16 of 18, sample URL returns 200 |
| rows without an image | `SinoBoutique` and `To-Do` — the two known gaps, nothing invented |
| duplicate `live_url` | none — the UNIQUE constraint held |
| French text | complete on all 18 |
| CORS | allows `sidick.vercel.app`, no ACAO header for other origins |
| unauthenticated `POST /projects` | 401 |
| bad login | 401 with a generic message, not a 500 |

The constraints did the job they were chosen for: the duplicate was rejected at
the database rather than silently shipping the same project twice.

### Two things that tripped the deploy

- **`seed.py --dry-run   # comment` failed.** zsh does not strip `#` comments in
  interactive mode, so argparse received them as arguments. The table read
  "No rows" and looked like a seeding failure when nothing had run.
- **Render autofilled `gunicorn your_application.wsgi`** as the start command
  from a Node/Django guess. Corrected to
  `uvicorn main:app --host 0.0.0.0 --port $PORT`.

### Phase 25b — To-Do artwork + keep-alive ✅ **Done** (2026-09-09)

**To-Do now has an image.** The repo at `github.com/sidicksino/to-do` returns
404 (private or renamed) and has no README or committed screenshots, so there
was nothing real to pull. Built a two-screen device mockup in the site's own
brand colours — the same presentation as the existing TchadInfos card, which is
already two phone frames on a background. Deliberately a *promotional mockup*,
not a fabricated screen capture. Rendered at 2x via Playwright, uploaded to
Cloudinary (25KB WebP, serving 200), attached to row 12.

`SinoBoutique` is now the only row without an image.

**Keep-alive:** `.github/workflows/keep-alive.yml` pings `/health` every
**10 minutes**, not every 10 seconds as first asked — Render's idle window is
15 minutes, so anything more frequent buys nothing and burns instance-hours
faster. The step fails the run on a non-200 so a broken API surfaces in the
Actions tab instead of silently passing. Validated: YAML parses, and the exact
curl command returns `{"status":"ok"}`.

Two caveats recorded for Sidick:
- GitHub disables scheduled workflows after 60 days with no repo activity.
- Render's free tier gives **750 instance-hours/month across the account**, and
  a month is ~730 hours. Keeping this service awake 24/7 consumes essentially
  all of it — and the Render form showed 15 existing services in Oregon. If any
  of those are also free web services, the quota is shared.

### Phase 25c — quota fix + featured flags ✅ **Done** (2026-09-09)

**The 24/7 keep-alive was dangerous, not just wasteful.** Confirmed against
Render's docs: the 750 free instance-hours are **per workspace, shared across
every free service**, and exhausting them **suspends all of them until the next
month**. A calendar month is ~730 h, so a 10-minute ping around the clock
consumes essentially the whole quota — and Sidick's Render page showed 15
services in Oregon.

| approach | h/month | % of quota |
|---|---|---|
| every 10 min, 24/7 | ~730 | ~100% |
| weekdays 08:00–20:00 | ~264 | 35% |
| **no cron, wake on demand** | ~2–5 | **<1%** |

The workflow is now **`workflow_dispatch` only** — no schedule — renamed
"Wake API", with the business-hours cron left commented in the file. Nothing
needs to be warm: no site visitor touches this API, only the build step and the
dashboard, both human-triggered.

**Featured flags set.** All 8 marked in the database, matching the hardcoded
list and its order. Added a `featured_order` column rather than reusing
`sort_order` — `sort_order` ranks a project inside its category page, while
featured order decides which six survive on a phone. They are different
orderings and conflating them would have silently changed what phones show.
`GET /projects?featured=true` now sorts by it. Schema migration is idempotent
(`ADD COLUMN IF NOT EXISTS`) and `schema.sql` is in sync for fresh installs.

20 local tests still pass. The deployed build returns the 8 but not yet in
order — `featured_order` lands on the next Render deploy.

### Phase 26 — frontend wired to the API ✅ **Done** (2026-09-09)

The site is **static and API-backed**: `scripts/fetch-projects.mjs` runs in
`prebuild`, pulls `GET /projects` and writes `src/data/projects.generated.json`
into the bundle. No visitor ever calls Render — verified the project text is
present in `dist/assets/*.js`, so SEO, the sitemap and hreflang are unaffected.

The fetch retries 5 times with backoff (Render cold starts take ~60s) and, if
the API is unreachable, **keeps the last committed JSON and lets the build
continue**. A sleeping backend must not be able to take the portfolio down.

**`POST /publish`** on the backend fires the Vercel deploy hook. The hook lives
in the backend's env, not the frontend: called from the browser it would sit in
the bundle for anyone to trigger.

**The i18n indirection is gone.** `title_en` / `title_fr` are read directly via
`pickLang()`; `projects.items.web.1.title` chains no longer exist. That
indirection was the reason adding a project meant editing three files.

### Three latent crashes found by testing with data that does not exist yet

Injecting four synthetic projects with `live_url: null` and `image_url: null` —
exactly what the dashboard can now produce — broke pages that all 18 real
projects happened to avoid:

1. **`DesignProjects` read `project.viewUrl`**, a field that no longer exists;
   the seed folded design links into `live_url`. `undefined.trim()` — the whole
   design page was blank, and this one was already live.
2. **`WebProjects` and `AIProjects` called `project.liveUrl.trim()` unguarded.**
   Fine for the current data, a crash the first time a project is added without
   a public URL.
3. **Only `MobileProjects` guarded the image.** The other three rendered
   `<img src="">` for a project with no screenshot.

All guarded; the edge-case run then came back clean on all 10 route/language
combinations. Writing the test data first is what surfaced these — the real
data set has no row that exercises any of the three paths.

Also fixed: eslint was linting jQuery files bundled inside the Cloudinary
**Python** package under `backend/.venv` (119 errors). `backend` added to
`globalIgnores`.

### Still open

- `SinoBoutique` is the only project with no image.
- The `/admin` dashboard is not built yet — adding a project still means
  calling the API by hand.
- `featured_order` is in the database and in the code, but the **deployed**
  Render build predates it, so `?featured=true` returns the right 8 in the
  wrong order until Sidick pushes and Render redeploys.

- `featured` is **false on all 18 rows**, so Featured Work still reads the
  hardcoded list in `projectData.js`. Eight need flagging.
- The admin password was pasted into the chat transcript in plaintext and must
  be rotated.


FastAPI + **Neon Postgres** + Cloudinary, in `backend/`. Sidick deploys to
Render, then hands over the URL for the frontend wiring.

**Why Neon over MongoDB:** the project shape is fixed (bilingual title and
description, one category, a tech array, a URL) — that is a table. And every
data fault found by hand this session was an integrity failure a schema
prevents: `CHECK` on category, `NOT NULL` on the text, `UNIQUE` on `live_url`.
Also the same engine he already ships via Supabase.

**Why FastAPI over Express:** Python is his lead language and the site sells
him as a data scientist; Pydantic validation is the right tool for this data.

`image_url` is deliberately **nullable in the column but required by
`ProjectCreate`** — the migration must not invent screenshots for `mobile/1`
and `mobile/4`, but nothing new can be added without one.

### Three bugs found by actually running it

1. **`psycopg[binary,pool]==3.2.3` does not exist** — no wheel; versions skip
   3.1.18 -> 3.2.4. Pinned 3.2.9.
2. **Auth was resolved after the DB connection.** FastAPI resolves dependencies
   in signature order, so `conn=Depends(get_conn)` before
   `_=Depends(require_admin)` opened a pooled connection for requests that were
   about to 401. Reordered in all three write handlers, with a comment so it is
   not "tidied" back.
3. **Whitespace-only titles passed validation.** `Field(min_length=1)` counts
   spaces, so `"   "` has length 3 and reached the database — where the CHECK
   constraint would have turned it into a 500 rather than a 422. Now
   `StringConstraints(strip_whitespace=True, min_length=1)`.

Bug 3 was caught only because the test's stub connection *raises* when touched
instead of returning a mock. A permissive stub would have reported a pass.

`test_api.py` — 20 checks, no database required. Also added: `.gitignore` rules
for `.env`, which the repo had none of.

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
