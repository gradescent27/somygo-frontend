// Contact.js
//
// Form submits to the backend (POST /api/somygo/contact) which emails the
// enquiry to info@somygo.com. Netlify Forms hidden form in index.html is
// kept as a backup capture but the primary path is the backend API.

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVER_BASE_URL } from "../constants";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  FileText,
  Users,
  CheckCircle2,
  Send,
  ArrowRight,
  Shield,
  Receipt,
  AlertCircle,
} from "lucide-react";

const SERVICES = [
  { value: "", label: "Choose a service" },
  {
    value: "skilled-worker-employment-visas",
    label: "Skilled Worker / Employment",
  },
  {
    value: "study-permits-graduate-pathways",
    label: "Study Permits & Graduate Pathways",
  },
  { value: "family-and-dependent-visas", label: "Family & Dependent Visas" },
  {
    value: "permanent-residence-and-citizenship",
    label: "Permanent Residence & Citizenship",
  },
  {
    value: "investor-and-entrepreneur-routes",
    label: "Investor & Entrepreneur",
  },
  { value: "visitor-and-short-stay", label: "Visitor & Short-Stay" },
  { value: "appeals-and-complex-cases", label: "Appeals & Complex Cases" },
  { value: "other", label: "Not sure / something else" },
];

const COUNTRIES = [
  { value: "", label: "Choose a destination" },
  { value: "united-states", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "european-union", label: "European Union (EU)" },
  { value: "australia", label: "Australia" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "other", label: "Other / not sure" },
];

const ROLE_EMAILS = [
  {
    title: "General enquiries",
    email: "info@somygo.com",
    icon: Mail,
  },
  {
    title: "Privacy & data",
    email: "privacy@somygo.com",
    icon: Shield,
  },
  {
    title: "Legal",
    email: "legal@somygo.com",
    icon: FileText,
  },
  {
    title: "Billing",
    email: "billing@somygo.com",
    icon: Receipt,
  },
  {
    title: "Complaints",
    email: "complaints@somygo.com",
    icon: AlertCircle,
  },
];

const NEXT_STEPS = [
  {
    n: "01",
    title: "You submit",
    text: "Tell us where you're going and what you need. Takes 2 minutes.",
  },
  {
    n: "02",
    title: "We review",
    text: "A consultant reads your case and replies within 24–72 hours.",
  },
  {
    n: "03",
    title: "Tailored next steps",
    text: "You get a free eligibility call and a personalised checklist.",
  },
];

const Contact = () => {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill country/service from URL params (CTABanner submits these)
  useEffect(() => {
    const country = searchParams.get("country") || "";
    const service = searchParams.get("service") || "";
    if (country || service) {
      setForm((prev) => ({ ...prev, country, service }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/somygo/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Submission failed (${response.status})`,
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
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
              Get In Touch
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-acBlack leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's talk about <span className="text-acblue">your case.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-acGray font-light max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Send us a short summary of your case and we'll get back to you
            within 24–72 hours, often the same day for urgent cases. No charge,
            no obligation.
          </motion.p>

          <motion.a
            href="mailto:info@somygo.com"
            className="group inline-flex items-center gap-2 bg-acGold hover:bg-yellow-400 text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Mail size={18} strokeWidth={2} />
            Email info@somygo.com
          </motion.a>
        </div>
      </section>

      {/* ── 2. Main: info grid ────────────────────────────────────────── */}
      {/*
        NOTE: contact form is temporarily disabled. The full form JSX is
        wrapped in `{false && (...)}` below so the code, state, handlers,
        and imports all stay intact. Flip to `{true && (...)}` (or remove
        the `false &&`) to re-enable it.
     */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* ── Disabled form (kept as reference) ────────────────────── */}
          {false && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-10">
                {status === "success" ? (
                  /* ── Success state ── */
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-acGold/15 mb-5">
                      <CheckCircle2
                        size={32}
                        className="text-acblue"
                        strokeWidth={2}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack mb-3">
                      Thanks, we've got it.
                    </h2>
                    <p className="text-acGray font-light max-w-md mx-auto mb-6">
                      A consultant will read your case and reply within 24–72
                      hours, often the same day for urgent cases.
                    </p>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          country: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="text-acblue font-semibold border-b-2 border-acGold pb-1 hover:gap-3 transition-all"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  /* ── Form state ── */
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                  >
                    {/* Required hidden inputs for Netlify Forms */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human:{" "}
                        <input name="bot-field" />
                      </label>
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack mb-2">
                      Tell us about your case
                    </h2>
                    <p className="text-sm text-acGray font-light mb-8">
                      All fields marked with{" "}
                      <span className="text-acblue">*</span> are required.
                    </p>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-acBlack mb-2"
                        >
                          Full name <span className="text-acblue">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-acBlack mb-2"
                        >
                          Email <span className="text-acblue">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-acBlack mb-2"
                      >
                        Phone{" "}
                        <span className="text-acGray font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
                        placeholder="+44 ... or +1 ..."
                      />
                    </div>

                    {/* Country + Service row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-semibold text-acBlack mb-2"
                        >
                          Destination <span className="text-acblue">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack focus:outline-none focus:border-acGold focus:bg-white transition cursor-pointer"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-semibold text-acBlack mb-2"
                        >
                          Service <span className="text-acblue">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack focus:outline-none focus:border-acGold focus:bg-white transition cursor-pointer"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-acBlack mb-2"
                      >
                        Brief description of your case{" "}
                        <span className="text-acblue">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition resize-none"
                        placeholder="A short summary of your situation: where you are now, where you want to go, any deadlines or prior visa decisions..."
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-2 w-full md:w-auto bg-acGold hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
                    >
                      {status === "submitting" ? (
                        "Sending..."
                      ) : (
                        <>
                          Send my case
                          <Send
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
          {/* ── End disabled form ────────────────────────────────────── */}

          {/* Info grid: 3 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Response time card */}
            <motion.div
              className="bg-acblue text-white rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-acGold/20 mb-4">
                <Clock size={22} className="text-acGold" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold font-inter text-white mb-2">
                Response time
              </h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                We reply within{" "}
                <strong className="text-acGold">24–72 hours</strong> on business
                days. Urgent-deadline cases are triaged the same day where
                possible.
              </p>
            </motion.div>

            {/* What happens next */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-bold font-inter text-acBlack mb-5">
                What happens next
              </h3>
              <ul className="space-y-4">
                {NEXT_STEPS.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="flex-shrink-0 text-2xl font-bold text-acGold leading-none select-none">
                      {step.n}
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-acBlack mb-0.5">
                        {step.title}
                      </div>
                      <p className="text-xs text-acGray font-light leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Role-based emails */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-bold font-inter text-acBlack mb-4">
                Specific enquiries
              </h3>
              <ul className="space-y-3">
                {ROLE_EMAILS.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <li key={contact.email}>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-start gap-3 group"
                      >
                        <Icon
                          size={16}
                          className="text-acGold flex-shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <div>
                          <div className="text-xs text-acGray font-medium">
                            {contact.title}
                          </div>
                          <div className="text-sm text-acBlack group-hover:text-acblue transition-colors font-medium">
                            {contact.email}
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Offices ────────────────────────────────────────────────── */}
      <section className="bg-acBg py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
              <span className="text-xs font-bold tracking-wider text-acblue uppercase">
                Our Offices
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
              Two hubs. <span className="text-acblue">Global coverage.</span>
            </h2>
            <p className="text-base md:text-lg text-acGray font-light">
              Walk in, call, or email, whichever suits you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UK Office */}
            <motion.div
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acGold/15">
                  <MapPin
                    size={24}
                    className="text-acblue"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-acGold uppercase">
                    United Kingdom · EMEA
                  </div>
                  <h3 className="text-xl font-bold font-inter text-acBlack">
                    UK Office
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm text-acGray font-light">
                <p className="leading-relaxed">
                  42 Fords Park Road, London, England, E16 1NL, United Kingdom
                </p>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span>Mon–Fri, 09:00–18:00 GMT/BST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <a
                      href="tel:+4407457424280"
                      className="hover:text-acblue transition-colors"
                    >
                      +44 (0)74 5742 4280
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <a
                      href="mailto:info@somygo.com"
                      className="hover:text-acblue transition-colors"
                    >
                      info@somygo.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* US Office */}
            <motion.div
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acGold/15">
                  <MapPin
                    size={24}
                    className="text-acblue"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider text-acGold uppercase">
                    United States · APAC
                  </div>
                  <h3 className="text-xl font-bold font-inter text-acBlack">
                    US Office
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm text-acGray font-light">
                <p className="leading-relaxed">
                  1 City Center, Portland, ME 04101
                </p>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span>
                      Mon–Fri, 09:00–18:00 ET (with evening overlap for APAC)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <a
                      href="tel:+13212207399"
                      className="hover:text-acblue transition-colors"
                    >
                      +1 (321) 220-7399
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail
                      size={14}
                      className="text-acGold flex-shrink-0"
                      strokeWidth={2}
                    />
                    <a
                      href="mailto:info@somygo.com"
                      className="hover:text-acblue transition-colors"
                    >
                      info@somygo.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

// // Contact.js
// //
// // Form submits to the backend (POST /api/somygo/contact) which emails the
// // enquiry to info@somygo.com. Netlify Forms hidden form in index.html is
// // kept as a backup capture but the primary path is the backend API.

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { SERVER_BASE_URL } from '../constants';
// import { motion } from 'framer-motion';
// import {
//   Mail,
//   Phone,
//   Clock,
//   MapPin,
//   FileText,
//   Users,
//   CheckCircle2,
//   Send,
//   ArrowRight,
//   Shield,
//   Receipt,
//   AlertCircle,
// } from 'lucide-react';

// const SERVICES = [
//   { value: '', label: 'Choose a service' },
//   { value: 'skilled-worker-employment-visas', label: 'Skilled Worker / Employment' },
//   { value: 'study-permits-graduate-pathways', label: 'Study Permits & Graduate Pathways' },
//   { value: 'family-and-dependent-visas', label: 'Family & Dependent Visas' },
//   { value: 'permanent-residence-and-citizenship', label: 'Permanent Residence & Citizenship' },
//   { value: 'investor-and-entrepreneur-routes', label: 'Investor & Entrepreneur' },
//   { value: 'visitor-and-short-stay', label: 'Visitor & Short-Stay' },
//   { value: 'appeals-and-complex-cases', label: 'Appeals & Complex Cases' },
//   { value: 'other', label: 'Not sure / something else' },
// ];

// const COUNTRIES = [
//   { value: '', label: 'Choose a destination' },
//   { value: 'united-states', label: 'United States' },
//   { value: 'canada', label: 'Canada' },
//   { value: 'united-kingdom', label: 'United Kingdom' },
//   { value: 'european-union', label: 'European Union (EU)' },
//   { value: 'australia', label: 'Australia' },
//   { value: 'uae', label: 'United Arab Emirates' },
//   { value: 'other', label: 'Other / not sure' },
// ];

// const ROLE_EMAILS = [
//   {
//     title: 'General enquiries',
//     email: 'info@somygo.com',
//     icon: Mail,
//   },
//   {
//     title: 'Privacy & data',
//     email: 'privacy@somygo.com',
//     icon: Shield,
//   },
//   {
//     title: 'Legal',
//     email: 'legal@somygo.com',
//     icon: FileText,
//   },
//   {
//     title: 'Billing',
//     email: 'billing@somygo.com',
//     icon: Receipt,
//   },
//   {
//     title: 'Complaints',
//     email: 'complaints@somygo.com',
//     icon: AlertCircle,
//   },
// ];

// const NEXT_STEPS = [
//   {
//     n: '01',
//     title: 'You submit',
//     text: 'Tell us where you\'re going and what you need. Takes 2 minutes.',
//   },
//   {
//     n: '02',
//     title: 'We review',
//     text: 'A consultant reads your case and replies within 24–72 hours.',
//   },
//   {
//     n: '03',
//     title: 'Tailored next steps',
//     text: 'You get a free eligibility call and a personalised checklist.',
//   },
// ];

// const Contact = () => {
//   const [searchParams] = useSearchParams();

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     country: '',
//     service: '',
//     message: '',
//   });
//   const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
//   const [errorMsg, setErrorMsg] = useState('');

//   // Pre-fill country/service from URL params (CTABanner submits these)
//   useEffect(() => {
//     const country = searchParams.get('country') || '';
//     const service = searchParams.get('service') || '';
//     if (country || service) {
//       setForm((prev) => ({ ...prev, country, service }));
//     }
//   }, [searchParams]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('submitting');
//     setErrorMsg('');

//     try {
//       const response = await fetch(`${SERVER_BASE_URL}/api/somygo/contact`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || `Submission failed (${response.status})`);
//       }

//       setStatus('success');
//     } catch (err) {
//       setStatus('error');
//       setErrorMsg(err.message || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-white">
//       {/* ── 1. Hero ───────────────────────────────────────────────────── */}
//       <section className="relative bg-acBg py-20 md:py-28 px-6 overflow-hidden">
//         <div
//           className="absolute top-0 right-0 w-96 h-96 bg-acGold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
//           aria-hidden="true"
//         />
//         <div
//           className="absolute bottom-0 left-0 w-80 h-80 bg-acblue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
//           aria-hidden="true"
//         />

//         <div className="relative max-w-4xl mx-auto text-center">
//           <motion.div
//             className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <span className="text-xs font-bold tracking-wider text-acblue uppercase">
//               Get In Touch
//             </span>
//           </motion.div>

//           <motion.h1
//             className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-acBlack leading-tight mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             Let's talk about{' '}
//             <span className="text-acblue">your case.</span>
//           </motion.h1>

//           <motion.p
//             className="text-base md:text-lg text-acGray font-light max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             Tell us where you're going and what you need. We respond within
//             24–72 hours, often the same day for urgent cases. No charge, no
//             obligation.
//           </motion.p>
//         </div>
//       </section>

//       {/* ── 2. Main: form + sidebar ───────────────────────────────────── */}
//       <section className="py-20 md:py-28 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
//             {/* Form column, wider */}
//             <motion.div
//               className="lg:col-span-2"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-10">
//                 {status === 'success' ? (
//                   /* ── Success state ── */
//                   <div className="text-center py-10">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-acGold/15 mb-5">
//                       <CheckCircle2
//                         size={32}
//                         className="text-acblue"
//                         strokeWidth={2}
//                       />
//                     </div>
//                     <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack mb-3">
//                       Thanks, we've got it.
//                     </h2>
//                     <p className="text-acGray font-light max-w-md mx-auto mb-6">
//                       A consultant will read your case and reply within 24–72
//                       hours, often the same day for urgent cases.
//                     </p>
//                     <button
//                       onClick={() => {
//                         setStatus('idle');
//                         setForm({
//                           name: '',
//                           email: '',
//                           phone: '',
//                           country: '',
//                           service: '',
//                           message: '',
//                         });
//                       }}
//                       className="text-acblue font-semibold border-b-2 border-acGold pb-1 hover:gap-3 transition-all"
//                     >
//                       Send another message
//                     </button>
//                   </div>
//                 ) : (
//                   /* ── Form state ── */
//                   <form
//                     name="contact"
//                     method="POST"
//                     data-netlify="true"
//                     data-netlify-honeypot="bot-field"
//                     onSubmit={handleSubmit}
//                   >
//                     {/* Required hidden inputs for Netlify Forms */}
//                     <input type="hidden" name="form-name" value="contact" />
//                     <p className="hidden">
//                       <label>
//                         Don't fill this out if you're human:{' '}
//                         <input name="bot-field" />
//                       </label>
//                     </p>

//                     <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack mb-2">
//                       Tell us about your case
//                     </h2>
//                     <p className="text-sm text-acGray font-light mb-8">
//                       All fields marked with <span className="text-acblue">*</span> are required.
//                     </p>

//                     {/* Name + Email row */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-semibold text-acBlack mb-2"
//                         >
//                           Full name <span className="text-acblue">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           id="name"
//                           name="name"
//                           value={form.name}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
//                           placeholder="Your name"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-semibold text-acBlack mb-2"
//                         >
//                           Email <span className="text-acblue">*</span>
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={form.email}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
//                           placeholder="you@example.com"
//                         />
//                       </div>
//                     </div>

//                     {/* Phone */}
//                     <div className="mb-5">
//                       <label
//                         htmlFor="phone"
//                         className="block text-sm font-semibold text-acBlack mb-2"
//                       >
//                         Phone{' '}
//                         <span className="text-acGray font-normal">(optional)</span>
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={form.phone}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition"
//                         placeholder="+44 ... or +1 ..."
//                       />
//                     </div>

//                     {/* Country + Service row */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//                       <div>
//                         <label
//                           htmlFor="country"
//                           className="block text-sm font-semibold text-acBlack mb-2"
//                         >
//                           Destination <span className="text-acblue">*</span>
//                         </label>
//                         <select
//                           id="country"
//                           name="country"
//                           value={form.country}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack focus:outline-none focus:border-acGold focus:bg-white transition cursor-pointer"
//                         >
//                           {COUNTRIES.map((c) => (
//                             <option key={c.value} value={c.value}>
//                               {c.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="service"
//                           className="block text-sm font-semibold text-acBlack mb-2"
//                         >
//                           Service <span className="text-acblue">*</span>
//                         </label>
//                         <select
//                           id="service"
//                           name="service"
//                           value={form.service}
//                           onChange={handleChange}
//                           required
//                           className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack focus:outline-none focus:border-acGold focus:bg-white transition cursor-pointer"
//                         >
//                           {SERVICES.map((s) => (
//                             <option key={s.value} value={s.value}>
//                               {s.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Message */}
//                     <div className="mb-6">
//                       <label
//                         htmlFor="message"
//                         className="block text-sm font-semibold text-acBlack mb-2"
//                       >
//                         Brief description of your case{' '}
//                         <span className="text-acblue">*</span>
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         value={form.message}
//                         onChange={handleChange}
//                         required
//                         rows={5}
//                         className="w-full px-4 py-3 bg-acBg border border-transparent rounded-xl text-acBlack placeholder:text-acGray focus:outline-none focus:border-acGold focus:bg-white transition resize-none"
//                         placeholder="A short summary of your situation: where you are now, where you want to go, any deadlines or prior visa decisions..."
//                       />
//                     </div>

//                     {/* Error */}
//                     {status === 'error' && (
//                       <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
//                         {errorMsg}
//                       </div>
//                     )}

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       disabled={status === 'submitting'}
//                       className="group inline-flex items-center justify-center gap-2 w-full md:w-auto bg-acGold hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-acBlack font-semibold px-7 py-4 rounded-full transition-all shadow-lg shadow-acGold/30"
//                     >
//                       {status === 'submitting' ? (
//                         'Sending...'
//                       ) : (
//                         <>
//                           Send my case
//                           <Send
//                             size={18}
//                             className="transition-transform group-hover:translate-x-1"
//                           />
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </motion.div>

//             {/* Sidebar */}
//             <motion.aside
//               className="space-y-6"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               viewport={{ once: true }}
//             >
//               {/* Response time card */}
//               <div className="bg-acblue text-white rounded-2xl p-6">
//                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-acGold/20 mb-4">
//                   <Clock size={22} className="text-acGold" strokeWidth={2} />
//                 </div>
//                 <h3 className="text-lg font-bold font-inter text-white mb-2">
//                   Response time
//                 </h3>
//                 <p className="text-sm text-white/80 font-light leading-relaxed">
//                   We reply within <strong className="text-acGold">24–72 hours</strong>{' '}
//                   on business days. Urgent-deadline cases are triaged the same
//                   day where possible.
//                 </p>
//               </div>

//               {/* What happens next */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                 <h3 className="text-base font-bold font-inter text-acBlack mb-5">
//                   What happens next
//                 </h3>
//                 <ul className="space-y-4">
//                   {NEXT_STEPS.map((step) => (
//                     <li key={step.n} className="flex gap-4">
//                       <span className="flex-shrink-0 text-2xl font-bold text-acGold leading-none select-none">
//                         {step.n}
//                       </span>
//                       <div>
//                         <div className="font-semibold text-sm text-acBlack mb-0.5">
//                           {step.title}
//                         </div>
//                         <p className="text-xs text-acGray font-light leading-relaxed">
//                           {step.text}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Role-based emails */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                 <h3 className="text-base font-bold font-inter text-acBlack mb-4">
//                   Specific enquiries
//                 </h3>
//                 <ul className="space-y-3">
//                   {ROLE_EMAILS.map((contact) => {
//                     const Icon = contact.icon;
//                     return (
//                       <li key={contact.email}>
//                         <a
//                           href={`mailto:${contact.email}`}
//                           className="flex items-start gap-3 group"
//                         >
//                           <Icon
//                             size={16}
//                             className="text-acGold flex-shrink-0 mt-0.5"
//                             strokeWidth={2}
//                           />
//                           <div>
//                             <div className="text-xs text-acGray font-medium">
//                               {contact.title}
//                             </div>
//                             <div className="text-sm text-acBlack group-hover:text-acblue transition-colors font-medium">
//                               {contact.email}
//                             </div>
//                           </div>
//                         </a>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </motion.aside>
//           </div>
//         </div>
//       </section>

//       {/* ── 3. Offices ────────────────────────────────────────────────── */}
//       <section className="bg-acBg py-20 md:py-28 px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             className="max-w-2xl mx-auto text-center mb-14"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
//               <span className="text-xs font-bold tracking-wider text-acblue uppercase">
//                 Our Offices
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
//               Two hubs.{' '}
//               <span className="text-acblue">Global coverage.</span>
//             </h2>
//             <p className="text-base md:text-lg text-acGray font-light">
//               Walk in, call, or email, whichever suits you.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* UK Office */}
//             <motion.div
//               className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow"
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="flex items-center gap-4 mb-5">
//                 <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acGold/15">
//                   <MapPin
//                     size={24}
//                     className="text-acblue"
//                     strokeWidth={1.75}
//                   />
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold tracking-wider text-acGold uppercase">
//                     United Kingdom · EMEA
//                   </div>
//                   <h3 className="text-xl font-bold font-inter text-acBlack">
//                     UK Office
//                   </h3>
//                 </div>
//               </div>

//               <div className="space-y-3 text-sm text-acGray font-light">
//                 <p className="leading-relaxed">
//                   42 Fords Park Road, London, England, E16 1NL, United
//                   Kingdom
//                 </p>
//                 <div className="pt-3 border-t border-gray-100 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Clock size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <span>Mon–Fri, 09:00–18:00 GMT/BST</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <a
//                       href="tel:+4407457424280"
//                       className="hover:text-acblue transition-colors"
//                     >
//                       +44 (0)74 5742 4280
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <a
//                       href="mailto:info@somygo.com"
//                       className="hover:text-acblue transition-colors"
//                     >
//                       info@somygo.com
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* US Office */}
//             <motion.div
//               className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow"
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               <div className="flex items-center gap-4 mb-5">
//                 <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-acGold/15">
//                   <MapPin
//                     size={24}
//                     className="text-acblue"
//                     strokeWidth={1.75}
//                   />
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold tracking-wider text-acGold uppercase">
//                     United States · APAC
//                   </div>
//                   <h3 className="text-xl font-bold font-inter text-acBlack">
//                     US Office
//                   </h3>
//                 </div>
//               </div>

//               <div className="space-y-3 text-sm text-acGray font-light">
//                 <p className="leading-relaxed">
//                   1 City Center, Portland, ME 04101
//                 </p>
//                 <div className="pt-3 border-t border-gray-100 space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Clock size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <span>Mon–Fri, 09:00–18:00 ET (with evening overlap for APAC)</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <a
//                       href="tel:+13212207399"
//                       className="hover:text-acblue transition-colors"
//                     >
//                       +1 (321) 220-7399
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail size={14} className="text-acGold flex-shrink-0" strokeWidth={2} />
//                     <a
//                       href="mailto:info@somygo.com"
//                       className="hover:text-acblue transition-colors"
//                     >
//                       info@somygo.com
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;
