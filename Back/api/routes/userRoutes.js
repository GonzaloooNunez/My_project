const express = require("express");
const router = express.Router();
const { isUser } = require("../middlewares/authMiddleware");
const {
  signup,
  login,
  findOneById,
  updateUser,
} = require("../controllers/userController");

//const authenticateToken = require("./middlewares/authenticateToken");

router.post("/signup", signup);
router.post("/login", login);
router.get("/");
router.get("/:id", findOneById);
router.put("/:id", isUser, updateUser);
//router.get("/:id",authenticateToken, findOneById);

module.exports = router;
