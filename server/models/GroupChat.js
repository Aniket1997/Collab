// models/GroupChat.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
  isGroupChat: { type: Boolean, default: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  chatName: { type: String, required: true },
  groupAdmin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('GroupChat', groupChatSchema);
