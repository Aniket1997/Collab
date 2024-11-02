// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Add password field if not already in schema
  displayName: { type: String },
  photoURL: { type: String },
  phone:{ type:String }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
