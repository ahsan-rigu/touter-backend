const User = require("../models/userModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    await User.create({
      name,
      username,
      password,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      console.log("asdasd");
      res.status(401).send({ message: "Username and Password don't match" });
    } else {
      jwt.sign(
        { _id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "24hr" },
        (error, token) => {
          if (error) {
            res.status(500).send({ message: "Token Generation Failed" });
          } else {
            res.status(200).send({ message: "Logged In", token });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send({ message: "Unknown Database Error" });
  }
};

module.exports = {
  signup,
  login,
};
