const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profilePicture: {
    type: String,
  },
  followers: {
    type: [{ type: String }],
    default: [],
  },
  following: {
    type: [{ type: String }],
    default: [],
  },
  chats: {
    type: [],
    default: [],
  },
  jwtToken: {
    type: String,
  },
});
