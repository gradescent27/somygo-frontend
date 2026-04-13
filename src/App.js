
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import FormManagement from './pages/FormManagement';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import WhyAC from './pages/WhyAC';
import Cookie from './pages/Cookie';
import Terms from './pages/Terms';
import Policy from './pages/Policy';
import SkilledWorkerEmploymentVisas from './pages/SkilledWorkerEmploymentVisas';
import StudyPermitsGraduatePathways from './pages/StudyPermitsGraduatePathways';
import FamilyDependentVisas from './pages/FamilyDependentVisas';
import PermanentResidenceCitizenship from './pages/PermanentResidenceCitizenship';
import InvestorEntrepreneurVisas from './pages/InvestorEntrepreneurVisas';
import VisitorShortStay from './pages/VisitorShortStay';
import AppealsComplexCases from './pages/AppealsComplexCases';
import UnitedStates from './pages/UnitedStates';
import Canada from './pages/Canada';
import UnitedKingdom from './pages/UnitedKingdom';
import EuropeanUnion from './pages/EuropeanUnion';
import Australia from './pages/Australia';
import UAE from './pages/UAE';
import Contact from './pages/Contact';
// Deprecated: re-enable when Phase 2.1 backend is complete (see ROADMAP.md)
// import InvoicePayments from './pages/InvoicePayments';
// import ManageInvoices from './pages/ManageInvoices';
import InvoiceCatalog from './pages/InvoiceCatalog';
import ManageCatlogInvoices from './pages/ManageCatlogInvoices';
import NotFound from './pages/NotFound';

// Routes where Header and Footer should NOT render (admin/internal pages)
const CHROMELESS_PREFIXES = ['/invoice', '/forms'];

const AppLayout = () => {
  const { pathname } = useLocation();
  const isChromeless = CHROMELESS_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <>
      <ScrollToTop />
      <SEO />
      {!isChromeless && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/why-us" element={<WhyAC />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/cookie-policy" element={<Cookie />} />
        <Route path="/services/skilled-worker-employment" element={<SkilledWorkerEmploymentVisas />} />
        <Route path="/services/skilled-worker-employment-visas" element={<SkilledWorkerEmploymentVisas />} />
        <Route path="/services/study-permits-graduate-pathways" element={<StudyPermitsGraduatePathways />} />
        <Route path="/services/family-and-dependent-visas" element={<FamilyDependentVisas />} />
        <Route path="/services/permanent-residence-and-citizenship" element={<PermanentResidenceCitizenship />} />
        <Route path="/services/investor-and-entrepreneur-routes" element={<InvestorEntrepreneurVisas />} />
        <Route path="/services/visitor-and-short-stay" element={<VisitorShortStay />} />
        <Route path="/services/appeals-and-complex-cases" element={<AppealsComplexCases />} />
        <Route path="/countries/united-states" element={<UnitedStates />} />
        <Route path="/countries/canada" element={<Canada />} />
        <Route path="/countries/united-kingdom" element={<UnitedKingdom />} />
        <Route path="/countries/european-union" element={<EuropeanUnion />} />
        <Route path="/countries/australia" element={<Australia />} />
        <Route path="/countries/uae" element={<UAE />} />
        <Route path="/contact" element={<Contact />} />
        {/* Deprecated: core payment flow (Flutterwave). Backend not implemented yet.
            Files kept for reference: src/pages/InvoicePayments.js, src/pages/ManageInvoices.js */}
        {/* <Route path="/invoice/payments" element={<InvoicePayments />} /> */}
        <Route path="/invoice/pay" element={<InvoiceCatalog />} />
        <Route path="/invoice/manage" element={<ManageCatlogInvoices />} />
        <Route path="/forms/jndfe8939434ndfd" element={<FormManagement />} />

        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isChromeless && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
