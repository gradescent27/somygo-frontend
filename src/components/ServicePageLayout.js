// ServicePageLayout.js
//
// Reusable layout shell for all 7 service detail pages. Each service page
// imports its own data file (src/data/services/<slug>.js) and passes the
// data object to this component. Design changes happen here once, propagate
// to all 7 pages.
//
// Data shape (see src/data/services/*.js for examples):
//
//   {
//     eyebrow: 'Skilled Worker & Employment',
//     title: 'Map your role. Confirm eligibility. File end-to-end.',
//     intro: '...one-paragraph intro...',
//
//     audience: [
//       { icon: Users, text: 'New hires relocating for a sponsored role' },
//       ...
//     ],
//
//     included: [
//       { icon: FileText, title: 'Strategy & planning', items: [
//         'Route comparison, risk map, and timeline',
//         ...
//       ]},
//       ...
//     ],
//
//     routes: [
//       { country: 'United Kingdom', text: 'Skilled Worker, GBM routes...' },
//       ...
//     ],
//
//     process: [
//       { title: 'Intake and quick screen', text: '...' },
//       ...
//     ],
//
//     eligibility: [
//       'A genuine job offer that meets local salary or market rate rules',
//       ...
//     ],
//   }

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const ServicePageLayout = ({ data }) => {
  const {
    eyebrow,
    title,
    intro,
    audience = [],
    included = [],
    routes = [],
    process = [],
    eligibility = [],
  } = data;

  return (
    <div className="bg-white">
      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-acBg py-20 md:py-28 px-6 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-acGold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-acblue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-wider text-acblue uppercase">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-acBlack leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-acGray font-light max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {intro}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
            >
              Check your eligibility
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center text-acblue border-2 border-acblue/30 hover:border-acblue hover:bg-acblue/5 font-semibold px-7 py-4 rounded-full transition-all"
            >
              How fees work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Who this is for ────────────────────────────────────────── */}
      {audience.length > 0 && (
        <section className="bg-white py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  Who This Is For
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight">
                Built for{' '}
                <span className="text-acblue">your situation.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-acBg rounded-2xl p-6 hover:bg-acGold/10 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-4">
                      <Icon size={22} className="text-acblue" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm text-acBlack font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. What's included ────────────────────────────────────────── */}
      {included.length > 0 && (
        <section className="bg-acBg py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  What's Included
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
                Everything your case needs,{' '}
                <span className="text-acblue">end to end.</span>
              </h2>
              <p className="text-base md:text-lg text-acGray font-light">
                One dedicated case owner, four stages of work, clearly scoped.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {included.map((bucket, index) => {
                const Icon = bucket.icon;
                return (
                  <motion.div
                    key={bucket.title}
                    className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-acGold/15 flex-shrink-0">
                        <Icon size={22} className="text-acblue" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-lg font-bold font-inter text-acBlack leading-snug">
                        {bucket.title}
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {bucket.items.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-3 text-sm text-acGray font-light leading-relaxed"
                        >
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-acGold/20">
                            <Check
                              size={12}
                              className="text-acblue"
                              strokeWidth={3}
                            />
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Routes by country ──────────────────────────────────────── */}
      {routes.length > 0 && (
        <section className="bg-white py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  Routes We Cover
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
                Country-specific{' '}
                <span className="text-acblue">expertise.</span>
              </h2>
              <p className="text-base md:text-lg text-acGray font-light">
                The major routes we file regularly, and partner support
                everywhere else.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route, index) => (
                <motion.div
                  key={route.country}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-acGold/40 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <div className="text-xs font-bold tracking-wider text-acGold uppercase mb-2">
                    {route.country}
                  </div>
                  <p className="text-sm text-acBlack font-light leading-relaxed">
                    {route.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-acGray font-light italic max-w-2xl mx-auto">
              If your destination isn't listed here, ask during intake, we
              coordinate additional routes through our partner network.
            </p>
          </div>
        </section>
      )}

      {/* ── 5. Process timeline ───────────────────────────────────────── */}
      {process.length > 0 && (
        <section className="bg-acBg py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  End-to-End Process
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight">
                From intake to{' '}
                <span className="text-acblue">decision.</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {process.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="relative flex gap-6 bg-white rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 text-3xl md:text-4xl font-bold text-acGold leading-none select-none w-10 md:w-12">
                    0{index + 1}
                  </div>
                  <div className="border-l border-gray-100 pl-6">
                    <h3 className="text-lg font-bold font-inter text-acBlack mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-acGray font-light leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service-level callout */}
            <motion.div
              className="mt-12 max-w-3xl mx-auto bg-acblue text-white rounded-2xl p-6 md:p-7 flex items-start gap-4"
              {...fadeInUp}
            >
              <Clock
                size={22}
                className="text-acGold flex-shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <div>
                <div className="font-semibold text-white mb-1">
                  Our service level
                </div>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  Pack creation typically takes 1–3 weeks depending on document
                  readiness. Government processing varies by country, season,
                  and premium options. We respond within 24–72 hours, faster at
                  critical steps.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── 6. Eligibility + closing CTA ──────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: eligibility checklist */}
            {eligibility.length > 0 && (
              <motion.div {...fadeInUp}>
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                  <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                    Eligibility Basics
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-inter text-acBlack leading-tight mb-6">
                  The{' '}
                  <span className="text-acblue">starting point.</span>
                </h2>
                <ul className="space-y-3">
                  {eligibility.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-acBlack font-light leading-relaxed"
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 mt-0.5 rounded-full bg-acGold/20">
                        <Check
                          size={14}
                          className="text-acblue"
                          strokeWidth={3}
                        />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-acGray font-light italic">
                  Not sure if you qualify? Send us a short summary, we'll tell
                  you honestly.
                </p>
              </motion.div>
            )}

            {/* Right: CTA card */}
            <motion.div
              className="bg-acblue text-white rounded-3xl p-8 md:p-10"
              {...fadeInUp}
            >
              <h3 className="text-2xl md:text-3xl font-bold font-inter text-white leading-tight mb-3">
                Ready to start?
              </h3>
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed mb-6">
                Tell us where you're going and we'll come back within 24–72
                hours with next steps. Free, no obligation.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
              >
                Check your eligibility
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
