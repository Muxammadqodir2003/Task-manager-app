const taskModel = require("../models/task.model");

class TaskService {
  async getAll() {}

  async create(title, description, status, priority, deadline) {
    const task = await taskModel.create({
      title,
      description,
      status,
      priority,
      deadline: deadline ? new Date(deadline) : null,
    });
  }
}

module.exports = new TaskService();
