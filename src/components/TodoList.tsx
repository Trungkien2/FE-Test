import React, { useState, useEffect } from "react";
import { Task } from "../interface/Task.interface";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TaskApi from "../api/TaskApi";
import { SubmitHandler, useForm } from "react-hook-form";

interface ITaskFormInput {
  text: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITaskFormInput>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await TaskApi.getAll();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onSubmit: SubmitHandler<ITaskFormInput> = async (data) => {
    try {
      const addedTask = await TaskApi.add<{ text: string; completed: boolean }>(
        {
          text: data.text,
          completed: false,
        }
      );

      setTasks((prevTasks) => [...prevTasks, addedTask]);

      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleCompletion = async (id: number | string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (!taskToUpdate) {
      console.error("Task not found:", id);
      return;
    }

    const updatedTaskData = {
      completed: !taskToUpdate.completed,
      text: taskToUpdate.text,
    };

    try {
      await TaskApi.update<typeof updatedTaskData>(id, updatedTaskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleFilterChange = (
    filterType: "all" | "completed" | "incomplete"
  ) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "incomplete":
        return !task.completed;
      default:
        return true;
    }
  });
  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-900">
      <div className="w-full max-w-md p-6 bg-indigo-800 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white text-center mb-6">Todo List</h1>

        <div className="mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <input
              {...register("text", { required: "Task Title is required" })}
              type="text"
              placeholder="Add a new task..."
              className="w-full px-3 py-2 rounded bg-indigo-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring focus:border-indigo-500"
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
            )}
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="mb-4 flex justify-between">
          <Button
            handleClick={() => handleFilterChange("all")}
            title="All"
            filter={filter}
          />
          <Button
            handleClick={() => handleFilterChange("completed")}
            title="Completed"
            filter={filter}
          />
          <Button
            handleClick={() => handleFilterChange("incomplete")}
            title="Incomplete"
            filter={filter}
          />
        </div>

        <ul className="space-y-3">
          {filteredTasks?.length === 0 ? (
            <li className="text-white text-center">No tasks available.</li>
          ) : (
            filteredTasks?.map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleToggleCompletion={() => handleToggleCompletion(task.id)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
