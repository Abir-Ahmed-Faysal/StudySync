// components/Navbar.jsx
import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="navbar px-4 max-w-6xl mx-auto">
        {/* Left side */}
        <div className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-5 w-5 text-blue-600" />
          <span className="text-lg">Student Toolkit</span>
        </div>

        {/* Right side */}
        <div className="hidden md:flex gap-2">
          <NavItem to="/" label="Dashboard" />
          <NavItem to="/schedule" label="Schedule" />
          <NavItem to="/budget" label="Budget" />
          <NavItem to="/exam" label="Exam" />
          <NavItem to="/planner" label="Planner" />
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `btn btn-ghost btn-sm rounded-lg ${
          isActive ? "text-blue-600 font-semibold bg-gray-100" : "text-gray-600"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
