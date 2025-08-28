// components/BottomNav.jsx
import { NavLink } from "react-router";
import { CalendarDays, DollarSign, BookOpen, CheckSquare, LayoutDashboard } from "lucide-react";

const links = [
  { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Home" },
  { to: "/schedule", icon: <CalendarDays className="h-5 w-5" />, label: "Schedule" },
  { to: "/budget", icon: <DollarSign className="h-5 w-5" />, label: "Budget" },
  { to: "/planner", icon: <CheckSquare className="h-5 w-5" />, label: "Planner" },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner">
      <ul className="menu menu-horizontal justify-around px-2 py-1">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive ? "text-blue-600 font-medium" : "text-gray-500"
                }`
              }
            >
              {l.icon}
              <span>{l.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
