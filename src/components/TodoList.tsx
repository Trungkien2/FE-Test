import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  // Simulating fetching tasks from a mock API
  useEffect(() => {
    const fetchTasks = async () => {
      // Replace with actual API call if needed
      const mockTasks: Task[] = [
        { id: 1, text: "Go to the grocery", completed: false },
        { id: 2, text: "Do the laundry", completed: true },
        { id: 3, text: "Walk the dog", completed: false },
      ];
      setTasks(mockTasks);
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, text: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const handleToggleCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (
    filterType: "all" | "completed" | "incomplete"
  ) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-900">
      <div className="w-full max-w-md p-6 bg-indigo-800 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white text-center mb-6">Todo List</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-3 py-2 rounded bg-indigo-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-500"
          />
          <button
            onClick={handleAddTask}
            className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Add Task
          </button>
        </div>

        <div className="mb-4 flex justify-between">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-2 rounded ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-700 text-gray-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-3 py-2 rounded ${
              filter === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-700 text-gray-400"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleFilterChange("incomplete")}
            className={`px-3 py-2 rounded ${
              filter === "incomplete"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-700 text-gray-400"
            }`}
          >
            Incomplete
          </button>
        </div>

        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-indigo-600 p-3 rounded text-white"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task.id)}
                  className="mr-2"
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
