import React, { useState } from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const navlinks = [
    { name: "Course", path: "/" },
    { name: "Calendar", path: "/calendar" },
    {
      name: "Activities",
      subMenu: [
        { SubName: "Tasks", path: "/activities/tasks" },
        { SubName: "Classes", path: "/activities/classes" },
        { SubName: "Exams", path: "/activities/exams" },
      ],
    },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];

  const [openMenu, setOpenMenu] = useState(2); // Activities menu open by default
  const [selectedSub, setSelectedSub] = useState("/activities/tasks"); 

  const toggleSubMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div className="w-64 hidden border-r lg:block h-screen overflow-clip rounded-md">
      {/* Menu Section */}
      <div className=" rounded-md p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold border-b border-gray-200 pb-2">
            Menu
          </h1>
        </div>

        <ul className="space-y-2 text-gray-700">
          {navlinks.map((link, index) => (
            <li key={index}>
              {!link.subMenu ? (
                <NavLink
                  to={link.path}
                  className={`block ${
                    "active" ? "bg-gray-200" : ""
                  } px-4 py-2 rounded-md  transition`}
                >
                  {link.name}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => toggleSubMenu(index)}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    {link.name}
                  </button>
                  {openMenu === index && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {link.subMenu.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sub.path}
                            onClick={() => setSelectedSub(sub.path)}
                            className={`block px-4 py-2  rounded-md transition text-sm ${
                              selectedSub === sub.path
                                ? "bg-gray-300 font-semibold"
                                : "hover:bg-gray-200"
                            }`}
                          >
                            {sub.SubName}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
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
