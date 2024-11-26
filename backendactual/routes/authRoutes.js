const express = require('express');
const { sendOtp, verifyOtp, signup, verifyToken } = require('../controllers/authControllers');
const authMiddleware= require('../middleware/authMiddleware');
const router = express.Router();

router.post('/user/login', sendOtp);      
 
router.post('/user/signup',signup);

router.post('/user/verifyUserLogin', verifyOtp);

router.get('/status', authMiddleware(), (req, res) => {
  res.status(200).json({
      isLoggedIn: true,
      user: req.user, // User info attached by the authMiddleware
  });
});
router.post('/auth/logout', (req, res) => {
    // Since JWT is stateless, logout is handled client-side by removing the token
    res.status(200).json({ message: 'Logout successful, please clear the token on the client side' });
  });

module.exports = router;
