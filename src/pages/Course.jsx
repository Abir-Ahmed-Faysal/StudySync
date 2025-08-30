import React from "react";
import Subject from "../components/Subject";

const Course = () => {
  return (
    <div>
      <h1 className="p-2 w-fit px-3 rounded-full bg-gray-100">Active course</h1>
      <div className="gridddd grid-cols-3 gap-4 mt-4">
        <Subject></Subject>
      </div>
    </div>
  );
};

export default Course;
