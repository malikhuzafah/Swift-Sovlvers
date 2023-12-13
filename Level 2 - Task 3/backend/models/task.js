const mongoose = require("mongoose");

var taskSchema = mongoose.Schema(
  {
    title: String,
    isCompleted: Boolean,
  },
  { timestamps: true }
);

var Task = mongoose.model("Task", taskSchema);
module.exports = Task;
