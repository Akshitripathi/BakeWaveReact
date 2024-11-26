import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      console.log('Token at start of checkAuthStatus:', token); // Debugging
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/api/auth/status', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Auth status response:', response.data); // Debugging
          if (response.data.isLoggedIn) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          } else {
            console.log('Token invalid, logging out.'); // Debugging
            logout();
          }
        } catch (error) {
          console.error('Error during auth status check:', error);
          logout();
        }
      } else {
        console.log('No token found, logging out.'); // Debugging
        logout();
      }
    };
    checkAuthStatus();
  }, []);
  
  

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsLoggedIn(true); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
