require('dotenv').config();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

const otpStore = {};

// Admin Signup
exports.adminSignup = async (req, res) => {
  const { username, email, phone, password, firstName, lastName } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }, { username }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email, phone, or username already exists' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStore[phone] = otp;

    // Send OTP via SMS
    const message = `Your OTP for verification is: ${otp}`;
    await client.messages.create({
      body: message,
      from:'+12513104706', // Ensure this is configured correctly
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent to your phone number. Verify to complete signup.' });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Verify OTP and Complete Signup
exports.verifyAdminSignup = async (req, res) => {
  const { username, email, phone, password, firstName, lastName, otp } = req.body;

  try {
    // Check OTP validity
    if (otpStore[phone] !== parseInt(otp, 10)) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Create new admin
    const newAdmin = new Admin({ username, email, phone, password, firstName, lastName });
    await newAdmin.save();

    // Remove OTP after successful signup
    delete otpStore[phone];

    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    console.error('Admin OTP verification error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password} = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate OTP and store it
    const otp = generateOTP();
    otpStore[email] = otp;

    // Send OTP via SMS
    const message = `Your OTP for admin login is: ${otp}`;
    await client.messages.create({
      body: message,
      from: '+12513104706',
      to: admin.phone,
    });
    

    res.status(200).json({ message: 'OTP sent to your phone number. Verify to complete login.' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Verify OTP and Complete Login
exports.verifyAdminLogin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check OTP validity
    if (otpStore[email] !== parseInt(otp, 10)) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    // Remove OTP after successful login
    delete otpStore[email];

    res.status(200).json({ token, admin });
  } catch (error) {
    console.error('Admin OTP verification error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Fetch All Users
exports.getAllUsers = async (req, res) => {
  const User = require('../models/User'); // Import User schema dynamically

  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

// Delete a User
exports.deleteUser = async (req, res) => {
  const User = require('../models/User'); // Import User schema dynamically
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};


