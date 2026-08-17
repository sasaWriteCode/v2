/**
 * IrisPro V2 — the section registry: SectionType → component + hydration
 * strategy + chrome. The single source of truth for how a section renders.
 *
 * HYDRATION POLICY (see README): a section hydrates only if it
 *  (a) owns interaction or URL state, or
 *  (b) contains Reveal/Parallax/count-up behaviour — a server-rendered
 *      Reveal on a page where any island stamps html[data-enhanced] would
 *      leave content permanently at opacity 0, violating rule 1.
 * Everything else renders to plain HTML: React components WITHOUT a client
 * directive are server-rendered only and ship 0KB.
 *
 * COMPILER CONSTRAINT: Astro must see `client:*` directives as literal
 * attributes on a statically-imported component — a registry lookup cannot
 * hydrate (`NoMatchingImport`, verified). So this registry DRIVES the
 * decision, but the hydrated types are rendered through an explicit
 * literal-JSX switch in SectionRenderer.astro. The renderer dev-asserts
 * the two stay in sync; if you add a hydrated type here, add its branch
 * there (the dev overlay will tell you loudly if you forget).
 *
 * `chrome` is design metadata per type, not per content:
 *  - 'full': full-bleed, the component owns its container + rhythm (heroes)
 *  - 'band': the renderer wraps it in .container + section rhythm
 */

// React primitives (Stage 2)
import { CinematicHero } from '@/components/showroom/CinematicHero';
import { ProblemCardGrid } from '@/components/showroom/ProblemCardGrid';
import { PrioritySelector } from '@/components/showroom/PrioritySelector';
import { SpectrumDiagram } from '@/components/showroom/SpectrumDiagram';
import { TechPillarGrid } from '@/components/showroom/TechPillarGrid';
import { ProofStatBar } from '@/components/showroom/ProofStatBar';
import { ProjectStrip } from '@/components/showroom/ProjectStrip';
import { OurStoryPanel } from '@/components/showroom/OurStoryPanel';
import { WhyUsReviewPanel } from '@/components/showroom/WhyUsReviewPanel';
import { PatentedTechFlow } from '@/components/showroom/PatentedTechFlow';
import { AwardsCarousel } from '@/components/showroom/AwardsCarousel';
import { MilestonesTimeline } from '@/components/showroom/MilestonesTimeline';
import { TechPatentShowcase } from '@/components/showroom/TechPatentShowcase';
import { SeriesComparisonTable } from '@/components/workshop/SeriesComparisonTable';
import { GuideChapterList } from '@/components/workshop/GuideChapterList';
import { AskIrisProAI } from '@/components/workshop/AskIrisProAI';
import { CTABar } from '@/components/global/CTABar';
import { CertificationStrip } from '@/components/global/CertificationStrip';
// Astro sections (Stage 3, static)
import PageHero from '@/components/sections/PageHero.astro';
import SeriesCardSet from '@/components/sections/SeriesCardSet.astro';
import TestimonialPanel from '@/components/sections/TestimonialPanel.astro';
import ChapterCardRow from '@/components/sections/ChapterCardRow.astro';
import CategoryGrid from '@/components/sections/CategoryGrid.astro';
import VideoCarousel from '@/components/sections/VideoCarousel.astro';
import LearningPath from '@/components/sections/LearningPath.astro';
import ArticleGrid from '@/components/sections/ArticleGrid.astro';
import PhilosophyFlow from '@/components/sections/PhilosophyFlow.astro';
import FilmFinder from '@/components/sections/FilmFinder.astro';
import FaqSection from '@/components/sections/FaqSection.astro';
import SolutionCardGrid from '@/components/sections/SolutionCardGrid.astro';
import AudiencePanelGrid from '@/components/sections/AudiencePanelGrid.astro';
import MythFact from '@/components/sections/MythFact.astro';
import SplitMedia from '@/components/sections/SplitMedia.astro';
// React islands (Stage 3)
import SearchBar from '@/components/islands/SearchBar';
import ModuleBrowser from '@/components/islands/ModuleBrowser';
import ProductBrowser from '@/components/islands/ProductBrowser';
import FilmCompare from '@/components/islands/FilmCompare';

import type { SectionType } from '@/types/sections';

export type HydrationStrategy = 'none' | 'visible' | 'idle' | 'load';
export type SectionChrome = 'full' | 'band';

export interface SectionRegistryEntry {
  // Astro + React component types have no useful common type — the
  // renderer is the only consumer.
  component: unknown;
  hydration: HydrationStrategy;
  chrome: SectionChrome;
}

export const SECTION_REGISTRY: Record<SectionType, SectionRegistryEntry> = {
  /* ── Showroom primitives ── */
  'cinematic-hero': { component: CinematicHero, hydration: 'visible', chrome: 'full' }, // Parallax + Reveal + Media
  'problem-card-grid': { component: ProblemCardGrid, hydration: 'visible', chrome: 'band' }, // staggered Reveal
  'priority-selector': { component: PrioritySelector, hydration: 'visible', chrome: 'band' }, // ?priority= URL state
  'protection-level-selector': { component: PrioritySelector, hydration: 'visible', chrome: 'band' }, // same primitive, different data (_conflicts.md §1)
  'spectrum-diagram': { component: SpectrumDiagram, hydration: 'visible', chrome: 'band' }, // ray stagger rides Reveal
  'tech-pillar-grid': { component: TechPillarGrid, hydration: 'visible', chrome: 'band' }, // staggered Reveal
  'proof-stat-bar': { component: ProofStatBar, hydration: 'visible', chrome: 'band' }, // count-up at TIER_1+
  'project-strip': { component: ProjectStrip, hydration: 'visible', chrome: 'band' }, // category filters
  'our-story-panel': { component: OurStoryPanel, hydration: 'visible', chrome: 'band' },
  'why-us-review-panel': { component: WhyUsReviewPanel, hydration: 'visible', chrome: 'band' },
  'patented-tech-flow': { component: PatentedTechFlow, hydration: 'visible', chrome: 'band' },
  'awards-carousel': { component: AwardsCarousel, hydration: 'visible', chrome: 'full' },
  'milestones-timeline': { component: MilestonesTimeline, hydration: 'visible', chrome: 'band' },
  'tech-patent-showcase': { component: TechPatentShowcase, hydration: 'visible', chrome: 'full' },

  /* ── Workshop primitives — pure markup, SSR-only, 0KB ── */
  'series-comparison-table': { component: SeriesComparisonTable, hydration: 'none', chrome: 'band' },
  'guide-chapter-list': { component: GuideChapterList, hydration: 'none', chrome: 'band' }, // native <details>
  'cta-bar': { component: CTABar, hydration: 'visible', chrome: 'full' },
  'certification-strip': { component: CertificationStrip, hydration: 'visible', chrome: 'full' },
  'ask-irispro-ai': { component: AskIrisProAI, hydration: 'visible', chrome: 'band' }, // interactive shell

  /* ── Stage 3 static sections (.astro, 0KB) ── */
  'guide-hero': { component: PageHero, hydration: 'none', chrome: 'full' },
  'hub-hero': { component: PageHero, hydration: 'none', chrome: 'full' }, // embeds the SearchBar island itself
  'product-hero': { component: PageHero, hydration: 'none', chrome: 'full' },
  'series-card-set': { component: SeriesCardSet, hydration: 'none', chrome: 'band' },
  'testimonial-panel': { component: TestimonialPanel, hydration: 'none', chrome: 'band' },
  'chapter-card-row': { component: ChapterCardRow, hydration: 'none', chrome: 'band' },
  'category-grid': { component: CategoryGrid, hydration: 'none', chrome: 'band' },
  'video-carousel': { component: VideoCarousel, hydration: 'none', chrome: 'band' }, // native snap strip
  'learning-path': { component: LearningPath, hydration: 'none', chrome: 'band' },
  'article-grid': { component: ArticleGrid, hydration: 'none', chrome: 'band' },
  'film-finder': { component: FilmFinder, hydration: 'none', chrome: 'band' },
  'philosophy-flow': { component: PhilosophyFlow, hydration: 'none', chrome: 'band' }, // dashed-road journey, pure CSS/SVG
  'audience-panel-grid': { component: AudiencePanelGrid, hydration: 'none', chrome: 'band' }, // mobility/buildings panels
  'faq': { component: FaqSection, hydration: 'none', chrome: 'band' }, // native <details>; FAQPage JSON-LD via template
  'solution-card-grid': { component: SolutionCardGrid, hydration: 'none', chrome: 'band' }, // Solutions by Environment cards
  'myth-fact': { component: MythFact, hydration: 'none', chrome: 'band' }, // funnel teachable moment
  'split-media': { component: SplitMedia, hydration: 'none', chrome: 'band' }, // prose + image band

  /* ── Stage 3 islands ── */
  'search-bar': { component: SearchBar, hydration: 'visible', chrome: 'band' }, // GET form works no-JS
  'module-browser': { component: ModuleBrowser, hydration: 'visible', chrome: 'band' }, // ?module= URL state
  'product-browser': { component: ProductBrowser, hydration: 'visible', chrome: 'band' }, // filters + ?compare=
  'film-compare': { component: FilmCompare, hydration: 'visible', chrome: 'band' }, // GSMArena-style slots
};
