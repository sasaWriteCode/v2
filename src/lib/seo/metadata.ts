/**
 * Per-route metadata, generated from the content object. One function, one
 * shape — BaseLayout consumes it.
 */

import { SITE } from '@/config/site';
import type { PageSeo } from '@/types/sections';

export interface RouteMeta {
  /** Full <title> (brand-suffixed). */
  title: string;
  description: string;
  /** Absolute canonical URL. */
  canonical: string;
}

export function buildMeta(seo: PageSeo, pathname: string): RouteMeta {
  const path = pathname.endsWith('/') || pathname === '' ? pathname : `${pathname}/`;
  return {
    title: SITE.titleTemplate(seo.title),
    description: seo.description || SITE.defaultDescription,
    canonical: new URL(path, SITE.url).href,
  };
}
