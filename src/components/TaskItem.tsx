import React from "react";
import { Task, TaskPriority, TaskStatus } from "../types";
import "./TaskItem.css";

// Task item component
interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onStatusChange,
  onDelete,
}) => {
  // Status background colors
  const statusColors = {
    [TaskStatus.TODO]: "bg-gray-100",
    [TaskStatus.IN_PROGRESS]: "bg-blue-100",
    [TaskStatus.COMPLETED]: "bg-green-100",
    [TaskStatus.ARCHIVED]: "bg-gray-200",
  };

  // Priority indicators
  const priorityIndicators = {
    [TaskPriority.LOW]: "🔵",
    [TaskPriority.MEDIUM]: "🟢",
    [TaskPriority.HIGH]: "🟠",
    [TaskPriority.URGENT]: "🔴",
  };

  return (
    <div className={`task-item ${statusColors[task.status]}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="priority">{priorityIndicators[task.priority]}</span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <div className="task-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="task-dates">
          {task.dueDate && (
            <span className="due-date">
              Due: {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
          className="status-select"
        >
          {Object.values(TaskStatus).map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>

        <button
          className="btn btn-danger delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
