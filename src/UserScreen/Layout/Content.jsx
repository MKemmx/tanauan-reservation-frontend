import React from "react";

// State
import useSettingsState from "../../store/settingsState";
// React Icons
import { AiOutlineMenu } from "react-icons/ai";

const Content = ({ children }) => {
  const { toggleSideNav } = useSettingsState((state) => state);

  return (
    <div className="w-full bg-[#E6EAEE] h-screen overflow-x-hidden">
      <nav className="w-full bg-[#FFFFFF] py-5 px-4 flex justify-between items-center">
        <AiOutlineMenu
          onClick={toggleSideNav}
          className="cursor-pointer"
          size={20}
        />
      </nav>
      <div className="px-3 py-8">{children}</div>
    </div>
  );
};

export default Content;
