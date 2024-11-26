import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/profile.css';
import Navbar from './Navbar';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      // Fetch user data
      axios
        .get('http://localhost:4000/api/profile', {
          withCredentials:true,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data.user); // Set user data
          setAddresses(response.data.addresses || []); // Update addresses
        })
        .catch((error) => {
          setError('Failed to fetch profile');
          console.error('Profile fetch error:', error.response?.data || error.message);
        });

      // Fetch order history
      axios
        .get('http://localhost:4000/api/orders', {  
          withCredentials:true,
           headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrderHistory(response.data.orders || []); // Update order history
        })
        .catch((error) => {
          setError('Failed to fetch order history');
          console.error('Order fetch error:', error.response?.data || error.message);
        });
    }
  }, [navigate]);

  const handleAddAddress = () => {
    const token = localStorage.getItem('authToken');
    if (newAddress.trim() && token) {
      axios
        .post(
          'http://localhost:4000/api/profile/address',
          { address: newAddress },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setAddresses(response.data.addresses || []); // Update addresses from server response
          setNewAddress(''); // Clear input field
        })
        .catch((error) => console.error('Error adding address:', error));
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <h2>Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>

          <div className="order-history">
            <h3>Order History</h3>
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order) => (
                  <li key={order._id}>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.productId ? item.productId._id : item._id}>
                          {item.productId ? (
                            <>
                              {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
                            </>
                          ) : (
                            <p>Product not available</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>

          <div className="addresses">
            <h3>Addresses</h3>
            {addresses.length > 0 ? (
              <ul>
                {addresses.map((address, index) => (
                  <li key={index}>{address}</li>
                ))}
              </ul>
            ) : (
              <p>No addresses found.</p>
            )}
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Add new address"
            />
            <button onClick={handleAddAddress}>Add Address</button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Profile;
