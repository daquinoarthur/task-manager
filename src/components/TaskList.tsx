import React, { useState } from "react";
import { Task, TaskPriority, TaskStatus } from "../types";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import TaskForm from "./TaskForm";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Learn React Hooks",
    description: "Study all React hooks thoroughly",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-10"),
    dueDate: new Date("2025-03-25"),
    tags: ["learning", "react", "frontend"],
  },
  {
    id: "2",
    title: "Set up project structure",
    description: "Organize folders and files for better maintainability",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
    tags: ["setup", "organization"],
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Add user login and registration functionality",
    status: TaskStatus.TODO,
    priority: TaskPriority.URGENT,
    createdAt: new Date("2025-03-12"),
    updatedAt: new Date("2025-03-12"),
    dueDate: new Date("2025-03-30"),
    tags: ["auth", "security", "user"],
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskStatus | "ALL">("ALL");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task,
      ),
    );
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setShowForm(false);
  };

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <div className="task-filters">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as TaskStatus | "ALL")}
            className="filter-select"
          >
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showForm ? (
        <TaskForm onTaskAdd={handleAddTask} />
      ) : (
        <button
          className="btn btn-primary add-task-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Task
        </button>
      )}

      <div className="tasks">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks match the selected filter.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
