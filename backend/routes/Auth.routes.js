const express = require("express");
const {signup, signin} = require("../controllers/Auth.controller")

const router = express.Router();

//signup
router.post("/signup", signup)

// singin

router.post("/signin", signin)

module.exports = router