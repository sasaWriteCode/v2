/**
 * Derived building-film views — "For Homes" and "For Commercial Buildings".
 *
 * Client ruling (2026-08-12): product data lives in ONE place
 * (content/products/building.json, each item carrying a `facets.audience`
 * tag) and is *used* by both audience pages. These views are derived at
 * build time — retagging an item in building.json updates every page;
 * nothing is authored twice.
 *
 * /products/building            → full catalogue (source object, untouched)
 * /products/building-homes      → audience: homes
 * /products/building-commercial → audience: commercial
 */

import type { ProductPageContent, Section } from '@/types/sections';

interface ViewSpec {
  /** Route segment: /products/<id> */
  id: string;
  audience: 'homes' | 'commercial';
  title: string;
  seo: { title: string; description: string };
  crumbLabel: string;
  headlineLines: string[];
  subhead: string;
  /** Art-direction brief for the pending hero photo (placeholder system). */
  heroImageBrief: string;
}

export const BUILDING_VIEWS: ViewSpec[] = [
  {
    id: 'building-homes',
    audience: 'homes',
    title: 'Building Window Films — For Homes',
    seo: {
      title: 'Window Films for Homes',
      description:
        'Stay cooler and live better. IrisPro residential window films block heat, UV and HEV blue light — protecting your family, lowering electricity bills and keeping your home comfortable.',
    },
    crumbLabel: 'For Homes',
    headlineLines: ['Stay Cooler.', 'Live Better.'],
    subhead:
      'IrisPro window films for homes reduce heat, block 99.9% of UV and protect your family, furniture and interiors — while lowering your electricity bills.',
    heroImageBrief:
      'Bright, airy landed home living room with large glass doors, family relaxing comfortably while strong sunlight stays outside.',
  },
  {
    id: 'building-commercial',
    audience: 'commercial',
    title: 'Building Window Films — For Commercial Buildings',
    seo: {
      title: 'Window Films for Commercial Buildings',
      description:
        'Improve performance and enhance value. IrisPro commercial window films reduce cooling cost, improve occupant comfort, protect assets and contribute towards ESG goals and GBI points.',
    },
    crumbLabel: 'For Commercial Buildings',
    headlineLines: ['Improve Performance.', 'Enhance Value.'],
    subhead:
      'IrisPro window films for commercial buildings cut HVAC load and operating cost, improve employee comfort and productivity, and contribute towards ESG goals and green building certification.',
    heroImageBrief:
      'Modern glass office tower exterior at golden hour, or a bright productive open-plan office interior behind large curtain-wall glazing.',
  },
];

/** Filter + rebrand the source building catalogue into an audience view. */
export function deriveBuildingView(
  source: ProductPageContent,
  view: ViewSpec,
): ProductPageContent {
  const sections: Section[] = source.sections.map((section) => {
    if (section.type === 'product-browser') {
      return {
        ...section,
        data: {
          ...section.data,
          items: section.data.items.filter((item) =>
            (item.facets['audience'] ?? []).includes(view.audience),
          ),
        },
      };
    }
    if (section.type === 'cinematic-hero' && section.id === 'hero') {
      return {
        ...section,
        data: {
          ...section.data,
          headlineLines: view.headlineLines,
          subhead: view.subhead,
          // Audience pages replace the two-sided homes/commercial banner
          // with a single focused hero; photo pending (placeholder system).
          comparison: undefined,
          media: {
            src: `placeholder:${view.id}-hero`,
            alt: view.heroImageBrief,
            width: 1600,
            height: 900,
          },
        },
      };
    }
    return section;
  });

  return {
    ...source,
    title: view.title,
    seo: view.seo,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Building Window Films', href: '/products/building' },
      { label: view.crumbLabel },
    ],
    sections,
  };
}
