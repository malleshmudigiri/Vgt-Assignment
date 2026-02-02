import { useState } from "react";

export default function ProgressBar() {
  const [vals, setVals] = useState([0, 0, 0]);
  const clamp = v => Math.min(100, Math.max(0, v));
  const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);

  const color =
    avg < 40 ? "bg-red-500" : avg > 70 ? "bg-green-500" : "bg-yellow-400";

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Progress Bar</h2>

      <div className="flex gap-2 mb-4">
        {vals.map((v, i) => (
          <input
            key={i}
            type="number"
            value={v}
            className="border p-2 w-20 rounded"
            onChange={(e) => {
              const copy = [...vals];
              copy[i] = clamp(+e.target.value);
              setVals(copy);
            }}
          />
        ))}
      </div>

      <div className="h-4 bg-gray-200 rounded">
        <div
          className={`h-full ${color} rounded transition-all`}
          style={{ width: `${avg}%` }}
        />
      </div>

      <div className="mt-3 space-y-1">
        {vals.map((v, i) => (
          <div key={i} className="h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-gray-500 rounded"
              style={{ width: `${v}%` }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
