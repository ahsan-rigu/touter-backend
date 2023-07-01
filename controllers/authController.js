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
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).send({ message: "username password don't match" });
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

const verify = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403).send({ message: "No authorisation" });
  } else {
    const token = authorization.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_KEY, (error, { _id }) => {
        if (error) {
          res.sendStatus(500);
        }
        req.userID = _id;
        next();
      });
    } catch (e) {
      res.status(500).send({
        status: "failure",
        message: e.message,
      });
    }
  }
};

const authorize = async (req, res) => {
  res.send("authorized");
};

module.exports = {
  signup,
  login,
  verify,
  authorize,
};
