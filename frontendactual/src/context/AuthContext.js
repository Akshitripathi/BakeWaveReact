import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token'); // Check for token in localStorage
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/api/auth/status', {
            headers: { Authorization: `Bearer ${token}` }, // Validate the token
          });
          if (response.data.isLoggedIn) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          } else {
            logout(); // Clear state and localStorage on failure
          }
        } catch (error) {
          console.error('Error during auth status check:', error);
          logout();
        }
      } else {
        logout();
      }
    };
    checkAuthStatus();
  }, []);
  

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true); // Set login state to true on successful login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false); // Set login state to false on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
