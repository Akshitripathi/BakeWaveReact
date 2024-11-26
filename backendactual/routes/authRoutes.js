const express = require('express');
const { sendOtp, verifyOtp, signup, verifyToken } = require('../controllers/authControllers');
const jwt= require('jsonwebtoken');
const router = express.Router();

router.post('/user/login', sendOtp);      
 
router.post('/user/signup',signup);

router.post('/user/verifyUserLogin', verifyOtp);


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.user = user;
      next();
  });
};
router.get('/auth/status', authenticateToken, (req, res) => {
  res.status(200).json({
      isLoggedIn: true,
      user: req.user, 
  });
});
router.post('/auth/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful, please clear the token on the client side' });
  });

module.exports = router;
