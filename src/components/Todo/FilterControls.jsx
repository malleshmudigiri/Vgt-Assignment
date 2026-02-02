export default function FilterControls({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex gap-2">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded border transition ${
            filter === f
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
