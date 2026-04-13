// HomePage.js
//
// Section order is intentional and modeled after the Visora theme:
//
//   1. Hero               full-bleed photo + headline + dual CTAs
//   2. Stats              4 X+ counters (immediate trust signal)
//   3. Services grid      7 service cards (file is named ScamTypes.js, see CLAUDE.md)
//   4. About              asymmetric image+text + 5 trust pillars
//   5. How It Works       4-step process explainer
//   6. Country showcase   6 destination cards
//   7. CTA banner         country/service form → /contact
//   8. FAQs               accordion
//
// Removed from the previous version:
//   - <MediaSection /> "As seen on" press logos, the press logos (BBC, Daily
//     Mail, etc.) were leftover from a prior brand and would be misleading to
//     show as Somygo coverage. The Stats counter replaces its trust-signaling
//     role honestly.

import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ScamTypes from '../components/ScamTypes';
import AboutComponent from '../components/AboutComponent';
import HowItWorksComponent from '../components/HowItWorksComponent';
import CountryShowcase from '../components/CountryShowcase';
import CTABanner from '../components/CTABanner';
import FAQs from '../components/FAQs';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ScamTypes />
      <AboutComponent />
      <HowItWorksComponent />
      <CountryShowcase />
      <CTABanner />
      <FAQs />
    </div>
  );
};

export default HomePage;
