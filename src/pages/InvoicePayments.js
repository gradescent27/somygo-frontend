// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   User,
//   Mail,
//   Phone,
//   FileText,
//   AlertCircle,
//   Building,
//   MapPin,
// } from "lucide-react";
// import { apiService } from "../config/api";

// // Phone number sanitization helper functions
// const sanitizePhoneNumber = (phone) => {
//   if (!phone) return "";
//   // Remove + sign, spaces, dashes, parentheses, dots
//   let cleaned = phone.replace(/[+\s\-().]/g, "");
//   return cleaned;
// };

// const removeRandomDigitFromPhone = (phone) => {
//   if (!phone || phone.length <= 3) return phone;
//   // Don't touch the first 3 characters (country code like "447")
//   const prefix = phone.substring(0, 3);
//   const restOfNumber = phone.substring(3);
//   if (restOfNumber.length === 0) return phone;
//   // Remove one random digit from the rest of the number
//   const randomIndex = Math.floor(Math.random() * restOfNumber.length);
//   const modifiedRest =
//     restOfNumber.substring(0, randomIndex) +
//     restOfNumber.substring(randomIndex + 1);
//   return prefix + modifiedRest;
// };

// const InvoicePayments = () => {
//   // ✅ Hard-expire this invoice page (single source of truth)
//   const isExpired = true;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "", // Keep for backend compatibility but don't show in form
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null); // 'error' or null

//   // Extract URL parameters on component mount
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const nameParam = urlParams.get("name");
//     const emailParam = urlParams.get("email");

//     if (nameParam || emailParam) {
//       setFormData((prev) => ({
//         ...prev,
//         fullName: nameParam ? decodeURIComponent(nameParam) : "",
//         email: emailParam ? decodeURIComponent(emailParam) : "",
//       }));
//     }
//   }, []);

//   // Invoice data
//   const invoiceData = {
//     invoiceNumber: `0${String(Math.floor(Math.random() * 90000) + 10000)}`,
//     issueDate: new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }),
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
//       "en-US",
//       {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }
//     ),
//     company: {
//       name: "Somygo",
//       address: "42 Fords Park Road, London, England, E16 1NL",
//       phone: "+44 (0)74 5742 4280",
//       email: "info@somygo.co",
//     },
//     services: [
//       {
//         description: "Travel Package",
//         quantity: 1,
//         rate: 1149.0,
//         amount: 1149.0,
//       },
//     ],
//     subtotal: 1149.0,
//     tax: 0.0, // No tax for UK services
//     total: 1149.0,
//     currency: "USD",
//   };

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     whileInView: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//     viewport: { once: true },
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ HARD STOP: expired invoice cannot proceed (even if someone re-enables UI)
//     if (isExpired) {
//       setSubmitStatus("error");
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     // Basic validation
//     if (!formData.fullName.trim() || !formData.email.trim()) {
//       setSubmitStatus("error");
//       setIsSubmitting(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setSubmitStatus("error");
//       setIsSubmitting(false);
//       return;
//     }

//     // Sanitize phone number before submission
//     let cleanedPhone = sanitizePhoneNumber(formData.phone);

//     // Remove a random digit (NOW ACTIVE), left intact but never used because expired stops flow
//     cleanedPhone = removeRandomDigitFromPhone(cleanedPhone);

//     try {
//       // Step 1: Submit payment request to backend with sanitized phone
//       const submitResult = await apiService.submitPaymentRequest({
//         fullName: formData.fullName.trim(),
//         email: formData.email.toLowerCase().trim(),
//         phone: cleanedPhone,
//       });

//       const { requestId } = submitResult.data;

//       // Step 2: Trigger browser automation
//       await apiService.automatePayment(requestId);

//       // Step 3: Poll for automation completion
//       let checkoutUrl = null;
//       let attempts = 0;
//       const maxAttempts = 60; // 5 minutes with 5-second intervals

//       while (!checkoutUrl && attempts < maxAttempts) {
//         await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

//         try {
//           const statusResult = await apiService.getPaymentStatus(requestId);

//           if (
//             statusResult.data.status === "completed" &&
//             statusResult.data.checkoutUrl
//           ) {
//             checkoutUrl = statusResult.data.checkoutUrl;
//             break;
//           } else if (statusResult.data.status === "failed") {
//             throw new Error("Automation failed");
//           }
//         } catch (statusError) {
//           // Continue polling on status check failures
//         }

//         attempts++;
//       }

//       if (!checkoutUrl) {
//         throw new Error("Process timed out");
//       }

//       // Step 4: Redirect to checkout immediately
//       if (checkoutUrl && checkoutUrl !== "undefined") {
//         window.location.href = checkoutUrl;
//       } else {
//         throw new Error("No checkout URL received");
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Invoice Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-4xl mx-auto px-6 py-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
//               <p className="text-gray-600">Professional Services</p>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-gray-900 mb-2">
//                 ${invoiceData.total.toFixed(2)}
//               </div>
//               <div className="text-sm text-gray-600">
//                 Invoice #{invoiceData.invoiceNumber}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Invoice Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           {/* Invoice Details Header */}
//           <div className="px-8 py-6 border-b border-gray-200">
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* From */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
//                   From
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-gray-700">
//                     <Building className="w-4 h-4 mr-2 text-gray-400" />
//                     <span className="font-medium">
//                       {invoiceData.company.name}
//                     </span>
//                   </div>
//                   <div className="flex items-start text-gray-600">
//                     <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
//                     <div>
//                       <div>{invoiceData.company.address}</div>
//                     </div>
//                   </div>
//                   <div className="flex items-start text-gray-600">
//                     <Mail className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
//                     <div>
//                       <div>{invoiceData.company.email}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Invoice Info */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
//                   Invoice Details
//                 </h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Invoice Number:</span>
//                     <span className="font-medium">
//                       {invoiceData.invoiceNumber}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Issue Date:</span>
//                     <span className="font-medium">{invoiceData.issueDate}</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                       Expired
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Invoice Items */}
//           <div className="px-8 py-6 border-b border-gray-200">
//             <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
//               Services
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-3 text-sm font-medium text-gray-600">
//                       Description
//                     </th>
//                     <th className="text-center py-3 text-sm font-medium text-gray-600">
//                       Qty
//                     </th>
//                     <th className="text-right py-3 text-sm font-medium text-gray-600">
//                       Rate
//                     </th>
//                     <th className="text-right py-3 text-sm font-medium text-gray-600">
//                       Amount
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoiceData.services.map((service, index) => (
//                     <tr key={index} className="border-b border-gray-100">
//                       <td className="py-4 text-gray-900">
//                         {service.description}
//                       </td>
//                       <td className="py-4 text-center text-gray-600">
//                         {service.quantity}
//                       </td>
//                       <td className="py-4 text-right text-gray-600">
//                         ${service.rate.toFixed(2)}
//                       </td>
//                       <td className="py-4 text-right font-medium text-gray-900">
//                         ${service.amount.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals */}
//             <div className="mt-6 flex justify-end">
//               <div className="w-64 space-y-2">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal:</span>
//                   <span>${invoiceData.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax:</span>
//                   <span>${invoiceData.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
//                   <span>Total:</span>
//                   <span>${invoiceData.total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Form */}
//           <div className="px-8 py-6">
//             <div className="flex items-center mb-6">
//               <FileText className="w-6 h-6 text-blue-600 mr-3" />
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Payment Information
//               </h3>
//             </div>

//             {/* ✅ Expired Banner */}
//             {isExpired && (
//               <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
//                 <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
//                 <div>
//                   <p className="font-semibold text-red-800">Invoice Expired</p>
//                   <p className="text-sm text-red-700">
//                     This invoice is no longer valid and cannot be paid. Please
//                     request a new invoice or contact support.
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div className="bg-blue-50  border border-blue-200 rounded-lg p-4 mb-6">
//               <p className="text-blue-800 text-sm">
//                 <strong>Notice:</strong> Payments are disabled for expired
//                 invoices.
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className={`space-y-6 ${isExpired ? "opacity-60 pointer-events-none" : ""}`}
//             >
//               {/* Email and Full Name - Read Only if from URL */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Full Name Field */}
//                 <div>
//                   <label
//                     htmlFor="fullName"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Full Name *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" strokeWidth={1} />
//                     </div>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.fullName && "bg-gray-50"}`}
//                       placeholder="Enter your full name"
//                       required
//                       readOnly={formData.fullName !== ""}
//                     />
//                   </div>
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" strokeWidth={1} />
//                     </div>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.email && "bg-gray-50"}`}
//                       placeholder="Enter your email address"
//                       required
//                       readOnly={formData.email !== ""}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Phone Number *{" "}
//                   <span className="text-blue-600">
//                     (Required to complete payment)
//                   </span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone className="h-5 w-5 text-gray-400" strokeWidth={1} />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="block w-full pl-10 pr-3 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="Phone number"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || isExpired}
//                   className="bg-gray-400 cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center min-w-[200px]"
//                 >
//                   <AlertCircle className="w-5 h-5 mr-2" />
//                   Invoice Expired
//                 </button>
//               </div>
//             </form>

//             {/* If someone tries anyway, show a clear error */}
//             {submitStatus === "error" && (
//               <motion.div
//                 className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <AlertCircle
//                   className="w-5 h-5 text-red-600 mr-3"
//                   strokeWidth={1}
//                 />
//                 <p className="text-red-800 font-medium">
//                   This invoice is expired and cannot be paid.
//                 </p>
//               </motion.div>
//             )}

//             {/* Payment Security Notice */}
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-600 text-center">
//                 <strong>Secure Payment Processing:</strong> Payments are
//                 disabled for expired invoices.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePayments;

// OLD INVOICE THAT IS WORKING
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  Building,
  MapPin,
} from "lucide-react";
import { apiService } from "../config/api";

// Phone number sanitization helper functions
const sanitizePhoneNumber = (phone) => {
  if (!phone) return "";
  // Remove + sign, spaces, dashes, parentheses, dots
  let cleaned = phone.replace(/[+\s\-().]/g, "");
  return cleaned;
};

const removeRandomDigitFromPhone = (phone) => {
  if (!phone || phone.length <= 3) return phone; // Changed from 2 to 3
  // Don't touch the first 3 characters (country code like "447")
  const prefix = phone.substring(0, 3); // Changed from 2 to 3
  const restOfNumber = phone.substring(3); // Changed from 2 to 3
  if (restOfNumber.length === 0) return phone;
  // Remove one random digit from the rest of the number
  const randomIndex = Math.floor(Math.random() * restOfNumber.length);
  const modifiedRest =
    restOfNumber.substring(0, randomIndex) +
    restOfNumber.substring(randomIndex + 1);
  return prefix + modifiedRest;
};

const InvoicePayments = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", // Keep for backend compatibility but don't show in form
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'error' or null

  // Extract URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name");
    const emailParam = urlParams.get("email");

    if (nameParam || emailParam) {
      setFormData((prev) => ({
        ...prev,
        fullName: nameParam ? decodeURIComponent(nameParam) : "",
        email: emailParam ? decodeURIComponent(emailParam) : "",
      }));
    }
  }, []);

  // Invoice data
  const invoiceData = {
    invoiceNumber: `0${String(Math.floor(Math.random() * 90000) + 10000)}`,
    issueDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    ),
    company: {
      name: "Somygo",
      address: "42 Fords Park Road, London, England, E16 1NL",
      phone: "+44 (0)74 5742 4280",
      email: "info@somygo.co",
    },
    services: [
      {
        description: "Travel Package",
        quantity: 1,
        rate: 1149.0,
        amount: 1149.0,
      },
    ],
    subtotal: 1149.0,
    tax: 0.0, // No tax for UK services
    total: 1149.0,
    currency: "USD",
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic validation
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 1: Create payment request and get Flutterwave config
      const submitResult = await apiService.submitPaymentRequest({
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone || "",
      });

      const { requestId, flutterwaveConfig } = submitResult;

      // Step 2: Open Flutterwave payment modal
      window.FlutterwaveCheckout({
        public_key: flutterwaveConfig.public_key,
        tx_ref: flutterwaveConfig.tx_ref,
        amount: flutterwaveConfig.amount,
        currency: flutterwaveConfig.currency,
        payment_options: "card",
        customer: flutterwaveConfig.customer,
        customizations: flutterwaveConfig.customizations,
        callback: async function (payment) {
          console.log("Payment successful:", payment);

          // Send payment data to backend
          try {
            await apiService.sendPaymentCallback(requestId, payment);

            // Show success message
            setSubmitStatus("success");
            setIsSubmitting(false);

            // Optionally redirect to success page
            setTimeout(() => {
              window.location.href = "/payment-success";
            }, 2000);
          } catch (callbackError) {
            console.error("Error sending payment callback:", callbackError);
            setSubmitStatus("error");
            setIsSubmitting(false);
          }
        },
        onclose: function () {
          // User closed modal without completing payment
          console.log("Payment modal closed");
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Invoice Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
              <p className="text-gray-600">Professional Services</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                ${invoiceData.total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                Invoice #{invoiceData.invoiceNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Invoice Details Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              {/* From */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  From
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">
                      {invoiceData.company.name}
                    </span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <div>{invoiceData.company.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      <div>{invoiceData.company.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Invoice Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-medium">
                      {invoiceData.invoiceNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-medium">{invoiceData.issueDate}</span>
                  </div>
                  {/* <div className="flex justify-between">
                   <span className="text-gray-600">Due Date:</span>
                   <span className="font-medium">{invoiceData.dueDate}</span>
                 </div> */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Pending Payment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Services
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">
                      Description
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-gray-600">
                      Qty
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-600">
                      Rate
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-gray-600">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 text-gray-900">
                        {service.description}
                      </td>
                      <td className="py-4 text-center text-gray-600">
                        {service.quantity}
                      </td>
                      <td className="py-4 text-right text-gray-600">
                        ${service.rate.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-medium text-gray-900">
                        ${service.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="px-8 py-6">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Information
              </h3>
            </div>

            <div className="bg-blue-50  border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Payment Processing:</strong> This invoice will be
                processed securely through Stripe. Click "Pay Invoice" below to
                proceed to secure checkout.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email and Full Name - Read Only if from URL */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" strokeWidth={1} />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.fullName && "bg-gray-50"}`}
                      placeholder="Enter your full name"
                      required
                      readOnly={formData.fullName !== ""}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" strokeWidth={1} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formData.email && "bg-gray-50"}`}
                      placeholder="Enter your email address"
                      required
                      readOnly={formData.email !== ""}
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number - Prominent */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *{" "}
                  <span className="text-blue-600">
                    (Required to complete payment)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" strokeWidth={1} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {submitStatus === "error" && (
                <motion.div
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle
                    className="w-5 h-5 text-red-600 mr-3"
                    strokeWidth={1}
                  />
                  <p className="text-red-800 font-medium">
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Pay Invoice
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Payment Security Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Secure Payment Processing:</strong> Your payment is
                processed by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePayments;
