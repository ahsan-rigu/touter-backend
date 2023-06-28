const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/authorize", authController.verify, authController.authorize);
router.get("/fetch-user", authController.verify, userController.fetchUser);

module.exports = router;
