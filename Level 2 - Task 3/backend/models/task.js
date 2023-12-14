const mongoose = require("mongoose");

var taskSchema = mongoose.Schema(
  {
    title: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var Task = mongoose.model("Task", taskSchema);
module.exports = Task;
