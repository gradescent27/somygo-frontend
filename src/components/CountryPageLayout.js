// CountryPageLayout.js
//
// Reusable layout shell for all 6 country detail pages. Each country page
// imports its own data file (src/data/countries/<slug>.js) and passes the
// data object to this component.
//
// Country pages are intentionally LEAN orienting landing pages, they
// answer "is this country right for me?". Deep how-to-apply detail per
// visa category lives on the service pages, not here.
//
// Data shape (see src/data/countries/*.js for examples):
//
//   {
//     iso: 'ca',                          // ISO-2 country code for flag
//     eyebrow: 'Canada',                  // shows above title
//     title: 'Practical Canadian immigration...',
//     intro: '...one-paragraph snapshot...',
//
//     audience: [
//       { icon: Briefcase, title: 'Professionals', text: 'Canadian job offer...' },
//       ...
//     ],
//
//     categories: [
//       { title: 'Employment & Business', text: 'LMIA work permits, IMP...' },
//       ...
//     ],
//
//     outcomes: [
//       { icon: FileText, title: 'Written plan', text: '...' },
//       ...
//     ],
//
//     notHandled: 'We do not handle refugee claims or removal defense.',
//   }

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const CountryPageLayout = ({ data }) => {
  const {
    iso,
    eyebrow,
    title,
    intro,
    audience = [],
    categories = [],
    outcomes = [],
    notHandled,
  } = data;

  return (
    <div className="bg-white">
      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Flag banner, hero background, slightly darkened */}
        <div className="absolute inset-0">
          <span
            className={`fi fi-${iso} absolute inset-0 w-full h-full`}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          {/* Dark navy gradient overlay for legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-acblue/95 via-acblue/85 to-acblue/60"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className={`fi fi-${iso} block w-10 h-7 rounded shadow-lg`}
                aria-hidden="true"
              />
              <div className="px-3 py-1 rounded-full bg-acGold/20 border border-acGold/40 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-wider text-white uppercase">
                  {eyebrow}
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-white/85 font-light leading-relaxed mb-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {intro}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
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
                className="inline-flex items-center justify-center text-white border-2 border-white/40 hover:border-white hover:bg-white/10 font-semibold px-7 py-4 rounded-full transition-all backdrop-blur-sm"
              >
                How we work
              </Link>
            </motion.div>
          </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="bg-acBg rounded-2xl p-7 hover:bg-acGold/10 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-4">
                      <Icon size={22} className="text-acblue" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base font-bold font-inter text-acBlack mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-acGray font-light leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. What we handle at a glance ─────────────────────────────── */}
      {categories.length > 0 && (
        <section className="bg-acBg py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  What We Handle
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
                The visa categories{' '}
                <span className="text-acblue">we cover.</span>
              </h2>
              <p className="text-base md:text-lg text-acGray font-light">
                For deeper how-to-apply detail, see our{' '}
                <Link
                  to="/services/skilled-worker-employment-visas"
                  className="text-acblue underline hover:no-underline"
                >
                  service pages
                </Link>
                .
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-acGold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold font-inter text-acBlack mb-3 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-acGray font-light leading-relaxed">
                    {cat.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {notHandled && (
              <p className="mt-10 text-center text-sm text-acGray font-light italic">
                {notHandled}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── 4. Outcomes you can expect ────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="bg-white py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div className="max-w-2xl mx-auto text-center mb-14" {...fadeInUp}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
                <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                  Outcomes
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight">
                What you'll{' '}
                <span className="text-acblue">walk away with.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <motion.div
                    key={outcome.title}
                    className="bg-acBg rounded-2xl p-7 hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white mb-5">
                      <Icon size={26} className="text-acblue" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold font-inter text-acBlack mb-3 leading-snug">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-acGray font-light leading-relaxed">
                      {outcome.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Closing CTA ────────────────────────────────────────────── */}
      <section className="relative bg-acblue py-20 md:py-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-acGold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-white leading-tight mb-4"
            {...fadeInUp}
          >
            Ready to start your{' '}
            <span className="text-acGold">{eyebrow}</span> case?
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-white/80 font-light max-w-xl mx-auto mb-8"
            {...fadeInUp}
          >
            Tell us where you're at and we'll come back within 24–72 hours
            with next steps. Free, no obligation.
          </motion.p>
          <motion.div {...fadeInUp}>
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
      </section>
    </div>
  );
};

export default CountryPageLayout;
