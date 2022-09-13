import React, { useState, useEffect } from "react";

// Icons
import { BsCalendarX } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { BiCalendarCheck, BiHelpCircle } from "react-icons/bi";
import { MdOutlineFreeCancellation, MdPendingActions } from "react-icons/md";

// Components
import Calendar from "../../UserScreen/Calendar/UserCalendar";
import Reservation from "../../UserScreen/Reservation/UserReservation";
import Loader from "../../components/Loader/Loader";
import HelperModal from "./HelperModal";
import AddModal from "./AddModal";

// Store
import useLoginState from "../../store/loginState";
import useSettingsState from "../../store/settingsState";
import useUserReservationState from "../../store/UserStore/UserReservations";

const UserDashboard = () => {
  // State
  const { token } = useLoginState((state) => state);
  const { openSideNav } = useSettingsState((state) => state);
  const {
    fetchMyReservations,
    loading,
    totalReservation,
    successReservation,
    pendingReservation,
    cancelledReservation,
    rejectedReservation,
  } = useUserReservationState((state) => state);

  useEffect(() => {
    fetchMyReservations(token);
  }, []);

  // Modal States
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      {showHelperModal && (
        <HelperModal setShowHelperModal={setShowHelperModal} />
      )}
      {showAddModal && <AddModal setShowAddModal={setShowAddModal} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <div
          className={`${
            openSideNav ? "px-3" : "px-10"
          }  flex items-center py-6 shadow-lg bg-white border-r-8 border-sky-500 rounded-xl`}
        >
          {loading ? (
            <div className="w-full h-full items-center flex justify-center py-4">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mr-8 bg-sky-500 p-3 rounded-full">
                <GoCalendar size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg text"> Total Reservations </h2>
                <p className="text-gray-700 text-base"> {totalReservation} </p>
              </div>
            </>
          )}
        </div>
        <div
          className={`${
            openSideNav ? "px-3" : "px-10"
          } flex items-center px-10 py-5 bg-white shadow-lg border-r-8 border-green-500 rounded-xl`}
        >
          {loading ? (
            <>
              <div className="w-full h-full items-center flex justify-center">
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div className="mr-8 bg-green-500 p-3 rounded-full">
                <BiCalendarCheck size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Success Reservations </h2>
                <p className="text-gray-700 text-base">{successReservation}</p>
              </div>
            </>
          )}
        </div>
        <div
          className={`${
            openSideNav ? "px-3" : "px-10"
          } flex items-center px-10 py-5 shadow-lg bg-white border-r-8 border-amber-500 rounded-xl`}
        >
          {loading ? (
            <>
              <div className="w-full h-full items-center flex justify-center">
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div className="mr-8 bg-amber-500 p-3 rounded-full">
                <MdPendingActions size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Pending Reservations </h2>
                <p className="text-gray-700 text-base">{pendingReservation} </p>
              </div>
            </>
          )}
        </div>
        <div
          className={`${
            openSideNav ? "px-3" : "px-10"
          } flex items-center px-10 py-5 shadow-lg bg-white border-r-8 border-red-400 rounded-xl`}
        >
          {loading ? (
            <>
              <div className="w-full h-full items-center flex justify-center">
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div className="mr-8 bg-red-400 p-3 rounded-full">
                <MdOutlineFreeCancellation size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Cancelled Reservations </h2>
                <p className="text-gray-700 text-base">
                  {cancelledReservation}
                </p>
              </div>
            </>
          )}
        </div>
        <div
          className={`${
            openSideNav ? "px-3" : "px-10"
          } flex items-center px-10 py-5 shadow-lg bg-white border-r-8 border-red-400 rounded-xl`}
        >
          {loading ? (
            <>
              <div className="w-full h-full items-center flex justify-center">
                <Loader />
              </div>
            </>
          ) : (
            <>
              <div className="mr-8 bg-red-400 p-3 rounded-full">
                <BsCalendarX size={30} color="#fff" />
              </div>
              <div>
                <h2 className="text-lg"> Rejected Reservations </h2>
                <p className="text-gray-700 text-base">{rejectedReservation}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 mx-6 mb-10 rounded-sm shadow-lg py-5 px-8 bg-white">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => {
              setShowAddModal(true);
            }}
            className="bg-[#114B7B] cursor-pointer text-white font-sm px-2 py-1.5 rounded-lg hover:bg-[#1b5c91]"
          >
            Add Reservation
          </button>
          <BiHelpCircle
            onClick={() => {
              setShowHelperModal(true);
            }}
            color="#0A3E69"
            className="cursor-pointer"
            size={28}
          />
        </div>
        <Calendar />
      </div>

      <div className="py-5 mx-6 mb-3 rounded-sm shadow-lg px-8 bg-white">
        <Reservation />
      </div>
    </div>
  );
};

export default UserDashboard;
