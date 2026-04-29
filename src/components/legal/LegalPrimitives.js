// LegalPrimitives.js
//
// Reusable building blocks for legal pages (Privacy, Terms, Cookie). Each
// legal page composes these primitives so we get consistent styling across
// all three without repeating Tailwind class noise hundreds of times.
//
// Exported pieces:
//   <LegalHero />               page hero with eyebrow, title, dates
//   <LegalEntityCard />         "Who we are" card showing company info
//   <LegalSection />            numbered/lettered section wrapper
//   <LegalContactBlock />       "Contact" block at the bottom of the page
//   <Callout />                 highlighted info/warning box
//   <DefinitionList />          definition list for "Definitions" sections

import React from "react";
import { motion } from "framer-motion";
import { Building, Mail, MapPin } from "lucide-react";
import {
  LEGAL_ENTITY,
  UK_OFFICE,
  US_OFFICE,
  ROLE_EMAILS,
} from "../../data/legal";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

/**
 * Page hero, eyebrow, title, effective/last-updated meta.
 */
export const LegalHero = ({ eyebrow, title, effectiveDate, lastUpdated }) => (
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

      {(effectiveDate || lastUpdated) && (
        <motion.div
          className="inline-flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-acGray font-light bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {effectiveDate && (
            <span>
              <strong className="text-acBlack">Effective:</strong>{" "}
              {effectiveDate}
            </span>
          )}
          {lastUpdated && (
            <span>
              <strong className="text-acBlack">Last updated:</strong>{" "}
              {lastUpdated}
            </span>
          )}
        </motion.div>
      )}
    </div>
  </section>
);

/**
 * "Who we are", entity info card. Reads from LEGAL_ENTITY constants.
 */
export const LegalEntityCard = () => (
  <section className="bg-white py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-acBg rounded-2xl p-8 md:p-10 border border-gray-100"
        {...fadeInUp}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white flex-shrink-0">
            <Building size={22} className="text-acblue" strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wider text-acGold uppercase mb-1">
              Who We Are
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-inter text-acBlack leading-snug">
              {LEGAL_ENTITY.tradingAs} is a trading name of {LEGAL_ENTITY.name}
            </h2>
          </div>
        </div>

        <dl className="space-y-3 text-sm md:text-base text-acGray font-light">
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="font-semibold text-acBlack sm:w-44 flex-shrink-0">
              Legal entity
            </dt>
            <dd>{LEGAL_ENTITY.name}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="font-semibold text-acBlack sm:w-44 flex-shrink-0">
              Trading as
            </dt>
            <dd>"{LEGAL_ENTITY.tradingAs}"</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="font-semibold text-acBlack sm:w-44 flex-shrink-0">
              Company number
            </dt>
            <dd>
              {LEGAL_ENTITY.companyNumber} ({LEGAL_ENTITY.jurisdiction})
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="font-semibold text-acBlack sm:w-44 flex-shrink-0">
              Registered office
            </dt>
            <dd>{LEGAL_ENTITY.registeredAddress}</dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="font-semibold text-acBlack sm:w-44 flex-shrink-0">
              Website
            </dt>
            <dd>somygo.co</dd>
          </div>
        </dl>
      </motion.div>
    </div>
  </section>
);

/**
 * Section wrapper, numbered or lettered, with optional icon and tone.
 *
 * Props:
 *   number     string, e.g. "1", "12.4"
 *   title      string
 *   tone       'default' | 'alt'   alt = soft acBg background, default = white
 *   children   the section body
 */
export const LegalSection = ({ number, title, tone = "default", children }) => {
  const bg = tone === "alt" ? "bg-acBg" : "bg-white";
  return (
    <section className={`${bg} py-12 md:py-16 px-6`}>
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp}>
          <div className="flex items-baseline gap-4 mb-6">
            {number && (
              <span className="text-2xl md:text-3xl font-bold text-acGold leading-none select-none">
                {number}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack leading-tight">
              {title}
            </h2>
          </div>
          <div className="prose prose-sm md:prose-base max-w-none text-acGray font-light leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-acBlack [&_strong]:font-semibold [&_ul]:space-y-2 [&_ul]:my-4 [&_ul]:pl-0 [&_li]:list-none [&_li]:pl-5 [&_li]:relative [&_li]:before:content-['•'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-acGold [&_li]:before:font-bold [&_a]:text-acblue [&_a]:underline [&_a:hover]:no-underline">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Highlighted callout box.
 *
 * Props:
 *   tone   'info' | 'warning' | 'success' | 'note'
 */
export const Callout = ({ tone = "info", children }) => {
  const tones = {
    info: "bg-acblue/5 border-acblue/30 text-acBlack",
    warning: "bg-acGold/10 border-acGold/40 text-acBlack",
    success: "bg-green-50 border-green-200 text-green-900",
    note: "bg-acBg border-gray-200 text-acBlack",
  };
  return (
    <div
      className={`my-5 p-5 rounded-2xl border ${tones[tone] || tones.info} font-light text-sm md:text-base leading-relaxed`}
    >
      {children}
    </div>
  );
};

/**
 * Definition list, used in "Definitions" sections.
 *
 * Props:
 *   items: [{ term, definition }]
 */
export const DefinitionList = ({ items = [] }) => (
  <dl className="space-y-3 mt-2">
    {items.map((item) => (
      <div
        key={item.term}
        className="bg-white border border-gray-100 rounded-xl p-4 md:p-5"
      >
        <dt className="font-semibold text-acBlack mb-1">{item.term}</dt>
        <dd className="text-acGray text-sm md:text-base font-light leading-relaxed">
          {item.definition}
        </dd>
      </div>
    ))}
  </dl>
);

/**
 * Contact block at the bottom of legal pages.
 *
 * Props:
 *   primaryEmail   string, e.g. ROLE_EMAILS.privacy
 *   primaryLabel   string, e.g. "Privacy contact"
 */
export const LegalContactBlock = ({
  primaryEmail = ROLE_EMAILS.legal,
  primaryLabel = "Legal contact",
}) => (
  <section className="bg-white py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="bg-acblue text-white rounded-3xl p-8 md:p-10"
        {...fadeInUp}
      >
        <div className="text-xs font-bold tracking-wider text-acGold uppercase mb-3">
          Contact
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-white leading-tight mb-6">
          Questions about this policy?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Primary contact + role emails */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-acGold uppercase tracking-wider mb-1">
                {primaryLabel}
              </div>
              <a
                href={`mailto:${primaryEmail}`}
                className="text-base font-semibold text-white hover:text-acGold transition-colors"
              >
                {primaryEmail}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold text-acGold uppercase tracking-wider mb-1">
                General enquiries
              </div>
              <a
                href={`mailto:${ROLE_EMAILS.general}`}
                className="text-base text-white/90 hover:text-acGold transition-colors"
              >
                {ROLE_EMAILS.general}
              </a>
            </div>
          </div>

          {/* Postal */}
          <div>
            <div className="text-xs font-semibold text-acGold uppercase tracking-wider mb-1">
              Postal address
            </div>
            <div className="flex items-start gap-2 text-sm text-white/90 font-light leading-relaxed">
              <MapPin
                size={14}
                className="text-acGold flex-shrink-0 mt-1"
                strokeWidth={2}
              />
              <span>
                {LEGAL_ENTITY.name} (t/a {LEGAL_ENTITY.tradingAs})
                <br />
                {LEGAL_ENTITY.registeredAddress}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/**
 * Office grid showing both UK and US offices. Used on legal pages that
 * include an "Offices & contact" section (Privacy, Cookie).
 */
export const LegalOfficesGrid = () => (
  <section className="bg-acBg py-16 md:py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.div className="mb-8" {...fadeInUp}>
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack mb-2">
          Offices & contact
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[UK_OFFICE, US_OFFICE].map((office) => (
          <motion.div
            key={office.cityShort}
            className="bg-white rounded-2xl p-6 border border-gray-100"
            {...fadeInUp}
          >
            <div className="text-xs font-bold tracking-wider text-acGold uppercase mb-2">
              {office.region}
            </div>
            <h3 className="text-lg font-bold font-inter text-acBlack mb-3">
              {office.cityShort}
            </h3>
            <div className="space-y-2 text-sm text-acGray font-light">
              <p className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="text-acGold flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span>{office.address}</span>
              </p>
              <p className="flex items-start gap-2 pl-6">
                {office.phone} · {office.email}
              </p>
              <p className="pl-6 text-xs text-acGray">{office.hours}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
