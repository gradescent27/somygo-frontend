// Canada, country page data.

import {
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  MapPin,
  Flag,
  FileText,
  CheckCircle,
  Globe,
  Shield,
  Calendar,
} from 'lucide-react';

const canadaData = {
  iso: 'ca',
  eyebrow: 'Canada',
  title: 'Practical guidance for Canada.',
  intro:
    'We guide individuals and families through eligibility, documents, filings, and interviews for Canada. We support work permits under LMIA and the International Mobility Program, study and post-graduation options, family sponsorship, visitor travel, permanent residence through Express Entry and provincial programs, and citizenship.',

  audience: [
    {
      icon: Briefcase,
      title: 'Professionals',
      text: 'Professionals with a Canadian job offer or an intra-company transfer.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Graduates',
      text: 'Students and graduates planning a Post-Graduation Work Permit.',
    },
    {
      icon: Heart,
      title: 'Family Members',
      text: 'Spouses, partners, children, and parents or grandparents using approved routes.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-term business visitors and tourists.',
    },
    {
      icon: MapPin,
      title: 'PR Candidates',
      text: 'Candidates ready to qualify for permanent residence and later citizenship.',
    },
    {
      icon: Flag,
      title: 'Future Citizens',
      text: 'Permanent residents preparing for naturalization once presence and tax rules are met.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'LMIA-supported work permits, International Mobility Program (Intra-Company Transferees, CUSMA Professionals, Francophone mobility, and other LMIA-exempt categories).',
    },
    {
      title: 'Students & Graduates',
      text: 'Study Permits, extensions, PGWP planning, and study-to-work pathways.',
    },
    {
      title: 'Family',
      text: 'Spousal and common-law sponsorship, dependent children, Parents and Grandparents Program, Super Visa, and dependents of workers or students.',
    },
    {
      title: 'Visitors',
      text: 'Temporary Resident Visa and eTA for eligible nationals, business visitor plans, and family visits.',
    },
    {
      title: 'Permanent Residence',
      text: 'Express Entry streams (FSW, CEC, FST), Provincial Nominee Programs, and family-based permanent residence.',
    },
    {
      title: 'Citizenship',
      text: 'Naturalization for permanent residents who meet presence and tax filing rules.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct route, fees, timelines, and key risks before any work begins.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to match IRCC policy, current category rules, and your supporting evidence.',
    },
    {
      icon: Globe,
      title: 'Filing & processing',
      text: 'Portal filings, biometrics and medicals, port-of-entry or consulate issuance planning.',
    },
    {
      icon: Shield,
      title: 'Status protection',
      text: 'Clear rules on maintaining status, bridging permits, and work authorization while pending.',
    },
    {
      icon: Calendar,
      title: 'Onward planning',
      text: 'Travel timing, registrations, and PR or citizenship pathway after first approval.',
    },
  ],

  notHandled: 'We do not handle refugee claims or removal defense.',
};

export default canadaData;
