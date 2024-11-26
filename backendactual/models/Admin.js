const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }, // Fixed role
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpiry: { type: Date },
});

// Hash password before saving

// Hash password before saving
adminSchema.pre('save', async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error); // Pass error to middleware
  }
});

// Compare passwords
adminSchema.methods.comparePassword = async function (inputPassword) {
  console.log('Input Password:', inputPassword);
  console.log('Stored Hashed Password:', this.password);

  const isMatch = await bcrypt.compare(inputPassword, this.password);
  console.log('Password Match:', isMatch);

  return isMatch;
};

module.exports = mongoose.model('Admin', adminSchema);
