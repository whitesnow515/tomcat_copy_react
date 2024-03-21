import axios from 'axios';

// Create an Axios instance that can be customized
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Use your API base URL here
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers here
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(config => {
  // Here you can add authorization tokens or modify the request config
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response;
}, error => {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  if (error.response) {
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
  return Promise.reject(error);
});

// Export the Axios instance to be used throughout the app
export default axiosInstance;
