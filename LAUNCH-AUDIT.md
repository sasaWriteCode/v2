# IrisPro V2 — Launch Hardening Audit (Stage 5 Pass 2)

Audited against README.md + README-stage1-2.md on the production build
(`npm run build`, 21 routes, served via `astro preview`). Every claim below is
backed by the raw HTML response, a script over `dist/`, or a Lighthouse run —
methods in §5. Fixes applied in this pass are marked **[FIXED]** with their
post-fix evidence; everything else is untouched pending approval.

---

## 1. BLOCKERS (ranked)

### B1 — LCP budget breached on every route: render-blocking Google Fonts **[FIXED]**
- **Evidence:** Lighthouse mobile (simulated 4G): `/solutions/automotive` LCP
  **2.6s**, `/` 2.6s, `/knowledge/automotive` 2.6s, `/products/automotive`
  **2.7s** — all over the hard **< 2.5s** budget. `render-blocking-insight`
  attributes ~791ms wasted to
  `fonts.googleapis.com/css2?…display=swap` (est. total savings 1,970ms). The
  LCP element is hero *text*, so it is blocked purely by CSS delivery, not
  images.
- **Files:** `src/layouts/BaseLayout.astro`, `src/layouts/Layout.astro`
- **Fix applied:** the fonts stylesheet now loads non-render-blocking
  (`media="print"` + `onload` swap, `<noscript>` fallback). Text paints
  immediately in the fallback stack; `display=swap` upgrades in place.
- **Post-fix measurement:** `/solutions/automotive` LCP **1.8s** (score 0.98),
  `/products/automotive` LCP **1.8s** (score 0.99). Budget met with margin.
  Disclosed trade-off: the font swap introduces a small text reflow on the
  showroom route (CLS 0.000 → 0.078) — still inside the < 0.1 budget; real
  webfont self-hosting with `size-adjust` fallback metrics would remove it
  (SHOULD-FIX #3a).

### B2 — Literal `href="_verify"` shipped as broken links **[FIXED]**
- **Evidence:** dist link audit — `/projects/` (3 video cards) and `/about/`
  (1 video card) contained `<a href="_verify">`, resolving to
  `/projects/_verify` → 404. Crawlable broken links on two indexed routes.
- **Files:** `src/content/editorial/projects.json`,
  `src/content/editorial/about.json`
- **Fix applied:** hrefs changed to inert same-page anchors
  (`#video-…`); the four missing video URLs remain in CLIENT ACTIONS —
  the `_verify` convention now lives only in the report, never in a URL.
- **Post-fix evidence:** dist link audit reports zero `_verify` hrefs.

### B3 — Three indexed routes had `<h1>_verify</h1>` **[FIXED]**
- **Evidence:** `/solutions/commercial`, `/solutions/personal-protection`,
  `/solutions/sustainability` (the Stage 4a stubs awaiting their screens)
  rendered the literal string `_verify` as the page h1 — garbage in the
  SERP-critical element of three sitemap-listed routes.
- **Files:** the three JSON files in `src/content/solutions/`
- **Fix applied:** interim h1 = the page's established route title
  ("Commercial Solutions" etc. — already used in breadcrumb/seo, no copy
  invented). The real hero headlines remain a CLIENT ACTION; the files'
  `_status` notes still say so.
- **Post-fix evidence:** zero `_verify` inside any `<h1>` in dist.

### B4 — FAQPage JSON-LD shipped `"text": "_verify"` answers **[FIXED]**
- **Evidence:** `/knowledge/automotive` and `/knowledge/residential-guide`
  emitted FAQPage structured data whose `acceptedAnswer.text` was `_verify`
  (9 questions) — invalid rich-result content that risks a structured-data
  penalty/ineligibility.
- **File:** `src/templates/GuideTemplate.astro`
- **Fix applied:** questions whose answer is `_verify` are excluded from the
  JSON-LD (the FAQ block still renders on-page; once the client supplies
  answers the LD re-enables itself with zero further changes).
- **Post-fix evidence:** `grep '"text":"_verify"' dist -r` → 0; no FAQPage
  block emitted while all answers are pending.

### B5 — Hub category cards linked to three 404 routes **[FIXED]**
- **Evidence:** `/knowledge/`, `/knowledge/learn-the-basics/`,
  `/knowledge/technology-explained/` linked to
  `/knowledge/sustainability-esg`, `/knowledge/myth-vs-fact`,
  `/knowledge/video-library` — no such routes exist (their screens were never
  supplied; _conflicts.md §32).
- **Files:** the three JSON files in `src/content/knowledge/`
- **Fix applied:** those cards point at `/knowledge` until their pages are
  authored (cards and labels preserved — removing them would drop transcribed
  content). Authoring or removing the three categories is a CLIENT ACTION.
- **Post-fix evidence:** dist link audit reports zero broken internal links.

### B6 — `/solutions` is a placeholder page in the primary nav **[MITIGATED — client-owned]**
- **Evidence:** "Protection Solutions" (header + footer) lands on the
  PendingPage shell; no `editorial/solutions` content object was ever
  provided, and its note read "authored in Stage 4" — stale project-speak.
- **Fix applied (mitigation only):** `PENDING_PAGE.note` copy in
  `src/config/navigation.ts` no longer references internal stage numbers.
  The page still needs real content — top of CLIENT ACTIONS.

---

## 2. SHOULD-FIX (not actioned — awaiting approval)

1. **Heading levels skip h1→h3 on 7 routes** (`/about`, `/projects`,
   `/technologies`, `/solutions/automotive`, `/solutions/residential`,
   `/knowledge/learn-the-basics`, `/knowledge/personal-protection-guide`).
   Systemic: heading-less primitives (tech-pillar-grid, problem-card-grid,
   proof-stat-bar, project-strip) render h3 cards with no h2 above them. The
   band headings already exist in each section's `label` field —
   **recommended fix:** SectionRenderer emits a visually-hidden `<h2>` from
   `label` when present (one renderer change, fixes all routes, also makes
   the transcribed band headings finally render for AT/SEO).
2. **Empty `<h2>` on the home page** — the home CTA band has no headline on
   the source screen; `CTABar` unconditionally renders `<h2>{headline}</h2>`.
   Recommended: render the h2 only when non-empty and fall back to a fixed
   aria-label.
3. **No `og:image` on any route** — link shares render without a card image.
   Needs a brand asset (ties into the placeholder-asset client action).
   **3a.** Self-host the two webfonts with `size-adjust`-tuned fallback
   metrics — removes the remaining font-swap reflow (CLS 0.078 on the
   showroom route) and the fonts.googleapis.com dependency entirely.
4. **`?series=` links don't preselect the filter** — solution-page series
   CTAs link to `/products/automotive?series=comfort` etc.; ProductBrowser
   restores filters from the URL, but `comfort`/`plus`/`signature` are not
   values of the products page's series filter (its options are
   essential/advanced/signature — the §24 taxonomy conflict made a coherent
   mapping impossible). Links work; the filter just stays empty. Resolves
   itself when the client rules on §24.
5. **Guide rails on hub-style pages** — Learn the Basics / Technology
   Explained rails (progress widgets, tab bars) are preserved in `_unplaced`
   but unrendered; fine for launch, listed for completeness.
6. **Specimen routes ship in production** (`/design-system`, `/components`,
   linked from the footer "Development" group) — intentional per Stage 3, but
   confirm the client wants them public at launch (they are excluded from the
   sitemap).
7. **Provisional domain** `https://www.irispro.com` in astro.config, site.ts,
   robots.txt — only `ewarranty.irispro.com` is evidenced. Must be confirmed
   before DNS cutover (canonicals/sitemap/JSON-LD all derive from it).

---

## 3. CLIENT ACTIONS

### A. Assets (largest visible gap)
- [ ] **Every image on the site is a grey placeholder SVG** (heroes, product
  shots, project photos, video posters). Supply real assets (hero < 150KB,
  AVIF + WebP fallback per the Stage 1 budget). Until then the site *works*
  but does not look launched.
- [ ] An `og:image` brand asset for link sharing.

### B. Missing page content
- [ ] **Solutions landing page** (`/solutions`) — currently a neutral
  placeholder. Needs a content object (hero + section list).
- [ ] **Commercial, Personal Protection, Sustainability solution pages** —
  hero-only stubs; their wireframe screens were never in any batch. Each
  needs its full screen (Stage 4a §"awaiting source").
- [ ] **Three Knowledge Centre categories** shown on the hub but with no
  pages: Sustainability & ESG, Myth vs Fact, Video Library — author them or
  remove the cards.
- [ ] **14 hidden lesson titles per 7-chapter guide** (automotive +
  residential guides each show "+ 2 more lessons" ×7 — 28 titles total).

### C. Copy the audit could not read (the "_verify" list — 75 fields)
**FAQ answers (19)** — all FAQ answers are collapsed on the source screens:
- [ ] Learn the Basics ×4 · Automotive Guide rail ×4 · Residential Guide
  rail ×5 · Personal Protection ×6.

**Accuracy-critical spec values:**
- [ ] Personal Protection "Understanding Sunlight" nm ranges: UVA, HEV Blue
  Light, Visible Light (+4 effect captions) — see _conflicts.md §36 overlap
  risk.
- [ ] Building products: Diamond/RayPro/Anti Fade 90/Color Stable/CS Pro VLT
  chips (8 values), Color Stable TSER, **CS Pro IRR (reads 40% vs the
  automotive screen's 90% — §26)**.
- [ ] Automotive products: Anti Fade 90 / Titanium (HR) / Color Stable /
  CS Pro VLT chips (5 values); ISO/GBI/IWFA/eWarranty cert labels (strip
  cropped in source).
- [ ] Technology Explained: comparison-table star cells (Durability ×1,
  Signal Friendly ×4), garbled outcome tile ×1.
- [ ] Residential solution: all 6 priority-selector recommendations (12
  strings — these render as "_verify" on the page today).
- [ ] Smaller items: automotive solution hero eyebrow; residential "10 Years"
  cert label; four video URLs (projects ×3, about ×1); "Grade A" vs
  "Grade A1" (§18/§27).

### D. Rulings needed (blocking coherent wiring — full detail in _conflicts.md §1–§38)
- [ ] **§24 Series taxonomy** (Comfort/Plus/Signature vs Essential/Advanced/
  Signature vs Signature/Heat-Rejection/Privacy/Security) — blocks product
  filters and cross-links.
- [ ] **§34 Guide IA** — four guides, three different structures.
- [ ] **§10–§12, §21, §28, §37 Navigation** — labels ("Knowledge Centre" vs
  "Learning Centre", "Products" vs "Protection Series", "Technology" vs
  "Technologies") and four competing header CTAs.
- [ ] **Numbers that disagree:** heat reduction 10°C vs 32.5°C (§3/§15); IRR
  98% vs >99% (§2/§25); UV400 99.9/99.99/100% (§17); fleet size 1,000,000+
  vs ~29,000 (§20); episode durations (§29); "10+" vs "Up to 10 Years" (§33).
- [ ] **§14 residential accent colour** (screens green, tokens gold) and the
  production domain.

---

## 4. MEASUREMENTS

Lighthouse 12.x, headless Chrome, mobile emulation, simulated 4G/mid-tier
throttling, production build via `astro preview`. (Lab values; INP requires
field interaction data — TBT is the lab proxy.)

| Route | LCP before | LCP after fix | CLS after | TBT | Perf score (after) | JS gzip | Islands |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/solutions/automotive` | 2.6s ✗ | **1.8s ✓** | 0.078 ✓ | 0ms | 0.98 | 72.3KB | 6 |
| `/products/automotive` (heaviest) | 2.7s ✗ | **1.8s ✓** | 0.001 ✓ | 0ms | 0.99 | 72.1KB | 4 |
| `/knowledge/automotive` (guide) | 2.6s ✗ | ✓ (same fix, shared single cause) | 0.020 | 0ms | — | 65.4KB | 3 |
| `/` (home) | 2.6s ✗ | ✓ (same fix) | 0.049 | 0ms | — | 69.6KB | 4 |
| `/solutions` (shell) | — | — | — | — | — | **0.2KB** | 0 |

Budgets: LCP < 2.5s **met after B1**; CLS < 0.1 ✓ everywhere; initial JS
< 150KB gzip ✓ everywhere (worst 80.4KB on the internal specimen). The shared
React runtime (~57KB) dominates all island routes; guide/editorial routes are
NOT near 0KB because the brief-mandated islands (SearchBar, AskIrisProAI,
scroll-spy, tier-gated reveals) are React — documented since Stage 3.
Scroll frame-rate could not be measured in this environment (the audit
browser suspends rAF; see §5) — needs a manual pass on hardware.

---

## 5. WHAT I VERIFIED AND HOW

- **Raw-HTML crawlability:** `curl` against `astro preview` for showroom /
  guide / product routes; occurrence-accurate greps (the HTML is minified to
  one line — line-count greps lie; all counts here use `grep -o | wc -l` or
  scripts). All copy present pre-hydration, incl. all 10 product cards' specs
  (`IRR (1400nm)` ×21), collapsed `<details>` lesson content, and
  PrioritySelector recommendations.
- **SpectrumDiagram text:** present and selectable — React SSR splits text
  nodes with comments (`100<!-- -->–<!-- -->400<!-- -->nm`), so grep for the
  joined string fails; the DOM text is real. Verified by context dump.
- **Site-wide dist audit script** (headings sequence/empties, table anatomy,
  JSON-LD parseability, img alt coverage, internal-link 404s, `_verify`
  visibility, meta/OG/canonical): all 21 routes. Results: exactly one h1
  everywhere (also build-enforced); all JSON-LD parses; **0 images missing
  alt (105 imgs)**; tables have thead/caption/scope where present.
- **Sitemap/robots:** sitemap lists all 19 public routes (specimens
  intentionally excluded); robots.txt sane; the only diff flagged was the
  `/products/` directory, which is not a route.
- **Contrast:** recomputed all 22 documented token pairings with the WCAG 2.x
  math — **0 failures**, worst case 4.73:1 (red-bright on black, AA at
  normal text).
- **Tier integrity:** `?tier=0` verified live: `data-tier="0"`,
  `--motion-scale: 0`, `--motion-duration: 0s`, `--parallax-scale: 0`,
  `--tier-cinematic: 0` — genuinely zero motion; tier detection, URL pins,
  and the `?priority=`/`?compare=`/`?module=`/product-filter URL-state
  contracts were exercised end-to-end in Stages 3–4 audits and re-spot-checked
  here. `saveData`/`effectiveType` downgrades are code-verified
  (`src/lib/enhancement/tiers.ts`) — not emulatable in this environment.
- **A11y interactions:** mobile nav open/close/backdrop/link paths and scroll
  un-lock verified live in Stage 3 and re-checked; focus-trap + Esc + focus
  return are native `<dialog>` semantics; `autofocus` on the close button.
  PrioritySelector: real buttons + `aria-pressed` + `role="group"` confirmed
  in SSR HTML. Keyboard focus ring rules present in both zones.
- **Console:** zero errors/warnings on audited routes.
- **TypeScript + build:** `tsc --noEmit` clean; `astro build` + the h1/title
  gate green.
- **Environment limits (disclosed):** the audit browser suspends
  rAF/IntersectionObserver when unfocused, so scroll FPS, real INP, and
  smooth-scroll behaviour need a manual device pass. Lighthouse runs its own
  Chrome and is unaffected.
