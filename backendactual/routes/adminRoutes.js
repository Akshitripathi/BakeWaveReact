const express = require('express');
const {
  adminSignup,
  verifyAdminSignup,
  adminLogin,
  verifyAdminLogin,
  getAllUsers,
  deleteUser,
} = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication
const authorizeRole = require('../middleware/roleMiddleware'); // Middleware for admin-only routes

const router = express.Router();

// Admin Signup Route
router.post('/signup', adminSignup);


// Admin Login Route
router.post('/login', adminLogin);

// Verify OTP for Login
router.post('/verifyadminLogin', verifyAdminLogin);

// Fetch All Users (Protected: Admin Only)
router.get('/users', authenticate(['admin']), getAllUsers);

// Delete a User by ID (Protected: Admin Only)
router.delete('/users/:userId', authenticate(['admin']), deleteUser);

module.exports = router;
