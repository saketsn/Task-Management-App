// File: client/src/components/Dashboard/Completed.jsx

import React from 'react';
import TaskCard from './TaskCard';

const Completed = ({ task }) => {
  return (
    <div className="flex flex-col gap-2">
      {task?.length > 0 ? (
        task.map((item, i) => <TaskCard key={i} task={item} />)
      ) : (
        <p className="text-zinc-400 text-sm text-center">No completed tasks.</p>
      )}
    </div>
  );
};

export default Completed;
