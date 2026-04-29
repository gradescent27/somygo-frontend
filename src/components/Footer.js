// Footer.js
//
// Global footer rendered on every page. Modeled after the Visora theme:
// dark navy background, gold accents, multi-column layout, top CTA strip,
// office cards, services + support links, social icons, copyright bar.
//
// The top CTA section is intentionally lower-key than the homepage's
// CTABanner so the two don't compete on the homepage. On inner pages where
// CTABanner doesn't render, this CTA is the page's closing call to action.

import React from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import whiteLogo from "../assets/white_logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-acBlack text-white relative overflow-hidden">
      {/* Decorative gold accent shape */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-acGold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Top CTA strip ────────────────────────────────────────────────── */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold font-inter text-white leading-tight mb-2">
                Ready to start your journey?
              </h2>
              <p className="text-sm md:text-base text-white/70 font-light">
                Talk to a real consultant. We respond in 24–72 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-acGold/20"
              >
                Check eligibility
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center text-white border-2 border-white/30 hover:border-white hover:bg-white/5 font-semibold px-6 py-3 rounded-full transition-all"
              >
                How we work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main footer content ──────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column, wider */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Somygo home" className="inline-block mb-5">
              <img src={whiteLogo} alt="Somygo" className="h-10" />
            </Link>
            <p className="text-white/70 font-light text-sm leading-relaxed mb-6 max-w-sm">
              A global mobility partner helping individuals and families
              relocate across borders with clear pathways, compliant
              applications, and dedicated case management.
            </p>

            {/* Social icons: uncomment when real URLs are available
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-acGold hover:text-acBlack text-white/70 transition-colors"
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
            */}
          </div>

          {/* Services column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider text-acGold uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm font-light text-white/70">
              {[
                ["Skilled Worker", "/services/skilled-worker-employment-visas"],
                ["Study Permits", "/services/study-permits-graduate-pathways"],
                ["Family Visas", "/services/family-and-dependent-visas"],
                [
                  "Permanent Residence",
                  "/services/permanent-residence-and-citizenship",
                ],
                [
                  "Investor Routes",
                  "/services/investor-and-entrepreneur-routes",
                ],
                ["Visitor & Short-Stay", "/services/visitor-and-short-stay"],
                [
                  "Appeals & Complex Cases",
                  "/services/appeals-and-complex-cases",
                ],
              ].map(([label, route]) => (
                <li key={route}>
                  <Link
                    to={route}
                    className="hover:text-acGold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company / Support column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-wider text-acGold uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-light text-white/70">
              {[
                ["About us", "/about"],
                ["How it works", "/how-it-works"],
                ["Why Somygo", "/why-us"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms of Service", "/terms-of-service"],
                ["Cookie Policy", "/cookie-policy"],
              ].map(([label, route]) => (
                <li key={route}>
                  <Link
                    to={route}
                    className="hover:text-acGold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-wider text-acGold uppercase mb-5">
              Offices
            </h4>

            {/* UK */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-white mb-2">
                United Kingdom
              </div>
              <div className="space-y-2 text-xs text-white/70 font-light">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={13}
                    className="mt-0.5 text-acGold flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span>42 Fords Park Road, London, England, E16 1NL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone
                    size={13}
                    className="text-acGold flex-shrink-0"
                    strokeWidth={2}
                  />
                  <a
                    href="tel:+4407457424280"
                    className="hover:text-acGold transition-colors"
                  >
                    +44 (0)74 5742 4280
                  </a>
                </div>
              </div>
            </div>

            {/* US */}
            <div>
              <div className="text-sm font-semibold text-white mb-2">
                United States
              </div>
              <div className="space-y-2 text-xs text-white/70 font-light">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={13}
                    className="mt-0.5 text-acGold flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span>1 City Center, Portland, ME 04101</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone
                    size={13}
                    className="text-acGold flex-shrink-0"
                    strokeWidth={2}
                  />
                  <a
                    href="tel:+13212207399"
                    className="hover:text-acGold transition-colors"
                  >
                    +1 (321) 220-7399
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General enquiries strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-white/70 font-light">
            <Mail size={15} className="text-acGold" strokeWidth={2} />
            <span>General enquiries:</span>
            <a
              href="mailto:info@somygo.co"
              className="text-white hover:text-acGold transition-colors font-medium"
            >
              info@somygo.co
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Clock size={13} className="text-acGold" strokeWidth={2} />
            <span>Mon–Fri, 09:00–18:00 (UK) · 09:00–18:00 ET (US)</span>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-white/50 font-light">
          <p>© {year} Somygo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
