import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar (desktop) */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <Outlet /> {/* renders the child route */}
        </main>
      </div>

      {/* Bottom Nav (mobile only) */}
      <BottomNav />
    </div>
  );
};

export default Layout;
