// API Configuration File
// Centralized API configuration with base URL and endpoints

export const API_BASE_URL = "https://node.sapiencedesk.com";

export const API_ENDPOINTS = {
  // Authentication Endpoints
  AUTH: {
    SIGNUP: `${API_BASE_URL}/user/register`,
    LOGIN: `${API_BASE_URL}/user/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/user/forgot-password`,
    VERIFY_OTP: `${API_BASE_URL}/user/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/user/reset-password`,
  },
  LOGO: { GET_LOGO: `${API_BASE_URL}/media/get-all` },
  COMMENT: {
    CREATE: `${API_BASE_URL}/comment/create`,
    GET_ALL: `${API_BASE_URL}/comment/get-all`,
  },
  FooterContent: { GET_Footer_Text: `${API_BASE_URL}/admin/get-all` },
  // admin endpoints
  ADMIN: {
    GET_ALL: `${API_BASE_URL}/admin/get-all`,
  },
  // User Endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/update-profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
    GET_ALL: `${API_BASE_URL}/user/get-all`,
  },
  // Donate
  DONATE: { Pay: `${API_BASE_URL}/payment/create-checkout-session` },

  // Article Endpoints
  ARTICLE: {
    GET_ALL: `${API_BASE_URL}/article/get-all`,
    GET_BY_ID: (id) => `${API_BASE_URL}/article/${id}`,
    CREATE: `${API_BASE_URL}/article/create`,
    UPDATE: (id) => `${API_BASE_URL}/article/${id}`,
    DELETE: (id) => `${API_BASE_URL}/article/${id}`,
  },

  // Article Comment Endpoints
  ARTICLE_COMMENT: {
    GET_BY_ARTICLE_ID: (id) => `${API_BASE_URL}/comment/get-by-article/${id}`,
  },
  // Event Endpoints
  EVENT: {
    GET_ALL: `${API_BASE_URL}/events/get-all`,
  },
  // VIDEO
  VIDEO: { GET_ALL: `${API_BASE_URL}/videos/get-all` },
  // Category Endpoints
  CATEGORY: {
    GET_ALL: `${API_BASE_URL}/category/get-all`,
  },
  SUBCATEGORY: {
    GET_ALL: `${API_BASE_URL}/subCategory/get-all`,
  },

  // About Us Endpoints
  ABOUTUS: {
    GET_ALL: `${API_BASE_URL}/aboutus/get-all`,
  },

  // post a query
  QUERY: { CREATE: `${API_BASE_URL}/contactus/create` },

  // get contect us details
  CONTACTUS: {
    GET_ALL: `${API_BASE_URL}/admin-contact/get-all`,
  },

  // terms and privacy  TERMS: `${API_BASE_URL}/terms/get-all`,
  PRIVACY: `${API_BASE_URL}/privacy/get-all`,
  TERMS: `${API_BASE_URL}/terms/get-all`,

  // Add other endpoints as needed
  // Payment Endpoints
  PAYMENT: {
    CREATE_INTENT: `${API_BASE_URL}/payment/create-payment-intent`,
    GET_ALL: `${API_BASE_URL}/payment/getall`,
    GET_BY_ID: (id) => `${API_BASE_URL}/payment/get-by-id/${id}`,
    VERIFY: `${API_BASE_URL}/payment/verify-payment`,
    GET_BY_USER: (userId) => `${API_BASE_URL}/payment/get-by-userId/${userId}`,
  },
};

// Helper function to make API calls
export const apiCall = async (url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // If body is FormData, do not set Content-Type (browser will set the boundary)
  if (options.body instanceof FormData) {
    delete defaultHeaders["Content-Type"];
  }

  // Attach auth token if available
  try {
    const token = localStorage.getItem("authToken");
    const mergedHeaders = {
      ...defaultHeaders,
      ...(options.headers || {}),
    };

    if (token && !mergedHeaders.Authorization) {
      mergedHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders,
    });

    // Read raw text first, then attempt safe JSON parse.
    const raw = await response.text();
    const contentType = response.headers.get("content-type") || "";
    let parsed = raw;

    if (contentType.includes("application/json")) {
      try {
        parsed = raw ? JSON.parse(raw) : null;
      } catch (err) {
        // If JSON parsing fails, keep raw text so callers can inspect it
        parsed = raw;
      }
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) return null;

    if (!response.ok) {
      const message =
        parsed && parsed.message
          ? parsed.message
          : typeof parsed === "string" && parsed
            ? parsed
            : `HTTP ${response.status}: ${response.statusText}`;
      const error = new Error(message);
      error.status = response.status;
      error.response = parsed;
      if (response.status === 401) {
        error.isAuth = true;
      }
      throw error;
    }

    return parsed;
  } catch (error) {
    throw error;
  }
};

export default API_BASE_URL;
