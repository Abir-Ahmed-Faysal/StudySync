// components/Sidebar.jsx
import { NavLink } from "react-router";
import { CalendarDays, DollarSign, BookOpen, CheckSquare, LayoutDashboard } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { to: "/schedule", label: "Schedule", icon: <CalendarDays className="h-5 w-5" /> },
  { to: "/budget", label: "Budget", icon: <DollarSign className="h-5 w-5" /> },
  { to: "/exam", label: "Exam", icon: <BookOpen className="h-5 w-5" /> },
  { to: "/planner", label: "Planner", icon: <CheckSquare className="h-5 w-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-56 bg-white border-r">
      {/* Logo / Header */}
      <div className="h-14 flex items-center justify-center font-bold text-lg">
        🎓 Toolkit
      </div>

      {/* Menu */}
      <ul className="menu p-4 gap-1">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 ${
                  isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
                }`
              }
            >
              {l.icon} {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
