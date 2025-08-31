import React, { useState, useEffect } from "react";

const PomodoroClock = () => {
  // Dummy backend data
  const backendData = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  const [timeLeft, setTimeLeft] = useState(backendData.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro"); // "pomodoro" | "shortBreak" | "longBreak"
  const [cycleCount, setCycleCount] = useState(0);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      handleModeSwitch();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Format time mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Switch between modes
  const handleModeSwitch = () => {
    if (mode === "pomodoro") {
      // After 4 Pomodoros → long break
      if (cycleCount === 3) {
        setMode("longBreak");
        setTimeLeft(backendData.longBreak);
        setCycleCount(0);
      } else {
        setMode("shortBreak");
        setTimeLeft(backendData.shortBreak);
        setCycleCount((prev) => prev + 1);
      }
    } else {
      setMode("pomodoro");
      setTimeLeft(backendData.pomodoro);
    }
  };

  // Reset
  const resetTimer = () => {
    setIsRunning(false);
    setMode("pomodoro");
    setTimeLeft(backendData.pomodoro);
    setCycleCount(0);
  };

  return (
    <div className="flex bg-blue-200  flex-col items-center justify-center rounded-lg p-4 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Pomodoro Clock</h1>

      {/* Mode Title */}
      <h2 className="text-xl font-semibold capitalize text-gray-600">
        {mode === "pomodoro"
          ? "Focus Time"
          : mode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>

      {/* Timer */}
      <div className="text-6xl font-mono font-bold text-red-500">
        {formatTime(timeLeft)}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroClock;
