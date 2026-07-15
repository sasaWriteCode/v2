/**
 * IrisPro V2 — Zod schemas for Astro Content Collections.
 *
 * A 1:1 validation layer over the content data contracts in
 * types/content.ts — the interfaces there remain the single source of
 * truth for component prop shapes; every schema here is checked against
 * its interface with `satisfies z.ZodType<…>`, so any drift between the
 * two files is a compile error, not a runtime surprise.
 */

import { z } from 'astro/zod';
import type {
  AskAiContent,
  BenefitItem,
  CertItem,
  CinematicHeroContent,
  ComparisonRow,
  CtaAction,
  CtaLink,
  GuideChapter,
  HeroComparison,
  HeroComparisonSide,
  IconName,
  MediaContent,
  PriorityOption,
  PriorityRecommendation,
  ProblemCard,
  ProductItem,
  ProductSpec,
  ProjectBadge,
  ProjectItem,
  SeriesColumn,
  SeriesHighlight,
  SolutionKey,
  SpectrumBand,
  SpectrumBehavior,
  SpectrumDiagramContent,
  StatItem,
  TechPillar,
} from '@/types/content';

/* ── Foundation ── */

export const solutionKeySchema = z.enum([
  'automotive',
  'residential',
  'commercial',
  'personal-protection',
  'sustainability',
]) satisfies z.ZodType<SolutionKey>;

export const iconNameSchema = z.enum([
  'car',
  'home',
  'building',
  'person',
  'users',
  'leaf',
  'shield',
  'sun',
  'eye',
  'thermometer',
  'snowflake',
  'battery',
  'layers',
  'award',
  'check',
  'star',
  'play',
  'pin',
  'chat',
  'document',
  'handshake',
  'headset',
  'bolt',
  'wallet',
  'recycle',
  'search',
]) satisfies z.ZodType<IconName>;

export const ctaLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
}) satisfies z.ZodType<CtaLink>;

/** Serializable media reference. width/height are required — CLS budget. */
export const mediaContentSchema = z.object({
  src: z.string(),
  avifSrc: z.string().optional(),
  webpSrc: z.string().optional(),
  /** Present = this is a video; src/avifSrc/webpSrc describe the poster. */
  video: z.string().optional(),
  videoType: z.string().optional(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
}) satisfies z.ZodType<MediaContent>;

/* ── 1. CinematicHero ── */

export const benefitItemSchema = z.object({
  icon: iconNameSchema,
  label: z.string(),
}) satisfies z.ZodType<BenefitItem>;

export const heroComparisonSideSchema = z.object({
  label: z.string(),
  points: z.array(z.string()),
}) satisfies z.ZodType<HeroComparisonSide>;

export const heroComparisonSchema = z.object({
  without: heroComparisonSideSchema,
  with: heroComparisonSideSchema,
}) satisfies z.ZodType<HeroComparison>;

export const cinematicHeroContentSchema = z.object({
  eyebrow: z.string().optional(),
  headlineLines: z.array(z.string()),
  subhead: z.string(),
  benefits: z.array(benefitItemSchema).optional(),
  ctas: z.array(ctaLinkSchema).optional(),
  media: mediaContentSchema.optional(),
  accent: solutionKeySchema.optional(),
  comparison: heroComparisonSchema.optional(),
}) satisfies z.ZodType<CinematicHeroContent>;

/* ── 2. ProblemCardGrid ── */

export const problemCardSchema = z.object({
  icon: iconNameSchema,
  title: z.string(),
  description: z.string(),
  image: mediaContentSchema.optional(),
}) satisfies z.ZodType<ProblemCard>;

/* ── 3. PrioritySelector ── */

export const priorityRecommendationSchema = z.object({
  title: z.string(),
  body: z.string(),
  cta: ctaLinkSchema.optional(),
}) satisfies z.ZodType<PriorityRecommendation>;

export const priorityOptionSchema = z.object({
  /** URL-safe id — becomes the ?priority= value (shareable state). */
  id: z.string(),
  icon: iconNameSchema,
  label: z.string(),
  accent: solutionKeySchema.optional(),
  recommendation: priorityRecommendationSchema,
}) satisfies z.ZodType<PriorityOption>;

/* ── 4. SpectrumDiagram ── */

export const spectrumBehaviorSchema = z.enum([
  'blocked',
  'reduced',
  'transmitted',
]) satisfies z.ZodType<SpectrumBehavior>;

export const spectrumBandSchema = z.object({
  id: z.string(),
  name: z.string(),
  fromNm: z.number(),
  toNm: z.number(),
  behavior: spectrumBehaviorSchema,
  annotation: z.string().optional(),
  hue: z.string().optional(),
}) satisfies z.ZodType<SpectrumBand>;

export const spectrumDiagramContentSchema = z.object({
  bands: z.array(spectrumBandSchema),
  variant: z.enum(['full', 'compact']).optional(),
  showFilm: z.boolean().optional(),
  title: z.string().optional(),
}) satisfies z.ZodType<SpectrumDiagramContent>;

/* ── 5. TechPillarGrid ── */

export const techPillarSchema = z.object({
  icon: iconNameSchema,
  title: z.string(),
  description: z.string(),
  link: ctaLinkSchema.optional(),
}) satisfies z.ZodType<TechPillar>;

/* ── 6. ProofStatBar ── */

export const statItemSchema = z.object({
  value: z.string(),
  unit: z.string().optional(),
  label: z.string(),
  footnote: z.string().optional(),
}) satisfies z.ZodType<StatItem>;

/* ── 7. ProjectStrip ── */

export const projectBadgeSchema = z.object({
  label: z.string(),
  tone: z.enum(['featured', 'progress', 'achievement']).optional(),
}) satisfies z.ZodType<ProjectBadge>;

export const projectItemSchema = z.object({
  name: z.string(),
  location: z.string(),
  image: mediaContentSchema,
  badge: projectBadgeSchema.optional(),
  category: z.string().optional(),
  productsUsed: z.array(z.string()).optional(),
  benefit: z.string().optional(),
  cta: ctaLinkSchema.optional(),
}) satisfies z.ZodType<ProjectItem>;

/* ── 8. SeriesComparisonTable ── */

export const seriesColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string().optional(),
  accent: z.union([solutionKeySchema, z.literal('neutral')]).optional(),
}) satisfies z.ZodType<SeriesColumn>;

export const comparisonRowSchema = z.object({
  label: z.string(),
  /** Keyed by SeriesColumn.id. `true`/`false` renders as ✓/—. */
  values: z.record(z.string(), z.union([z.string(), z.boolean()])),
}) satisfies z.ZodType<ComparisonRow>;

export const seriesHighlightSchema = z.object({
  columnId: z.string(),
  label: z.string(),
}) satisfies z.ZodType<SeriesHighlight>;

/* ── 9. ProductCard ── */

export const productSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
}) satisfies z.ZodType<ProductSpec>;

export const productItemSchema = z.object({
  /** URL-safe id — used by the ?compare= state. */
  id: z.string(),
  name: z.string(),
  /** ProductBadge is an open string union — any string validates. */
  badge: z.string().optional(),
  technology: z.string(),
  image: mediaContentSchema,
  specs: z.array(productSpecSchema),
  vltOptions: z.array(z.string()),
  compareable: z.boolean().optional(),
  detailsHref: z.string().optional(),
}) satisfies z.ZodType<ProductItem>;

/* ── 10. GuideChapterList ── */

export const guideChapterSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
  thumbnail: mediaContentSchema.optional(),
  /** Lesson titles — SEO-bearing, must be in the DOM when collapsed. */
  lessons: z.array(z.string()),
  href: z.string().optional(),
}) satisfies z.ZodType<GuideChapter>;

/* ── 11. AskIrisProAI ── */

export const askAiContentSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  suggestedQuestions: z.array(z.string()),
  /** No-JS fallback: the form GETs here with ?q= when JS is unavailable. */
  fallbackAction: z.string(),
}) satisfies z.ZodType<AskAiContent>;

/* ── 12. CTABar + CertificationStrip ── */

export const ctaActionSchema = z.object({
  icon: iconNameSchema,
  title: z.string(),
  description: z.string().optional(),
  cta: ctaLinkSchema,
}) satisfies z.ZodType<CtaAction>;

export const certItemSchema = z.object({
  id: z.string(),
  /** e.g. "SIRIM" — rendered as a text mark until logo assets land. */
  name: z.string(),
  label: z.string(),
}) satisfies z.ZodType<CertItem>;
