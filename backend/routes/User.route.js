const express = require("express");
const {verifyUser} = require("../utils/verifyUser");
const {changeUsername} = require("../controllers/User.controller")

const router = express.Router();

router.patch("/editusername", verifyUser, changeUsername)

// Homework -> Create a route and controller function for deleting account

module.exports = router