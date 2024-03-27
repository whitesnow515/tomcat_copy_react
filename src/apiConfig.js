const API_BASE_URL = "https://app.copiercat.com/api";

export const API_ENDPOINTS = {
  // Auth endpoints
  baseEndpoints: {
    login: `${API_BASE_URL}/login`,
    logout: `${API_BASE_URL}/logout`,
    signup: `${API_BASE_URL}/signup`,
  },
  // User endpoints
  user: {
    signup: `${API_BASE_URL}/user/signup`,
    updateProfile: `${API_BASE_URL}/user/updateProfile`,
    // Other user-related endpoints
  },
  // profile endpoints
  profileEndpoints: {
    brokerInfo: `${API_BASE_URL}/brokers`,
    getProfiles: `${API_BASE_URL}/Account/brokerAccount/info`,
  },
};
