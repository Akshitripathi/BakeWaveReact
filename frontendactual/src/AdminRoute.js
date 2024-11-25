import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log("Is Logged In:", isLoggedIn);
  console.log("User:", user);

  // Check if the user is logged in and is an admin
  if (!isLoggedIn || !user?.isAdmin) {
    return <Navigate to="/login" />; // Redirect to login if not admin
  }

  return children; // Render children (admin dashboard) if admin
};

export default AdminRoute;
