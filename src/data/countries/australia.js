// Australia, country page data.

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

const australiaData = {
  iso: 'au',
  eyebrow: 'Australia',
  title: 'Practical guidance for Australia.',
  intro:
    'We guide individuals and families through eligibility, documents, and decisions for Australia. We support skilled and employer-sponsored visas, GTE-compliant student pathways, partner and family visas, business visitor categories, permanent residence, and citizenship.',

  audience: [
    {
      icon: Briefcase,
      title: 'Skilled Workers',
      text: 'Professionals with an Australian sponsor or eligible occupation on the skilled lists.',
    },
    {
      icon: Building,
      title: 'Employers',
      text: 'Australian employers seeking sponsorship and nomination guidance for overseas hires.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Graduates',
      text: 'Students with a CRICOS-registered course and graduates planning post-study work.',
    },
    {
      icon: Heart,
      title: 'Partners & Family',
      text: 'Partners, spouses, and dependents joining an Australian citizen, PR holder, or visa holder.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-term business visitors and tourists travelling under visitor categories.',
    },
    {
      icon: Flag,
      title: 'PR & Citizenship',
      text: 'Visa holders ready to qualify for Australian PR and later citizenship.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'Temporary Skill Shortage (subclass 482), Skilled Employer Sponsored Regional, Employer Nomination Scheme (subclass 186), and skilled independent or nominated routes.',
    },
    {
      title: 'Students & Graduates',
      text: 'Student visa (subclass 500) with Genuine Student criteria and OSHC, plus Temporary Graduate visa (subclass 485) for post-study work.',
    },
    {
      title: 'Partner & Family',
      text: 'Partner visa (subclass 820/801 onshore, 309/100 offshore), Prospective Marriage, child visas, and contributory parent routes.',
    },
    {
      title: 'Visitors',
      text: 'Visitor visa (subclass 600) for tourism, business visitor, sponsored family, and approved destination travel.',
    },
    {
      title: 'Permanent Residence',
      text: 'PR via the Employer Nomination Scheme, Skilled Independent (189), Skilled Nominated (190), and family-sponsored permanent visas.',
    },
    {
      title: 'Citizenship',
      text: 'Australian citizenship by conferral once residence and character requirements are met.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct subclass, DHA fees, processing times, and key risks before any work begins.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to current Department of Home Affairs evidence requirements and policy.',
    },
    {
      icon: Globe,
      title: 'ImmiAccount filing',
      text: 'Online lodgement, supporting documents upload, and biometrics or health checks coordination.',
    },
    {
      icon: Shield,
      title: 'Bridging visa awareness',
      text: "Bridging visa A/B/C rules and travel implications while your application is in progress.",
    },
    {
      icon: Calendar,
      title: 'Onward planning',
      text: 'Renewal, transition to PR, and citizenship pathway after your first visa.',
    },
  ],

  notHandled: 'We do not handle protection visas or removal proceedings.',
};

export default australiaData;
