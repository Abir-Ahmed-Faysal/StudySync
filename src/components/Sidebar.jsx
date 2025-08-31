import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 hidden lg:block  h-fitrounded-md">
      {/* Menu Section */}
      <div className="bg-gray-100 rounded-md p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold border-b border-gray-200 pb-2">
            Menu
          </h1>
        </div>

        <ul className="space-y-2 text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">Course</li>
          <li className="hover:text-blue-600 cursor-pointer">Class Routine</li>
          <li className="hover:text-blue-600 cursor-pointer">Note</li>
          <li className="hover:text-blue-600 cursor-pointer">Assignment</li>
          <li className="hover:text-blue-600 cursor-pointer">Finance</li>
          <li className="hover:text-blue-600 cursor-pointer">Task Manager</li>
          <li className="hover:text-blue-600 cursor-pointer">To-Do</li>
          <li className="hover:text-blue-600 cursor-pointer">Habit Tracker</li>
        </ul>
      </div>

      {/* Daily Habits Section */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold border-b border-gray-200 pb-2">
          Daily Habits
        </h1>
        <div className="mt-4">
          <h3 className="mb-4 px-4 py-2 rounded-full bg-gray-100 w-fit text-sm font-medium text-gray-700">
            Today's Habits
          </h3>

          <img
            className="w-64 h-auto rounded-md shadow"
            src="https://thumb.photo-ac.com/40/409a7b529cab7f2f158336f141551baf_w.jpeg"
            alt="Habits Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
