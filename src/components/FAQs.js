// FAQs.js
// Accordion FAQ section. Reads questions from src/data/faqData.json.

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from '../data/faqData.json';

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-acBg py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-acGold/20 border border-acGold/40">
            <span className="text-xs font-bold tracking-wider text-acblue uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter text-acBlack leading-tight mb-4">
            Questions, answered.
          </h2>
          <p className="text-base md:text-lg text-acGray font-light">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-acGold/40 shadow-lg'
                    : 'border-gray-100 hover:border-acGold/30'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full text-left flex justify-between items-center gap-6 px-6 md:px-8 py-5 md:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-acGold rounded-2xl"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base md:text-lg text-acBlack font-inter">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                      isOpen
                        ? 'bg-acblue text-white'
                        : 'bg-acblue/5 text-acblue'
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={18} strokeWidth={2.5} />
                    ) : (
                      <Plus size={18} strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 text-acGray font-light leading-relaxed text-sm md:text-base">
                        {faq.answer.map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions footer */}
        <motion.div
          className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-acGold/15 mb-4">
            <HelpCircle size={22} className="text-acblue" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-acBlack mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-acGray font-light mb-5 max-w-md mx-auto">
            Our team usually replies within 24–72 hours, often the same day for
            urgent cases.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-acblue font-semibold border-b-2 border-acGold pb-1 hover:gap-3 transition-all"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
