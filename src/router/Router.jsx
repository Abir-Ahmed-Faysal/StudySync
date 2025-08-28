import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <div>this is form react router child</div> },
      { path: "/about", element: <div>this is form react router about</div> },
    ],
  },
]);
