# IrisPro V2 — Foundation & Primitives

Stage 1: design tokens, the enhancement-tier engine, base utilities.
Stage 2: the 13 data-driven component primitives that all ~25 screens
compose from. No pages yet — those are Stage 3+.

- Stage 1 specimen: `npm run dev` → [/design-system](http://localhost:3000/design-system)
  (color swatches with computed WCAG ratios, type scale at 360/1440px, spacing,
  live parallax/reveal/motion demos, and the detected tier + reason).
- Stage 2 specimen: [/components](http://localhost:3000/components) — every
  primitive with realistic IrisPro data, in both zones.
- QA override: append `?tier=0|1|2` to any URL to pin a tier.
- Content conflicts found in the V1 reference screens are logged in
  [_conflicts.md](./_conflicts.md) — unresolved by design, for client ruling.

## Stage 2 primitive inventory

All prop shapes live in `types/content.ts` and are JSON-serializable data
contracts (icons by `IconName` string via `<Icon>`, media by URL + intrinsic
dimensions) — they double as the Stage 4 content schema. Every primitive
renders complete, readable content at TIER_0.

| Primitive | Zone | Interactivity | Notes |
| --- | --- | --- | --- |
| `CinematicHero` | showroom | server (+ Parallax/Media) | Single `<h1>`, presentational line breaks, WITHOUT/WITH comparison panel |
| `ProblemCardGrid` | showroom | server | 1/2/3–6 columns, staggered Reveal |
| `PrioritySelector` | showroom | client | Real buttons, `aria-pressed`, shareable `?priority=` URL state; all recommendations SSR'd |
| `SpectrumDiagram` | showroom | server | Pure SVG, nm ranges as selectable text; rays stagger at TIER_1+ |
| `TechPillarGrid` | showroom | server | 3–6 columns |
| `ProofStatBar` | either | client | Final value is server text; count-up at TIER_1+ only; footnote pattern |
| `ProjectStrip` | showroom | client (filters) | Native scroll-snap strip — never a JS carousel |
| `SeriesComparisonTable` | workshop | server | Real `<table>` + caption + `th scope`; sticky first column on mobile |
| `ProductCard` (+`useCompareState`) | workshop | client | Compare checkbox → `?compare=` URL state; VLT chips are data |
| `GuideChapterList` | workshop | server | Native `<details>/<summary>`; lessons in DOM while collapsed |
| `AskIrisProAI` | workshop | client | Shell + `onSubmit` boundary; no-JS = plain GET form to fallback action |
| `CTABar` | global | server | Conversion band, zone-variant |
| `CertificationStrip` | global | server | Text marks until Stage 4 logo assets |

## Brand truth (extracted from V1, `../src/styles/global.css`)

| Token | Value | Source |
| --- | --- | --- |
| irispro-red | `#d20f18` | V1 `--irispro-red` (105 uses — canonical) |
| red-deep | `#98000a` | V1 `--irispro-deep-red` |
| red-bright | `#ef2929` | V1 `--irispro-bright-red` |
| irispro-black | `#0a0a0a` | V1 `--iris-black` |
| irispro-white | `#fafaf8` | V1 `--iris-white` |
| neutral ramp | `#1a1a1e → #f5f3f0` | V1 charcoal/graphite/steel/mid/light/cream |
| display font | Playfair Display | V1 `--font-display` |
| ui font | Inter | V1 `--font-body` |

**Flagged:** V1 defines no per-solution accent colors. The V2 accents map
colors that already exist in the V1 codebase (sustainability green `#3db87a`
is genuinely in use on the V1 ESG page; automotive/residential/commercial/
personal-protection are provisional mappings from V1's functional palette,
pending brand confirmation). V1 also loads Montserrat with ad-hoc
`!important` overrides on utility pages; V2 consolidates the workshop zone
on Inter.

## The enhancement-tier model

**Cinematic changes HOW content appears — never WHETHER it exists.**
Every tier renders identical DOM. Any component rendering content only at
TIER_2 is a bug.

| Tier | When | Gets |
| --- | --- | --- |
| `TIER_0_STATIC` | `prefers-reduced-motion: reduce`, or `navigator.connection.saveData`, or effectiveType `slow-2g`/`2g` | Instant opacity only. No parallax, no sequences. Fully usable, fully readable. |
| `TIER_1_MOTION` **(default, incl. all mobile)** | Anything not TIER_0 or TIER_2 | Parallax, scroll-driven reveals, staggered sequences, scroll progress. Native scroll always. Media = poster + tap-to-play. |
| `TIER_2_CINEMATIC` | TIER_1 conditions **and** `pointer: fine` **and** ≥1024px **and** effectiveType `4g`/unknown | Everything in TIER_1, plus autoplay video, pinned sections, image-sequence scrubbing, multi-layer composition. |

Two layers, one decision:

1. **CSS fallback** (`tokens/motion.css`) — media queries set the tier custom
   properties (`--motion-scale`, `--motion-duration`, `--parallax-scale`,
   `--tier-cinematic`) before hydration, so first paint is tier-correct.
2. **JS engine** (`lib/enhancement/`) — `<EnhancementProvider>` detects on
   mount (it can also see `saveData`/`effectiveType`, which CSS cannot) and
   stamps `html[data-tier]`, which overrides the media-query defaults.
   `useEnhancementTier()` exposes `{ tier, reason, isStatic, isCinematic }`.

SSR safety: the server always renders the TIER_1 baseline; detection runs
post-hydration, markup never diverges, and tier flips only touch
opacity/transform custom properties — zero layout shift.

Runtime guard: one 2s frame-rate window after mount; if sustained FPS < 50,
the tier drops by one and the cap persists in `sessionStorage` for the
session. One window, one decision — no thrashing, never re-upgrades.
`?tier=` overrides pin the tier and disable the guard.

## The cost split (gate by runtime cost, not screen size)

**CHEAP — ships everywhere, including mobile:** parallax
(`translate3d` from scroll position), scroll-driven reveals
(opacity + translateY), scroll-linked progress, CSS scroll-driven animations
(`animation-timeline: view()` where supported), staggered entrances,
gradient/luminosity depth.

**EXPENSIVE — TIER_2 (desktop-conditional):** autoplay video (below TIER_2 it
is always poster + tap-to-play), long pinned sections with heavy internal
animation, canvas / image-sequence scrubbing, many large layers animating
simultaneously.

**FORBIDDEN — everywhere, no exceptions:** scroll-jacking or altering native
scroll velocity on touch; animating layout properties
(width/height/top/left/margin); any content that exists only in an animated
state.

Budgets (mobile, mid-tier Android, 4G — hard limits): LCP < 2.5s ·
initial JS < 150KB gzipped · hero image < 150KB (AVIF, WebP fallback) ·
CLS < 0.1 · sustained 60fps scrolling, never below 50 · max 3 concurrently
animating elements per viewport.

## The six non-negotiable rules

1. **All copy is in the DOM at initial load.** Nothing injected on scroll,
   nothing baked into canvas or video. The content IS the SEO value.
   (`<Reveal>` hides via opacity only, and only under `html[data-enhanced]`
   — no JS means everything is visible.)
2. **Semantic HTML always.** Real h1/h2/h3 hierarchy, real `<table>` for spec
   data, real `<button>`/`<a>`. Styling never replaces semantics.
3. **Animation touches opacity and transform only.**
4. **Mobile is the baseline build and gets real cinema — cheap cinema.**
   TIER_1 is the default, not a downgrade.
5. **No component may depend on TIER_2 to be readable or usable.**
6. **Native scroll is sacred on touch. Never intercept it.**

## Zones

`<Zone zone="showroom|workshop">` sets `data-zone`; every semantic token
(surface/text/border) re-resolves in pure CSS — no JS, nests freely.

**Elevation rule:** box-shadows (`--elevation-1/2/3`) exist in the workshop
zone only. The showroom expresses depth with luminosity (raised surfaces are
lighter) and gradient (`--depth-glow-subtle/strong`); its elevation tokens
resolve to `none` by design.

## Map

```
tokens/            colors.css · typography.css · spacing.css · motion.css
tailwind.config.ts theme wired to the token custom properties
lib/enhancement/   tiers.ts · EnhancementProvider.tsx · useEnhancementTier.ts
lib/contrast.ts    WCAG math used by the specimen
components/base/   Reveal · Parallax · Media · Zone
app/               globals.css · layout.tsx · design-system/
```

Stage 5 adds the scroll-sequence library on top of the motion tokens and the
tier engine — nothing here should need to change for it.
