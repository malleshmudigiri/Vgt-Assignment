import { NavLink, Routes, Route, Navigate } from "react-router-dom";

import TodoApp from "./components/Todo/TodoApp";
import UserForm from "./components/UserForm";
import ProgressBar from "./components/ProgressBar";
import CountdownTimer from "./components/CountdownTimer";
import SearchList from "./components/SearchList";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg font-medium transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "bg-white border text-gray-700 hover:bg-gray-100"
  }`;

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        React Assignment
      </h1>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-3 mb-8">
        <NavLink to="/todo" className={navLinkClass}>
          Todo
        </NavLink>
        <NavLink to="/form" className={navLinkClass}>
          Form
        </NavLink>
        <NavLink to="/progress" className={navLinkClass}>
          Progress Bar
        </NavLink>
        <NavLink to="/timer" className={navLinkClass}>
          Timer
        </NavLink>
        <NavLink to="/search" className={navLinkClass}>
          Search
        </NavLink>
      </nav>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/progress" element={<ProgressBar />} />
          <Route path="/timer" element={<CountdownTimer />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </div>
  );
}
