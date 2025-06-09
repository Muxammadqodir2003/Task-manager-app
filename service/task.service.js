const TaskDto = require("../dtos/task.dto");
const taskModel = require("../models/task.model");

class TaskService {
  async getAll(userId) {
    const allTasks = await taskModel.find({ user: userId });
    const taskDto = allTasks.map((task) => new TaskDto(task));
    return taskDto;
  }

  async create(userId, title, description, status, priority, deadline) {
    const task = await taskModel.create({
      user: userId,
      title,
      description,
      status,
      priority,
      deadline: deadline ? new Date(deadline) : null,
    });

    return task;
  }

  async update(task, taskId) {
    const findTask = await taskModel.findByIdAndUpdate(
      taskId,
      { ...task },
      {
        new: true,
      }
    );
    const taskDto = new TaskDto(findTask);
    return taskDto;
  }

  async delete(taskId) {
    return await taskModel.findOneAndDelete(taskId);
  }
}

module.exports = new TaskService();
