import { useState } from "react";

const names = ["Mallesh Kumar", "Ramesh Kumar", "Suresh", "Mahesh", "Kamesh"];

export default function SearchList() {
  const [q, setQ] = useState("");

  const filtered = names.filter(n =>
    n.toLowerCase().includes(q.toLowerCase())
  );

  const highlight = (text) =>
    q
      ? text.split(new RegExp(`(${q})`, "gi")).map((p, i) =>
          p.toLowerCase() === q.toLowerCase()
            ? <strong key={i}>{p}</strong>
            : p
        )
      : text;

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Live Search</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Search name"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <p className="mb-2">Matches: {filtered.length}</p>

      {filtered.length === 0 && <p>No matches found</p>}

      <ul className="space-y-1">
        {filtered.map((n, i) => (
          <li key={i}>{highlight(n)}</li>
        ))}
      </ul>
    </>
  );
}
