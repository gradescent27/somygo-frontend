// legal.js, single source of truth for somygo's legal entity details.
//
// Used by the legal pages (Privacy, Terms, Cookie), the Footer, and any
// other component that needs to reference the registered company.
//
// When the user updates anything (legal entity name, company number,
// registered office, jurisdiction), change it here once.

export const LEGAL_ENTITY = {
  // Display name for the registered company
  name: 'S O Immigration Limited',
  // Trading name (the consumer-facing brand)
  tradingAs: 'Somygo',
  // Companies House number
  companyNumber: '08239985',
  // Registered office (legal correspondence address)
  registeredAddress: '42 Fords Park Road, London, England, E16 1NL',
  // Country of incorporation
  jurisdiction: 'England & Wales',
  // ISO country code for the jurisdiction (for any flag rendering)
  jurisdictionIso: 'gb',
};

// UK / EMEA operating office (currently same as registered office,
// see CLAUDE.md "Office locations" for the operating-vs-registered
// office decision).
export const UK_OFFICE = {
  region: 'United Kingdom · EMEA',
  cityShort: 'UK Office',
  address: '42 Fords Park Road, London, England, E16 1NL',
  phone: '+44 (0)74 5742 4280',
  phoneHref: 'tel:+4407457424280',
  email: 'info@somygo.com',
  hours: 'Mon–Fri, 09:00–18:00 GMT/BST',
};

// US / APAC operating office.
export const US_OFFICE = {
  region: 'United States · APAC',
  cityShort: 'US Office',
  address: '1 City Center, Portland, ME 04101',
  phone: '+1 (321) 220-7399',
  phoneHref: 'tel:+13212207399',
  email: 'info@somygo.com',
  hours: 'Mon–Fri, 09:00–18:00 ET (with evening overlap for APAC)',
};

// Role-based emails, all @somygo.com
export const ROLE_EMAILS = {
  general: 'info@somygo.com',
  privacy: 'privacy@somygo.com',
  legal: 'legal@somygo.com',
  billing: 'billing@somygo.com',
  complaints: 'complaints@somygo.com',
  support: 'support@somygo.com',
};
