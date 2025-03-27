import React, { useReducer, useState } from "react";
import { Task, TaskPriority, TaskStatus } from "../types";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import TaskForm from "./TaskForm";
import {
  initialTaskState,
  TaskActionTypes,
  taskReducer,
} from "../reducers/taskReducer";

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

const TaskListReduce: React.FC = () => {
  const [taskState, dispatch] = useReducer(
    taskReducer,
    initialTaskState(initialTasks),
  );

  const [showForm, setShowForm] = useState<boolean>(false);

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    dispatch({
      type: TaskActionTypes.CHANGE_STATUS,
      payload: { id, status: newStatus },
    });
  };

  const handleAddTask = (newTask: Task) => {
    dispatch({
      type: TaskActionTypes.ADD_TASK,
      payload: newTask,
    });
  };

  const handleDeleteTask = (id: string) => {
    dispatch({
      type: TaskActionTypes.DELETE_TASK,
      payload: id,
    });
  };

  const handleFilterChange = (filter: TaskStatus | "ALL") => {
    dispatch({
      type: TaskActionTypes.FILTER_TASKS,
      payload: filter,
    });
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks (with useReducer)</h2>
        <div className="task-filters">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            value={taskState.filter}
            onChange={(e) =>
              handleFilterChange(e.target.value as TaskStatus | "ALL")
            }
            className="filter-select"
          >
            <option value="ALL">ALL</option>
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
        {taskState.filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks match the selected filter</p>
        ) : (
          taskState.filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListReduce;
