// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6 text-center">
      <motion.h1
        className="text-6xl font-bold text-acBlack"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-lg text-acGray mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <Link to="/" className="mt-6">
        <motion.button
          className="px-6 py-3 bg-acBlack text-white rounded-full font-medium hover:opacity-80 transition"
          whileHover={{ scale: 1.05 }}
        >
          Go Back Home
        </motion.button>
      </Link>
    </section>
  );
};

export default NotFound;
