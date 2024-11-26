import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'user', // Default role is user
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the API endpoint based on the role
      const endpoint = formData.role === 'admin'
        ? 'http://localhost:4000/api/admin/signup'
        : 'http://localhost:4000/api/user/signup';

      const response = await axios.post(endpoint, formData);
      setMessage(response.data.message);

      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup Error:', error);
      setError('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {message && <div className="message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <label>First Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <label>Last Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <label>Phone Number</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>Password</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <label>Confirm Password</label>
          </div>
          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <label>Role</label>
          </div>
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
          <div className="link">
            <p>
              Already have an account? <a onClick={() => navigate('/login')}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
