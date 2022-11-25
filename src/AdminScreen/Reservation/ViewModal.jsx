import React, { useState, useEffect } from "react";

// Swal
import Swal from "sweetalert2";
import { toast } from "react-toastify";

//  React Icons
import { AiOutlineCalendar } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { MdEventAvailable } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsTools } from "react-icons/bs";
import { RiGovernmentLine } from "react-icons/ri";

// API AND AXIOS
import api from "../../utils/api";
import axios from "axios";

// State
import useLoginState from "../../store/loginState";
import Loader from "../../components/Loader/Loader";

const ViewModal = ({ reserver, setShowModal, fetchReservations }) => {
  const { token } = useLoginState((state) => state);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  // Check if Payment is done
  const isPaymentDone = async () => {
    try {
      const { data } = await axios.get(
        `${api}/payment/${reserver?._id}`,
        config
      );

      if (data.payment === null) {
        Swal.fire(
          "Payment is required",
          "Please upload reservation receipt, before confirming this reservation!",
          "error"
        );

        return false;
      }

      return true;
    } catch (error) {
      console.log(error.response.data.msg);
      return false;
    }
  };

  const confirmButton = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm",
      text: "Confirm this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (reserver?.userId?.organizationType === "nonGovernment") {
          let alreadyPaid = await isPaymentDone();
          if (alreadyPaid) {
            updateReservationStatus("reserved");
            setShowModal(false);
          }
        } else {
          updateReservationStatus("reserved");
          setShowModal(false);
        }
      }
    });
  };

  const rejectButton = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Reject Reservation?",
      text: "Reservation will be rejected",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        updateReservationStatus("rejected");
        setShowModal(false);
      }
    });
  };

  const updateReservationStatus = async (status) => {
    try {
      const { data } = await axios.post(
        `${api}/reservation/update-reservation-status`,
        {
          reservationId: reserver?._id,
          status,
        },
        config
      );
      await fetchReservations();

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

  const handleBackdrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return setShowModal(false);
  };

  // Receipt
  const [showUpload, setShowUpload] = useState(false);
  const [reservationReceipt, setReservationReceipt] = useState(null);

  // Loading State
  const [loadingPayment, setLoadingPayment] = useState(true);

  const handleUploadReceipt = async (e) => {
    e.preventDefault();

    if (reservationReceipt === null) {
      return Swal.fire("Error", "Please upload image receipt", "error");
    }

    const formData = new FormData();
    formData.append("reservationId", reserver._id);
    formData.append("paymentReceipt", reservationReceipt);

    try {
      setLoadingPayment(true);
      // Form Data
      await axios.post(`${api}/payment`, formData, config);
      await checkIfAlreadyPaid();
      Swal.fire(
        "Success",
        "Payment Receipt has successfully added, you can now confirm the reservation.",
        "success"
      );

      setLoadingPayment(false);
    } catch (error) {
      setLoadingPayment(false);
      Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  const checkIfAlreadyPaid = async () => {
    try {
      setLoadingPayment(true);
      const { data } = await axios.get(
        `${api}/payment/${reserver?._id}`,
        config
      );
      if (data.payment === null) {
        setLoadingPayment(false);
        return setShowUpload(true);
      }

      setLoadingPayment(false);
      return setShowUpload(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoadingPayment(false);
      setShowUpload(true);
    }
  };

  useEffect(() => {
    checkIfAlreadyPaid();
  }, []);

  return (
    <div
      onClick={handleBackdrop}
      id="backdrop"
      className="h-screen w-full position overflow-y-scroll fixed top-0 left-0 px-6 py-10 z-50 bg-black bg-opacity-30"
    >
      <div className="mx-auto w-full max-w-2xl bg-white-200 h-auto shadow-lg ">
        {/* Modal Header */}
        <div className="flex bg-white border-b border-gray-200 px-3 py-6 justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Reservation Details
          </h3>
          <div
            onClick={() => {
              setShowModal(false);
            }}
            className="bg-white cursor-pointer ease-in-out duration-300 rounded-full p-0.5 hover:bg-gray-100 "
          >
            <GrFormClose size={26} />
          </div>
        </div>
        {/* Modal Body */}
        <div className="px-4 py-5 w-full bg-white shadow-lg">
          <img
            className="w-full object-contain h-40 rounded-md"
            src={reserver?.userId?.profile?.url}
          />
          {/* User Details */}
          <div className="px-6 py-7 mt-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-2 shadow-md">
            <div>
              <div className="flex items-center mt-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <CgProfile size={22} />
                  <p className="font-medium text-lg">Reserver:</p>
                </div>
                <h1 className="px-2 text-base capitalize">
                  {`${reserver?.userId?.firstName} ${reserver?.userId?.lastName}`}
                </h1>
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <MdEventAvailable size={22} />
                  <p className="font-medium text-lg">Reservation Category:</p>
                </div>
                <h1 className="px-2 text-base"> {reserver?.title} </h1>
              </div>

              <div className="flex items-center mt-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <RiGovernmentLine size={22} />
                  <p className="font-medium text-lg">Organization Type:</p>
                </div>
                <h1 className="px-2 text-base capitalize">
                  {reserver?.userId?.organizationType}{" "}
                </h1>
              </div>
            </div>

            <div className="flex-col">
              <div className="flex items-center mt-2 text-gray-700">
                <div className="flex space-x-2">
                  <AiOutlineCalendar size={22} />
                  <p className="font-medium"> Start :</p>
                </div>
                <h1 className="px-2 text-base"> {reserver?.start} </h1>
              </div>
              <div className="flex items-center mt-2 text-gray-700">
                <div className="flex space-x-2">
                  <AiOutlineCalendar size={22} />
                  <p className="font-medium"> End :</p>
                </div>
                <h1 className="px-2 text-base"> {reserver?.end} </h1>
              </div>
            </div>
          </div>

          {reserver?.equipments?.length > 0 && (
            <div className="bg-gray-50 px-3 py-5 shadow-lg">
              <div className="flex space-x-2">
                <BsTools size={22} />
                <p className="font-medium"> Equipments Requested:</p>
              </div>
              <ul className="mt-2 ml-10">
                {reserver?.equipments?.map((item, index) => {
                  return (
                    <div key={index} className="flex">
                      <li className="capitalize list-disc">
                        <span className="font-medium mr-1">Name:</span>
                        {item?.equipment?.name}
                      </li>
                      <li className="ml-3">
                        <span className="font-medium mr-1">Quantity:</span>
                        {item?.qty}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}

          {loadingPayment ? (
            <div className="w-full flex justify-center items-center h-28">
              <Loader />
            </div>
          ) : (
            <>
              {showUpload && (
                <>
                  {reserver?.userId?.organizationType === "nonGovernment" &&
                    reserver?.status === "pending" && (
                      <>
                        <div className="bg-white mt-5 px-3 shadow-lg">
                          <div className="py-8">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900"
                              htmlFor="file_input"
                            >
                              Upload Reservation Receipt
                            </label>
                            <input
                              onChange={(e) => {
                                let file = e.target.files[0];
                                if (e.target.files && file) {
                                  setReservationReceipt(file);
                                } else {
                                  setReservationReceipt(null);
                                }
                              }}
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                              type="file"
                            />
                          </div>

                          {reservationReceipt !== null && (
                            <div className="py-3 flex justify-center items-center flex-col">
                              <div className="bg-red-100">
                                <img
                                  className="object-cover h-48 w-48"
                                  src={
                                    reservationReceipt !== null &&
                                    URL.createObjectURL(reservationReceipt)
                                  }
                                  alt="receipt image"
                                />
                              </div>

                              <div className="mt-5 w-full">
                                <button
                                  onClick={handleUploadReceipt}
                                  className="w-full px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                </>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {reserver?.status === "pending" && (
          <div className="flex items-center justify-end p-4 bg-white space-x-2 rounded-b border-t border-gray-200">
            <button
              onClick={confirmButton}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Confirm
            </button>

            {showUpload && (
              <button
                onClick={rejectButton}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm font-medium px-5 py-2.5"
              >
                Reject
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewModal;
