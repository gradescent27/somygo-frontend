// Family & Dependent Visas, service page data.

import {
  Heart,
  Baby,
  Users,
  UserCheck,
  RefreshCw,
  FileText,
  ClipboardList,
  Send,
  Plane,
} from 'lucide-react';

const familyVisasData = {
  eyebrow: 'Family & Dependent Visas',
  title: 'Reunite and stay together, with a clear plan and compliant evidence.',
  intro:
    'We plan and prepare applications for partners, children, parents in limited categories, and other dependent family members where the rules allow. Regular destinations include the United Kingdom, United States, Canada, the European Union, Australia, and the UAE.',

  audience: [
    {
      icon: Heart,
      text: 'Spouse, partner, or fiancé applicants joining a citizen, resident, or eligible worker',
    },
    {
      icon: Baby,
      text: 'Children joining one or both parents, including newborns and adopted children',
    },
    {
      icon: Users,
      text: 'Parents or other relatives in limited dependency routes where available',
    },
    {
      icon: UserCheck,
      text: 'Families joining a principal applicant who holds a work or study visa',
    },
  ],

  included: [
    {
      icon: FileText,
      title: 'Strategy & sequencing',
      items: [
        'Route comparison for the principal and each dependent',
        'Correct sequencing to avoid timing conflicts between principal and family',
        'Risk map with timelines and any past-refusal recovery plan',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Relationship & document pack',
      items: [
        'Relationship narrative templates that match independent evidence',
        'Sponsor letters, financial evidence, and accommodation guidance',
        'Translations and legalisations where required',
        'Application forms completed and dual-checked before submission',
      ],
    },
    {
      icon: Send,
      title: 'Submission & follow-through',
      items: [
        'Online filing or consular filing as required',
        'Appointment and biometrics booking for each family member',
        'Interview coaching where required',
        'Status tracking with proactive updates',
      ],
    },
    {
      icon: Plane,
      title: 'Post-decision & onward planning',
      items: [
        'Travel coordination for the family',
        'Registrations and renewal calendar',
        'Settlement and citizenship planning when eligible',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Partner, fiancé, child and dependent child, dependents of workers and students, and certain family reunion routes.',
    },
    {
      country: 'United States',
      text: 'Spouse and immediate relative categories, K-1 fiancé, dependents of temporary workers and students.',
    },
    {
      country: 'Canada',
      text: 'Spousal and common-law sponsorship, dependents of workers and students.',
    },
    {
      country: 'European Union (EU)',
      text: 'Family reunification for spouses and minor children, dependents of EU Blue Card and national permit holders across member states.',
    },
    {
      country: 'Australia',
      text: 'Partner and Prospective Marriage visas, dependents of TSS or ENS workers and students.',
    },
    {
      country: 'UAE',
      text: 'Family sponsorship for spouse, children, and in limited cases parents.',
    },
  ],

  process: [
    {
      title: 'Intake and relationship review',
      text: 'Short form plus key dates and documents. We confirm the route, sequencing, and any complications.',
    },
    {
      title: 'Strategy call and written plan',
      text: 'Route selected, evidence list agreed, responsibilities assigned, and target dates set for each family member.',
    },
    {
      title: 'Evidence build and forms',
      text: 'We supply templates, review drafts, and run consistency checks across names, dates, and addresses across the whole family.',
    },
    {
      title: 'Submission and appointments',
      text: 'We file, book biometrics or visa-centre appointments, and prepare each applicant for any interview.',
    },
    {
      title: 'Decision and onward',
      text: 'On approval we guide travel, registrations, and renewal planning. If refused, we analyse and advise on refile or appeal with licensed counsel where required.',
    },
  ],

  eligibility: [
    'Genuine relationship that can be supported with documents and shared history',
    'Sponsor status that qualifies for family sponsorship or dependents of a worker / student',
    'Financial requirement met through income, savings, or permitted combinations',
    'Suitable accommodation and care arrangements',
    'Health and character requirements satisfied',
  ],
};

export default familyVisasData;
