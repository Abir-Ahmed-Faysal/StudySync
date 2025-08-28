import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import Schedule from "../pages/Schedule";
import Budget from "../pages/Budget";
import Exam from "../pages/Exam";
import Planner from "../pages/Planner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "schedule", element: <Schedule /> },
      { path: "budget", element: <Budget /> },
      { path: "exam", element: <Exam /> },
      { path: "planner", element: <Planner /> },
    ],
  },
]);
