import React, { useState } from "react";

// React Icons
import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Components
import Loader from "../../components/Loader/Loader";

const AddModal = ({ fetchEquipments, closeAddModal }) => {
  const handleBackdrop = (e) => {
    let id = e.target.id;
    if (id === "backdrop") return closeAddModal();
  };

  // Name
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEquipment = async (e) => {
    e.preventDefault();

    if (data === "") {
      return Swal.fire("Error", "Please enter equipment name!", "error");
    }

    try {
      setLoading(true);
      await axios.post(`${api}/equipment`, { name: data.toLowerCase() });
      await fetchEquipments();
      closeAddModal();
      setLoading(false);
      return Swal.fire("Success", "New Equipment has been added!", "success");
    } catch (error) {
      setLoading(false);
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  return (
    <div
      onClick={handleBackdrop}
      id="backdrop"
      className="h-screen w-full absolute top-0 left-0 px-6 py-10 z-20 bg-black bg-opacity-30"
    >
      {/* Modal */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between py-5 px-3 border-b border-gray-300">
          <h1 className="font-medium text-lg">Add Equipment</h1>
          <GrFormClose
            onClick={closeAddModal}
            className="cursor-pointer"
            size={24}
            color="#222"
          />
        </div>

        {/* Form */}
        {loading ? (
          <div className="px-2 py-20 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <form className="px-5 pb-8">
            <div className="mt-4">
              <label className="block mb-2 text-base font-medium text-gray-600">
                Equipment Name:
              </label>
              <input
                onChange={(e) => {
                  setData(e.target.value);
                }}
                name="name"
                value={data.name}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md d focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </form>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 items-center py-5 px-3 border-t border-gray-300">
          <button
            onClick={closeAddModal}
            className="bg-gray-600 hover:bg-gray-500 px-2.5 py-1.5 rounded-md text-white"
          >
            Close
          </button>
          <button
            onClick={handleEquipment}
            className="bg-blue-600 hover:bg-blue-500 px-2.5 py-1.5 rounded-md text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
