const User = require("../models/userModel");

//change password

//getuserwithposts
const getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  const profile = await User.findOne({ username }).select(
    "name username profilePicture coverPicture followers following _id"
  );
  req.profile = profile;
  next();
};

const fetchUser = async (req, res) => {
  const user = await User.findById(req.userID);
  res.status(200).send({ user });
};

const bookmark = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.userID },
      { $push: { bookmarks: req.body.postID } }
    );
    res.status(201).send({ message: "Bookmark Added" });
  } catch (error) {
    console.log(error);
    res.status(201).send({ message: "Bookmark Add Failed" });
  }
};

const removeBookmark = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.userID },
      { $pull: { bookmarks: req.body.postID } }
    );
    res.status(201).send({ message: "Bookmark Removed" });
  } catch (error) {
    console.log(error);
    res.status(201).send({ message: "Bookmark Remove Failed" });
  }
};

const followUnfollow = async (req, res) => {
  try {
    const { followingID } = req.body;
    const user = await User.findOne({ _id: req.userID });
    if (user.following.includes(followingID)) {
      await User.updateOne(
        { _id: req.userID },
        { $pull: { following: followingID } }
      );
      await User.updateOne(
        { _id: followingID },
        { $pull: { followers: req.userID } }
      );
      res.status(201).send({ message: "Unfollowed" });
    } else {
      await User.updateOne(
        { _id: req.userID },
        { $push: { following: followingID } }
      );
      await User.updateOne(
        { _id: followingID },
        { $push: { followers: req.userID } }
      );
      res.status(201).send({ message: "Follwed" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  fetchUser,
  getUserByUsername,
  removeBookmark,
  bookmark,
  followUnfollow,
};
