import React from "react";
import { useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="p-4  border-1 rounded-md mt-5 border-gray-300 w-full">
      <h1>studySync &gt; {pathname}</h1>
    </div>
  );
};

export default Navbar;
