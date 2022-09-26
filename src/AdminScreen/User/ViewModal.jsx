import React from "react";

// Swal
import Swal from "sweetalert2";
import { toast } from "react-toastify";

//  React Icons
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { RiGovernmentLine } from "react-icons/ri";

// API AND AXIOS
import api from "../../utils/api";
import axios from "axios";

const ViewModal = ({ user, setShowModal, fetchUsers }) => {
  console.log(user);
  // Activate Account
  const confirmAccountBtn = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm account?",
      text: "Accout will be able to login after confirmation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        updateAccStatus("active");
        setShowModal(false);
      }
    });
  };

  // Reject Account
  const rejectAccountBtn = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Deactivate account?",
      text: "This user will not be able to login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        updateAccStatus("rejected");
        setShowModal(false);
      }
    });
  };

  // Helper Function
  const updateAccStatus = async (status) => {
    try {
      const { data } = await axios.post(`${api}/user/update-account-status`, {
        userId: user?._id,
        status,
      });
      fetchUsers();
      return toast.success(`${data.msg}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  // Back Drop Click
  const handleBackdrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      onClick={handleBackdrop}
      id="backdrop"
      className="h-screen w-full position overflow-y-scroll fixed top-0 left-0 px-6 py-10 z-50 bg-black bg-opacity-30"
    >
      <div className="mx-auto w-full max-w-2xl bg-white-200 h-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex bg-white border-b border-gray-200 px-3 py-6 justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-900"> User Details</h3>
          <div
            onClick={() => {
              setShowModal(false);
            }}
            className="bg-white cursor-pointer ease-in-out duration-300 rounded-full p-0.5 hover:bg-gray-100"
          >
            <GrFormClose size={26} />
          </div>
        </div>
        {/* Modal Body */}
        <div className="px-4 py-5 w-full bg-white shadow-lg">
          <img className="w-full object-contain h-60" src={user?.profile.url} />
          {/* User Details */}
          <div className="px-6 py-2">
            <p className="text-lg font-medium text-gray-700 capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex items-center mt-2 text-gray-700">
              <AiOutlineMail size={22} />
              <h1 className="px-2 text-base"> : {user?.email} </h1>
            </div>
            <div className="flex items-center mt-2 text-gray-700">
              <AiOutlinePhone size={22} />
              <h1 className="px-2 text-base"> : {user?.phoneNumber} </h1>
            </div>
            <div className="flex items-center mt-2 text-gray-700">
              <BsHouseDoor size={22} />
              <h1 className="px-2 text-md"> : {user?.barangay} </h1>
            </div>

            <div className="flex items-center mt-2 text-gray-700">
              <RiGovernmentLine size={22} />
              <h1 className="px-2 text-md capitalize">
                : {user?.organizationType}{" "}
              </h1>
            </div>
          </div>

          {/* Ids */}
          <div className="w-full flex flex-col items-center justify-between space-y-3 space-x-5 py-2 md:flex-row">
            <div className="shadow-lg px-4 py-2 flex flex-col justify-end">
              <h2 className="text-lg font-medium text-center my-2">Front ID</h2>
              <img className="object-contain h-48" src={user?.frontID.url} />
            </div>

            <div className="shadow-lg px-4 py-2 flex flex-col justify-end">
              <h2 className="text-lg font-medium text-center my-2">Back ID</h2>
              <img
                className="object-contain h-48"
                src={user?.backID.url}
                alt={user?.email}
              />
            </div>
          </div>

          {/* Letter */}
          {user?.organizationType.toLowerCase() === "government" && (
            <>
              <div className="shadow-lg w-fit mx-auto p-3">
                <h2 className="text-lg font-medium text-center mt-2 mb-4">
                  Approval Letter
                </h2>
                <img
                  className="object-contain h-44 w-full mx-auto"
                  src={user?.governmentLetter?.url}
                  alt={user?.email}
                />
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {user?.status === "active" ? (
          <div className="flex items-center justify-end p-4 bg-white space-x-2 rounded-b border-t border-gray-200">
            <button
              onClick={closeModal}
              type="button"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5"
            >
              Close
            </button>

            <button
              onClick={rejectAccountBtn}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm font-medium px-5 py-2.5"
            >
              Deactivate Account
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end p-4 bg-white space-x-2 rounded-b border-t border-gray-200">
            <button
              onClick={closeModal}
              type="button"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none rounded-lg text-sm font-medium px-5 py-2.5"
            >
              Close
            </button>

            <button
              onClick={confirmAccountBtn}
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm font-medium px-5 py-2.5"
            >
              Activate Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewModal;
