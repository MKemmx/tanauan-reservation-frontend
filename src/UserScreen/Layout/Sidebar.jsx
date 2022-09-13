import React from "react";
// Sweet Alert
import Swal from "sweetalert2";
// React Router DOM
import { useNavigate, useLocation } from "react-router-dom";
// React Icons
import { AiOutlineLogout } from "react-icons/ai";
// Menu Sidebar User
import menu from "../../utils/UserMenu";
// States
import useLoginStore from "../../store/loginState";
import useSettingsState from "../../store/settingsState";

// Tanauan Logo
import tanauanLogo from "../../images/tanauanlogo.jpg";

const Sidebar = () => {
  const navigate = useNavigate();
  // Side Nav State
  const { openSideNav } = useSettingsState((state) => state);
  // Login State
  const { logout, user } = useLoginStore((state) => state);
  const { pathname } = useLocation();

  return (
    <div className="flex">
      <div
        className={`sidebar-bg overflow-x-hidden ease-in-out duration-300 h-screen pt-5
        ${openSideNav ? "w-60" : "w-20"}
        `}
      >
        {/* Brand - Logo */}
        <div class="mb-5">
          {openSideNav && (
            <div className="flex flex-col w-full h-full items-center py-2">
              <img
                className="rounded-full w-16 h-16 object-contain mb-2"
                src={tanauanLogo}
              />
              <div>
                <h1 className="text-lg text-white leading-5 text-center font-semibold">
                  Tanauan Civic Center Reservation System
                </h1>
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <img
              className={`my-2 object-contain p-1 rounded-full ${
                openSideNav ? "w-20 h-20" : "w-16 h-16"
              }`}
              src={`${user?.profile.url}`}
            />
          </div>
          {openSideNav && (
            <h2 className="text-center text-sm font-medium mb-0 capitalize text-white">
              {`${user?.firstName} ${user?.lastName}`}
            </h2>
          )}
        </div>

        <hr className="border-gray-200" />
        <nav>
          {menu.map((list) => (
            <div
              onClick={() => {
                navigate(`${list.link}`);
              }}
              key={list.name}
              className={`hover:bg-[#114b7b] ease-in-out duration-200 cursor-pointer flex items-center py-3 px-4 mb-1 
              ${openSideNav ? "" : "justify-center"}
              ${pathname === list.link && "menu-active"} 
              `}
            >
              {list.icon}
              {openSideNav && (
                <a className="text-base ml-4 text-white"> {list.name} </a>
              )}
            </div>
          ))}

          <div
            onClick={() => {
              Swal.fire({
                title: "Leaving now?",
                text: "Please confirm if you want to logout",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
              }).then((result) => {
                if (result.isConfirmed) {
                  logout();
                  navigate("/");
                }
              });
            }}
            className={`hover:bg-[#114b7b] ease-in-out duration-200 cursor-pointer flex items-center py-3 px-4 mb-1 ${
              openSideNav ? "" : "justify-center"
            }`}
          >
            <AiOutlineLogout color="#fff" size={26} />
            {openSideNav && (
              <a className="text-base ml-4 text-white"> Logout </a>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
