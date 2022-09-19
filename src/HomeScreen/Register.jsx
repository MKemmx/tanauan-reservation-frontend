import React, { useState } from "react";
// Swal
import Swal from "sweetalert2";
// Tanauan Logo
import TanauanLogo from "../images/tanauanlogo.jpg";
// React Router DOM
import { useNavigate } from "react-router-dom";
// Login Stte
import useLoginState from "../store/loginState";
// React Select and Selector
import Select from "react-select";
import { getBarangayByMun } from "phil-reg-prov-mun-brgy";

// Loader Component
import Loader from "../components/Loader/Loader";

// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();

  const { registerUser, loading } = useLoginState((state) => state);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    barangay: "",
    profile: null,
    frontID: null,
    backID: null,
  });

  // Password State
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Regex PH Phone Number
    let numberRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (data.profile === null) {
      return Swal.fire("Error", "Profile is required!", "error");
    }

    if (data.firstName === "") {
      return Swal.fire("Error", "Please enter your firstname", "error");
    }

    if (data.lastName === "") {
      return Swal.fire("Error", "Please enter lastname", "error");
    }

    if (data.email === "") {
      return Swal.fire("Error", "Please enter Email Address", "error");
    }

    if (data.phoneNumber === "") {
      return Swal.fire("Error", "Please enter your Phone number", "error");
    }

    if (!numberRegex.test(data.phoneNumber)) {
      return Swal.fire(
        "Error",
        "Please enter a valid Philippines phonenumber",
        "error"
      );
    }

    if (data.gender === "") {
      return Swal.fire("Error", "Please select your gender", "error");
    }

    if (data.barangay === "") {
      return Swal.fire("Error", "Please select your barangay", "error");
    }

    if (password === "") {
      return Swal.fire("Error", "Please enter password", "error");
    }

    if (confirmPassword === "") {
      return Swal.fire("Error", "Please enter confirmation password", "error");
    }

    if (password !== confirmPassword) {
      return Swal.fire("Error", "Password does not match", "error");
    }

    if (data.frontID === null) {
      return Swal.fire("Error", "Front ID is required!", "error");
    }

    if (data.backID === null) {
      return Swal.fire("Error", "Back ID is required!", "error");
    }

    const userData = {
      ...data,
      password,
    };

    const successRegister = await registerUser(userData);
    if (successRegister) {
      return navigate("/");
    }
  };

  // Handle Data Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //! Handle Photo Change
  const handlePhoto = (e) => {
    const { name, files } = e.target;
    if (e.target.files && e.target.files[0]) {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: null,
      });
    }
  };

  // Tanauan Barangays
  const options = getBarangayByMun(83748).map((barangay) => {
    return {
      value: barangay.name,
      label: barangay.name,
    };
  });

  //
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="h-screen overflow-y-auto w-full flex justify-center bannerImageHead">
      <div
        data-aos="fade-down"
        data-aos-duration="2000"
        className="flex mt-14 mb-10 h-fit w-full mx-7 sm:max-w-2xl md:mx-auto overflow-hidden opacity-100 rounded-2xl shadow-2xl lg:max-w-3xl myLogin bg-white bg-opacity-95"
      >
        <div className="w-full px-6 py-8 md:px-8">
          <div className="w-full">
            <img
              className="w-20 h-20 object-contain mx-auto rounded-full"
              src={TanauanLogo}
              alt="tanauanlogo"
            />
          </div>
          <h2 className="text-3xl font-semibold text-center mt-2 mb-1 text-gray-700 headTitle">
            Tanauan Civic Center Reservation System
          </h2>
          <h2 className="text-lg font-medium text-center mt-4 mb-1 text-gray-700">
            Register Page
          </h2>

          {loading ? (
            <div className="w-full flex justify-center items-center mb-32 h-60">
              <Loader />
            </div>
          ) : (
            <>
              {/* Regiter Div */}
              <form encType="multipart/form-data">
                <div className="mt-5">
                  <div className="mb-3">
                    {data?.profile !== null && (
                      <div className="w-full mt-4">
                        <img
                          className="h-44 mx-auto rounded-lg"
                          src={
                            data?.profile !== null &&
                            URL.createObjectURL(data?.profile)
                          }
                          alt="profile"
                        />
                      </div>
                    )}

                    <label className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white  border rounded-md cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-700 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      <h2 className="mx-3 text-gray-700">Profile Photo</h2>
                      <input
                        name="profile"
                        onChange={handlePhoto}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-5 mb-3">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        First Name
                      </label>

                      <input
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        type="text"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                      </div>
                      <input
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        type="text"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-5 mb-3">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="email"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                      </div>
                      <input
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        type="number"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-5 mb-3">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <Select
                        placeholder=""
                        className="text-gray-700 bg-white border border-gray-100 rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={({ value }) => {
                          setData({
                            ...data,
                            gender: value,
                          });
                        }}
                        name="gender"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Barangay
                        </label>
                      </div>

                      <Select
                        placeholder=""
                        className="text-gray-700 bg-white border border-gray-100 rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={({ value }) => {
                          setData({
                            ...data,
                            barangay: value,
                          });
                        }}
                        name="barangay"
                        options={options}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-5">
                    <div className="w-full relative">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        onChange={(e) => {
                          let text = e.target.value;
                          if (
                            text !== confirmPassword &&
                            confirmPassword.length >= 1
                          ) {
                            setPassword(text);
                            setPasswordError("Password does not match!");
                          } else {
                            setPasswordError(null);
                            setPassword(text);
                          }
                        }}
                        // name="password"
                        // value={data.password}
                        // onChange={handleChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                        type={showPass ? "text" : "password"}
                      />

                      {showPass ? (
                        <AiOutlineEye
                          onClick={() => {
                            setShowPass(false);
                          }}
                          size={20}
                          className="absolute top-10 right-3 cursor-pointer"
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={() => {
                            setShowPass(true);
                          }}
                          size={20}
                          className="absolute top-10 right-3 cursor-pointer"
                        />
                      )}
                    </div>

                    <div className="w-full flex flex-col">
                      <div className="w-full relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <input
                          onChange={(e) => {
                            let text = e.target.value;
                            if (text !== password && password.length >= 1) {
                              setConfirmPassword(text);
                              setPasswordError("Password does not match!");
                            } else {
                              setPasswordError(null);
                              setConfirmPassword(text);
                            }
                          }}
                          // name="confirmPassword"
                          // value={data.confirmPassword}
                          // onChange={handleChange}
                          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                          type={showConfirmPass ? "text" : "password"}
                        />{" "}
                        {showConfirmPass ? (
                          <AiOutlineEye
                            onClick={() => {
                              setShowConfirmPass(false);
                            }}
                            size={20}
                            className="absolute top-10 right-3 cursor-pointer"
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            onClick={() => {
                              setShowConfirmPass(true);
                            }}
                            size={20}
                            className="absolute top-10 right-3 cursor-pointer"
                          />
                        )}
                      </div>

                      {passwordError !== null && (
                        <div className="text-start ml-2">
                          <p className="mt-2 text-sm font-medium text-red-600">
                            {passwordError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-5 mb-3">
                    <div className="w-full">
                      <label className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white  border rounded-md cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-700 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <h2 className="mx-3 text-gray-700">Front ID Photo</h2>
                        <input
                          name="frontID"
                          onChange={handlePhoto}
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>

                      {data?.frontID !== null && (
                        <div className="w-full mt-4">
                          <img
                            className="rounded-lg h-60 w-full mx-auto object-contain"
                            src={
                              data?.frontID !== null &&
                              URL.createObjectURL(data?.frontID)
                            }
                            alt="front-id"
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white  border rounded-md cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-700 "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <h2 className="mx-3 text-gray-700">Back ID Photo</h2>
                        <input
                          name="backID"
                          onChange={handlePhoto}
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                      {data?.backID !== null && (
                        <div className="w-full mt-4">
                          <img
                            className="rounded-lg h-60 w-full mx-auto object-contain"
                            src={
                              data?.backID !== null &&
                              URL.createObjectURL(data?.backID)
                            }
                            alt="front-id"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-4 mb-4">
                <button
                  onClick={handleRegister}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#0A3E69] hover:bg-[#185587] focus:outline-none focus:bg-gray-600"
                >
                  Register
                </button>
              </div>

              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-500">
                  <span
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="hover:text-[#0A3E69] cursor-pointer"
                  >
                    Go Back
                  </span>
                </p>
              </div>
            </>
          )}

          <div className="mt-6 max-w-md mx-auto">
            <p className="text-sm text-center text-gray-500">
              By using this service, you understood and agree to the
              <span
                onClick={() => {
                  navigate("/terms-conditions");
                }}
                className="font-medium cursor-pointer hover:text-[#0A3E69]  hover:underline"
              >
                {" "}
                Tanauan Civic Center Online Reservation System Services Terms of
                Use and Privacy Statement
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
