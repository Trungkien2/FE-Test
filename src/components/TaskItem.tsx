import React from "react";
import { Task } from "../interface/Task.interface";

interface TaskProps {
  task: Task;
  handleToggleCompletion: () => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, handleToggleCompletion }) => {
  return (
    <li
      key={task.id}
      className="flex justify-between items-center bg-indigo-600 p-3 rounded text-white"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion}
          className="mr-2"
        />
        <span
          className={`${task.completed ? "line-through text-gray-400" : ""}`}
        >
          {task.text}
        </span>
      </div>
    </li>
  );
};

export default TaskItem;
