const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postBody: { type: String },
  img: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  comments: { type: Array, default: [] },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
