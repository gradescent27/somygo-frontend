/**
 * Public routes manifest.
 *
 * Single source of truth for which routes get prerendered for SEO and
 * which get included in sitemap.xml. Admin/internal routes (invoice
 * dashboards, hidden form URL) are intentionally excluded.
 *
 * Used by: scripts/prerender.js, scripts/generate-sitemap.js
 */

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/how-it-works',
  '/why-us',
  '/contact',
  // Services
  '/services/skilled-worker-employment',
  '/services/skilled-worker-employment-visas',
  '/services/study-permits-graduate-pathways',
  '/services/family-and-dependent-visas',
  '/services/permanent-residence-and-citizenship',
  '/services/investor-and-entrepreneur-routes',
  '/services/visitor-and-short-stay',
  '/services/appeals-and-complex-cases',
  // Countries
  '/countries/united-states',
  '/countries/canada',
  '/countries/united-kingdom',
  '/countries/european-union',
  '/countries/australia',
  '/countries/uae',
  // Legal
  '/terms-of-service',
  '/privacy-policy',
  '/cookie-policy',
];

module.exports = { PUBLIC_ROUTES };
