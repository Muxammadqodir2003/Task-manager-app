const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: [true, "Title is required"] },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "hight"],
      default: "medium",
    },
    deadline: {
      type: Date,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Task", TaskSchema);
