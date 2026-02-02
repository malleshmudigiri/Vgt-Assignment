export default function TodoItem({ task, onToggle, onDelete }) {
  const priorityColor = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  return (
    <li className="flex items-center justify-between border p-3 rounded">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          className={`${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>

        <span
          className={`text-sm font-medium ${priorityColor[task.priority]}`}
        >
          ({task.priority})
        </span>
      </label>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  );
}
