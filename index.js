const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use("*", (req, res) => {
  console.log("someone is trying to access a non existing route", req.params);
  res.send("Route Not Found");
});

app.listen(8080, () => {
  console.log("listning (8080)");
});
