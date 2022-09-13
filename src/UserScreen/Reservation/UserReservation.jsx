import React, { useEffect, useState } from "react";
// Data Table
import DataTable from "react-data-table-component";

// Moment
import moment from "moment";

// Print
import PrintLetter from "./PrintLetter/PrintLetter";

// Global State
import useLoginState from "../../store/loginState";
import userReservationState from "../../store/UserStore/UserReservations";
import userCalendarState from "../../store/UserStore/UserCalendar";

// React Icons
import { BiCommentAdd } from "react-icons/bi";

// Alert
import Swal from "sweetalert2";

// Components
import Loader from "../../components/Loader/Loader";
import AddRatingModal from "./AddRatingModal";

const UserReservation = () => {
  // Login State
  const { token } = useLoginState((state) => state);

  // My Reservation State
  const { cancelReservation, fetchMyReservations, reservationData, loading } =
    userReservationState((state) => state);

  // Calendar Reservations
  const { fetchReservations } = userCalendarState((state) => state);

  // State
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // Rating Data
  const [addRatingData, setAddRatingData] = useState(null);

  const columns = [
    {
      name: "Event Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start",
      selector: (row) => row.start,
      sortable: true,
    },
    {
      name: "End",
      selector: (row) => row.end,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <>
            {row.status.toLowerCase() === "pending" && (
              <p className="px-2 py-2 capitalize bg-orange-600 text-white font-medium rounded-full flex items-center justify-center">
                {row.status}
              </p>
            )}
            {row.status.toLowerCase() === "canceled" && (
              <p className="px-2 py-2 capitalize bg-red-600 text-white font-medium rounded-full flex items-center justify-center">
                {row.status}
              </p>
            )}
            {row.status.toLowerCase() === "rejected" && (
              <p className="px-2 py-2 capitalize bg-red-600 text-white font-medium rounded-full flex items-center justify-center">
                {row.status}
              </p>
            )}
            {row.status.toLowerCase() === "reserved" && (
              <p className="px-2 py-2 capitalize bg-green-600 text-white font-medium rounded-full flex items-center justify-center">
                {row.status}
              </p>
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const date = moment(row.end);
        const now = moment();
        let hideCancel;
        if (now > date) {
          hideCancel = true;
        } else {
          hideCancel = false;
        }
        return (
          <>
            <div
              className={`flex flex-col items-center py-2 space-x-1 xl:flex-row`}
            >
              {row.status === "reserved" && <PrintLetter data={row} />}

              {hideCancel && row.status === "reserved" && (
                <button
                  onClick={() => {
                    setAddRatingData(row);
                  }}
                  className="bg-[#16A34A] py-1 px-2.5 rounded-md"
                >
                  <BiCommentAdd size={18} color="#fff" />
                </button>
              )}

              <button
                className={`
                ${hideCancel && "hidden"}
                ${row.status === "canceled" && "hidden"}
              bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
                onClick={() => {
                  Swal.fire({
                    title: "Cancel Reservation",
                    text: "Are you sure you want to cancel?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleCancelReservation(row._id);
                    }
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </>
        );
      },
    },
  ];

  // Cancel Button
  const handleCancelReservation = async (id) => {
    const successCancel = await cancelReservation(token, id);
    if (successCancel) {
      await fetchMyReservations(token);
      await fetchReservations();
      return Swal.fire("Success", "Reservation Canceled!", "success");
    }
  };

  useEffect(() => {
    const result = reservationData.filter((item) => {
      if (
        item.title.toLowerCase().match(search.toLowerCase()) ||
        item.start.toLowerCase().match(search.toLowerCase()) ||
        item.end.toLowerCase().match(search.toLowerCase()) ||
        item.status.toLowerCase().match(search.toLowerCase()) ||
        item.createdAt.toLowerCase().match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  useEffect(() => {
    fetchMyReservations(token);
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {addRatingData !== null && (
            <AddRatingModal
              addRatingData={addRatingData}
              setAddRatingData={setAddRatingData}
            />
          )}

          <DataTable
            title="My Reservations"
            columns={columns}
            data={search === "" ? reservationData : filteredData}
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
              <div className="w-full flex flex-col md:flex-row items-start justify-end">
                <input
                  onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value);
                  }}
                  value={search}
                  type="text"
                  placeholder="Search here"
                  id="large-input"
                  className="mt-2 mb-1 md:mt-0 md:mb-0 outline-none max-w-xs px-2 py-1.5 w-full text-gray-800 bg-gray-50 rounded-lg border border-gray-300 sm:text-md "
                />
              </div>
            }
          />
        </>
      )}
    </div>
  );
};

export default UserReservation;
