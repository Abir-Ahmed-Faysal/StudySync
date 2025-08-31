import React from "react";

const Event = () => {
  const options = ["Subject", "Today", "Tomorrow", "Custom Date", "Time"];

  return (
    <div className="p-4 rounded-lg bg-white space-y-4">
      {/* Input with button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter event..."
          className="border border-gray-400  rounded-lg px-2 py-4 w-full"
        />
        <button className="p-2 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600">
          +
        </button>
      </div>

      {/* Options */}
      <div className="flex items-center gap-5 text-gray-700 font-medium">
        {options.map((item, idx) => (
          <p key={idx} className="cursor-pointer hover:text-blue-500">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Event;
