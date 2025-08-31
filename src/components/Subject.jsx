import React from "react";
import "../components/calender.css";
import Calender from "./Calender";

const Subject = () => {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-0 overflow-hidden">
      {/* Subject Banner */}
      <img
        className="w-full h-40 object-cover border-b"
        src="https://i.ibb.co.com/0RJkx1p9/cartoon-maths-elements-background-education-logo-vector.jpg"
        alt="Math subject banner"
      />

      {/* Card Content */}
      <div className="p-4 space-y-4">
        {/* Title & Tag */}
        <div>
          <h1 className="text-2xl font-bold">Math</h1>
          <p className="mt-2 inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
            Class Schedule
          </p>
        </div>

        {/* Calendar */}
        <div className="border-t pt-4">
          <Calender />
        </div>

       
      </div>
    </div>
  );
};

export default Subject;
