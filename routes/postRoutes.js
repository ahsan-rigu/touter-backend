const router = require("express").Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.post("/create-post", authController.verify, postController.createPost);
// router.put("/:id", authController.verify, postController.updateArticle);
//router.delete("/:id", authController.verify, postController.deleteArticle);
router.get("/posts", authController.verify, postController.getPosts);
//router.get("/u/:username", postController.getArticlesUser);
//router.get("/:id", postController.getArticle);
//router.get("/:id/like", authController.verify, postController.likeUnlike);

module.exports = router;
