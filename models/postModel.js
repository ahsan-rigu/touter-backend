const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userID: { type: String },
  postBody: { type: String },
  img: { type: String },
  likes: { type: [{ type: String }] },
  comments: { type: Array },
});
