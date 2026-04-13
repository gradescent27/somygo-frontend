// Appeals & Complex Cases, service page data.
//
// Note: this service is structurally different from the others (no eligibility
// in the usual sense, no "destination routes", it's a recovery service). The
// `eligibility` slot here is repurposed as "what we need from you to start"
// since the slot title in the layout reads "the starting point". The `routes`
// slot is repurposed for "common refusal reasons we address".

import {
  AlertTriangle,
  Clock,
  Search,
  Shield,
  Users,
  RefreshCw,
  FileText,
  Target,
  Send,
  Gavel,
} from 'lucide-react';

const appealsData = {
  eyebrow: 'Appeals & Complex Cases',
  title: 'Clear analysis. Realistic strategy. Disciplined execution.',
  intro:
    'If you have a refusal, status complications, or a difficult history, we analyse the decision, reconstruct your immigration timeline, and set out credible options. Where a lawyer is required by law, we coordinate with licensed local counsel and remain your day-to-day case manager.',

  audience: [
    {
      icon: AlertTriangle,
      text: 'Applicants who received a refusal or intent-to-refuse letter',
    },
    {
      icon: Clock,
      text: 'Individuals with overstays, prior breaches, or complex travel histories',
    },
    {
      icon: Search,
      text: 'Cases with alleged misrepresentation or document authenticity concerns',
    },
    {
      icon: Shield,
      text: 'People with criminal cautions or convictions where disclosure is required',
    },
    {
      icon: Users,
      text: 'Families with dependency, custody, or consent complications',
    },
    {
      icon: RefreshCw,
      text: 'Applicants who filed themselves and now need structured recovery',
    },
  ],

  included: [
    {
      icon: Search,
      title: 'Decision analysis',
      items: [
        'Written analysis explaining what the officer relied on and which rules apply',
        'Reconstruction of your immigration timeline and any contributing factors',
        'Honest assessment of likelihood of success per option',
      ],
    },
    {
      icon: Target,
      title: 'Strategy paper',
      items: [
        'Options comparison: refile, administrative review, appeal, or alternative route',
        'Timeline and risk trade-offs for each path',
        'Counsel-led options identified where regulated representation is required',
      ],
    },
    {
      icon: FileText,
      title: 'Evidence rebuild',
      items: [
        'Disciplined evidence plan that fixes gaps and avoids contradictions',
        'New supporting documents, statements, and corroborating material',
        'Translations and legalisations where required',
      ],
    },
    {
      icon: Send,
      title: 'Quality filing & status protection',
      items: [
        'Quality-checked filing for refile, review, or appeal with counsel',
        'Plan to protect your status or travel while the matter is pending',
        'Coordination with licensed local counsel where representation is required',
      ],
    },
  ],

  // Repurposed: "common refusal reasons we address" instead of country routes.
  routes: [
    {
      country: 'Credibility concerns',
      text: 'Unclear purpose, weak ties, or conflicting statements between forms and interviews.',
    },
    {
      country: 'Financial evidence',
      text: 'Format, ownership, or maintenance-period rules not met.',
    },
    {
      country: 'Relationship evidence',
      text: 'Insufficient proof of durability or cohabitation for partner / family routes.',
    },
    {
      country: 'Employment & sponsorship',
      text: 'Salary thresholds not met or wrong occupation code selection.',
    },
    {
      country: 'Study credibility',
      text: 'GTE or genuine-student concerns that do not match academic and career history.',
    },
    {
      country: 'Source of funds',
      text: 'Source of funds or wealth not fully evidenced for investor or settlement routes.',
    },
    {
      country: 'Non-disclosure',
      text: 'Prior refusals, overstays, or criminal history not properly disclosed.',
    },
    {
      country: 'Technical errors',
      text: 'Missing pages, name mismatches, date conflicts, or wrong form versions.',
    },
  ],

  process: [
    {
      title: 'Intake and decision review',
      text: 'Send us the refusal notice, prior application, and any evidence you submitted. We review it before any fee discussion.',
    },
    {
      title: 'Written analysis and options',
      text: 'You get a written read of the decision and a comparison of credible options with timelines and risk.',
    },
    {
      title: 'Strategy decision',
      text: 'We agree the path forward, refile, administrative review, appeal, or alternative route, and any counsel involvement.',
    },
    {
      title: 'Evidence rebuild and filing',
      text: 'We rebuild the evidence pack to fix the gaps, complete new forms, and file the chosen path.',
    },
    {
      title: 'Decision and onward planning',
      text: 'On a successful outcome we plan the next chapter. If unsuccessful, we reassess options or escalate with counsel as required.',
    },
  ],

  // Repurposed: "what to send us to get started" instead of strict eligibility.
  eligibility: [
    'The refusal notice or decision letter, in full',
    'Your previous application and all the evidence you submitted',
    'Your immigration history, including travel dates and any prior refusals or visas',
    'Any deadlines that apply to a refile, review, or appeal, these are often tight',
  ],
};

export default appealsData;
