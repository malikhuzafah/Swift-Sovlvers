const express = require("express");
const router = express.Router();
const Task = require("../../models/task");

// get all tasks
router.get("/", async (req, res) => {
  try {
    let tasks = await Task.find();
    return res.send(tasks);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// get task by id
router.get("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("Task with given id is not present");
    return res.send(task);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// update a task
router.put("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("Task with given id is not present");
    task.title = req.body.title;
    task.isCompleted = req.body.isCompleted;
    await task.save();
    return res.send(task);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// delete a task
router.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("Task with given id is not present");
    await task.delete();
    return res.send(task);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

// create a task
router.post("/", async (req, res) => {
  try {
    let task = new Task();
    task.title = req.body.title;
    task.isCompleted = req.body.isCompleted;
    await task.save();
    return res.send(task);
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
