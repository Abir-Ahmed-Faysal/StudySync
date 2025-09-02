import React, { useEffect, useState} from "react";
import { useNavigate} from "react-router";

const Navbar = ({ logo }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000); // update every second

    return () => clearInterval(interval);
  }, []);




  const handleClick = () => {
navigate('/profile')
  }

  return (
    <div className="flex p-4  items-center justify-between">
      <div>
        <p
          aria-label={`Current time is ${currentTime}`}
          className="text-gray-900 text-5xl font-bold "
        >
          {currentTime}
        </p>
        <p
          aria-label={`Today's date is ${currentDate}`}
          className="text-gray-700"
        >
          {currentDate}
        </p>
      </div>
      {!logo && (
        <img onClick={handleClick}
          className="max-h-20 max-w-20"
          src={
            logo ||
            "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
          }
          alt="logo"
        />
      )}
    </div>
  );
};

export default Navbar;
