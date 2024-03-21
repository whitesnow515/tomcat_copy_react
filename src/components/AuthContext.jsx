// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogin = () => setIsLoggedIn(true);
  const setLogout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
