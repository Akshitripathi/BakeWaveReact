import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated
  const authToken = localStorage.getItem('token'); // Assuming token is stored in localStorage

  return authToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
