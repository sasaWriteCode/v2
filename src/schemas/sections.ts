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
  FaqContent,
  FaqItem,
  FilmFinderContent,
  FilmFinderOption,
  MythFactContent,
  MythFactPair,
  SolutionCard,
  SolutionCardGridContent,
  SplitMediaContent,
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
  FilmCompareContent,
  AudiencePanel,
  AudiencePanelCard,
  AudiencePanelGridContent,
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
  PhilosophyFlowContent,
  TestimonialItem,
  TestimonialPanelContent,
  VideoCarouselContent,
  VideoItem,
  PatentedTechCardItem,
  PatentedTechFlowContent,
  PatentedTechHighlight,
  AwardItem,
  AwardsCarouselContent,
  MilestoneStepItem,
  MilestonesTimelineContent,
  TechPatentShowcaseContent,
} from '@/types/sections';

/* ── Zones ── */

export const sectionZoneSchema = z.enum([
  'showroom-dark',
  'workshop-light',
]) satisfies z.ZodType<SectionZone>;

/* ── Stage 2 primitive prop envelopes ── */

export const problemCardGridContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  cards: z.array(problemCardSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(6)]).optional(),
}) satisfies z.ZodType<ProblemCardGridContent>;

export const prioritySelectorContentSchema = z.object({
  legend: z.string(),
  heading: z.string().optional(),
  lede: z.string().optional(),
  options: z.array(priorityOptionSchema),
  hint: z.string().optional(),
}) satisfies z.ZodType<PrioritySelectorContent>;

export const spectrumDiagramSectionSchema = z.object({
  bands: z.array(spectrumBandSchema),
  variant: z.enum(['full', 'compact']).optional(),
  showFilm: z.boolean().optional(),
  title: z.string().optional(),
  headline: z.string().optional(),
  subhead: z.string().optional(),
  kicker: z.string().optional(),
});

export const techPillarGridContentSchema = z.object({
  pillars: z.array(techPillarSchema),
  columns: z
    .union([z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
    .optional(),
}) satisfies z.ZodType<TechPillarGridContent>;

export const philosophyFlowContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  steps: z.array(techPillarSchema),
}) satisfies z.ZodType<PhilosophyFlowContent>;

export const proofStatBarContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  stats: z.array(statItemSchema),
  variant: z.enum(['light', 'dark']).optional(),
  footnote: z.string().optional(),
}) satisfies z.ZodType<ProofStatBarContent>;

export const projectStripContentSchema = z.object({
  heading: z.string().optional(),
  subhead: z.string().optional(),
  lede: z.string().optional(),
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
  headline: z.string().optional(),
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
  image: z.union([mediaContentSchema, z.string()]).optional(),
  placeholderLabel: z.string().optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
}) satisfies z.ZodType<SeriesCard>;

export const seriesCardSetContentSchema = z.object({
  heading: z.string().optional(),
  subhead: z.string().optional(),
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
  image: z.union([z.string(), mediaContentSchema]).optional(),
  iconColor: z.string().optional(),
}) satisfies z.ZodType<CategoryItem>;

export const categoryGridContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  layout: z.enum(['grid', 'masonry']).optional(),
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
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
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

export const solutionCardSchema = z.object({
  key: solutionKeySchema,
  icon: iconNameSchema,
  title: z.string(),
  tagline: z.string().optional(),
  points: z.array(z.string()),
  image: mediaContentSchema,
  cta: ctaLinkSchema,
  span: z.union([z.literal(1), z.literal(2)]).optional(),
}) satisfies z.ZodType<SolutionCard>;

export const solutionCardGridContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  cards: z.array(solutionCardSchema),
}) satisfies z.ZodType<SolutionCardGridContent>;

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
}) satisfies z.ZodType<FaqItem>;

export const faqContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  items: z.array(faqItemSchema),
}) satisfies z.ZodType<FaqContent>;

export const mythFactPairSchema = z.object({
  myth: z.string(),
  fact: z.string(),
  explanation: z.string().optional(),
}) satisfies z.ZodType<MythFactPair>;

export const mythFactContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  pairs: z.array(mythFactPairSchema),
}) satisfies z.ZodType<MythFactContent>;

export const splitMediaContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  body: z.array(z.string()).optional(),
  bullets: z.array(z.string()).optional(),
  media: mediaContentSchema,
  mediaSide: z.enum(['left', 'right']).optional(),
  footnote: z.string().optional(),
  cta: ctaLinkSchema.optional(),
}) satisfies z.ZodType<SplitMediaContent>;

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
}) satisfies z.ZodType<ProductBrowserContent>;

export const audiencePanelCardSchema = z.object({
  overline: z.string(),
  accent: z.union([solutionKeySchema, z.literal('neutral')]).optional(),
  stat: z
    .object({
      prefix: z.string().optional(),
      value: z.string(),
      suffix: z.string().optional(),
    })
    .optional(),
  tagline: z.string(),
  image: mediaContentSchema.optional(),
  points: z.array(z.string()),
  note: z.string().optional(),
}) satisfies z.ZodType<AudiencePanelCard>;

export const audiencePanelSchema = z.object({
  heading: z.string(),
  lede: z.string().optional(),
  cards: z.array(audiencePanelCardSchema),
  columns: z.union([z.literal(2), z.literal(3)]).optional(),
  footnote: z.string().optional(),
}) satisfies z.ZodType<AudiencePanel>;

export const audiencePanelGridContentSchema = z.object({
  panels: z.array(audiencePanelSchema),
}) satisfies z.ZodType<AudiencePanelGridContent>;

export const filmCompareContentSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  /** Omit on product pages — ProductGridTemplate injects the catalogue. */
  films: z.array(productItemSchema).optional(),
  initialId: z.string().optional(),
  slots: z.number().optional(),
}) satisfies z.ZodType<FilmCompareContent>;

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

export const ourStoryStatSchema = z.object({
  icon: z.string().optional(),
  value: z.string(),
  label: z.string(),
}) satisfies z.ZodType<OurStoryStat>;

export const ourStoryPanelContentSchema = z.object({
  heading: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  videoTitle: z.string().optional(),
  videoSubtitle: z.string().optional(),
  videoHref: z.string().optional(),
  videoPoster: z.string().optional(),
  stats: z.array(ourStoryStatSchema).optional(),
}) satisfies z.ZodType<OurStoryPanelContent>;

export const customerReviewSchema = z.object({
  name: z.string(),
  username: z.string(),
  body: z.string(),
  img: z.string(),
  rating: z.number().optional(),
}) satisfies z.ZodType<CustomerReview>;

export const whyUsReviewPanelContentSchema = z.object({
  heading: z.string().optional(),
  marqueeTitle: z.string().optional(),
  pillars: z.array(techPillarSchema).optional(),
  reviews: z.array(customerReviewSchema).optional(),
}) satisfies z.ZodType<WhyUsReviewPanelContent>;

export const patentedTechHighlightSchema = z.object({
  icon: iconNameSchema.optional(),
  title: z.string(),
  description: z.string(),
}) satisfies z.ZodType<PatentedTechHighlight>;

export const patentedTechCardItemSchema = z.object({
  id: z.string(),
  patentNumber: z.string(),
  title: z.string(),
  subtitle: z.string(),
  badge: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string(),
  keyMetric: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  highlights: z.array(patentedTechHighlightSchema).optional(),
  href: z.string(),
  ctaLabel: z.string().optional(),
  theme: z.enum(['uv', 'hotmelt', 'blue', 'red']).optional(),
}) satisfies z.ZodType<PatentedTechCardItem>;

export const patentedTechFlowContentSchema = z.object({
  headlineLines: z.array(z.string()).optional(),
  heading: z.string().optional(),
  subhead: z.string().optional(),
  categoryTitle: z.string().optional(),
  categorySubtitle: z.string().optional(),
  bullets: z.array(z.string()).optional(),
  lede: z.string().optional(),
  centerpieceLabel: z.string().optional(),
  leftTech: patentedTechCardItemSchema.optional(),
  rightTech: patentedTechCardItemSchema.optional(),
  ctaHref: z.string().optional(),
  ctaLabel: z.string().optional(),
}) satisfies z.ZodType<PatentedTechFlowContent>;

export const awardItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  organization: z.string().optional(),
  year: z.union([z.string(), z.number()]).optional(),
  description: z.string().optional(),
  image: z.string(),
  badge: z.string().optional(),
  accent: z.string().optional(),
  category: z.string().optional(),
}) satisfies z.ZodType<AwardItem>;

export const awardsCarouselContentSchema = z.object({
  heading: z.string().optional(),
  subhead: z.string().optional(),
  lede: z.string().optional(),
  awards: z.array(awardItemSchema),
}) satisfies z.ZodType<AwardsCarouselContent>;

export const milestoneStepItemSchema = z.object({
  number: z.union([z.number(), z.string()]).optional(),
  year: z.union([z.number(), z.string()]).optional(),
  title: z.string(),
  tag: z.string().optional(),
  description: z.string().optional(),
  icon: iconNameSchema.optional(),
  highlight: z.boolean().optional(),
}) satisfies z.ZodType<MilestoneStepItem>;

export const milestonesTimelineContentSchema = z.object({
  heading: z.string().optional(),
  subhead: z.string().optional(),
  badge: z.string().optional(),
  lede: z.string().optional(),
  steps: z.array(milestoneStepItemSchema),
}) satisfies z.ZodType<MilestonesTimelineContent>;

export const techPatentShowcaseContentSchema = z.object({
  patent1Number: z.string().optional(),
  patent1Badge: z.string().optional(),
  patent1Title: z.string().optional(),
  patent1Tagline: z.string().optional(),
  patent1Lead: z.string().optional(),
  patent2Number: z.string().optional(),
  patent2Badge: z.string().optional(),
  patent2Title: z.string().optional(),
  patent2Tagline: z.string().optional(),
  patent2Lead: z.string().optional(),
}) satisfies z.ZodType<TechPatentShowcaseContent>;

export const sectionSchema = z.discriminatedUnion('type', [
  sectionVariant('cinematic-hero', cinematicHeroContentSchema),
  sectionVariant('problem-card-grid', problemCardGridContentSchema),
  sectionVariant('priority-selector', prioritySelectorContentSchema),
  sectionVariant('protection-level-selector', prioritySelectorContentSchema),
  sectionVariant('spectrum-diagram', spectrumDiagramSectionSchema),
  sectionVariant('tech-pillar-grid', techPillarGridContentSchema),
  sectionVariant('philosophy-flow', philosophyFlowContentSchema),
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
  sectionVariant('solution-card-grid', solutionCardGridContentSchema),
  sectionVariant('faq', faqContentSchema),
  sectionVariant('myth-fact', mythFactContentSchema),
  sectionVariant('split-media', splitMediaContentSchema),
  sectionVariant('product-browser', productBrowserContentSchema),
  sectionVariant('film-compare', filmCompareContentSchema),
  sectionVariant('audience-panel-grid', audiencePanelGridContentSchema),
  sectionVariant('our-story-panel', ourStoryPanelContentSchema),
  sectionVariant('why-us-review-panel', whyUsReviewPanelContentSchema),
  sectionVariant('patented-tech-flow', patentedTechFlowContentSchema),
  sectionVariant('awards-carousel', awardsCarouselContentSchema),
  sectionVariant('milestones-timeline', milestonesTimelineContentSchema),
  sectionVariant('tech-patent-showcase', techPatentShowcaseContentSchema),
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
