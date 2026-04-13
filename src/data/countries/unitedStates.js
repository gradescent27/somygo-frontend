// United States, country page data.

import {
  Briefcase,
  Building,
  GraduationCap,
  Heart,
  Plane,
  Flag,
  FileText,
  CheckCircle,
  Globe,
  Shield,
  Calendar,
} from 'lucide-react';

const unitedStatesData = {
  iso: 'us',
  eyebrow: 'United States',
  title: 'Practical guidance for the United States.',
  intro:
    'We guide individuals and families through eligibility, documents, filings, and interviews for the US. We support work and business categories, study and graduate options, family routes, visitor travel, permanent residence, and naturalization.',

  audience: [
    {
      icon: Briefcase,
      title: 'Professionals',
      text: 'Professionals with a US job offer or a transfer within the same company.',
    },
    {
      icon: Building,
      title: 'Founders & Investors',
      text: 'Founders and investors who will run an active business in the US.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Graduates',
      text: 'Students and recent graduates planning OPT or STEM OPT.',
    },
    {
      icon: Heart,
      title: 'Family Members',
      text: 'Spouses, partners, children, and certain parents of US citizens or residents.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-term business visitors and tourists.',
    },
    {
      icon: Flag,
      title: 'Future Citizens',
      text: 'Residents preparing to adjust status or apply for citizenship.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'L-1 intracompany transfer, O-1 extraordinary ability, H-1B cap-exempt options, TN for Canadians and Mexicans, E-3 for Australians, E-2 treaty investor and E-1 treaty trader.',
    },
    {
      title: 'Students & Graduates',
      text: 'F-1, CPT and OPT planning, STEM OPT extension, and limited J-1 categories for exchange visitors.',
    },
    {
      title: 'Family',
      text: 'I-130 spouse and immediate relatives, K-1 fiancé, family preference categories, dependents of workers and students.',
    },
    {
      title: 'Visitors',
      text: 'B-1 business and B-2 tourism, plus Visa Waiver Program with ESTA for eligible nationalities.',
    },
    {
      title: 'Permanent Residence',
      text: 'Employment-based EB-1, EB-2 including National Interest Waiver, EB-3, and family-based categories with Adjustment of Status or consular processing.',
    },
    {
      title: 'Citizenship',
      text: 'N-400 naturalization and passport steps after approval.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct category, fees, timelines, and key risks before any work begins.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to match rule text and current USCIS or DOS policy guidance.',
    },
    {
      icon: Globe,
      title: 'Filing & processing',
      text: 'Filing to USCIS or consular processing with biometrics and interview preparation.',
    },
    {
      icon: Shield,
      title: 'Status rules',
      text: 'Clear rules on maintaining status and work authorization while pending.',
    },
    {
      icon: Calendar,
      title: 'Post-approval steps',
      text: 'Social Security, I-9 work verification, and onward travel planning.',
    },
  ],

  notHandled: 'We do not handle asylum or removal defense.',
};

export default unitedStatesData;
