import React, { useState, useEffect } from "react";
// Components
import Loader from "../../components/Loader/Loader";
// Sweet Alert
import Swal from "sweetalert2";
// Date Picker
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
// React Select
import Select from "react-select";
// Moment
import moment from "moment";
// React Icons
import { GrFormClose } from "react-icons/gr";

// API AND AXIOS
import axios from "axios";
import api from "../../utils/api";

// Global State
import useUserCalendar from "../../store/UserStore/UserCalendar";
import useLoginState from "../../store/loginState";
import UserReservations from "../../store/UserStore/UserReservations";

const AddModal = ({ setShowAddModal }) => {
  // Global State
  const { fetchMyReservations } = UserReservations((state) => state);
  const { fetchReservations } = useUserCalendar((state) => state);
  const { token } = useLoginState((state) => state);

  // Local State
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 7)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 0), 22)
  );

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    let selectedEquipments = equipmentsData.map((item) => {
      return {
        equipment: item.value,
        qty: item?.qty,
      };
    });

    if (title === "") {
      return Swal.fire("Error", "Please enter reservation category", "error");
    }

    let minresDate = moment(moment().toDate()).add(2, "days").toDate();

    if (startDate <= minresDate) {
      return Swal.fire(
        "Error",
        "Reservation must be made 2 days before the reservation date.",
        "error"
      );
    }

    if (startDate === "") {
      return Swal.fire("Error", "Please enter start date", "error");
    }

    if (endDate === "") {
      return Swal.fire("Error", "Please enter end date", "error");
    }

    const data = {
      title: title,
      start: moment(startDate).toDate(),
      end: moment(endDate).toDate(),
      equipments: selectedEquipments,
    };

    try {
      setLoading(true);
      await axios.post(`${api}/reservation`, data, config);
      await fetchReservations();
      await fetchMyReservations(token);
      Swal.fire("Success", "You have made an reservation", "success");
      setLoading(false);
      setShowAddModal(false);
    } catch (error) {
      setLoading(false);
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  // Back Drop Close
  const handleBackdropClose = (e) => {
    const id = e.target.id;
    if (id === "backdrop") {
      setShowAddModal(false);
    }
  };
  const options = [
    { value: "Wedding", label: "Wedding" },
    { value: "Graduation", label: "Graduation" },
    { value: "BirthDay", label: "BirthDay" },
    { value: "Party", label: "Party" },
    { value: "Conferences", label: "Conferences" },
    { value: "4Ps Announcements", label: "4Ps Announcements" },
    { value: "Veterans", label: "Veterans" },
    { value: "Others", label: "Others" },
  ];

  // Fetch Equipments options
  const [equipmentOptions, setEquipmentOptions] = useState([]);

  const [equipmentsData, setEquipmentsData] = useState([]);
  const fetchAvailableEquipments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/equipment/available-equipment`,
        config
      );
      let options = data?.equipments?.map((item) => {
        return {
          value: item._id,
          label: item.name,
          qty: 0,
        };
      });
      setEquipmentOptions(options);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAvailableEquipments();
  }, []);

  return (
    <>
      <div
        onClick={handleBackdropClose}
        id="backdrop"
        className="bg-black bg-opacity-40 flex justify-center overflow-y-auto overflow-x-hidden absolute top-0 left-0 z-50 w-full h-screen px-5"
      >
        <div className="relative w-full max-w-2xl h-fit mt-10 rounded-md shadow-2xl bg-white">
          <div className="w-full flex justify-between px-5 py-4 border-b border-gray-300">
            <div>
              <h1 className="text-lg font-medium"> Add Reservation </h1>
            </div>

            <div>
              <GrFormClose
                className="cursor-pointer"
                onClick={() => {
                  setShowAddModal(false);
                }}
                size={24}
              />
            </div>
          </div>

          {loading ? (
            <div className="w-full h-72 flex justify-center items-center ">
              <Loader />
            </div>
          ) : (
            <>
              <form className="w-full px-6 py-3 h-auto">
                <div className="px-0 py-2">
                  <label className="block mb-1 text-md font-medium text-gray-900">
                    Event Categories:
                  </label>
                  <Select
                    placeholder="Select Event Category"
                    options={options}
                    onChange={({ value }) => {
                      setTitle(value);
                    }}
                  />
                </div>

                <div className="px-0 pb-2 pt-1">
                  <label className="block mb-1 text-md font-medium text-gray-900">
                    Available Equipments:
                  </label>
                  <Select
                    value={equipmentsData}
                    isMulti
                    placeholder="Borrow Equipments"
                    options={equipmentOptions}
                    onChange={(selectedOption) => {
                      setEquipmentsData(selectedOption);
                    }}
                  />
                </div>

                {/*  */}

                <div>
                  {equipmentsData?.map((item) => (
                    <div className="flex items-center space-x-4 mt-1 mb-3">
                      <div>
                        <label className="block mb-1 text-md font-medium text-gray-900 capitalize">
                          {item?.label}:
                        </label>
                      </div>

                      <input
                        onChange={(e) => {
                          const { name, value } = e.target;
                          let newData = equipmentsData;
                          for (let item of newData) {
                            item?.label === name
                              ? (item.qty = parseInt(value))
                              : item;
                          }
                          setEquipmentsData(newData);
                        }}
                        type="number"
                        name={item?.label}
                        className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter item quantity.."
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center py-3 space-x-5 justify-center rounded-lg border  border-gray-300 bg-gray-50 ">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Start Date:
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeInput
                      minDate={moment(moment().toDate())
                        .add(2, "days")
                        .toDate()}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      End Date:
                    </label>
                    <DatePicker
                      // className="outline-none"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeInput
                      minDate={moment(moment().toDate())
                        .add(2, "days")
                        .toDate()}
                    />
                  </div>
                </div>
              </form>

              <div className="space-x-2 flex items-center justify-end py-2.5 pr-6 border-t border-gray-300">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                  }}
                  className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleReservation}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2  text-center"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddModal;
