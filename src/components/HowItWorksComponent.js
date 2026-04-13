// HowItWorksComponent.js
//
// 4-step process explainer. Previous version used leftover scam-recovery PNGs
// (recover.png, bank.png, plan.png, case.png), replaced with Lucide icons.

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  FileText,
  Send,
  Plane,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: ClipboardCheck,
    title: 'Eligibility Check & Strategy',
    description:
      'A short intake clarifies your goal (work, study, family, residency, or visit) and your destination. We confirm eligibility, outline the best route, fees, documents, and a realistic timeline.',
  },
  {
    id: 2,
    icon: FileText,
    title: 'Documents & Application Pack',
    description:
      'You receive a tailored document checklist plus templates (statements of purpose, support letters) and translation/apostille guidance. Forms and evidence are quality-checked before submission.',
  },
  {
    id: 3,
    icon: Send,
    title: 'Submission, Biometrics & Interview',
    description:
      'We lodge online or coordinate visa-centre or embassy filing, book biometrics, and prep you for any interviews. Status tracking and proactive updates included.',
  },
  {
    id: 4,
    icon: Plane,
    title: 'Decision, Travel & Next Steps',
    description:
      'On approval, you get travel and arrival checklists plus local registration guidance. If refused, we reassess options or coordinate an appeal with licensed counsel where required.',
  },
];

const HowItWorksComponent = () => {
  return (
    <section className="bg-acBg py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
            <span className="text-xs font-bold tracking-wider text-acblue uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
            From eligibility to arrival, in four steps.
          </h2>
          <p className="text-base md:text-lg text-acGray font-light">
            We guide you clearly, quickly, and compliantly, start to finish.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                className="relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Step number badge, top-right */}
                <div className="absolute top-5 right-5 text-5xl font-black text-acGold/30 leading-none select-none">
                  0{step.id}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acblue/5 mb-5">
                  <Icon
                    size={26}
                    className="text-acblue"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-inter text-acBlack mb-3 leading-snug pr-12">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-acGray font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-acblue hover:bg-blue-900 text-white font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acblue/20"
          >
            Start your case
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksComponent;
