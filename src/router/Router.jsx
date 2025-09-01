import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import CalendarFull from "../components/CalenderFull";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "/calender", Component: CalendarFull },
    ],
  },
]);
