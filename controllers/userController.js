const User = require("../models/userModel");

//delete user

//change password

//getUser

const fetchUser = async (req, res) => {
  const user = await User.findById(req.userID);
  res.status(200).send({ user });
};

//bookmark

//like

//follow

//unfollow

module.exports = {
  fetchUser,
};
