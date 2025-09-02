import React from "react";
import { Clock, CircleCheck } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  const percentage = 66;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">My statistics</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Profile Card */}
        <div className="p-6 col-span-2 bg-white rounded-xl flex items-center">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
            alt="Profile"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Faysal Ahmed</h2>
            <p className="text-gray-500">dreamless.faysal@gmail.com</p>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white p-6 rounded-xl">
          <p>Days with no tasks going late</p>
          <h2 className="text-3xl font-bold mt-2">24</h2>
          <p>Your streak</p>
        </div>

        {/* Tasks & Progress */}
        <div className="col-span-3 flex items-center justify-between bg-white p-6 rounded-xl">
          <div className="flex items-center space-x-4">
            <Clock size={32} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">1</h2>
              <p className="text-gray-500">Overdue Tasks</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <CircleCheck size={32} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">1</h2>
              <p className="text-gray-500">Completed Tasks</p>
            </div>
          </div>

          <div className="w-20">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">11</h2>
            <p>Pending tasks</p>
            <p>Last 7 days</p>
          </div>
        </div>

        {/* Subjects */}
        <div className="col-span-3 bg-white p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Most practiced subject</h3>
            <h3 className="text-gray-500">Last Month</h3>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Least practiced subject</h3>
            <h3 className="text-gray-500">Last Month</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
