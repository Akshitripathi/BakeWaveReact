import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login from context
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' }); // Default to user
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/${formData.role}/login`, formData); // Dynamically choose endpoint
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
        const response = await axios.post(
            `http://localhost:4000/api/${formData.role}/verify${formData.role}Login`,
            { email: formData.email, otp }
        );
        console.log("Full Response Data:", response.data); // Debugging log

        // Check if token exists and role is admin
        if (response.data.token && response.data.admin && response.data.admin.role === 'admin') {
            console.log("Navigating to admin dashboard");
            localStorage.setItem('token', response.data.token);
            login(response.data.token, response.data.admin);

            navigate('/admin');
        } else {
            console.log("Navigating to user dashboard");
            navigate('/');
        }
    } catch (error) {
        setError('Invalid OTP. Please try again.');
    }
};

  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendOtp();
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {message && <div className="message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          {!otpSent ? (
            <>
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
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
                <label>Enter OTP</label>
              </div>
              <button type="button" className="auth-btn" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}
          <div className="link">
            <p>
              Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
