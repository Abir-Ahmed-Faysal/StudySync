import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div>
        <div className="text-4xl font-bold">StudySync</div>
        <Navbar />
        <div className="flex mt-5 gap-5">
          <Sidebar></Sidebar>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;
