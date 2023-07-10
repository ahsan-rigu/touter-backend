const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/authorize", authController.verify, authController.authorize);
router.get("/fetch-user", authController.verify, userController.fetchUser);
router.get(
  "/profile/:username",
  authController.verify,
  userController.getUserByUsername,
  postController.getPostsByUsername
);
router.get("/chats", authController.verify, userController.getChats);
router.post("/message", authController.verify, userController.postMessage);
router.post("/bookmark", authController.verify, userController.bookmark);
router.post("/update", authController.verify, userController.updateUser);
router.post(
  "/remove-bookmark",
  authController.verify,
  userController.removeBookmark
);
router.post("/follow", authController.verify, userController.followUnfollow);
router.post("/search", authController.verify, userController.search);
router.get(
  "/recommended",
  authController.verify,
  userController.getRecommended
);

module.exports = router;
