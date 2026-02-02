import { useEffect, useState } from "react";

export default function TodoApp() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filtered = todos.filter(t =>
    filter === "active"
      ? !t.completed
      : filter === "completed"
      ? t.completed
      : true
  );

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Todo App</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setTodos([...todos, {
            id: Date.now(),
            text,
            completed: false,
            priority,
          }]);
          setText("");
        }}
        className="flex gap-2 mb-4"
      >
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      <div className="flex gap-2 mb-4">
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="border px-3 py-1 rounded"
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filtered.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos(todos.map(t =>
                    t.id === todo.id
                      ? { ...t, completed: !t.completed }
                      : t
                  ))
                }
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text} ({todo.priority})
              </span>
            </label>

            <button
              onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
              className="text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
