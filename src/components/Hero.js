// Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />

      {/* Gradient overlay, heavy on the left where the headline sits, fading
          to transparent on the right so the family stays visible */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-acblue/95 via-acblue/70 to-acblue/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-acGold/20 border border-acGold/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Globe2 size={14} className="text-acGold" strokeWidth={2.5} />
            <span className="text-xs font-semibold tracking-wider text-white uppercase">
              Global Mobility Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-inter font-bold text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Relocate with confidence.
            <br />
            <span className="text-acGold">We handle the rest.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="text-base md:text-lg text-white/90 font-light max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            We help individuals and families relocate across borders.
            Clear pathways, compliant applications, and dedicated case
            management across the UK, US, Canada, EU, Australia, and the UAE.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30 hover:shadow-xl hover:shadow-acGold/40"
            >
              Check your eligibility
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-white border-2 border-white/40 hover:border-white hover:bg-white/10 font-semibold px-7 py-4 rounded-full transition-all backdrop-blur-sm"
            >
              How we work
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-white/80 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-acGold" strokeWidth={2} />
              <span>Compliance-first applications</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div>24–72h response · UK & US offices</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
