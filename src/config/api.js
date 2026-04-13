// API Configuration for Somygo Backend
import { BASE_URL, SERVER_BASE_URL } from "../constants";

const API_CONFIG = {
  // Use centralized BASE_URL from constants.js
  BASE_URL: process.env.REACT_APP_API_URL || BASE_URL,
  SERVER_BASE_URL: process.env.REACT_APP_SERVER_URL || SERVER_BASE_URL,
  ENDPOINTS: {
    SUBMIT_PAYMENT_REQUEST: "/payment-request",
    AUTOMATE_PAYMENT: "/automate-checkout",
    GET_PAYMENT_STATUS: "/status", // Updated endpoint path
    LIST_PAYMENT_REQUESTS: "/payment-requests",
  },
  CATALOG_ENDPOINTS: {
    GET_PRODUCTS: "/products",
    SUBMIT_PAYMENT_REQUEST: "/payment-request",
    AUTOMATE_PAYMENT: "/automate-checkout",
    GET_PAYMENT_STATUS: "/status",
    LIST_PAYMENT_REQUESTS: "/payment-requests",
    MARK_AS_PAID: "/mark-as-paid",
  },
};

// Helper function to build full API URLs
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API service functions
export const apiService = {
  // Submit payment request
  submitPaymentRequest: async (userData) => {
    const response = await fetch(
      getApiUrl(API_CONFIG.ENDPOINTS.SUBMIT_PAYMENT_REQUEST),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit payment request");
    }
    return response.json();
  },

  // Trigger payment automation
  automatePayment: async (requestId) => {
    const response = await fetch(
      getApiUrl(API_CONFIG.ENDPOINTS.AUTOMATE_PAYMENT),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Payment automation failed");
    }
    return response.json();
  },

  // Get payment status
  getPaymentStatus: async (requestId) => {
    const response = await fetch(
      getApiUrl(`${API_CONFIG.ENDPOINTS.GET_PAYMENT_STATUS}/${requestId}`),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get payment status");
    }
    return response.json();
  },

  // Get payment requests with filtering and pagination
  getPaymentRequests: async (options = {}) => {
    const params = new URLSearchParams();
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.status) params.append("status", options.status);
    if (options.search) params.append("search", options.search);
    if (options.dateRange) params.append("dateRange", options.dateRange);
    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.LIST_PAYMENT_REQUESTS)}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get payment requests");
    }
    return response.json();
  },

  // List payment requests (legacy method - keeping for backward compatibility)
  listPaymentRequests: async (status = null, limit = 50) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (limit) params.append("limit", limit.toString());
    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.LIST_PAYMENT_REQUESTS)}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to list payment requests");
    }
    return response.json();
  },

  // Send payment callback data to backend
  sendPaymentCallback: async (requestId, paymentData) => {
    const response = await fetch(getApiUrl("/payment-callback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, paymentData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send payment callback");
    }
    return response.json();
  },

  // ========== CATALOG ENDPOINTS ==========
  // Get catalog products
  getCatalogProducts: async () => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.GET_PRODUCTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get catalog products");
    }
    return response.json();
  },

  // Submit catalog payment request
  submitCatalogPaymentRequest: async (userData) => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.SUBMIT_PAYMENT_REQUEST}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to submit catalog payment request",
      );
    }
    return response.json();
  },

  // Trigger catalog payment automation
  automateCatalogPayment: async (requestId) => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.AUTOMATE_PAYMENT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Catalog payment automation failed");
    }
    return response.json();
  },

  // Get catalog payment status
  getCatalogPaymentStatus: async (requestId) => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.GET_PAYMENT_STATUS}/${requestId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to get catalog payment status",
      );
    }
    return response.json();
  },

  // Get catalog payment requests with filtering
  getCatalogPaymentRequests: async (options = {}) => {
    const params = new URLSearchParams();
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());
    if (options.status) params.append("status", options.status);
    if (options.invoiceId) params.append("invoiceId", options.invoiceId);
    if (options.search) params.append("search", options.search);
    const url = `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.LIST_PAYMENT_REQUESTS}?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to get catalog payment requests",
      );
    }
    return response.json();
  },

  // Mark a specific invoice attempt as paid
  // attemptIndex is optional: if omitted, marks the most recent attempt
  markCatalogInvoiceAsPaid: async (requestId, attemptIndex) => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog${API_CONFIG.CATALOG_ENDPOINTS.MARK_AS_PAID}/${requestId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          attemptIndex !== undefined ? { attemptIndex } : {},
        ),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to mark invoice as paid");
    }

    return response.json();
  },

  // ========== SETTINGS ENDPOINTS ==========
  // Public endpoints (frontend-gated by password in ManageCatlogInvoices.js)

  getSettings: async () => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog/settings`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get settings");
    }

    return response.json();
  },

  updateSettings: async (settingsData) => {
    const response = await fetch(
      `${API_CONFIG.SERVER_BASE_URL}/api/somygo-catalog/settings`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update settings");
    }

    return response.json();
  },
};

export default API_CONFIG;
