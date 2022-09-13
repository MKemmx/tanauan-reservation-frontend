import React from "react";

// Sweet Alert
import Swal from "sweetalert2";

// Use Navigate
import { useNavigate } from "react-router-dom";

// React Icons
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdPassword } from "react-icons/md";

// Global State
import useSettingsState from "../../store/settingsState";
import useLoginState from "../../store/loginState";

const MenuSettings = () => {
  const navigate = useNavigate();
  const { openMenu } = useSettingsState((state) => state);
  const { logout } = useLoginState((state) => state);

  return (
    <>
      <div
        className={`absolute ease-in-out duration-300 right-0 z-20 mt-2 overflow-hidden bg-white rounded-md shadow-lg w-52 
  ${openMenu ? "h-44" : "h-0"}`}
      >
        <div
          onClick={() => {
            navigate("/admin-details");
          }}
          className="flex cursor-pointer   items-center px-4 py-1 transition-colors duration-200 transform hover:bg-gray-100"
        >
          <CgProfile size={22} />
          <a className="flex w-full  items-center px-3 py-3 text-base text-gray-600">
            View Profile
          </a>
        </div>

        <div
          onClick={() => {
            navigate("/admin-details");
          }}
          className="flex cursor-pointer  items-center px-4 py-1 transition-colors duration-200 transform hover:bg-gray-100"
        >
          <MdPassword size={22} />
          <a className="flex w-full  items-center px-3 py-3 text-base text-gray-600">
            Change Password
          </a>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 " />

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
          className="flex cursor-pointer items-center px-4 py-1 transition-colors duration-200 transform hover:bg-gray-100"
        >
          <AiOutlineLogout size={22} />
          <a className="flex w-full  items-center px-3 py-3 text-base text-gray-600">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default MenuSettings;
