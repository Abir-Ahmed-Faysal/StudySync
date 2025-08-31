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
  const [mode, setMode] = useState("pomodoro"); 
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

  return (
    <div className="flex text-white bg-blue-200 flex-col items-center justify-center rounded-lg p-4 gap-6">
      <h1 className="text-3xl font-bold">Pomodoro Clock</h1>

      {/* Mode Title */}
      <h2 className="text-xl font-semibold capitalize">
        {mode === "pomodoro"
          ? "Focus Time"
          : mode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>

      {/* Timer */}
      <div className="text-6xl font-mono font-bold">
        {formatTime(timeLeft)}
      </div>

      {/* Single Toggle Button */}
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className={`px-4 py-1 rounded-full text-lg  bg-white text-black`}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroClock;
