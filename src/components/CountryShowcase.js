// CountryShowcase.js
//
// 6 country cards with flag, name, brief positioning, and hover lift.
// Uses flag-icons CSS classes (imported in src/index.css). The flag class
// pattern is `fi fi-{iso2-lowercase}`.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const countries = [
  {
    name: 'United States',
    iso: 'us',
    description:
      'Employment-based categories, family routes, adjustment of status, and consular processing.',
    route: '/countries/united-states',
  },
  {
    name: 'Canada',
    iso: 'ca',
    description:
      'Express Entry, work permits (LMIA / LMIA-exempt), study permits, and PNP options.',
    route: '/countries/canada',
  },
  {
    name: 'United Kingdom',
    iso: 'gb',
    description:
      'Skilled Worker route, sponsor licence guidance, Graduate route, family and settlement.',
    route: '/countries/united-kingdom',
  },
  {
    name: 'European Union (EU)',
    iso: 'eu',
    description:
      'EU Blue Card, ICT Card, national work permits across member states, and Schengen travel.',
    route: '/countries/european-union',
  },
  {
    name: 'Australia',
    iso: 'au',
    description:
      'Skilled visas, TSS / ENS sponsorship, GTE-compliant student pathways, and partner visas.',
    route: '/countries/australia',
  },
  {
    name: 'United Arab Emirates',
    iso: 'ae',
    description:
      'Employer sponsorship, free zone processing, family sponsorship, and Golden Visa routes.',
    route: '/countries/uae',
  },
];

const CountryShowcase = () => {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
            <span className="text-xs font-bold tracking-wider text-acblue uppercase">
              Where We Operate
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
            Six destinations.{' '}
            <span className="text-acblue">One trusted partner.</span>
          </h2>
          <p className="text-base md:text-lg text-acGray font-light">
            Country-specific expertise across the routes that matter most to
            individuals and families.
          </p>
        </motion.div>

        {/* Country grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.iso}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                to={country.route}
                className="group relative block h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-acGold/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Flag banner, wide aspect, full bleed */}
                <div className="relative h-32 overflow-hidden">
                  <span
                    className={`fi fi-${country.iso} absolute inset-0 w-full h-full`}
                    style={{
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: 'scale(1.05)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Subtle dark overlay on hover for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-acblue/40 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold font-inter text-acBlack leading-snug">
                      {country.name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-acGray group-hover:text-acblue group-hover:rotate-45 transition-all flex-shrink-0 mt-1"
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className="text-sm text-acGray font-light leading-relaxed">
                    {country.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryShowcase;
