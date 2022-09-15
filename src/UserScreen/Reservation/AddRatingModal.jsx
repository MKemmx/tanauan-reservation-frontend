import React, { useState } from "react";

// React Icons
import { GrFormClose } from "react-icons/gr";

// Star Rating
import ReactStarsRating from "react-awesome-stars-rating";
import Swal from "sweetalert2";

// Axios and API
import axios from "axios";
import api from "../../utils/api";

// Components
import Loader from "../../components/Loader/Loader";

// State
import useLoginState from "../../store/loginState";

const AddRatingModal = ({ addRatingData, setAddRatingData }) => {
  const closeModal = () => {
    setAddRatingData(null);
  };
  const handleBackDrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeModal();
  };

  // State
  const { token } = useLoginState((state) => state);

  const [ratingScore, setRatingScore] = useState(0);
  const [ratingMessage, setRatingMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  const handleAddRating = async (e) => {
    let myData = {
      reservationId: addRatingData?._id,
      ratingScore,
      ratingMessage,
    };

    try {
      setLoading(true);
      await axios.post(`${api}/rating`, myData, config);
      closeModal();
      setLoading(false);
      return Swal.fire(
        "Success",
        `Rating Added! Thank you for your response`,
        "success"
      );
    } catch (error) {
      setLoading(false);
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  return (
    <div
      id="backdrop"
      onClick={handleBackDrop}
      className="bg-black bg-opacity-40 w-full h-screen absolute top-0 left-0 z-10"
    >
      <div className="w-full max-w-lg mx-auto mt-16 bg-white rounded-md z-20">
        {/* Modal Header */}
        <div className="w-full px-3 py-5 flex justify-between items-center border-b border-gray-300">
          <div>
            <h1 className="font-medium text-lg"> Add Rating </h1>
          </div>

          <GrFormClose
            className="cursor-pointer"
            onClick={closeModal}
            size={26}
          />
        </div>

        <div>
          {loading ? (
            <div className="h-80 flex justify-center items-center pb-10">
              <Loader />
            </div>
          ) : (
            <>
              {/* Modal Body */}
              <div className="w-full px-4 my-5">
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Rating Score:
                  </label>
                  <div>
                    <ReactStarsRating
                      className="flex space-x-1"
                      onChange={(value) => setRatingScore(value)}
                      value={ratingScore}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Rating Message:
                  </label>
                  <textarea
                    rows={8}
                    onChange={(e) => {
                      setRatingMessage(e.target.value);
                    }}
                    value={ratingMessage}
                    className="block outline-none max-h-80 h-full p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Rating message..."
                    defaultValue={""}
                  />
                </div>
              </div>
              {/* Modal Footer */}
              <div class="w-full border-t border-gray-300 space-x-3 flex items-center justify-end px-5 py-4">
                <button
                  onClick={closeModal}
                  class="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={handleAddRating}
                  class="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRatingModal;
