const express = require("express");
const {verifyUser} = require("../utils/verifuUser");
const {changeUsername} = require("../controllers/User.controller")

const router = express.Router();

router.patch("/editpassword", changeUsername)

module.exports = router