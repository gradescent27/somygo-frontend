// United Kingdom, country page data.

import {
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  Building,
  Flag,
  FileText,
  CheckCircle,
  Globe,
  Shield,
  Calendar,
} from 'lucide-react';

const unitedKingdomData = {
  iso: 'gb',
  eyebrow: 'United Kingdom',
  title: 'Practical guidance for the United Kingdom.',
  intro:
    'We guide individuals and families through eligibility, documents, filings, and decisions for the UK. We support work and sponsorship routes, study and Graduate route options, family visas, visitor travel, settlement, and naturalisation.',

  audience: [
    {
      icon: Briefcase,
      title: 'Skilled Workers',
      text: 'Professionals with a UK job offer from a sponsor licence holder.',
    },
    {
      icon: Building,
      title: 'Employers',
      text: 'UK employers seeking sponsor licence guidance to hire from overseas.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Graduates',
      text: 'International students and graduates planning the Graduate route.',
    },
    {
      icon: Heart,
      title: 'Family Members',
      text: 'Partners, children, and dependents joining a citizen, settled person, or visa holder.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-term business visitors, tourists, and family visit applicants.',
    },
    {
      icon: Flag,
      title: 'Long-term Residents',
      text: 'Residents preparing for ILR (settlement) and naturalisation as British citizens.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'Skilled Worker visa, Global Business Mobility routes (Senior or Specialist Worker, Graduate Trainee, etc.), Health and Care Worker, and sponsor licence support for employers.',
    },
    {
      title: 'Students & Graduates',
      text: 'Student route with funds and Academic Progression compliance, Child Student, Short-term Study, and the Graduate route after course completion.',
    },
    {
      title: 'Family',
      text: 'Partner and spouse, fiancé(e), child and dependent child, Adult Dependent Relative, and certain family reunion routes.',
    },
    {
      title: 'Visitors',
      text: 'Standard Visitor for tourism, family, business meetings, conferences, and limited training or study.',
    },
    {
      title: 'Permanent Residence',
      text: 'Indefinite Leave to Remain (ILR / settlement) based on work, family, or long residence, with Life in the UK and English language requirements.',
    },
    {
      title: 'Citizenship',
      text: 'Naturalisation as a British citizen and passport application after ILR and qualifying residence.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct route, Home Office fees, IHS, timelines, and key risks.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to match current Immigration Rules, guidance, and evidence requirements.',
    },
    {
      icon: Globe,
      title: 'Filing & biometrics',
      text: 'Online filings via UKVCAS or TLScontact and biometric appointment booking.',
    },
    {
      icon: Shield,
      title: 'Status protection',
      text: "Section 3C protection awareness and rules on travel and work while a decision is pending.",
    },
    {
      icon: Calendar,
      title: 'Onward planning',
      text: 'Renewal calendar, ILR planning, and citizenship pathway from your first visa onwards.',
    },
  ],

  notHandled: 'We do not handle asylum or removal proceedings.',
};

export default unitedKingdomData;
