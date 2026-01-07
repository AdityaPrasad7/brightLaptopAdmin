/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/laptops/auth/login',
      REGISTER: '/laptops/auth/register',
      LOGOUT: '/laptops/auth/logout',
      REFRESH: '/laptops/auth/refresh',
      PROFILE: '/laptops/auth/profile',
    },
    
    // Products
    PRODUCTS: {
      BASE: '/laptops/products',
      CREATE: '/laptops/products',
      GET_ALL: '/laptops/products',
      GET_BY_ID: (id) => `/laptops/products/${id}`,
      UPDATE: (id) => `/laptops/products/${id}`,
      DELETE: (id) => `/laptops/products/${id}`,
      CATEGORIES: '/laptops/products/categories/list',
      BRANDS: '/laptops/products/brands',
      SEARCH: '/laptops/products/search',
    },
    
    // Upload
    UPLOAD: {
      IMAGES: '/laptops/upload/images',
      SINGLE_IMAGE: '/laptops/upload/image',
    },
    
    // Orders
    ORDERS: {
      BASE: '/laptops/orders',
      CREATE: '/laptops/orders',
      GET_ALL: '/laptops/orders',
      GET_BY_ID: (id) => `/laptops/orders/${id}`,
      UPDATE: (id) => `/laptops/orders/${id}`,
    },
    
    // Categories
    CATEGORIES: {
      BASE: '/laptops/categories',
      GET_ALL: '/laptops/categories',
      GET_BY_NAME: (name) => `/laptops/categories/${encodeURIComponent(name)}`,
    },
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },
};

export default API_CONFIG;







