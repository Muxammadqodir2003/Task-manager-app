const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/get-all", authMiddleware, taskController.getAll);
router.post("/create", authMiddleware, taskController.create);
router.put("/update-task/:id", authMiddleware, taskController.update);
router.delete("/delete-task/:id", authMiddleware, taskController.delete);

module.exports = router;
