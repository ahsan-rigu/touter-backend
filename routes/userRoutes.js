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
router.post("/bookmark", authController.verify, userController.bookmark);
router.post(
  "/remove-bookmark",
  authController.verify,
  userController.removeBookmark
);
router.post("/follow", authController.verify, userController.followUnfollow);

module.exports = router;
