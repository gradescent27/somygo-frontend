// Visitor & Short-Stay, service page data.

import {
  Briefcase,
  Camera,
  Mic,
  Heart,
  RefreshCw,
  FileText,
  ClipboardList,
  Send,
  ShieldCheck,
} from 'lucide-react';

const visitorData = {
  eyebrow: 'Visitor & Short-Stay',
  title: 'Purpose-fit applications for meetings, conferences, training, tourism, and family visits.',
  intro:
    'We prepare clear, credible visitor files that show a genuine trip and a timely return. Regular destinations include the United Kingdom, United States, Canada, Schengen Europe, Australia, and the UAE. Our role is to match your purpose with the permitted activities and to organise evidence that satisfies each country\'s rules.',

  audience: [
    {
      icon: Briefcase,
      text: 'Business visitors attending meetings, conferences, trade fairs, or short internal training',
    },
    {
      icon: Camera,
      text: 'Tourists and family visitors seeking leisure or personal travel',
    },
    {
      icon: Mic,
      text: 'Speakers or presenters at events without paid employment in country',
    },
    {
      icon: RefreshCw,
      text: 'Applicants with a prior refusal who need a stronger, better-documented case',
    },
  ],

  included: [
    {
      icon: FileText,
      title: 'Purpose & route mapping',
      items: [
        'Confirmation that your purpose fits a permitted visitor category',
        'Route comparison where multiple options exist (e.g., visa vs ETA)',
        'Realistic timeline for filing, biometrics, and decisions',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Evidence pack',
      items: [
        'Tailored document checklist based on purpose and nationality',
        'Travel itinerary, accommodation, and support letter templates',
        'Funds, ties, and intent-to-return evidence guidance',
        'Form completion with dual quality checks',
      ],
    },
    {
      icon: Send,
      title: 'Submission & appointments',
      items: [
        'Online or visa-centre filing',
        'Biometrics or interview booking and prep',
        'Status tracking and proactive updates',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Compliance during your stay',
      items: [
        'Clear do-and-do-not guidance for the visit',
        'Records of permitted activities for any follow-on visa',
        'Rebooking guidance if plans change before travel',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Standard Visitor for tourism, family, business meetings, short events, and limited training or study cases.',
    },
    {
      country: 'United States',
      text: 'B-1 for business and B-2 for tourism or family visits, ESTA for eligible nationalities.',
    },
    {
      country: 'Canada',
      text: 'Temporary Resident Visa or eTA for eligible travellers.',
    },
    {
      country: 'Schengen Europe',
      text: 'Short-stay C visas for business or tourism, including conference travel.',
    },
    {
      country: 'Australia',
      text: 'Visitor subclass for tourism or business visitor purposes.',
    },
    {
      country: 'UAE',
      text: 'Visit visa categories with sponsor or hotel arrangements.',
    },
  ],

  process: [
    {
      title: 'Intake and purpose confirmation',
      text: 'We confirm your trip purpose fits a permitted category and flag any risks before you spend a fee.',
    },
    {
      title: 'Document checklist and guidance',
      text: 'You receive a tailored checklist with templates for support letters, itineraries, and funds evidence.',
    },
    {
      title: 'Application build and review',
      text: 'We complete the forms, run consistency checks, and review your evidence pack against the latest country rules.',
    },
    {
      title: 'Submission and biometrics',
      text: 'We file and book biometrics or interview, and prep you with common questions where required.',
    },
    {
      title: 'Decision and travel',
      text: 'On approval we share a final pre-travel checklist. If refused, we analyse the decision and advise on a stronger refile.',
    },
  ],

  eligibility: [
    'A clear and credible purpose that fits permitted visitor activities',
    'Sufficient funds to cover the trip without working in country',
    'Accommodation and travel plans that make sense for the purpose and dates',
    'Strong ties to your home country (job, studies, business, property, family)',
    'Willingness and ability to leave before visa expiry',
  ],
};

export default visitorData;
