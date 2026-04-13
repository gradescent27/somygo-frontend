/**
 * Sitemap generator, runs as a `prebuild` step.
 *
 * Reads the route list from scripts/routes.js and writes
 * public/sitemap.xml. CRA's build then copies it to build/sitemap.xml
 * along with the rest of public/.
 *
 * Routes that have a different canonical URL (declared in
 * src/seo.config.js) are intentionally NOT included as separate sitemap
 * entries, only the canonical URL belongs in a sitemap.
 *
 * Update: change the SITE_DOMAIN constant if your production domain
 * changes. (It also lives in src/seo.config.js, keep both in sync.)
 */

const fs = require('fs');
const path = require('path');
const { PUBLIC_ROUTES } = require('./routes');

const SITE_DOMAIN = 'https://somygo.com';
const OUTPUT = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

// Routes that are duplicates pointing to a canonical elsewhere, don't
// list them in the sitemap. Mirror these with the `canonical` field in
// src/seo.config.js.
const NON_CANONICAL_ROUTES = new Set([
  '/services/skilled-worker-employment', // canonical: -visas
]);

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);

  const urls = PUBLIC_ROUTES.filter((r) => !NON_CANONICAL_ROUTES.has(r))
    .map((route) => {
      const loc = `${SITE_DOMAIN}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

fs.writeFileSync(OUTPUT, buildSitemap(), 'utf-8');
console.log(
  `[sitemap] Wrote ${PUBLIC_ROUTES.length - NON_CANONICAL_ROUTES.size} URLs to public/sitemap.xml`
);
