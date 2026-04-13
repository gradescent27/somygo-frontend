// United Arab Emirates, country page data.

import {
  Briefcase,
  Building,
  GraduationCap,
  Heart,
  Plane,
  Star,
  FileText,
  CheckCircle,
  Globe,
  Shield,
  Calendar,
} from 'lucide-react';

const uaeData = {
  iso: 'ae',
  eyebrow: 'United Arab Emirates',
  title: 'Practical guidance for the UAE.',
  intro:
    'We guide individuals and families through eligibility, documents, and decisions for the United Arab Emirates. We support employer-sponsored work visas, free zone setups, family sponsorship, visitor categories, long-term residence, and Golden Visa routes.',

  audience: [
    {
      icon: Briefcase,
      title: 'Skilled Workers',
      text: 'Professionals with a UAE employer or planning to establish a free zone presence.',
    },
    {
      icon: Building,
      title: 'Investors & Founders',
      text: 'Investors, entrepreneurs, and business owners setting up free zone or mainland entities.',
    },
    {
      icon: GraduationCap,
      title: 'Students',
      text: 'Students enrolled at recognised UAE institutions on student visas.',
    },
    {
      icon: Heart,
      title: 'Family Members',
      text: 'Spouses and children joining a sponsoring resident, and parents in limited cases.',
    },
    {
      icon: Plane,
      title: 'Business Visitors',
      text: 'Short-term business visitors, tourists, and family visit applicants.',
    },
    {
      icon: Star,
      title: 'Golden Visa Candidates',
      text: 'High-net-worth investors, exceptional talents, and qualifying professionals seeking long-term residence.',
    },
  ],

  categories: [
    {
      title: 'Employment & Business',
      text: 'Employer-sponsored work permits and residence visas, mainland and free zone setups, and DMCC, ADGM, DIFC, and JAFZA company formations.',
    },
    {
      title: 'Students',
      text: 'Student residence visas through licensed academic institutions and family sponsorship for student dependents.',
    },
    {
      title: 'Family',
      text: 'Family sponsorship for spouse and children, with parent sponsorship in limited categories subject to salary and accommodation requirements.',
    },
    {
      title: 'Visitors',
      text: 'Tourist visas, transit visas, and visit visas with sponsor or hotel arrangements depending on nationality.',
    },
    {
      title: 'Long-term Residence',
      text: 'Standard residence visas linked to employment or sponsorship, plus retirement visas for qualifying applicants.',
    },
    {
      title: 'Golden Visa',
      text: '5- and 10-year Golden Visas for investors, entrepreneurs, exceptional talents, scientists, doctors, and outstanding students.',
    },
  ],

  outcomes: [
    {
      icon: FileText,
      title: 'Written plan',
      text: 'Confirms the correct visa category, government fees, free zone choices, and timelines.',
    },
    {
      icon: CheckCircle,
      title: 'Document pack & forms',
      text: 'Tailored to ICA, GDRFA, and free zone authority requirements with attestations and translations as needed.',
    },
    {
      icon: Globe,
      title: 'Filing & medicals',
      text: 'Application lodgement, Emirates ID enrolment, and medical and biometric appointment coordination.',
    },
    {
      icon: Shield,
      title: 'Compliance guidance',
      text: 'Status maintenance, residency calendar, and reporting rules for sponsors and dependents.',
    },
    {
      icon: Calendar,
      title: 'Onward planning',
      text: 'Renewal cycle, family sponsorship steps, and Golden Visa transition where eligible.',
    },
  ],

  notHandled:
    'We do not handle UAE labour disputes or criminal matters, those require licensed local counsel.',
};

export default uaeData;
