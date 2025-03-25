import React from "react";
import TaskList from "../components/TaskList";

const TasksPage = () => (
  <div className="page tasks-page">
    <h1>My Tasks</h1>
    <p>Manage your tasks and track your progress.</p>
    <TaskList />
  </div>
);

export default TasksPage;
