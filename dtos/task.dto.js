module.exports = class TaskDto {
  id;
  user;
  title;
  description;
  status;
  priority;
  deadline;
  isOverdue;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model._id;
    this.user = model.user;
    this.title = model.title;
    this.description = model.description;
    this.status = model.status;
    this.priority = model.priority;
    this.deadline = model.deadline;
    this.isOverdue = model.isOverdue;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
};
