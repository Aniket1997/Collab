// models/Chat.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  chatName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
