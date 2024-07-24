const { signup, login, findOneById } = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/");
router.get("/:id", findOneById);

module.exports = router;
