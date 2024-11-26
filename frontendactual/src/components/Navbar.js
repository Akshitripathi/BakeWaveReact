import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../css/Navbar.css';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const { cartItems, removeItemFromCart } = useCart();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      logout();
      navigate('/login');
    };
  
    const toggleCart = () => setIsCartOpen((prev) => !prev);
  
    const calculateTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item logo" onClick={() => navigate('/')}>
            BakeWave
          </li>
          <div className="navbar-links">
            <li className="navbar-item" onClick={() => navigate('/')}>Home</li>
            <li className="navbar-item" onClick={() => navigate('/about')}>About</li>
            <li className="navbar-item" onClick={() => navigate('/contact')}>Contact</li>
            {isLoggedIn && <li className="navbar-item" onClick={() => navigate('/food-menu')}>Menu</li>}
          </div>
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                {user?.isAdmin && <li className="navbar-item" onClick={() => navigate('/admin')}>Admin Dashboard</li>}
                <li className="navbar-item" onClick={() => navigate('/profile')}>Profile</li>
                <li className="navbar-item cart-icon" onClick={toggleCart}>
                  <FaShoppingCart />
                  {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                </li>
                <li className="navbar-item">
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item" onClick={() => navigate('/login')}>Sign In</li>
                <li className="navbar-item" onClick={() => navigate('/signup')}>Sign Up</li>
              </>
            )}
          </div>
        </ul>
  
        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="cart-dropdown">
            <h3>Cart Items</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img src={`http://localhost:4000/${item.image}`} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <p>{item.name}</p>
                        <p>Price: ₹{item.price.toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <button className="remove-btn" onClick={() => removeItemFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <h4>Total: ₹{calculateTotal()}</h4>
                  <button
  className="checkout-btn"
  onClick={() => {
    setIsCartOpen(false);
    navigate('/checkout-page');
  }}
>
  Checkout
</button>

                </div>
              </>
            )}
          </div>
        )}
      </nav>
    );
  };
  

export default Navbar;
