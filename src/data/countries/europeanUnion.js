// European Union (EU): country page data.
//
// Covers EU-wide mechanisms: EU Blue Card, ICT Card, national work permits
// across member states, Schengen short-stay, long-term EU residence, and
// naturalisation. Flag uses iso 'eu' (EU flag).

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

const europeanUnionData = {
  iso: 'eu',
  eyebrow: 'European Union (EU)',
  title: 'Practical guidance for the European Union.',
  intro:
    'We guide individuals and families through eligibility, documents, and filings across the European Union. We support EU Blue Card and national work permits in member states, study and post-study options, family reunification, Schengen business travel, long-term residence, and naturalisation.',

  audience: [
    {
      icon: Briefcase,
      title: 'Skilled Workers',
      text: 'Professionals with an EU job offer that meets salary and qualification thresholds.',
    },
    {
      icon: Building,
      title: 'Employers',
      text: 'Employers hiring across borders or moving staff under intra-corporate transfer rules.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Graduates',
      text: 'Students enrolling at EU institutions and graduates planning post-study work.',
    },
    {
      icon: Heart,
      title: 'Family Members',
      text: 'Spouses and minor children joining a worker, student, or settled resident.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-stay Schengen visitors for meetings, conferences, training, and tourism.',
    },
    {
      icon: Flag,
      title: 'Long-term Residents',
      text: 'Eligible residents preparing for permanent or long-term EU residence and naturalisation.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'EU Blue Card, ICT Card for intra-corporate transferees, national work permits across member states, and posted-worker notifications.',
    },
    {
      title: 'Students & Graduates',
      text: 'National student visas and residence permits, financial evidence requirements, and post-study job-seeker permits where available.',
    },
    {
      title: 'Family',
      text: 'Family reunification for spouses and minor children of workers, students, EU Blue Card holders, and settled residents.',
    },
    {
      title: 'Visitors',
      text: 'Schengen short-stay (C) visas for tourism, business, conferences, and family visits across the Schengen area.',
    },
    {
      title: 'Permanent Residence',
      text: 'Long-term EU residence permits and country-specific permanent residence routes after qualifying residence periods.',
    },
    {
      title: 'Citizenship',
      text: 'Naturalisation in EU member states once residence, language, and integration requirements are met.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct route, application fees, processing times, and key risks across the relevant member state.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to the destination country rules, with translations and apostille guidance.',
    },
    {
      icon: Globe,
      title: 'Filing & appointments',
      text: 'Consulate or local immigration office appointments and form completion in the appropriate language.',
    },
    {
      icon: Shield,
      title: 'Compliance guidance',
      text: 'Local residency registration, residence card, and travel rules within Schengen during your stay.',
    },
    {
      icon: Calendar,
      title: 'Onward planning',
      text: 'Renewal calendar, settlement planning, and family pathway after your first permit.',
    },
  ],

  notHandled:
    'We focus on the major EU work, study, and family routes. Some niche country-specific programs may be coordinated through partners.',
};

export default europeanUnionData;
