/// <reference types="astro/client" />

/**
 * Wildcard fallback so plain `tsc` can type-check .ts files that import
 * .astro components (e.g. the section registry). The Astro language
 * server resolves real component types ahead of this ambient declaration.
 */
declare module '*.astro' {
  const component: (props: Record<string, unknown>) => unknown;
  export default component;
}
