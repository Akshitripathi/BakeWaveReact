import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Home from './components/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import FoodMenu from './components/FoodMenu';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import ProtectedRoute from './ProtectedRoutes'; // Import ProtectedRoute
import AdminDashboard from './components/AdminDashboard.js'; // Admin dashboard component
import AdminRoute from './AdminRoute.js'; // AdminRoute component to protect admin routes

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <CartProvider> {/* Wrap components needing access to CartContext */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/food-menu" element={<FoodMenu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes for normal users */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            {/* <Route
              path="/admin-dashboard"
              element={
                isLoggedIn && user?.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Login /> // Redirect to login if not admin
                )
              }
            /> */}
            {/* Alternatively, use AdminRoute to handle redirection */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
