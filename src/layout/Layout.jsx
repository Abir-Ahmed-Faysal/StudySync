import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <div>This is from layout</div>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
