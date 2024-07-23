const { isAdmin, isUser } = require("../middlewares/authorization");
const {
  remove,
  update,
  create,
  createMany,
  findAll,
  findOne,
} = require("../controllers/gameController");
const express = require("express");
const router = express.Router();

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/create", isAdmin, create);
router.post("/createMany", isAdmin, createMany);
router.delete("/:id", isAdmin, remove);
router.put("/:id", isAdmin, update);

module.exports = router;
