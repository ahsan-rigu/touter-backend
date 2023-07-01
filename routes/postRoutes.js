const router = require("express").Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.post("/create-post", authController.verify, postController.createPost);
router.post("/edit-post", authController.verify, postController.updatePost);
router.post("/delete-post", authController.verify, postController.deletePost);
router.get("/posts", authController.verify, postController.getPosts);
router.get("/bookmarked", authController.verify, postController.getBookmarked);
router.post("/comment", authController.verify, postController.comment);
router.post(
  "/remove-comment",
  authController.verify,
  postController.removeComment
);
router.get("/feed", authController.verify, postController.getPostsForUser);
//router.get("/u/:username", postController.getArticlesUser);
//router.get("/:id", postController.getArticle);
router.post("/like", authController.verify, postController.likeUnlike);

module.exports = router;
