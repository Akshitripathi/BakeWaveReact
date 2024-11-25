const express = require('express');
const { sendOtp, verifyOtp, signup } = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', sendOtp);      
 
router.post('/signup',signup);

router.post('/verifyUserLogin', verifyOtp);

module.exports = router;
