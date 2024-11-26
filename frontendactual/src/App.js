import { Layout } from 'antd';
import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminRoute from './AdminRoute.js';
import About from './components/About';
import AdminDashboard from './components/AdminDashboard';
import Customers from './components/admins/Pages/Customers/index.js';
import Inventory from './components/admins/Pages/Inventory';
import Orders from './components/admins/Pages/Orders/index.js';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import FoodMenu from './components/FoodMenu';
import Home from './components/Home';
import OrderConfirmation from './components/OrderConfirmation';
import Profile from './components/Profile';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ProtectedRoute from './ProtectedRoutes'; // Import ProtectedRoute
const {Sider,Content}=Layout;
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
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers />} />

                  {/* Protected Routes for normal users */}
                  <Route
                    path="/profile"
                    element={<ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>} />
                  <Route
                    path="/cart"
                    element={<ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>} />
                  <Route
                    path="/checkout"
                    element={<ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>} />
                  <Route
                    path="/order-confirmation"
                    element={<ProtectedRoute>
                      <OrderConfirmation />
                    </ProtectedRoute>} />


                  <Route
                    path="/admin"
                    element={<AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>} />
                </Routes>
             
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
