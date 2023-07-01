const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  try {
    if (req.body.img || req.body.postBody)
      await Post.create({ ...req.body, userID: req.userID });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPostsByUsername = async (req, res) => {
  try {
    const posts = await Post.find({ userID: req.profile._id })
      .populate({
        path: "userID",
        select: "username name profilePicture",
      })
      .populate({
        path: "likes",
        select: "username name profilePicture _id",
      });
    res.status(200).send({ profile: { ...req.profile._doc, posts } });
  } catch (error) {
    res.sendStatus(500);
  }
};

const updatePost = async (req, res) => {
  try {
    if (req.body.img || req.body.postBody)
      await Post.updateOne(
        { _id: req.body.postID },
        { postBody: req.body.postBody, img: req.body.img }
      );
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.body.postID });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPostsForUser = async (req, res) => {
  try {
    const { following } = await User.findOne({ _id: req.userID });
    const posts = await Post.find({})
      .populate({
        path: "userID",
        select: "username name profilePicture",
      })
      .populate({
        path: "likes",
        select: "username name profilePicture _id",
      });
    const postsForUser = posts.filter(({ userID }) =>
      following.includes(userID._id)
    );
    res.status(200).send(postsForUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "userID",
        select: "username name profilePicture",
      })
      .populate({
        path: "likes",
        select: "username name profilePicture _id",
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
  try {
    const { postID } = req.body;
    const post = await Post.findOne({ _id: postID });
    if (post.likes.includes(req.userID)) {
      await Post.updateOne({ _id: postID }, { $pull: { likes: req.userID } });
      res.status(201).send({ message: "Unliked" });
    } else {
      const resp = await Post.updateOne(
        { _id: postID },
        { $push: { likes: req.userID } }
      );
      res.status(201).send({ message: "Liked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const getBookmarked = async (req, res) => {
  try {
    const { bookmarks } = await User.findOne({ _id: req.userID });
    const posts = await Post.find({})
      .populate({
        path: "userID",
        select: "username name profilePicture",
      })
      .populate({
        path: "likes",
        select: "username name profilePicture _id",
      });
    const postsForUser = posts.filter(({ _id }) => bookmarks.includes(_id));
    res.status(200).send(postsForUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const comment = async (req, res) => {
  try {
    const { postID, comment } = req.body;
    await Post.updateOne({ _id: postID }, { $push: { comments: comment } });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

const removeComment = async (req, res) => {
  try {
    const { postID, comment } = req.body;
    await Post.updateOne({ _id: postID }, { $pull: { comments: comment } });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failure",
      error,
    });
  }
};

module.exports = {
  getBookmarked,
  createPost,
  getPosts,
  getPostsForUser,
  likeUnlike,
  updatePost,
  deletePost,
  comment,
  removeComment,
  getPostsByUsername,
};
