// models/UserProfile.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  profileCompletion: { type: Number, default: 0 }, // Stores percentage of profile completion
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
