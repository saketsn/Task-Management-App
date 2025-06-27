// File: server/models/tasks.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true,
  },
  status: {
    type: String,
    enum: ["yetToStart", "inProgress", "completed"],
    default: "yetToStart",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
