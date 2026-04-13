// CTABanner.js
//
// Mid-page conversion section: centered headline + inline form. The form
// currently navigates to /contact with the selections as URL params. When a
// real backend is wired up, swap the onSubmit to POST to the lead endpoint.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

const SERVICES = [
  { value: '', label: 'Choose a service' },
  { value: 'skilled-worker-employment-visas', label: 'Skilled Worker / Employment' },
  { value: 'study-permits-graduate-pathways', label: 'Study Permits & Graduate Pathways' },
  { value: 'family-and-dependent-visas', label: 'Family & Dependent Visas' },
  { value: 'permanent-residence-and-citizenship', label: 'Permanent Residence & Citizenship' },
  { value: 'investor-and-entrepreneur-routes', label: 'Investor & Entrepreneur' },
  { value: 'visitor-and-short-stay', label: 'Visitor & Short-Stay' },
  { value: 'appeals-and-complex-cases', label: 'Appeals & Complex Cases' },
];

const COUNTRIES = [
  { value: '', label: 'Choose a destination' },
  { value: 'united-states', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'european-union', label: 'European Union (EU)' },
  { value: 'australia', label: 'Australia' },
  { value: 'uae', label: 'United Arab Emirates' },
];

const CTABanner = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set('country', country);
    if (service) params.set('service', service);
    navigate(`/contact${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden bg-acblue">
      {/* Decorative gold accent shapes */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-acGold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-acGold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <MessageSquare size={14} className="text-acGold" strokeWidth={2.5} />
          <span className="text-xs font-semibold tracking-wider text-white uppercase">
            Get a free eligibility check
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-white leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Tell us where you're going.
          <br />
          <span className="text-acGold">We'll handle the rest.</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Pick your destination and the service you need. We respond within
          24–72 hours, often the same day for urgent cases.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl md:rounded-full border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="flex-1 bg-white text-acBlack px-5 py-4 rounded-xl md:rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-acGold cursor-pointer"
            aria-label="Select destination country"
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="flex-1 bg-white text-acBlack px-5 py-4 rounded-xl md:rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-acGold cursor-pointer"
            aria-label="Select service type"
          >
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-bold px-7 py-4 rounded-xl md:rounded-full transition-all whitespace-nowrap shadow-lg shadow-acGold/30"
          >
            Get started
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.form>

        <motion.p
          className="text-xs text-white/60 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Free consultation · No obligation · Confidential
        </motion.p>
      </div>
    </section>
  );
};

export default CTABanner;
