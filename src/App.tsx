import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import TasksPage from "./pages/TasksPage";

const HomePage = () => <div className="page">Home Page</div>;
const ProfilePage = () => <div className="page">Profile Page</div>;
const SettingsPage = () => <div className="page">Settings Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>TaskMaster</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>TaskMaster © 2025 - Learning React with TypeScript</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
