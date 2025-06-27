// File: client/src/components/Dashboard/InProgress.jsx

import React from 'react';
import TaskCard from './TaskCard';

const InProgress = ({ task }) => {
  return (
    <div className="flex flex-col gap-2">
      {task?.length > 0 ? (
        task.map((item, i) => <TaskCard key={i} task={item} />)
      ) : (
        <p className="text-center text-zinc-500">No tasks in progress.</p>
      )}
    </div>
  );
};

export default InProgress;
