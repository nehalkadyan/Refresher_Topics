const express = require("express");
const {signup} = require("../controllers/Auth.controller")

const router = express.Router();

router.post("/signup", signup)

module.exports = router