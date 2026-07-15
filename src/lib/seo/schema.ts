/**
 * schema.org JSON-LD builders. Pure functions returning plain objects;
 * BaseLayout serializes them into <script type="application/ld+json">.
 *
 * Coverage per the Stage 3 brief:
 *  - Organization  — global (every page)
 *  - BreadcrumbList — every page with breadcrumbs
 *  - Product (ItemList) — product-grid pages
 *  - FAQPage — guide pages (from the rail's popular questions)
 */

import { SITE } from '@/config/site';
import type { ProductItem } from '@/types/content';
import type { Crumb, RailQuestion } from '@/types/sections';

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  };
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, SITE.url).href } : {}),
    })),
  };
}

export function faqSchema(questions: RailQuestion[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

export function productListSchema(products: ProductItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        brand: { '@type': 'Brand', name: SITE.name },
        description: product.technology,
        ...(product.detailsHref
          ? { url: new URL(product.detailsHref, SITE.url).href }
          : {}),
      },
    })),
  };
}
