"use client";

import { Bell, Menu, RefreshCw } from "lucide-react";
import ProfileDropdown from "./profile-dropdown";

const Header = () => {
  return (
    <header
      className="
        fixed top-0 z-40 h-16 bg-white
        flex items-center justify-between
        px-4 sm:px-6
        w-full md:w-[calc(100%-112px)]
        border-b
      "
    >
      
      <div className="flex items-center gap-2 sm:gap-4 text-gray-700">
        
        <button className="md:hidden p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] transition">
          <Menu />
        </button>

        
        <button className="hidden md:flex p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] transition">
          <Menu />
        </button>

        <button className="p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] transition">
          <RefreshCw />
        </button>
      </div>

      
      <div className="flex items-center gap-2 sm:gap-4 text-gray-700 pr-2">
        <button className="p-2 rounded-full hover:text-[#fe4e00] hover:bg-[#fe4e001a] transition">
          <Bell />
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
