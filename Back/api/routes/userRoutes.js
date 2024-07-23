const { signup, login } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
//router.get("/")

module.exports = router;
