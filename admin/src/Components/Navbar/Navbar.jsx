import React from "react";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 shadow-md bg-white w-full">
      {/* nav-logo */}
      <img src={navlogo} alt="Logo" className="h-10 md:h-12 w-auto" />

      {/* nav-profile */}
      <img src={navProfile} alt="Profile" className="h-8 md:h-10 w-8 md:w-10 rounded-full" />
    </nav>
  );
};

export default Navbar;
