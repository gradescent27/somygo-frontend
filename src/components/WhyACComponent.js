// WhyACComponent.js
//
// Renders the entire /why-us page content. Previously imported
// HighlightsCarousel + Reviews which both contained leftover scam-recovery
// content (highlights.json had "Effortless Fund Recovery", Reviews.js had
// hardcoded YouTube embeds from the prior brand). Both unimported here; the
// files remain in the repo as orphans for potential future use with real
// somygo content.
//
// Page structure:
//   1. Hero / intro            asymmetric image-left + text-right
//   2. Differentiators grid    6 concrete reasons to choose us
//   3. FAQs                    shared component

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  UserCheck,
  ScrollText,
  Eye,
  Globe2,
  MessageCircle,
  HandHeart,
} from 'lucide-react';
import aboutImage from '../assets/about.png';
import FAQs from './FAQs';

const differentiators = [
  {
    icon: UserCheck,
    title: 'One dedicated case owner',
    description:
      'You work with the same person from first call to final decision. No tickets passed between strangers, no losing track of where you are.',
  },
  {
    icon: ScrollText,
    title: 'Compliance-first applications',
    description:
      'Every case is evidence-mapped to the current rules of the destination country. We flag risks early so there are no surprises at the visa centre.',
  },
  {
    icon: Eye,
    title: 'Transparent stage-based fees',
    description:
      'You see the full fee schedule before any work begins. No hidden charges, no upsells, government fees passed through at cost.',
  },
  {
    icon: Globe2,
    title: 'Truly global coverage',
    description:
      'UK and US offices give us real time-zone overlap with most of the world. We secure appointments and lodge filings as soon as local windows open.',
  },
  {
    icon: MessageCircle,
    title: 'Direct human contact',
    description:
      'WhatsApp, email, and scheduled calls. Not chatbots or ticketing systems. You always know who is handling your case.',
  },
  {
    icon: HandHeart,
    title: 'Honest eligibility calls',
    description:
      "We tell you when a case is weak, when a route is wrong, and when waiting is the smarter move. We'd rather lose a fee than waste your time.",
  },
];

const WhyACComponent = () => {
  return (
    <>
      {/* ── 1. Hero / intro ───────────────────────────────────────────────── */}
      <section className="relative bg-white py-20 md:py-28 px-6 overflow-hidden">
        {/* Decorative gold accent shapes */}
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-acGold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-acblue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-acGold/20 rounded-2xl -z-0" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-acblue/10 rounded-2xl -z-0" />
              <img
                src={aboutImage}
                alt="A Somygo consultant talking through a client's case"
                className="relative w-full max-w-md mx-auto lg:max-w-none rounded-2xl shadow-xl"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  Why Choose Somygo
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-6">
                Big decisions deserve a{' '}
                <span className="text-acblue">steady hand.</span>
              </h1>

              <div className="space-y-4 text-acGray font-light text-base md:text-lg leading-relaxed mb-8">
                <p>
                  Choosing where to build your life is one of the most
                  consequential decisions a family can make. The wrong
                  route, a missed deadline, or a weak document pack can
                  cost months. Or the case itself.
                </p>
                <p>
                  Somygo exists to take that weight off your shoulders. We
                  combine compliance-first immigration consulting with a
                  people-first approach: clear pathways, honest advice, and one
                  dedicated person who knows your case inside and out.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
              >
                Talk to a consultant
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Differentiators grid ──────────────────────────────────────── */}
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
                What Sets Us Apart
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
              Six things you can{' '}
              <span className="text-acblue">count on.</span>
            </h2>
            <p className="text-base md:text-lg text-acGray font-light">
              Concrete commitments, not marketing fluff.
            </p>
          </motion.div>

          {/* 6-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group bg-white rounded-2xl p-7 border border-transparent hover:border-acGold/30 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acblue/5 group-hover:bg-acGold/15 transition-colors mb-5">
                    <Icon
                      size={26}
                      className="text-acblue"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="text-lg font-bold font-inter text-acBlack mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-acGray font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Closing CTA inside the differentiators section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-acGray font-light mb-5 max-w-xl mx-auto">
              The best way to see if we're the right fit is a short
              conversation. No charge, no obligation.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-acblue hover:bg-blue-900 text-white font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acblue/20"
            >
              Book a free consultation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 3. FAQs ──────────────────────────────────────────────────────── */}
      <FAQs />
    </>
  );
};

export default WhyACComponent;
