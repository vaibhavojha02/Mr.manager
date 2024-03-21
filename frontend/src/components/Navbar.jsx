import React from "react";
import { FcManager } from "react-icons/fc";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-100  bg-transparent ">
        <div className="flex-1 text-3xl">
          Mr Manager
          <FcManager />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
