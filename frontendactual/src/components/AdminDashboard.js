import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth(); // Access `logout` from the AuthContext

  

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <div>
      <h1>Welcome to the Admin Dashboard!</h1>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
};

// Simple inline styling for the logout button
const logoutButtonStyle = {
  backgroundColor: '#ff4d4d',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  fontSize: '16px',
  borderRadius: '5px',
  marginTop: '20px',
};

export default AdminDashboard;
