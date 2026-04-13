// Reviews.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [

  { id: 9, url: "https://www.youtube.com/embed/eiF-0CdTraw" },
  { id: 4, url: "https://www.youtube.com/embed/suBcYFmpNA8" },
  { id: 1, url: "https://www.youtube.com/embed/DTLe5jt8MzY" },
  { id: 3, url: "https://www.youtube.com/embed/_7EFjJio-tI" },
  { id: 2, url: "https://www.youtube.com/embed/VOirbsf4R0o" },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState(null);
  const visibleItems = 3;

  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, reviews.length - visibleItems));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (videoUrl) => {
    setModalVideo(videoUrl);
  };

  const closeModal = () => {
    setModalVideo(null);
  };

  return (
    <section className="py-16 px-6 bg-white text-center mx-2 md:mx-24">
      <h2 className="text-2xl md:text-3xl font-bold text-acBlack mb-4">Video reviews</h2>
      <div className="relative flex items-center justify-center w-full mt-6">
        <button onClick={scrollLeft} className="absolute left-0 bg-acBlack text-white rounded-full p-3">
          <ChevronLeft size={20} />
        </button>
        <div className="w-full max-w-4xl overflow-hidden">
          <motion.div 
            className="flex space-x-6"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="relative w-96 h-56 rounded-lg overflow-hidden shadow-md flex-shrink-0 cursor-pointer"
                onClick={() => openModal(review.url)}
              >
                <div className="absolute inset-0 bg-acBlack bg-opacity-50 flex items-center justify-center">
                  <div className="w-20 h-20 bg-acBlack rounded-full flex items-center justify-center shadow-lg">
                    <Play size={40} className="text-acblue" />
                  </div>
                </div>
                <iframe
                  src={review.url}
                  title={`Review ${review.id}`}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </motion.div>
        </div>
        <button onClick={scrollRight} className="absolute right-0 bg-acBlack text-white rounded-full p-3">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {reviews.map((_, index) => (
          <span 
            key={index} 
            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-acBlack' : 'bg-gray-300'}`} 
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/reviews">
          <button className="mt-4 px-6 py-3 bg-acBlack text-white rounded-full font-medium hover:opacity-80 transition">
            See more video reviews
          </button>
        </Link>
      </div>

      {/* Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl p-4">
            <button 
              className="absolute -top-10 right-0 bg-acBlack text-white rounded-full p-2" 
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <iframe
              src={`${modalVideo}?autoplay=1`}
              title="Video Review"
              className="w-full h-96 rounded-lg"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;

