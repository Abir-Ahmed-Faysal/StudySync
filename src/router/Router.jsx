import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import CalendarFull from "../components/CalenderFull";
import profile from "../pages/profile/profile";
import Exams from "../pages/exams/Exams";
import Tasks from "../pages/Tasks/Tasks";
import Budget from "../pages/budget/budget";
import Question from "../pages/Qusetion/Question";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "/calendar", Component: CalendarFull },
      { path: "/profile", Component: profile },
      { path: "/activities/exams", Component: Exams },
      { path: "/activities/tasks", Component: Tasks },
      { path: "/budget", Component: Budget },
      { path: "/question", Component: Question },
    ],
  },
]);
