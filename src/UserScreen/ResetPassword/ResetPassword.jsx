import React, { useState, useEffect } from "react";

// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// React Router DOM
import { useParams, useNavigate } from "react-router-dom";
// Swal
import Swal from "sweetalert2";

// Logo
import tanauanLogo from "../../images/tanauanlogo.jpg";
import Loader from "../../components/Loader/Loader";

// User State
import useLoginState from "../../store/loginState";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const initialState = {
    newPassword: "",
  };

  // Reset Password
  const { resetPasswordRequest, newPasswordUser, loading } = useLoginState(
    (state) => state
  );

  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (data.newPassword === "") {
      return Swal.fire("Error", "Please enter a new password", "error");
    }

    const mainData = {
      ...params,
      newPassword: data.newPassword,
    };

    await newPasswordUser(mainData);
  };

  useEffect(() => {
    if (!resetPasswordRequest) {
      return navigate("/");
    }
  }, [resetPasswordRequest]);

  //
  const [isHidePassword, setIsHidePassword] = useState(true);

  return (
    <div className="w-full absolute top-0 left-0 h-screen bannerImageHead px-10">
      <form className="max-w-lg bg-white bg-opacity-90 rounded-xl mx-auto mt-32 shadow-xl px-10 py-6">
        <img
          className="h-20 w-20 mx-auto object-cover shadow-lg rounded-full"
          src={tanauanLogo}
          alt=""
        />

        {loading ? (
          <div className="h-60 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <h1 className="my-10 font-medium text-2xl text-center">
              Reset Password Form
            </h1>
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                New Password
              </label>
              <input
                type={`${isHidePassword ? "password" : "text"}`}
                name="newPassword"
                onChange={handleChange}
                value={data.newPassword}
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />

              <div
                onClick={() => {
                  setIsHidePassword(!isHidePassword);
                }}
                className="absolute right-3 top-10"
              >
                {isHidePassword ? (
                  <AiOutlineEyeInvisible className="cursor-pointer" size={22} />
                ) : (
                  <AiOutlineEye className="cursor-pointer" size={22} />
                )}
              </div>
            </div>

            <button
              onClick={resetPassword}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
