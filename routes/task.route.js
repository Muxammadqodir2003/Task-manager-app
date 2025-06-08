const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.get("/get-all", taskController.getAll);
router.post("/create", taskController.create);

module.exports = router;
