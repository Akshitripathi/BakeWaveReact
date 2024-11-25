import axios from 'axios';

// Set up the base URL
const API_URL = "http://localhost:5000/api/auth";

// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error.response.data;
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response.data;
  }
};
