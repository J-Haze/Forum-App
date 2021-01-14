const express = require("express");
const router = express.Router();

var user_controller = require("../controllers/user_controller");

const auth = require("../middleware/auth");

router.get("/", auth, user_controller.get_current_user);

// GET - Get all users
router.get("/users", user_controller.get_users);

//Get New User/Sign-Up page
router.get("/new", user_controller.get_create_user);

//POST Sign-Up page
router.post("/new", user_controller.post_create_user);

// //Get Log-In page
router.get("/log-in", user_controller.get_user_login);

// //POST Log-In
router.post("/log-in", user_controller.post_user_login);

//Log-Out
router.get("/log-out", user_controller.user_logout_get);

//Get all posts from current user
router.get("/posts", auth, user_controller.get_currentUser_posts);

//Get all posts by specific author
router.get("/:userid/posts", user_controller.get_user_posts);

module.exports = router;
