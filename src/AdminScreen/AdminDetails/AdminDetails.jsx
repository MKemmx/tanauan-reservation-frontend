import React, { useState } from "react";

// Admin Profile
import adminprofile from "../../images/adminprofile.png";

// Sweet Alert
import Swal from "sweetalert2";

// React Icons
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

// Globa State
import useLoginState from "../../store/loginState";

const AdminDetails = () => {
  const { user, changePasswordAdmin } = useLoginState((state) => state);

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialState);

  const changePassBTN = async (e) => {
    e.preventDefault();
    if (data.currentPassword === "") {
      return Swal.fire("Error", "Please enter your old password", "error");
    }
    if (data.newPassword === "") {
      return Swal.fire("Error", "Please enter new password", "error");
    }
    if (data.confirmPassword === "") {
      return Swal.fire("Error", "Please enter confirm pasword", "error");
    }
    if (data.newPassword !== data.confirmPassword) {
      return Swal.fire("Error", "Incorrect Password Confirmation", "error");
    }

    // Success
    const value = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    const successChangePass = await changePasswordAdmin(value);
    if (successChangePass) {
      setData(initialState);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col justify-start md:flex-row md:space-x-2 container">
      <div className="mb-3 mx-auto overflow-hidden bg-white rounded-lg shadow-lg pt-2 px-12">
        <img
          className="object-contain w-full h-56"
          src={adminprofile}
          alt="avatar"
        />
        <div className="py-6 px-4 space-y-3 shadow-md">
          <div className="flex items-center">
            <AiOutlineMail className="mr-2" size={26} />
            <a className="block text-md font-normal text-gray-800 text-lg">
              {user?.email}
            </a>
          </div>
        </div>
      </div>

      <form className="w-full max-w-5xl shadow-lg bg-white px-4 py-5 rounded-md">
        <h2 className=" font-bold text-2xl my-2">Password Information </h2>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
            Current Password
          </label>
          <input
            value={data.currentPassword}
            onChange={handleOnChange}
            name="currentPassword"
            type="password"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-md outline-none font-medium text-gray-900 dark:text-gray-300">
            New Password
          </label>
          <input
            value={data.newPassword}
            onChange={handleOnChange}
            name="newPassword"
            type="password"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            value={data.confirmPassword}
            onChange={handleOnChange}
            name="confirmPassword"
            type="password"
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          onClick={changePassBTN}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminDetails;
