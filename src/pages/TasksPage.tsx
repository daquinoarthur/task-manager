import React from "react";
import TaskList from "../components/TaskList";
import TaskListReducer from "../components/TaskListReducer";

const TasksPage = () => (
  <div className="page tasks-page">
    <h1>My Tasks</h1>
    <p>
      This page demonstrates two different approaches to state management in
      ReactJS.
    </p>
    <div className="implementation-container">
      <div className="implementation">
        <TaskList />
      </div>

      <div className="implementation">
        <TaskListReducer />
      </div>
    </div>
  </div>
);

export default TasksPage;
