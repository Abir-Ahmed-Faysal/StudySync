import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
    {index: true, Component: Dashboard},
    ],
  },
]);
