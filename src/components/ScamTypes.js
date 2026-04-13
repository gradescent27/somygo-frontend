// ScamTypes.js
//
// NOTE: filename is a leftover from a prior brand. This component actually
// renders the homepage "Services" grid (the migration pathways). Don't be
// confused, see CLAUDE.md "Vestigial / misleading names".
//
// Visual model: Visora theme services grid, image-top cards with icon
// overlay, title, description, and a subtle hover lift. We use Lucide icons
// instead of photo cards for now (no licensed imagery yet).

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  TrendingUp,
  Plane,
  Gavel,
} from 'lucide-react';

const services = [
  {
    title: 'Skilled Worker & Employment',
    description:
      'Role mapping, eligibility checks, and end-to-end filing for the major work-visa routes worldwide.',
    icon: Briefcase,
    route: '/services/skilled-worker-employment-visas',
  },
  {
    title: 'Study Permits & Graduate Pathways',
    description:
      'Admissions coordination, GTE and financial evidence, and post-study work options.',
    icon: GraduationCap,
    route: '/services/study-permits-graduate-pathways',
  },
  {
    title: 'Family & Dependent Visas',
    description:
      'Spouse, partner, and child visas, relationship evidence and reunification routes.',
    icon: Heart,
    route: '/services/family-and-dependent-visas',
  },
  {
    title: 'Permanent Residence & Citizenship',
    description:
      'Long-term planning: PR streams, points-based programs, and naturalisation.',
    icon: Shield,
    route: '/services/permanent-residence-and-citizenship',
  },
  {
    title: 'Investor & Entrepreneur',
    description:
      'Business plans, source-of-funds documentation, and filings for major investor routes.',
    icon: TrendingUp,
    route: '/services/investor-and-entrepreneur-routes',
  },
  {
    title: 'Visitor & Short-Stay',
    description:
      'Purpose-fit visas for meetings, conferences, training, and tourism.',
    icon: Plane,
    route: '/services/visitor-and-short-stay',
  },
  {
    title: 'Appeals & Complex Cases',
    description:
      'Refusals, overstays, and complex matters, strategy with licensed counsel where required.',
    icon: Gavel,
    route: '/services/appeals-and-complex-cases',
  },
];

const ScamTypes = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-acBg">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
            <span className="text-xs font-bold tracking-wider text-acblue uppercase">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
            Choose the pathway that fits your goal.
          </h2>
          <p className="text-base md:text-lg text-acGray font-light">
            We tailor the steps, documents, and timeline to your circumstances,
            whatever your destination.
          </p>
        </motion.div>

        {/* Services grid: 4 per row on desktop, wraps to 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  to={service.route}
                  className="group relative block h-full bg-white rounded-2xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-acGold/30"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acblue/5 group-hover:bg-acGold/15 transition-colors mb-5">
                    <Icon
                      size={26}
                      className="text-acblue group-hover:text-acblue transition-colors"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-inter text-acBlack mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-acGray font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn more arrow */}
                  <div className="flex items-center text-acblue text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                    Learn more
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScamTypes;
