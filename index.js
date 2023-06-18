const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);

app.use("*", (req, res) => {
  consol.log("someone is trying to access a non existing route");
  res.send("Route Not Found");
});

app.listen(8080, () => {
  console.log("listning (8080)");
});
