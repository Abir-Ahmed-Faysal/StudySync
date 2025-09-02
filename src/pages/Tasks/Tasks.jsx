import React, { useState } from "react";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";

const Tasks = () => {
  const [view, setView] = useState("current");
  const [filter, setFilter] = useState("All");

  const currentExams = [
    { id: 1, title: "Math Midterm", subject: "Math", date: "2025-09-10" },
    { id: 2, title: "Physics Quiz", subject: "Physics", date: "2025-09-15" },
  ];

  const pastExams = [
    { id: 3, title: "History Final", subject: "History", date: "2025-06-20" },
    { id: 4, title: "Chemistry Test", subject: "Chemistry", date: "2025-05-10" },
  ];

  
  const dueExams = currentExams.filter(
    (exam) => new Date(exam.date) < new Date()
  );

  
  let displayedExams =
    view === "current" ? currentExams :
    view === "past" ? pastExams :
    dueExams;


  if (filter !== "All") {
    displayedExams = displayedExams.filter(
      (exam) => exam.subject.toLowerCase() === filter.toLowerCase()
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>

      {/* Toggle + Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-2 bg-white rounded-2xl shadow p-1">
          <button
            className={`px-4 py-2 rounded-xl font-medium transition ${
              view === "current"
                ? "bg-blue-500 text-white"
                : "bg-transparent hover:bg-gray-100"
            }`}
            onClick={() => setView("current")}
          >
            Current
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-medium transition ${
              view === "past"
                ? "bg-blue-500 text-white"
                : "bg-transparent hover:bg-gray-100"
            }`}
            onClick={() => setView("past")}
          >
            Past
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-medium transition ${
              view === "due"
                ? "bg-blue-500 text-white"
                : "bg-transparent hover:bg-gray-100"
            }`}
            onClick={() => setView("due")}
          >
            Due
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-outline rounded-xl flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-xl w-40"
          >
            <li>
              <button onClick={() => setFilter("All")}>All</button>
            </li>
            <li>
              <button onClick={() => setFilter("Math")}>Math</button>
            </li>
            <li>
              <button onClick={() => setFilter("Physics")}>Physics</button>
            </li>
            <li>
              <button onClick={() => setFilter("History")}>History</button>
            </li>
            <li>
              <button onClick={() => setFilter("Chemistry")}>Chemistry</button>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-4 border border-gray-200" />

      {/* Exam List */}
      <motion.div
        key={view + filter}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-4"
      >
        {displayedExams.length > 0 ? (
          displayedExams.map((exam) => (
            <div key={exam.id} className="card bg-white shadow-md rounded-2xl">
              <div className="card-body flex flex-row justify-between items-center p-4">
                <div>
                  <h2 className="card-title text-lg font-semibold">
                    {exam.title}
                  </h2>
                  <p className="text-sm text-gray-500">{exam.date}</p>
                  <p className="text-xs text-gray-400">{exam.subject}</p>
                </div>
                <button className="btn btn-secondary rounded-xl">View</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No exams available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Tasks;
