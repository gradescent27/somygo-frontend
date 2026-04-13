
// MediaSection.js
import React from 'react';
import { motion } from 'framer-motion';
import bbc from '../assets/bbc.png';
import wire from '../assets/wire.png';
import dog from '../assets/dog.png';
import rip from '../assets/rip.png';
import mail from '../assets/mail.png';
import city from '../assets/city.png';
import news from '../assets/news.png';

const logos = [bbc, wire, dog, rip, mail, city, news];

const MediaSection = () => {
  return (
    <section className="py-10 overflow-hidden bg-white">
      <h2 className="text-center text-md font-nunitoSans font-regular text-acGray mb-6">As seen on</h2>
      <div className="relative w-full flex justify-center overflow-hidden">
        <motion.div 
          className="flex space-x-12"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img key={index} src={logo} alt="Media logo" className="h-10 md:h-20 opacity-40" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MediaSection;
