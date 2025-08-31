import React, { useState, useEffect } from "react";

const PomodoroClock = () => {
  const backendData = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const [timeLeft, setTimeLeft] = useState(backendData.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      handleModeSwitch();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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
    <div className="flex flex-col items-center justify-center rounded-2xl shadow-md p-6 gap-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-2xl font-bold">Pomodoro Clock</h1>

      <h2 className="text-lg font-medium capitalize">
        {mode === "pomodoro"
          ? "Focus Time"
          : mode === "shortBreak"
          ? "Short Break"
          : "Long Break"}
      </h2>

      <div className="text-5xl md:text-6xl font-mono font-bold">
        {formatTime(timeLeft)}
      </div>

      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="px-6 py-2 rounded-full text-lg bg-white text-blue-600 font-semibold shadow-md hover:bg-gray-100 transition"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroClock;
