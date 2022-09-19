import React, { useState } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Logos
import tanauanLogo from "../../images/tanauanlogo.jpg";
import tanauanSlogan from "../../images/betterandbrighter.jpg";

// Sweet Alert
import Swal from "sweetalert2";

// login Staet
import useLoginState from "../../store/loginState";

// Component
import Loader from "../../components/Loader/Loader";

// React Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const { user, loading, changePasswordUser } = useLoginState((state) => state);

  // Navigate
  const navigate = useNavigate();

  const initialState = {
    currentPassword: "",
    newPassword: "",
  };
  const [data, setData] = useState(initialState);

  const changePassBTN = async (e) => {
    e.preventDefault();
    if (data.currentPassword === "") {
      return Swal.fire("Error", "Please enter your old password", "error");
    }
    if (data.newPassword === "") {
      return Swal.fire("Error", "Please enter new password ", "error");
    }

    const success = await changePasswordUser(data);
    if (success) {
      setData(initialState);
      navigate("/account-details");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Show Password States
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto shadow-lg pb-10 bg-white rounded-md">
      {/* Form Header */}
      <div>
        <div className="flex justify-between py-2.5 px-5 shadow-md">
          <img
            className="h-16 rounded-full object-contain"
            src={tanauanLogo}
            alt="tanauan-logo"
          />
          <img
            className="h-16 object-contain"
            src={tanauanSlogan}
            aalt="tanauan-slogan"
          />
        </div>
      </div>

      <form className="mt-10 px-5 w-full max-w-2xl mx-auto pt-10 pb-5">
        <div className="my-3">
          <h2 className="font-bold text-center text-2xl">Change Password</h2>
        </div>

        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="mb-3 relative">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Old Password
              </label>
              <input
                value={data.currentPassword}
                onChange={handleOnChange}
                name="currentPassword"
                type={`${showOldPass ? "text" : "password"}`}
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />

              {!showOldPass ? (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setShowOldPass(true);
                  }}
                  className="absolute top-10 right-3"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={() => {
                    setShowOldPass(false);
                  }}
                  className="absolute top-10 right-3"
                  size={20}
                />
              )}
            </div>
            <div className="mb-3 relative">
              <label className="block mb-2 text-md font-medium text-gray-900 ">
                New Password
              </label>
              <input
                value={data.newPassword}
                onChange={handleOnChange}
                name="newPassword"
                type={`${showNewPass ? "text" : "password"}`}
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />

              {!showNewPass ? (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setShowNewPass(true);
                  }}
                  className="absolute top-10 right-3"
                  size={20}
                />
              ) : (
                <AiOutlineEye
                  onClick={() => {
                    setShowNewPass(false);
                  }}
                  className="absolute top-10 right-3"
                  size={20}
                />
              )}
            </div>

            <button
              onClick={changePassBTN}
              type="submit"
              className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
