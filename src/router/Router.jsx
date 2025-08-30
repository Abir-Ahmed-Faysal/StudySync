import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Course from "../pages/Course";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
    {index: true, Component: Course},
    ],
  },
]);
