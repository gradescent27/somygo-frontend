

// MultiStepForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import questions from "../data/questions.json";
import Step from "./Step";
import { BASE_URL } from "../constants";
import { AnimatePresence, motion } from "framer-motion";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [, setFormId] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [success, setSuccess] = useState(false); // Track submission success
  const [error, setError] = useState(""); // Store error message
  const clearGlobalError = () => setError(""); // Clears the global error state


  const requiredFields = ["scam_loss_over_10000", "scam_type", "payment_method", "email", "first_name", "surname", "phone"];




  const handleNext = () => {
    const currentQuestion = questions[currentStep];
  
    // Check if the field is required and missing
    if (requiredFields.includes(currentQuestion.id) && !formData[currentQuestion.id]) {
      setError("This field is required. Please provide an answer before proceeding.");
      return;
    }
  
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setError(""); // Clear error when moving to the next step
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };


  const handleSubmit = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    setSuccess(false); // Reset success state
  
    try {
      const email = formData.email;
      const responses = { ...formData };
  
      if (!email) {
        setError("Email is required to submit the form.");
        setLoading(false);
        return;
      }
  
      const response = await axios.post(`${BASE_URL}/forms`, {
        email,
        responses,
      });
  
      console.log("Server Response:", response);
  
      // ✅ Ensure success is only set if response status is 201 and success is true
      if (response.status === 201 && response.data.success) {
        setFormId(response.data.formId);
        setSuccess(true);
      } else {
        setError(response.data.message || "Submission failed, please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
  
      // ✅ Extract proper error message from backend response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <AnimatePresence mode="wait">
        {/* ✅ Show Error Message if exists */}
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="w-full max-w-md p-6 bg-red-100 text-red-700 text-center rounded-lg shadow-lg absolute top-10"
          >
            <h2 className="text-xl font-semibold">⚠️ Submission Failed</h2>
            <p className="mt-2">{error}</p>
            <button
              onClick={() => setError("")}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Close
            </button>
          </motion.div>
        )}
  
        {/* ✅ Show Success Message */}
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="w-full max-w-md p-6 bg-green-100 text-green-700 text-center rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold">🎉 Submission Successful!</h2>
            <p className="mt-2">Thank you for completing the form. We'll be in touch soon.</p>
            <Link to="/">
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Close
              </button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ✅ Show Loader */}
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
                <div className="loader border-t-4 border-b-4 border-acBlack w-12 h-12 rounded-full animate-spin"></div>
              </div>
            )}
  
            {/* ✅ Render Form Steps */}
            <Step
              key={currentStep}
              question={questions[currentStep]}
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              currentStep={currentStep}
              totalSteps={questions.length}
              error={error}
              clearGlobalError={clearGlobalError} // ✅ Fix: Pass function properly
            />
      

           
          </>
        )}
      </AnimatePresence>
    </div>
  );
  

};

export default MultiStepForm;


