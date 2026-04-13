// FeesComponent.js
//
// "How fees work" section, used on /how-it-works.
//
// IMPORTANT: this section deliberately avoids quoting specific prices because
// real Somygo pricing has not been provided yet. Per CLAUDE.md "Don't invent",
// we only describe the *structure*, stage-based, transparent, free initial
// assessment, government fees passed through. When real prices land, replace
// the qualitative descriptions in the `pricingPillars` array with the actual
// numbers.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Layers,
  Receipt,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';

const pricingPillars = [
  {
    icon: MessageSquare,
    title: 'Free initial assessment',
    description:
      'A short conversation to understand your goal, confirm eligibility, and outline the right pathway. No charge, no obligation.',
  },
  {
    icon: Layers,
    title: 'Clear stage-based fees',
    description:
      'Our fee is broken into stages tied to real work, strategy, document preparation, submission, and post-decision support. You see the full schedule before any work begins.',
  },
  {
    icon: Receipt,
    title: 'Government fees passed through',
    description:
      'Visa application charges, biometrics, medicals, courier and translation costs are paid directly to the relevant authorities. We never mark them up.',
  },
  {
    icon: ShieldCheck,
    title: 'No hidden costs',
    description:
      'Every cost is documented in your engagement letter. If circumstances change and additional work is needed, you approve it in writing first.',
  },
];

const includedItems = [
  'Eligibility assessment and pathway recommendation',
  'Tailored document checklist and templates',
  'Form completion and quality review',
  'Submission via the appropriate channel',
  'Biometrics, appointment, and interview coordination',
  'Status tracking and proactive updates',
  'Post-decision guidance and onward planning',
  'Coordination with licensed local counsel where required by law',
];

const FeesComponent = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
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
              How Fees Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
            Transparent pricing,{' '}
            <span className="text-acblue">no surprises.</span>
          </h2>
          <p className="text-base md:text-lg text-acGray font-light">
            We believe pricing should be as clear as the rest of the process.
            Here's how we structure our fees.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pricingPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acGold/15 mb-5">
                  <Icon size={26} className="text-acblue" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold font-inter text-acBlack mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-acGray font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* What's included, two-column layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start bg-acBg rounded-3xl p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left: copy */}
          <div className="lg:col-span-2">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
              <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                What's Included
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-inter text-acBlack leading-tight mb-4">
              Everything your case needs,{' '}
              <span className="text-acblue">in one fee.</span>
            </h3>
            <p className="text-base text-acGray font-light leading-relaxed">
              Our fees cover the work it actually takes to move a case from
              eligibility to arrival, not just paperwork. You'll have one
              dedicated case owner from day one.
            </p>
          </div>

          {/* Right: included list */}
          <div className="lg:col-span-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-acBlack font-light leading-relaxed"
                >
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-acGold/20">
                    <Check
                      size={12}
                      className="text-acblue"
                      strokeWidth={3}
                    />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-acGray font-light mb-5 max-w-xl mx-auto">
            Every case is different. The best way to get an accurate quote is a
            short conversation.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-acblue hover:bg-blue-900 text-white font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acblue/20"
          >
            Get a quote for your case
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeesComponent;
