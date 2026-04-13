// Step.js

import React, { useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import "react-phone-input-2/lib/bootstrap.css";
import yesImage from '../assets/yes.png';  // ✅ Import images
import noImage from '../assets/no.png';  // ✅ Import images

const stepVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
};

const Step = ({ question, formData, setFormData, onNext, onPrev, onSubmit, currentStep, totalSteps, error, clearGlobalError }) => {
  const inputValue = formData[question.id] || "";
  const [localError, setLocalError] = useState("");

// ✅ Email Validation Regex
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ✅ Handle Email Change
const handleEmailChange = (e) => {
  const email = e.target.value;
  setFormData((prev) => ({ ...prev, [question.id]: email }));

  if (!validateEmail(email)) {
    setLocalError("Please enter a valid email address");
  } else {
    setLocalError("");
  }
};

// ✅ Validate Email on Blur (When user leaves the field)
const handleEmailBlur = () => {
  if (!validateEmail(inputValue)) {
    setLocalError("Invalid email address. Please enter a valid email.");
  }
};

// ✅ Prevent navigation if email is invalid
const handleNext = () => {
  if (question.type === "email" && !validateEmail(inputValue)) {
    setLocalError("Please enter a valid email before proceeding.");
    return;
  }

  if (!inputValue) {
    setLocalError("This field is required. Please provide an answer before proceeding.");
    return;
  }

  setLocalError(""); // Clear local error
  clearGlobalError(); // Clear global error when navigating
  onNext();
};




  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [question.id]: e.target.value, // Update formData correctly
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };



  const handlePrev = () => {
    onPrev();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    } else if (e.key === 'ArrowUp') {
      handlePrev();
    } else if (e.key === 'ArrowDown') {
      handleNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, );


  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen flex flex-col justify-start items-center px-4 bg-white"
    >
      {/* Progress Indicator */}
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
        <div
          className="bg-acblue h-2.5 rounded-full"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm text-acGray text-center">Step {currentStep + 1} of {totalSteps}</p>

      <h2 className="text-xl font-regular mb-2 font-nunitoSans text-acBlack text-center mt-12">{question.question}</h2>
      {question.description && <p className="text-sm text-acGray text-center">{question.description}</p>}

       {/* ✅ Display Error Messages */}
       {(localError || error) && <p className="text-red-500 text-sm my-2">{localError || error}</p>}

      {/* Render input based on type */}
      {question.type === 'text' && (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="w-full max-w-3xl p-3 border-b-2 border-acBlack outline-none text-lg"
        />
      )}
     {/* ✅ Email Input with Validation */}
     {question.type === "email" && (
        <div className="w-full max-w-3xl">
          <input
            type="email"
            value={inputValue}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur} // Validate when user leaves field
            className="w-full p-3 border-b-2 border-acBlack outline-none text-lg"
            placeholder="Enter your email"
          />
        </div>
      )}

       {/* Phone Input (Like the Screenshot) */}
{question.type === "phone" && (
        <div className="w-full max-w-3xl">
          <PhoneInput
            country={"gb"} // Set default country (Change as needed)
            value={inputValue}
            onChange={handlePhoneChange}
            enableSearch={true} // Allows searching for country codes
            disableDropdown={false} // Keep country dropdown enabled
            autoFormat={true} // Ensure proper phone formatting
            enableAreaCodes={true} // Include area codes for better formatting
            enableAreaCodeStretch={true} // Ensure formatting follows area codes
            inputProps={{
              name: "phone",
              required: true, // Make it required
              autoFocus: true, // Focus on load
            }}
            containerClass="react-tel-input w-full"
            inputClass="form-control w-full border-b-2 border-acBlack text-lg py-3 px-4 rounded-md outline-none"
            buttonClass="border-none bg-transparent"
            dropdownClass="border border-gray-300 shadow-lg"
          />
        </div>
      )}


      {question.type === 'date' && (
        <input
          type="date"
          value={inputValue}
          onChange={handleChange}
          className="w-full max-w-3xl p-3 border-b-2 border-acBlack outline-none text-lg"
        />
      )}
      {question.type === 'multiple-choice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {question.options.map((option) => (
            <button
              key={option}
              className={`p-3 border rounded-md transition-all duration-300 ${inputValue === option ? 'bg-acBlack text-white' : 'hover:bg-acGray'}`}
              onClick={() => setFormData((prev) => ({ ...prev, [question.id]: option }))}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === 'image-choice' && (
        <div className="flex space-x-4">
          {question.options.map((option) => {
            // Map correct image manually
            const imageSrc = option.label === "Yes" ? yesImage : noImage;

            return (
              <div
                key={option.label}
                onClick={() => setFormData((prev) => ({ ...prev, [question.id]: option.label }))}
                className={`p-4 border rounded-md cursor-pointer transition-all duration-300 ${
                  inputValue === option.label ? 'border-acBlack bg-gray-100' : 'border-gray-300'
                }`}
              >
                <img src={imageSrc} alt={option.label} className="w-36 h-36 object-cover rounded-md mx-auto" />
                <p className="text-center mt-2 text-acBlack">{option.label}</p>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="flex justify-between items-center w-full max-w-3xl mt-6">
        {onPrev && (
          <button onClick={handlePrev} className="px-6 py-2 bg-acBlack text-white rounded-md flex items-center">
            &#8592;
          </button>
        )}
        {currentStep < totalSteps - 1 ? (
          <button onClick={handleNext} className="px-6 py-2 bg-acBlack text-white rounded-md flex items-center">
            &#8594;
          </button>
        ) : (
          <button onClick={onSubmit} className="px-6 py-2 bg-acblue text-black rounded-md flex items-center">
            Submit
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Step;


