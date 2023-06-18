const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  coverPicture: {
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
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
