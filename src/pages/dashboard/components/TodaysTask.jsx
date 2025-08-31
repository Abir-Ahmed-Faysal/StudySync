import React from "react";

const TodaysTask = () => {
  return (
    <div>
      <h1>Todays Task</h1>
      <div className="flex p-4 rounded-lg bg-white gap-2 items-center">
        {/* {*add checkbox and task here*} */}
        <div>
          <p>Eaxm</p>
          <div className="flex items-center ">
            {" "}
            <small>Chemistry</small> <small className="ml-2">100%</small>
          </div>
        </div>
        {/* This is end */}
        <p>Today 10.50PM </p>
      </div>

      <div className="flex-end"></div>
    </div>
  );
};

export default TodaysTask;
