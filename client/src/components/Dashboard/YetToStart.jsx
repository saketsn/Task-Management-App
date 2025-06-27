// File: client/src/components/Dashboard/YetToStart.jsx

import React from 'react';
import TaskCard from './TaskCard';

const YetToStart = ({ task }) => {
  return (
    <div className="flex flex-col gap-2">
      {task?.length > 0 ? (
        task.map((item, i) => <TaskCard key={i} task={item} />)
      ) : (
        <p className="text-center text-zinc-500">No tasks yet to start.</p>
      )}
    </div>
  );
};

export default YetToStart;
