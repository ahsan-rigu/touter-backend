const UserSchema = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    await UserSchema.create({
      name,
      username,
      password,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  signup,
};
