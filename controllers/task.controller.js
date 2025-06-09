const taskService = require("../service/task.service");

class TaskController {
  async getAll(req, res, next) {
    const allTasks = await taskService.getAll(req.user.id);
    return res.json(allTasks);
  }

  async create(req, res, next) {
    try {
      const { title, description, status, priority, deadline } = req.body;

      const newTask = await taskService.create(
        req.user.id,
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

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const updateTask = taskService.update(body, params.id);
      return res.json(updateTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedTask = await taskService.delete(req.params.id);
      return res.json(deletedTask);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();
