import React, { useState, useEffect } from "react";

import moment from "moment";
import ReactStarsRating from "react-awesome-stars-rating";

// React Icons
import { GrFormClose } from "react-icons/gr";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Components
import Loader from "../../components/Loader/Loader";

const UserCalendarModal = ({ showCalendarDetail, closeCalendarDetail }) => {
  let reservationData = showCalendarDetail;

  const handleBackdrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeCalendarDetail();
  };

  // State
  const [ratingData, setRatingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Show Rating
  const [showRating, setShowRating] = useState(true);

  // Fetch Rating
  const fetchRating = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/rating/${reservationData._id}`);
      setRatingData(data.rating);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <div
      id="backdrop"
      onClick={handleBackdrop}
      className="w-full h-screen absolute top-0 left-0 bg-black bg-opacity-40 z-10"
    >
      <div className="w-full max-w-lg mx-auto bg-white mt-10">
        {/* Modal Header */}
        <div className="w-full border-b border-gray-200 flex items-center justify-between py-5 px-4">
          <h1 className="text-lg font-medium"> Reservation Detail </h1>
          <GrFormClose
            className="cursor-pointer"
            onClick={closeCalendarDetail}
            size={26}
          />
        </div>
        {/* Modal Body */}
        <div className="w-full bg-white py-4 px-4 border-gray-300">
          <h1> Title: {reservationData?.title} </h1>
          <h1> Start: {moment(reservationData?.start).format("LLLL")} </h1>
          <h1> End: {moment(reservationData?.end).format("LLLL")} </h1>
        </div>

        {showRating && (
          <div className="border-t border-gray-200">
            {/* Rating */}
            {loading ? (
              <div className="h-28 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="px-4 pb-5 pt-2 ">
                <div className=" flex items-center justify-end">
                  <GrFormClose
                    className="cursor-pointer"
                    onClick={() => {
                      setShowRating(false);
                    }}
                    size={26}
                  />
                </div>

                {ratingData !== null ? (
                  <div>
                    <div className="flex mb-1 items-center space-x-2">
                      <h1 className="font-medium text-lg"> User: </h1>
                      <p className="text-md"> Anonymous </p>
                    </div>

                    <div className="mb-1 flex items-center space-x-3">
                      <h1 className="font-medium text-lg"> Rating Score: </h1>
                      <ReactStarsRating
                        size={18}
                        className="flex space-x-1"
                        value={ratingData.ratingScore}
                      />
                    </div>

                    <div>
                      <h1 className="font-medium text-lg"> Rating Message: </h1>
                      <p> {ratingData.ratingMessage} </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center my-10">
                    <h1 className="text-lg font-medium">
                      This reservation has no ratings!
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="w-full bg-white py-4 px-4 border-t border-gray-200 rounded-md">
          <button
            onClick={closeCalendarDetail}
            className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCalendarModal;
