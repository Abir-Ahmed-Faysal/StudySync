import React from "react";
import Event from "./components/event";
import TodaysTask from "./components/TodaysTask";
import UpcomingTask from "./components/UpcomingTask";
import PomodoroClock from "./components/PromodroClock";

const Dashboard = () => {
  return (
    <div>
      <div>
        <div className="grid h-20   grid-cols-3 gap-4 mb-4">
          <div className="col-span-2  space-y-4">
            <div className="bg-white p-4  rounded-lg">
              <div className="text-white bg-blue-200 p-8 rounded-lg ">
                <h2 className="text-4xl font-bold">Good Evening</h2>
                <p>You have 1 task due today!</p>
              </div>
            </div>

            <Event></Event>
            <TodaysTask></TodaysTask>
            <UpcomingTask></UpcomingTask>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg gap-2">
              <h1 className="text-xl ">today 31/8/24</h1>
              {/* single event */}
              <div>
                <div className="flex gap-4 items-center ">
                  <div>
                    <h3>2.30pm</h3>
                    <h3>3.00pm</h3>
                  </div>
                  <div className="border-r-3  border-gray-300"></div>
                  <div className="bg-blue-200 w-full rounded-md p-2">
                    <p>English</p>
                    <p className="strong">Science</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Assignment */}

            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-xl">Upcoming Assignment</h3>
              <div>
                <h6>No Assignment today</h6>
              </div>

             
             
            </div>
             {/* promodro clock  */}
              <PomodoroClock></PomodoroClock> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
