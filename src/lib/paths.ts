/**
 * Resolves a path (image, video, page link) by prefixing it with Astro's BASE_URL.
 * This is crucial when deploying the site to a subpath on GitHub Pages (e.g. /v2/).
 */
export function resolveUrl(path: string | undefined): string {
  if (!path) return '';

  // Return unchanged if it is an external link, anchor link, tel, mailto, etc.
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(path)) {
    return path;
  }

  // Get base URL from Astro/Vite env (e.g. "/v2/")
  const base = import.meta.env.BASE_URL || '/';

  // If base is set and path already starts with base (with or without trailing slash), return as-is
  const baseNoSlash = base.endsWith('/') ? base.slice(0, -1) : base;
  if (base !== '/' && (path.startsWith(base) || (baseNoSlash && path.startsWith(baseNoSlash + '/')) || path === baseNoSlash)) {
    return path;
  }

  // Ensure path starts with a single slash
  const cleanPath = path.startsWith('/') ? path : '/' + path;

  // Clean the base URL (avoid duplicate slashes)
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  return `${cleanBase}${cleanPath}`;
}

/**
 * Recursively traverses any object/array and resolves any root-relative paths
 * starting with "/" (excluding external links) by prepending Astro's BASE_URL.
 */
export function resolvePathsInObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    // If it starts with "/" but not "//" (external)
    if (obj.startsWith('/') && !obj.startsWith('//')) {
      return resolveUrl(obj) as unknown as T;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => resolvePathsInObject(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = resolvePathsInObject(obj[key]);
      }
    }
    return newObj as T;
  }

  return obj;
}
