import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router"  

const SubMenu = ({ items, isOpen }) => {
  if (!isOpen) return null;
  return (
    <ul className="ml-4 mt-2 space-y-1">
      {items.map((sub, idx) => (
        <li key={idx}>
          <NavLink
            to={sub.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition text-sm ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            {sub.SubName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

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

  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // Auto expand Activities submenu when on /activities
  useEffect(() => {
    if (location.pathname.startsWith("/activities")) {
      setOpenMenu(2);
    }
  }, [location.pathname]);

  return (
    <div className="relative w-64 hidden lg:block h-screen border-r border-gray-300 bg-white rounded-md">
      {/* Scrollable area with scrollbar hidden */}
      <div className="h-full overflow-y-auto scrollbar-hide scroll-smooth pr-2">
        {/* Menu Section */}
        <div className="p-4">
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
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition ${
                        isActive
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <div>
                    <NavLink
                      to="/activities/tasks"
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className={`w-full text-left px-4 py-2 rounded-md transition block ${
                        location.pathname.startsWith("/activities")
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {link.name}
                    </NavLink>
                    <SubMenu items={link.subMenu} isOpen={openMenu === index} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Daily Habits Section */}
        <div className="mt-6 p-4">
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
    </div>
  );
};

export default Sidebar;
