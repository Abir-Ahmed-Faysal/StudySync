import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 fixed overflow-y-scroll overflow-x-clip h-full shadow-lg">
        <div className="p-4 text-2xl font-bold ">
          StudySync
        </div>
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
