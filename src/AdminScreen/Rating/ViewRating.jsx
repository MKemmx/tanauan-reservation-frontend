import React from "react";

import { GrFormClose } from "react-icons/gr";
import ReactStarsRating from "react-awesome-stars-rating";

const ViewRating = ({ ratingData, closeRating }) => {
  const handleBackdropClick = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeRating();
  };

  return (
    <div
      onClick={handleBackdropClick}
      id="backdrop"
      className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-10"
    >
      {/*  Modal */}
      <div className="w-full mt-16 mx-auto max-w-lg bg-white ">
        {/* Modal Header */}
        <div className="flex items-center border-gray-300 border-b justify-between px-3 py-5 w-full">
          <h1 className="font-medium text-lg"> Rating Details</h1>
          <GrFormClose
            className="cursor-pointer"
            onClick={closeRating}
            size={26}
          />
        </div>
        {/* Modal Body */}
        <div className="w-full px-5 pt-5 pb-8">
          <div className="flex items-center mb-1">
            <p className="font-medium text-md mr-2">Rated By:</p>
            <p className="font-medium">
              {ratingData?.reservationId?.userId?.firstName}{" "}
              {ratingData?.reservationId?.userId?.lastName}
            </p>
          </div>
          <div className="font-medium text-md flex items-center mb-1">
            <p>Rating Score:</p>
            <ReactStarsRating
              isEdit={false}
              className="flex my-1 ml-2 space-x-1"
              value={ratingData?.ratingScore}
            />
          </div>
          <div>
            <p className="font-medium text-md">Rating Message:</p>
            <p className="mt-2"> {ratingData?.ratingMessage}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center border-gray-300 border-t justify-end px-3 py-5 w-full">
          <button
            onClick={closeRating}
            className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1.5 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRating;
