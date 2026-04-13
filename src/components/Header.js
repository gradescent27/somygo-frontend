// Header.js
//
// Sticky navigation with logo + Services dropdown + Countries dropdown + About
// + Contact. Minimalist by design, no phone number, no header CTA button (the
// hero and CTABanner already handle conversion).
//
// Active link state uses a subtle gold underline. Sticky on scroll with a
// subtle shadow when scrolled.

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/black_logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const servicesTimeoutRef = useRef(null);
  const { pathname } = useLocation();

  // Sticky-on-scroll shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsCountriesOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const countries = [
    {
      name: 'United States',
      slug: 'united-states',
      description:
        'Employment categories, family routes, adjustment of status, and consular processing.',
    },
    {
      name: 'Canada',
      slug: 'canada',
      description:
        'Express Entry, work permits (LMIA/exempt), study permits, and PNP options.',
    },
    {
      name: 'United Kingdom',
      slug: 'united-kingdom',
      description:
        'Skilled Worker route, sponsor licence guidance, Graduate route, family and settlement.',
    },
    {
      name: 'European Union (EU)',
      slug: 'european-union',
      description:
        'EU Blue Card, ICT Card, national work permits across member states, Schengen travel.',
    },
    {
      name: 'Australia',
      slug: 'australia',
      description:
        'Skilled visas, TSS/ENS sponsorship, GTE-compliant student pathways, partner visas.',
    },
    {
      name: 'UAE',
      slug: 'uae',
      description:
        'Employer sponsorship, free zone processing, family sponsorship, Golden Visa.',
    },
  ];

  const services = [
    {
      name: 'Skilled Worker / Employment Visas',
      slug: 'skilled-worker-employment',
      description: 'Role mapping, eligibility, end-to-end processing.',
    },
    {
      name: 'Study Permits & Graduate Pathways',
      slug: 'study-permits-graduate-pathways',
      description: 'Admissions, GTE/financials, post-study work routes.',
    },
    {
      name: 'Family & Dependent Visas',
      slug: 'family-and-dependent-visas',
      description: 'Spouse, partner, children, and reunification routes.',
    },
    {
      name: 'Permanent Residence & Citizenship',
      slug: 'permanent-residence-and-citizenship',
      description: 'Long-term planning, points-based programs, naturalisation.',
    },
    {
      name: 'Investor & Entrepreneur Routes',
      slug: 'investor-and-entrepreneur-routes',
      description: 'Business plans, source-of-funds guidance, filings.',
    },
    {
      name: 'Visitor & Short-Stay',
      slug: 'visitor-and-short-stay',
      description: 'Meetings, conferences, training, tourism.',
    },
    {
      name: 'Appeals & Complex Cases',
      slug: 'appeals-and-complex-cases',
      description: 'Strategy and coordination with licensed local counsel.',
    },
  ];

  const handleCountriesMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCountriesOpen(true);
  };
  const handleCountriesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsCountriesOpen(false), 150);
  };
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  };

  // Helpers for active link state
  const isActive = (path) => pathname === path;
  const isInSection = (prefix) => pathname.startsWith(prefix);

  // Reusable hover/active link class
  const navLinkClass = (active) =>
    `relative flex items-center transition-colors ${
      active ? 'text-acblue' : 'text-acBlack hover:text-acblue'
    }`;

  // Underline indicator for active links
  const ActiveUnderline = ({ show }) =>
    show ? (
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-acGold rounded-full"
      />
    ) : null;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        isScrolled ? 'shadow-md' : 'shadow-none border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" aria-label="Somygo home">
            <img src={logo} alt="Somygo" className="h-9 md:h-10" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-10 text-base font-semibold font-inter"
          aria-label="Primary"
        >
          {/* Services */}
          <div
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button className={navLinkClass(isInSection('/services'))}>
              Services
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${
                  isServicesOpen ? 'rotate-180' : ''
                }`}
              />
              <ActiveUnderline show={isInSection('/services')} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                <div className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="block px-5 py-3 hover:bg-acBg transition-colors group"
                    >
                      <div className="font-semibold text-acBlack group-hover:text-acblue text-sm leading-snug mb-0.5">
                        {service.name}
                      </div>
                      <div className="text-xs text-acGray font-light leading-relaxed">
                        {service.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Countries */}
          <div
            className="relative"
            onMouseEnter={handleCountriesMouseEnter}
            onMouseLeave={handleCountriesMouseLeave}
          >
            <button className={navLinkClass(isInSection('/countries'))}>
              Countries
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${
                  isCountriesOpen ? 'rotate-180' : ''
                }`}
              />
              <ActiveUnderline show={isInSection('/countries')} />
            </button>

            {isCountriesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                <div className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden">
                  {countries.map((country) => (
                    <Link
                      key={country.slug}
                      to={`/countries/${country.slug}`}
                      className="block px-5 py-3 hover:bg-acBg transition-colors group"
                    >
                      <div className="font-semibold text-acBlack group-hover:text-acblue text-sm leading-snug mb-0.5">
                        {country.name}
                      </div>
                      <div className="text-xs text-acGray font-light leading-relaxed">
                        {country.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/about" className={navLinkClass(isActive('/about'))}>
            About us
            <ActiveUnderline show={isActive('/about')} />
          </Link>
          <Link to="/contact" className={navLinkClass(isActive('/contact'))}>
            Contact
            <ActiveUnderline show={isActive('/contact')} />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-acBlack p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {/* Services accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 font-semibold text-acBlack hover:bg-acBg rounded-xl transition"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                aria-expanded={isServicesOpen}
              >
                Services
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isServicesOpen && (
                <div className="mt-2 ml-2 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm text-acGray hover:text-acblue hover:bg-acBg rounded-lg transition"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Countries accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 font-semibold text-acBlack hover:bg-acBg rounded-xl transition"
                onClick={() => setIsCountriesOpen(!isCountriesOpen)}
                aria-expanded={isCountriesOpen}
              >
                Countries
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isCountriesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isCountriesOpen && (
                <div className="mt-2 ml-2 space-y-1">
                  {countries.map((country) => (
                    <Link
                      key={country.slug}
                      to={`/countries/${country.slug}`}
                      className="block px-4 py-2 text-sm text-acGray hover:text-acblue hover:bg-acBg rounded-lg transition"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="block px-4 py-3 font-semibold text-acBlack hover:bg-acBg rounded-xl transition"
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 font-semibold text-acBlack hover:bg-acBg rounded-xl transition"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
