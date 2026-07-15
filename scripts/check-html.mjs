/**
 * Post-build HTML checks — fails the build on violation:
 *  1. Exactly one <h1> per generated page (Stage 3 acceptance criterion).
 *  2. A non-empty <title> per page.
 * Run automatically via `npm run build`.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;

/* Internal specimen routes only: /components renders the CinematicHero
   primitive (which owns an h1 by design) beside the page h1. Site routes
   are never exempt. */
const H1_EXEMPT = new Set(['/components/']);

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith('.html')) yield path;
  }
}

let failures = 0;
let checked = 0;

for (const file of htmlFiles(DIST)) {
  checked += 1;
  const html = readFileSync(file, 'utf8');
  const route = '/' + relative(DIST, file).replace(/index\.html$/, '');

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1 && !H1_EXEMPT.has(route)) {
    console.error(`✖ ${route} — expected exactly 1 <h1>, found ${h1Count}`);
    failures += 1;
  }

  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim();
  if (!title) {
    console.error(`✖ ${route} — missing or empty <title>`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`\ncheck-html: ${failures} violation(s) across ${checked} pages — build FAILED`);
  process.exit(1);
}
console.log(`check-html: ${checked} pages OK (exactly one h1, non-empty title)`);
