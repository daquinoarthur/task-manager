import React, { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Task Title 1",
    description: "Task Description 1",
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-10"),
    dueDate: new Date("2025-03-25"),
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: "2",
    title: "Task Title 2",
    description: "Task Description 2",
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
    tags: ["tag2", "tag3", "tag4"],
  },
  {
    id: "3",
    title: "Task Title 3",
    description: "Task Description 3",
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    createdAt: new Date("2025-03-12"),
    updatedAt: new Date("2025-03-12"),
    dueDate: new Date("2025-03-30"),
    tags: ["tag3", "tag4", "tag5"],
  },
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskStatus | "ALL">("ALL");

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task,
      ),
    );
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
