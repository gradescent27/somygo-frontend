// Skilled Worker & Employment Visas, service page data.
// Consumed by src/pages/SkilledWorkerEmploymentVisas.js via ServicePageLayout.

import {
  Users,
  Building2,
  RefreshCw,
  Rocket,
  FileText,
  ClipboardList,
  Send,
  Plane,
} from 'lucide-react';

const skilledWorkerData = {
  eyebrow: 'Skilled Worker & Employment',
  title: 'Map your role. Confirm eligibility. File end-to-end.',
  intro:
    'We help professionals and their employers choose a viable route, build a strong evidence pack, and submit a compliant application on time. Regular destinations include the United States, Canada, the United Kingdom, the European Union, Australia, and the UAE.',

  audience: [
    {
      icon: Users,
      text: 'New hires relocating for a sponsored role',
    },
    {
      icon: Building2,
      text: 'Internal transfers and multinational assignments',
    },
    {
      icon: RefreshCw,
      text: 'Contractors converting to sponsored employment',
    },
    {
      icon: Rocket,
      text: 'Founders joining their own company as an employee where the route allows',
    },
  ],

  included: [
    {
      icon: FileText,
      title: 'Strategy & planning',
      items: [
        'Route comparison, risk map, and realistic timeline',
        'Salary, SOC / NOC / ANZSCO mapping and shortage list checks',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Document pack & forms',
      items: [
        'Tailored checklist for you and your employer',
        'Templates for employer letters and personal statements',
        'Certified translation and legalisation guidance',
        'Form completion with dual quality checks',
      ],
    },
    {
      icon: Send,
      title: 'Submission & follow-through',
      items: [
        'Online filing or consular filing as required',
        'Appointment and biometrics scheduling',
        'Interview coaching and mock questions where relevant',
        'Status tracking with proactive updates',
      ],
    },
    {
      icon: Plane,
      title: 'After approval',
      items: [
        'Arrival checklist, registrations, and right-to-work steps',
        'Calendar for renewals and reminders',
        'Permanent residence and citizenship planning when eligible',
      ],
    },
  ],

  routes: [
    {
      country: 'United Kingdom',
      text: 'Skilled Worker, Global Business Mobility routes, Health and Care Worker.',
    },
    {
      country: 'United States',
      text: 'L-1 intracompany transfers, O-1 extraordinary ability, H-1B alternatives and cap-exempt options, TN for eligible nationals.',
    },
    {
      country: 'Canada',
      text: 'LMIA-based work permits and LMIA-exempt categories under International Mobility.',
    },
    {
      country: 'European Union (EU)',
      text: 'EU Blue Card, ICT Card, and national work permits across member states.',
    },
    {
      country: 'Australia',
      text: 'Temporary Skill Shortage (TSS) and Employer Nomination Scheme (ENS).',
    },
    {
      country: 'UAE',
      text: 'Employer sponsorship and free zone employment visas.',
    },
  ],

  process: [
    {
      title: 'Intake and quick screen',
      text: 'Short form plus your CV and offer letter. We confirm viability and flag any urgent risks.',
    },
    {
      title: 'Strategy call and written plan',
      text: 'Route selected, evidence list agreed, responsibilities assigned, and target dates set.',
    },
    {
      title: 'Evidence building and forms',
      text: 'We supply templates and examples, review drafts, and run consistency checks across names, dates, roles, and salaries.',
    },
    {
      title: 'Submission and appointments',
      text: 'We file, book biometrics or visa centre appointments, and prepare you for any interview.',
    },
    {
      title: 'Decision and onboarding',
      text: 'On approval, we guide post-approval steps. If refused, we analyse the decision and advise on refile, administrative review, or appeal with licensed counsel where required.',
    },
  ],

  eligibility: [
    'A genuine job offer that meets local salary or market rate rules',
    'Employer sponsorship or equivalent registration where required',
    'Skills and experience that match the role and category',
    'Immigration history that is either clean or explained with credible evidence',
  ],
};

export default skilledWorkerData;
