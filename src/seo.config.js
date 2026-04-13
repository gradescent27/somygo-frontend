/**
 * SEO metadata config, single source of truth for per-page <title>,
 * <meta description>, and canonical URLs.
 *
 * Add a new public route here when you add it in App.js, and also add
 * the path to scripts/routes.js so the prerender + sitemap pick it up.
 *
 * Domain: change SITE.domain in one place to swap the production URL.
 */

export const SITE = {
  name: 'Somygo',
  domain: 'https://somygo.com',
  defaultDescription:
    'Somygo is an immigration consulting practice for individuals and families. Clear pathways, compliant applications, and proactive case management across the UK, US, Canada, EU, Australia, and UAE.',
};

/**
 * Each entry:
 *   title: string                  , full <title>; brand suffix included
 *   description: string            , meta description; ≤160 chars
 *   canonical?: string             , override canonical URL (path)
 *                                      Use when this route is a duplicate
 *                                      of another route's content.
 */
export const PAGES = {
  '/': {
    title: 'Somygo | Immigration Consulting for Individuals & Families',
    description:
      'Practical immigration consulting for work, study, family, residency, and investor visas. UK and US offices serving clients worldwide.',
  },
  '/about': {
    title: 'About Somygo | Global Immigration Consultants',
    description:
      'Meet Somygo: a compliance-first immigration consulting team with offices in the UK and US, helping individuals and families relocate.',
  },
  '/how-it-works': {
    title: 'How It Works | Somygo Immigration Process',
    description:
      'See how Somygo handles your case end to end: eligibility review, document checklists, submissions, interview prep, and post-decision support.',
  },
  '/why-us': {
    title: 'Why Choose Somygo | Honest, Compliant Immigration Help',
    description:
      'Transparent fees, dedicated case owners, evidence-mapped applications, and follow-the-sun coverage from the UK and US.',
  },
  '/contact': {
    title: 'Contact Somygo | Talk to an Immigration Consultant',
    description:
      'Send a short summary of your case and we reply within 24–72 hours. UK and US offices, urgent cases triaged the same day.',
  },

  // ─── Services ──────────────────────────────────────────────────────────
  '/services/skilled-worker-employment-visas': {
    title: 'Skilled Worker & Employment Visas | Somygo',
    description:
      'End-to-end skilled worker visa consulting: role mapping, eligibility checks, employer sponsorship, and document preparation across major destinations.',
  },
  '/services/skilled-worker-employment': {
    // Duplicate of the above route, canonical points to the long URL.
    title: 'Skilled Worker & Employment Visas | Somygo',
    description:
      'End-to-end skilled worker visa consulting: role mapping, eligibility checks, employer sponsorship, and document preparation across major destinations.',
    canonical: '/services/skilled-worker-employment-visas',
  },
  '/services/study-permits-graduate-pathways': {
    title: 'Study Permits & Graduate Pathways | Somygo',
    description:
      'Student visa and post-study work guidance: admissions coordination, GTE and financial evidence, and graduate route planning.',
  },
  '/services/family-and-dependent-visas': {
    title: 'Family & Dependent Visas | Somygo',
    description:
      'Spouse, partner, child, and dependent visa consulting: relationship evidence, financial requirements, and reunification routes.',
  },
  '/services/permanent-residence-and-citizenship': {
    title: 'Permanent Residence & Citizenship | Somygo',
    description:
      'Long-term immigration planning: PR streams, points-based programs, naturalisation, and citizenship-by-investment routes.',
  },
  '/services/investor-and-entrepreneur-routes': {
    title: 'Investor & Entrepreneur Visas | Somygo',
    description:
      'Investor and start-up visa support: business plans, source-of-funds documentation, and filings for major investor routes.',
  },
  '/services/visitor-and-short-stay': {
    title: 'Visitor & Short-Stay Visas | Somygo',
    description:
      'Visitor visa guidance for meetings, conferences, training, and tourism, purpose-fit applications with full document support.',
  },
  '/services/appeals-and-complex-cases': {
    title: 'Appeals & Complex Immigration Cases | Somygo',
    description:
      'Refusals, overstays, and complex matters: strategy, evidence review, and coordination with licensed local counsel where representation is required.',
  },

  // ─── Countries ─────────────────────────────────────────────────────────
  '/countries/united-states': {
    title: 'US Immigration & Visa Services | Somygo',
    description:
      'United States immigration consulting: employment-based categories (H-1B alternatives, L-1, O-1), family routes, adjustment of status, and consular processing.',
  },
  '/countries/canada': {
    title: 'Canada Immigration & Visa Services | Somygo',
    description:
      'Canada immigration consulting: Express Entry strategies, work permits (LMIA/exempt), study permits, and Provincial Nominee Programs.',
  },
  '/countries/united-kingdom': {
    title: 'UK Immigration & Visa Services | Somygo',
    description:
      'UK immigration consulting: Skilled Worker route, sponsor licence guidance, Graduate route, family visas, and settlement applications.',
  },
  '/countries/european-union': {
    title: 'European Union (EU) Immigration Services | Somygo',
    description:
      'European Union immigration consulting: EU Blue Card, ICT Card, national work permits across member states, Schengen travel, and long-term EU residence.',
  },
  '/countries/australia': {
    title: 'Australia Immigration & Visa Services | Somygo',
    description:
      'Australia immigration consulting: skilled visas, TSS/ENS sponsorship, GTE-compliant student pathways, and partner visas.',
  },
  '/countries/uae': {
    title: 'UAE Immigration & Visa Services | Somygo',
    description:
      'UAE immigration consulting: employer sponsorship, free zone processing, family sponsorship, and Golden Visa routes.',
  },

  // ─── Legal ─────────────────────────────────────────────────────────────
  '/terms-of-service': {
    title: 'Terms of Service | Somygo',
    description:
      'Terms of service governing use of the Somygo website and immigration consulting engagements.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Somygo',
    description:
      'How Somygo collects, uses, stores, and protects personal data when you use our site or engage our immigration consulting services.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Somygo',
    description:
      'How Somygo uses cookies and similar technologies on our websites, client portals, and emails.',
  },
};

/**
 * Resolve metadata for a given pathname. Falls back to homepage metadata
 * if the route is unknown (e.g., 404 page during prerender).
 */
export function getPageMeta(pathname) {
  return PAGES[pathname] || PAGES['/'];
}
