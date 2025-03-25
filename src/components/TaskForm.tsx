import React, { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import "./TaskForm.css";

interface TaskFormProps {
  onTaskAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setFormError("Title is required");
      return false;
    }

    if (!description.trim()) {
      setFormError("Description is required");
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: TaskStatus.TODO,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    onTaskAdd(newTask);

    setTitle("");
    setDescription("");
    setPriority(TaskPriority.MEDIUM);
    setDueDate("");
    setTags("");
  };

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>

      {formError && <div className="form-error">{formError}</div>}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="form-control"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="form-control"
          >
            {Object.values(TaskPriority).map((priority) => (
              <option key={priority} value={priority}>
                {priority.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. frontend, ui, bug"
            className="form-control"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
