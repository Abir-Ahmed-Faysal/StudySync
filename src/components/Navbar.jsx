import React from "react";
import { useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="p-4 bg-gray-50 ">
      <h1>studySync &gt; {pathname}</h1>
    </div>
  );
};

export default Navbar;
