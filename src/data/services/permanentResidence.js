// Permanent Residence & Citizenship, service page data.

import {
  Users,
  Home,
  Globe,
  UserCheck,
  FileText,
  ClipboardList,
  Send,
  Flag,
} from 'lucide-react';

const permanentResidenceData = {
  eyebrow: 'Permanent Residence & Citizenship',
  title: 'Plan your route to long-term status with clear timelines and solid evidence.',
  intro:
    'We assess your eligibility for permanent residence and for citizenship or naturalisation where you qualify. We map the fastest credible route, plan document harvesting over time, and prepare a compliant application. Regular destinations include the United Kingdom, United States, Canada, the European Union, Australia, and the UAE.',

  audience: [
    {
      icon: Users,
      text: 'Workers, students, or family members ready to move from temporary to permanent residence',
    },
    {
      icon: Home,
      text: 'Residents who meet day-count or residence rules for citizenship or naturalisation',
    },
    {
      icon: Globe,
      text: 'Applicants with complex travel histories or past status gaps that need careful planning',
    },
    {
      icon: UserCheck,
      text: 'Families wanting coordinated plans for principal and dependents',
    },
  ],

  included: [
    {
      icon: FileText,
      title: 'Eligibility audit',
      items: [
        'Written assessment with the most suitable route, fees, and realistic timeline',
        'Day-count, absences, and residence-continuity check',
        'Risk map with any past-status complications addressed',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Document harvesting plan',
      items: [
        'Long-term plan covering residence evidence, taxes, and language tests',
        'Templates and acceptable formats for each evidence type',
        'Translations and legalisation guidance where required',
        'Application forms completed and dual-checked before submission',
      ],
    },
    {
      icon: Send,
      title: 'Submission & follow-through',
      items: [
        'Online filing or consular filing as required',
        'Appointment, biometrics, and ceremony coordination where applicable',
        'Status tracking with proactive updates',
      ],
    },
    {
      icon: Flag,
      title: 'Post-approval & citizenship',
      items: [
        'Passport application and registration guidance after naturalisation',
        'Onward travel and dual-nationality planning where relevant',
        'Family pathway planning so dependents are not left behind',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Indefinite Leave to Remain based on work, family, or long residence, followed by naturalisation where criteria are met.',
    },
    {
      country: 'United States',
      text: 'Adjustment of Status or consular processing to permanent resident status, followed by naturalisation when eligible.',
    },
    {
      country: 'Canada',
      text: 'Express Entry and provincial programs for permanent residence, followed by citizenship after residence and tax days are met.',
    },
    {
      country: 'European Union (EU)',
      text: 'Long-term EU residence and country-specific permanent residence for eligible residents, followed by naturalisation where available.',
    },
    {
      country: 'Australia',
      text: 'Permanent residence via ENS or points routes, followed by Australian citizenship when residence and character tests are met.',
    },
    {
      country: 'UAE',
      text: 'Long-term residence categories for eligible investors and professionals, with citizenship in limited scenarios.',
    },
  ],

  process: [
    {
      title: 'Intake and history review',
      text: 'We map your current status, past residence, absences, and any complications so the route is clear from the start.',
    },
    {
      title: 'Strategy call and written plan',
      text: 'Route selected, harvesting plan agreed, target submission window set with realistic timelines.',
    },
    {
      title: 'Evidence harvesting',
      text: 'We help you collect residence proofs, tax records, language certificates, and any other long-tail evidence as the window approaches.',
    },
    {
      title: 'Submission and biometrics',
      text: 'We complete and file the application, schedule biometrics or interviews, and coordinate any ceremony bookings.',
    },
    {
      title: 'Decision and onward',
      text: 'On approval we guide the next chapter (passport, registration, dual nationality). If refused, we analyse and advise on review or appeal with licensed counsel where required.',
    },
  ],

  eligibility: [
    'Minimum lawful residence period and allowed absences',
    'Language and knowledge requirements where applicable',
    'Good character and disclosure of any immigration or criminal history',
    'Tax compliance and evidence of integration or ties to the country',
    'Continued eligibility of the route that led to residence',
  ],
};

export default permanentResidenceData;
