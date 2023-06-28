const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.img || req.body.postBody)
      await Post.create({ ...req.body, userID: req.userID });

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id });
    req.status(200).send(post);
  } catch (error) {
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const getPostsForUser = async (req, res) => {
  try {
    const { userID, page } = req.body;
    const following = await User.findById(userID).select("following");
    const postsForUser = (await Post.find({})).filter(({ userID }) =>
      following.includes(userID)
    );
    res.status(200).send(postsForUser);
  } catch (error) {
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    console.log("asdasd");
    const posts = await Post.find({}).populate({
      path: "User",
      populate: "username name profilePicture",
      strictPopulate: false,
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const likeUnlike = async (req, res) => {
  //expected req body = {current userID, postID}
  try {
    const { postID, userID } = req.body;
    const post = await Post.findOne({ _id: postID });
    if (article.likes.includes(userID)) {
      await Post.updateOne({ _id: postID }, { $pull: { likes: userID } });
      res.sendStatus(201);
    } else {
      await Post.updateOne({ _id, postID }, { $push: { likes: userID } });
      req.sendStatus(201);
    }
  } catch (error) {
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsForUser,
  likeUnlike,
};
