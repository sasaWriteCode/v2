/**
 * Site-wide constants. The production domain is PROVISIONAL — v1 only
 * evidences ewarranty.irispro.com; the marketing domain needs client
 * confirmation (noted in README). Used for canonical URLs, JSON-LD and the
 * sitemap; changing it here changes it everywhere.
 */

export const SITE = {
  name: 'IrisPro',
  url: 'https://www.irispro.com',
  titleTemplate: (title: string) => `${title} — IrisPro`,
  defaultDescription:
    'IrisPro window-film protection technology — advanced protection engineered for the ASEAN climate.',
} as const;
