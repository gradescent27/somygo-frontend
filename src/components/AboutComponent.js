// AboutComponent.js
//
// Used by both the homepage (as the About section) and the /about page.
// Visual model: Visora theme, asymmetric image-left + content-right with
// inline trust pillars and a CTA. Office details intentionally NOT
// duplicated here, they live in the Footer and on the Contact page.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Scale,
  Globe,
  Compass,
} from 'lucide-react';
import aboutImage from '../assets/about.png';

const pillars = [
  {
    icon: CheckCircle2,
    title: 'Clarity',
    text: 'Honest eligibility calls, transparent fees, and realistic timelines.',
  },
  {
    icon: HeartHandshake,
    title: 'Care',
    text: 'One dedicated case owner; WhatsApp and email support with a 24–72h response.',
  },
  {
    icon: Scale,
    title: 'Compliance',
    text: 'Applications evidence-mapped to current rules, with risks flagged early.',
  },
  {
    icon: Globe,
    title: 'Coverage',
    text: 'UK and US offices give us near-follow-the-sun support across time zones.',
  },
  {
    icon: Compass,
    title: 'Continuity',
    text: 'From your first visa through renewals, PR, and family pathways.',
  },
];

const AboutComponent = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric: image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image with decorative gold accent */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-acGold/20 rounded-2xl -z-0" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-acblue/10 rounded-2xl -z-0" />
            <img
              src={aboutImage}
              alt="The Somygo team helping a family plan their immigration pathway"
              className="relative w-full max-w-md mx-auto lg:max-w-none rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
              <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                About Somygo
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-6">
              A global team with a{' '}
              <span className="text-acblue">personal approach.</span>
            </h2>

            <div className="space-y-4 text-acGray font-light text-base md:text-lg leading-relaxed mb-8">
              <p>
                Somygo is a global immigration consulting practice focused on
                individuals and families. We help you choose the right
                pathway (work, study, family, residency, investor, or visit)
                and guide you from eligibility to arrival with clear
                timelines and careful document preparation.
              </p>
              <p>
                We operate from two hubs for speed and coverage. Our UK
                office serves clients across Europe, the Middle East, and
                Africa. Our US office coordinates services into the Americas
                and Asia-Pacific. The result: fast responses, time-zone
                overlap, and appointments secured as soon as local windows
                open.
              </p>
              <p>
                You'll have one dedicated case owner from start to finish.
                Quality control is baked into every stage, and if a decision is
                ever negative, we reassess options or coordinate an appeal with
                licensed local counsel where required.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-acblue font-semibold border-b-2 border-acGold pb-1 hover:gap-3 transition-all"
            >
              Get in touch
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Trust pillars, 5 in a responsive grid */}
        <motion.div
          className="border-t border-gray-100 pt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-acblue/5 mb-4">
                    <Icon
                      size={22}
                      className="text-acblue"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-bold text-acBlack mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-acGray font-light leading-relaxed">
                    {pillar.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutComponent;
