// File: client/src/components/Dashboard/TaskCard.jsx

import React from "react";

const TaskCard = ({ task }) => {
  const priority = task?.priority?.toLowerCase();

  return (
    <div className="bg-white rounded px-4 py-2 hover:shadow transition-all duration-300">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{task?.title || 'No Title'}</h1>
        <div
          className={`text-sm px-2 rounded-full ${
            priority === "high"
              ? "text-red-500 bg-red-100"
              : priority === "medium"
              ? "text-yellow-600 bg-yellow-100"
              : "text-green-500 bg-green-100"
          }`}
        >
          <p>{task?.priority || 'Low'}</p>
        </div>
      </div>
      <hr className="my-2" />
      <p className="text-sm text-zinc-500 text-start">
        {task?.description || 'No description provided.'}
      </p>
    </div>
  );
};

export default TaskCard;
