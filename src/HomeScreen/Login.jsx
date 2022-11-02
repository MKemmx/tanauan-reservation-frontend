import React, { useState, useEffect } from "react";

// Logos
import TanauanLogo from "../images/tanauanlogo.jpg";

// Components
import Loader from "../components/Loader/Loader";

// Alerts
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Moment js
import moment from "moment";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Calendar State
import useUserCalendarState from "../store/UserStore/UserCalendar";
import useLoginState from "../store/loginState";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  // Login As Admin
  const [checked, setChecked] = useState(false);

  // Calendar
  const { calendarData, fetchReservations } = useUserCalendarState(
    (state) => state
  );

  // User State
  const { loginUser, loginAdmin, isAuthenticated, loading, resetPasswordUser } =
    useLoginState((state) => state);

  // Data
  const [data, setData] = useState(initialState);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (data.email === "") {
      return Swal.fire("Error", "Please enter your email address!", "error");
    }

    if (data.password === "") {
      return Swal.fire("Error", "Please enter your password!", "error");
    }

    if (checked) {
      let successAdmin = await loginAdmin(data);
      if (successAdmin) {
        toast.success("Welcome Back Admin!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return;
    }

    let successUser = await loginUser(data);
    if (successUser) {
      return toast.success(`Welcome Back ${data.email}!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Render Date Component
  const renderDayContents = (day, date) => {
    let reserved = false;
    let currentDate = moment(date).format("L");
    for (let item of calendarData) {
      let start = moment(item.start).format("L");
      let end = moment(item.end).format("L");
      if (currentDate == start || currentDate == end) {
        reserved = true;
      }
    }
    const tooltipText = `Date is reserved: ${moment(date).format("LL")}`;
    return (
      <span
        className={`${
          reserved &&
          "bg-red-800 text-white md:py-1.5 md:px-2.5 md:-ml-0.5 px-3 py-3 rounded-md overflow-hidden"
        }`}
        title={reserved && tooltipText}
      >
        {new Date(date).getDate()}
      </span>
    );
  };
  const [showCalendar, setShowCalendar] = useState(true);

  // Fetch Events
  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // Handle Forgot Pasword
  const handleForgotPassword = async (e) => {
    const { value: email } = await Swal.fire({
      title: "Enter email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    if (email) {
      return resetPasswordUser({ email });
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bannerImageHead">
      <div className="absolute right-5 md:right-10 top-7 z-100 flex flex-col">
        <p
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          className="cursor-pointer mdtext-lg font-semibold text-center text-white flex justify-between items-center"
        >
          {moment().format("LLLL")}
          <i className={`ml-3 arrow  ${showCalendar ? "up" : "down"} `}></i>
        </p>
        <div className="hidden md:block">
          {showCalendar && (
            <div className="w-full flex items-center justify-center py-2.5 z-50">
              <DatePicker
                className="mr-auto"
                selected={new Date()}
                renderDayContents={renderDayContents}
                inline={true}
                minDate={moment().toDate()}
              />
            </div>
          )}
        </div>
        <div className="block md:hidden z-50 -mt-5">
          <DatePicker
            className="bg-red-100 w-full max-w-lg opacity-0"
            selected={new Date()}
            renderDayContents={renderDayContents}
            withPortal={true}
            minDate={moment().toDate()}
          />
        </div>
      </div>

      <div
        data-aos="fade-down"
        data-aos-duration="2000"
        className="flex w-full max-w-sm mx-auto overflow-hidden opacity-100 rounded-2xl shadow-2xl lg:max-w-lg myLogin bg-white bg-opacity-95"
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

          {loading ? (
            <div className="flex justify-center items-center py-36">
              <Loader />
            </div>
          ) : (
            <>
              <div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                  />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <input
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                  />
                </div>

                <div className="flex items-center ml-1 mt-3">
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 outline-none"
                  />
                  <label className="ml-2 text-sm text-gray-600 font-medium">
                    Login as Admin
                  </label>
                </div>

                <div className="mt-4 mb-4">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#0A3E69] hover:bg-[#185587] rounded-md  focus:outline-none focus:bg-gray-600"
                  >
                    Login
                  </button>
                </div>
              </div>

              <div className="mt-2 flex justify-between">
                <p
                  onClick={handleForgotPassword}
                  className="text-base text-gray-500 hover:text-[#0A3E69] cursor-pointer"
                >
                  Forget Password?
                </p>
                <p className="text-base text-gray-500">
                  New ?
                  <span
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="hover:text-[#0A3E69] cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>
            </>
          )}

          <div className="mt-6 px-2">
            <p className="text-sm text-center text-gray-500">
              By using this service, you understood and agree to the
              <span
                onClick={() => {
                  let termsLink = `${window.origin}/terms-conditions`;
                  window.open(termsLink, "_blank");
                }}
                className="font-medium cursor-pointer hover:text-[#0A3E69] hover:underline"
              >
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

export default Login;
