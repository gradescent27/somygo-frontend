


import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import highlights from "../data/highlights.json";
import { motion } from "framer-motion";

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Show 3 items on desktop

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, highlights.length - visibleItems)
    );
  };

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-acBlack mb-6">
        Why Choose Us?
      </h2>
      <div className="relative flex items-center justify-center w-full mt-6">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 bg-acBlack text-white rounded-full p-3 z-10 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Highlights Container */}
        <div className="w-full max-w-5xl overflow-hidden ">
          <motion.div
            className="flex space-x-6"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="w-96 px-6 py-12  bg-acBg rounded-2xl shadow-md flex-shrink-0"
              >
                <h3 className="text-lg font-bold text-acBlack">
                  {item.title}
                </h3>
                <p className="text-acGray mt-2">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 bg-acBlack text-white rounded-full p-3 z-10 disabled:opacity-50"
          disabled={currentIndex >= highlights.length - visibleItems}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Highlights;
