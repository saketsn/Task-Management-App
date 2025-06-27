// File: server/services/task.js

const Task = require("../models/tasks");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    if (!title || !description || !priority || !status) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (title.length < 6 || description.length < 6) {
      return res.status(400).json({ error: "Title and description must be at least 6 characters." });
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value." });
    }

    const validStatuses = ["yetToStart", "inProgress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const task = await new Task({ title, description, priority, status }).save();

    user.tasks.push(task._id);
    await user.save();

    return res.status(200).json({ success: "Task added" });
  } catch (error) {
    console.error("🔥 AddTask Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Re-added missing function
const editTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ success: "Task updated", task });
  } catch (error) {
    console.error("🔥 EditTask Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ success: "Task deleted" });
  } catch (error) {
    console.error("🔥 DeleteTask Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ task });
  } catch (error) {
    console.error("🔥 GetTask Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTask, editTask, deleteTask, getTask };
