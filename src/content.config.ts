/**
 * Astro Content Collections.
 *
 * Stage 3 page collections (glob loaders over src/content/**): each entry
 * is a full page content object with `sections[]`, validated by the Zod
 * schemas in schemas/sections.ts — a malformed content file FAILS THE
 * BUILD. One fixture per collection exists; Stage 4 authors the rest.
 *
 * Stage 2 item collections (inline loaders over the specimen data) back
 * the /components demo route; Stage 4 may swap them for real files.
 */

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  certItemSchema,
  guideChapterSchema,
  productItemSchema,
  projectItemSchema,
} from '@/schemas/content';
import {
  editorialPageSchema,
  guidePageSchema,
  knowledgePageSchema,
  productPageSchema,
  solutionPageSchema,
} from '@/schemas/sections';
import {
  CERTS,
  GUIDE_CHAPTERS,
  PRODUCTS,
  PROJECTS,
} from '@/data/demo-data';

/* ── Stage 3 page collections ── */

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/solutions' }),
  schema: solutionPageSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/guides' }),
  schema: guidePageSchema,
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/knowledge' }),
  schema: knowledgePageSchema,
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: productPageSchema,
});

const editorial = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/editorial' }),
  schema: editorialPageSchema,
});

/* ── Stage 2 item collections (specimen data, /components route) ── */

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const productItems = defineCollection({
  loader: () => PRODUCTS.map((product) => ({ ...product })),
  schema: productItemSchema,
});

const projects = defineCollection({
  loader: () => PROJECTS.map((project) => ({ id: slug(project.name), ...project })),
  schema: projectItemSchema,
});

const guideChapters = defineCollection({
  loader: () =>
    GUIDE_CHAPTERS.map((chapter) => ({ id: `chapter-${chapter.number}`, ...chapter })),
  schema: guideChapterSchema,
});

const certifications = defineCollection({
  loader: () => CERTS.map((cert) => ({ ...cert })),
  schema: certItemSchema,
});

export const collections = {
  solutions,
  guides,
  knowledge,
  products,
  editorial,
  'product-items': productItems,
  projects,
  'guide-chapters': guideChapters,
  certifications,
};
