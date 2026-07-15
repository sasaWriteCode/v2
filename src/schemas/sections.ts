/**
 * IrisPro V2 — Zod mirrors for the Stage 3 section + page contracts.
 *
 * Same pattern as schemas/content.ts: types/sections.ts stays the type
 * source of truth; every schema here is `satisfies z.ZodType<…>`-checked
 * so drift between the two files is a compile error. These schemas back
 * the Stage 3/4 Content Collections — a malformed content file fails the
 * build.
 */

import { z } from 'astro/zod';
import {
  askAiContentSchema,
  certItemSchema,
  cinematicHeroContentSchema,
  comparisonRowSchema,
  ctaActionSchema,
  ctaLinkSchema,
  guideChapterSchema,
  iconNameSchema,
  mediaContentSchema,
  priorityOptionSchema,
  problemCardSchema,
  productItemSchema,
  projectItemSchema,
  seriesColumnSchema,
  seriesHighlightSchema,
  solutionKeySchema,
  spectrumBandSchema,
  statItemSchema,
  techPillarSchema,
} from './content';
import type {
  ArticleGridContent,
  ArticleItem,
  CategoryGridContent,
  CategoryItem,
  CertificationStripContent,
  ChapterCardRowContent,
  Crumb,
  CtaBarContent,
  EditorialPageContent,
  FilmFinderContent,
  FilmFinderOption,
  GuideChapterListContent,
  GuidePageContent,
  GuideRailContent,
  KnowledgePageContent,
  LearningPathContent,
  LearningStep,
  ModuleBrowserContent,
  ModuleEpisode,
  ModuleItem,
  PageHeroContent,
  PageHeroMetaItem,
  PageSeo,
  PrioritySelectorContent,
  ProblemCardGridContent,
  ProductBrowserContent,
  ProductBrowserItem,
  ProductFilter,
  ProductFilterOption,
  ProductPageContent,
  ProjectStripContent,
  ProofStatBarContent,
  RailEpisode,
  RailQuestion,
  SearchContent,
  Section,
  SectionZone,
  SeriesCard,
  SeriesCardSetContent,
  SeriesComparisonTableContent,
  SolutionPageContent,
  TechPillarGridContent,
  TestimonialItem,
  TestimonialPanelContent,
  VideoCarouselContent,
  VideoItem,
} from '@/types/sections';

/* ── Zones ── */

export const sectionZoneSchema = z.enum([
  'showroom-dark',
  'workshop-light',
]) satisfies z.ZodType<SectionZone>;

/* ── Stage 2 primitive prop envelopes ── */

export const problemCardGridContentSchema = z.object({
  cards: z.array(problemCardSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(6)]).optional(),
}) satisfies z.ZodType<ProblemCardGridContent>;

export const prioritySelectorContentSchema = z.object({
  legend: z.string(),
  options: z.array(priorityOptionSchema),
  hint: z.string().optional(),
}) satisfies z.ZodType<PrioritySelectorContent>;

export const spectrumDiagramSectionSchema = z.object({
  bands: z.array(spectrumBandSchema),
  variant: z.enum(['full', 'compact']).optional(),
  showFilm: z.boolean().optional(),
  title: z.string().optional(),
});

export const techPillarGridContentSchema = z.object({
  pillars: z.array(techPillarSchema),
  columns: z
    .union([z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
    .optional(),
}) satisfies z.ZodType<TechPillarGridContent>;

export const proofStatBarContentSchema = z.object({
  stats: z.array(statItemSchema),
  variant: z.enum(['light', 'dark']).optional(),
}) satisfies z.ZodType<ProofStatBarContent>;

export const projectStripContentSchema = z.object({
  projects: z.array(projectItemSchema),
  filters: z.boolean().optional(),
  scrollable: z.boolean().optional(),
}) satisfies z.ZodType<ProjectStripContent>;

export const seriesComparisonTableContentSchema = z.object({
  caption: z.string(),
  series: z.array(seriesColumnSchema),
  rows: z.array(comparisonRowSchema),
  highlight: seriesHighlightSchema.optional(),
}) satisfies z.ZodType<SeriesComparisonTableContent>;

export const guideChapterListContentSchema = z.object({
  chapters: z.array(guideChapterSchema),
  defaultOpen: z.number().optional(),
}) satisfies z.ZodType<GuideChapterListContent>;

export const ctaBarContentSchema = z.object({
  headline: z.string(),
  subhead: z.string().optional(),
  actions: z.array(ctaActionSchema),
  variant: z.enum(['showroom', 'workshop']).optional(),
}) satisfies z.ZodType<CtaBarContent>;

export const certificationStripContentSchema = z.object({
  certs: z.array(certItemSchema),
  variant: z.enum(['row', 'grid']).optional(),
  heading: z.string().optional(),
}) satisfies z.ZodType<CertificationStripContent>;

/* ── Stage 3 sections ── */

export const seriesCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()),
  accent: z.union([solutionKeySchema, z.literal('neutral')]).optional(),
  badge: z.string().optional(),
  cta: ctaLinkSchema.optional(),
}) satisfies z.ZodType<SeriesCard>;

export const seriesCardSetContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  cards: z.array(seriesCardSchema),
}) satisfies z.ZodType<SeriesCardSetContent>;

export const testimonialItemSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  context: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
}) satisfies z.ZodType<TestimonialItem>;

export const testimonialPanelContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  testimonials: z.array(testimonialItemSchema),
}) satisfies z.ZodType<TestimonialPanelContent>;

export const searchContentSchema = z.object({
  label: z.string(),
  placeholder: z.string().optional(),
  action: z.string(),
  buttonLabel: z.string().optional(),
}) satisfies z.ZodType<SearchContent>;

export const pageHeroMetaItemSchema = z.object({
  icon: iconNameSchema.optional(),
  label: z.string(),
}) satisfies z.ZodType<PageHeroMetaItem>;

export const pageHeroContentSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  lede: z.string().optional(),
  meta: z.array(pageHeroMetaItemSchema).optional(),
  ctas: z.array(ctaLinkSchema).optional(),
  search: searchContentSchema.optional(),
}) satisfies z.ZodType<PageHeroContent>;

export const chapterCardRowContentSchema = z.object({
  heading: z.string().optional(),
  chapters: z.array(guideChapterSchema),
}) satisfies z.ZodType<ChapterCardRowContent>;

export const categoryItemSchema = z.object({
  icon: iconNameSchema,
  title: z.string(),
  description: z.string().optional(),
  href: z.string(),
  count: z.string().optional(),
}) satisfies z.ZodType<CategoryItem>;

export const categoryGridContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  categories: z.array(categoryItemSchema),
}) satisfies z.ZodType<CategoryGridContent>;

export const videoItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  poster: mediaContentSchema,
  duration: z.string().optional(),
  moduleLabel: z.string().optional(),
}) satisfies z.ZodType<VideoItem>;

export const videoCarouselContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  videos: z.array(videoItemSchema),
}) satisfies z.ZodType<VideoCarouselContent>;

export const learningStepSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
  status: z.enum(['available', 'coming-soon']).optional(),
}) satisfies z.ZodType<LearningStep>;

export const learningPathContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  steps: z.array(learningStepSchema),
}) satisfies z.ZodType<LearningPathContent>;

export const articleItemSchema = z.object({
  title: z.string(),
  href: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  readTime: z.string().optional(),
  image: mediaContentSchema.optional(),
}) satisfies z.ZodType<ArticleItem>;

export const articleGridContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  articles: z.array(articleItemSchema),
}) satisfies z.ZodType<ArticleGridContent>;

export const moduleEpisodeSchema = z.object({
  title: z.string(),
  href: z.string().optional(),
  duration: z.string().optional(),
}) satisfies z.ZodType<ModuleEpisode>;

export const moduleItemSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string().optional(),
  episodes: z.array(moduleEpisodeSchema),
}) satisfies z.ZodType<ModuleItem>;

export const moduleBrowserContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  allLabel: z.string(),
  modules: z.array(moduleItemSchema),
}) satisfies z.ZodType<ModuleBrowserContent>;

export const filmFinderOptionSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  href: z.string(),
  icon: iconNameSchema.optional(),
}) satisfies z.ZodType<FilmFinderOption>;

export const filmFinderContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  question: z.string(),
  options: z.array(filmFinderOptionSchema),
}) satisfies z.ZodType<FilmFinderContent>;

export const productFilterOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
}) satisfies z.ZodType<ProductFilterOption>;

export const productFilterSchema = z.object({
  param: z.string(),
  label: z.string(),
  anyLabel: z.string(),
  options: z.array(productFilterOptionSchema),
}) satisfies z.ZodType<ProductFilter>;

export const productBrowserItemSchema = z.object({
  product: productItemSchema,
  facets: z.record(z.string(), z.array(z.string())),
}) satisfies z.ZodType<ProductBrowserItem>;

export const productBrowserContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  filters: z.array(productFilterSchema),
  items: z.array(productBrowserItemSchema),
  fallbackAction: z.string(),
  emptyLabel: z.string(),
  compareHint: z.string().optional(),
}) satisfies z.ZodType<ProductBrowserContent>;

export const railEpisodeSchema = z.object({
  title: z.string(),
  href: z.string(),
  duration: z.string().optional(),
  moduleLabel: z.string().optional(),
}) satisfies z.ZodType<RailEpisode>;

export const railQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
}) satisfies z.ZodType<RailQuestion>;

export const guideRailContentSchema = z.object({
  onThisPageLabel: z.string().optional(),
  episodesHeading: z.string().optional(),
  episodes: z.array(railEpisodeSchema).optional(),
  questionsHeading: z.string().optional(),
  questions: z.array(railQuestionSchema).optional(),
  askAi: askAiContentSchema.optional(),
}) satisfies z.ZodType<GuideRailContent>;

/* ── The section envelope (discriminated union on `type`) ── */

const sectionBaseFields = {
  id: z.string(),
  order: z.number(),
  zone: sectionZoneSchema.optional(),
  label: z.string().optional(),
};

function sectionVariant<T extends string, D>(type: T, data: z.ZodType<D>) {
  return z.object({ ...sectionBaseFields, type: z.literal(type), data });
}

export const sectionSchema = z.discriminatedUnion('type', [
  sectionVariant('cinematic-hero', cinematicHeroContentSchema),
  sectionVariant('problem-card-grid', problemCardGridContentSchema),
  sectionVariant('priority-selector', prioritySelectorContentSchema),
  sectionVariant('protection-level-selector', prioritySelectorContentSchema),
  sectionVariant('spectrum-diagram', spectrumDiagramSectionSchema),
  sectionVariant('tech-pillar-grid', techPillarGridContentSchema),
  sectionVariant('proof-stat-bar', proofStatBarContentSchema),
  sectionVariant('project-strip', projectStripContentSchema),
  sectionVariant('series-card-set', seriesCardSetContentSchema),
  sectionVariant('series-comparison-table', seriesComparisonTableContentSchema),
  sectionVariant('guide-chapter-list', guideChapterListContentSchema),
  sectionVariant('testimonial-panel', testimonialPanelContentSchema),
  sectionVariant('cta-bar', ctaBarContentSchema),
  sectionVariant('certification-strip', certificationStripContentSchema),
  sectionVariant('ask-irispro-ai', askAiContentSchema),
  sectionVariant('guide-hero', pageHeroContentSchema),
  sectionVariant('hub-hero', pageHeroContentSchema),
  sectionVariant('product-hero', pageHeroContentSchema),
  sectionVariant('search-bar', searchContentSchema),
  sectionVariant('chapter-card-row', chapterCardRowContentSchema),
  sectionVariant('category-grid', categoryGridContentSchema),
  sectionVariant('video-carousel', videoCarouselContentSchema),
  sectionVariant('learning-path', learningPathContentSchema),
  sectionVariant('article-grid', articleGridContentSchema),
  sectionVariant('module-browser', moduleBrowserContentSchema),
  sectionVariant('film-finder', filmFinderContentSchema),
  sectionVariant('product-browser', productBrowserContentSchema),
]) satisfies z.ZodType<Section>;

/* ── Page content objects ── */

export const pageSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
}) satisfies z.ZodType<PageSeo>;

export const crumbSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
}) satisfies z.ZodType<Crumb>;

const pageBaseFields = {
  title: z.string(),
  seo: pageSeoSchema,
  breadcrumbs: z.array(crumbSchema).optional(),
};

export const sectionPageSchema = z.object({
  ...pageBaseFields,
  defaultZone: sectionZoneSchema.optional(),
  sections: z.array(sectionSchema),
});

export const solutionPageSchema = z.object({
  ...pageBaseFields,
  defaultZone: sectionZoneSchema.optional(),
  accent: solutionKeySchema,
  sections: z.array(sectionSchema),
}) satisfies z.ZodType<SolutionPageContent>;

export const guidePageSchema = z.object({
  ...pageBaseFields,
  intro: z.array(sectionSchema),
  main: z.array(sectionSchema),
  rail: guideRailContentSchema,
  outro: z.array(sectionSchema),
}) satisfies z.ZodType<GuidePageContent>;

export const knowledgePageSchema =
  sectionPageSchema satisfies z.ZodType<KnowledgePageContent>;
export const productPageSchema =
  sectionPageSchema satisfies z.ZodType<ProductPageContent>;
export const editorialPageSchema =
  sectionPageSchema satisfies z.ZodType<EditorialPageContent>;
