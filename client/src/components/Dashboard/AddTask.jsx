import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ setAddTaskDiv, fetchTasks }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.description) {
      alert("Title and Description are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/tasks/addTask",
        values,
        { withCredentials: true }
      );

      if (res.status === 200 && res.data.success) {
        alert("✅ Task successfully added.");
        setAddTaskDiv(false);
        fetchTasks(); // 🔄 Refresh dashboard
      } else {
        throw new Error(res.data.error || "Task creation failed");
      }
    } catch (error) {
      console.error("❌ Task creation failed:", error.message);
      alert(error?.response?.data?.error || "❌ Task creation failed.");
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          value={values.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={values.description}
          onChange={handleChange}
          required
        />
        <div className="flex items-center justify-between gap-4">
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
          >
            <option value="yetToStart">Yet To Start</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button type="submit" className="bg-blue-800 text-white py-2 rounded w-full">
            Add Task
          </button>
          <button type="button" onClick={() => setAddTaskDiv(false)} className="border border-black py-2 rounded w-full">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
