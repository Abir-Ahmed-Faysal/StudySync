import React from "react";

import "../components/calender.css";
import Calender from "./Calender";

const Subject = () => {
  return (
    <div className="  border border-gray-100 rounded-md ">
      <img
        className="border-b border-gray-200"
        src="https://i.ibb.co.com/0RJkx1p9/cartoon-maths-elements-background-education-logo-vector.jpg"
        alt=""
      />
      <div className="p-3">
        <h1 className="text-2xl font-bold p-3">Math</h1>
        <p className="p-1 rounded-full w-fit px-2 pr-4 bg-gray-200">
          class Schedule
        </p>
        <div className="border-b w-1/3 my-4"></div>
        <div>
          <Calender></Calender>
        </div>
      </div>
    </div>
  );
};

export default Subject;
