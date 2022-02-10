const express = require('express');
const { model } = require('mongoose');

const authController = require('../controllers/authController');

const router = express.Router();


//localhost;3000/ GET
// LOCALHOST:3000/ POST will post data.

 router.post("/signup", authController.signUp);
 router.post("/login", authController.login);

module.exports = router;