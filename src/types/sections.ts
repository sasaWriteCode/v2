/**
 * IrisPro V2 — Stage 3 contracts: section envelopes + page content objects.
 *
 * Same rules as types/content.ts: everything is JSON-serializable data.
 * A page is `sections[]`; every section is { id, type, order, zone?, data }.
 * Templates render sections through the registry — never by hand.
 *
 * The Zod mirrors live in schemas/sections.ts and are `satisfies`-checked
 * against these types — drift is a compile error.
 */

import type {
  AskAiContent,
  CertItem,
  CinematicHeroContent,
  ComparisonRow,
  CtaAction,
  CtaLink,
  GuideChapter,
  IconName,
  MediaContent,
  PriorityOption,
  ProblemCard,
  ProductItem,
  ProjectItem,
  SeriesColumn,
  SeriesHighlight,
  SolutionKey,
  SpectrumDiagramContent,
  StatItem,
  TechPillar,
} from './content';

/* ── Zones ──
   Content speaks in design intent; the renderer maps to data-zone. */
export type SectionZone = 'showroom-dark' | 'workshop-light';

/* ═══ Stage 2 primitives — prop shapes as named section data ═══ */

export interface ProblemCardGridContent {
  cards: ProblemCard[];
  columns?: 2 | 3 | 6;
}

export interface PrioritySelectorContent {
  legend: string;
  /** Visible section heading, e.g. "What Matters Most To You?". */
  heading?: string;
  lede?: string;
  options: PriorityOption[];
  hint?: string;
}

export interface TechPillarGridContent {
  pillars: TechPillar[];
  columns?: 3 | 4 | 5 | 6;
}

/**
 * PhilosophyFlow — a step-to-step "road" of value pillars (mindmap/journey
 * treatment of the protection philosophy). Steps reuse the TechPillar
 * shape; order in the array IS the journey order.
 */
export interface PhilosophyFlowContent {
  heading?: string;
  lede?: string;
  steps: TechPillar[];
}

export interface ProofStatBarContent {
  stats: StatItem[];
  variant?: 'light' | 'dark';
}

export interface ProjectStripContent {
  heading?: string;
  subhead?: string;
  lede?: string;
  projects: ProjectItem[];
  filters?: boolean;
  scrollable?: boolean;
}

export interface SeriesComparisonTableContent {
  caption: string;
  series: SeriesColumn[];
  rows: ComparisonRow[];
  highlight?: SeriesHighlight;
}

export interface GuideChapterListContent {
  chapters: GuideChapter[];
  defaultOpen?: number;
}

export interface CtaBarContent {
  headline?: string;
  subhead?: string;
  actions: CtaAction[];
  variant?: 'showroom' | 'workshop';
}

export interface CertificationStripContent {
  certs: CertItem[];
  variant?: 'row' | 'grid';
  heading?: string;
}

/* ═══ Stage 3 sections ═══ */

/* ── SeriesCardSet ── */
export interface SeriesCard {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  /** Feature bullets — rendered with check icons. */
  features: string[];
  accent?: SolutionKey | 'neutral';
  badge?: string;
  cta?: CtaLink;
}

export interface SeriesCardSetContent {
  heading?: string;
  lede?: string;
  cards: SeriesCard[];
}

/* ── TestimonialPanel ── */
export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  /** e.g. "Titan X · Kuala Lumpur" */
  context?: string;
  /** 1–5; rendered as stars with an accessible text equivalent. */
  rating?: number;
}

export interface TestimonialPanelContent {
  heading?: string;
  lede?: string;
  testimonials: TestimonialItem[];
}

/* ── Search (embedded in heroes or standalone section) ── */
export interface SearchContent {
  /** Visible label for the search input (also the placeholder default). */
  label: string;
  placeholder?: string;
  /** GET target — works without JS. Query lands in ?q=. */
  action: string;
  buttonLabel?: string;
}

/* ── PageHero (guide-hero / hub-hero / product-hero share this shape) ── */
export interface PageHeroMetaItem {
  icon?: IconName;
  label: string;
}

export interface PageHeroContent {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Meta chips, e.g. "4 chapters", "24 lessons", "~90 min". */
  meta?: PageHeroMetaItem[];
  ctas?: CtaLink[];
  /** Present = hero embeds the SearchBar island (hub hero). */
  search?: SearchContent;
}

/* ── ChapterCardRow ── */
export interface ChapterCardRowContent {
  heading?: string;
  chapters: GuideChapter[];
}

/* ── CategoryGrid ── */
export interface CategoryItem {
  icon: IconName;
  title: string;
  description?: string;
  href: string;
  /** e.g. "12 articles" */
  count?: string;
  /** Background image for hover zoom effect */
  image?: string | MediaContent;
  /** Custom icon color (e.g. hex or color key) */
  iconColor?: string;
}

export interface CategoryGridContent {
  heading?: string;
  lede?: string;
  /** 'masonry' = staggered CSS-columns layout with varied card heights
      (Pinterest-style). Default 'grid' (uniform rows). */
  layout?: 'grid' | 'masonry';
  categories: CategoryItem[];
}

/* ── VideoCarousel (native snap strip — never a JS carousel) ── */
export interface VideoItem {
  title: string;
  href: string;
  poster: MediaContent;
  duration?: string;
  /** e.g. "Module 3" */
  moduleLabel?: string;
}

export interface VideoCarouselContent {
  heading?: string;
  lede?: string;
  videos: VideoItem[];
}

/* ── LearningPath ── */
export interface LearningStep {
  number: number;
  title: string;
  description?: string;
  href?: string;
  status?: 'available' | 'coming-soon';
}

export interface LearningPathContent {
  heading?: string;
  lede?: string;
  steps: LearningStep[];
}

/* ── ArticleGrid ── */
export interface ArticleItem {
  title: string;
  href: string;
  description?: string;
  category?: string;
  readTime?: string;
  image?: MediaContent;
}

export interface ArticleGridContent {
  heading?: string;
  lede?: string;
  /** Desktop column count. Default 3. Use 4 for short one-liner cards
      (e.g. the four-pillar technologies band) so no orphan row appears. */
  columns?: 2 | 3 | 4;
  articles: ArticleItem[];
}

/* ── ModuleBrowser (filterable module/episode list, ?module= URL state) ── */
export interface ModuleEpisode {
  title: string;
  href?: string;
  duration?: string;
}

export interface ModuleItem {
  /** URL-safe — becomes the ?module= value. */
  id: string;
  number: number;
  title: string;
  description?: string;
  episodes: ModuleEpisode[];
}

export interface ModuleBrowserContent {
  heading?: string;
  lede?: string;
  /** Label for the "show everything" filter chip. */
  allLabel: string;
  modules: ModuleItem[];
}

/* ── FilmFinder (guided selector — static links, zero JS) ── */
export interface FilmFinderOption {
  label: string;
  description?: string;
  href: string;
  icon?: IconName;
}

export interface FilmFinderContent {
  heading?: string;
  lede?: string;
  question: string;
  options: FilmFinderOption[];
}

/* ── SolutionCardGrid ("Solutions by Environment" — 5 accent cards) ── */
export interface SolutionCard {
  /** Drives the card's accent color via --accent-<key> tokens. */
  key: SolutionKey;
  icon: IconName;
  title: string;
  /** Bold one-liner under the photo, e.g. "Smarter buildings. Higher performance." */
  tagline?: string;
  /** Point-form details, rendered with accent check icons. */
  points: string[];
  image: MediaContent;
  cta: CtaLink;
  /** Bento width in grid cells (desktop): 2 = wide feature card. Default 1. */
  span?: 1 | 2;
}

export interface SolutionCardGridContent {
  heading?: string;
  lede?: string;
  cards: SolutionCard[];
}

/* ── FaqSection (native <details>; feeds FAQPage JSON-LD on solutions) ── */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading?: string;
  lede?: string;
  items: FaqItem[];
}

/* ── MythFact (funnel education: the myth they arrived with, corrected) ── */
export interface MythFactPair {
  myth: string;
  fact: string;
  /** One-sentence why — the teachable moment. */
  explanation?: string;
}

export interface MythFactContent {
  heading?: string;
  lede?: string;
  pairs: MythFactPair[];
}

/* ── SplitMedia (text + image band — the long-missing prose/media type) ── */
export interface SplitMediaContent {
  heading?: string;
  lede?: string;
  /** Paragraphs. */
  body?: string[];
  /** Check-bulleted points after the body. */
  bullets?: string[];
  media: MediaContent;
  /** Which side the media sits on at desktop. Default 'right'. */
  mediaSide?: 'left' | 'right';
  footnote?: string;
  cta?: CtaLink;
}

/* ── ProductBrowser (filters + grid + compare, URL state) ── */
export interface ProductFilterOption {
  value: string;
  label: string;
}

export interface ProductFilter {
  /** URL param name, e.g. "vlt", "irr", "technology", "series". */
  param: string;
  label: string;
  /** Label for the "no filter" option, e.g. "Any VLT". */
  anyLabel: string;
  options: ProductFilterOption[];
}

/**
 * Products carry explicit facet values per filter param — matching is pure
 * data lookup, never `if (param === 'vlt')` logic in the island.
 */
export interface ProductBrowserItem {
  product: ProductItem;
  facets: Record<string, string[]>;
}

export interface ProductBrowserContent {
  heading?: string;
  lede?: string;
  filters: ProductFilter[];
  items: ProductBrowserItem[];
  /** GET target for the no-JS form fallback (usually the page itself). */
  fallbackAction: string;
  /** Shown when the active filters match nothing. */
  emptyLabel: string;
  /** aria-live compare hint, mirrors the Stage 2 demo. */
  compareHint?: string;
}

/* ── Guide right rail ── */
export interface RailEpisode {
  title: string;
  href: string;
  duration?: string;
  moduleLabel?: string;
}

export interface RailQuestion {
  question: string;
  /** Full answer — also feeds the FAQPage JSON-LD. */
  answer: string;
}

export interface GuideRailContent {
  /** Heading for the on-this-page nav, e.g. "On This Page". */
  onThisPageLabel?: string;
  episodesHeading?: string;
  episodes?: RailEpisode[];
  questionsHeading?: string;
  questions?: RailQuestion[];
  askAi?: AskAiContent;
}

export interface OnThisPageItem {
  id: string;
  label: string;
}

/* ═══ The section envelope ═══ */

interface SectionBase {
  /** Stable DOM id — anchor target (#priority-selector etc.). */
  id: string;
  /** Render order — sections sort by this, never by array position. */
  order: number;
  /** Zone override; falls back to the template's default zone. */
  zone?: SectionZone;
  /** Human label — used by "On This Page" navs. */
  label?: string;
}

export interface OurStoryStat {
  icon?: string;
  value: string;
  label: string;
}

export interface CustomerReview {
  name: string;
  username: string;
  body: string;
  img: string;
  rating?: number;
}

export interface WhyUsReviewPanelContent {
  heading?: string;
  marqueeTitle?: string;
  pillars?: TechPillar[];
  reviews?: CustomerReview[];
}

export interface PatentedTechHighlight {
  icon?: IconName;
  title: string;
  description: string;
}

export interface PatentedTechCardItem {
  id: string;
  patentNumber: string;
  title: string;
  subtitle: string;
  badge?: string;
  tagline?: string;
  description: string;
  keyMetric?: {
    value: string;
    label: string;
  };
  highlights?: PatentedTechHighlight[];
  href: string;
  ctaLabel?: string;
  theme?: 'uv' | 'hotmelt' | 'blue' | 'red';
}

export interface PatentedTechFlowContent {
  headlineLines?: string[];
  heading?: string;
  subhead?: string;
  categoryTitle?: string;
  categorySubtitle?: string;
  bullets?: string[];
  lede?: string;
  centerpieceLabel?: string;
  leftTech?: PatentedTechCardItem;
  rightTech?: PatentedTechCardItem;
  ctaHref?: string;
  ctaLabel?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle?: string;
  organization?: string;
  year?: string | number;
  description?: string;
  image: string;
  badge?: string;
  accent?: string;
  category?: string;
}

export interface AwardsCarouselContent {
  heading?: string;
  subhead?: string;
  lede?: string;
  awards: AwardItem[];
}

export interface MilestoneStepItem {
  number?: number | string;
  year?: number | string;
  title: string;
  tag?: string;
  description?: string;
  icon?: IconName;
  highlight?: boolean;
}

export interface MilestonesTimelineContent {
  heading?: string;
  subhead?: string;
  badge?: string;
  lede?: string;
  steps: MilestoneStepItem[];
}

export type Section = SectionBase &
  (
    | { type: 'cinematic-hero'; data: CinematicHeroContent }
    | { type: 'problem-card-grid'; data: ProblemCardGridContent }
    | { type: 'priority-selector'; data: PrioritySelectorContent }
    | { type: 'protection-level-selector'; data: PrioritySelectorContent }
    | { type: 'spectrum-diagram'; data: SpectrumDiagramContent }
    | { type: 'tech-pillar-grid'; data: TechPillarGridContent }
    | { type: 'philosophy-flow'; data: PhilosophyFlowContent }
    | { type: 'proof-stat-bar'; data: ProofStatBarContent }
    | { type: 'project-strip'; data: ProjectStripContent }
    | { type: 'series-card-set'; data: SeriesCardSetContent }
    | { type: 'series-comparison-table'; data: SeriesComparisonTableContent }
    | { type: 'guide-chapter-list'; data: GuideChapterListContent }
    | { type: 'testimonial-panel'; data: TestimonialPanelContent }
    | { type: 'cta-bar'; data: CtaBarContent }
    | { type: 'certification-strip'; data: CertificationStripContent }
    | { type: 'ask-irispro-ai'; data: AskAiContent }
    | { type: 'guide-hero'; data: PageHeroContent }
    | { type: 'hub-hero'; data: PageHeroContent }
    | { type: 'product-hero'; data: PageHeroContent }
    | { type: 'search-bar'; data: SearchContent }
    | { type: 'chapter-card-row'; data: ChapterCardRowContent }
    | { type: 'category-grid'; data: CategoryGridContent }
    | { type: 'video-carousel'; data: VideoCarouselContent }
    | { type: 'learning-path'; data: LearningPathContent }
    | { type: 'article-grid'; data: ArticleGridContent }
    | { type: 'module-browser'; data: ModuleBrowserContent }
    | { type: 'film-finder'; data: FilmFinderContent }
    | { type: 'solution-card-grid'; data: SolutionCardGridContent }
    | { type: 'faq'; data: FaqContent }
    | { type: 'myth-fact'; data: MythFactContent }
    | { type: 'split-media'; data: SplitMediaContent }
    | { type: 'product-browser'; data: ProductBrowserContent }
    | { type: 'our-story-panel'; data: OurStoryPanelContent }
    | { type: 'why-us-review-panel'; data: WhyUsReviewPanelContent }
    | { type: 'patented-tech-flow'; data: PatentedTechFlowContent }
    | { type: 'awards-carousel'; data: AwardsCarouselContent }
    | { type: 'milestones-timeline'; data: MilestonesTimelineContent }
  );

export type SectionType = Section['type'];

/* ═══ Page content objects ═══ */

export interface PageSeo {
  title: string;
  description: string;
}

export interface Crumb {
  label: string;
  /** Omit on the current page (last crumb). */
  href?: string;
}

export interface PageContentBase {
  title: string;
  seo: PageSeo;
  breadcrumbs?: Crumb[];
}

/** A page that is one linear sections[] flow. */
export interface SectionPageContent extends PageContentBase {
  defaultZone?: SectionZone;
  sections: Section[];
}

export interface SolutionPageContent extends SectionPageContent {
  /** Threaded to every section by the renderer + exposed as CSS vars. */
  accent: SolutionKey;
}

/**
 * Guides have a named-slot structure: full-width intro, the two-column
 * region (main + rail), and a full-width outro. Order within each slot is
 * still data (`order`), and the rail is pure data too.
 */
export interface GuidePageContent extends PageContentBase {
  intro: Section[];
  main: Section[];
  rail: GuideRailContent;
  outro: Section[];
}

export type KnowledgePageContent = SectionPageContent;
export type ProductPageContent = SectionPageContent;
export type EditorialPageContent = SectionPageContent;
