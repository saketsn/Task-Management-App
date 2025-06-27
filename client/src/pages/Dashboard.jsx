import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import StackTitle from "../components/Dashboard/StackTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/users/userDetails", {
        withCredentials: true,
      });
      setTasks(res.data.tasks || {});
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:1000/api/v1/tasks/deleteTask/${taskId}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (err) {
      console.error("Delete Task Error:", err);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/tasks/editTask/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error("Update Status Error:", error);
    }
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/tasks/editTask/${taskId}`,
        { priority: newPriority },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error("Update Priority Error:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-500";
      case "low":
      default:
        return "text-green-600";
    }
  };

  const TaskCard = ({ task }) => {
    return (
      <div className="bg-white shadow-md rounded p-3 mb-2">
        <h4 className="font-semibold">{task.title}</h4>
        <p className="text-sm text-gray-600">{task.description}</p>

        {/* ✅ Editable Priority Dropdown */}
        <div className="flex items-center justify-between mt-2">
          <select
            className={`text-sm border rounded px-2 py-1 ${getPriorityColor(task.priority)}`}
            value={task.priority}
            onChange={(e) => updatePriority(task._id, e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="text-sm border rounded px-2 py-1"
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option value="yetToStart">Yet To Start</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mt-2 flex justify-end gap-2">
          {task.status !== "completed" && (
            <button
              onClick={() => updateStatus(task._id, "completed")}
              className="text-green-600 text-sm"
            >
              ✔ Done
            </button>
          )}
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 text-sm"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    );
  };

  const renderTasks = (taskArray) => {
    return taskArray.length > 0 ? (
      taskArray.map((task) => <TaskCard key={task._id} task={task} />)
    ) : (
      <p className="text-zinc-400 text-sm text-center">No tasks</p>
    );
  };

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTask} />
      </div>

      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh]">
        {loading ? (
          <p className="text-center w-full text-zinc-500">Loading tasks...</p>
        ) : (
          <>
            <div className="w-1/3">
              <StackTitle title="Yet To Start" />
              <div className="pt-2">{renderTasks(tasks?.yetToStart || [])}</div>
            </div>

            <div className="w-1/3">
              <StackTitle title="In Progress" />
              <div className="pt-2">{renderTasks(tasks?.inProgress || [])}</div>
            </div>

            <div className="w-1/3">
              <StackTitle title="Completed" />
              <div className="pt-2">{renderTasks(tasks?.completed || [])}</div>
            </div>
          </>
        )}
      </div>

      {addTask && (
        <>
          <div className="w-full h-screen fixed top-0 left-0 bg-zinc-800 opacity-80 z-40" />
          <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50">
            <AddTask setAddTaskDiv={setAddTask} fetchTasks={fetchTasks} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
