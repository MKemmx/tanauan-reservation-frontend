import React from "react";

// React Icons
import { GrFormClose } from "react-icons/gr";

const HelperModal = ({ setShowHelperModal }) => {
  const closeModal = () => {
    setShowHelperModal(false);
  };

  const handleBackdrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeModal();
  };

  return (
    <div
      onClick={handleBackdrop}
      id="backdrop"
      className="w-full h-screen absolute top-0 left-0 bg-black bg-opacity-40 z-30"
    >
      <div className="w-full max-w-md mx-auto mt-10 bg-white rounded-lg">
        {/* Modal Header */}
        <div className="bg-white border-b border-gray-300 flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-medium"> Helper </h1>
          </div>
          <div>
            <GrFormClose
              onClick={closeModal}
              className="cursor-pointer"
              size={24}
            />
          </div>
        </div>
        {/* Modal Body */}
        <div className="bg-white pt-2 pb-7">
          <h1 className="font-medium text-center text-2xl px-16 leading-7 mb-10">
            Tanauan Civic Center Reservation System Helper
          </h1>
          <div className="text-gray-700 mt-4 px-4">
            <p className="text-md font-medium mb-1"> Notes: </p>
            <ul className="ml-8">
              <li className="list-disc">Reds are whole day reserved.</li>
              <li className="list-disc">Yellow are half day reserved.</li>
              <li className="list-disc">
                You can clicked the reserved date to get more data.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-x-2 flex items-center justify-end py-2.5 pr-6 border-t border-gray-300">
          <button
            type="button"
            onClick={closeModal}
            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelperModal;
