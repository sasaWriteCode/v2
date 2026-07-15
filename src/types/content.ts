/**
 * IrisPro V2 — content data contracts.
 *
 * These interfaces are BOTH the component prop shapes and the Stage 4 content
 * schema. Everything here must stay JSON-serializable: icons are referenced
 * by IconName string (rendered via <Icon>), never by ReactNode; media is
 * described by URL + intrinsic dimensions, never by element.
 */

/* ── Foundation ── */

export type SolutionKey =
  | 'automotive'
  | 'residential'
  | 'commercial'
  | 'personal-protection'
  | 'sustainability';

/** Icon ids resolvable by components/global/Icon.tsx */
export type IconName =
  | 'car'
  | 'home'
  | 'building'
  | 'person'
  | 'users'
  | 'leaf'
  | 'shield'
  | 'sun'
  | 'eye'
  | 'thermometer'
  | 'snowflake'
  | 'battery'
  | 'layers'
  | 'award'
  | 'check'
  | 'star'
  | 'play'
  | 'pin'
  | 'chat'
  | 'document'
  | 'handshake'
  | 'headset'
  | 'bolt'
  | 'wallet'
  | 'recycle'
  | 'search';

export interface CtaLink {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

/** Serializable media reference. width/height are required — CLS budget. */
export interface MediaContent {
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  /** Present = this is a video; src/avifSrc/webpSrc describe the poster. */
  video?: string;
  videoType?: string;
  alt: string;
  width: number;
  height: number;
}

/* ── 1. CinematicHero ── */

export interface BenefitItem {
  icon: IconName;
  label: string;
}

export interface HeroComparisonSide {
  label: string;
  points: string[];
}

export interface HeroComparison {
  /** e.g. "WITHOUT IrisPro — Very Hot Cabin, Uncomfortable & Unsafe" */
  without: HeroComparisonSide;
  with: HeroComparisonSide;
}

export interface CinematicHeroContent {
  eyebrow?: string;
  /**
   * One line per array entry — presentational break control only. The
   * rendered <h1> reads as a single continuous string to AT and crawlers.
   */
  headlineLines: string[];
  subhead: string;
  benefits?: BenefitItem[];
  ctas?: CtaLink[];
  media?: MediaContent;
  accent?: SolutionKey;
  comparison?: HeroComparison;
}

/* ── 2. ProblemCardGrid ── */

export interface ProblemCard {
  icon: IconName;
  title: string;
  description: string;
  image?: MediaContent;
}

/* ── 3. PrioritySelector ── */

export interface PriorityRecommendation {
  title: string;
  body: string;
  cta?: CtaLink;
}

export interface PriorityOption {
  /** URL-safe id — becomes the ?priority= value (shareable state). */
  id: string;
  icon: IconName;
  label: string;
  accent?: SolutionKey;
  recommendation: PriorityRecommendation;
}

/* ── 4. SpectrumDiagram ── */

export type SpectrumBehavior = 'blocked' | 'reduced' | 'transmitted';

export interface SpectrumBand {
  id: string;
  /** e.g. "HEV Blue Light" — real text node, SEO-bearing. */
  name: string;
  /** Wavelength range in nm — real text nodes, these are search terms. */
  fromNm: number;
  toNm: number;
  behavior: SpectrumBehavior;
  /** Right-side callout, e.g. "Blocks 99.99% UV400". */
  annotation?: string;
  /** CSS color for the ray/annotation (defaults to a behavior-based tone). */
  hue?: string;
}

export interface SpectrumDiagramContent {
  bands: SpectrumBand[];
  variant?: 'full' | 'compact';
  showFilm?: boolean;
  title?: string;
}

/* ── 5. TechPillarGrid ── */

export interface TechPillar {
  icon: IconName;
  title: string;
  description: string;
  link?: CtaLink;
}

/* ── 6. ProofStatBar ── */

export interface StatItem {
  /**
   * Display value, e.g. "10", "99.99", "20,000+", "1.2". The leading numeric
   * portion may count up at TIER_1+; the full string is always the
   * server-rendered text.
   */
  value: string;
  /** e.g. "°C", "%", "Tons CO₂", "Years" */
  unit?: string;
  label: string;
  /** Marks the stat with * and renders the footnote below the bar. */
  footnote?: string;
}

/* ── 7. ProjectStrip ── */

export interface ProjectBadge {
  label: string;
  tone?: 'featured' | 'progress' | 'achievement';
}

export interface ProjectItem {
  name: string;
  location: string;
  image: MediaContent;
  badge?: ProjectBadge;
  /** Filter category, e.g. "Commercial", "Government", "Hospitality". */
  category?: string;
  productsUsed?: string[];
  benefit?: string;
  cta?: CtaLink;
}

/* ── 8. SeriesComparisonTable ── */

export interface SeriesColumn {
  id: string;
  name: string;
  tagline?: string;
  accent?: SolutionKey | 'neutral';
}

export interface ComparisonRow {
  label: string;
  /** Keyed by SeriesColumn.id. `true`/`false` renders as ✓/—. */
  values: Record<string, string | boolean>;
}

export interface SeriesHighlight {
  columnId: string;
  /** e.g. "RECOMMENDED", "PREMIUM CHOICE" */
  label: string;
}

/* ── 9. ProductCard ── */

export type ProductBadge =
  | 'SIGNATURE'
  | 'PRIVACY + HEAT'
  | 'HEAT REJECTION'
  | 'HEAT REJECTION + SECURITY'
  | (string & {});

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  /** URL-safe id — used by the ?compare= state. */
  id: string;
  name: string;
  badge?: ProductBadge;
  technology: string;
  image: MediaContent;
  specs: ProductSpec[];
  /** VLT percentages as display strings, e.g. ["69%", "60%", "15%"]. */
  vltOptions: string[];
  compareable?: boolean;
  detailsHref?: string;
}

/* ── 10. GuideChapterList ── */

export interface GuideChapter {
  number: number;
  title: string;
  description: string;
  thumbnail?: MediaContent;
  /** Lesson titles — SEO-bearing, must be in the DOM when collapsed. */
  lessons: string[];
  href?: string;
}

/* ── 11. AskIrisProAI ── */

export interface AskAiContent {
  heading?: string;
  description?: string;
  placeholder?: string;
  suggestedQuestions: string[];
  /** No-JS fallback: the form GETs here with ?q= when JS is unavailable. */
  fallbackAction: string;
}

/* ── 12. CTABar + CertificationStrip ── */

export interface CtaAction {
  icon: IconName;
  title: string;
  description?: string;
  cta: CtaLink;
}

export interface CertItem {
  id: string;
  /** e.g. "SIRIM" — rendered as a text mark until logo assets land. */
  name: string;
  label: string;
}
