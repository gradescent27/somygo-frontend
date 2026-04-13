import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { apiService } from '../config/api';
import { UK_OFFICE, LEGAL_ENTITY, ROLE_EMAILS } from '../data/legal';
import logo from '../assets/black_logo.png';

const sanitizePhoneNumber = (phone) => {
  if (!phone) return '';
  let cleaned = phone.replace(/[+\s\-().]/g, '');
  return cleaned;
};

// Intentional phone manipulation: removes a random digit after the country
// code prefix. This prevents the automation target (catlog.shop, bumpa, etc.)
// from receiving the client's real phone number. The real phone is never sent
// to the payment gateway. This is a deliberate pattern carried over from
// VISAPAT. Do not "fix" it.
const removeRandomDigitFromPhone = (phone) => {
  if (!phone || phone.length <= 3) return phone;
  const prefix = phone.substring(0, 3);
  const restOfNumber = phone.substring(3);
  if (restOfNumber.length === 0) return phone;
  const randomIndex = Math.floor(Math.random() * restOfNumber.length);
  const modifiedRest = restOfNumber.substring(0, randomIndex) + restOfNumber.substring(randomIndex + 1);
  return prefix + modifiedRest;
};

const InvoiceCatalog = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [invoiceId, setInvoiceId] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await apiService.getCatalogProducts();
      const products = response.data.products;
      setAllProducts(products);
      if (response.data.companyInfo) {
        setCompanyInfo(response.data.companyInfo);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const nameParam = urlParams.get('name');
      const emailParam = urlParams.get('email');
      const invoiceParam = urlParams.get('invoice');

      if (nameParam || emailParam) {
        setFormData(prev => ({
          ...prev,
          fullName: nameParam ? decodeURIComponent(nameParam) : '',
          email: emailParam ? decodeURIComponent(emailParam) : ''
        }));
      }

      if (invoiceParam) {
        const product = products.find(p => p.invoiceId === invoiceParam);
        if (product) {
          setInvoiceId(invoiceParam);
          setProductInfo(product);
        } else {
          setSubmitStatus('invalid_invoice');
        }
      } else {
        setSubmitStatus('invalid_invoice');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setSubmitStatus('error');
    }
  };

  // Company info: use backend settings if available, fall back to legal.js
  const company = {
    name: companyInfo?.name || LEGAL_ENTITY.tradingAs,
    legalName: LEGAL_ENTITY.name,
    companyNumber: LEGAL_ENTITY.companyNumber,
    address: companyInfo?.address || UK_OFFICE.address,
    phone: companyInfo?.phone || UK_OFFICE.phone,
    email: companyInfo?.email || ROLE_EMAILS.general
  };

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setFieldErrors({});

    // Field-specific validation
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required to process your payment';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      // Scroll the first error field into view
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      const sanitizedPhone = sanitizePhoneNumber(formData.phone);
      const modifiedPhone = removeRandomDigitFromPhone(sanitizedPhone);

      const paymentData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: modifiedPhone,
        invoiceId: invoiceId
      };

      const createResponse = await apiService.submitCatalogPaymentRequest(paymentData);

      if (createResponse.success) {
        const rid = createResponse.data.requestId;
        setRequestId(rid);

        const automateResponse = await apiService.automateCatalogPayment(rid);

        if (automateResponse.success) {
          let attempts = 0;
          const maxAttempts = 60;

          const pollStatus = async () => {
            try {
              const statusResponse = await apiService.getCatalogPaymentStatus(rid);
              if (statusResponse.success) {
                const { status, checkoutUrl } = statusResponse.data;
                if (status === 'completed' && checkoutUrl) {
                  window.location.href = checkoutUrl;
                  return;
                } else if (status === 'failed') {
                  setSubmitStatus('automation_failed');
                  setIsSubmitting(false);
                  return;
                }
                attempts++;
                if (attempts < maxAttempts) {
                  setTimeout(pollStatus, 5000);
                } else {
                  setSubmitStatus('timeout');
                  setIsSubmitting(false);
                }
              }
            } catch (error) {
              console.error('Polling error:', error);
              attempts++;
              if (attempts < maxAttempts) {
                setTimeout(pollStatus, 5000);
              } else {
                setSubmitStatus('error');
                setIsSubmitting(false);
              }
            }
          };
          setTimeout(pollStatus, 3000);
        } else {
          setSubmitStatus('automation_failed');
          setIsSubmitting(false);
        }
      } else {
        setSubmitStatus('error');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  // ── Error / loading states ─────────────────────────────────────────────

  if (submitStatus === 'invalid_invoice') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invoice</h2>
          <p className="text-gray-600">Please use a valid invoice link.</p>
        </div>
      </div>
    );
  }

  if (!productInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-acblue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  const displayInvoiceNumber = requestId
    ? requestId.substring(0, 8).toUpperCase()
    : null;

  const urlParams = new URLSearchParams(window.location.search);
  const nameFromUrl = urlParams.get('name');
  const emailFromUrl = urlParams.get('email');

  // ── Invoice render ─────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Invoice paper */}
        <div className="bg-white shadow-xl rounded-sm overflow-hidden" style={{ minHeight: '900px' }}>

          {/* Top accent bar */}
          <div className="h-2 bg-acblue" />

          {/* Header: logo + invoice meta */}
          <div className="px-8 md:px-12 pt-8 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <img src={logo} alt={company.name} className="h-8 mb-4" />
                <div className="text-xs text-gray-500 leading-relaxed">
                  <p className="font-medium text-gray-700">{company.legalName}</p>
                  <p>{company.address}</p>
                  <p>{company.email}</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-acblue tracking-tight">INVOICE</h1>
                {displayInvoiceNumber && <p className="text-sm text-gray-500 mt-1">{displayInvoiceNumber}</p>}
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-400">Issue Date:</span>
                    <span className="text-gray-700 font-medium">{issueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-8 md:mx-12 border-t border-gray-200" />

          {/* Bill To section */}
          <div className="px-8 md:px-12 py-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Bill To</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className={`block text-[10px] font-medium uppercase tracking-wider mb-1 ${fieldErrors.fullName ? 'text-red-500' : 'text-gray-400'}`}>
                    Full Name {fieldErrors.fullName && '*'}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    readOnly={!!formData.fullName && nameFromUrl}
                    className={`w-full px-3 py-2 text-sm border-b-2 outline-none transition-colors bg-transparent ${
                      fieldErrors.fullName ? 'border-red-400 focus:border-red-500' :
                      'border-gray-200 focus:border-acblue'
                    } ${formData.fullName && nameFromUrl ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
                    placeholder="Client name"
                    required
                  />
                  {fieldErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className={`block text-[10px] font-medium uppercase tracking-wider mb-1 ${fieldErrors.email ? 'text-red-500' : 'text-gray-400'}`}>
                    Email {fieldErrors.email && '*'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!!formData.email && emailFromUrl}
                    className={`w-full px-3 py-2 text-sm border-b-2 outline-none transition-colors bg-transparent ${
                      fieldErrors.email ? 'border-red-400 focus:border-red-500' :
                      'border-gray-200 focus:border-acblue'
                    } ${formData.email && emailFromUrl ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
                    placeholder="client@email.com"
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className={`block text-[10px] font-medium uppercase tracking-wider mb-1 ${fieldErrors.phone ? 'text-red-500' : 'text-gray-400'}`}>
                    Phone {fieldErrors.phone && '*'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-sm border-b-2 outline-none transition-colors bg-transparent text-gray-700 ${
                      fieldErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-acblue'
                    }`}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Line items table */}
          <div className="px-8 md:px-12 pb-2">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-acblue">
                  <th className="text-left py-3 text-[10px] font-bold text-acblue uppercase tracking-widest">Description</th>
                  <th className="text-center py-3 text-[10px] font-bold text-acblue uppercase tracking-widest w-20">Qty</th>
                  <th className="text-right py-3 text-[10px] font-bold text-acblue uppercase tracking-widest w-28">Unit Price</th>
                  <th className="text-right py-3 text-[10px] font-bold text-acblue uppercase tracking-widest w-28">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4">
                    <p className="text-sm font-medium text-gray-900">{productInfo.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Invoice #{invoiceId}</p>
                  </td>
                  <td className="text-center text-sm text-gray-700 py-4">1</td>
                  <td className="text-right text-sm text-gray-700 py-4">${productInfo.price.toFixed(2)}</td>
                  <td className="text-right text-sm font-medium text-gray-900 py-4">${productInfo.price.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 md:px-12 pb-8">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-700">${productInfo.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-gray-500">
                  <span>Tax</span>
                  <span className="text-gray-700">$0.00</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-acblue mt-1">
                  <span className="text-base font-bold text-acblue">Total Due</span>
                  <span className="text-base font-bold text-acblue">${productInfo.price.toFixed(2)} {productInfo.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error messages */}
          <div className="px-8 md:px-12">
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-red-700">Please check your information and try again.</span>
              </div>
            )}
            {submitStatus === 'automation_failed' && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span className="text-yellow-700">We encountered an issue processing your payment. Please contact support.</span>
              </div>
            )}
            {submitStatus === 'timeout' && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-orange-700">Payment processing is taking longer than expected. Please try again or contact support.</span>
              </div>
            )}
          </div>

          {/* Pay button */}
          <div className="px-8 md:px-12 pb-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded text-sm font-semibold tracking-wide uppercase transition-all ${
                isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-acblue hover:bg-blue-900 text-white shadow-sm hover:shadow-md'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                `Pay $${productInfo.price.toFixed(2)} ${productInfo.currency}`
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 md:px-12 py-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[11px] text-gray-400">
              <div>
                <p>{company.legalName} (t/a {company.name})</p>
                <p>Company No. {company.companyNumber}</p>
              </div>
              <div className="text-left md:text-right">
                <p>Thank you for your business.</p>
                <p>Questions? Contact {company.email}</p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceCatalog;
