const express = require('express');
const { model } = require('mongoose');

const protect = require("../middleware/authMiddleware");

const postCtrl = require('../controllers/postController');

const router = express.Router();


//localhost;3000/ GET
// LOCALHOST:3000/ POST will post data.

// use of next() & session. 
// router.route("/").get(postCtrl.getAllPosts).post(protect, postCtrl.createPost);
router.route("/").get(postCtrl.getAllPosts).post(postCtrl.createPost);

router.route("/:id").get(postCtrl.getOnePost).patch(postCtrl.updatePost).delete(postCtrl.deletePost);


module.exports = router;