const {
  remove,
  update,
  create,
  findAll,
  findOne,
} = require("../controllers/gameController.js");
const express = require("express");
const router = express.Router();

router.delete("/:id", isAdmin, remove);
router.put("/:id", isAdmin, update);
router.post("/:id", isAdmin, create);
router.get(findAll);
router.get(findOne);

module.exports = router;
