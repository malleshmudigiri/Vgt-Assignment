import { useEffect, useRef, useState } from "react";

export default function CountdownTimer() {
  const [time, setTime] = useState(10);
  const [remain, setRemain] = useState(10);
  const [status, setStatus] = useState("idle");
  const ref = useRef(null);

  useEffect(() => {
    if (status !== "running") return;
    ref.current = setInterval(() => {
      setRemain(r => {
        if (r <= 0) {
          clearInterval(ref.current);
          setStatus("completed");
          return 0;
        }
        return r - 0.01;
      });
    }, 10);
    return () => clearInterval(ref.current);
  }, [status]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Countdown Timer</h2>

      <input
        type="number"
        disabled={status === "running"}
        value={time}
        onChange={(e) => {
          setTime(+e.target.value);
          setRemain(+e.target.value);
        }}
        className="border p-2 rounded mb-4"
      />

      <p className="text-lg">{remain.toFixed(2)}s</p>
      <p>Status: {status}</p>

      <div className="flex gap-2 mt-3">
        {status === "idle" && (
          <button className="btn cursor-pointer bg-blue-300  border rounded-lg w-[80px]" onClick={() => setStatus("running")}>
            Start
          </button>
        )}
        {status === "running" && (
          <button className="btn cursor-pointer bg-blue-300  border rounded-lg w-[80px]" onClick={() => setStatus("paused")}>
            Pause
          </button>
        )}
        {status === "paused" && (
          <button className="btn cursor-pointer bg-blue-300  border rounded-lg w-[80px]" onClick={() => setStatus("running")}>
            Resume
          </button>
        )}
        <button
          className="btn cursor-pointer bg-orange-300  border rounded-lg w-[80px]"
          onClick={() => {
            clearInterval(ref.current);
            setRemain(time);
            setStatus("idle");
          }}
        >
          Reset
        </button>
      </div>

      {status === "completed" && (
        <p className="text-red-600 mt-2">Time’s up!</p>
      )}
    </>
  );
}
