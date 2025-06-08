const taskService = require("../service/task.service");

class TaskController {
  async getAll(req, res, next) {}

  async create(req, res, next) {
    try {
      const { title, description, status, priority, deadline } = req.body;

      const newTask = await taskService.create(
        title,
        description,
        status,
        priority,
        deadline
      );

      return res.json(newTask);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
