// pages/Dashboard.jsx
import DashboardCard from "../components/DashboardCard";
import PomodoroCard from "../components/PomodoroCard";
import { CalendarDays, DollarSign, CheckSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <DashboardCard
        title="Today's Classes"
        value="2"
        icon={<CalendarDays className="h-6 w-6" />}
        accent="bg-blue-100 text-blue-600"
      />
      <DashboardCard
        title="Balance"
        value="$120"
        icon={<DollarSign className="h-6 w-6" />}
        accent="bg-green-100 text-green-600"
      />
      <DashboardCard
        title="Tasks Due"
        value="3"
        icon={<CheckSquare className="h-6 w-6" />}
        accent="bg-purple-100 text-purple-600"
      />

      {/* Pomodoro unique feature */}
      <div className="md:col-span-2">
        <PomodoroCard />
      </div>
    </div>
  );
}
