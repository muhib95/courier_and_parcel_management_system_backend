// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true,trim: true, },
  phone: { type: String, required: true, unique: true, trim:true},
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent', 'customer'], default: 'customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
