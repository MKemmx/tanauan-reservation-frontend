import React from "react";

// React Icons
import { AiOutlineMenu } from "react-icons/ai";

// States
import useSettingsState from "../../store/settingsState";
import MenuSettings from ".././MenuSettings/MenuSettings";

const Navbar = () => {
  const { toggleSideNav, toggleMenu } = useSettingsState((state) => state);

  return (
    <>
      <nav className="w-full bg-white py-3 px-5 flex items-center">
        <div className="cursor-pointer">
          <AiOutlineMenu onClick={toggleSideNav} size={22} />
        </div>

        {/* Avatar */}
        <div className="ml-auto relative">
          <img
            onClick={toggleMenu}
            src="https://cdn4.iconfinder.com/data/icons/ui-3d-01-of-3/100/UI_26-512.png"
            className="object-cover cursor-pointer p-1 h-10 w-10 bg-[#3F6BD5] rounded-full"
            alt="avatar"
          />
          <MenuSettings />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
