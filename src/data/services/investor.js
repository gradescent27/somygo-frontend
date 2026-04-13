// Investor & Entrepreneur Visas, service page data.

import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Building2,
  Shield,
  Target,
  PieChart,
  Send,
  Plane,
} from 'lucide-react';

const investorData = {
  eyebrow: 'Investor & Entrepreneur',
  title: 'Evidence the source of funds. Prove the plan. Execute with confidence.',
  intro:
    'We support investors and founders who want to relocate by investing in, starting, or acquiring a business. Our work focuses on a defensible source-of-funds trail, a credible business plan, and filings that match the exact legal criteria of your destination. Regular destinations include the United Kingdom, United States, Canada, the European Union, and the UAE.',

  audience: [
    {
      icon: DollarSign,
      text: 'High net worth and upper-middle-income individuals planning to invest abroad',
    },
    {
      icon: TrendingUp,
      text: 'Founders, co-founders, and key early employees relocating to run or scale a startup',
    },
    {
      icon: Briefcase,
      text: 'Family office principals, angel and VC-backed founders, and search-fund operators',
    },
    {
      icon: Building2,
      text: 'Business buyers pursuing acquisition of an operating company',
    },
  ],

  included: [
    {
      icon: Target,
      title: 'Strategy & route selection',
      items: [
        'Route comparison with investment amounts, ownership thresholds, and renewal pathways',
        'Risk map covering nationality, prior immigration history, and source-of-funds complexity',
        'Realistic timeline accounting for due diligence and corporate setup',
      ],
    },
    {
      icon: PieChart,
      title: 'Source of funds & wealth',
      items: [
        'Evidence tree for each funding path with audit-style checklist',
        'Translations and legalisation guidance for foreign documents',
        'Coordination with accountants and bankers where supporting letters are required',
      ],
    },
    {
      icon: Building2,
      title: 'Business plan & corporate setup',
      items: [
        'Immigration-standard business plan with market data, staffing, and projections',
        'Company formation and registration coordination',
        'Bank account onboarding guidance where local rules allow',
      ],
    },
    {
      icon: Send,
      title: 'Submission & onward',
      items: [
        'Form completion with dual quality checks',
        'Appointment scheduling and interview coaching',
        'Status tracking and proactive updates',
        'Renewal and permanent residence planning where the route allows',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Founder and entrepreneur routes requiring endorsement or innovation credentials, plus routes for establishing or expanding a presence.',
    },
    {
      country: 'United States',
      text: 'Treaty Investor for eligible nationalities, immigrant investor for qualifying projects, and founder-led categories where the profile fits.',
    },
    {
      country: 'Canada',
      text: 'Federal and provincial entrepreneur and startup programs, plus work-permit pathways that lead to permanent residence where the rules allow.',
    },
    {
      country: 'European Union (EU)',
      text: 'National entrepreneur and self-employment routes across member states, EU Blue Card alternatives for founder-employees, and limited residency-by-investment programs in specific countries.',
    },
    {
      country: 'UAE',
      text: 'Investor and entrepreneur residency, free-zone company setups, and long-term categories for qualifying investors.',
    },
  ],

  process: [
    {
      title: 'Intake and viability screen',
      text: 'Profile, nationality, funding path, and target destination, we confirm whether the route is realistic before any work begins.',
    },
    {
      title: 'Strategy call and written plan',
      text: 'Route confirmed, investment amount and ownership structure defined, and realistic timeline set.',
    },
    {
      title: 'Business plan and evidence build',
      text: 'We produce the immigration-standard plan, build market references, and start the source-of-funds trail.',
    },
    {
      title: 'Company and banking setup',
      text: 'We coordinate formation, registrations, and bank onboarding where allowed by local rules.',
    },
    {
      title: 'Submission and decision',
      text: 'We complete the application, schedule appointments, and prepare you for any interview. On approval, we guide registrations and the operational ramp-up.',
    },
  ],

  eligibility: [
    'Minimum investment amount and permitted investment types for the chosen route',
    'Ownership and control thresholds for the applicant',
    'Active management or founder involvement (not passive investment only)',
    'Job creation or economic-benefit requirements where applicable',
    'Lawful and traceable source of funds and source of wealth',
    'Genuine business activity with premises, customers, or contracts as appropriate',
  ],
};

export default investorData;
