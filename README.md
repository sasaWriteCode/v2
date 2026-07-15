# IrisPro V2 — Stage 3: Page Templates & Routing

Astro 7 + React islands + Tailwind v4. Stages 1–2 (tokens, tier engine,
13 primitives) are documented in [README-stage1-2.md](./README-stage1-2.md) —
its tier model and six non-negotiable rules remain authoritative. Content
conflicts live in [_conflicts.md](./_conflicts.md) (append-only, client
resolves).

- `npm run dev` → http://localhost:4321
- `npm run build` → static build + post-build checks (exactly one `<h1>` per
  page, non-empty titles) — violations **fail the build**
- Specimens: [/design-system](http://localhost:4321/design-system) ·
  [/components](http://localhost:4321/components) · QA tier pin: `?tier=0|1|2`

## The model: 25 screens = 5 templates × content objects

A page is a **content object** (JSON in `src/content/<collection>/`) with a
`sections[]` array. Templates never contain copy, section order, or slug
checks — every variation is a content field. Reordering two sections in a
fixture reorders the page with zero code changes (verified).

| Template | Routes | Notes |
| --- | --- | --- |
| `SolutionTemplate` | `/solutions/[slug]` ×5 | accent threaded to every section + `--accent-current*` vars; showroom→workshop transition is data (`zone`) |
| `GuideTemplate` | `/knowledge/[slug]` ×4 (guides) | named slots: `intro[]` / `main[]` + `rail` / `outro[]`; rail after main in DOM (mobile: below, desktop: right column); FAQPage JSON-LD from rail questions |
| `KnowledgeHubTemplate` | `/knowledge` + hub-like subpages | linear flow; hero embeds search island; `?module=` filter |
| `ProductGridTemplate` | `/products/[category]` ×2 | heaviest island page; Product ItemList JSON-LD derived from section data |
| `EditorialTemplate` | `/`, `/solutions`, `/technologies`, `/projects`, `/about` | the renderer plus nothing — deliberately no structure |

Routing is `getStaticPaths` over Content Collections; everything prerenders
(`output: 'static'`). One fixture exists per collection (automotive solution,
automotive guide, knowledge hub, automotive products, home). Editorial routes
without a content object yet (`/solutions`, `/technologies`, `/projects`,
`/about`) render a 0KB pending shell from `PENDING_PAGE` config until Stage 4
authors them.

## The section registry contract

`src/lib/sectionRegistry.ts` maps every `SectionType` →
`{ component, hydration, chrome }` and is the single source of truth.
`src/components/SectionRenderer.astro` consumes it:

- Sections sort by `order` (never array position), group into consecutive
  zone bands (`zone: 'showroom-dark' | 'workshop-light'`, template default
  otherwise) — `data-zone` repaints every semantic token in pure CSS.
- Every section wrapper carries its stable `id` (anchor target, offset under
  the sticky header) — `#priority-selector` etc.
- `chrome: 'band'` wraps in `.container` + section rhythm; `'full'` lets the
  component own its layout (heroes).
- Unknown `type`: loud red error block in dev, renders nothing in production,
  never crashes the build. (Schema validation makes this unreachable from
  content files.)

**Astro constraint, solved once:** the compiler requires `client:*`
directives to be literal attributes on statically-imported components — a
registry lookup cannot hydrate (`NoMatchingImport`, verified). So static
sections render dynamically through the registry, and each *hydrated* type
has one literal branch in `SectionRenderer.astro`'s switch. The renderer
dev-asserts registry↔switch consistency. This is the only file that knows
about the constraint.

### Section types and hydration

**Hydrated `client:visible`** (owns interaction/URL state, or carries
Reveal/Parallax/count-up — a server-rendered Reveal on a page where any
island stamps `html[data-enhanced]` would hide content forever, violating
rule 1): `cinematic-hero`, `problem-card-grid`, `priority-selector`,
`protection-level-selector` (same PrioritySelector primitive — the
Essential/Advanced/Signature taxonomy is data, see _conflicts.md §1),
`spectrum-diagram`, `tech-pillar-grid`, `proof-stat-bar`, `project-strip`,
`ask-irispro-ai`, `search-bar`, `module-browser`, `product-browser`.

**Static, 0KB** (plain markup — React SSR without a directive, or .astro):
`series-comparison-table`, `guide-chapter-list` (native `<details>`),
`cta-bar`, `certification-strip`, `guide-hero`/`hub-hero`/`product-hero`
(one `PageHero.astro`), `series-card-set`, `testimonial-panel`,
`chapter-card-row`, `category-grid`, `video-carousel` (native snap strip —
never a JS carousel), `learning-path`, `article-grid`, `film-finder`.

### URL-state contracts (all survive refresh, all shareable)

`?tier=` (QA pin) · `?priority=` / protection level · `?compare=` ·
`?module=` · product filters `?vlt=&irr=&technology=&series=`. The product
filter bar is a real `<form method="get">` with native selects: without JS it
submits to the page and **the full grid stays visible** — filtering enhances,
never gates content. Product facet matching is pure data
(`items[].facets[param]`), never per-param logic.

## Hydration policy (and one deliberate deviation)

Islands are earned: a section ships JS only for interaction/URL state or
tier-gated motion behaviors. Navigation chrome earns nothing — **MobileNav is
a native `<dialog>` + ~1KB vanilla script (`MobileNav.astro`), not the React
`client:idle` island the Stage 3 brief sketched.** A React island in the
header would load the ~57KB-gzip React runtime on all 25 routes for a menu
toggle, putting otherwise-0KB editorial routes at ~62KB — directly failing
the "editorial routes at or near 0KB" acceptance criterion. Native `showModal()`
provides the focus trap and Esc-to-close; the script wires open/close, body
scroll lock (released on every close path), and backdrop/link dismissal.
Works at TIER_0; without JS the footer repeats every destination.

## JS per route (gzip, production build)

| Route | Islands | JS |
| --- | --- | --- |
| `/solutions`, `/technologies`, `/projects`, `/about` (pending shells) | 0 | **0.2KB** (nav script) |
| `/` (home) | 4 | 70.7KB |
| `/solutions/automotive` | 7 | 73.4KB |
| `/knowledge` | 3 | 65.7KB |
| `/knowledge/automotive` (guide) | 3 | 65.4KB |
| `/products/automotive` (heaviest island page) | 4 | **71.2KB** |

The shared React runtime (~57KB gz, cached across routes) dominates every
number above 0.2KB — any single React island pays it once. Guide routes carry
exactly the three islands the brief mandates (SearchBar, AskIrisProAI,
scroll-spy); getting them to true 0KB would mean porting those to vanilla
scripts or dropping AskIrisProAI from the rail data — a Stage 4+ decision,
flagged here rather than taken unilaterally. All routes are far inside the
150KB initial-JS budget.

## SEO layer

- `src/lib/seo/metadata.ts` — title/description/canonical from the content
  object (`SITE.titleTemplate`).
- `src/lib/seo/schema.ts` — JSON-LD builders: Organization (every page),
  BreadcrumbList (every page with crumbs), FAQPage (guides, from rail
  questions), Product ItemList (product pages, from section data).
- Real breadcrumbs (`Breadcrumbs.astro`), matching the screens' trails.
- `src/pages/sitemap.xml.ts` (built from the same collections as routing;
  specimens excluded) + `public/robots.txt`.
- `scripts/check-html.mjs` (wired into `npm run build`): exactly one `<h1>`
  per page (the `/components` specimen is the single documented exemption —
  its CinematicHero demo owns an h1 by design), non-empty `<title>`.

⚠ The production domain `https://www.irispro.com` (astro.config, site.ts,
robots.txt) is **provisional** — V1 only evidences `ewarranty.irispro.com`.
Confirm with the client.

## Map (Stage 3 additions)

```
src/components/SectionRenderer.astro   the spine (zone bands, anchors, island switch)
src/lib/sectionRegistry.ts             type → component + hydration + chrome
src/layouts/BaseLayout.astro           site shell: SEO, JSON-LD, header/footer
src/templates/*.astro                  the five templates
src/components/sections/               Stage 3 static sections (.astro)
src/components/islands/                Stage 3 islands (SearchBar, ModuleBrowser,
                                       ProductBrowser, OnThisPage scroll-spy)
src/components/nav/                    Header · Footer · Breadcrumbs · MobileNav
src/config/navigation.ts               single source of nav truth (provisional
                                       labels — _conflicts.md §§10–12)
src/config/site.ts                     domain, title template
src/lib/seo/                           metadata.ts · schema.ts
src/types/sections.ts + schemas/sections.ts   section/page contracts + Zod mirrors
src/content.config.ts                  5 page collections (glob, JSON) +
                                       Stage 2 item collections (specimen)
src/content/*/                         one fixture per collection
scripts/check-html.mjs                 post-build h1/title gate
```

Stage 4 is pure content authoring: add JSON files to the collections. A
malformed file fails the build with a per-field error; a new page needs zero
template or routing changes.
