import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import FilterControls from "./FilterControls";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
        priority,
      },
    ]);

    setText("");
    setPriority("medium");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Todo App</h2>

      {/* Task Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Add a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* Filters */}
      <FilterControls filter={filter} setFilter={setFilter} />

      {/* Task List */}
      <ul className="space-y-2 mt-4">
        {filteredTasks.length === 0 && (
          <p className="text-gray-500">No tasks found</p>
        )}

        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
