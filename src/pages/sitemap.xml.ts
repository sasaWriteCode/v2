/**
 * sitemap.xml — built from the same collections that drive routing, so it
 * always matches what actually prerendered. Specimen routes
 * (/design-system, /components) are intentionally excluded.
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/config/site';

export const GET: APIRoute = async () => {
  const [solutions, guides, knowledge, products] = await Promise.all([
    getCollection('solutions'),
    getCollection('guides'),
    getCollection('knowledge'),
    getCollection('products'),
  ]);

  const paths = [
    '/',
    '/solutions/',
    '/technologies/',
    '/projects/',
    '/about/',
    '/knowledge/',
    ...solutions.map((entry) => `/solutions/${entry.id}/`),
    ...products.map((entry) => `/products/${entry.id}/`),
    ...guides.map((entry) => `/knowledge/${entry.id}/`),
    ...knowledge.filter((entry) => entry.id !== 'hub').map((entry) => `/knowledge/${entry.id}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${new URL(path, SITE.url).href}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
