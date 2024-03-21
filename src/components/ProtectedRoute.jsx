// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  // alert(location.pathname);
  if (location.pathname === '/logout') {
    // alert("0");
    localStorage.removeItem('authToken');
    return <Navigate to="/login" replace />;
  }
  if (localStorage.getItem('authToken') != null && location.pathname === '/login') {
    // alert("1");
    return <Navigate to="/dashboard" replace />;
  }
  if (localStorage.getItem('authToken') == null && location.pathname !== '/login' && location.pathname !== '/signup') {
    // User not logged in, redirect to login page
    // alert("2");
    localStorage.removeItem('authToken');
    return <Navigate to="/login" replace />;
  }
  if (localStorage.getItem('authToken') != null && location.pathname === '/signup') {
    // alert("1");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
