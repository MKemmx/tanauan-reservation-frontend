import React, { useEffect } from "react";

// Components
import Loader from "../../components/Loader/Loader";
import Calendar from "../../UserScreen/Calendar/UserCalendar";
import AdminBarChart from "../Chart/AdminBarChart";

// React Icons and animations
import CountUp from "react-countup";
import { FaUsers } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

// Navigate
import { useNavigate } from "react-router-dom";

// Login State
import useLoginState from "../../store/loginState";
// Admin Dashboard State
import useDashboardState from "../../store/AdminStore/dashboardState";

const Dashboard = () => {
  const navigate = useNavigate();

  // Animation Duration
  const animationDuration = 2;
  const { token } = useLoginState((state) => state);

  // Dashboard State
  const { dashboardData, fetchDashboardData, loading } = useDashboardState(
    (state) => state
  );

  useEffect(() => {
    fetchDashboardData(token);
  }, []);

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          onClick={() => {
            navigate("/reservation");
          }}
          className="flex items-center px-10 py-5 bg-white border-r-8 border-sky-500 rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-sky-500 p-3 rounded-full">
                <BiCalendarCheck size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Reservations </h2>
                <p className="text-gray-700 text-base">
                  <CountUp
                    className="text-2xl "
                    duration={animationDuration}
                    end={dashboardData.reservations}
                  />
                </p>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => {
            navigate("/user");
          }}
          className="flex items-center px-10 py-5 bg-white border-r-8 border-green-500 rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-green-500 p-3 rounded-full">
                <FaUsers size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Users </h2>
                <p className="text-gray-700 text-base">
                  <CountUp
                    className="text-2xl "
                    duration={animationDuration}
                    end={dashboardData.users}
                  />
                </p>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => {
            navigate("/equipment");
          }}
          className="flex items-center px-10 py-5 bg-white border-r-8 border-red-500 rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-red-500 p-3 rounded-full">
                <BsTools size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg text"> Equipments </h2>
                <p className="text-gray-700 text-base">
                  <CountUp
                    className="text-2xl "
                    duration={animationDuration}
                    end={dashboardData.equipments}
                  />
                </p>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => {
            navigate("/rating");
          }}
          className="flex items-center px-10 py-5 bg-white border-r-8 border-yellow-500 rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-yellow-500 p-3 rounded-full">
                <AiOutlineStar size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg text"> Ratings </h2>
                <p className="text-gray-700 text-base">
                  <CountUp
                    className="text-2xl "
                    duration={animationDuration}
                    end={dashboardData.rating}
                  />
                </p>
              </div>
            </>
          )}
        </div>

        <div
          onClick={() => {
            navigate("/logs");
          }}
          className="flex items-center px-10 py-5 bg-white border-r-8 border-gray-500 rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-5">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-gray-500 p-3 rounded-full">
                <MdOutlineComputer size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Logs </h2>
                <p className="text-gray-700 text-base">
                  <CountUp
                    className="text-2xl "
                    duration={animationDuration}
                    end={dashboardData.logs}
                  />
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-5 mx-5 bg-white rounded-sm shadow-xl">
        <AdminBarChart />
      </div>

      {/* Calendar */}
      <div className="mt-5 mx-5 mb-10 rounded-sm shadow-xl py-5 px-8 bg-white">
        <Calendar />
      </div>
    </>
  );
};

export default Dashboard;
