const mongoose = require('mongoose');
const bcrypt= require('bcryptjs')
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
  addresses: { type: [String], default: [] },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  otp: { type: String },
  otpExpiry: { type: Date },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);