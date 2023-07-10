const User = require("../models/userModel");
const Post = require("../models/postModel");
const { likeUnlike } = require("./postController");

//change password
const deleteUser = async (req, res) => {
  try {
    const user = user.findOne({ _id: req.userID, password: req.body.pasword });
    for (let i = 0; i < user.likes.length; i++) {
      const postID = user.likes[i];
      const post = await Post.findOne({ _id: postID });
      await Post.updateOne({ _id: postID }, { $pull: { likes: req.userID } });
      res.status(201).send({ message: "Unliked" });
    }
    for (let i = 0; i < user.following.length; i++) {
      await User.updateOne(
        { _id: user.following[i] },
        { $pull: { followers: req.userID } }
      );
    }
    await Post.deleteMany({ userID: req.userID });
    //dleteCOmments
    await User.deleteOne({ _id: req.userID, password: req.body.password });
  } catch (error) {}
};

const changePassword = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.userID, password: req.body.password },
      { password: req.body.newPassword }
    );
  } catch (error) {
    res.sendStatus(500);
  }
};

const getRecommended = async (req, res) => {
  try {
    const userCurrent = await User.findOne({ _id: req.userID });
    let users = await User.find({}).select(
      "_id name username profilePicture followers"
    );
    users = users.filter(
      (user, length) =>
        user.name !== userCurrent.name &&
        !userCurrent.following.includes(user._id) &&
        length < 5
    );
    users = users.map((user) => {
      score = 0;
      for (follower of user.followers) {
        if (userCurrent.following.includes(follower)) {
          score += 1;
        }
      }
      return { ...user._doc, score };
    });
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

const search = async (req, res) => {
  try {
    let users = await User.find({}).select("_id name username profilePicture");
    user = users.filter(
      ({ name, username }) =>
        name.toLowerCase().includes(req.body.searchQ.toLowerCase()) ||
        username.toLowerCase().includes(req.body.searchQ.toLowerCase())
    );
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

//getuserwithposts
const getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  const profile = await User.findOne({ username })
    .select(
      "name username profilePicture coverPicture followers following _id links bio"
    )
    .populate({
      path: "followers",
      select: "username name profilePicture _id",
    })
    .populate({
      path: "following",
      select: "username name profilePicture _id",
    });

  req.profile = profile;
  next();
};

const getChats = async (req, res) => {
  try {
    const { chats } = await User.findOne({ _id: req.userID }).select("chats");
    res.status(200).send(chats);
  } catch (error) {
    res.sendStatus(500);
  }
};

const postMessage = async (req, res) => {
  // try {
  //   const { chats: senderChats } = User.findOne({ _id: req.userID }).select(
  //     "chats"
  //   );
  //   await User.updateOne({ _id: req.userID }, { chats: req.body.chats, sender: true });
  //   const { chats: recieverChats } = User.findOne({
  //     _id: req.body.recieverID,
  //   }).select("chats");
  //   recieverChats = recieverChats.map((chat) =>
  //     chat.partnerID === req.body.recieverID
  //       ? [...chat, { message: req.body.message }]
  //       : chat
  //   );
  //   res.status(200).send(chats);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

const updateUser = async (req, res) => {
  try {
    const { name, profilePicture, coverPicture, bio, links } = req.body;
    const resp = await User.updateOne(
      { _id: req.userID },
      { name, profilePicture, coverPicture, bio, links }
    );
    console.log(resp);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const fetchUser = async (req, res) => {
  const user = await User.findById(req.userID).populate({
    path: "following",
    select: "username name profilePicture _id",
  });
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
  updateUser,
  getChats,
  postMessage,
  getRecommended,
  changePassword,
  search,
};
