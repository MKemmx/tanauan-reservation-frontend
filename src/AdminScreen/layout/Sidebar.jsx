import React from "react";

// TanauanSlogan
import TanauanLogo from "../../images/tanauanlogo.jpg";

// React Router DOM
import { useNavigate, useLocation } from "react-router-dom";
// Settings State
import useSettingsState from "../../store/settingsState";
// Sidebar Menu list
import { adminMenu } from "../../utils/AdminMenu";

const Sidebar = () => {
  const navigate = useNavigate();
  // Nav State
  const { openSideNav } = useSettingsState((state) => state);
  const { pathname } = useLocation();

  return (
    <div
      className={`overflow-x-hidden ease-in-out duration-300 h-screen bg-[#0a3e69] ${
        openSideNav ? "w-60" : "w-28"
      }`}
    >
      {/* Brand - Logo */}
      <div className="py-1">
        <div className="flex w-full h-full items-center my-5">
          <img
            className="rounded-full w-16 h-16 object-contain mx-auto "
            src={TanauanLogo}
          />
        </div>

        {openSideNav && (
          <div className="mb-2">
            <h1 className="text-lg text-center mb-2 font-semibold leading-5 text-white">
              Tanauan Civic Center Reservation System
            </h1>
            <p className="text-center font-medium text-base text-white">
              {" "}
              Admin{" "}
            </p>
          </div>
        )}
      </div>
      <hr className="border-gray-200" />
      <nav>
        {adminMenu.map((list, idx) => (
          <div
            onClick={() => {
              navigate(`${list.link}`);
            }}
            key={idx}
            className={`hover:bg-[#114b7b] ease-in-out duration-200 cursor-pointer flex items-center py-3 px-4 mb-1 
            ${openSideNav ? "" : "justify-center"} 
            ${pathname === list.link && "menu-active"} 
            `}
          >
            {list.icon}
            {openSideNav && (
              <a className="text-base text-white ml-4"> {list.name} </a>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
