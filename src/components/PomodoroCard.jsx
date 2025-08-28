// components/PomodoroCard.jsx
import { useState, useEffect } from "react";

export default function PomodoroCard() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  return (
    <div className="card bg-white shadow-lg p-4 rounded-lg">
      {/* Header */}
      <div className="card-title text-lg font-semibold mb-3">Pomodoro Timer</div>

      {/* Timer */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl font-mono">{mm}:{ss}</div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setRunning(!running)}
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setTime(25 * 60); setRunning(false); }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
