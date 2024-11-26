import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
