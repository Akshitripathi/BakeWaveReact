require('dotenv').config();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
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
    

    const newAdmin = new Admin({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      
    });

    await newAdmin.save();
    

    res.status(200).json({ message: 'Signup succesful' });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password} = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    

    // Generate OTP and store it
    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Login OTP',
      text: `Your OTP for admin login is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    

    res.status(200).json({ message: 'OTP sent to your mail. Verify to complete login.' });
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


