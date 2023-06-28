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
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profilePicture: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0W4cTMxl3c4u738PdwJvW2xpbVnlvCZcTm-WiqHURQ&s",
  },
  coverPicture: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/005/412/075/original/abstract-pastel-purple-minimal-background-for-invitation-or-banner-free-vector.jpg",
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
