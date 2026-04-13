// Study Permits & Graduate Pathways, service page data.

import {
  GraduationCap,
  Users,
  Briefcase,
  RefreshCw,
  FileText,
  ClipboardList,
  Send,
  Plane,
} from 'lucide-react';

const studyPermitsData = {
  eyebrow: 'Study Permits & Graduate Pathways',
  title: 'From admissions to post-study work, built for real-world compliance.',
  intro:
    'We prepare a compliant student visa file and plan your next step after graduation where a route exists. Regular destinations include the United States, Canada, the United Kingdom, the European Union, Australia, and the UAE.',

  audience: [
    {
      icon: GraduationCap,
      text: 'Students starting language, vocational, undergraduate, or postgraduate study',
    },
    {
      icon: Users,
      text: 'Parents supporting under-18 applicants',
    },
    {
      icon: Briefcase,
      text: 'Graduates moving into a permitted post-study work route',
    },
    {
      icon: RefreshCw,
      text: 'Applicants with a prior refusal who need a clearer evidence strategy',
    },
  ],

  included: [
    {
      icon: FileText,
      title: 'Strategy & planning',
      items: [
        'Course fit and credibility review against your background',
        'Country comparison where more than one option is viable',
        'Financial planning checklist and acceptable evidence formats',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Document pack & forms',
      items: [
        'Statement of Purpose, GTE, or Genuine Student narrative templates with edits',
        'Sponsor letters, affidavit language, and bank evidence guidance',
        'Translations and legalisation instructions where needed',
        'Application forms completed and dual-checked before submission',
      ],
    },
    {
      icon: Send,
      title: 'Submission & follow-through',
      items: [
        'Online filing or consular filing as required',
        'Appointment and biometrics booking',
        'Interview coaching where required',
        'Status tracking with proactive updates',
      ],
    },
    {
      icon: Plane,
      title: 'Post-decision & arrival',
      items: [
        'Arrival checklist, address and registration steps where relevant',
        'Rules on work during study and attendance requirements',
        'Post-study route planning and timelines',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Student route with funds and Academic Progression compliance, plus Graduate route planning after completion.',
    },
    {
      country: 'United States',
      text: 'F-1 with SEVIS registration and proof of non-immigrant intent. OPT and STEM OPT planning for eligible programs.',
    },
    {
      country: 'Canada',
      text: 'Study Permit with proof of financial capacity and ties, plus Post-Graduation Work Permit planning.',
    },
    {
      country: 'European Union (EU)',
      text: 'National student visas and residence permits across member states, with funding evidence in acceptable formats.',
    },
    {
      country: 'Australia',
      text: 'Student subclass with Genuine Student criteria and OSHC. Post-study options where available.',
    },
    {
      country: 'UAE',
      text: 'University sponsorship and family sponsorship where applicable.',
    },
  ],

  process: [
    {
      title: 'Intake and course evidence',
      text: 'Offer or CAS or LOA, program details, funding plan, and your academic history.',
    },
    {
      title: 'Credibility and financial build',
      text: 'We structure your Statement of Purpose or GTE narrative and align financial evidence to the rules, including acceptable account types and timing.',
    },
    {
      title: 'Forms and quality checks',
      text: 'We complete the application, reconcile names and dates across documents, and run a final review against current policy notes.',
    },
    {
      title: 'Submission and appointment',
      text: 'We submit, pay required fees, schedule biometrics or interview, and prepare you for common questions.',
    },
    {
      title: 'Decision and next steps',
      text: 'On approval we guide enrolment confirmations, travel timing, and registration steps. If refused, we analyse and advise on refile or review with licensed counsel where required.',
    },
  ],

  eligibility: [
    "An unconditional offer or the destination's acceptance document (CAS, LOA, etc.)",
    'Financial capacity at required levels for tuition, living costs, and any dependent family',
    'A study plan that is consistent with your academic history and future goals',
    'Health, character, and attendance expectations that can be met',
  ],
};

export default studyPermitsData;
