const express = require("express");
const { register, login } = require("../Controller/user.js");
const authMiddleware = require("../middleware/auth.js");
const router = express.Router()

router.post("/register",register);

router.post("/login",login)

module.exports=router;