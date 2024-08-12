const express = require("express");
const router = express.Router();
const { isAdmin, isUser } = require("../middlewares/authMiddleware");
const {
  remove,
  update,
  create,
  createMany,
  findAll,
  findOne,
} = require("../controllers/gameController");
const {
  addRating,
  addComment,
  deleteComment,
} = require("../controllers/opinionGameController");

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/create", isAdmin, create);
router.post("/createMany", isAdmin, createMany);
router.delete("/:id", isAdmin, remove);
router.put("/:id", isAdmin, update);
router.post("/:id/rate", isUser, addRating);
router.post("/:id/comment", isUser, addComment);
router.delete("/:id/comments/:commentId", isUser, deleteComment);

module.exports = router;
